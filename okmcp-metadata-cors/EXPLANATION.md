# Browser discovery needs CORS setup

The public `protectedResourceMetadata` document lacks `Access-Control-Allow-Origin`. Chromium blocks a cross-origin GET. Node and same-origin Chromium read the same endpoint.

The [repro](https://github.com/onmax/repros/tree/repro/okmcp-metadata-cors/okmcp-metadata-cors) checks all three cases and closes its browser and listener.

I recommend documenting host CORS configuration. Neither RFC 9728 nor the checked MCP specs requires the helper to supply it.

Unpatched [okmcp `2239349`](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), h3 `2.0.8`, Node `24.21.0`, Playwright `1.64.1`.

[Run instructions](https://github.com/onmax/repros/tree/repro/okmcp-metadata-cors/okmcp-metadata-cors) · [Output](https://github.com/onmax/repros/tree/repro/okmcp-metadata-cors/okmcp-metadata-cors/verification.txt) · [Headers](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/oauth/metadata.ts#L55)
