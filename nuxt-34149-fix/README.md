# nuxt-34149-fix

Issue: https://github.com/nuxt/nuxt/issues/34149

## Problem

`Maximum call stack size exceeded` at `useHead` in `composables.js:31` with Bun/pnpm on Nuxt 4.3.0.

## Verify

```bash
pnpm i && pnpm dev
```

Then access http://localhost:3000

## Expected

Page renders normally (no stack overflow).

## Fix

Added regex pattern to exclude `node_modules/nuxt/dist/head/runtime/` from `UnheadImportsPlugin` transform.

This prevents the plugin from transforming Nuxt's own head composables, which would create an infinite import loop.

```js
const NUXT_HEAD_RE = /node_modules[/\\]nuxt[/\\]dist[/\\]head[/\\]runtime[/\\]/;
// Added to transformInclude: && !NUXT_HEAD_RE.test(id)
```

Uses [pnpm patch](https://pnpm.io/cli/patch) to apply the fix locally.
