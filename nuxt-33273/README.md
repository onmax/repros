# nuxt-33273

Issue: https://github.com/nuxt/nuxt/issues/33273

## Problem

`navigateTo` from middleware drops percent-encoding. Router compares raw `fullPath` with vue-router's percent-encoded `final.fullPath`, causing redirect to fail.

## Verify

```bash
pnpm i && pnpm dev
```

Visit `/trigger` - should redirect to `/target?callback=https://example.com`

## Expected

Redirect to `/target?callback=https://example.com` (with `callback` value `https://example.com`)

## Actual

Redirect fails because `final.fullPath === fullPath` comparison fails when one is encoded and the other isn't.
