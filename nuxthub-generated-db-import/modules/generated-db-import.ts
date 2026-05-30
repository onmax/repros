import { addTemplate, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'generated-db-import',
  },
  setup(_, nuxt) {
    const databaseTemplate = addTemplate({
      filename: 'generated-db.mjs',
      write: true,
      getContents: () => `import { db } from '@nuxthub/db'
export { db }
`,
    })
    nuxt.options.alias['#generated-db'] = databaseTemplate.dst
  },
})
