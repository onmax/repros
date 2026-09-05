# nuxthub-hyperdrive-db-intermittent

Minimal repro for intermittent raw `@nuxthub/db` failures when using PostgreSQL over Cloudflare Hyperdrive.

## What it includes

- Nuxt 4.4.2
- `@nuxthub/core` 0.10.7
- PostgreSQL + `postgres-js`
- Hyperdrive binding `POSTGRES`
- one API route: [`server/api/db-check.get.ts`](./server/api/db-check.get.ts)
- one page that loops the DB check repeatedly

## Local

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` or whichever port Nuxt selects.

## Build

```bash
pnpm build
```

## Deploy

```bash
wrangler deploy --config wrangler.jsonc
```
