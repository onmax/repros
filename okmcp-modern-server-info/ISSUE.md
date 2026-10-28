Modern `server/discover` does not include the configured `description`, `icons`, and `websiteUrl` in server identity.
Legacy `initialize` includes these fields on the same handler.

The handler guide says that both responses include these fields.
The [reproduction](https://github.com/onmax/repros/tree/repro/okmcp-modern-server-info/okmcp-modern-server-info) compares both complete responses.
The older response contains all six configured identity fields.
The newer response contains only `name`, `version`, and `title`.

Copy the missing fields in `toServerInfoMeta`.
Use the same fields as legacy initialization.
MCP makes these fields optional.
This issue concerns the behavior that the handler guide describes.

Tested with unpatched okmcp `2239349`, h3 `2.0.8`, and Node `24.21.0`.
