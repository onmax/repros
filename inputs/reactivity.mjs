import { isRef } from '@vue/reactivity'

export const describe = value => isRef(value) ? 'ref' : 'plain'
