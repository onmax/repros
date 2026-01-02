// Reproduction of PR #20 invalid TypeScript indexed access patterns
// Issue: https://github.com/onmax/nuxt-better-auth/issues/21

interface SignOutOptions { onSuccess?: () => void | Promise<void> }

// Return type interface (valid)
interface UseUserSessionReturn {
  signOut: (options?: SignOutOptions) => Promise<unknown>
  fetchSession: (options?: { headers?: HeadersInit, force?: boolean }) => Promise<void>
  updateUser: (updates: { name?: string }) => void
}

// INVALID: TypeScript cannot access function parameter names via indexed access
// These patterns from PR #20 will cause TS2339 errors
function updateUser(updates: UseUserSessionReturn['updateUser']['updates']) {
  console.log(updates)
}

async function fetchSession(options: UseUserSessionReturn['fetchSession']['options'] = {}) {
  console.log(options)
}

async function signOut(options?: UseUserSessionReturn['signOut']['options']) {
  console.log(options)
}

export function useUserSession(): UseUserSessionReturn {
  return { updateUser, fetchSession, signOut }
}
