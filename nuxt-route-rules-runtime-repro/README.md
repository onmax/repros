# nuxt-route-rules-runtime-repro

Local-only runtime reproduction harness for:

`Cannot find module '#build/route-rules.mjs'` imported from `nuxt/dist/app/composables/manifest.js`

## Valid Oracle

A run is considered a valid reproduction only when both are present in logs:

1. `Cannot find module '#build/route-rules.mjs'`
2. importer path contains `nuxt/dist/app/composables/manifest.js`

Missing files on disk (including `.nuxt/route-rules.mjs`) are not part of the oracle.

## Commands

```bash
pnpm repro:clean
pnpm repro
pnpm repro:verify
pnpm repro:debug
```

## Minimal Harness Shape

- Root workspace package with `nuxt@4.3.1`, `vitest`, `@nuxt/test-utils`.
- `docs/package.json` with `nuxt@4.2.2` (dependency-shape anchor).
- `playground/package.json` with `nuxt@4.3.1` (dependency-shape anchor).
- One fixture app: `test/fixtures/plain`.
- One test file: `test/route-rules.repro.test.ts`.
- One runner: `tools/repro.mjs` (clean, run, verify, debug).

## Expected Failing Snippet

```text
Cannot find module '#build/route-rules.mjs' imported from '.../nuxt/dist/app/composables/manifest.js'
```

## Notes

- Local-only by design.
- `repro:verify` is the gate (3/3 required).
- For a low-noise manual variant, see `../nuxt-route-rules-runtime-repro-dev`.
