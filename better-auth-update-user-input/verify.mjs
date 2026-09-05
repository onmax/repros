import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import ts from 'typescript'
const { fixed } = JSON.parse(readFileSync(new URL('./provenance.json', import.meta.url)))
mkdirSync('.verify', { recursive: true })
function diagnostics(source) {
  const file = resolve('.verify/consumer.ts')
  writeFileSync(file, source)
  const program = ts.createProgram([file], { strict: true, noEmit: true, skipLibCheck: true, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, target: ts.ScriptTarget.ES2022 })
  return ts.getPreEmitDiagnostics(program).map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
}
const prefix = `import type { UserSessionComposable } from '../source/augment'
declare const client: UserSessionComposable
`
assert.deepEqual(diagnostics(prefix + `client.updateUser({ name: 'Updated', image: null })`), [])
for (const input of [`{ id: 'another-user' }`, `{ email: 'other@example.com' }`, `{ emailVerified: true }`, `{ createdAt: new Date() }`]) {
  const errors = diagnostics(prefix + `client.updateUser(${input})`)
  if (fixed) {
    assert.equal(errors.length, 1, JSON.stringify(errors))
    assert.match(errors[0], /does not exist in type 'AuthUserUpdateInput'/)
  } else {
    assert.deepEqual(errors, [])
  }
}
console.log(fixed ? 'Expected immutable fields rejected. Actual: id, email, emailVerified and createdAt rejected; name/image accepted.' : 'Expected immutable fields rejected. Actual: id, email, emailVerified and createdAt all accepted by updateUser.')
