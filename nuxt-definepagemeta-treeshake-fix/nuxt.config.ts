export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  // The only change from ../nuxt-definepagemeta-treeshake: list the composables under
  // the paths unimport writes, next to the `#app` keys in Nuxt's defaults.
  optimization: {
    treeShake: {
      composables: {
        client: { '#app/composables/pages': ['definePageMeta'], '#app/composables/ssr': ['onPrehydrate'] },
        server: { '#app/composables/pages': ['definePageMeta'] },
      },
    },
  },
  // Client chunks keep their names, so the verifier can look for `definePageMeta(`.
  // The default minified build keeps the same calls under mangled names.
  vite: { build: { minify: false } },
})
