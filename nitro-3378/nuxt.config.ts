export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  nitro: {
    preset: 'cloudflare_durable',
    experimental: { websocket: true },
    cloudflare: {
      deployConfig: true,
      durable: {
        bindingName: 'MyDO'
      }
    }
  },
  hub: {},
  compatibilityDate: '2025-01-01',
})
