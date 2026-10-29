# Admin impersonation session refreshes to `session.expiresIn`

No upstream issue yet. Related: [#10734](https://github.com/better-auth/better-auth/issues/10734), [#10819](https://github.com/better-auth/better-auth/issues/10819), [#11622](https://github.com/better-auth/better-auth/issues/11622).

Given `better-auth` 1.7.14 or 1.8.0-beta.3 with `admin({ impersonationSessionDuration })`, an impersonation session should end after that duration. The [admin plugin docs](https://better-auth.com/docs/plugins/admin#impersonate-user) say it "will remain active until either the browser session ends or it reaches 1 hour". Instead, a request that carries the session token without the `dont_remember` cookie refreshes the session to `session.expiresIn` (7 days by default). The refresh repeats while the client uses the session.

## Cause

`getSession` reads `dontRememberMe` from the `dont_remember` cookie and skips the sliding refresh only when that cookie or `?disableRefresh` is present (`packages/better-auth/src/api/routes/session.ts:124` and `:309` at `v1.7.14`; the file is identical at `v1.8.0-beta.3` and on `main` at `8f39145`). An impersonation session expires in one hour, which is earlier than `expiresAt - expiresIn + updateAge` allows, so `needsRefresh` is true at once (`:343`) and `updateSession` sets `expiresAt` to now plus `expiresIn` (`:369`). The admin plugin sets the `dont_remember` cookie when it starts the impersonation, but nothing on the server marks the session as non-renewable. A client that does not send that cookie removes the bound.

## Run

```sh
git clone --branch repro/better-auth-impersonation-refresh https://github.com/onmax/repros.git
cd repros/better-auth-impersonation-refresh
pnpm install --frozen-lockfile && pnpm verify --expect-bug
```

For each version, the verifier starts one impersonation per scenario and sends one request the way the client would. It reads the stored expiry through `auth.api.getSession` with `disableRefresh`, waits one second past `impersonationSessionDuration`, and asks for the session again. `--expect-bug` succeeds only when every affected scenario moves the expiry by about seven days and the session is still valid after the duration. Without the flag, the verifier asserts the documented behavior and fails on the published packages. The controls must stay bounded in both modes.

## Expected and observed

`impersonationSessionDuration: 2`, default `session.expiresIn` (7 days). The results are the same on 1.7.14 and 1.8.0-beta.3.

| Scenario | Expected | Observed |
| --- | --- | --- |
| Browser with all cookies (control) | expiry kept, ended after 2 s | expiry kept, ended after 2 s |
| `session_token` cookie only | expiry kept, ended after 2 s | expiry moved by 604,798,000 ms, valid after 3 s |
| `bearer()` client with the `set-auth-token` value | same | same as above |
| `session_token` only, through `/list-sessions` | same | same as above |
| `deferSessionRefresh: true`, `POST /get-session` | same | same as above |
| `secondaryStorage`, `session_token` only | same | same as above |
| No database, `cookieCache.refreshCache` (control) | expiry kept, ended after 2 s | expiry kept, ended after 2 s; `session_token` gets `Max-Age=604800` |

Verification output is in `evidence.txt`.

## Why these files remain

- `memoryAdapter` keeps the fixture free of native modules. The refresh happens in `getSession`, before any adapter code. The `secondaryStorage` scenario covers the other session store.
- A 2-second `impersonationSessionDuration` lets the verifier wait past the bound instead of only comparing timestamps.
- `bearer()` is installed in every scenario. Only the bearer scenario sends `Authorization`. A bearer client never holds the `dont_remember` cookie, so it hits the refresh without any change to the request.
- `/list-sessions` shows that the refresh also runs when another endpoint resolves the session through `sessionMiddleware`. A fix in a `/get-session` hook would miss it.
- The operator signs in again after the role change. With `secondaryStorage`, the first session keeps a copy of the user from before the role change, and `impersonate-user` answers 403.
- `better-auth-beta` is an npm alias of `better-auth@1.8.0-beta.3`, so one verifier runs against both versions.
- The cookie-cache control runs without a database, because Better Auth turns `refreshCache` off when a `database` or `secondaryStorage` is configured (`context/create-context.ts:328`). That branch refreshes the `session_token` cookie's `Max-Age` but keeps `session.expiresAt`, so it does not extend the session.

The sibling [fixed control](../better-auth-impersonation-refresh-fix/README.md) keeps the verifier and dependency versions identical and applies a committed pnpm patch to `dist/api/routes/session.mjs` only.
