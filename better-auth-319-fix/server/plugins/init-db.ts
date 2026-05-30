import { hashPassword } from 'better-auth/crypto'
import { db } from '@nuxthub/db'

const adminUser = {
  id: 'repro-admin-318',
  name: 'Admin Repro 318',
  email: 'admin318@example.com',
  role: 'admin',
  password: 'password123',
}

const regularUser = {
  id: 'repro-user-318',
  name: 'Regular Repro 318',
  email: 'user318@example.com',
  role: 'user',
  password: 'password123',
}

async function createTables() {
  await db.run(`CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    emailVerified INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    role TEXT,
    banned INTEGER DEFAULT 0,
    banReason TEXT,
    banExpires INTEGER
  )`)

  await db.run(`CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY NOT NULL,
    expiresAt INTEGER NOT NULL,
    token TEXT NOT NULL UNIQUE,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    ipAddress TEXT,
    userAgent TEXT,
    userId TEXT NOT NULL REFERENCES user(id),
    impersonatedBy TEXT
  )`)

  await db.run(`CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY NOT NULL,
    accountId TEXT NOT NULL,
    providerId TEXT NOT NULL,
    userId TEXT NOT NULL REFERENCES user(id),
    accessToken TEXT,
    refreshToken TEXT,
    idToken TEXT,
    accessTokenExpiresAt INTEGER,
    refreshTokenExpiresAt INTEGER,
    scope TEXT,
    password TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  )`)

  await db.run(`CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY NOT NULL,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expiresAt INTEGER NOT NULL,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  )`)
}

async function seedUser(user: typeof adminUser) {
  const now = Date.now()
  const passwordHash = await hashPassword(user.password)

  await db.run(`DELETE FROM session WHERE userId = '${user.id}'`)
  await db.run(`DELETE FROM account WHERE userId = '${user.id}'`)
  await db.run(`DELETE FROM user WHERE id = '${user.id}'`)

  await db.run(`INSERT INTO user (
    id,
    name,
    email,
    emailVerified,
    image,
    createdAt,
    updatedAt,
    role,
    banned,
    banReason,
    banExpires
  ) VALUES (
    '${user.id}',
    '${user.name}',
    '${user.email}',
    1,
    NULL,
    ${now},
    ${now},
    '${user.role}',
    0,
    NULL,
    NULL
  )`)

  await db.run(`INSERT INTO account (
    id,
    accountId,
    providerId,
    userId,
    accessToken,
    refreshToken,
    idToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
    scope,
    password,
    createdAt,
    updatedAt
  ) VALUES (
    '${user.id}-credential',
    '${user.id}',
    'credential',
    '${user.id}',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '${passwordHash}',
    ${now},
    ${now}
  )`)
}

export default defineNitroPlugin(async () => {
  await createTables()
  await seedUser(adminUser)
  await seedUser(regularUser)
})
