export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: { db: 'sqlite' },
  nitro: { preset: 'cloudflare_module' }
})
