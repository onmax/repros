import assert from 'node:assert/strict'
import { performance } from 'node:perf_hooks'
import { readFileSync } from 'node:fs'
import { StorageSerializers, useStorage, customStorageEventName } from '@vueuse/core'
import { effectScope, nextTick, ref } from 'vue'

assert.equal(process.version, 'v24.19.0', 'Run the pinned-runtime command in README.md')
const { repro: { expectedSerializations } } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
assert.ok([1, 2].includes(expectedSerializations))

const results = []
for (const rows of [1_000, 10_000]) {
  const defaults = { items: Array.from({ length: rows }, (_, id) => ({ id, label: 'x'.repeat(128) })) }
  const encoded = JSON.stringify(defaults)

  {
    const stored = new Map()
    const calls = { serialize: 0, serializedBytes: 0, serializationMs: 0, get: 0, set: 0 }
    const serializationDurations = []
    const serializer = {
      read: StorageSerializers.object.read,
      write(value) {
        const start = performance.now()
        const serialized = StorageSerializers.object.write(value)
        const duration = performance.now() - start
        serializationDurations.push(duration)
        calls.serializationMs += duration
        calls.serialize++
        calls.serializedBytes += Buffer.byteLength(serialized)
        return serialized
      },
    }
    const storage = {
      getItem(key) { calls.get++; return stored.get(key) ?? null },
      setItem(key, value) { calls.set++; stored.set(key, value) },
      removeItem(key) { stored.delete(key) },
    }
    const scope = effectScope()
    try {
      const state = scope.run(() => useStorage('report', defaults, storage, { serializer, onError(error) { throw error } }))
      await nextTick()
      assert.equal(state.value.items.length, rows)

      const requiredSerializations = 1
      assert.equal(calls.serialize, expectedSerializations, 'Serialization count differs from this fixture mode')
      assert.equal(calls.serializedBytes, Buffer.byteLength(encoded) * calls.serialize)
      assert.equal(calls.get, 1)
      assert.equal(calls.set, requiredSerializations)
      assert.equal(stored.get('report'), encoded)
      results.push({ rows, requiredSerializations, actualSerializations: calls.serialize,
        serializedBytes: calls.serializedBytes, avoidableBytes: Buffer.byteLength(encoded) * (expectedSerializations - 1),
        storageReads: calls.get, storageWrites: calls.set, serializationMs: Number(calls.serializationMs.toFixed(2)),
        avoidableSerializationMs: expectedSerializations === 2 ? Number(serializationDurations[0].toFixed(2)) : 0 })
    }
    finally {
      scope.stop()
    }
  }
}
console.table(results)

// Exercise synchronization via the documented custom storage/window interfaces.
// Storage only selects native-vs-custom events; the backend below is custom.
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'Storage')
if (!originalStorage) globalThis.Storage = class Storage {}
const scope = effectScope()
try {
  const window = new EventTarget()
  const values = new Map([['report', '{"count":3}'], ['next', '{"count":7}']])
  let writes = 0
  const storage = {
    getItem(key) { return values.get(key) ?? null },
    setItem(key, value) { writes++; values.set(key, value) },
    removeItem(key) { values.delete(key) },
  }
  const key = ref('report')
  const state = scope.run(() => useStorage(key, { count: 0 }, storage, { window }))
  await nextTick()
  assert.deepEqual(state.value, { count: 3 }, 'Existing storage is loaded')
  assert.equal(writes, 0)

  const originalValue = state.value
  function dispatch(newValue) {
    window.dispatchEvent(new CustomEvent(customStorageEventName, {
      detail: { key: 'report', storageArea: storage, oldValue: values.get('report'), newValue },
    }))
  }
  dispatch('{"count":3}')
  await nextTick()
  assert.equal(state.value, originalValue, 'Equal storage events preserve object identity')
  assert.equal(writes, 0)

  values.set('report', '{"count":5}')
  dispatch('{"count":5}')
  await nextTick()
  await nextTick()
  assert.deepEqual(state.value, { count: 5 }, 'Changed storage events are applied')
  assert.equal(writes, 0, 'Incoming events do not echo writes')

  state.value.count = 6
  await nextTick()
  await nextTick()
  assert.equal(values.get('report'), '{"count":6}', 'Deep reactive changes persist')
  assert.equal(writes, 1)

  key.value = 'next'
  await nextTick()
  await nextTick()
  assert.deepEqual(state.value, { count: 7 }, 'Reactive key changes read the new key')
  assert.equal(values.get('report'), '{"count":6}')
  assert.equal(writes, 1)

  const missing = scope.run(() => useStorage('missing', { count: 9 }, storage, { writeDefaults: false, window }))
  await nextTick()
  assert.deepEqual(missing.value, { count: 9 })
  assert.equal(values.has('missing'), false, 'writeDefaults:false is respected')
  assert.equal(writes, 1)
}
finally {
  scope.stop()
  if (!originalStorage) delete globalThis.Storage
}

console.log(`CONFIRMED: ${expectedSerializations} serialization(s) for one default write; storage behavior controls passed.`)
console.log('Counts and bytes are assertions; milliseconds are diagnostic and machine-dependent. No network requests or jobs run.')
