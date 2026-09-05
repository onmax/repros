# Production auth origin from a forwarded header

Given a Nuxt production Node server with `siteUrl` unset and the deployment-owned `VERCEL_URL=deployment.example.test`, sending a password-reset request with `X-Forwarded-Host: attacker.example.test` should never send a reset link to that host. Version 0.2.5 instead sets Better Auth's canonical URL from the header and writes a reset link using `https://attacker.example.test`.

This reproduces the project audit finding against published `@nuxtjs/better-auth@0.2.5`, corresponding to [source commit 90b945a](https://github.com/nuxt-modules/better-auth/tree/90b945ad2366d6ade92b99ce0885f2831c8ef8d0). There is no separate source issue.

Use Node.js 24.19.0 and Corepack. The manifest pins pnpm 11.22.0, Nuxt 4.5.2 and Better Auth 1.7.1; `pnpm-lock.yaml` pins the complete install, including Nitro 2.13.4. On Linux:

```sh
git clone --depth 1 --branch repro/better-auth-production-origin https://github.com/onmax/repros.git
cd repros/better-auth-production-origin
pnpm install --frozen-lockfile && pnpm verify
```

The verifier builds with `nuxt build`, starts the `node-server` output on a free local port, seeds an in-memory user, calls the real Better Auth password-reset endpoint, checks the reset URL, then stops the server. It clears inherited origin variables and injects only the documented local listener and deployment variables. It exits nonzero if the reported behavior does not occur.

Expected baseline output:

```text
Control: legitimate reset succeeds and uses deployment.example.test.
Expected canonical origin: https://deployment.example.test
Actual canonical origin: https://attacker.example.test
REPRODUCED: password-reset link uses attacker.example.test.
```

The [patched control](../better-auth-production-origin-fix) runs the identical application and verifier against the same package plus the committed patch from [upstream fix 06a1d9c](https://github.com/nuxt-modules/better-auth/commit/06a1d9c752d90807662cc81d6532ec3f9afca65b). In that directory, use the same install-and-verify command. It must retain the canonical deployment origin, send the reset link to that deployment origin despite the supplied host, and still deliver a legitimate reset.

The production build preserves `import.meta.dev` replacement, which a development server cannot test. SSR is disabled because the claim uses only Nitro API routes. The memory adapter retains the real user/reset-token flow without an external database. The seed endpoint is local fixture setup, and the reset callback logs only an origin, never a token. No email is sent and no hosted service or credential is required. The attack requires a deployment that forwards the supplied header to Nitro; this fixture exercises that boundary directly and does not claim every proxy accepts it.

Use the repository fixture above. StackBlitz execution has not been verified, and the test depends on the pinned Node production server and pnpm 11 patch configuration.
