# `DevEnvironment.close()` throws when `init()` never completed

`DevEnvironment.close()` rejects with `<name> environment.pluginContainer called before initialized` when the environment's `init()` rejected or was never called. The throw happens while `close()` builds the array it passes to `Promise.allSettled`, so the rest of the cleanup never runs: the environment's hot channel (`transport.close()`) and its deps optimizer stay open.

On Vite main, `createServer()` closes the server when startup fails (vitejs/vite#24020). That path calls `close()` on an environment whose `init()` rejected, swallows the rejection, and leaves the transport open.

## Run

```sh
git clone --branch repro/vite-devenvironment-close-before-init https://github.com/onmax/repros.git
cd repros/vite-devenvironment-close-before-init
pnpm install
pnpm verify
```

`pnpm verify` runs `verify.mjs` against both Vite versions installed side by side and exits nonzero while the bug is present in either:

- `vite-latest`: `vite@8.3.8`, the latest release on npm.
- `vite-main`: `https://pkg.pr.new/vite@3567471`, Vite `main` at commit `3567471998e3da315675086f44368e266c9c0e33` (2026-11-20). It reports `8.4.0-beta.1`.

Node 24.21.0, pnpm 10.33.0.

## Checks

1. Create a `DevEnvironment`, never call `init()`, call `close()`.
2. Create a `DevEnvironment` with a plugin whose `options` hook throws, so `init()` rejects, then call `close()`.
3. Call `createServer()` with the same plugin and an `ssr` environment that records what Vite's own call to `close()` did. Skipped on 8.3.8, which closes nothing on a failed start.

Expected for each: `close()` resolves and the custom transport's `close()` runs.

## Actual on vite@8.3.8

```text
FAIL close() after init() was never called
  expected: {"close":"resolved","transportClosed":true}
  actual:   {"close":"rejected: ssr environment.pluginContainer called before initialized","transportClosed":false}
FAIL close() after init() rejected
  expected: {"init":"rejected: options hook failed","close":"resolved","transportClosed":true}
  actual:   {"init":"rejected: options hook failed","close":"rejected: ssr environment.pluginContainer called before initialized","transportClosed":false}
SKIP createServer() failure path: this version does not close environments on a failed start
2 of 2 checks failed: the bug is present in vite@8.3.8
```

## Actual on main (3567471)

```text
FAIL close() after init() was never called
  expected: {"close":"resolved","transportClosed":true}
  actual:   {"close":"rejected: ssr environment.pluginContainer called before initialized","transportClosed":false}
FAIL close() after init() rejected
  expected: {"init":"rejected: options hook failed","close":"resolved","transportClosed":true}
  actual:   {"init":"rejected: options hook failed","close":"rejected: ssr environment.pluginContainer called before initialized","transportClosed":false}
FAIL createServer() failure path closes the failed environment
  expected: {"start":"rejected: options hook failed","closeCalls":["resolved"],"transportClosed":true}
  actual:   {"start":"rejected: options hook failed","closeCalls":["rejected: ssr environment.pluginContainer called before initialized"],"transportClosed":false}
3 of 3 checks failed: the bug is present in vite@8.4.0-beta.1
```

## Why each piece is here

- The custom `transport` shows the cleanup that `close()` skips. Without it the run only shows the rejection.
- The throwing `options` hook is the smallest way to make `init()` reject: plugin container setup runs `options` hooks.
- `server.middlewareMode` and `ws: false` keep check 3 from opening a port.

Source: `packages/vite/src/node/server/environment.ts`, `close()` calls the `pluginContainer` getter, and `init()` sets `_initiated = true` before `createEnvironmentPluginContainer()` resolves.
