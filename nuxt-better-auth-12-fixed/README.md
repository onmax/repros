# nuxt-better-auth-12-fixed

Issue: https://github.com/onmax/nuxt-better-auth/issues/12

This folder demonstrates the fix for the bugs described in the base repro.

## Fix

The patch in `patches/@onmax__nuxt-better-auth@0.0.2-alpha.3.patch` contains the fix:

1. Added `toSnakeCase()` helper function
2. Changed `!table.modelName` check to `hasCustomModelName = table.modelName && table.modelName !== tableName`
3. Apply `snake_case` transformation to table names when `casing: 'snake_case'`
4. Apply `snake_case` transformation to field names when `casing: 'snake_case'`
5. `usePlural` now works correctly (only skipped if custom modelName differs from tableName)

## Verify

```bash
pnpm install
pnpm dev
```

Check generated schema in `.nuxt/db/schema.ts`:

**Result:**
- Table names: `users`, `sessions`, `accounts`, `verifications` (plural + snake_case) ✓
- Field names: `email_verified`, `created_at`, `updated_at` (snake_case) ✓

## Root Cause

Better-auth sets `modelName` equal to `tableName` by default. The old check `!table.modelName` always failed, skipping transformations. Fix: only skip if `modelName !== tableName`.
