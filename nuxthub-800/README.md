# nuxthub-800

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
```
Package import specifier "#shared/utils/accounts" is not defined in package .../node_modules/@nuxthub/db/package.json
```
