# Nuxt #36022 reproduction

Minimal reproduction for [nuxt/nuxt#36022](https://github.com/nuxt/nuxt/issues/36022). It uses the exact published Nuxt 5 nightly from the report and the Cloudflare module preset.

```sh
pnpm install
pnpm build

rg -n -F 'import.meta.url.replace(/\/app\/.*$/' \
  .output \
  --glob '*.js' \
  --glob '*.mjs' \
  --glob '!*.map'

rg -l 'getUserTrace|getUserCaller' \
  .output \
  --glob '*.js' \
  --glob '*.mjs' \
  --glob '!*.map'
```

The first search finds the discarded initializer in the final browser chunk and loaded SSR entry. The second search returns no files because the development-only helpers and the `distURL` binding were removed.

The build succeeds. This reproduction demonstrates production-bundle residue; it does not claim a workerd runtime failure.
