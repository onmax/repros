export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@onmax/nuxt-better-auth',
  ],
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  // NuxtHub v0.10 config
  hub: {
    db: 'sqlite',
  },

  // nuxt-better-auth config
  auth: {
    redirects: {
      login: '/login',
      guest: '/',
    },
  },

  // Route protection via routeRules (PR #29 pattern)
  routeRules: {
    '/app/**': { auth: 'user' },
    '/admin/**': { auth: { user: { role: 'admin' } } },
    '/login': { auth: 'guest' },
  },

  devtools: { enabled: true },
})
