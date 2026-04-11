# nuxthub-generated-db-import-package

Minimal repro for an installed Nuxt module that generates a `.nuxt` file importing `@nuxthub/db`.

## Verify
```bash
cp app/.env.example app/.env
pnpm install
pnpm dev
```

## Expected
If the generated import is unstable, dev should fail with a broken `.nuxt/hub/db.mjs` resolution error.

## Actual
Dev boots. The generated `.nuxt/generated-db.mjs` file keeps `import { db } from '@nuxthub/db'`, and Nuxt resolves it to `node_modules/@nuxthub/db/db.mjs` in the dev bundle.

This means the minimal installed-module case does not reproduce the original broken path.
