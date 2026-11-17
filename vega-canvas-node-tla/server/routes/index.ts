import { canvas } from "vega-canvas";

// Without the optional `canvas` package, the Node build returns null.
export default () => ({ canvas: canvas(10, 10) });
