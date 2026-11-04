function validateQuery(event: unknown): never { throw new Error('Invalid value: Expected >=1 but received 0') }
const handler = async (event: unknown) => validateQuery(event)
function dispatch(event: unknown) { return handler(event) }
const route = async (event: unknown) => { await null; return dispatch(event) }
export const outer = async (event: unknown) => await route(event)
