import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

// Simulates ~30 collections similar to nimiq website
export default defineContentConfig({
  collections: {
    home: defineCollection({
      type: 'page',
      source: 'pages/index.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        hero: z.object({ headline: z.string(), subline: z.string().optional() }).optional(),
      }),
    }),
    about: defineCollection({
      type: 'page', 
      source: 'pages/about.md',
      schema: z.object({ title: z.string(), description: z.string().optional() }),
    }),
    contact: defineCollection({
      type: 'page',
      source: 'pages/contact.md', 
      schema: z.object({ title: z.string(), description: z.string().optional() }),
    }),
    team: defineCollection({
      type: 'page',
      source: 'pages/team.md',
      schema: z.object({ title: z.string(), members: z.array(z.object({ name: z.string(), role: z.string() })).optional() }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({ title: z.string(), description: z.string(), publishedAt: z.string() }),
    }),
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({ title: z.string(), description: z.string().optional() }),
    }),
    changelog: defineCollection({
      type: 'page',
      source: 'changelog/*.md',
      schema: z.object({ title: z.string(), version: z.string(), date: z.string() }),
    }),
    site: defineCollection({
      type: 'data',
      source: 'data/site.yaml',
      schema: z.object({ name: z.string(), description: z.string() }),
    }),
  },
})
