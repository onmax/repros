# Fixed control for `../nitro-prebuilt-deploy-command`

Same fixture, stub and `verify.mjs`, with `patches/nitro@3.0.261103-rc.patch` making `nitro deploy --prebuilt` use the deploy command from `.output/nitro.json`. `pnpm install && pnpm verify` exits 0 when the saved command runs. See `../nitro-prebuilt-deploy-command/README.md`.
