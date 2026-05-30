# nuxt-ui-5841-tabs-active-state-fix

Issue: [nuxt/ui#5841](https://github.com/nuxt/ui/issues/5841)

## Problem

Same hydration scenario as the bug repro, but this folder applies a local `pnpm patch` for `@nuxt/ui` so `UTabs` keys triggers and content by the resolved tab value instead of the render index.

## Verify

```bash
pnpm install
pnpm dev
```

Open the local app and wait for the DOM state block to populate after hydration.

## Expected

Only `Third` is active after hydration.

## Actual

Only `Third` is active after hydration.

## Fix

The patch updates `UTabs` to reuse the resolved tab value for both `:key` and `:value`, which preserves stable identity when items are inserted before the active tab.
