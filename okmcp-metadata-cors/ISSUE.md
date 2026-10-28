A browser client on another origin cannot read the public discovery document returned by `protectedResourceMetadata` unless the host adds CORS. The helper returns valid JSON and HTTP 200, but no `Access-Control-Allow-Origin`.

Could the auth guide document the required hosting configuration, or explicitly state that CORS is left to the host? Neither RFC 9728 nor the checked MCP revisions requires the helper itself to manage CORS; this is a browser integration/documentation request.

Reproduced with unpatched okmcp main [`223934913eb929051df6116e0b58a4b67072d106`](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), locally built as `0.2.1-main.2239349`, h3 `2.0.8`, Node `24.21.0`, pnpm `11.28.6`, Playwright `1.64.1`, and Chromium `156.0.8078.4`.

- [Executable browser reproduction](https://github.com/onmax/repros/tree/repro/okmcp-metadata-cors/okmcp-metadata-cors)
- [Explanation and controls](https://drop.vitehub.dev/d/wcbgy325rybb/okmcp-metadata-cors)
- [Recorded verification](https://github.com/onmax/repros/blob/repro/okmcp-metadata-cors/okmcp-metadata-cors/verification.txt)

Run:

```sh
git clone --branch repro/okmcp-metadata-cors --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-metadata-cors
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

The command installs the pinned Chromium build, starts one local listener on port 49328, makes the assertions, and closes both browser and listener. It needs Chromium's normal Linux system dependencies.

The standalone handler is:

```js
protectedResourceMetadata({
  resource: "http://127.0.0.1:49328/mcp",
  authorizationServers: ["http://127.0.0.1:49328/auth"],
})
```

A page at `http://localhost:49328` makes a simple GET to `http://127.0.0.1:49328/.well-known/oauth-protected-resource`.

| Client | Observed result |
| --- | --- |
| Node fetch | HTTP 200 and readable metadata |
| Chromium on localhost | TypeError: Failed to fetch; missing Access-Control-Allow-Origin CORS diagnostic |
| Same Chromium page navigated to 127.0.0.1 | HTTP 200 and readable metadata |

These controls use the identical unmodified endpoint. Loopback HTTP is explicitly supported by okmcp. No credentials, access token, preflight, live authorization server, or Cloudflare deployment is involved.

Expected integration guidance: a recipe for CORS on this public metadata route, such as a credential-free GET/HEAD response with an appropriate `Access-Control-Allow-Origin`. A default helper header could also work if that fits the library's policy, but application-wide CORS or changes to protected MCP responses are outside this request.

Relevant source: [metadata response headers](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/oauth/metadata.ts#L55). Documentation: [Protected resource metadata](https://mcp.h3.dev/security/auth#protected-resource-metadata).
