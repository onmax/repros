export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxthub/core'],
  nitro: { preset: 'cloudflare_module' },
  hub: {
    kv: { driver: 'cloudflare-kv-binding', namespaceId: '4f701e72f4414181b2a760cbb798fa8d', binding: 'KV' }
  }
})
