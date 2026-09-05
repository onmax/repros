# Better Auth ssr dates fixed control

Given `@nuxtjs/better-auth` 0.2.5 and Better Auth 1.7.1, Date fields crossing the SSR JSON boundary should remain Dates like Better Auth client state, but they become strings.

Source provenance: [nuxt-modules/better-auth at 90b945a](https://github.com/nuxt-modules/better-auth/tree/90b945ad2366d6ade92b99ce0885f2831c8ef8d0). This fixture executes the published package's runtime. Node 24.19.0 and pnpm 11.22.0 are pinned; the lockfile pins dependencies.

```sh
pnpm install --frozen-lockfile && pnpm verify
```

This sibling applies the committed patch to the same pinned published package. The verifier uses the identical command and exits nonzero unless expected behavior is restored. It uses synthetic data and starts no persistent server. Nuxt state/request hooks are isolated at their boundary; the actual package implementation and Better Auth or ofetch response handling are preserved. This proves the runtime contract, not a hosted-platform or browser-hydration claim.

For an upstream source control, run the same command with `REPRO_SOURCE_ROOT=/path/to/better-auth REPRO_EXPECT_FIXED=1 pnpm verify`. The repository must contain the matching source and installed dependencies. The default verifier requires no source checkout.

Reproduction branch: `repro/better-auth-ssr-dates`. Clone with `git clone --branch repro/better-auth-ssr-dates --single-branch https://github.com/onmax/repros.git`, then enter this fixture directory. The sibling failing fixture uses the same command.
