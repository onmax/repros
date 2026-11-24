# nuxt-hub/core#958: fixed control

This is the same app as [`../nuxthub-958`](../nuxthub-958), with `patches/@nuxthub__core@0.10.12.patch` applied to `@nuxthub/core@0.10.12` through `pnpm patch`. The patch registers Nitro v3 variants of the db server plugins with `addNitroPlugin({ nitro2, nitro3 })`.

```sh
pnpm install
node verify.mjs
```

Expected output: no NUXT_B9003 warning for `@nuxthub/core`, `GET /api/items` returns `[]`, exit 0. See the sibling README for the full claim.
