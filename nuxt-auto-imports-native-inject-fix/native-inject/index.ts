// Replaces `nuxt:imports-transform` with Rolldown's native `transform.inject` in the
// client and SSR builds, as the build-time study did. unimport's import list becomes
// the inject map. The JS plugin keeps only the code that imports from `#imports`,
// which inject doesn't rewrite. The nitro build keeps Nitro's own auto-imports.
//
// `nuxt:compiler:keyed-functions` only adds keys to calls whose callee is imported,
// and with inject an auto-imported `useState` is still a free identifier when it runs.
// This copy adds the study's workaround, marked below. The fixture without -fix has
// the same file without it.
import { addVitePlugin, defineNuxtModule } from 'nuxt/kit'
import type { Plugin } from 'vite'

interface Import { name: string, as?: string, from: string, type?: boolean, disabled?: boolean }
type Transform = (this: { environment?: { name: string } }, code: string, id: string, ...rest: unknown[]) => unknown

const ENVS = new Set(['client', 'ssr'])
// Nuxt's default keyed composables.
const KEYED = ['useState', 'useFetch', 'useLazyFetch', 'useAsyncData', 'useLazyAsyncData', 'createUseFetch', 'createUseAsyncData']

export default defineNuxtModule({
  meta: { name: 'repro:native-inject' },
  setup (_options, nuxt) {
    let getImports: (() => Promise<Import[]>) | undefined
    nuxt.hook('imports:context', (ctx) => {
      getImports = () => ctx.getImports()
    })

    let inject: Record<string, string | [string, string]> | undefined
    async function injectMap () {
      if (inject) return inject
      if (!getImports) throw new Error('[repro:native-inject] imports:context was not called')
      inject = {}
      for (const i of await getImports()) {
        if (i.type || i.disabled) continue
        inject[i.as ?? i.name] = i.name === 'default' ? i.from : [i.from, i.name]
      }
      return inject
    }

    addVitePlugin({
      name: 'repro:native-inject',
      async configEnvironment (name) {
        if (!ENVS.has(name)) return
        return { build: { rolldownOptions: { transform: { inject: await injectMap() } } } }
      },
      configResolved (config) {
        wrapTransform(config.plugins, 'nuxt:imports-transform', handler => function (code, id, ...rest) {
          if (ENVS.has(this.environment?.name ?? '') && !code.includes('#imports')) return null
          return handler.call(this, code, id, ...rest)
        })
        // The workaround: hand keyed-functions the imports unimport would have added for
        // free keyed composables, then strip them from its result.
        wrapTransform(config.plugins, 'nuxt:compiler:keyed-functions', handler => async function (code, id, ...rest) {
          if (!ENVS.has(this.environment?.name ?? '') || !inject) return handler.call(this, code, id, ...rest)
          const free = KEYED.filter(n => inject![n] && new RegExp(`\\b${n}\\s*\\(`).test(code)
            && !new RegExp(`\\bimport\\b[^;]*\\b${n}\\b|\\b(?:function|const|let|var)\\s+${n}\\b`).test(code))
          if (!free.length) return handler.call(this, code, id, ...rest)
          const prefix = `${free.map(n => `import { ${n} } from ${JSON.stringify((inject![n] as [string, string])[0])};`).join('')}\n`
          const result = await handler.call(this, prefix + code, id, ...rest) as string | { code?: unknown } | null | undefined
          if (!result) return result
          const out = typeof result === 'string' ? result : result.code
          if (typeof out !== 'string' || !out.startsWith(prefix)) throw new Error(`[repro:native-inject] keyed-functions moved the prefix in ${id}`)
          return { code: out.slice(prefix.length), map: null }
        })
      },
    })
  },
})

const wrapped = new WeakSet<Plugin>()
function wrapTransform (plugins: readonly Plugin[], name: string, wrap: (handler: Transform) => Transform) {
  for (const p of plugins) {
    if (p.name !== name || !p.transform || wrapped.has(p)) continue
    wrapped.add(p)
    const hook = p.transform as Transform | { handler: Transform }
    if (typeof hook === 'function') p.transform = wrap(hook) as Plugin['transform']
    else hook.handler = wrap(hook.handler)
  }
}
