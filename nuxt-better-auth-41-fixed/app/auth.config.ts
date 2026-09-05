import { organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/client'

export const createAppAuthClient = (baseURL: string) => createAuthClient({ baseURL, plugins: [organizationClient()] })
