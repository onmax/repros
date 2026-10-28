Modern `server/discover` drops configured `description`, `icons`, and `websiteUrl` from server identity. Legacy `initialize` includes them on the same handler.

The [guide](https://mcp.h3.dev/guide/handler#server-identity) says these fields reach both eras. The [repro](https://github.com/onmax/repros/tree/repro/okmcp-modern-server-info/okmcp-modern-server-info) asserts both complete objects: six configured fields in legacy, only `name`, `version`, and `title` in modern.

Please copy the missing fields in [`toServerInfoMeta`](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/modern/meta.ts#L138), matching [legacy](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/legacy/initialize.ts). The MCP schema makes them optional; this concerns documented library behavior.

Unpatched [`2239349`](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), h3 `2.0.8`, Node `24.21.0`.

[Output](https://github.com/onmax/repros/blob/repro/okmcp-modern-server-info/okmcp-modern-server-info/verification.txt) · [Explanation](https://drop.vitehub.dev/d/5y4q65t1f4hj/okmcp-modern-server-info)
