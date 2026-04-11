# Causality Matrix Report

Generated: 2026-02-17T17:23:08.272Z

## Baseline Freeze
- Canonical failure signature: `Pre-transform error: Failed to resolve import "#build/route-rules.mjs"` or `Cannot find module `#build/route-rules.mjs``.
- Primary env: Node `22.22.0` + pnpm `10.x`.
- Secondary env: Node `25.6.1`.
- Nuxt references: `/Users/maxi/nuxt/nuxt/main/packages/nitro-server/src/index.ts`, `/Users/maxi/nuxt/nuxt/main/packages/nuxt/src/core/plugins/virtual.ts`.
- NuxtHub references (old): `/Users/maxi/nuxt/hub/src/blob/setup.ts`, `/Users/maxi/nuxt/hub/src/kv/setup.ts`, `/Users/maxi/nuxt/hub/src/db/setup.ts`.
- NuxtHub references (PR831 package): `/Users/maxi/nuxt/saas/node_modules/.pnpm/@nuxthub+core@https+++pkg.pr.new+@nuxthub+core@831_db0@0.3.4_@electric-sql+pglite@0.3.1_e1b28f2e8ccb0efb1a88a18d2de4a065/node_modules/@nuxthub/core/dist/module.mjs`.

## Matrix Results

### node22

| Case | Scenario | Exit | Route-rules failure | hub writes (blob/kv/db) | Notes |
|---|---|---:|---|---|---|
| nuxt-only | dev | 0 | no | no/no/no |  |
| nuxt-only | typecheck | 0 | no | no/no/no |  |
| nuxt-only | typecheck-build-concurrent | 0 | no | no/no/no |  |
| nuxt+hub-old | dev | 0 | no | no/no/no |  |
| nuxt+hub-old | typecheck | 0 | no | yes/yes/yes |  |
| nuxt+hub-old | typecheck-build-concurrent | 0 | no | yes/yes/yes |  |
| nuxt+hub-831 | dev | 0 | no | no/no/no |  |
| nuxt+hub-831 | typecheck | 0 | no | no/no/no |  |
| nuxt+hub-831 | typecheck-build-concurrent | 0 | no | yes/yes/yes |  |
| saas-pr253-canary | dev | 0 | no | no/no/no |  |
| saas-pr253-canary | typecheck | 1 | no | no/no/no |  |
| saas-pr253-canary | typecheck-build-concurrent | 1 | no | no/no/no |  ERROR  The module '/Users/maxi/nuxt/saas/node_modules/.pnpm/better-sqlite3@12.6.2/node_modules/better-sqlite3/build/Release/better_sqlite3.node' |

### node25

| Case | Scenario | Exit | Route-rules failure | hub writes (blob/kv/db) | Notes |
|---|---|---:|---|---|---|
| nuxt-only | dev | 0 | no | no/no/no |  |
| nuxt-only | typecheck | 0 | no | no/no/no |  |
| nuxt-only | typecheck-build-concurrent | 0 | no | no/no/no |  |
| nuxt+hub-old | dev | 0 | no | no/no/no |  |
| nuxt+hub-old | typecheck | 0 | no | yes/yes/yes |  |
| nuxt+hub-old | typecheck-build-concurrent | 0 | no | yes/yes/yes |  |
| nuxt+hub-831 | dev | 0 | no | no/no/no |  |
| nuxt+hub-831 | typecheck | 0 | no | no/no/no |  |
| nuxt+hub-831 | typecheck-build-concurrent | 0 | no | yes/yes/yes |  |
| saas-pr253-canary | dev | 0 | no | no/no/no |  |
| saas-pr253-canary | typecheck | 1 | no | no/no/no |  |
| saas-pr253-canary | typecheck-build-concurrent | 1 | no | no/no/no |  ERROR  ENOENT: no such file or directory, unlink '/Users/maxi/nuxt/saas/.data/db/queries/content-database-001.sql' |

## Parent node_modules contamination check
- Result: route-rules failure = **no** using parent fake vite package.

## Attribution Decision
| Rule | Observed | Verdict |
|---|---|---|
| Nuxt-only reproduces route-rules failure | no | Not proven by this matrix |
| Nuxt+Hub-old reproduces route-rules failure | no | No direct route-rules signal |
| Nuxt+Hub-831 reproduces route-rules failure | no | NuxtHub 831 not triggering route-rules here |
| Nuxt+Hub-old writes shims during typecheck | yes | Amplifier confirmed (shared mutable node_modules writes) |
| Nuxt+Hub-831 writes shims during typecheck | no | Improved behavior vs old expected |
| SaaS PR253 canary route-rules failure | no | Canary did not reproduce route-rules failure |

## Deterministic Commands
- NuxtHub amplifier fail (old behavior): `cd /Users/maxi/repros/.scratch/causality-matrix/cases/nuxt-hub-old && fnm exec --using 22.22.0 pnpm i && rm -rf node_modules/@nuxthub/blob node_modules/@nuxthub/kv node_modules/@nuxthub/db && fnm exec --using 22.22.0 bash -lc "pnpm -s run prepare && pnpm -s run typecheck" || true; test -d node_modules/@nuxthub/blob`
- NuxtHub amplifier pass (831 behavior): `cd /Users/maxi/repros/.scratch/causality-matrix/cases/nuxt-hub-831 && fnm exec --using 22.22.0 pnpm i && rm -rf node_modules/@nuxthub/blob node_modules/@nuxthub/kv node_modules/@nuxthub/db && fnm exec --using 22.22.0 bash -lc "pnpm -s run prepare && pnpm -s run typecheck" || true; test ! -d node_modules/@nuxthub/blob`
- Nuxt route-rules synthetic fail: `cd /Users/maxi/repros/nuxt-34346 && pnpm i && pnpm verify` (fails by design).
- Nuxt route-rules synthetic pass: `cd /Users/maxi/repros/nuxt-34346-fix && pnpm i && pnpm verify` (passes with fallback patch).

## Upstream Target Recommendation
1. Keep Nuxt root-cause tracking in `nuxt/nuxt#34164` for real `#build/route-rules.mjs` resolution failures.
2. Treat NuxtHub issue as amplifier class (shared mutable shims) validated by old-vs-831 behavior (`nuxt-hub/core#830` / `nuxt-hub/core#831`).
3. No new public issue should be posted before approval. Prepare draft payloads only.

## Draft Payloads
- Nuxt draft: `/Users/maxi/repros/.scratch/causality-matrix/issue-drafts/nuxt-34164-followup.md`
- NuxtHub draft: `/Users/maxi/repros/.scratch/causality-matrix/issue-drafts/nuxthub-amplifier-followup.md`
## Cloudflare Deployment Lane (SaaS Canary)
- Dedicated report: `/Users/maxi/repros/.scratch/causality-matrix/CLOUDFLARE-REPORT.md`
- Aggregated results: `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/all-results.json`
- Outcome: Node `22.22.0` and `25.6.1` both pass `build` + `wrangler deploy --dry-run` for `@nuxthub/core@0.10.6` and `@nuxthub/core@831`.
- Route-rules signature (`#build/route-rules.mjs`) was not reproduced in this Cloudflare lane.
- Runtime probe report: `/Users/maxi/repros/.scratch/causality-matrix/CLOUDFLARE-RUNTIME-REPORT.md`
- Runtime aggregate: `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v3-runtime/all-results.json`
- Runtime result: no `#build/route-rules.mjs` signature in either `@nuxthub/core@0.10.6` or `@nuxthub/core@831`; observed errors are D1/content table state issues.
