# nuxt-34006

Issue: https://github.com/nuxt/nuxt/issues/34006

## Problem

`useCookie` parses scientific-notation-like string values (like tokens/IDs) into Numbers, returning `Infinity` when they exceed JS limits.

## Verify

```bash
pnpm i
pnpm dev
# Visit http://localhost:3000/set-cookies to set test cookies
# Visit http://localhost:3000 to see the bug
```

## Expected

- `userAccessKey` cookie with value `4e71375682906041` → string `"4e71375682906041"`
- `largeNumber` cookie with value `9007199254740993` → string `"9007199254740993"`

## Actual

- `userAccessKey` → `Infinity` (parsed as scientific notation 4×10^71375682906041)
- `largeNumber` → `9007199254740992` (precision loss)
