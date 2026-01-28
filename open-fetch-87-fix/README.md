# open-fetch-87-fix

Issue: https://github.com/enkot/nuxt-open-fetch/issues/87

## Fix

Adds Vite plugin to stub schema imports during SSR bundling. Types are only needed for TypeScript checking, not runtime.

## Verify

```bash
pnpm i && pnpm build
```

## Expected

Build succeeds with default Node memory (no `--max-old-space-size` needed).
