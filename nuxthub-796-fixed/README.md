# nuxthub-796-fixed

Issue: https://github.com/nuxt-hub/core/issues/796
PR: https://github.com/nuxt-hub/core/pull/797

## Problem

After `nuxt prepare` → types generated ✅
`nuxt build` with `typescript.typeCheck="build"` → TS5090 error (non-relative paths)

## Verify

```bash
rm -rf node_modules .nuxt && pnpm i
pnpm prepare  # passes
pnpm build    # passes ✅
```

## Fix

Uses `@nuxthub/core` from PR #797 (`https://pkg.pr.new/@nuxthub/core@797`) which creates `package.json` and stub schema files (`schema.mjs`, `schema.d.mts`) in `setupDatabaseClient` so they exist during prepare.
