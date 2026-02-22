export default function linkedReproPlugin () {
  return {
    name: 'vite:import-analysis',
    enforce: 'pre',
    transform (_code, id) {
      if (process.env.REPRO_FORCE_IMPORT_ANALYSIS_FAIL !== '1') {
        return null
      }
      if (!id.includes('/nuxt/dist/app/composables/manifest.js')) {
        return null
      }
      const message = `Failed to resolve import "#build/route-rules.mjs" from "${id}". Does the file exist?`
      process.stderr.write(`\n ERROR  Pre-transform error: ${message}\n  Plugin: vite:import-analysis\n`)
      this.error({
        plugin: 'vite:import-analysis',
        message,
      })
    },
  }
}
