export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },
  telemetry: false,
  // NUXT_WATCHER=builder|chokidar picks the dev watcher (4.6.3 defaults to chokidar here, main to builder)
  experimental: process.env.NUXT_WATCHER ? { watcher: process.env.NUXT_WATCHER as 'builder' } : {},
  hooks: process.env.LOG_WATCH ? { 'builder:watch': (event, path) => console.log(`[watch] ${event} ${path}`) } : {},
})
