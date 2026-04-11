# Cloudflare-Deployed Runtime Investigation Report

Worker: `nuxt-saas-auth02-core0106-20260217-195201`
URL: https://nuxt-saas-auth02-core0106-20260217-195201.maximogarciamtnez.workers.dev
Generated: 2026-02-17

## Variant
- SaaS ref: `auth-02-email-password-core` (worktree at `/Users/maxi/repros/.scratch/cf-auth02-core0106/app`)
- Override: `@nuxthub/core@0.10.6` (no PR831)
- Better Auth: `better-auth@1.5.0-beta.13`
- Nuxt: `4.3.1` (Nitro `2.13.1`)
- Wrangler: `4.58.0`

## Build Integrity (Pre-Deploy)
Command:
- `BETTER_AUTH_SECRET=0123456789abcdef0123456789abcdef NITRO_PRESET=cloudflare-module pnpm build`

Findings:
- `.output/server` contains **no** unresolved `#build/route-rules.mjs` references.
- `.output/server` contains **no** unresolved `#build/*` references.

Evidence:
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-deployed-runtime/build-integrity/rg-route-rules-node22.log`
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-deployed-runtime/build-integrity/rg-build-aliases-node22.log`

## Deployed Runtime Results
Tail log:
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-deployed-runtime/tail/tail.jsonl`

Control requests (`curl`):
- `/`, `/login`, `/signup`, `/app` (headers captured)

Better Auth UI probe (Playwright):
- `/Users/maxi/repros/.scratch/causality-matrix/results-cf-deployed-runtime/probe/playwright/2026-02-17T19-03-56-047Z/result.json`

### Observed Runtime Error
Triggered by: `POST /api/auth/sign-up/email`

Error (from `wrangler tail`):
- `BetterAuthError: [# Drizzle Adapter]: The model "session" was not found in the schema object. Please pass the schema directly to the adapter options.`

This is a **Better Auth + Drizzle adapter schema wiring** failure, not `#build/route-rules.mjs`.

### Route-Rules Signature
- No `#build/route-rules.mjs` / `Failed to resolve import "#build/route-rules.mjs"` / `Cannot find module '#build/route-rules.mjs'` found in deployed runtime tail logs.

## Attribution Decision
| Candidate | Status | Evidence |
|---|---:|---|
| Nuxt/Nitro bundling of `#build/route-rules.mjs` | Not reproduced | No unresolved `#build/*` in `.output/server`; no route-rules signature in tail logs |
| Cloudflare runtime-only `#build/route-rules.mjs` | Not reproduced | Tail logs contain no `#build` errors |
| NuxtHub core@0.10.6 amplification (route-rules) | Not shown in this lane | No route-rules signature; primary runtime error is Better Auth adapter |
| Better Auth + Drizzle schema mismatch | Reproduced | Tail logs show missing `session` model error on signup |

## Notes / Blockers
- D1 database reused due to account D1 limit (10): `nuxt-saas-auth-pr-preview-db`.
- Nuxt Content is still emitting D1 missing table errors (`_content_docs`), which is unrelated noise but present in tail logs.

## Next Steps
1. Fix Better Auth schema wiring in this SaaS variant (ensure Better Auth Drizzle adapter receives the schema containing `session`).
2. If the original production symptom is still `#build/route-rules.mjs`, we likely need to reproduce using the **exact production deploy pipeline** (git-integrated Cloudflare CI artifact), because this direct `wrangler deploy` lane does not reproduce it.
