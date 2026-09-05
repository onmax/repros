# nuxthub-870-fix

Issue: [nuxt-hub/core#870](https://github.com/nuxt-hub/core/issues/870)

## Problem
With Cloudflare bindings defined only in `nuxt.config.ts`, NuxtHub detects the intended Cloudflare drivers in development but Cloudflare dev emulation does not expose the `DB` binding. `pnpm dev` fails during migration table creation with `DB binding not found`.

This repro intentionally does not include a `wrangler.jsonc`.

## Verify
```bash
pnpm i && pnpm dev
```

## Expected
Bindings declared through `nitro.cloudflare.wrangler` and `hub` config should be available to the local Cloudflare dev emulator without requiring a physical `wrangler.jsonc` file.

## Actual
The dev server starts Cloudflare emulation, then fails with:

```text
[nuxt:hub] ERROR Failed to create migrations table
[nuxt-hub] DB binding not found
```

## Fix
Uses a `pnpm patch` for `@nuxthub/core@0.10.7` that:
- runs NuxtHub's Cloudflare setup in dev mode, not just build mode
- generates a dev-only `wrangler.json` in `.nuxt/` from `nitro.cloudflare.wrangler`
- points `nitro.cloudflare.dev.configPath` at that generated file

This makes Nitro's Cloudflare dev proxy load the same bindings defined in `nuxt.config.ts`, without requiring a handwritten `wrangler.jsonc` in the project root.
