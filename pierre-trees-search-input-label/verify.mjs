// Renders a @pierre/trees FileTree with `search: true` in Chromium and checks the search input:
// it should have an author-provided accessible name, and it should not sit inside the role="tree" element.
// Exits 1 when a check fails.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { build } from 'esbuild'
import { chromium } from 'playwright'

const require = createRequire(import.meta.url)
const treesDir = new URL('./node_modules/@pierre/trees/', import.meta.url)
const { version } = JSON.parse(readFileSync(new URL('package.json', treesDir), 'utf8'))
const viewLines = readFileSync(new URL('dist/render/FileTreeView.js', treesDir), 'utf8').split('\n')
const placeholderLine = viewLines.findIndex(line => line.includes('placeholder:')) + 1
const { outputFiles } = await build({
  absWorkingDir: import.meta.dirname,
  bundle: true,
  entryPoints: ['src/main.js'],
  format: 'esm',
  write: false,
})
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

console.log(`@pierre/trees ${version}, Chromium ${chromium.executablePath().match(/chromium[^/]*-\d+/)?.[0]}`)
console.log(`dist/render/FileTreeView.js:${placeholderLine}: ${viewLines[placeholderLine - 1]?.trim()}`)

const browser = await chromium.launch()
const failures = []
try {
  const page = await browser.newPage()
  await page.setContent('<!doctype html><html lang="en"><body><div id="app"></div></body></html>')
  await page.addScriptTag({ type: 'module', content: outputFiles[0].text })
  const input = page.locator('[data-file-tree-search-input]')
  await input.waitFor({ state: 'attached' })

  const markup = await input.evaluate(el => ({
    ariaLabel: el.getAttribute('aria-label'),
    ariaLabelledby: el.getAttribute('aria-labelledby'),
    labelElements: el.labels?.length ?? 0,
    placeholder: el.getAttribute('placeholder'),
    insideTree: el.closest('[role="tree"]') !== null,
  }))

  // Chromium's computed accessible name for the input, and the source it came from.
  const cdp = await page.context().newCDPSession(page)
  const { result } = await cdp.send('Runtime.evaluate', {
    expression: 'document.querySelector("file-tree-container").shadowRoot.querySelector("[data-file-tree-search-input]")',
  })
  const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { objectId: result.objectId, fetchRelatives: false })
  const name = nodes[0].name
  const source = name?.sources?.find(candidate => candidate.value && !candidate.superseded)
  const nameSource = source?.attribute ?? source?.type ?? 'none'

  await page.addScriptTag({ content: axeSource })
  const axe = await page.evaluate(async () => {
    const results = await window.axe.run(document, { runOnly: { type: 'rule', values: ['label', 'aria-required-children'] } })
    const summary = outcome => results[outcome].map(rule => ({
      rule: rule.id,
      outcome,
      checks: rule.nodes.flatMap(node => [...node.any, ...node.all, ...node.none].map(check => check.id)),
      messages: rule.nodes.map(node => node.failureSummary).filter(Boolean),
    }))
    return [...summary('passes'), ...summary('violations'), ...summary('incomplete')]
  })

  console.log('\nSearch input markup:', markup)
  console.log(`Chromium accessible name: role=${nodes[0].role?.value} name=${JSON.stringify(name?.value)} from=${nameSource}`)
  for (const entry of axe) {
    console.log(`axe ${entry.rule}: ${entry.outcome} (${entry.checks.join(', ')})`)
    for (const message of entry.messages) console.log(`  ${message.replaceAll('\n', '\n  ')}`)
  }

  if (markup.ariaLabel == null && markup.ariaLabelledby == null && markup.labelElements === 0) {
    failures.push('the search input has no aria-label, no aria-labelledby, and no <label>')
  }
  if (nameSource === 'placeholder') {
    failures.push(`the search input's accessible name ${JSON.stringify(name.value)} comes from its placeholder`)
  }
  if (markup.insideTree) {
    failures.push('the search input is inside the role="tree" element')
  }
} finally {
  await browser.close()
}

if (failures.length) {
  console.log(`\nFAIL on @pierre/trees ${version}:`)
  for (const failure of failures) console.log(`- ${failure}`)
  process.exit(1)
}
console.log(`\nPASS on @pierre/trees ${version}`)
