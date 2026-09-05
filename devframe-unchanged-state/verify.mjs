import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createSharedState } from 'devframe/utils/shared-state'

const { fixed } = JSON.parse(await readFile(new URL('./expectation.json', import.meta.url)))
const expectFixed = fixed || process.argv.includes('--expect-fixed')
for (const enablePatches of [false, true]) {
  const state = createSharedState({ initialValue: { count: 1, rows: Array.from({ length: 1000 }, (_, id) => ({ id })) }, enablePatches })
  const original = state.value()
  let updates = 0
  let serializedBytes = 0
  state.on('updated', (value, patches) => {
    updates++
    serializedBytes += Buffer.byteLength(JSON.stringify(patches ?? value))
  })
  for (let i = 0; i < 1000; i++) state.mutate(draft => { draft.count = 1 }, `noop-${i}`)
  assert.equal(state.value(), original)
  console.log(JSON.stringify({ runtime: process.version, enablePatches, unchangedWrites: 1000, updates, serializedPayloadBytes: serializedBytes }))
  assert.equal(updates, expectFixed ? 0 : 1000)
  assert.equal(state.syncIds.has('noop-999'), true)
  state.mutate(draft => { draft.count = 9 }, 'noop-999')
  assert.equal(state.value().count, 1)
  const previous = updates
  state.mutate(draft => { draft.count = 2 }, 'changed')
  assert.equal(state.value().count, 2)
  assert.equal(updates, previous + 1)
  state.mutate(draft => { draft.count = 3 }, 'changed')
  assert.equal(state.value().count, 2)
  assert.equal(updates, previous + 1)
  assert.throws(() => state.mutate(() => { throw new Error('failure') }), /failure/)
  assert.equal(updates, previous + 1)
  state.mutate(() => ({ count: 2, rows: [] }), 'replace')
  assert.equal(updates, previous + 2)
  assert.ok(state.syncIds.size <= 1000)
}
console.log('Both patch modes preserve changed writes, duplicate suppression, errors, replacements, and bounded sync IDs.')
