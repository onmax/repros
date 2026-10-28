import { registerHooks, createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import fs from 'node:fs'
import assert from 'node:assert/strict'
const require = createRequire(import.meta.url)
const packageName = process.env.EVLOG_PACKAGE || 'evlog'
const packageRoot = fs.realpathSync(new URL('.', pathToFileURL(require.resolve(packageName + '/package.json'))))
// Only Nitro's identity wrapper is stubbed; evlog, h3, hookable, and all logger code are installed code.
registerHooks({ resolve(specifier, context, next) {
  if (specifier === 'nitro') return { url: 'data:text/javascript,export const definePlugin = fn => fn', shortCircuit: true }
  return next(specifier, context)
}})
process.env.__EVLOG_CONFIG = JSON.stringify({ env: { service: 'local-repro' }, pretty: false, dev: true })
const { default: plugin } = await import(pathToFileURL(packageRoot + '/dist/nitro/v3/plugin.mjs'))
const { H3Core, HTTPError } = await import('h3')
const { HookableCore } = await import('hookable')
const hooks = new HookableCore()
const timeline = [], warnings = [], events = []
const warn = console.warn
console.warn = (...args) => { warnings.push(args.join(' ')); warn(...args) }
// Nuxt dev registers an async stack-trace error hook before evlog.
// The event loop yield is the only load-bearing behavior of that hook.
if (!process.env.NO_ASYNC_HOOK) hooks.hook('error', async () => {
  timeline.push('async error hook started')
  await new Promise(resolve => setImmediate(resolve))
  timeline.push('async error hook finished')
})
// No application observability plugin is installed.
await plugin({ hooks })
hooks.hook('evlog:drain', ({ event }) => events.push(event))
hooks.hook('request', () => { timeline.push('request') })
hooks.hook('response', () => { timeline.push('response') })
hooks.hook('error', () => { timeline.push('evlog error hook finished') })
const pending = []
// Equivalent lifecycle wiring to Nitro 3.0.260610-beta generated app.
const app = new H3Core({
  onRequest(event) { return hooks.callHook('request', event) },
  onResponse(res, event) { return hooks.callHook('response', res, event) },
  onError(error, event) {
    const result = hooks.callHook('error', error, { event })
    if (result) pending.push(result)
    return new Response(JSON.stringify({ message: error.message }), { status: error.status || 500 })
  },
})
app.handler = () => { throw new HTTPError({ status: 409, statusText: 'Local diagnostic conflict' }) }
const response = await app.fetch(new Request('http://local.test/api/conflict'))
await Promise.all(pending)
await new Promise(resolve => setImmediate(resolve))
console.log(JSON.stringify({ response: response.status, timeline, events, warnings }, null, 2))
assert.equal(response.status, 409)
const late = warnings.filter(x => x.includes('after the wide event was emitted'))
assert.equal(events.length, 1, 'exactly one wide event should be emitted')
if (process.env.ASSERT_REPRO === '1' && !process.env.NO_ASYNC_HOOK) {
  assert.equal(late.length, 3)
  for (const method of ['error', 'set', 'emit']) assert.ok(late.some(x => x.includes(`log.${method}()`)))
  assert.equal(events[0].error, undefined, 'the race loses exception details')
  assert.equal(events[0].level, 'info')
} else {
  assert.equal(late.length, 0, 'late evlog writes reproduced')
  assert.ok(events[0].error, 'the event must retain the request exception')
}
