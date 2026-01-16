# nuxt-32154-fixed

Issue: https://github.com/nuxt/nuxt/issues/32154

## Fix

Uses `pauseTracking`/`resetTracking` from `@vue/reactivity` in `clearNuxtDataByKey` to prevent reactive triggers when clearing data during component unmount.

```typescript
import { pauseTracking, resetTracking } from '@vue/reactivity'

// In clearNuxtDataByKey:
pauseTracking()
try {
  asyncData.data.value = unref(asyncData._default())
} finally {
  resetTracking()
}
```

This prevents the error because `v-once` components keep their effect scope active even after unmount - `pauseTracking` ensures no reactive triggers fire during cleanup.

## Verify

```bash
pnpm i && pnpm dev
```

1. Open http://localhost:3000
2. Click "Go to Cart"
3. Click "Go to Home"
4. Click "Go to Cart" again
5. No error in console
