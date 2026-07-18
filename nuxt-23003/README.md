# nuxt-23003

Issue: https://github.com/nuxt/nuxt/issues/23003

## Problem

When one route middleware calls `setPageLayout()`, later middleware cannot read the selected layout from `to.meta.layout` during server-side rendering.

## Verify

```bash
pnpm i && pnpm run verify
```

## Expected

The command reports that the later middleware observed `to.meta.layout=dynamic`.

## Actual

The command reports `to.meta.layout=undefined` and exits with an error.
