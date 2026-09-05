# nuxt-33432-fix

Issue: https://github.com/nuxt/nuxt/issues/33432

## Problem

`createError()` with `fatal: true` shows the error message correctly in dev, but in production SSR it shows "Server Error" instead of the custom message.

## Verify

```bash
pnpm i && pnpm build && pnpm start
# Then visit http://localhost:3000/error
```

## Expected

SSR response shows: "Custom error message that should appear"

## Actual (with fix)

✅ SSR response now correctly shows: "Custom error message that should appear"

## Fix

The patch modifies `@nuxt/nitro-server`'s error handler to preserve the original `error.message` for fatal errors:

```diff
- errorObject.message ||= "Server Error";
+ errorObject.message = error.message || errorObject.message || "Server Error";
```

This ensures the original error message is used when available, falling back to what Nitro returned, and finally to "Server Error".
