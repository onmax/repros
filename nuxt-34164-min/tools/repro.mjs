import { cp, mkdir, realpath, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const ROOT = dirname(dirname(__filename))
const TMP_ROOT = join(ROOT, '.tmp')
const TARGET_ERROR = 'Pre-transform error: Failed to resolve import "#build/route-rules.mjs"'
const IMPORT_ANALYSIS_MARKER = 'vite:import-analysis'

const mode = process.argv[2] || 'all'
if (!['all', 'baseline', 'contaminated'].includes(mode)) {
  console.error('Usage: node tools/repro.mjs [all|baseline|contaminated]')
  process.exit(1)
}

function stripAnsi (input) {
  return input.replace(/\u001b\[[0-9;]*m/g, '')
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function table (rows) {
  const widths = rows[0].map((_, i) => Math.max(...rows.map(row => String(row[i]).length)))
  return rows
    .map((row, idx) => row
      .map((cell, i) => String(cell).padEnd(widths[i]))
      .join(' | ')
    + (idx === 0 ? `\n${widths.map(w => '-'.repeat(w)).join('-|-')}` : ''))
    .join('\n')
}

async function copyWorkspace (dest) {
  await mkdir(dest, { recursive: true })
  for (const entry of ['package.json', 'pnpm-workspace.yaml', 'apps', 'external']) {
    await cp(join(ROOT, entry), join(dest, entry), { recursive: true })
  }
  const lockfile = join(ROOT, 'pnpm-lock.yaml')
  if (existsSync(lockfile)) {
    await cp(lockfile, join(dest, 'pnpm-lock.yaml'))
  }
}

async function createContaminatedParent (parentDir) {
  const pkg = {
    name: 'contaminator',
    private: true,
    devDependencies: {
      vite: '6.4.1',
    },
  }
  await writeFile(join(parentDir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')
  await run('pnpm', ['i', '--silent'], parentDir)
}

function run (cmd, args, cwd, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      env: { ...process.env, ...extraEnv },
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let output = ''
    child.stdout.on('data', chunk => { output += chunk.toString() })
    child.stderr.on('data', chunk => { output += chunk.toString() })
    child.on('error', reject)
    child.on('close', code => {
      if (code === 0) {
        resolve(stripAnsi(output))
      } else {
        reject(new Error(`${cmd} ${args.join(' ')} failed (${code})\n${output}`))
      }
    })
  })
}

async function waitForPort (state, timeoutMs = 60000) {
  const startedAt = Date.now()
  while (Date.now() - startedAt < timeoutMs) {
    const match = state.logs.match(/Local:\s+http:\/\/localhost:(\d+)\//)
    if (match) {
      return Number(match[1])
    }
    await sleep(200)
  }
  throw new Error('Timed out waiting for dev server port')
}

async function requestURL (url) {
  try {
    await fetch(url, { redirect: 'manual' })
  } catch {
    // best-effort probe
  }
}

async function stopChild (child) {
  if (child.killed) {
    return
  }
  child.kill('SIGTERM')
  await Promise.race([
    new Promise(resolve => child.once('close', resolve)),
    sleep(1500),
  ])
  if (!child.killed) {
    child.kill('SIGKILL')
  }
}

function parseHook (logs, label) {
  const re = new RegExp(`\\[repro\\] ${label} (\\{.*\\})`, 'g')
  const matches = [...logs.matchAll(re)]
  if (!matches.length) {
    return null
  }
  try {
    return JSON.parse(matches[matches.length - 1][1])
  } catch {
    return null
  }
}

async function runScenario (spec) {
  const runRoot = join(TMP_ROOT, spec.id)
  const parentDir = join(runRoot, 'parent')
  const reproDir = join(parentDir, 'repro')

  await rm(runRoot, { recursive: true, force: true })
  await mkdir(parentDir, { recursive: true })
  await copyWorkspace(reproDir)

  if (spec.contaminated) {
    await createContaminatedParent(parentDir)
  }

  await run('pnpm', ['i', '--silent'], reproDir)

  const env = {
    NUXT_TELEMETRY_DISABLED: '1',
    REPRO_SCENARIO: spec.id,
    ...spec.env,
  }

  const child = spawn('pnpm', ['--filter', 'web', 'dev'], {
    cwd: reproDir,
    env: { ...process.env, ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  const state = { logs: '' }
  child.stdout.on('data', chunk => { state.logs += stripAnsi(chunk.toString()) })
  child.stderr.on('data', chunk => { state.logs += stripAnsi(chunk.toString()) })

  try {
    const port = await waitForPort(state)
    await requestURL(`http://localhost:${port}/`)

    const manifestPath = await realpath(join(reproDir, 'apps/web/node_modules/nuxt/dist/app/composables/manifest.js'))
    const manifestURL = `http://localhost:${port}/_nuxt${manifestPath}?v=repro`
    await requestURL(manifestURL)
    state.logs += `\n[repro] manifestURL ${manifestURL}\n`

    await sleep(1200)
  } finally {
    await stopChild(child)
  }

  const result = {
    id: spec.id,
    kind: spec.kind,
    vite: (state.logs.match(/Nuxt 4\.3\.0 \(with Nitro [^,]+, Vite ([0-9.]+) and Vue [^)]+\)/) || [])[1] || 'unknown',
    targetError: state.logs.includes(TARGET_ERROR),
    importAnalysis: state.logs.includes(IMPORT_ANALYSIS_MARKER),
    ready: parseHook(state.logs, 'ready')?.hasBuildRouteRules,
    templates: parseHook(state.logs, 'templatesGenerated')?.hasRouteRulesTemplate,
    serverCreated: parseHook(state.logs, 'vite:serverCreated')?.hasBuildRouteRules,
  }

  const logDir = join(ROOT, '.tmp', 'logs')
  await mkdir(logDir, { recursive: true })
  const logPath = join(logDir, `${spec.id}.log`)
  await writeFile(logPath, state.logs)
  result.logPath = logPath

  return result
}

const baseline = {
  id: 's0-baseline',
  kind: 'natural',
  contaminated: false,
  env: {},
}

const contaminated = [
  {
    id: 's1-parent-node-modules',
    kind: 'natural',
    contaminated: true,
    env: {},
  },
  {
    id: 's9-simulated',
    kind: 'synthetic',
    contaminated: true,
    env: {
      REPRO_LINKED_PLUGIN: '1',
      REPRO_DROP_ROUTE_RULES: '1',
      REPRO_FORCE_IMPORT_ANALYSIS_FAIL: '1',
    },
  },
]

const specs = mode === 'baseline'
  ? [baseline]
  : mode === 'contaminated'
    ? contaminated
    : [baseline, ...contaminated]

const results = []
for (const spec of specs) {
  results.push(await runScenario(spec))
}

const rows = [
  ['scenario', 'kind', 'vite', 'ready:#build/route-rules', 'templates:route-rules', 'serverCreated:#build/route-rules', 'targetError', 'importAnalysis', 'log'],
  ...results.map(r => [
    r.id,
    r.kind,
    r.vite,
    String(r.ready),
    String(r.templates),
    String(r.serverCreated),
    r.targetError ? 'yes' : 'no',
    r.importAnalysis ? 'yes' : 'no',
    r.logPath,
  ]),
]

console.log(table(rows))

const baselineResult = results.find(r => r.id === baseline.id)
if (baselineResult?.targetError) {
  console.error('\nBaseline unexpectedly reproduced the target error.')
  process.exit(1)
}

if (mode === 'baseline') {
  process.exit(0)
}

const canonical = results.find(r => r.targetError && r.importAnalysis)
if (!canonical) {
  console.error('\nNo contaminated scenario reproduced the target import-analysis error.')
  process.exit(1)
}

const naturalHit = results.find(r => r.kind === 'natural' && r.targetError && r.importAnalysis)
if (naturalHit) {
  console.log(`\nCanonical natural scenario: ${naturalHit.id}`)
} else {
  console.log('\nNatural scenario is still negative; using synthetic canonical scenario.')
}
console.log(`Canonical scenario: ${canonical.id}`)
