# better-auth-unmatched-404

Issue: Not filed yet

## Problem

A broad `routeRules.auth` rule redirects an unauthenticated request for an unmatched page before Nuxt can render its 404.

## Verify

```bash
pnpm i
pnpm test
```

## Expected

`GET /missing` returns `404` because no Nuxt page matches the URL.

## Actual

`GET /missing` returns a redirect to `/login?redirect=/missing` because the global auth middleware applies the catch-all route rule before Nuxt handles the empty route match.
