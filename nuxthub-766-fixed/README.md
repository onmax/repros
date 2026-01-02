# nuxthub-766-fixed

Issue: https://github.com/nuxt-hub/core/issues/766

## Problem

When explicitly setting `driver: 'cloudflare-kv-binding'` in hub.kv config, `binding` defaults to `'STORAGE'` instead of `'KV'`.

## Verify

```bash
pnpm i && pnpm build
cat .nuxt/hub/kv.mjs
```

## Expected

Driver options should include `binding: 'KV'`:
```
driver({"binding":"KV"})
```

## Fix

Patch modifies `resolveKVConfig()` and `resolveCacheConfig()` in `dist/module.mjs` to merge default binding when driver is explicitly set to `cloudflare-kv-binding`.
