// Test script to verify unicode route behavior
import { execSync } from 'node:child_process'

const routes = [
  '/测试',
  '/ç',
  '/é',
  '/中文',
  '/خاص:جديد',
  '/a&b',
  '/a\\b'
]

console.log('Testing SSR routes (direct fetch)...\n')

for (const route of routes) {
  try {
    const encodedRoute = encodeURI(route)
    const result = execSync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${encodedRoute}`, { encoding: 'utf8' })
    const status = result.trim()
    const emoji = status === '200' ? '✓' : '✗'
    console.log(`${emoji} ${route.padEnd(20)} → ${status} (encoded: ${encodedRoute})`)
  } catch (err) {
    console.log(`✗ ${route.padEnd(20)} → ERROR: ${err.message}`)
  }
}

console.log('\n⚠️  For client-side navigation testing, manually click links in browser')
console.log('   Open http://localhost:3000 and click the page name links')
