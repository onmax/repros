// Plain Node: what Nuxt 5's useAsyncData + Nitro 3's in-process fetch do per request, without Nuxt.
// Each "request" holds ~8 MB. After all requests finish, it measures heapUsed after GC, then after more setImmediate and setTimeout(0) turns.
// Run: node --expose-gc node-only.mjs [requests=20] [request|norequest|fixed]
const [n = 20, mode = 'request'] = process.argv.slice(2)
const mb = () => (process.memoryUsage().heapUsed / 2 ** 20).toFixed(0) + ' MB'
const gc = () => { globalThis.gc(); globalThis.gc() }
function request () {
  const app = { rows: new Array(1e6).fill(1) }             // the request's nuxtApp and payload
  const own = new AbortController()                       // asyncData._abortController
  const cleanup = new AbortController()                   // cleanupController
  const merged = AbortSignal.any([own.signal])            // mergeAbortSignals(): AbortSignal.any
  const onAbort = () => app.rows                          // captures the request, like Nuxt's reject() closure
  if (mode === 'fixed') {                                 // remove the listener without the { signal } option
    merged.addEventListener('abort', onAbort, { once: true })
    cleanup.signal.addEventListener('abort', () => merged.removeEventListener('abort', onAbort), { once: true })
  } else merged.addEventListener('abort', onAbort, { once: true, signal: cleanup.signal })
  if (mode !== 'norequest') new Request('http://localhost/api', { signal: merged }) // in-process fetch builds a Request
  cleanup.abort()                                         // finally { cleanupController.abort() }: listener removed
}
const immediate = () => new Promise(r => setImmediate(r))
const timeout = () => new Promise(r => setTimeout(r, 0))
// One request per event-loop turn, like a server; WeakRef targets stay alive until the end of the job they were made in.
for (let i = 0; i < +n; i++) { request(); await immediate() }
await immediate(); gc(); const r = [`after GC ${mb()}`]
await immediate(); gc(); r.push(`next setImmediate + GC ${mb()}`)
for (let i = 1; i <= 3; i++) { await timeout(); gc(); r.push(`setTimeout #${i} + GC ${mb()}`) }
console.log(`${mode} x${n}: ${r.join(', ')}`)
