import { createElement as h } from "react"
import { flushSync } from "react-dom"
import { createRoot } from "react-dom/client"
import { Radio, RadioGroup } from "@ui-sdk/react/radio"
import { Checkbox, CheckboxGroup } from "@ui-sdk/react/checkbox"
import { checkPattern } from "@ui-sdk/core/testing"

const radio = createRoot(document.getElementById("radio"))
const checkbox = createRoot(document.getElementById("checkbox"))
flushSync(() => {
  radio.render(
    h(RadioGroup, { "aria-label": "Shipping speed", defaultValue: "standard" },
      h(Radio, { value: "standard" }, "Standard"),
      h(Radio, { value: "express" }, "Express"))
  )
  checkbox.render(
    h(CheckboxGroup, { "aria-label": "Toppings" },
      h("label", null, h(Checkbox, { value: "cheese" }), "Cheese"),
      h("label", null, h(Checkbox, { value: "ham" }), "Ham"))
  )
})

window.check = async (id, pattern) => {
  try {
    await checkPattern(document.getElementById(id), pattern)
    return "PASS"
  } catch (error) {
    return error.message
  }
}
