export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@onmax/nuxt-better-auth',
  ],

  runtimeConfig: {
    sessionSecret: 'formula-100-session-secret-only',
    public: {
      siteUrl: 'http://localhost:3017',
    },
  },

  routeRules: {
    '/app': { auth: { only: 'user', redirectTo: '/login' } },
  },

  auth: {
    hubSecondaryStorage: false,
    redirects: {
      login: '/login',
      guest: '/app',
      authenticated: '/app',
      logout: '/',
    },
  },

  hub: {
    db: {
      dialect: 'sqlite',
      driver: 'libsql',
      connection: {
        url: 'file:local.db',
      },
    },
    kv: {
      driver: 'fs-lite',
      base: '.data/kv',
    },
  },
})
