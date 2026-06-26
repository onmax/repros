export default defineNuxtConfig({
  compatibilityDate: '2026-06-26',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      previewMode: process.env.PREVIEW_MODE !== 'off',
    },
  },
})
