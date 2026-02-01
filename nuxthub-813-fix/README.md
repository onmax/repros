# nuxthub-813-fix

Issue: https://github.com/nuxt-hub/core/issues/813

## Problem

`migrations_dir` in generated wrangler.json has wrong path prefix causing doubled path.

## Verify

```bash
pnpm i && pnpm build
cat .output/server/wrangler.json | grep migrations_dir
```

## Expected

`migrations_dir` should be `db/migrations/sqlite/` (relative to wrangler.json location)

## Actual (before fix)

`migrations_dir` is `.output/server/db/migrations/` which wrangler resolves as `.output/server/.output/server/db/migrations/`

## Fix

Patch changes `migrations_dir` from `.output/server/db/migrations/` to `db/migrations/sqlite/` in `@nuxthub/core/dist/module.mjs`.
