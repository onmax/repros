// verify.mjs generates REPRO_LAYERS empty layers in ../layers/ and sets REPRO_EXTERNALIZE=1
// to turn on `icon.serverBundle.externalizeIconsJson`, the option that makes the
// `nitro:config` hook check for @iconify/json too.
const layers = Number(process.env.REPRO_LAYERS ?? 0)

export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  extends: Array.from({ length: layers }, (_, i) => `../layers/layer-${i}`),
  icon: process.env.REPRO_EXTERNALIZE === '1' ? { serverBundle: { externalizeIconsJson: true } } : {},
})
