# Issue #38: Client-only support

## Problem
Module requires `server/auth.config.ts` even when using an external Better Auth backend.

## Reproduce
```bash
pnpm install
pnpm dev
```

## Expected
Module should allow client-only mode for external auth backends.

## Actual
```
ERROR [nuxt-better-auth] Missing server/auth.config.ts - create with defineServerAuth()
```
