# nuxt-29344

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

## Actual

HTTP 404 Not Found
