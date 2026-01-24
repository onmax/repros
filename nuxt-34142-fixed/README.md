# nuxt-34142-fixed

Issue: https://github.com/nuxt/nuxt/issues/34142

## Problem
`defineAppConfig is not defined` error when using `compatibilityVersion: 5`

## Verify
```bash
pnpm i && pnpm dev
```

## Expected
App renders NuxtWelcome without error

## Actual (with fix)
✅ Works - app renders correctly

## Fix
Patch provides essential imports (`defineAppConfig`, `buildAssetsURL`, `publicAssetsURL`) even when `nitroAutoImports` is disabled by `compatibilityVersion: 5`.

