export default defineNuxtConfig({
  modules: [
    'nitro-cloudflare-dev',
    '@nuxthub/core',
    'generated-db-module',
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

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      wrangler: {
        name: 'nuxthub-generated-db-import-package',
      },
    },
  },

  compatibilityDate: '2026-04-11',
})
