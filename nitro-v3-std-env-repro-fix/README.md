# Nitro v3 `std-env` Reproduction Fix

This folder applies a local `pnpm patch` to the minimal Nitro v3 reproduction.

## Reproduce

```sh
pnpm install
pnpm run version
pnpm run repro
```

`package.json` pins Nitro to `3.0.260522-beta`, which is Nitro v3 and was the npm `latest` dist-tag when this repro was created.

## Expected

The runtime config import should either work or show Nitro's intended stub warning.

## Fix

The patch removes the `std-env` and `consola` imports from Nitro's published `_runtime_warn.mjs` fallback and uses a dependency-free test guard plus `console.warn`.

The patch is registered in `pnpm-workspace.yaml` because pnpm v11 no longer reads `pnpm.patchedDependencies` from `package.json`.

## Actual

```text
$ pnpm run version
3.0.260522-beta

$ pnpm run repro
WARN  Nitro runtime imports detected without a builder or Nitro plugin. A stub implementation will be used.

{ app: {}, nitro: {} }
```
