// Usage: node check.mjs count <paths> | node check.mjs answers
// `count <n>` calls isPackageExists('@iconify/json', { paths }) once with n paths, as a Nuxt
// module does with one path per layer root, and prints how many fs.statSync and fs.existsSync
// calls it made. `answers` prints what isPackageExists returns for names that resolve and names
// that don't.
// Both print one JSON line. verify.mjs runs each in a fresh process.
import fs from 'node:fs'
import { syncBuiltinESMExports } from 'node:module'
import { join } from 'node:path'

const probes = { statSync: 0, existsSync: 0 }
const seen = new Set()
for (const name of Object.keys(probes)) {
  const original = fs[name]
  fs[name] = function (path, ...rest) {
    probes[name]++
    seen.add(String(path))
    return original.call(this, path, ...rest)
  }
}
// local-pkg and mlly import from node:fs; this makes their named imports see the wrappers.
syncBuiltinESMExports()
const { isPackageExists } = await import('local-pkg')

const root = import.meta.dirname
const layers = n => Array.from({ length: n }, (_, i) => join(root, 'layers', `layer-${i}`))
const pathsFor = (n) => {
  for (const dir of layers(n - 1)) fs.mkdirSync(dir, { recursive: true })
  return [root, ...layers(n - 1)]
}

const [mode, arg] = process.argv.slice(2)
if (mode === 'count') {
  const paths = pathsFor(Number(arg))
  probes.statSync = probes.existsSync = 0
  seen.clear()
  const start = performance.now()
  const found = isPackageExists('@iconify/json', { paths })
  const ms = performance.now() - start
  console.log(JSON.stringify({ paths: paths.length, found, ...probes, distinct: seen.size, ms }))
} else if (mode === 'answers') {
  const paths = pathsFor(23)
  // mlly also tries `name` + `.js` and other extensions, so `ext-variant` resolves when only a
  // package named `ext-variant.js` is installed. A fix that looks only for node_modules/<name>
  // would change this answer.
  const variant = join(root, 'layers', 'ext-variant')
  fs.mkdirSync(join(variant, 'node_modules', 'ext-variant.js'), { recursive: true })
  fs.writeFileSync(join(variant, 'node_modules', 'ext-variant.js', 'package.json'), '{"name":"ext-variant.js","main":"index.js"}\n')
  fs.writeFileSync(join(variant, 'node_modules', 'ext-variant.js', 'index.js'), 'module.exports = 1\n')
  let logged = 0
  console.error = () => logged++
  const answers = {}
  for (const [label, name] of Object.entries({
    installed: 'mlly',
    builtin: 'fs',
    self: 'local-pkg-is-package-exists-paths',
    'non-exported subpath': 'mlly/package.json',
    missing: '@iconify/json',
  })) {
    for (const [count, p] of [[1, paths.slice(0, 1)], [23, paths]]) {
      logged = 0
      answers[`${label} (${name}), ${count} path${count > 1 ? 's' : ''}`] = { exists: isPackageExists(name, { paths: p }), errorsLogged: logged }
    }
  }
  logged = 0
  answers['extension variant (ext-variant, only ext-variant.js installed), 1 path'] = { exists: isPackageExists('ext-variant', { paths: [variant] }), errorsLogged: logged }
  console.log(JSON.stringify(answers))
} else {
  throw new Error('usage: node check.mjs count <paths> | node check.mjs answers')
}
