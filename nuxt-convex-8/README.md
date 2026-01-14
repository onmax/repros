# nuxt-convex-8

Issue: https://github.com/onmax/nuxt-convex/issues/8

## Problem
Published npm package contains `catalog:prod` references instead of resolved versions.

**Root cause**: `release.yml` uses `npm publish` instead of `pnpm publish`. npm doesn't understand pnpm catalog protocol.

## Verify
```bash
pnpm i
```

## Expected
Dependencies install successfully.

## Actual
```
ERR_PNPM_SPEC_NOT_SUPPORTED_BY_ANY_RESOLVER @nuxt/kit@catalog:prod isn't supported by any available resolver.
```
