export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    experimental: { sqliteConnector: 'native' },
  },
  experimental: {
    buildCache: !process.env.NO_BUILD_CACHE,
  },
})
