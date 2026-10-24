// Replaces `nuxt:imports-transform` with Rolldown's native `transform.inject` in the
// client and SSR builds, as the build-time study did. unimport's import list becomes
// the inject map. The JS plugin keeps only the code that imports from `#imports`,
// which inject doesn't rewrite. The nitro build keeps Nitro's own auto-imports.
//
// No workaround for `nuxt:compiler:keyed-functions` here. That plugin only adds keys
// to calls whose callee is imported, and with inject an auto-imported `useState` is
// still a free identifier when it runs. The same file in the -fix fixture adds the
// study's workaround.
import { addVitePlugin, defineNuxtModule } from 'nuxt/kit'
import type { Plugin } from 'vite'

interface Import { name: string, as?: string, from: string, type?: boolean, disabled?: boolean }
type Transform = (this: { environment?: { name: string } }, code: string, id: string, ...rest: unknown[]) => unknown

const ENVS = new Set(['client', 'ssr'])

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
