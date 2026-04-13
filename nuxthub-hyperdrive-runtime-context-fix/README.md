# nuxthub-hyperdrive-runtime-context-fix

Issue: TBD

## Problem
NuxtHub generates a physical `@nuxthub/db` package for the Cloudflare Hyperdrive PostgreSQL path.
The preview package imports `nitropack/runtime/context`, which is not safe across the generated package boundary when another installed package loads an app file through `jiti`.

## Verify
```bash
pnpm install
pnpm build
```

## Expected
The build succeeds and the installed module can load the app's DB config without breaking the generated `@nuxthub/db` package boundary.

## Actual
The patched build succeeds.

## Fix
The local patch removes the generated package's `nitropack/runtime/context` import.
Instead, it reads Nitro async context from `globalThis.__unctx__` when available and preserves request-scoped Hyperdrive DB caching only when an event context exists, with a safe uncached fallback otherwise.
