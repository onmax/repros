import { createUnimport } from 'unimport'
import { vueTemplateAddon as beforeAddon } from './unimport-vue-template-lookup/vue-template.ts'
import { vueTemplateAddon as afterAddon } from './unimport-vue-template-lookup-fix/vue-template.ts'
import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { performance } from 'node:perf_hooks'
const variants = [beforeAddon, afterAddon].map(vueTemplateAddon => ({ createUnimport, vueTemplateAddon }))
const warnings = []
function createPair(imports, extra = []) {
  return variants.map(api => api.createUnimport({ imports, addons:{ addons:[api.vueTemplateAddon(), ...extra.map(f=>f())] }, warn:s=>warnings.push(s) }))
}
const render = names => `export function render(_ctx) { return [${names.map(n=>`_ctx.${n}`).join(',')}]; }`
let checks = 0
async function compare(pair, code, label) {
  const r = await Promise.all(pair.map(api => api.injectImports(code, 'component.vue')))
  assert.equal(r[0].code, r[1].code, label)
  assert.deepEqual(r[0].s.generateMap({hires:true}).toString(), r[1].s.generateMap({hires:true}).toString(), `${label}: source maps`)
  checks++
  return r[0].code
}
const basics = [{name:'foo',from:'lib-a'}, {name:'bar',as:'alias',from:'lib-b'}, {name:'typeOnly',from:'lib-types',type:true}]
const pair = createPair(basics)
for (const code of [render(['foo','alias','foo','missing']), render(Array(40).fill('typeOnly')), 'export const x = 1', '_ctx.foo; __unimport_unref_;', '_ctx.fooBar; _ctx.foo;']) await compare(pair,code,'basic')
for (const api of pair) await api.modifyDynamicImports(i => [...i,{name:'dynamic',from:'lib-c'}])
await compare(pair,render(['dynamic','foo']),'dynamic addition')
for (const api of pair) api.clearDynamicImports()
await compare(pair,render(['dynamic','foo']),'dynamic clearing')
for (const api of pair) await api.getInternalContext().replaceImports([{name:'replacement',from:'lib-d'}])
await compare(pair,render(['replacement','foo']),'static replacement')
const duplicateAddon = () => ({extendImports(imports) { return [...imports,{name:'later',as:'foo',from:'later'}] }})
const dup = await compare(createPair([{name:'first',as:'foo',from:'first'}],[duplicateAddon]),render(['foo']),'first duplicate alias wins')
assert.ok(dup.includes('from \'first\''))
const hook = () => ({
  injectImportsResolved(imports) { return imports.map(i=>({...i, from:i.from === 'lib-a'?'changed':i.from})) },
  injectImportsStringified(str) { return `// addon\n${str}` }
})
await compare(createPair(basics,[hook]),render(Array.from({length:40},(_,i)=>i%2?'foo':'alias')),'other addon hooks')
// Deterministic generated controls, including misses and repeated identifiers.
for (let s=1;s<=30;s++) {
  const imports=Array.from({length:s*3},(_,i)=>({name:`item${i}`,from:`lib-${i%3}`}))
  const names=Array.from({length:s*2},(_,i)=>i%4===0?'missing':`item${(i*17+s)%(s*3)}`)
  await compare(createPair(imports),render(names),`generated-${s}`)
}
console.log(`${checks} output and source-map comparisons passed`)

async function accessorCase(kind) {
  const runs = []
  for (const vueTemplateAddon of [beforeAddon, afterAddon]) {
    const events = []
    let enabled = false
    const first = { name: 'first', as: 'first', from: 'first-lib' }
    const later = { name: 'later', as: 'old', from: 'later-lib' }
    const imports = [first, later]
    if (kind === 'alias') {
      Object.defineProperty(later, 'as', { enumerable: true, get() {
        if (enabled) events.push('alias')
        return 'later'
      } })
    }
    if (kind === 'throwing-alias') {
      Object.defineProperty(later, 'as', { enumerable: true, get() {
        if (enabled) throw new Error('unmatched alias was read')
        return 'later'
      } })
    }
    if (kind === 'spread') {
      Object.defineProperty(first, 'from', { enumerable: true, get() {
        if (enabled) { events.push('from'); later.as = 'renamed' }
        return 'first-lib'
      } })
    }
    if (kind === 'symbol-spread') {
      Object.defineProperty(first, Symbol('side effect'), { enumerable: true, get() {
        if (enabled) { events.push('symbol'); later.as = 'renamed' }
        return true
      } })
    }
    const ctx = createUnimport({ autoImport: false, addons: [vueTemplateAddon(), { extendImports: () => imports }] })
    await ctx.getImports()
    enabled = true
    const names = kind === 'throwing-alias' ? Array(40).fill('first')
      : kind === 'alias' ? Array(40).fill('later') : [...Array(6).fill('missing'), 'first', ...Array(39).fill('renamed')]
    const output = (await ctx.injectImports(render(names), 'getter.vue')).code
    runs.push({ output, events })
  }
  assert.deepEqual(runs[1], runs[0], kind)
  if (kind === 'spread' || kind === 'symbol-spread') assert.match(runs[0].output, /later as __unimport_renamed/)
  if (kind === 'alias') assert.equal(runs[0].events.length, 41)
}
for (const kind of ['alias', 'throwing-alias', 'spread', 'symbol-spread']) await accessorCase(kind)
console.log('Getter reads, short-circuiting and alias mutations match')
