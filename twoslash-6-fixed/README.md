# twoslash-6-fixed

Issue: https://github.com/antfu/nuxt-content-twoslash/issues/6

## Problem

Twoslash stops working with Nuxt Content v3. The module uses `import.meta.server` which is undefined in Node.js context where Content v3 runs parsing.

## Verify

```bash
pnpm i && pnpm build
```

## Expected

Build succeeds with twoslash type hints rendered in code blocks.

## Actual (with fix)

Build succeeds.

## Fix

- Write config files immediately via `writeFileSync` before hooks fire
- Use `typeof window === 'undefined'` for server detection instead of `import.meta.server`
- Use `process.env.NODE_ENV === 'development'` instead of `import.meta.dev`
- Use relative imports between generated files in `.nuxt/`
