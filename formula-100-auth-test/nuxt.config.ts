export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@onmax/nuxt-better-auth'],

  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  hub: {
    db: 'sqlite',
    kv: true,
  },

  auth: {
    redirects: {
      login: '/login',
      guest: '/',
    },
  },

  routeRules: {
    '/app/**': { auth: 'user' },
    '/admin/**': { auth: { user: { role: 'admin' } } },
    '/login': { auth: 'guest' },
    '/signup': { auth: 'guest' },
  },

  runtimeConfig: {
    betterAuthSecret: '',
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    admins: ['admin@test.com'],
    public: {
      baseUrl: '',
    },
  },
})
