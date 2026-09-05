# nuxt-31575

Issue: https://github.com/nuxt/nuxt/issues/31575

## Problem
EMFILE error when project has `vendor` folder with many files (PHP/Composer projects).

## Verify
```bash
pnpm i && pnpm dev
```

## Expected
Dev server starts normally.

## Actual
Crashes with `EMFILE: too many open files, watch`.
