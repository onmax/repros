// Records which copies of Nuxt's nitro-environment plugins are active in Vite's
// `nitro` environment, where Vite got each one from, and how many times Rolldown
// calls its resolveId and transform hooks. Writes `.repro/nitro-plugins.json` for
// `verify.mjs`. It observes the build and changes nothing in it.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'

/** Nuxt's own nitro plugins, keyed by the name a copy may carry. */
const WATCHED: Record<string, string> = {
  'nuxt:nitro-v2-compat': 'nuxt:nitro-v2-compat',
  'nuxt:nitro-resolve-fallback': 'nuxt:nitro-resolve-fallback',
  // the Vite copy is renamed, the Rollup copy keeps impound's own name
  'impound': 'import protection (impound)',
  'nuxt:server-import-protection:impound': 'import protection (impound)',
}

interface Instance {
  plugin: string
  name: string
  /** Index in the nitro environment's plugin list. */
  position: number
  /** Where Vite got the plugin object from. */
  source: 'build.rolldownOptions.plugins' | 'config.plugins' | 'other'
  resolveId: number
  /** resolveId calls that returned an id, so later resolvers didn't run. */
  answered: number
  transform: number
  /** transform calls that returned new code. */
  changed: number
}

/** @param root The fixture directory, where the report is written. */
export function inspectNitroPlugins (root: string): Plugin {
  const instances: Instance[] = []

  return {
    name: 'repro:inspect-nitro-plugins',
    applyToEnvironment: env => env.name === 'nitro',
    // Runs before Nitro's `buildApp` builds any environment, so the hook
    // wrappers are in place when Vite builds the nitro environment.
    buildApp: {
      order: 'pre',
      handler (builder) {
        const env = builder.environments.nitro
        if (!env) return
        const fromRolldownOptions = new Set([env.config.build.rolldownOptions?.plugins].flat(Infinity))
        const fromConfig = new Set(builder.config.plugins)
        env.plugins.forEach((plugin, position) => {
          const watched = WATCHED[plugin.name]
          if (!watched) return
          const instance: Instance = {
            plugin: watched,
            name: plugin.name,
            position,
            source: fromRolldownOptions.has(plugin) ? 'build.rolldownOptions.plugins' : fromConfig.has(plugin) ? 'config.plugins' : 'other',
            resolveId: 0,
            answered: 0,
            transform: 0,
            changed: 0,
          }
          instances.push(instance)
          for (const key of ['resolveId', 'transform'] as const) {
            const hook = plugin[key] as any
            if (!hook) continue
            const handler = typeof hook === 'function' ? hook : hook.handler
            const count = (result: unknown) => {
              if (result) instance[key === 'resolveId' ? 'answered' : 'changed']++
              return result
            }
            const wrapped = function (this: unknown, ...args: unknown[]) {
              instance[key]++
              const result = handler.apply(this, args)
              return result instanceof Promise ? result.then(count) : count(result)
            }
            // Copies made with `{ ...plugin }` share the hook object, so give each copy its own.
            ;(plugin as any)[key] = typeof hook === 'function' ? wrapped : { ...hook, handler: wrapped }
          }
        })
      },
    },
    buildEnd () {
      const dir = join(root, '.repro')
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, 'nitro-plugins.json'), `${JSON.stringify({ instances }, null, 2)}\n`)
    },
  }
}
