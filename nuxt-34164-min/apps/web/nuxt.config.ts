export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  experimental: {
    appManifest: true,
  },
  nitro: {
    preset: 'cloudflare_module',
  },
  routeRules: {
    '/': { swr: true },
    '/api/**': { isr: true },
  },
})
