# Docus MCP `get-page` Cloudflare repro fix

This is the fixed variant of the minimal Docus app that reproduces the Cloudflare Worker bug in Docus `get-page`.

## Verify

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

## Fix

This variant patches `docus@5.7.0` so `get-page` still derives URLs from the request origin, but reads page content from the Content DB body and serializes the `minimark` AST instead of self-fetching `/raw/*.md` from inside the worker.
