import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { createUnimport } from 'unimport'
import { vueTemplateAddon } from './vue-template.ts'
import { imports, references, code, lookupBudget } from '../input.mjs'

const ctx = createUnimport({ imports, addons: { addons: [vueTemplateAddon()] } })
const registry = await ctx.getImports()
const originalFind = Array.prototype.find
let visits = 0
let output
try {
  Array.prototype.find = function (predicate, thisArg) {
    if (this !== registry)
      return Reflect.apply(originalFind, this, [predicate, thisArg])
    return Reflect.apply(originalFind, this, [function (...args) {
      visits++
      return Reflect.apply(predicate, thisArg, args)
    }])
  }
  output = await ctx.injectImports(code, 'component.vue')
}
finally {
  Array.prototype.find = originalFind
}
for (const name of new Set(references))
  assert.ok(output.code.includes(`as __unimport_${name}`), `missing injection: ${name}`)
assert.equal((output.code.match(/__unimport_unref_\(__unimport_item/g) ?? []).length, references.length)
const hash = value => createHash('sha256').update(value).digest('hex')
console.log(JSON.stringify({
  lookupPredicateVisits: visits,
  codeHash: hash(output.code),
  sourceMapHash: hash(output.s.generateMap({ hires: true }).toString()),
}))
if (visits > lookupBudget) {
  console.error(`FAIL: expected at most ${lookupBudget} lookup predicate visits, observed ${visits}`)
  process.exitCode = 42
}
else {
  console.error(`PASS: ${visits} lookup predicate visits are within the ${lookupBudget} budget`)
}
