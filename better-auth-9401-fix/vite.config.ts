import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3004,
    proxy: {
      '/api/auth': {
        target: 'http://localhost:3003',
      },
    },
  },
})
