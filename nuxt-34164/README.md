# nuxt-34164

Issue: https://github.com/nuxt/nuxt/issues/34164

## Problem
`#build/route-rules.mjs` not generated to disk in pnpm monorepo setups. Regression in 3.21 / 4.3.

The template is only in VFS (virtual file system). In pnpm monorepos with deep `.pnpm` store paths, Vite's `import-analysis` plugin fails to resolve it.

## Verify
```bash
pnpm i && cd apps/web && pnpm prepare
ls .nuxt/route-rules.mjs  # does not exist
ls .nuxt/app.config.mjs   # exists (has write: true)
```

In deep pnpm monorepo setups, `pnpm dev` fails with:
```
Pre-transform error: Failed to resolve import "#build/route-rules.mjs"
```

## Expected
`.nuxt/route-rules.mjs` written to disk like other templates.

## Actual
File only exists in VFS. Vite resolution fails in some pnpm monorepo configurations.
