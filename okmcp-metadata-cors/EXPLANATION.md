# Browser OAuth discovery needs a documented CORS recipe

A browser on another origin cannot read the public document returned by `protectedResourceMetadata` without host-supplied CORS. The standalone helper returns valid JSON and HTTP 200, but no Access-Control-Allow-Origin header.

I recommend a documentation recipe first. Neither RFC 9728 nor the checked MCP revisions requires this helper to manage CORS. Maintainers may reasonably assign it to the hosting app.

## What the reproduction proves

The same unmodified endpoint is exercised through Node and Chromium. A single local server listens on fixed port 49328; localhost and 127.0.0.1 provide distinct origins.

| Client | Actual result |
| --- | --- |
| Node fetch | HTTP 200, readable metadata |
| Chromium on another origin | TypeError: Failed to fetch, CORS diagnostic |
| Chromium on the same origin | HTTP 200, readable metadata |

This uses a simple credential-free GET. No preflight, OAuth token, real authorization server, or Cloudflare deployment is needed.

## Proposed scope

Show how a host adds CORS to the public discovery document and state whether the helper intentionally leaves that policy to the host. A default header can be discussed separately if maintainers prefer it. This report does not request application-wide CORS or changes to protected MCP responses.

## Evidence and limits

The verifier runs the actual browser enforcement and checks its CORS diagnostic. Browser and listener cleanup happen in finally. Loopback HTTP is explicitly allowed by the library. This is a browser integration gap, not a claim of OAuth noncompliance.

## Run the pinned repro

[Reproduction source and instructions](https://github.com/onmax/repros/tree/repro/okmcp-metadata-cors/okmcp-metadata-cors) · [Verification output](https://github.com/onmax/repros/tree/repro/okmcp-metadata-cors/okmcp-metadata-cors/verification.txt)

```sh
git clone --branch repro/okmcp-metadata-cors --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-metadata-cors
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

Pinned okmcp [2239349](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), unpatched committed tarball with a checked SHA-256, h3 2.0.8, Node 24.21.0, and pnpm 11.28.6. The fixture prepares its pinned Node runtime through pnpm and exits nonzero if the claimed symptom no longer occurs.

[Relevant upstream source](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/oauth/metadata.ts#L55). No upstream fix or pull request is included.
