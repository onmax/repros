# scripts-devalue-use

## Problem

`useRegistryScript` in `@nuxt/scripts` mutates `runtimeConfig.public.scripts.<key>.scriptOptions` via `Object.assign`, injecting the registry's `use()` function into it. When Nuxt serializes the payload, devalue throws `Cannot stringify a function`.

Affects any registry script that defines `scriptOptions.use()` (e.g. Matomo, Google Tag Manager) when `scriptOptions` is also set in nuxt.config.

## Verify

```bash
pnpm i && pnpm dev
# Visit http://localhost:3000 → 500 "Cannot stringify a function"
```

## Expected

Page renders normally.

## Actual

500 error: `Cannot stringify a function` at `runtimeConfig.public.scripts.matomoAnalytics.scriptOptions.use`.
