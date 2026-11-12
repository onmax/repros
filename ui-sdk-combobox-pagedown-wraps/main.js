import "@ui-sdk/web/combobox"
import "@ui-sdk/web/select"

// Twelve items, Item 1 to Item 12, in both lists.
const items = (tag) =>
  Array.from({ length: 12 }, (_, i) => `<${tag} value="${i + 1}">Item ${i + 1}</${tag}>`).join("")
document.querySelector("ui-combobox-list").innerHTML = items("ui-combobox-item")
document.querySelector("ui-select-content").innerHTML = items("ui-select-item")
