# Modern MCP responses drop configured server identity

Configured `description`, `icons`, and `websiteUrl` disappear from modern server identity. The same handler returns all three fields to a legacy client.

This is a small serialization omission worth fixing. The fields are optional in the MCP schema, so it is an API/documentation mismatch rather than a mandatory-field protocol violation.

## What the reproduction proves

One handler is configured with name, version, title, description, website URL, and an icon. The verifier sends valid requests for both eras.

| Request | Actual identity |
| --- | --- |
| Legacy initialize | All six configured fields |
| Modern server/discover | name, version, title only |

No tools, authentication, server listener, framework, or deployment is involved. The identical handler and options rule out application configuration as the reason for the difference.

## Proposed scope

Copy description, icons, and websiteUrl in `toServerInfoMeta`, matching legacy identity and the handler guide. Add one modern discovery assertion with all optional fields. No new public API is needed.

## Evidence and limits

The verifier compares both complete identity objects with standard-library assertions. It proves the documented identity behavior differs between protocol eras. It does not require any client to render these optional fields.

## Run the pinned repro

[Reproduction source and instructions](https://github.com/onmax/repros/tree/repro/okmcp-modern-server-info/okmcp-modern-server-info) · [Verification output](https://github.com/onmax/repros/tree/repro/okmcp-modern-server-info/okmcp-modern-server-info/verification.txt)

```sh
git clone --branch repro/okmcp-modern-server-info --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-modern-server-info
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

Pinned okmcp [2239349](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), unpatched committed tarball with a checked SHA-256, h3 2.0.8, Node 24.21.0, and pnpm 11.28.6. The fixture prepares its pinned Node runtime through pnpm and exits nonzero if the claimed symptom no longer occurs.

[Relevant upstream source](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/modern/meta.ts#L138). No upstream fix or pull request is included.
