# nuxt-33999-fixed

Issue: https://github.com/nuxt/nuxt/issues/33999

## Problem
`buildId` uses `randomUUID()` on every production build. Even with unchanged source, each `nuxt generate` creates a new buildId, causing CDN cache invalidation issues.

## Fix
Cache manifest files (`latest.json`, `meta/{buildId}.json`) alongside the Vue build cache. When cache hits, restore both the build AND the manifest with original buildId.

Changes:
1. Move cache collection from `nitro:build:before` to `build:done` (after manifest is created)
2. Cache manifest files and buildId alongside Vue build
3. Restore manifest files and buildId when cache is restored

## Verify
```bash
pnpm i
pnpm generate
cat .output/public/_nuxt/builds/latest.json  # Note buildId

# Run again - should use cache and preserve buildId
pnpm generate
cat .output/public/_nuxt/builds/latest.json  # Same buildId!
```

## Requirements
Requires `experimental.buildCache: true` in nuxt.config (enabled in this repro).
