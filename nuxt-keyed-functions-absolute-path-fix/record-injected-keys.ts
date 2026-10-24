// Only observes. Runs after `nuxt:compiler:keyed-functions` and records every key it
// injected, per Vite environment and module id relative to the app root, in
// .repro/injected-keys.json.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { Plugin } from 'vite'

// keyed-functions appends `'$<10 chars>' /* nuxt-injected */` as the last argument.
const INJECTED_KEY = /'(\$[\w-]{10})' \/\* nuxt-injected \*\//g

export function recordInjectedKeys (rootDir: string): Plugin {
  const keys: Record<string, Record<string, string[]>> = {}
  return {
    name: 'repro:record-injected-keys',
    enforce: 'post',
    transform: {
      order: 'post',
      handler (code, id) {
        const found = [...code.matchAll(INJECTED_KEY)].map(match => match[1])
        if (found.length) (keys[this.environment.name] ??= {})[relative(rootDir, id)] = found
      },
    },
    buildEnd () {
      mkdirSync(join(rootDir, '.repro'), { recursive: true })
      writeFileSync(join(rootDir, '.repro/injected-keys.json'), JSON.stringify(keys, null, 2))
    },
  }
}
