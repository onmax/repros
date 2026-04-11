# nuxthub-866

Issue: [nuxt-hub/core#866](https://github.com/nuxt-hub/core/issues/866)

## Problem

Minimal project with one schema in the app root and one schema in a local `layers/` Nuxt layer. The verification builds with `NITRO_PRESET=cloudflare-module` and checks whether the generated `@nuxthub/db` package is copied into `.output/server/node_modules`.

## Verify

```bash
pnpm i
pnpm verify
```

## Expected

`.output/server/node_modules/@nuxthub/db/schema.mjs` should exist and export both `rootUsers` and `layerPosts`.

## Actual

`@nuxthub/core@0.10.6` does not copy the generated `@nuxthub/db` package into `.output/server/node_modules` for this build, so `schema.mjs` is missing.
