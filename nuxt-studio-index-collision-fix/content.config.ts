import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
})

export default defineContentConfig({
  collections: {
    marketing: defineCollection({
      type: 'page',
      source: {
        include: '*.md',
      },
      schema: pageSchema,
    }),
    guides: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        cwd: 'content/guides',
        prefix: '/guides',
      },
      schema: pageSchema,
    }),
  },
})
