Title: Follow-up matrix results for #34164 (`#build/route-rules.mjs`)

Summary:
- Controlled matrix run across Node 22.22.0 and 25.6.1.
- `nuxt-only` and `nuxt+hub-*` minimal cases did not deterministically reproduce route-rules failure in this environment.
- Synthetic repro still demonstrates resolver timing gap (`/Users/maxi/repros/nuxt-34346`).

Evidence:
- `/Users/maxi/repros/.scratch/causality-matrix/REPORT.md`
- `/Users/maxi/repros/.scratch/causality-matrix/results-v5`

Request:
- Confirm preferred next minimal repro shape for real-world monorepo/path-resolution branch.
