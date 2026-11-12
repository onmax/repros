import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@ui-sdk/react/select"
import { useState } from "react"
import { createRoot } from "react-dom/client"

// One text field and a sort choice, with no submit button. With ?native the
// choice is a <select>; otherwise it is ui-sdk's Select.
const native = new URLSearchParams(location.search).has("native")

function App() {
  const [submitted, setSubmitted] = useState("")
  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(new URLSearchParams(new FormData(event.currentTarget)).toString())
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input name="q" aria-label="Query" />
        {native ? (
          <select name="sort" aria-label="Sort" defaultValue="new">
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
          </select>
        ) : (
          <Select name="sort" defaultValue="new">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="new"><SelectItemText>Newest</SelectItemText></SelectItem>
              <SelectItem value="old"><SelectItemText>Oldest</SelectItemText></SelectItem>
            </SelectContent>
          </Select>
        )}
      </form>
      <output>{submitted}</output>
    </>
  )
}

createRoot(document.getElementById("root")).render(<App />)
