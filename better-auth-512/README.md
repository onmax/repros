# Better Auth issue #512 reproduction

Given Nuxt 4.5.2, `@nuxtjs/better-auth` 0.3.7, `better-auth` 1.7.7, and Node 24.x, when a client-only app protects its initial route with `definePageMeta({ auth: 'user' })`, requesting `/` should render the page while the browser checks the external auth backend. Instead, the unpatched package returns HTTP 404 with `Page not found: /api/auth/get-session`.

The failing fixture uses the reported shape: `clientOnly: true`, an external Better Auth URL at `http://127.0.0.1:4000`, and a custom `/auth` base path. No external backend is needed because the bug occurs before the client request. The package was pinned to the v0.3.7 release from upstream commit `7ffd6cf`.

From the branch root, run:

```sh
node verify.mjs
```

The verifier installs each fixture when needed, starts its Nuxt dev server, requests `/`, asserts the exact failing response, and cleans up the server. It reports:

```text
better-auth-512: 404 and /api/auth/get-session
better-auth-512-fix: 200 and Protected page
```

`better-auth-512-fix/` uses the same application and dependency versions with a committed `pnpm patch` that returns from the global auth middleware during server rendering in client-only mode. This is the proposed upstream fix control, not part of the failing fixture.
