export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  compatibilityDate: '2025-01-01',
  routeRules: {
    '/api/**': { proxy: 'https://example.com/api/**' },
    '/foo': { redirect: '/bar' }
  },
  hub: {
    blob: true,
    kv: true,
    db: 'sqlite',
    cache: false,
    dir: '.data'
  },
  typescript: {
    strict: true
  }
})
