# ViteHub Schedule inherited definition fields, fixed

This control runs the same verifier against a package built with the ownership checks. It passes because `defineSchedule()` and `defineScheduleTarget()` require required fields and options to be own properties.

```sh
pnpm install --ignore-scripts
pnpm verify
```
