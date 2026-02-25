# nuxt-route-rules-ci-repro

Nuxt-only minimal repro for `Cannot find module '#build/route-rules.mjs'`.

This repro is intentionally reduced from NuxtHub context to isolate the Nuxt issue.

Issue context:
- [nuxt/nuxt#34164](https://github.com/nuxt/nuxt/issues/34164)

## Reproduce

```bash
rm -rf /tmp/repros
cd /tmp
git clone --depth 1 --single-branch --branch main https://github.com/onmax/repros.git
cd repros
git checkout --detach 66eb54c85606c7648bc96f797c702822ad6934ac
cd nuxt-route-rules-ci-repro
pnpm install
cd apps/web
pnpm prepare
ls -la .nuxt/app.config.mjs
if [ -f .nuxt/route-rules.mjs ]; then
  echo "NOT reproduced: .nuxt/route-rules.mjs exists"
else
  echo "Reproduced: .nuxt/route-rules.mjs is missing"
fi
```

Or, if you are already in `nuxt-route-rules-ci-repro`:

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
