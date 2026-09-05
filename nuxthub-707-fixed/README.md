# nuxthub-707-fixed

Issue: https://github.com/nuxt-hub/core/issues/707

## Verify Fix

```bash
pnpm i
pnpm prepare
pnpm nuxt db migrate
# Shows helpful error: D1 driver cannot be used with CLI commands...
```

The `-fixed` folder includes a pnpm patch with the fix.
