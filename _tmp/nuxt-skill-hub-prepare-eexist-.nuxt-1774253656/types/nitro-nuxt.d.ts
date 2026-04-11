
/// <reference path="nitro-layouts.d.ts" />
/// <reference path="app.config.d.ts" />
/// <reference path="runtime-config.d.ts" />
/// <reference path="../../node_modules/.pnpm/@nuxt+nitro-server-nightly@5.0.0-29569729.37112d05_@babel+core@7.29.0_chokidar@5.0.0_db_e8c6e6aca5408e6ec7c92f506e626c93/node_modules/@nuxt/nitro-server-nightly/dist/index.d.mts" />
/// <reference path="middleware.d.ts" />

import type { RuntimeConfig } from 'nuxt/schema'
import type { H3Event } from 'nitro/h3'
import type { LogObject } from 'consola'
import type { NuxtIslandContext, NuxtIslandResponse, NuxtRenderHTMLContext } from 'nuxt/app'

declare module 'nitro/types' {
  interface NitroRuntimeConfigApp {
    baseURL: string
    buildAssetsDir: string
    cdnURL: string
  }
  interface NitroRuntimeConfig extends RuntimeConfig {}
  interface NitroRouteConfig {
    ssr?: boolean
    noScripts?: boolean
    /** @deprecated Use `noScripts` instead */
    experimentalNoScripts?: boolean
  }
  interface NitroRouteRules {
    ssr?: boolean
    noScripts?: boolean
    /** @deprecated Use `noScripts` instead */
    experimentalNoScripts?: boolean
    appMiddleware?: Record<string, boolean>
    appLayout?: string | false
  }
  interface NitroRuntimeHooks {
    'dev:ssr-logs': (ctx: { logs: LogObject[], path: string }) => void | Promise<void>
    'render:html': (htmlContext: NuxtRenderHTMLContext, context: { event: H3Event }) => void | Promise<void>
    'render:island': (islandResponse: NuxtIslandResponse, context: { event: H3Event, islandContext: NuxtIslandContext }) => void | Promise<void>
  }
}
