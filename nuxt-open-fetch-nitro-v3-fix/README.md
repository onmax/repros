# nuxt-open-fetch 0.13.9 fails to build on Nitro v3

Nuxt 4.7.0 uses Nitro v3 when `nitro` is installed. With `nuxt-open-fetch@0.13.9`, `nuxt build` then fails:

```
[MISSING_EXPORT] "OpenFetchClient" is not exported by ".../nuxt-open-fetch/dist/runtime/fetch.js".
```

0.13.9 registers `OpenFetchClient` as a server auto-import with `addServerImports`, but `OpenFetchClient` is a type. The generated server imports module re-exports a value that doesn't exist, and Nitro v3's rolldown build rejects it. Without the `nitro` package (Nitro v2), the same app builds.

Upstream `main` already registers it with `type: true` (Norbiros/nuxt-open-fetch#140), but no release includes it yet.

## Run

```bash
git clone --depth 1 --branch repro/nuxt-open-fetch-nitro-v3 https://github.com/onmax/repros.git
cd repros/nuxt-open-fetch-nitro-v3
pnpm install && pnpm verify     # fails: MISSING_EXPORT
cd ../nuxt-open-fetch-nitro-v3-fix
pnpm install && pnpm verify     # passes
```

`verify.mjs` runs `nuxt build`, starts `.output/server/index.mjs`, and calls `/api/client`, which checks that the module's Nitro plugin installed a working `$api` client. It expects:

```
GET /api/client -> {"client":"function","report":{"ok":true}}
```

## Versions

- `nuxt` 4.7.0
- `nitro` 3.0.261103-rc (opts the app into Nitro v3)
- `nuxt-open-fetch` 0.13.9
- Node 24, pnpm 10.33.0

## Fixtures

- `nuxt-open-fetch-nitro-v3/`: unpatched 0.13.9. Build fails.
- `nuxt-open-fetch-nitro-v3-fix/`: the same app with `patches/nuxt-open-fetch@0.13.9.patch`, which adds `type: true` to the `OpenFetchClient` server import. Build and server check pass.

The OpenAPI schema and the `api` client exist so the module generates a client and the Nitro plugin has something to install. The server routes only serve the runtime check.
