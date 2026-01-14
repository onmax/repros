# nuxt-32154-fixed

Issue: https://github.com/nuxt/nuxt/issues/32154

## Problem

`v-once` with `useAsyncData` causes "Cannot read properties of null" error upon navigation.

## Fix

Backport of [nuxt/nuxt#32096](https://github.com/nuxt/nuxt/commit/b0d777b60) (already in v4.x):

Wrap `clearNuxtDataByKey` in `nextTick()` to allow stale effects from `v-once` components to dispose before clearing data.

```js
// Before
if (purgeCachedData && !hasCustomGetCachedData) {
  clearNuxtDataByKey(nuxtApp, key);
}

// After
if (purgeCachedData && !hasCustomGetCachedData) {
  nextTick(() => {
    if (!asyncData._init) {
      clearNuxtDataByKey(nuxtApp, key);
    }
  });
}
```

## Verify

```bash
pnpm i && pnpm dev
```

1. Open http://localhost:3000
2. Click "Go to Cart"
3. Click "Go to Home"
4. Click "Go to Cart" again
5. No error in console ✅
