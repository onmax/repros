# nuxt-convex-5-fixed

Issue: https://github.com/onmax/nuxt-convex/issues/5

## Problem

Published package contains `catalog:prod` references instead of resolved versions. npm publish doesn't resolve pnpm catalogs.

## Verify

```bash
pnpm i
```

## Expected

Install succeeds

## Actual

Install succeeds (using pkg.pr.new with fix)

## Fix

Changed `npm publish` to `pnpm publish` in release workflow. pnpm resolves catalog references before publishing.
