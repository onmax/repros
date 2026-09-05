export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@onmax/nuxt-better-auth'],

  hub: {
    kv: true,
    db: true,
  },

  auth: {
    secondaryStorage: true, // This causes the bug
  },

  compatibilityDate: '2025-01-03',
})
