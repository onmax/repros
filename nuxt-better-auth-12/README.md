# nuxt-better-auth-12

Issue: https://github.com/onmax/nuxt-better-auth/issues/12

## Problem

1. `usePlural: true` in `betterAuth` config is ignored - table names remain singular
2. `casing: 'snake_case'` from `hub.db` config is not applied - field/table names remain camelCase

## Verify

```bash
pnpm install
pnpm dev
```

Check generated schema in `.nuxt/db/schema.ts`:

**Expected:**
- Table names: `users`, `sessions`, `accounts`, `verifications` (plural + snake_case)
- Field names: `email_verified`, `created_at`, `updated_at` (snake_case)

**Actual:**
- Table names: `user`, `session`, `account`, `verification` (singular)
- Field names: `emailVerified`, `createdAt`, `updatedAt` (camelCase)

## Root Cause

Better-auth sets `modelName` equal to `tableName` by default on every table. The condition `!table.modelName` in schema generator always fails, skipping `usePlural` and `casing` transformations.
