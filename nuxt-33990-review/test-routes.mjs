import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

const results = []

async function testRoute(path, description) {
  console.log(`Testing: ${description} (${path})`)

  try {
    // Build the app first if not already built
    const routesFile = '.nuxt/routes.json'
    let routes = []
    try {
      routes = JSON.parse(readFileSync(routesFile, 'utf-8'))
    } catch (e) {
      console.log('Building app first...')
      execSync('pnpm nuxt build', { stdio: 'inherit' })
      routes = JSON.parse(readFileSync(routesFile, 'utf-8'))
    }

    // Check if route exists in generated routes
    const routeExists = routes.some(r => {
      // Normalize paths for comparison
      const routePath = r.path || ''
      const testPath = path
      return routePath === testPath || routePath.includes(path.split('/').pop())
    })

    if (routeExists) {
      console.log(`✓ Route found: ${path}`)
      results.push({ path, description, status: 'PASS', error: null })
    } else {
      console.log(`✗ Route NOT found: ${path}`)
      console.log('Available routes:', routes.map(r => r.path).filter(Boolean))
      results.push({ path, description, status: 'FAIL', error: 'Route not generated' })
    }
  } catch (error) {
    console.log(`✗ Error: ${error.message}`)
    results.push({ path, description, status: 'FAIL', error: error.message })
  }
  console.log('')
}

const testCases = [
  { path: '/测试', description: 'Chinese characters' },
  { path: '/café', description: 'French accented chars' },
  { path: '/prerender/ç', description: 'C-cedilla' },
  { path: '/文档/介绍', description: 'Nested Chinese' },
  { path: '/خاص:جديد', description: 'Arabic with colon (should escape :)' },
  { path: '/a&b', description: 'Ampersand' },
  { path: '/a\\\\b', description: 'Backslash (should escape \\)' },
  { path: '/café/évènement', description: 'Nested accented' },
]

console.log('=== Nuxt PR #33990 Route Verification ===\n')

for (const test of testCases) {
  await testRoute(test.path, test.description)
}

console.log('\n=== Summary ===')
const passed = results.filter(r => r.status === 'PASS').length
const failed = results.filter(r => r.status === 'FAIL').length
console.log(`Passed: ${passed}/${results.length}`)
console.log(`Failed: ${failed}/${results.length}`)

// Write JSON output
const output = {
  summary: { total: results.length, passed, failed },
  results: results,
  timestamp: new Date().toISOString()
}

writeFileSync('test-results.json', JSON.stringify(output, null, 2))
console.log('\nResults written to test-results.json')

process.exit(failed > 0 ? 1 : 0)
