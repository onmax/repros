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
