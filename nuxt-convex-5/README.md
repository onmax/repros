# nuxt-convex-5

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

```
ERR_PNPM_SPEC_NOT_SUPPORTED_BY_ANY_RESOLVER  @nuxt/kit@catalog:prod isn't supported by any available resolver.
```
