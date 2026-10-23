# @nuxt/image: `<NuxtImg>` rejects documented `<img>` attributes under strict template checks

The `<NuxtImg>` docs show `<NuxtImg src="/nuxt-icon.png" loading="lazy" />`. At runtime `loading` falls through to the `<img>`. With strict template checking, vue-tsc rejects it:

```
app/app.vue(2,33): error TS2353: Object literal may only specify known properties, and 'loading' does not exist in type 'VNodeProps & AllowedComponentProps & ComponentCustomProps & { custom?: boolean | undefined; ... }'.
```

Expected: the check passes, as it does with vue-tsc defaults.

## Run

```sh
git clone --branch repro/nuxt-image-strict-img-attrs https://github.com/onmax/repros.git
cd repros/nuxt-image-strict-img-attrs
pnpm install
pnpm verify
```

`pnpm verify` runs `nuxt prepare`, then vue-tsc twice on the same app:

- `tsconfig.loose.json`: vue-tsc defaults. Passes.
- `tsconfig.strict.json`: adds `vueCompilerOptions.checkUnknownProps: true`. Fails with the error above.

It exits nonzero if either result changes.

## Environment

- `@nuxt/image` 2.2.0, `nuxt` 4.6.2, `vue` 3.5.44
- `vue-tsc` 3.3.13, `typescript` 5.9.3
- Node 24, pnpm 11.28.5

## Why it happens

@nuxt/image v2 removed `alt`, `loading`, `decoding`, `referrerpolicy` and the other plain `<img>` props in [nuxt/image#1802](https://github.com/nuxt/image/pull/1802) so they would fall through as attributes. The published `NuxtImg.vue.d.ts` does not add them back as types. The props type only stays open when vue-tsc declares its global `__VLS_PROPS_FALLBACK`, which it does only when unknown-prop checking is off.

`alt`, `decoding` and `<NuxtPicture loading="lazy">` fail the same way. The fixture keeps one attribute because a single error proves the claim.

This matters beyond opt-in strict mode. Vue Language Tools v4 ([vuejs/language-tools#6170](https://github.com/vuejs/language-tools/pull/6170), published as `4.0.0-alpha.0`) removes `strictTemplates` and every `checkUnknown*` option, so strict checking becomes the only mode.
