import { inspectNitroPlugins } from './inspect-nitro-plugins.ts'

export default defineNuxtConfig({
  // A fresh checkout builds into .nuxt, but `nuxt build` switches to
  // node_modules/.cache/nuxt/.nuxt once .nuxt exists. Pin the first layout.
  buildDir: '.nuxt',
  // Fixed, so the .output of this fixture and its -fix control can be compared.
  buildId: 'repro',
  compatibilityDate: '2026-10-01',
  modules: ['./modules/legacy'],
  vite: {
    plugins: [inspectNitroPlugins(import.meta.dirname)],
  },
})
