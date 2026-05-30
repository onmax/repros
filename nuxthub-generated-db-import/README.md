# nuxthub-generated-db-import

Minimal repro for generated `.nuxt` files importing `@nuxthub/db`.

## Problem
A local Nuxt module emits `.nuxt/generated-db.mjs` with `import { db } from '@nuxthub/db'`.
With NuxtHub PostgreSQL configured, that generated import is expected to stay runtime-safe.

## Verify
```bash
pnpm install
pnpm dev
```

## Expected
The dev server boots and `GET /api/db-check` works.

## Actual
TBD
