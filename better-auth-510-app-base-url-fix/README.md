# Fixed control for Better Auth under `app.baseURL`

This is the fixed sibling of [the failing issue #510 fixture](../better-auth-510-app-base-url/README.md). Application code, pinned versions, and `pnpm verify` are identical. A committed `pnpm patch` changes only `@nuxtjs/better-auth` 0.3.5: Better Auth receives the site origin plus Nuxt `app.baseURL` plus `/api/auth` for its own server and default client. The external `clientOnly` URL remains unchanged.

With Node 24.19.0 and pnpm 11.22.0, run:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

The root control returns 200 at `/api/auth/ok` with base path `/api/auth`. The mounted app returns 200 at `/app/api/auth/ok` with base path `/app/api/auth`. The verifier prints expected and actual results and exits nonzero if either check fails. The patch source is `patches/@nuxtjs__better-auth@0.3.5.patch`; `pnpm-workspace.yaml` applies it to the same published version used by the failing fixture.

This fixture is local to issue #510 and requires no credentials, database, browser, or deployment for its development-server verification. A separate local Node-server production build also returned 200 and the `/app/api/auth` base path.

From GitHub:

```sh
git clone --depth 1 --branch repro/better-auth-510-app-base-url https://github.com/onmax/repros.git
cd repros/better-auth-510-app-base-url-fix
pnpm install --frozen-lockfile && pnpm verify
```
