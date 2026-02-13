# unovis-740-fix

Issue: https://github.com/f5/unovis/issues/740

## Problem

`@unovis/ts@1.6.4` barrel `index.js` re-exports all components. Importing anything from the root entry forces Vite to resolve ~1500 modules (elkjs, three, leaflet, maplibre, dagre…) during the transform phase, before treeshaking kicks in. This causes OOM on memory-constrained builds (e.g. Cloudflare Pages with 256MB heap).

## Fix

Use granular/subpath imports instead of the barrel:

```diff
-import { CurveType } from '@unovis/ts'
+import { CurveType } from '@unovis/ts/types/curve'
```

This bypasses the barrel entirely → only 63 modules parsed vs ~1500.

## Verify

```bash
pnpm i && pnpm verify
```

## Expected

```
modules parsed from node_modules: 63
bundle size: 15.6 KB

no heavy deps found
```

## Actual (with barrel import)

```
modules parsed from node_modules: 1492
bundle size: 15.6 KB

heavy deps pulled in for a single enum import: elkjs, three, leaflet
```

## Why PR #740 alone doesn't fix it

The PR enables treeshaking in @unovis/ts's own rollup build, which:
- Removes side-effect `import` statements from `index.js` (e.g. `import './containers.js'`)
- Eliminates 16 intermediate barrel files from dist
- Makes the dist ~1MB smaller (12M → 11M)

But `index.js` still has `export { LeafletMap } from './components/leaflet-map/index.js'` etc.
Vite resolves ALL re-export targets during module resolution (before treeshaking), so the same ~1500 modules are parsed and the OOM persists.
