import { addTemplate, defineNuxtModule } from 'nuxt/kit'

// Three ordinary templates and one slow one. The slow template stands in for a template whose
// `getContents` awaits something and then blocks the event loop with synchronous work, as
// @nuxt/icon's `nuxt-icon-server-bundle.mjs` does (`await ctx.resolveServerBundle()`, then
// synchronous module resolution per collection). Here the synchronous work is a 700 ms busy-wait,
// so the template's own time has a fixed floor however loaded the machine is.
const SLOW_MS = 700

function busyWait (ms: number) {
  const end = performance.now() + ms
  while (performance.now() < end) { /* block the event loop */ }
}

async function loadOptions () {
  return { ms: SLOW_MS }
}

export default defineNuxtModule({
  setup () {
    for (const name of ['fast-a', 'fast-b', 'fast-c']) {
      addTemplate({
        filename: `repro/${name}.mjs`,
        getContents: () => `export default ${JSON.stringify(name)}\n`,
      })
    }
    addTemplate({
      filename: 'repro/slow.mjs',
      async getContents () {
        const { ms } = await loadOptions()
        busyWait(ms)
        return `export default ${ms}\n`
      },
    })
  },
})
