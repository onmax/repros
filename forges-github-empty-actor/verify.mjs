import assert from 'node:assert/strict'
import { github } from 'forges/github'

const mode = process.argv[2] === 'broken' ? 'broken' : 'fixed'
const sha = '6dcb09b5b57875f334f61aebed695e2e4193db5e'

// GET /repos/acme/widgets/commits, with one commit made with an empty git email.
// GitHub sends `"author": {}` for such a commit instead of null.
const page = [{ sha, commit: { author: { name: 'Octo Cat' } }, author: {} }]

const requests = []
const fetch = async (input) => {
  requests.push(String(input))
  return Response.json(page)
}
const provider = github({ auth: { type: 'token', token: 't' }, fetch }).create()
const repo = { forge: 'github', instance: 'github.com', owner: 'acme', name: 'widgets' }

const actual = await provider.contents.commitsPage(repo).then(
  ({ items }) => ({ sha: items[0]?.sha, name: items[0]?.author?.name, actor: items[0]?.author?.actor }),
  error => ({ error: `${error.name}: ${error.message}` }),
)
const expected = { sha, name: 'Octo Cat', actor: undefined }

console.log('request: ', requests.join(', '))
console.log('expected:', expected)
console.log('actual:  ', actual)

if (mode === 'broken') {
  assert.deepEqual(actual, { error: 'TypeError: Cannot read properties of undefined (reading \'endsWith\')' })
  console.log('broken: commitsPage rejects with the TypeError from toActor')
}
else {
  assert.deepEqual(actual, expected)
  console.log('fixed: commitsPage lists the commit with no actor')
}
