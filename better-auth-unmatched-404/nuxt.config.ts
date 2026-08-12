export default defineNuxtConfig({
  modules: ['@onmax/nuxt-better-auth'],

  runtimeConfig: {
    betterAuthSecret: 'reproduction-only-secret-32-characters',
    public: { siteUrl: 'http://127.0.0.1:34044' },
  },

  routeRules: {
    '/**': { auth: 'user' },
    '/login': { auth: false },
  },
})
