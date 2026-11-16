import assert from 'node:assert/strict'
import { comarkContent } from 'comark-content'
import fs from 'comark-content/sources/fs'
import sqlite from 'comark-content/database/sqlite-node'
import sqliteFullTextSearch from 'comark-content/plugins/sqlite-full-text-search'

const content = comarkContent({
  source: fs('./content', { cwd: import.meta.url }),
  plugins: [sqliteFullTextSearch({ database: sqlite() })],
})

const before = await content.search('alpaca')
console.log('search("alpaca") before update:', before.map(r => r.id))

const page = await content.get('/guide')
await content.update({
  ...page,
  nodes: [['p', {}, 'The new word is zebra.']],
})

const updated = await content.get('/guide')
console.log('get("/guide") after update:', JSON.stringify(updated.nodes))

const zebra = await content.search('zebra')
const alpaca = await content.search('alpaca')
console.log('search("zebra") after update:', zebra.map(r => r.id))
console.log('search("alpaca") after update:', alpaca.map(r => r.id))

assert.equal(before.length > 0, true, 'control: the first search finds the original text')
assert.equal(zebra.length > 0, true, 'expected search("zebra") to find the updated page, got no results')
assert.equal(alpaca.length, 0, 'expected search("alpaca") to stop matching the updated page')
console.log('OK: search follows update()')
