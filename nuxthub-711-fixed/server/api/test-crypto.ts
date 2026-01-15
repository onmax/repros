import { createHash, scrypt, randomBytes } from 'node:crypto'

export default eventHandler(async () => {
  // Test 1: createHash
  const hash = createHash('sha256').update('test').digest('hex')

  // Test 2: scrypt (what nuxt-auth-utils uses)
  const salt = randomBytes(16)
  const derived = await new Promise<Buffer>((resolve, reject) => {
    scrypt('password', salt, 64, (err, key) => {
      if (err) reject(err)
      else resolve(key)
    })
  })

  return {
    hash,
    derived: derived.toString('hex'),
    success: true
  }
})
