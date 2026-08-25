# nuxt-open-fetch #145

Issue: https://github.com/Norbiros/nuxt-open-fetch/pull/145

## Problem

An Open Fetch client with an absolute base URL fails in a Nuxt 5 / Nitro 3 server route because neither `globalThis.$fetch` nor Nitro's removed `localFetch` is available.

This fixture packages `nuxt-open-fetch` main at `616f4c0eb532a555193a1b0321b3c90f35916a3f` because the latest npm release predates its Nitro 3 import support. The package tarball has SHA-256 `3e47b27ea08889716e0695422853ccb041f98f1d02ca3323d81e70aafff54ceb`.

## Verify

```bash
pnpm install && pnpm verify
```

## Expected

`/api/open-fetch` returns HTTP 200 with `{ "ok": true }`.

## Actual

The production server returns HTTP 500 with `TypeError: getFetch(...) is not a function`.
