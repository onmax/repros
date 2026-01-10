export default defineAppConfig({
  ui: {
    // These work fine - components already use slots structure
    card: {slots: {root: 'bg-red-500'}},
    button: {slots: {base: 'font-bold'}},

    // These cause TypeScript errors - components use flat base structure
    container: {slots: {base: 'max-w-lg'}},  // TS Error
    skeleton: {slots: {base: 'rounded-xl'}},  // TS Error
    form: {slots: {base: 'space-y-4'}}        // TS Error
  }
})
