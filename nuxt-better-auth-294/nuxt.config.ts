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
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    },
  },

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      wrangler: {
        name: 'nuxt-better-auth-294',
      },
    },
  },

  compatibilityDate: '2026-03-24',
})
