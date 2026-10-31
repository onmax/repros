# Control: `hasFullCollection` remembers its answer

This is the fixed control for [`../nuxt-icon-full-collection-check`](../nuxt-icon-full-collection-check). The app, lockfile, `modules/stop.ts` and verifier are the same. The only change is `app/patches/@nuxt__icon@2.6.2.patch`, listed in `app/pnpm-workspace.yaml`. It edits `dist/shared/icon.sP0tVXUq.mjs`:

```js
const fullCollectionCache = /* @__PURE__ */ new Map();
function hasFullCollection(resolvePaths) {
  const key = resolvePaths.join("\0");
  let found = fullCollectionCache.get(key);
  if (found === void 0) {
    found = isPackageExists("@iconify/json", { paths: resolvePaths });
    fullCollectionCache.set(key, found);
  }
  return found;
}
```

Every caller passes `getResolvePaths(nuxt)`, so within one build the key is the same and local-pkg runs once. A module-level cache is enough for `nuxt build`. It would outlive a Nuxt instance when `nuxt dev` reloads Nuxt in the same process, so an upstream fix could keep the cache on @nuxt/icon's module context instead, which lives as long as the Nuxt instance. This control doesn't test `nuxt dev`.

From the branch root:

```sh
node verify.mjs nuxt-icon-full-collection-check-fix
```

Expected and actual are the same here, and the verifier exits 0. Output on Slimbook on 2026-10-31:

```text
nuxt-icon-full-collection-check-fix: Node v24.21.0, nuxt 4.6.3, @nuxt/icon 2.6.2 with patches/, local-pkg 1.2.1, mlly 1.8.2, @iconify/json not installed, builds through heavy

@iconify/json checks in one `nuxt build` (to build:before), 3 collections in the server bundle:
  options               layers  paths  discover  nitro:config  template  checks  statSync  per check  .nuxt output
  default                    1      3         1             0         0       1      1746       1746  36 files b1dfbce02adbd294
  externalizeIconsJson       1      3         1             0         0       1      1746       1746  36 files b1dfbce02adbd294
  default                   20     22         1             0         0       1     14058      14058  36 files fb5241f475b21f52
  externalizeIconsJson      20     22         1             0         0       1     14058      14058  36 files fb5241f475b21f52

paths: the resolvePaths of each check, rootDir + workspaceDir + every layer root in a Set (here rootDir is in it twice, with and without the trailing slash of its layer root).
every check answered false. statSync calls in the checks: 1746 (1 layer, default) to 14058 (20 layers, externalizeIconsJson), 8.1x.

expected: one @iconify/json check per build, since the answer cannot change during a build
actual:   every build checks once (1746, 1746, 14058, 14058 statSync calls)
```

The `.nuxt output` hashes match the failing fixture row for row, so the generated files, including `nuxt-icon-server-bundle.mjs`, are unchanged. The one remaining check still grows with the number of layers; that cost is the separate local-pkg bug. In the lab copy of the production app with 22 layers, this memo took start-up to `build:before` from 15.78 s to 11.93 s, median of 5 runs on an idle 4-core VPS.

Written by an AI agent, Claude Code, on 2026-10-31. A human has not reviewed it yet.
