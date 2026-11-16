# Two `wrangler dev` started together pick the same inspector port

Two `wrangler dev` processes started at the same moment, each with its own `--port`, both choose inspector port 9229. One of them fails with:

```
Address already in use (socket "direct:1:default"). Please check that you are not already running a server on this address or specify a different port with --port.
```

The message names an internal socket and suggests `--port`, but `--port` is already distinct. The fix is `--inspector-port`. Started a few seconds apart, the second process finds 9229 taken and moves to 9230.

## Verify

```sh
pnpm install
pnpm verify             # two processes, no --inspector-port: fails
CONTROL=1 pnpm verify   # same, with distinct --inspector-port: passes
```

`verify.mjs` starts `app-a` (port 48751) and `app-b` (port 48752) at once, waits up to 20 s for both to answer, stops them, and repeats `TRIALS` times (default 5). It exits 1 when a trial leaves a process that never answers.

## Result

wrangler 4.163.0 (workerd 1.20261116.1, miniflare 5.20261116.0-beta), Node 24.21.0, Linux:

```
trial 1: app-a DOWN, app-b up
  app-a: Address already in use (socket "direct:1:default"). Please check that you are not already running a server on this address or specify a different port with --port.
trial 2: app-a up, app-b DOWN
...
6/6 trials left a wrangler dev process that never answered
```

With `CONTROL=1`: `0/4 trials left a wrangler dev process that never answered`.

## Cause

`resolveInspectorConfig` in `packages/wrangler/src/api/startDevWorker/ConfigController.ts` calls `getPort()` over 9229 and up, which checks that the port is free and closes it again. workerd binds it later. Two processes in that window both get 9229.
