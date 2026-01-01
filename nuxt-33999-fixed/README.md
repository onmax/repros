# nuxt-33999-fixed

Issue: https://github.com/nuxt/nuxt/issues/33999

## Fix
Override `buildId` in `initNuxt()` with content-based hash from `getVueHash()`.

This ensures:
- Same source = same buildId (deterministic)
- Different source = different buildId (correct invalidation)

## Verify
```bash
pnpm install
pnpm generate
cat .output/public/_nuxt/builds/latest.json  # Note buildId (hash-based)
pnpm generate  # Run again without changes
cat .output/public/_nuxt/builds/latest.json  # Same buildId!
```

The buildId now remains stable across builds when source is unchanged.
