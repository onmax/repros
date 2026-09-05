export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxthub/core'],
  nitro: {
    preset: 'cloudflare-pages',
  },
  hub: {
    database: true,
    db: {
      dialect: 'sqlite',
      driver: 'd1',
    },
  },
})
