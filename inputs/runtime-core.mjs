import { hasInjectionContext } from '@vue/runtime-core'

export const canInject = () => hasInjectionContext()
