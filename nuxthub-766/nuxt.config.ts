export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    kv: {
      driver: 'cloudflare-kv-binding',
      namespaceId: 'test-namespace-id'
    }
  },
  nitro: { preset: 'cloudflare-module' },
  compatibilityDate: '2025-01-01'
})
