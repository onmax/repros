# nuxt-30435

Issue: https://github.com/nuxt/nuxt/issues/30435
PR: https://github.com/nuxt/nuxt/pull/34008

## Problem

CSS duplication when using `inlineStyles` function with `nuxt generate`. Even when function returns `true` for all files, entry CSS is still linked.

## Verify

```bash
pnpm i && pnpm generate
cat .output/public/index.html | grep -oE '(<style[^>]*>|<link[^>]*stylesheet[^>]*>)'
```

## Expected

Only inline `<style>` tags (function says inline everything).

## Actual

Both `<style>` AND `<link rel="stylesheet" href="/_nuxt/entry.*.css">` present.
