export default defineNuxtConfig({
  compatibilityDate: '2026-04-29',
  modules: ['@nuxthub/core', '@onmax/nuxt-better-auth'],

  hub: { db: 'sqlite' },

  runtimeConfig: {
    betterAuthSecret: 'repro-secret-for-318-session-staleness',
    public: {
      siteUrl: 'http://localhost:3001',
      seededAdminId: 'repro-admin-318',
      seededAdminEmail: 'admin318@example.com',
      seededAdminPassword: 'password123',
      seededUserId: 'repro-user-318',
      seededUserEmail: 'user318@example.com',
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
