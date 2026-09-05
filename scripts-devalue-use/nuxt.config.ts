export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/scripts'],
  scripts: {
    registry: {
      matomoAnalytics: {
        matomoUrl: 'https://stats.example.com',
        siteId: 1,
        scriptOptions: { trigger: 'onNuxtReady' },
      },
    },
  },
})
