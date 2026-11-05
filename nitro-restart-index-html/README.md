# Nitro keeps a 404 at `/` after `index.html` is added and Vite restarts

With `nitro()` as the only Vite plugin, start `vite` with no `index.html`, add one, then edit `vite.config.ts`. Vite restarts the server in the same process, but `/` keeps answering 404. A new process with the same files serves the page.

Nitro looks up `./index.html` with exsolve's `resolveModulePath(..., { try: true })`. exsolve caches the miss from the first start for the life of the process, so the lookup after the restart gets the cached miss.

Tested on Linux with Node 24.21.0 and pnpm 12.16.1. The lockfile pins Nitro 3.0.261103-rc and Vite 8.3.6.

```sh
git clone --single-branch --branch repro/nitro-restart-index-html https://github.com/onmax/repros.git
cd repros/nitro-restart-index-html
pnpm install
pnpm verify
```

`verify.mjs` starts `vite`, fetches `/`, writes `index.html`, appends a comment to `vite.config.ts`, waits for Vite's `server restarted` line and fetches `/` again. Then it stops Vite and fetches `/` from a new process. It exits 0 when the restart keeps the 404 and the new process gets 200, and restores both files.

```text
GET / before index.html:                     404
GET / after index.html and a vite restart:   404
GET / in a new process with the same files:  200

bug reproduced: the restart keeps the 404
```

`../nitro-restart-index-html-fix` has the same files plus a `pnpm patch` of the same Nitro version that passes `cache: false` to that lookup and to the `./server` one. Its `pnpm verify` exits 0 when the restart gets 200:

```text
GET / before index.html:                     404
GET / after index.html and a vite restart:   200
GET / in a new process with the same files:  200
```

`pnpm-workspace.yaml` only exempts Vite 8.3.6 from pnpm's minimum release age.
