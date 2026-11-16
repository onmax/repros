# `miniflare@latest` can't run current compatibility dates, and the v5 Quick Start fails

`npm install miniflare` installs 4.20260730.0 (the `latest` tag). Its workerd supports compatibility dates up to 2026-08-06, so a Worker with a current date does not start. Wrangler 4.163.0 depends on `miniflare@5.20261116.0-beta`, but the Quick Start in that version's README still passes the v4 options and Miniflare 5 rejects them.

## Verify

```sh
pnpm install
pnpm verify
```

`verify.mjs` starts one Worker with `miniflare` 4.20260730.0 and `compatibilityDate: "2026-11-14"`, and runs the README Quick Start (`new Miniflare({ script })`) with 5.20261116.0-beta. It exits 1 when either fails.

## Result

Node 24.21.0, Linux:

```
miniflare 4.20260730.0 (latest tag), compatibilityDate 2026-11-14: FAIL
  The Workers runtime failed to start. ...
  service core:user:: This Worker requires compatibility date "2026-11-14", but the newest date supported by this server binary is "2026-08-06".
miniflare 5.20261116.0-beta, README Quick Start: FAIL
  Unexpected options passed to `new Miniflare()` constructor:
  ✖ Unrecognized key: "script"
  ✖ Invalid input: expected array, received undefined
```

`convertV4MiniflareOptions()` from the v5 package turns the same v4 options into ones v5 accepts.
