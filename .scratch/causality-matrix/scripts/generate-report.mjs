import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const BASE = '/Users/maxi/repros/.scratch/causality-matrix'
const RESULTS = process.env.RESULTS_DIR || join(BASE, 'results')
const allPath = join(RESULTS, 'all-results.json')

if (!existsSync(allPath)) {
  throw new Error('Missing all-results.json. Run scripts/run-matrix.mjs first.')
}

const all = JSON.parse(readFileSync(allPath, 'utf8'))

const by = (predicate) => all.filter(predicate)
const scenarios = ['dev', 'typecheck', 'typecheck-build-concurrent']
const cases = ['nuxt-only', 'nuxt+hub-old', 'nuxt+hub-831', 'saas-pr253-canary']
const nodes = ['node22', 'node25']

function first(caseId, nodeLabel, scenario) {
  return all.find(r => r.case === caseId && r.nodeLabel === nodeLabel && r.scenario === scenario)
}

function fmtBool(v) {
  return v ? 'yes' : 'no'
}

const lines = []
lines.push('# Causality Matrix Report')
lines.push('')
lines.push('Generated: ' + new Date().toISOString())
lines.push('')
lines.push('## Baseline Freeze')
lines.push('- Canonical failure signature: `Pre-transform error: Failed to resolve import "#build/route-rules.mjs"` or `Cannot find module \`#build/route-rules.mjs\``.')
lines.push('- Primary env: Node `22.22.0` + pnpm `10.x`.')
lines.push('- Secondary env: Node `25.6.1`.')
lines.push('- Nuxt references: `/Users/maxi/nuxt/nuxt/main/packages/nitro-server/src/index.ts`, `/Users/maxi/nuxt/nuxt/main/packages/nuxt/src/core/plugins/virtual.ts`.')
lines.push('- NuxtHub references (old): `/Users/maxi/nuxt/hub/src/blob/setup.ts`, `/Users/maxi/nuxt/hub/src/kv/setup.ts`, `/Users/maxi/nuxt/hub/src/db/setup.ts`.')
lines.push('- NuxtHub references (PR831 package): `/Users/maxi/nuxt/saas/node_modules/.pnpm/@nuxthub+core@https+++pkg.pr.new+@nuxthub+core@831_db0@0.3.4_@electric-sql+pglite@0.3.1_e1b28f2e8ccb0efb1a88a18d2de4a065/node_modules/@nuxthub/core/dist/module.mjs`.')
lines.push('')

lines.push('## Matrix Results')
for (const node of nodes) {
  lines.push('')
  lines.push(`### ${node}`)
  lines.push('')
  lines.push('| Case | Scenario | Exit | Route-rules failure | hub writes (blob/kv/db) | Notes |')
  lines.push('|---|---|---:|---|---|---|')
  for (const c of cases) {
    for (const s of scenarios) {
      const r = first(c, node, s)
      if (!r) continue
      const writes = r.nuxthubPhysicalWrites ? `${fmtBool(r.nuxthubPhysicalWrites.blob)}/${fmtBool(r.nuxthubPhysicalWrites.kv)}/${fmtBool(r.nuxthubPhysicalWrites.db)}` : 'n/a'
      const note = (r.notes && r.notes[0]) ? r.notes[0].replace(/\|/g, '\\|') : ''
      lines.push(`| ${c} | ${s} | ${r.exitCode} | ${fmtBool(r.routeRulesFailure)} | ${writes} | ${note} |`)
    }
  }
}

const contamination = all.find(r => r.case === 'contamination-check')
lines.push('')
lines.push('## Parent node_modules contamination check')
if (contamination) {
  lines.push(`- Result: route-rules failure = **${fmtBool(contamination.routeRulesFailure)}** using parent fake vite package.`)
  if (contamination.notes?.length) {
    lines.push(`- First error line: ${contamination.notes[0]}`)
  }
}

function anyFail(caseId) {
  return all.some(r => r.case === caseId && scenarios.includes(r.scenario) && r.routeRulesFailure)
}

const nuxtOnlyFail = anyFail('nuxt-only')
const hubOldFail = anyFail('nuxt+hub-old')
const hub831Fail = anyFail('nuxt+hub-831')
const canaryFail = anyFail('saas-pr253-canary')

const hubOldTypecheckWrites = all.some(r => r.case === 'nuxt+hub-old' && r.scenario === 'typecheck' && r.nuxthubPhysicalWritesDelta && (r.nuxthubPhysicalWritesDelta.blob || r.nuxthubPhysicalWritesDelta.kv || r.nuxthubPhysicalWritesDelta.db))
const hub831TypecheckWrites = all.some(r => r.case === 'nuxt+hub-831' && r.scenario === 'typecheck' && r.nuxthubPhysicalWritesDelta && (r.nuxthubPhysicalWritesDelta.blob || r.nuxthubPhysicalWritesDelta.kv || r.nuxthubPhysicalWritesDelta.db))

lines.push('')
lines.push('## Attribution Decision')
lines.push('| Rule | Observed | Verdict |')
lines.push('|---|---|---|')
lines.push(`| Nuxt-only reproduces route-rules failure | ${fmtBool(nuxtOnlyFail)} | ${nuxtOnlyFail ? 'Nuxt primary candidate' : 'Not proven by this matrix'} |`)
lines.push(`| Nuxt+Hub-old reproduces route-rules failure | ${fmtBool(hubOldFail)} | ${hubOldFail ? 'NuxtHub may contribute to route-rules path' : 'No direct route-rules signal'} |`)
lines.push(`| Nuxt+Hub-831 reproduces route-rules failure | ${fmtBool(hub831Fail)} | ${hub831Fail ? 'NuxtHub 831 insufficient for route-rules' : 'NuxtHub 831 not triggering route-rules here'} |`)
lines.push(`| Nuxt+Hub-old writes shims during typecheck | ${fmtBool(hubOldTypecheckWrites)} | ${hubOldTypecheckWrites ? 'Amplifier confirmed (shared mutable node_modules writes)' : 'No typecheck write observed'} |`)
lines.push(`| Nuxt+Hub-831 writes shims during typecheck | ${fmtBool(hub831TypecheckWrites)} | ${hub831TypecheckWrites ? 'Regression in 831 behavior' : 'Improved behavior vs old expected'} |`)
lines.push(`| SaaS PR253 canary route-rules failure | ${fmtBool(canaryFail)} | ${canaryFail ? 'Canary shows active failure' : 'Canary did not reproduce route-rules failure'} |`)

lines.push('')
lines.push('## Deterministic Commands')
lines.push('- NuxtHub amplifier fail (old behavior): `cd /Users/maxi/repros/.scratch/causality-matrix/cases/nuxt-hub-old && fnm exec --using 22.22.0 pnpm i && rm -rf node_modules/@nuxthub/blob node_modules/@nuxthub/kv node_modules/@nuxthub/db && fnm exec --using 22.22.0 bash -lc \"pnpm -s run prepare && pnpm -s run typecheck\" || true; test -d node_modules/@nuxthub/blob`')
lines.push('- NuxtHub amplifier pass (831 behavior): `cd /Users/maxi/repros/.scratch/causality-matrix/cases/nuxt-hub-831 && fnm exec --using 22.22.0 pnpm i && rm -rf node_modules/@nuxthub/blob node_modules/@nuxthub/kv node_modules/@nuxthub/db && fnm exec --using 22.22.0 bash -lc \"pnpm -s run prepare && pnpm -s run typecheck\" || true; test ! -d node_modules/@nuxthub/blob`')
lines.push('- Nuxt route-rules synthetic fail: `cd /Users/maxi/repros/nuxt-34346 && pnpm i && pnpm verify` (fails by design).')
lines.push('- Nuxt route-rules synthetic pass: `cd /Users/maxi/repros/nuxt-34346-fix && pnpm i && pnpm verify` (passes with fallback patch).')

lines.push('')
lines.push('## Upstream Target Recommendation')
lines.push('1. Keep Nuxt root-cause tracking in `nuxt/nuxt#34164` for real `#build/route-rules.mjs` resolution failures.')
lines.push('2. Treat NuxtHub issue as amplifier class (shared mutable shims) validated by old-vs-831 behavior (`nuxt-hub/core#830` / `nuxt-hub/core#831`).')
lines.push('3. No new public issue should be posted before approval. Prepare draft payloads only.')

lines.push('')
lines.push('## Draft Payloads')
lines.push('- Nuxt draft: `/Users/maxi/repros/.scratch/causality-matrix/issue-drafts/nuxt-34164-followup.md`')
lines.push('- NuxtHub draft: `/Users/maxi/repros/.scratch/causality-matrix/issue-drafts/nuxthub-amplifier-followup.md`')

writeFileSync(join(BASE, 'REPORT.md'), lines.join('\n'))
