# nuxt-route-rules-ci-repro

Local-only runtime reproduction harness for:

`Cannot find module '#build/route-rules.mjs'` imported from `nuxt/dist/app/composables/manifest.js`

This repository no longer treats "file exists on disk" as the reproduction oracle.

## Valid Oracle

A run is considered a valid reproduction only when both are present in logs:

1. `Cannot find module '#build/route-rules.mjs'`
2. importer path contains `nuxt/dist/app/composables/manifest.js`

Anything else (including missing `.nuxt/route-rules.mjs` on disk) is non-authoritative.

## Commands

```bash
# remove local build artifacts and repro logs
pnpm repro:clean

# single attempt (fails if the oracle is not matched)
pnpm repro

# run 3 attempts; all 3 must match oracle
pnpm repro:verify

# print environment diagnostics + run one attempt + show first relevant stack block
pnpm repro:debug
```

## Current Harness

- Runtime harness uses `vitest` + `@nuxt/test-utils/e2e` with `setup({ dev: true })`.
- Test root is `test/fixtures/plain` (minimal Nuxt app with no route rules and no extra modules).
- Workspace includes `docs/` (`nuxt@4.2.2`) and `playground/` (`nuxt@4.3.1`) to preserve the local dependency shape seen in failing environments.
- Each attempt runs `nuxt-module-build prepare` before Vitest.
- `tools/repro.mjs` captures logs and enforces the oracle.

## Expected Failing Snippet

```text
Cannot find module '#build/route-rules.mjs' imported from '.../nuxt/dist/app/composables/manifest.js'
```

## Notes

- This is local-only by design: no CI/GitHub integration required.
- The verifier intentionally rejects unrelated failures (for example port errors without the route-rules signature).
