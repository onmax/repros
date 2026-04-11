# nuxthub-hyperdrive-db-intermittent-min

Minimal repro for intermittent raw `@nuxthub/db` failures over Cloudflare Hyperdrive on a deployed Worker.

Route: [`server/api/db-check.get.ts`](./server/api/db-check.get.ts)

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

If needed:

```bash
wrangler tail --config wrangler.jsonc
```

Expected: local and deployed requests stay `200`.
Actual: local stays clean; deployed requests intermittently return `500`.
