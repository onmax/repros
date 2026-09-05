# hub-821

Issue: https://github.com/nuxt-hub/core/issues/821
Fix: https://github.com/nuxt-hub/core/pull/823

## Problem
`@nuxthub/core@0.10.6` + Vite 8 (with rolldown) throws warnings/errors during `nuxt prepare` when generating database schema types.

Two failure modes:
- rolldown validation warning about unsupported `debug` input option (tsdown/rolldown API drift)
- Fatal `[TSCONFIG_ERROR]` when schema types are emitted without a resolvable tsconfig

## Verify
```bash
pnpm i && pnpm prepare
```

## Expected
`nuxt prepare` generates types without warnings.

## Actual
```
WARN Warning: Invalid input options (1 issue found)
- For the "debug". Invalid key: Expected never but received "debug".

WARN [rolldown-plugin-dts] Warning: Failed to emit declaration file.
```
