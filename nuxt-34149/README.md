# nuxt-34149

Issue: https://github.com/nuxt/nuxt/issues/34149

## Problem

`Maximum call stack size exceeded` at `useHead` in `composables.js:31` with Bun/pnpm on Nuxt 4.3.0.

## Verify

```bash
bun i && bun run dev
# or
pnpm i && pnpm dev
```

Then access http://localhost:3000

## Expected

Page renders normally.

## Actual

Server error with stack overflow:
```
RangeError: Maximum call stack size exceeded
  at useHead (node_modules/nuxt/dist/head/runtime/composables.js:31:44)
  at useHead (node_modules/nuxt/dist/head/runtime/composables.js:31:43)
  ...
```

## Root Cause

`UnheadImportsPlugin` transforms `@unhead/vue` imports in Nuxt's own `head/runtime/composables.js`.
This rewrites `headCore` (imported from `@unhead/vue`) to `#app/composables/head`, which re-exports
from `#unhead/composables` (same file) → infinite recursion.

The existing `distDir` exclusion uses path prefix matching that fails with pnpm/bun symlinks.

## Note

Bug may not reproduce on all systems - depends on package manager symlink behavior.
Confirmed on Windows with Bun 1.3.5/1.3.6 and pnpm on various systems.
