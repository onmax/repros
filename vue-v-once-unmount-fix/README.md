# Vue v-once unmount fix control

Authored by an AI agent on behalf of @onmax; human review is pending.

This is the fixed control for [the unpatched reproduction](../vue-v-once-unmount/). After a parent rerender, its `v-once` child's unmount hook runs once when the app unmounts.

## Run

```sh
git clone --depth 1 --branch repro/vue-v-once-unmount https://github.com/onmax/repros.git
cd repros/vue-v-once-unmount-fix
pnpm install --frozen-lockfile && pnpm verify
```

Use Node 24.19.0 and pnpm 10.34.5. Vue 3.5.42 and happy-dom 20.12.0 are pinned and their dependencies locked. The verifier uses the development runtime and needs no browser or server.

Expected output:

```text
Control: unmount without rerender. Expected 1 hook call; actual 1.
Repro: rerender, then unmount. Expected 1 hook call; actual 1.
FIXED: the v-once child unmount hook runs after a parent rerender.
```

Exit code 0 means both unmount assertions passed; setup errors and skipped hooks exit nonzero. The DOM window closes on either outcome.

## Comparison

Both directories contain identical application and verifier code. `pnpm verify` selects bug-presence assertions in the original fixture and correct-behavior assertions through `--fixed` here. To run the exact same assertion against both dependencies, run `node verify.mjs --fixed` in each directory. It fails in the original with `0 !== 1` and passes here.

The causal change is the committed pnpm patch to `@vue/runtime-core@3.5.42`. It preserves the block's `hasOnce` marker across updates and the vnode's cache index across cloning, then clears the lexical owner's cache during teardown. The patched CJS development, CJS production, and ESM bundler files match the builds of the upstream source change based on Vue commit `d105e19e914bca6e1140bfec074e055ed0679e21`. This verifier exercises the CJS development build; it does not establish production or browser behavior.

[GitHub source](https://github.com/onmax/repros/tree/repro/vue-v-once-unmount/vue-v-once-unmount-fix) · [StackBlitz import](https://stackblitz.com/github/onmax/repros/tree/repro%2Fvue-v-once-unmount/vue-v-once-unmount-fix?startScript=verify)

StackBlitz execution is unverified. Use the CLI command above for the verified runtime.
