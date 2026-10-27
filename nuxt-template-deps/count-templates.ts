// Dev only. For each run of `generateApp`, prints how many templates ran `getContents`, how many
// of them returned the same text as on their previous run, and which package registered them.
// It changes nothing: it only wraps `getContents` to count calls.
// It lives outside `modules/`, which Nuxt would register a second time.
import { normalize, relative } from 'node:path'
import type { Nuxt } from 'nuxt/schema'

const PACKAGE_RE = /\/node_modules\/((?:@[^/]+\/)?[^/]+)\//g

interface Run { trigger: string, ran: { owner: string, declared: boolean, same: boolean }[] }

export default function countTemplates (_options: unknown, nuxt: Nuxt) {
  if (!nuxt.options.dev) { return }
  let trigger = 'startup'
  let runs: Run[] = []
  let timer: NodeJS.Timeout | undefined
  const previous = new Map<string, string>()
  const wrapped = new WeakSet<object>()

  const report = () => {
    for (const { trigger, ran } of runs) {
      const byOwner: Record<string, number> = {}
      for (const { owner } of ran) { byOwner[owner] = (byOwner[owner] ?? 0) + 1 }
      const summary = {
        trigger,
        ran: ran.length,
        same: ran.filter(t => t.same).length,
        undeclared: ran.filter(t => !t.declared).length,
        byOwner: Object.fromEntries(Object.entries(byOwner).sort((a, b) => b[1] - a[1])),
      }
      console.log(`[count-templates] generateApp after ${trigger}: ${summary.ran} templates ran getContents, ${summary.same} returned the same text as before, ${summary.undeclared} declare no dependsOn`)
      for (const [owner, count] of Object.entries(summary.byOwner)) { console.log(`[count-templates]   ${count}\t${owner}`) }
      console.log(`[count-templates:json] ${JSON.stringify(summary)}`)
    }
    runs = []
  }

  // registered during setup, so it runs before Nuxt's own `builder:watch` handler
  nuxt.hook('builder:watch', (event, path) => {
    trigger = `${event} ${relative(nuxt.options.rootDir, path)}`
  })

  // registered after every module, so `app.templates` holds the final list
  nuxt.hook('modules:done', () => {
    // called once at the start of every `generateApp`, filtered or not
    nuxt.hook('app:templates', (app) => {
      runs.push({ trigger, ran: [] })
      for (const template of app.templates) {
        const getContents = template.getContents
        if (!getContents || wrapped.has(getContents)) { continue }
        const path = template._path && normalize(template._path)
        const owner = path ? [...path.matchAll(PACKAGE_RE)].at(-1)?.[1] ?? relative(nuxt.options.rootDir, path) : 'nuxt'
        const declared = !!template.dependsOn
        const wrapper: typeof getContents = async function (this: unknown, ...args) {
          const text = await getContents.apply(this, args)
          runs.at(-1)?.ran.push({ owner, declared, same: previous.get(template.filename) === text })
          previous.set(template.filename, text)
          clearTimeout(timer)
          timer = setTimeout(report, 200)
          return text
        }
        wrapped.add(wrapper)
        template.getContents = wrapper
      }
    })
  })
}
