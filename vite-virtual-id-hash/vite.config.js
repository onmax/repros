// A plugin with two virtual modules. The only difference is the `#` in the resolved id.
const ids = {
  "virtual:with-hash": "\0#app/abilities",
  "virtual:no-hash": "\0virtual:app/abilities",
};

export default {
  plugins: [
    {
      name: "virtual-ids",
      resolveId(id) {
        return ids[id];
      },
      load(id) {
        if (Object.values(ids).includes(id)) return `export default ${JSON.stringify(id.slice(1))};`;
      },
    },
  ],
};
