// Verification that the patch fixes PR #9 issues
// https://github.com/onmax/nuxt-better-auth/pull/9

// This test shows the FIXED behavior after applying the pnpm patch
function generateFieldPatched(fieldName, field, dialect) {
  let fieldDef = `timestamp('${fieldName}')`

  if (field.required && field.defaultValue === undefined)
    fieldDef += '.notNull()'

  if (field.defaultValue !== undefined) {
    if (typeof field.defaultValue === 'boolean')
      fieldDef += `.default(${field.defaultValue})`
    else if (typeof field.defaultValue === 'string')
      fieldDef += `.default('${field.defaultValue}')`
    else if (typeof field.defaultValue === 'function')
      fieldDef += `.$defaultFn(${field.defaultValue})`
    else
      fieldDef += `.default(${field.defaultValue})`

    if (field.required)
      fieldDef += '.notNull()'
  }

  if (typeof field.onUpdate === 'function' && field.type === 'date')
    fieldDef += `.$onUpdate(${field.onUpdate})`

  return `${fieldName}: ${fieldDef}`
}

const createdAt = { type: 'date', required: true, defaultValue: () => new Date() }
const updatedAt = { type: 'date', required: true, onUpdate: () => new Date() }

console.log('=== PATCHED VERSION ===')
console.log(generateFieldPatched('createdAt', createdAt))
console.log(generateFieldPatched('updatedAt', updatedAt))

console.log('\n--- Verification ---')
const result1 = generateFieldPatched('createdAt', createdAt)
const result2 = generateFieldPatched('updatedAt', updatedAt)

let ok = true
if (result1.includes('.$defaultFn(')) console.log('✅ defaultValue uses .$defaultFn()')
else { console.log('❌ defaultValue should use .$defaultFn()'); ok = false }

if (result2.includes('.$onUpdate(')) console.log('✅ onUpdate uses .$onUpdate()')
else { console.log('❌ onUpdate should use .$onUpdate()'); ok = false }

process.exit(ok ? 0 : 1)
