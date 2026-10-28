The same handler returns different server identity fields depending on the protocol. Legacy `initialize` includes the configured `description`, `icons`, and `websiteUrl`, but modern `server/discover` omits them.

The handler guide says these fields reach both responses. Could `toServerInfoMeta` copy them as legacy initialization does? The fields are optional in MCP, but silently dropping configured values differs from the documented behavior.

[Reproduction and test results](https://github.com/onmax/repros/tree/repro/okmcp-modern-server-info/okmcp-modern-server-info)

<details>
<summary>Tested versions</summary>

Unpatched okmcp `2239349`, h3 `2.0.8`, and Node `24.21.0`.

The test compares both responses from the same handler. Legacy returns all six configured fields; modern returns only `name`, `version`, and `title`.

</details>
