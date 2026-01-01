# nuxt-better-auth-17-fixed

Issue: https://github.com/onmax/nuxt-better-auth/pull/17

## Problem

When `secondaryStorage: true`, schema generation still creates session table.

## Fix

Pass `secondaryStorage` to `getAuthTables()` in `src/module.ts`:

```typescript
const tables = getAuthTables({
  plugins,
  secondaryStorage: options.secondaryStorage
    ? { get: async () => null, set: async () => {}, delete: async () => {} }
    : undefined,
})
```

## Verify

```bash
pnpm install
pnpm build
cat .nuxt/better-auth/schema.sqlite.ts | grep "export const"
```

## Result

3 tables (no session):
```
export const user = sqliteTable('user', {
export const account = sqliteTable('account', {
export const verification = sqliteTable('verification', {
```
