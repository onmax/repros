# nuxt-33827-fix

Issue: https://github.com/nuxt/nuxt/issues/33827

## Problem

`builder:watch` hook fires for `app/` changes but NOT `server/` changes.

## Verify

```bash
pnpm i && pnpm dev
```

Then:
1. Modify `app/app.vue` → `[builder:watch]` logs ✅
2. Modify `server/routes/test.ts` → `[builder:watch]` logs ✅

## Fix

Adds `dirs.server` to watched paths in `createWatcher()` and `resolvePathsToWatch()`.

See `patches/nuxt@4.3.0.patch` for the changes.
