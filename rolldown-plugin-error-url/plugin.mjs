// A plugin that fails with Rollup's documented `url` field (a link to docs for the error).
export const DOCS_URL = 'https://example.com/docs/my-plugin-error'
export function failing() {
  return {
    name: 'failing',
    transform(code, id) {
      if (!id.endsWith('index.js')) return
      this.error({ message: 'Something is misconfigured', url: DOCS_URL })
    },
  }
}
