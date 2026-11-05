# `nitro deploy --prebuilt` ignores the deploy command saved by the build

With `commands.deploy` set in the Vite plugin options, `vite build` saves it in `.output/nitro.json`. `nitro deploy --prebuilt` then runs the `cloudflare-module` preset's default command instead. Frameworks and modules that set `commands.deploy` during the build hit the same thing, because `nitro deploy` doesn't load their config.

`nitro deploy --prebuilt` creates Nitro again from `nitro.config` and the preset and runs `nitro.options.commands.deploy`. Before nitrojs/nitro#4619 it ran `commands.deploy` from `nitro.json`. `nitro preview` still runs the saved preview command.

Tested on Linux with Node 24.21.0 and pnpm 12.16.1. The lockfile pins Nitro 3.0.261103-rc and Vite 8.3.6.

```sh
git clone --single-branch --branch repro/nitro-prebuilt-deploy-command https://github.com/onmax/repros.git
cd repros/nitro-prebuilt-deploy-command
pnpm install
pnpm verify
```

`verify.mjs` runs `vite build`, then `nitro deploy --prebuilt`. `stub/wrangler`, copied to `node_modules/.bin`, prints its arguments instead of deploying. The commands run with an empty `HOME`, so npx can't fall back to a cached Wrangler and no Wrangler login is visible. It exits 0 when the command that ran differs from the saved one.

```text
saved in .output/nitro.json:  npx wrangler deploy --config ./server/wrangler.json
nitro deploy --prebuilt ran:  wrangler --cwd .output/ deploy

bug reproduced: expected "wrangler deploy --config .output/server/wrangler.json"
```

`../nitro-prebuilt-deploy-command-fix` has the same files plus a `pnpm patch` of the same Nitro version that passes the saved command to `createNitro` with `--prebuilt`. Its `pnpm verify` exits 0 when the saved command runs:

```text
nitro deploy --prebuilt ran:  wrangler deploy --config .output/server/wrangler.json
```

`pnpm-workspace.yaml` only exempts Vite 8.3.6 from pnpm's minimum release age.
