# @vue/content-mapper: codegen plugins cannot resolve a path relative to the tsconfig

A codegen plugin gets only `config` and `vueCompilerOptions`. It does not get `compilerOptions` or the tsconfig path, but TypeScript sends both to the mapper (`OpenProjectParams.configFileName` and `OpenProjectParams.compilerOptions`).

Thus a plugin cannot resolve a relative path from its options. The mapper process runs in the folder of the `@vue/content-mapper` package, so `"rootDir": "src"` resolves to `node_modules/@vue/content-mapper/src`:

```txt
context keys:    ["config","vueCompilerOptions"], expected to include "compilerOptions"
"rootDir": "src": <fixture>/node_modules/.pnpm/@vue+content-mapper@4.0.0-alpha.3_typescript@7.1.0-beta/node_modules/@vue/content-mapper/src
expected:         <fixture>/src
```

A Volar plugin gets `compilerOptions` in its context. For example, `vue-router/volar/sfc-typed-router` uses `compilerOptions.rootDir` when its options do not set `rootDir`. Its content mapper version must get an absolute `rootDir`.

## Run

```sh
pnpm install
pnpm verify
```

`plugin.cjs` writes its context keys and its resolved `rootDir` to `ctx.log`. `verify.mjs` runs `tsc --runExternalCode` and exits 1 while the context has no `compilerOptions`.

## Environment

- `@vue/content-mapper` 4.0.0-alpha.3, the latest release. `VuePluginContext` is the same at `feat/vue-content-mapper` 4eab00cd.
- `typescript` 7.1.0-beta
- Node 24.21.0, pnpm 12.16.1, Linux
