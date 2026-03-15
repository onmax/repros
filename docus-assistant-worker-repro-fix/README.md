# docus-assistant-worker-repro-fix

## Verify

1. `pnpm install`
2. `pnpm build`
3. `wrangler deploy -c .output/server/wrangler.json`
4. Set secret: `wrangler secret put AI_GATEWAY_API_KEY --name docus-assistant-repro-fix`

```bash
curl -X POST https://docus-assistant-repro-fix.je-cf9.workers.dev/__docus__/assistant \
  -H 'content-type: application/json' \
  -d '{"id":"t","messages":[{"parts":[{"type":"text","text":"hello"}],"id":"t1","role":"user"}],"trigger":"submit-message"}'
```

## Expected

200 streaming AI response.

## Fix

The patch creates a custom MCP transport that uses `event.fetch` (Nitro's `localFetch`) instead of `event.$fetch` (which maps to `globalThis.$fetch` → `fetch()` → CF self-fetch error 1042).

On CF Workers:
- `event.fetch` → `useNitroApp().localFetch` (internal routing, no HTTP)
- `event.$fetch` → `globalThis.$fetch` → `fetch()` (external HTTP, blocked by CF)
