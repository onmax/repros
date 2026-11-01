# Nuxt: SSR output depends on load order when the app depends on `ufo`

Issue: nuxt/nuxt#36795. Related Rolldown issue: rolldown/rolldown#11417.

The same app builds a different server depending on which files finish loading first. In a plain build, ufo lands in `_libs/_nuxt/nitro-server.mjs`. If `node_modules` files transform 50 ms later, it lands in `_chunks/ssr.mjs`, and the chunk hashes change.

## Environment

- `nuxt-nightly` 5.0.0-2611010234-c709ec8 (Nuxt main), vite 8.3.5, rolldown 1.2.16, nitro 3.0.261029-rc
- Node 24.21, Linux, pnpm 12

## Verify

```sh
pnpm install
pnpm verify
```

`verify.mjs` builds the app twice, plain and with `SLOW=1`, and prints which server file holds ufo each time. It exits 1 when the two builds differ.

```
ufo in .output/server, plain build:  [ '_libs/_nuxt/nitro-server.mjs' ]
ufo in .output/server, SLOW=1 build: [ '_chunks/ssr.mjs' ]
FAIL: the same app gives a different server depending on load order
```

## Why each part is here

- `ufo` in `dependencies`: Vite only makes bare `ufo` imports external when the app depends on it. Without it, ufo is always bundled and both builds match.
- The `slow` plugin in `nuxt.config.ts`: it only waits in `transform` and changes no code. A slow plugin or a build cache changes the order the same way.

## Cause

`paths.mjs` imports ufo by absolute path. `nuxt:resolve-externals` makes bare `ufo` imports external with that same path, but skips absolute ids. One file ends up both external and a normal module, and Rolldown keeps whichever it sees first.

## Fixed control

[`../nuxt-36795-fix`](../nuxt-36795-fix) runs the same app and verifier with the fix patched in, and passes.
