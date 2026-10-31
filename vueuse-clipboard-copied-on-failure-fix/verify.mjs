import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { chromium } from 'playwright'

const files = {
  '/': ['index.html', 'text/html'],
  '/vue.js': ['node_modules/vue/dist/vue.global.prod.js', 'text/javascript'],
  '/vueuse-shared.js': ['node_modules/@vueuse/shared/dist/index.iife.js', 'text/javascript'],
  '/vueuse-core.js': ['node_modules/@vueuse/core/dist/index.iife.js', 'text/javascript'],
}
const server = createServer((req, res) => {
  const [file, type] = files[req.url] ?? []
  if (!file) return res.writeHead(404).end()
  res.writeHead(200, { 'Content-Type': type }).end(readFileSync(new URL(file, import.meta.url)))
}).listen(0, '127.0.0.1')
await new Promise((resolve) => server.once('listening', resolve))

const browser = await chromium.launch()
let failed = false
try {
  const page = await browser.newPage()
  // localhost is a secure context, so navigator.clipboard exists.
  await page.goto(`http://localhost:${server.address().port}/`)
  const version = JSON.parse(readFileSync(new URL('node_modules/@vueuse/core/package.json', import.meta.url))).version
  console.log(`Chromium ${browser.version()}, @vueuse/core ${version}`)
  await page.evaluate(() => {
    const ta = document.createElement('textarea')
    ta.id = 'paste'
    document.body.append(ta)
  })

  // Puts known text on the clipboard, runs one copy, then pastes to see what the clipboard holds.
  async function check(name, runCopy) {
    await page.fill('#paste', 'BEFORE')
    await page.press('#paste', 'ControlOrMeta+A')
    await page.press('#paste', 'ControlOrMeta+C')
    await runCopy()
    await page.waitForTimeout(100)
    const label = await page.textContent('#share')
    await page.fill('#paste', '')
    await page.press('#paste', 'ControlOrMeta+V')
    const clipboard = await page.inputValue('#paste')
    const landed = clipboard === 'COPIED TEXT'
    const reported = label === 'Copied'
    const ok = landed === reported
    failed ||= !ok
    console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: clipboard ${JSON.stringify(clipboard)}, button ${JSON.stringify(label)}`)
    // Let `copied` reset (copiedDuring is 1500 ms) before the next check.
    await page.waitForTimeout(1600)
  }

  await check('copy() from a click', () => page.click('#share'))

  // The page calls copy() itself once the activation from the keypresses has expired, so the copy runs outside a
  // user gesture and the browser refuses it. Playwright's evaluate() counts as a gesture, hence the page-side wait.
  await check('copy() outside a user gesture', () => page.evaluate(() => new Promise((resolve) => {
    const wait = setInterval(() => {
      if (navigator.userActivation.isActive) return
      clearInterval(wait)
      window.share().then(resolve)
    }, 100)
  })))

  console.log(failed ? 'FAIL: `copied` does not match whether the text reached the clipboard' : 'PASS: `copied` is true only when the text reached the clipboard')
}
finally {
  await browser.close()
  server.close()
}
process.exitCode = failed ? 1 : 0
