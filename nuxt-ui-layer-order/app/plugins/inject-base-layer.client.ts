/**
 * Simulates a 3rd-party library (e.g. vue-tailwind-datepicker) injecting
 * its own @layer base form resets into <head> via a separate <style> tag.
 *
 * This is the trigger: a separate stylesheet adding @layer base rules
 * will override @layer components when the layer order is poisoned.
 */
export default defineNuxtPlugin(() => {
  const style = document.createElement('style')
  style.setAttribute('data-source', 'simulated-3rd-party')
  style.textContent = `
    @layer base {
      input {
        border-radius: 0;
        border: 1px solid red;
      }
    }
  `
  document.head.appendChild(style)
})
