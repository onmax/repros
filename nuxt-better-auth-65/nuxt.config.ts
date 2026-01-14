export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@onmax/nuxt-better-auth'],
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  hub: { db: 'sqlite' },

  auth: {
    schema: {
      usePlural: true,
      casing: 'camelCase',
    },
  },

  runtimeConfig: {
    betterAuthSecret: 'test-secret-at-least-32-characters-long-for-development',
  },
})
