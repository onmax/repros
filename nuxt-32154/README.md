# nuxt-32154

Issue: https://github.com/nuxt/nuxt/issues/32154

## Problem

`v-once` with `useAsyncData` causes "Cannot read properties of null" error upon navigation.

**Key finding**: Bug only reproduces when passing data via **slot**, not props. The `v-once` must be on the wrapper component.

```vue
<!-- This triggers the bug -->
<DataDisplay v-once>
  <div>{{ data.foo }}</div>
</DataDisplay>
```

Root cause (from @Saeid-Za): Component marked with `v-once` never unmounts, keeps watching reactive deps even after effect scope disposes. Only happens in Nuxt (`<NuxtPage>` related), not raw vue + vue-router.

## Verify

```bash
pnpm i && pnpm dev
```

1. Open http://localhost:3000
2. Click "Go to Cart"
3. Click "Go to Home"
4. Click "Go to Cart" again
5. Check console for error: `Cannot read properties of null`

## Expected

No error on navigation.

## Actual

Console error on step 4-5.
