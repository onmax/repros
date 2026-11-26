# Fixed control for nitrojs/nitro#2645

The same app and verifier as [`../nitro-2645`](../nitro-2645), with `patches/nitro@3.0.261103-rc.patch` applied to the same Nitro version. When `SOURCE_DATE_EPOCH` is set, the patch:

- writes it as the `date` in `nitro.json`;
- leaves `mtime` out of the public and server asset tables.

## Run

```sh
git clone --branch repro/nitro-2645 https://github.com/onmax/repros
cd repros/nitro-2645-fix
pnpm install
pnpm verify
```

## Result

```
SOURCE_DATE_EPOCH=1700000000
build 1 .output: d9b888762554
build 2 .output: d9b888762554
PASS: both builds are byte-identical
```

`mtime` is left out instead of set to `SOURCE_DATE_EPOCH`. A fixed `mtime` becomes a fixed `Last-Modified`, so after a rollback, a client that revalidates with `If-Modified-Since` alone would get 304 for content that changed. With no `mtime`, Nitro sends no `Last-Modified` and validates by the content `ETag`, which is identical across builds of the same source.
