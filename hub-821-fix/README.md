# hub-821-fix

Issue: https://github.com/nuxt-hub/core/issues/821
Fix: https://github.com/nuxt-hub/core/pull/823

## Problem
`@nuxthub/core@0.10.6` + Vite 8 throws warnings/errors during schema type generation due to tsdown/rolldown API mismatch.

## Fix
PR #823 fixes this in `@nuxthub/core` by:
- Bumping `tsdown` to `^0.20.3`
- Generating a dedicated `.nuxt/hub/db/tsconfig.json` for schema type generation
- Stripping invalid `debug` key from rolldown input options
- Auto-creating tsconfig fallback for direct callers (CLI, tests)

**Workaround** until fix ships: override tsdown via pnpm:
```json
"pnpm": {
  "overrides": {
    "tsdown": "^0.20.3"
  }
}
```

## Verify
```bash
pnpm i && pnpm prepare
```

## Expected
`nuxt prepare` succeeds without warnings about invalid rolldown options.

## Actual
Types generated successfully with full declaration types.
