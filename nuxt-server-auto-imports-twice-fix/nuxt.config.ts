import { inspectServerAutoImports } from './inspect-server-auto-imports.ts'

export default defineNuxtConfig({
  // A fresh checkout builds into .nuxt, but `nuxt build` switches to
  // node_modules/.cache/nuxt/.nuxt once .nuxt exists, and the plugin's own
  // node_modules exclude then hides the SSR service chunks. Pin the first layout.
  buildDir: '.nuxt',
  // Fixed, so the .output of this fixture and its -fix control can be compared.
  buildId: 'repro',
  compatibilityDate: '2026-10-01',
  vite: {
    plugins: [inspectServerAutoImports(import.meta.dirname)],
  },
})
