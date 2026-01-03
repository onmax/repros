# nuxt-better-auth-9

Issue: https://github.com/onmax/nuxt-better-auth/pull/9

## Problem

Schema generation doesn't properly handle function-based field attributes:
1. `defaultValue: () => new Date()` generates `.default(() => ...)` instead of `.$defaultFn(() => ...)`
2. `onUpdate: () => new Date()` is not handled at all

Drizzle requires `.$defaultFn()` for runtime defaults and `.$onUpdate()` for update triggers.

## Verify

```bash
pnpm install
pnpm test
```

## Expected

```
✅ FIXED: defaultValue correctly uses .$defaultFn()
✅ FIXED: onUpdate correctly uses .$onUpdate()
```

## Actual

```
❌ BUG: defaultValue uses .default() - should use .$defaultFn()
❌ BUG: onUpdate is not handled at all
```
