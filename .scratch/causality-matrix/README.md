# causality-matrix

Controlled investigation for Nuxt `#build/route-rules.mjs` vs NuxtHub amplification.

## Artifacts

- Final report: `/Users/maxi/repros/.scratch/causality-matrix/REPORT.md`
- Matrix data (latest run): `/Users/maxi/repros/.scratch/causality-matrix/results-v5/all-results.json`
- Draft upstream payloads: `/Users/maxi/repros/.scratch/causality-matrix/issue-drafts`

## Runner

```bash
RESULTS_DIR=/Users/maxi/repros/.scratch/causality-matrix/results-v5 \
  node /Users/maxi/repros/.scratch/causality-matrix/scripts/run-matrix.mjs
```

## Report generation

```bash
RESULTS_DIR=/Users/maxi/repros/.scratch/causality-matrix/results-v5 \
  node /Users/maxi/repros/.scratch/causality-matrix/scripts/generate-report.mjs
```
