import { confirm } from "@ui-sdk/web"
import "@ui-sdk/web/dialog"
import "@ui-sdk/web/alert-dialog"
import "@ui-sdk/web/overlays"

const ask = async () => {
  const yes = await confirm({
    title: "Discard changes?",
    confirmLabel: "Discard",
    cancelLabel: "Keep editing",
  })
  document.querySelector("output").textContent = yes ? "discarded" : "kept"
}
document.querySelector("#ask-page").addEventListener("click", ask)
document.querySelector("#ask-dialog").addEventListener("click", ask)
