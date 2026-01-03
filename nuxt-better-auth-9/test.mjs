// Reproduction for https://github.com/onmax/nuxt-better-auth/pull/9
// Bug: defaultValue functions use .default() instead of .$defaultFn()
// Bug: onUpdate functions are not handled at all

// Simplified generateField from @onmax/nuxt-better-auth@0.0.2-alpha.3
// This is the BUGGY version before the fix
function generateFieldBuggy(fieldName, field, dialect) {
  let fieldDef = `timestamp('${fieldName}')`  // simplified for date type

  if (field.required && field.defaultValue === undefined)
    fieldDef += '.notNull()'

  if (field.defaultValue !== undefined) {
    if (typeof field.defaultValue === 'boolean')
      fieldDef += `.default(${field.defaultValue})`
    else if (typeof field.defaultValue === 'string')
      fieldDef += `.default('${field.defaultValue}')`
    else
      fieldDef += `.default(${field.defaultValue})`  // BUG: functions go here!

    if (field.required)
      fieldDef += '.notNull()'
  }

  // BUG: onUpdate is not handled at all!

  return `${fieldName}: ${fieldDef}`
}

// FIXED version
function generateFieldFixed(fieldName, field, dialect) {
  let fieldDef = `timestamp('${fieldName}')`

  if (field.required && field.defaultValue === undefined)
    fieldDef += '.notNull()'

  if (field.defaultValue !== undefined) {
    if (typeof field.defaultValue === 'boolean')
      fieldDef += `.default(${field.defaultValue})`
    else if (typeof field.defaultValue === 'string')
      fieldDef += `.default('${field.defaultValue}')`
    else if (typeof field.defaultValue === 'function')
      fieldDef += `.$defaultFn(${field.defaultValue})`  // FIX 1
    else
      fieldDef += `.default(${field.defaultValue})`

    if (field.required)
      fieldDef += '.notNull()'
  }

  // FIX 2: Handle onUpdate
  if (typeof field.onUpdate === 'function' && field.type === 'date')
    fieldDef += `.$onUpdate(${field.onUpdate})`

  return `${fieldName}: ${fieldDef}`
}

// Test fields
const createdAt = {
  type: 'date',
  required: true,
  defaultValue: () => new Date()
}

const updatedAt = {
  type: 'date',
  required: true,
  onUpdate: () => new Date()
}

console.log('=== BUGGY VERSION (current published) ===')
console.log(generateFieldBuggy('createdAt', createdAt))
console.log(generateFieldBuggy('updatedAt', updatedAt))

console.log('\n=== FIXED VERSION (with PR #9 + onUpdate fix) ===')
console.log(generateFieldFixed('createdAt', createdAt))
console.log(generateFieldFixed('updatedAt', updatedAt))

console.log('\n--- Bug Analysis ---')
const buggyCreated = generateFieldBuggy('createdAt', createdAt)
const buggyUpdated = generateFieldBuggy('updatedAt', updatedAt)

if (buggyCreated.includes('.default(() =>')) {
  console.log('❌ BUG 1: defaultValue uses .default() instead of .$defaultFn()')
}
if (!buggyUpdated.includes('$onUpdate')) {
  console.log('❌ BUG 2: onUpdate is completely ignored')
}

const fixedCreated = generateFieldFixed('createdAt', createdAt)
const fixedUpdated = generateFieldFixed('updatedAt', updatedAt)

console.log('\n--- Fix Verification ---')
if (fixedCreated.includes('.$defaultFn(')) {
  console.log('✅ FIX 1: defaultValue now uses .$defaultFn()')
}
if (fixedUpdated.includes('.$onUpdate(')) {
  console.log('✅ FIX 2: onUpdate now uses .$onUpdate()')
}
