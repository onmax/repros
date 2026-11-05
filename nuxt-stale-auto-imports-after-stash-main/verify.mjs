// Starts `nuxt dev`, removes and restores an auto-imported export in several ways,
// and checks whether `.nuxt/types/imports.d.ts` and SSR pick the export back up.
// Git runs against a private repository (`.repro-git`) so the outer checkout's stash is untouched.
import { spawn, execFileSync } from 'node:child_process'
import { readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

const PORT = Number(process.env.PORT || 3471)
const only = process.argv.slice(2)
const git = (...args) => execFileSync('git', ['--git-dir=.repro-git', '--work-tree=.', '-c', 'user.name=repro', '-c', 'user.email=repro@example.com', ...args], { encoding: 'utf8' })

const files = {
  shared: { util: 'shared/utils/x.ts', name: 'SHARED_ID' },
  app: { util: 'app/utils/y.ts', name: 'APP_ID' },
}
const page = 'app/pages/index.vue'
let mid

rmSync('.repro-git', { recursive: true, force: true })
git('init', '-q')
// HEAD: the util without the new export and a page that does not use it.
// Working tree (like portal#1476): uncommitted export + uncommitted usage. Ref `with` holds that state.
const working = Object.fromEntries([page, ...Object.values(files).map(f => f.util)].map(p => [p, readFileSync(p, 'utf8')]))
git('add', '-f', 'app', 'shared', 'nuxt.config.ts')
git('commit', '-qm', 'with')
git('branch', 'with')
for (const f of Object.values(files)) writeFileSync(f.util, working[f.util].split('\n').filter(l => !l.includes(f.name)).join('\n'))
writeFileSync(page, '<template><p>base</p></template>\n')
git('commit', '-qam', 'base')
git('checkout', '-q', 'with', '--', '.')
git('reset', '-q')

const count = name => (readFileSync('.nuxt/types/imports.d.ts', 'utf8').match(new RegExp(`\\b${name}\\b`, 'g')) || []).length
async function ssr () {
  const res = await fetch(`http://127.0.0.1:${PORT}/`).catch(e => ({ status: 'ERR', text: async () => String(e) }))
  const body = await res.text()
  return { status: res.status, body }
}

const scenarios = {
  // what happened in portal: stash util + consumer, then pop
  'stash-util-and-page': async (f) => {
    git('stash', 'push', '-q', '--', f.util, page)
    await sleep(3000); mid = count(f.name)
    git('stash', 'pop', '-q')
  },
  'stash-util-only': async (f) => {
    git('stash', 'push', '-q', '--', f.util)
    await sleep(3000); mid = count(f.name)
    git('stash', 'pop', '-q')
  },
  'checkout-older-version': async (f) => {
    // check out the committed version without the export, then the version with it
    git('checkout', 'HEAD', '--', f.util)
    await sleep(3000); mid = count(f.name)
    git('checkout', 'with', '--', f.util)
    git('reset', '-q')
  },
  'rm-and-recreate': async (f) => {
    const full = readFileSync(f.util, 'utf8')
    rmSync(f.util)
    await sleep(3000); mid = count(f.name)
    writeFileSync(f.util, full)
  },
}

const nuxt = spawn('pnpm', ['exec', 'nuxt', 'dev', '--host', '127.0.0.1', '--port', String(PORT)], { stdio: ['ignore', 'pipe', 'pipe'], detached: true })
let log = ''
nuxt.stdout.on('data', d => { log += d })
nuxt.stderr.on('data', d => { log += d })
const stop = () => { try { process.kill(-nuxt.pid, 'SIGTERM') } catch {} }
process.on('exit', stop)

let failed = 0
try {
  for (let i = 0; i < 120; i++) {
    if (existsSync('.nuxt/types/imports.d.ts') && (await ssr()).status === 200) break
    await sleep(1000)
  }
  const first = await ssr()
  if (first.status !== 200) throw new Error(`dev server never served 200:\n${log}`)

  for (const [dir, f] of Object.entries(files)) {
    for (const [name, run] of Object.entries(scenarios)) {
      if (only.length && !only.includes(`${dir}:${name}`)) continue
      const before = count(f.name)
      await run(f)
      await sleep(4000)
      const after = count(f.name)
      const res = await ssr()
      const ok = after > 0 && res.status === 200
      if (!ok) failed++
      const err = res.status !== 200 ? (res.body.match(/[A-Z_]+ is not defined/)?.[0] ?? res.body.slice(0, 120)) : ''
      const later = ok ? '' : `(after +10s: SSR ${await sleep(10000).then(ssr).then(r => r.status)})`
      console.log(`${ok ? 'PASS' : 'FAIL'}  ${dir}/ ${name.padEnd(24)} imports.d.ts ${f.name}: ${before} -> ${mid} -> ${after}  SSR ${res.status} ${err} ${later}`)
      if (git('status', '--porcelain').trim().split('\n').length < 3) throw new Error('working tree lost its changes: ' + git('status', '--porcelain'))
      if (!ok) {
        // recover for the next scenario: touch the page (an app/ file) so Nuxt rescans
        writeFileSync(page, readFileSync(page, 'utf8') + ' ')
        await sleep(1000)
        writeFileSync(page, working[page])
        await sleep(4000)
      }
    }
  }
} finally {
  stop()
  rmSync('.repro-git', { recursive: true, force: true })
}
console.log(failed ? `\n${failed} scenario(s) left a stale import map` : '\nall scenarios recovered')
process.exit(failed ? 1 : 0)
