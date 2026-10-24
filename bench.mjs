// The `allowDirs` nested-dir filter of `@nuxt/vite-builder` on its own, without Nuxt.
// Times the current filter and the fix on generated lists and checks both give the same list.
// Usage: node bench.mjs [N...]   (default 500 2000 5000)
import { deepStrictEqual } from 'node:assert'

// Current code (packages/vite/src/vite.ts at nuxt/nuxt bf4220d6e), with a call counter.
function oldFilter (allowDirs) {
  let calls = 0
  const kept = allowDirs.filter(d =>
    !allowDirs.some((other) => {
      calls++
      return other !== d && d.startsWith(other + '/')
    }),
  )
  return { result: [...new Set(kept)], calls }
}

// Fix: de-duplicate, then look up each dir's ancestors in the Set.
function newFilter (allowDirs) {
  let calls = 0
  const unique = new Set(allowDirs)
  const result = [...unique].filter((dir) => {
    for (let i = dir.indexOf('/'); i !== -1; i = dir.indexOf('/', i + 1)) {
      calls++
      if (unique.has(dir.slice(0, i))) {
        return false
      }
    }
    return true
  })
  return { result, calls }
}

// Same shape as the lab: app in /w/app (its workspaceDir), 12 layers beside it whose
// roots end in `/`, components spread over one dir per layer plus `perDir`-sized subfolders.
function makeDirs (n, { distinct }) {
  const layers = Array.from({ length: 12 }, (_, i) => `/w/layers/l${i}`)
  const dirs = [
    '/w/app/node_modules/nuxt/dist/app',
    '/w/app',
    '/w/app/node_modules',
    '/w/node_modules',
    '/w/app/',
    ...layers.map(l => l + '/'),
  ]
  for (let i = 0; i < n; i++) {
    const layer = layers[i % layers.length]
    dirs.push(distinct ? `${layer}/app/components/c${i}` : `${layer}/app/components`)
  }
  dirs.push('/w/layers/l0/app/plugins', '/w/layers/l0/app/layouts', '/w/layers/l0-extra/app/components', '/w/app/app', '/w/app/app')
  return dirs
}

function time (fn, input) {
  const runs = []
  let out
  for (let i = 0; i < 5; i++) {
    const t = performance.now()
    out = fn(input)
    runs.push(performance.now() - t)
  }
  runs.sort((a, b) => a - b)
  return { ...out, ms: runs[2] }
}

const sizes = process.argv.slice(2).map(Number)
const ns = sizes.length ? sizes : [500, 2000, 5000]
const rows = []
for (const distinct of [false, true]) {
  for (const n of ns) {
    const input = makeDirs(n, { distinct })
    const a = time(oldFilter, input)
    const b = time(newFilter, input)
    deepStrictEqual(b.result, a.result)
    rows.push({ shape: distinct ? 'one dir per component' : 'shared dirs', n, entries: input.length, kept: a.result.length, 'old calls': a.calls, 'old ms': +a.ms.toFixed(1), 'new calls': b.calls, 'new ms': +b.ms.toFixed(2) })
  }
}
console.table(rows)
console.log('old and new results are identical (same entries, same order)')
