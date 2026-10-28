One unconvertible schema makes `tools/list` fail for every tool in that response. The client gets `-32603 "Internal error"`; the server logs no cause.

The [repro](https://github.com/onmax/repros/tree/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics) checks input/output conversion on `2025-11-25` and `2026-07-28`. Legacy returns HTTP 200; modern returns HTTP 500. Removing only `v.check` restores listing. The healthy tool remains callable.

Could a server-side callback receive the tool name, schema direction, and original error?

Unpatched [`2239349`](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), h3 `2.0.8`, Node `24.21.0`, Valibot `1.5.0`, `@valibot/to-json-schema` `1.8.0`.

[Output](https://github.com/onmax/repros/blob/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics/verification.txt) · [Explanation](https://drop.vitehub.dev/d/6rc2wmr511pk/okmcp-schema-diagnostics) · [Conversion rules](https://standardschema.dev/json-schema) · [Schema code](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/internal/schema.ts#L31) · [Listing](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/methods/tools.ts#L175) · [Error handling](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/internal/errors.ts#L206)
