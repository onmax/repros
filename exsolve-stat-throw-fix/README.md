# Fixed control: exsolve probes missing paths without throwing

The same `verify.mjs` and dependencies as [`../exsolve-stat-throw`](../exsolve-stat-throw). The only difference is [`patches/exsolve@1.1.3.patch`](patches/exsolve@1.1.3.patch), which makes `tryStatSync` call `statSync(path, { throwIfNoEntry: false })`. `statSync` then returns `undefined` for a missing path instead of throwing.

## Verify

```sh
pnpm install --frozen-lockfile
pnpm verify
```

```text
exsolve 1.1.3 (patched), node v24.21.0
failed lookups:        200 x "vue/server-renderer/index.mjs", one importer each, 14 bases
time per lookup:       6.42 ms wall, 6.53 ms CPU
statSync throws:       0 per lookup (expected 0)
OK: failed lookups probe missing paths without throwing
```
