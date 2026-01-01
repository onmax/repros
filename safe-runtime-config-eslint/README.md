# safe-runtime-config-eslint

## Problem
Default export only includes plugin object but @nuxt/eslint expects `safeRuntimeConfig.configs.recommended`

## Verify
```bash
pnpm i && pnpm prepare && pnpm lint
```

## Expected
Lint should warn on useRuntimeConfig() usage

## Actual
```
TypeError: Cannot read properties of undefined (reading 'recommended')
```
