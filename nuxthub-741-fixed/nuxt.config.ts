export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    remote: true,
    kv: { namespaceId: '4f701e72f4414181b2a760cbb798fa8d' },
  },
  compatibilityDate: '2025-01-01',
})
