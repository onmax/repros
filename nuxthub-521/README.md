# nuxthub-521

Issue: https://github.com/nuxt-hub/core/issues/521#issuecomment-3726513614

## Problem

When using `@nuxt/ui`'s UAvatar with `@nuxt/image` in a NuxtHub project targeting Cloudflare, the Cloudflare image provider gets detected during local development. UAvatar uses NuxtImg under the hood, which applies Cloudflare's image transformation URL format even locally.

## Verify

```bash
pnpm i && pnpm dev
```

Open http://localhost:3000 and inspect the network requests for images. Notice how UAvatar/NuxtImg tries to use Cloudflare image URLs instead of the original URLs.

## Expected

Images should load correctly using their original URLs during local dev, with Cloudflare provider only active in production.

## Actual

UAvatar/NuxtImg applies Cloudflare image provider settings during local development when `nitro.preset: 'cloudflare-pages'` is set, causing image URLs to be transformed incorrectly.
