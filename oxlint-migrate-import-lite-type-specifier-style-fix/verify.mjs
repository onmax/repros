// Exit 0: the migrated config keeps the rule's meaning and oxlint loads it.
// Exit 1: the reported bug (`top-level` copied verbatim, oxlint rejects it).
// Exit 2: something else went wrong, so the run proves nothing.
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const RULE = 'import/consistent-type-specifier-style'
const EXPECTED = ['error', 'prefer-top-level']
const bin = name => join(import.meta.dirname, 'node_modules', '.bin', name)

function run(name, args) {
  const r = spawnSync(bin(name), args, { cwd: import.meta.dirname, encoding: 'utf8' })
  if (r.error)
    inconclusive(`${name} did not start: ${r.error.message}`)
  return { status: r.status, output: `${r.stdout}${r.stderr}`.trim() }
}

function inconclusive(message) {
  console.error(`INCONCLUSIVE: ${message}`)
  process.exit(2)
}

// Control: ESLint itself accepts the source config, so `top-level` is a valid option there.
const eslint = run('eslint', ['index.js'])
console.log(`eslint index.js -> exit ${eslint.status}${eslint.output ? `\n${eslint.output}` : ''}`)
if (eslint.status !== 0)
  inconclusive('ESLint rejected the source config; the input is not a valid ESLint config')

rmSync(join(import.meta.dirname, '.oxlintrc.json'), { force: true })
const migrate = run('migrate', ['eslint.config.mjs']) // bin of @oxlint/migrate
console.log(`\n@oxlint/migrate eslint.config.mjs -> exit ${migrate.status}\n${migrate.output}`)
if (migrate.status !== 0 || !existsSync(join(import.meta.dirname, '.oxlintrc.json')))
  inconclusive('@oxlint/migrate did not write .oxlintrc.json')

const migrated = JSON.parse(readFileSync(join(import.meta.dirname, '.oxlintrc.json'), 'utf8'))
const actual = migrated.rules?.[RULE]

const oxlint = run('oxlint', ['-c', '.oxlintrc.json', 'index.js'])
console.log(`\noxlint -c .oxlintrc.json index.js -> exit ${oxlint.status}\n${oxlint.output}`)

const ruleOk = JSON.stringify(actual) === JSON.stringify(EXPECTED)
const oxlintOk = oxlint.status === 0

console.log(`
.oxlintrc.json "${RULE}"
  expected: ${JSON.stringify(EXPECTED)}
  actual:   ${JSON.stringify(actual)}
oxlint loads the migrated config
  expected: exit 0
  actual:   exit ${oxlint.status}`)

if (ruleOk && oxlintOk) {
  console.log('\nPASS: migrated option is valid for oxlint')
  process.exit(0)
}

const bugSignature = JSON.stringify(actual) === JSON.stringify(['error', 'top-level'])
  && oxlint.status !== 0
  && oxlint.output.includes('unknown variant `top-level`')
if (bugSignature) {
  console.log('\nFAIL: @oxlint/migrate copied the import-lite option `top-level` verbatim and oxlint rejects it')
  process.exit(1)
}
inconclusive('result matches neither the fixed state nor the reported bug')
