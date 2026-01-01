# nuxt-better-auth-17

Issue: https://github.com/onmax/nuxt-better-auth/pull/17

## Problem

When `secondaryStorage: true`, schema generation still creates session table. Sessions should be stored in KV, not DB.

## Verify

```bash
pnpm install
pnpm build
cat .nuxt/better-auth/schema.sqlite.ts | grep -i "session"
```

## Expected

No session table (sessions stored in KV)

## Actual

Session table is generated:
```
export const session = sqliteTable('session', {
```
