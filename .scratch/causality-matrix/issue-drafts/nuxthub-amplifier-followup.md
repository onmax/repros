Title: NuxtHub amplification follow-up: setup-time physical shims vs route-rules failures

Summary:
- Old behavior (`@nuxthub/core@0.10.6`) writes physical shims to `node_modules/@nuxthub/*` during `typecheck`.
- PR831 behavior avoids setup-time writes in `typecheck` and shifts physical generation toward build hooks.
- This reduces shared mutable state races and likely removes one amplifier class, even when route-rules root cause lives upstream in Nuxt.

Evidence:
- `/Users/maxi/repros/.scratch/causality-matrix/REPORT.md`
- `/Users/maxi/repros/.scratch/causality-matrix/results-v5`
