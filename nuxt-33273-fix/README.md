# nuxt-33273-fix

Issue: https://github.com/nuxt/nuxt/issues/33273

## Problem

`navigateTo` from middleware drops percent-encoding. The router compares raw `fullPath` with vue-router's percent-encoded `final.fullPath`, causing redirect to fail.

## Fix

Normalize both paths via `encodeURL()` before comparing: `encodeURL(final.fullPath) === encodeURL(fullPath)`

## Verify

```bash
pnpm i && pnpm dev
```

Visit `/trigger` - redirects to `/target?callback=%2Fother` with `callback` value `/other`
