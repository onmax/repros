# scripts-devalue-use-fix

## Problem

See [scripts-devalue-use](../scripts-devalue-use) for full description.

## Fix

Replace `Object.assign` with object spread in `useRegistryScript` (`dist/runtime/utils.js`):

```diff
- const scriptOptions = Object.assign(userOptions?.scriptOptions || {}, options.scriptOptions || {});
+ const scriptOptions = { ...userOptions?.scriptOptions, ...options.scriptOptions };
```

`Object.assign` mutates its first argument — which is the runtimeConfig reference. Spread creates a new object instead.

## Verify

```bash
pnpm i && pnpm dev
# Visit http://localhost:3000 → page renders
```
