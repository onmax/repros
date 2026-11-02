// Maps a .txt file to a module whose default export is its text.
const results = {
  initialize: () => ({ protocolVersion: 1, positionEncoding: "utf-16", diagnosticSource: "txt" }),
  openProject: () => ({}),
  closeProject: () => null,
  transform: ({ content }) => ({ text: `export default ${JSON.stringify(content)};\n`, extension: ".mts" }),
};

let input = Buffer.alloc(0);
process.stdin.on("data", (chunk) => {
  input = Buffer.concat([input, chunk]);
  for (let end; (end = input.indexOf("\r\n\r\n")) >= 0; ) {
    const length = Number(/content-length: *(\d+)/i.exec(input.toString("latin1", 0, end))[1]);
    if (input.length < end + 4 + length) return;
    const { id, method, params } = JSON.parse(input.toString("utf8", end + 4, end + 4 + length));
    input = input.subarray(end + 4 + length);
    if (id === undefined) continue;
    const body = JSON.stringify({ jsonrpc: "2.0", id, result: results[method](params) });
    process.stdout.write(`Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`);
  }
});
