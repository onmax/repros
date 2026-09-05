export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: { database: true },
  nitro: { preset: 'cloudflare-module' }
})
