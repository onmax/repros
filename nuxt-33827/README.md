# nuxt-33827

Issue: https://github.com/nuxt/nuxt/issues/33827

## Problem

`builder:watch` hook fires for `app/` changes but NOT `server/` changes.

## Verify

```bash
pnpm i && pnpm dev
```

Then:
1. Modify `app/app.vue` → `[builder:watch]` logs in console ✅
2. Modify `server/routes/test.ts` → No log ❌

## Expected

`builder:watch` should fire for both app/ and server/ file changes.

## Actual

Only fires for app/ changes. Server/ changes are ignored.
