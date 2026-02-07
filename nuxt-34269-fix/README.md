# nuxt-34269-fix

Issue: https://github.com/nuxt/nuxt/issues/34269

## Problem
When using `routeRules` with `ssr: false` for route A and `prerender: true` for route B, opening the website directly on route A and navigating to route B breaks the page.

The root cause is that `nuxtApp.payload.data` is not initialized when a non-SSR route is opened directly, and when navigating to a prerendered page, Nuxt tries to modify `nuxtApp.payload.data[useAsyncDataKey]` which fails because `nuxtApp.payload.data` is `undefined`.

## Fix
The patch ensures `nuxtApp.payload.data` is always initialized in the `revive-payload.client.ts` plugin after merging the client payload:

```typescript
nuxtApp.payload.data ||= shallowReactive({});
```

This guarantees that `payload.data` exists before any `useAsyncData` composable tries to access it.

## Verify
```bash
pnpm i && pnpm build && pnpm preview
```

Then:
1. Open http://localhost:3000/no-ssr directly
2. Click "Go to prerendered page"
3. Page should work without errors

## Expected
Navigation works, prerendered page shows data correctly.

## Actual (with fix)
✅ Navigation works correctly, no console errors.
