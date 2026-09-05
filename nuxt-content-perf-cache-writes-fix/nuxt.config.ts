// Written by an AI agent for onmax. Not reviewed by a human.
export default defineNuxtConfig({
  compatibilityDate: '2026-08-31',
  modules: ['./.instrumented-content/dist/module.mjs'],
  content: {
    llms: false, watch: { enabled: false },
    build: { markdown: { toc: { depth: Number(process.env.CONTENT_TOC_DEPTH || 2) } } },
  },
  devtools: { enabled: false },
  telemetry: false,
})
