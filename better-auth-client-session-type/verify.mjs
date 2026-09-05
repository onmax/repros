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
const errors = diagnostics(`import type { UserSessionComposable, AuthSession } from '../source/augment'
declare const client: UserSessionComposable
declare const server: AuthSession
const serverToken: string = server.token
const clientToken: string | undefined = client.session.value?.token`)
const source = readFileSync('source/session-fetch.ts', 'utf8')
const ast = ts.createSourceFile('session-fetch.ts', source, ts.ScriptTarget.Latest, true)
const declaration = ast.statements.find(n => ts.isFunctionDeclaration(n) && n.name?.text === 'stripToken')
assert.ok(declaration)
const js = ts.transpile(declaration.getText(ast), { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS })
const exports = {}
new Function('exports', js)(exports)
const sanitized = exports.stripToken({ id: 'session', token: 'secret', userId: 'user' })
assert.equal(Object.hasOwn(sanitized, 'token'), false)
if (fixed) {
  assert.equal(errors.length, 1, JSON.stringify(errors))
  assert.match(errors[0], /Property 'token' does not exist/)
  console.log('Expected token-free client type. Actual: client token access rejected; server token access accepted; runtime strips token.')
} else {
  assert.deepEqual(errors, [])
  console.log('Expected client token access to be rejected. Actual: TypeScript accepts token as string while stripToken removes it.')
}
