import assert from 'node:assert/strict'
import { rmSync } from 'node:fs'
import { comarkContent } from 'comark-content'
import fs from 'comark-content/sources/fs'
import sqlite from 'comark-content/database/sqlite-node'
import sqlQuery from 'comark-content/plugins/sql-query'
import sqliteFullTextSearch from 'comark-content/plugins/sqlite-full-text-search'

const file = new URL('./shared.sqlite', import.meta.url).pathname
rmSync(file, { force: true })

// Each call stands for one new server instance (for example a cold Worker
// isolate) that opens the same, already shared database file.
async function coldStart() {
  const db = sqlite({ filename: file })
  const writes = []
  const database = { ...db, execute: (sql, params) => { writes.push(sql.trim().split(/\s+/).slice(0, 2).join(' ')); return db.execute(sql, params) } }
  const content = comarkContent({
    source: fs('./content', { cwd: import.meta.url }),
    plugins: [sqlQuery({ database }), sqliteFullTextSearch({ database })],
  })
  const rows = await content.query().all()
  const hits = await content.search('Body')
  const counts = {}
  for (const w of writes) counts[w] = (counts[w] ?? 0) + 1
  return { rows: rows.length, hits: hits.length, counts }
}

const first = await coldStart()
console.log('instance 1, empty database:  ', first)
const second = await coldStart()
console.log('instance 2, indexed database:', second)

assert.equal(second.rows, first.rows, 'control: both instances see the same rows')
assert.equal(second.counts['DROP TABLE'] ?? 0, 0, 'expected instance 2 to reuse the index, but it dropped the sql-query table')
assert.equal((second.counts['INSERT OR'] ?? 0) + (second.counts['INSERT INTO'] ?? 0), 0, 'expected instance 2 to write no index rows')
console.log('OK: a second instance reuses the shared index')
