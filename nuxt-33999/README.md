# nuxt-33999

Issue: https://github.com/nuxt/nuxt/issues/33999

## Problem
`buildId` uses `randomUUID()` for each production build, causing:
1. buildId changes on every run even without source changes
2. When combined with caching (Vite cache, experimental.buildCache), can cause mismatches between manifest and HTML

## Verify
```bash
pnpm install
pnpm generate
cat .output/public/_nuxt/builds/latest.json  # Note buildId
pnpm generate  # Run again without changes
cat .output/public/_nuxt/builds/latest.json  # Different buildId!
```

## Expected
Same source = same buildId (deterministic builds)

## Actual
buildId changes on every run (random UUID), potentially causing 404 errors when caches are involved.
