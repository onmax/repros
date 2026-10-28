# Browser discovery needs CORS setup

A browser on another origin cannot read the public document returned by `protectedResourceMetadata`. The handler returns HTTP 200 without `Access-Control-Allow-Origin`, so Chromium blocks access to the response.

Reproduces [h3js/okmcp#38](https://github.com/h3js/okmcp/issues/38).

## Run

```sh
git clone --branch repro/okmcp-metadata-cors --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-metadata-cors
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

Use pnpm `11.28.6`. It prepares Node `24.21.0` automatically. The verifier downloads Chromium and needs port `49328` free. `PASS` means the reported failure was reproduced.

## What the test shows

Node and a browser on the same origin can read the document. A browser on another origin receives `TypeError: Failed to fetch`, with a CORS error in its console.

The test uses `localhost` and `127.0.0.1` as separate origins, with one local server. It sends GET requests without credentials and closes Chromium and the server afterward. Full output is in [verification.txt](verification.txt).

This is a request to document CORS setup in the host app. The checked specifications do not require the helper itself to add these headers.

<details>
<summary>Versions and prerequisites</summary>

Unpatched okmcp `223934913eb929051df6116e0b58a4b67072d106`, h3 `2.0.8`, Playwright `1.64.1`, and Chromium `156.0.8078.4`. Verified on Linux x86_64.

The first run needs registry and browser-download access. Chromium also needs its Linux system dependencies. If they are missing, prepare them with `pnpm exec playwright install-deps chromium`.

The committed `vendor/okmcp-0.2.1-main.2239349.tgz` is built from that commit, with only its package version changed. The verifier checks the runtime and archive checksum on every run. Dependencies are pinned in `pnpm-lock.yaml`.

SHA-256: `86c79ef96d39aaf8a8479d39867e584ab6f26f959900fdde53a501b0fa8f0485`.

</details>
