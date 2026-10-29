import { FileTree } from '@pierre/trees'

const tree = new FileTree({
  paths: ['README.md'],
  search: true,
})
tree.render({ containerWrapper: document.getElementById('app') })
