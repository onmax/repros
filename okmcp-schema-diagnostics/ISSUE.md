A tool with a schema that cannot convert to JSON Schema breaks the entire `tools/list` response. Clients receive `-32603 "Internal error"`, but the server emits no console diagnostic to identify the failing tool or explain the cause.

The reproduction uses a Valibot `v.check` that the converter cannot represent. Removing that check restores the list. The other tool remains callable throughout, so the failure prevents clients from discovering tools that still work.

Could okmcp provide a server-side error callback with the original exception, tool name, and schema direction? That would let apps log the cause while keeping the client message unchanged.

[Reproduction and test results](https://github.com/onmax/repros/tree/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics)

<details>
<summary>Tested versions</summary>

Unpatched okmcp `2239349`, h3 `2.0.8`, Node `24.21.0`, Valibot `1.5.0`, and `@valibot/to-json-schema` `1.8.0`.

The test covers input and output schemas on protocol versions `2025-11-25` and `2026-07-28`. Both return the same JSON-RPC error, with HTTP 200 on the older version and HTTP 500 on the newer version.

</details>
