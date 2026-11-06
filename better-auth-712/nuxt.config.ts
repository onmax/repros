export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/better-auth'],
  // In `nuxt dev`, this preset runs nitropack's cloudflare-dev plugin, which
  // sets `event.node.req.__unenv__` on every real request.
  nitro: { preset: 'cloudflare_module' },
})
