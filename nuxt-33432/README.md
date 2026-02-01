# nuxt-33432

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

## Actual

SSR response shows: "Server Error" (message is stripped)

CSR navigation shows the correct message.
