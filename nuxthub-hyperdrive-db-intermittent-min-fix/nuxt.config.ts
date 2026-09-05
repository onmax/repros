export default defineNuxtConfig({
  modules: [
    'nitro-cloudflare-dev',
    '@nuxthub/core',
  ],

  hub: {
    db: {
      dialect: 'postgresql',
      driver: 'postgres-js',
      applyMigrationsDuringBuild: false,
      connection: {
        hyperdriveId: process.env.HYPERDRIVE_ID,
        url: process.env.DATABASE_URL || '',
        prepare: false,
      },
    },
  },

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      wrangler: {
        name: 'nuxthub-hyperdrive-db-intermittent-min-fix',
      },
    },
  },

  compatibilityDate: '2026-04-11',
})
