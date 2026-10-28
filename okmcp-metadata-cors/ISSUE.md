`protectedResourceMetadata` returns HTTP 200 without `Access-Control-Allow-Origin`.
Chromium cannot read the document from another origin.
Node and Chromium on the same origin can read the same document.

The [reproduction](https://github.com/onmax/repros/tree/repro/okmcp-metadata-cors/okmcp-metadata-cors) checks all three cases with a GET request that sends no credentials.

Add instructions for CORS configuration to the auth guide.
Show how the host app permits browser access to this public metadata document.
RFC 9728 and the checked MCP specifications do not require the helper to supply CORS headers.

Tested with unpatched okmcp `2239349`, h3 `2.0.8`, Node `24.21.0`, Playwright `1.64.1`, and Chromium `156.0.8078.4`.
