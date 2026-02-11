# nuxthub-832

Issue: https://github.com/nuxt-hub/core/issues/832

## Problem
`@nuxthub/core` can generate `@nuxthub/db/schema.mjs` with an absolute export to `node_modules/.cache/nuxt/.nuxt/.../schema.postgresql.ts` when schema entries originate from cache-based paths.

## Verify
```bash
pnpm i && pnpm verify
```

## Expected
Generated output schema should be self-contained and remain importable after cache directories are missing.

## Actual
Generated output schema points to an absolute `.ts` file under `node_modules/.cache/nuxt/.nuxt/...`; once that cache path is missing, importing output schema throws `ERR_MODULE_NOT_FOUND`.
