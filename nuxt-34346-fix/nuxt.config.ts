export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['~/modules/remove-route-rules'],
  routeRules: {
    '/api/**': { proxy: 'https://example.com/api/**' },
  },
})
