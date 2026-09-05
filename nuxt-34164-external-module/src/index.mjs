import { computed, ref } from 'vue'

export function useExternalSignal() {
  const n = ref(1)
  const label = computed(() => `external-signal-${n.value}`)
  return { n, label }
}
