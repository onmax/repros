# docus-1299

Issue: [nuxt-content/docus#1299](https://github.com/nuxt-content/docus/issues/1299)

## Problem

A minimal Nuxt app that extends Docus, defines a small `assistant` app config, and imports `useAssistant()` fails on `nuxt typecheck`.

This repro uses the package-root branch from the incomplete upstream PR state so it exercises the same consumer-package failure class seen in a real app.

## Verify

```bash
pnpm i && pnpm typecheck
```

## Expected

`nuxt typecheck` succeeds in a minimal app extending Docus.

## Actual

`nuxt typecheck` fails in Docus package source files, including the assistant composable and several other Docus layer files.
