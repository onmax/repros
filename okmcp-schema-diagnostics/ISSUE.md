If a tool schema cannot convert to JSON Schema, the complete `tools/list` response fails.
The client receives `-32603 "Internal error"`.
The server does not write the original error to a log.

The [reproduction](https://github.com/onmax/repros/tree/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics) checks input and output schemas on `2025-11-25` and `2026-07-28`.
Removing only `v.check` makes the tool list work.
The other tool still works when a client calls it directly.
The older protocol returns HTTP 200.
The newer protocol returns HTTP 500.

Add a server-side error callback.
Include the tool name, the schema direction, and the original error.
Keep the client error message unchanged.

Tested with unpatched okmcp `2239349`, h3 `2.0.8`, Node `24.21.0`, Valibot `1.5.0`, and `@valibot/to-json-schema` `1.8.0`.
