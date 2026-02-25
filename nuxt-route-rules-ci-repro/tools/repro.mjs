import { spawn } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const REPRO_DIR = join(ROOT, '.repro')

const ERROR_RE = /Cannot find module '#build\/route-rules\.mjs'/
const IMPORTER_RE = /nuxt[\\/]+dist[\\/]+app[\\/]+composables[\\/]+manifest\.js/

const mode = process.argv[2]

if (!mode || !['clean', 'run', 'verify', 'debug'].includes(mode)) {
  console.error('Usage: node tools/repro.mjs <clean|run|verify|debug>')
  process.exit(1)
}

async function removePath(path) {
  await rm(path, { recursive: true, force: true })
}

async function cleanWorkspace({ deep = false, removeLogs = false } = {}) {
  await Promise.all([
    removePath(join(ROOT, '.nuxt')),
    removePath(join(ROOT, '.output')),
    removePath(join(ROOT, 'docs/.nuxt')),
    removePath(join(ROOT, 'docs/.output')),
    removePath(join(ROOT, 'playground/.nuxt')),
    removePath(join(ROOT, 'playground/.output')),
    removePath(join(ROOT, 'test/fixtures/plain/.nuxt')),
    removePath(join(ROOT, 'test/fixtures/plain/.output')),
    removePath(join(ROOT, 'test/.nuxt'))
  ])

  if (deep) {
    await Promise.all([
      removePath(join(ROOT, 'node_modules')),
      removePath(join(ROOT, 'docs/node_modules')),
      removePath(join(ROOT, 'playground/node_modules'))
    ])
  }

  if (removeLogs) {
    await removePath(REPRO_DIR)
  }
}

function oracleMatched(text) {
  return ERROR_RE.test(text) && IMPORTER_RE.test(text)
}

function findRelevantStackBlock(text) {
  const lines = text.split('\n')
  const index = lines.findIndex(line => ERROR_RE.test(line))
  if (index === -1) {
    return ''
  }

  const start = Math.max(0, index - 8)
  const end = Math.min(lines.length, index + 32)
  return lines.slice(start, end).join('\n')
}

async function runCommand(command, args, { cwd = ROOT, print = true } = {}) {
  return new Promise((resolvePromise) => {
    const child = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        FORCE_COLOR: '0'
      },
      stdio: ['ignore', 'pipe', 'pipe']
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      const text = chunk.toString()
      stdout += text
      if (print) {
        process.stdout.write(text)
      }
    })

    child.stderr.on('data', (chunk) => {
      const text = chunk.toString()
      stderr += text
      if (print) {
        process.stderr.write(text)
      }
    })

    child.on('close', (exitCode) => {
      resolvePromise({
        code: exitCode ?? 1,
        output: `${stdout}${stderr}`
      })
    })
  })
}

async function installDependencies() {
  const install = await runCommand('pnpm', ['install', '--frozen-lockfile'])
  if (install.code !== 0) {
    console.error('\nInstall failed.')
    process.exit(1)
  }
}

async function runVitest() {
  return runCommand('pnpm', [
    'exec',
    'vitest',
    'run',
    'test/route-rules.repro.test.ts',
    '--config',
    'vitest.config.ts'
  ])
}

async function runNuxtModulePrepare() {
  return runCommand('pnpm', ['exec', 'nuxt-module-build', 'prepare'])
}

async function ensureLogDir() {
  await mkdir(REPRO_DIR, { recursive: true })
}

async function runAttempt(index) {
  await cleanWorkspace({ deep: false, removeLogs: false })
  const install = await runCommand('pnpm', ['install', '--frozen-lockfile'])
  const prepare = install.code === 0 ? await runNuxtModulePrepare() : { code: 1, output: '' }
  const test = (install.code === 0 && prepare.code === 0) ? await runVitest() : { code: 1, output: '' }

  const output = `${install.output}${prepare.output}${test.output}`
  const code = install.code === 0 && prepare.code === 0 ? test.code : 1

  await ensureLogDir()
  const file = join(REPRO_DIR, `run-${index}.log`)
  await writeFile(file, output, 'utf8')

  const matched = oracleMatched(output)

  return {
    code,
    output,
    matched,
    logFile: file
  }
}

async function runDebug() {
  await ensureLogDir()
  const debugFile = join(REPRO_DIR, 'debug.log')

  const nodeVersion = await runCommand('node', ['-v'], { print: false })
  const pnpmVersion = await runCommand('pnpm', ['-v'], { print: false })
  const nuxtTree = await runCommand('pnpm', ['ls', 'nuxt', '-r'], { print: false })
  const nuxtInstances = await runCommand(
    'sh',
    ['-c', "ls node_modules/.pnpm | rg '^nuxt@' || true"],
    { print: false }
  )

  const debugText = [
    `node: ${nodeVersion.output.trim()}`,
    `pnpm: ${pnpmVersion.output.trim()}`,
    '',
    'pnpm ls nuxt -r:',
    nuxtTree.output.trim(),
    '',
    'node_modules/.pnpm entries matching nuxt@*:',
    nuxtInstances.output.trim()
  ].join('\n')

  await writeFile(debugFile, debugText, 'utf8')
  process.stdout.write(`${debugText}\n\n`)

  const result = await runAttempt('debug')
  const snippet = findRelevantStackBlock(result.output)
  if (snippet) {
    process.stdout.write('First relevant stack block:\n')
    process.stdout.write(`${snippet}\n`)
  } else {
    process.stdout.write('No target stack block found in the last run.\n')
  }

  if (!result.matched) {
    console.error(`\nTarget oracle not matched. Full log: ${result.logFile}`)
    process.exit(1)
  }

  process.stdout.write(`\nTarget oracle matched. Full log: ${result.logFile}\n`)
}

async function runSingle() {
  const result = await runAttempt(1)
  if (!result.matched) {
    console.error(`\nTarget oracle not matched. Full log: ${result.logFile}`)
    process.exit(1)
  }

  process.stdout.write(`\nTarget oracle matched. Full log: ${result.logFile}\n`)
}

async function runVerify() {
  const attempts = 3
  for (let i = 1; i <= attempts; i += 1) {
    process.stdout.write(`\n=== Attempt ${i}/${attempts} ===\n`)
    const result = await runAttempt(i)
    if (!result.matched) {
      console.error(`\nAttempt ${i} did not match the target oracle.`)
      console.error(`Full log: ${result.logFile}`)
      process.exit(1)
    }
    process.stdout.write(`Attempt ${i} matched the target oracle.\n`)
  }

  process.stdout.write('\nAll attempts matched the target oracle.\n')
}

if (mode === 'clean') {
  const deep = process.argv.includes('--deep')
  await cleanWorkspace({ deep, removeLogs: true })
  process.stdout.write(`Workspace cleaned${deep ? ' (deep)' : ''}.\n`)
}

if (mode === 'run') {
  await runSingle()
}

if (mode === 'verify') {
  await runVerify()
}

if (mode === 'debug') {
  if (!existsSync(REPRO_DIR)) {
    await mkdir(REPRO_DIR, { recursive: true })
  }
  await runDebug()
}
