# Modern responses drop configured identity fields

Modern `server/discover` omits `description`, `icons`, and `websiteUrl`. Legacy `initialize` includes them on the same handler.

The [repro](https://github.com/onmax/repros/tree/repro/okmcp-modern-server-info/okmcp-modern-server-info) compares both complete objects. Modern returns `name`, `version`, and `title`; legacy returns all six configured fields.

I recommend copying the missing fields in [`toServerInfoMeta`](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/modern/meta.ts#L138). This needs no new API. The fields are optional in MCP, but the library documents them for both eras.

Unpatched [okmcp `2239349`](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), h3 `2.0.8`, Node `24.21.0`.

[Run instructions](https://github.com/onmax/repros/tree/repro/okmcp-modern-server-info/okmcp-modern-server-info) · [Output](https://github.com/onmax/repros/tree/repro/okmcp-modern-server-info/okmcp-modern-server-info/verification.txt)
