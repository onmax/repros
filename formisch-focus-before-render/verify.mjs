// Submits an empty form and checks what the first invalid input looked like when Formisch focused it.
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { chromium } from 'playwright'
import { build } from 'vite'

const root = import.meta.dirname
await build({ root, logLevel: 'warn' })

const dist = join(root, 'dist')
const types = { '.html': 'text/html', '.js': 'text/javascript' }
const server = createServer(async (req, res) => {
  const path = req.url === '/' ? '/index.html' : req.url
  try {
    const body = await readFile(join(dist, path))
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' }).end(body)
  } catch {
    res.writeHead(404).end()
  }
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const { port } = server.address()

const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${port}/`)
  await page.click('button[type=submit]')
  await page.waitForFunction(() => window.focusSnapshot !== null)
  const atFocus = await page.evaluate(() => window.focusSnapshot)
  const afterRender = await page.evaluate(() => {
    const input = document.querySelector('input')
    return {
      ariaInvalid: input.getAttribute('aria-invalid'),
      errorElement: document.getElementById(input.getAttribute('aria-errormessage'))?.textContent ?? null,
      focused: document.activeElement === input,
    }
  })
  console.log('expected at focus:', { ariaInvalid: 'true', errorElement: 'Enter your email.' })
  console.log('actual at focus:  ', atFocus)
  console.log('after render:     ', afterRender)
  if (atFocus.ariaInvalid !== 'true' || atFocus.errorElement === null) {
    console.log('BUG: Formisch focused the input before Vue rendered its error state.')
    process.exitCode = 1
  } else {
    console.log('OK: the input had its error state when it got focus.')
  }
} finally {
  await browser.close()
  server.close()
}
