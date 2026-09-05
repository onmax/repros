# nuxt-better-auth-35

Issue: https://github.com/onmax/nuxt-better-auth/issues/35

## Problem

`serverAuth(event)` requires H3Event, making it impossible to use in:
- Nitro tasks (seeding)
- Nitro plugins
- CLI scripts

## Verify

```bash
pnpm i && pnpm dev
# Visit /_nitro/tasks and run db:seed
```

## Expected

Seed task should be able to call `serverAuth()` without an event.

## Actual

Cannot call `serverAuth` - requires H3Event which is not available in task context.
