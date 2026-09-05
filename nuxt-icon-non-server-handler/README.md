# Nuxt Icon non-server handler reproduction

Issue: not opened

## Problem

`@nuxt/icon` registers its local API handler when the configured provider is `iconify` and `serverBundle` is disabled.

## Verify

```bash
pnpm i && pnpm repro
```

## Expected

The build succeeds because this configuration does not use the local server provider.

## Actual

With `@nuxt/icon@2.4.1`, the build stops with:

```text
@nuxt/icon registered /api/_nuxt_icon/:collection with provider="iconify" and serverBundle=false
```

`pnpm build` runs the same application without the assertion harness.
