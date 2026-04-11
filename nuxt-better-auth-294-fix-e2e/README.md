# nuxt-better-auth-294-fix

Issue: [nuxt-modules/better-auth#294](https://github.com/nuxt-modules/better-auth/issues/294)

## Problem

This is the fixed variant of [`nuxt-better-auth-294`](/Users/maxi/repros/nuxt-better-auth-294). The original repro shows that direct `@nuxthub/db` access works through Hyperdrive, but Better Auth session or user lookups can still fail on the deployed Worker when the generated adapter goes through the default NuxtHub `db` proxy.

## Fix

Patch the published `@onmax/nuxt-better-auth@0.0.2-alpha.31` package in two places. First, database-backed auth requests no longer reuse the module-level Better Auth singleton, so Worker requests do not inherit a stale adapter instance. Second, the generated NuxtHub PostgreSQL adapter uses a fresh Hyperdrive-backed `postgres-js` client with `prepare: false` whenever the Cloudflare `POSTGRES` binding is present. The module still exports the standard `@nuxthub/db` path, but Better Auth now builds its Drizzle adapter from a worker-safe client instead of from the default proxy.

## Verify

```bash
pnpm install
pnpm typecheck
pnpm build
```

For runtime verification, use the same local and Cloudflare steps from the bug repro:

- local direct PostgreSQL should still pass
- deployed Worker with Hyperdrive should keep `/api/db-check` working
- repeated sign-up, sign-in, and authenticated session requests should no longer emit `Failed query: select ... from "session"` or `select ... from "user"` in `wrangler tail`

## Expected

- Local direct PostgreSQL still works for both the direct DB endpoint and Better Auth.
- On the deployed Worker, Better Auth session and user queries are stable across repeated authenticated requests.

## Actual (with patch)

- The package no longer routes Better Auth’s Hyperdrive PostgreSQL path through the default proxied NuxtHub client.
- The generated adapter uses a dedicated `postgres-js` client with `prepare: false` when the Hyperdrive binding is available.
