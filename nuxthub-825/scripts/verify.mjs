import { readFile } from 'node:fs/promises'

const authSchema = await readFile('.nuxt/better-auth/schema.sqlite.mjs', 'utf8')
const dbClient = await readFile('node_modules/@nuxthub/db/db.mjs', 'utf8')

let workingRelations = false
try {
  const [{ relations }, { db }] = await Promise.all([
    import('../node_modules/@nuxthub/db/relations.mjs'),
    import('../node_modules/@nuxthub/db/db.mjs'),
  ])
  workingRelations = ['account', 'session', 'user', 'verification']
    .every(model => relations[model] && db.query[model])
}
catch {}

const checks = [
  ['Nuxt Better Auth generated relations v2', authSchema.includes('defineRelationsPart') && authSchema.includes('authRelations')],
  ['NuxtHub wired relations v2 into its client', dbClient.includes("from './relations.mjs'") && /\brelations\b/.test(dbClient)],
  ['The generated relation models are queryable', workingRelations],
]

const failed = checks.filter(([, passed]) => !passed)
for (const [label, passed] of checks)
  console.log(`${passed ? 'PASS' : 'FAIL'} ${label}`)

if (failed.length)
  process.exitCode = 1
