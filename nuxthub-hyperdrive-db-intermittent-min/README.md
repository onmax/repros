# nuxthub-hyperdrive-db-intermittent-min

Minimal repro for intermittent raw `@nuxthub/db` failures when NuxtHub PostgreSQL runs through Cloudflare Hyperdrive on a deployed Worker.

## Minimal contents

- Nuxt 4.4.2
- `@nuxthub/core` 0.10.7
- PostgreSQL + `postgres-js`
- one Hyperdrive binding: `POSTGRES`
- one route: [`server/api/db-check.get.ts`](./server/api/db-check.get.ts)
- one reproduction script: [`scripts/repro.sh`](./scripts/repro.sh)
- no Better Auth
- no browser UI

## Local

```bash
pnpm install
pnpm dev
curl http://localhost:<port>/api/db-check
bash ./scripts/repro.sh http://localhost:<port> 20
```

## Deploy

```bash
pnpm build
wrangler deploy --config wrangler.jsonc
```

## Reproduce

```bash
bash ./scripts/repro.sh https://<worker>.workers.dev 50
```

If that stays clean, rerun with `100` attempts and tail the Worker:

```bash
wrangler tail --config wrangler.jsonc
```

## Expected

- local requests are stable
- deployed requests should also stay stable

## Actual

- local requests stay stable
- deployed Worker requests can intermittently return `500`

## Notes

- This repro intentionally uses raw `@nuxthub/db`
- The same PostgreSQL origin is reused only to isolate the runtime path
