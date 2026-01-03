# nuxt-better-auth-9-fixed

Issue: https://github.com/onmax/nuxt-better-auth/pull/9

## Problem

Schema generation doesn't properly handle function-based field attributes:
1. `defaultValue: () => new Date()` generates `.default(() => ...)` instead of `.$defaultFn(() => ...)`
2. `onUpdate: () => new Date()` is not handled at all

## Fix

Patch applied to `@onmax/nuxt-better-auth`:
1. Check `typeof field.defaultValue === 'function'` → use `.$defaultFn()`
2. Add `onUpdate` handling → use `.$onUpdate()` for date fields

## Verify

```bash
pnpm install
pnpm test
```

## Expected & Actual (with patch)

```
✅ defaultValue uses .$defaultFn()
✅ onUpdate uses .$onUpdate()
```
