# nuxt-34162

Reproduction for https://github.com/nuxt/nuxt/issues/34162

## Problem
Prerender fails with 500 when route contains unicode (e.g. `联想.vue`). Works in 4.2.2, broken in 4.3.0.

## Verify
```bash
pnpm i && pnpm generate
```

## Expected
Route `/联想` prerendered successfully.

## Actual
500 error on `/联想` during prerender.
