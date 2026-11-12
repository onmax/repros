import { checkPattern } from "@ui-sdk/core/testing"

// Each id is also the pattern name checked on it.
window.results = (async () => {
  const results = {}
  for (const id of ["checkbox", "slider", "radio-group"]) {
    try {
      await checkPattern(document.getElementById(id), id)
      results[id] = "PASS"
    } catch (error) {
      results[id] = error.message
    }
  }
  return results
})()
