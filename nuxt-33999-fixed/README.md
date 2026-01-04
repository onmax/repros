# nuxt-33999-fixed

Issue: https://github.com/nuxt/nuxt/issues/33999

## Problem
`buildId` uses `randomUUID()` on every production build. Even with unchanged source, each `nuxt generate` creates a new buildId, causing CDN cache invalidation issues.

## Solution (Daniel Roe's approach)
Keep random buildId BUT include manifest files (`latest.json`, `meta/{buildId}.json`) in the build cache.

When `experimental.buildCache` hits:
1. Restore `.nuxt` directory (Vue build)
2. Restore manifest files from previous build
3. Restore original buildId to runtimeConfig

This ensures cached builds retain their original buildId.

## Implementation Status
Pending - requires changes to:
- `packages/nuxt/src/core/builder.ts` - move cache collection to after nitro
- `packages/nuxt/src/core/cache.ts` - include manifest + buildId in cache

## Workaround (current)
Enable build caching:
```typescript
export default defineNuxtConfig({
  experimental: { buildCache: true }
})
```

Note: Full fix requires Nuxt core changes to cache manifest files.
