# @rollup/plugin-inject keeps a full sourcemap for modules it doesn't change

When `@rollup/plugin-inject`'s first pass matches a key but the module has no reference to inject, `transform` returns the original code with `magicString.generateMap({ hires: true })`. Rollup decodes that map and keeps it in the module's `sourcemapChain` and in `bundle.cache`, so watch mode holds one segment per character for every such module.

Found in a Nuxt 4 (nitropack 2) dev server, where these maps held about 1.5 GB of heap per rebuild (1180 modules, 23.8 million segments) and the 4 GB heap ran out.

## Run

```sh
git clone --branch repro/rollup-plugin-inject-sourcemap https://github.com/onmax/repros.git
cd repros/rollup-plugin-inject-sourcemap
pnpm install && pnpm verify
```

`verify.mjs` builds one 134 KB module twice with a shared cache, as `rollup --watch` does. The module only has `options.process(...)`, a property, so `inject({ process: 'process' })` injects nothing.

Expected: the cached module keeps no sourcemap. Actual:

```
maps on cached module: 1
decoded segments:      131780
AssertionError [ERR_ASSERTION]: expected no sourcemap for a module the plugin did not change
```

`../rollup-plugin-inject-sourcemap-fix` runs the same script with a `pnpm patch` that returns `map: null` in that branch. It passes, and the output sourcemap has identical mappings in both (162000 chars, sha1 `aeb3df34b9fa`).

Pinned: `@rollup/plugin-inject` 5.0.5, `rollup` 4.67.5, Node 24.21.0, Linux.
