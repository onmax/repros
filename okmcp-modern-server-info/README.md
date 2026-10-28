# okmcp modern server identity metadata

Given one handler configured with `description`, `icons`, and `websiteUrl`, when a modern client calls `server/discover`, the documented identity should include those configured fields, but only `name`, `version`, and `title` are emitted.

Source issue: [h3js/okmcp#37](https://github.com/h3js/okmcp/issues/37). See [REPORT.md](REPORT.md) for the Drop explanation and evidence.

## Expected and actual

Expected modern `_meta["io.modelcontextprotocol/serverInfo"]` equals the configured identity, as promised by the [handler guide](https://mcp.h3.dev/guide/handler#server-identity).

Actual: modern discovery omits all three fields. Legacy `initialize` on the identical handler includes every field. The verifier asserts both exact objects.

These fields are optional in the MCP `Implementation` schema. The claim is a documented API inconsistency, not a mandatory-field protocol violation.

## Pinned environment

- okmcp source [223934913eb929051df6116e0b58a4b67072d106](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106).
- The committed `vendor/okmcp-0.2.1-main.2239349.tgz` is an unpatched build of that source, with only its package version changed. It includes no Joxi application code or pnpm patch.
- SHA-256 `86c79ef96d39aaf8a8479d39867e584ab6f26f959900fdde53a501b0fa8f0485`.
- Node `24.21.0`, pnpm `11.28.6`, h3 `2.0.8`, Linux x86_64. pnpm's `devEngines.runtime` prepares the pinned Node runtime.
- Every run checks the runtime and archive checksum. Transitive packages are pinned in `pnpm-lock.yaml`.

## Run

```sh
git clone --branch repro/okmcp-modern-server-info --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-modern-server-info
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

The last line is the unattended install-and-verify command. Use pnpm `11.28.6`; Corepack reads the exact `packageManager` pin. It needs registry access on the first install. A successful exit means the reported symptom was reproduced; the verifier exits nonzero if the claim is false or a prerequisite fails.

Verification output is recorded in [verification.txt](verification.txt). This fixture has no deployed URL and makes no claim about platform-specific Workers behavior.

## Why these elements remain

- All three omitted fields are independent parts of the reported failure; `name`, `version`, and `title` prove the modern metadata container exists.
- The same handler serves both requests, so application configuration cannot explain the difference.
- Legacy initialization is the control. Modern discovery requires its version, client metadata, and mirrored headers to reach the intended protocol era.
- Direct in-memory `handler.fetch` needs no tools, auth, server, framework, or deployment.

The fixture adds no fixes.
