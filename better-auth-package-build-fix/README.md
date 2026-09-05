# Better Auth package build fixed control

Given an isolated install, invoking the module-builder CLI through Node should resolve the build configuration. The original config imports undeclared `unbuild`, so it fails before compiling source.

Reduced from [@nuxtjs/better-auth 0.2.5 at 90b945a](https://github.com/nuxt-modules/better-auth/blob/90b945ad2366d6ade92b99ce0885f2831c8ef8d0/build.config.ts). The module source is deliberately minimal: only dependency resolution of the original build configuration is load-bearing. Node 24.19.0, pnpm 11.22.0, and build tool versions are pinned. The fixed sibling removes only the unnecessary identity-helper import.

```sh
pnpm install --frozen-lockfile && pnpm verify
```

The verifier prints expected and actual results. The original fixture exits nonzero unless it sees the exact missing-unbuild failure; the fixed control exits nonzero unless the build succeeds. Child execution is bounded and creates no persistent server.

Clone this branch with `git clone --branch repro/better-auth-package-build --single-branch https://github.com/onmax/repros.git`, then enter this directory. Use the same command for the sibling fixture. The verifier calls the installed module-builder CLI through Node. pnpm's executable shim adds transitive dependencies to NODE_PATH and masks this undeclared import; the direct Node invocation does not. No hosted runtime is required.
