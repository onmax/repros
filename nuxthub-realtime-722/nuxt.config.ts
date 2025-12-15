export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxthub/core'],
  hub: {},
  nitro: {
    preset: 'cloudflare_durable',
    experimental: { websocket: true }
  }
})
