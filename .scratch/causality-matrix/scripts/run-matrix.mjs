import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync, statSync, copyFileSync } from 'node:fs'
import { join, dirname } from 'node:path'

const BASE = '/Users/maxi/repros/.scratch/causality-matrix'
const RESULTS = process.env.RESULTS_DIR || join(BASE, 'results')

const cases = [
  { id: 'nuxt-only', cwd: join(BASE, 'cases/nuxt-only'), hasHub: false },
  { id: 'nuxt+hub-old', cwd: join(BASE, 'cases/nuxt-hub-old'), hasHub: true },
  { id: 'nuxt+hub-831', cwd: join(BASE, 'cases/nuxt-hub-831'), hasHub: true },
  { id: 'saas-pr253-canary', cwd: '/Users/maxi/nuxt/saas', hasHub: true, canary: true }
]

const nodes = [
  { id: 'node22', version: '22.22.0', nodeExec: 'fnm exec --using 22.22.0' },
  { id: 'node25', version: '25.6.1', nodeExec: '' }
]

const scenarios = [
  { id: 'dev', timeoutMs: 35000 },
  { id: 'typecheck' },
  { id: 'typecheck-build-concurrent' }
]

function runShell(command, cwd, { timeoutMs } = {}) {
  return new Promise((resolve) => {
    const child = spawn('bash', ['-lc', command], { cwd, stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    let timedOut = false
    const timer = timeoutMs ? setTimeout(() => {
      timedOut = true
      child.kill('SIGTERM')
      setTimeout(() => child.kill('SIGKILL'), 3000)
    }, timeoutMs) : null

    child.stdout.on('data', (d) => { stdout += d.toString() })
    child.stderr.on('data', (d) => { stderr += d.toString() })

    child.on('close', (code, signal) => {
      if (timer) clearTimeout(timer)
      resolve({ code: code ?? 0, signal: signal ?? null, timedOut, output: stdout + stderr })
    })
  })
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true })
}

function safeStat(path) {
  try {
    return statSync(path)
  } catch {
    return null
  }
}

function routeRulesFiles(cwd) {
  const candidates = [
    join(cwd, '.nuxt/route-rules.mjs'),
    join(cwd, '.nuxt/dev/route-rules.mjs'),
    join(cwd, '.output/server/chunks/routes/route-rules.mjs')
  ]
  return candidates.filter(p => existsSync(p))
}

function hubWrites(cwd) {
  return {
    blob: existsSync(join(cwd, 'node_modules/@nuxthub/blob')),
    kv: existsSync(join(cwd, 'node_modules/@nuxthub/kv')),
    db: existsSync(join(cwd, 'node_modules/@nuxthub/db'))
  }
}

function detectRouteRulesFailure(text) {
  return /Failed to resolve import "#build\/route-rules\.mjs"|Cannot find module '#build\/route-rules\.mjs'|Pre-transform error: Failed to resolve import "#build\/route-rules\.mjs"/.test(text)
}

function errorHighlights(text) {
  const lines = text.split(/\n/)
    .filter(l => /ERROR|Error|Failed to resolve import|Cannot find module|route-rules\.mjs/.test(l))
    .slice(0, 20)
  return lines
}

function cleanHubArtifacts(cwd) {
  for (const d of ['blob', 'kv', 'db']) {
    rmSync(join(cwd, `node_modules/@nuxthub/${d}`), { recursive: true, force: true })
  }
}

async function runScenario({ caseDef, nodeDef, scenario }) {
  const outDir = join(RESULTS, caseDef.id, nodeDef.id)
  ensureDir(outDir)

  if (caseDef.hasHub) {
    cleanHubArtifacts(caseDef.cwd)
  }

  const beforeWrites = hubWrites(caseDef.cwd)

  const nodeExec = nodeDef.nodeExec ? `${nodeDef.nodeExec} ` : ''
  let cmd
  if (scenario.id === 'dev') {
    cmd = `bash -lc 'tmp=$(mktemp); setsid ${nodeExec}pnpm -s run dev >\"$tmp\" 2>&1 & pgid=$!; sleep 35; kill -TERM -$pgid 2>/dev/null || true; sleep 2; kill -KILL -$pgid 2>/dev/null || true; wait $pgid 2>/dev/null || true; cat \"$tmp\"; rm -f \"$tmp\"'`
  } else if (scenario.id === 'typecheck') {
    cmd = `${nodeExec}bash -lc 'pnpm -s run prepare && pnpm -s run typecheck'`
  } else {
    cmd = `${nodeExec}bash -lc 'pnpm -s run prepare >/dev/null 2>&1 || true; pnpm -s run typecheck & pid1=$!; pnpm -s run build & pid2=$!; wait $pid1; ec1=$?; wait $pid2; ec2=$?; echo "__EXIT_TYPECHECK__=$ec1"; echo "__EXIT_BUILD__=$ec2"; test $ec1 -eq 0 -a $ec2 -eq 0'`
  }

  const res = await runShell(cmd, caseDef.cwd, { timeoutMs: scenario.id === 'dev' ? undefined : scenario.timeoutMs })
  const logPath = join(outDir, `${scenario.id}.log`)
  writeFileSync(logPath, res.output)

  const afterWrites = hubWrites(caseDef.cwd)
  const routeFiles = routeRulesFiles(caseDef.cwd)
  const routeRulesFailure = detectRouteRulesFailure(res.output)

  const summary = {
    case: caseDef.id,
    nodeVersion: nodeDef.version,
    nodeLabel: nodeDef.id,
    scenario: scenario.id,
    command: cmd,
    cwd: caseDef.cwd,
    exitCode: res.code,
    timedOut: res.timedOut,
    routeRulesFailure,
    routeRulesFiles: routeFiles,
    nuxthubPhysicalWrites: afterWrites,
    nuxthubPhysicalWritesDelta: {
      blob: !beforeWrites.blob && afterWrites.blob,
      kv: !beforeWrites.kv && afterWrites.kv,
      db: !beforeWrites.db && afterWrites.db
    },
    notes: errorHighlights(res.output)
  }

  writeFileSync(join(outDir, `${scenario.id}.json`), JSON.stringify(summary, null, 2))
  return summary
}

async function runInstall(caseDef, nodeDef) {
  const outDir = join(RESULTS, caseDef.id, nodeDef.id)
  ensureDir(outDir)

  const nodeExec = nodeDef.nodeExec ? `${nodeDef.nodeExec} ` : ''
  const cmd = `${nodeExec}pnpm i`
  const res = await runShell(cmd, caseDef.cwd)
  writeFileSync(join(outDir, 'install.log'), res.output)
  const summary = {
    case: caseDef.id,
    nodeVersion: nodeDef.version,
    nodeLabel: nodeDef.id,
    scenario: 'install',
    command: cmd,
    cwd: caseDef.cwd,
    exitCode: res.code,
    timedOut: res.timedOut,
    routeRulesFailure: detectRouteRulesFailure(res.output),
    routeRulesFiles: routeRulesFiles(caseDef.cwd),
    nuxthubPhysicalWrites: hubWrites(caseDef.cwd),
    notes: errorHighlights(res.output)
  }
  writeFileSync(join(outDir, 'install.json'), JSON.stringify(summary, null, 2))
  return summary
}

async function runContaminationCheck() {
  const contRoot = join(BASE, 'contamination-check')
  const parent = join(contRoot, 'parent-with-node-modules')
  const project = join(parent, 'project')
  rmSync(contRoot, { recursive: true, force: true })
  ensureDir(join(parent, 'node_modules/vite'))
  ensureDir(project)

  writeFileSync(join(parent, 'node_modules/vite/package.json'), JSON.stringify({ name: 'vite', version: '0.0.0-parent-fake' }, null, 2))
  writeFileSync(join(parent, 'node_modules/vite/index.js'), 'module.exports = {}\n')

  // Copy nuxt-only case files
  for (const f of ['package.json', 'nuxt.config.ts', 'app.vue', '.gitignore']) {
    copyFileSync(join(BASE, 'cases/nuxt-only', f), join(project, f))
  }

  const outDir = join(RESULTS, 'contamination-check', 'node22')
  ensureDir(outDir)

  const install = await runShell('fnm exec --using 22.22.0 pnpm i', project)
  writeFileSync(join(outDir, 'install.log'), install.output)

  const dev = await runShell('bash -lc \'tmp=$(mktemp); setsid fnm exec --using 22.22.0 pnpm -s run dev >"$tmp" 2>&1 & pgid=$!; sleep 35; kill -TERM -$pgid 2>/dev/null || true; sleep 2; kill -KILL -$pgid 2>/dev/null || true; wait $pgid 2>/dev/null || true; cat "$tmp"; rm -f "$tmp"\'', project)
  writeFileSync(join(outDir, 'dev.log'), dev.output)

  const summary = {
    case: 'contamination-check',
    nodeVersion: '22.22.0',
    scenario: 'dev',
    cwd: project,
    routeRulesFailure: detectRouteRulesFailure(dev.output),
    notes: errorHighlights(dev.output),
    parentNodeModules: true,
    parentViteVersion: '0.0.0-parent-fake'
  }
  writeFileSync(join(outDir, 'dev.json'), JSON.stringify(summary, null, 2))
  return summary
}

async function main() {
  ensureDir(RESULTS)
  const all = []

  for (const nodeDef of nodes) {
    for (const caseDef of cases) {
      const install = await runInstall(caseDef, nodeDef)
      all.push(install)
      for (const scenario of scenarios) {
        const res = await runScenario({ caseDef, nodeDef, scenario })
        all.push(res)
      }
    }
  }

  const contamination = await runContaminationCheck()
  all.push(contamination)

  writeFileSync(join(RESULTS, 'all-results.json'), JSON.stringify(all, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
