# nuxt-open-fetch Nitro type repro

## Steps

```bash
pnpm install
pnpm prepare
pnpm typecheck
```

## Expected

`useNitroApp().$testApi` is typed automatically from `nuxt-open-fetch`.

## Actual

If the issue reproduces, `pnpm typecheck` reports that `$testApi` does not exist on `NitroApp` in `server/api/ping.get.ts`.

## Fix

Patch `nuxt-open-fetch` so the generated Nitro type template augments both `nitropack` and `nitropack/types`, which makes `useNitroApp().$testApi` visible during `nuxi typecheck`.
