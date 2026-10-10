# ViteHub Sandbox transfer bounds reproduction

Claim: with the ViteHub Sandbox transfer algorithm at `origin/main` commit `6929ad7be0babb070a333b650002e44befebba68a`, a JSON payload containing many binary values writes every sidecar file. The transfer path has no sidecar count or aggregate byte budget, so a caller can force unbounded staging before the handler runs. The sibling `vitehub-sandbox-transfer-bounds-fix` control changes one variable: it applies the proposed Sandbox-owned `maxSidecars=64` limit and rejects before writing sidecar 65.

The fixture keeps the relevant shape from `packages/sandbox/src/runtime/binary-sidecars.ts` at that commit: each `Uint8Array` receives an invocation-local numeric descriptor and file. It uses Node.js 24.15.0 and only built-in modules. No provider, network, or production data is involved.

Run the unattended verifier from this directory:

```sh
node verify.mjs
```

Expected output:

```text
PASS: unbounded transfer writes 200 sidecars; bounded control rejects sidecar 65 at maxSidecars=64
```

The failing control proves the old behavior by asserting 200 sidecars are written. The fixed sibling proves the intended public contract and keeps the input and file staging shape identical. The reproduction does not model provider execution or JSON envelope byte limits; those are covered by the Sandbox package tests and the upstream change.
