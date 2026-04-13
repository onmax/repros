# nuxthub-hyperdrive-runtime-context

Issue: TBD

## Problem
NuxtHub generates a physical `@nuxthub/db` package for the Cloudflare Hyperdrive PostgreSQL path.
That generated package currently imports `nitropack/runtime/context`.

This repro uses an installed Nuxt module package that calls `jiti.import()` on an app file which imports `@nuxthub/db`.
That package boundary makes the generated runtime import unsafe, and the Cloudflare build fails while resolving `node_modules/@nuxthub/db/db.mjs`.

## Verify
```bash
pnpm install
pnpm build
```

## Expected
The build succeeds and the installed module can load the app's DB config without breaking the generated `@nuxthub/db` package boundary.

## Actual
The build fails with a `nitropack` package-boundary resolution error from generated `@nuxthub/db`, typically:

```txt
Package subpath './runtime/context' is not defined by "exports"
```
