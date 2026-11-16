# `vite dev` drops `error.cause` and `error.url` from plugin errors

A plugin `transform` hook throws `new Error(message, { cause })` with an `url`. `vite build` prints the cause. `vite dev` logs `Internal server error: <message>`, `Plugin:` and `File:` only, so the cause and the url never reach the terminal.

```sh
git clone --branch repro/vite-dev-error-cause https://github.com/onmax/repros
cd repros/vite-dev-error-cause
pnpm install && pnpm verify
```

Pinned: vite 8.3.8 (also fails on 8.4.0-beta.1), Node 24.21.0, Linux. `verify` starts `vite dev` on a random port in 47000-47899, requests `/src/index.js`, stops the server and reads its output.

Expected: the dev terminal log contains `ROOT_CAUSE: the token file is missing` and `https://example.com/docs/my-plugin-error`.

Actual: neither appears. `verify` exits 1 with `BUG: vite dev drops error.cause from the terminal log`.

The dev log comes from `buildErrorMessage()` in `packages/vite/src/node/server/middlewares/error.ts`, which writes `plugin`, `id`, `frame` and the stack, but not `cause` or `url`.
