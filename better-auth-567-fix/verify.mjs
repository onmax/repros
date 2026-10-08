import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout } from 'node:timers/promises'

const expectLeak = process.argv.includes('--expect-leak')
const urlIndex = process.argv.indexOf('--url')
const baseURL = urlIndex === -1 ? 'http://127.0.0.1:3097' : process.argv[urlIndex + 1]
const session = `ba567-${process.pid}`
let server
function browser(...args) {
  const result = spawnSync('agent-browser', ['--session', session, '--args', '--no-sandbox', '--json', ...args], { encoding: 'utf8', timeout: 60000 })
  assert.equal(result.status, 0, result.stderr || result.stdout)
  const response = JSON.parse(result.stdout)
  assert.equal(response.success, true, JSON.stringify(response))
  return response.data
}
try {
  if (urlIndex === -1) {
    const install = spawnSync('agent-browser', ['install'], { stdio: 'inherit', timeout: 180000 })
    assert.equal(install.status, 0, 'Unable to prepare Chromium')
    server = spawn('pnpm', ['exec', 'nuxt', 'dev', '--host', '127.0.0.1', '--port', '3097'], { stdio: 'ignore', detached: true })
  }
  let ready = false
  for (let attempt = 0; attempt < 120; attempt++) {
    try {
      const response = await fetch(baseURL)
      if (response.status === 200) { ready = true; break }
    } catch {}
    await setTimeout(500)
  }
  assert.ok(ready, `Nuxt did not become ready at ${baseURL}`)
  browser('open', baseURL)
  const { result: actual } = browser('eval', `(() => {
    const style = selector => getComputedStyle(document.querySelector(selector))
    return {
      heading: style('h2').fontSize,
      headingBorder: style('h2').borderBottomWidth,
      inputWidth: style('input[type=text]').width,
      inputPadding: style('input[type=text]').paddingTop,
      bodyMargin: style('body').marginTop,
      themeVariable: style('html').getPropertyValue('--ba-bg').trim(),
      devtoolsStyles: [...document.querySelectorAll('link[rel=stylesheet]')].filter(link => link.href.includes('__better-auth-devtools')).length,
    }
  })()`)
  console.log('Expected host styles:', JSON.stringify({ heading: '32px', headingBorder: '0px', inputWidth: '180px', inputPadding: '2px', bodyMargin: '24px', themeVariable: '' }))
  console.log('Actual host styles:', JSON.stringify(actual))
  assert.ok(actual.devtoolsStyles > 0, 'DevTools stylesheet must be loaded on the initial host page')
  const expected = expectLeak
    ? { heading: '13px', headingBorder: '1px', inputWidth: '340px', inputPadding: '7px', bodyMargin: '0px', themeVariable: '#fff' }
    : { heading: '32px', headingBorder: '0px', inputWidth: '180px', inputPadding: '2px', bodyMargin: '24px', themeVariable: '' }
  const { devtoolsStyles, ...styles } = actual
  assert.deepEqual(styles, expected)
  console.log(expectLeak ? 'PASS: reproduced #567 stylesheet leak' : 'PASS: host styles are isolated')
} finally {
  spawnSync('agent-browser', ['--session', session, 'close'], { stdio: 'ignore', timeout: 10000 })
  if (server?.pid) {
    try { process.kill(-server.pid, 'SIGTERM') } catch (error) { if (error.code !== 'ESRCH') throw error }
    if (server.exitCode === null) await new Promise(resolve => server.once('exit', resolve))
  }
}
