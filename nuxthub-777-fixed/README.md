# nuxthub-777-fixed

Issue: https://github.com/nuxt-hub/core/issues/777

## Problem

Building without `DATABASE_URL` fails even when `applyMigrationsDuringBuild: false`. Docker multi-client scenario broken: can't build once, deploy many with different DATABASE_URLs.

## Verify

```bash
pnpm i && pnpm build
cat .nuxt/hub/db.mjs
```

## Expected

Build succeeds, `db.mjs` resolves URL from env at runtime.

## Actual (after fix)

Build succeeds. Generated `db.mjs`:
```js
const url = process.env.POSTGRES_URL || process.env.POSTGRESQL_URL || process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL, POSTGRES_URL, or POSTGRESQL_URL required')
```

## Fix

1. Only throw missing URL error when `applyMigrationsDuringBuild: true`
2. Generate lazy Proxy template for non-CF postgres-js/neon-http/mysql2 that resolves env at runtime
