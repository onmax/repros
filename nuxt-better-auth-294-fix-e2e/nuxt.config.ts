export default defineNuxtConfig({
  modules: [
    'nitro-cloudflare-dev',
    '@nuxthub/core',
    ['@onmax/nuxt-better-auth', {
      redirects: {
        guest: '/',
      },
    }],
  ],

  devtools: { enabled: true },

  hub: {
    db: {
      dialect: 'postgresql',
      driver: 'postgres-js',
      applyMigrationsDuringBuild: false,
      connection: {
        hyperdriveId: process.env.HYPERDRIVE_ID,
        url: process.env.DATABASE_URL || '',
      },
    },
  },

  runtimeConfig: {
    betterAuthSecret: process.env.NUXT_BETTER_AUTH_SECRET || 'stackblitz-demo-secret-1234567890abcdef',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    },
  },

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      wrangler: {
        name: 'nuxt-better-auth-295-e2e',
      },
    },
  },

  compatibilityDate: '2026-04-11',
})
