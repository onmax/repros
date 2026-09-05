# nuxt-34149-404

Issue: https://github.com/nuxt/nuxt/issues/34149#issuecomment-3831492171

## Problem

404 errors on `/_nuxt/` endpoint logged as unhandled errors in terminal during dev.

## Verify

```bash
pnpm i && pnpm dev
```

Then hit `http://localhost:3000/_nuxt/` - error appears in terminal.

## Expected

No error logged - 404 is expected behavior for directory listing.

## Actual

Terminal shows:
```
ERROR  [request error] [unhandled] [GET] http://localhost:3000/_nuxt/
createError (node_modules/@nuxt/cli/dist/dev-KB30iboK.mjs:54:14)
[CAUSE]
{ status: 404 }
```

## Root Cause

In `@nuxt/vite-builder` dev-server plugin, line throws `{ status: 404 }` (plain object) instead of an H3Error.
The CLI's error handler marks non-H3Error objects as "unhandled" and logs them.

## Notes

- App works fine despite errors
- Reported on macOS M1, Bun 1.3.7, Nuxt 4.3.0
