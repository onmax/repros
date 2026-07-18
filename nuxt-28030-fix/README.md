# nuxt-28030-fix

Issue: https://github.com/nuxt/nuxt/issues/28030

## Problem

`useFetch` and `useAsyncData` lose the known fields of a generic response type.

## Verify

```bash
pnpm install && pnpm verify
```

## Expected

Type checking succeeds because `T extends Report` always has a `message` field.

## Actual

Type checking succeeds with the patched Nuxt declarations.

## Fix

The patch preserves the response type when the requested pick keys already include every possible response key.
