# nuxthub-800-fixed

Issue: https://github.com/nuxt-hub/core/issues/800

## Problem
After 0.10.5, schema files bundled via `tsdown` don't resolve Nuxt aliases (`#shared`, `~`, `@`).

## Verify
```bash
pnpm i && pnpm build
```

## Expected
Build succeeds with `#shared` import resolved.

## Actual
Build succeeds, schema correctly bundles the shared utility.

## Fix
Pass `nuxt.options.alias` to `buildDatabaseSchema()` and merge into tsdown config.
