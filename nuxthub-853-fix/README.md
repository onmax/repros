# nuxthub-853-fix

Issue: [nuxt-hub/core#853](https://github.com/nuxt-hub/core/issues/853)

## Problem
In a Nuxt layer using the default `.playground` pattern, NuxtHub materializes `@nuxthub/db` inside `.playground/node_modules` instead of the layer root `node_modules`. Standard Node resolution from the layer root cannot import `@nuxthub/db`.

## Verify
```bash
pnpm i
pnpm build
ls -la node_modules/@nuxthub/db
node -e "import('@nuxthub/db').then(()=>console.log('ok'))"
```

## Expected
`@nuxthub/db` is generated in the layer root `node_modules`, and importing it from the layer root works.

## Actual
With the patch applied, `node_modules/@nuxthub/db` exists at the layer root and root-level import succeeds.

## Fix
Patched `@nuxthub/core@0.10.6` to resolve the physical shim output directory from the nearest `package.json` (package root) instead of always using `nuxt.options.rootDir`.
