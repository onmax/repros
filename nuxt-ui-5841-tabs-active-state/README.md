# nuxt-ui-5841-tabs-active-state

Issue: [nuxt/ui#5841](https://github.com/nuxt/ui/issues/5841)

## Problem

`UTabs` keys tab triggers and tab content by render index. When the server renders only `Third` and the client hydrates with `First`, `Second`, and `Third` while `v-model` stays set to `third`, the wrong tab state is reused.

## Verify

```bash
pnpm install
pnpm dev
```

Open the local app and wait for the DOM state block to populate after hydration.

## Expected

Only `Third` is active after hydration.

## Actual

Two tabs become active after hydration:

- `First`
- `Third`
