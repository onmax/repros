// Written by an AI agent for onmax. Not reviewed by a human.
import { defineContentConfig, defineCollection } from '@nuxt/content'
export default defineContentConfig({
  collections: { content: defineCollection({ type: 'page', source: '**/*.md' }) },
})
