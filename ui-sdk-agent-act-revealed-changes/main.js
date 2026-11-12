import { createElement as h } from "react"
import { createRoot } from "react-dom/client"
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@ui-sdk/react/accordion"
import { Input } from "@ui-sdk/react/input"
import { createAgent } from "@ui-sdk/react/agent"

createRoot(document.getElementById("root")).render(
  h(Accordion, null,
    h(AccordionItem, { value: "billing" },
      h(AccordionHeader, null, h(AccordionTrigger, null, "Billing")),
      h(AccordionPanel, null, h(Input, { "aria-label": "Card holder", defaultValue: "" }))))
)

const agent = createAgent()
const subscribed = []
agent.subscribe((change) => subscribed.push(change))
Object.assign(window, { agent, subscribed })
