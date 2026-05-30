export default defineNuxtConfig({
  compatibilityDate: '2026-04-29',
  modules: ['@nuxthub/core', '@pinia/nuxt', '@onmax/nuxt-better-auth'],

  hub: { db: 'sqlite' },

  runtimeConfig: {
    betterAuthSecret: 'repro-secret-for-319-ssr-store-forwarding-fix',
    public: {
      siteUrl: 'http://localhost:3020',
      seededAdminId: 'repro-admin-319',
      seededAdminEmail: 'admin319@example.com',
      seededAdminPassword: 'password123',
      seededUserId: 'repro-user-319',
      seededUserEmail: 'user319@example.com',
      seededUserPassword: 'password123',
    },
  },

  routeRules: {
    '/login': { auth: 'guest' },
    '/app': { auth: 'user' },
    '/admin': { auth: { user: { role: 'admin' } } },
  },

  css: [],
})
