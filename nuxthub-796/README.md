# nuxthub-796

Issue: https://github.com/nuxt-hub/core/issues/796

## Problem

`@nuxthub/db` package.json not created during `nuxt prepare`, causing TS5090 non-relative path errors.

## Verify

```bash
pnpm i && pnpm typecheck
```

## Expected

Typecheck passes.

## Actual

```
.nuxt/tsconfig.app.json - error TS5090: Non-relative paths are not allowed when 'baseUrl' is not set.
  "@nuxthub/db"
  "@nuxthub/db/schema"
```
