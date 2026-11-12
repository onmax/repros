import { Input } from "@ui-sdk/react/input"
import { createRoot } from "react-dom/client"

createRoot(document.getElementById("app")).render(<Input value="abc" aria-label="Fixed input" />)
