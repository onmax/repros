import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import { H3Core, HTTPError } from 'h3'
import { HookableCore } from 'hookable'

const control = process.argv.includes('--control')
const expectBug = process.argv.includes('--expect-bug')
const packageName = process.argv.includes('--next') ? 'evlog-next' : 'evlog'

// Replace only Nitro's identity wrapper so the published plugin can load here.
registerHooks({
  resolve(specifier, context, next) {
    if (specifier === 'nitro') {
      return { url: 'data:text/javascript,export const definePlugin = fn => fn', shortCircuit: true }
    }
    return next(specifier, context)
  },
})
process.env.__EVLOG_CONFIG = JSON.stringify({ env: { service: 'repro' }, pretty: false, dev: true })
const packageURL = import.meta.resolve(`${packageName}/package.json`)
const { default: plugin } = await import(new URL('./dist/nitro/v3/plugin.mjs', packageURL))

const hooks = new HookableCore()
const warnings = []
const events = []
console.warn = (...args) => warnings.push(args.join(' '))

// Nuxt development registers an asynchronous stacktrace hook before evlog.
if (!control) {
  hooks.hook('error', async () => {
    await new Promise(resolve => setImmediate(resolve))
  })
}
await plugin({ hooks })
hooks.hook('evlog:drain', ({ event }) => events.push(event))

const pending = []
const app = new H3Core({
  onRequest(event) {
    event.req.context ||= {}
    event.req.context.nitro = { errors: [] }
    return hooks.callHook('request', event)
  },
  onResponse(response, event) { return hooks.callHook('response', response, event) },
  onError(error, event) {
    // Nitro 3.0.260610-beta starts these hooks without awaiting them.
    pending.push(hooks.callHook('error', error, { event }))
    event.req.context.nitro.errors.push({ error, context: { event } })
    return new Response(null, { status: error.status })
  },
})
app.handler = () => {
  throw new HTTPError({ status: 409, statusText: 'Conflict' })
}
const response = await app.fetch(new Request('http://local.test/api/conflict'))
await Promise.all(pending)
await new Promise(resolve => setImmediate(resolve))

const late = warnings.filter(warning => warning.includes('after the wide event was emitted'))
console.log(JSON.stringify({ status: response.status, events, warnings }, null, 2))
assert.equal(response.status, 409)
assert.equal(events.length, 1, 'expected one request event')
if (expectBug && !control) {
  const messages = [
    'log.error() called after the wide event was emitted — Keys dropped: error.',
    'log.set() called after the wide event was emitted — Keys dropped: status.',
    'log.emit() called after the wide event was emitted — Ignoring duplicate emit.',
  ]
  assert.equal(late.length, 3)
  for (const message of messages) assert.ok(late.some(warning => warning.includes(message)))
  assert.equal(events[0].error, undefined)
  assert.equal(events[0].level, 'info')
} else {
  assert.equal(late.length, 0, 'the error hook must finish before emission')
  assert.ok(events[0].error, 'the request event must retain the exception')
}
