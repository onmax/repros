# convex-better-auth-251

Issue: https://github.com/get-convex/better-auth/issues/251

## Problem
Installing `@convex-dev/better-auth@0.10.10` alongside `better-auth@1.5.0-beta.13` fails under strict peer dependency resolution.

## Verify
```bash
pnpm i
```

## Expected
Install succeeds.

## Actual
Install fails with a peer dependency error (and/or transitive pin) requiring `better-auth@1.4.9`.
