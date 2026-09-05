import assert from 'node:assert/strict'

const calls = []
const originalGetRandomValues = globalThis.crypto.getRandomValues.bind(globalThis.crypto)

Object.defineProperty(globalThis.crypto, 'getRandomValues', {
  configurable: true,
  value(array) {
    calls.push(new Error('crypto.getRandomValues called during import').stack)
    return originalGetRandomValues(array)
  },
})

await import('devframe/initiate')

const eagerAuthCalls = calls.filter(stack =>
  stack?.includes('randomDigits') && stack.includes('generateTempCode'),
)

console.log(JSON.stringify({
  expectedAuthRandomnessCallsDuringImport: 0,
  actualAuthRandomnessCallsDuringImport: eagerAuthCalls.length,
}, null, 2))

assert.ok(
  eagerAuthCalls.length >= 6,
  'Expected devframe@0.9.9 to generate its six-digit authentication code during import.',
)

console.log('\nReproduced: devframe/initiate generated an authentication code during module evaluation.')
console.log(eagerAuthCalls[0])
