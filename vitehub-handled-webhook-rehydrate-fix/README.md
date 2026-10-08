# ViteHub handled webhook rehydration fixed control

The fixed control discards saved work when queued webhook rehydration returns a handled `Response`.

## Run

```sh
git clone --branch repro/vitehub-handled-webhook-rehydrate https://github.com/onmax/repros.git
cd repros/vitehub-handled-webhook-rehydrate-fix
corepack pnpm@10.33.2 install --frozen-lockfile && corepack pnpm@10.33.2 verify
```

Expected verification output:

```text
Expected after handled rehydration: driverCalls=0, rehydrations=1, completed=1
Actual: driverCalls=0, rehydrations=1, completed=1
PASS: handled delivery skips the driver.
```

## Environment and provenance

Node 24.21.0, pnpm 10.33.2, Linux x64. `@vite-hub/agent` reports version 0.0.4 and is pinned to the published preview of source commit [`e59d72068fc4adc0956225f0829eb1d9907e548c`](https://github.com/vite-hub/vitehub/tree/e59d72068fc4adc0956225f0829eb1d9907e548c). The lockfile pins the tarball integrity and all transitive dependencies. `@libsql/client` is pinned to 0.18.0.

This fixture reduces the Productlane-to-Teams host's durable-queue symptom to synthetic GitHub-shaped input. It uses the published package exports, real SQLite state, and native `createChannelWebhookRouteHandler(...).resume(...)`. It needs no original application, credentials, provider, browser, deployment, or network during verification. Source issue: the queued-webhook handled-rehydration defect; no separate issue has been opened.

## Why these pieces remain

A nonempty persisted invocation is load-bearing: without it there is no stale work to execute. `rehydrate: true` makes native queue execution reconstruct and invoke the callback. The registered trigger returns an invocation with a rehydrate callback returning `Response`; handling the replayed trigger itself would hit a different guard. The real SQLite adapter preserves the durable queue boundary. A driver counter identifies execution of saved work, and a completion counter confirms actual queue completion rather than an early skip. The counter wraps the real completion method without replacing its database operation.

The callback awaits a resolved promise to represent deferred work. `runtime: false` keeps the minimal fixture independent of a workspace. State uses a unique temporary directory and is disconnected/deleted in `finally`. A five-second deadline turns missing dispatch/completion into a failed assertion.

## Before and after

Both directories contain byte-identical `verify.mjs`. Normal `pnpm verify` asserts correct behavior. `pnpm verify --prove-bug` exits zero only when the exact claimed failure is proven; it still rejects absent callback execution or queue completion. The sibling fixed control applies one `pnpm patch` line to this same package: clear the saved invocation after a handled rehydration result. All application code and inputs remain identical.

From the reproduction branch root, install both directories with `--frozen-lockfile`, then run `bash verify-comparison.sh`. It requires a red correctness assertion on the raw package, proves the raw failure, and runs the same correctness assertion against the fixed package. On Slimbook, run finite verification through `/home/maxi/.local/bin/fleet-queue bash verify-comparison.sh`.

Observed clean-install results are recorded in [VERIFICATION.md](../VERIFICATION.md).
