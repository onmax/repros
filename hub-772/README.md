# NuxtHub #772 - DevTools Database Panel Bug

## Problem
When `NITRO_PRESET=cloudflare-pages` is set, launching Drizzle Studio from DevTools fails with:
> Failed to launch Drizzle Studio: Cannot use 'in' operator to search for 'driver' in undefined

## Verify Bug
```bash
pnpm i
pnpm dev
# Open http://localhost:3000/__nuxt_devtools__/
# Navigate to "Database" tab → Click "Launch"
# Expected: Error "Cannot use 'in' operator..."
```

## Root Cause
In `@nuxthub/core/src/db/setup.ts`, when Cloudflare hosting is detected, the D1 driver is selected but `connection` is never set - causing undefined to be passed to drizzle-kit.
