# nuxthub-796

Issue: https://github.com/nuxt-hub/core/issues/796
PR: https://github.com/nuxt-hub/core/pull/797

## Problem

After `nuxt prepare` → types generated ✅
`nuxt build` with `typescript.typeCheck="build"` → TS5090 error (non-relative paths)

## Verify

```bash
rm -rf node_modules .nuxt && pnpm i
pnpm prepare  # passes
pnpm build    # fails with TS5090
```

## Expected

Build passes with type checking.

## Actual

```
error TS5090: Non-relative paths are not allowed when 'baseUrl' is not set.
  "@nuxthub/db"
  "@nuxthub/db/schema"
```
