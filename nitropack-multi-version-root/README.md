# nitropack 2: the top-level `node_modules/<pkg>` slot goes to a version the app doesn't import

The app imports `zod` 4.6.5. `peer-user` has a `zod` peer, so it imports zod 4.6.5 too. `pinned-user` depends on zod 4.6.7 and imports only `zod/v4`. After `nitropack build`, `.output/server/node_modules/zod` links to `.nitro/zod@4.6.7`, which holds only `package.json` and `v4/`, and the app's `import "zod"` fails:

```text
Cannot find module '.output/server/node_modules/zod/index.js'
```

With several traced versions, Nitro links the first one to the top level. It ranks a version with no package parents first, otherwise the newest version. The app's own import doesn't count as a parent, so once `peer-user` also imports 4.6.5, the newer 4.6.7 wins even though the app imports 4.6.5 by bare id. Without the `peer-user` import the build works. Nitro v3 is not affected: it rewrites the app's import to the exact traced version.

Tested on Linux with Node 24.21.0 and pnpm 12.16.1. The lockfile pins nitropack 2.13.6 (the same happens on 2.13.4). `deps/` has the two local packages and the tarballs the app installs.

```sh
git clone --single-branch --branch repro/nitropack-multi-version-root https://github.com/onmax/repros.git
cd repros/nitropack-multi-version-root
pnpm install
pnpm verify
```

`verify.mjs` builds, starts `.output/server/index.mjs` on a free port and fetches `/`. It exits 0 when `/` answers 500 and the top-level `zod` is 4.6.7.

```text
.output/server/node_modules/zod -> .nitro/zod@4.6.7
GET / -> 500 ...
server log: Cannot find module '<root>/.output/server/node_modules/zod/index.js'

bug reproduced
```

`../nitropack-multi-version-root-fix` has the same files plus a `pnpm patch` of nitropack 2.13.6 that ranks first the version the bundle imports. Its `pnpm verify` exits 0 when `/` answers 200 and the top-level `zod` is 4.6.5:

```text
.output/server/node_modules/zod -> .nitro/zod@4.6.5
GET / -> 200 {"app":"ok","peer":"a","pinned":1}
```
