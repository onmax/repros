# hub-821

Issue: https://github.com/nuxt-hub/core/issues/821

## Problem
`@nuxthub/core@0.10.6` + Vite 8 (with rolldown) throws warnings/errors during `nuxt prepare` when generating database schema types.

The underlying cause is that tsdown@0.18.x (bundled with @nuxthub/core) was built for rolldown@beta.57 and passes options that don't exist in rolldown@rc.3+.

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

In some environments (GitHub Actions), this can escalate to a fatal error:
```
[TSCONFIG_ERROR] Error: Failed to load tsconfig for '.nuxt/hub/db/schema.entry.d.ts'
```
