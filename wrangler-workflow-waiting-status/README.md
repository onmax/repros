# Local Workflows never report `waiting`

Under `wrangler dev`, `instance.status()` returns `running` while an instance sleeps, waits for an event, or waits for a step retry delay. The [Workflows docs](https://developers.cloudflare.com/workflows/build/workers-api/) describe `waiting` as "instance is hibernating and waiting for sleep or event to finish".

## Verify

```sh
pnpm install
pnpm verify
```

`verify.mjs` starts `wrangler dev` on port 48741, starts one instance per case, and polls `status()` once a second during a 6 s wait. It exits 1 when no poll returns `waiting`.

## Result

wrangler 4.163.0 (workerd 1.20261116.1, miniflare 5.20261116.0-beta), Node 24.21.0, Linux:

```
sleep         expected "waiting" during the 6 s wait, got: running running running complete ...  FAIL
waitForEvent  expected "waiting" during the 6 s wait, got: running running running running running complete ...  FAIL
retry         expected "waiting" during the 6 s wait, got: running running running running running complete ...  FAIL
```

I did not check deployed Workflows.

## Files

- `worker.mjs`: one Workflow with three modes (`sleep`, `waitForEvent`, `retry` with a 6 s retry delay) and routes to start an instance and read its status.
- `wrangler.jsonc`: the Workflow binding.
