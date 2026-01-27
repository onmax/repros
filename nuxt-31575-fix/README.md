# nuxt-31575-fix

Issue: https://github.com/nuxt/nuxt/issues/31575

## Problem
EMFILE error when project has `vendor` folder with many files (PHP/Composer projects).

## Verify
```bash
pnpm i && pnpm dev
```

## Expected
Dev server starts normally.

## Fix
Patch adds `.direnv` and `vendor` to default ignore patterns in @nuxt/schema.
