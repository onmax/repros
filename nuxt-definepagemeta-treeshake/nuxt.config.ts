export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  // Client chunks keep their names, so the verifier can look for `definePageMeta(`.
  // The default minified build keeps the same calls under mangled names.
  vite: { build: { minify: false } },
})
