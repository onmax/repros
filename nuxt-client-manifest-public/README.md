# Nuxt 5: the Vite client manifest ends up in the public output

A plain Nuxt 5 build writes Vite's client manifest to `.output/public/manifest.json`, so every deployment serves `/manifest.json` with the source path of every chunk. The server does not need the file: Nuxt already inlines the manifest into the server bundle.

Nuxt 4 removes the file after it reads it. On Nuxt 5 the default build (`experimental.nitroViteEnvironment`) reads the manifest from memory instead, and the file is never removed.

## Environment

- `nuxt-nightly` 5.0.0-2611161628-96caf0e (Nuxt main, 96caf0e), Node 24, Linux, pnpm 12

## Verify

```sh
pnpm install
pnpm verify
```

`verify.mjs` runs `nuxt build` and exits 1 when `.output/public/manifest.json` exists.

```
FAIL: .output/public/manifest.json is in the public output, with 5 entries: [ ... ]
```

Expected: no `manifest.json` in `.output/public`, as on Nuxt 4.

## Cause

`ClientManifestPlugin` in `packages/vite/src/plugins/client-manifest.ts` copies the manifest from the client bundle in `generateBundle`, but leaves the asset in the bundle, so Vite writes it to the client `outDir` and Nitro copies it into `.output/public`. The legacy path removes it with `rm(manifestFile)`; the environment API path has no matching step.

Fix branch: https://github.com/onmax/nuxt/tree/fix/client-manifest-public
