// Same test with native AsyncLocalStorage (should pass)
import { AsyncLocalStorage } from 'node:async_hooks'

const store = new AsyncLocalStorage()
console.log('Using: native AsyncLocalStorage')

// Test 1: Sync callback
const syncResult = store.run({ value: 'sync' }, () => {
  return store.getStore()?.value
})
console.log('Sync:', syncResult === 'sync' ? '✅ PASS' : `❌ FAIL (got ${syncResult})`)

// Test 2: Async callback
const asyncResult = await store.run({ value: 'async' }, async () => {
  await Promise.resolve()
  return store.getStore()?.value
})
console.log('Async:', asyncResult === 'async' ? '✅ PASS' : `❌ FAIL (got ${asyncResult})`)

// Test 3: Nested async
const nestedResult = await store.run({ value: 'nested' }, async () => {
  const inner = await (async () => {
    await Promise.resolve()
    return store.getStore()?.value
  })()
  return inner
})
console.log('Nested:', nestedResult === 'nested' ? '✅ PASS' : `❌ FAIL (got ${nestedResult})`)
