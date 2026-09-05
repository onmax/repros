# Verification

Verified September 5, 2026 with Node 24.19.0 and pnpm 11.22.0. Each directory was copied without node_modules or generated output into a fresh directory outside an existing JavaScript workspace. Both ran:

```sh
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

Baseline output:

```text
Expected Nuxt behavior: reject invalid method, invalid immediate option, and nonexistent result method.
Control without auth declaration: rejected all three calls.
Actual with auth declaration: accepted all three calls.
Native fatal/unhandled error properties remain available.
Verified the reported bug.
```

Fixed output:

```text
Expected Nuxt behavior: reject invalid method, invalid immediate option, and nonexistent result method.
Control without auth declaration: rejected all three calls.
Actual with auth declaration: rejected calls.
Native fatal/unhandled error properties remain available.
Verified the correction.
```

Both commands exited zero, proving their declared outcomes. The fixed package patch was generated from `nuxt-modules/better-auth` commit `5289200dae8e2796ae307e6adc62c2c6c7fd242a` and applied to the same published 0.2.5 package.

An earlier temporary directory inherited another project's Nitro3/H3v2 dependencies and failed the native Nuxt control. The final verifier rejects such external dependency aliases. The final clean verification used no inherited node_modules. StackBlitz was not verified.
