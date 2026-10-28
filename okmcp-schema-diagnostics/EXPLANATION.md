# Schema conversion failures disappear into Internal error

A tool schema that cannot convert to JSON Schema prevents every tool in that listing response from being discovered. The client receives only `Internal error`, and okmcp emits no console diagnostic identifying the tool or conversion cause.

The useful upstream change is server-side reporting. Unsupported conversion is allowed by Standard JSON Schema; automatically dropping checks or hiding a tool would change application policy.

## What the reproduction proves

| Request | Actual response | Server console |
| --- | --- | --- |
| Legacy tools/list, input or output conversion | HTTP 200, JSON-RPC -32603 | No diagnostic |
| Modern tools/list, input or output conversion | HTTP 500, JSON-RPC -32603 | No diagnostic |

The original converter explains the failure: `The "check" action cannot be converted to JSON Schema.` Removing only `v.check` makes both definitions list successfully. The healthy tool remains callable while the listing fails.

## Proposed scope

Expose the original error through a server-side reporting callback or equivalent mechanism, with the tool name and input/output schema direction. Keep client-facing redaction. The same reporting mechanism could cover other errors swallowed by transport catches.

Keep this separate from a general tool-call timing API. Tool definitions can already wrap their handlers. An HTTPError thrown by a tool is intentionally redacted on modern clients; returning an explicit safe `isError` result remains the way to report a business failure to the model.

## Evidence and limits

The verifier observes console error/warn/log/info/debug around each failed request and checks the direct converter cause. It does not claim no application-specific wrapper could report it. Tests run in memory through the real Fetch and JSON-RPC transport, without Nuxt, auth, private data, or a deployment.

## Run the pinned repro

[Reproduction source and instructions](https://github.com/onmax/repros/tree/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics) · [Verification output](https://github.com/onmax/repros/tree/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics/verification.txt)

```sh
git clone --branch repro/okmcp-schema-diagnostics --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-schema-diagnostics
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

Pinned okmcp [2239349](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), unpatched committed tarball with a checked SHA-256, h3 2.0.8, Node 24.21.0, and pnpm 11.28.6. The fixture prepares its pinned Node runtime through pnpm and exits nonzero if the claimed symptom no longer occurs.

[Relevant upstream source](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/internal/schema.ts#L31). No upstream fix or pull request is included.
