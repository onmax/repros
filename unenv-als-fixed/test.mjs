// Minimal repro: unenv AsyncLocalStorage.run() breaks with async callbacks
import { AsyncLocalStorage } from 'unenv/node/async_hooks'

const store = new AsyncLocalStorage()
console.log('Using:', store.__unenv__ ? 'unenv polyfill' : 'native')

// Test 1: Sync callback (works)
const syncResult = store.run({ value: 'sync' }, () => {
  return store.getStore()?.value
})
console.log('Sync:', syncResult === 'sync' ? '✅ PASS' : `❌ FAIL (got ${syncResult})`)

// Test 2: Async callback (BROKEN)
const asyncResult = await store.run({ value: 'async' }, async () => {
  await Promise.resolve() // Any await breaks it
  return store.getStore()?.value
})
console.log('Async:', asyncResult === 'async' ? '✅ PASS' : `❌ FAIL (got ${asyncResult})`)

// Test 3: Nested async (BROKEN)
const nestedResult = await store.run({ value: 'nested' }, async () => {
  const inner = await (async () => {
    await Promise.resolve()
    return store.getStore()?.value
  })()
  return inner
})
console.log('Nested:', nestedResult === 'nested' ? '✅ PASS' : `❌ FAIL (got ${nestedResult})`)
