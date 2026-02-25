export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  routeRules: {
    '/api/**': { proxy: 'https://example.com/api/**' }
  }
})
