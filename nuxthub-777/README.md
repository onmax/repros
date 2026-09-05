# nuxthub-777

Issue: https://github.com/nuxt-hub/core/issues/777

## Problem

Building without `DATABASE_URL` fails even when `applyMigrationsDuringBuild: false`. Docker multi-client scenario broken: can't build once, deploy many with different DATABASE_URLs.

## Verify

```bash
pnpm i && pnpm build
```

## Expected

Build succeeds, `db.mjs` resolves URL from env at runtime.

## Actual

```
ERROR postgres-js driver requires DATABASE_URL, POSTGRES_URL, or POSTGRESQL_URL environment variable
```
