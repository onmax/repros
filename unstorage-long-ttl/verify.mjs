import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { setTimeout as delay } from 'node:timers/promises'
import { createStorage } from 'unstorage'
import memoryDriver from 'unstorage/drivers/memory'

assert.equal(process.version, 'v24.21.0', 'run through pnpm verify to use the pinned runtime')
const ttlSeconds = 30 * 24 * 60 * 60
const ttlMs = ttlSeconds * 1000
const maxDelay = 2 ** 31 - 1
const warnings = []
const trials = []
const onWarning = warning => warnings.push({ name: warning.name, message: warning.message })
process.on('warning', onWarning)

try {
  for (let trial = 1; trial <= 3; trial++) {
    const driver = memoryDriver()
    const storage = createStorage({ driver })
    try {
      await storage.setItem('monthly', 'cached response', { ttl: ttlSeconds })
      await storage.setItemRaw('monthly-raw', 'raw response', { ttl: ttlSeconds })
      await storage.setItem('short', 'expires', { ttl: 0.005 })
      await storage.setItem('forever', 'no ttl', { ttl: 0 })
      await delay(30)
      assert.equal(driver.getInstance().has('short'), false, 'short TTL must clean up without a read')
      assert.equal(await storage.getItem('short'), null)
      assert.equal(await storage.getItem('forever'), 'no ttl')
      trials.push({ trial, value: await storage.getItem('monthly'), raw: await storage.getItemRaw('monthly-raw') })
    } finally {
      await storage.dispose()
    }
  }
} finally {
  process.off('warning', onWarning)
}

const sourceSha256 = createHash('sha256')
  .update(readFileSync(new URL(import.meta.resolve('unstorage/drivers/memory')))).digest('hex')
console.log('NATIVE ' + JSON.stringify({
  node: process.version, platform: process.platform, arch: process.arch,
  package: 'unstorage@2.0.0-alpha.10', sourceSha256,
  ttlSeconds, ttlMs, maxDelay, afterMs: 30, trials, warnings
}))
assert(trials.every(trial => trial.value === 'cached response' && trial.raw === 'raw response'),
  '30-day TTL entries must remain cached after 30ms, including raw writes')
assert.equal(warnings.length, 0, 'long TTL must not overflow native timers')
console.log('PASS: native monthly normal/raw retention, proactive short TTL expiry, no-TTL retention')

// Supplementary controls drive the real driver callbacks without waiting 30 days.
// Native timers above establish the actual overflow boundary.
const originals = {
  setTimeout: globalThis.setTimeout,
  clearTimeout: globalThis.clearTimeout,
  now: Date.now,
  performanceNow: Object.getOwnPropertyDescriptor(performance, 'now')
}
let clock = 1000
let nextId = 0
let unrefs = 0
const pending = new Map()
const scheduled = []
Date.now = () => clock
Object.defineProperty(performance, 'now', { configurable: true, value: () => clock })
globalThis.setTimeout = (callback, ms) => {
  assert(ms <= maxDelay && ms >= 0, `timer delay must fit runtime limit, got ${ms}`)
  const handle = { id: ++nextId, unref() { unrefs++ } }
  pending.set(handle, { callback, at: clock + ms })
  scheduled.push(ms)
  return handle
}
globalThis.clearTimeout = handle => pending.delete(handle)
const advance = ms => {
  const target = clock + ms
  while (true) {
    const next = [...pending.entries()].sort((a, b) => a[1].at - b[1].at)[0]
    if (!next || next[1].at > target) break
    clock = next[1].at
    pending.delete(next[0])
    next[1].callback()
  }
  clock = target
}

try {
  for (const raw of [false, true]) {
    const driver = memoryDriver()
    try {
      const write = raw ? driver.setItemRaw : driver.setItem
      write('long', 'value', { ttl: ttlSeconds })
      advance(maxDelay)
      assert.equal(driver.getItem('long'), 'value', 'first chunk must retain unexpired entry')
      assert.equal(pending.size, 1, 'remaining TTL must be rescheduled')
      advance(ttlMs - maxDelay - 1)
      assert.equal(driver.getItem('long'), 'value', 'entry must remain one millisecond before deadline')
      advance(1)
      assert.equal(driver.getInstance().size, 0, 'deadline must proactively remove entry without a read')
      assert.equal(pending.size, 0)
    } finally {
      driver.dispose()
    }
  }

  for (const afterRearm of [false, true]) {
    for (const action of ['overwrite', 'remove', 'clear', 'dispose']) {
      const driver = memoryDriver()
      try {
        driver.setItem('long', 'old', { ttl: ttlSeconds })
        if (afterRearm) advance(maxDelay)
        assert.equal(pending.size, 1)
        if (action === 'overwrite') driver.setItem('long', 'new')
        if (action === 'remove') driver.removeItem('long')
        if (action === 'clear') driver.clear()
        if (action === 'dispose') driver.dispose()
        assert.equal(pending.size, 0, `${action} must cancel the current timer handle`)
        advance(ttlMs)
        assert.equal(driver.getItem('long'), action === 'overwrite' ? 'new' : null)
      } finally {
        driver.dispose()
      }
    }
  }
  assert.equal(unrefs, scheduled.length, 'every scheduled chunk must be unrefed')
  console.log('VIRTUAL ' + JSON.stringify({ exactDeadline: 'PASS', rawDeadline: 'PASS',
    cancellationBeforeAndAfterRearm: 'PASS', scheduled, unrefs }))
} finally {
  globalThis.setTimeout = originals.setTimeout
  globalThis.clearTimeout = originals.clearTimeout
  Date.now = originals.now
  if (originals.performanceNow) Object.defineProperty(performance, 'now', originals.performanceNow)
  else delete performance.now
}
