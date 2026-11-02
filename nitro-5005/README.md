# Nitro can't find the entry of a service marked as built

For nitrojs/nitro#5005.

A plugin marks the `ssr` environment as built before Nitro's `buildApp`, as a framework would after restoring the ssr output from a build cache. Nitro skips the build, but it only learns a service's entry file while it builds it. It then imports the folder `node_modules/.nitro/vite/services/ssr`. That works only when the entry is `index.mjs`. With `entryFileNames: "[name]-[hash].mjs"` the build fails.

Tested on Linux with Node 24.21.0 and pnpm 12.16.1. The lockfile pins Nitro 3.0.261029-rc, Vite 8.3.5 and Rolldown 1.2.16.

```sh
git clone --single-branch --branch repro/nitro-5005 https://github.com/onmax/repros.git
cd repros/nitro-5005
pnpm install
pnpm verify
```

`verify.mjs` builds once normally, then again with `SKIP_SSR=1`. It does this twice: with a custom entry name, and with `CONTROL=1`, which keeps Vite's default `index.mjs`. It exits 0 when the custom name fails and the control works.

```text
repro   ([name]-[hash].mjs): build with ssr skipped fails: [UNRESOLVED_IMPORT] Could not resolve '<root>/node_modules/.nitro/vite/services/ssr' in #nitro/virtual/vite-services
control (index.mjs): build with ssr skipped works, responds "hello from ssr"

bug reproduced: true, control passes: true
```

The fixture uses the `standard` preset so `verify.mjs` can call the server's `fetch` without a port. The default `node-server` preset fails the same way.
