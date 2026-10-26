import { defineAgentContentSource } from '#agent-discovery'

const pages: Record<string, { title: string, description: string, markdown: string }> = {
  '/docs/prerendered': {
    title: 'Prerendered',
    description: 'Written to the static output at build time.',
    markdown: '# Prerendered\n\nMarkdown for /docs/prerendered.\n'
  },
  '/docs/on-demand': {
    title: 'On demand',
    description: 'Rendered by the Worker per request.',
    markdown: '# On demand\n\nMarkdown for /docs/on-demand.\n'
  }
}

export default defineAgentContentSource({
  async list(selector) {
    if (selector) {
      return null
    }
    return Object.entries(pages).map(([route, page]) => ({ route, title: page.title, description: page.description }))
  },
  async get(route) {
    return pages[route] || null
  }
})
