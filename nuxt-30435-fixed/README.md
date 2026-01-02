# nuxt-30435-fixed

Issue: https://github.com/nuxt/nuxt/issues/30435

## Problem

CSS duplication when using `inlineStyles` with `nuxt generate`. HTML contains both inline `<style>` AND `<link>` to CSS files.

## Fix

In `@nuxt/vite-builder`'s `build:manifest` hook, entry chunks weren't having their CSS cleared because their manifest keys didn't match the `chunksWithInlinedCSS` Set keys.

The fix:
1. Always clear `chunk.css` for chunks in `chunksWithInlinedCSS`
2. Also iterate all manifest chunks and clear CSS for entry chunks when `inlineStyles !== false`

## Verify

```bash
pnpm i
pnpm generate
cat .output/public/index.html | grep -oE '(<style[^>]*>|<link[^>]*stylesheet[^>]*>)'
```

## Expected

Only inline `<style>` tags, no `<link rel="stylesheet">` to CSS files.

## Actual (with fix)

Only `<style>` tags present - no CSS link duplication.
