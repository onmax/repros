# False Vue slot warning after a setup error

Vue 3.5.44 leaves `currentInstance` set after an uncaught `setup()` error in development.
A later sibling then gets this warning, although it calls the slot inside its render function:

```text
Slot "default" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.
```

Tested on Linux with Node 24.21.0 and pnpm 11.28.6. The lockfile pins all dependencies.

```sh
git clone --single-branch --branch repro/vue-setup-cleanup https://github.com/onmax/repros.git
cd repros/vue-setup-cleanup
bash verify.sh
```

Verification exits with code 0 when the bug appears and the control stays clean.
It also confirms that the regression check below fails on the bug.

```sh
node case.mjs           # Exits 1: the false warning appears.
node case.mjs --control # Exits 0: skip the setup error.
```

The example uses Vue's custom renderer with nodes stored in memory.
Two sibling components let the healthy component update after the other component fails.
Each case runs in a separate process because the failed setup leaves shared Vue state behind.
No browser or server is needed.

In [Vue's setup code](https://github.com/vuejs/core/blob/ca034820b8288ab6da3a033626a7857401ee64a5/packages/runtime-core/src/component.ts#L870),
cleanup follows the call to `setup()` without a `finally` block. The development exception skips cleanup.
This example was reduced from a Nuxt development failure on 2026-10-28. It establishes no production failure.

Verified on 2026-10-29 from a clean install:

```text
repro: exit 0
control: exit 0
regression: exit 1
```
