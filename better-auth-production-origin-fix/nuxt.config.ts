export default defineNuxtConfig({
  modules: ['@nuxtjs/better-auth'],
  ssr: false,
  devtools: { enabled: false },
  runtimeConfig: {
    betterAuthSecret: 'public-repro-secret-not-for-real-use-123456789',
    public: { siteUrl: '' },
  },
  nitro: { preset: 'node-server' },
})
