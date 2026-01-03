# nuxt-better-auth-33

Issue: https://github.com/onmax/nuxt-better-auth/issues/33

## Problem

When `secondaryStorage: true` is enabled, the generated `.nuxt/better-auth/secondary-storage.mjs` contains:

```javascript
import { kv } from 'hub:kv'
```

This causes an ESM loader error because `hub:kv` virtual module isn't available at module evaluation time.

## Verify

```bash
pnpm i && pnpm dev
```

Navigate to http://localhost:3000 and you'll see:

```
Error: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. Received protocol 'hub:'
```

## Expected

App loads without errors, using NuxtHub's auto-imported `kv`.

## Actual

ESM loader fails to import `hub:kv` virtual module.
