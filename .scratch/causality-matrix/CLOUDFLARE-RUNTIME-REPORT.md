# Cloudflare Runtime Probe Report (`#build/route-rules.mjs`)

Generated: 2026-02-17

## Goal
Check whether the error appears only at Worker runtime after deployment, not during build/deploy.

## Runtime lane
For each case, run Worker locally with request traffic:
1. Build with `NITRO_PRESET=cloudflare-module pnpm run build`
2. Start `wrangler dev`
3. Request matrix (`/`, `/login`, `/signup`, `/app`, `/docs`, `/blog`, etc.)
4. Add concurrent burst traffic
5. Inspect runtime logs for `#build/route-rules.mjs` signatures

Cases:
- `saas-cf-old`: `/Users/maxi/repros/.scratch/causality-matrix/cases/saas-cf-old` (`@nuxthub/core@0.10.6`)
- `saas-cf-831`: `/Users/maxi/repros/.scratch/causality-matrix/cases/saas-cf-831` (`@nuxthub/core@831`)

## Results (Node 22.22.0)
| Case | route-rules runtime failure | representative responses |
|---|---|---|
| saas-cf-old | no | `/ 200`, `/app 302`, `/docs 307`, `/docs/getting-started 404` |
| saas-cf-831 | no | `/ 200`, `/app 302`, `/docs 307`, `/docs/getting-started 404` |

Evidence:
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v3-runtime/all-results.json`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v3-runtime/saas-cf-old/node22/wrangler-dev.log`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-v3-runtime/saas-cf-831/node22/wrangler-dev.log`

## Observed runtime errors (both cases, unrelated to route-rules)
1. Content/D1 tables missing in local Worker DB:
   - `H3Error: D1_ERROR: no such table: _content_docs`
   - similar for `_content_blog`, `_content_posts`, `_content_pricing`, `_content_changelog`, `_content_versions`
2. Integrity warning path:
   - `Database integrity check failed TypeError: The first argument must be one of type string... Received type undefined`
3. `Duplicate key "provider" in object literal` warning persists in wrangler bundling.

## Interpretation
This runtime probe still does not produce `#build/route-rules.mjs` in old or `831` NuxtHub variants. The Worker runtime failures observed here are database/content-state issues, not route-rules module resolution.

If your production deployment still shows `#build/route-rules.mjs`, the differentiator is likely production-only context (artifact mismatch, stale cache, or deploy pipeline variance), not a deterministic Cloudflare runtime behavior in this controlled lane.
