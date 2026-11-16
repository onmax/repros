import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'
import ts from 'typescript'
import { comarkContent, generateSourceTypes } from 'comark-content'
import fs from 'comark-content/sources/fs'

const content = comarkContent({
  source: fs('./content', {
    cwd: import.meta.url,
    schema: {
      type: 'object',
      properties: { title: { type: 'string' }, order: { type: 'integer' } },
      required: ['title'],
    },
  }),
})

const dts = await generateSourceTypes(content)
const file = new URL('./comark-content.d.ts', import.meta.url).pathname
writeFileSync(file, dts)
console.log(dts.split('\n').filter(line => /order/.test(line)).join('\n'))

const program = ts.createProgram([file], { noEmit: true, strict: true, module: ts.ModuleKind.NodeNext, moduleResolution: ts.ModuleResolutionKind.NodeNext })
const errors = program.getSemanticDiagnostics(program.getSourceFile(file)).map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
console.log(errors.length ? errors.join('\n') : 'no type errors')

assert.doesNotMatch(dts, /:\s*integer\b/, 'expected JSON Schema integer to become the TS type number')
assert.deepEqual(errors, [], 'expected the generated file to type-check')
console.log('OK: integer fields are typed as number')
