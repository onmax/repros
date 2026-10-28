# okmcp browser OAuth discovery CORS

Given the unmodified `protectedResourceMetadata` handler and a Chromium page on another origin, when the page fetches its public discovery document, the browser should be able to read it with host CORS configuration, but the standalone helper supplies no CORS headers and the browser rejects the fetch.

Source report: prepared from the upstream source at the pinned commit. The upstream issue and explanation are linked in `REPORT.md` once published.

## Expected and actual

Expected: document how the hosting app enables cross-origin browser discovery, or explicitly define this as the host's responsibility.

Actual: Node receives HTTP 200 and valid metadata, while the cross-origin Chromium fetch throws `TypeError: Failed to fetch` with an `Access-Control-Allow-Origin` CORS diagnostic. The same Chromium page can read the same unmodified endpoint after navigating to its origin.

The verifier starts one local HTTP server on fixed port `49328`, uses `localhost` for the client page and `127.0.0.1` for the discovery origin, and closes Chromium and the server in `finally`. Loopback HTTP is explicitly supported by okmcp. It installs the exact Playwright-managed Chromium build into this fixture's ignored `.cache` directory before running.

Neither RFC 9728 nor the checked MCP revisions requires the helper to emit CORS. This is a browser integration/documentation request, not OAuth noncompliance. A simple GET needs no OPTIONS preflight.

## Pinned environment

- okmcp source [223934913eb929051df6116e0b58a4b67072d106](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106).
- The committed `vendor/okmcp-0.2.1-main.2239349.tgz` is an unpatched build of that source, with only its package version changed. It includes no Joxi application code or pnpm patch.
- SHA-256 `86c79ef96d39aaf8a8479d39867e584ab6f26f959900fdde53a501b0fa8f0485`.
- Node `24.21.0`, pnpm `11.28.6`, h3 `2.0.8`, Linux x86_64. pnpm's `devEngines.runtime` prepares the pinned Node runtime.
- Every run checks the runtime and archive checksum. Transitive packages are pinned in `pnpm-lock.yaml`.

## Run

```sh
git clone --branch repro/okmcp-metadata-cors --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-metadata-cors
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

The last line is the unattended install-and-verify command. Use pnpm `11.28.6`; Corepack reads the exact `packageManager` pin. It needs registry access on the first install. A successful exit means the reported symptom was reproduced; the verifier exits nonzero if the claim is false or a prerequisite fails.

Verification output is recorded in [verification.txt](verification.txt). This fixture has no deployed URL and makes no claim about platform-specific Workers behavior.

## Why these elements remain

- Playwright `1.64.1` pins Chromium and exercises actual browser enforcement; Node fetch alone would hide the failure.
- Distinct loopback hostnames create two real origins with only one listener. Node and same-origin browser controls rule out an unavailable server or invalid metadata.
- Only GET is tested. No access tokens, credentials, auth server, MCP endpoint, Nuxt, or Cloudflare deployment is needed.
- Port `49328` is fixed so cleanup can be inspected. If it is occupied, the run fails rather than selecting a hidden port.

The fixture adds no CORS fix or fixed package. It needs Chromium's normal Linux system dependencies. `pnpm exec playwright install-deps chromium` can prepare those on a machine that lacks them; OS provisioning is outside the verifier.
