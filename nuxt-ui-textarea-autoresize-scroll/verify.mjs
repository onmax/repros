// Types past `maxrows` in a UTextarea with `autoresize`, then checks that typing one more character
// neither resizes the textarea nor reveals its overlay scrollbar (the "flash" on macOS and in Chrome with
// overlay scrollbars). Clearing the text must still shrink it back to `rows`.
import { createReadStream } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join } from 'node:path'
import { chromium } from 'playwright'

const dist = join(import.meta.dirname, 'dist')
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }
const server = createServer((req, res) => {
  const path = req.url === '/' ? '/index.html' : req.url.split('?')[0]
  res.setHeader('content-type', types[extname(path)] ?? 'application/octet-stream')
  createReadStream(join(dist, path)).on('error', () => res.writeHead(404).end()).pipe(res)
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))

// Full Chromium with overlay scrollbars, and scrollbars painted (Playwright hides them by default).
const browser = await chromium.launch({
  channel: 'chromium',
  ignoreDefaultArgs: ['--hide-scrollbars'],
  args: ['--enable-features=OverlayScrollbar'],
})
const failures = []
try {
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${server.address().port}/`)
  const textarea = page.locator('textarea')
  await textarea.click()
  for (let i = 1; i <= 8; i++) {
    await page.keyboard.type(`Line ${i}`)
    await page.keyboard.press('Shift+Enter')
  }
  await page.keyboard.type('Line 9')
  await page.waitForTimeout(100)
  const filledRows = await textarea.evaluate(el => el.rows)
  console.log('rows with 9 lines (maxrows 6):', filledRows)
  if (filledRows !== 6) failures.push(`expected 6 rows with 9 lines, got ${filledRows}`)

  // One character at 6 rows: `rows` shouldn't change at all.
  await textarea.evaluate((el) => {
    window.rowWrites = []
    new MutationObserver(records => window.rowWrites.push(...records.map(r => r.oldValue)))
      .observe(el, { attributeFilter: ['rows'], attributeOldValue: true })
  })
  await page.keyboard.type('x')
  await page.waitForTimeout(100)
  const rows = await textarea.evaluate(el => window.rowWrites.length ? [...window.rowWrites.slice(1), el.getAttribute('rows')] : [])
  console.log('rows values while typing one character:', rows)
  if (rows.length) failures.push(`typing one character resized the textarea ${rows.length} times (rows → ${rows.join(' → ')})`)

  // Let the overlay scrollbar fade out, type one character, and compare the scrollbar strip.
  const box = await textarea.boundingBox()
  const strip = { x: box.x + box.width - 14, y: box.y, width: 12, height: box.height }
  await page.waitForTimeout(3000)
  const idle = await page.screenshot({ clip: strip })
  await page.keyboard.type('x')
  await page.waitForTimeout(50)
  const flashed = !idle.equals(await page.screenshot({ clip: strip }))
  console.log('scrollbar appeared after typing one character:', flashed)
  if (flashed) failures.push('typing one character revealed the overlay scrollbar without any scrolling')

  // Control: clearing the text still shrinks the textarea back to `rows`.
  await page.keyboard.press('ControlOrMeta+a')
  await page.keyboard.press('Backspace')
  await page.waitForTimeout(100)
  const clearedRows = await textarea.evaluate(el => el.rows)
  console.log('rows after clearing:', clearedRows)
  if (clearedRows !== 1) failures.push(`expected 1 row after clearing, got ${clearedRows}`)
} finally {
  await browser.close()
  server.close()
}

if (failures.length) {
  console.error(`\nFAIL\n- ${failures.join('\n- ')}`)
  process.exit(1)
}
console.log('\nPASS')
