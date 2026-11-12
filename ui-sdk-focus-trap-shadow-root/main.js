import "@ui-sdk/web/dialog"

// A custom element whose only content is a button in an open shadow root.
customElements.define(
  "shadow-button",
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: "open" }).innerHTML = "<button>Last</button>"
    }
  }
)
