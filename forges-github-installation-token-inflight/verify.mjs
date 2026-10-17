import assert from 'node:assert/strict'
import { generateKeyPairSync } from 'node:crypto'
import { github } from 'forges/github'

const broken = process.argv[2] === 'broken'

// The provider signs its app JWT with this key before the first exchange.
const { privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
})

const requests = []
async function fetch(input, init) {
  const { pathname } = new URL(input)
  requests.push(`${init?.method ?? 'GET'} ${pathname}`)
  if (pathname === '/app/installations/1/access_tokens') {
    return Response.json({ token: 'ghs_installation', expires_at: new Date(Date.now() + 3_600_000).toISOString() })
  }
  return Response.json({ full_name: 'acme/widgets' })
}

const provider = github({ auth: { type: 'app', appId: 1, privateKey, installationId: 1 }, fetch }).create()
const repo = { forge: 'github', instance: 'github.com', owner: 'acme', name: 'widgets' }

await Promise.all([provider.repos.get(repo), provider.repos.get(repo)])

const exchanges = requests.filter(request => request.startsWith('POST ')).length
console.log(requests.join('\n'))
console.log(`expected: 1 installation token exchange for 2 concurrent repos.get`)
console.log(`actual:   ${exchanges} installation token exchange${exchanges === 1 ? '' : 's'}`)

if (broken) {
  assert.equal(exchanges, 2, 'expected the bug: one exchange per concurrent request')
}
else {
  assert.equal(exchanges, 1, 'concurrent requests should share one installation token exchange')
}
