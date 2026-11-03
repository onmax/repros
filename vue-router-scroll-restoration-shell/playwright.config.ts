import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  reporter: [['list']],
  use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4340', viewport: { width: 1000, height: 600 } },
  webServer: { command: 'vite preview --host 127.0.0.1 --port 4340 --strictPort', url: 'http://127.0.0.1:4340' },
})
