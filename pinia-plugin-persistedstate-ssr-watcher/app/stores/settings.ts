import { defineStore } from 'pinia'

// One object for the whole server process, the way a module-level default would be.
const sharedFilters = { status: 'open', tags: ['a', 'b'] }

const fresh = () => ({ filters: { status: 'open', tags: ['a', 'b'] } })
const shared = () => ({ filters: sharedFilters })

export const stores = {
  'fresh-persist': defineStore('fresh-persist', { state: fresh, persist: true }),
  'shared-persist': defineStore('shared-persist', { state: shared, persist: true }),
  'fresh-plain': defineStore('fresh-plain', { state: fresh }),
  'shared-plain': defineStore('shared-plain', { state: shared }),
}
