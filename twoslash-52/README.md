# twoslash-52

Issue: [nuxt-modules/better-auth#52](https://github.com/nuxt-modules/better-auth/pull/52)

## Problem

`nuxt-content-twoslash@0.3.0` ships `dist/runtime/mdc-config.js` as ESM, but it still calls `require('unist-util-visit')` inside the rehype hook. That breaks as soon as the runtime path is executed in an ESM context.

## Verify

```bash
pnpm i && pnpm verify
```

## Expected

The Twoslash MDC runtime loads and the rehype hook rewrites the code fence metadata.

## Actual

The verifier throws from the package runtime:

```txt
ReferenceError: Cannot determine intended module format because both require() and top-level await are present.
```
