# nuxthub-711-fixed

Issue: https://github.com/nuxt-hub/core/issues/711

## Problem

`nodeCompat = false` in `@nuxthub/core` breaks Node.js crypto APIs on Cloudflare Workers.

## Fix

This folder uses a [pnpm patch](https://pnpm.io/cli/patch) that changes `nodeCompat = false` to `nodeCompat = true` in `dist/module.mjs`.

## Verify

```bash
pnpm i && pnpm build
```

The build should succeed with `node:crypto` marked as external (handled by Cloudflare's `nodejs_compat` at runtime).
