# hub-754: Failed to Prerender sql_dump.txt

## Problem
NuxtHub 0.10.4 + Nuxt Content 3.10.0 with `nitro.preset: 'static'` doesn't detect static preset correctly.

NuxtHub should block static presets (needs server runtime), but `nitro.preset: 'static'` bypasses the check.

## Verify
```bash
pnpm i && pnpm build
```

## Expected
Build should fail with clear error: "NuxtHub is not compatible with `nuxt generate`"

## Actual
Build proceeds without the static preset warning (check doesn't catch `nitro.preset: 'static'`)
