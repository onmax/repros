# Better Auth disables Nuxt fetch checks

This fixed control demonstrates a TypeScript contract bug in `@nuxtjs/better-auth` 0.2.5. With Nuxt 4.5.2, the module's generated declarations allow an invalid HTTP method, a string `immediate` option, and a nonexistent method on the returned `AsyncData` object. These calls are unrelated to authentication.

Given the pinned packages and `probe.ts`, running the compiler should reject all three calls. This fixed control rejects all three invalid calls.

## Run

Use Node 24.19.0 and pnpm 11.22.0. No credentials, database, browser, or running server are needed. Clone outside an existing JavaScript workspace; the verifier rejects inherited Nitro/H3 dependency aliases from a parent node_modules directory.

```sh
git clone --depth 1 --branch repro/better-auth-fetch-types https://github.com/onmax/repros.git
cd repros/better-auth-fetch-types-fix
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

`verify` prepares Nuxt and invokes TypeScript twice with the generated Nuxt dependency aliases. The control omits Better Auth's endpoint declaration and must report errors on all three probe lines. The second compilation includes that declaration and asserts the result for this fixture. It exits nonzero if the claimed behavior is absent, preparation fails, or either compiler result differs.

Expected output for this directory:

```text
Expected Nuxt behavior: reject invalid method, invalid immediate option, and nonexistent result method.
Control without auth declaration: rejected all three calls.
Actual with auth declaration: rejected calls.
Native fatal/unhandled error properties remain available.
Verified the correction.
```

## Provenance and control

The baseline uses the published `@nuxtjs/better-auth@0.2.5` npm artifact, corresponding to the source reviewed at `90b945a`. Nuxt 4.5.2, Better Auth 1.7.1, TypeScript 5.9.3, and all transitive packages are pinned in the lockfile. This reproduces the module's actual generated declaration; it does not invent a substitute `useFetch` type.

The sibling control applies a pnpm patch generated from [upstream fix commit 5289200](https://github.com/nuxt-modules/better-auth/commit/5289200dae8e2796ae307e6adc62c2c6c7fd242a). It changes only the published module's endpoint type template and the helper that renders typed fallback overloads. The application and verifier are identical. `native-contract.ts` also requires Nuxt's `fatal` and `unhandled` error properties to remain available. The package metadata tells the verifier which result to assert.

The client and server config files are the empty configs required for module preparation. The lockfile and pnpm workspace settings preserve dependency resolution and the fixed package patch. `skipLibCheck` matches a prepared Nuxt consumer; the probe still undergoes strict checking. The fixture has no API handler because the failure happens at compilation. Removing the endpoint declaration is the one-variable control that restores all three errors.

This is a command-line reproduction. StackBlitz execution has not been verified; use the fresh-checkout command above.
