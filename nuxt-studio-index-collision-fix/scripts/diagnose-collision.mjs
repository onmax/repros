import { generateFsPathFromId, generateIdFromFsPath, getCollectionByFilePath } from '../node_modules/nuxt-studio/dist/module/runtime/utils/collection.js'

const collections = {
  marketing: {
    name: 'marketing',
    source: [{ include: '*.md', prefix: '/', cwd: 'content' }],
  },
  guides: {
    name: 'guides',
    source: [{ include: '**/*.md', prefix: '/guides', cwd: 'content/guides' }],
  },
}

const marketingPath = 'index.md'
const guidesPath = 'guides/index.md'

const marketingId = generateIdFromFsPath(marketingPath, collections.marketing)
const guidesId = generateIdFromFsPath(guidesPath, collections.guides)

const marketingFsPath = generateFsPathFromId(marketingId, collections.marketing.source[0])
const guidesFsPath = generateFsPathFromId(guidesId, collections.guides.source[0])
const matchedMarketingCollection = getCollectionByFilePath('index.md', collections)?.name
const matchedGuidesCollection = getCollectionByFilePath('guides/index.md', collections)?.name

console.log(`marketing/${marketingPath} -> ${marketingId} -> ${marketingFsPath}`)
console.log(`${guidesPath} -> ${guidesId} -> ${guidesFsPath}`)
console.log(`getCollectionByFilePath('index.md') -> ${matchedMarketingCollection}`)
console.log(`getCollectionByFilePath('guides/index.md') -> ${matchedGuidesCollection}`)

if (
  marketingId !== 'marketing/index.md'
  || guidesId !== 'guides/guides/index.md'
  || marketingFsPath !== 'index.md'
  || guidesFsPath !== 'guides/index.md'
  || matchedMarketingCollection !== 'marketing'
  || matchedGuidesCollection !== 'guides'
) {
  process.exitCode = 1
}
