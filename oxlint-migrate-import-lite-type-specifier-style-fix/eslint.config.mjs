// The same plugin registration and rule entry that @antfu/eslint-config 9.5.1
// emits in its `antfu/imports/rules` config item (dist/index.mjs:750-760).
import pluginImportLite from 'eslint-plugin-import-lite'

export default [
  {
    plugins: { import: pluginImportLite },
    rules: {
      'import/consistent-type-specifier-style': ['error', 'top-level'],
    },
  },
]
