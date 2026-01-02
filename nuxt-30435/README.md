# nuxt-30435

Issue: https://github.com/nuxt/nuxt/issues/30435

## Problem

CSS duplication when using `inlineStyles` with `nuxt generate`. HTML contains both inline `<style>` AND `<link>` to CSS files.

## Verify

```bash
pnpm i
pnpm generate
cat .output/public/index.html | grep -E '(<style|<link.*stylesheet)'
```

## Expected

Only inline `<style>` tags, no `<link rel="stylesheet">` to CSS files.

## Actual

Both inline `<style>` AND `<link rel="stylesheet" href="/_nuxt/entry.*.css">` present in the HTML.
