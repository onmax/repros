// Simplified reproduction of PR #20 TypeScript issue
// This uses the INVALID indexed access pattern from the PR

interface SignOutOptions { onSuccess?: () => void | Promise<void> }

interface UseUserSessionReturn {
  signOut: (options?: SignOutOptions) => Promise<unknown>
  fetchSession: (options?: { headers?: HeadersInit, force?: boolean }) => Promise<void>
  updateUser: (updates: { name?: string }) => void
}

// These patterns are INVALID - function types don't expose parameter names
function updateUser(updates: UseUserSessionReturn['updateUser']['updates']) {
  console.log(updates)
}

async function fetchSession(options: UseUserSessionReturn['fetchSession']['options'] = {}) {
  console.log(options)
}

async function signOut(options?: UseUserSessionReturn['signOut']['options']) {
  console.log(options)
}
