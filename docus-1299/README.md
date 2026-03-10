# docus-1299

Issue: [nuxt-content/docus#1299](https://github.com/nuxt-content/docus/issues/1299)

## Problem

A minimal Nuxt app that only extends Docus fails on `nuxt typecheck`.

## Verify

```bash
pnpm i && pnpm typecheck
```

## Expected

`nuxt typecheck` succeeds in a minimal app extending Docus.

## Actual

`nuxt typecheck` fails in Docus package source files, including the assistant composable and several other Docus layer files.
