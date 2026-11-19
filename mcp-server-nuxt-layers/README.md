# mcp-server-nuxt: layers and module pages missing from `inspect_layers` and `list_routes`

In a Nuxt 4.6.4 app with `extends` layers, an auto-registered `layers/base` layer and a module that adds a page with `extendPages`, Nuxt resolves four layers and three pages. `mcp-server-nuxt` 0.8.0 reports only the project layer and no routes at all.

## Run

```sh
pnpm install
pnpm verify                                   # server reads the app with Kit (Nuxt installed)
MCP_REPRO_PARSER=1 pnpm verify                # server reads a copy without node_modules (source parser)
MCP_SERVER_NUXT_ENTRY=/path/to/mcp-server-nuxt/dist/index.js pnpm verify   # any local build
```

`verify.mjs` loads the app with `@nuxt/kit` (`loadNuxt` + `buildNuxt` in prepare mode, temp build dir) and records `nuxt.options._layers` and the `pages:resolved` hook. It then starts the server over stdio, calls `inspect_layers` and `list_routes`, prints both sides, and checks five claims. It exits 1 when any claim fails.

## Expected (Nuxt 4.6.4)

```
Nuxt _layers:         [".","layers/base","ext/a","ext/b"]
Nuxt pages:resolved:  [["/from-layer","layers/base/pages/from-layer.vue"],["/shared","ext/a/pages/shared.vue"],["/module-admin","modules/runtime/admin.vue"]]
```

## Actual, mcp-server-nuxt 0.8.0 (same on main at 3b17d46, 0.9.0)

With Nuxt installed:

```
inspect_layers:  ["."]
list_routes:     []
FAIL  inspect_layers matches Nuxt _layers (same layers, same order)
FAIL  list_routes includes /from-layer from auto-registered layers/base
FAIL  list_routes includes /shared from the extends layers
FAIL  list_routes reports /shared once, from the file Nuxt uses
FAIL  list_routes includes /module-admin added by extendPages
```

Source parser (`MCP_REPRO_PARSER=1`):

```
inspect_layers:  [".","ext/b","ext/a"]
list_routes:     [["/shared","ext/b/pages/shared.vue"],["/shared","ext/a/pages/shared.vue"]]
FAIL  inspect_layers matches Nuxt _layers (same layers, same order)
FAIL  list_routes includes /from-layer from auto-registered layers/base
PASS  list_routes includes /shared from the extends layers
FAIL  list_routes reports /shared once, from the file Nuxt uses
FAIL  list_routes includes /module-admin added by extendPages
```

## Why each file is here

- `ext/a`, `ext/b`: two `extends` layers that both define `/shared`. Nuxt uses `ext/a` (earlier entry wins), which shows the order and the shadowed duplicate.
- `layers/base`: auto-registered layer with no `extends` entry. Its `nuxt.config.ts` is required; without it Nuxt prints `Cannot extend config from layers/base/` and skips the layer. Same for the `ext/*` configs.
- `modules/pages.ts`: adds `/module-admin` with `extendPages`, so it exists only in Nuxt's resolved pages.
- `@nuxt/kit` is a direct dependency because `modules/pages.ts` and `verify.mjs` import it.
- The project has no `pages/` of its own; removing `pages/index.vue` changed nothing in Nuxt's output.

## Environment

Node 24.21.0, Linux, pnpm 10.20.0. `nuxt` 4.6.4, `@nuxt/kit` 4.6.4, `mcp-server-nuxt` 0.8.0 from npm (latest published on 2026-11-19). Upstream main at `3b17d469b551356fe6104df17d49384963ec4f23` (0.9.0, unpublished) gives the same output; 0.8.0 to 0.9.0 only adds `explain_injections`.
