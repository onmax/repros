import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { setImmediate } from 'node:timers/promises'

const { DevframeTerminalsHost } = await import(process.env.HUB_MODULE || '@devframes/hub/node')
const { fixed } = JSON.parse(await readFile(new URL('./expectation.json', import.meta.url)))
const expectFixed = fixed || process.argv.includes('--expect-fixed')

async function exercise(count, { initial = 0, fail = false, cancel = false, probe = true } = {}) {
  const buffer = Array.from({ length: initial }, (_, i) => `initial-${i}`)
  let splices = 0
  if (probe) {
    Object.defineProperty(buffer, 'splice', {
      configurable: true,
      value(...args) { splices++; return Array.prototype.splice.apply(this, args) },
    })
  }
  const forwarded = []
  let closed = false
  let error
  let cancelled = false
  const sink = {
    write: chunk => forwarded.push(chunk),
    close: () => { closed = true },
    error: reason => { error = reason; closed = true },
    get closed() { return closed },
  }
  const host = new DevframeTerminalsHost({ rpc: { streaming: { create: () => ({ start: () => sink }) } } })
  let index = 0
  const failure = new Error('source failed')
  const stream = new ReadableStream({
    pull(controller) {
      if (index < count) controller.enqueue(`line-${index++}`)
      else if (fail) controller.error(failure)
      else if (!cancel) controller.close()
    },
    cancel() { cancelled = true },
  })
  const session = { id: 'repro', title: 'Repro', status: 'running', stream, buffer }
  const start = performance.now()
  host.register(session)
  try {
    const deadline = Date.now() + 10_000
    while (cancel ? forwarded.length < count : stream.locked) {
      assert.ok(Date.now() < deadline, 'terminal pump timed out')
      await setImmediate()
    }
    if (cancel) {
      host.remove(session)
      while (stream.locked) {
        assert.ok(Date.now() < deadline, 'terminal cancellation timed out')
        await setImmediate()
      }
      assert.equal(cancelled, true)
    }
    assert.equal(session.buffer, buffer)
    delete buffer.splice
    const all = [...Array.from({ length: initial }, (_, i) => `initial-${i}`), ...Array.from({ length: count }, (_, i) => `line-${i}`)]
    assert.deepEqual(buffer, all.slice(-1000))
    assert.deepEqual(forwarded, Array.from({ length: count }, (_, i) => `line-${i}`))
    assert.equal(error, fail ? failure : undefined)
    assert.equal(closed, true)
    return { splices, ms: performance.now() - start, retained: buffer.length }
  }
  finally { host.remove(session) }
}

const result = await exercise(10_000)
console.log(JSON.stringify({ runtime: process.version, writes: 10_000, discardedSpliceResults: result.splices, retained: result.retained }))
assert.equal(result.splices, expectFixed ? 0 : 9000)
for (const count of [0, 1, 999, 1000, 1001]) await exercise(count)
await exercise(12, { initial: 1500 })
await exercise(1200, { fail: true })
await exercise(1200, { cancel: true })
const samples = []
for (let i = 0; i < 7; i++) samples.push((await exercise(20_000, { probe: false })).ms)
console.log(JSON.stringify({ controls: 9, medianMilliseconds: samples.slice(2).sort((a, b) => a - b)[2] }))
