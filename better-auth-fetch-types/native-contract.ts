import { useFetch, useLazyFetch } from 'nuxt/app'

const request = await useFetch('/api/report')
const lazy = await useLazyFetch('/api/report')
const fatal: boolean | undefined = request.error.value?.fatal
const unhandled: boolean | undefined = lazy.error.value?.unhandled
void fatal
void unhandled
