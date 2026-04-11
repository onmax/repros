import { defineConfig } from 'vite'

const VIRTUAL_RE = /^#build\/.+$/

function virtualObjectPlugin() {
  const entries = new Map([
    ['#build/route-rules.mjs', 'export default function routeRulesMatcher() { return ({ ssr: true }) }']
  ])
  const filterMode = process.env.OBJECT_FILTER_MODE || 'string'

  const includeValue = filterMode === 'regex'
    ? VIRTUAL_RE
    : filterMode === 'regex-array'
      ? [VIRTUAL_RE, /^virtual:nuxt:.+$/]
      : VIRTUAL_RE.source

  const loadInclude = filterMode === 'regex-array'
    ? [/^\0#build\/.+$/, /^\0virtual:nuxt:.+$/]
    : filterMode === 'regex'
      ? /^\0#build\/.+$/
      : '^\\0#build\\/.+$'

  return {
    name: 'virtual-object',
    enforce: 'pre',
    resolveId: {
      filter: { id: { include: includeValue } },
      handler(id) {
        if (entries.has(id)) {
          return '\0' + id
        }
      }
    },
    load: {
      filter: { id: { include: loadInclude } },
      handler(id) {
        return entries.get(id.slice(1))
      }
    }
  }
}

function virtualFunctionPlugin() {
  const entries = new Map([
    ['#build/route-rules.mjs', 'export default function routeRulesMatcher() { return ({ ssr: true }) }']
  ])

  return {
    name: 'virtual-function',
    enforce: 'pre',
    resolveId(id) {
      if (entries.has(id)) {
        return '\0' + id
      }
    },
    load(id) {
      if (id.startsWith('\0') && entries.has(id.slice(1))) {
        return entries.get(id.slice(1))
      }
    }
  }
}

const variant = process.env.VARIANT || 'object'

export default defineConfig({
  plugins: [variant === 'function' ? virtualFunctionPlugin() : virtualObjectPlugin()]
})
