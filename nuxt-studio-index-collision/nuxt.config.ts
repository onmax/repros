export default defineNuxtConfig({
  compatibilityDate: '2026-04-10',
  modules: [
    '@nuxt/content',
    'nuxt-studio',
  ],
  devtools: {
    enabled: false,
  },
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'example',
      repo: 'nuxt-studio-index-collision',
      branch: 'main',
    },
  },
})
