# nuxt-34149-404-fix

Issue: https://github.com/nuxt/nuxt/issues/34149#issuecomment-3831492171

## Problem

404 errors on `/_nuxt/` endpoint logged as unhandled errors in terminal during dev.

## Fix

Changed `throw { status: 404 }` to `throw createError({ statusCode: 404 })` in vite-builder's dev-server plugin.

The plain object `{ status: 404 }` was not recognized as an H3Error by the CLI's error handler, causing it to be logged as "unhandled".

## Verify

```bash
pnpm i && pnpm dev
```

Then hit `/_nuxt/` - no error logged in terminal.

## Expected

No error logged - 404 is properly handled as H3Error.

## Actual (with patch)

Terminal shows no error. Request returns 404 response silently.
