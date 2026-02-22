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
if (!['all', 'baseline', 'contaminated', 'real'].includes(mode)) {
  console.error('Usage: node tools/repro.mjs [all|baseline|contaminated|real]')
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

function runCommand (cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: opts.cwd,
      env: { ...process.env, ...opts.env },
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
    })

    let output = ''
    child.stdout.on('data', chunk => { output += chunk.toString() })
    child.stderr.on('data', chunk => { output += chunk.toString() })

    child.on('error', reject)
    child.on('close', code => {
      if (code === 0 || opts.allowFailure) {
        resolve({ code, output: stripAnsi(output) })
      } else {
        reject(new Error(`${cmd} ${args.join(' ')} failed with code ${code}\n${output}`))
      }
    })
  })
}

async function copyWorkspace (dest) {
  await mkdir(dest, { recursive: true })
  const include = [
    'package.json',
    'pnpm-workspace.yaml',
    'apps',
    'external',
  ]
  for (const entry of include) {
    await cp(join(ROOT, entry), join(dest, entry), { recursive: true })
  }
  const lockfile = join(ROOT, 'pnpm-lock.yaml')
  if (existsSync(lockfile)) {
    await cp(lockfile, join(dest, 'pnpm-lock.yaml'))
  }
}

async function installDependencies (cwd) {
  await runCommand('pnpm', ['i', '--silent'], { cwd })
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
  await runCommand('pnpm', ['i', '--silent'], { cwd: parentDir })
}

async function waitForPort (state, timeoutMs = 60000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
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
    // best-effort probe request
  }
}

async function stopProcess (child) {
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

function parseHookJSON (logs, label) {
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

function parseResult (spec, logs) {
  const viteMatch = logs.match(/Nuxt 4\.3\.0 \(with Nitro [^,]+, Vite ([0-9.]+) and Vue [^)]+\)/)
  const hasTargetError = logs.includes(TARGET_ERROR)
  const hasImportAnalysis = logs.includes(IMPORT_ANALYSIS_MARKER)
  return {
    scenarioId: spec.id,
    classification: spec.classification,
    viteVersion: viteMatch?.[1] || 'unknown',
    hasTargetError,
    hasImportAnalysis,
    ready: parseHookJSON(logs, 'ready'),
    templatesGenerated: parseHookJSON(logs, 'templatesGenerated'),
    serverCreated: parseHookJSON(logs, 'vite:serverCreated'),
    logs,
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

  await installDependencies(reproDir)

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
    await stopProcess(child)
  }

  const result = parseResult(spec, state.logs)
  const logDir = join(ROOT, '.tmp', 'logs')
  await mkdir(logDir, { recursive: true })
  const logPath = join(logDir, `${spec.id}.log`)
  await writeFile(logPath, state.logs)
  result.logPath = logPath
  return result
}

function summarize (results) {
  const header = [
    'scenario',
    'class',
    'vite',
    'ready:#build/route-rules',
    'templates:route-rules',
    'serverCreated:#build/route-rules',
    'targetError',
    'importAnalysis',
    'log',
  ]

  const rows = results.map((result) => [
    result.scenarioId,
    result.classification,
    result.viteVersion,
    String(result.ready?.hasBuildRouteRules ?? 'n/a'),
    String(result.templatesGenerated?.hasRouteRulesTemplate ?? 'n/a'),
    String(result.serverCreated?.hasBuildRouteRules ?? 'n/a'),
    result.hasTargetError ? 'yes' : 'no',
    result.hasImportAnalysis ? 'yes' : 'no',
    result.logPath,
  ])

  console.log(table([header, ...rows]))
}

const baselineSpec = {
  id: 's0-baseline',
  classification: 'natural',
  contaminated: false,
  env: {},
}

const naturalContaminatedSpecs = [
  {
    id: 's1-parent-node-modules',
    classification: 'natural',
    contaminated: true,
    env: {},
  },
  {
    id: 's2-cache-dir',
    classification: 'natural',
    contaminated: true,
    env: {
      REPRO_CACHE_DIR: '1',
    },
  },
  {
    id: 's3-linked-package-natural',
    classification: 'natural',
    contaminated: true,
    env: {
      REPRO_CACHE_DIR: '1',
      REPRO_LINKED_PLUGIN: '1',
    },
  },
]

const syntheticContaminatedSpecs = [
  {
    id: 's9-linked-package-simulated',
    classification: 'synthetic',
    contaminated: true,
    env: {
      REPRO_CACHE_DIR: '1',
      REPRO_LINKED_PLUGIN: '1',
      REPRO_DROP_ROUTE_RULES: '1',
      REPRO_FORCE_IMPORT_ANALYSIS_FAIL: '1',
    },
  },
]

function specsForMode (currentMode) {
  if (currentMode === 'baseline') {
    return [baselineSpec]
  }
  if (currentMode === 'contaminated') {
    return [...naturalContaminatedSpecs, ...syntheticContaminatedSpecs]
  }
  if (currentMode === 'real') {
    return [baselineSpec, ...naturalContaminatedSpecs]
  }
  return [baselineSpec, ...naturalContaminatedSpecs, ...syntheticContaminatedSpecs]
}

const specs = specsForMode(mode)
const results = []
for (const spec of specs) {
  results.push(await runScenario(spec))
}

summarize(results)

const baselineResult = results.find(r => r.scenarioId === baselineSpec.id)
const contaminatedResults = results.filter(r => r.scenarioId !== baselineSpec.id)
const naturalContaminatedResults = contaminatedResults.filter(r => r.classification === 'natural')

const canonicalAny = contaminatedResults.find(r => r.hasTargetError && r.hasImportAnalysis)
const canonicalNatural = naturalContaminatedResults.find(r => r.hasTargetError && r.hasImportAnalysis)

if (baselineResult?.hasTargetError) {
  console.error('\nBaseline unexpectedly reproduced the target error.')
  process.exit(1)
}

if (mode === 'baseline') {
  process.exit(0)
}

if (mode === 'real') {
  if (!canonicalNatural) {
    console.error('\nNo natural scenario reproduced the target import-analysis error.')
    process.exit(1)
  }
  console.log(`\nCanonical natural scenario: ${canonicalNatural.scenarioId}`)
  process.exit(0)
}

if (!canonicalAny) {
  console.error('\nNo contaminated scenario reproduced the target import-analysis error.')
  process.exit(1)
}

if (canonicalNatural) {
  console.log(`\nCanonical natural scenario: ${canonicalNatural.scenarioId}`)
} else {
  console.log('\nNatural scenarios are still negative; synthetic canonical scenario is used.')
}
console.log(`Canonical scenario: ${canonicalAny.scenarioId}`)
