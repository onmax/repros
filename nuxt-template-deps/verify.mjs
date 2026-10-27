// Usage: node verify.mjs   (PORT=<port> to change the dev server port, default 3000)
// Starts `nuxt dev`, waits for the page and for startup to settle, then edits the text in
// app/app.vue once (a `change` event) and reads the report of modules/count-templates.ts.
// Expected: only templates that can depend on app/app.vue run. Nuxt's own templates declare
// `dependsOn`, and none of them depends on app.vue.
// Exits 1 while the bug is present (templates that declare no `dependsOn` ran and returned the
// same text), 0 when none ran, and 2 when the check is inconclusive.
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT || '3000'
const file = join(root, 'app/app.vue')
const original = readFileSync(file, 'utf8')

const child = spawn(process.execPath, [join(root, 'node_modules/nuxt/bin/nuxt.mjs'), 'dev', '--port', port, '--host', '127.0.0.1', '--no-qr'], {
  cwd: root,
  detached: true,
  env: { ...process.env, NO_COLOR: '1', NUXT_TELEMETRY_DISABLED: '1' },
  stdio: ['ignore', 'pipe', 'pipe'],
})
const reports = []
let log = ''
let lastOutput = Date.now()
const onData = (data) => {
  log += data
  lastOutput = Date.now()
  for (const line of String(data).split('\n')) {
    const json = line.match(/\[count-templates:json\] (.*)/)?.[1]
    if (json) { reports.push(JSON.parse(json)) }
  }
}
child.stdout.on('data', onData)
child.stderr.on('data', onData)

async function until (test, ms, what) {
  for (const start = Date.now(); Date.now() - start < ms; await sleep(200)) {
    if (await test()) { return }
  }
  throw new Error(`timed out waiting for ${what}`)
}
const page = async () => { try { return await (await fetch(`http://127.0.0.1:${port}/`)).text() } catch { return '' } }

let code = 2
try {
  await until(async () => (await page()).includes('Edit me: 0'), 300_000, 'the page')
  await until(() => Date.now() - lastOutput > 3000, 60_000, 'startup to settle')
  const before = reports.length
  writeFileSync(file, original.replace('Edit me: 0', 'Edit me: 1'))
  await until(() => reports.slice(before).some(r => r.trigger === 'change app/app.vue'), 30_000, 'a report for the edit')
  await sleep(1000) // let a second regeneration from the same save report too
  const edit = reports.slice(before).filter(r => r.trigger === 'change app/app.vue' && r.ran > 0)
  const ran = edit.reduce((n, r) => n + r.ran, 0)
  const same = edit.reduce((n, r) => n + r.same, 0)
  const undeclared = edit.reduce((n, r) => n + r.undeclared, 0)
  const byOwner = {}
  for (const r of edit) { for (const [owner, n] of Object.entries(r.byOwner)) { byOwner[owner] = (byOwner[owner] ?? 0) + n } }

  console.log(log.match(/Nuxt \S+ \(with [^)]*\)/)?.[0] ?? '')
  console.log(`At startup: ${reports[0]?.ran} templates, ${reports[0]?.undeclared} of them declare no dependsOn`)
  console.log('\nOne save of app/app.vue (text "Edit me: 0" -> "Edit me: 1")')
  console.log('  expected: no template runs, since none can depend on app/app.vue')
  console.log(`  actual:   ${edit.length} generateApp run(s) with ${edit.map(r => r.ran).join(' + ')} templates, ${same} of ${ran} returned the same text as before, ${undeclared} of ${ran} declare no dependsOn`)
  for (const [owner, n] of Object.entries(byOwner).sort((a, b) => b[1] - a[1])) { console.log(`    ${String(n).padStart(4)}  ${owner}`) }
  code = undeclared > 0 ? 1 : 0
  console.log(code ? '  FAIL: templates without dependsOn ran on a change they cannot depend on' : '  PASS')
} catch (error) {
  console.error(`INCONCLUSIVE: ${error.message}\n--- nuxt dev output ---\n${log}`)
} finally {
  writeFileSync(file, original)
  mkdirSync(join(root, '.repro'), { recursive: true })
  writeFileSync(join(root, '.repro/dev.log'), log)
  try { process.kill(-child.pid, 'SIGTERM') } catch {}
  await sleep(1500)
  try { process.kill(-child.pid, 'SIGKILL') } catch {}
}
process.exit(code)
