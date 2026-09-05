import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const config = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const result = spawnSync(process.execPath, ['./node_modules/@nuxt/module-builder/dist/cli.mjs', 'build'], { encoding: 'utf8', timeout: 180000 })
const output = `${result.stdout}\n${result.stderr}`
if (result.error) throw result.error
const missingUnbuild = /Cannot find (?:module|package) ['"]unbuild/.test(output)
console.log(JSON.stringify({ expected: 'build succeeds without a transitive import', actual: { exitCode: result.status, missingUnbuild } }))
if (config.repro.expectedFixed) assert.equal(result.status, 0, output)
else { assert.notEqual(result.status, 0, output); assert.equal(missingUnbuild, true, output) }
