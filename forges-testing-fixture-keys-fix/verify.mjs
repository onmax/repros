import assert from 'node:assert/strict'
import { fixtureFetch } from 'forges/testing'

const mode = process.argv[2] === 'broken' ? 'broken' : 'fixed'
const url = 'https://api.github.com/graphql'
const send = (fetch, variables) => fetch(url, { method: 'POST', body: JSON.stringify({ variables }) }).then(
  response => response.json(),
  error => `${error.name}: ${error.message}`,
)

// Two recorded GraphQL fixtures that differ only below the top level of `variables`.
const nested = fixtureFetch(['one', 'two'].map(title => ({
  request: { method: 'POST', url, variables: { input: { title } } },
  response: { status: 200, body: { title } },
})))

// A recorded GraphQL fixture with `variables`, and an override for the same `METHOD url`.
const overridden = fixtureFetch(
  [{ request: { method: 'POST', url, variables: { id: '1' } }, response: { status: 200, body: { from: 'fixture' } } }],
  { [`POST ${url}`]: { status: 200, body: { from: 'override' } } },
)

const actual = {
  one: await send(nested.fetch, { input: { title: 'one' } }),
  three: await send(nested.fetch, { input: { title: 'three' } }),
  override: await send(overridden.fetch, { id: '1' }),
}
const expected = {
  one: { title: 'one' },
  three: `Error: No fixture for POST ${url}`,
  override: { from: 'override' },
}

console.log('expected:', expected)
console.log('actual:  ', actual)

if (mode === 'broken') {
  assert.deepEqual(actual, { one: { title: 'two' }, three: { title: 'two' }, override: { from: 'fixture' } })
  console.log('broken: nested variables collapse to {} so the last fixture answers both requests, and the fixture beats the override')
}
else {
  assert.deepEqual(actual, expected)
  console.log('fixed: each request gets the fixture for its own variables, an unmatched one throws, and the override wins')
}
