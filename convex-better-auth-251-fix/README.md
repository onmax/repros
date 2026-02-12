# convex-better-auth-251-fix

Issue: https://github.com/get-convex/better-auth/issues/251

## Problem
Installing `@convex-dev/better-auth@0.10.10` alongside `better-auth@1.5.0-beta.13` fails under strict peer dependency resolution.

## Verify
```bash
pnpm i
node -e "import('@convex-dev/better-auth').then(()=>console.log('ok'))"
```

## Expected
Install succeeds and the package can be imported.

## Actual
Install succeeds and the import works.

## Fix
This folder applies a `pnpm patch` to `@convex-dev/better-auth@0.10.10` to:

- widen the `better-auth` peer range to include `1.5.0-beta.*`
- remove the hard pin introduced by `@better-auth/passkey`
