# open-fetch-87

Issue: https://github.com/enkot/nuxt-open-fetch/issues/87

## Problem

nuxt-open-fetch causes OOM during SSR build with large OpenAPI schemas. Vite parses the generated type files even though they're only used for TypeScript checking.

## Verify

```bash
pnpm i && pnpm build
```

## Expected

Build succeeds with default Node memory.

## Actual

```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

Or requires `NODE_OPTIONS=--max-old-space-size=6144` to build.
