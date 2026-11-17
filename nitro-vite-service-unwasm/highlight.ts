import { codeToHtml } from "shiki";

export const highlight = () => codeToHtml("const a = 1", { lang: "js", theme: "vitesse-dark" });
