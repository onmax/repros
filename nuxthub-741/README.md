# nuxthub-741

Issue: https://github.com/nuxt-hub/core/issues/741

## Problem

NuxtHub's D1 driver can't find bindings during startup when using `nitro-cloudflare-dev`.

`nitro-cloudflare-dev` sets `globalThis.__env__` as a Promise initially. NuxtHub looks for:
```javascript
process.env.DB || globalThis.__env__?.DB || globalThis.DB
```

When `__env__` is a Promise, `__env__?.DB` is undefined (Promises don't have a DB property).

## Verify

```bash
pnpm i
pnpm dev
```

Check console output - migrations plugin fails:
```
[nuxt:hub] ERROR Failed to create migrations table
DB binding not found
```

Note: Later HTTP requests may work because the Promise resolves eventually. The bug affects startup/migrations.

## See Also

- `../nuxthub-741-fixed` - Same repro with pnpm patch that fixes the issue
