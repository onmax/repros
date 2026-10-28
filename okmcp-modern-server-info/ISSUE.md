The same handler emits full configured identity through legacy `initialize`, but drops `description`, `icons`, and `websiteUrl` from modern `server/discover` metadata.

Reproduced with unpatched okmcp main [`223934913eb929051df6116e0b58a4b67072d106`](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), locally built as `0.2.1-main.2239349`, h3 `2.0.8`, Node `24.21.0`, and pnpm `11.28.6`. The repro commits the exact tarball, checksum, lockfile, and verifier. No application patches are applied.

- [Executable reproduction](https://github.com/onmax/repros/tree/repro/okmcp-modern-server-info/okmcp-modern-server-info)
- [Explanation and observed objects](https://drop.vitehub.dev/d/5y4q65t1f4hj/okmcp-modern-server-info)
- [Recorded verification](https://github.com/onmax/repros/blob/repro/okmcp-modern-server-info/okmcp-modern-server-info/verification.txt)

Run:

```sh
git clone --branch repro/okmcp-modern-server-info --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-modern-server-info
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

Handler configuration:

```js
defineMcpHandler({
  name: "identity-repro",
  version: "1.0.0",
  title: "Example server",
  description: "An example server description",
  websiteUrl: "https://example.com",
  icons: [{ src: "https://example.com/icon.png" }],
})
```

Expected: all configured identity fields in both eras, as described by [Server identity](https://mcp.h3.dev/guide/handler#server-identity).

Actual modern `result._meta["io.modelcontextprotocol/serverInfo"]`:

```json
{ "name": "identity-repro", "version": "1.0.0", "title": "Example server" }
```

Legacy `initialize` on that identical handler includes all six configured fields. The verifier sends valid requests for both eras and asserts the exact objects.

[`toServerInfoMeta`](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/modern/meta.ts#L138) copies only name/version/title; [legacy initialization](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/legacy/initialize.ts) copies the other fields too. Could the modern helper carry them consistently? These fields are optional in the MCP Implementation schema, so this is a documented API inconsistency rather than a mandatory-field protocol violation.
