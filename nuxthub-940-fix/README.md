# @nuxthub/core directory import: fixed control

The app is identical to `../nuxthub-940`. The only difference is `patches/@nuxthub__core@0.10.10.patch`, which changes one line in `dist/module.mjs`:

```diff
-import { ... } from './db/lib';
+import { ... } from './db/lib/index.mjs';
```

```sh
pnpm install
pnpm verify   # PASS: Node imports the module, and nuxt prepare prints no NUXT_B8023
```
