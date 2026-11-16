// Like a dependency that locates a file next to its own module when it loads
export const fontUrl = new URL("./font.woff2", import.meta.url).href;
