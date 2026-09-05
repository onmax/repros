# Nuxt 32439 - Query Params Hydration Bug (FIXED)

## Problem
Prerendered pages don't apply reactive bindings (:class, :style) based on query params on initial load.

## Fix Applied
Added routeVersion ref in route-provider.ts to force getter re-evaluation during hydration.

## Verify
```bash
pnpm i && nr generate && nr preview
```

Open http://localhost:3000?preview=true

## Expected & Actual
Red background (preview-mode class applied correctly)
