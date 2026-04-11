# nuxthub-hyperdrive-db-intermittent-min-fix

Fixed variant of the minimal repro for intermittent raw `@nuxthub/db` failures over Cloudflare Hyperdrive on a deployed Worker.

## Verify

```bash
pnpm install
pnpm dev
curl http://localhost:<port>/api/db-check
bash ./scripts/repro.sh http://localhost:<port> 20
```

```bash
pnpm build
wrangler deploy --config wrangler.jsonc
bash ./scripts/repro.sh https://<worker>.workers.dev 50
```

## Expected
Local and deployed requests stay `200`.

## Actual
Local requests stay `200`.
Deployed requests stay `200`.

## Fix
Patch `@nuxthub/core@0.10.7` so the Cloudflare Hyperdrive `postgres-js` path does not reuse a module-global Drizzle client.
The generated `@nuxthub/db` proxy now creates a fresh Hyperdrive-backed client per access instead of caching `_db` across Worker requests.
