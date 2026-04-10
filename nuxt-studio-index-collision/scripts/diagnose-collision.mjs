import { generateFsPathFromId, generateIdFromFsPath, getCollectionByFilePath } from '../node_modules/nuxt-studio/dist/module/runtime/utils/collection.js'

const collections = {
  marketing: {
    name: 'marketing',
    source: [{ include: '*.md', prefix: '' }],
  },
  guides: {
    name: 'guides',
    source: [{ include: '**/*.md', prefix: '/guides' }],
  },
}

const marketingPath = 'index.md'
const guidesPath = 'index.md'

const marketingId = generateIdFromFsPath(marketingPath, collections.marketing)
const guidesId = generateIdFromFsPath(guidesPath, collections.guides)

const marketingFsPath = generateFsPathFromId(marketingId, collections.marketing.source[0])
const guidesFsPath = generateFsPathFromId(guidesId, collections.guides.source[0])
const matchedCollection = getCollectionByFilePath('index.md', collections)?.name

console.log(`marketing/${marketingPath} -> ${marketingId} -> ${marketingFsPath}`)
console.log(`guides/guides/${guidesPath} -> ${guidesId} -> ${guidesFsPath}`)
console.log(`getCollectionByFilePath('index.md') -> ${matchedCollection}`)

if (
  marketingFsPath !== 'index.md'
  || guidesFsPath !== 'index.md'
  || matchedCollection !== 'guides'
) {
  process.exitCode = 1
}
