import { createAuthClient } from 'better-auth/client'

// External auth server URL - would be configured via env in production
export function createAppAuthClient(baseURL: string) {
  return createAuthClient({
    baseURL: 'https://my-external-auth-server.com', // External Better Auth server
  })
}
