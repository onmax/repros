import { getRequestHeaders } from './packages/h3-provider/node_modules/h3/dist/_entries/node.mjs'

const event = { req: { headers: { host: 'localhost' } } }

try {
  getRequestHeaders(event)
  console.log('BUG: should have thrown')
} catch (e) {
  console.error(e)
}
