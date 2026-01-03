import { admin as adminPlugin } from 'better-auth/plugins'
import type { Role, Statements } from 'better-auth/plugins/access'
import { createAccessControl } from 'better-auth/plugins/access'
import { adminAc, defaultStatements, userAc } from 'better-auth/plugins/admin/access'
import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

type RoleName = 'user' | 'founder' | 'admin'

const statements = {
  ...defaultStatements,
} as const

const accessControl = createAccessControl(statements)

const roles: Record<RoleName, Role<Statements>> = {
  user: accessControl.newRole(userAc.statements),
  founder: accessControl.newRole(userAc.statements),
  admin: accessControl.newRole(adminAc.statements),
}

export default defineServerAuth((ctx) => {
  const config = ctx.runtimeConfig || {}

  return {
    appName: 'Auth Test',
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
      autoSignIn: true,
    },
    session: {
      cookieCache: { enabled: true, maxAge: 5 * 60 },
    },
    plugins: [
      adminPlugin({ ac: accessControl, roles }),
    ],
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const admins = config.admins as string[]
            if (admins?.includes(user.email))
              return { data: { ...user, role: 'admin' } }
            return { data: user }
          },
        },
      },
    },
  }
})
