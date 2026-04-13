export default defineNuxtConfig({
  modules: [
    'nitro-cloudflare-dev',
    '@nuxthub/core',
    'config-loader',
  ],

  hub: {
    db: {
      dialect: 'postgresql',
      driver: 'postgres-js',
      applyMigrationsDuringBuild: false,
      connection: {
        hyperdriveId: process.env.HYPERDRIVE_ID || 'dummy-hyperdrive-id',
        url: process.env.DATABASE_URL || '',
      },
    },
  },

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      wrangler: {
        name: 'nuxthub-hyperdrive-runtime-context',
      },
    },
  },

  compatibilityDate: '2026-04-11',
})
