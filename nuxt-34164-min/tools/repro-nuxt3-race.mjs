import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'

const rootDir = resolve(process.cwd())
const runs = Number(process.env.REPRO_NUXT3_RUNS ?? 6)
const logsDir = resolve(rootDir, 'logs', 'repro-nuxt3-race')

mkdirSync(logsDir, { recursive: true })

const scenarios = [
  {
    name: 'appManifestOn',
    env: {},
  },
  {
    name: 'appManifestOff',
    env: {
      REPRO_DISABLE_APP_MANIFEST: '1',
    },
  },
]

function extractCliLogPath(stdout) {
  const match = stdout.match(/\[trace-dev\] cliLog: (.+)\n/)
  return match ? match[1].trim() : null
}

function count(text, pattern) {
  return (text.match(pattern) ?? []).length
}

async function runTrace(scenarioName, runIndex, extraEnv) {
  const outPath = resolve(logsDir, `${scenarioName}-run-${runIndex}.out`)
  const buildDir = resolve(rootDir, 'apps', 'web-nuxt3-modrinthlike', '.nuxt')

  rmSync(buildDir, { recursive: true, force: true })

  const env = {
    ...process.env,
    ...extraEnv,
    REPRO_APP_FILTER: 'web-nuxt3-modrinthlike',
    REPRO_TRACE_RUN_MS: process.env.REPRO_TRACE_RUN_MS ?? '12000',
  }

  const child = spawn('node', ['./tools/trace-dev.mjs'], {
    cwd: rootDir,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let output = ''

  child.stdout.on('data', (chunk) => {
    const text = chunk.toString()
    output += text
    appendFileSync(outPath, text)
  })

  child.stderr.on('data', (chunk) => {
    const text = chunk.toString()
    output += text
    appendFileSync(outPath, text)
  })

  await new Promise((resolveExit) => child.on('exit', () => resolveExit(null)))

  const cliLogPath = extractCliLogPath(output)
  const cliLog = cliLogPath && existsSync(cliLogPath) ? readFileSync(cliLogPath, 'utf8') : ''
  const nuxtLineMatch = cliLog.match(/Nuxt 3\.21\.0 \(with Nitro [^)]+\)/)

  return {
    scenario: scenarioName,
    run: runIndex,
    outPath,
    cliLogPath,
    nuxtLine: nuxtLineMatch ? nuxtLineMatch[0] : null,
    preTransformErrors: count(cliLog, /Pre-transform error:/g),
    appManifestErrors: count(cliLog, /Failed to resolve import "#app-manifest"/g),
    routeRulesErrors: count(cliLog, /Failed to resolve import "#build\/route-rules\.mjs"/g),
    importAnalysisErrors: count(cliLog, /Plugin: vite:import-analysis/g),
  }
}

function printResults(results) {
  console.log('scenario,run,preTransform,appManifest,routeRules,importAnalysis')
  for (const row of results) {
    console.log(
      `${row.scenario},${row.run},${row.preTransformErrors},${row.appManifestErrors},${row.routeRulesErrors},${row.importAnalysisErrors}`,
    )
  }
}

function summarize(results, scenarioName) {
  const rows = results.filter((row) => row.scenario === scenarioName)
  const totals = rows.reduce(
    (acc, row) => {
      acc.preTransformErrors += row.preTransformErrors
      acc.appManifestErrors += row.appManifestErrors
      acc.routeRulesErrors += row.routeRulesErrors
      acc.importAnalysisErrors += row.importAnalysisErrors
      return acc
    },
    {
      preTransformErrors: 0,
      appManifestErrors: 0,
      routeRulesErrors: 0,
      importAnalysisErrors: 0,
    },
  )
  return {
    scenario: scenarioName,
    runs: rows.length,
    ...totals,
  }
}

async function main() {
  const results = []

  for (const scenario of scenarios) {
    for (let run = 1; run <= runs; run++) {
      process.stdout.write(`[nuxt3-race] ${scenario.name} run ${run}/${runs}\n`)
      const result = await runTrace(scenario.name, run, scenario.env)
      results.push(result)
    }
  }

  printResults(results)

  const onSummary = summarize(results, 'appManifestOn')
  const offSummary = summarize(results, 'appManifestOff')
  const summary = {
    runsPerScenario: runs,
    appManifestOn: onSummary,
    appManifestOff: offSummary,
    shiftedToRouteRules:
      onSummary.routeRulesErrors === 0 &&
      offSummary.routeRulesErrors > 0 &&
      offSummary.appManifestErrors === 0,
  }

  const summaryPath = resolve(logsDir, 'summary.json')
  writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + '\n')

  console.log('[nuxt3-race] summary', summary)
  console.log(`[nuxt3-race] summaryPath ${summaryPath}`)

  if (onSummary.appManifestErrors === 0) {
    console.error('[nuxt3-race] expected at least one #app-manifest error in appManifestOn scenario')
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error('[nuxt3-race] fatal', error)
  process.exitCode = 1
})
