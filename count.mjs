// Preloaded by verify.mjs with `node --import`. Counts how often @nuxt/icon asks local-pkg
// whether @iconify/json is installed, and the node:fs calls each of those checks makes.
//
// local-pkg's `isPackageExists` is wrapped while its file loads (a `registerHooks` load hook
// renames it and adds a counting wrapper; nothing on disk changes). node:fs sync functions are
// wrapped and `syncBuiltinESMExports()` updates the named ESM exports mlly imports. A call
// counts as a check when its name is `@iconify/json` and @nuxt/icon is on the stack. The stack
// also says which @nuxt/icon code asked.
import fs from 'node:fs'
import { registerHooks, syncBuiltinESMExports } from 'node:module'

const FS = ['statSync', 'lstatSync', 'existsSync', 'realpathSync', 'readFileSync', 'accessSync']
const checks = []
let current = null

for (const name of FS) {
  const orig = fs[name]
  fs[name] = function (...args) {
    if (current) current.fs[name] = (current.fs[name] ?? 0) + 1
    return orig.apply(this, args)
  }
}
syncBuiltinESMExports()

// Which @nuxt/icon code made the check, from the frames under hasFullCollection.
function site (stack) {
  if (stack.includes('discoverInstalledCollections')) return 'discover collections'
  if (stack.includes('getContents')) return 'server-bundle template'
  if (/@nuxt\/icon\/dist\/module\.mjs/.test(stack)) return 'nitro:config hook'
  return 'other'
}

globalThis.__reproCount = {
  checks,
  wrap (orig, name, options) {
    const stack = new Error('check').stack
    if (name !== '@iconify/json' || !stack.includes('/@nuxt/icon/') || current) return orig(name, options)
    current = { site: site(stack), paths: options.paths?.length ?? 0, fs: {} }
    try {
      current.found = orig(name, options)
      return current.found
    } finally {
      checks.push(current)
      current = null
    }
  },
}

const NEEDLE = 'function isPackageExists(name, options = {}) {'
let wrapped = 0
registerHooks({
  load (url, context, nextLoad) {
    const result = nextLoad(url, context)
    if (!/\/local-pkg\/dist\/index\.mjs$/.test(url)) return result
    const source = String(result.source)
    if (!source.includes(NEEDLE)) throw new Error(`count.mjs: ${url} has no isPackageExists to wrap`)
    wrapped++
    return {
      ...result,
      source: source.replace(NEEDLE, `function isPackageExists(name, options = {}) {
  return globalThis.__reproCount.wrap(__isPackageExists, name, options);
}
function __isPackageExists(name, options = {}) {`),
    }
  },
})
Object.defineProperty(globalThis.__reproCount, 'wrapped', { get: () => wrapped })
