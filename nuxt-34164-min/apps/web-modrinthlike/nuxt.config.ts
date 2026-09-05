import { appendFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import serverSidedVue from '@vitejs/plugin-vue'

const TRACE_ENABLED = process.env.REPRO_TRACE === '1'
const TRACE_LOG_PATH = resolve(
  process.cwd(),
  process.env.REPRO_TRACE_LOG ?? '.nuxt/repro-trace.log',
)
let latestNuxt: any = null

function trace(event: string, data: Record<string, unknown> = {}) {
  if (!TRACE_ENABLED) {
    return
  }
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    event,
    ...data,
  })
  mkdirSync(dirname(TRACE_LOG_PATH), { recursive: true })
  appendFileSync(TRACE_LOG_PATH, `${line}\n`)
  console.log(`[repro-trace] ${event}`, data)
}

function snapshotBuildState(buildDir: string, vfs: Record<string, unknown> | undefined) {
  const vfsKeys = Object.keys(vfs ?? {})
  const routeRulesPath = resolve(buildDir, 'route-rules.mjs')
  const nuxtConfigPath = resolve(buildDir, 'nuxt.config.mjs')
  return {
    buildDir,
    routeRulesDiskPath: routeRulesPath,
    routeRulesDiskExists: existsSync(routeRulesPath),
    nuxtConfigDiskPath: nuxtConfigPath,
    nuxtConfigDiskExists: existsSync(nuxtConfigPath),
    routeRulesInVfs: vfsKeys.some((key) => key.includes('route-rules')),
    nuxtConfigInVfs: vfsKeys.some((key) => key.includes('nuxt.config')),
    vfsKeyCount: vfsKeys.length,
  }
}

function traceResolvePlugin() {
  return {
    name: 'repro-trace-vite-modrinthlike',
    enforce: 'pre' as const,
    resolveId(id: string, importer: string | undefined, options: { ssr?: boolean } | undefined) {
      const interesting =
        id.includes('#build') ||
        id.includes('route-rules') ||
        id.includes('@repro/shared-signal') ||
        (id === 'vue' && Boolean(importer?.includes('shared-signal'))) ||
        (importer?.includes('manifest') ?? false) ||
        (importer?.includes('shared-signal') ?? false)
      if (interesting) {
        trace('vite.plugin.resolveId', {
          id,
          importer: importer ?? null,
          ssr: Boolean(options?.ssr),
        })
      }
      return null
    },
    load(id: string) {
      if (id.includes('route-rules.mjs')) {
        trace('vite.plugin.load', { id })
      }
      return null
    },
  }
}

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  experimental: {
    appManifest: true,
  },
  nitro: {
    preset: 'cloudflare_module',
    rollupConfig: {
      plugins: [serverSidedVue()],
      external: ['cloudflare:workers'],
    },
    cloudflare: {
      nodeCompat: true,
    },
  },
  vite: {
    cacheDir: '../../node_modules/.vite/apps/web-modrinthlike',
    define: {
      global: {},
    },
    resolve: {
      dedupe: ['vue'],
    },
    build: {
      rollupOptions: {
        external: ['cloudflare:workers'],
      },
    },
    plugins: [traceResolvePlugin()],
  },
  hooks: {
    ready(nuxt) {
      latestNuxt = nuxt
      trace('nuxt.hook.ready', snapshotBuildState(
        nuxt.options.buildDir,
        nuxt.vfs as Record<string, unknown> | undefined,
      ))
    },
    'app:templatesGenerated'(app, templates) {
      const templateNames = templates.map((template) => String((template as any).filename ?? ''))
      trace('nuxt.hook.app:templatesGenerated', {
        templateCount: templates.length,
        routeRulesTemplates: templateNames.filter((name) => name.includes('route-rules')),
        nuxtConfigTemplates: templateNames.filter((name) => name.includes('nuxt.config')),
        ...snapshotBuildState(
          resolve(process.cwd(), '.nuxt'),
          ((app as any).vfs as Record<string, unknown> | undefined) ??
            (latestNuxt?.vfs as Record<string, unknown> | undefined),
        ),
      })
    },
    'vite:configResolved'(viteConfig, env) {
      trace('nuxt.hook.vite:configResolved', {
        env,
        cacheDir: String((viteConfig as any).cacheDir ?? ''),
      })
    },
    async 'vite:serverCreated'(viteServer, env) {
      const manifestImporter = join(
        process.cwd(),
        'node_modules/nuxt/dist/app/composables/manifest.js',
      )
      const sharedImporter = resolve(
        process.cwd(),
        '../../packages/shared-signal/src/index.mjs',
      )

      try {
        const routeRules = await viteServer.pluginContainer.resolveId(
          '#build/route-rules.mjs',
          manifestImporter,
          { ssr: env.isServer },
        )
        const shared = await viteServer.pluginContainer.resolveId(
          '@repro/shared-signal',
          join(process.cwd(), 'pages/index.vue'),
          { ssr: env.isServer },
        )
        const sharedVue = await viteServer.pluginContainer.resolveId(
          'vue',
          sharedImporter,
          { ssr: env.isServer },
        )
        trace('nuxt.hook.vite:serverCreated.resolveId', {
          env,
          routeRulesRequest: '#build/route-rules.mjs',
          routeRules: routeRules
            ? {
                id: String((routeRules as any).id ?? ''),
                external: Boolean((routeRules as any).external),
              }
            : null,
          shared: shared
            ? {
                id: String((shared as any).id ?? ''),
                external: Boolean((shared as any).external),
              }
            : null,
          sharedVue: sharedVue
            ? {
                id: String((sharedVue as any).id ?? ''),
                external: Boolean((sharedVue as any).external),
              }
            : null,
        })
      } catch (error) {
        trace('nuxt.hook.vite:serverCreated.resolveId.error', {
          env,
          error: String(error),
        })
      }
    },
  },
  routeRules: {
    '/': { swr: true },
    '/api/**': { isr: true },
  },
})
