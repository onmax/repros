// Records which `nuxt:server-auto-imports` instances are active in Vite's `nitro`
// environment and which module ids each one transforms. Writes the result to
// `.repro/server-auto-imports.json` for `verify.mjs`. It observes the build and
// changes nothing in it.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { Plugin } from 'vite'

const NAME = 'nuxt:server-auto-imports'

interface Instance {
  /** Index in the nitro environment's plugin list, which is the order Rolldown runs them in. */
  position: number
  /** Where Vite got the plugin object from. */
  source: 'build.rolldownOptions.plugins' | 'config.plugins' | 'other'
  /** Transform hook calls, one per module of the nitro build. */
  calls: number
  /** Ids the plugin accepted with its own include check, so `injectImports` ran on them. */
  transformed: string[]
  /** Ids it returned new code for. */
  changed: string[]
}

/** @param root The fixture directory: ids are reported relative to it, and the report is written in it. */
export function inspectServerAutoImports (root: string): Plugin {
  const instances: Instance[] = []

  return {
    name: 'repro:inspect-server-auto-imports',
    applyToEnvironment: env => env.name === 'nitro',
    // Runs before Nitro's `buildApp` builds any environment. Vite copies each
    // plugin's transform hook when it builds the environment, so the wrappers
    // must be in place by then.
    buildApp: {
      order: 'pre',
      handler (builder) {
        const env = builder.environments.nitro
        if (!env) return
        const fromRolldownOptions = new Set([env.config.build.rolldownOptions?.plugins].flat(Infinity))
        const fromConfig = new Set(builder.config.plugins)
        env.plugins.forEach((plugin, position) => {
          if (plugin.name !== NAME || !plugin.transform) return
          const instance: Instance = {
            position,
            source: fromRolldownOptions.has(plugin) ? 'build.rolldownOptions.plugins' : fromConfig.has(plugin) ? 'config.plugins' : 'other',
            calls: 0,
            transformed: [],
            changed: [],
          }
          instances.push(instance)
          const hook = plugin.transform as any
          const handler = typeof hook === 'function' ? hook : hook.handler
          // unplugin keeps `transformInclude` on the plugin and calls it inside `transform`.
          // Nitro clones its config, so the `rollupConfig` copy here is a clone that
          // holds the same function.
          const include = (plugin as { transformInclude?: (id: string) => boolean }).transformInclude
          const wrapped = async function (this: unknown, code: string, id: string, ...rest: unknown[]) {
            instance.calls++
            const file = relative(root, id)
            if (!include || include(id)) instance.transformed.push(file)
            const result = await handler.call(this, code, id, ...rest)
            if (result) instance.changed.push(file)
            return result
          }
          if (typeof hook === 'function') plugin.transform = wrapped
          else hook.handler = wrapped
        })
      },
    },
    // Every transform of the nitro build has run by now.
    buildEnd () {
      const dir = join(root, '.repro')
      mkdirSync(dir, { recursive: true })
      for (const instance of instances) {
        instance.transformed.sort()
        instance.changed.sort()
      }
      writeFileSync(join(dir, 'server-auto-imports.json'), `${JSON.stringify({ instances }, null, 2)}\n`)
    },
  }
}
