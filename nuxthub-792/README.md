# nuxthub-792

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

## Actual

No `schema.mjs` or `schema.d.mts` (built types). Only template files exist.
