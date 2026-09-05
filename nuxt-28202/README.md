# nuxt-28202

Issue: https://github.com/nuxt/nuxt/issues/28202

## Problem

An error passed as `cause` to `createError()` is missing from the error object received by `error.vue`.

## Verify

```bash
pnpm install && pnpm verify
```

## Expected

The verifier prints `HTTP 500; text/html;charset=utf-8; root cause` and `JSON 500; cause absent`, then exits successfully.

## Actual

The verifier prints `HTTP 500; text/html;charset=utf-8; missing` and exits with an assertion error before the JSON check.
