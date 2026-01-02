// Fixed version - uses inline types instead of invalid indexed access
// Issue: https://github.com/onmax/nuxt-better-auth/issues/21

interface SignOutOptions { onSuccess?: () => void | Promise<void> }

// Return type interface - now exported for consumer use
export interface UseUserSessionReturn {
  signOut: (options?: SignOutOptions) => Promise<unknown>
  fetchSession: (options?: { headers?: HeadersInit, force?: boolean }) => Promise<void>
  updateUser: (updates: { name?: string }) => void
}

// FIXED: Use original inline types instead of invalid indexed access
function updateUser(updates: { name?: string }) {
  console.log(updates)
}

async function fetchSession(options: { headers?: HeadersInit, force?: boolean } = {}) {
  console.log(options)
}

async function signOut(options?: SignOutOptions) {
  console.log(options)
}

export function useUserSession(): UseUserSessionReturn {
  return { updateUser, fetchSession, signOut }
}
