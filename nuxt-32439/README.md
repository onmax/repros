# Nuxt 32439 - Query Params Hydration Bug

## Problem
Prerendered pages don't apply reactive bindings (:class, :style) based on query params on initial load.

## Verify
```bash
pnpm i && nr generate && nr preview
```

Open http://localhost:3000?preview=true

## Expected
Red background (preview-mode class applied)

## Actual
Blue background (normal-mode class applied, query param not reactive)
