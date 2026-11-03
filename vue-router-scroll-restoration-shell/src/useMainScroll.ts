import { useScrollRestoration } from 'vue-router/experimental'

// The app shell's <main> scrolls, the window doesn't
export function useMainScroll() {
  useScrollRestoration({
    capture: () => ({ default: { top: document.querySelector('main')!.scrollTop } }),
    restore: (entry) => {
      document.querySelector('main')!.scrollTop = entry?.default?.top ?? 0
    },
  })
}
