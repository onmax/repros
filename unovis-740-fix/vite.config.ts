import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    process.env.ANALYZE && visualizer({ open: true, filename: 'stats.html', gzipSize: true }),
  ],
})
