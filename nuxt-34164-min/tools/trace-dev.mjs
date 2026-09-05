import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { spawn } from 'node:child_process'

const rootDir = resolve(process.cwd())
const logsDir = resolve(rootDir, 'logs')
const stamp = Date.now()
const appFilter = process.env.REPRO_APP_FILTER ?? 'web'
const logFilter = appFilter.replace(/[^a-zA-Z0-9_-]/g, '-')
const cliLogPath = resolve(logsDir, `trace-dev-${logFilter}-cli-${stamp}.log`)
const nuxtLogPath = resolve(logsDir, `trace-dev-${logFilter}-nuxt-${stamp}.log`)
const runMs = Number(process.env.REPRO_TRACE_RUN_MS ?? 25000)

mkdirSync(logsDir, { recursive: true })

function writeCliLog(line) {
  appendFileSync(cliLogPath, `${line}\n`)
}

function summarize(logContent) {
  const lines = logContent.split('\n')
  const routeRulesResolve = lines.filter((line) =>
    line.includes('#build/route-rules.mjs'),
  ).length
  const routeRulesTemplate = lines.filter((line) =>
    line.includes('route-rules.mjs'),
  ).length
  const importAnalysisMentions = lines.filter((line) =>
    line.includes('vite:import-analysis'),
  ).length
  const importAnalysisErrors = lines.filter((line) =>
    line.includes('Plugin: vite:import-analysis') ||
    line.includes('plugin: "vite:import-analysis"'),
  ).length
  const targetError = lines.filter((line) =>
    line.includes('Failed to resolve import "#build/route-rules.mjs"'),
  ).length
  return {
    routeRulesResolve,
    routeRulesTemplate,
    importAnalysisMentions,
    importAnalysisErrors,
    targetError,
  }
}

async function request(url) {
  try {
    const response = await fetch(url)
    const body = await response.text()
    writeCliLog(`[trace-dev] GET ${url} -> ${response.status}`)
    return { ok: true, body }
  } catch (error) {
    writeCliLog(`[trace-dev] GET ${url} -> error ${(error && error.message) || String(error)}`)
    return { ok: false, body: '' }
  }
}

async function main() {
  const env = {
    ...process.env,
    REPRO_TRACE: '1',
    REPRO_TRACE_LOG: nuxtLogPath,
    DEBUG: process.env.DEBUG
      ? `${process.env.DEBUG},vite:config,vite:resolve`
      : 'vite:config,vite:resolve',
  }

  writeCliLog(`[trace-dev] root=${rootDir}`)
  writeCliLog(`[trace-dev] appFilter=${appFilter}`)
  writeCliLog(`[trace-dev] cliLog=${cliLogPath}`)
  writeCliLog(`[trace-dev] nuxtLog=${nuxtLogPath}`)
  writeCliLog(`[trace-dev] runMs=${runMs}`)

  const child = spawn('pnpm', ['--filter', appFilter, 'dev'], {
    cwd: rootDir,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let output = ''
  let port = null
  let stopRequested = false

  const onChunk = (chunk) => {
    const text = chunk.toString()
    output += text
    appendFileSync(cliLogPath, text)
    const portMatch = output.match(/http:\/\/localhost:(\d+)/)
    if (portMatch && !port) {
      port = Number(portMatch[1])
      writeCliLog(`[trace-dev] detected_port=${port}`)
    }
  }

  child.stdout.on('data', onChunk)
  child.stderr.on('data', onChunk)

  const exitPromise = new Promise((resolveExit) => {
    child.on('exit', (code, signal) => {
      resolveExit({ code, signal })
    })
  })

  const startedAt = Date.now()
  while (!port && Date.now() - startedAt < runMs) {
    await delay(250)
  }

  if (port) {
    const baseUrl = `http://localhost:${port}`
    const home = await request(baseUrl)

    if (home.ok) {
      const scriptSrcs = Array.from(
        home.body.matchAll(/<script[^>]*src="([^"]+)"/g),
        (match) => match[1],
      ).slice(0, 12)

      for (const src of scriptSrcs) {
        const url = src.startsWith('http') ? src : `${baseUrl}${src}`
        await request(url)
      }
    }

    await delay(4000)
  } else {
    writeCliLog('[trace-dev] no port detected before timeout')
  }

  if (!stopRequested) {
    stopRequested = true
    child.kill('SIGTERM')
  }

  const exit = await Promise.race([
    exitPromise,
    delay(3000).then(() => ({ code: null, signal: 'TIMEOUT' })),
  ])

  if (exit.signal === 'TIMEOUT') {
    child.kill('SIGKILL')
    await exitPromise
  }

  const cliContent = existsSync(cliLogPath) ? readFileSync(cliLogPath, 'utf8') : ''
  const nuxtContent = existsSync(nuxtLogPath) ? readFileSync(nuxtLogPath, 'utf8') : ''
  const cliSummary = summarize(cliContent)
  const nuxtSummary = summarize(nuxtContent)
  const nuxtTraceExists = existsSync(nuxtLogPath)

  console.log('[trace-dev] complete')
  console.log(`[trace-dev] cliLog: ${cliLogPath}`)
  console.log(`[trace-dev] nuxtLog: ${nuxtLogPath}`)
  console.log(`[trace-dev] nuxtTraceExists: ${nuxtTraceExists}`)
  console.log('[trace-dev] summary.cli', cliSummary)
  console.log('[trace-dev] summary.nuxt', nuxtSummary)
}

main().catch((error) => {
  console.error('[trace-dev] fatal', error)
  process.exitCode = 1
})
