# hub-821-fix

Issue: https://github.com/nuxt-hub/core/issues/821

## Problem
`@nuxthub/core@0.10.6` + Vite 8 throws warnings/errors during schema type generation due to tsdown/rolldown API mismatch.

## Fix
Upgrade tsdown from ^0.18.1 to ^0.20.0 via pnpm override:

```json
"pnpm": {
  "overrides": {
    "tsdown": "^0.20.3"
  }
}
```

The proper fix should be applied in @nuxthub/core's package.json to update the tsdown dependency.

## Verify
```bash
pnpm i && pnpm prepare
```

## Expected
`nuxt prepare` succeeds without warnings about invalid rolldown options.

## Actual
✅ Types generated successfully with full declaration types.
