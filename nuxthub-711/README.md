# nuxthub-711

Issue: https://github.com/nuxt-hub/core/issues/711

## Problem

`nodeCompat = false` in `@nuxthub/core` breaks Node.js crypto APIs on Cloudflare Workers. Password verification with scrypt fails silently.

## Verify

```bash
pnpm i && pnpm build
```

Then check for unenv crypto stub in output:

```bash
grep -r "createHash is not implemented" .output/
```

## Expected

`node:crypto` should be marked as external and provided by Cloudflare's `nodejs_compat` runtime.

## Actual

`node:crypto` is polyfilled by unenv with stubs that throw "not implemented" errors.
