# ViteHub Invocation execution budget disposal repro

An Invocation execution budget owns deadline timers. The failing fixture imports
`packages/runtime/src/execution-budget.ts` exactly as it existed at source
revision `c58aee865`. It creates a root budget and child, then returns without a
cleanup call. Node keeps the process alive until the deadline timers fire. The
fixed control imports the same file from source revision `b4e85e5ca` of the
disposal PR and calls the public `dispose()` contract before returning, so the process
exits at once.

The two fixture directories differ only in that pinned source file and the one
cleanup call in `index.mjs`. They use Node's native TypeScript stripping and no
provider credentials or network calls.

Run the unattended verifier from this directory:

```sh
node verify.mjs
```

The verifier asserts the exact returned output and process lifetime for both
source revisions. The failing fixture must remain alive for at least 220ms;
the fixed control must exit in under 220ms.
