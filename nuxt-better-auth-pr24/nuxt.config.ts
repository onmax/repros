export default defineNuxtConfig({
  modules: ['@onmax/nuxt-better-auth'],

  compatibilityDate: '2025-01-03',

  routeRules: {
    '/': {
      // Before PR #24: ts error: Object literal may only specify known properties
      // After PR #24: should work with autocompletion
      auth: { only: 'user' },
    },
    '/api/**': {
      auth: false,
    },
  },
})
