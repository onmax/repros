// adds OCEAN_NOOP unfiltered no-op plugins on hook OCEAN_NOOP_HOOK (default transform), to price a JS hook without a native filter
export default function noop (_: unknown, nuxt: any) {
  const n = Number(process.env.OCEAN_NOOP || 0)
  if (!n) return
  const hook = process.env.OCEAN_NOOP_HOOK || 'transform'
  nuxt.hook('vite:extendConfig', (config: any) => {
    for (let i = 0; i < n; i++) {
      config.plugins.push({ name: `ocean:noop-${i}`, [hook] (code: unknown) { if (typeof code === 'number') return null } })
    }
  })
}
