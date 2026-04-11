# nuxthub-866-fix

Issue: [nuxt-hub/core#866](https://github.com/nuxt-hub/core/issues/866)

## Problem

Minimal project with one schema in the app root and one schema in a local `layers/` Nuxt layer. The verification builds with `NITRO_PRESET=cloudflare-module` and checks whether the generated `@nuxthub/db` package is copied into `.output/server/node_modules`.

## Fix

Patch `@nuxthub/core@0.10.6` to bridge through `nitro:init` and copy the generated physical `node_modules/@nuxthub/db` package into `.output/server/node_modules/@nuxthub/db` on Nitro's `compiled` hook.

## Verify

```bash
pnpm i
pnpm verify
```

## Expected

`.output/server/node_modules/@nuxthub/db/schema.mjs` should exist and export both `rootUsers` and `layerPosts`.

## Actual (with patch)

PASS: `.output/server/node_modules/@nuxthub/db/schema.mjs` exists and exports both tables.
