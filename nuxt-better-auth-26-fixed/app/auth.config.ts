// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - better-auth peer dep
import { createAuthClient } from 'better-auth/client'

export const createAppAuthClient = () => createAuthClient({})
