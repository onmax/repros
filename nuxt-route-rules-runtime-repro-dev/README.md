# nuxt-route-rules-runtime-repro-dev

Minimal manual dev-server reproduction for:

`Cannot find module '#build/route-rules.mjs'` imported from `nuxt/dist/app/composables/manifest.js`

## Command

```bash
pnpm install --frozen-lockfile
pnpm exec nuxi dev ./test/fixtures/plain
```

After server starts, hit the home route once (for example with curl or browser):

```bash
curl -i http://localhost:3000/
```

## Oracle

A valid reproduction is the runtime dev-server error containing both:

1. `Cannot find module '#build/route-rules.mjs'`
2. importer path includes `nuxt/dist/app/composables/manifest.js`

Disk materialization of `.nuxt/route-rules.mjs` is not part of this oracle.

## Why This Variant

This folder is intentionally minimal and interactive (no Vitest harness), for quick local confirmation with lower noise.

For deterministic CI-style verification, use:

- `../nuxt-route-rules-runtime-repro`
