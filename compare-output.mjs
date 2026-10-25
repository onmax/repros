// Usage: node compare-output.mjs <outputA> <outputB> [--show N]
// Compares two Nuxt .output trees after removing what differs between two clean
// builds of the same app: timestamps, public-asset mtimes and order, the SSR
// styles map order, and the hashed names that follow from them. The two fixtures
// also live in different directories and one has a patched dependency, so pnpm
// store directory names, Nitro's handler import names and some source-map columns
// differ too, and so does the fixture path that the nitro v2 compat bakes in; those
// are normalized below. Everything else must be byte-identical.
// Exits 1 when anything differs.
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const list = (dir) => {
  const out = []
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else out.push(relative(dir, p))
    }
  }
  walk(dir)
  return out
}

// Files whose order or timestamps vary between identical clean builds. Nitro's public
// asset table is in index.mjs, or in _libs/_nuxt/nitro-server.mjs when Rolldown splits it out.
const ORDER_FREE = /(^|\/)(index\.mjs|_libs\/_nuxt\/nitro-server\.mjs|precomputed[-.][\w-]+\.mjs|styles[-.][\w-]+\.mjs)(\.map)?$|^nitro\.json$|builds\/(latest|meta\/.*)\.json$/
const HASH = /([-.])[A-Za-z0-9_-]{8}(?=\.(m?js|css)\b)/g
// Module comments name pnpm's store directory, which differs for a patched package.
const STORE_DIR = /node_modules\/\.pnpm\/[^/"]+\/node_modules\//g
// Nitro names each handler import after a hash of the handler's absolute path.
const HANDLER_IMPORT = /\b_(lazy_)?[0-9a-f]{16}\b/g
const stem = p => p.replace(HASH, '$1#').replace(/meta\/[^/]+\.json$/, 'meta/<id>.json')

// Nitro's virtual modules import by absolute path, so in a source map the original
// column of a segment that points into one moves with the directory name. Drop it.
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const mapWithoutVirtualColumns = (json) => {
  const m = JSON.parse(json)
  let source = 0, line = 0, column = 0, name = 0
  const mappings = m.mappings.split(';').map((l) => {
    let generated = 0
    return l.split(',').filter(Boolean).map((segment) => {
      const v = []
      let value = 0, shift = 0
      for (const ch of segment) {
        const d = B64.indexOf(ch)
        value += (d & 31) << shift
        if (d & 32) { shift += 5; continue }
        v.push(value & 1 ? -(value >>> 1) : value >>> 1)
        value = 0
        shift = 0
      }
      generated += v[0]
      if (v.length === 1) return [generated]
      source += v[1]; line += v[2]; column += v[3]
      if (v.length > 4) name += v[4]
      const virtual = m.sources[source]?.startsWith('virtual:')
      return [generated, source, line, virtual ? '-' : column, ...(v.length > 4 ? [name] : [])]
    })
  })
  return JSON.stringify({ ...m, mappings })
}

// Nuxt's nitro v2 compat bakes in the absolute path of .output/server, which names the fixture.
const norm = (p, s, fixture) => {
  s = s.replaceAll(fixture, '<fixture>').replace(HASH, '$1#')
    .replace(STORE_DIR, 'node_modules/.pnpm/<dir>/node_modules/')
    .replace(HANDLER_IMPORT, '_$1<path-hash>')
    .replace(/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?Z/g, '<time>')
    .replace(/"timestamp":\s*\d+/g, '"timestamp":0')
  if (p.endsWith('.map') && !ORDER_FREE.test(p)) return mapWithoutVirtualColumns(s)
  if (ORDER_FREE.test(p)) {
    if (p.endsWith('.map')) {
      const m = JSON.parse(s)
      return JSON.stringify({ sources: [...m.sources].sort(), names: [...(m.names ?? [])].sort() })
    }
    // Strip mtime and etag lines (the etag hashes timestamped files, which are
    // compared on their own), then compare as a sorted multiset of lines.
    return s.split(/\r?\n/).map(l => l.replace(/,\s*$/, '').trim()).filter(l => !/^"(mtime|etag)"/.test(l)).sort().join('\n')
  }
  return s
}

export function compareOutputs (dirA, dirB) {
  const a = new Map(list(dirA).map(p => [stem(p), p]))
  const b = new Map(list(dirB).map(p => [stem(p), p]))
  const diffs = []
  let same = 0
  for (const [k, pa] of a) {
    const pb = b.get(k)
    if (!pb) { diffs.push({ k, why: 'only in A' }); continue }
    const ba = readFileSync(join(dirA, pa)), bb = readFileSync(join(dirB, pb))
    if (ba.equals(bb)) { same++; continue }
    const na = norm(pa, ba.toString('utf8'), dirname(dirA)), nb = norm(pb, bb.toString('utf8'), dirname(dirB))
    if (na === nb) { same++; continue }
    let i = 0
    while (i < na.length && na[i] === nb[i]) i++
    diffs.push({ k, why: `differs at ${i}`, a: na.slice(Math.max(0, i - 60), i + 100), b: nb.slice(Math.max(0, i - 60), i + 100) })
  }
  for (const k of b.keys()) if (!a.has(k)) diffs.push({ k, why: 'only in B' })
  return { files: a.size, same, diffs }
}

export function printComparison ({ files, same, diffs }, show = 3) {
  console.log(`files ${files} | normalized-equal ${same} | different ${diffs.length}`)
  for (const d of diffs.slice(0, 50)) {
    console.log(`  ${d.k}: ${d.why}`)
    if (d.a !== undefined && show > 0) console.log(`    A: ${JSON.stringify(d.a)}\n    B: ${JSON.stringify(d.b)}`)
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  const show = args.includes('--show') ? Number(args[args.indexOf('--show') + 1]) : 3
  const result = compareOutputs(args[0], args[1])
  printComparison(result, show)
  process.exitCode = result.diffs.length ? 1 : 0
}
