import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { createStreamSink, createStreamReader } from 'devframe/utils/streaming-channel'

// Each timing sample gets a fresh process. Instrumentation never runs in a timing worker.
if (process.argv[2] === '--sample') {
  const window = Number(process.argv[3])
  const sink = createStreamSink({ id: 'terminal', replayWindow: window })
  const start = performance.now()
  for (let i = 0; i < 100_000; i++) sink.write('terminal output\n')
  const ms = performance.now() - start
  assert.equal(sink.lastSeq, 100_000)
  assert.equal(sink.buffer.length, window)
  sink.close()
  console.log(ms)
  process.exit(0)
}

const manifest = JSON.parse(readFileSync(new URL('package.json', import.meta.url)))
const fixed = manifest.repro.expectFixed
const expectFixed = fixed || process.argv.includes('--expect-fixed')
let checks = 0

// Compare every retained entry with the original eviction contract, including numeric edge cases.
for (const window of [undefined, -1, 0, 0.5, 1, 2, 2.5, 256, 1000, 5000, NaN, Infinity]) {
  const sink = createStreamSink({ id: 'boundary', replayWindow: window })
  const reference = []
  const identity = sink.buffer
  const limit = Math.max(0, window ?? 0)
  let events = 0
  sink.events.on('chunk', (seq, chunk) => {
    events++
    assert.equal(seq, events)
    assert.equal(chunk, events - 1)
    assert.equal(sink.lastSeq, seq)
    if (seq <= 5 || seq === 5200 || seq === Math.ceil(limit) + 1) assert.deepEqual(sink.buffer, reference)
  })
  for (let i = 0; i < 5200; i++) {
    if (limit > 0) {
      reference.push({ seq: i + 1, chunk: i })
      if (reference.length > limit) reference.splice(0, reference.length - limit)
    }
    sink.write(i)
  }
  assert.equal(sink.buffer, identity)
  let ended = 0
  sink.events.on('end', error => { ended++; assert.equal(error, undefined) })
  sink.close()
  sink.close()
  assert.equal(ended, 1)
  assert.equal(sink.signal.aborted, true)
  assert.throws(() => sink.write('late'), { name: 'StreamClosedError' })
  checks++
}

// Reconnect: retain the tail, then let the real reader reject duplicate sequence numbers.
const sink = createStreamSink({ id: 'reconnect', replayWindow: 3 })
const reader = createStreamReader({ id: 'reconnect' })
reader._push(1, 'a')
reader._push(2, 'b')
for (const chunk of ['a', 'b', 'c', 'd']) sink.write(chunk)
for (const { seq, chunk } of sink.buffer) reader._push(seq, chunk)
reader._end()
const replayed = []
for await (const chunk of reader) replayed.push(chunk)
assert.deepEqual(replayed, ['a', 'b', 'c', 'd'])
sink.close()
checks++

const piped = createStreamSink({ id: 'pipe', replayWindow: 2 })
await new ReadableStream({ start(controller) {
  for (const chunk of ['a', 'b', 'c']) controller.enqueue(chunk)
  controller.close()
} }).pipeTo(piped.writable)
assert.equal(piped.closed, true)
assert.deepEqual(piped.buffer.map(x => x.chunk), ['b', 'c'])
checks++

const failed = createStreamSink({ id: 'failure', replayWindow: 2 })
const errors = []
failed.events.on('end', error => errors.push(error))
const failure = new TypeError('source failed')
await assert.rejects(new ReadableStream({ start(controller) {
  controller.error(failure)
} }).pipeTo(failed.writable), error => error === failure)
failed.error(new Error('again'))
assert.deepEqual(errors, [{ name: 'TypeError', message: 'source failed' }])
assert.equal(failed.signal.reason, failure)
assert.throws(() => failed.write('late'), { name: 'StreamClosedError' })
checks++

const cancelled = createStreamSink({ id: 'cancel', replayWindow: 2 })
cancelled.abort('consumer left')
assert.equal(cancelled.signal.aborted, true)
assert.equal(cancelled.closed, false)
cancelled.close()
checks++

// Count throwaway splice result arrays only for this sink, then restore the intrinsic.
const measured = createStreamSink({ id: 'allocation', replayWindow: 1000 })
const originalSplice = Array.prototype.splice
let discardedArrays = 0
Array.prototype.splice = function (...args) {
  const result = Reflect.apply(originalSplice, this, args)
  if (this === measured.buffer) discardedArrays++
  return result
}
try {
  for (let i = 0; i < 10_000; i++) measured.write(i)
} finally {
  Array.prototype.splice = originalSplice
  measured.close()
}
console.log(JSON.stringify({ state: fixed ? 'patched' : 'published', checks,
  writes: 10_000, replayWindow: 1000, discardedArrays,
  expectedDiscardedArrays: expectFixed ? 0 : 9000 }))
assert.equal(discardedArrays, expectFixed ? 0 : 9000,
  'Evicting one replay chunk must not allocate a discarded result array')

for (const window of [256, 1000, 5000]) {
  const samples = []
  for (let i = 0; i < 5; i++) {
    const result = spawnSync(process.execPath, [fileURLToPath(import.meta.url), '--sample', String(window)],
      { encoding: 'utf8', timeout: 30_000 })
    assert.equal(result.status, 0, result.stderr || String(result.error ?? 'worker failed'))
    samples.push(Number(result.stdout.trim()))
  }
  samples.sort((a, b) => a - b)
  console.log(JSON.stringify({ writes: 100_000, replayWindow: window,
    medianMs: Number(samples[2].toFixed(2)), samplesMs: samples.map(n => Number(n.toFixed(2))) }))
}
console.log('PASS: expected allocation behavior, buffer contents, replay, and lifecycle checks')
