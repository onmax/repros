# nuxthub-796-fixed

Issue: https://github.com/nuxt-hub/core/issues/796

## Problem

`@nuxthub/db` package.json and schema files not created during `nuxt prepare`, causing TS5090 non-relative path errors.

## Verify

```bash
pnpm i && pnpm typecheck
```

## Expected

Typecheck passes.

## Actual

Typecheck passes. ✅

## Fix

Create `package.json` and stub schema files (`schema.mjs`, `schema.d.mts`) in `setupDatabaseClient` so they exist during prepare. These enable Node.js module resolution of `@nuxthub/db` and `@nuxthub/db/schema` subpaths.
