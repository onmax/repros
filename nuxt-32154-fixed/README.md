# nuxt-32154-fixed

Issue: https://github.com/nuxt/nuxt/issues/32154

## Fix

Use optional chaining in slot content to handle undefined data during navigation:

```vue
<DataDisplay v-once>
  <div>{{ data?.foo }}</div>
</DataDisplay>
```

## Verify

```bash
pnpm i && pnpm dev
```

1. Open http://localhost:3000
2. Click "Go to Cart"
3. Click "Go to Home"
4. Click "Go to Cart" again
5. No error in console

## Root Cause

`v-once` components don't properly unmount in Nuxt - they keep watching reactive deps after effect scope disposes. When data is cleared during navigation, stale watchers access undefined data.

This is a Vue-level optimization issue with `v-once` + Nuxt's page transitions.
