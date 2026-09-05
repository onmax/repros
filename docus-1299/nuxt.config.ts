import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['docus'],
  ssr: true,
  compatibilityDate: '2025-07-22',
  future: {
    compatibilityVersion: 4,
  },
  site: {
    url: 'https://example.com',
    name: 'Docus 1299 Repro',
  },
  llms: {
    domain: 'https://example.com',
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  ui: {
    fonts: false,
    colorMode: false,
    content: false,
    mdc: true,
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
    },
  },
  mcp: {
    enabled: false,
  },
})
