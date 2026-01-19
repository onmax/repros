# nuxt-34117

Issue: https://github.com/nuxt/nuxt/issues/34117

## Problem
Options API asyncData properties not reactive when modified

## Verify
```bash
pnpm i && pnpm dev
```
Click increment button - count doesn't update

## Expected
Count increments on click

## Actual
Count stays at 0
