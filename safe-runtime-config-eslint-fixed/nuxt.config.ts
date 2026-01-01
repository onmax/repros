import { z } from 'zod'

export default defineNuxtConfig({
  modules: ['nuxt-safe-runtime-config', '@nuxt/eslint'],
  safeRuntimeConfig: { $schema: z.object({ public: z.object({ test: z.string() }) }) },
  runtimeConfig: { public: { test: '' } },
})
