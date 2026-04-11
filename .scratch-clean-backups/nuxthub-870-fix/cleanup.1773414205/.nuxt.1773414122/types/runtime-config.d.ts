import { RuntimeConfig as UserRuntimeConfig, PublicRuntimeConfig as UserPublicRuntimeConfig } from 'nuxt/schema'
  interface SharedRuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },

   hub: {
      dir: string,

      hosting: string,

      blob: {
         driver: string,

         binding: string,

         bucketName: string,
      },

      cache: {
         binding: string,

         driver: string,

         namespaceId: string,
      },

      db: {
         migrationsDirs: Array<string>,

         queriesPaths: Array<any>,

         applyMigrationsDuringBuild: boolean,

         applyMigrationsDuringDev: boolean,

         dialect: string,

         driver: string,

         connection: {
            databaseId: string,
         },
      },

      kv: {
         binding: string,

         driver: string,

         namespaceId: string,
      },
   },
  }
  interface SharedPublicRuntimeConfig {
   hub: any,
  }
declare module '@nuxt/schema' {
  interface RuntimeConfig extends UserRuntimeConfig {}
  interface PublicRuntimeConfig extends UserPublicRuntimeConfig {}
}
declare module 'nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }