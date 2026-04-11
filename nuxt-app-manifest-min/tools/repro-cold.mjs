import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'

const rootDir = resolve(process.cwd())
const logsDir = resolve(rootDir, 'logs')
const runsArg = process.argv.find((arg) => arg === '--runs')
const runs = runsArg ? Number(process.argv[process.argv.indexOf('--runs') + 1] ?? 5) : Number(process.env.REPRO_RUNS ?? 5)
const runMs = Number(process.env.REPRO_RUN_MS ?? 12000)

mkdirSync(logsDir, { recursive: true })

function count(text, pattern) {
  return (text.match(pattern) ?? []).length
}

async function runOnce(run) {
  const stamp = `${Date.now()}-${run}`
  const cliLogPath = resolve(logsDir, `cold-cli-${stamp}.log`)
  const nuxtLogPath = resolve(logsDir, `cold-nuxt-${stamp}.log`)

  rmSync(resolve(rootDir, '.nuxt'), { recursive: true, force: true })

  const env = {
    ...process.env,
    REPRO_TRACE: '1',
    REPRO_TRACE_LOG: nuxtLogPath,
    DEBUG: process.env.DEBUG ? `${process.env.DEBUG},vite:resolve` : 'vite:resolve',
  }

  const child = spawn('pnpm', ['dev'], {
    cwd: rootDir,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let output = ''
  let port = null

  const onChunk = (chunk) => {
    const text = chunk.toString()
    output += text
    appendFileSync(cliLogPath, text)
    const match = output.match(/http:\/\/localhost:(\d+)/)
    if (match && !port) {
      port = Number(match[1])
    }
  }

  child.stdout.on('data', onChunk)
  child.stderr.on('data', onChunk)

  const exitPromise = new Promise((resolveExit) => {
    child.on('exit', (code, signal) => resolveExit({ code, signal }))
  })

  const startedAt = Date.now()
  while (!port && Date.now() - startedAt < runMs) {
    await new Promise((r) => setTimeout(r, 200))
  }

  if (port) {
    await fetch(`http://localhost:${port}/`).catch(() => null)
    await new Promise((r) => setTimeout(r, 2000))
  }

  child.kill('SIGTERM')
  await Promise.race([
    exitPromise,
    new Promise((r) => setTimeout(r, 2500)),
  ])

  if (existsSync(cliLogPath)) {
    const cli = readFileSync(cliLogPath, 'utf8')
    return {
      run,
      cliLogPath,
      nuxtLogPath,
      nuxtLine: (cli.match(/Nuxt 4\.3\.0 \(with Nitro [^)]+\)/) ?? [null])[0],
      preTransformErrors: count(cli, /Pre-transform error:/g),
      appManifestErrors: count(cli, /Failed to resolve import "#app-manifest"/g),
      routeRulesErrors: count(cli, /Failed to resolve import "#build\/route-rules\.mjs"/g),
      importAnalysisErrors: count(cli, /Plugin: vite:import-analysis/g),
    }
  }

  return {
    run,
    cliLogPath,
    nuxtLogPath,
    nuxtLine: null,
    preTransformErrors: 0,
    appManifestErrors: 0,
    routeRulesErrors: 0,
    importAnalysisErrors: 0,
  }
}

async function main() {
  const results = []
  for (let i = 1; i <= runs; i++) {
    process.stdout.write(`[repro-cold] run ${i}/${runs}\n`)
    results.push(await runOnce(i))
  }

  console.log('run,preTransform,appManifest,routeRules,importAnalysis')
  for (const row of results) {
    console.log(`${row.run},${row.preTransformErrors},${row.appManifestErrors},${row.routeRulesErrors},${row.importAnalysisErrors}`)
  }

  const summary = results.reduce(
    (acc, row) => {
      acc.runs += 1
      acc.preTransformErrors += row.preTransformErrors
      acc.appManifestErrors += row.appManifestErrors
      acc.routeRulesErrors += row.routeRulesErrors
      acc.importAnalysisErrors += row.importAnalysisErrors
      if (!acc.nuxtLine && row.nuxtLine) {
        acc.nuxtLine = row.nuxtLine
      }
      return acc
    },
    {
      runs: 0,
      nuxtLine: null,
      preTransformErrors: 0,
      appManifestErrors: 0,
      routeRulesErrors: 0,
      importAnalysisErrors: 0,
    },
  )

  const summaryPath = resolve(logsDir, 'summary.json')
  writeFileSync(summaryPath, JSON.stringify({ summary, results }, null, 2) + '\n')
  console.log(`[repro-cold] summaryPath ${summaryPath}`)
}

main().catch((error) => {
  console.error('[repro-cold] fatal', error)
  process.exitCode = 1
})
