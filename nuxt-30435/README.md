# nuxt-30435

Issue: https://github.com/nuxt/nuxt/issues/30435
PR: https://github.com/nuxt/nuxt/pull/34008

## Problem

CSS duplication when using `inlineStyles: true` with `nuxt generate`. HTML contains both inline `<style>` AND `<link>` to CSS files.

## Verify

```bash
pnpm i
pnpm generate
cat .output/public/index.html | grep -E '(<style|<link.*stylesheet)'
```

## Expected

Only inline `<style>` tags, no `<link rel="stylesheet">` to CSS files.

## Actual (before fix)

Both inline `<style>` AND `<link rel="stylesheet" href="/_nuxt/entry.*.css">` present in the HTML.

## Note

The fix works when `inlineStyles: true`. When using a function filter (e.g., `id => id.includes('.vue')`), entry.css is preserved as it may contain non-inlineable CSS.
