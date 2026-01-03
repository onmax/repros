// Fixed version - uses inline types instead of invalid indexed access

interface SignOutOptions { onSuccess?: () => void | Promise<void> }

export interface UseUserSessionReturn {
  signOut: (options?: SignOutOptions) => Promise<unknown>
  fetchSession: (options?: { headers?: HeadersInit, force?: boolean }) => Promise<void>
  updateUser: (updates: { name?: string }) => void
}

// FIXED: Use original inline types
function updateUser(updates: { name?: string }) {
  console.log(updates)
}

async function fetchSession(options: { headers?: HeadersInit, force?: boolean } = {}) {
  console.log(options)
}

async function signOut(options?: SignOutOptions) {
  console.log(options)
}
