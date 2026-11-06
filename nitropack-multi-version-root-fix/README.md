# Fixed control for `../nitropack-multi-version-root`

Same app and `verify.mjs`, with `patches/nitropack@2.13.6.patch` linking the version the bundle imports to the top level. `pnpm install && pnpm verify` exits 0 when `/` answers 200. See `../nitropack-multi-version-root/README.md`.
