# nuxt-studio-index-collision

## Problem

`nuxt-studio@1.5.1` collapses two different collection landing pages to the same filesystem path.

This repro keeps only:
- `content/index.md`
- `content/guides/index.md`
- a `content.config.ts` with one root collection and one prefixed collection
- a script that uses the shipped `nuxt-studio` path helpers with the same minimal collection shape as `content.config.ts`

## Verify

```bash
pnpm i && pnpm diagnose
```

## Expected

- `marketing/index.md` should map back to `index.md`
- `guides/guides/index.md` should map back to `guides/index.md`
- `getCollectionByFilePath('index.md')` should resolve the root collection, not the prefixed one

## Actual

```text
marketing/index.md -> marketing/index.md -> index.md
guides/guides/index.md -> guides/guides/index.md -> index.md
getCollectionByFilePath('index.md') -> guides
```

The bug is in Studio's path helpers, not in browser draft state. `pnpm prepare` still succeeds if you want to sanity-check the Nuxt project, but the deterministic repro is the helper collision above.
