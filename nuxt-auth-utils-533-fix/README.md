# Fixed control for Nuxt Auth Utils #533

This is the same production Nuxt application and verifier as the [primary reproduction](../nuxt-auth-utils-533). It installs the same published `nuxt-auth-utils@0.5.30`, with one committed `pnpm` patch that removes restored cookie data inside h3's public update callback.

Use Node 20.20.0 and the pinned pnpm 10.29.3:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm verify
```

Expected verdict is exit 0 with eight passing checks. `replaceUserSession()` discards omitted fields in its return, the current request and the following cookie request. `setUserSession()` keeps merging, clear works, first-session replacement works, and the existing cookie session ID is preserved.

From the repository root, `node verify-pair.mjs` verifies the primary's exact failures before accepting this control. See the primary README and `provenance.json` for the pinned versions and scope.
