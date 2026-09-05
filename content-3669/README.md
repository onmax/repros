# content-3669

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

## Actual

Processing takes ~3-4 seconds due to unbatched SQL execution.

## Benchmark

This repro simulates a real-world setup similar to nimiq.com with:
- 8 collections with Zod schemas
- 100 blog posts
- 4 pages
- 3 docs
- 2 changelog entries
- 1 data file (YAML)

Total: 109 content files
