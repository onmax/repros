import assert from 'node:assert/strict'
import { tangled } from 'forges/tangled'

const broken = process.argv[2] === 'broken'

const AUTHOR = 'did:plc:adaauthor222222222222222'
const OWNER = 'did:plc:acmeowner222222222222222'
const REPO = 'did:plc:widgetsrepo2222222222222'
const PULL = `at://${AUTHOR}/sh.tangled.repo.pull/3mwqpull22222`
const PDS = 'https://pds.example.com'
const pull = { forge: 'tangled', instance: 'tangled.org', repo: { forge: 'tangled', instance: 'tangled.org', owner: OWNER, name: 'widgets' }, kind: 'pull_request', number: PULL }

// A patch whose hunk holds a run of blank lines that does not end the hunk.
const hostilePatch = newlines => `diff --git a/README.md b/README.md\n@@ ${'\n'.repeat(newlines)}+y\n`

function stubFetch(patch) {
  const routes = {
    [`https://plc.directory/${AUTHOR}`]: { service: [{ id: '#atproto_pds', serviceEndpoint: PDS }] },
    [`${PDS}/xrpc/com.atproto.repo.getRecord`]: { value: { target: { repo: REPO }, rounds: [{ patchBlob: { ref: { $link: 'bafkreipatchblob' } } }] } },
    ['https://constellation.microcosm.blue/links']: { linking_records: [{ did: OWNER, rkey: 'widgets' }] },
  }
  return async (input) => {
    const { origin, pathname } = new URL(input instanceof Request ? input.url : input)
    const url = origin + pathname
    if (url === `${PDS}/xrpc/com.atproto.sync.getBlob`) {
      return new Response(patch)
    }
    if (url in routes) {
      return Response.json(routes[url])
    }
    console.error(`unstubbed ${url}`)
    return new Response('{}', { status: 404 })
  }
}

async function filesOf(newlines) {
  const instance = tangled({ fetch: stubFetch(hostilePatch(newlines)) }).create()
  const start = performance.now()
  const files = await Array.fromAsync(instance.threads.files(pull))
  return { files, ms: performance.now() - start }
}

const median = values => values.sort((a, b) => a - b)[Math.floor(values.length / 2)]
const runs = { small: [], large: [] }
let files
for (let run = 0; run < 3; run++) {
  runs.small.push((await filesOf(10_000)).ms)
  const large = await filesOf(40_000)
  runs.large.push(large.ms)
  files = large.files
}
const small = median(runs.small)
const large = median(runs.large)
const ratio = large / small

console.log(`threads.files() on a pull whose patch has a run of 10,000 blank lines: ${small.toFixed(1)} ms (runs ${runs.small.map(ms => ms.toFixed(1)).join(', ')})`)
console.log(`threads.files() on a pull whose patch has a run of 40,000 blank lines: ${large.toFixed(1)} ms (runs ${runs.large.map(ms => ms.toFixed(1)).join(', ')})`)
console.log(`ratio for 4x the input: ${ratio.toFixed(1)}x`)
console.log(`expected: 40,000 lines under 250 ms, ratio under 8x (linear is about 4x or less)`)
console.log(`actual:   40,000 lines in ${large.toFixed(1)} ms, ratio ${ratio.toFixed(1)}x`)

assert.equal(files.length, 1)
assert.equal(files[0].path, 'README.md')
assert.equal(files[0].additions, 1)
if (broken) {
  // The bug: the trailing-newline trim is quadratic in the run length.
  assert.ok(large >= 250, `expected the 40,000-line patch to take at least 250 ms, took ${large.toFixed(1)} ms`)
  assert.ok(ratio >= 8, `expected quadratic scaling (ratio at least 8x), got ${ratio.toFixed(1)}x`)
  console.log('broken: the patch trim is quadratic, as reported')
}
else {
  assert.ok(large < 250, `expected the 40,000-line patch to parse in under 250 ms, took ${large.toFixed(1)} ms`)
  assert.ok(ratio < 8, `expected linear scaling (ratio under 8x), got ${ratio.toFixed(1)}x`)
  console.log('ok: the patch trim is linear')
}
