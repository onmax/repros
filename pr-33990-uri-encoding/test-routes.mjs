import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function testRoutes() {
  const routes = [
    '/ç',
    '/%C3%A7',  // URI encoded ç
    '/文档',
    '/%E6%96%87%E6%A1%A3',  // URI encoded 文档
    '/a:b',
    '/a%3Ab',  // URI encoded :
    '/a&b',
    '/a%26b',  // URI encoded &
  ]

  console.log('Testing routes with current Nuxt version...\n')
  
  // Import the routes config
  const routerPath = resolve(__dirname, '.nuxt/types/router.d.ts')
  
  // Check generated routes
  const { readFileSync } = await import('node:fs')
  try {
    const routerContent = readFileSync(routerPath, 'utf-8')
    console.log('Generated routes from router.d.ts:')
    
    // Extract route paths
    const pathMatches = routerContent.match(/path:\s*'([^']+)'/g)
    if (pathMatches) {
      pathMatches.forEach(m => {
        const path = m.match(/'([^']+)'/)[1]
        console.log(`  ${path}`)
      })
    }
  } catch (e) {
    console.error('Could not read router types:', e.message)
  }
  
  console.log('\n')
  
  // Check .output/server files
  const outputPath = resolve(__dirname, '.output/server')
  const serverFiles = readFileSync(resolve(outputPath, 'chunks/build/server.mjs'), 'utf-8')
  
  console.log('Routes in server.mjs (looking for path definitions):')
  const pathRegex = /path:\s*["']([^"']+)["']/g
  let match
  const foundPaths = new Set()
  while ((match = pathRegex.exec(serverFiles)) !== null) {
    if (match[1] && !foundPaths.has(match[1])) {
      foundPaths.add(match[1])
      console.log(`  ${match[1]}`)
    }
  }
}

testRoutes().catch(console.error)
