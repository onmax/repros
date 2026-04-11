declare module 'nitro/types' {
  interface NitroRouteConfig {
    appMiddleware?: string | string[] | Record<string, boolean>
  }
}
declare module 'nitro' {
  interface NitroRouteConfig {
    appMiddleware?: string | string[] | Record<string, boolean>
  }
}
export {}