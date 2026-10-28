# okmcp schema conversion diagnostics

Given pinned okmcp and a tool whose Valibot `check` cannot convert to JSON Schema, when a client calls `tools/list`, the server should provide an actionable server-side diagnostic, but it returns only `-32603 "Internal error"` and emits no console diagnostic.

Source issue: [h3js/okmcp#36](https://github.com/h3js/okmcp/issues/36). See [verification.txt](verification.txt) for the test results.

## Expected and actual

Expected: identify the affected tool, input/output schema direction, and original converter cause server-side. Client redaction may stay unchanged.

Actual: the listing response loses both tools; legacy returns HTTP 200 and modern HTTP 500 with the same JSON-RPC internal error. The healthy tool remains directly callable. Removing only `v.check` makes both tools list successfully. Direct conversion exposes `The "check" action cannot be converted to JSON Schema.`

The verifier checks both input and output conversion on protocol revisions `2025-11-25` and `2026-07-28`, and captures console error/warn/log/info/debug during each failed request. It proves these failures have no console reporting; it does not claim every application logger is impossible to wrap around the converter.

Unsupported conversion is permitted by [Standard JSON Schema](https://standardschema.dev/json-schema). This repro asks for diagnostics, not automatic constraint removal or omission of a tool.

## Pinned environment

- okmcp source [223934913eb929051df6116e0b58a4b67072d106](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106).
- The committed `vendor/okmcp-0.2.1-main.2239349.tgz` is an unpatched build of that source, with only its package version changed. It includes no Joxi application code or pnpm patch.
- SHA-256 `86c79ef96d39aaf8a8479d39867e584ab6f26f959900fdde53a501b0fa8f0485`.
- Node `24.21.0`, pnpm `11.28.6`, h3 `2.0.8`, Linux x86_64. pnpm's `devEngines.runtime` prepares the pinned Node runtime.
- Every run checks the runtime and archive checksum. Transitive packages are pinned in `pnpm-lock.yaml`.

## Run

```sh
git clone --branch repro/okmcp-schema-diagnostics --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-schema-diagnostics
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

The last line is the unattended install-and-verify command. Use pnpm `11.28.6`; Corepack reads the exact `packageManager` pin. It needs registry access on the first install. A successful exit means the reported symptom was reproduced; the verifier exits nonzero if the claim is false or a prerequisite fails.

Verification output is recorded in [verification.txt](verification.txt). This fixture has no deployed URL and makes no claim about platform-specific Workers behavior.

## Why these elements remain

- Two tools prove the failed conversion prevents a healthy definition in the same listing response from being discovered.
- The `check` action is the smallest runtime-valid schema action here that the converter cannot represent; the control removes only that action.
- Both schema sides reach distinct converter methods. Both protocol eras reach distinct transport error paths.
- Direct in-memory `handler.fetch` preserves the JSON-RPC transport boundary without a server, Nuxt, Nitro, auth, database, or deployment.

The fixture adds no fixes. Schema conversion and transport error normalization are the only library behavior under test.
