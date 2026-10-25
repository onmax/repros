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
for (const code of [render(['foo','alias','foo','missing']), render(['typeOnly']), 'export const x = 1', '_ctx.foo; __unimport_unref_;', '_ctx.fooBar; _ctx.foo;']) await compare(pair,code,'basic')
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
await compare(createPair(basics,[hook]),render(['foo','alias','foo']),'other addon hooks')
// Deterministic generated controls, including misses and repeated identifiers.
for (let s=1;s<=30;s++) {
  const imports=Array.from({length:s*3},(_,i)=>({name:`item${i}`,from:`lib-${i%3}`}))
  const names=Array.from({length:s*2},(_,i)=>i%4===0?'missing':`item${(i*17+s)%(s*3)}`)
  await compare(createPair(imports),render(names),`generated-${s}`)
}
const cases = [
  {name:'no-template-context', registry:1000, refs:0, unique:0, code:'export const count = 1', iterations:1200},
  {name:'small', registry:50, refs:5, unique:5, iterations:600},
  {name:'medium',registry:1000,refs:60,unique:30,iterations:160},
  {name:'large',registry:5000,refs:300,unique:150,iterations:25},
  {name:'early-hit',registry:5000,refs:300,unique:1,iterations:40},
  {name:'early-small',registry:5000,refs:20,unique:1,iterations:80},
  {name:'many-misses',registry:5000,refs:300,unique:150,miss:true,iterations:30},
]
let sink = 0
function stats(xs) { const v=[...xs].sort((a,b)=>a-b); return {median:v[Math.floor(v.length/2)],p25:v[Math.floor(v.length*.25)],p75:v[Math.floor(v.length*.75)],min:v[0],max:v.at(-1)} }
const results=[]
for(const c of cases) {
  const imports=Array.from({length:c.registry},(_,i)=>({name:`item${i}`,from:`fixture-${i%5}`}))
  const code=c.code??render(Array.from({length:c.refs},(_,i)=>c.miss&&i%2===0?`absent${i}`:`item${Math.floor((i%c.unique)*c.registry/c.unique)}`))
  const apis=createPair(imports)
  await compare(apis,code,c.name)
  for (let r=0;r<7;r++) for(const api of apis) for(let i=0;i<c.iterations;i++) sink^=(await api.injectImports(code,'component.vue')).code.length
  async function timed(api) { const t=performance.now(); for(let i=0;i<c.iterations;i++) sink^=(await api.injectImports(code,'component.vue')).code.length; return (performance.now()-t)/c.iterations }
  const times=[[],[]]
  for(let r=0;r<11;r++) for(const i of (r%2?[1,0]:[0,1])) times[i].push(await timed(apis[i]))
  results.push({...c,inputBytes:Buffer.byteLength(code),unit:'milliseconds per injectImports call',before:stats(times[0]),after:stats(times[1]),samples:times})
}
const report={package:'unimport',version:'7.0.2',upstream:'bbd07768ddb4919205bcb5a3cbc06c3a2791981a',node:process.version,platform:process.platform,checks,correctness:'PASS',warmupRounds:7,repeats:11,sink,results}
await writeFile(new URL('./benchmark-results.json', import.meta.url),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify({...report,results:results.map(({samples,...r})=>({...r,speedup:r.before.median/r.after.median}))},null,2))
