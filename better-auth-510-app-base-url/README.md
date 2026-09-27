# Better Auth under a Nuxt app base URL (issue #510)

Given `@nuxtjs/better-auth` 0.3.5, Better Auth 1.7.3, Nuxt 4.5.2, Node 24.19.0, and `app.baseURL: '/app/'`, requesting `/app/api/auth/ok` should return 200, and Better Auth's base path should be `/app/api/auth`. The route instead returns 404 and the base path is `/api/auth`.

Source: [nuxt-modules/better-auth#510](https://github.com/nuxt-modules/better-auth/issues/510). This fixture was reduced from [jd-solanki/reproductions at 8b1ee3d](https://github.com/jd-solanki/reproductions/tree/8b1ee3ddb98ca147da57ce5a9e00914c7cae54ae). The original test was first run unchanged, then NuxtHub, the page, the extra setup files, and the email/password option were removed while the failure persisted. The lockfile overrides three newer transitive releases to satisfy the local pnpm supply-chain policy.

## Run

With Node 24.19.0 and pnpm 11.22.0:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`verify` runs the same Nuxt app twice. At `/`, the route returns 200 and the auth base path is `/api/auth`. With only `app.baseURL` changed to `/app/`, the route returns 404 and Better Auth still uses `/api/auth`. It prints expected and actual results and exits nonzero if either observation changes. `@nuxt/test-utils` starts and stops each app. No database, credentials, browser, or deployment is needed.

The `server/api/auth-base.get.ts` route exposes `(await auth.$context).baseURL`, which Better Auth uses for generated auth links and OAuth callback URLs. The empty server and client config files are required by the module. The production build is outside this fixture's claim; the source issue's repeatable dev-server failure is the boundary tested here.

A fixed control using the same app and verifier is in [`../better-auth-510-app-base-url-fix`](../better-auth-510-app-base-url-fix). It applies a committed patch to the same pinned package version.

From GitHub:

```sh
git clone --depth 1 --branch repro/better-auth-510-app-base-url https://github.com/onmax/repros.git
cd repros/better-auth-510-app-base-url
pnpm install --frozen-lockfile && pnpm verify
```
