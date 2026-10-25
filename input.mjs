export const registrySize = 5000
export const references = Array.from({ length: 300 }, (_, index) => `item${Math.floor((index % 150) * registrySize / 150)}`)
export const imports = Array.from({ length: registrySize }, (_, index) => ({ name: `item${index}`, from: `fixture-${index % 5}` }))
export const code = `export function render(_ctx) { return [${references.map(name => `_ctx.${name}`).join(',')}]; }`
export const expectedVisits = references.reduce((sum, name) => sum + Number(name.slice(4)) + 1, 0)
export const lookupBudget = registrySize * 5
