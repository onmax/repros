# nuxthub-nitropack-db-boundary

Minimal repro for the NuxtHub DB packaging boundary around bare `nitropack` imports.

## Problem
NuxtHub documents `@nuxthub/db` as a generated physical package that can be imported by external tools and app code. In a clean Nuxt app, `nitropack/runtime` is not resolvable as a bare package boundary even though Nuxt uses Nitro internally.

This repro shows both facts:

1. `nuxt prepare` generates `node_modules/@nuxthub/db`
2. the app still cannot resolve bare `nitropack/runtime`

That means generated packages and external consumers cannot safely assume bare `nitropack` is available unless that dependency boundary is provided explicitly.

## Verify
```bash
pnpm i
pnpm exec nuxt prepare
test -f node_modules/@nuxthub/db/package.json && echo "@nuxthub/db generated"
node -e "import('nitropack/runtime').then(()=>console.log('nitropack ok')).catch((e)=>{console.error(e.code, e.message); process.exit(1)})"
node -e "import('@nuxthub/db').then(()=>{console.log('db ok'); process.exit(0)}).catch((e)=>{console.error(e.code, e.message); process.exit(1)})"
```

## Expected
- `node_modules/@nuxthub/db/package.json` exists after `nuxt prepare`
- `import('@nuxthub/db')` succeeds
- bare `import('nitropack/runtime')` still fails in the app environment

## Actual
- `pnpm i` completed successfully on stable `@nuxthub/core@0.10.7`
- `nuxt prepare` generated `node_modules/@nuxthub/db/package.json`
- `import('@nuxthub/db')` succeeds
- bare `import('nitropack/runtime')` fails with:

```txt
ERR_MODULE_NOT_FOUND Cannot find package 'nitropack' imported from /Users/maxi/repros/nuxthub-nitropack-db-boundary/[eval]
```

## Notes
- This repro uses stable `@nuxthub/core@0.10.7` first.
- Stable already reproduces the bare `nitropack/runtime` resolution failure, so no preview package was needed.
- The repro includes `@electric-sql/pglite` because the generated local dev `@nuxthub/db` client uses Drizzle's PGlite driver.
