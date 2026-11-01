# Fixed control for nuxt-36795

Same app and same `verify.mjs` as [`../nuxt-36795`](../nuxt-36795), plus a `pnpm patch` on `@nuxt/vite-builder-nightly@5.0.0-2611010234-c709ec8`. The patch makes `nuxt:resolve-externals` resolve an absolute import of a package entry, like the one in `paths.mjs`, the same way as the bare package name.

```sh
pnpm install
pnpm verify
```

```
ufo in .output/server, plain build:  [ '_libs/_nuxt/nitro-server.mjs' ]
ufo in .output/server, SLOW=1 build: [ '_libs/_nuxt/nitro-server.mjs' ]
PASS: same output in both orders
```
