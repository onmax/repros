# nuxthub-766

Issue: https://github.com/nuxt-hub/core/issues/766

## Problem

When explicitly setting `driver: 'cloudflare-kv-binding'` in hub.kv config, `binding` defaults to `'STORAGE'` instead of `'KV'`.

## Verify

```bash
pnpm i && pnpm build
grep -o 'driver({[^}]*})' .output/server/chunks/nitro/nitro.mjs | head -3
```

## Expected

Driver options should include `binding: 'KV'`:
```
driver({"binding":"KV"})
```

## Actual

Driver options are empty:
```
driver({})
```

This causes runtime error: `[unstorage] [cloudflare] Invalid binding 'STORAGE': undefined`
