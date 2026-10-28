# okmcp hides schema conversion errors

One tool with an unsupported Valibot `v.check` makes the entire `tools/list` request fail. Clients receive `-32603 "Internal error"`, and the server logs nothing to identify the failing tool or explain the cause.

Reproduces [h3js/okmcp#36](https://github.com/h3js/okmcp/issues/36).

## Run

```sh
git clone --branch repro/okmcp-schema-diagnostics --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-schema-diagnostics
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

Use pnpm `11.28.6`. It prepares Node `24.21.0` automatically. The first install needs registry access. `PASS` means the bug was reproduced.

## What the test shows

The converter throws `The "check" action cannot be converted to JSON Schema.`, but okmcp returns only the generic error. The expected behavior is a server-side diagnostic with the tool name, schema direction, and original cause.

Removing only `v.check` makes both tools appear in the list. The healthy tool remains callable even when the list fails.

The test covers input and output schemas on MCP `2025-11-25` and `2026-07-28`. It calls `handler.fetch` directly, with no running server. Full output is in [verification.txt](verification.txt).

<details>
<summary>Versions and provenance</summary>

Unpatched okmcp `223934913eb929051df6116e0b58a4b67072d106`, h3 `2.0.8`, Valibot `1.5.0`, and `@valibot/to-json-schema` `1.8.0`. Verified on Linux x86_64.

The committed `vendor/okmcp-0.2.1-main.2239349.tgz` is built from that commit, with only its package version changed. The verifier checks the runtime and archive checksum on every run. Dependencies are pinned in `pnpm-lock.yaml`.

SHA-256: `86c79ef96d39aaf8a8479d39867e584ab6f26f959900fdde53a501b0fa8f0485`.

</details>
