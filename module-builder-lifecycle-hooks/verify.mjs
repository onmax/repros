import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync } from 'node:fs'

const [command, ...args] = process.argv.slice(2)
for (const path of ['dist', '.nuxt', '.nuxtrc', 'ONINSTALL_RAN'])
  rmSync(path, { recursive: true, force: true })

console.log(`$ ${command} ${args.join(' ')}  (clean checkout: no dist, no .nuxt, no .nuxtrc)`)
const r = spawnSync('pnpm', ['exec', command, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } })
if (r.status !== 0) {
  console.error(r.stdout + r.stderr)
  throw new Error(`${command} failed`)
}
if (!existsSync('dist/module.mjs'))
  throw new Error('build did not write dist/module.mjs')

const marker = existsSync('ONINSTALL_RAN')
const nuxtrc = existsSync('.nuxtrc') ? readFileSync('.nuxtrc', 'utf8').trim() : null
console.log(`ONINSTALL_RAN in module root: ${marker ? 'yes' : 'no'}`)
console.log(`.nuxtrc in module root:       ${nuxtrc ?? 'no'}`)

const reproduced = marker || nuxtrc !== null
console.log(reproduced
  ? '\nbug reproduced: building the module ran its own onInstall hook in the module repository'
  : '\nbug not reproduced: the build left the module repository untouched')
process.exitCode = process.env.EXPECT_FIXED ? (reproduced ? 1 : 0) : reproduced ? 0 : 1
