// The layers of the synthetic Nuxt 5 app from the build-time study (its exp/lab/gen.mjs,
// without the root app).
// Usage: node gen-layers.mjs <outDir> [--layers 8] [--components 100] [--pages 10]
//          [--composables 20] [--utils 12] [--api 15] [--seed 1]
// Layout: <outDir>/<name> per layer, and <outDir>/layers.json with the extends order
// (features, then core, then ui).
// Every layer has typed SFCs with scoped styles, auto-imported composables and
// utils, cross-layer components (including lazy and client-only ones), pages
// with definePageMeta, route middleware, a plugin, and server API routes.
// File basenames are unique across layers: Nuxt numbers SSR style chunks by
// basename in processing order, so repeated basenames make output names vary
// between identical builds.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const argv = process.argv.slice(2)
const out = argv[0]
const opt = (k, d) => { const i = argv.indexOf(`--${k}`); return i > 0 ? Number(argv[i + 1]) : d }
const N = { layers: opt('layers', 8), components: opt('components', 100), pages: opt('pages', 10), composables: opt('composables', 20), utils: opt('utils', 12), api: opt('api', 15) }
let seed = opt('seed', 1)
const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 }
const pick = a => a[Math.floor(rnd() * a.length)]
const int = (a, b) => a + Math.floor(rnd() * (b - a + 1))
const pascal = s => s.split(/[-_]/).map(w => w[0].toUpperCase() + w.slice(1)).join('')
const write = (p, s) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, s.replace(/^\n/, '')) }

const FEATURES = ['dashboard', 'alarms', 'kpis', 'reports', 'admin', 'settings', 'billing', 'audit', 'inventory', 'planning', 'quality', 'energy']
const features = FEATURES.slice(0, Math.max(1, N.layers - 2))
const layers = [...features, 'core', 'ui']
const UI = ['Button', 'Card', 'Badge', 'Table', 'Modal', 'Input', 'Select', 'Tabs', 'Stat', 'Empty']

function types (P) {
  let s = ''
  for (let i = 0; i < 6; i++) {
    s += `
export interface ${P}Item${i} {
  id: string
  title: string
  value: number
  status: 'ok' | 'warn' | 'error' | 'unknown'
  tags?: string[]
  updatedAt?: string
  meta?: Record<string, string | number>
}

export interface ${P}Props${i} {
  title: string
  items?: ${P}Item${i}[]
  dense?: boolean
  limit?: number
  highlight?: string
  mode?: 'list' | 'grid' | 'table'
}
`
  }
  return s
}

function util (P, j) {
  return `
export interface ${P}FormatOptions${j} { precision?: number, unit?: string, locale?: string }

export function format${P}${j} (value: number | string | undefined, options: ${P}FormatOptions${j} = {}): string {
  if (value === undefined || value === '') return '-'
  const n = typeof value === 'string' ? Number.parseFloat(value) : value
  if (Number.isNaN(n)) return String(value)
  const fixed = n.toFixed(options.precision ?? ${j % 3})
  return options.unit ? \`\${fixed} \${options.unit}\` : fixed
}

export function group${P}${j}<T extends { status: string }> (items: T[]): Record<string, T[]> {
  const out: Record<string, T[]> = {}
  for (const item of items) (out[item.status] ??= []).push(item)
  return out
}

export const ${P.toLowerCase()}Thresholds${j} = Object.freeze({ low: ${int(1, 30)}, mid: ${int(31, 60)}, high: ${int(61, 99)} })
`
}

function composable (P, k, utils) {
  const u = int(0, utils - 1)
  return `
export function use${P}State${k} (initial = ${int(0, 9)}) {
  const count = useState<number>('${P.toLowerCase()}-state-${k}', () => initial)
  const items = useState<{ id: string, status: string, value: number }[]>('${P.toLowerCase()}-items-${k}', () => [])
  const grouped = computed(() => group${P}${u}(items.value))
  const label = computed(() => format${P}${u}(count.value, { precision: 1 }))
  function bump (by = 1) { count.value += by }
  function reset () { count.value = initial; items.value = [] }
  return { count, items, grouped, label, bump, reset }
}
`
}

function component (L, P, i, ctx) {
  const t = i % 6
  const sameLayer = i > 0 ? Array.from({ length: int(0, 2) }, () => `${P}Widget${int(0, i - 1)}`) : []
  const ui = L === 'ui' ? [] : Array.from({ length: int(1, 3) }, () => `Ui${pick(UI)}`)
  const core = L === 'ui' || L === 'core' ? [] : [`CorePanel${int(0, ctx.coreComponents - 1)}`]
  const children = [...new Set([...sameLayer, ...ui, ...core])]
  const lazy = L !== 'ui' && rnd() < 0.15 ? `\n      <LazyUiChart v-if="expanded" :points="points" />` : ''
  const clientOnly = rnd() < 0.1 ? `\n      <ClientOnly><span class="clock">{{ now }}</span></ClientOnly>` : ''
  const fetch = L !== 'ui' && rnd() < 0.2 ? `\nconst { data: remote } = await useFetch('/api/${L}/${L}-r${int(0, ctx.api - 1)}', { query: { id: props.title } })` : '\nconst remote = ref<unknown>(null)'
  const k = int(0, ctx.composables - 1), u = int(0, ctx.utils - 1)
  return `
<script setup lang="ts">
import type { ${P}Props${t}, ${P}Item${t} } from '../../types'

const props = withDefaults(defineProps<${P}Props${t} & { variant?: 'primary' | 'secondary' }>(), {
  items: () => [],
  limit: ${int(5, 50)},
  mode: 'list',
  variant: 'primary',
})
const emit = defineEmits<{ select: [item: ${P}Item${t}], close: [] }>()
const { count, label, bump } = use${P}State${k}()
const expanded = ref(false)
const query = ref('')
const now = ref(new Date().toISOString())
const visible = computed(() => props.items
  .filter(item => !query.value || item.title.toLowerCase().includes(query.value.toLowerCase()))
  .slice(0, props.limit))
const points = computed(() => visible.value.map(item => item.value))
const summary = computed(() => format${P}${u}(visible.value.reduce((sum, item) => sum + item.value, 0), { unit: '${pick(['kW', '%', 'pcs', 'h', '€'])}' }))${fetch}
watch(() => props.highlight, (value) => { if (value) expanded.value = true })
function onSelect (item: ${P}Item${t}) {
  bump()
  emit('select', item)
}
</script>

<template>
  <section :class="['${L}-w${i}', \`is-\${variant}\`, { dense }]">
    <header class="head">
      <h3>{{ title }} <small>{{ label }}</small></h3>
      <input v-model="query" type="search" :placeholder="\`Filter \${title}\`">
      <button type="button" @click="expanded = !expanded">{{ expanded ? 'Less' : 'More' }}</button>
    </header>
    <ul v-if="mode === 'list'" class="list">
      <li v-for="item in visible" :key="item.id" :class="item.status" @click="onSelect(item)">
        <span class="title">{{ item.title }}</span>
        <span class="value">{{ item.value }}</span>
        <span v-for="tag in item.tags ?? []" :key="tag" class="tag">{{ tag }}</span>
      </li>
    </ul>
    <table v-else-if="mode === 'table'" class="table">
      <tr v-for="item in visible" :key="item.id"><td>{{ item.title }}</td><td>{{ item.status }}</td><td>{{ item.value }}</td></tr>
    </table>
    <div v-else class="grid">
      <article v-for="item in visible" :key="item.id" class="cell">{{ item.title }}: {{ item.value }}</article>
    </div>
    <footer class="foot">
      <span>{{ summary }}</span><span>{{ count }}</span><pre v-if="remote">{{ remote }}</pre>
      ${children.map(c => `<${c} title="${c}" :items="[]" />`).join('\n      ')}${lazy}${clientOnly}
    </footer>
  </section>
</template>

<style scoped>
.${L}-w${i} { display: grid; gap: ${int(2, 16)}px; padding: ${int(4, 24)}px; border: 1px solid #${int(100000, 999999)}; }
.${L}-w${i}.dense { gap: 2px; padding: 4px; }
.head { display: flex; align-items: center; justify-content: space-between; }
.head h3 { margin: 0; font-size: ${int(12, 20)}px; }
.list li { display: flex; gap: 8px; cursor: pointer; }
.list li.ok { color: #2a7; } .list li.warn { color: #c80; } .list li.error { color: #d33; }
.tag { border-radius: 4px; padding: 0 4px; background: #eee; }
.grid { display: grid; grid-template-columns: repeat(${int(2, 4)}, 1fr); }
.foot { display: flex; gap: 12px; opacity: .${int(5, 9)}; }
</style>
`
}

function page (L, P, n, ctx) {
  const widgets = Array.from({ length: int(3, 6) }, () => `${P}Widget${int(0, ctx.components - 1)}`)
  return `
<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: ['${L}-guard'] })
const route = useRoute()
const { count } = use${P}State${int(0, ctx.composables - 1)}()
useHead({ title: \`${pascal(L)} ${n} \${route.params.${L}Id ?? ''}\` })
</script>

<template>
  <div class="page ${L}-p${n}">
    <h1>${pascal(L)} page ${n} ({{ count }})</h1>
    ${[...new Set(widgets)].map(w => `<${w} title="${w}" />`).join('\n    ')}
  </div>
</template>
`
}

// The fixture's nuxt.config.ts extends the layers in this order. Its own app/
// replaces the generated root app, which drew no random numbers.
write(join(out, 'layers.json'), JSON.stringify(layers) + '\n')

const ctx = { ...N, coreComponents: Math.max(4, Math.round(N.components / 4)) }
for (const L of layers) {
  const P = pascal(L)
  const base = join(out, L)
  const nComp = L === 'ui' ? Math.max(UI.length, Math.round(N.components / 3)) : L === 'core' ? ctx.coreComponents : N.components
  write(join(base, 'nuxt.config.ts'), `export default defineNuxtConfig({ $meta: { name: '${L}' } })\n`)
  write(join(base, 'app/types.ts'), types(P))
  for (let j = 0; j < N.utils; j++) write(join(base, `app/utils/format${P}${j}.ts`), util(P, j))
  for (let k = 0; k < N.composables; k++) write(join(base, `app/composables/use${P}State${k}.ts`), composable(P, k, N.utils))
  if (L === 'ui') {
    for (const name of UI) write(join(base, `app/components/Ui/Ui${name}.vue`), component('ui', 'Ui', UI.indexOf(name), ctx).replace('<section', `<section data-ui="${name}"`))
    write(join(base, 'app/components/Ui/UiChart.client.vue'), `
<script setup lang="ts">
const props = defineProps<{ points: number[] }>()
const max = computed(() => Math.max(1, ...props.points))
</script>

<template>
  <svg viewBox="0 0 100 20" class="chart"><rect v-for="(p, i) in points" :key="i" :x="i * 4" :y="20 - p / max * 20" width="3" :height="p / max * 20" /></svg>
</template>
`)
    write(join(base, 'app/layouts/default.vue'), `
<template>
  <div class="layout"><nav>layer lab</nav><slot /></div>
</template>
`)
  }
  const compName = L === 'core' ? i => `Core/CorePanel${i}` : i => `${P}/${P}Widget${i}`
  for (let i = 0; i < nComp; i++) {
    let code = component(L, P, i, ctx)
    if (L === 'core') code = code.replace(/CoreWidget(\d+)/g, 'CorePanel$1')
    write(join(base, `app/components/${compName(i)}.vue`), code.replace(/'\.\.\/\.\.\/types'/, L === 'ui' || L === 'core' ? "'../../types'" : "'../../types'"))
  }
  if (L !== 'ui' && L !== 'core') {
    write(join(base, `app/middleware/${L}-guard.ts`), `
export default defineNuxtRouteMiddleware((to) => {
  if (to.query.denied === '${L}') return navigateTo('/')
})
`)
    write(join(base, `app/plugins/${L}.ts`), `
export default defineNuxtPlugin(() => {
  return { provide: { ${L}Version: () => '${int(1, 9)}.${int(0, 20)}.0' } }
})
`)
    write(join(base, `app/pages/${L}/${L}-home.vue`), page(L, P, 0, ctx))
    write(join(base, `app/pages/${L}/[${L}Id].vue`), page(L, P, 1, ctx))
    for (let n = 2; n < N.pages; n++) write(join(base, `app/pages/${L}/${L}-p${n}.vue`), page(L, P, n, ctx))
    write(join(base, `server/utils/${L}.ts`), `
export function ${L}Rows (n: number, seed = ${int(1, 99)}) {
  return Array.from({ length: n }, (_, i) => ({ id: \`${L}-\${i}\`, title: \`${pascal(L)} \${i}\`, value: (i * seed) % 97, status: i % 3 ? 'ok' : 'warn' }))
}
`)
    for (let r = 0; r < N.api; r++) write(join(base, `server/api/${L}/${L}-r${r}.get.ts`), `
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const limit = Math.min(100, Number(query.limit ?? ${int(5, 50)}))
  return { id: query.id ?? null, rows: ${L}Rows(limit), generatedBy: '${L}/r${r}' }
})
`)
  }
}
const files = { layers: layers.length, components: N.components * features.length + ctx.coreComponents + Math.max(UI.length, Math.round(N.components / 3)), pages: features.length * N.pages, composables: layers.length * N.composables, utils: layers.length * N.utils, api: features.length * N.api }
console.log(JSON.stringify(files))
