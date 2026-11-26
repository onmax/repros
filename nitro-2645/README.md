# Nitro builds differ under `SOURCE_DATE_EPOCH`

Source issue: [nitrojs/nitro#2645](https://github.com/nitrojs/nitro/issues/2645)

Two `nitro build` runs of the same source, with the same `SOURCE_DATE_EPOCH`, produce different `.output`. Two CI runs of one commit give two different builds.

## Run

```sh
git clone --branch repro/nitro-2645 https://github.com/onmax/repros
cd repros/nitro-2645
pnpm install
pnpm verify
```

`verify.mjs` builds twice with `SOURCE_DATE_EPOCH=1700000000`. Before each build it gives the source files a different time, as a fresh checkout does. It compares every file in `.output` and exits 1 when they differ.

## Expected

```
PASS: both builds are byte-identical
```

## Actual (nitro 3.0.261103-rc, Node 24, Linux)

```
SOURCE_DATE_EPOCH=1700000000
build 1 .output: 6d6f26cd4290
build 2 .output: bc1aa54f2c19
FAIL: 2 file(s) differ between the builds

--- nitro.json
  build 1: "date": "2026-11-26T09:18:49.193Z",
  build 2: "date": "2026-11-26T09:18:49.801Z",

--- server/index.mjs
  build 1: "mtime": "2026-01-01T00:00:00.000Z"
  build 2: "mtime": "2026-02-01T00:00:00.000Z"
  build 1: "mtime": "2026-11-26T09:18:48.097Z",
  build 2: "mtime": "2026-11-26T09:18:49.705Z",
```

The three values come from:

- `nitro.json` `date`: the build time.
- the server asset `mtime` of `assets/data.txt`: the checkout time of the source file.
- the public asset `mtime` of `public/hello.txt`: the time the build copied the file into `.output/public`, so it changes on every build, even without a new checkout.

## Why each file is here

- `public/hello.txt` puts an entry in the public asset table.
- `assets/data.txt` and the `useKV("assets:server")` read in `server.ts` put an entry in the server asset table. Without the read, Nitro doesn't bundle that table.
- `unstorage` is pinned because Nitro installs it on the first build that uses `nitro/kv`.

The fixed control is in [`../nitro-2645-fix`](../nitro-2645-fix).
