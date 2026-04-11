export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  nitro: {
    preset: 'cloudflare_module',
  },
  experimental: {
    appManifest: true,
  },
  routeRules: {
    '/api/**': { proxy: 'https://example.com/api/**' },
  },
})
