# nuxt-23003-fix

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

Without the patch, the later middleware observes `to.meta.layout=undefined`.

## Fix

The patch exposes the pending server route while middleware runs, so `setPageLayout()` updates its metadata synchronously and later middleware sees the selected layout.
