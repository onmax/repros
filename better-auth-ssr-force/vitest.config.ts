import { defineConfig } from 'vitest/config'

export default defineConfig({
  define: { 'import.meta.client': 'true', 'import.meta.server': 'false' },
  test: { server: { deps: { inline: ['@nuxtjs/better-auth'] } } },
})
