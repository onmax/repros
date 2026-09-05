# Nitro v3 `std-env` Reproduction

This is the smallest reproduction I could make for a clean Nitro v3 install failing when importing `nitro/runtime-config`.

## Reproduce

```sh
pnpm install
pnpm run version
pnpm run repro
```

`package.json` pins Nitro to `3.0.260522-beta`, which is Nitro v3 and was the npm `latest` dist-tag when this repro was created.

## Expected

The runtime config import should either work or show Nitro's intended stub warning.

## Actual

The import fails because Nitro's published runtime fallback imports `std-env`, but Nitro does not install `std-env` as a production dependency.

```text
$ pnpm run version
3.0.260522-beta

$ pnpm run repro
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'std-env' imported from /Users/maxi/repros/nitro-v3-std-env-repro/node_modules/.pnpm/nitro@3.0.260522-beta/node_modules/nitro/dist/runtime/virtual/_runtime_warn.mjs
```
