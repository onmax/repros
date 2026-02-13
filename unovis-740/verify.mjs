import { build } from 'vite'

const transformed = new Set()

const result = await build({
  logLevel: 'silent',
  plugins: [{
    name: 'track-modules',
    transform(_code, id) {
      if (!id.includes('node_modules/.pnpm')) return
      transformed.add(id)
    },
  }],
})

const chunk = result.output.find(o => o.type === 'chunk')

console.log(`modules parsed from node_modules: ${transformed.size}`)
console.log(`bundle size: ${(chunk.code.length / 1024).toFixed(1)} KB`)
console.log()

const heavy = ['elkjs', 'three', 'leaflet', 'maplibre', 'dagre']
const found = heavy.filter(dep => [...transformed].some(m => m.includes(`/${dep}/`)))
if (found.length) {
  console.log(`heavy deps pulled in for a single enum import: ${found.join(', ')}`)
  process.exit(1)
}

console.log('no heavy deps found')
