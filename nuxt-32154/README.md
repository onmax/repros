# nuxt-32154

Issue: https://github.com/nuxt/nuxt/issues/32154

## Problem

`v-once` with `useAsyncData` causes "Cannot read properties of null" error upon navigation.

Reported as regression in Nuxt 3.17.0+ (works in 3.16.2).

## Verify

```bash
pnpm i && pnpm dev
```

1. Open http://localhost:3000
2. Click "Go to Cart"
3. Click "Go to Home"
4. Click "Go to Cart" again
5. Check console for error: `Cannot read properties of null`

## Expected

Console error on step 4-5.

## Status

**Needs verification** - Unable to reproduce with Nuxt 3.20.2. Asking issue author to confirm if still reproducible.
