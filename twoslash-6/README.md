# twoslash-6

Issue: https://github.com/antfu/nuxt-content-twoslash/issues/6

## Problem

Twoslash stops working with Nuxt Content v3. The module uses `import.meta.server` which is undefined in Node.js context where Content v3 runs parsing.

## Verify

```bash
pnpm i && pnpm build
```

## Expected

Build succeeds with twoslash type hints rendered in code blocks.

## Actual

Build fails or twoslash is silently skipped because `import.meta.server` is undefined.
