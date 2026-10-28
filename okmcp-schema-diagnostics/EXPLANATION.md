# Schema conversion failures hide their cause

One unconvertible tool schema makes the listing fail with `Internal error`. The server logs no cause.

The [repro](https://github.com/onmax/repros/tree/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics) checks input/output conversion on both protocol eras. Removing only `v.check` restores listing; the healthy tool remains callable.

I recommend a server-side error callback carrying the tool name, schema direction, and cause. Conversion may legitimately fail. Client messages can stay redacted.

Unpatched [okmcp `2239349`](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), h3 `2.0.8`, Node `24.21.0`.

[Run instructions](https://github.com/onmax/repros/tree/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics) · [Output](https://github.com/onmax/repros/tree/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics/verification.txt) · [Source](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/internal/schema.ts#L31)
