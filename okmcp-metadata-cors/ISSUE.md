`protectedResourceMetadata` returns HTTP 200 without `Access-Control-Allow-Origin`. Cross-origin Chromium fetches fail; Node and same-origin Chromium read the identical endpoint.

Could the [auth guide](https://mcp.h3.dev/security/auth#protected-resource-metadata) show host CORS setup for this public document? RFC 9728 and the checked MCP specs do not require the helper to set CORS.

The [repro](https://github.com/onmax/repros/tree/repro/okmcp-metadata-cors/okmcp-metadata-cors) verifies a credential-free GET and closes its browser and listener.

Unpatched [`2239349`](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), h3 `2.0.8`, Node `24.21.0`, Playwright `1.64.1`, Chromium `156.0.8078.4`.

[Output](https://github.com/onmax/repros/blob/repro/okmcp-metadata-cors/okmcp-metadata-cors/verification.txt) · [Explanation](https://drop.vitehub.dev/d/wcbgy325rybb/okmcp-metadata-cors) · [Response headers](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/oauth/metadata.ts#L55)
