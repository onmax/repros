import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
const { repro: { mode } } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)))
assert.ok(['baseline', 'fixed'].includes(mode))
const expectedScans = mode === 'baseline' ? 60 : 0
import { execFileSync } from 'node:child_process'
import { build, preview } from 'vite'
import { chromium } from 'playwright'

assert.equal(process.version, 'v24.19.0', 'Use Node 24.19.0 (.nvmrc) for the pinned run')
execFileSync(process.execPath, ['node_modules/playwright/cli.js', 'install', 'chromium'], { stdio: 'inherit' })
await build({ logLevel: 'warn' })
const server = await preview({ logLevel: 'warn', preview: { host: '127.0.0.1', port: 0 } })
let browser
try {
  browser = await chromium.launch({ headless: true })
  console.log(`Node ${process.version}; Chromium ${browser.version()}; reka-ui 2.10.4; Vue 3.5.39; Vite production build`)
  const results = []
  for (const size of [250, 1000]) {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(`${server.resolvedUrls.local[0]}?size=${size}`)
    await page.waitForFunction(() => window.fixture)
    await page.evaluate(() => {
      const items = [...document.querySelectorAll('[role="option"]')]
      const original = Element.prototype.querySelectorAll
      const counters = { scans: 0, visitedNodes: 0, queryMs: 0 }
      Element.prototype.querySelectorAll = function (selector) {
        const start = performance.now()
        const result = original.call(this, selector)
        if (selector === '[data-reka-collection-item]') {
          counters.scans++
          counters.visitedNodes += result.length
          counters.queryMs += performance.now() - start
        }
        return result
      }
      window.measurement = { items, counters, reset() { counters.scans = counters.visitedNodes = counters.queryMs = 0 } }
    })
    // Confirm a real browser mouse move takes the same route before the counted sequence.
    await page.locator('[role="option"]').nth(1).hover()
    const trusted = await page.evaluate(() => ({ ...window.measurement.counters, highlighted: window.fixture.lastHighlight }))
    assert.equal(trusted.highlighted, 'item-1')
    assert.equal(trusted.scans, mode === 'baseline' ? 1 : 0, 'Real browser hover must match expected lookup behavior')
    const result = await page.evaluate(async () => {
      const { items, counters, reset } = window.measurement
      reset()
      const start = performance.now()
      for (let i = 0; i < 60; i++) {
        const index = i % 2 === 0 ? 2 : 1
        items[index].dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse' }))
        await window.fixture.nextTick()
      }
      const output = { size: items.length, hovers: 60, ...counters, elapsedMs: performance.now() - start, highlighted: window.fixture.lastHighlight }
      reset()
      // One-variable control: the pointer stays on the already highlighted row.
      for (let i = 0; i < 60; i++) {
        items[1].dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse' }))
        await window.fixture.nextTick()
      }
      output.repeatedHoverScans = counters.scans
      return output
    })
    assert.equal(result.size, size)
    assert.equal(result.highlighted, 'item-1')
    assert.equal(result.scans, expectedScans, 'Changed-hover query count must match package mode')
    assert.equal(result.visitedNodes, expectedScans * size, 'Returned-node count must match package mode')
    assert.equal(result.repeatedHoverScans, 0, 'Control must show unchanged hover skips collection work')
    assert.deepEqual(errors, [])
    results.push(result)
    console.log(JSON.stringify(result))
    if (size === 250) {
      const contract = await page.evaluate(() => window.fixture.verifyCollectionContract())
      assert.deepEqual(contract, { hasDirectLookup: mode === 'fixed', enabled: 'enabled', identityPreserved: true, disabledExcluded: true, disabledIncluded: 'disabled', unregisteredExcluded: true, nestedExcluded: true, nestedIncluded: 'enabled', detachedRegistered: 'enabled', unmountedExcluded: true })
      console.log('Collection contract:', JSON.stringify(contract))
      // Reorder native DOM nodes without changing registration order. Navigation must follow DOM order.
      await page.evaluate(() => {
        const items = window.measurement.items
        items[1].after(items[3])
        items[1].focus()
      })
      await page.keyboard.press('ArrowDown')
      assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Item 3')
      console.log('Keyboard DOM-order navigation: passed')
    }
    await page.close()
  }
  console.log(`CONFIRMED ${mode}: 60 changed hovers cause ${expectedScans} full collection queries; repeated hover causes zero. Highlight and collection semantics preserved.`)
} finally {
  await browser?.close()
  await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()))
}
