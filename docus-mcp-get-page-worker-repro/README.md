# Docus MCP `get-page` Cloudflare repro

This is a minimal Docus app that reproduces the Cloudflare Worker regression in Docus `get-page` after switching MCP page URLs to the request origin.

## Repro

1. Install dependencies: `pnpm install`
2. Build for Cloudflare: `pnpm build`
3. Deploy: `wrangler deploy -c .output/server/wrangler.json`
4. Call the MCP tool:

```bash
curl -sS \
  -H 'accept: application/json, text/event-stream' \
  -H 'content-type: application/json' \
  -X POST https://<worker>.workers.dev/mcp \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get-page","arguments":{"path":"/test"}}}'
```

## Expected

`get-page` returns the full markdown body of `/test`.

## Actual

With the request-origin patch applied, `list-pages` works but `get-page` returns `Failed to get page` on the deployed worker.
