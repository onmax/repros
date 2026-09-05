# Verification

Verified on Linux with Node.js 24.19.0 and pnpm 11.22.0 on 2026-09-05. The source fix is `nuxt-modules/better-auth@06a1d9c752d90807662cc81d6532ec3f9afca65b`, based on `90b945ad2366d6ade92b99ce0885f2831c8ef8d0`.

In each fixture, ran `pnpm install --frozen-lockfile && pnpm verify`. Dependencies were installed locally from the pinned lockfiles; the fixed install was repeated from an empty `node_modules`. Both final production builds started without `.nuxt` or `.output` directories.

The original fixture passed in 101.5 seconds:

```text
Control: legitimate reset succeeds and uses deployment.example.test.
Expected canonical origin: https://deployment.example.test
Actual canonical origin: https://attacker.example.test
REPRODUCED: password-reset link uses attacker.example.test.
```

The patched fixture passed in 110.2 seconds:

```text
Control: legitimate reset succeeds and uses deployment.example.test.
Expected canonical origin: https://deployment.example.test
Actual canonical origin: https://deployment.example.test
PASS: supplied host ignored; reset link uses deployment.example.test.
```

The application, verifier, manifest and dependency versions are identical. The fixed lockfile differs only by its patch record and package patch hash. The control uses a committed pnpm patch to the module's production origin resolution.

An earlier fixture unnecessarily built SSR and hit the 180-second build deadline under concurrent machine load. Removing SSR preserved the observed API failure and let both builds finish within the same deadline. The fixture runs a real local Nitro Node server; it does not test a hosted proxy, another deployment adapter, or StackBlitz.
