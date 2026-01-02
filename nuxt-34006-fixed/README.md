# nuxt-34006-fixed

Issue: https://github.com/nuxt/nuxt/issues/34006

## Problem

`useCookie` parses scientific-notation-like string values (like tokens/IDs) into Numbers, returning `Infinity` when they exceed JS limits.

## Verify

```bash
pnpm i
pnpm dev
# Visit http://localhost:3000/set-cookies to set test cookies
# Visit http://localhost:3000 to see the fix works
```

## Expected

- `userAccessKey` cookie with value `4e71375682906041` → string `"4e71375682906041"`
- `largeNumber` cookie with value `9007199254740993` → string `"9007199254740993"`

## Actual (with fix)

Both values are now preserved as strings.

## Fix

The patch modifies the default `decode` function in `useCookie` to check for unsafe number parsing:
- If result is `Infinity`/`-Infinity`, keep original string
- If result has precision loss (`String(parsed) !== decoded`), keep original string

See `patches/nuxt.patch` for the exact change.
