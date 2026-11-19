// Compares what Nuxt resolves for this app with what mcp-server-nuxt reports.
// Usage: node verify.mjs            (uses node_modules/mcp-server-nuxt)
//        MCP_SERVER_NUXT_ENTRY=/path/to/dist/index.js node verify.mjs
//        MCP_REPRO_PARSER=1 node verify.mjs   (server reads a copy without node_modules,
//                                              so it uses its source parser instead of Kit)
// Exits 1 when any claim below fails.
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { cpSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(path.join(root, 'package.json'))
const entry = process.env.MCP_SERVER_NUXT_ENTRY
  ?? path.join(path.dirname(require.resolve('mcp-server-nuxt/package.json')), 'dist/index.js')
const rel = (p) => path.relative(root, p) || '.'

async function nuxtTruth() {
  const kit = await import(pathToFileURL(require.resolve('@nuxt/kit')).href)
  const buildDir = mkdtempSync(path.join(tmpdir(), 'mcp-nuxt-repro-'))
  const nuxt = await kit.loadNuxt({ cwd: root, dev: false, overrides: { _prepare: true, buildDir } })
  let pages = []
  nuxt.hook('pages:resolved', (p) => { pages = p })
  try {
    await kit.buildNuxt(nuxt)
  } finally {
    await nuxt.close()
    rmSync(buildDir, { recursive: true, force: true })
  }
  const routes = new Map()
  for (const p of pages) routes.set(p.path, rel(p.file))
  return { layers: nuxt.options._layers.map((l) => rel(l.cwd)), routes }
}

const parserMode = process.env.MCP_REPRO_PARSER === '1'
const serverRoot = parserMode ? mkdtempSync(path.join(tmpdir(), 'mcp-nuxt-parser-')) : root
if (parserMode) {
  cpSync(root, serverRoot, { recursive: true, filter: (src) => !src.includes(`${path.sep}node_modules`) })
}
const relServer = (p) => path.relative(serverRoot, p) || '.'

async function mcpCalls(calls) {
  const child = spawn(process.execPath, [entry, '--project', serverRoot], { stdio: ['pipe', 'pipe', 'pipe'] })
  let stderr = ''
  child.stderr.on('data', (d) => { stderr += d })
  let buf = ''
  const waiting = new Map()
  child.stdout.on('data', (d) => {
    buf += d
    let nl
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl)
      buf = buf.slice(nl + 1)
      let msg
      try { msg = JSON.parse(line) } catch { continue }
      waiting.get(msg.id)?.(msg)
    }
  })
  const request = (id, method, params) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout on ${method}\n${stderr}`)), 60_000)
    waiting.set(id, (m) => { clearTimeout(timer); resolve(m) })
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n')
  })
  try {
    await request(0, 'initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'repro', version: '0' } })
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n')
    const out = {}
    let id = 1
    for (const name of calls) {
      const res = await request(id++, 'tools/call', { name, arguments: {} })
      out[name] = JSON.parse(res.result.content[0].text)
    }
    return out
  } finally {
    child.kill()
    if (parserMode) rmSync(serverRoot, { recursive: true, force: true })
  }
}

const truth = await nuxtTruth()
const mcp = await mcpCalls(['inspect_layers', 'list_routes'])
const mcpLayers = mcp.inspect_layers.layers.map((l) => relServer(l.cwd))
const mcpRoutes = mcp.list_routes.routes.map((r) => [r.path, relServer(r.absolutePath)])

console.log('server entry:', rel(entry), parserMode ? '(source parser, no node_modules)' : '(Kit)')
console.log('Nuxt _layers:          ', JSON.stringify(truth.layers))
console.log('inspect_layers:        ', JSON.stringify(mcpLayers))
console.log('Nuxt pages:resolved:   ', JSON.stringify([...truth.routes]))
console.log('list_routes:           ', JSON.stringify(mcpRoutes))

const claims = [
  ['inspect_layers matches Nuxt _layers (same layers, same order)',
    JSON.stringify(mcpLayers) === JSON.stringify(truth.layers)],
  ['list_routes includes /from-layer from auto-registered layers/base',
    mcpRoutes.some(([p]) => p === '/from-layer')],
  ['list_routes includes /shared from the extends layers',
    mcpRoutes.some(([p]) => p === '/shared')],
  ['list_routes reports /shared once, from the file Nuxt uses',
    JSON.stringify(mcpRoutes.filter(([p]) => p === '/shared').map(([, f]) => f)) === JSON.stringify([truth.routes.get('/shared')])],
  ['list_routes includes /module-admin added by extendPages',
    mcpRoutes.some(([p]) => p === '/module-admin')],
]
let failed = 0
for (const [name, ok] of claims) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`)
  if (!ok) failed++
}
process.exit(failed ? 1 : 0)
