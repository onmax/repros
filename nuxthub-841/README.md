# nuxthub-841

Issue: https://github.com/nuxt-hub/core/issues/841

## Problem

NuxtHub forces `driver: 'd1'` on Cloudflare production builds, ignoring user's explicit `driver: 'libsql'` + connection config (e.g. Turso with custom env vars).

## Verify

```bash
pnpm i && pnpm verify
```

## Expected

Build output (`.nuxt/hub/db.*.mjs`) should use `drizzle-orm/libsql`.

## Actual

Build output uses `drizzle-orm/d1` — the Cloudflare D1 override runs before the `userExplicitLibsql` check.
