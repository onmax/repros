# nuxt-better-auth-35-fixed

Issue: https://github.com/onmax/nuxt-better-auth/issues/35

## Problem

`serverAuth(event)` required H3Event, making it impossible to use in tasks/plugins.

## Fix

Removed event parameter. `serverAuth()` now returns a module-level singleton.

Changes:
- `serverAuth(event)` -> `serverAuth()` (no event, sync)
- `siteUrl` required in all environments

## Verify

```bash
pnpm i && pnpm dev
# Visit /_nitro/tasks and run db:seed
```

## Expected

Seed task runs successfully using `serverAuth()`.
