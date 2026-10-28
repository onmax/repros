A browser client on another origin cannot read the public document returned by `protectedResourceMetadata`. The handler returns HTTP 200 without `Access-Control-Allow-Origin`, so Chromium blocks access to the response. Node and a browser on the same origin can read it.

Could the auth guide show how the host app adds CORS headers to this metadata route? RFC 9728 and the checked MCP specifications do not require the helper to set those headers, so a documented host configuration would address this.

[Reproduction and test results](https://github.com/onmax/repros/tree/repro/okmcp-metadata-cors/okmcp-metadata-cors)

<details>
<summary>Tested versions</summary>

Unpatched okmcp `2239349`, h3 `2.0.8`, Node `24.21.0`, Playwright `1.64.1`, and Chromium `156.0.8078.4`.

The test compares Node, same-origin Chromium, and cross-origin Chromium against the same endpoint. Each sends a GET request without credentials.

</details>
