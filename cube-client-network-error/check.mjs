import assert from 'node:assert/strict'
import { createServer } from 'node:net'
import cube from '@cubejs-client/core'

// Reserve a free port and close it, so the next connection to it is refused.
const server = createServer().listen(0, '127.0.0.1')
await new Promise(resolve => server.once('listening', resolve))
const { port } = server.address()
await new Promise(resolve => server.close(resolve))
const apiUrl = `http://127.0.0.1:${port}/cubejs-api/v1`

// The same request with plain fetch: Node names the reason in error.cause.
const fetchError = await fetch(`${apiUrl}/load`).catch(error => error)

const cubeError = await cube('token', { apiUrl })
  .load({ measures: ['Orders.count'] })
  .catch(error => error)

console.log(JSON.stringify({
  fetch: { message: fetchError.message, causeCode: fetchError.cause?.code },
  cube: {
    name: cubeError.name,
    message: cubeError.message,
    cause: cubeError.cause === undefined ? null : String(cubeError.cause),
    causeCode: cubeError.cause?.cause?.code ?? null,
  },
}, null, 2))

assert.equal(fetchError.cause?.code, 'ECONNREFUSED', 'control: fetch itself must report ECONNREFUSED')
assert.equal(cubeError.message, 'network Error')
// Expected: the client keeps the fetch error, so callers can see the connection was refused.
assert.equal(cubeError.cause?.cause?.code, 'ECONNREFUSED', 'CubeApi dropped the fetch error; error.cause is missing')
