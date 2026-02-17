# nuxt-34346

Issue: https://github.com/nuxt/nuxt/issues/34346

## Problem
`#build/route-rules.mjs` can fail to resolve if it is imported while its VFS entry is temporarily unavailable.

This repro forces that condition by deleting the route-rules template from `nuxt.vfs` during template generation.

## Verify
```bash
pnpm i && pnpm verify
```

## Expected
Nuxt should keep serving the app without failing module resolution for `#build/route-rules.mjs`.

## Actual
Dev server request fails with:

```text
Cannot find module '#build/route-rules.mjs'
```
