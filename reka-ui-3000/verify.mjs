import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { createServer } from 'vite'

assert.equal(process.versions.node, '24.21.0', 'Use Node 24.21.0, pinned in .node-version')
const server = await createServer({
  configFile: false,
  server: { host: '127.0.0.1', port: 0 },
})
let browser
try {
  await server.listen()
  const { port } = server.httpServer.address()
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${port}/`)
  await page.waitForFunction(() => window.initialDatefieldResult)
  const result = await page.evaluate(() => window.runDatefieldRepro())
  console.log(JSON.stringify({ node: process.version, platform: `${process.platform}/${process.arch}`, ...result }, null, 2))
  const original = result.results.find(test => test.name === 'second-offset-min')
  assert.equal(original.type, 'datetime-local')
  assert.equal(original.value, '2026-11-30T23:59:59')
  assert.equal(original.min, '2026-10-07T15:20:06')
  for (const test of result.results)
    assert.equal(test.pass, true, `${test.name}: expected valid=${test.expectedValid} and submits=${test.expectedValid ? 1 : 0}, actual valid=${test.flags.valid}, stepMismatch=${test.flags.stepMismatch}, submits=${test.submits}`)
}
finally {
  await browser?.close()
  await server.close()
}
