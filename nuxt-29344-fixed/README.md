# nuxt-29344-fixed

Issue: https://github.com/nuxt/nuxt/issues/29344

## Problem

When middleware throws `createError({ statusCode: 410, fatal: true })` for unmatched routes, HTTP response is always 404 instead of 410.

## Verify

```bash
pnpm i && pnpm dev
# Then curl -I http://localhost:3000/non-existent
```

## Expected

HTTP 410 Gone

## Actual (with patch)

HTTP 410 Gone

## Fix

Add `&& !error.value` check to prevent 404 override when middleware already set an error.
