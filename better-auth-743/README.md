# API-key session returns the `{ headers, response }` wrapper, issue 743

[Source issue](https://github.com/nuxt-modules/better-auth/issues/743). [Fixed control](../better-auth-743-fix/README.md).

With `@better-auth/api-key` and `enableSessionForAPIKeys: true`, `requireUserSession(event)` on a request that carries `x-api-key` returns `{ headers, response }` instead of the session. `session.user` is `undefined` and no 401 is thrown. Better Auth's own `/api/auth/get-session` resolves the same key correctly.

## Run

```sh
git clone --branch repro/better-auth-743 https://github.com/onmax/repros.git
cd repros/better-auth-743
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` builds the app, starts `.output/server/index.mjs` on port 3743, creates a user and an API key through `POST /api/seed`, then calls two routes with `x-api-key`:

- Control, `GET /api/auth/get-session`: returns `ada@example.com`.
- `GET /api/me`: returns what `requireUserSession(event)` gave it.

It asserts the expected result and exits nonzero while the bug exists. `pnpm verify --expect-bug` asserts the reported result instead. Output is in `evidence.txt`.

```
Expected requireUserSession(): {"status":200,"body":{"email":"ada@example.com","keys":["session","user"]}}
Actual requireUserSession():   {"status":200,"body":{"email":null,"keys":["headers","response"]}}
```

## Environment

`@nuxtjs/better-auth` 0.3.16, `better-auth` and `@better-auth/api-key` 1.7.25, Nuxt 4.6.4, Node 24.21.0, pnpm 12.18.0. No database is configured, so Better Auth uses its in-memory adapter.

## Why each part is here

- The production build: the issue is about the server runtime, so the verifier runs the built Nitro server rather than `nuxt dev`.
- `server/api/seed.post.ts`: an API key needs a user, and creating both on the server keeps the fixture free of client code.
- `auth.config.ts` at the root is the client config the module writes on first build.

## Cause

When a plugin before hook answers `get-session`, as the api-key plugin does for API-key sessions, Better Auth 1.7 returns `{ headers: context.responseHeaders, response }`, and `responseHeaders` is `undefined` when nothing set a header. `loadSession()` in the module accepts the wrapper only when `result.headers instanceof Headers`, so it wraps it a second time.
