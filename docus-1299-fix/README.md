# docus-1299-fix

Issue: [nuxt-content/docus#1299](https://github.com/nuxt-content/docus/issues/1299)

## Problem

A minimal Nuxt app that only extends Docus fails on `nuxt typecheck`.

## Verify

```bash
pnpm i && pnpm typecheck
```

## Expected

`nuxt typecheck` succeeds in a minimal app extending Docus.

## Actual

`nuxt typecheck` succeeds because the local patch fixes the Docus package typing issues exposed in a consumer app.

## Fix

The patch fixes only the consumer-facing typecheck failures:

- narrows the footer link array so `UButton` receives a typed `to`
- replaces the i18n composable calls with typed `useNuxtApp()` accessors
- narrows `nuxt.options` locally before reading `i18n`
- casts the sitemap content query to the page shape used in this route
