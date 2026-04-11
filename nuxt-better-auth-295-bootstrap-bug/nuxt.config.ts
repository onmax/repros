export default defineNuxtConfig({
  modules: [
    'nitro-cloudflare-dev',
    '@nuxthub/core',
    '@onmax/nuxt-better-auth',
  ],

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
    betterAuthSecret: process.env.NUXT_BETTER_AUTH_SECRET || '0123456789abcdef0123456789abcdef',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      wrangler: {
        name: 'nuxt-better-auth-295-bootstrap-bug',
      },
    },
  },

  compatibilityDate: '2026-04-11',
})
