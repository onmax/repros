# nuxt-better-auth-33-fixed

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

App now loads successfully without ESM loader errors.

## Expected

App loads without errors, using NuxtHub's auto-imported `kv`.

## Actual (Fixed)

✅ App loads successfully. The generated file uses NuxtHub's auto-import:

```javascript
export function createSecondaryStorage() {
  return {
    get: async (key) => kv.get(`_auth:${key}`),
    // kv is auto-imported by NuxtHub - no import statement needed
  }
}
```

## Fix

Removed the top-level `import { kv } from 'hub:kv'` statement from `secondaryStorageCode` in `src/module.ts`.

Since NuxtHub auto-imports `kv` on the server side (via `addServerImports`), no explicit import is needed.
