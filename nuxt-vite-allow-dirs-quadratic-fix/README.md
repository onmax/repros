# Control: `allowDirs` de-duplicated, then filtered with a `Set`

This is the fixed control for [`../nuxt-vite-allow-dirs-quadratic`](../nuxt-vite-allow-dirs-quadratic). The app, layer, lockfile and verifier are the same. The only change is `app/patches/@nuxt__vite-builder-nightly@5.0.0-2610221052-8c52432.patch`, listed in `app/pnpm-workspace.yaml`. It replaces the filter with:

```js
function removeNestedDirs(dirs) {
  const unique = new Set(dirs)
  return [...unique].filter((dir) => {
    for (let i = dir.indexOf('/'); i !== -1; i = dir.indexOf('/', i + 1)) if (unique.has(dir.slice(0, i))) return false
    return true
  })
}
```

An entry was dropped when another entry plus `/` was a prefix of it. That other entry is always `dir.slice(0, i)` for some `/` at position `i`, so looking those up in the `Set` drops the same entries. The cost is one lookup per `/` in each unique path.

From the branch root:

```sh
node verify.mjs nuxt-vite-allow-dirs-quadratic-fix
```

Expected and actual are the same here, and the verifier exits 0. Output on Slimbook on 2026-10-24:

```text
nuxt-vite-allow-dirs-quadratic-fix: Node v24.21.0, nuxt-nightly 5.0.0-2610221052-8c52432, @nuxt/vite-builder-nightly 5.0.0-2610221052-8c52432 with patches/, vite 8.3.5, builds through heavy

time from build:before to vite:extend, median of 3 build(s) per size:
    500 components (526 registered)       12.0 ms   fs.allow: 5 entries
   2000 components (2026 registered)       15.8 ms   fs.allow: 5 entries
   5000 components (5026 registered)       24.2 ms   fs.allow: 5 entries

each extra component costs 2.5 µs from 500 to 2000 and 2.8 µs from 2000 to 5000: 1.1x (linear 1x, quadratic 2.8x)
server.fs.allow for 5000 components:
  <fixture>/app
  <fixture>/layer/
  <fixture>/layer/app/components
  <fixture>/app/.nuxt
  <fixture>/app

expected: the cost per extra component stays flat (linear)
actual:   it changes 1.1x, and 5000 components take 24 ms
```

`server.fs.allow` is the same list as in the failing fixture. The upstream change is on `onmax/nuxt`, branch `perf/vite-allow-dirs-dedupe`.

Written by an AI agent, Claude Code, on 2026-10-24. A human has not reviewed it yet.
