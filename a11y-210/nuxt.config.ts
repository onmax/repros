export default defineNuxtConfig({
  modules: ['@nuxt/a11y'],
  ssr: true,
  nitro: {
    prerender: { routes: ['/'] }
  },
  a11y: {
    report: {
      enabled: true,
      failOnViolation: false
    }
  }
})
