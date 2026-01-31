# nuxt-33273

Issue: https://github.com/nuxt/nuxt/issues/33273

## Problem

`navigateTo` from middleware drops percent-encoding. The router compares raw `fullPath` with vue-router's percent-encoded `final.fullPath`, causing redirect to fail.

## Verify

```bash
pnpm i && pnpm dev
```

Visit `/trigger` - should redirect to `/target?callback=%2Fother`

## Expected

Redirect to `/target?callback=%2Fother` with `callback` value `/other`

## Actual

Redirect fails or wrong encoding because comparison `final.fullPath === fullPath` fails when one is encoded and the other isn't.
