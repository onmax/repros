const { appendFileSync } = require('node:fs')
const { join, resolve } = require('node:path')

// Records what a codegen plugin gets, once for each file.
exports.codegen = (file, ctx) => {
  const entry = {
    contextKeys: Object.keys(ctx),
    rootDirFromOptions: resolve(ctx.config.options.rootDir),
  }
  appendFileSync(join(__dirname, 'ctx.log'), `${JSON.stringify(entry)}\n`)
  return {}
}
