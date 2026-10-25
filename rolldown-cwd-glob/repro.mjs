// A relative glob in a hook filter (`filter.id: 'src/**'`) should match `<cwd>/src/main.js`
// whatever the project folder is called. It fails when `cwd` contains glob characters
// (`[`, `{`) or is a relative path. Rollup's `createFilter` matches in every case.
//
// Run: npm i && node repro.mjs          (published rolldown)
//      ROLLDOWN=/path/to/packages/rolldown/dist/index.mjs node repro.mjs   (local build)
// Exit code 1 = bug present.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, relative } from 'node:path'
import { createFilter } from '@rollup/pluginutils'

const { rolldown } = await import(process.env.ROLLDOWN ?? 'rolldown')

const base = join(import.meta.dirname, 'fixtures')
rmSync(base, { recursive: true, force: true })

async function rolldownMatches(input, cwd) {
  const seen = []
  const plugin = {
    name: 'probe',
    transform: { filter: { id: 'src/**' }, handler(_, id) { seen.push(id) } },
  }
  const bundle = await rolldown({ ...(cwd === undefined ? {} : { cwd }), input, plugins: [plugin], logLevel: 'silent' })
  await bundle.generate({})
  await bundle.close()
  return seen.includes(input)
}

// [folder name, how to pass `cwd` (undefined = leave it to process.cwd())]
const cases = [
  ['my-app', dir => dir],
  ['my[app]', dir => dir],
  ['{client}', dir => dir],
  ['app (1)', dir => dir],
  ['relative-cwd', dir => relative(process.cwd(), dir)],
  ['default[cwd]', dir => (process.chdir(dir), undefined)],
]

let failed = 0
for (const [name, cwdFor] of cases) {
  const dir = join(base, name)
  const input = join(dir, 'src/main.js')
  mkdirSync(join(dir, 'src'), { recursive: true })
  writeFileSync(input, 'console.log(1)\n')

  const cwd = cwdFor(dir)
  const rd = await rolldownMatches(input, cwd)
  const rollup = createFilter('src/**', null, { resolve: cwd ?? process.cwd() })(input)
  if (rd !== rollup) failed++
  const label = cwd === undefined ? `(default) process.cwd()=${JSON.stringify(process.cwd())}` : JSON.stringify(cwd)
  console.log(`${rd === rollup ? 'PASS' : 'FAIL'}  rolldown=${rd}  rollup=${rollup}  cwd=${label}`)
}
process.exit(failed ? 1 : 0)
