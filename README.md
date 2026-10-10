# ViteHub Invocation execution budget disposal repro

An Invocation execution budget owns deadline timers and abort listeners. When
the Invocation reaches terminal cleanup, its root budget must dispose those
resources, including resources owned by child budgets. The failing fixture
leaves both budgets live; the fixed fixture disposes the root budget.

This is a deterministic contract-level repro for the ViteHub execution-budget
cleanup seam. It uses only Node.js 24.15.0 or later and contains no provider
credentials or network calls.

Run the unattended verifier from this directory:

```sh
pnpm run verify
```

Expected output:

```text
vitehub-execution-budget-disposal: disposal repro: 2 timers and 2 abort listeners remain; vitehub-execution-budget-disposal-fix: disposal repro: 0 timers and 0 abort listeners remain
```

The failing fixture is `vitehub-execution-budget-disposal/`. The sibling
`vitehub-execution-budget-disposal-fix/` is the known-good control.
