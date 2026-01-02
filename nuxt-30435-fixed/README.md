# nuxt-30435-fixed

Issue: https://github.com/nuxt/nuxt/issues/30435
PR: https://github.com/nuxt/nuxt/pull/34008

## Problem

CSS duplication when using `inlineStyles` function. Entry CSS linked even when function returns true.

## Fix

Test entry path against `shouldInline` function when it's a function. Only clear entry CSS if function returns true for entry.

```ts
const shouldClearCSS = shouldInline === true ||
  (typeof shouldInline === "function" && shouldInline(entry));
```

## Verify

```bash
pnpm i && pnpm generate
cat .output/public/index.html | grep -oE '(<style[^>]*>|<link[^>]*stylesheet[^>]*>)'
```

## Expected

Only inline `<style>` tags.

## Actual (with fix)

Only `<style>` tags present - no CSS link duplication.
