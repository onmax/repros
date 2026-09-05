# nuxthub-792-fixed

Issue: https://github.com/nuxt-hub/core/issues/792

## Problem

`hub:db` schema types not generated during `nuxt prepare`. PR #779 re-introduced the `if (!nuxt.options._prepare)` guard that was removed in PR #758.

## Verify

```bash
pnpm i && pnpm prepare
ls .nuxt/hub/db/
```

## Expected

`.nuxt/hub/db/schema.d.mts` exists with table types.

## Actual (with fix)

`schema.mjs` and `schema.d.mts` are generated correctly.

## Fix

Move `buildDatabaseSchema()` outside the `if (!nuxt.options._prepare)` guard while keeping the node_modules copying inside.
