# nuxthub-805

Issue: https://github.com/nuxt-hub/core/issues/805

## Problem

When `driver: 'd1'` is set explicitly, Drizzle Studio from devtools creates empty `.data/db/sqlite.db` instead of using wrangler's D1 database.

## Verify

```bash
pnpm i && pnpm dev
```

1. Insert data: `curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com"}'`
2. Verify via API: `curl http://localhost:3000/api/users` (returns data)
3. Open DevTools → Hub → Database → Launch Drizzle Studio
4. Studio shows empty database (wrong file)

## Expected

Drizzle Studio should show the D1 database at `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite`

## Actual

Studio creates/uses empty `.data/db/sqlite.db`
