// Nuxt module: count JS calls and time per plugin hook (resolveId/load/transform), for plugins whose name matches OCEAN_WRAP (regex)
import { appendFileSync } from 'node:fs'
import { performance } from 'node:perf_hooks'
export default function wrap (_: unknown, nuxt: any) {
  if (!process.env.OCEAN_WRAP) return
  const re = new RegExp(process.env.OCEAN_WRAP)
  const stats = new Map<string, { calls: number, ms: number }>()
  nuxt.hook('vite:extendConfig', (config: any) => {
    config.plugins.push({
      name: 'ocean:wrap',
      configResolved (resolved: any) {
        for (const p of resolved.plugins) {
          if (!p?.name || !re.test(p.name)) continue
          for (const hook of ['resolveId', 'load', 'transform']) {
            const t = p[hook]; if (!t) continue
            const h = typeof t === 'function' ? t : t.handler
            const key = `${p.name}\t${hook}`
            const wrapped = function (this: any, ...args: any[]) {
              const s = performance.now(); const st = stats.get(key) ?? stats.set(key, { calls: 0, ms: 0 }).get(key)!; st.calls++
              const r = h.apply(this, args)
              if (r && typeof r.then === 'function') return r.finally(() => { st.ms += performance.now() - s })
              st.ms += performance.now() - s; return r
            }
            if (typeof t === 'function') p[hook] = wrapped; else t.handler = wrapped
          }
        }
      },
    })
  })
  process.on('exit', () => { for (const [k, v] of stats) appendFileSync(`${process.env.OCEAN_OUT || "."}/calls-${process.env.OCEAN_TAG || 'x'}.tsv`, `${k}\t${v.calls}\t${v.ms.toFixed(1)}\n`) })
}
