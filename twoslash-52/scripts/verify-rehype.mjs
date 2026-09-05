const { default: config } = await import('./../node_modules/nuxt-content-twoslash/dist/runtime/mdc-config.js')

const processor = {
  use(factory) {
    this.factory = factory
    return this
  },
}

config.unified.rehype(processor)

const tree = {
  type: 'root',
  children: [{
    type: 'element',
    tagName: 'pre',
    properties: {
      filename: 'app.config.ts',
      meta: 'ts twoslash',
    },
    children: [],
  }],
}

try {
  const plugin = processor.factory()
  plugin(tree)
  console.log(tree.children[0].properties.meta)
}
catch (error) {
  console.error(error instanceof Error ? error.stack : error)
  process.exitCode = 1
}
