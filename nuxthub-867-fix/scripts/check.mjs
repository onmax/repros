import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const output = readFileSync(join(import.meta.dirname, '..', '.output', 'server', 'wrangler.json'), 'utf8')

if (!output.includes('"hyperdrive"')) {
  throw new Error('Expected wrangler output to contain a Hyperdrive binding')
}

if (!output.includes('"binding": "POSTGRES"')) {
  throw new Error('Expected wrangler output to bind Hyperdrive as POSTGRES')
}

console.log('Verified Hyperdrive POSTGRES binding in build output')
