# nuxt-30435-fixed

Issue: https://github.com/nuxt/nuxt/issues/30435
PR: https://github.com/nuxt/nuxt/pull/34008

## Problem

CSS duplication when using `inlineStyles`. Entry CSS file linked even when styles are inlined.

## Original PR Bug

PR used undefined `entry` variable:
```ts
shouldInline(entry)  // entry is undefined at hook execution time
```

Also, checking `shouldInline(entry.src)` doesn't make sense - entry files are `.ts` not `.vue`.

## Correct Fix

Clear entry CSS when `inlineStyles !== false`. Entry chunks aggregate CSS from inlined components, so if inlining is enabled at all, the aggregated CSS file shouldn't be linked.

```ts
if (shouldInline !== false) {
  for (const chunk of Object.values(manifest)) {
    if (chunk.isEntry && chunk.src) {
      chunk.css &&= []
    }
  }
}
```

## Note

`inlineStyles` function can receive `undefined` for `importer` in resolveId hook. Always guard:
```ts
inlineStyles: (id) => !!id && id.includes('.vue')
```

## Verify

```bash
pnpm i && pnpm generate
cat .output/public/index.html | grep -oE '(<style[^>]*>|<link[^>]*stylesheet[^>]*>)'
```

Expected: Only `<style>` tags - no CSS link.
