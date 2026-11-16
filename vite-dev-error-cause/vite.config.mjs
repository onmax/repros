export default {
  logLevel: 'error',
  plugins: [{
    name: 'failing',
    transform(code, id) {
      if (!id.endsWith('/src/index.js')) return
      const error = new Error('Something is misconfigured', { cause: new Error('ROOT_CAUSE: the token file is missing') })
      error.url = 'https://example.com/docs/my-plugin-error'
      throw error
    },
  }],
}
