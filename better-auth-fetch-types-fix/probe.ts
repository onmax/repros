import { useFetch, useLazyFetch } from 'nuxt/app'
useFetch('/api/report', { method: 'NOT_A_METHOD' })
useLazyFetch('/api/report', { immediate: 'yes' })
useFetch('/api/report').nonexistent().anything
