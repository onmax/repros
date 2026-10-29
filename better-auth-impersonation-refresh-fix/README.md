# Admin impersonation session refresh, fixed control

[Failing fixture](../better-auth-impersonation-refresh/README.md).

This control is identical to the failing fixture except for `patches/better-auth@1.7.14.patch` and `patches/better-auth@1.8.0-beta.3.patch`. Both patches change `dist/api/routes/session.mjs` in the same two places:

- `getSession` skips the sliding refresh when the session has `impersonatedBy`, as it already does when the `dont_remember` cookie is present.
- The cookie-cache refresh branch does not give `session_token` a `Max-Age` for such a session.

## Run

```sh
git clone --branch repro/better-auth-impersonation-refresh https://github.com/onmax/repros.git
cd repros/better-auth-impersonation-refresh-fix
pnpm install --frozen-lockfile && pnpm verify
```

The verifier is the same as in the failing fixture. Here `pnpm verify` passes: every scenario keeps the expiry, the session ends after `impersonationSessionDuration`, and no response sets a `session_token` `Max-Age`. `pnpm verify --expect-bug` fails. Verification output is in `evidence.txt`.
