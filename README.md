# ViteHub Invocation execution budget repro

Given one Invocation with a `maxToolCalls` limit of `1`, when the same Workspace Shell tool is called twice, the second call must be rejected. The broken control creates a new budget inside each tool call, so both calls succeed. The fixed control captures one budget for the Invocation and shares it across calls.

This is a deterministic contract-level repro for the ViteHub execution-budget boundary. It uses only Node.js 24.15.0 or later and contains no provider credentials or network calls.

Run the unattended verifier from this directory:

```sh
pnpm run verify
```

Expected output:

```text
vitehub-execution-budget: budget repro: second shell call bypassed the invocation limit; vitehub-execution-budget-fix: budget repro: second shell call rejected by the invocation limit
```

The failing fixture is `vitehub-execution-budget/`. The sibling `vitehub-execution-budget-fix/` is the known-good control with the single shared budget.
