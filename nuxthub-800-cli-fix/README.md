# nuxthub-800-cli

Issue: https://github.com/nuxt-hub/core/issues/800

## Problem
CLI commands (`nuxt db generate`, `nuxt db squash`) don't resolve Nuxt aliases (`#shared`, `~`, `@`) when bundling schema.

## Verify
```bash
pnpm i && npx nuxt prepare && npx nuxt db generate
```

## Expected
Migration generation succeeds with `#shared` import resolved.

## Actual
```
Package import specifier "#shared/utils/accounts" is not defined
```
