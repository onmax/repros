# content-3669-fixed

Issue: https://github.com/nuxt/content/issues/3669

## Problem

Nuxt Content dev server startup is slow due to individual SQL queries not being batched in a transaction. Each query triggers an implicit commit with fsync, causing ~3.8 seconds delay for 323 queries.

## Verify

```bash
pnpm i && pnpm dev
```

Watch for the `[@nuxt/content]` log showing processing time.

## Expected

Processing 8 collections and 109 files in ~200ms

## Fix

The patch wraps all SQL INSERT statements in a single transaction (BEGIN/COMMIT) for SQLite databases. This batches all disk writes into a single fsync, resulting in ~75x speedup.

Changes:
1. Added `supportsTransactions` property to `getLocalDatabase` return value
2. Wrapped SQL execution in `processCollectionItems` with transaction when supported
3. Added proper error handling with ROLLBACK on failure

D1 databases don't support transactions, so they're skipped.

## Benchmark

This repro simulates a real-world setup similar to nimiq.com with:
- 8 collections with Zod schemas
- 100 blog posts
- 4 pages
- 3 docs
- 2 changelog entries
- 1 data file (YAML)

Total: 109 content files
