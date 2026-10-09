import { createClient } from '@libsql/client'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import assert from 'node:assert/strict'
const directory = await mkdtemp(join(tmpdir(), 'libsql-concurrent-writers-'))
const url = `file:${join(directory, 'state.db')}`
const clients = [createClient({ url }), createClient({ url })]
const errors = []
try {
  await clients[0].execute('PRAGMA journal_mode = WAL')
  await clients[0].execute('CREATE TABLE example (key TEXT PRIMARY KEY, value TEXT)')
  await Promise.all(clients.map(async (client, index) => {
    for (let n = 0; n < 3; n++) {
      for (let attempt = 0; attempt < 8; attempt++) {
        let transaction
        try {
          transaction = await client.transaction('write')
          await transaction.execute({ sql: 'INSERT OR REPLACE INTO example VALUES (?, ?)', args: [`${index}-${n}`, 'value'] })
          await transaction.commit()
          break
        } catch (error) {
          await transaction?.rollback().catch(() => {})
          if (attempt === 7) { errors.push({ code: error.code, message: error.message }); break }
          await new Promise(resolve => setTimeout(resolve, Math.min(50, 2 ** attempt)))
        } finally { transaction?.close() }
      }
    }
  }))
  console.log(JSON.stringify({ node: process.version, platform: process.platform, errors }, null, 2))
  if (process.argv.includes('--prove-bug')) {
    assert.ok(errors.length > 0, 'The pinned fixture must reproduce a failed commit')
    assert.ok(errors.every(error => error.code === 'SQLITE_BUSY' && error.message.includes('cannot commit transaction - SQL statements in progress')), 'The fixture must reproduce the specific statement-lifecycle error')
    console.log('Confirmed the exact commit failure')
  } else { assert.equal(errors.length, 0, 'Independent client transactions should commit successfully') }
} finally { clients.forEach(client => client.close()); await rm(directory, { recursive: true, force: true }) }
