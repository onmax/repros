# safe-runtime-config-eslint-fixed

## Problem
Default export only includes plugin object but @nuxt/eslint expects `safeRuntimeConfig.configs.recommended`

## Verify
```bash
pnpm i && pnpm prepare && pnpm lint
```

## Expected
Lint should warn on useRuntimeConfig() usage

## Actual (with fix)
```
warning  Use useSafeRuntimeConfig() for type-safe runtime config  safe-runtime-config/prefer-safe-runtime-config
```

## Fix
Change `export { configs, plugin as default }` to `export default { ...plugin, configs }` so default export includes configs property
