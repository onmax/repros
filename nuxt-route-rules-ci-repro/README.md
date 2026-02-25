# nuxt-route-rules-ci-repro

Nuxt-only minimal repro for `Cannot find module '#build/route-rules.mjs'`.

This repro is intentionally reduced from NuxtHub context to isolate the Nuxt issue.

Issue context:
- [nuxt/nuxt#34164](https://github.com/nuxt/nuxt/issues/34164)

## Reproduce

```bash
pnpm install
cd apps/web
pnpm prepare
ls .nuxt/route-rules.mjs
```

Current behavior:
- `.nuxt/route-rules.mjs` is missing.

Expected:
- `.nuxt/route-rules.mjs` should exist, matching other generated templates used by runtime imports.

In some pnpm monorepo/dev-server contexts, this missing file leads to:

```text
Cannot find module '#build/route-rules.mjs'
```
