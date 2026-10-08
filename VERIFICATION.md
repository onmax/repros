# Verification evidence

Verified on 2026-10-08, Linux x64, Node 24.21.0, pnpm 10.33.2.

Both fixtures were copied without dependencies into fresh directories, then installed with `corepack pnpm@10.33.2 install --frozen-lockfile`. Both installs completed successfully. Every preview tarball has a SHA512 integrity entry in the committed lockfiles.

The finite verification batch ran through Slimbook's shared queue:

```sh
/home/maxi/.local/bin/fleet-queue bash verify-comparison.sh .tmp/clean
```

The affected package failed the normal correctness assertion:

```text
Expected after handled rehydration: driverCalls=0, rehydrations=1, completed=1
Actual: driverCalls=1, rehydrations=1, completed=1
AssertionError [ERR_ASSERTION]: handled rehydration must not run the saved invocation
1 !== 0
RED: affected package fails the correctness assertion.
```

The same affected package reproduced that failure in a second independent SQLite replay with `--prove-bug`:

```text
Expected after handled rehydration: driverCalls=0, rehydrations=1, completed=1
Actual: driverCalls=1, rehydrations=1, completed=1
PASS: claimed failure reproduced.
```

The same correctness verifier passed after the one-line package patch:

```text
Expected after handled rehydration: driverCalls=0, rehydrations=1, completed=1
Actual: driverCalls=0, rehydrations=1, completed=1
PASS: handled delivery skips the driver.
```

The package is `@vite-hub/agent@0.0.4` from preview source commit `e59d72068fc4adc0956225f0829eb1d9907e548c`, not a locally built or Quiver-patched package. The raw and fixed verifiers are byte-identical. The fixed control changes only the package's saved-invocation branch after a handled rehydration result.

This proves the published package's real durable SQLite queue behavior. It does not exercise an external GitHub delivery, an AI provider, or a hosted deployment; none is needed to trigger the queue defect.
