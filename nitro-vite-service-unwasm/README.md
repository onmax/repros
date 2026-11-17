# Nitro: Vite service environments use the `unwasm` condition without the unwasm plugin

`nitro/vite` gives each service environment (Nuxt's `ssr` environment is one) Nitro's export conditions, which include `wasm` and `unwasm`. Only the `nitro` environment runs the unwasm plugin. A package that maps a subpath to a raw `.wasm` file under `unwasm` therefore resolves to that file in a service, and Rolldown tries to load it as a native WebAssembly import.

Shiki does this: `shiki/wasm` is `./dist/onig.wasm` under `unwasm`. `onig.wasm` imports its glue from a module named `env`, so the service build stops. The same import builds and runs in the `nitro` environment.

Pinned: `nitro@3.0.261103-rc`, `vite@8.3.8`, `shiki@4.6.0`, `wrangler@4.163.0` (local workerd), Node 24. Preset `cloudflare_module`; the Node preset fails the same way.

```sh
npm install
npm run verify   # builds, then starts `wrangler dev` on 127.0.0.1:47781 (PORT=... to change)
```

Expected: the build passes, and `GET /nitro` and `GET /service` both return highlighted HTML.

Actual: `vite build` stops in the `ssr` environment:

```
Error: [vite]: Rolldown failed to resolve import "env" from ".../node_modules/shiki/dist/onig.wasm".
```

`verify` exits 1.

Files:

- `highlight.ts` calls Shiki's `codeToHtml`.
- `server/routes/nitro.ts` imports it in the `nitro` environment (works).
- `service.ts` imports it in the `ssr` service, and `server/routes/service.ts` forwards to it with `fetchService()`.
- `vite.config.ts` bundles `shiki` into the service with `environments.ssr.resolve.noExternal`, as Nuxt does for `build.transpile` packages. Without it the service keeps `shiki` external and the build passes.
