import { recordInjectedKeys } from './record-injected-keys.ts'

export default defineNuxtConfig({
  extends: ['../layer'],
  // Fixed, so the client output of two builds can be compared byte for byte.
  buildId: 'repro',
  compatibilityDate: '2026-10-01',
  vite: {
    plugins: [recordInjectedKeys(import.meta.dirname)],
  },
})
