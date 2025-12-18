# nuxthub-716

Feature: https://github.com/nuxt-hub/core/pull/716

## What
Test auto-generate wrangler bindings from hub config. No local wrangler.toml needed.

## Setup
```bash
pnpm install
wrangler kv namespace create KV
# Update nuxt.config.ts with returned namespace ID
pnpm build
```

## Verify
After build, check `.output/wrangler.json` has:
```json
"kv_namespaces": [{ "binding": "KV", "id": "<your-id>" }]
```

## Deploy
```bash
wrangler deploy
```

## Test
- POST `/api/kv/mykey` with body `"myvalue"` - writes to KV
- GET `/api/kv/mykey` - reads from KV
