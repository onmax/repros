# unovis-740

Issue: https://github.com/f5/unovis/issues/740

## Problem

`@unovis/ts@1.6.4` ships with `treeshake: false` in rollup config. The barrel `index.js` re-exports everything, so importing a lightweight enum like `CurveType` pulls in elkjs, three, leaflet, maplibre-gl, dagre. This causes OOM on memory-constrained builds (e.g. Cloudflare Pages).

## Verify

```bash
pnpm i && pnpm build:oom
```

## Expected

Importing only `CurveType` should produce a tiny bundle (~1KB).

## Actual

Build pulls entire library graph including heavy deps (elkjs, three, leaflet, maplibre-gl). OOM with 256MB heap limit.
