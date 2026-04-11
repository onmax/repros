import { computed, ref } from 'vue'

export function useSharedSignal() {
  const count = ref(1)
  const label = computed(() => `shared-signal-${count.value}`)
  return { count, label }
}
