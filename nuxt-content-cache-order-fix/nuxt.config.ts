// AI-authored; not reviewed by a human.
export default defineNuxtConfig({
  compatibilityDate: '2026-08-31',
  modules: ['./.instrumented-content/dist/module.mjs'],
  content: {
    llms: false, watch: { enabled: false },
    ...(process.env.CONNECTOR === 'native' ? { experimental: { sqliteConnector: 'native' } } : {}),
  },
  devtools: { enabled: false }, telemetry: false,
})
