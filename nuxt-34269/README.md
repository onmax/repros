# nuxt-34269

Issue: https://github.com/nuxt/nuxt/issues/34269

## Problem
When using `routeRules` with `ssr: false` for route A and `prerender: true` for route B, opening the website directly on route A and navigating to route B breaks the page.

The root cause is that `nuxtApp.payload.data` is not initialized when a non-SSR route is opened directly, and when navigating to a prerendered page, Nuxt tries to modify `nuxtApp.payload.data[useAsyncDataKey]` which fails because `nuxtApp.payload.data` is `undefined`.

## Verify
```bash
pnpm i && pnpm build && pnpm preview
```

Then:
1. Open http://localhost:3000/no-ssr directly
2. Click "Go to prerendered page"
3. Observe the error

## Expected
Navigation works, prerendered page shows data

## Actual
Console error: Cannot set properties of undefined (setting 'test-data')
Page fails to render
