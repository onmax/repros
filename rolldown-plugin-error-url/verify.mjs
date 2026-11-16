import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { rolldown } from 'rolldown'
import { DOCS_URL, failing } from './plugin.mjs'

function cli(bin, args) {
  try {
    execFileSync(bin, args, { encoding: 'utf8', stdio: 'pipe', env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' } })
    return ''
  } catch (error) {
    return `${error.stdout}${error.stderr}`
  }
}

// Control: Rollup's CLI prints `url` under the error message.
const rollupOut = cli('node_modules/.bin/rollup', ['-c', 'rollup.config.mjs'])
console.log('rollup CLI prints url:', rollupOut.includes(DOCS_URL))
assert.ok(rollupOut.includes(DOCS_URL), 'control failed: Rollup did not print url')

// Rolldown keeps `url` on `error.errors[0]` ...
let error
try {
  const bundle = await rolldown({ input: 'src/index.js', plugins: [failing()] })
  await bundle.generate({})
} catch (e) {
  error = e
}
console.log('rolldown errors[0].url:', error.errors[0].url)
assert.equal(error.errors[0].url, DOCS_URL)

// ... but the "Build failed" message, which the Rolldown CLI and `vite build` print, has no url.
const rolldownOut = cli('node_modules/.bin/rolldown', ['-c', 'rolldown.config.mjs'])
console.log('--- rolldown CLI output ---\n' + rolldownOut.trim() + '\n---')
console.log('rolldown error.message has url:', error.message.includes(DOCS_URL))
console.log('rolldown CLI prints url:', rolldownOut.includes(DOCS_URL))
assert.ok(error.message.includes(DOCS_URL), 'BUG: the Rolldown "Build failed" message drops the plugin error `url`')
assert.ok(rolldownOut.includes(DOCS_URL), 'BUG: the Rolldown CLI does not print the plugin error `url`')
console.log('OK: url is printed')
