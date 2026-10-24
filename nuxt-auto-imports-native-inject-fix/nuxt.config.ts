import { existsSync, readFileSync } from 'node:fs'

// verify.mjs generates the build-time study's layers into lab/ (scripts/gen-layers.mjs).
const layersFile = new URL('./lab/layers.json', import.meta.url)
const layers: string[] = existsSync(layersFile) ? JSON.parse(readFileSync(layersFile, 'utf8')) : []

export default defineNuxtConfig({
  extends: layers.map(name => `./lab/${name}`),
  // REPRO_IMPORTS=inject replaces nuxt:imports-transform with Rolldown's transform.inject.
  modules: process.env.REPRO_IMPORTS === 'inject' ? ['./native-inject'] : [],
  compatibilityDate: '2026-10-01',
  // As in the study, so two builds can be compared byte by byte: a fixed build id, and
  // a fixed buildDir. Without it, a production build moves to node_modules/.cache/nuxt/.nuxt
  // whenever .nuxt exists, and that path shows up in the output.
  buildId: 'repro',
  buildDir: '.nuxt',
  experimental: { asyncContext: true },
  // The workaround from repro/nuxt-definepagemeta-treeshake. Without it, inject also
  // removes dead definePageMeta calls that unimport keeps (REPRO_NUXT_DEFAULTS=1).
  optimization: process.env.REPRO_NUXT_DEFAULTS
    ? {}
    : {
        treeShake: {
          composables: {
            client: { '#app/composables/pages': ['definePageMeta'], '#app/composables/payload': ['definePayloadReducer'], '#app/composables/ssr': ['onPrehydrate'] },
            server: { '#app/composables/pages': ['definePageMeta'], '#app/composables/payload': ['definePayloadReviver'] },
          },
        },
      },
  vite: {
    // Readable output for the diff: no minifier in either build, and client chunks
    // named after their module, so the two builds' chunks can be paired.
    build: { minify: false },
    plugins: [{
      name: 'repro:client-chunk-names',
      enforce: 'post',
      configEnvironment: name => name === 'client'
        ? { build: { rolldownOptions: { output: { chunkFileNames: '_nuxt/[name]-[hash].js', entryFileNames: '_nuxt/[name]-[hash].js' } } } }
        : undefined,
    }],
  },
})
