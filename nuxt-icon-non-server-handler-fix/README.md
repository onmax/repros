# Nuxt Icon non-server handler fix

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

The patched build succeeds without registering `/api/_nuxt_icon/:collection`.

## Fix

Register the local API handler only when `provider` is `server`.
