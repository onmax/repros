# docus-assistant-worker-repro

## Problem

Docus assistant (`/__docus__/assistant`) fails with 500 on Cloudflare Workers because the handler creates an MCP client that self-fetches `/mcp` on the same worker. CF Workers block self-fetch with error 1042.

## Repro

1. `pnpm install`
2. `pnpm build`
3. Create D1 database: `wrangler d1 create docus-assistant-repro-db`
4. `wrangler deploy -c .output/server/wrangler.json`
5. Set secret: `wrangler secret put AI_GATEWAY_API_KEY --name docus-assistant-repro`

```bash
curl -X POST https://docus-assistant-repro.je-cf9.workers.dev/__docus__/assistant \
  -H 'content-type: application/json' \
  -d '{"id":"t","messages":[{"parts":[{"type":"text","text":"hello"}],"id":"t1","role":"user"}],"trigger":"submit-message"}'
```

## Expected

200 streaming AI response.

## Actual

500 with error: `MCP HTTP Transport Error: POSTing to endpoint (HTTP 404): error code: 1042. This server does not support HTTP transport.`
