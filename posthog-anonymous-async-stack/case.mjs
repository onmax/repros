// Run with: node --enable-source-maps case.mjs [--next]
// Exits 0 when posthog-node parses every frame correctly, 1 otherwise.
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { outer } from './dist/handler.mjs'

const pkg = process.argv.includes('--next') ? 'posthog-node-next' : 'posthog-node'
const { PostHog } = await import(pkg)
const appSource = fileURLToPath(new URL('./src/handler.ts', import.meta.url))

let error
const run = outer
try {
  await run({ query: { limit: 0 } })
} catch (caught) {
  error = caught
}

const bodies = []
const client = new PostHog('phc_offline_repro', {
  host: 'http://127.0.0.1:9',
  disableCompression: true,
  flushAt: 1,
  fetch: async (_url, options) => {
    bodies.push(JSON.parse(options.body))
    return { status: 200, text: async () => '{}', json: async () => ({}) }
  },
})
await client.captureExceptionImmediate(error, 'repro-user')
await client.shutdown()

const event = bodies.flatMap(body => body.batch ?? [body]).find(e => e.event === '$exception')
assert.ok(event, 'posthog-node sent no $exception event')
// posthog-node rewrites in-app paths relative to process.cwd().
// PostHog stores frames innermost-last; restore stack order to match error.stack.
const frames = [...event.properties.$exception_list[0].stacktrace.frames].reverse()
const lines = error.stack.split('\n').slice(1).map(line => line.trim())

const requireFromNode = createRequire(createRequire(import.meta.url).resolve(pkg))
const coreEntry = requireFromNode.resolve('@posthog/core')
const coreVersion = JSON.parse(readFileSync(new URL('../package.json', pathToFileURL(coreEntry)))).version
console.log(`${pkg}: @posthog/core ${coreVersion}`)
const rows = lines.map((line, i) => ({ line, frame: frames[i] }))
for (const { line, frame } of rows) {
  console.log(`  ${line}\n    -> ${JSON.stringify({ filename: frame.filename, function: frame.function, lineno: frame.lineno, colno: frame.colno, in_app: frame.in_app })}`)
}

const expected = [
  { line: `at validateQuery (${appSource}:1:1)`, filename: 'src/handler.ts', function: 'validateQuery', in_app: true },
  { line: `at async (${appSource}:2:1)`, filename: 'src/handler.ts', in_app: true, target: true },
  { line: `at dispatch (${appSource}:3:1)`, filename: 'src/handler.ts', function: 'dispatch', in_app: true },
  { line: `at async (${appSource}:4:1)`, filename: 'src/handler.ts', in_app: true, target: true },
  { line: `at async async (${appSource}:5:1)`, filename: 'src/handler.ts', function: 'async', in_app: true },
]
// The caller's own frame: an anonymous async frame without parentheses.
const callerLine = lines[expected.length]
assert.match(callerLine, /^at async file:\/\/\/.+case\.mjs:\d+:\d+$/, 'unexpected caller frame from Node')

const failures = []
expected.forEach((want, i) => {
  assert.equal(lines[i], want.line, `Node printed an unexpected stack line ${i + 1}`)
  const got = frames[i]
  for (const key of ['filename', 'function', 'in_app']) {
    if (key in want && got[key] !== want[key]) {
      const message = `${want.line}: ${key} expected ${JSON.stringify(want[key])}, got ${JSON.stringify(got[key])}`
      if (!want.target) throw new assert.AssertionError({ message: `control failed: ${message}` })
      failures.push(message)
    }
  }
})
assert.equal(frames[expected.length].filename, 'case.mjs', 'control failed: anonymous async caller filename')
assert.equal(frames[expected.length].in_app, true, 'control failed: anonymous async caller in_app')

if (failures.length) {
  console.error(`BUG: ${failures.length} wrong frame fields\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
console.log('OK: every frame has a clean filename and in_app: true')
