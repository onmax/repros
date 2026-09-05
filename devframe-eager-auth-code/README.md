# Devframe eagerly generates an authentication code on import

[`devframe@0.9.9`](https://www.npmjs.com/package/devframe/v/0.9.9) generates a temporary six-digit authentication code while evaluating the public `devframe/initiate` module. No Devframe instance or authentication flow has been created at that point. No upstream issue has been filed yet; the behavior originates in the [`v0.9.9` auth state initialization](https://github.com/devframes/devframe/blob/v0.9.9/packages/devframe/src/node/auth/state.ts#L41-L46).

The dependency is pinned exactly in `package.json` and `pnpm-lock.yaml`. It corresponds to the upstream [`v0.9.9` tag](https://github.com/devframes/devframe/tree/v0.9.9/packages/devframe). The repro was verified with Node 24.19.0 and pnpm 11.25.0; the pnpm version is pinned by `packageManager`.

## Reproduce

```sh
corepack pnpm install --frozen-lockfile && corepack pnpm verify
```

Expected: importing `devframe/initiate` performs no authentication work and consumes no cryptographic randomness.

Actual: the verifier reports at least six calls to `crypto.getRandomValues()` through `randomDigits()` and `generateTempCode()`, then exits successfully to confirm the bug. It exits nonzero if the import-time behavior is absent.

The package dependency exercises the released public entrypoint. The verifier wraps Web Crypto only to observe calls, dynamically imports that entrypoint, and makes no Devframe API calls afterward. The workspace file permits the pinned release under pnpm's minimum-release-age policy. Those are the only elements needed to distinguish import-time behavior from initialization-time behavior and install the same package unattended.
