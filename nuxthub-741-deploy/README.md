# nuxthub-741-fixed

Issue: https://github.com/nuxt-hub/core/issues/741

## Fix

This version includes a pnpm patch for `@nuxthub/core` that:

1. **D1 driver** - Skips Promise-based `__env__` when looking for bindings
2. **Migrations plugin** - Awaits `globalThis.__env__` Promise before accessing `hub:db`

See `patches/@nuxthub__core.patch` for the diff.

## Root Cause

`nitro-cloudflare-dev` sets `globalThis.__env__` as a Promise initially. NuxtHub's D1 driver accesses `globalThis.__env__?.DB` synchronously, which fails because the Promise object doesn't have a `DB` property.

## Verify

```bash
pnpm i
pnpm dev
# Open http://localhost:3000/api/test
```

Returns `{ ok: true }` - D1 binding found and working.
