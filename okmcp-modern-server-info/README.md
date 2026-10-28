# okmcp drops server identity fields

The same handler returns different server information depending on the protocol. Legacy `initialize` includes the configured `description`, `icons`, and `websiteUrl`, but modern `server/discover` omits them.

Reproduces [h3js/okmcp#37](https://github.com/h3js/okmcp/issues/37).

## Run

```sh
git clone --branch repro/okmcp-modern-server-info --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-modern-server-info
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

Use pnpm `11.28.6`. It prepares Node `24.21.0` automatically. The first install needs registry access. `PASS` means the bug was reproduced.

## What the test shows

Both requests use the same handler and configuration. Legacy returns all six identity fields; modern returns only `name`, `version`, and `title`.

The handler guide says both responses include the configured fields. These fields are optional in MCP, so this is a difference from the documented behavior. The test calls `handler.fetch` directly, with no running server. Full output is in [verification.txt](verification.txt).

<details>
<summary>Versions and provenance</summary>

Unpatched okmcp `223934913eb929051df6116e0b58a4b67072d106` and h3 `2.0.8`. Verified on Linux x86_64 with MCP `2025-11-25` and `2026-07-28`.

The committed `vendor/okmcp-0.2.1-main.2239349.tgz` is built from that commit, with only its package version changed. The verifier checks the runtime and archive checksum on every run. Dependencies are pinned in `pnpm-lock.yaml`.

SHA-256: `86c79ef96d39aaf8a8479d39867e584ab6f26f959900fdde53a501b0fa8f0485`.

</details>
