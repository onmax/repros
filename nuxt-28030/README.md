# nuxt-28030

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

Type checking reports two TS2339 errors because `message` is missing from the inferred `useFetch` and `useAsyncData` results.
