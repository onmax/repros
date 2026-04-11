# Cloudflare Deployment Lane Report (`#build/route-rules.mjs`)

Generated: 2026-02-17

## Goal
Validate whether Cloudflare Worker deployment is a distinct trigger for `#build/route-rules.mjs` failures, and whether `@nuxthub/core@0.10.6` vs `@nuxthub/core@831` changes the outcome.

## Cases
- `saas-cf-old`: `/Users/maxi/repros/.scratch/causality-matrix/cases/saas-cf-old` (`@nuxthub/core@0.10.6`)
- `saas-cf-831`: `/Users/maxi/repros/.scratch/causality-matrix/cases/saas-cf-831` (`@nuxthub/core@https://pkg.pr.new/@nuxthub/core@831`)

Both are copied from `/Users/maxi/nuxt/saas` and run with:
1. `pnpm i`
2. `pnpm rebuild better-sqlite3`
3. `NITRO_PRESET=cloudflare-module pnpm run build`
4. `wrangler deploy --dry-run` (from `.output/server`)
5. `wrangler dev` + `curl /`

## Node 22.22.0 Results
| Case | build | dry-run | wrangler dev | route-rules error | physical shim delta |
|---|---:|---:|---:|---|---|
| saas-cf-old | 0 | 0 | 0 | no | kv: true, db: true, blob: false |
| saas-cf-831 | 0 | 0 | 0 | no | kv: true, db: true, blob: false |

Evidence:
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-old/node22/summary.json`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-831/node22/summary.json`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-old/node22/cloudflare-build.log`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-831/node22/cloudflare-build.log`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-old/node22/cloudflare-dryrun.log`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-831/node22/cloudflare-dryrun.log`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-old/node22/wrangler-dev.log`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-831/node22/wrangler-dev.log`

## Node 25.6.1 Sanity
| Case | build | dry-run | route-rules error |
|---|---:|---:|---|
| saas-cf-old | 0 | 0 | no |
| saas-cf-831 | 0 | 0 | no |

Evidence:
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-old/node25/summary.json`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v2/saas-cf-831/node25/summary.json`

## What This Shows
1. Cloudflare deployment path (`nuxt build` + `wrangler deploy --dry-run`) does **not** reproduce `#build/route-rules.mjs` in either old or PR831 NuxtHub package.
2. `@nuxthub/core@831` and `@nuxthub/core@0.10.6` are behaviorally equivalent in this lane for route-rules resolution.
3. Both variants still create physical `@nuxthub/kv` and `@nuxthub/db` shims during build (expected from `nitro:build:before`), but this does not cause the route-rules failure in Cloudflare deployment flow.
4. The only recurring deployment-time warning here is `Duplicate key "provider" in object literal` from bundled server output; unrelated to route-rules import resolution.

## Interpretation
The Cloudflare Worker deployment path appears to be an **amplifier visibility lane**, not the root trigger for `#build/route-rules.mjs`, based on this controlled reproduction. If the issue appears only on a specific Cloudflare deployment, it likely depends on additional project-specific factors (different build command, extra pre-build steps, cached artifacts, or branch-specific dependency graph), not on Cloudflare runtime itself.

## Relevant Code Pointers
Old immediate physical writes:
- `/tmp/nuxthub-core-0106-d8DIUn/package/dist/module.mjs:609`
- `/tmp/nuxthub-core-0106-d8DIUn/package/dist/module.mjs:748`
- `/tmp/nuxthub-core-0106-d8DIUn/package/dist/module.mjs:843`

PR831 deferred physical writes on build hook:
- `/Users/maxi/nuxt/saas/node_modules/.pnpm/@nuxthub+core@https+++pkg.pr.new+@nuxthub+core@831_db0@0.3.4_@electric-sql+pglite@0.3.1_e1b28f2e8ccb0efb1a88a18d2de4a065/node_modules/@nuxthub/core/dist/module.mjs:716`
- `/Users/maxi/nuxt/saas/node_modules/.pnpm/@nuxthub+core@https+++pkg.pr.new+@nuxthub+core@831_db0@0.3.4_@electric-sql+pglite@0.3.1_e1b28f2e8ccb0efb1a88a18d2de4a065/node_modules/@nuxthub/core/dist/module.mjs:881`
- `/Users/maxi/nuxt/saas/node_modules/.pnpm/@nuxthub+core@https+++pkg.pr.new+@nuxthub+core@831_db0@0.3.4_@electric-sql+pglite@0.3.1_e1b28f2e8ccb0efb1a88a18d2de4a065/node_modules/@nuxthub/core/dist/module.mjs:990`
