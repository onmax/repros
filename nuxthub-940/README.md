# @nuxthub/core: `dist/module.mjs` imports a directory

Source issue: nuxt-hub/core#940

`@nuxthub/core@0.10.10` ships `dist/module.mjs` with this line:

```js
import { ... } from './db/lib';
```

Node's ESM loader rejects directory imports with `ERR_UNSUPPORTED_DIR_IMPORT`. So `@nuxt/kit` loads the module through jiti, and with `future.compatibilityVersion: 5` every `nuxt prepare`, `nuxt dev`, and `nuxt build` prints `NUXT_B8023`.

## Run

```sh
pnpm install
pnpm verify
```

`verify.mjs` checks two things. It imports `@nuxthub/core` with plain Node, and it runs `nuxt prepare` and looks for the `NUXT_B8023` warning. It exits 1 when either check fails.

## Expected

```
node import @nuxthub/core
  expected: exit 0
  actual:   exit 0
nuxt prepare (future.compatibilityVersion: 5)
  expected: no NUXT_B8023 warning for @nuxthub/core
  actual:   no warning
```

## Actual

```
node import @nuxthub/core
  expected: exit 0
  actual:   exit 1, Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import '.../@nuxthub/core/dist/db/lib' is not supported resolving ES modules imported from .../@nuxthub/core/dist/module.mjs
nuxt prepare (future.compatibilityVersion: 5)
  expected: no NUXT_B8023 warning for @nuxthub/core
  actual:   [warn] [NUXT_B8023] The module `@nuxthub/core` was loaded through jiti because the runtime could not load it: Directory import '.../@nuxthub/core/dist/db/lib' is not supported ...

FAIL: @nuxthub/core cannot be loaded natively (issue #940 reproduced)
```

## Environment

- `@nuxthub/core` 0.10.10 (latest; 0.10.8 from the issue has the same import)
- `nuxt` 4.6.1
- Node 24.21.0, pnpm 11.28.5

## Why each piece is here

- `future.compatibilityVersion: 5` is required for the warning. Without it Nuxt still falls back to jiti but stays silent. The plain Node import check fails either way.
- The app needs no pages or hub features. `dist/module.mjs` imports `./db/lib` at the top level, so registering the module is enough.

The fixed control is in `../nuxthub-940-fix`. It is the same app with a `pnpm patch` that changes the specifier to `./db/lib/index.mjs`, and the same `pnpm verify` passes there.
