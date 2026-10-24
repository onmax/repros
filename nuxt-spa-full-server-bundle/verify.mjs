// Builds this app with `nuxt build`, then checks what `.output/server` ships and what it serves.
//
// Every fixture on this branch runs this same file and reads its expectations from app/.
// Each .vue file carries a `marker-*` string. A marker in a `*.server.vue` file belongs to a
// server component: the server must ship it and render it as an island. Every other marker is
// client-only code, which `.output/public` must contain and `.output/server` must not.
//
// Exits 1 when a check fails, 2 when the build or the server cannot start.
import { spawn, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { connect } from 'node:net'
import { basename, dirname, join, relative } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import { pathToFileURL } from 'node:url'

const HOST = '127.0.0.1'
const PORT = 4517
const ROUTES = ['/', '/about']

const walk = dir => readdirSync(dir, { withFileTypes: true })
  .flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)])
const readTree = dir => walk(dir).map(file => ({ path: relative(dir, file), text: readFileSync(file, 'latin1') }))
const sha256 = text => createHash('sha256').update(text).digest('hex').slice(0, 16)
const version = dir => JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')).version

const results = []
function check (ok, label, detail) {
  results.push({ ok, label })
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}${detail ? `: ${detail}` : ''}`)
}

// What is under test: the installed builder's `ServerEntryPlugin` call decides what
// `nuxt/internal/entry`, the module the renderer imports, re-exports.
const nuxtDir = dirname(createRequire(import.meta.url).resolve('nuxt/package.json'))
const builderDir = dirname(createRequire(join(nuxtDir, 'package.json')).resolve('@nuxt/vite-builder/package.json'))
const serverEntryCall = readFileSync(join(builderDir, 'dist/index.mjs'), 'utf8').match(/^\s+(ServerEntryPlugin\(nuxt, \w+\))/m)?.[1]
console.log(`nuxt-nightly ${version(nuxtDir)}; @nuxt/vite-builder-nightly ${version(builderDir)} calls ${serverEntryCall}`)

const markers = walk('app').filter(file => file.endsWith('.vue')).flatMap(file =>
  (readFileSync(file, 'utf8').match(/marker-[a-z-]+/g) ?? []).map(marker => ({ marker, file, server: file.endsWith('.server.vue') })))

rmSync('.nuxt', { recursive: true, force: true })
rmSync('.output', { recursive: true, force: true })
const build = spawnSync('pnpm', ['exec', 'nuxt', 'build'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } })
const buildLog = `${build.stdout}${build.stderr}`
writeFileSync('build.log', buildLog)
if (build.status !== 0) {
  console.log(buildLog.split('\n').slice(-60).join('\n'))
  console.log('\nnuxt build failed; full log in build.log')
  process.exit(2)
}

const serverFiles = readTree('.output/server')
const publicFiles = readTree('.output/public')
const serverModules = serverFiles.filter(file => file.path.endsWith('.mjs'))
const ssrModules = buildLog.split('building ssr environment')[1]?.match(/([\d,]+) modules transformed/)?.[1]
console.log(`ssr environment: ${ssrModules ?? '?'} modules transformed; .output/server: ${serverModules.length} .mjs files, ${(serverModules.reduce((sum, file) => sum + file.text.length, 0) / 1024).toFixed(1)} kB`)

console.log('\nclient-only code: expected in .output/public, absent from .output/server')
for (const { marker, file } of markers.filter(m => !m.server)) {
  const inServer = serverFiles.filter(f => f.text.includes(marker)).map(f => f.path)
  const inPublic = publicFiles.filter(f => f.text.includes(marker)).length
  check(inPublic > 0 && inServer.length === 0, `${marker} (${file})`,
    `${inPublic} public file(s); server: ${inServer.length ? inServer.join(', ') : 'none'}`)
}
const serverComponents = markers.filter(m => m.server)
if (serverComponents.length) {
  console.log('\nserver components: expected in .output/server')
  for (const { marker, file } of serverComponents) {
    const inServer = serverFiles.filter(f => f.text.includes(marker)).map(f => f.path)
    check(inServer.length > 0, `${marker} (${file})`, `server: ${inServer.length ? inServer.join(', ') : 'none'}`)
  }
}

const portOpen = () => new Promise((resolve) => {
  const socket = connect(PORT, HOST)
  socket.once('connect', () => { socket.destroy(); resolve(true) })
  socket.once('error', () => resolve(false))
})
if (await portOpen()) {
  console.log(`\nport ${PORT} is already in use; stop that process and rerun`)
  process.exit(2)
}

console.log(`\nnode .output/server/index.mjs on ${HOST}:${PORT}`)
const server = spawn(process.execPath, ['.output/server/index.mjs'], { env: { ...process.env, HOST, PORT: String(PORT) }, stdio: ['ignore', 'pipe', 'pipe'] })
let serverLog = ''
server.stdout.on('data', (chunk) => { serverLog += chunk })
server.stderr.on('data', (chunk) => { serverLog += chunk })
const serverExit = new Promise(resolve => server.once('exit', resolve))
const bodies = {}
try {
  for (let i = 0; i < 100 && server.exitCode === null && !(await portOpen()); i++) await sleep(100)
  if (!(await portOpen())) {
    console.log(serverLog)
    console.log('the server did not start')
    process.exit(2)
  }
  for (const route of ROUTES) {
    const response = await fetch(`http://${HOST}:${PORT}${route}`)
    const body = bodies[route] = await response.text()
    const type = response.headers.get('content-type') ?? ''
    // The SPA shell: an empty app root and a payload that says nothing was server-rendered.
    const shell = response.status === 200 && type.includes('text/html') && body.includes('<div id="__nuxt"></div>') && body.includes('data-ssr="false"')
    const rendered = markers.filter(m => body.includes(m.marker)).map(m => m.marker)
    check(shell && !rendered.length, `GET ${route}`,
      `${response.status} ${type}, ${body.length} bytes${shell ? ', SPA shell' : ''}${rendered.length ? `, contains ${rendered.join(', ')}` : ''}`)
  }
  check(ROUTES.every(route => bodies[route] === bodies[ROUTES[0]]), `${ROUTES.join(' and ')} serve the same HTML`)
  if (serverComponents.length) {
    const { getIslandHash } = await import(pathToFileURL(join(nuxtDir, 'dist/app/island-hash.js')).href)
    for (const { marker, file } of serverComponents) {
      const name = basename(file, '.server.vue')
      const route = `/__nuxt_island/${name}_${getIslandHash({ name, props: {}, context: {} })}.json`
      const response = await fetch(`http://${HOST}:${PORT}${route}`)
      const body = await response.text()
      check(response.status === 200 && body.includes(marker), `GET ${route}`,
        `${response.status}, ${body.includes(marker) ? `renders ${marker}` : body.replace(/\s+/g, ' ').slice(0, 100)}`)
    }
  }
}
finally {
  server.kill('SIGTERM')
  await serverExit
  writeFileSync('server.log', serverLog)
}

const ss = spawnSync('ss', ['-ltn', `sport = :${PORT}`], { encoding: 'utf8' })
const listeners = ss.status === 0 ? ss.stdout.trim().split('\n').slice(1) : undefined
const stillOpen = await portOpen()
check(!stillOpen && !listeners?.length, `port ${PORT} closed after stopping the server`,
  `${listeners ? `ss -ltn 'sport = :${PORT}' lists ${listeners.length ? listeners.join('; ') : 'nothing'}` : 'ss not available'}; connection ${stillOpen ? 'accepted' : 'refused'}`)

// With a fixed buildId, build timestamps are the only content two clean builds differ in.
const publicDigest = sha256(publicFiles.map(f => `${f.path}\n${f.text.replace(/"timestamp":\d+/g, '"timestamp":0')}`).sort().join('\n'))
console.log('\nfingerprints, to compare across fixtures')
console.log(`  shell HTML: sha256 ${sha256(bodies[ROUTES[0]] ?? '')}`)
console.log(`  .output/public: ${publicFiles.length} files, sha256 ${publicDigest} (build timestamps zeroed)`)

const failed = results.filter(result => !result.ok)
if (failed.some(result => markers.some(m => !m.server && result.label.startsWith(m.marker)))) {
  console.log('\nClient-only page and component code is bundled into .output/server, though the server only sends the SPA shell.')
}
console.log(failed.length ? `${failed.length} of ${results.length} checks failed.` : `\nAll ${results.length} checks passed.`)
process.exitCode = failed.length ? 1 : 0
