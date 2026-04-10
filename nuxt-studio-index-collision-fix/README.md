# nuxt-studio-index-collision-fix

## Problem

`nuxt-studio@1.5.1` collapses two different collection landing pages to the same filesystem path.

## Fix

Patch `nuxt-studio@1.5.1` so the collection helpers treat filesystem paths as root-relative paths. The patch derives each source root from `cwd` plus the static part of `include`, so `guides/guides/index.md` maps back to `guides/index.md` and root `index.md` no longer matches the prefixed collection.

## Verify

```bash
pnpm i && pnpm verify
```

## Expected

- `marketing/index.md` should map back to `index.md`
- `guides/guides/index.md` should map back to `guides/index.md`
- `getCollectionByFilePath('index.md')` should resolve the root collection, not the prefixed one

## Actual (with patch)

```text
marketing/index.md -> marketing/index.md -> index.md
guides/index.md -> guides/guides/index.md -> guides/index.md
getCollectionByFilePath('index.md') -> marketing
getCollectionByFilePath('guides/index.md') -> guides
```
