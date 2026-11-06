# Fixed control

Same fixture and `verify.mjs` as `../rollup-plugin-inject-sourcemap`, with `patches/@rollup__plugin-inject@5.0.5.patch` returning `map: null` when the plugin injects nothing.

```sh
pnpm install && pnpm verify
```

```
maps on cached module: 0
decoded segments:      0
ok: the unchanged module keeps no sourcemap
```
