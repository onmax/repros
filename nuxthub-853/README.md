# nuxthub-853

Issue: [nuxt-hub/core#853](https://github.com/nuxt-hub/core/issues/853)

## Problem
In a Nuxt layer using the default `.playground` pattern, NuxtHub materializes `@nuxthub/db` inside `.playground/node_modules` instead of the layer root `node_modules`. Standard Node resolution from the layer root cannot import `@nuxthub/db`.

## Verify
```bash
pnpm i
pnpm build
ls -la .playground/node_modules/@nuxthub/db
node -e "import('@nuxthub/db').catch((e)=>{console.error(e.code, e.message); process.exit(1)})"
```

## Expected
`@nuxthub/db` is generated in the layer root `node_modules`, and importing it from the layer root works.

## Actual
`@nuxthub/db` is generated under `.playground/node_modules/@nuxthub/db`, while `node_modules/@nuxthub/db` is missing in the layer root. Importing `@nuxthub/db` from the layer root fails with `ERR_MODULE_NOT_FOUND`.
