# nuxt-33922

Issue: https://github.com/nuxt/nuxt/issues/33922

## Problem

Pages with unicode/special characters in filenames (e.g., `测试.vue`) cause 404 errors on client-side navigation. SSR works fine, but clicking NuxtLink fails.

## Verify

```bash
pnpm i && pnpm dev
# Open http://localhost:3000
# Click "Go to 测试 page" link
```

## Expected

Navigation to `/测试` should show the page content.

## Actual

404 error on client navigation. Refreshing the page (SSR) works.
