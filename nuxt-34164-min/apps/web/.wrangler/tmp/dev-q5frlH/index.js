var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn3, res) => function __init() {
  return fn3 && (res = (0, fn3[__getOwnPropNames(fn3)[0]])(fn3 = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// .output/server/chunks/_/error-500.mjs
var error_500_exports = {};
__export(error_500_exports, {
  template: () => template
});
function escapeHtml(t5) {
  const n2 = "" + t5, r2 = e.exec(n2);
  if (!r2) return n2;
  let a3, o4, i3 = "", s2 = 0;
  for (o4 = r2.index; o4 < n2.length; o4++) {
    switch (n2.charCodeAt(o4)) {
      case 34:
        a3 = "&quot;";
        break;
      case 38:
        a3 = "&amp;";
        break;
      case 39:
        a3 = "&#39;";
        break;
      case 60:
        a3 = "&lt;";
        break;
      case 62:
        a3 = "&gt;";
        break;
      default:
        continue;
    }
    s2 !== o4 && (i3 += n2.slice(s2, o4)), s2 = o4 + 1, i3 += a3;
  }
  return s2 !== o4 ? i3 + n2.slice(s2, o4) : i3;
}
var e, t, template;
var init_error_500 = __esm({
  ".output/server/chunks/_/error-500.mjs"() {
    init_modules_watch_stub();
    e = /["'&<>]/;
    __name(escapeHtml, "escapeHtml");
    t = { appName: "Nuxt", status: 500, statusText: "Internal server error", description: "This page is temporarily unavailable.", refresh: "Refresh this page" };
    template = /* @__PURE__ */ __name((e6) => '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml((e6 = { ...t, ...e6 }).status) + " - " + escapeHtml(e6.statusText) + " | " + escapeHtml(e6.appName) + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide"><div class="max-w-520px text-center"><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]">` + escapeHtml(e6.status) + '</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl">' + escapeHtml(e6.statusText) + '</h2><p class="mb-4 px-2 text-[#64748B] text-md">' + escapeHtml(e6.description) + "</p></div></body></html>", "template");
  }
});

// .output/server/chunks/build/client.precomputed.mjs
var client_precomputed_exports = {};
__export(client_precomputed_exports, {
  default: () => e2
});
var e2, d, c;
var init_client_precomputed = __esm({
  ".output/server/chunks/build/client.precomputed.mjs"() {
    init_modules_watch_stub();
    e2 = { dependencies: { "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js": { scripts: { "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js": d = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BTqPzmk2.js", name: "entry", src: "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js", isEntry: true, dynamicImports: ["../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue", "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue"] } }, styles: {}, preload: { "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js": d }, prefetch: {} }, "_BBZZVuET.js": { scripts: {}, styles: {}, preload: { "_BBZZVuET.js": c = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BBZZVuET.js", name: "composables", imports: ["../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js"] }, "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js": d }, prefetch: {} }, "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue": { scripts: {}, styles: {}, preload: { "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CIJsWTnQ.js", name: "error-404", src: "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue", isDynamicEntry: true, imports: ["../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js", "_BBZZVuET.js"], css: [] }, "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js": d, "_BBZZVuET.js": c }, prefetch: {} }, "error-404.Btpa_ZZN.css": { scripts: {}, styles: {}, preload: { "error-404.Btpa_ZZN.css": { file: "error-404.Btpa_ZZN.css", resourceType: "style", prefetch: true, preload: true } }, prefetch: {} }, "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue": { scripts: {}, styles: {}, preload: { "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "CoNRh71c.js", name: "error-500", src: "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue", isDynamicEntry: true, imports: ["../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js", "_BBZZVuET.js"], css: [] }, "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js": d, "_BBZZVuET.js": c }, prefetch: {} }, "error-500.DEOd0G-X.css": { scripts: {}, styles: {}, preload: { "error-500.DEOd0G-X.css": { file: "error-500.DEOd0G-X.css", resourceType: "style", prefetch: true, preload: true } }, prefetch: {} }, "pages/index.vue": { scripts: {}, styles: {}, preload: { "pages/index.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "Dt7RoMyG.js", name: "index", src: "pages/index.vue", isDynamicEntry: true, imports: ["../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js"] }, "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js": d }, prefetch: {} } }, entrypoints: ["../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js"], modules: { "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue": { file: "CIJsWTnQ.js", resourceType: "script", mimeType: void 0, module: true }, "error-404.Btpa_ZZN.css": { file: "error-404.Btpa_ZZN.css", resourceType: "style", mimeType: void 0, module: void 0 }, "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue": { file: "CoNRh71c.js", resourceType: "script", mimeType: void 0, module: true }, "error-500.DEOd0G-X.css": { file: "error-500.DEOd0G-X.css", resourceType: "style", mimeType: void 0, module: void 0 }, "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/entry.js": { file: "BTqPzmk2.js", resourceType: "script", mimeType: void 0, module: true }, "_BBZZVuET.js": { file: "BBZZVuET.js", resourceType: "script", mimeType: void 0, module: true }, "pages/index.vue": { file: "Dt7RoMyG.js", resourceType: "script", mimeType: void 0, module: true } } };
  }
});

// .output/server/chunks/build/index-BmED2LNb.mjs
var index_BmED2LNb_exports = {};
__export(index_BmED2LNb_exports, {
  default: () => n
});
var o, t2, n;
var init_index_BmED2LNb = __esm({
  ".output/server/chunks/build/index-BmED2LNb.mjs"() {
    init_modules_watch_stub();
    init_renderer();
    init_server();
    init_nitro();
    o = {};
    t2 = o.setup;
    o.setup = (e6, s2) => {
      const o4 = useSSRContext();
      return (o4.modules || (o4.modules = /* @__PURE__ */ new Set())).add("pages/index.vue"), t2 ? t2(e6, s2) : void 0;
    };
    n = _export_sfc(o, [["ssrRender", function(r2, s2, o4, t5) {
      s2(`<div${ssrRenderAttrs(t5)}>nuxt-34164 minimal repro</div>`);
    }]]);
  }
});

// .output/server/chunks/build/composables-DDApAxS4.mjs
function useHead2(a3, o4 = {}) {
  const u3 = o4.head || (function(r2) {
    const a4 = r2 || useNuxtApp();
    return a4.ssrContext?.head || a4.runWithContext(() => {
      if (hasInjectionContext()) {
        const e6 = inject(Zt);
        if (!e6) throw new Error("[nuxt] [unhead] Missing Unhead instance.");
        return e6;
      }
    });
  })(o4.nuxt);
  return useHead(a3, { head: u3, ...o4 });
}
var init_composables_DDApAxS4 = __esm({
  ".output/server/chunks/build/composables-DDApAxS4.mjs"() {
    init_modules_watch_stub();
    init_server();
    init_renderer();
    __name(useHead2, "useHead");
  }
});

// .output/server/chunks/build/error-404-CN4UAoxx.mjs
var error_404_CN4UAoxx_exports = {};
__export(error_404_CN4UAoxx_exports, {
  default: () => _
});
function defineNuxtLink(a3) {
  const n2 = a3.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(e6) {
    return "string" == typeof e6 && e6.startsWith("#");
  }
  __name(isHashLinkWithoutHashMode, "isHashLinkWithoutHashMode");
  function useNuxtLink(e6) {
    const n3 = useRouter(), i3 = useRuntimeConfig(), s2 = computed(() => !!e6.target && "_self" !== e6.target), c3 = computed(() => {
      const t5 = e6.to || e6.href || "";
      return "string" == typeof t5 && hasProtocol(t5, { acceptRelative: true });
    }), p2 = resolveComponent("RouterLink"), f2 = p2 && "string" != typeof p2 ? p2.useLink : void 0, v3 = computed(() => {
      if (e6.external) return true;
      const t5 = e6.to || e6.href || "";
      return "object" != typeof t5 && ("" === t5 || c3.value);
    }), h3 = computed(() => {
      const t5 = e6.to || e6.href || "";
      return v3.value ? t5 : (function(e7, t6, r2) {
        const n4 = r2 ?? a3.trailingSlash;
        if (!e7 || "append" !== n4 && "remove" !== n4) return e7;
        if ("string" == typeof e7) return applyTrailingSlashBehavior(e7, n4);
        const i4 = "path" in e7 && void 0 !== e7.path ? e7.path : t6(e7).path;
        return { ...e7, name: void 0, path: applyTrailingSlashBehavior(i4, n4) };
      })(t5, n3.resolve, e6.trailingSlash);
    }), m3 = v3.value ? void 0 : f2?.({ ...e6, to: h3 }), g3 = computed(() => {
      const r2 = e6.trailingSlash ?? a3.trailingSlash;
      if (!h3.value || c3.value || isHashLinkWithoutHashMode(h3.value)) return h3.value;
      if (v3.value) {
        const e7 = "object" == typeof h3.value && "path" in h3.value ? resolveRouteObject(h3.value) : h3.value;
        return applyTrailingSlashBehavior("object" == typeof e7 ? n3.resolve(e7).href : e7, r2);
      }
      return "object" == typeof h3.value ? n3.resolve(h3.value)?.href ?? null : applyTrailingSlashBehavior(joinURL(i3.app.baseURL, h3.value), r2);
    });
    return { to: h3, hasTarget: s2, isAbsoluteUrl: c3, isExternal: v3, href: g3, isActive: m3?.isActive ?? computed(() => h3.value === n3.currentRoute.value.path), isExactActive: m3?.isExactActive ?? computed(() => h3.value === n3.currentRoute.value.path), route: m3?.route ?? computed(() => n3.resolve(h3.value)), async navigate(t5) {
      await navigateTo(g3.value, { replace: e6.replace, external: v3.value || s2.value });
    } };
  }
  __name(useNuxtLink, "useNuxtLink");
  return defineComponent({ name: n2, props: { to: { type: [String, Object], default: void 0, required: false }, href: { type: [String, Object], default: void 0, required: false }, target: { type: String, default: void 0, required: false }, rel: { type: String, default: void 0, required: false }, noRel: { type: Boolean, default: void 0, required: false }, prefetch: { type: Boolean, default: void 0, required: false }, prefetchOn: { type: [String, Object], default: void 0, required: false }, noPrefetch: { type: Boolean, default: void 0, required: false }, activeClass: { type: String, default: void 0, required: false }, exactActiveClass: { type: String, default: void 0, required: false }, prefetchedClass: { type: String, default: void 0, required: false }, replace: { type: Boolean, default: void 0, required: false }, ariaCurrentValue: { type: String, default: void 0, required: false }, external: { type: Boolean, default: void 0, required: false }, custom: { type: Boolean, default: void 0, required: false }, trailingSlash: { type: String, default: void 0, required: false } }, useLink: useNuxtLink, setup(t5, { slots: r2 }) {
    const n3 = useRouter(), { to: i3, href: u3, navigate: l2, isExternal: d3, hasTarget: c3, isAbsoluteUrl: p2 } = useNuxtLink(t5);
    async function prefetch(e6 = useNuxtApp()) {
    }
    __name(prefetch, "prefetch");
    return () => {
      if (!d3.value && !c3.value && !isHashLinkWithoutHashMode(i3.value)) {
        const e6 = { ref: void 0, to: i3.value, activeClass: t5.activeClass || a3.activeClass, exactActiveClass: t5.exactActiveClass || a3.exactActiveClass, replace: t5.replace, ariaCurrentValue: t5.ariaCurrentValue, custom: t5.custom };
        return t5.custom || (e6.rel = t5.rel || void 0), h(resolveComponent("RouterLink"), e6, r2.default);
      }
      const o4 = t5.target || null, s2 = ((...e6) => e6.find((e7) => void 0 !== e7))(t5.noRel ? "" : t5.rel, a3.externalRelAttribute, p2.value || c3.value ? "noopener noreferrer" : "") || null;
      return t5.custom ? r2.default ? r2.default({ href: u3.value, navigate: l2, prefetch, get route() {
        if (!u3.value) return;
        const t6 = new URL(u3.value, "http://localhost");
        return { path: t6.pathname, fullPath: t6.pathname, get query() {
          return parseQuery(t6.search);
        }, hash: t6.hash, params: {}, name: void 0, matched: [], redirectedFrom: void 0, meta: {}, href: u3.value };
      }, rel: s2, target: o4, isExternal: d3.value || c3.value, isActive: false, isExactActive: false }) : null : h("a", { ref: void 0, href: u3.value || null, rel: s2, target: o4, onClick: /* @__PURE__ */ __name((e6) => {
        if (!d3.value && !c3.value) return e6.preventDefault(), t5.replace ? n3.replace(u3.value) : n3.push(u3.value);
      }, "onClick") }, r2.default?.());
    };
  } });
}
function applyTrailingSlashBehavior(e6, t5) {
  const i3 = "append" === t5 ? withTrailingSlash : withoutTrailingSlash;
  return hasProtocol(e6) && !e6.startsWith("http") ? e6 : i3(e6, true);
}
var q, A, C, _;
var init_error_404_CN4UAoxx = __esm({
  ".output/server/chunks/build/error-404-CN4UAoxx.mjs"() {
    init_modules_watch_stub();
    init_nitro();
    init_server();
    init_renderer();
    init_composables_DDApAxS4();
    __name(defineNuxtLink, "defineNuxtLink");
    q = defineNuxtLink(z);
    __name(applyTrailingSlashBehavior, "applyTrailingSlashBehavior");
    A = { __name: "error-404", __ssrInlineRender: true, props: { appName: { type: String, default: "Nuxt" }, status: { type: Number, default: 404 }, statusText: { type: String, default: "Page not found" }, description: { type: String, default: "Sorry, the page you are looking for could not be found." }, backHome: { type: String, default: "Go back home" } }, setup(e6) {
      const t5 = e6;
      return useHead2({ title: `${t5.status} - ${t5.statusText} | ${t5.appName}`, script: [{ innerHTML: `!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();` }], style: [{ innerHTML: '*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }' }] }), (t6, r2, a3, n2) => {
        const i3 = q;
        r2(`<div${ssrRenderAttrs(mergeProps({ class: "antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide" }, n2))} data-v-3ff5756b><div class="max-w-520px text-center" data-v-3ff5756b><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]" data-v-3ff5756b>${ssrInterpolate(e6.status)}</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl" data-v-3ff5756b>${ssrInterpolate(e6.statusText)}</h2><p class="mb-4 px-2 text-[#64748B] text-md" data-v-3ff5756b>${ssrInterpolate(e6.description)}</p><div class="flex items-center justify-center w-full" data-v-3ff5756b>`), r2(ssrRenderComponent(i3, { to: "/", class: "font-medium hover:text-[#00DC82] text-sm underline underline-offset-3" }, { default: withCtx((t7, r3, a4, n3) => {
          if (!r3) return [createTextVNode(toDisplayString(e6.backHome), 1)];
          r3(`${ssrInterpolate(e6.backHome)}`);
        }), _: 1 }, a3)), r2("</div></div></div>");
      };
    } };
    C = A.setup;
    A.setup = (e6, t5) => {
      const r2 = useSSRContext();
      return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue"), C ? C(e6, t5) : void 0;
    };
    _ = _export_sfc(A, [["__scopeId", "data-v-3ff5756b"]]);
  }
});

// .output/server/chunks/build/error-500-aqj5ztcB.mjs
var error_500_aqj5ztcB_exports = {};
__export(error_500_aqj5ztcB_exports, {
  default: () => u
});
var a, i, u;
var init_error_500_aqj5ztcB = __esm({
  ".output/server/chunks/build/error-500-aqj5ztcB.mjs"() {
    init_modules_watch_stub();
    init_renderer();
    init_server();
    init_composables_DDApAxS4();
    init_nitro();
    a = { __name: "error-500", __ssrInlineRender: true, props: { appName: { type: String, default: "Nuxt" }, status: { type: Number, default: 500 }, statusText: { type: String, default: "Internal server error" }, description: { type: String, default: "This page is temporarily unavailable." }, refresh: { type: String, default: "Refresh this page" } }, setup(n2) {
      const o4 = n2;
      return useHead2({ title: `${o4.status} - ${o4.statusText} | ${o4.appName}`, script: [{ innerHTML: `!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();` }], style: [{ innerHTML: '*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }' }] }), (o5, s2, a3, i3) => {
        s2(`<div${ssrRenderAttrs(mergeProps({ class: "antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide" }, i3))} data-v-e774f552><div class="max-w-520px text-center" data-v-e774f552><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]" data-v-e774f552>${ssrInterpolate(n2.status)}</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl" data-v-e774f552>${ssrInterpolate(n2.statusText)}</h2><p class="mb-4 px-2 text-[#64748B] text-md" data-v-e774f552>${ssrInterpolate(n2.description)}</p></div></div>`);
      };
    } };
    i = a.setup;
    a.setup = (e6, t5) => {
      const r2 = useSSRContext();
      return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue"), i ? i(e6, t5) : void 0;
    };
    u = _export_sfc(a, [["__scopeId", "data-v-e774f552"]]);
  }
});

// .output/server/chunks/build/server.mjs
var server_exports = {};
__export(server_exports, {
  _: () => _export_sfc,
  a: () => useNuxtApp,
  b: () => useRuntimeConfig,
  c: () => z,
  default: () => entry_default,
  n: () => navigateTo,
  r: () => resolveRouteObject,
  u: () => useRouter
});
function getNuxtAppCtx(e6 = q2) {
  return getContext(e6, { asyncContext: false });
}
function registerPluginHooks(e6, t5) {
  t5.hooks && e6.hooks.addHooks(t5.hooks);
}
function defineNuxtPlugin(e6) {
  if ("function" == typeof e6) return e6;
  const t5 = e6._name || e6.name;
  return delete e6.name, Object.assign(e6.setup || (() => {
  }), e6, { [Q]: true, _name: t5 });
}
function callWithNuxt(e6, t5, r2) {
  const fn3 = /* @__PURE__ */ __name(() => t5(), "fn"), n2 = getNuxtAppCtx(e6._id);
  return e6.vueApp.runWithContext(() => n2.callAsync(e6, fn3));
}
function useNuxtApp(e6) {
  const t5 = (function(e7) {
    let t6;
    return hasInjectionContext() && (t6 = getCurrentInstance()?.appContext.app.$nuxt), t6 ||= getNuxtAppCtx(e7).tryUse(), t6 || null;
  })(e6);
  if (!t5) throw new Error("[nuxt] instance unavailable");
  return t5;
}
function useRuntimeConfig(e6) {
  return useNuxtApp().$config;
}
function defineGetter(e6, t5, r2) {
  Object.defineProperty(e6, t5, { get: /* @__PURE__ */ __name(() => r2, "get") });
}
function defineNuxtRouteMiddleware(e6) {
  return e6;
}
function resolveRouteObject(e6) {
  return withQuery(e6.path || "", e6.query || {}) + (e6.hash || "");
}
function isRouteComponent(e6) {
  return "object" == typeof e6 || "displayName" in e6 || "props" in e6 || "__vccOpts" in e6;
}
function applyToParams(e6, t5) {
  const r2 = {};
  for (const n2 in t5) {
    const o4 = t5[n2];
    r2[n2] = te(o4) ? o4.map(e6) : e6(o4);
  }
  return r2;
}
function mergeOptions(e6, t5) {
  const r2 = {};
  for (const n2 in e6) r2[n2] = n2 in t5 ? t5[n2] : e6[n2];
  return r2;
}
function commonEncode(e6) {
  return null == e6 ? "" : encodeURI("" + e6).replace(de, "|").replace(ce, "[").replace(ue, "]");
}
function encodeQueryValue(e6) {
  return commonEncode(e6).replace(ie, "%2B").replace(me, "+").replace(re, "%23").replace(ne, "%26").replace(pe, "`").replace(fe, "{").replace(he, "}").replace(le, "^");
}
function encodeQueryKey(e6) {
  return encodeQueryValue(e6).replace(ae, "%3D");
}
function encodeParam(e6) {
  return (function(e7) {
    return commonEncode(e7).replace(re, "%23").replace(se, "%3F");
  })(e6).replace(oe, "%2F");
}
function decode(e6) {
  if (null == e6) return null;
  try {
    return decodeURIComponent("" + e6);
  } catch (e7) {
  }
  return "" + e6;
}
function parseURL(e6, t5, r2 = "/") {
  let n2, o4 = {}, a3 = "", s2 = "";
  const i3 = t5.indexOf("#");
  let c3 = t5.indexOf("?");
  return c3 = i3 >= 0 && c3 > i3 ? -1 : c3, c3 >= 0 && (n2 = t5.slice(0, c3), a3 = t5.slice(c3, i3 > 0 ? i3 : t5.length), o4 = e6(a3.slice(1))), i3 >= 0 && (n2 = n2 || t5.slice(0, i3), s2 = t5.slice(i3, t5.length)), n2 = (function(e7, t6) {
    if (e7.startsWith("/")) return e7;
    if (!e7) return t6;
    const r3 = t6.split("/"), n3 = e7.split("/"), o5 = n3[n3.length - 1];
    ".." !== o5 && "." !== o5 || n3.push("");
    let a4, s3, i4 = r3.length - 1;
    for (a4 = 0; a4 < n3.length; a4++) if (s3 = n3[a4], "." !== s3) {
      if (".." !== s3) break;
      i4 > 1 && i4--;
    }
    return r3.slice(0, i4).join("/") + "/" + n3.slice(a4).join("/");
  })(null != n2 ? n2 : t5, r2), { fullPath: n2 + a3 + s2, path: n2, query: o4, hash: decode(s2) };
}
function isSameRouteRecord(e6, t5) {
  return (e6.aliasOf || e6) === (t5.aliasOf || t5);
}
function isSameRouteLocationParams(e6, t5) {
  if (Object.keys(e6).length !== Object.keys(t5).length) return false;
  for (var r2 in e6) if (!isSameRouteLocationParamsValue(e6[r2], t5[r2])) return false;
  return true;
}
function isSameRouteLocationParamsValue(e6, t5) {
  return te(e6) ? isEquivalentArray(e6, t5) : te(t5) ? isEquivalentArray(t5, e6) : e6?.valueOf() === t5?.valueOf();
}
function isEquivalentArray(e6, t5) {
  return te(t5) ? e6.length === t5.length && e6.every((e7, r2) => e7 === t5[r2]) : 1 === e6.length && e6[0] === t5;
}
function normalizeBase(e6) {
  return e6 || (e6 = "/"), "/" !== e6[0] && "#" !== e6[0] && (e6 = "/" + e6), e6.replace(ge, "");
}
function createHref(e6, t5) {
  return e6.replace(xe, "#") + t5;
}
function isRouteName(e6) {
  return "string" == typeof e6 || "symbol" == typeof e6;
}
function createRouterError(e6, t5) {
  return ee(new Error(), { type: e6, [Ae]: true }, t5);
}
function isNavigationFailure(e6, t5) {
  return e6 instanceof Error && Ae in e6 && (null == t5 || !!(e6.type & t5));
}
function parseQuery2(e6) {
  const t5 = {};
  if ("" === e6 || "?" === e6) return t5;
  const r2 = ("?" === e6[0] ? e6.slice(1) : e6).split("&");
  for (let e7 = 0; e7 < r2.length; ++e7) {
    const n2 = r2[e7].replace(ie, " "), o4 = n2.indexOf("="), a3 = decode(o4 < 0 ? n2 : n2.slice(0, o4)), s2 = o4 < 0 ? null : decode(n2.slice(o4 + 1));
    if (a3 in t5) {
      let e8 = t5[a3];
      te(e8) || (e8 = t5[a3] = [e8]), e8.push(s2);
    } else t5[a3] = s2;
  }
  return t5;
}
function stringifyQuery(e6) {
  let t5 = "";
  for (let r2 in e6) {
    const n2 = e6[r2];
    r2 = encodeQueryKey(r2), null != n2 ? (te(n2) ? n2.map((e7) => e7 && encodeQueryValue(e7)) : [n2 && encodeQueryValue(n2)]).forEach((e7) => {
      void 0 !== e7 && (t5 += (t5.length ? "&" : "") + r2, null != e7 && (t5 += "=" + e7));
    }) : void 0 !== n2 && (t5 += (t5.length ? "&" : "") + r2);
  }
  return t5;
}
function normalizeQuery(e6) {
  const t5 = {};
  for (const r2 in e6) {
    const n2 = e6[r2];
    void 0 !== n2 && (t5[r2] = te(n2) ? n2.map((e7) => null == e7 ? null : "" + e7) : null == n2 ? n2 : "" + n2);
  }
  return t5;
}
function useCallbacks() {
  let e6 = [];
  return { add: /* @__PURE__ */ __name(function(t5) {
    return e6.push(t5), () => {
      const r2 = e6.indexOf(t5);
      r2 > -1 && e6.splice(r2, 1);
    };
  }, "add"), list: /* @__PURE__ */ __name(() => e6.slice(), "list"), reset: /* @__PURE__ */ __name(function() {
    e6 = [];
  }, "reset") };
}
function guardToPromiseFn(e6, t5, r2, n2, o4, a3 = (e7) => e7()) {
  const s2 = n2 && (n2.enterCallbacks[o4] = n2.enterCallbacks[o4] || []);
  return () => new Promise((i3, c3) => {
    const next = /* @__PURE__ */ __name((e7) => {
      var a4;
      false === e7 ? c3(createRouterError(be.NAVIGATION_ABORTED, { from: r2, to: t5 })) : e7 instanceof Error ? c3(e7) : "string" == typeof (a4 = e7) || a4 && "object" == typeof a4 ? c3(createRouterError(be.NAVIGATION_GUARD_REDIRECT, { from: t5, to: e7 })) : (s2 && n2.enterCallbacks[o4] === s2 && "function" == typeof e7 && s2.push(e7), i3());
    }, "next"), u3 = a3(() => e6.call(n2 && n2.instances[o4], t5, r2, next));
    let l2 = Promise.resolve(u3);
    e6.length < 3 && (l2 = l2.then(next)), l2.catch((e7) => c3(e7));
  });
}
function extractComponentsGuards(e6, t5, r2, n2, o4 = (e7) => e7()) {
  const a3 = [];
  for (const s2 of e6) for (const e7 in s2.components) {
    let i3 = s2.components[e7];
    if ("beforeRouteEnter" === t5 || s2.instances[e7]) if (isRouteComponent(i3)) {
      const c3 = (i3.__vccOpts || i3)[t5];
      c3 && a3.push(guardToPromiseFn(c3, r2, n2, s2, e7, o4));
    } else {
      let c3 = i3();
      a3.push(() => c3.then((a4) => {
        if (!a4) throw new Error(`Couldn't resolve component "${e7}" at "${s2.path}"`);
        const i4 = (c4 = a4).__esModule || "Module" === c4[Symbol.toStringTag] || c4.default && isRouteComponent(c4.default) ? a4.default : a4;
        var c4;
        s2.mods[e7] = a4, s2.components[e7] = i4;
        const u3 = (i4.__vccOpts || i4)[t5];
        return u3 && guardToPromiseFn(u3, r2, n2, s2, e7, o4)();
      }));
    }
  }
  return a3;
}
function createMemoryHistory(e6 = "") {
  let t5 = [], r2 = [["", {}]], n2 = 0;
  function setLocation(e7, t6 = {}) {
    n2++, n2 !== r2.length && r2.splice(n2), r2.push([e7, t6]);
  }
  __name(setLocation, "setLocation");
  const o4 = { location: "", state: {}, base: e6 = normalizeBase(e6), createHref: createHref.bind(null, e6), replace(e7, t6) {
    r2.splice(n2--, 1), setLocation(e7, t6);
  }, push(e7, t6) {
    setLocation(e7, t6);
  }, listen: /* @__PURE__ */ __name((e7) => (t5.push(e7), () => {
    const r3 = t5.indexOf(e7);
    r3 > -1 && t5.splice(r3, 1);
  }), "listen"), destroy() {
    t5 = [], r2 = [["", {}]], n2 = 0;
  }, go(e7, o5 = true) {
    const a3 = this.location, s2 = e7 < 0 ? Re.back : Re.forward;
    n2 = Math.max(0, Math.min(n2 + e7, r2.length - 1)), o5 && (function(e8, r3, { direction: n3, delta: o6 }) {
      const a4 = { direction: n3, delta: o6, type: ye.pop };
      for (const n4 of t5) n4(e8, r3, a4);
    })(this.location, a3, { direction: s2, delta: e7 });
  } };
  return Object.defineProperty(o4, "location", { enumerable: true, get: /* @__PURE__ */ __name(() => r2[n2][0], "get") }), Object.defineProperty(o4, "state", { enumerable: true, get: /* @__PURE__ */ __name(() => r2[n2][1], "get") }), o4;
}
function compareScoreArray(e6, t5) {
  let r2 = 0;
  for (; r2 < e6.length && r2 < t5.length; ) {
    const n2 = t5[r2] - e6[r2];
    if (n2) return n2;
    r2++;
  }
  return e6.length < t5.length ? 1 === e6.length && e6[0] === Ge.Static + Ge.Segment ? -1 : 1 : e6.length > t5.length ? 1 === t5.length && t5[0] === Ge.Static + Ge.Segment ? 1 : -1 : 0;
}
function comparePathParserScore(e6, t5) {
  let r2 = 0;
  const n2 = e6.score, o4 = t5.score;
  for (; r2 < n2.length && r2 < o4.length; ) {
    const e7 = compareScoreArray(n2[r2], o4[r2]);
    if (e7) return e7;
    r2++;
  }
  if (1 === Math.abs(o4.length - n2.length)) {
    if (isLastScoreNegative(n2)) return 1;
    if (isLastScoreNegative(o4)) return -1;
  }
  return o4.length - n2.length;
}
function isLastScoreNegative(e6) {
  const t5 = e6[e6.length - 1];
  return e6.length > 0 && t5[t5.length - 1] < 0;
}
function createRouteRecordMatcher(e6, t5, r2) {
  const n2 = (function(e7, t6) {
    const r3 = ee({}, Ie, t6), n3 = [];
    let o5 = r3.start ? "^" : "";
    const a3 = [];
    for (const t7 of e7) {
      const e8 = t7.length ? [] : [Ge.Root];
      r3.strict && !t7.length && (o5 += "/");
      for (let n4 = 0; n4 < t7.length; n4++) {
        const s3 = t7[n4];
        let i3 = Ge.Segment + (r3.sensitive ? Ge.BonusCaseSensitive : 0);
        if (s3.type === Oe.Static) n4 || (o5 += "/"), o5 += s3.value.replace(Be, "\\$&"), i3 += Ge.Static;
        else if (s3.type === Oe.Param) {
          const { value: e9, repeatable: r4, optional: c3, regexp: u3 } = s3;
          a3.push({ name: e9, repeatable: r4, optional: c3 });
          const l2 = u3 || ke;
          l2 !== ke && (i3 += Ge.BonusCustomRegExp);
          let p2 = r4 ? `((?:${l2})(?:/(?:${l2}))*)` : `(${l2})`;
          n4 || (p2 = c3 && t7.length < 2 ? `(?:/${p2})` : "/" + p2), c3 && (p2 += "?"), o5 += p2, i3 += Ge.Dynamic, c3 && (i3 += Ge.BonusOptional), r4 && (i3 += Ge.BonusRepeatable), ".*" === l2 && (i3 += Ge.BonusWildcard);
        }
        e8.push(i3);
      }
      n3.push(e8);
    }
    if (r3.strict && r3.end) {
      const e8 = n3.length - 1;
      n3[e8][n3[e8].length - 1] += Ge.BonusStrict;
    }
    r3.strict || (o5 += "/?"), r3.end ? o5 += "$" : r3.strict && !o5.endsWith("/") && (o5 += "(?:/|$)");
    const s2 = new RegExp(o5, r3.sensitive ? "" : "i");
    return { re: s2, score: n3, keys: a3, parse: /* @__PURE__ */ __name(function(e8) {
      const t7 = e8.match(s2), r4 = {};
      if (!t7) return null;
      for (let e9 = 1; e9 < t7.length; e9++) {
        const n4 = t7[e9] || "", o6 = a3[e9 - 1];
        r4[o6.name] = n4 && o6.repeatable ? n4.split("/") : n4;
      }
      return r4;
    }, "parse"), stringify: /* @__PURE__ */ __name(function(t7) {
      let r4 = "", n4 = false;
      for (const o6 of e7) {
        n4 && r4.endsWith("/") || (r4 += "/"), n4 = false;
        for (const e8 of o6) if (e8.type === Oe.Static) r4 += e8.value;
        else if (e8.type === Oe.Param) {
          const { value: a4, repeatable: s3, optional: i3 } = e8, c3 = a4 in t7 ? t7[a4] : "";
          if (te(c3) && !s3) throw new Error(`Provided param "${a4}" is an array but it is not repeatable (* or + modifiers)`);
          const u3 = te(c3) ? c3.join("/") : c3;
          if (!u3) {
            if (!i3) throw new Error(`Missing required param "${a4}"`);
            o6.length < 2 && (r4.endsWith("/") ? r4 = r4.slice(0, -1) : n4 = true);
          }
          r4 += u3;
        }
      }
      return r4 || "/";
    }, "stringify") };
  })((function(e7) {
    if (!e7) return [[]];
    if ("/" === e7) return [[Te]];
    if (!e7.startsWith("/")) throw new Error(`Invalid path "${e7}"`);
    function crash(e8) {
      throw new Error(`ERR (${t6})/"${i3}": ${e8}`);
    }
    __name(crash, "crash");
    let t6 = we.Static, r3 = t6;
    const n3 = [];
    let o5;
    function finalizeSegment() {
      o5 && n3.push(o5), o5 = [];
    }
    __name(finalizeSegment, "finalizeSegment");
    let a3, s2 = 0, i3 = "", c3 = "";
    function consumeBuffer() {
      i3 && (t6 === we.Static ? o5.push({ type: Oe.Static, value: i3 }) : t6 === we.Param || t6 === we.ParamRegExp || t6 === we.ParamRegExpEnd ? (o5.length > 1 && ("*" === a3 || "+" === a3) && crash(`A repeatable param (${i3}) must be alone in its segment. eg: '/:ids+.`), o5.push({ type: Oe.Param, value: i3, regexp: c3, repeatable: "*" === a3 || "+" === a3, optional: "*" === a3 || "?" === a3 })) : crash("Invalid state to consume buffer"), i3 = "");
    }
    __name(consumeBuffer, "consumeBuffer");
    function addCharToBuffer() {
      i3 += a3;
    }
    __name(addCharToBuffer, "addCharToBuffer");
    for (; s2 < e7.length; ) if (a3 = e7[s2++], "\\" !== a3 || t6 === we.ParamRegExp) switch (t6) {
      case we.Static:
        "/" === a3 ? (i3 && consumeBuffer(), finalizeSegment()) : ":" === a3 ? (consumeBuffer(), t6 = we.Param) : addCharToBuffer();
        break;
      case we.EscapeNext:
        addCharToBuffer(), t6 = r3;
        break;
      case we.Param:
        "(" === a3 ? t6 = we.ParamRegExp : Se.test(a3) ? addCharToBuffer() : (consumeBuffer(), t6 = we.Static, "*" !== a3 && "?" !== a3 && "+" !== a3 && s2--);
        break;
      case we.ParamRegExp:
        ")" === a3 ? "\\" == c3[c3.length - 1] ? c3 = c3.slice(0, -1) + a3 : t6 = we.ParamRegExpEnd : c3 += a3;
        break;
      case we.ParamRegExpEnd:
        consumeBuffer(), t6 = we.Static, "*" !== a3 && "?" !== a3 && "+" !== a3 && s2--, c3 = "";
        break;
      default:
        crash("Unknown state");
    }
    else r3 = t6, t6 = we.EscapeNext;
    return t6 === we.ParamRegExp && crash(`Unfinished custom RegExp for param "${i3}"`), consumeBuffer(), finalizeSegment(), n3;
  })(e6.path), r2), o4 = ee(n2, { record: e6, parent: t5, children: [], alias: [] });
  return t5 && !o4.record.aliasOf == !t5.record.aliasOf && t5.children.push(o4), o4;
}
function createRouterMatcher(e6, t5) {
  const r2 = [], n2 = /* @__PURE__ */ new Map();
  function addRoute(e7, r3, n3) {
    const o4 = !n3, a3 = normalizeRouteRecord(e7);
    a3.aliasOf = n3 && n3.record;
    const s2 = mergeOptions(t5, e7), i3 = [a3];
    if ("alias" in e7) {
      const t6 = "string" == typeof e7.alias ? [e7.alias] : e7.alias;
      for (const e8 of t6) i3.push(normalizeRouteRecord(ee({}, a3, { components: n3 ? n3.record.components : a3.components, path: e8, aliasOf: n3 ? n3.record : a3 })));
    }
    let c3, u3;
    for (const t6 of i3) {
      const { path: i4 } = t6;
      if (r3 && "/" !== i4[0]) {
        const e8 = r3.record.path, n4 = "/" === e8[e8.length - 1] ? "" : "/";
        t6.path = r3.record.path + (i4 && n4 + i4);
      }
      if (c3 = createRouteRecordMatcher(t6, r3, s2), n3 ? n3.alias.push(c3) : (u3 = u3 || c3, u3 !== c3 && u3.alias.push(c3), o4 && e7.name && !isAliasRecord(c3) && removeRoute(e7.name)), isMatchable(c3) && insertMatcher(c3), a3.children) {
        const e8 = a3.children;
        for (let t7 = 0; t7 < e8.length; t7++) addRoute(e8[t7], c3, n3 && n3.children[t7]);
      }
      n3 = n3 || c3;
    }
    return u3 ? () => {
      removeRoute(u3);
    } : noop;
  }
  __name(addRoute, "addRoute");
  function removeRoute(e7) {
    if (isRouteName(e7)) {
      const t6 = n2.get(e7);
      t6 && (n2.delete(e7), r2.splice(r2.indexOf(t6), 1), t6.children.forEach(removeRoute), t6.alias.forEach(removeRoute));
    } else {
      const t6 = r2.indexOf(e7);
      t6 > -1 && (r2.splice(t6, 1), e7.record.name && n2.delete(e7.record.name), e7.children.forEach(removeRoute), e7.alias.forEach(removeRoute));
    }
  }
  __name(removeRoute, "removeRoute");
  function insertMatcher(e7) {
    const t6 = (function(e8, t7) {
      let r3 = 0, n3 = t7.length;
      for (; r3 !== n3; ) {
        const o5 = r3 + n3 >> 1;
        comparePathParserScore(e8, t7[o5]) < 0 ? n3 = o5 : r3 = o5 + 1;
      }
      const o4 = (function(e9) {
        let t8 = e9;
        for (; t8 = t8.parent; ) if (isMatchable(t8) && 0 === comparePathParserScore(e9, t8)) return t8;
      })(e8);
      o4 && (n3 = t7.lastIndexOf(o4, n3 - 1));
      return n3;
    })(e7, r2);
    r2.splice(t6, 0, e7), e7.record.name && !isAliasRecord(e7) && n2.set(e7.record.name, e7);
  }
  __name(insertMatcher, "insertMatcher");
  return t5 = mergeOptions(De, t5), e6.forEach((e7) => addRoute(e7)), { addRoute, resolve: /* @__PURE__ */ __name(function(e7, t6) {
    let o4, a3, s2, i3 = {};
    if ("name" in e7 && e7.name) {
      if (o4 = n2.get(e7.name), !o4) throw createRouterError(be.MATCHER_NOT_FOUND, { location: e7 });
      s2 = o4.record.name, i3 = ee(pickParams(t6.params, o4.keys.filter((e8) => !e8.optional).concat(o4.parent ? o4.parent.keys.filter((e8) => e8.optional) : []).map((e8) => e8.name)), e7.params && pickParams(e7.params, o4.keys.map((e8) => e8.name))), a3 = o4.stringify(i3);
    } else if (null != e7.path) a3 = e7.path, o4 = r2.find((e8) => e8.re.test(a3)), o4 && (i3 = o4.parse(a3), s2 = o4.record.name);
    else {
      if (o4 = t6.name ? n2.get(t6.name) : r2.find((e8) => e8.re.test(t6.path)), !o4) throw createRouterError(be.MATCHER_NOT_FOUND, { location: e7, currentLocation: t6 });
      s2 = o4.record.name, i3 = ee({}, t6.params, e7.params), a3 = o4.stringify(i3);
    }
    const c3 = [];
    let u3 = o4;
    for (; u3; ) c3.unshift(u3.record), u3 = u3.parent;
    return { name: s2, path: a3, params: i3, matched: c3, meta: mergeMetaFields(c3) };
  }, "resolve"), removeRoute, clearRoutes: /* @__PURE__ */ __name(function() {
    r2.length = 0, n2.clear();
  }, "clearRoutes"), getRoutes: /* @__PURE__ */ __name(function() {
    return r2;
  }, "getRoutes"), getRecordMatcher: /* @__PURE__ */ __name(function(e7) {
    return n2.get(e7);
  }, "getRecordMatcher") };
}
function pickParams(e6, t5) {
  const r2 = {};
  for (const n2 of t5) n2 in e6 && (r2[n2] = e6[n2]);
  return r2;
}
function normalizeRouteRecord(e6) {
  const t5 = { path: e6.path, redirect: e6.redirect, name: e6.name, meta: e6.meta || {}, aliasOf: e6.aliasOf, beforeEnter: e6.beforeEnter, props: normalizeRecordProps(e6), children: e6.children || [], instances: {}, leaveGuards: /* @__PURE__ */ new Set(), updateGuards: /* @__PURE__ */ new Set(), enterCallbacks: {}, components: "components" in e6 ? e6.components || null : e6.component && { default: e6.component } };
  return Object.defineProperty(t5, "mods", { value: {} }), t5;
}
function normalizeRecordProps(e6) {
  const t5 = {}, r2 = e6.props || false;
  if ("component" in e6) t5.default = r2;
  else for (const n2 in e6.components) t5[n2] = "object" == typeof r2 ? r2[n2] : r2;
  return t5;
}
function isAliasRecord(e6) {
  for (; e6; ) {
    if (e6.record.aliasOf) return true;
    e6 = e6.parent;
  }
  return false;
}
function mergeMetaFields(e6) {
  return e6.reduce((e7, t5) => ee(e7, t5.meta), {});
}
function isMatchable({ record: e6 }) {
  return !!(e6.name || e6.components && Object.keys(e6.components).length || e6.redirect);
}
function useLink(e6) {
  const t5 = inject(Ne), r2 = inject(Pe), n2 = computed(() => {
    const r3 = unref(e6.to);
    return t5.resolve(r3);
  }), o4 = computed(() => {
    const { matched: e7 } = n2.value, { length: t6 } = e7, o5 = e7[t6 - 1], a4 = r2.matched;
    if (!o5 || !a4.length) return -1;
    const s3 = a4.findIndex(isSameRouteRecord.bind(null, o5));
    if (s3 > -1) return s3;
    const i3 = getOriginalPath(e7[t6 - 2]);
    return t6 > 1 && getOriginalPath(o5) === i3 && a4[a4.length - 1].path !== i3 ? a4.findIndex(isSameRouteRecord.bind(null, e7[t6 - 2])) : s3;
  }), a3 = computed(() => o4.value > -1 && (function(e7, t6) {
    for (const r3 in t6) {
      const n3 = t6[r3], o5 = e7[r3];
      if ("string" == typeof n3) {
        if (n3 !== o5) return false;
      } else if (!te(o5) || o5.length !== n3.length || n3.some((e8, t7) => e8.valueOf() !== o5[t7].valueOf())) return false;
    }
    return true;
  })(r2.params, n2.value.params)), s2 = computed(() => o4.value > -1 && o4.value === r2.matched.length - 1 && isSameRouteLocationParams(r2.params, n2.value.params));
  return { route: n2, href: computed(() => n2.value.href), isActive: a3, isExactActive: s2, navigate: /* @__PURE__ */ __name(function(r3 = {}) {
    if ((function(e7) {
      if (e7.metaKey || e7.altKey || e7.ctrlKey || e7.shiftKey) return;
      if (e7.defaultPrevented) return;
      if (void 0 !== e7.button && 0 !== e7.button) return;
      if (e7.currentTarget && e7.currentTarget.getAttribute) {
        const t6 = e7.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t6)) return;
      }
      e7.preventDefault && e7.preventDefault();
      return true;
    })(r3)) {
      const r4 = t5[unref(e6.replace) ? "replace" : "push"](unref(e6.to)).catch(noop);
      return e6.viewTransition, r4;
    }
    return Promise.resolve();
  }, "navigate") };
}
function getOriginalPath(e6) {
  return e6 ? e6.aliasOf ? e6.aliasOf.path : e6.path : "";
}
function normalizeSlot$1(e6, t5) {
  if (!e6) return null;
  const r2 = e6(t5);
  return 1 === r2.length ? r2[0] : r2;
}
function createRouter(e6) {
  const t5 = createRouterMatcher(e6.routes, e6), r2 = e6.parseQuery || parseQuery2, n2 = e6.stringifyQuery || stringifyQuery, o4 = e6.history, a3 = useCallbacks(), s2 = useCallbacks(), i3 = useCallbacks(), c3 = shallowRef(ve);
  let u3 = ve;
  const l2 = applyToParams.bind(null, (e7) => "" + e7), p2 = applyToParams.bind(null, encodeParam), f2 = applyToParams.bind(null, decode);
  function resolve2(e7, a4) {
    if (a4 = ee({}, a4 || c3.value), "string" == typeof e7) {
      const n3 = parseURL(r2, e7, a4.path), s4 = t5.resolve({ path: n3.path }, a4), i5 = o4.createHref(n3.fullPath);
      return ee(n3, s4, { params: f2(s4.params), hash: decode(n3.hash), redirectedFrom: void 0, href: i5 });
    }
    let s3;
    if (null != e7.path) s3 = ee({}, e7, { path: parseURL(r2, e7.path, a4.path).path });
    else {
      const t6 = ee({}, e7.params);
      for (const e8 in t6) null == t6[e8] && delete t6[e8];
      s3 = ee({}, e7, { params: p2(t6) }), a4.params = p2(a4.params);
    }
    const i4 = t5.resolve(s3, a4), u4 = e7.hash || "";
    i4.params = l2(f2(i4.params));
    const d4 = (function(e8, t6) {
      const r3 = t6.query ? e8(t6.query) : "";
      return t6.path + (r3 && "?") + r3 + (t6.hash || "");
    })(n2, ee({}, e7, { hash: (h4 = u4, commonEncode(h4).replace(fe, "{").replace(he, "}").replace(le, "^")), path: i4.path }));
    var h4;
    const m4 = o4.createHref(d4);
    return ee({ fullPath: d4, hash: u4, query: n2 === stringifyQuery ? normalizeQuery(e7.query) : e7.query || {} }, i4, { redirectedFrom: void 0, href: m4 });
  }
  __name(resolve2, "resolve");
  function locationAsObject(e7) {
    return "string" == typeof e7 ? parseURL(r2, e7, c3.value.path) : ee({}, e7);
  }
  __name(locationAsObject, "locationAsObject");
  function checkCanceledNavigation(e7, t6) {
    if (u3 !== e7) return createRouterError(be.NAVIGATION_CANCELLED, { from: t6, to: e7 });
  }
  __name(checkCanceledNavigation, "checkCanceledNavigation");
  function push(e7) {
    return pushWithRedirect(e7);
  }
  __name(push, "push");
  function handleRedirectRecord(e7, t6) {
    const r3 = e7.matched[e7.matched.length - 1];
    if (r3 && r3.redirect) {
      const { redirect: n3 } = r3;
      let o5 = "function" == typeof n3 ? n3(e7, t6) : n3;
      return "string" == typeof o5 && (o5 = o5.includes("?") || o5.includes("#") ? o5 = locationAsObject(o5) : { path: o5 }, o5.params = {}), ee({ query: e7.query, hash: e7.hash, params: null != o5.path ? {} : e7.params }, o5);
    }
  }
  __name(handleRedirectRecord, "handleRedirectRecord");
  function pushWithRedirect(e7, t6) {
    const r3 = u3 = resolve2(e7), o5 = c3.value, a4 = e7.state, s3 = e7.force, i4 = true === e7.replace, l3 = handleRedirectRecord(r3, o5);
    if (l3) return pushWithRedirect(ee(locationAsObject(l3), { state: "object" == typeof l3 ? ee({}, a4, l3.state) : a4, force: s3, replace: i4 }), t6 || r3);
    const p3 = r3;
    let f3;
    return p3.redirectedFrom = t6, !s3 && (function(e8, t7, r4) {
      const n3 = t7.matched.length - 1, o6 = r4.matched.length - 1;
      return n3 > -1 && n3 === o6 && isSameRouteRecord(t7.matched[n3], r4.matched[o6]) && isSameRouteLocationParams(t7.params, r4.params) && e8(t7.query) === e8(r4.query) && t7.hash === r4.hash;
    })(n2, o5, r3) && (f3 = createRouterError(be.NAVIGATION_DUPLICATED, { to: p3, from: o5 }), handleScroll()), (f3 ? Promise.resolve(f3) : navigate(p3, o5)).catch((e8) => isNavigationFailure(e8) ? isNavigationFailure(e8, be.NAVIGATION_GUARD_REDIRECT) ? e8 : markAsReady(e8) : triggerError(e8, p3, o5)).then((e8) => {
      if (e8) {
        if (isNavigationFailure(e8, be.NAVIGATION_GUARD_REDIRECT)) return pushWithRedirect(ee({ replace: i4 }, locationAsObject(e8.to), { state: "object" == typeof e8.to ? ee({}, a4, e8.to.state) : a4, force: s3 }), t6 || p3);
      } else e8 = finalizeNavigation(p3, o5, true, i4, a4);
      return triggerAfterEach(p3, o5, e8), e8;
    });
  }
  __name(pushWithRedirect, "pushWithRedirect");
  function checkCanceledNavigationAndReject(e7, t6) {
    const r3 = checkCanceledNavigation(e7, t6);
    return r3 ? Promise.reject(r3) : Promise.resolve();
  }
  __name(checkCanceledNavigationAndReject, "checkCanceledNavigationAndReject");
  function runWithContext(e7) {
    const t6 = v3.values().next().value;
    return t6 && "function" == typeof t6.runWithContext ? t6.runWithContext(e7) : e7();
  }
  __name(runWithContext, "runWithContext");
  function navigate(e7, t6) {
    let r3;
    const [n3, o5, i4] = (function(e8, t7) {
      const r4 = [], n4 = [], o6 = [], a4 = Math.max(t7.matched.length, e8.matched.length);
      for (let s3 = 0; s3 < a4; s3++) {
        const a5 = t7.matched[s3];
        a5 && (e8.matched.find((e9) => isSameRouteRecord(e9, a5)) ? n4.push(a5) : r4.push(a5));
        const i5 = e8.matched[s3];
        i5 && (t7.matched.find((e9) => isSameRouteRecord(e9, i5)) || o6.push(i5));
      }
      return [r4, n4, o6];
    })(e7, t6);
    r3 = extractComponentsGuards(n3.reverse(), "beforeRouteLeave", e7, t6);
    for (const o6 of n3) o6.leaveGuards.forEach((n4) => {
      r3.push(guardToPromiseFn(n4, e7, t6));
    });
    const c4 = checkCanceledNavigationAndReject.bind(null, e7, t6);
    return r3.push(c4), runGuardQueue(r3).then(() => {
      r3 = [];
      for (const n4 of a3.list()) r3.push(guardToPromiseFn(n4, e7, t6));
      return r3.push(c4), runGuardQueue(r3);
    }).then(() => {
      r3 = extractComponentsGuards(o5, "beforeRouteUpdate", e7, t6);
      for (const n4 of o5) n4.updateGuards.forEach((n5) => {
        r3.push(guardToPromiseFn(n5, e7, t6));
      });
      return r3.push(c4), runGuardQueue(r3);
    }).then(() => {
      r3 = [];
      for (const n4 of i4) if (n4.beforeEnter) if (te(n4.beforeEnter)) for (const o6 of n4.beforeEnter) r3.push(guardToPromiseFn(o6, e7, t6));
      else r3.push(guardToPromiseFn(n4.beforeEnter, e7, t6));
      return r3.push(c4), runGuardQueue(r3);
    }).then(() => (e7.matched.forEach((e8) => e8.enterCallbacks = {}), r3 = extractComponentsGuards(i4, "beforeRouteEnter", e7, t6, runWithContext), r3.push(c4), runGuardQueue(r3))).then(() => {
      r3 = [];
      for (const n4 of s2.list()) r3.push(guardToPromiseFn(n4, e7, t6));
      return r3.push(c4), runGuardQueue(r3);
    }).catch((e8) => isNavigationFailure(e8, be.NAVIGATION_CANCELLED) ? e8 : Promise.reject(e8));
  }
  __name(navigate, "navigate");
  function triggerAfterEach(e7, t6, r3) {
    i3.list().forEach((n3) => runWithContext(() => n3(e7, t6, r3)));
  }
  __name(triggerAfterEach, "triggerAfterEach");
  function finalizeNavigation(e7, t6, r3, n3, a4) {
    const s3 = checkCanceledNavigation(e7, t6);
    if (s3) return s3;
    const i4 = t6 === ve, u4 = {};
    r3 && (n3 || i4 ? o4.replace(e7.fullPath, ee({ scroll: i4 && u4 && u4.scroll }, a4)) : o4.push(e7.fullPath, a4)), c3.value = e7, handleScroll(), markAsReady();
  }
  __name(finalizeNavigation, "finalizeNavigation");
  let d3;
  let h3, m3 = useCallbacks(), g3 = useCallbacks();
  function triggerError(e7, t6, r3) {
    markAsReady(e7);
    const n3 = g3.list();
    return n3.length ? n3.forEach((n4) => n4(e7, t6, r3)) : console.error(e7), Promise.reject(e7);
  }
  __name(triggerError, "triggerError");
  function markAsReady(e7) {
    return h3 || (h3 = !e7, d3 || (d3 = o4.listen((e8, t6, r3) => {
      if (!R3.listening) return;
      const n3 = resolve2(e8), a4 = handleRedirectRecord(n3, R3.currentRoute.value);
      if (a4) return void pushWithRedirect(ee(a4, { replace: true, force: true }), n3).catch(noop);
      u3 = n3;
      const s3 = c3.value;
      navigate(n3, s3).catch((e9) => isNavigationFailure(e9, be.NAVIGATION_ABORTED | be.NAVIGATION_CANCELLED) ? e9 : isNavigationFailure(e9, be.NAVIGATION_GUARD_REDIRECT) ? (pushWithRedirect(ee(locationAsObject(e9.to), { force: true }), n3).then((e10) => {
        isNavigationFailure(e10, be.NAVIGATION_ABORTED | be.NAVIGATION_DUPLICATED) && !r3.delta && r3.type === ye.pop && o4.go(-1, false);
      }).catch(noop), Promise.reject()) : (r3.delta && o4.go(-r3.delta, false), triggerError(e9, n3, s3))).then((e9) => {
        (e9 = e9 || finalizeNavigation(n3, s3, false)) && (r3.delta && !isNavigationFailure(e9, be.NAVIGATION_CANCELLED) ? o4.go(-r3.delta, false) : r3.type === ye.pop && isNavigationFailure(e9, be.NAVIGATION_ABORTED | be.NAVIGATION_DUPLICATED) && o4.go(-1, false)), triggerAfterEach(n3, s3, e9);
      }).catch(noop);
    })), m3.list().forEach(([t6, r3]) => e7 ? r3(e7) : t6()), m3.reset()), e7;
  }
  __name(markAsReady, "markAsReady");
  function handleScroll(t6, r3, n3, o5) {
    const { scrollBehavior: a4 } = e6;
    return Promise.resolve();
  }
  __name(handleScroll, "handleScroll");
  const go = /* @__PURE__ */ __name((e7) => o4.go(e7), "go"), v3 = /* @__PURE__ */ new Set(), R3 = { currentRoute: c3, listening: true, addRoute: /* @__PURE__ */ __name(function(e7, r3) {
    let n3, o5;
    return isRouteName(e7) ? (n3 = t5.getRecordMatcher(e7), o5 = r3) : o5 = e7, t5.addRoute(o5, n3);
  }, "addRoute"), removeRoute: /* @__PURE__ */ __name(function(e7) {
    const r3 = t5.getRecordMatcher(e7);
    r3 && t5.removeRoute(r3);
  }, "removeRoute"), clearRoutes: t5.clearRoutes, hasRoute: /* @__PURE__ */ __name(function(e7) {
    return !!t5.getRecordMatcher(e7);
  }, "hasRoute"), getRoutes: /* @__PURE__ */ __name(function() {
    return t5.getRoutes().map((e7) => e7.record);
  }, "getRoutes"), resolve: resolve2, options: e6, push, replace: /* @__PURE__ */ __name(function(e7) {
    return push(ee(locationAsObject(e7), { replace: true }));
  }, "replace"), go, back: /* @__PURE__ */ __name(() => go(-1), "back"), forward: /* @__PURE__ */ __name(() => go(1), "forward"), beforeEach: a3.add, beforeResolve: s2.add, afterEach: i3.add, onError: g3.add, isReady: /* @__PURE__ */ __name(function() {
    return h3 && c3.value !== ve ? Promise.resolve() : new Promise((e7, t6) => {
      m3.add([e7, t6]);
    });
  }, "isReady"), install(e7) {
    e7.component("RouterLink", je), e7.component("RouterView", Me), e7.config.globalProperties.$router = R3, Object.defineProperty(e7.config.globalProperties, "$route", { enumerable: true, get: /* @__PURE__ */ __name(() => unref(c3), "get") });
    const t6 = {};
    for (const e8 in ve) Object.defineProperty(t6, e8, { get: /* @__PURE__ */ __name(() => c3.value[e8], "get"), enumerable: true });
    e7.provide(Ne, R3), e7.provide(Pe, shallowReactive(t6)), e7.provide(_e, c3);
    const r3 = e7.unmount;
    v3.add(e7), e7.unmount = function() {
      v3.delete(e7), v3.size < 1 && (u3 = ve, d3 && d3(), d3 = null, c3.value = ve, h3 = false), r3();
    };
  } };
  function runGuardQueue(e7) {
    return e7.reduce((e8, t6) => e8.then(() => runWithContext(t6)), Promise.resolve());
  }
  __name(runGuardQueue, "runGuardQueue");
  return R3;
}
function toArray(e6) {
  return Array.isArray(e6) ? e6 : [e6];
}
function generateRouteKey(e6) {
  const t5 = e6?.meta.key ?? e6.path.replace(Fe, "$1").replace(He, "$1").replace(Ue, (t6) => e6.params[t6.slice(1)]?.toString() || "");
  return "function" == typeof t5 ? t5(e6) : t5;
}
function _getHashElementScrollMarginTop(e6) {
  try {
    const t5 = (void 0).querySelector(e6);
    if (t5) return (Number.parseFloat(getComputedStyle(t5).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
  } catch {
  }
  return 0;
}
function _calculatePosition(e6, t5, r2, n2) {
  if (r2) return r2;
  const o4 = (function(e7, t6) {
    return e7 !== t6 && t6 !== ve && (generateRouteKey(e7) !== generateRouteKey(t6) || !e7.matched.every((e8, r3) => e8.components && e8.components.default === t6.matched[r3]?.components?.default));
  })(e6, t5);
  return e6.hash ? { el: e6.hash, top: _getHashElementScrollMarginTop(e6.hash), behavior: o4 ? n2 : "instant" } : { left: 0, top: 0 };
}
function definePayloadReducer(e6, t5) {
  useNuxtApp().ssrContext["~payloadReducers"][e6] = t5;
}
function normalizeSlot(e6, t5) {
  const r2 = e6(t5);
  return 1 === r2.length ? h(r2[0]) : h(yt, void 0, r2);
}
var z, q2, Q, K, J, useRouter, Y, navigateTo, Z, useError, showError, isNuxtError, createError2, X, ee, noop, te, re, ne, oe, ae, se, ie, ce, ue, le, pe, fe, de, he, me, ge, ve, ye, Re, xe, be, Ae, Ee, Ce, Ne, Pe, _e, Oe, we, Te, Se, ke, Ie, Ge, Be, De, je, getLinkClass, Me, Le, routeRulesMatcher, $e, Fe, He, Ue, We, Ve, ze, qe, Qe, Ke, Je, _export_sfc, Ye, Ze, Xe, et2, tt, rt, nt, ot, entry_default;
var init_server = __esm({
  ".output/server/chunks/build/server.mjs"() {
    init_modules_watch_stub();
    init_nitro();
    init_renderer();
    globalThis._importMeta_ = globalThis._importMeta_ || { url: "file:///_entry.js", env: {} };
    globalThis.$fetch || (globalThis.$fetch = Jr.create({ baseURL: baseURL() })), "global" in globalThis || (globalThis.global = globalThis);
    z = { componentName: "NuxtLink" };
    q2 = "nuxt-app";
    __name(getNuxtAppCtx, "getNuxtAppCtx");
    Q = "__nuxt_plugin";
    __name(registerPluginHooks, "registerPluginHooks");
    __name(defineNuxtPlugin, "defineNuxtPlugin");
    __name(callWithNuxt, "callWithNuxt");
    __name(useNuxtApp, "useNuxtApp");
    __name(useRuntimeConfig, "useRuntimeConfig");
    __name(defineGetter, "defineGetter");
    K = /* @__PURE__ */ Symbol("layout-meta");
    J = /* @__PURE__ */ Symbol("route");
    globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
    useRouter = /* @__PURE__ */ __name(() => useNuxtApp()?.$router, "useRouter");
    __name(defineNuxtRouteMiddleware, "defineNuxtRouteMiddleware");
    Y = /"/g;
    navigateTo = /* @__PURE__ */ __name((n2, a3) => {
      n2 ||= "/";
      const s2 = "string" == typeof n2 ? n2 : "path" in n2 ? resolveRouteObject(n2) : useRouter().resolve(n2).href, i3 = hasProtocol(s2, { acceptRelative: true }), c3 = a3?.external || i3;
      if (c3) {
        if (!a3?.external) throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
        const { protocol: e6 } = new URL(s2, "http://localhost");
        if (e6 && isScriptProtocol(e6)) throw new Error(`Cannot navigate to a URL with '${e6}' protocol.`);
      }
      const u3 = (() => {
        try {
          if (useNuxtApp()._processingMiddleware) return true;
        } catch {
          return false;
        }
        return false;
      })(), l2 = useRouter(), p2 = useNuxtApp();
      if (p2.ssrContext) {
        const e6 = "string" == typeof n2 || c3 ? s2 : l2.resolve(n2).fullPath || "/", t5 = c3 ? s2 : joinURL(useRuntimeConfig().app.baseURL, e6), redirect = /* @__PURE__ */ __name(async function(e7) {
          await p2.callHook("app:redirected");
          const r2 = t5.replace(Y, "%22"), n3 = (function(e8, t6 = false) {
            const r3 = new URL(e8, "http://localhost");
            if (!t6) return r3.pathname + r3.search + r3.hash;
            if (e8.startsWith("//")) return r3.toString().replace(r3.protocol, "");
            return r3.toString();
          })(t5, i3);
          return p2.ssrContext["~renderResponse"] = { statusCode: sanitizeStatusCode(a3?.redirectCode || 302, 302), body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${r2}"></head></html>`, headers: { location: n3 } }, e7;
        }, "redirect");
        return !c3 && u3 ? (l2.afterEach((t6) => t6.fullPath === e6 ? redirect(false) : void 0), n2) : redirect(!u3 && void 0);
      }
      return c3 ? (p2._scope.stop(), a3?.replace ? (void 0).replace(s2) : (void 0).href = s2, u3 ? !!p2.isHydrating && new Promise(() => {
      }) : Promise.resolve()) : a3?.replace ? l2.replace(n2) : l2.push(n2);
    }, "navigateTo");
    __name(resolveRouteObject, "resolveRouteObject");
    Z = "__nuxt_error";
    useError = /* @__PURE__ */ __name(() => toRef(useNuxtApp().payload, "error"), "useError");
    showError = /* @__PURE__ */ __name((e6) => {
      const t5 = createError2(e6);
      try {
        const e7 = useError();
        0, e7.value ||= t5;
      } catch {
        throw t5;
      }
      return t5;
    }, "showError");
    isNuxtError = /* @__PURE__ */ __name((e6) => !!e6 && "object" == typeof e6 && Z in e6, "isNuxtError");
    createError2 = /* @__PURE__ */ __name((e6) => {
      "string" != typeof e6 && e6.statusText && (e6.message ??= e6.statusText);
      const t5 = createError(e6);
      return Object.defineProperty(t5, Z, { value: true, configurable: false, writable: false }), t5;
    }, "createError");
    X = defineNuxtPlugin({ name: "nuxt:head", enforce: "pre", setup(e6) {
      const t5 = e6.ssrContext.head;
      e6.vueApp.use(t5);
    } });
    __name(isRouteComponent, "isRouteComponent");
    ee = Object.assign;
    __name(applyToParams, "applyToParams");
    noop = /* @__PURE__ */ __name(() => {
    }, "noop");
    te = Array.isArray;
    __name(mergeOptions, "mergeOptions");
    re = /#/g;
    ne = /&/g;
    oe = /\//g;
    ae = /=/g;
    se = /\?/g;
    ie = /\+/g;
    ce = /%5B/g;
    ue = /%5D/g;
    le = /%5E/g;
    pe = /%60/g;
    fe = /%7B/g;
    de = /%7C/g;
    he = /%7D/g;
    me = /%20/g;
    __name(commonEncode, "commonEncode");
    __name(encodeQueryValue, "encodeQueryValue");
    __name(encodeQueryKey, "encodeQueryKey");
    __name(encodeParam, "encodeParam");
    __name(decode, "decode");
    ge = /\/$/;
    __name(parseURL, "parseURL");
    __name(isSameRouteRecord, "isSameRouteRecord");
    __name(isSameRouteLocationParams, "isSameRouteLocationParams");
    __name(isSameRouteLocationParamsValue, "isSameRouteLocationParamsValue");
    __name(isEquivalentArray, "isEquivalentArray");
    ve = { path: "/", name: void 0, params: {}, query: {}, hash: "", fullPath: "/", matched: [], meta: {}, redirectedFrom: void 0 };
    ye = (function(e6) {
      return e6.pop = "pop", e6.push = "push", e6;
    })({});
    Re = (function(e6) {
      return e6.back = "back", e6.forward = "forward", e6.unknown = "", e6;
    })({});
    __name(normalizeBase, "normalizeBase");
    xe = /^[^#]+#/;
    __name(createHref, "createHref");
    __name(isRouteName, "isRouteName");
    be = (function(e6) {
      return e6[e6.MATCHER_NOT_FOUND = 1] = "MATCHER_NOT_FOUND", e6[e6.NAVIGATION_GUARD_REDIRECT = 2] = "NAVIGATION_GUARD_REDIRECT", e6[e6.NAVIGATION_ABORTED = 4] = "NAVIGATION_ABORTED", e6[e6.NAVIGATION_CANCELLED = 8] = "NAVIGATION_CANCELLED", e6[e6.NAVIGATION_DUPLICATED = 16] = "NAVIGATION_DUPLICATED", e6;
    })({});
    Ae = /* @__PURE__ */ Symbol("");
    __name(createRouterError, "createRouterError");
    __name(isNavigationFailure, "isNavigationFailure");
    be.MATCHER_NOT_FOUND, be.NAVIGATION_GUARD_REDIRECT, be.NAVIGATION_ABORTED, be.NAVIGATION_CANCELLED, be.NAVIGATION_DUPLICATED;
    __name(parseQuery2, "parseQuery");
    __name(stringifyQuery, "stringifyQuery");
    __name(normalizeQuery, "normalizeQuery");
    Ee = /* @__PURE__ */ Symbol("");
    Ce = /* @__PURE__ */ Symbol("");
    Ne = /* @__PURE__ */ Symbol("");
    Pe = /* @__PURE__ */ Symbol("");
    _e = /* @__PURE__ */ Symbol("");
    __name(useCallbacks, "useCallbacks");
    __name(guardToPromiseFn, "guardToPromiseFn");
    __name(extractComponentsGuards, "extractComponentsGuards");
    __name(createMemoryHistory, "createMemoryHistory");
    Oe = (function(e6) {
      return e6[e6.Static = 0] = "Static", e6[e6.Param = 1] = "Param", e6[e6.Group = 2] = "Group", e6;
    })({});
    we = (function(e6) {
      return e6[e6.Static = 0] = "Static", e6[e6.Param = 1] = "Param", e6[e6.ParamRegExp = 2] = "ParamRegExp", e6[e6.ParamRegExpEnd = 3] = "ParamRegExpEnd", e6[e6.EscapeNext = 4] = "EscapeNext", e6;
    })(we || {});
    Te = { type: Oe.Static, value: "" };
    Se = /[a-zA-Z0-9_]/;
    ke = "[^/]+?";
    Ie = { sensitive: false, strict: false, start: true, end: true };
    Ge = (function(e6) {
      return e6[e6._multiplier = 10] = "_multiplier", e6[e6.Root = 90] = "Root", e6[e6.Segment = 40] = "Segment", e6[e6.SubSegment = 30] = "SubSegment", e6[e6.Static = 40] = "Static", e6[e6.Dynamic = 20] = "Dynamic", e6[e6.BonusCustomRegExp = 10] = "BonusCustomRegExp", e6[e6.BonusWildcard = -50] = "BonusWildcard", e6[e6.BonusRepeatable = -20] = "BonusRepeatable", e6[e6.BonusOptional = -8] = "BonusOptional", e6[e6.BonusStrict = 0.7000000000000001] = "BonusStrict", e6[e6.BonusCaseSensitive = 0.25] = "BonusCaseSensitive", e6;
    })(Ge || {});
    Be = /[.+*?^${}()[\]/\\]/g;
    __name(compareScoreArray, "compareScoreArray");
    __name(comparePathParserScore, "comparePathParserScore");
    __name(isLastScoreNegative, "isLastScoreNegative");
    De = { strict: false, end: true, sensitive: false };
    __name(createRouteRecordMatcher, "createRouteRecordMatcher");
    __name(createRouterMatcher, "createRouterMatcher");
    __name(pickParams, "pickParams");
    __name(normalizeRouteRecord, "normalizeRouteRecord");
    __name(normalizeRecordProps, "normalizeRecordProps");
    __name(isAliasRecord, "isAliasRecord");
    __name(mergeMetaFields, "mergeMetaFields");
    __name(isMatchable, "isMatchable");
    __name(useLink, "useLink");
    je = defineComponent({ name: "RouterLink", compatConfig: { MODE: 3 }, props: { to: { type: [String, Object], required: true }, replace: Boolean, activeClass: String, exactActiveClass: String, custom: Boolean, ariaCurrentValue: { type: String, default: "page" }, viewTransition: Boolean }, useLink, setup(e6, { slots: t5 }) {
      const r2 = reactive(useLink(e6)), { options: n2 } = inject(Ne), o4 = computed(() => ({ [getLinkClass(e6.activeClass, n2.linkActiveClass, "router-link-active")]: r2.isActive, [getLinkClass(e6.exactActiveClass, n2.linkExactActiveClass, "router-link-exact-active")]: r2.isExactActive }));
      return () => {
        const n3 = t5.default && (1 === (a3 = t5.default(r2)).length ? a3[0] : a3);
        var a3;
        return e6.custom ? n3 : h("a", { "aria-current": r2.isExactActive ? e6.ariaCurrentValue : null, href: r2.href, onClick: r2.navigate, class: o4.value }, n3);
      };
    } });
    __name(getOriginalPath, "getOriginalPath");
    getLinkClass = /* @__PURE__ */ __name((e6, t5, r2) => null != e6 ? e6 : null != t5 ? t5 : r2, "getLinkClass");
    __name(normalizeSlot$1, "normalizeSlot$1");
    Me = defineComponent({ name: "RouterView", inheritAttrs: false, props: { name: { type: String, default: "default" }, route: Object }, compatConfig: { MODE: 3 }, setup(e6, { attrs: t5, slots: r2 }) {
      const n2 = inject(_e), o4 = computed(() => e6.route || n2.value), a3 = inject(Ce, 0), s2 = computed(() => {
        let e7 = unref(a3);
        const { matched: t6 } = o4.value;
        let r3;
        for (; (r3 = t6[e7]) && !r3.components; ) e7++;
        return e7;
      }), i3 = computed(() => o4.value.matched[s2.value]);
      provide(Ce, computed(() => s2.value + 1)), provide(Ee, i3), provide(_e, o4);
      const c3 = ref();
      return watch(() => [c3.value, i3.value, e6.name], ([e7, t6, r3], [n3, o5, a4]) => {
        t6 && (t6.instances[r3] = e7, o5 && o5 !== t6 && e7 && e7 === n3 && (t6.leaveGuards.size || (t6.leaveGuards = o5.leaveGuards), t6.updateGuards.size || (t6.updateGuards = o5.updateGuards))), !e7 || !t6 || o5 && isSameRouteRecord(t6, o5) && n3 || (t6.enterCallbacks[r3] || []).forEach((t7) => t7(e7));
      }, { flush: "post" }), () => {
        const n3 = o4.value, a4 = e6.name, s3 = i3.value, u3 = s3 && s3.components[a4];
        if (!u3) return normalizeSlot$1(r2.default, { Component: u3, route: n3 });
        const l2 = s3.props[a4], p2 = l2 ? true === l2 ? n3.params : "function" == typeof l2 ? l2(n3) : l2 : null, f2 = h(u3, ee({}, p2, t5, { onVnodeUnmounted: /* @__PURE__ */ __name((e7) => {
          e7.component.isUnmounted && (s3.instances[a4] = null);
        }, "onVnodeUnmounted"), ref: c3 }));
        return normalizeSlot$1(r2.default, { Component: f2, route: n3 }) || f2;
      };
    } });
    __name(createRouter, "createRouter");
    __name(toArray, "toArray");
    Le = /* @__PURE__ */ (() => {
      const e6 = { payload: true, payload: true }, t5 = { payload: true };
      return (r2, n2) => {
        let o4 = [];
        47 === n2.charCodeAt(n2.length - 1) && (n2 = n2.slice(0, -1) || "/"), "/" === n2 && o4.unshift({ data: e6 });
        let a3 = n2.split("/");
        return a3.length, "api" === a3[1] && o4.unshift({ data: t5, params: { _: a3.slice(2).join("/") } }), o4;
      };
    })();
    routeRulesMatcher = /* @__PURE__ */ __name((e6) => Er({}, ...Le("", e6).map((e7) => e7.data).reverse()), "routeRulesMatcher");
    $e = [{ name: "index", path: "/", component: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_index_BmED2LNb(), index_BmED2LNb_exports)), "component") }];
    Fe = /(:\w+)\([^)]+\)/g;
    He = /(:\w+)[?+*]/g;
    Ue = /:\w+/g;
    __name(generateRouteKey, "generateRouteKey");
    __name(_getHashElementScrollMarginTop, "_getHashElementScrollMarginTop");
    __name(_calculatePosition, "_calculatePosition");
    We = { hashMode: false, scrollBehaviorType: "auto", ...{ scrollBehavior(e6, t5, r2) {
      const n2 = useNuxtApp(), o4 = useRouter().options?.scrollBehaviorType ?? "auto";
      if (e6.path.replace(/\/$/, "") === t5.path.replace(/\/$/, "")) return t5.hash && !e6.hash ? { left: 0, top: 0 } : !!e6.hash && { el: e6.hash, top: _getHashElementScrollMarginTop(e6.hash), behavior: o4 };
      if (false === ("function" == typeof e6.meta.scrollToTop ? e6.meta.scrollToTop(e6, t5) : e6.meta.scrollToTop)) return false;
      const a3 = n2._runningTransition ? "page:transition:finish" : "page:loading:end";
      return new Promise((s2) => {
        t5 !== ve ? n2.hooks.hookOnce(a3, () => {
          requestAnimationFrame(() => s2(_calculatePosition(e6, t5, r2, o4)));
        }) : s2(_calculatePosition(e6, t5, r2, o4));
      });
    } } };
    Ve = [defineNuxtRouteMiddleware(async (e6, t5) => {
      let r2, n2;
      if (!e6.meta?.validate) return;
      const o4 = ([r2, n2] = executeAsync(() => Promise.resolve(e6.meta.validate(e6))), r2 = await r2, n2(), r2);
      if (true === o4) return;
      return createError2({ fatal: false, status: o4 && (o4.status || o4.statusCode) || 404, statusText: o4 && (o4.statusText || o4.statusMessage) || `Page Not Found: ${e6.fullPath}`, data: { path: e6.fullPath } });
    }), defineNuxtRouteMiddleware((e6) => {
    })];
    ze = {};
    __name(definePayloadReducer, "definePayloadReducer");
    qe = [["NuxtError", (e6) => isNuxtError(e6) && e6.toJSON()], ["EmptyShallowRef", (e6) => isRef(e6) && isShallow(e6) && !e6.value && ("bigint" == typeof e6.value ? "0n" : JSON.stringify(e6.value) || "_")], ["EmptyRef", (e6) => isRef(e6) && !e6.value && ("bigint" == typeof e6.value ? "0n" : JSON.stringify(e6.value) || "_")], ["ShallowRef", (e6) => isRef(e6) && isShallow(e6) && e6.value], ["ShallowReactive", (e6) => isReactive(e6) && isShallow(e6) && toRaw(e6)], ["Ref", (e6) => isRef(e6) && e6.value], ["Reactive", (e6) => isReactive(e6) && toRaw(e6)]];
    Qe = [X, defineNuxtPlugin({ name: "nuxt:router", enforce: "pre", async setup(e6) {
      let t5, r2, n2 = useRuntimeConfig().app.baseURL;
      const o4 = We.history?.(n2) ?? createMemoryHistory(n2), a3 = We.routes ? ([t5, r2] = executeAsync(() => We.routes($e)), t5 = await t5, r2(), t5 ?? $e) : $e;
      let s2;
      const i3 = createRouter({ ...We, scrollBehavior: /* @__PURE__ */ __name((e7, t6, r3) => {
        if (t6 !== ve) {
          if (We.scrollBehavior) {
            if (i3.options.scrollBehavior = We.scrollBehavior, "scrollRestoration" in (void 0).history) {
              const e8 = i3.beforeEach(() => {
                e8(), (void 0).history.scrollRestoration = "manual";
              });
            }
            return We.scrollBehavior(e7, ve, s2 || r3);
          }
        } else s2 = r3;
      }, "scrollBehavior"), history: o4, routes: a3 });
      e6.vueApp.use(i3);
      const c3 = shallowRef(i3.currentRoute.value);
      i3.afterEach((e7, t6) => {
        c3.value = t6;
      }), Object.defineProperty(e6.vueApp.config.globalProperties, "previousRoute", { get: /* @__PURE__ */ __name(() => c3.value, "get") });
      const l2 = e6.ssrContext.url, p2 = shallowRef(i3.currentRoute.value), syncCurrentRoute = /* @__PURE__ */ __name(() => {
        p2.value = i3.currentRoute.value;
      }, "syncCurrentRoute");
      i3.afterEach((e7, t6) => {
        e7.matched.at(-1)?.components?.default === t6.matched.at(-1)?.components?.default && syncCurrentRoute();
      });
      const f2 = { sync: syncCurrentRoute };
      for (const e7 in p2.value) Object.defineProperty(f2, e7, { get: /* @__PURE__ */ __name(() => p2.value[e7], "get"), enumerable: true });
      e6._route = shallowReactive(f2), e6._middleware ||= { global: [], named: {} }, e6.ssrContext?.islandContext || i3.afterEach(async (t6, r3, n3) => {
        delete e6._processingMiddleware, n3 && await e6.callHook("page:loading:end"), 4 !== n3?.type && t6.redirectedFrom && t6.fullPath !== l2 && await e6.runWithContext(() => navigateTo(t6.fullPath || "/"));
      });
      try {
        [t5, r2] = executeAsync(() => i3.push(l2)), await t5, r2(), [t5, r2] = executeAsync(() => i3.isReady()), await t5, r2();
      } catch (n3) {
        [t5, r2] = executeAsync(() => e6.runWithContext(() => showError(n3))), await t5, r2();
      }
      const d3 = i3.currentRoute.value;
      if (syncCurrentRoute(), e6.ssrContext?.islandContext) return { provide: { router: i3 } };
      const h3 = e6.payload.state._layout;
      return i3.beforeEach(async (t6, r3) => {
        if (await e6.callHook("page:loading:start"), t6.meta = reactive(t6.meta), e6.isHydrating && h3 && !isReadonly(t6.meta.layout) && (t6.meta.layout = h3), e6._processingMiddleware = true, !e6.ssrContext?.islandContext) {
          const n3 = /* @__PURE__ */ new Set([...Ve, ...e6._middleware.global]);
          for (const e7 of t6.matched) {
            const t7 = e7.meta.middleware;
            if (t7) for (const e8 of toArray(t7)) n3.add(e8);
          }
          const o5 = (function(e7) {
            const t7 = "string" == typeof e7 ? e7 : e7.path;
            try {
              return routeRulesMatcher(t7);
            } catch (e8) {
              return console.error("[nuxt] Error matching route rules.", e8), {};
            }
          })({ path: t6.path });
          if (o5.appMiddleware) for (const e7 in o5.appMiddleware) o5.appMiddleware[e7] ? n3.add(e7) : n3.delete(e7);
          for (const o6 of n3) {
            const n4 = "string" == typeof o6 ? e6._middleware.named[o6] || await ze[o6]?.().then((e7) => e7.default || e7) : o6;
            if (!n4) throw new Error(`Unknown route middleware: '${o6}'.`);
            try {
              0;
              const o7 = await e6.runWithContext(() => n4(t6, r3));
              if (false === o7 || o7 instanceof Error) {
                const t7 = o7 || createError2({ status: 404, statusText: `Page Not Found: ${l2}` });
                return await e6.runWithContext(() => showError(t7)), false;
              }
              if (true === o7) continue;
              if (false === o7) return o7;
              if (o7) return isNuxtError(o7) && o7.fatal && await e6.runWithContext(() => showError(o7)), o7;
            } catch (t7) {
              const r4 = createError2(t7);
              return r4.fatal && await e6.runWithContext(() => showError(r4)), r4;
            }
          }
        }
      }), i3.onError(async () => {
        delete e6._processingMiddleware, await e6.callHook("page:loading:end");
      }), i3.afterEach((t6) => {
        if (0 === t6.matched.length) return e6.runWithContext(() => showError(createError2({ status: 404, fatal: false, statusText: `Page not found: ${t6.fullPath}`, data: { path: t6.fullPath } })));
      }), e6.hooks.hookOnce("app:created", async () => {
        try {
          "name" in d3 && (d3.name = void 0), await i3.replace({ ...d3, force: true }), i3.options.scrollBehavior = We.scrollBehavior;
        } catch (t6) {
          await e6.runWithContext(() => showError(t6));
        }
      }), { provide: { router: i3 } };
    } }), defineNuxtPlugin({ name: "nuxt:revive-payload:server", setup() {
      for (const [e6, t5] of qe) definePayloadReducer(e6, t5);
    } }), defineNuxtPlugin({ name: "nuxt:global-components" })];
    Ke = ((e6 = "RouteProvider") => defineComponent({ name: e6, props: { route: { type: Object, required: true }, vnode: Object, vnodeRef: Object, renderKey: String, trackRootNodes: Boolean }, setup(e7) {
      const t5 = e7.renderKey, r2 = e7.route, n2 = {};
      for (const o4 in e7.route) Object.defineProperty(n2, o4, { get: /* @__PURE__ */ __name(() => t5 === e7.renderKey ? e7.route[o4] : r2[o4], "get"), enumerable: true });
      return provide(J, shallowReactive(n2)), () => e7.vnode ? h(e7.vnode, { ref: e7.vnodeRef }) : e7.vnode;
    } }))();
    Je = defineComponent({ name: "NuxtPage", inheritAttrs: false, props: { name: { type: String }, transition: { type: [Boolean, Object], default: void 0 }, keepalive: { type: [Boolean, Object], default: void 0 }, route: { type: Object }, pageKey: { type: [Function, String], default: null } }, setup(e6, { attrs: t5, slots: r2, expose: n2 }) {
      const o4 = useNuxtApp(), a3 = ref();
      return inject(J, null), n2({ pageRef: a3 }), inject(K, null), o4.deferHydration(), () => h(Me, { name: e6.name, route: e6.route, ...t5 }, { default: /* @__PURE__ */ __name((e7) => h(gt, { suspensible: true }, { default: /* @__PURE__ */ __name(() => h(Ke, { vnode: r2.default ? normalizeSlot(r2.default, e7) : e7.Component, route: e7.route, vnodeRef: a3 }), "default") }), "default") });
    } });
    __name(normalizeSlot, "normalizeSlot");
    _export_sfc = /* @__PURE__ */ __name((e6, t5) => {
      const r2 = e6.__vccOpts || e6;
      for (const [e7, n2] of t5) r2[e7] = n2;
      return r2;
    }, "_export_sfc");
    Ye = {};
    Ze = Ye.setup;
    Ye.setup = (e6, t5) => {
      const r2 = useSSRContext();
      return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("app.vue"), Ze ? Ze(e6, t5) : void 0;
    };
    Xe = _export_sfc(Ye, [["ssrRender", function(e6, t5, r2, n2) {
      t5(ssrRenderComponent(Je, n2, null, r2));
    }]]);
    et2 = { __name: "nuxt-error-page", __ssrInlineRender: true, props: { error: Object }, setup(e6) {
      const t5 = e6.error, r2 = Number(t5.statusCode || 500), n2 = 404 === r2, o4 = t5.statusMessage ?? (n2 ? "Page Not Found" : "Internal Server Error"), a3 = t5.message || t5.toString(), s2 = defineAsyncComponent(() => Promise.resolve().then(() => (init_error_404_CN4UAoxx(), error_404_CN4UAoxx_exports))), i3 = defineAsyncComponent(() => Promise.resolve().then(() => (init_error_500_aqj5ztcB(), error_500_aqj5ztcB_exports))), c3 = n2 ? s2 : i3;
      return (e7, t6, n3, s3) => {
        t6(ssrRenderComponent(unref(c3), mergeProps({ status: unref(r2), statusText: unref(o4), statusCode: unref(r2), statusMessage: unref(o4), description: unref(a3), stack: unref(void 0) }, s3), null, n3));
      };
    } };
    tt = et2.setup;
    et2.setup = (e6, t5) => {
      const r2 = useSSRContext();
      return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/nuxt-error-page.vue"), tt ? tt(e6, t5) : void 0;
    };
    rt = { __name: "nuxt-root", __ssrInlineRender: true, setup(e6) {
      const IslandRenderer = /* @__PURE__ */ __name(() => null, "IslandRenderer"), t5 = useNuxtApp();
      t5.deferHydration(), t5.ssrContext.url;
      const r2 = false;
      provide(J, hasInjectionContext() ? inject(J, useNuxtApp()._route) : useNuxtApp()._route), t5.hooks.callHookWith((e7) => e7.map((e8) => e8()), "vue:setup");
      const n2 = useError(), o4 = n2.value && !t5.ssrContext.error;
      onErrorCaptured((e7, r3, n3) => {
        t5.hooks.callHook("vue:error", e7, r3, n3).catch((e8) => console.error("[nuxt] Error in `vue:error` hook", e8));
        {
          const r4 = t5.runWithContext(() => showError(e7));
          return et(() => r4), false;
        }
      });
      const a3 = t5.ssrContext.islandContext;
      return (e7, t6, s2, i3) => {
        ssrRenderSuspense(t6, { default: /* @__PURE__ */ __name(() => {
          unref(o4) ? t6("<div></div>") : unref(n2) ? t6(ssrRenderComponent(unref(et2), { error: unref(n2) }, null, s2)) : unref(a3) ? t6(ssrRenderComponent(unref(IslandRenderer), { context: unref(a3) }, null, s2)) : unref(r2) ? renderVNode(t6, createVNode(resolveDynamicComponent(unref(r2)), null, null), s2) : t6(ssrRenderComponent(unref(Xe), null, null, s2));
        }, "default") });
      };
    } };
    nt = rt.setup;
    rt.setup = (e6, t5) => {
      const r2 = useSSRContext();
      return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/nuxt-root.vue"), nt ? nt(e6, t5) : void 0;
    }, ot = /* @__PURE__ */ __name(async function(e6) {
      const t5 = createApp(rt), r2 = (function(e7) {
        let t6 = 0;
        const r3 = { _id: e7.id || q2 || "nuxt-app", _scope: effectScope(), provide: void 0, versions: { get nuxt() {
          return "4.3.0";
        }, get vue() {
          return r3.vueApp.version;
        } }, payload: shallowReactive({ ...e7.ssrContext?.payload || {}, data: shallowReactive({}), state: reactive({}), once: /* @__PURE__ */ new Set(), _errors: shallowReactive({}) }), static: { data: {} }, runWithContext: /* @__PURE__ */ __name((e8) => r3._scope.active && !getCurrentScope() ? r3._scope.run(() => callWithNuxt(r3, e8)) : callWithNuxt(r3, e8), "runWithContext"), isHydrating: false, deferHydration() {
          if (!r3.isHydrating) return () => {
          };
          t6++;
          let e8 = false;
          return () => {
            if (!e8) return e8 = true, t6--, 0 === t6 ? (r3.isHydrating = false, r3.callHook("app:suspense:resolve")) : void 0;
          };
        }, _asyncDataPromises: {}, _asyncData: shallowReactive({}), _payloadRevivers: {}, ...e7 };
        r3.payload.serverRendered = true, r3.ssrContext && (r3.payload.path = r3.ssrContext.url, r3.ssrContext.nuxt = r3, r3.ssrContext.payload = r3.payload, r3.ssrContext.config = { public: r3.ssrContext.runtimeConfig.public, app: r3.ssrContext.runtimeConfig.app }), r3.hooks = createHooks(), r3.hook = r3.hooks.hook;
        {
          const contextCaller = /* @__PURE__ */ __name(async function(e8, t7) {
            for (const n3 of e8) await r3.runWithContext(() => n3(...t7));
          }, "contextCaller");
          r3.hooks.callHook = (e8, ...t7) => r3.hooks.callHookWith(contextCaller, e8, ...t7);
        }
        r3.callHook = r3.hooks.callHook, r3.provide = (e8, t7) => {
          const n3 = "$" + e8;
          defineGetter(r3, n3, t7), defineGetter(r3.vueApp.config.globalProperties, n3, t7);
        }, defineGetter(r3.vueApp, "$nuxt", r3), defineGetter(r3.vueApp.config.globalProperties, "$nuxt", r3);
        const n2 = e7.ssrContext.runtimeConfig;
        return r3.provide("config", n2), r3;
      })({ vueApp: t5, ssrContext: e6 });
      try {
        await (async function(e7, t6) {
          const r3 = /* @__PURE__ */ new Set(), n2 = [], o4 = [];
          let a3, s2 = 0;
          async function executePlugin(i3) {
            const c3 = i3.dependsOn?.filter((e8) => t6.some((t7) => t7._name === e8) && !r3.has(e8)) ?? [];
            if (c3.length > 0) n2.push([new Set(c3), i3]);
            else {
              const t7 = (async function(e8, t8) {
                if ("function" == typeof t8) {
                  const { provide: r4 } = await e8.runWithContext(() => t8(e8)) || {};
                  if (r4 && "object" == typeof r4) for (const t9 in r4) e8.provide(t9, r4[t9]);
                }
              })(e7, i3).then(async () => {
                i3._name && (r3.add(i3._name), await Promise.all(n2.map(async ([e8, t8]) => {
                  e8.has(i3._name) && (e8.delete(i3._name), 0 === e8.size && (s2++, await executePlugin(t8)));
                })));
              }).catch((t8) => {
                if (!i3.parallel && !e7.payload.error) throw t8;
                a3 ||= t8;
              });
              i3.parallel ? o4.push(t7) : await t7;
            }
          }
          __name(executePlugin, "executePlugin");
          for (const r4 of t6) e7.ssrContext?.islandContext && false === r4.env?.islands || registerPluginHooks(e7, r4);
          for (const r4 of t6) e7.ssrContext?.islandContext && false === r4.env?.islands || await executePlugin(r4);
          if (await Promise.all(o4), s2) for (let e8 = 0; e8 < s2; e8++) await Promise.all(o4);
          if (a3) throw e7.payload.error || a3;
        })(r2, Qe), await r2.hooks.callHook("app:created", t5);
      } catch (e7) {
        await r2.hooks.callHook("app:error", e7), r2.payload.error ||= createError2(e7);
      }
      if (e6 && (e6["~renderResponse"] || e6._renderResponse)) throw new Error("skipping render");
      return t5;
    }, "ot");
    entry_default = /* @__PURE__ */ __name((e6) => ot(e6), "entry_default");
  }
});

// .output/server/chunks/virtual/_virtual_spa-template.mjs
var virtual_spa_template_exports = {};
__export(virtual_spa_template_exports, {
  template: () => o2
});
var o2;
var init_virtual_spa_template = __esm({
  ".output/server/chunks/virtual/_virtual_spa-template.mjs"() {
    init_modules_watch_stub();
    o2 = "";
  }
});

// .output/server/chunks/build/error-404-styles.CIDft5g5.mjs
var error_404_styles_CIDft5g5_exports = {};
__export(error_404_styles_CIDft5g5_exports, {
  default: () => t3
});
var t3;
var init_error_404_styles_CIDft5g5 = __esm({
  ".output/server/chunks/build/error-404-styles.CIDft5g5.mjs"() {
    init_modules_watch_stub();
    t3 = [".grid[data-v-3ff5756b]{display:grid}.mb-2[data-v-3ff5756b]{margin-bottom:.5rem}.mb-4[data-v-3ff5756b]{margin-bottom:1rem}.max-w-520px[data-v-3ff5756b]{max-width:520px}.min-h-screen[data-v-3ff5756b]{min-height:100vh}.w-full[data-v-3ff5756b]{width:100%}.flex[data-v-3ff5756b]{display:flex}.place-content-center[data-v-3ff5756b]{place-content:center}.items-center[data-v-3ff5756b]{align-items:center}.justify-center[data-v-3ff5756b]{justify-content:center}.overflow-hidden[data-v-3ff5756b]{overflow:hidden}.bg-white[data-v-3ff5756b]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2[data-v-3ff5756b]{padding-left:.5rem;padding-right:.5rem}.text-center[data-v-3ff5756b]{text-align:center}.text-\\[80px\\][data-v-3ff5756b]{font-size:80px}.text-2xl[data-v-3ff5756b]{font-size:1.5rem;line-height:2rem}.text-sm[data-v-3ff5756b]{font-size:.875rem;line-height:1.25rem}.text-\\[\\#020420\\][data-v-3ff5756b]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\][data-v-3ff5756b]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.hover\\:text-\\[\\#00DC82\\][data-v-3ff5756b]:hover{--un-text-opacity:1;color:rgb(0 220 130/var(--un-text-opacity))}.font-medium[data-v-3ff5756b]{font-weight:500}.font-semibold[data-v-3ff5756b]{font-weight:600}.leading-none[data-v-3ff5756b]{line-height:1}.tracking-wide[data-v-3ff5756b]{letter-spacing:.025em}.font-sans[data-v-3ff5756b]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums[data-v-3ff5756b]{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.underline[data-v-3ff5756b]{text-decoration-line:underline}.underline-offset-3[data-v-3ff5756b]{text-underline-offset:3px}.antialiased[data-v-3ff5756b]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\][data-v-3ff5756b]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white[data-v-3ff5756b]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\][data-v-3ff5756b]{font-size:110px}.sm\\:text-3xl[data-v-3ff5756b]{font-size:1.875rem;line-height:2.25rem}}"];
  }
});

// .output/server/chunks/build/error-500-styles.DbvwQeKf.mjs
var error_500_styles_DbvwQeKf_exports = {};
__export(error_500_styles_DbvwQeKf_exports, {
  default: () => e3
});
var e3;
var init_error_500_styles_DbvwQeKf = __esm({
  ".output/server/chunks/build/error-500-styles.DbvwQeKf.mjs"() {
    init_modules_watch_stub();
    e3 = [".grid[data-v-e774f552]{display:grid}.mb-2[data-v-e774f552]{margin-bottom:.5rem}.mb-4[data-v-e774f552]{margin-bottom:1rem}.max-w-520px[data-v-e774f552]{max-width:520px}.min-h-screen[data-v-e774f552]{min-height:100vh}.place-content-center[data-v-e774f552]{place-content:center}.overflow-hidden[data-v-e774f552]{overflow:hidden}.bg-white[data-v-e774f552]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2[data-v-e774f552]{padding-left:.5rem;padding-right:.5rem}.text-center[data-v-e774f552]{text-align:center}.text-\\[80px\\][data-v-e774f552]{font-size:80px}.text-2xl[data-v-e774f552]{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\][data-v-e774f552]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\][data-v-e774f552]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold[data-v-e774f552]{font-weight:600}.leading-none[data-v-e774f552]{line-height:1}.tracking-wide[data-v-e774f552]{letter-spacing:.025em}.font-sans[data-v-e774f552]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums[data-v-e774f552]{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased[data-v-e774f552]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\][data-v-e774f552]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white[data-v-e774f552]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\][data-v-e774f552]{font-size:110px}.sm\\:text-3xl[data-v-e774f552]{font-size:1.875rem;line-height:2.25rem}}"];
  }
});

// .output/server/chunks/build/styles.mjs
var styles_exports = {};
__export(styles_exports, {
  default: () => e4
});
var interopDefault, e4;
var init_styles = __esm({
  ".output/server/chunks/build/styles.mjs"() {
    init_modules_watch_stub();
    interopDefault = /* @__PURE__ */ __name((e6) => e6.default || e6 || [], "interopDefault");
    e4 = { "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_404_styles_CIDft5g5(), error_404_styles_CIDft5g5_exports)).then(interopDefault), "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue"), "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_500_styles_DbvwQeKf(), error_500_styles_DbvwQeKf_exports)).then(interopDefault), "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue"), "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue?vue&type=style&index=0&scoped=3ff5756b&lang.css": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_404_styles_CIDft5g5(), error_404_styles_CIDft5g5_exports)).then(interopDefault), "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-404.vue?vue&type=style&index=0&scoped=3ff5756b&lang.css"), "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue?vue&type=style&index=0&scoped=e774f552&lang.css": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_500_styles_DbvwQeKf(), error_500_styles_DbvwQeKf_exports)).then(interopDefault), "../../node_modules/.pnpm/nuxt@4.3.0_@parcel+watcher@2.5.6_@vue+compiler-sfc@3.5.28_cac@6.7.14_db0@0.3.4_ioredis@_3de968229d285d2fcd9caa1c5b755275/node_modules/nuxt/dist/app/components/error-500.vue?vue&type=style&index=0&scoped=e774f552&lang.css") };
  }
});

// .output/server/chunks/routes/renderer.mjs
var renderer_exports = {};
__export(renderer_exports, {
  A: () => mergeProps,
  B: () => defineAsyncComponent,
  C: () => defineComponent,
  D: () => h,
  E: () => computed,
  F: () => watch,
  G: () => ref,
  H: () => yt,
  I: () => ssrRenderAttrs,
  J: () => ssrInterpolate,
  K: () => withCtx,
  L: () => createTextVNode,
  M: () => toDisplayString,
  N: () => resolveComponent,
  O: () => useHead,
  P: () => Zt,
  Q: () => Tn,
  S: () => gt,
  a: () => shallowReactive,
  b: () => baseURL,
  c: () => createApp,
  d: () => getCurrentScope,
  e: () => effectScope,
  f: () => shallowRef,
  g: () => getCurrentInstance,
  h: () => hasInjectionContext,
  i: () => inject,
  j: () => isReadonly,
  k: () => et,
  l: () => unref,
  m: () => ssrRenderComponent,
  n: () => renderVNode,
  o: () => onErrorCaptured,
  p: () => provide,
  q: () => createVNode,
  r: () => reactive,
  s: () => ssrRenderSuspense,
  t: () => toRef,
  u: () => useSSRContext,
  v: () => resolveDynamicComponent,
  w: () => isRef,
  x: () => isShallow,
  y: () => isReactive,
  z: () => toRaw
});
function getModuleDependencies(e6, t5) {
  if (t5._dependencies[e6]) return t5._dependencies[e6];
  const n2 = t5._dependencies[e6] = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
  if (!t5.manifest) return n2;
  const r2 = t5.manifest[e6];
  if (!r2) return n2;
  r2.file && (n2.preload[e6] = r2, (r2.isEntry || r2.sideEffects) && (n2.scripts[e6] = r2));
  for (const e7 of r2.css || []) n2.styles[e7] = n2.preload[e7] = n2.prefetch[e7] = t5.manifest[e7];
  for (const e7 of r2.assets || []) n2.preload[e7] = n2.prefetch[e7] = t5.manifest[e7];
  for (const e7 of r2.imports || []) {
    const r3 = getModuleDependencies(e7, t5);
    for (const e8 in r3.styles) n2.styles[e8] = r3.styles[e8];
    for (const e8 in r3.preload) n2.preload[e8] = r3.preload[e8];
    for (const e8 in r3.prefetch) n2.prefetch[e8] = r3.prefetch[e8];
  }
  const s2 = {};
  for (const e7 in n2.preload) {
    const t6 = n2.preload[e7];
    t6.preload && (s2[e7] = t6);
  }
  return n2.preload = s2, n2;
}
function getRequestDependencies(e6, t5) {
  if (e6._requestDependencies) return e6._requestDependencies;
  const n2 = (function(e7, t6) {
    let n3 = "";
    const r2 = [...e7].sort();
    for (let e8 = 0; e8 < r2.length; e8++) e8 > 0 && (n3 += ","), n3 += r2[e8];
    if (t6._dependencySets[n3]) return t6._dependencySets[n3];
    const s2 = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
    for (const n4 of e7) {
      const e8 = getModuleDependencies(n4, t6);
      for (const t7 in e8.scripts) s2.scripts[t7] = e8.scripts[t7];
      for (const t7 in e8.styles) s2.styles[t7] = e8.styles[t7];
      for (const t7 in e8.preload) s2.preload[t7] = e8.preload[t7];
      for (const t7 in e8.prefetch) s2.prefetch[t7] = e8.prefetch[t7];
      for (const e9 of t6.manifest?.[n4]?.dynamicImports || []) {
        const n5 = getModuleDependencies(e9, t6);
        for (const e10 in n5.scripts) s2.prefetch[e10] = n5.scripts[e10];
        for (const e10 in n5.styles) s2.prefetch[e10] = n5.styles[e10];
        for (const e10 in n5.preload) s2.prefetch[e10] = n5.preload[e10];
      }
    }
    const o4 = {};
    for (const e8 in s2.prefetch) {
      const t7 = s2.prefetch[e8];
      t7.prefetch && (o4[e8] = t7);
    }
    s2.prefetch = o4;
    for (const e8 in s2.preload) delete s2.prefetch[e8];
    for (const e8 in s2.styles) delete s2.preload[e8], delete s2.prefetch[e8];
    return t6._dependencySets[n3] = s2, s2;
  })(new Set(Array.from([...t5._entrypoints, ...e6.modules || e6._registeredComponents || []])), t5);
  return e6._requestDependencies = n2, n2;
}
function renderStyles(e6, t5) {
  const { styles: n2 } = getRequestDependencies(e6, t5);
  let r2 = "";
  for (const e7 in n2) {
    const s2 = n2[e7];
    r2 += `<link rel="stylesheet" href="${t5.buildAssetsURL(s2.file)}" crossorigin>`;
  }
  return r2;
}
function renderResourceHints(e6, t5) {
  const { preload: n2, prefetch: r2 } = getRequestDependencies(e6, t5);
  let s2 = "";
  for (const e7 in n2) {
    const r3 = n2[e7], o4 = t5.buildAssetsURL(r3.file), i3 = r3.module ? "modulepreload" : "preload", a3 = "style" === r3.resourceType || "font" === r3.resourceType || "script" === r3.resourceType || r3.module ? " crossorigin" : "";
    r3.resourceType && r3.mimeType ? s2 += `<link rel="${i3}" as="${r3.resourceType}" type="${r3.mimeType}"${a3} href="${o4}">` : r3.resourceType ? s2 += `<link rel="${i3}" as="${r3.resourceType}"${a3} href="${o4}">` : s2 += `<link rel="${i3}"${a3} href="${o4}">`;
  }
  for (const e7 in r2) {
    const n3 = r2[e7], o4 = t5.buildAssetsURL(n3.file), i3 = "style" === n3.resourceType || "font" === n3.resourceType || "script" === n3.resourceType || n3.module ? " crossorigin" : "";
    n3.resourceType && n3.mimeType ? s2 += `<link rel="prefetch" as="${n3.resourceType}" type="${n3.mimeType}"${i3} href="${o4}">` : n3.resourceType ? s2 += `<link rel="prefetch" as="${n3.resourceType}"${i3} href="${o4}">` : s2 += `<link rel="prefetch"${i3} href="${o4}">`;
  }
  return s2;
}
function renderResourceHeaders(e6, t5) {
  const { preload: n2, prefetch: r2 } = getRequestDependencies(e6, t5), s2 = [];
  for (const e7 in n2) {
    const r3 = n2[e7];
    let o4 = `<${t5.buildAssetsURL(r3.file)}>; rel="${r3.module ? "modulepreload" : "preload"}"`;
    r3.resourceType && (o4 += `; as="${r3.resourceType}"`), r3.mimeType && (o4 += `; type="${r3.mimeType}"`), ("style" === r3.resourceType || "font" === r3.resourceType || "script" === r3.resourceType || r3.module) && (o4 += "; crossorigin"), s2.push(o4);
  }
  for (const e7 in r2) {
    const n3 = r2[e7];
    let o4 = `<${t5.buildAssetsURL(n3.file)}>; rel="prefetch"`;
    n3.resourceType && (o4 += `; as="${n3.resourceType}"`), n3.mimeType && (o4 += `; type="${n3.mimeType}"`), ("style" === n3.resourceType || "font" === n3.resourceType || "script" === n3.resourceType || n3.module) && (o4 += "; crossorigin"), s2.push(o4);
  }
  return { link: s2.join(", ") };
}
function getPreloadLinks(e6, t5) {
  const { preload: n2 } = getRequestDependencies(e6, t5), r2 = [];
  for (const e7 in n2) {
    const s2 = n2[e7];
    r2.push({ rel: s2.module ? "modulepreload" : "preload", as: s2.resourceType, type: s2.mimeType ?? null, crossorigin: "style" === s2.resourceType || "font" === s2.resourceType || "script" === s2.resourceType || s2.module ? "" : null, href: t5.buildAssetsURL(s2.file) });
  }
  return r2;
}
function getPrefetchLinks(e6, t5) {
  const { prefetch: n2 } = getRequestDependencies(e6, t5), r2 = [];
  for (const e7 in n2) {
    const s2 = n2[e7];
    r2.push({ rel: "prefetch", as: s2.resourceType, type: s2.mimeType ?? null, crossorigin: "style" === s2.resourceType || "font" === s2.resourceType || "script" === s2.resourceType || s2.module ? "" : null, href: t5.buildAssetsURL(s2.file) });
  }
  return r2;
}
function renderScripts(e6, t5) {
  const { scripts: n2 } = getRequestDependencies(e6, t5);
  let r2 = "";
  for (const e7 in n2) {
    const s2 = n2[e7];
    s2.module ? r2 += `<script type="module" src="${t5.buildAssetsURL(s2.file)}" crossorigin><\/script>` : r2 += `<script src="${t5.buildAssetsURL(s2.file)}" defer crossorigin><\/script>`;
  }
  return r2;
}
function createRenderer$1(t5, n2) {
  const r2 = (function({ manifest: t6, precomputed: n3, buildAssetsURL: r3 }) {
    if (!t6 && !n3) throw new Error("Either manifest or precomputed data must be provided");
    const s2 = { buildAssetsURL: r3 || withLeadingSlash, manifest: t6, precomputed: n3, updateManifest, _dependencies: {}, _dependencySets: {}, _entrypoints: [] };
    function updateManifest(e6) {
      const t7 = Object.entries(e6);
      s2.manifest = e6, s2._dependencies = {}, s2._dependencySets = {}, s2._entrypoints = t7.filter((e7) => e7[1].isEntry).map(([e7]) => e7);
    }
    __name(updateManifest, "updateManifest");
    return n3 ? (s2._dependencies = n3.dependencies, s2._entrypoints = n3.entrypoints) : t6 && updateManifest(t6), s2;
  })(n2);
  return { rendererContext: r2, async renderToString(e6) {
    e6._registeredComponents = e6._registeredComponents || /* @__PURE__ */ new Set();
    const s2 = await Promise.resolve(t5).then((e7) => "default" in e7 ? e7.default : e7), o4 = await s2(e6), wrap = /* @__PURE__ */ __name((t6) => () => t6(e6, r2), "wrap");
    return { html: await n2.renderToString(o4, e6), renderResourceHeaders: wrap(renderResourceHeaders), renderResourceHints: wrap(renderResourceHints), renderStyles: wrap(renderStyles), renderScripts: wrap(renderScripts) };
  } };
}
function flatHooks(e6, t5 = {}, n2) {
  for (const r2 in e6) {
    const s2 = e6[r2], o4 = n2 ? `${n2}:${r2}` : r2;
    "object" == typeof s2 && null !== s2 ? flatHooks(s2, t5, o4) : "function" == typeof s2 && (t5[o4] = s2);
  }
  return t5;
}
function callHooks(e6, t5, n2, r2) {
  for (let s2 = n2; s2 < e6.length; s2 += 1) try {
    const n3 = r2 ? r2.run(() => e6[s2](...t5)) : e6[s2](...t5);
    if (n3 instanceof Promise) return n3.then(() => callHooks(e6, t5, s2 + 1, r2));
  } catch (e7) {
    return Promise.reject(e7);
  }
}
function serialTaskCaller(e6, t5, n2) {
  if (e6.length > 0) return callHooks(e6, t5, 0, g(n2));
}
function parallelTaskCaller(e6, t5, n2) {
  if (e6.length > 0) {
    const r2 = g(n2);
    return Promise.all(e6.map((e7) => r2.run(() => e7(...t5))));
  }
}
function callEachWith(e6, t5) {
  for (const n2 of [...e6]) n2(t5);
}
function dedupeKey(e6) {
  const { props: t5, tag: n2 } = e6;
  if (k.has(n2)) return n2;
  if ("link" === n2 && "canonical" === t5.rel) return "canonical";
  const r2 = t5.hreflang || t5.type;
  if ("link" === n2 && "alternate" === t5.rel && r2) return `alternate:${r2}`;
  if (t5.charset) return "charset";
  if ("meta" === e6.tag) {
    for (const r3 of C2) if (void 0 !== t5[r3]) {
      const s2 = t5[r3], o4 = s2 && "string" == typeof s2 && s2.includes(":"), i3 = s2 && x.has(s2);
      return `${n2}:${s2}${!(o4 || i3) && e6.key ? `:key:${e6.key}` : ""}`;
    }
  }
  if (e6.key) return `${n2}:key:${e6.key}`;
  if (t5.id) return `${n2}:id:${t5.id}`;
  if (_2.has(n2)) {
    const t6 = e6.textContent || e6.innerHTML;
    if (t6) return `${n2}:content:${t6}`;
  }
}
function walkResolver(e6, t5, n2) {
  "function" === typeof e6 && (n2 && ("titleTemplate" === n2 || "o" === n2[0] && "n" === n2[1]) || (e6 = e6()));
  const r2 = t5 ? t5(n2, e6) : e6;
  if (Array.isArray(r2)) return r2.map((e7) => walkResolver(e7, t5));
  if (r2?.constructor === Object) {
    const e7 = {};
    for (const n3 of Object.keys(r2)) e7[n3] = walkResolver(r2[n3], t5, n3);
    return e7;
  }
  return r2;
}
function normalizeProps(e6, t5) {
  return e6.props = e6.props || {}, t5 ? "templateParams" === e6.tag ? (e6.props = t5, e6) : (Object.entries(t5).forEach(([n2, r2]) => {
    if (null === r2) return void (e6.props[n2] = null);
    if ("class" === n2 || "style" === n2) return void (e6.props[n2] = (function(e7, t6) {
      const n3 = "style" === e7 ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set();
      function processValue(t7) {
        if (null == t7 || void 0 === t7) return;
        const r3 = String(t7).trim();
        if (r3) if ("style" === e7) {
          const [e8, ...t8] = r3.split(":").map((e9) => e9 ? e9.trim() : "");
          e8 && t8.length && n3.set(e8, t8.join(":"));
        } else r3.split(" ").filter(Boolean).forEach((e8) => n3.add(e8));
      }
      __name(processValue, "processValue");
      return "string" == typeof t6 ? "style" === e7 ? t6.split(";").forEach(processValue) : processValue(t6) : Array.isArray(t6) ? t6.forEach((e8) => processValue(e8)) : t6 && "object" == typeof t6 && Object.entries(t6).forEach(([t7, r3]) => {
        r3 && "false" !== r3 && ("style" === e7 ? n3.set(String(t7).trim(), String(r3)) : processValue(t7));
      }), n3;
    })(n2, r2));
    if (w.has(n2)) {
      if (["textContent", "innerHTML"].includes(n2) && "object" == typeof r2) {
        let s3 = t5.type;
        if (t5.type || (s3 = "application/json"), !s3?.endsWith("json") && "speculationrules" !== s3) return;
        t5.type = s3, e6.props.type = s3, e6[n2] = JSON.stringify(r2);
      } else e6[n2] = r2;
      return;
    }
    const s2 = String(r2), o4 = n2.startsWith("data-"), i3 = "meta" === e6.tag && "content" === n2;
    "true" === s2 || "" === s2 ? e6.props[n2] = !o4 && !i3 || s2 : !r2 && o4 && "false" === s2 ? e6.props[n2] = "false" : void 0 !== r2 && (e6.props[n2] = r2);
  }), e6) : e6;
}
function normalizeTag(e6, t5) {
  const n2 = normalizeProps({ tag: e6, props: {} }, "object" == typeof t5 && "function" != typeof t5 ? t5 : { ["script" === e6 || "noscript" === e6 || "style" === e6 ? "innerHTML" : "textContent"]: t5 });
  return n2.key && v.has(n2.tag) && (n2.props["data-hid"] = n2._h = n2.key), "script" === n2.tag && "object" == typeof n2.innerHTML && (n2.innerHTML = JSON.stringify(n2.innerHTML), n2.props.type = n2.props.type || "application/json"), Array.isArray(n2.props.content) ? n2.props.content.map((e7) => ({ ...n2, props: { ...n2.props, content: e7 } })) : n2;
}
function normalizeEntryToTags(e6, t5) {
  if (!e6) return [];
  "function" == typeof e6 && (e6 = e6());
  const resolvers = /* @__PURE__ */ __name((e7, n3) => {
    for (let r2 = 0; r2 < t5.length; r2++) n3 = t5[r2](e7, n3);
    return n3;
  }, "resolvers");
  e6 = resolvers(void 0, e6);
  const n2 = [];
  return e6 = walkResolver(e6, resolvers), Object.entries(e6 || {}).forEach(([e7, t6]) => {
    if (void 0 !== t6) for (const r2 of Array.isArray(t6) ? t6 : [t6]) n2.push(normalizeTag(e7, r2));
  }), n2.flat();
}
function tagWeight(e6, t5) {
  if ("number" == typeof t5.tagPriority) return t5.tagPriority;
  let n2 = 100;
  const r2 = T[t5.tagPriority] || 0, s2 = e6.resolvedOptions.disableCapoSorting ? { link: {}, script: {}, style: {} } : $;
  if (t5.tag in A2) n2 = A2[t5.tag];
  else if ("meta" === t5.tag) {
    const e7 = "content-security-policy" === t5.props["http-equiv"] ? "content-security-policy" : t5.props.charset ? "charset" : "viewport" === t5.props.name ? "viewport" : null;
    e7 && (n2 = $.meta[e7]);
  } else if ("link" === t5.tag && t5.props.rel) n2 = s2.link[t5.props.rel];
  else if ("script" === t5.tag) {
    const e7 = String(t5.props.type);
    isTruthy(t5.props.async) ? n2 = s2.script.async : t5.props.src && !isTruthy(t5.props.defer) && !isTruthy(t5.props.async) && "module" !== e7 && !e7.endsWith("json") || t5.innerHTML && !e7.endsWith("json") ? n2 = s2.script.sync : (isTruthy(t5.props.defer) && t5.props.src && !isTruthy(t5.props.async) || "module" === e7) && (n2 = s2.script.defer);
  } else "style" === t5.tag && (n2 = t5.innerHTML && O.test(t5.innerHTML) ? s2.style.imported : s2.style.sync);
  return (n2 || 100) + r2;
}
function registerPlugin(e6, t5) {
  const n2 = "function" == typeof t5 ? t5(e6) : t5, r2 = n2.key || String(e6.plugins.size + 1);
  e6.plugins.get(r2) || (e6.plugins.set(r2, n2), e6.hooks.addHooks(n2.hooks || {}));
}
function createUnhead(e6 = {}) {
  const t5 = new y();
  t5.addHooks(e6.hooks || {});
  const n2 = !e6.document, r2 = /* @__PURE__ */ new Map(), s2 = /* @__PURE__ */ new Map(), o4 = /* @__PURE__ */ new Set(), i3 = { _entryCount: 1, plugins: s2, dirty: false, resolvedOptions: e6, hooks: t5, ssr: n2, entries: r2, headEntries: /* @__PURE__ */ __name(() => [...r2.values()], "headEntries"), use: /* @__PURE__ */ __name((e7) => registerPlugin(i3, e7), "use"), push(e7, s3) {
    const a3 = { ...s3 || {} };
    delete a3.head;
    const l2 = a3._index ?? i3._entryCount++, c3 = { _i: l2, input: e7, options: a3 }, u3 = { _poll(e8 = false) {
      i3.dirty = true, !e8 && o4.add(l2), t5.callHook("entries:updated", i3);
    }, dispose() {
      r2.delete(l2) && i3.invalidate();
    }, patch(e8) {
      (!a3.mode || "server" === a3.mode && n2 || "client" === a3.mode && !n2) && (c3.input = e8, r2.set(l2, c3), u3._poll());
    } };
    return u3.patch(e7), u3;
  }, async resolveTags() {
    const n3 = { tagMap: /* @__PURE__ */ new Map(), tags: [], entries: [...i3.entries.values()] };
    for (await t5.callHook("entries:resolve", n3); o4.size; ) {
      const n4 = o4.values().next().value;
      o4.delete(n4);
      const s4 = r2.get(n4);
      if (s4) {
        const n5 = { tags: normalizeEntryToTags(s4.input, e6.propResolvers || []).map((e7) => Object.assign(e7, s4.options)), entry: s4 };
        await t5.callHook("entries:normalize", n5), s4._tags = n5.tags.map((e7, t6) => (e7._w = tagWeight(i3, e7), e7._p = (s4._i << 10) + t6, e7._d = dedupeKey(e7), e7));
      }
    }
    let s3 = false;
    n3.entries.flatMap((e7) => (e7._tags || []).map((e8) => ({ ...e8, props: { ...e8.props } }))).sort(sortTags).reduce((e7, t6) => {
      const n4 = String(t6._d || t6._p);
      if (!e7.has(n4)) return e7.set(n4, t6);
      const r3 = e7.get(n4);
      if ("merge" === (t6?.tagDuplicateStrategy || (S.has(t6.tag) ? "merge" : null) || (t6.key && t6.key === r3.key ? "merge" : null))) {
        const s4 = { ...r3.props };
        Object.entries(t6.props).forEach(([e8, t7]) => s4[e8] = "style" === e8 ? new Map([...r3.props.style || /* @__PURE__ */ new Map(), ...t7]) : "class" === e8 ? /* @__PURE__ */ new Set([...r3.props.class || /* @__PURE__ */ new Set(), ...t7]) : t7), e7.set(n4, { ...t6, props: s4 });
      } else t6._p >> 10 == r3._p >> 10 && "meta" === t6.tag && (function(e8) {
        const t7 = e8.split(":");
        return !!t7.length && R.has(t7[1]);
      })(n4) ? (e7.set(n4, Object.assign([...Array.isArray(r3) ? r3 : [r3], t6], t6)), s3 = true) : (t6._w === r3._w ? t6._p > r3._p : t6?._w < r3?._w) && e7.set(n4, t6);
      return e7;
    }, n3.tagMap);
    const a3 = n3.tagMap.get("title"), l2 = n3.tagMap.get("titleTemplate");
    if (i3._title = a3?.textContent, l2) {
      const e7 = l2?.textContent;
      if (i3._titleTemplate = e7, e7) {
        let t6 = "function" == typeof e7 ? e7(a3?.textContent) : e7;
        "string" != typeof t6 || i3.plugins.has("template-params") || (t6 = t6.replace("%s", a3?.textContent || "")), a3 ? null === t6 ? n3.tagMap.delete("title") : n3.tagMap.set("title", { ...a3, textContent: t6 }) : (l2.tag = "title", l2.textContent = t6);
      }
    }
    n3.tags = Array.from(n3.tagMap.values()), s3 && (n3.tags = n3.tags.flat().sort(sortTags)), await t5.callHook("tags:beforeResolve", n3), await t5.callHook("tags:resolve", n3), await t5.callHook("tags:afterResolve", n3);
    const c3 = [];
    for (const e7 of n3.tags) {
      const { innerHTML: t6, tag: n4, props: r3 } = e7;
      if (b.has(n4) && ((0 !== Object.keys(r3).length || e7.innerHTML || e7.textContent) && ("meta" !== n4 || r3.content || r3["http-equiv"] || r3.charset))) {
        if ("script" === n4 && t6) {
          if (String(r3.type).endsWith("json")) {
            const n5 = "string" == typeof t6 ? t6 : JSON.stringify(t6);
            e7.innerHTML = n5.replace(/</g, "\\u003C");
          } else "string" == typeof t6 && (e7.innerHTML = t6.replace(new RegExp(`</${n4}`, "g"), `<\\/${n4}`));
          e7._d = dedupeKey(e7);
        }
        c3.push(e7);
      }
    }
    return c3;
  }, invalidate() {
    for (const e7 of r2.values()) o4.add(e7._i);
    i3.dirty = true, t5.callHook("entries:updated", i3);
  } };
  return (e6?.plugins || []).forEach((e7) => registerPlugin(i3, e7)), i3.hooks.callHook("init", i3), e6.init?.forEach((e7) => e7 && i3.push(e7)), i3;
}
function encodeAttribute(e6) {
  return String(e6).replace(/"/g, "&quot;");
}
function propsToString(e6) {
  let t5 = "";
  for (const n2 in e6) {
    if (!Object.hasOwn(e6, n2)) continue;
    let r2 = e6[n2];
    "class" !== n2 && "style" !== n2 || "string" == typeof r2 || (r2 = "class" === n2 ? Array.from(r2).join(" ") : Array.from(r2).map(([e7, t6]) => `${e7}:${t6}`).join(";")), false !== r2 && null !== r2 && (t5 += true === r2 ? ` ${n2}` : ` ${n2}="${encodeAttribute(r2)}"`);
  }
  return t5;
}
function tagToString(e6) {
  const t5 = propsToString(e6.props), n2 = `<${e6.tag}${t5}>`;
  if (!_2.has(e6.tag)) return m.has(e6.tag) ? n2 : `${n2}</${e6.tag}>`;
  let r2 = String(e6.textContent || e6.innerHTML || "");
  return r2 = "title" === e6.tag ? r2.replace(/[&<>"'/]/g, (e7) => {
    switch (e7) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#x27;";
      case "/":
        return "&#x2F;";
      default:
        return e7;
    }
  }) : r2.replace(new RegExp(`</${e6.tag}`, "gi"), `<\\/${e6.tag}`), m.has(e6.tag) ? n2 : `${n2}${r2}</${e6.tag}>`;
}
async function renderSSRHead(e6, t5) {
  const n2 = { shouldRender: true };
  if (await e6.hooks.callHook("ssr:beforeRender", n2), !n2.shouldRender) return { headTags: "", bodyTags: "", bodyTagsOpen: "", htmlAttrs: "", bodyAttrs: "" };
  const r2 = { tags: t5?.resolvedTags || await e6.resolveTags() };
  await e6.hooks.callHook("ssr:render", r2);
  const s2 = (function(e7) {
    const t6 = { htmlAttrs: {}, bodyAttrs: {}, tags: { head: "", bodyClose: "", bodyOpen: "" } };
    for (const n3 of e7) {
      if ("htmlAttrs" === n3.tag || "bodyAttrs" === n3.tag) {
        Object.assign(t6[n3.tag], n3.props);
        continue;
      }
      const e8 = tagToString(n3), r3 = n3.tagPosition || "head";
      t6.tags[r3] += t6.tags[r3] ? `${e8}` : e8;
    }
    return { headTags: t6.tags.head, bodyTags: t6.tags.bodyClose, bodyTagsOpen: t6.tags.bodyOpen, htmlAttrs: propsToString(t6.htmlAttrs), bodyAttrs: propsToString(t6.bodyAttrs) };
  })(r2.tags), o4 = { tags: r2.tags, html: s2 };
  return await e6.hooks.callHook("ssr:rendered", o4), o4.html;
}
function makeMap(e6) {
  const t5 = /* @__PURE__ */ Object.create(null);
  for (const n2 of e6.split(",")) t5[n2] = 1;
  return (e7) => e7 in t5;
}
function normalizeStyle(e6) {
  if (M(e6)) {
    const t5 = {};
    for (let n2 = 0; n2 < e6.length; n2++) {
      const r2 = e6[n2], s2 = isString(r2) ? parseStringStyle(r2) : normalizeStyle(r2);
      if (s2) for (const e7 in s2) t5[e7] = s2[e7];
    }
    return t5;
  }
  if (isString(e6) || isObject(e6)) return e6;
}
function parseStringStyle(e6) {
  const t5 = {};
  return e6.replace(J2, "").split(W).forEach((e7) => {
    if (e7) {
      const n2 = e7.split(q3);
      n2.length > 1 && (t5[n2[0].trim()] = n2[1].trim());
    }
  }), t5;
}
function normalizeClass(e6) {
  let t5 = "";
  if (isString(e6)) t5 = e6;
  else if (M(e6)) for (let n2 = 0; n2 < e6.length; n2++) {
    const r2 = normalizeClass(e6[n2]);
    r2 && (t5 += r2 + " ");
  }
  else if (isObject(e6)) for (const n2 in e6) e6[n2] && (t5 += n2 + " ");
  return t5.trim();
}
function includeBooleanAttr(e6) {
  return !!e6 || "" === e6;
}
function escapeHtml2(e6) {
  const t5 = "" + e6, n2 = ne2.exec(t5);
  if (!n2) return t5;
  let r2, s2, o4 = "", i3 = 0;
  for (s2 = n2.index; s2 < t5.length; s2++) {
    switch (t5.charCodeAt(s2)) {
      case 34:
        r2 = "&quot;";
        break;
      case 38:
        r2 = "&amp;";
        break;
      case 39:
        r2 = "&#39;";
        break;
      case 60:
        r2 = "&lt;";
        break;
      case 62:
        r2 = "&gt;";
        break;
      default:
        continue;
    }
    i3 !== s2 && (o4 += t5.slice(i3, s2)), i3 = s2 + 1, o4 += r2;
  }
  return i3 !== s2 ? o4 + t5.slice(i3, s2) : o4;
}
function normalizeCssVarValue(e6) {
  return null == e6 ? "initial" : "string" == typeof e6 ? "" === e6 ? " " : e6 : String(e6);
}
function effectScope(e6) {
  return new EffectScope(e6);
}
function getCurrentScope() {
  return se2;
}
function batch(e6, t5 = false) {
  if (e6.flags |= 8, t5) return e6.next = le2, void (le2 = e6);
  e6.next = ae2, ae2 = e6;
}
function startBatch() {
  ce2++;
}
function endBatch() {
  if (--ce2 > 0) return;
  if (le2) {
    let e7 = le2;
    for (le2 = void 0; e7; ) {
      const t5 = e7.next;
      e7.next = void 0, e7.flags &= -9, e7 = t5;
    }
  }
  let e6;
  for (; ae2; ) {
    let t5 = ae2;
    for (ae2 = void 0; t5; ) {
      const n2 = t5.next;
      if (t5.next = void 0, t5.flags &= -9, 1 & t5.flags) try {
        t5.trigger();
      } catch (t6) {
        e6 || (e6 = t6);
      }
      t5 = n2;
    }
  }
  if (e6) throw e6;
}
function prepareDeps(e6) {
  for (let t5 = e6.deps; t5; t5 = t5.nextDep) t5.version = -1, t5.prevActiveLink = t5.dep.activeLink, t5.dep.activeLink = t5;
}
function cleanupDeps(e6) {
  let t5, n2 = e6.depsTail, r2 = n2;
  for (; r2; ) {
    const e7 = r2.prevDep;
    -1 === r2.version ? (r2 === n2 && (n2 = e7), removeSub(r2), removeDep(r2)) : t5 = r2, r2.dep.activeLink = r2.prevActiveLink, r2.prevActiveLink = void 0, r2 = e7;
  }
  e6.deps = t5, e6.depsTail = n2;
}
function isDirty(e6) {
  for (let t5 = e6.deps; t5; t5 = t5.nextDep) if (t5.dep.version !== t5.version || t5.dep.computed && (refreshComputed(t5.dep.computed) || t5.dep.version !== t5.version)) return true;
  return !!e6._dirty;
}
function refreshComputed(e6) {
  if (4 & e6.flags && !(16 & e6.flags)) return;
  if (e6.flags &= -17, e6.globalVersion === fe2) return;
  if (e6.globalVersion = fe2, !e6.isSSR && 128 & e6.flags && (!e6.deps && !e6._dirty || !isDirty(e6))) return;
  e6.flags |= 2;
  const t5 = e6.dep, n2 = oe2, r2 = ue2;
  oe2 = e6, ue2 = true;
  try {
    prepareDeps(e6);
    const n3 = e6.fn(e6._value);
    (0 === t5.version || hasChanged(n3, e6._value)) && (e6.flags |= 128, e6._value = n3, t5.version++);
  } catch (e7) {
    throw t5.version++, e7;
  } finally {
    oe2 = n2, ue2 = r2, cleanupDeps(e6), e6.flags &= -3;
  }
}
function removeSub(e6, t5 = false) {
  const { dep: n2, prevSub: r2, nextSub: s2 } = e6;
  if (r2 && (r2.nextSub = s2, e6.prevSub = void 0), s2 && (s2.prevSub = r2, e6.nextSub = void 0), n2.subs === e6 && (n2.subs = r2, !r2 && n2.computed)) {
    n2.computed.flags &= -5;
    for (let e7 = n2.computed.deps; e7; e7 = e7.nextDep) removeSub(e7, true);
  }
  t5 || --n2.sc || !n2.map || n2.map.delete(n2.key);
}
function removeDep(e6) {
  const { prevDep: t5, nextDep: n2 } = e6;
  t5 && (t5.nextDep = n2, e6.prevDep = void 0), n2 && (n2.prevDep = t5, e6.nextDep = void 0);
}
function pauseTracking() {
  pe2.push(ue2), ue2 = false;
}
function resetTracking() {
  const e6 = pe2.pop();
  ue2 = void 0 === e6 || e6;
}
function cleanupEffect(e6) {
  const { cleanup: t5 } = e6;
  if (e6.cleanup = void 0, t5) {
    const e7 = oe2;
    oe2 = void 0;
    try {
      t5();
    } finally {
      oe2 = e7;
    }
  }
}
function addSub(e6) {
  if (e6.dep.sc++, 4 & e6.sub.flags) {
    const t5 = e6.dep.computed;
    if (t5 && !e6.dep.subs) {
      t5.flags |= 20;
      for (let e7 = t5.deps; e7; e7 = e7.nextDep) addSub(e7);
    }
    const n2 = e6.dep.subs;
    n2 !== e6 && (e6.prevSub = n2, n2 && (n2.nextSub = e6)), e6.dep.subs = e6;
  }
}
function track(e6, t5, n2) {
  if (ue2 && oe2) {
    let t6 = de2.get(e6);
    t6 || de2.set(e6, t6 = /* @__PURE__ */ new Map());
    let r2 = t6.get(n2);
    r2 || (t6.set(n2, r2 = new Dep()), r2.map = t6, r2.key = n2), r2.track();
  }
}
function trigger(e6, t5, n2, r2, s2, o4) {
  const i3 = de2.get(e6);
  if (!i3) return void fe2++;
  const run = /* @__PURE__ */ __name((e7) => {
    e7 && e7.trigger();
  }, "run");
  if (startBatch(), "clear" === t5) i3.forEach(run);
  else {
    const s3 = M(e6), o5 = s3 && isIntegerKey(n2);
    if (s3 && "length" === n2) {
      const e7 = Number(r2);
      i3.forEach((t6, n3) => {
        ("length" === n3 || n3 === ye2 || !isSymbol(n3) && n3 >= e7) && run(t6);
      });
    } else switch ((void 0 !== n2 || i3.has(void 0)) && run(i3.get(n2)), o5 && run(i3.get(ye2)), t5) {
      case "add":
        s3 ? o5 && run(i3.get("length")) : (run(i3.get(he2)), isMap(e6) && run(i3.get(ge2)));
        break;
      case "delete":
        s3 || (run(i3.get(he2)), isMap(e6) && run(i3.get(ge2)));
        break;
      case "set":
        isMap(e6) && run(i3.get(he2));
    }
  }
  endBatch();
}
function reactiveReadArray(e6) {
  const t5 = toRaw(e6);
  return t5 === e6 ? t5 : (track(t5, 0, ye2), isShallow(e6) ? t5 : t5.map(toReactive));
}
function shallowReadArray(e6) {
  return track(e6 = toRaw(e6), 0, ye2), e6;
}
function toWrapped(e6, t5) {
  return isReadonly(e6) ? isReactive(e6) ? toReadonly(toReactive(t5)) : toReadonly(t5) : toReactive(t5);
}
function iterator(e6, t5, n2) {
  const r2 = shallowReadArray(e6), s2 = r2[t5]();
  return r2 === e6 || isShallow(e6) || (s2._next = s2.next, s2.next = () => {
    const e7 = s2._next();
    return e7.done || (e7.value = n2(e7.value)), e7;
  }), s2;
}
function apply(e6, t5, n2, r2, s2, o4) {
  const i3 = shallowReadArray(e6), a3 = i3 !== e6 && !isShallow(e6), l2 = i3[t5];
  if (l2 !== ve2[t5]) {
    const t6 = l2.apply(e6, o4);
    return a3 ? toReactive(t6) : t6;
  }
  let c3 = n2;
  i3 !== e6 && (a3 ? c3 = /* @__PURE__ */ __name(function(t6, r3) {
    return n2.call(this, toWrapped(e6, t6), r3, e6);
  }, "c") : n2.length > 2 && (c3 = /* @__PURE__ */ __name(function(t6, r3) {
    return n2.call(this, t6, r3, e6);
  }, "c")));
  const u3 = l2.call(i3, c3, r2);
  return a3 && s2 ? s2(u3) : u3;
}
function reduce(e6, t5, n2, r2) {
  const s2 = shallowReadArray(e6);
  let o4 = n2;
  return s2 !== e6 && (isShallow(e6) ? n2.length > 3 && (o4 = /* @__PURE__ */ __name(function(t6, r3, s3) {
    return n2.call(this, t6, r3, s3, e6);
  }, "o")) : o4 = /* @__PURE__ */ __name(function(t6, r3, s3) {
    return n2.call(this, t6, toWrapped(e6, r3), s3, e6);
  }, "o")), s2[t5](o4, ...r2);
}
function searchProxy(e6, t5, n2) {
  const r2 = toRaw(e6);
  track(r2, 0, ye2);
  const s2 = r2[t5](...n2);
  return -1 !== s2 && false !== s2 || !isProxy(n2[0]) ? s2 : (n2[0] = toRaw(n2[0]), r2[t5](...n2));
}
function noTracking(e6, t5, n2 = []) {
  pauseTracking(), startBatch();
  const r2 = toRaw(e6)[t5].apply(e6, n2);
  return endBatch(), resetTracking(), r2;
}
function hasOwnProperty(e6) {
  isSymbol(e6) || (e6 = String(e6));
  const t5 = toRaw(this);
  return track(t5, 0, e6), t5.hasOwnProperty(e6);
}
function createReadonlyMethod(e6) {
  return function(...t5) {
    return "delete" !== e6 && ("clear" === e6 ? void 0 : this);
  };
}
function createInstrumentations(e6, t5) {
  const n2 = { get(n3) {
    const r2 = this.__v_raw, s2 = toRaw(r2), o4 = toRaw(n3);
    e6 || (hasChanged(n3, o4) && track(s2, 0, n3), track(s2, 0, o4));
    const { has: i3 } = getProto(s2), a3 = t5 ? toShallow : e6 ? toReadonly : toReactive;
    return i3.call(s2, n3) ? a3(r2.get(n3)) : i3.call(s2, o4) ? a3(r2.get(o4)) : void (r2 !== s2 && r2.get(n3));
  }, get size() {
    const t6 = this.__v_raw;
    return !e6 && track(toRaw(t6), 0, he2), t6.size;
  }, has(t6) {
    const n3 = this.__v_raw, r2 = toRaw(n3), s2 = toRaw(t6);
    return e6 || (hasChanged(t6, s2) && track(r2, 0, t6), track(r2, 0, s2)), t6 === s2 ? n3.has(t6) : n3.has(t6) || n3.has(s2);
  }, forEach(n3, r2) {
    const s2 = this, o4 = s2.__v_raw, i3 = toRaw(o4), a3 = t5 ? toShallow : e6 ? toReadonly : toReactive;
    return !e6 && track(i3, 0, he2), o4.forEach((e7, t6) => n3.call(r2, a3(e7), a3(t6), s2));
  } };
  H(n2, e6 ? { add: createReadonlyMethod("add"), set: createReadonlyMethod("set"), delete: createReadonlyMethod("delete"), clear: createReadonlyMethod("clear") } : { add(e7) {
    t5 || isShallow(e7) || isReadonly(e7) || (e7 = toRaw(e7));
    const n3 = toRaw(this);
    return getProto(n3).has.call(n3, e7) || (n3.add(e7), trigger(n3, "add", e7, e7)), this;
  }, set(e7, n3) {
    t5 || isShallow(n3) || isReadonly(n3) || (n3 = toRaw(n3));
    const r2 = toRaw(this), { has: s2, get: o4 } = getProto(r2);
    let i3 = s2.call(r2, e7);
    i3 || (e7 = toRaw(e7), i3 = s2.call(r2, e7));
    const a3 = o4.call(r2, e7);
    return r2.set(e7, n3), i3 ? hasChanged(n3, a3) && trigger(r2, "set", e7, n3) : trigger(r2, "add", e7, n3), this;
  }, delete(e7) {
    const t6 = toRaw(this), { has: n3, get: r2 } = getProto(t6);
    let s2 = n3.call(t6, e7);
    s2 || (e7 = toRaw(e7), s2 = n3.call(t6, e7)), r2 && r2.call(t6, e7);
    const o4 = t6.delete(e7);
    return s2 && trigger(t6, "delete", e7, void 0), o4;
  }, clear() {
    const e7 = toRaw(this), t6 = 0 !== e7.size, n3 = e7.clear();
    return t6 && trigger(e7, "clear", void 0, void 0), n3;
  } });
  return ["keys", "values", "entries", Symbol.iterator].forEach((r2) => {
    n2[r2] = /* @__PURE__ */ (function(e7, t6, n3) {
      return function(...r3) {
        const s2 = this.__v_raw, o4 = toRaw(s2), i3 = isMap(o4), a3 = "entries" === e7 || e7 === Symbol.iterator && i3, l2 = "keys" === e7 && i3, c3 = s2[e7](...r3), u3 = n3 ? toShallow : t6 ? toReadonly : toReactive;
        return !t6 && track(o4, 0, l2 ? ge2 : he2), H(Object.create(c3), { next() {
          const { value: e8, done: t7 } = c3.next();
          return t7 ? { value: e8, done: t7 } : { value: a3 ? [u3(e8[0]), u3(e8[1])] : u3(e8), done: t7 };
        } });
      };
    })(r2, e6, t5);
  }), n2;
}
function createInstrumentationGetter(e6, t5) {
  const n2 = createInstrumentations(e6, t5);
  return (t6, r2, s2) => "__v_isReactive" === r2 ? !e6 : "__v_isReadonly" === r2 ? e6 : "__v_raw" === r2 ? t6 : Reflect.get(hasOwn(n2, r2) && r2 in t6 ? n2 : t6, r2, s2);
}
function getTargetType(e6) {
  return e6.__v_skip || !Object.isExtensible(e6) ? 0 : (function(e7) {
    switch (e7) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  })(((e7) => toTypeString(e7).slice(8, -1))(e6));
}
function reactive(e6) {
  return isReadonly(e6) ? e6 : createReactiveObject(e6, false, ke2, Re2, Ae2);
}
function shallowReactive(e6) {
  return createReactiveObject(e6, false, Se2, Ce2, Te2);
}
function readonly(e6) {
  return createReactiveObject(e6, true, we2, xe2, $e2);
}
function createReactiveObject(e6, t5, n2, r2, s2) {
  if (!isObject(e6)) return e6;
  if (e6.__v_raw && (!t5 || !e6.__v_isReactive)) return e6;
  const o4 = getTargetType(e6);
  if (0 === o4) return e6;
  const i3 = s2.get(e6);
  if (i3) return i3;
  const a3 = new Proxy(e6, 2 === o4 ? r2 : n2);
  return s2.set(e6, a3), a3;
}
function isReactive(e6) {
  return isReadonly(e6) ? isReactive(e6.__v_raw) : !(!e6 || !e6.__v_isReactive);
}
function isReadonly(e6) {
  return !(!e6 || !e6.__v_isReadonly);
}
function isShallow(e6) {
  return !(!e6 || !e6.__v_isShallow);
}
function isProxy(e6) {
  return !!e6 && !!e6.__v_raw;
}
function toRaw(e6) {
  const t5 = e6 && e6.__v_raw;
  return t5 ? toRaw(t5) : e6;
}
function isRef(e6) {
  return !!e6 && true === e6.__v_isRef;
}
function ref(e6) {
  return createRef(e6, false);
}
function shallowRef(e6) {
  return createRef(e6, true);
}
function createRef(e6, t5) {
  return isRef(e6) ? e6 : new RefImpl(e6, t5);
}
function unref(e6) {
  return isRef(e6) ? e6.value : e6;
}
function proxyRefs(e6) {
  return isReactive(e6) ? e6 : new Proxy(e6, Pe2);
}
function toRef(e6, t5, n2) {
  return isRef(e6) ? e6 : isFunction(e6) ? new GetterRefImpl(e6) : isObject(e6) && arguments.length > 1 ? (function(e7, t6, n3) {
    return new ObjectRefImpl(e7, t6, n3);
  })(e6, t5, n2) : ref(e6);
}
function watch$1(e6, t5, n2 = P) {
  const { immediate: r2, deep: s2, once: o4, scheduler: i3, augmentJob: a3, call: l2 } = n2, reactiveGetter = /* @__PURE__ */ __name((e7) => s2 ? e7 : isShallow(e7) || false === s2 || 0 === s2 ? traverse(e7, 1) : traverse(e7), "reactiveGetter");
  let c3, u3, p2, f2, d3 = false, g3 = false;
  if (isRef(e6) ? (u3 = /* @__PURE__ */ __name(() => e6.value, "u"), d3 = isShallow(e6)) : isReactive(e6) ? (u3 = /* @__PURE__ */ __name(() => reactiveGetter(e6), "u"), d3 = true) : M(e6) ? (g3 = true, d3 = e6.some((e7) => isReactive(e7) || isShallow(e7)), u3 = /* @__PURE__ */ __name(() => e6.map((e7) => isRef(e7) ? e7.value : isReactive(e7) ? reactiveGetter(e7) : isFunction(e7) ? l2 ? l2(e7, 2) : e7() : void 0), "u")) : u3 = isFunction(e6) ? t5 ? l2 ? () => l2(e6, 2) : e6 : () => {
    if (p2) {
      pauseTracking();
      try {
        p2();
      } finally {
        resetTracking();
      }
    }
    const t6 = Ee2;
    Ee2 = c3;
    try {
      return l2 ? l2(e6, 3, [f2]) : e6(f2);
    } finally {
      Ee2 = t6;
    }
  } : NOOP, t5 && s2) {
    const e7 = u3, t6 = true === s2 ? 1 / 0 : s2;
    u3 = /* @__PURE__ */ __name(() => traverse(e7(), t6), "u");
  }
  const y3 = getCurrentScope(), watchHandle = /* @__PURE__ */ __name(() => {
    c3.stop(), y3 && y3.active && remove(y3.effects, c3);
  }, "watchHandle");
  if (o4 && t5) {
    const e7 = t5;
    t5 = /* @__PURE__ */ __name((...t6) => {
      e7(...t6), watchHandle();
    }, "t");
  }
  let m3 = g3 ? new Array(e6.length).fill(je2) : je2;
  const job = /* @__PURE__ */ __name((e7) => {
    if (1 & c3.flags && (c3.dirty || e7)) if (t5) {
      const e8 = c3.run();
      if (s2 || d3 || (g3 ? e8.some((e9, t6) => hasChanged(e9, m3[t6])) : hasChanged(e8, m3))) {
        p2 && p2();
        const n3 = Ee2;
        Ee2 = c3;
        try {
          const n4 = [e8, m3 === je2 ? void 0 : g3 && m3[0] === je2 ? [] : m3, f2];
          m3 = e8, l2 ? l2(t5, 3, n4) : t5(...n4);
        } finally {
          Ee2 = n3;
        }
      }
    } else c3.run();
  }, "job");
  return a3 && a3(job), c3 = new ReactiveEffect(u3), c3.scheduler = i3 ? () => i3(job, false) : job, f2 = /* @__PURE__ */ __name((e7) => (function(e8, t6 = false, n3 = Ee2) {
    if (n3) {
      let t7 = He2.get(n3);
      t7 || He2.set(n3, t7 = []), t7.push(e8);
    }
  })(e7, false, c3), "f"), p2 = c3.onStop = () => {
    const e7 = He2.get(c3);
    if (e7) {
      if (l2) l2(e7, 4);
      else for (const t6 of e7) t6();
      He2.delete(c3);
    }
  }, t5 ? r2 ? job(true) : m3 = c3.run() : i3 ? i3(job.bind(null, true), true) : c3.run(), watchHandle.pause = c3.pause.bind(c3), watchHandle.resume = c3.resume.bind(c3), watchHandle.stop = watchHandle, watchHandle;
}
function traverse(e6, t5 = 1 / 0, n2) {
  if (t5 <= 0 || !isObject(e6) || e6.__v_skip) return e6;
  if (((n2 = n2 || /* @__PURE__ */ new Map()).get(e6) || 0) >= t5) return e6;
  if (n2.set(e6, t5), t5--, isRef(e6)) traverse(e6.value, t5, n2);
  else if (M(e6)) for (let r2 = 0; r2 < e6.length; r2++) traverse(e6[r2], t5, n2);
  else if (isSet(e6) || isMap(e6)) e6.forEach((e7) => {
    traverse(e7, t5, n2);
  });
  else if (isPlainObject(e6)) {
    for (const r2 in e6) traverse(e6[r2], t5, n2);
    for (const r2 of Object.getOwnPropertySymbols(e6)) Object.prototype.propertyIsEnumerable.call(e6, r2) && traverse(e6[r2], t5, n2);
  }
  return e6;
}
function callWithErrorHandling(e6, t5, n2, r2) {
  try {
    return r2 ? e6(...r2) : e6();
  } catch (e7) {
    handleError(e7, t5, n2);
  }
}
function callWithAsyncErrorHandling(e6, t5, n2, r2) {
  if (isFunction(e6)) {
    const s2 = callWithErrorHandling(e6, t5, n2, r2);
    return s2 && isPromise(s2) && s2.catch((e7) => {
      handleError(e7, t5, n2);
    }), s2;
  }
  if (M(e6)) {
    const s2 = [];
    for (let o4 = 0; o4 < e6.length; o4++) s2.push(callWithAsyncErrorHandling(e6[o4], t5, n2, r2));
    return s2;
  }
}
function handleError(e6, t5, n2, r2 = true) {
  t5 && t5.vnode;
  const { errorHandler: s2, throwUnhandledErrorInProduction: o4 } = t5 && t5.appContext.config || P;
  if (t5) {
    let r3 = t5.parent;
    const o5 = t5.proxy, i3 = `https://vuejs.org/error-reference/#runtime-${n2}`;
    for (; r3; ) {
      const t6 = r3.ec;
      if (t6) {
        for (let n3 = 0; n3 < t6.length; n3++) if (false === t6[n3](e6, o5, i3)) return;
      }
      r3 = r3.parent;
    }
    if (s2) return pauseTracking(), callWithErrorHandling(s2, null, 10, [e6, o5, i3]), void resetTracking();
  }
  !(function(e7, t6, n3, r3 = true, s3 = false) {
    if (s3) throw e7;
    console.error(e7);
  })(e6, 0, 0, r2, o4);
}
function nextTick(e6) {
  const t5 = Be2 || Ve2;
  return e6 ? t5.then(this ? e6.bind(this) : e6) : t5;
}
function queueJob(e6) {
  if (!(1 & e6.flags)) {
    const t5 = getId(e6), n2 = Me2[Me2.length - 1];
    !n2 || !(2 & e6.flags) && t5 >= getId(n2) ? Me2.push(e6) : Me2.splice((function(e7) {
      let t6 = Ne2 + 1, n3 = Me2.length;
      for (; t6 < n3; ) {
        const r2 = t6 + n3 >>> 1, s2 = Me2[r2], o4 = getId(s2);
        o4 < e7 || o4 === e7 && 2 & s2.flags ? t6 = r2 + 1 : n3 = r2;
      }
      return t6;
    })(t5), 0, e6), e6.flags |= 1, queueFlush();
  }
}
function queueFlush() {
  Be2 || (Be2 = Ve2.then(flushJobs));
}
function queuePostFlushCb(e6) {
  M(e6) ? Ie2.push(...e6) : De2 && -1 === e6.id ? De2.splice(Le2 + 1, 0, e6) : 1 & e6.flags || (Ie2.push(e6), e6.flags |= 1), queueFlush();
}
function flushPreFlushCbs(e6, t5, n2 = Ne2 + 1) {
  for (; n2 < Me2.length; n2++) {
    const t6 = Me2[n2];
    if (t6 && 2 & t6.flags) {
      if (e6 && t6.id !== e6.uid) continue;
      Me2.splice(n2, 1), n2--, 4 & t6.flags && (t6.flags &= -2), t6(), 4 & t6.flags || (t6.flags &= -2);
    }
  }
}
function flushPostFlushCbs(e6) {
  if (Ie2.length) {
    const e7 = [...new Set(Ie2)].sort((e8, t5) => getId(e8) - getId(t5));
    if (Ie2.length = 0, De2) return void De2.push(...e7);
    for (De2 = e7, Le2 = 0; Le2 < De2.length; Le2++) {
      const e8 = De2[Le2];
      4 & e8.flags && (e8.flags &= -2), 8 & e8.flags || e8(), e8.flags &= -2;
    }
    De2 = null, Le2 = 0;
  }
}
function flushJobs(e6) {
  try {
    for (Ne2 = 0; Ne2 < Me2.length; Ne2++) {
      const e7 = Me2[Ne2];
      !e7 || 8 & e7.flags || (4 & e7.flags && (e7.flags &= -2), callWithErrorHandling(e7, e7.i, e7.i ? 15 : 14), 4 & e7.flags || (e7.flags &= -2));
    }
  } finally {
    for (; Ne2 < Me2.length; Ne2++) {
      const e7 = Me2[Ne2];
      e7 && (e7.flags &= -2);
    }
    Ne2 = -1, Me2.length = 0, flushPostFlushCbs(), Be2 = null, (Me2.length || Ie2.length) && flushJobs();
  }
}
function setCurrentRenderingInstance$1(e6) {
  const t5 = Fe2;
  return Fe2 = e6, Ue2 = e6 && e6.type.__scopeId || null, t5;
}
function withCtx(e6, t5 = Fe2, n2) {
  if (!t5) return e6;
  if (e6._n) return e6;
  const renderFnWithContext = /* @__PURE__ */ __name((...n3) => {
    renderFnWithContext._d && setBlockTracking(-1);
    const r2 = setCurrentRenderingInstance$1(t5);
    let s2;
    try {
      s2 = e6(...n3);
    } finally {
      setCurrentRenderingInstance$1(r2), renderFnWithContext._d && setBlockTracking(1);
    }
    return s2;
  }, "renderFnWithContext");
  return renderFnWithContext._n = true, renderFnWithContext._c = true, renderFnWithContext._d = true, renderFnWithContext;
}
function invokeDirectiveHook(e6, t5, n2, r2) {
  const s2 = e6.dirs, o4 = t5 && t5.dirs;
  for (let i3 = 0; i3 < s2.length; i3++) {
    const a3 = s2[i3];
    o4 && (a3.oldValue = o4[i3].value);
    let l2 = a3.dir[r2];
    l2 && (pauseTracking(), callWithAsyncErrorHandling(l2, n2, 8, [e6.el, a3, e6, t5]), resetTracking());
  }
}
function provide(e6, t5) {
  if (Ct) {
    let n2 = Ct.provides;
    const r2 = Ct.parent && Ct.parent.provides;
    r2 === n2 && (n2 = Ct.provides = Object.create(r2)), n2[e6] = t5;
  }
}
function inject(e6, t5, n2 = false) {
  const r2 = getCurrentInstance();
  if (r2 || ut) {
    let s2 = ut ? ut._context.provides : r2 ? null == r2.parent || r2.ce ? r2.vnode.appContext && r2.vnode.appContext.provides : r2.parent.provides : void 0;
    if (s2 && e6 in s2) return s2[e6];
    if (arguments.length > 1) return n2 && isFunction(t5) ? t5.call(r2 && r2.proxy) : t5;
  }
}
function hasInjectionContext() {
  return !(!getCurrentInstance() && !ut);
}
function watch(e6, t5, n2) {
  return doWatch(e6, t5, n2);
}
function doWatch(e6, t5, n2 = P) {
  const { immediate: r2, deep: s2, flush: o4, once: i3 } = n2, a3 = H({}, n2), l2 = t5 && r2 || !t5 && "post" !== o4;
  let c3;
  if (Tt) {
    if ("sync" === o4) {
      const e7 = useSSRContext();
      c3 = e7.__watcherHandles || (e7.__watcherHandles = []);
    } else if (!l2) {
      const watchStopHandle = /* @__PURE__ */ __name(() => {
      }, "watchStopHandle");
      return watchStopHandle.stop = NOOP, watchStopHandle.resume = NOOP, watchStopHandle.pause = NOOP, watchStopHandle;
    }
  }
  const u3 = Ct;
  a3.call = (e7, t6, n3) => callWithAsyncErrorHandling(e7, u3, t6, n3);
  let p2 = false;
  "post" === o4 ? a3.scheduler = (e7) => {
    queuePostRenderEffect(e7, u3 && u3.suspense);
  } : "sync" !== o4 && (p2 = true, a3.scheduler = (e7, t6) => {
    t6 ? e7() : queueJob(e7);
  }), a3.augmentJob = (e7) => {
    t5 && (e7.flags |= 4), p2 && (e7.flags |= 2, u3 && (e7.id = u3.uid, e7.i = u3));
  };
  const f2 = watch$1(e6, t5, a3);
  return Tt && (c3 ? c3.push(f2) : l2 && f2()), f2;
}
function instanceWatch(e6, t5, n2) {
  const r2 = this.proxy, s2 = isString(e6) ? e6.includes(".") ? createPathGetter(r2, e6) : () => r2[e6] : e6.bind(r2, r2);
  let o4;
  isFunction(t5) ? o4 = t5 : (o4 = t5.handler, n2 = t5);
  const i3 = setCurrentInstance(this), a3 = doWatch(s2, o4.bind(r2), n2);
  return i3(), a3;
}
function createPathGetter(e6, t5) {
  const n2 = t5.split(".");
  return () => {
    let t6 = e6;
    for (let e7 = 0; e7 < n2.length && t6; e7++) t6 = t6[n2[e7]];
    return t6;
  };
}
function setTransitionHooks(e6, t5) {
  6 & e6.shapeFlag && e6.component ? (e6.transition = t5, setTransitionHooks(e6.component.subTree, t5)) : 128 & e6.shapeFlag ? (e6.ssContent.transition = t5.clone(e6.ssContent), e6.ssFallback.transition = t5.clone(e6.ssFallback)) : e6.transition = t5;
}
function defineComponent(e6, t5) {
  return isFunction(e6) ? (() => H({ name: e6.name }, t5, { setup: e6 }))() : e6;
}
function markAsyncBoundary(e6) {
  e6.ids = [e6.ids[0] + e6.ids[2]++ + "-", 0, 0];
}
function setRef(e6, t5, n2, r2, s2 = false) {
  if (M(e6)) return void e6.forEach((e7, o5) => setRef(e7, t5 && (M(t5) ? t5[o5] : t5), n2, r2, s2));
  if (isAsyncWrapper(r2) && !s2) return void (512 & r2.shapeFlag && r2.type.__asyncResolved && r2.component.subTree.component && setRef(e6, t5, n2, r2.component.subTree));
  const o4 = 4 & r2.shapeFlag ? getComponentPublicInstance(r2.component) : r2.el, i3 = s2 ? null : o4, { i: a3, r: l2 } = e6, c3 = t5 && t5.r, u3 = a3.refs === P ? a3.refs = {} : a3.refs, p2 = a3.setupState, f2 = toRaw(p2), d3 = p2 === P ? NO : (e7) => hasOwn(f2, e7);
  if (null != c3 && c3 !== l2) {
    if (invalidatePendingSetRef(t5), isString(c3)) u3[c3] = null, d3(c3) && (p2[c3] = null);
    else if (isRef(c3)) {
      c3.value = null;
      const e7 = t5;
      e7.k && (u3[e7.k] = null);
    }
  }
  if (isFunction(l2)) callWithErrorHandling(l2, a3, 12, [i3, u3]);
  else {
    const t6 = isString(l2), r3 = isRef(l2);
    if (t6 || r3) {
      const doSet = /* @__PURE__ */ __name(() => {
        if (e6.f) {
          const n3 = t6 ? d3(l2) ? p2[l2] : u3[l2] : l2.value;
          if (s2) M(n3) && remove(n3, o4);
          else if (M(n3)) n3.includes(o4) || n3.push(o4);
          else if (t6) u3[l2] = [o4], d3(l2) && (p2[l2] = u3[l2]);
          else {
            const t7 = [o4];
            l2.value = t7, e6.k && (u3[e6.k] = t7);
          }
        } else t6 ? (u3[l2] = i3, d3(l2) && (p2[l2] = i3)) : r3 && (l2.value = i3, e6.k && (u3[e6.k] = i3));
      }, "doSet");
      if (i3) {
        const job = /* @__PURE__ */ __name(() => {
          doSet(), Je2.delete(e6);
        }, "job");
        job.id = -1, Je2.set(e6, job), queuePostRenderEffect(job, n2);
      } else invalidatePendingSetRef(e6), doSet();
    }
  }
}
function invalidatePendingSetRef(e6) {
  const t5 = Je2.get(e6);
  t5 && (t5.flags |= 8, Je2.delete(e6));
}
function defineAsyncComponent(e6) {
  isFunction(e6) && (e6 = { loader: e6 });
  const { loader: t5, loadingComponent: n2, errorComponent: r2, delay: s2 = 200, hydrate: o4, timeout: i3, suspensible: a3 = true, onError: l2 } = e6;
  let c3, u3 = null, p2 = 0;
  const load = /* @__PURE__ */ __name(() => {
    let e7;
    return u3 || (e7 = u3 = t5().catch((e8) => {
      if (e8 = e8 instanceof Error ? e8 : new Error(String(e8)), l2) return new Promise((t6, n3) => {
        l2(e8, () => t6((p2++, u3 = null, load())), () => n3(e8), p2 + 1);
      });
      throw e8;
    }).then((t6) => e7 !== u3 && u3 ? u3 : (t6 && (t6.__esModule || "Module" === t6[Symbol.toStringTag]) && (t6 = t6.default), c3 = t6, t6)));
  }, "load");
  return defineComponent({ name: "AsyncComponentWrapper", __asyncLoader: load, __asyncHydrate(e7, t6, n3) {
    let r3 = false;
    (t6.bu || (t6.bu = [])).push(() => r3 = true);
    const performHydrate = /* @__PURE__ */ __name(() => {
      r3 || n3();
    }, "performHydrate"), s3 = o4 ? () => {
      const n4 = o4(performHydrate, (t7) => (function(e8, t8) {
        if (isComment(e8) && "[" === e8.data) {
          let n5 = 1, r4 = e8.nextSibling;
          for (; r4; ) {
            if (1 === r4.nodeType) {
              if (false === t8(r4)) break;
            } else if (isComment(r4)) if ("]" === r4.data) {
              if (0 === --n5) break;
            } else "[" === r4.data && n5++;
            r4 = r4.nextSibling;
          }
        } else t8(e8);
      })(e7, t7));
      n4 && (t6.bum || (t6.bum = [])).push(n4);
    } : performHydrate;
    c3 ? s3() : load().then(() => !t6.isUnmounted && s3());
  }, get __asyncResolved() {
    return c3;
  }, setup() {
    const e7 = Ct;
    if (markAsyncBoundary(e7), c3) return () => createInnerComp(c3, e7);
    const onError = /* @__PURE__ */ __name((t7) => {
      u3 = null, handleError(t7, e7, 13, !r2);
    }, "onError");
    if (a3 && e7.suspense || Tt) return load().then((t7) => () => createInnerComp(t7, e7)).catch((e8) => (onError(e8), () => r2 ? createVNode(r2, { error: e8 }) : null));
    const t6 = ref(false), o5 = ref(), l3 = ref(!!s2);
    return s2 && setTimeout(() => {
      l3.value = false;
    }, s2), null != i3 && setTimeout(() => {
      if (!t6.value && !o5.value) {
        const e8 = new Error(`Async component timed out after ${i3}ms.`);
        onError(e8), o5.value = e8;
      }
    }, i3), load().then(() => {
      t6.value = true, e7.parent && isKeepAlive(e7.parent.vnode) && e7.parent.update();
    }).catch((e8) => {
      onError(e8), o5.value = e8;
    }), () => t6.value && c3 ? createInnerComp(c3, e7) : o5.value && r2 ? createVNode(r2, { error: o5.value }) : n2 && !l3.value ? createInnerComp(n2, e7) : void 0;
  } });
}
function createInnerComp(e6, t5) {
  const { ref: n2, props: r2, children: s2, ce: o4 } = t5.vnode, i3 = createVNode(e6, r2, s2);
  return i3.ref = n2, i3.ce = o4, delete t5.vnode.ce, i3;
}
function onActivated(e6, t5) {
  registerKeepAliveHook(e6, "a", t5);
}
function onDeactivated(e6, t5) {
  registerKeepAliveHook(e6, "da", t5);
}
function registerKeepAliveHook(e6, t5, n2 = Ct) {
  const r2 = e6.__wdc || (e6.__wdc = () => {
    let t6 = n2;
    for (; t6; ) {
      if (t6.isDeactivated) return;
      t6 = t6.parent;
    }
    return e6();
  });
  if (injectHook(t5, r2, n2), n2) {
    let e7 = n2.parent;
    for (; e7 && e7.parent; ) isKeepAlive(e7.parent.vnode) && injectToKeepAliveRoot(r2, t5, n2, e7), e7 = e7.parent;
  }
}
function injectToKeepAliveRoot(e6, t5, n2, r2) {
  const s2 = injectHook(t5, e6, r2, true);
  Qe2(() => {
    remove(r2[t5], s2);
  }, n2);
}
function injectHook(e6, t5, n2 = Ct, r2 = false) {
  if (n2) {
    const s2 = n2[e6] || (n2[e6] = []), o4 = t5.__weh || (t5.__weh = (...r3) => {
      pauseTracking();
      const s3 = setCurrentInstance(n2), o5 = callWithAsyncErrorHandling(t5, n2, e6, r3);
      return s3(), resetTracking(), o5;
    });
    return r2 ? s2.unshift(o4) : s2.push(o4), o4;
  }
}
function onErrorCaptured(e6, t5 = Ct) {
  injectHook("ec", e6, t5);
}
function resolveComponent(e6, t5) {
  return resolveAsset(rt2, e6, true, t5) || e6;
}
function resolveDynamicComponent(e6) {
  return isString(e6) ? resolveAsset(rt2, e6, false) || e6 : e6 || st;
}
function resolveAsset(e6, t5, n2 = true, r2 = false) {
  const s2 = Fe2 || Ct;
  if (s2) {
    const n3 = s2.type;
    {
      const e7 = getComponentName(n3, false);
      if (e7 && (e7 === t5 || e7 === L(t5) || e7 === F(L(t5)))) return n3;
    }
    const o4 = resolve(s2[e6] || n3[e6], t5) || resolve(s2.appContext[e6], t5);
    return !o4 && r2 ? n3 : o4;
  }
}
function resolve(e6, t5) {
  return e6 && (e6[t5] || e6[L(t5)] || e6[F(L(t5))]);
}
function normalizePropsOrEmits(e6) {
  return M(e6) ? e6.reduce((e7, t5) => (e7[t5] = null, e7), {}) : e6;
}
function applyOptions(e6) {
  const t5 = resolveMergedOptions(e6), n2 = e6.proxy, r2 = e6.ctx;
  at = false, t5.beforeCreate && callHook(t5.beforeCreate, e6, "bc");
  const { data: s2, computed: o4, methods: i3, watch: a3, provide: l2, inject: c3, created: u3, beforeMount: p2, mounted: f2, beforeUpdate: d3, updated: g3, activated: y3, deactivated: m3, beforeDestroy: v3, beforeUnmount: _4, destroyed: b3, unmounted: k3, render: w3, renderTracked: S3, renderTriggered: R3, errorCaptured: C4, serverPrefetch: x3, expose: A4, inheritAttrs: T3, components: $3, directives: O3, filters: P3 } = t5;
  if (c3 && (function(e7, t6) {
    M(e7) && (e7 = normalizeInject(e7));
    for (const n3 in e7) {
      const r3 = e7[n3];
      let s3;
      s3 = isObject(r3) ? "default" in r3 ? inject(r3.from || n3, r3.default, true) : inject(r3.from || n3) : inject(r3), isRef(s3) ? Object.defineProperty(t6, n3, { enumerable: true, configurable: true, get: /* @__PURE__ */ __name(() => s3.value, "get"), set: /* @__PURE__ */ __name((e8) => s3.value = e8, "set") }) : t6[n3] = s3;
    }
  })(c3, r2, null), i3) for (const e7 in i3) {
    const t6 = i3[e7];
    isFunction(t6) && (r2[e7] = t6.bind(n2));
  }
  if (s2) {
    const t6 = s2.call(n2, n2);
    isObject(t6) && (e6.data = reactive(t6));
  }
  if (at = true, o4) for (const e7 in o4) {
    const t6 = o4[e7], s3 = isFunction(t6) ? t6.bind(n2, n2) : isFunction(t6.get) ? t6.get.bind(n2, n2) : NOOP, i4 = !isFunction(t6) && isFunction(t6.set) ? t6.set.bind(n2) : NOOP, a4 = computed({ get: s3, set: i4 });
    Object.defineProperty(r2, e7, { enumerable: true, configurable: true, get: /* @__PURE__ */ __name(() => a4.value, "get"), set: /* @__PURE__ */ __name((e8) => a4.value = e8, "set") });
  }
  if (a3) for (const e7 in a3) createWatcher(a3[e7], r2, n2, e7);
  if (l2) {
    const e7 = isFunction(l2) ? l2.call(n2) : l2;
    Reflect.ownKeys(e7).forEach((t6) => {
      provide(t6, e7[t6]);
    });
  }
  function registerLifecycleHook(e7, t6) {
    M(t6) ? t6.forEach((t7) => e7(t7.bind(n2))) : t6 && e7(t6.bind(n2));
  }
  __name(registerLifecycleHook, "registerLifecycleHook");
  if (u3 && callHook(u3, e6, "c"), registerLifecycleHook(Ge2, p2), registerLifecycleHook(Ke2, f2), registerLifecycleHook(Ze2, d3), registerLifecycleHook(Xe2, g3), registerLifecycleHook(onActivated, y3), registerLifecycleHook(onDeactivated, m3), registerLifecycleHook(onErrorCaptured, C4), registerLifecycleHook(nt2, S3), registerLifecycleHook(tt2, R3), registerLifecycleHook(Ye2, _4), registerLifecycleHook(Qe2, k3), registerLifecycleHook(et, x3), M(A4)) if (A4.length) {
    const t6 = e6.exposed || (e6.exposed = {});
    A4.forEach((e7) => {
      Object.defineProperty(t6, e7, { get: /* @__PURE__ */ __name(() => n2[e7], "get"), set: /* @__PURE__ */ __name((t7) => n2[e7] = t7, "set"), enumerable: true });
    });
  } else e6.exposed || (e6.exposed = {});
  w3 && e6.render === NOOP && (e6.render = w3), null != T3 && (e6.inheritAttrs = T3), $3 && (e6.components = $3), O3 && (e6.directives = O3), x3 && markAsyncBoundary(e6);
}
function callHook(e6, t5, n2) {
  callWithAsyncErrorHandling(M(e6) ? e6.map((e7) => e7.bind(t5.proxy)) : e6.bind(t5.proxy), t5, n2);
}
function createWatcher(e6, t5, n2, r2) {
  let s2 = r2.includes(".") ? createPathGetter(n2, r2) : () => n2[r2];
  if (isString(e6)) {
    const n3 = t5[e6];
    isFunction(n3) && watch(s2, n3);
  } else if (isFunction(e6)) watch(s2, e6.bind(n2));
  else if (isObject(e6)) if (M(e6)) e6.forEach((e7) => createWatcher(e7, t5, n2, r2));
  else {
    const r3 = isFunction(e6.handler) ? e6.handler.bind(n2) : t5[e6.handler];
    isFunction(r3) && watch(s2, r3, e6);
  }
}
function resolveMergedOptions(e6) {
  const t5 = e6.type, { mixins: n2, extends: r2 } = t5, { mixins: s2, optionsCache: o4, config: { optionMergeStrategies: i3 } } = e6.appContext, a3 = o4.get(t5);
  let l2;
  return a3 ? l2 = a3 : s2.length || n2 || r2 ? (l2 = {}, s2.length && s2.forEach((e7) => mergeOptions2(l2, e7, i3, true)), mergeOptions2(l2, t5, i3)) : l2 = t5, isObject(t5) && o4.set(t5, l2), l2;
}
function mergeOptions2(e6, t5, n2, r2 = false) {
  const { mixins: s2, extends: o4 } = t5;
  o4 && mergeOptions2(e6, o4, n2, true), s2 && s2.forEach((t6) => mergeOptions2(e6, t6, n2, true));
  for (const s3 in t5) if (r2 && "expose" === s3) ;
  else {
    const r3 = lt[s3] || n2 && n2[s3];
    e6[s3] = r3 ? r3(e6[s3], t5[s3]) : t5[s3];
  }
  return e6;
}
function mergeDataFn(e6, t5) {
  return t5 ? e6 ? function() {
    return H(isFunction(e6) ? e6.call(this, this) : e6, isFunction(t5) ? t5.call(this, this) : t5);
  } : t5 : e6;
}
function normalizeInject(e6) {
  if (M(e6)) {
    const t5 = {};
    for (let n2 = 0; n2 < e6.length; n2++) t5[e6[n2]] = e6[n2];
    return t5;
  }
  return e6;
}
function mergeAsArray(e6, t5) {
  return e6 ? [...new Set([].concat(e6, t5))] : t5;
}
function mergeObjectOptions(e6, t5) {
  return e6 ? H(/* @__PURE__ */ Object.create(null), e6, t5) : t5;
}
function mergeEmitsOrPropsOptions(e6, t5) {
  return e6 ? M(e6) && M(t5) ? [.../* @__PURE__ */ new Set([...e6, ...t5])] : H(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(e6), normalizePropsOrEmits(null != t5 ? t5 : {})) : t5;
}
function createAppContext() {
  return { app: null, config: { isNativeTag: NO, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
function createAppAPI(e6, t5) {
  return function(t6, n2 = null) {
    isFunction(t6) || (t6 = H({}, t6)), null == n2 || isObject(n2) || (n2 = null);
    const r2 = createAppContext(), s2 = /* @__PURE__ */ new WeakSet(), o4 = [];
    let i3 = false;
    const a3 = r2.app = { _uid: ct++, _component: t6, _props: n2, _container: null, _context: r2, _instance: null, version: Ot, get config() {
      return r2.config;
    }, set config(e7) {
    }, use: /* @__PURE__ */ __name((e7, ...t7) => (s2.has(e7) || (e7 && isFunction(e7.install) ? (s2.add(e7), e7.install(a3, ...t7)) : isFunction(e7) && (s2.add(e7), e7(a3, ...t7))), a3), "use"), mixin: /* @__PURE__ */ __name((e7) => (r2.mixins.includes(e7) || r2.mixins.push(e7), a3), "mixin"), component: /* @__PURE__ */ __name((e7, t7) => t7 ? (r2.components[e7] = t7, a3) : r2.components[e7], "component"), directive: /* @__PURE__ */ __name((e7, t7) => t7 ? (r2.directives[e7] = t7, a3) : r2.directives[e7], "directive"), mount(s3, o5, l2) {
      if (!i3) {
        const o6 = a3._ceVNode || createVNode(t6, n2);
        return o6.appContext = r2, true === l2 ? l2 = "svg" : false === l2 && (l2 = void 0), e6(o6, s3, l2), i3 = true, a3._container = s3, s3.__vue_app__ = a3, getComponentPublicInstance(o6.component);
      }
    }, onUnmount(e7) {
      o4.push(e7);
    }, unmount() {
      i3 && (callWithAsyncErrorHandling(o4, a3._instance, 16), e6(null, a3._container), delete a3._container.__vue_app__);
    }, provide: /* @__PURE__ */ __name((e7, t7) => (r2.provides[e7] = t7, a3), "provide"), runWithContext(e7) {
      const t7 = ut;
      ut = a3;
      try {
        return e7();
      } finally {
        ut = t7;
      }
    } };
    return a3;
  };
}
function emit(e6, t5, ...n2) {
  if (e6.isUnmounted) return;
  const r2 = e6.vnode.props || P;
  let s2 = n2;
  const o4 = t5.startsWith("update:"), i3 = o4 && ((e7, t6) => "modelValue" === t6 || "model-value" === t6 ? e7.modelModifiers : e7[`${t6}Modifiers`] || e7[`${L(t6)}Modifiers`] || e7[`${B(t6)}Modifiers`])(r2, t5.slice(7));
  let a3;
  i3 && (i3.trim && (s2 = n2.map((e7) => isString(e7) ? e7.trim() : e7)), i3.number && (s2 = n2.map(looseToNumber)));
  let l2 = r2[a3 = U(t5)] || r2[a3 = U(L(t5))];
  !l2 && o4 && (l2 = r2[a3 = U(B(t5))]), l2 && callWithAsyncErrorHandling(l2, e6, 6, s2);
  const c3 = r2[a3 + "Once"];
  if (c3) {
    if (e6.emitted) {
      if (e6.emitted[a3]) return;
    } else e6.emitted = {};
    e6.emitted[a3] = true, callWithAsyncErrorHandling(c3, e6, 6, s2);
  }
}
function normalizeEmitsOptions(e6, t5, n2 = false) {
  const r2 = n2 ? pt : t5.emitsCache, s2 = r2.get(e6);
  if (void 0 !== s2) return s2;
  const o4 = e6.emits;
  let i3 = {}, a3 = false;
  if (!isFunction(e6)) {
    const extendEmits = /* @__PURE__ */ __name((e7) => {
      const n3 = normalizeEmitsOptions(e7, t5, true);
      n3 && (a3 = true, H(i3, n3));
    }, "extendEmits");
    !n2 && t5.mixins.length && t5.mixins.forEach(extendEmits), e6.extends && extendEmits(e6.extends), e6.mixins && e6.mixins.forEach(extendEmits);
  }
  return o4 || a3 ? (M(o4) ? o4.forEach((e7) => i3[e7] = null) : H(i3, o4), isObject(e6) && r2.set(e6, i3), i3) : (isObject(e6) && r2.set(e6, null), null);
}
function isEmitListener(e6, t5) {
  return !(!e6 || !isOn(t5)) && (t5 = t5.slice(2).replace(/Once$/, ""), hasOwn(e6, t5[0].toLowerCase() + t5.slice(1)) || hasOwn(e6, B(t5)) || hasOwn(e6, t5));
}
function renderComponentRoot$1(e6) {
  const { type: t5, vnode: n2, proxy: r2, withProxy: s2, propsOptions: [o4], slots: i3, attrs: a3, emit: l2, render: c3, renderCache: u3, props: p2, data: f2, setupState: d3, ctx: g3, inheritAttrs: y3 } = e6, m3 = setCurrentRenderingInstance$1(e6);
  let v3, _4;
  try {
    if (4 & n2.shapeFlag) {
      const e7 = s2 || r2, t6 = e7;
      v3 = normalizeVNode$1(c3.call(t6, e7, u3, p2, d3, f2, g3)), _4 = a3;
    } else {
      const e7 = t5;
      0, v3 = normalizeVNode$1(e7.length > 1 ? e7(p2, { attrs: a3, slots: i3, emit: l2 }) : e7(p2, null)), _4 = t5.props ? a3 : getFunctionalFallthrough(a3);
    }
  } catch (t6) {
    bt.length = 0, handleError(t6, e6, 1), v3 = createVNode(vt);
  }
  let b3 = v3;
  if (_4 && false !== y3) {
    const e7 = Object.keys(_4), { shapeFlag: t6 } = b3;
    e7.length && 7 & t6 && (o4 && e7.some(isModelListener) && (_4 = filterModelListeners(_4, o4)), b3 = cloneVNode(b3, _4, false, true));
  }
  return n2.dirs && (b3 = cloneVNode(b3, null, false, true), b3.dirs = b3.dirs ? b3.dirs.concat(n2.dirs) : n2.dirs), n2.transition && setTransitionHooks(b3, n2.transition), v3 = b3, setCurrentRenderingInstance$1(m3), v3;
}
function hasPropsChanged(e6, t5, n2) {
  const r2 = Object.keys(t5);
  if (r2.length !== Object.keys(e6).length) return true;
  for (let s2 = 0; s2 < r2.length; s2++) {
    const o4 = r2[s2];
    if (t5[o4] !== e6[o4] && !isEmitListener(n2, o4)) return true;
  }
  return false;
}
function updateHOCHostEl({ vnode: e6, parent: t5 }, n2) {
  for (; t5; ) {
    const r2 = t5.subTree;
    if (r2.suspense && r2.suspense.activeBranch === e6 && (r2.el = e6.el), r2 !== e6) break;
    (e6 = t5.vnode).el = n2, t5 = t5.parent;
  }
}
function setFullProps(e6, t5, n2, r2) {
  const [s2, o4] = e6.propsOptions;
  let i3, a3 = false;
  if (t5) for (let l2 in t5) {
    if (I(l2)) continue;
    const c3 = t5[l2];
    let u3;
    s2 && hasOwn(s2, u3 = L(l2)) ? o4 && o4.includes(u3) ? (i3 || (i3 = {}))[u3] = c3 : n2[u3] = c3 : isEmitListener(e6.emitsOptions, l2) || l2 in r2 && c3 === r2[l2] || (r2[l2] = c3, a3 = true);
  }
  if (o4) {
    const t6 = toRaw(n2), r3 = i3 || P;
    for (let i4 = 0; i4 < o4.length; i4++) {
      const a4 = o4[i4];
      n2[a4] = resolvePropValue(s2, t6, a4, r3[a4], e6, !hasOwn(r3, a4));
    }
  }
  return a3;
}
function resolvePropValue(e6, t5, n2, r2, s2, o4) {
  const i3 = e6[n2];
  if (null != i3) {
    const e7 = hasOwn(i3, "default");
    if (e7 && void 0 === r2) {
      const e8 = i3.default;
      if (i3.type !== Function && !i3.skipFactory && isFunction(e8)) {
        const { propsDefaults: o5 } = s2;
        if (n2 in o5) r2 = o5[n2];
        else {
          const i4 = setCurrentInstance(s2);
          r2 = o5[n2] = e8.call(null, t5), i4();
        }
      } else r2 = e8;
      s2.ce && s2.ce._setProp(n2, r2);
    }
    i3[0] && (o4 && !e7 ? r2 = false : !i3[1] || "" !== r2 && r2 !== B(n2) || (r2 = true));
  }
  return r2;
}
function normalizePropsOptions(e6, t5, n2 = false) {
  const r2 = n2 ? dt : t5.propsCache, s2 = r2.get(e6);
  if (s2) return s2;
  const o4 = e6.props, i3 = {}, a3 = [];
  let l2 = false;
  if (!isFunction(e6)) {
    const extendProps = /* @__PURE__ */ __name((e7) => {
      l2 = true;
      const [n3, r3] = normalizePropsOptions(e7, t5, true);
      H(i3, n3), r3 && a3.push(...r3);
    }, "extendProps");
    !n2 && t5.mixins.length && t5.mixins.forEach(extendProps), e6.extends && extendProps(e6.extends), e6.mixins && e6.mixins.forEach(extendProps);
  }
  if (!o4 && !l2) return isObject(e6) && r2.set(e6, j), j;
  if (M(o4)) for (let e7 = 0; e7 < o4.length; e7++) {
    const t6 = L(o4[e7]);
    validatePropName(t6) && (i3[t6] = P);
  }
  else if (o4) for (const e7 in o4) {
    const t6 = L(e7);
    if (validatePropName(t6)) {
      const n3 = o4[e7], r3 = i3[t6] = M(n3) || isFunction(n3) ? { type: n3 } : H({}, n3), s3 = r3.type;
      let l3 = false, c4 = true;
      if (M(s3)) for (let e8 = 0; e8 < s3.length; ++e8) {
        const t7 = s3[e8], n4 = isFunction(t7) && t7.name;
        if ("Boolean" === n4) {
          l3 = true;
          break;
        }
        "String" === n4 && (c4 = false);
      }
      else l3 = isFunction(s3) && "Boolean" === s3.name;
      r3[0] = l3, r3[1] = c4, (l3 || hasOwn(r3, "default")) && a3.push(t6);
    }
  }
  const c3 = [i3, a3];
  return isObject(e6) && r2.set(e6, c3), c3;
}
function validatePropName(e6) {
  return "$" !== e6[0] && !I(e6);
}
function createRenderer(e6) {
  return (function(e7) {
    getGlobalThis().__VUE__ = true;
    const { insert: t5, remove: n2, patchProp: r2, createElement: s2, createText: o4, createComment: i3, setText: a3, setElementText: l2, parentNode: c3, nextSibling: u3, setScopeId: p2 = NOOP, insertStaticContent: f2 } = e7, patch = /* @__PURE__ */ __name((e8, t6, n3, r3 = null, s3 = null, o5 = null, i4 = void 0, a4 = null, l3 = !!t6.dynamicChildren) => {
      if (e8 === t6) return;
      e8 && !isSameVNodeType(e8, t6) && (r3 = getNextHostNode(e8), unmount(e8, s3, o5, true), e8 = null), -2 === t6.patchFlag && (l3 = false, t6.dynamicChildren = null);
      const { type: c4, ref: u4, shapeFlag: p3 } = t6;
      switch (c4) {
        case mt:
          processText(e8, t6, n3, r3);
          break;
        case vt:
          processCommentNode(e8, t6, n3, r3);
          break;
        case _t:
          null == e8 && mountStaticNode(t6, n3, r3, i4);
          break;
        case yt:
          processFragment(e8, t6, n3, r3, s3, o5, i4, a4, l3);
          break;
        default:
          1 & p3 ? processElement(e8, t6, n3, r3, s3, o5, i4, a4, l3) : 6 & p3 ? processComponent(e8, t6, n3, r3, s3, o5, i4, a4, l3) : (64 & p3 || 128 & p3) && c4.process(e8, t6, n3, r3, s3, o5, i4, a4, l3, g3);
      }
      null != u4 && s3 ? setRef(u4, e8 && e8.ref, o5, t6 || e8, !t6) : null == u4 && e8 && null != e8.ref && setRef(e8.ref, null, o5, e8, true);
    }, "patch"), processText = /* @__PURE__ */ __name((e8, n3, r3, s3) => {
      if (null == e8) t5(n3.el = o4(n3.children), r3, s3);
      else {
        const t6 = n3.el = e8.el;
        n3.children !== e8.children && a3(t6, n3.children);
      }
    }, "processText"), processCommentNode = /* @__PURE__ */ __name((e8, n3, r3, s3) => {
      null == e8 ? t5(n3.el = i3(n3.children || ""), r3, s3) : n3.el = e8.el;
    }, "processCommentNode"), mountStaticNode = /* @__PURE__ */ __name((e8, t6, n3, r3) => {
      [e8.el, e8.anchor] = f2(e8.children, t6, n3, r3, e8.el, e8.anchor);
    }, "mountStaticNode"), moveStaticNode = /* @__PURE__ */ __name(({ el: e8, anchor: n3 }, r3, s3) => {
      let o5;
      for (; e8 && e8 !== n3; ) o5 = u3(e8), t5(e8, r3, s3), e8 = o5;
      t5(n3, r3, s3);
    }, "moveStaticNode"), removeStaticNode = /* @__PURE__ */ __name(({ el: e8, anchor: t6 }) => {
      let r3;
      for (; e8 && e8 !== t6; ) r3 = u3(e8), n2(e8), e8 = r3;
      n2(t6);
    }, "removeStaticNode"), processElement = /* @__PURE__ */ __name((e8, t6, n3, r3, s3, o5, i4, a4, l3) => {
      if ("svg" === t6.type ? i4 = "svg" : "math" === t6.type && (i4 = "mathml"), null == e8) mountElement(t6, n3, r3, s3, o5, i4, a4, l3);
      else {
        const n4 = e8.el && e8.el._isVueCE ? e8.el : null;
        try {
          n4 && n4._beginPatch(), patchElement(e8, t6, s3, o5, i4, a4, l3);
        } finally {
          n4 && n4._endPatch();
        }
      }
    }, "processElement"), mountElement = /* @__PURE__ */ __name((e8, n3, o5, i4, a4, c4, u4, p3) => {
      let f3, d4;
      const { props: g4, shapeFlag: y4, transition: m3, dirs: v3 } = e8;
      if (f3 = e8.el = s2(e8.type, c4, g4 && g4.is, g4), 8 & y4 ? l2(f3, e8.children) : 16 & y4 && mountChildren(e8.children, f3, null, i4, a4, resolveChildrenNamespace(e8, c4), u4, p3), v3 && invokeDirectiveHook(e8, null, i4, "created"), setScopeId(f3, e8, e8.scopeId, u4, i4), g4) {
        for (const e9 in g4) "value" === e9 || I(e9) || r2(f3, e9, null, g4[e9], c4, i4);
        "value" in g4 && r2(f3, "value", null, g4.value, c4), (d4 = g4.onVnodeBeforeMount) && invokeVNodeHook(d4, i4, e8);
      }
      v3 && invokeDirectiveHook(e8, null, i4, "beforeMount");
      const _4 = (function(e9, t6) {
        return (!e9 || e9 && !e9.pendingBranch) && t6 && !t6.persisted;
      })(a4, m3);
      _4 && m3.beforeEnter(f3), t5(f3, n3, o5), ((d4 = g4 && g4.onVnodeMounted) || _4 || v3) && queuePostRenderEffect(() => {
        d4 && invokeVNodeHook(d4, i4, e8), _4 && m3.enter(f3), v3 && invokeDirectiveHook(e8, null, i4, "mounted");
      }, a4);
    }, "mountElement"), setScopeId = /* @__PURE__ */ __name((e8, t6, n3, r3, s3) => {
      if (n3 && p2(e8, n3), r3) for (let t7 = 0; t7 < r3.length; t7++) p2(e8, r3[t7]);
      if (s3) {
        let n4 = s3.subTree;
        if (t6 === n4 || isSuspense(n4.type) && (n4.ssContent === t6 || n4.ssFallback === t6)) {
          const t7 = s3.vnode;
          setScopeId(e8, t7, t7.scopeId, t7.slotScopeIds, s3.parent);
        }
      }
    }, "setScopeId"), mountChildren = /* @__PURE__ */ __name((e8, t6, n3, r3, s3, o5, i4, a4, l3 = 0) => {
      for (let c4 = l3; c4 < e8.length; c4++) {
        const l4 = e8[c4] = a4 ? cloneIfMounted(e8[c4]) : normalizeVNode$1(e8[c4]);
        patch(null, l4, t6, n3, r3, s3, o5, i4, a4);
      }
    }, "mountChildren"), patchElement = /* @__PURE__ */ __name((e8, t6, n3, s3, o5, i4, a4) => {
      const c4 = t6.el = e8.el;
      let { patchFlag: u4, dynamicChildren: p3, dirs: f3 } = t6;
      u4 |= 16 & e8.patchFlag;
      const d4 = e8.props || P, g4 = t6.props || P;
      let y4;
      if (n3 && toggleRecurse(n3, false), (y4 = g4.onVnodeBeforeUpdate) && invokeVNodeHook(y4, n3, t6, e8), f3 && invokeDirectiveHook(t6, e8, n3, "beforeUpdate"), n3 && toggleRecurse(n3, true), (d4.innerHTML && null == g4.innerHTML || d4.textContent && null == g4.textContent) && l2(c4, ""), p3 ? patchBlockChildren(e8.dynamicChildren, p3, c4, n3, s3, resolveChildrenNamespace(t6, o5), i4) : a4 || patchChildren(e8, t6, c4, null, n3, s3, resolveChildrenNamespace(t6, o5), i4, false), u4 > 0) {
        if (16 & u4) patchProps(c4, d4, g4, n3, o5);
        else if (2 & u4 && d4.class !== g4.class && r2(c4, "class", null, g4.class, o5), 4 & u4 && r2(c4, "style", d4.style, g4.style, o5), 8 & u4) {
          const e9 = t6.dynamicProps;
          for (let t7 = 0; t7 < e9.length; t7++) {
            const s4 = e9[t7], i5 = d4[s4], a5 = g4[s4];
            a5 === i5 && "value" !== s4 || r2(c4, s4, i5, a5, o5, n3);
          }
        }
        1 & u4 && e8.children !== t6.children && l2(c4, t6.children);
      } else a4 || null != p3 || patchProps(c4, d4, g4, n3, o5);
      ((y4 = g4.onVnodeUpdated) || f3) && queuePostRenderEffect(() => {
        y4 && invokeVNodeHook(y4, n3, t6, e8), f3 && invokeDirectiveHook(t6, e8, n3, "updated");
      }, s3);
    }, "patchElement"), patchBlockChildren = /* @__PURE__ */ __name((e8, t6, n3, r3, s3, o5, i4) => {
      for (let a4 = 0; a4 < t6.length; a4++) {
        const l3 = e8[a4], u4 = t6[a4], p3 = l3.el && (l3.type === yt || !isSameVNodeType(l3, u4) || 198 & l3.shapeFlag) ? c3(l3.el) : n3;
        patch(l3, u4, p3, null, r3, s3, o5, i4, true);
      }
    }, "patchBlockChildren"), patchProps = /* @__PURE__ */ __name((e8, t6, n3, s3, o5) => {
      if (t6 !== n3) {
        if (t6 !== P) for (const i4 in t6) I(i4) || i4 in n3 || r2(e8, i4, t6[i4], null, o5, s3);
        for (const i4 in n3) {
          if (I(i4)) continue;
          const a4 = n3[i4], l3 = t6[i4];
          a4 !== l3 && "value" !== i4 && r2(e8, i4, l3, a4, o5, s3);
        }
        "value" in n3 && r2(e8, "value", t6.value, n3.value, o5);
      }
    }, "patchProps"), processFragment = /* @__PURE__ */ __name((e8, n3, r3, s3, i4, a4, l3, c4, u4) => {
      const p3 = n3.el = e8 ? e8.el : o4(""), f3 = n3.anchor = e8 ? e8.anchor : o4("");
      let { patchFlag: d4, dynamicChildren: g4, slotScopeIds: y4 } = n3;
      y4 && (c4 = c4 ? c4.concat(y4) : y4), null == e8 ? (t5(p3, r3, s3), t5(f3, r3, s3), mountChildren(n3.children || [], r3, f3, i4, a4, l3, c4, u4)) : d4 > 0 && 64 & d4 && g4 && e8.dynamicChildren && e8.dynamicChildren.length === g4.length ? (patchBlockChildren(e8.dynamicChildren, g4, r3, i4, a4, l3, c4), (null != n3.key || i4 && n3 === i4.subTree) && traverseStaticChildren(e8, n3, true)) : patchChildren(e8, n3, r3, f3, i4, a4, l3, c4, u4);
    }, "processFragment"), processComponent = /* @__PURE__ */ __name((e8, t6, n3, r3, s3, o5, i4, a4, l3) => {
      t6.slotScopeIds = a4, null == e8 ? 512 & t6.shapeFlag ? s3.ctx.activate(t6, n3, r3, i4, l3) : mountComponent(t6, n3, r3, s3, o5, i4, l3) : updateComponent(e8, t6, l3);
    }, "processComponent"), mountComponent = /* @__PURE__ */ __name((e8, t6, n3, r3, s3, o5, i4) => {
      const a4 = e8.component = createComponentInstance$1(e8, r3, s3);
      if (isKeepAlive(e8) && (a4.ctx.renderer = g3), setupComponent$1(a4, false, i4), a4.asyncDep) {
        if (s3 && s3.registerDep(a4, setupRenderEffect, i4), !e8.el) {
          const r4 = a4.subTree = createVNode(vt);
          processCommentNode(null, r4, t6, n3), e8.placeholder = r4.el;
        }
      } else setupRenderEffect(a4, e8, t6, n3, s3, o5, i4);
    }, "mountComponent"), updateComponent = /* @__PURE__ */ __name((e8, t6, n3) => {
      const r3 = t6.component = e8.component;
      if ((function(e9, t7, n4) {
        const { props: r4, children: s3, component: o5 } = e9, { props: i4, children: a4, patchFlag: l3 } = t7, c4 = o5.emitsOptions;
        if (t7.dirs || t7.transition) return true;
        if (!(n4 && l3 >= 0)) return !(!s3 && !a4 || a4 && a4.$stable) || r4 !== i4 && (r4 ? !i4 || hasPropsChanged(r4, i4, c4) : !!i4);
        if (1024 & l3) return true;
        if (16 & l3) return r4 ? hasPropsChanged(r4, i4, c4) : !!i4;
        if (8 & l3) {
          const e10 = t7.dynamicProps;
          for (let t8 = 0; t8 < e10.length; t8++) {
            const n5 = e10[t8];
            if (i4[n5] !== r4[n5] && !isEmitListener(c4, n5)) return true;
          }
        }
        return false;
      })(e8, t6, n3)) {
        if (r3.asyncDep && !r3.asyncResolved) return void updateComponentPreRender(r3, t6, n3);
        r3.next = t6, r3.update();
      } else t6.el = e8.el, r3.vnode = t6;
    }, "updateComponent"), setupRenderEffect = /* @__PURE__ */ __name((e8, t6, n3, r3, s3, o5, i4) => {
      const componentUpdateFn = /* @__PURE__ */ __name(() => {
        if (e8.isMounted) {
          let { next: t7, bu: n4, u: r4, parent: a5, vnode: l4 } = e8;
          {
            const n5 = locateNonHydratedAsyncRoot(e8);
            if (n5) return t7 && (t7.el = l4.el, updateComponentPreRender(e8, t7, i4)), void n5.asyncDep.then(() => {
              e8.isUnmounted || componentUpdateFn();
            });
          }
          let u5, p3 = t7;
          toggleRecurse(e8, false), t7 ? (t7.el = l4.el, updateComponentPreRender(e8, t7, i4)) : t7 = l4, n4 && invokeArrayFns(n4), (u5 = t7.props && t7.props.onVnodeBeforeUpdate) && invokeVNodeHook(u5, a5, t7, l4), toggleRecurse(e8, true);
          const f3 = renderComponentRoot$1(e8), d4 = e8.subTree;
          e8.subTree = f3, patch(d4, f3, c3(d4.el), getNextHostNode(d4), e8, s3, o5), t7.el = f3.el, null === p3 && updateHOCHostEl(e8, f3.el), r4 && queuePostRenderEffect(r4, s3), (u5 = t7.props && t7.props.onVnodeUpdated) && queuePostRenderEffect(() => invokeVNodeHook(u5, a5, t7, l4), s3);
        } else {
          let i5;
          const { el: a5, props: l4 } = t6, { bm: c4, m: u5, parent: p3, root: f3, type: d4 } = e8, g4 = isAsyncWrapper(t6);
          toggleRecurse(e8, false), c4 && invokeArrayFns(c4), !g4 && (i5 = l4 && l4.onVnodeBeforeMount) && invokeVNodeHook(i5, p3, t6), toggleRecurse(e8, true);
          {
            f3.ce && false !== f3.ce._def.shadowRoot && f3.ce._injectChildStyle(d4);
            const i6 = e8.subTree = renderComponentRoot$1(e8);
            patch(null, i6, n3, r3, e8, s3, o5), t6.el = i6.el;
          }
          if (u5 && queuePostRenderEffect(u5, s3), !g4 && (i5 = l4 && l4.onVnodeMounted)) {
            const e9 = t6;
            queuePostRenderEffect(() => invokeVNodeHook(i5, p3, e9), s3);
          }
          (256 & t6.shapeFlag || p3 && isAsyncWrapper(p3.vnode) && 256 & p3.vnode.shapeFlag) && e8.a && queuePostRenderEffect(e8.a, s3), e8.isMounted = true, t6 = n3 = r3 = null;
        }
      }, "componentUpdateFn");
      e8.scope.on();
      const a4 = e8.effect = new ReactiveEffect(componentUpdateFn);
      e8.scope.off();
      const l3 = e8.update = a4.run.bind(a4), u4 = e8.job = a4.runIfDirty.bind(a4);
      u4.i = e8, u4.id = e8.uid, a4.scheduler = () => queueJob(u4), toggleRecurse(e8, true), l3();
    }, "setupRenderEffect"), updateComponentPreRender = /* @__PURE__ */ __name((e8, t6, n3) => {
      t6.component = e8;
      const r3 = e8.vnode.props;
      e8.vnode = t6, e8.next = null, (function(e9, t7, n4, r4) {
        const { props: s3, attrs: o5, vnode: { patchFlag: i4 } } = e9, a4 = toRaw(s3), [l3] = e9.propsOptions;
        let c4 = false;
        if (!(r4 || i4 > 0) || 16 & i4) {
          let r5;
          setFullProps(e9, t7, s3, o5) && (c4 = true);
          for (const o6 in a4) t7 && (hasOwn(t7, o6) || (r5 = B(o6)) !== o6 && hasOwn(t7, r5)) || (l3 ? !n4 || void 0 === n4[o6] && void 0 === n4[r5] || (s3[o6] = resolvePropValue(l3, a4, o6, void 0, e9, true)) : delete s3[o6]);
          if (o5 !== a4) for (const e10 in o5) t7 && hasOwn(t7, e10) || (delete o5[e10], c4 = true);
        } else if (8 & i4) {
          const n5 = e9.vnode.dynamicProps;
          for (let r5 = 0; r5 < n5.length; r5++) {
            let i5 = n5[r5];
            if (isEmitListener(e9.emitsOptions, i5)) continue;
            const u4 = t7[i5];
            if (l3) if (hasOwn(o5, i5)) u4 !== o5[i5] && (o5[i5] = u4, c4 = true);
            else {
              const t8 = L(i5);
              s3[t8] = resolvePropValue(l3, a4, t8, u4, e9, false);
            }
            else u4 !== o5[i5] && (o5[i5] = u4, c4 = true);
          }
        }
        c4 && trigger(e9.attrs, "set", "");
      })(e8, t6.props, r3, n3), ((e9, t7, n4) => {
        const { vnode: r4, slots: s3 } = e9;
        let o5 = true, i4 = P;
        if (32 & r4.shapeFlag) {
          const e10 = t7._;
          e10 ? n4 && 1 === e10 ? o5 = false : assignSlots(s3, t7, n4) : (o5 = !t7.$stable, normalizeObjectSlots(t7, s3)), i4 = t7;
        } else t7 && (normalizeVNodeSlots(e9, t7), i4 = { default: 1 });
        if (o5) for (const e10 in s3) isInternalKey(e10) || null != i4[e10] || delete s3[e10];
      })(e8, t6.children, n3), pauseTracking(), flushPreFlushCbs(e8), resetTracking();
    }, "updateComponentPreRender"), patchChildren = /* @__PURE__ */ __name((e8, t6, n3, r3, s3, o5, i4, a4, c4 = false) => {
      const u4 = e8 && e8.children, p3 = e8 ? e8.shapeFlag : 0, f3 = t6.children, { patchFlag: d4, shapeFlag: g4 } = t6;
      if (d4 > 0) {
        if (128 & d4) return void patchKeyedChildren(u4, f3, n3, r3, s3, o5, i4, a4, c4);
        if (256 & d4) return void patchUnkeyedChildren(u4, f3, n3, r3, s3, o5, i4, a4, c4);
      }
      8 & g4 ? (16 & p3 && unmountChildren(u4, s3, o5), f3 !== u4 && l2(n3, f3)) : 16 & p3 ? 16 & g4 ? patchKeyedChildren(u4, f3, n3, r3, s3, o5, i4, a4, c4) : unmountChildren(u4, s3, o5, true) : (8 & p3 && l2(n3, ""), 16 & g4 && mountChildren(f3, n3, r3, s3, o5, i4, a4, c4));
    }, "patchChildren"), patchUnkeyedChildren = /* @__PURE__ */ __name((e8, t6, n3, r3, s3, o5, i4, a4, l3) => {
      t6 = t6 || j;
      const c4 = (e8 = e8 || j).length, u4 = t6.length, p3 = Math.min(c4, u4);
      let f3;
      for (f3 = 0; f3 < p3; f3++) {
        const r4 = t6[f3] = l3 ? cloneIfMounted(t6[f3]) : normalizeVNode$1(t6[f3]);
        patch(e8[f3], r4, n3, null, s3, o5, i4, a4, l3);
      }
      c4 > u4 ? unmountChildren(e8, s3, o5, true, false, p3) : mountChildren(t6, n3, r3, s3, o5, i4, a4, l3, p3);
    }, "patchUnkeyedChildren"), patchKeyedChildren = /* @__PURE__ */ __name((e8, t6, n3, r3, s3, o5, i4, a4, l3) => {
      let c4 = 0;
      const u4 = t6.length;
      let p3 = e8.length - 1, f3 = u4 - 1;
      for (; c4 <= p3 && c4 <= f3; ) {
        const r4 = e8[c4], u5 = t6[c4] = l3 ? cloneIfMounted(t6[c4]) : normalizeVNode$1(t6[c4]);
        if (!isSameVNodeType(r4, u5)) break;
        patch(r4, u5, n3, null, s3, o5, i4, a4, l3), c4++;
      }
      for (; c4 <= p3 && c4 <= f3; ) {
        const r4 = e8[p3], c5 = t6[f3] = l3 ? cloneIfMounted(t6[f3]) : normalizeVNode$1(t6[f3]);
        if (!isSameVNodeType(r4, c5)) break;
        patch(r4, c5, n3, null, s3, o5, i4, a4, l3), p3--, f3--;
      }
      if (c4 > p3) {
        if (c4 <= f3) {
          const e9 = f3 + 1, p4 = e9 < u4 ? t6[e9].el : r3;
          for (; c4 <= f3; ) patch(null, t6[c4] = l3 ? cloneIfMounted(t6[c4]) : normalizeVNode$1(t6[c4]), n3, p4, s3, o5, i4, a4, l3), c4++;
        }
      } else if (c4 > f3) for (; c4 <= p3; ) unmount(e8[c4], s3, o5, true), c4++;
      else {
        const d4 = c4, g4 = c4, y4 = /* @__PURE__ */ new Map();
        for (c4 = g4; c4 <= f3; c4++) {
          const e9 = t6[c4] = l3 ? cloneIfMounted(t6[c4]) : normalizeVNode$1(t6[c4]);
          null != e9.key && y4.set(e9.key, c4);
        }
        let m3, v3 = 0;
        const _4 = f3 - g4 + 1;
        let b3 = false, k3 = 0;
        const w3 = new Array(_4);
        for (c4 = 0; c4 < _4; c4++) w3[c4] = 0;
        for (c4 = d4; c4 <= p3; c4++) {
          const r4 = e8[c4];
          if (v3 >= _4) {
            unmount(r4, s3, o5, true);
            continue;
          }
          let u5;
          if (null != r4.key) u5 = y4.get(r4.key);
          else for (m3 = g4; m3 <= f3; m3++) if (0 === w3[m3 - g4] && isSameVNodeType(r4, t6[m3])) {
            u5 = m3;
            break;
          }
          void 0 === u5 ? unmount(r4, s3, o5, true) : (w3[u5 - g4] = c4 + 1, u5 >= k3 ? k3 = u5 : b3 = true, patch(r4, t6[u5], n3, null, s3, o5, i4, a4, l3), v3++);
        }
        const S3 = b3 ? (function(e9) {
          const t7 = e9.slice(), n4 = [0];
          let r4, s4, o6, i5, a5;
          const l4 = e9.length;
          for (r4 = 0; r4 < l4; r4++) {
            const l5 = e9[r4];
            if (0 !== l5) {
              if (s4 = n4[n4.length - 1], e9[s4] < l5) {
                t7[r4] = s4, n4.push(r4);
                continue;
              }
              for (o6 = 0, i5 = n4.length - 1; o6 < i5; ) a5 = o6 + i5 >> 1, e9[n4[a5]] < l5 ? o6 = a5 + 1 : i5 = a5;
              l5 < e9[n4[o6]] && (o6 > 0 && (t7[r4] = n4[o6 - 1]), n4[o6] = r4);
            }
          }
          o6 = n4.length, i5 = n4[o6 - 1];
          for (; o6-- > 0; ) n4[o6] = i5, i5 = t7[i5];
          return n4;
        })(w3) : j;
        for (m3 = S3.length - 1, c4 = _4 - 1; c4 >= 0; c4--) {
          const e9 = g4 + c4, p4 = t6[e9], f4 = t6[e9 + 1], d5 = e9 + 1 < u4 ? f4.el || resolveAsyncComponentPlaceholder(f4) : r3;
          0 === w3[c4] ? patch(null, p4, n3, d5, s3, o5, i4, a4, l3) : b3 && (m3 < 0 || c4 !== S3[m3] ? move(p4, n3, d5, 2) : m3--);
        }
      }
    }, "patchKeyedChildren"), move = /* @__PURE__ */ __name((e8, r3, s3, o5, i4 = null) => {
      const { el: a4, type: l3, transition: c4, children: u4, shapeFlag: p3 } = e8;
      if (6 & p3) return void move(e8.component.subTree, r3, s3, o5);
      if (128 & p3) return void e8.suspense.move(r3, s3, o5);
      if (64 & p3) return void l3.move(e8, r3, s3, g3);
      if (l3 === yt) {
        t5(a4, r3, s3);
        for (let e9 = 0; e9 < u4.length; e9++) move(u4[e9], r3, s3, o5);
        return void t5(e8.anchor, r3, s3);
      }
      if (l3 === _t) return void moveStaticNode(e8, r3, s3);
      if (2 !== o5 && 1 & p3 && c4) if (0 === o5) c4.beforeEnter(a4), t5(a4, r3, s3), queuePostRenderEffect(() => c4.enter(a4), i4);
      else {
        const { leave: o6, delayLeave: i5, afterLeave: l4 } = c4, remove22 = /* @__PURE__ */ __name(() => {
          e8.ctx.isUnmounted ? n2(a4) : t5(a4, r3, s3);
        }, "remove2"), performLeave = /* @__PURE__ */ __name(() => {
          a4._isLeaving && a4[qe2](true), o6(a4, () => {
            remove22(), l4 && l4();
          });
        }, "performLeave");
        i5 ? i5(a4, remove22, performLeave) : performLeave();
      }
      else t5(a4, r3, s3);
    }, "move"), unmount = /* @__PURE__ */ __name((e8, t6, n3, r3 = false, s3 = false) => {
      const { type: o5, props: i4, ref: a4, children: l3, dynamicChildren: c4, shapeFlag: u4, patchFlag: p3, dirs: f3, cacheIndex: d4 } = e8;
      if (-2 === p3 && (s3 = false), null != a4 && (pauseTracking(), setRef(a4, null, n3, e8, true), resetTracking()), null != d4 && (t6.renderCache[d4] = void 0), 256 & u4) return void t6.ctx.deactivate(e8);
      const y4 = 1 & u4 && f3, m3 = !isAsyncWrapper(e8);
      let v3;
      if (m3 && (v3 = i4 && i4.onVnodeBeforeUnmount) && invokeVNodeHook(v3, t6, e8), 6 & u4) unmountComponent(e8.component, n3, r3);
      else {
        if (128 & u4) return void e8.suspense.unmount(n3, r3);
        y4 && invokeDirectiveHook(e8, null, t6, "beforeUnmount"), 64 & u4 ? e8.type.remove(e8, t6, n3, g3, r3) : c4 && !c4.hasOnce && (o5 !== yt || p3 > 0 && 64 & p3) ? unmountChildren(c4, t6, n3, false, true) : (o5 === yt && 384 & p3 || !s3 && 16 & u4) && unmountChildren(l3, t6, n3), r3 && remove2(e8);
      }
      (m3 && (v3 = i4 && i4.onVnodeUnmounted) || y4) && queuePostRenderEffect(() => {
        v3 && invokeVNodeHook(v3, t6, e8), y4 && invokeDirectiveHook(e8, null, t6, "unmounted");
      }, n3);
    }, "unmount"), remove2 = /* @__PURE__ */ __name((e8) => {
      const { type: t6, el: r3, anchor: s3, transition: o5 } = e8;
      if (t6 === yt) return void removeFragment(r3, s3);
      if (t6 === _t) return void removeStaticNode(e8);
      const performRemove = /* @__PURE__ */ __name(() => {
        n2(r3), o5 && !o5.persisted && o5.afterLeave && o5.afterLeave();
      }, "performRemove");
      if (1 & e8.shapeFlag && o5 && !o5.persisted) {
        const { leave: t7, delayLeave: n3 } = o5, performLeave = /* @__PURE__ */ __name(() => t7(r3, performRemove), "performLeave");
        n3 ? n3(e8.el, performRemove, performLeave) : performLeave();
      } else performRemove();
    }, "remove"), removeFragment = /* @__PURE__ */ __name((e8, t6) => {
      let r3;
      for (; e8 !== t6; ) r3 = u3(e8), n2(e8), e8 = r3;
      n2(t6);
    }, "removeFragment"), unmountComponent = /* @__PURE__ */ __name((e8, t6, n3) => {
      const { bum: r3, scope: s3, job: o5, subTree: i4, um: a4, m: l3, a: c4 } = e8;
      invalidateMount(l3), invalidateMount(c4), r3 && invokeArrayFns(r3), s3.stop(), o5 && (o5.flags |= 8, unmount(i4, e8, t6, n3)), a4 && queuePostRenderEffect(a4, t6), queuePostRenderEffect(() => {
        e8.isUnmounted = true;
      }, t6);
    }, "unmountComponent"), unmountChildren = /* @__PURE__ */ __name((e8, t6, n3, r3 = false, s3 = false, o5 = 0) => {
      for (let i4 = o5; i4 < e8.length; i4++) unmount(e8[i4], t6, n3, r3, s3);
    }, "unmountChildren"), getNextHostNode = /* @__PURE__ */ __name((e8) => {
      if (6 & e8.shapeFlag) return getNextHostNode(e8.component.subTree);
      if (128 & e8.shapeFlag) return e8.suspense.next();
      const t6 = u3(e8.anchor || e8.el), n3 = t6 && t6[We2];
      return n3 ? u3(n3) : t6;
    }, "getNextHostNode");
    let d3 = false;
    const render = /* @__PURE__ */ __name((e8, t6, n3) => {
      let r3;
      null == e8 ? t6._vnode && (unmount(t6._vnode, null, null, true), r3 = t6._vnode.component) : patch(t6._vnode || null, e8, t6, null, null, null, n3), t6._vnode = e8, d3 || (d3 = true, flushPreFlushCbs(r3), flushPostFlushCbs(), d3 = false);
    }, "render"), g3 = { p: patch, um: unmount, m: move, r: remove2, mt: mountComponent, mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, n: getNextHostNode, o: e7 };
    let y3;
    return { render, hydrate: y3, createApp: createAppAPI(render) };
  })(e6);
}
function resolveChildrenNamespace({ type: e6, props: t5 }, n2) {
  return "svg" === n2 && "foreignObject" === e6 || "mathml" === n2 && "annotation-xml" === e6 && t5 && t5.encoding && t5.encoding.includes("html") ? void 0 : n2;
}
function toggleRecurse({ effect: e6, job: t5 }, n2) {
  n2 ? (e6.flags |= 32, t5.flags |= 4) : (e6.flags &= -33, t5.flags &= -5);
}
function traverseStaticChildren(e6, t5, n2 = false) {
  const r2 = e6.children, s2 = t5.children;
  if (M(r2) && M(s2)) for (let t6 = 0; t6 < r2.length; t6++) {
    const o4 = r2[t6];
    let i3 = s2[t6];
    1 & i3.shapeFlag && !i3.dynamicChildren && ((i3.patchFlag <= 0 || 32 === i3.patchFlag) && (i3 = s2[t6] = cloneIfMounted(s2[t6]), i3.el = o4.el), n2 || -2 === i3.patchFlag || traverseStaticChildren(o4, i3)), i3.type === mt && (-1 !== i3.patchFlag ? i3.el = o4.el : i3.__elIndex = t6 + (e6.type === yt ? 1 : 0)), i3.type !== vt || i3.el || (i3.el = o4.el);
  }
}
function locateNonHydratedAsyncRoot(e6) {
  const t5 = e6.subTree.component;
  if (t5) return t5.asyncDep && !t5.asyncResolved ? t5 : locateNonHydratedAsyncRoot(t5);
}
function invalidateMount(e6) {
  if (e6) for (let t5 = 0; t5 < e6.length; t5++) e6[t5].flags |= 8;
}
function resolveAsyncComponentPlaceholder(e6) {
  if (e6.placeholder) return e6.placeholder;
  const t5 = e6.component;
  return t5 ? resolveAsyncComponentPlaceholder(t5.subTree) : null;
}
function triggerEvent(e6, t5) {
  const n2 = e6.props && e6.props[t5];
  isFunction(n2) && n2();
}
function createSuspenseBoundary(e6, t5, n2, r2, s2, o4, i3, a3, l2, c3, u3 = false) {
  const { p: p2, m: f2, um: d3, n: g3, o: { parentNode: y3, remove: m3 } } = c3;
  let v3;
  const _4 = (function(e7) {
    const t6 = e7.props && e7.props.suspensible;
    return null != t6 && false !== t6;
  })(e6);
  _4 && t5 && t5.pendingBranch && (v3 = t5.pendingId, t5.deps++);
  const b3 = e6.props ? ((e7) => {
    const t6 = isString(e7) ? Number(e7) : NaN;
    return isNaN(t6) ? e7 : t6;
  })(e6.props.timeout) : void 0, k3 = o4, w3 = { vnode: e6, parent: t5, parentComponent: n2, namespace: i3, container: r2, hiddenContainer: s2, deps: 0, pendingId: ht++, timeout: "number" == typeof b3 ? b3 : -1, activeBranch: null, pendingBranch: null, isInFallback: !u3, isHydrating: u3, isUnmounted: false, effects: [], resolve(e7 = false, n3 = false) {
    const { vnode: r3, activeBranch: s3, pendingBranch: i4, pendingId: a4, effects: l3, parentComponent: c4, container: u4, isInFallback: p3 } = w3;
    let m4 = false;
    w3.isHydrating ? w3.isHydrating = false : e7 || (m4 = s3 && i4.transition && "out-in" === i4.transition.mode, m4 && (s3.transition.afterLeave = () => {
      a4 === w3.pendingId && (f2(i4, u4, o4 === k3 ? g3(s3) : o4, 0), queuePostFlushCb(l3), p3 && r3.ssFallback && (r3.ssFallback.el = null));
    }), s3 && (y3(s3.el) === u4 && (o4 = g3(s3)), d3(s3, c4, w3, true), !m4 && p3 && r3.ssFallback && queuePostRenderEffect(() => r3.ssFallback.el = null, w3)), m4 || f2(i4, u4, o4, 0)), setActiveBranch(w3, i4), w3.pendingBranch = null, w3.isInFallback = false;
    let b4 = w3.parent, S3 = false;
    for (; b4; ) {
      if (b4.pendingBranch) {
        b4.effects.push(...l3), S3 = true;
        break;
      }
      b4 = b4.parent;
    }
    S3 || m4 || queuePostFlushCb(l3), w3.effects = [], _4 && t5 && t5.pendingBranch && v3 === t5.pendingId && (t5.deps--, 0 !== t5.deps || n3 || t5.resolve()), triggerEvent(r3, "onResolve");
  }, fallback(e7) {
    if (!w3.pendingBranch) return;
    const { vnode: t6, activeBranch: n3, parentComponent: r3, container: s3, namespace: o5 } = w3;
    triggerEvent(t6, "onFallback");
    const i4 = g3(n3), mountFallback = /* @__PURE__ */ __name(() => {
      w3.isInFallback && (p2(null, e7, s3, i4, r3, null, o5, a3, l2), setActiveBranch(w3, e7));
    }, "mountFallback"), c4 = e7.transition && "out-in" === e7.transition.mode;
    c4 && (n3.transition.afterLeave = mountFallback), w3.isInFallback = true, d3(n3, r3, null, true), c4 || mountFallback();
  }, move(e7, t6, n3) {
    w3.activeBranch && f2(w3.activeBranch, e7, t6, n3), w3.container = e7;
  }, next: /* @__PURE__ */ __name(() => w3.activeBranch && g3(w3.activeBranch), "next"), registerDep(e7, t6, n3) {
    const r3 = !!w3.pendingBranch;
    r3 && w3.deps++;
    const s3 = e7.vnode.el;
    e7.asyncDep.catch((t7) => {
      handleError(t7, e7, 0);
    }).then((o5) => {
      if (e7.isUnmounted || w3.isUnmounted || w3.pendingId !== e7.suspenseId) return;
      e7.asyncResolved = true;
      const { vnode: a4 } = e7;
      handleSetupResult(e7, o5), s3 && (a4.el = s3);
      const l3 = !s3 && e7.subTree.el;
      t6(e7, a4, y3(s3 || e7.subTree.el), s3 ? null : g3(e7.subTree), w3, i3, n3), l3 && (a4.placeholder = null, m3(l3)), updateHOCHostEl(e7, a4.el), r3 && 0 === --w3.deps && w3.resolve();
    });
  }, unmount(e7, t6) {
    w3.isUnmounted = true, w3.activeBranch && d3(w3.activeBranch, n2, e7, t6), w3.pendingBranch && d3(w3.pendingBranch, n2, e7, t6);
  } };
  return w3;
}
function normalizeSuspenseSlot(e6) {
  let t5;
  if (isFunction(e6)) {
    const n2 = wt && e6._c;
    n2 && (e6._d = false, (function(e7 = false) {
      bt.push(kt = e7 ? null : []);
    })()), e6 = e6(), n2 && (e6._d = true, t5 = kt, bt.pop(), kt = bt[bt.length - 1] || null);
  }
  if (M(e6)) {
    const t6 = (function(e7) {
      let t7;
      for (let n2 = 0; n2 < e7.length; n2++) {
        const r2 = e7[n2];
        if (!isVNode(r2)) return;
        if (r2.type !== vt || "v-if" === r2.children) {
          if (t7) return;
          t7 = r2;
        }
      }
      return t7;
    })(e6);
    e6 = t6;
  }
  return e6 = normalizeVNode$1(e6), t5 && !e6.dynamicChildren && (e6.dynamicChildren = t5.filter((t6) => t6 !== e6)), e6;
}
function setActiveBranch(e6, t5) {
  e6.activeBranch = t5;
  const { vnode: n2, parentComponent: r2 } = e6;
  let s2 = t5.el;
  for (; !s2 && t5.component; ) s2 = (t5 = t5.component.subTree).el;
  n2.el = s2, r2 && r2.subTree === n2 && (r2.vnode.el = s2, updateHOCHostEl(r2, s2));
}
function setBlockTracking(e6, t5 = false) {
  wt += e6, e6 < 0 && kt && t5 && (kt.hasOnce = true);
}
function isVNode(e6) {
  return !!e6 && true === e6.__v_isVNode;
}
function isSameVNodeType(e6, t5) {
  return e6.type === t5.type && e6.key === t5.key;
}
function cloneVNode(e6, t5, n2 = false, r2 = false) {
  const { props: s2, ref: o4, patchFlag: i3, children: a3, transition: l2 } = e6, c3 = t5 ? mergeProps(s2 || {}, t5) : s2, u3 = { __v_isVNode: true, __v_skip: true, type: e6.type, props: c3, key: c3 && normalizeKey(c3), ref: t5 && t5.ref ? n2 && o4 ? M(o4) ? o4.concat(normalizeRef(t5)) : [o4, normalizeRef(t5)] : normalizeRef(t5) : o4, scopeId: e6.scopeId, slotScopeIds: e6.slotScopeIds, children: a3, target: e6.target, targetStart: e6.targetStart, targetAnchor: e6.targetAnchor, staticCount: e6.staticCount, shapeFlag: e6.shapeFlag, patchFlag: t5 && e6.type !== yt ? -1 === i3 ? 16 : 16 | i3 : i3, dynamicProps: e6.dynamicProps, dynamicChildren: e6.dynamicChildren, appContext: e6.appContext, dirs: e6.dirs, transition: l2, component: e6.component, suspense: e6.suspense, ssContent: e6.ssContent && cloneVNode(e6.ssContent), ssFallback: e6.ssFallback && cloneVNode(e6.ssFallback), placeholder: e6.placeholder, el: e6.el, anchor: e6.anchor, ctx: e6.ctx, ce: e6.ce };
  return l2 && r2 && setTransitionHooks(u3, l2.clone(u3)), u3;
}
function createTextVNode(e6 = " ", t5 = 0) {
  return createVNode(mt, null, e6, t5);
}
function normalizeVNode$1(e6) {
  return null == e6 || "boolean" == typeof e6 ? createVNode(vt) : M(e6) ? createVNode(yt, null, e6.slice()) : isVNode(e6) ? cloneIfMounted(e6) : createVNode(mt, null, String(e6));
}
function cloneIfMounted(e6) {
  return null === e6.el && -1 !== e6.patchFlag || e6.memo ? e6 : cloneVNode(e6);
}
function normalizeChildren(e6, t5) {
  let n2 = 0;
  const { shapeFlag: r2 } = e6;
  if (null == t5) t5 = null;
  else if (M(t5)) n2 = 16;
  else if ("object" == typeof t5) {
    if (65 & r2) {
      const n3 = t5.default;
      return void (n3 && (n3._c && (n3._d = false), normalizeChildren(e6, n3()), n3._c && (n3._d = true)));
    }
    {
      n2 = 32;
      const r3 = t5._;
      r3 || isInternalObject(t5) ? 3 === r3 && Fe2 && (1 === Fe2.slots._ ? t5._ = 1 : (t5._ = 2, e6.patchFlag |= 1024)) : t5._ctx = Fe2;
    }
  } else isFunction(t5) ? (t5 = { default: t5, _ctx: Fe2 }, n2 = 32) : (t5 = String(t5), 64 & r2 ? (n2 = 16, t5 = [createTextVNode(t5)]) : n2 = 8);
  e6.children = t5, e6.shapeFlag |= n2;
}
function mergeProps(...e6) {
  const t5 = {};
  for (let n2 = 0; n2 < e6.length; n2++) {
    const r2 = e6[n2];
    for (const e7 in r2) if ("class" === e7) t5.class !== r2.class && (t5.class = normalizeClass([t5.class, r2.class]));
    else if ("style" === e7) t5.style = normalizeStyle([t5.style, r2.style]);
    else if (isOn(e7)) {
      const n3 = t5[e7], s2 = r2[e7];
      !s2 || n3 === s2 || M(n3) && n3.includes(s2) || (t5[e7] = n3 ? [].concat(n3, s2) : s2);
    } else "" !== e7 && (t5[e7] = r2[e7]);
  }
  return t5;
}
function invokeVNodeHook(e6, t5, n2, r2 = null) {
  callWithAsyncErrorHandling(e6, t5, 7, [n2, r2]);
}
function createComponentInstance$1(e6, t5, n2) {
  const r2 = e6.type, s2 = (t5 ? t5.appContext : e6.appContext) || St, o4 = { uid: Rt++, vnode: e6, type: r2, parent: t5, appContext: s2, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new EffectScope(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t5 ? t5.provides : Object.create(s2.provides), ids: t5 ? t5.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: normalizePropsOptions(r2, s2), emitsOptions: normalizeEmitsOptions(r2, s2), emit: null, emitted: null, propsDefaults: P, inheritAttrs: r2.inheritAttrs, ctx: P, data: P, props: P, attrs: P, slots: P, refs: P, setupState: P, setupContext: null, suspense: n2, suspenseId: n2 ? n2.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return o4.ctx = { _: o4 }, o4.root = t5 ? t5.root : o4, o4.emit = emit.bind(null, o4), e6.ce && e6.ce(o4), o4;
}
function isStatefulComponent(e6) {
  return 4 & e6.vnode.shapeFlag;
}
function setupComponent$1(e6, t5 = false, n2 = false) {
  t5 && At(t5);
  const { props: r2, children: s2 } = e6.vnode, o4 = isStatefulComponent(e6);
  !(function(e7, t6, n3, r3 = false) {
    const s3 = {}, o5 = createInternalObject();
    e7.propsDefaults = /* @__PURE__ */ Object.create(null), setFullProps(e7, t6, s3, o5);
    for (const t7 in e7.propsOptions[0]) t7 in s3 || (s3[t7] = void 0);
    n3 ? e7.props = r3 ? s3 : shallowReactive(s3) : e7.type.props ? e7.props = s3 : e7.props = o5, e7.attrs = o5;
  })(e6, r2, o4, t5), ((e7, t6, n3) => {
    const r3 = e7.slots = createInternalObject();
    if (32 & e7.vnode.shapeFlag) {
      const e8 = t6._;
      e8 ? (assignSlots(r3, t6, n3), n3 && def(r3, "_", e8, true)) : normalizeObjectSlots(t6, r3);
    } else t6 && normalizeVNodeSlots(e7, t6);
  })(e6, s2, n2 || t5);
  const i3 = o4 ? (function(e7, t6) {
    const n3 = e7.type;
    e7.accessCache = /* @__PURE__ */ Object.create(null), e7.proxy = new Proxy(e7.ctx, it);
    const { setup: r3 } = n3;
    if (r3) {
      pauseTracking();
      const n4 = e7.setupContext = r3.length > 1 ? (function(e8) {
        const expose = /* @__PURE__ */ __name((t7) => {
          e8.exposed = t7 || {};
        }, "expose");
        return { attrs: new Proxy(e8.attrs, $t), slots: e8.slots, emit: e8.emit, expose };
      })(e7) : null, s3 = setCurrentInstance(e7), o5 = callWithErrorHandling(r3, e7, 0, [e7.props, n4]), i4 = isPromise(o5);
      if (resetTracking(), s3(), !i4 && !e7.sp || isAsyncWrapper(e7) || markAsyncBoundary(e7), i4) {
        if (o5.then(unsetCurrentInstance, unsetCurrentInstance), t6) return o5.then((t7) => {
          handleSetupResult(e7, t7);
        }).catch((t7) => {
          handleError(t7, e7, 0);
        });
        e7.asyncDep = o5;
      } else handleSetupResult(e7, o5);
    } else finishComponentSetup(e7);
  })(e6, t5) : void 0;
  return t5 && At(false), i3;
}
function handleSetupResult(e6, t5, n2) {
  isFunction(t5) ? e6.type.__ssrInlineRender ? e6.ssrRender = t5 : e6.render = t5 : isObject(t5) && (e6.setupState = proxyRefs(t5)), finishComponentSetup(e6);
}
function finishComponentSetup(e6, t5, n2) {
  const r2 = e6.type;
  e6.render || (e6.render = r2.render || NOOP);
  {
    const t6 = setCurrentInstance(e6);
    pauseTracking();
    try {
      applyOptions(e6);
    } finally {
      resetTracking(), t6();
    }
  }
}
function getComponentPublicInstance(e6) {
  return e6.exposed ? e6.exposeProxy || (e6.exposeProxy = new Proxy(proxyRefs((t5 = e6.exposed, !hasOwn(t5, "__v_skip") && Object.isExtensible(t5) && def(t5, "__v_skip", true), t5)), { get: /* @__PURE__ */ __name((t6, n2) => n2 in t6 ? t6[n2] : n2 in ot2 ? ot2[n2](e6) : void 0, "get"), has: /* @__PURE__ */ __name((e7, t6) => t6 in e7 || t6 in ot2, "has") })) : e6.proxy;
  var t5;
}
function getComponentName(e6, t5 = true) {
  return isFunction(e6) ? e6.displayName || e6.name : e6.name || t5 && e6.__name;
}
function h(e6, t5, n2) {
  try {
    setBlockTracking(-1);
    const r2 = arguments.length;
    return 2 === r2 ? isObject(t5) && !M(t5) ? isVNode(t5) ? createVNode(e6, null, [t5]) : createVNode(e6, t5) : createVNode(e6, null, t5) : (r2 > 3 ? n2 = Array.prototype.slice.call(arguments, 2) : 3 === r2 && isVNode(n2) && (n2 = [n2]), createVNode(e6, t5, n2));
  } finally {
    setBlockTracking(1);
  }
}
function setStyle(e6, t5, n2) {
  if (M(n2)) n2.forEach((n3) => setStyle(e6, t5, n3));
  else if (null == n2 && (n2 = ""), t5.startsWith("--")) e6.setProperty(t5, n2);
  else {
    const r2 = (function(e7, t6) {
      const n3 = Ft[t6];
      if (n3) return n3;
      let r3 = L(t6);
      if ("filter" !== r3 && r3 in e7) return Ft[t6] = r3;
      r3 = F(r3);
      for (let n4 = 0; n4 < Bt.length; n4++) {
        const s2 = Bt[n4] + r3;
        if (s2 in e7) return Ft[t6] = s2;
      }
      return t6;
    })(e6, t5);
    Vt.test(n2) ? e6.setProperty(B(r2), n2.replace(Vt, ""), "important") : e6[r2] = n2;
  }
}
function patchAttr(e6, t5, n2, r2, s2, o4 = X2(t5)) {
  r2 && t5.startsWith("xlink:") ? null == n2 ? e6.removeAttributeNS(Ut, t5.slice(6, t5.length)) : e6.setAttributeNS(Ut, t5, n2) : null == n2 || o4 && !includeBooleanAttr(n2) ? e6.removeAttribute(t5) : e6.setAttribute(t5, o4 ? "" : isSymbol(n2) ? String(n2) : n2);
}
function patchDOMProp(e6, t5, n2, r2, s2) {
  if ("innerHTML" === t5 || "textContent" === t5) return void (null != n2 && (e6[t5] = n2));
  const o4 = e6.tagName;
  if ("value" === t5 && "PROGRESS" !== o4 && !o4.includes("-")) {
    const r3 = "OPTION" === o4 ? e6.getAttribute("value") || "" : e6.value, s3 = null == n2 ? "checkbox" === e6.type ? "on" : "" : String(n2);
    return r3 === s3 && "_value" in e6 || (e6.value = s3), null == n2 && e6.removeAttribute(t5), void (e6._value = n2);
  }
  let i3 = false;
  if ("" === n2 || null == n2) {
    const r3 = typeof e6[t5];
    "boolean" === r3 ? n2 = includeBooleanAttr(n2) : null == n2 && "string" === r3 ? (n2 = "", i3 = true) : "number" === r3 && (n2 = 0, i3 = true);
  }
  try {
    e6[t5] = n2;
  } catch (e7) {
  }
  i3 && e6.removeAttribute(s2 || t5);
}
function patchEvent(e6, t5, n2, r2, s2 = null) {
  const o4 = e6[zt] || (e6[zt] = {}), i3 = o4[t5];
  if (r2 && i3) i3.value = r2;
  else {
    const [n3, a3] = (function(e7) {
      let t6;
      if (Wt.test(e7)) {
        let n5;
        for (t6 = {}; n5 = e7.match(Wt); ) e7 = e7.slice(0, e7.length - n5[0].length), t6[n5[0].toLowerCase()] = true;
      }
      const n4 = ":" === e7[2] ? e7.slice(3) : B(e7.slice(2));
      return [n4, t6];
    })(t5);
    if (r2) {
      const i4 = o4[t5] = (function(e7, t6) {
        const invoker = /* @__PURE__ */ __name((e8) => {
          if (e8._vts) {
            if (e8._vts <= invoker.attached) return;
          } else e8._vts = Date.now();
          callWithAsyncErrorHandling((function(e9, t7) {
            if (M(t7)) {
              const n4 = e9.stopImmediatePropagation;
              return e9.stopImmediatePropagation = () => {
                n4.call(e9), e9._stopped = true;
              }, t7.map((e10) => (t8) => !t8._stopped && e10 && e10(t8));
            }
            return t7;
          })(e8, invoker.value), t6, 5, [e8]);
        }, "invoker");
        return invoker.value = e7, invoker.attached = getNow(), invoker;
      })(r2, s2);
      !(function(e7, t6, n4, r3) {
        e7.addEventListener(t6, n4, r3);
      })(e6, n3, i4, a3);
    } else i3 && (!(function(e7, t6, n4, r3) {
      e7.removeEventListener(t6, n4, r3);
    })(e6, n3, i3, a3), o4[t5] = void 0);
  }
}
function injectHead() {
  if (hasInjectionContext()) {
    const e6 = inject(Zt);
    if (e6) return e6;
  }
  throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
function useHead(e6, t5 = {}) {
  const n2 = t5.head || injectHead();
  return n2.ssr ? n2.push(e6 || {}, t5) : (function(e7, t6, n3 = {}) {
    const r2 = ref(false);
    let s2;
    !(function(e8, t7) {
      doWatch(e8, null, t7);
    })(() => {
      const o4 = r2.value ? {} : walkResolver(t6, VueResolver);
      s2 ? s2.patch(o4) : s2 = e7.push(o4, n3);
    });
    getCurrentInstance() && (Ye2(() => {
      s2.dispose();
    }), onDeactivated(() => {
      r2.value = true;
    }), onActivated(() => {
      r2.value = false;
    }));
    return s2;
  })(n2, e6, t5);
}
function createHead(e6 = {}) {
  const t5 = (function(e7 = {}) {
    const t6 = createUnhead({ ...e7, document: false, propResolvers: [...e7.propResolvers || [], (e8, t7) => e8 && e8.startsWith("on") && "function" == typeof t7 ? `this.dataset.${e8}fired = true` : t7], init: [e7.disableDefaults ? void 0 : { htmlAttrs: { lang: "en" }, meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }] }, ...e7.init || []] });
    return t6._ssrPayload = {}, t6.use({ key: "server", hooks: { "tags:resolve": /* @__PURE__ */ __name(function(e8) {
      const n2 = e8.tagMap.get("title"), r2 = e8.tagMap.get("titleTemplate");
      let s2 = { title: "server" === n2?.mode ? t6._title : void 0, titleTemplate: "server" === r2?.mode ? t6._titleTemplate : void 0 };
      Object.keys(t6._ssrPayload || {}).length > 0 && (s2 = { ...t6._ssrPayload, ...s2 }), Object.values(s2).some(Boolean) && e8.tags.push({ tag: "script", innerHTML: JSON.stringify(s2), props: { id: "unhead:payload", type: "application/json" } });
    }, "tags:resolve") } }), t6;
  })({ ...e6, propResolvers: [VueResolver] });
  return t5.install = (function(e7) {
    return { install(t6) {
      t6.config.globalProperties.$unhead = e7, t6.config.globalProperties.$head = e7, t6.provide(Zt, e7);
    } }.install;
  })(t5), t5;
}
function ssrRenderAttrs(e6, t5) {
  let n2 = "";
  for (let r2 in e6) {
    if (Xt(r2) || isOn(r2) || "textarea" === t5 && "value" === r2 || r2.startsWith(".")) continue;
    const s2 = e6[r2];
    r2.startsWith("^") && (r2 = r2.slice(1)), n2 += "class" === r2 || "className" === r2 ? ` class="${ssrRenderClass(s2)}"` : "style" === r2 ? ` style="${ssrRenderStyle(s2)}"` : ssrRenderDynamicAttr(r2, s2, t5);
  }
  return n2;
}
function ssrRenderDynamicAttr(e6, t5, n2) {
  if (!(function(e7) {
    if (null == e7) return false;
    const t6 = typeof e7;
    return "string" === t6 || "number" === t6 || "boolean" === t6;
  })(t5)) return "";
  const r2 = n2 && (n2.indexOf("-") > 0 || G(n2)) ? e6 : te2[e6] || e6.toLowerCase();
  return Y2(r2) ? includeBooleanAttr(t5) ? ` ${r2}` : "" : (function(e7) {
    if (ee2.hasOwnProperty(e7)) return ee2[e7];
    const t6 = Q2.test(e7);
    return t6 && console.error(`unsafe attribute name: ${e7}`), ee2[e7] = !t6;
  })(r2) ? "" === t5 ? ` ${r2}` : ` ${r2}="${escapeHtml2(t5)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${r2}`), "");
}
function ssrRenderClass(e6) {
  return escapeHtml2(normalizeClass(e6));
}
function ssrRenderStyle(e6) {
  if (!e6) return "";
  if (isString(e6)) return escapeHtml2(e6);
  const t5 = normalizeStyle((function(e7) {
    if (!M(e7) && isObject(e7)) {
      const t6 = {};
      for (const n2 in e7) n2.startsWith(":--") ? t6[n2.slice(1)] = normalizeCssVarValue(e7[n2]) : t6[n2] = e7[n2];
      return t6;
    }
    return e7;
  })(e6));
  return escapeHtml2((function(e7) {
    if (!e7) return "";
    if (isString(e7)) return e7;
    let t6 = "";
    for (const n2 in e7) {
      const r2 = e7[n2];
      (isString(r2) || "number" == typeof r2) && (t6 += `${n2.startsWith("--") ? n2 : B(n2)}:${r2};`);
    }
    return t6;
  })(t5));
}
function ssrRenderComponent(e6, t5 = null, n2 = null, r2 = null, s2) {
  return renderComponentVNode(createVNode(e6, t5, n2), r2, s2);
}
function ssrInterpolate(e6) {
  return escapeHtml2(toDisplayString(e6));
}
async function ssrRenderSuspense(e6, { default: t5 }) {
  t5 ? t5() : e6("<!---->");
}
function createBuffer() {
  let e6 = false;
  const t5 = [];
  return { getBuffer: /* @__PURE__ */ __name(() => t5, "getBuffer"), push(n2) {
    const r2 = isString(n2);
    e6 && r2 ? t5[t5.length - 1] += n2 : (t5.push(n2), e6 = r2, (isPromise(n2) || M(n2) && n2.hasAsync) && (t5.hasAsync = true));
  } };
}
function renderComponentVNode(e6, t5 = null, n2) {
  const r2 = e6.component = Yt(e6, t5, null), s2 = en(r2, true), o4 = isPromise(s2);
  let i3 = r2.sp;
  if (o4 || i3) {
    return Promise.resolve(s2).then(() => {
      if (o4 && (i3 = r2.sp), i3) return Promise.all(i3.map((e7) => e7.call(r2.proxy)));
    }).catch(NOOP).then(() => renderComponentSubTree(r2, n2));
  }
  return renderComponentSubTree(r2, n2);
}
function renderComponentSubTree(e6, t5) {
  const n2 = e6.type, { getBuffer: r2, push: s2 } = createBuffer();
  if (isFunction(n2)) {
    let r3 = tn(e6);
    if (!n2.props) for (const t6 in e6.attrs) t6.startsWith("data-v-") && ((r3.props || (r3.props = {}))[t6] = "");
    renderVNode(s2, e6.subTree = r3, e6, t5);
  } else {
    e6.render && e6.render !== NOOP || e6.ssrRender || n2.ssrRender || !isString(n2.template) || (n2.ssrRender = (function() {
      throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
    })(n2.template));
    const r3 = e6.ssrRender || n2.ssrRender;
    if (r3) {
      let n3 = false !== e6.inheritAttrs ? e6.attrs : void 0, o4 = false, i3 = e6;
      for (; ; ) {
        const e7 = i3.vnode.scopeId;
        e7 && (o4 || (n3 = { ...n3 }, o4 = true), n3[e7] = "");
        const t6 = i3.parent;
        if (!t6 || !t6.subTree || t6.subTree !== i3.vnode) break;
        i3 = t6;
      }
      if (t5) {
        o4 || (n3 = { ...n3 });
        const e7 = t5.trim().split(" ");
        for (let t6 = 0; t6 < e7.length; t6++) n3[e7[t6]] = "";
      }
      const a3 = Qt(e6);
      try {
        r3(e6.proxy, s2, e6, n3, e6.props, e6.setupState, e6.data, e6.ctx);
      } finally {
        Qt(a3);
      }
    } else e6.render && e6.render !== NOOP ? renderVNode(s2, e6.subTree = tn(e6), e6, t5) : (n2.name || n2.__file, s2("<!---->"));
  }
  return r2();
}
function renderVNode(e6, t5, n2, r2) {
  const { type: s2, shapeFlag: o4, children: i3, dirs: a3, props: l2 } = t5;
  switch (a3 && (t5.props = (function(e7, t6, n3) {
    const r3 = [];
    for (let t7 = 0; t7 < n3.length; t7++) {
      const s3 = n3[t7], { dir: { getSSRProps: o5 } } = s3;
      if (o5) {
        const t8 = o5(s3, e7);
        t8 && r3.push(t8);
      }
    }
    return mergeProps(t6 || {}, ...r3);
  })(t5, l2, a3)), s2) {
    case mt:
      e6(escapeHtml2(i3));
      break;
    case vt:
      e6(i3 ? `<!--${c3 = i3, c3.replace(re2, "")}-->` : "<!---->");
      break;
    case _t:
      e6(i3);
      break;
    case yt:
      t5.slotScopeIds && (r2 = (r2 ? r2 + " " : "") + t5.slotScopeIds.join(" ")), e6("<!--[-->"), renderVNodeChildren(e6, i3, n2, r2), e6("<!--]-->");
      break;
    default:
      1 & o4 ? (function(e7, t6, n3, r3) {
        const s3 = t6.type;
        let { props: o5, children: i4, shapeFlag: a4, scopeId: l3 } = t6, c4 = `<${s3}`;
        o5 && (c4 += ssrRenderAttrs(o5, s3));
        l3 && (c4 += ` ${l3}`);
        let u3 = n3, p2 = t6;
        for (; u3 && p2 === u3.subTree; ) p2 = u3.vnode, p2.scopeId && (c4 += ` ${p2.scopeId}`), u3 = u3.parent;
        r3 && (c4 += ` ${r3}`);
        if (e7(c4 + ">"), !K2(s3)) {
          let t7 = false;
          o5 && (o5.innerHTML ? (t7 = true, e7(o5.innerHTML)) : o5.textContent ? (t7 = true, e7(escapeHtml2(o5.textContent))) : "textarea" === s3 && o5.value && (t7 = true, e7(escapeHtml2(o5.value)))), t7 || (8 & a4 ? e7(escapeHtml2(i4)) : 16 & a4 && renderVNodeChildren(e7, i4, n3, r3)), e7(`</${s3}>`);
        }
      })(e6, t5, n2, r2) : 6 & o4 ? e6(renderComponentVNode(t5, n2, r2)) : 64 & o4 ? (function(e7, t6, n3, r3) {
        const s3 = t6.props && t6.props.to, o5 = t6.props && t6.props.disabled;
        if (!s3) return [];
        if (!isString(s3)) return [];
        !(function(e8, t7, n4, r4, s4) {
          e8("<!--teleport start-->");
          const o6 = s4.appContext.provides[ze2], i4 = o6.__teleportBuffers || (o6.__teleportBuffers = {}), a4 = i4[n4] || (i4[n4] = []), l3 = a4.length;
          let c4;
          if (r4) t7(e8), c4 = "<!--teleport start anchor--><!--teleport anchor-->";
          else {
            const { getBuffer: e9, push: n5 } = createBuffer();
            n5("<!--teleport start anchor-->"), t7(n5), n5("<!--teleport anchor-->"), c4 = e9();
          }
          a4.splice(l3, 0, c4), e8("<!--teleport end-->");
        })(e7, (e8) => {
          renderVNodeChildren(e8, t6.children, n3, r3);
        }, s3, o5 || "" === o5, n3);
      })(e6, t5, n2, r2) : 128 & o4 && renderVNode(e6, t5.ssContent, n2, r2);
  }
  var c3;
}
function renderVNodeChildren(e6, t5, n2, r2) {
  for (let s2 = 0; s2 < t5.length; s2++) renderVNode(e6, nn(t5[s2]), n2, r2);
}
function nestedUnrollBuffer(e6, t5, n2) {
  if (!e6.hasAsync) return t5 + unrollBufferSync$1(e6);
  let r2 = t5;
  for (let t6 = n2; t6 < e6.length; t6 += 1) {
    const n3 = e6[t6];
    if (isString(n3)) {
      r2 += n3;
      continue;
    }
    if (isPromise(n3)) return n3.then((n4) => (e6[t6] = n4, nestedUnrollBuffer(e6, r2, t6)));
    const s2 = nestedUnrollBuffer(n3, r2, 0);
    if (isPromise(s2)) return s2.then((n4) => (e6[t6] = n4, nestedUnrollBuffer(e6, "", t6)));
    r2 = s2;
  }
  return r2;
}
function unrollBuffer$1(e6) {
  return nestedUnrollBuffer(e6, "", 0);
}
function unrollBufferSync$1(e6) {
  let t5 = "";
  for (let n2 = 0; n2 < e6.length; n2++) {
    let r2 = e6[n2];
    isString(r2) ? t5 += r2 : t5 += unrollBufferSync$1(r2);
  }
  return t5;
}
async function renderToString(e6, t5 = {}) {
  if (rn(e6)) return renderToString(createApp({ render: /* @__PURE__ */ __name(() => e6, "render") }), t5);
  const n2 = createVNode(e6._component, e6._props);
  n2.appContext = e6._context, e6.provide(ze2, t5);
  const r2 = await renderComponentVNode(n2), s2 = await unrollBuffer$1(r2);
  if (await (async function(e7) {
    if (e7.__teleportBuffers) {
      e7.teleports = e7.teleports || {};
      for (const t6 in e7.__teleportBuffers) e7.teleports[t6] = await unrollBuffer$1(await Promise.all([e7.__teleportBuffers[t6]]));
    }
  })(t5), t5.__watcherHandles) for (const e7 of t5.__watcherHandles) e7();
  return s2;
}
function baseURL() {
  return useRuntimeConfig2().app.baseURL;
}
function buildAssetsURL(...e6) {
  return joinRelativeURL(publicAssetsURL(), useRuntimeConfig2().app.buildAssetsDir, ...e6);
}
function publicAssetsURL(...e6) {
  const t5 = useRuntimeConfig2().app, s2 = t5.cdnURL || t5.baseURL;
  return e6.length ? joinRelativeURL(s2, ...e6) : s2;
}
function lazyCachedFunction(e6) {
  let t5 = null;
  return () => (null === t5 && (t5 = e6().catch((e7) => {
    throw t5 = null, e7;
  })), t5);
}
function is_primitive(e6) {
  return Object(e6) !== e6;
}
function is_plain_object(e6) {
  const t5 = Object.getPrototypeOf(e6);
  return t5 === Object.prototype || null === t5 || null === Object.getPrototypeOf(t5) || Object.getOwnPropertyNames(t5).sort().join("\0") === hn;
}
function get_type(e6) {
  return Object.prototype.toString.call(e6).slice(8, -1);
}
function get_escaped_char(e6) {
  switch (e6) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return e6 < " " ? `\\u${e6.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(e6) {
  let t5 = "", n2 = 0;
  const r2 = e6.length;
  for (let s2 = 0; s2 < r2; s2 += 1) {
    const r3 = get_escaped_char(e6[s2]);
    r3 && (t5 += e6.slice(n2, s2) + r3, n2 = s2 + 1);
  }
  return `"${0 === n2 ? e6 : t5 + e6.slice(n2)}"`;
}
function enumerable_symbols(e6) {
  return Object.getOwnPropertySymbols(e6).filter((t5) => Object.getOwnPropertyDescriptor(e6, t5).enumerable);
}
function stringify_key(e6) {
  return gn.test(e6) ? "." + e6 : "[" + JSON.stringify(e6) + "]";
}
function is_valid_array_index(e6) {
  if (0 === e6.length) return false;
  if (e6.length > 1 && 48 === e6.charCodeAt(0)) return false;
  for (let t6 = 0; t6 < e6.length; t6++) {
    const n2 = e6.charCodeAt(t6);
    if (n2 < 48 || n2 > 57) return false;
  }
  const t5 = +e6;
  return !(t5 >= 2 ** 32 - 1) && !(t5 < 0);
}
function valid_array_indices(e6) {
  const t5 = Object.keys(e6);
  for (var n2 = t5.length - 1; n2 >= 0 && !is_valid_array_index(t5[n2]); n2--) ;
  return t5.length = n2 + 1, t5;
}
function uneval(e6, t5) {
  const n2 = /* @__PURE__ */ new Map(), r2 = [], s2 = /* @__PURE__ */ new Map();
  !(/* @__PURE__ */ __name(function walk(t6) {
    if (!is_primitive(t6)) {
      if (n2.has(t6)) return void n2.set(t6, n2.get(t6) + 1);
      if (n2.set(t6, 1), "function" == typeof t6) throw new DevalueError("Cannot stringify a function", r2, t6, e6);
      switch (get_type(t6)) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
        case "URL":
        case "URLSearchParams":
        case "ArrayBuffer":
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          return;
        case "Array":
          t6.forEach((e7, t7) => {
            r2.push(`[${t7}]`), walk(e7), r2.pop();
          });
          break;
        case "Set":
          Array.from(t6).forEach(walk);
          break;
        case "Map":
          for (const [e7, n3] of t6) r2.push(`.get(${is_primitive(e7) ? stringify_primitive$1(e7) : "..."})`), walk(n3), r2.pop();
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
          return void walk(t6.buffer);
        default:
          if (!is_plain_object(t6)) throw new DevalueError("Cannot stringify arbitrary non-POJOs", r2, t6, e6);
          if (enumerable_symbols(t6).length > 0) throw new DevalueError("Cannot stringify POJOs with symbolic keys", r2, t6, e6);
          for (const n3 of Object.keys(t6)) {
            if ("__proto__" === n3) throw new DevalueError("Cannot stringify objects with __proto__ keys", r2, t6, e6);
            r2.push(stringify_key(n3)), walk(t6[n3]), r2.pop();
          }
      }
    }
  }, "walk"))(e6);
  const o4 = /* @__PURE__ */ new Map();
  function stringify3(e7) {
    if (o4.has(e7)) return o4.get(e7);
    if (is_primitive(e7)) return stringify_primitive$1(e7);
    if (s2.has(e7)) return s2.get(e7);
    const t6 = get_type(e7);
    switch (t6) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify3(e7.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(e7.source)}, "${e7.flags}")`;
      case "Date":
        return `new Date(${e7.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(e7.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(e7.toString())})`;
      case "Array": {
        let t7 = false, n3 = "[";
        for (let r4 = 0; r4 < e7.length; r4 += 1) if (r4 > 0 && (n3 += ","), Object.hasOwn(e7, r4)) n3 += stringify3(e7[r4]);
        else if (!t7) {
          const n4 = valid_array_indices(e7), s4 = n4.length, o5 = String(e7.length).length;
          if (e7.length + 2 > 25 + o5 + s4 * (o5 + 2)) {
            const t8 = n4.map((t9) => `${t9}:${stringify3(e7[t9])}`).join(",");
            return `Object.assign(Array(${e7.length}),{${t8}})`;
          }
          t7 = true, r4 -= 1;
        }
        return n3 + (0 === e7.length || e7.length - 1 in e7 ? "" : ",") + "]";
      }
      case "Set":
      case "Map":
        return `new ${t6}([${Array.from(e7).map(stringify3).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        let r4 = `new ${t6}`;
        if (1 === n2.get(e7.buffer)) {
          r4 += `([${new e7.constructor(e7.buffer)}])`;
        } else r4 += `([${stringify3(e7.buffer)}])`;
        const s4 = e7.byteOffset, o5 = s4 + e7.byteLength;
        if (s4 > 0 || o5 !== e7.buffer.byteLength) {
          const e8 = +/(\d+)/.exec(t6)[1] / 8;
          r4 += `.subarray(${s4 / e8},${o5 / e8})`;
        }
        return r4;
      }
      case "ArrayBuffer":
        return `new Uint8Array([${new Uint8Array(e7).toString()}]).buffer`;
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${t6}.from(${stringify_string(e7.toString())})`;
      default:
        const r3 = Object.keys(e7), s3 = r3.map((t7) => `${(function(e8) {
          return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e8) ? e8 : escape_unsafe_chars(JSON.stringify(e8));
        })(t7)}:${stringify3(e7[t7])}`).join(",");
        return null === Object.getPrototypeOf(e7) ? r3.length > 0 ? `{${s3},__proto__:null}` : "{__proto__:null}" : `{${s3}}`;
    }
  }
  __name(stringify3, "stringify");
  Array.from(n2).filter((e7) => e7[1] > 1).sort((e7, t6) => t6[1] - e7[1]).forEach((e7, t6) => {
    o4.set(e7[0], (function(e8) {
      let t7 = "";
      do {
        t7 = yn[e8 % 54] + t7, e8 = ~~(e8 / 54) - 1;
      } while (e8 >= 0);
      return vn.test(t7) ? `${t7}0` : t7;
    })(t6));
  });
  const i3 = stringify3(e6);
  if (o4.size) {
    const e7 = [], t6 = [], n3 = [];
    return o4.forEach((r3, o5) => {
      if (e7.push(r3), s2.has(o5)) return void n3.push(s2.get(o5));
      if (is_primitive(o5)) return void n3.push(stringify_primitive$1(o5));
      switch (get_type(o5)) {
        case "Number":
        case "String":
        case "Boolean":
          n3.push(`Object(${stringify3(o5.valueOf())})`);
          break;
        case "RegExp":
          n3.push(o5.toString());
          break;
        case "Date":
          n3.push(`new Date(${o5.getTime()})`);
          break;
        case "Array":
          n3.push(`Array(${o5.length})`), o5.forEach((e8, n4) => {
            t6.push(`${r3}[${n4}]=${stringify3(e8)}`);
          });
          break;
        case "Set":
          n3.push("new Set"), t6.push(`${r3}.${Array.from(o5).map((e8) => `add(${stringify3(e8)})`).join(".")}`);
          break;
        case "Map":
          n3.push("new Map"), t6.push(`${r3}.${Array.from(o5).map(([e8, t7]) => `set(${stringify3(e8)}, ${stringify3(t7)})`).join(".")}`);
          break;
        case "ArrayBuffer":
          n3.push(`new Uint8Array([${new Uint8Array(o5).join(",")}]).buffer`);
          break;
        default:
          n3.push(null === Object.getPrototypeOf(o5) ? "Object.create(null)" : "{}"), Object.keys(o5).forEach((e8) => {
            t6.push(`${r3}${(function(e9) {
              return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e9) ? `.${e9}` : `[${escape_unsafe_chars(JSON.stringify(e9))}]`;
            })(e8)}=${stringify3(o5[e8])}`);
          });
      }
    }), t6.push(`return ${i3}`), `(function(${e7.join(",")}){${t6.join(";")}}(${n3.join(",")}))`;
  }
  return i3;
}
function escape_unsafe_char(e6) {
  return dn[e6] || e6;
}
function escape_unsafe_chars(e6) {
  return e6.replace(mn, escape_unsafe_char);
}
function stringify_primitive$1(e6) {
  if ("string" == typeof e6) return stringify_string(e6);
  if (void 0 === e6) return "void 0";
  if (0 === e6 && 1 / e6 < 0) return "-0";
  const t5 = String(e6);
  return "number" == typeof e6 ? t5.replace(/^(-)?0\./, "$1.") : "bigint" == typeof e6 ? e6 + "n" : t5;
}
function encode64(e6) {
  const t5 = new DataView(e6);
  let n2 = "";
  for (let r2 = 0; r2 < e6.byteLength; r2++) n2 += String.fromCharCode(t5.getUint8(r2));
  return (function(e7) {
    let t6 = "";
    for (let n3 = 0; n3 < e7.length; n3 += 3) {
      const r2 = [void 0, void 0, void 0, void 0];
      r2[0] = e7.charCodeAt(n3) >> 2, r2[1] = (3 & e7.charCodeAt(n3)) << 4, e7.length > n3 + 1 && (r2[1] |= e7.charCodeAt(n3 + 1) >> 4, r2[2] = (15 & e7.charCodeAt(n3 + 1)) << 2), e7.length > n3 + 2 && (r2[2] |= e7.charCodeAt(n3 + 2) >> 6, r2[3] = 63 & e7.charCodeAt(n3 + 2));
      for (let e8 = 0; e8 < r2.length; e8++) void 0 === r2[e8] ? t6 += "=" : t6 += _n[r2[e8]];
    }
    return t6;
  })(n2);
}
function stringify(e6, t5) {
  const n2 = [], r2 = /* @__PURE__ */ new Map(), s2 = [];
  if (t5) for (const e7 of Object.getOwnPropertyNames(t5)) s2.push({ key: e7, fn: t5[e7] });
  const o4 = [];
  let i3 = 0;
  const a3 = (/* @__PURE__ */ __name(function flatten(t6) {
    if (void 0 === t6) return -1;
    if (Number.isNaN(t6)) return -3;
    if (t6 === 1 / 0) return -4;
    if (t6 === -1 / 0) return -5;
    if (0 === t6 && 1 / t6 < 0) return -6;
    if (r2.has(t6)) return r2.get(t6);
    const a4 = i3++;
    r2.set(t6, a4);
    for (const { key: e7, fn: r3 } of s2) {
      const s3 = r3(t6);
      if (s3) return n2[a4] = `["${e7}",${flatten(s3)}]`, a4;
    }
    if ("function" == typeof t6) throw new DevalueError("Cannot stringify a function", o4, t6, e6);
    let l2 = "";
    if (is_primitive(t6)) l2 = stringify_primitive(t6);
    else {
      const n3 = get_type(t6);
      switch (n3) {
        case "Number":
        case "String":
        case "Boolean":
          l2 = `["Object",${stringify_primitive(t6)}]`;
          break;
        case "BigInt":
          l2 = `["BigInt",${t6}]`;
          break;
        case "Date":
          l2 = `["Date","${!isNaN(t6.getDate()) ? t6.toISOString() : ""}"]`;
          break;
        case "URL":
          l2 = `["URL",${stringify_string(t6.toString())}]`;
          break;
        case "URLSearchParams":
          l2 = `["URLSearchParams",${stringify_string(t6.toString())}]`;
          break;
        case "RegExp":
          const { source: r3, flags: s3 } = t6;
          l2 = s3 ? `["RegExp",${stringify_string(r3)},"${s3}"]` : `["RegExp",${stringify_string(r3)}]`;
          break;
        case "Array": {
          let e7 = false;
          l2 = "[";
          for (let n4 = 0; n4 < t6.length; n4 += 1) if (n4 > 0 && (l2 += ","), Object.hasOwn(t6, n4)) o4.push(`[${n4}]`), l2 += flatten(t6[n4]), o4.pop();
          else if (e7) l2 += -2;
          else {
            const n5 = valid_array_indices(t6), r4 = n5.length, s4 = String(t6.length).length;
            if (3 * (t6.length - r4) > 4 + s4 + r4 * (s4 + 1)) {
              l2 = "[-7," + t6.length;
              for (let e8 = 0; e8 < n5.length; e8++) {
                const r5 = n5[e8];
                o4.push(`[${r5}]`), l2 += "," + r5 + "," + flatten(t6[r5]), o4.pop();
              }
              break;
            }
            e7 = true, l2 += -2;
          }
          l2 += "]";
          break;
        }
        case "Set":
          l2 = '["Set"';
          for (const e7 of t6) l2 += `,${flatten(e7)}`;
          l2 += "]";
          break;
        case "Map":
          l2 = '["Map"';
          for (const [e7, n4] of t6) o4.push(`.get(${is_primitive(e7) ? stringify_primitive(e7) : "..."})`), l2 += `,${flatten(e7)},${flatten(n4)}`, o4.pop();
          l2 += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const e7 = t6;
          l2 = '["' + n3 + '",' + flatten(e7.buffer);
          const r4 = t6.byteOffset, s4 = r4 + t6.byteLength;
          if (r4 > 0 || s4 !== e7.buffer.byteLength) {
            const e8 = +/(\d+)/.exec(n3)[1] / 8;
            l2 += `,${r4 / e8},${s4 / e8}`;
          }
          l2 += "]";
          break;
        }
        case "ArrayBuffer":
          l2 = `["ArrayBuffer","${encode64(t6)}"]`;
          break;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          l2 = `["${n3}",${stringify_string(t6.toString())}]`;
          break;
        default:
          if (!is_plain_object(t6)) throw new DevalueError("Cannot stringify arbitrary non-POJOs", o4, t6, e6);
          if (enumerable_symbols(t6).length > 0) throw new DevalueError("Cannot stringify POJOs with symbolic keys", o4, t6, e6);
          if (null === Object.getPrototypeOf(t6)) {
            l2 = '["null"';
            for (const n4 of Object.keys(t6)) {
              if ("__proto__" === n4) throw new DevalueError("Cannot stringify objects with __proto__ keys", o4, t6, e6);
              o4.push(stringify_key(n4)), l2 += `,${stringify_string(n4)},${flatten(t6[n4])}`, o4.pop();
            }
            l2 += "]";
          } else {
            l2 = "{";
            let n4 = false;
            for (const r4 of Object.keys(t6)) {
              if ("__proto__" === r4) throw new DevalueError("Cannot stringify objects with __proto__ keys", o4, t6, e6);
              n4 && (l2 += ","), n4 = true, o4.push(stringify_key(r4)), l2 += `${stringify_string(r4)}:${flatten(t6[r4])}`, o4.pop();
            }
            l2 += "}";
          }
      }
    }
    return n2[a4] = l2, a4;
  }, "flatten"))(e6);
  return a3 < 0 ? `${a3}` : `[${n2.join(",")}]`;
}
function stringify_primitive(e6) {
  const t5 = typeof e6;
  return "string" === t5 ? stringify_string(e6) : e6 instanceof String ? stringify_string(e6.toString()) : void 0 === e6 ? (-1).toString() : 0 === e6 && 1 / e6 < 0 ? (-6).toString() : "bigint" === t5 ? `["BigInt","${e6}"]` : String(e6);
}
function renderPayloadJsonScript(e6) {
  const t5 = { type: "application/json", innerHTML: e6.data ? stringify(e6.data, e6.ssrContext["~payloadReducers"]) : "", "data-nuxt-data": "nuxt-app", "data-ssr": !e6.ssrContext.noSSR, id: "__NUXT_DATA__" };
  e6.src && (t5["data-src"] = e6.src);
  return [t5, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${uneval(e6.ssrContext.config)}` }];
}
function splitPayload(e6) {
  const { data: t5, prerenderedAt: n2, ...r2 } = e6.payload;
  return { initial: { ...r2, prerenderedAt: n2 }, payload: { data: t5, prerenderedAt: n2 } };
}
function normalizeChunks(e6) {
  const t5 = [];
  for (const n2 of e6) {
    const e7 = n2?.trim();
    e7 && t5.push(e7);
  }
  return t5;
}
function joinTags(e6) {
  return e6.join("");
}
function joinAttrs(e6) {
  return 0 === e6.length ? "" : " " + e6.join(" ");
}
var g, y, m, v, _2, b, k, w, S, R, C2, x, sortTags, A2, T, $, O, isTruthy, P, j, NOOP, NO, isOn, isModelListener, H, remove, E, hasOwn, M, isMap, isSet, isFunction, isString, isSymbol, isObject, isPromise, N, toTypeString, isPlainObject, isIntegerKey, I, cacheStringFunction, D, L, V, B, F, U, hasChanged, invokeArrayFns, def, looseToNumber, z2, getGlobalThis, W, q3, J2, G, K2, Z2, X2, Y2, Q2, ee2, te2, ne2, re2, isRef$1, toDisplayString, replacer, stringifySymbol, se2, oe2, EffectScope, ie2, ReactiveEffect, ae2, le2, ce2, ue2, pe2, fe2, Link, Dep, de2, he2, ge2, ye2, me2, ve2, _e2, be2, BaseReactiveHandler, MutableReactiveHandler, ReadonlyReactiveHandler, ke2, we2, Se2, toShallow, getProto, Re2, Ce2, xe2, Ae2, Te2, $e2, Oe2, toReactive, toReadonly, RefImpl, Pe2, ObjectRefImpl, GetterRefImpl, ComputedRefImpl, je2, He2, Ee2, Me2, Ne2, Ie2, De2, Le2, Ve2, Be2, getId, Fe2, Ue2, ze2, useSSRContext, We2, qe2, Je2, isComment, isAsyncWrapper, isKeepAlive, createHook, Ge2, Ke2, Ze2, Xe2, Ye2, Qe2, et, tt2, nt2, rt2, st, getPublicInstance, ot2, hasSetupBinding, it, at, lt, ct, ut, pt, getFunctionalFallthrough, filterModelListeners, ft, createInternalObject, isInternalObject, dt, isInternalKey, normalizeSlotValue, normalizeSlot2, normalizeObjectSlots, normalizeVNodeSlots, assignSlots, queuePostRenderEffect, isSuspense, ht, gt, yt, mt, vt, _t, bt, kt, wt, normalizeKey, normalizeRef, createVNode, St, Rt, Ct, getCurrentInstance, xt, At, setCurrentInstance, unsetCurrentInstance, Tt, $t, computed, Ot, Pt, jt, Ht, Et, Mt, Nt, It, Dt, Lt, Vt, Bt, Ft, Ut, zt, Wt, qt, Jt, getNow, isNativeOn, Gt, Kt, createApp, VueResolver, Zt, Xt, Yt, Qt, en, tn, nn, rn, sn, on, an, ln, cn, getPrecomputedDependencies, un, pn, fn, dn, DevalueError, hn, gn, yn, mn, vn, _n, bn, kn, wn, Sn, Rn, Cn, xn, An, Tn;
var init_renderer = __esm({
  ".output/server/chunks/routes/renderer.mjs"() {
    init_modules_watch_stub();
    init_nitro();
    __name(getModuleDependencies, "getModuleDependencies");
    __name(getRequestDependencies, "getRequestDependencies");
    __name(renderStyles, "renderStyles");
    __name(renderResourceHints, "renderResourceHints");
    __name(renderResourceHeaders, "renderResourceHeaders");
    __name(getPreloadLinks, "getPreloadLinks");
    __name(getPrefetchLinks, "getPrefetchLinks");
    __name(renderScripts, "renderScripts");
    __name(createRenderer$1, "createRenderer$1");
    __name(flatHooks, "flatHooks");
    g = (() => {
      if (console.createTask) return console.createTask;
      const e6 = { run: /* @__PURE__ */ __name((e7) => e7(), "run") };
      return () => e6;
    })();
    __name(callHooks, "callHooks");
    __name(serialTaskCaller, "serialTaskCaller");
    __name(parallelTaskCaller, "parallelTaskCaller");
    __name(callEachWith, "callEachWith");
    y = class {
      static {
        __name(this, "y");
      }
      _hooks;
      _before;
      _after;
      _deprecatedHooks;
      _deprecatedMessages;
      constructor() {
        this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
      }
      hook(e6, t5, n2 = {}) {
        if (!e6 || "function" != typeof t5) return () => {
        };
        const r2 = e6;
        let s2;
        for (; this._deprecatedHooks[e6]; ) s2 = this._deprecatedHooks[e6], e6 = s2.to;
        if (s2 && !n2.allowDeprecated) {
          let e7 = s2.message;
          e7 || (e7 = `${r2} hook has been deprecated` + (s2.to ? `, please use ${s2.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(e7) || (console.warn(e7), this._deprecatedMessages.add(e7));
        }
        if (!t5.name) try {
          Object.defineProperty(t5, "name", { get: /* @__PURE__ */ __name(() => "_" + e6.replace(/\W+/g, "_") + "_hook_cb", "get"), configurable: true });
        } catch {
        }
        return this._hooks[e6] = this._hooks[e6] || [], this._hooks[e6].push(t5), () => {
          t5 && (this.removeHook(e6, t5), t5 = void 0);
        };
      }
      hookOnce(e6, t5) {
        let n2, _function = /* @__PURE__ */ __name((...e7) => ("function" == typeof n2 && n2(), n2 = void 0, _function = void 0, t5(...e7)), "_function");
        return n2 = this.hook(e6, _function), n2;
      }
      removeHook(e6, t5) {
        const n2 = this._hooks[e6];
        if (n2) {
          const r2 = n2.indexOf(t5);
          -1 !== r2 && n2.splice(r2, 1), 0 === n2.length && (this._hooks[e6] = void 0);
        }
      }
      deprecateHook(e6, t5) {
        this._deprecatedHooks[e6] = "string" == typeof t5 ? { to: t5 } : t5;
        const n2 = this._hooks[e6] || [];
        this._hooks[e6] = void 0;
        for (const t6 of n2) this.hook(e6, t6);
      }
      deprecateHooks(e6) {
        for (const t5 in e6) this.deprecateHook(t5, e6[t5]);
      }
      addHooks(e6) {
        const t5 = flatHooks(e6), n2 = Object.keys(t5).map((e7) => this.hook(e7, t5[e7]));
        return () => {
          for (const e7 of n2) e7();
          n2.length = 0;
        };
      }
      removeHooks(e6) {
        const t5 = flatHooks(e6);
        for (const e7 in t5) this.removeHook(e7, t5[e7]);
      }
      removeAllHooks() {
        this._hooks = {};
      }
      callHook(e6, ...t5) {
        return this.callHookWith(serialTaskCaller, e6, t5);
      }
      callHookParallel(e6, ...t5) {
        return this.callHookWith(parallelTaskCaller, e6, t5);
      }
      callHookWith(e6, t5, n2) {
        const r2 = this._before || this._after ? { name: t5, args: n2, context: {} } : void 0;
        this._before && callEachWith(this._before, r2);
        const s2 = e6(this._hooks[t5] ? [...this._hooks[t5]] : [], n2, t5);
        return s2 instanceof Promise ? s2.finally(() => {
          this._after && r2 && callEachWith(this._after, r2);
        }) : (this._after && r2 && callEachWith(this._after, r2), s2);
      }
      beforeEach(e6) {
        return this._before = this._before || [], this._before.push(e6), () => {
          if (void 0 !== this._before) {
            const t5 = this._before.indexOf(e6);
            -1 !== t5 && this._before.splice(t5, 1);
          }
        };
      }
      afterEach(e6) {
        return this._after = this._after || [], this._after.push(e6), () => {
          if (void 0 !== this._after) {
            const t5 = this._after.indexOf(e6);
            -1 !== t5 && this._after.splice(t5, 1);
          }
        };
      }
    };
    m = /* @__PURE__ */ new Set(["meta", "link", "base"]);
    v = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
    _2 = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
    b = /* @__PURE__ */ new Set(["title", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"]);
    k = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
    w = /* @__PURE__ */ new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]);
    S = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
    R = /* @__PURE__ */ new Set(["theme-color", "google-site-verification", "og", "article", "book", "profile", "twitter", "author"]);
    C2 = ["name", "property", "http-equiv"];
    x = /* @__PURE__ */ new Set(["viewport", "description", "keywords", "robots"]);
    __name(dedupeKey, "dedupeKey");
    __name(walkResolver, "walkResolver");
    __name(normalizeProps, "normalizeProps");
    __name(normalizeTag, "normalizeTag");
    __name(normalizeEntryToTags, "normalizeEntryToTags");
    sortTags = /* @__PURE__ */ __name((e6, t5) => e6._w === t5._w ? e6._p - t5._p : e6._w - t5._w, "sortTags");
    A2 = { base: -10, title: 10 };
    T = { critical: -8, high: -1, low: 2 };
    $ = { meta: { "content-security-policy": -30, charset: -20, viewport: -15 }, link: { preconnect: 20, stylesheet: 60, preload: 70, modulepreload: 70, prefetch: 90, "dns-prefetch": 90, prerender: 90 }, script: { async: 30, defer: 80, sync: 50 }, style: { imported: 40, sync: 60 } };
    O = /@import/;
    isTruthy = /* @__PURE__ */ __name((e6) => "" === e6 || true === e6, "isTruthy");
    __name(tagWeight, "tagWeight");
    __name(registerPlugin, "registerPlugin");
    __name(createUnhead, "createUnhead");
    __name(encodeAttribute, "encodeAttribute");
    __name(propsToString, "propsToString");
    __name(tagToString, "tagToString");
    __name(renderSSRHead, "renderSSRHead");
    __name(makeMap, "makeMap");
    P = {};
    j = [];
    NOOP = /* @__PURE__ */ __name(() => {
    }, "NOOP");
    NO = /* @__PURE__ */ __name(() => false, "NO");
    isOn = /* @__PURE__ */ __name((e6) => 111 === e6.charCodeAt(0) && 110 === e6.charCodeAt(1) && (e6.charCodeAt(2) > 122 || e6.charCodeAt(2) < 97), "isOn");
    isModelListener = /* @__PURE__ */ __name((e6) => e6.startsWith("onUpdate:"), "isModelListener");
    H = Object.assign;
    remove = /* @__PURE__ */ __name((e6, t5) => {
      const n2 = e6.indexOf(t5);
      n2 > -1 && e6.splice(n2, 1);
    }, "remove");
    E = Object.prototype.hasOwnProperty;
    hasOwn = /* @__PURE__ */ __name((e6, t5) => E.call(e6, t5), "hasOwn");
    M = Array.isArray;
    isMap = /* @__PURE__ */ __name((e6) => "[object Map]" === toTypeString(e6), "isMap");
    isSet = /* @__PURE__ */ __name((e6) => "[object Set]" === toTypeString(e6), "isSet");
    isFunction = /* @__PURE__ */ __name((e6) => "function" == typeof e6, "isFunction");
    isString = /* @__PURE__ */ __name((e6) => "string" == typeof e6, "isString");
    isSymbol = /* @__PURE__ */ __name((e6) => "symbol" == typeof e6, "isSymbol");
    isObject = /* @__PURE__ */ __name((e6) => null !== e6 && "object" == typeof e6, "isObject");
    isPromise = /* @__PURE__ */ __name((e6) => (isObject(e6) || isFunction(e6)) && isFunction(e6.then) && isFunction(e6.catch), "isPromise");
    N = Object.prototype.toString;
    toTypeString = /* @__PURE__ */ __name((e6) => N.call(e6), "toTypeString");
    isPlainObject = /* @__PURE__ */ __name((e6) => "[object Object]" === toTypeString(e6), "isPlainObject");
    isIntegerKey = /* @__PURE__ */ __name((e6) => isString(e6) && "NaN" !== e6 && "-" !== e6[0] && "" + parseInt(e6, 10) === e6, "isIntegerKey");
    I = makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
    cacheStringFunction = /* @__PURE__ */ __name((e6) => {
      const t5 = /* @__PURE__ */ Object.create(null);
      return (n2) => t5[n2] || (t5[n2] = e6(n2));
    }, "cacheStringFunction");
    D = /-\w/g;
    L = cacheStringFunction((e6) => e6.replace(D, (e7) => e7.slice(1).toUpperCase()));
    V = /\B([A-Z])/g;
    B = cacheStringFunction((e6) => e6.replace(V, "-$1").toLowerCase());
    F = cacheStringFunction((e6) => e6.charAt(0).toUpperCase() + e6.slice(1));
    U = cacheStringFunction((e6) => e6 ? `on${F(e6)}` : "");
    hasChanged = /* @__PURE__ */ __name((e6, t5) => !Object.is(e6, t5), "hasChanged");
    invokeArrayFns = /* @__PURE__ */ __name((e6, ...t5) => {
      for (let n2 = 0; n2 < e6.length; n2++) e6[n2](...t5);
    }, "invokeArrayFns");
    def = /* @__PURE__ */ __name((e6, t5, n2, r2 = false) => {
      Object.defineProperty(e6, t5, { configurable: true, enumerable: false, writable: r2, value: n2 });
    }, "def");
    looseToNumber = /* @__PURE__ */ __name((e6) => {
      const t5 = parseFloat(e6);
      return isNaN(t5) ? e6 : t5;
    }, "looseToNumber");
    getGlobalThis = /* @__PURE__ */ __name(() => z2 || (z2 = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : void 0 !== Wr ? Wr : {}), "getGlobalThis");
    __name(normalizeStyle, "normalizeStyle");
    W = /;(?![^(]*\))/g;
    q3 = /:([^]+)/;
    J2 = /\/\*[^]*?\*\//g;
    __name(parseStringStyle, "parseStringStyle");
    __name(normalizeClass, "normalizeClass");
    G = makeMap("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view");
    K2 = makeMap("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr");
    Z2 = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
    X2 = makeMap(Z2);
    Y2 = makeMap(Z2 + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
    __name(includeBooleanAttr, "includeBooleanAttr");
    Q2 = /[>/="'\u0009\u000a\u000c\u0020]/;
    ee2 = {};
    te2 = { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" };
    ne2 = /["'&<>]/;
    __name(escapeHtml2, "escapeHtml");
    re2 = /^-?>|<!--|-->|--!>|<!-$/g;
    isRef$1 = /* @__PURE__ */ __name((e6) => !(!e6 || true !== e6.__v_isRef), "isRef$1");
    toDisplayString = /* @__PURE__ */ __name((e6) => isString(e6) ? e6 : null == e6 ? "" : M(e6) || isObject(e6) && (e6.toString === N || !isFunction(e6.toString)) ? isRef$1(e6) ? toDisplayString(e6.value) : JSON.stringify(e6, replacer, 2) : String(e6), "toDisplayString");
    replacer = /* @__PURE__ */ __name((e6, t5) => isRef$1(t5) ? replacer(e6, t5.value) : isMap(t5) ? { [`Map(${t5.size})`]: [...t5.entries()].reduce((e7, [t6, n2], r2) => (e7[stringifySymbol(t6, r2) + " =>"] = n2, e7), {}) } : isSet(t5) ? { [`Set(${t5.size})`]: [...t5.values()].map((e7) => stringifySymbol(e7)) } : isSymbol(t5) ? stringifySymbol(t5) : !isObject(t5) || M(t5) || isPlainObject(t5) ? t5 : String(t5), "replacer");
    stringifySymbol = /* @__PURE__ */ __name((e6, t5 = "") => {
      var n2;
      return isSymbol(e6) ? `Symbol(${null != (n2 = e6.description) ? n2 : t5})` : e6;
    }, "stringifySymbol");
    __name(normalizeCssVarValue, "normalizeCssVarValue");
    EffectScope = class {
      static {
        __name(this, "EffectScope");
      }
      constructor(e6 = false) {
        this.detached = e6, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = se2, !e6 && se2 && (this.index = (se2.scopes || (se2.scopes = [])).push(this) - 1);
      }
      get active() {
        return this._active;
      }
      pause() {
        if (this._active) {
          let e6, t5;
          if (this._isPaused = true, this.scopes) for (e6 = 0, t5 = this.scopes.length; e6 < t5; e6++) this.scopes[e6].pause();
          for (e6 = 0, t5 = this.effects.length; e6 < t5; e6++) this.effects[e6].pause();
        }
      }
      resume() {
        if (this._active && this._isPaused) {
          let e6, t5;
          if (this._isPaused = false, this.scopes) for (e6 = 0, t5 = this.scopes.length; e6 < t5; e6++) this.scopes[e6].resume();
          for (e6 = 0, t5 = this.effects.length; e6 < t5; e6++) this.effects[e6].resume();
        }
      }
      run(e6) {
        if (this._active) {
          const t5 = se2;
          try {
            return se2 = this, e6();
          } finally {
            se2 = t5;
          }
        }
      }
      on() {
        1 === ++this._on && (this.prevScope = se2, se2 = this);
      }
      off() {
        this._on > 0 && 0 === --this._on && (se2 = this.prevScope, this.prevScope = void 0);
      }
      stop(e6) {
        if (this._active) {
          let t5, n2;
          for (this._active = false, t5 = 0, n2 = this.effects.length; t5 < n2; t5++) this.effects[t5].stop();
          for (this.effects.length = 0, t5 = 0, n2 = this.cleanups.length; t5 < n2; t5++) this.cleanups[t5]();
          if (this.cleanups.length = 0, this.scopes) {
            for (t5 = 0, n2 = this.scopes.length; t5 < n2; t5++) this.scopes[t5].stop(true);
            this.scopes.length = 0;
          }
          if (!this.detached && this.parent && !e6) {
            const e7 = this.parent.scopes.pop();
            e7 && e7 !== this && (this.parent.scopes[this.index] = e7, e7.index = this.index);
          }
          this.parent = void 0;
        }
      }
    };
    __name(effectScope, "effectScope");
    __name(getCurrentScope, "getCurrentScope");
    ie2 = /* @__PURE__ */ new WeakSet();
    ReactiveEffect = class {
      static {
        __name(this, "ReactiveEffect");
      }
      constructor(e6) {
        this.fn = e6, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, se2 && se2.active && se2.effects.push(this);
      }
      pause() {
        this.flags |= 64;
      }
      resume() {
        64 & this.flags && (this.flags &= -65, ie2.has(this) && (ie2.delete(this), this.trigger()));
      }
      notify() {
        2 & this.flags && !(32 & this.flags) || 8 & this.flags || batch(this);
      }
      run() {
        if (!(1 & this.flags)) return this.fn();
        this.flags |= 2, cleanupEffect(this), prepareDeps(this);
        const e6 = oe2, t5 = ue2;
        oe2 = this, ue2 = true;
        try {
          return this.fn();
        } finally {
          cleanupDeps(this), oe2 = e6, ue2 = t5, this.flags &= -3;
        }
      }
      stop() {
        if (1 & this.flags) {
          for (let e6 = this.deps; e6; e6 = e6.nextDep) removeSub(e6);
          this.deps = this.depsTail = void 0, cleanupEffect(this), this.onStop && this.onStop(), this.flags &= -2;
        }
      }
      trigger() {
        64 & this.flags ? ie2.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
      }
      runIfDirty() {
        isDirty(this) && this.run();
      }
      get dirty() {
        return isDirty(this);
      }
    };
    ce2 = 0;
    __name(batch, "batch");
    __name(startBatch, "startBatch");
    __name(endBatch, "endBatch");
    __name(prepareDeps, "prepareDeps");
    __name(cleanupDeps, "cleanupDeps");
    __name(isDirty, "isDirty");
    __name(refreshComputed, "refreshComputed");
    __name(removeSub, "removeSub");
    __name(removeDep, "removeDep");
    ue2 = true;
    pe2 = [];
    __name(pauseTracking, "pauseTracking");
    __name(resetTracking, "resetTracking");
    __name(cleanupEffect, "cleanupEffect");
    fe2 = 0;
    Link = class {
      static {
        __name(this, "Link");
      }
      constructor(e6, t5) {
        this.sub = e6, this.dep = t5, this.version = t5.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
      }
    };
    Dep = class {
      static {
        __name(this, "Dep");
      }
      constructor(e6) {
        this.computed = e6, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
      }
      track(e6) {
        if (!oe2 || !ue2 || oe2 === this.computed) return;
        let t5 = this.activeLink;
        if (void 0 === t5 || t5.sub !== oe2) t5 = this.activeLink = new Link(oe2, this), oe2.deps ? (t5.prevDep = oe2.depsTail, oe2.depsTail.nextDep = t5, oe2.depsTail = t5) : oe2.deps = oe2.depsTail = t5, addSub(t5);
        else if (-1 === t5.version && (t5.version = this.version, t5.nextDep)) {
          const e7 = t5.nextDep;
          e7.prevDep = t5.prevDep, t5.prevDep && (t5.prevDep.nextDep = e7), t5.prevDep = oe2.depsTail, t5.nextDep = void 0, oe2.depsTail.nextDep = t5, oe2.depsTail = t5, oe2.deps === t5 && (oe2.deps = e7);
        }
        return t5;
      }
      trigger(e6) {
        this.version++, fe2++, this.notify(e6);
      }
      notify(e6) {
        startBatch();
        try {
          0;
          for (let e7 = this.subs; e7; e7 = e7.prevSub) e7.sub.notify() && e7.sub.dep.notify();
        } finally {
          endBatch();
        }
      }
    };
    __name(addSub, "addSub");
    de2 = /* @__PURE__ */ new WeakMap();
    he2 = /* @__PURE__ */ Symbol("");
    ge2 = /* @__PURE__ */ Symbol("");
    ye2 = /* @__PURE__ */ Symbol("");
    __name(track, "track");
    __name(trigger, "trigger");
    __name(reactiveReadArray, "reactiveReadArray");
    __name(shallowReadArray, "shallowReadArray");
    __name(toWrapped, "toWrapped");
    me2 = { __proto__: null, [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, (e6) => toWrapped(this, e6));
    }, concat(...e6) {
      return reactiveReadArray(this).concat(...e6.map((e7) => M(e7) ? reactiveReadArray(e7) : e7));
    }, entries() {
      return iterator(this, "entries", (e6) => (e6[1] = toWrapped(this, e6[1]), e6));
    }, every(e6, t5) {
      return apply(this, "every", e6, t5, void 0, arguments);
    }, filter(e6, t5) {
      return apply(this, "filter", e6, t5, (e7) => e7.map((e8) => toWrapped(this, e8)), arguments);
    }, find(e6, t5) {
      return apply(this, "find", e6, t5, (e7) => toWrapped(this, e7), arguments);
    }, findIndex(e6, t5) {
      return apply(this, "findIndex", e6, t5, void 0, arguments);
    }, findLast(e6, t5) {
      return apply(this, "findLast", e6, t5, (e7) => toWrapped(this, e7), arguments);
    }, findLastIndex(e6, t5) {
      return apply(this, "findLastIndex", e6, t5, void 0, arguments);
    }, forEach(e6, t5) {
      return apply(this, "forEach", e6, t5, void 0, arguments);
    }, includes(...e6) {
      return searchProxy(this, "includes", e6);
    }, indexOf(...e6) {
      return searchProxy(this, "indexOf", e6);
    }, join(e6) {
      return reactiveReadArray(this).join(e6);
    }, lastIndexOf(...e6) {
      return searchProxy(this, "lastIndexOf", e6);
    }, map(e6, t5) {
      return apply(this, "map", e6, t5, void 0, arguments);
    }, pop() {
      return noTracking(this, "pop");
    }, push(...e6) {
      return noTracking(this, "push", e6);
    }, reduce(e6, ...t5) {
      return reduce(this, "reduce", e6, t5);
    }, reduceRight(e6, ...t5) {
      return reduce(this, "reduceRight", e6, t5);
    }, shift() {
      return noTracking(this, "shift");
    }, some(e6, t5) {
      return apply(this, "some", e6, t5, void 0, arguments);
    }, splice(...e6) {
      return noTracking(this, "splice", e6);
    }, toReversed() {
      return reactiveReadArray(this).toReversed();
    }, toSorted(e6) {
      return reactiveReadArray(this).toSorted(e6);
    }, toSpliced(...e6) {
      return reactiveReadArray(this).toSpliced(...e6);
    }, unshift(...e6) {
      return noTracking(this, "unshift", e6);
    }, values() {
      return iterator(this, "values", (e6) => toWrapped(this, e6));
    } };
    __name(iterator, "iterator");
    ve2 = Array.prototype;
    __name(apply, "apply");
    __name(reduce, "reduce");
    __name(searchProxy, "searchProxy");
    __name(noTracking, "noTracking");
    _e2 = makeMap("__proto__,__v_isRef,__isVue");
    be2 = new Set(Object.getOwnPropertyNames(Symbol).filter((e6) => "arguments" !== e6 && "caller" !== e6).map((e6) => Symbol[e6]).filter(isSymbol));
    __name(hasOwnProperty, "hasOwnProperty");
    BaseReactiveHandler = class {
      static {
        __name(this, "BaseReactiveHandler");
      }
      constructor(e6 = false, t5 = false) {
        this._isReadonly = e6, this._isShallow = t5;
      }
      get(e6, t5, n2) {
        if ("__v_skip" === t5) return e6.__v_skip;
        const r2 = this._isReadonly, s2 = this._isShallow;
        if ("__v_isReactive" === t5) return !r2;
        if ("__v_isReadonly" === t5) return r2;
        if ("__v_isShallow" === t5) return s2;
        if ("__v_raw" === t5) return n2 === (r2 ? s2 ? Oe2 : $e2 : s2 ? Te2 : Ae2).get(e6) || Object.getPrototypeOf(e6) === Object.getPrototypeOf(n2) ? e6 : void 0;
        const o4 = M(e6);
        if (!r2) {
          let e7;
          if (o4 && (e7 = me2[t5])) return e7;
          if ("hasOwnProperty" === t5) return hasOwnProperty;
        }
        const i3 = Reflect.get(e6, t5, isRef(e6) ? e6 : n2);
        if (isSymbol(t5) ? be2.has(t5) : _e2(t5)) return i3;
        if (r2 || track(e6, 0, t5), s2) return i3;
        if (isRef(i3)) {
          const e7 = o4 && isIntegerKey(t5) ? i3 : i3.value;
          return r2 && isObject(e7) ? readonly(e7) : e7;
        }
        return isObject(i3) ? r2 ? readonly(i3) : reactive(i3) : i3;
      }
    };
    MutableReactiveHandler = class extends BaseReactiveHandler {
      static {
        __name(this, "MutableReactiveHandler");
      }
      constructor(e6 = false) {
        super(false, e6);
      }
      set(e6, t5, n2, r2) {
        let s2 = e6[t5];
        const o4 = M(e6) && isIntegerKey(t5);
        if (!this._isShallow) {
          const e7 = isReadonly(s2);
          if (isShallow(n2) || isReadonly(n2) || (s2 = toRaw(s2), n2 = toRaw(n2)), !o4 && isRef(s2) && !isRef(n2)) return e7 || (s2.value = n2), true;
        }
        const i3 = o4 ? Number(t5) < e6.length : hasOwn(e6, t5), a3 = Reflect.set(e6, t5, n2, isRef(e6) ? e6 : r2);
        return e6 === toRaw(r2) && (i3 ? hasChanged(n2, s2) && trigger(e6, "set", t5, n2) : trigger(e6, "add", t5, n2)), a3;
      }
      deleteProperty(e6, t5) {
        const n2 = hasOwn(e6, t5);
        e6[t5];
        const r2 = Reflect.deleteProperty(e6, t5);
        return r2 && n2 && trigger(e6, "delete", t5, void 0), r2;
      }
      has(e6, t5) {
        const n2 = Reflect.has(e6, t5);
        return isSymbol(t5) && be2.has(t5) || track(e6, 0, t5), n2;
      }
      ownKeys(e6) {
        return track(e6, 0, M(e6) ? "length" : he2), Reflect.ownKeys(e6);
      }
    };
    ReadonlyReactiveHandler = class extends BaseReactiveHandler {
      static {
        __name(this, "ReadonlyReactiveHandler");
      }
      constructor(e6 = false) {
        super(true, e6);
      }
      set(e6, t5) {
        return true;
      }
      deleteProperty(e6, t5) {
        return true;
      }
    };
    ke2 = new MutableReactiveHandler();
    we2 = new ReadonlyReactiveHandler();
    Se2 = new MutableReactiveHandler(true);
    toShallow = /* @__PURE__ */ __name((e6) => e6, "toShallow");
    getProto = /* @__PURE__ */ __name((e6) => Reflect.getPrototypeOf(e6), "getProto");
    __name(createReadonlyMethod, "createReadonlyMethod");
    __name(createInstrumentations, "createInstrumentations");
    __name(createInstrumentationGetter, "createInstrumentationGetter");
    Re2 = { get: createInstrumentationGetter(false, false) };
    Ce2 = { get: createInstrumentationGetter(false, true) };
    xe2 = { get: createInstrumentationGetter(true, false) };
    Ae2 = /* @__PURE__ */ new WeakMap();
    Te2 = /* @__PURE__ */ new WeakMap();
    $e2 = /* @__PURE__ */ new WeakMap();
    Oe2 = /* @__PURE__ */ new WeakMap();
    __name(getTargetType, "getTargetType");
    __name(reactive, "reactive");
    __name(shallowReactive, "shallowReactive");
    __name(readonly, "readonly");
    __name(createReactiveObject, "createReactiveObject");
    __name(isReactive, "isReactive");
    __name(isReadonly, "isReadonly");
    __name(isShallow, "isShallow");
    __name(isProxy, "isProxy");
    __name(toRaw, "toRaw");
    toReactive = /* @__PURE__ */ __name((e6) => isObject(e6) ? reactive(e6) : e6, "toReactive");
    toReadonly = /* @__PURE__ */ __name((e6) => isObject(e6) ? readonly(e6) : e6, "toReadonly");
    __name(isRef, "isRef");
    __name(ref, "ref");
    __name(shallowRef, "shallowRef");
    __name(createRef, "createRef");
    RefImpl = class {
      static {
        __name(this, "RefImpl");
      }
      constructor(e6, t5) {
        this.dep = new Dep(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = t5 ? e6 : toRaw(e6), this._value = t5 ? e6 : toReactive(e6), this.__v_isShallow = t5;
      }
      get value() {
        return this.dep.track(), this._value;
      }
      set value(e6) {
        const t5 = this._rawValue, n2 = this.__v_isShallow || isShallow(e6) || isReadonly(e6);
        e6 = n2 ? e6 : toRaw(e6), hasChanged(e6, t5) && (this._rawValue = e6, this._value = n2 ? e6 : toReactive(e6), this.dep.trigger());
      }
    };
    __name(unref, "unref");
    Pe2 = { get: /* @__PURE__ */ __name((e6, t5, n2) => "__v_raw" === t5 ? e6 : unref(Reflect.get(e6, t5, n2)), "get"), set: /* @__PURE__ */ __name((e6, t5, n2, r2) => {
      const s2 = e6[t5];
      return isRef(s2) && !isRef(n2) ? (s2.value = n2, true) : Reflect.set(e6, t5, n2, r2);
    }, "set") };
    __name(proxyRefs, "proxyRefs");
    ObjectRefImpl = class {
      static {
        __name(this, "ObjectRefImpl");
      }
      constructor(e6, t5, n2) {
        this._object = e6, this._key = t5, this._defaultValue = n2, this.__v_isRef = true, this._value = void 0, this._raw = toRaw(e6);
        let r2 = true, s2 = e6;
        if (!M(e6) || !isIntegerKey(String(t5))) do {
          r2 = !isProxy(s2) || isShallow(s2);
        } while (r2 && (s2 = s2.__v_raw));
        this._shallow = r2;
      }
      get value() {
        let e6 = this._object[this._key];
        return this._shallow && (e6 = unref(e6)), this._value = void 0 === e6 ? this._defaultValue : e6;
      }
      set value(e6) {
        if (this._shallow && isRef(this._raw[this._key])) {
          const t5 = this._object[this._key];
          if (isRef(t5)) return void (t5.value = e6);
        }
        this._object[this._key] = e6;
      }
      get dep() {
        return (function(e6, t5) {
          const n2 = de2.get(e6);
          return n2 && n2.get(t5);
        })(this._raw, this._key);
      }
    };
    GetterRefImpl = class {
      static {
        __name(this, "GetterRefImpl");
      }
      constructor(e6) {
        this._getter = e6, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
      }
      get value() {
        return this._value = this._getter();
      }
    };
    __name(toRef, "toRef");
    ComputedRefImpl = class {
      static {
        __name(this, "ComputedRefImpl");
      }
      constructor(e6, t5, n2) {
        this.fn = e6, this.setter = t5, this._value = void 0, this.dep = new Dep(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = fe2 - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t5, this.isSSR = n2;
      }
      notify() {
        if (this.flags |= 16, !(8 & this.flags) && oe2 !== this) return batch(this, true), true;
      }
      get value() {
        const e6 = this.dep.track();
        return refreshComputed(this), e6 && (e6.version = this.dep.version), this._value;
      }
      set value(e6) {
        this.setter && this.setter(e6);
      }
    };
    je2 = {};
    He2 = /* @__PURE__ */ new WeakMap();
    __name(watch$1, "watch$1");
    __name(traverse, "traverse");
    __name(callWithErrorHandling, "callWithErrorHandling");
    __name(callWithAsyncErrorHandling, "callWithAsyncErrorHandling");
    __name(handleError, "handleError");
    Me2 = [];
    Ne2 = -1;
    Ie2 = [];
    De2 = null;
    Le2 = 0;
    Ve2 = Promise.resolve();
    Be2 = null;
    __name(nextTick, "nextTick");
    __name(queueJob, "queueJob");
    __name(queueFlush, "queueFlush");
    __name(queuePostFlushCb, "queuePostFlushCb");
    __name(flushPreFlushCbs, "flushPreFlushCbs");
    __name(flushPostFlushCbs, "flushPostFlushCbs");
    getId = /* @__PURE__ */ __name((e6) => null == e6.id ? 2 & e6.flags ? -1 : 1 / 0 : e6.id, "getId");
    __name(flushJobs, "flushJobs");
    Fe2 = null;
    Ue2 = null;
    __name(setCurrentRenderingInstance$1, "setCurrentRenderingInstance$1");
    __name(withCtx, "withCtx");
    __name(invokeDirectiveHook, "invokeDirectiveHook");
    __name(provide, "provide");
    __name(inject, "inject");
    __name(hasInjectionContext, "hasInjectionContext");
    ze2 = /* @__PURE__ */ Symbol.for("v-scx");
    useSSRContext = /* @__PURE__ */ __name(() => inject(ze2), "useSSRContext");
    __name(watch, "watch");
    __name(doWatch, "doWatch");
    __name(instanceWatch, "instanceWatch");
    __name(createPathGetter, "createPathGetter");
    We2 = /* @__PURE__ */ Symbol("_vte");
    qe2 = /* @__PURE__ */ Symbol("_leaveCb");
    __name(setTransitionHooks, "setTransitionHooks");
    __name(defineComponent, "defineComponent");
    __name(markAsyncBoundary, "markAsyncBoundary");
    Je2 = /* @__PURE__ */ new WeakMap();
    __name(setRef, "setRef");
    __name(invalidatePendingSetRef, "invalidatePendingSetRef");
    isComment = /* @__PURE__ */ __name((e6) => 8 === e6.nodeType, "isComment");
    getGlobalThis().requestIdleCallback, getGlobalThis().cancelIdleCallback;
    isAsyncWrapper = /* @__PURE__ */ __name((e6) => !!e6.type.__asyncLoader, "isAsyncWrapper");
    __name(defineAsyncComponent, "defineAsyncComponent");
    __name(createInnerComp, "createInnerComp");
    isKeepAlive = /* @__PURE__ */ __name((e6) => e6.type.__isKeepAlive, "isKeepAlive");
    __name(onActivated, "onActivated");
    __name(onDeactivated, "onDeactivated");
    __name(registerKeepAliveHook, "registerKeepAliveHook");
    __name(injectToKeepAliveRoot, "injectToKeepAliveRoot");
    __name(injectHook, "injectHook");
    createHook = /* @__PURE__ */ __name((e6) => (t5, n2 = Ct) => {
      Tt && "sp" !== e6 || injectHook(e6, (...e7) => t5(...e7), n2);
    }, "createHook");
    Ge2 = createHook("bm");
    Ke2 = createHook("m");
    Ze2 = createHook("bu");
    Xe2 = createHook("u");
    Ye2 = createHook("bum");
    Qe2 = createHook("um");
    et = createHook("sp");
    tt2 = createHook("rtg");
    nt2 = createHook("rtc");
    __name(onErrorCaptured, "onErrorCaptured");
    rt2 = "components";
    __name(resolveComponent, "resolveComponent");
    st = /* @__PURE__ */ Symbol.for("v-ndc");
    __name(resolveDynamicComponent, "resolveDynamicComponent");
    __name(resolveAsset, "resolveAsset");
    __name(resolve, "resolve");
    getPublicInstance = /* @__PURE__ */ __name((e6) => e6 ? isStatefulComponent(e6) ? getComponentPublicInstance(e6) : getPublicInstance(e6.parent) : null, "getPublicInstance");
    ot2 = H(/* @__PURE__ */ Object.create(null), { $: /* @__PURE__ */ __name((e6) => e6, "$"), $el: /* @__PURE__ */ __name((e6) => e6.vnode.el, "$el"), $data: /* @__PURE__ */ __name((e6) => e6.data, "$data"), $props: /* @__PURE__ */ __name((e6) => e6.props, "$props"), $attrs: /* @__PURE__ */ __name((e6) => e6.attrs, "$attrs"), $slots: /* @__PURE__ */ __name((e6) => e6.slots, "$slots"), $refs: /* @__PURE__ */ __name((e6) => e6.refs, "$refs"), $parent: /* @__PURE__ */ __name((e6) => getPublicInstance(e6.parent), "$parent"), $root: /* @__PURE__ */ __name((e6) => getPublicInstance(e6.root), "$root"), $host: /* @__PURE__ */ __name((e6) => e6.ce, "$host"), $emit: /* @__PURE__ */ __name((e6) => e6.emit, "$emit"), $options: /* @__PURE__ */ __name((e6) => resolveMergedOptions(e6), "$options"), $forceUpdate: /* @__PURE__ */ __name((e6) => e6.f || (e6.f = () => {
      queueJob(e6.update);
    }), "$forceUpdate"), $nextTick: /* @__PURE__ */ __name((e6) => e6.n || (e6.n = nextTick.bind(e6.proxy)), "$nextTick"), $watch: /* @__PURE__ */ __name((e6) => instanceWatch.bind(e6), "$watch") });
    hasSetupBinding = /* @__PURE__ */ __name((e6, t5) => e6 !== P && !e6.__isScriptSetup && hasOwn(e6, t5), "hasSetupBinding");
    it = { get({ _: e6 }, t5) {
      if ("__v_skip" === t5) return true;
      const { ctx: n2, setupState: r2, data: s2, props: o4, accessCache: i3, type: a3, appContext: l2 } = e6;
      if ("$" !== t5[0]) {
        const e7 = i3[t5];
        if (void 0 !== e7) switch (e7) {
          case 1:
            return r2[t5];
          case 2:
            return s2[t5];
          case 4:
            return n2[t5];
          case 3:
            return o4[t5];
        }
        else {
          if (hasSetupBinding(r2, t5)) return i3[t5] = 1, r2[t5];
          if (s2 !== P && hasOwn(s2, t5)) return i3[t5] = 2, s2[t5];
          if (hasOwn(o4, t5)) return i3[t5] = 3, o4[t5];
          if (n2 !== P && hasOwn(n2, t5)) return i3[t5] = 4, n2[t5];
          at && (i3[t5] = 0);
        }
      }
      const c3 = ot2[t5];
      let u3, p2;
      return c3 ? ("$attrs" === t5 && track(e6.attrs, 0, ""), c3(e6)) : (u3 = a3.__cssModules) && (u3 = u3[t5]) ? u3 : n2 !== P && hasOwn(n2, t5) ? (i3[t5] = 4, n2[t5]) : (p2 = l2.config.globalProperties, hasOwn(p2, t5) ? p2[t5] : void 0);
    }, set({ _: e6 }, t5, n2) {
      const { data: r2, setupState: s2, ctx: o4 } = e6;
      return hasSetupBinding(s2, t5) ? (s2[t5] = n2, true) : r2 !== P && hasOwn(r2, t5) ? (r2[t5] = n2, true) : !hasOwn(e6.props, t5) && (("$" !== t5[0] || !(t5.slice(1) in e6)) && (o4[t5] = n2, true));
    }, has({ _: { data: e6, setupState: t5, accessCache: n2, ctx: r2, appContext: s2, props: o4, type: i3 } }, a3) {
      let l2;
      return !!(n2[a3] || e6 !== P && "$" !== a3[0] && hasOwn(e6, a3) || hasSetupBinding(t5, a3) || hasOwn(o4, a3) || hasOwn(r2, a3) || hasOwn(ot2, a3) || hasOwn(s2.config.globalProperties, a3) || (l2 = i3.__cssModules) && l2[a3]);
    }, defineProperty(e6, t5, n2) {
      return null != n2.get ? e6._.accessCache[t5] = 0 : hasOwn(n2, "value") && this.set(e6, t5, n2.value, null), Reflect.defineProperty(e6, t5, n2);
    } };
    __name(normalizePropsOrEmits, "normalizePropsOrEmits");
    at = true;
    __name(applyOptions, "applyOptions");
    __name(callHook, "callHook");
    __name(createWatcher, "createWatcher");
    __name(resolveMergedOptions, "resolveMergedOptions");
    __name(mergeOptions2, "mergeOptions");
    lt = { data: mergeDataFn, props: mergeEmitsOrPropsOptions, emits: mergeEmitsOrPropsOptions, methods: mergeObjectOptions, computed: mergeObjectOptions, beforeCreate: mergeAsArray, created: mergeAsArray, beforeMount: mergeAsArray, mounted: mergeAsArray, beforeUpdate: mergeAsArray, updated: mergeAsArray, beforeDestroy: mergeAsArray, beforeUnmount: mergeAsArray, destroyed: mergeAsArray, unmounted: mergeAsArray, activated: mergeAsArray, deactivated: mergeAsArray, errorCaptured: mergeAsArray, serverPrefetch: mergeAsArray, components: mergeObjectOptions, directives: mergeObjectOptions, watch: /* @__PURE__ */ __name(function(e6, t5) {
      if (!e6) return t5;
      if (!t5) return e6;
      const n2 = H(/* @__PURE__ */ Object.create(null), e6);
      for (const r2 in t5) n2[r2] = mergeAsArray(e6[r2], t5[r2]);
      return n2;
    }, "watch"), provide: mergeDataFn, inject: /* @__PURE__ */ __name(function(e6, t5) {
      return mergeObjectOptions(normalizeInject(e6), normalizeInject(t5));
    }, "inject") };
    __name(mergeDataFn, "mergeDataFn");
    __name(normalizeInject, "normalizeInject");
    __name(mergeAsArray, "mergeAsArray");
    __name(mergeObjectOptions, "mergeObjectOptions");
    __name(mergeEmitsOrPropsOptions, "mergeEmitsOrPropsOptions");
    __name(createAppContext, "createAppContext");
    ct = 0;
    __name(createAppAPI, "createAppAPI");
    ut = null;
    __name(emit, "emit");
    pt = /* @__PURE__ */ new WeakMap();
    __name(normalizeEmitsOptions, "normalizeEmitsOptions");
    __name(isEmitListener, "isEmitListener");
    __name(renderComponentRoot$1, "renderComponentRoot$1");
    getFunctionalFallthrough = /* @__PURE__ */ __name((e6) => {
      let t5;
      for (const n2 in e6) ("class" === n2 || "style" === n2 || isOn(n2)) && ((t5 || (t5 = {}))[n2] = e6[n2]);
      return t5;
    }, "getFunctionalFallthrough");
    filterModelListeners = /* @__PURE__ */ __name((e6, t5) => {
      const n2 = {};
      for (const r2 in e6) isModelListener(r2) && r2.slice(9) in t5 || (n2[r2] = e6[r2]);
      return n2;
    }, "filterModelListeners");
    __name(hasPropsChanged, "hasPropsChanged");
    __name(updateHOCHostEl, "updateHOCHostEl");
    ft = {};
    createInternalObject = /* @__PURE__ */ __name(() => Object.create(ft), "createInternalObject");
    isInternalObject = /* @__PURE__ */ __name((e6) => Object.getPrototypeOf(e6) === ft, "isInternalObject");
    __name(setFullProps, "setFullProps");
    __name(resolvePropValue, "resolvePropValue");
    dt = /* @__PURE__ */ new WeakMap();
    __name(normalizePropsOptions, "normalizePropsOptions");
    __name(validatePropName, "validatePropName");
    isInternalKey = /* @__PURE__ */ __name((e6) => "_" === e6 || "_ctx" === e6 || "$stable" === e6, "isInternalKey");
    normalizeSlotValue = /* @__PURE__ */ __name((e6) => M(e6) ? e6.map(normalizeVNode$1) : [normalizeVNode$1(e6)], "normalizeSlotValue");
    normalizeSlot2 = /* @__PURE__ */ __name((e6, t5, n2) => {
      if (t5._n) return t5;
      const r2 = withCtx((...e7) => normalizeSlotValue(t5(...e7)), n2);
      return r2._c = false, r2;
    }, "normalizeSlot");
    normalizeObjectSlots = /* @__PURE__ */ __name((e6, t5, n2) => {
      const r2 = e6._ctx;
      for (const n3 in e6) {
        if (isInternalKey(n3)) continue;
        const s2 = e6[n3];
        if (isFunction(s2)) t5[n3] = normalizeSlot2(0, s2, r2);
        else if (null != s2) {
          const e7 = normalizeSlotValue(s2);
          t5[n3] = () => e7;
        }
      }
    }, "normalizeObjectSlots");
    normalizeVNodeSlots = /* @__PURE__ */ __name((e6, t5) => {
      const n2 = normalizeSlotValue(t5);
      e6.slots.default = () => n2;
    }, "normalizeVNodeSlots");
    assignSlots = /* @__PURE__ */ __name((e6, t5, n2) => {
      for (const r2 in t5) !n2 && isInternalKey(r2) || (e6[r2] = t5[r2]);
    }, "assignSlots");
    queuePostRenderEffect = /* @__PURE__ */ __name(function(e6, t5) {
      t5 && t5.pendingBranch ? M(e6) ? t5.effects.push(...e6) : t5.effects.push(e6) : queuePostFlushCb(e6);
    }, "queuePostRenderEffect");
    __name(createRenderer, "createRenderer");
    __name(resolveChildrenNamespace, "resolveChildrenNamespace");
    __name(toggleRecurse, "toggleRecurse");
    __name(traverseStaticChildren, "traverseStaticChildren");
    __name(locateNonHydratedAsyncRoot, "locateNonHydratedAsyncRoot");
    __name(invalidateMount, "invalidateMount");
    __name(resolveAsyncComponentPlaceholder, "resolveAsyncComponentPlaceholder");
    isSuspense = /* @__PURE__ */ __name((e6) => e6.__isSuspense, "isSuspense");
    ht = 0;
    gt = { name: "Suspense", __isSuspense: true, process(e6, t5, n2, r2, s2, o4, i3, a3, l2, c3) {
      if (null == e6) !(function(e7, t6, n3, r3, s3, o5, i4, a4, l3) {
        const { p: c4, o: { createElement: u3 } } = l3, p2 = u3("div"), f2 = e7.suspense = createSuspenseBoundary(e7, s3, r3, t6, p2, n3, o5, i4, a4, l3);
        c4(null, f2.pendingBranch = e7.ssContent, p2, null, r3, f2, o5, i4), f2.deps > 0 ? (triggerEvent(e7, "onPending"), triggerEvent(e7, "onFallback"), c4(null, e7.ssFallback, t6, n3, r3, null, o5, i4), setActiveBranch(f2, e7.ssFallback)) : f2.resolve(false, true);
      })(t5, n2, r2, s2, o4, i3, a3, l2, c3);
      else {
        if (o4 && o4.deps > 0 && !e6.suspense.isInFallback) return t5.suspense = e6.suspense, t5.suspense.vnode = t5, void (t5.el = e6.el);
        !(function(e7, t6, n3, r3, s3, o5, i4, a4, { p: l3, um: c4, o: { createElement: u3 } }) {
          const p2 = t6.suspense = e7.suspense;
          p2.vnode = t6, t6.el = e7.el;
          const f2 = t6.ssContent, d3 = t6.ssFallback, { activeBranch: g3, pendingBranch: y3, isInFallback: m3, isHydrating: v3 } = p2;
          if (y3) p2.pendingBranch = f2, isSameVNodeType(y3, f2) ? (l3(y3, f2, p2.hiddenContainer, null, s3, p2, o5, i4, a4), p2.deps <= 0 ? p2.resolve() : m3 && (v3 || (l3(g3, d3, n3, r3, s3, null, o5, i4, a4), setActiveBranch(p2, d3)))) : (p2.pendingId = ht++, v3 ? (p2.isHydrating = false, p2.activeBranch = y3) : c4(y3, s3, p2), p2.deps = 0, p2.effects.length = 0, p2.hiddenContainer = u3("div"), m3 ? (l3(null, f2, p2.hiddenContainer, null, s3, p2, o5, i4, a4), p2.deps <= 0 ? p2.resolve() : (l3(g3, d3, n3, r3, s3, null, o5, i4, a4), setActiveBranch(p2, d3))) : g3 && isSameVNodeType(g3, f2) ? (l3(g3, f2, n3, r3, s3, p2, o5, i4, a4), p2.resolve(true)) : (l3(null, f2, p2.hiddenContainer, null, s3, p2, o5, i4, a4), p2.deps <= 0 && p2.resolve()));
          else if (g3 && isSameVNodeType(g3, f2)) l3(g3, f2, n3, r3, s3, p2, o5, i4, a4), setActiveBranch(p2, f2);
          else if (triggerEvent(t6, "onPending"), p2.pendingBranch = f2, 512 & f2.shapeFlag ? p2.pendingId = f2.component.suspenseId : p2.pendingId = ht++, l3(null, f2, p2.hiddenContainer, null, s3, p2, o5, i4, a4), p2.deps <= 0) p2.resolve();
          else {
            const { timeout: e8, pendingId: t7 } = p2;
            e8 > 0 ? setTimeout(() => {
              p2.pendingId === t7 && p2.fallback(d3);
            }, e8) : 0 === e8 && p2.fallback(d3);
          }
        })(e6, t5, n2, r2, s2, i3, a3, l2, c3);
      }
    }, hydrate: /* @__PURE__ */ __name(function(e6, t5, n2, r2, s2, o4, i3, a3, l2) {
      const c3 = t5.suspense = createSuspenseBoundary(t5, r2, n2, e6.parentNode, document.createElement("div"), null, s2, o4, i3, a3, true), u3 = l2(e6, c3.pendingBranch = t5.ssContent, n2, c3, o4, i3);
      0 === c3.deps && c3.resolve(false, true);
      return u3;
    }, "hydrate"), normalize: /* @__PURE__ */ __name(function(e6) {
      const { shapeFlag: t5, children: n2 } = e6, r2 = 32 & t5;
      e6.ssContent = normalizeSuspenseSlot(r2 ? n2.default : n2), e6.ssFallback = r2 ? normalizeSuspenseSlot(n2.fallback) : createVNode(vt);
    }, "normalize") };
    __name(triggerEvent, "triggerEvent");
    __name(createSuspenseBoundary, "createSuspenseBoundary");
    __name(normalizeSuspenseSlot, "normalizeSuspenseSlot");
    __name(setActiveBranch, "setActiveBranch");
    yt = /* @__PURE__ */ Symbol.for("v-fgt");
    mt = /* @__PURE__ */ Symbol.for("v-txt");
    vt = /* @__PURE__ */ Symbol.for("v-cmt");
    _t = /* @__PURE__ */ Symbol.for("v-stc");
    bt = [];
    kt = null;
    wt = 1;
    __name(setBlockTracking, "setBlockTracking");
    __name(isVNode, "isVNode");
    __name(isSameVNodeType, "isSameVNodeType");
    normalizeKey = /* @__PURE__ */ __name(({ key: e6 }) => null != e6 ? e6 : null, "normalizeKey");
    normalizeRef = /* @__PURE__ */ __name(({ ref: e6, ref_key: t5, ref_for: n2 }) => ("number" == typeof e6 && (e6 = "" + e6), null != e6 ? isString(e6) || isRef(e6) || isFunction(e6) ? { i: Fe2, r: e6, k: t5, f: !!n2 } : e6 : null), "normalizeRef");
    createVNode = /* @__PURE__ */ __name(function(e6, t5 = null, n2 = null, r2 = 0, s2 = null, o4 = false) {
      e6 && e6 !== st || (e6 = vt);
      if (isVNode(e6)) {
        const r3 = cloneVNode(e6, t5, true);
        return n2 && normalizeChildren(r3, n2), wt > 0 && !o4 && kt && (6 & r3.shapeFlag ? kt[kt.indexOf(e6)] = r3 : kt.push(r3)), r3.patchFlag = -2, r3;
      }
      i3 = e6, isFunction(i3) && "__vccOpts" in i3 && (e6 = e6.__vccOpts);
      var i3;
      if (t5) {
        t5 = (function(e8) {
          return e8 ? isProxy(e8) || isInternalObject(e8) ? H({}, e8) : e8 : null;
        })(t5);
        let { class: e7, style: n3 } = t5;
        e7 && !isString(e7) && (t5.class = normalizeClass(e7)), isObject(n3) && (isProxy(n3) && !M(n3) && (n3 = H({}, n3)), t5.style = normalizeStyle(n3));
      }
      const a3 = isString(e6) ? 1 : isSuspense(e6) ? 128 : ((e7) => e7.__isTeleport)(e6) ? 64 : isObject(e6) ? 4 : isFunction(e6) ? 2 : 0;
      return (function(e7, t6 = null, n3 = null, r3 = 0, s3 = null, o5 = e7 === yt ? 0 : 1, i4 = false, a4 = false) {
        const l2 = { __v_isVNode: true, __v_skip: true, type: e7, props: t6, key: t6 && normalizeKey(t6), ref: t6 && normalizeRef(t6), scopeId: Ue2, slotScopeIds: null, children: n3, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: o5, patchFlag: r3, dynamicProps: s3, dynamicChildren: null, appContext: null, ctx: Fe2 };
        return a4 ? (normalizeChildren(l2, n3), 128 & o5 && e7.normalize(l2)) : n3 && (l2.shapeFlag |= isString(n3) ? 8 : 16), wt > 0 && !i4 && kt && (l2.patchFlag > 0 || 6 & o5) && 32 !== l2.patchFlag && kt.push(l2), l2;
      })(e6, t5, n2, r2, s2, a3, o4, true);
    }, "createVNode");
    __name(cloneVNode, "cloneVNode");
    __name(createTextVNode, "createTextVNode");
    __name(normalizeVNode$1, "normalizeVNode$1");
    __name(cloneIfMounted, "cloneIfMounted");
    __name(normalizeChildren, "normalizeChildren");
    __name(mergeProps, "mergeProps");
    __name(invokeVNodeHook, "invokeVNodeHook");
    St = createAppContext();
    Rt = 0;
    __name(createComponentInstance$1, "createComponentInstance$1");
    Ct = null;
    getCurrentInstance = /* @__PURE__ */ __name(() => Ct || Fe2, "getCurrentInstance");
    {
      const e6 = getGlobalThis(), registerGlobalSetter = /* @__PURE__ */ __name((t5, n2) => {
        let r2;
        return (r2 = e6[t5]) || (r2 = e6[t5] = []), r2.push(n2), (e7) => {
          r2.length > 1 ? r2.forEach((t6) => t6(e7)) : r2[0](e7);
        };
      }, "registerGlobalSetter");
      xt = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (e7) => Ct = e7), At = registerGlobalSetter("__VUE_SSR_SETTERS__", (e7) => Tt = e7);
    }
    setCurrentInstance = /* @__PURE__ */ __name((e6) => {
      const t5 = Ct;
      return xt(e6), e6.scope.on(), () => {
        e6.scope.off(), xt(t5);
      };
    }, "setCurrentInstance");
    unsetCurrentInstance = /* @__PURE__ */ __name(() => {
      Ct && Ct.scope.off(), xt(null);
    }, "unsetCurrentInstance");
    __name(isStatefulComponent, "isStatefulComponent");
    Tt = false;
    __name(setupComponent$1, "setupComponent$1");
    __name(handleSetupResult, "handleSetupResult");
    __name(finishComponentSetup, "finishComponentSetup");
    $t = { get: /* @__PURE__ */ __name((e6, t5) => (track(e6, 0, ""), e6[t5]), "get") };
    __name(getComponentPublicInstance, "getComponentPublicInstance");
    __name(getComponentName, "getComponentName");
    computed = /* @__PURE__ */ __name((e6, t5) => {
      const n2 = (function(e7, t6, n3 = false) {
        let r2, s2;
        return isFunction(e7) ? r2 = e7 : (r2 = e7.get, s2 = e7.set), new ComputedRefImpl(r2, s2, n3);
      })(e6, 0, Tt);
      return n2;
    }, "computed");
    __name(h, "h");
    Ot = "3.5.27";
    Pt = { createComponentInstance: createComponentInstance$1, setupComponent: setupComponent$1, renderComponentRoot: renderComponentRoot$1, setCurrentRenderingInstance: setCurrentRenderingInstance$1, isVNode, normalizeVNode: normalizeVNode$1 };
    jt = "undefined" != typeof document ? document : null;
    Ht = jt && jt.createElement("template");
    Et = { insert: /* @__PURE__ */ __name((e6, t5, n2) => {
      t5.insertBefore(e6, n2 || null);
    }, "insert"), remove: /* @__PURE__ */ __name((e6) => {
      const t5 = e6.parentNode;
      t5 && t5.removeChild(e6);
    }, "remove"), createElement: /* @__PURE__ */ __name((e6, t5, n2, r2) => {
      const s2 = "svg" === t5 ? jt.createElementNS("http://www.w3.org/2000/svg", e6) : "mathml" === t5 ? jt.createElementNS("http://www.w3.org/1998/Math/MathML", e6) : n2 ? jt.createElement(e6, { is: n2 }) : jt.createElement(e6);
      return "select" === e6 && r2 && null != r2.multiple && s2.setAttribute("multiple", r2.multiple), s2;
    }, "createElement"), createText: /* @__PURE__ */ __name((e6) => jt.createTextNode(e6), "createText"), createComment: /* @__PURE__ */ __name((e6) => jt.createComment(e6), "createComment"), setText: /* @__PURE__ */ __name((e6, t5) => {
      e6.nodeValue = t5;
    }, "setText"), setElementText: /* @__PURE__ */ __name((e6, t5) => {
      e6.textContent = t5;
    }, "setElementText"), parentNode: /* @__PURE__ */ __name((e6) => e6.parentNode, "parentNode"), nextSibling: /* @__PURE__ */ __name((e6) => e6.nextSibling, "nextSibling"), querySelector: /* @__PURE__ */ __name((e6) => jt.querySelector(e6), "querySelector"), setScopeId(e6, t5) {
      e6.setAttribute(t5, "");
    }, insertStaticContent(e6, t5, n2, r2, s2, o4) {
      const i3 = n2 ? n2.previousSibling : t5.lastChild;
      if (s2 && (s2 === o4 || s2.nextSibling)) for (; t5.insertBefore(s2.cloneNode(true), n2), s2 !== o4 && (s2 = s2.nextSibling); ) ;
      else {
        Ht.innerHTML = "svg" === r2 ? `<svg>${e6}</svg>` : "mathml" === r2 ? `<math>${e6}</math>` : e6;
        const s3 = Ht.content;
        if ("svg" === r2 || "mathml" === r2) {
          const e7 = s3.firstChild;
          for (; e7.firstChild; ) s3.appendChild(e7.firstChild);
          s3.removeChild(e7);
        }
        t5.insertBefore(s3, n2);
      }
      return [i3 ? i3.nextSibling : t5.firstChild, n2 ? n2.previousSibling : t5.lastChild];
    } };
    Mt = /* @__PURE__ */ Symbol("_vtc");
    Nt = /* @__PURE__ */ Symbol("_vod");
    It = /* @__PURE__ */ Symbol("_vsh");
    Dt = /* @__PURE__ */ Symbol("");
    Lt = /(?:^|;)\s*display\s*:/;
    Vt = /\s*!important$/;
    __name(setStyle, "setStyle");
    Bt = ["Webkit", "Moz", "ms"];
    Ft = {};
    Ut = "http://www.w3.org/1999/xlink";
    __name(patchAttr, "patchAttr");
    __name(patchDOMProp, "patchDOMProp");
    zt = /* @__PURE__ */ Symbol("_vei");
    __name(patchEvent, "patchEvent");
    Wt = /(?:Once|Passive|Capture)$/;
    qt = 0;
    Jt = Promise.resolve();
    getNow = /* @__PURE__ */ __name(() => qt || (Jt.then(() => qt = 0), qt = Date.now()), "getNow");
    isNativeOn = /* @__PURE__ */ __name((e6) => 111 === e6.charCodeAt(0) && 110 === e6.charCodeAt(1) && e6.charCodeAt(2) > 96 && e6.charCodeAt(2) < 123, "isNativeOn");
    Gt = H({ patchProp: /* @__PURE__ */ __name((e6, t5, n2, r2, s2, o4) => {
      const i3 = "svg" === s2;
      "class" === t5 ? (function(e7, t6, n3) {
        const r3 = e7[Mt];
        r3 && (t6 = (t6 ? [t6, ...r3] : [...r3]).join(" ")), null == t6 ? e7.removeAttribute("class") : n3 ? e7.setAttribute("class", t6) : e7.className = t6;
      })(e6, r2, i3) : "style" === t5 ? (function(e7, t6, n3) {
        const r3 = e7.style, s3 = isString(n3);
        let o5 = false;
        if (n3 && !s3) {
          if (t6) if (isString(t6)) for (const e8 of t6.split(";")) {
            const t7 = e8.slice(0, e8.indexOf(":")).trim();
            null == n3[t7] && setStyle(r3, t7, "");
          }
          else for (const e8 in t6) null == n3[e8] && setStyle(r3, e8, "");
          for (const e8 in n3) "display" === e8 && (o5 = true), setStyle(r3, e8, n3[e8]);
        } else if (s3) {
          if (t6 !== n3) {
            const e8 = r3[Dt];
            e8 && (n3 += ";" + e8), r3.cssText = n3, o5 = Lt.test(n3);
          }
        } else t6 && e7.removeAttribute("style");
        Nt in e7 && (e7[Nt] = o5 ? r3.display : "", e7[It] && (r3.display = "none"));
      })(e6, n2, r2) : isOn(t5) ? isModelListener(t5) || patchEvent(e6, t5, 0, r2, o4) : ("." === t5[0] ? (t5 = t5.slice(1), 1) : "^" === t5[0] ? (t5 = t5.slice(1), 0) : (function(e7, t6, n3, r3) {
        if (r3) return "innerHTML" === t6 || "textContent" === t6 || !!(t6 in e7 && isNativeOn(t6) && isFunction(n3));
        if ("spellcheck" === t6 || "draggable" === t6 || "translate" === t6 || "autocorrect" === t6) return false;
        if ("sandbox" === t6 && "IFRAME" === e7.tagName) return false;
        if ("form" === t6) return false;
        if ("list" === t6 && "INPUT" === e7.tagName) return false;
        if ("type" === t6 && "TEXTAREA" === e7.tagName) return false;
        if ("width" === t6 || "height" === t6) {
          const t7 = e7.tagName;
          if ("IMG" === t7 || "VIDEO" === t7 || "CANVAS" === t7 || "SOURCE" === t7) return false;
        }
        if (isNativeOn(t6) && isString(n3)) return false;
        return t6 in e7;
      })(e6, t5, r2, i3)) ? (patchDOMProp(e6, t5, r2), e6.tagName.includes("-") || "value" !== t5 && "checked" !== t5 && "selected" !== t5 || patchAttr(e6, t5, r2, i3, 0, "value" !== t5)) : !e6._isVueCE || !/[A-Z]/.test(t5) && isString(r2) ? ("true-value" === t5 ? e6._trueValue = r2 : "false-value" === t5 && (e6._falseValue = r2), patchAttr(e6, t5, r2, i3)) : patchDOMProp(e6, L(t5), r2, 0, t5);
    }, "patchProp") }, Et);
    createApp = /* @__PURE__ */ __name((...e6) => {
      const t5 = (Kt || (Kt = createRenderer(Gt))).createApp(...e6), { mount: n2 } = t5;
      return t5.mount = (e7) => {
        const r2 = (function(e8) {
          if (isString(e8)) {
            return document.querySelector(e8);
          }
          return e8;
        })(e7);
        if (!r2) return;
        const s2 = t5._component;
        isFunction(s2) || s2.render || s2.template || (s2.template = r2.innerHTML), 1 === r2.nodeType && (r2.textContent = "");
        const o4 = n2(r2, false, (function(e8) {
          if (e8 instanceof SVGElement) return "svg";
          if ("function" == typeof MathMLElement && e8 instanceof MathMLElement) return "mathml";
        })(r2));
        return r2 instanceof Element && (r2.removeAttribute("v-cloak"), r2.setAttribute("data-v-app", "")), o4;
      }, t5;
    }, "createApp");
    VueResolver = /* @__PURE__ */ __name((e6, t5) => {
      return isRef(t5) ? isFunction(n2 = t5) ? n2() : unref(n2) : t5;
      var n2;
    }, "VueResolver");
    Zt = "usehead";
    __name(injectHead, "injectHead");
    __name(useHead, "useHead");
    __name(createHead, "createHead");
    Xt = makeMap(",key,ref,innerHTML,textContent,ref_key,ref_for");
    __name(ssrRenderAttrs, "ssrRenderAttrs");
    __name(ssrRenderDynamicAttr, "ssrRenderDynamicAttr");
    __name(ssrRenderClass, "ssrRenderClass");
    __name(ssrRenderStyle, "ssrRenderStyle");
    __name(ssrRenderComponent, "ssrRenderComponent");
    __name(ssrInterpolate, "ssrInterpolate");
    {
      const e6 = getGlobalThis(), registerGlobalSetter = /* @__PURE__ */ __name((t5, n2) => {
        let r2;
        return (r2 = e6[t5]) || (r2 = e6[t5] = []), r2.push(n2), (e7) => {
          r2.length > 1 ? r2.forEach((t6) => t6(e7)) : r2[0](e7);
        };
      }, "registerGlobalSetter");
      registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (e7) => e7), registerGlobalSetter("__VUE_SSR_SETTERS__", (e7) => e7);
    }
    __name(ssrRenderSuspense, "ssrRenderSuspense");
    ({ createComponentInstance: Yt, setCurrentRenderingInstance: Qt, setupComponent: en, renderComponentRoot: tn, normalizeVNode: nn } = Pt);
    __name(createBuffer, "createBuffer");
    __name(renderComponentVNode, "renderComponentVNode");
    __name(renderComponentSubTree, "renderComponentSubTree");
    __name(renderVNode, "renderVNode");
    __name(renderVNodeChildren, "renderVNodeChildren");
    ({ isVNode: rn } = Pt);
    __name(nestedUnrollBuffer, "nestedUnrollBuffer");
    __name(unrollBuffer$1, "unrollBuffer$1");
    __name(unrollBufferSync$1, "unrollBufferSync$1");
    __name(renderToString, "renderToString");
    sn = { meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }, { charset: "utf-8" }], link: [], style: [], script: [], noscript: [] };
    on = { id: "teleports" };
    an = { id: "__nuxt-loader" };
    __name(baseURL, "baseURL");
    __name(buildAssetsURL, "buildAssetsURL");
    __name(publicAssetsURL, "publicAssetsURL");
    ln = `<div${propsToString({ id: "__nuxt" })}>`;
    cn = "</div>";
    getPrecomputedDependencies = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_client_precomputed(), client_precomputed_exports)).then((e6) => e6.default || e6).then((e6) => "function" == typeof e6 ? e6() : e6), "getPrecomputedDependencies");
    un = lazyCachedFunction(async () => {
      const e6 = await Promise.resolve().then(() => (init_server(), server_exports)).then((e7) => e7.default || e7);
      if (!e6) throw new Error("Server bundle is not available");
      return createRenderer$1(e6, { precomputed: await getPrecomputedDependencies(), manifest: void 0, renderToString: /* @__PURE__ */ __name(async function(e7, t5) {
        const n2 = await renderToString(e7, t5);
        return ln + n2 + cn;
      }, "renderToString"), buildAssetsURL });
    });
    pn = lazyCachedFunction(async () => {
      const e6 = await getPrecomputedDependencies(), t5 = await Promise.resolve().then(() => (init_virtual_spa_template(), virtual_spa_template_exports)).then((e7) => e7.template).catch(() => "").then((e7) => {
        {
          const t6 = `<div${propsToString(an)}>`;
          return ln + cn + (e7 ? t6 + e7 + "</div>" : "");
        }
      }), n2 = createRenderer$1(() => () => {
      }, { precomputed: e6, manifest: void 0, renderToString: /* @__PURE__ */ __name(() => t5, "renderToString"), buildAssetsURL }), s2 = await n2.renderToString({});
      return { rendererContext: n2.rendererContext, renderToString: /* @__PURE__ */ __name((e7) => {
        const t6 = useRuntimeConfig2(e7.event);
        return e7.modules ||= /* @__PURE__ */ new Set(), e7.payload.serverRendered = false, e7.config = { public: t6.public, app: t6.app }, Promise.resolve(s2);
      }, "renderToString") };
    });
    __name(lazyCachedFunction, "lazyCachedFunction");
    fn = lazyCachedFunction(() => Promise.resolve().then(() => (init_styles(), styles_exports)).then((e6) => e6.default || e6));
    dn = { "<": "\\u003C", "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t", "\u2028": "\\u2028", "\u2029": "\\u2029" };
    DevalueError = class extends Error {
      static {
        __name(this, "DevalueError");
      }
      constructor(e6, t5, n2, r2) {
        super(e6), this.name = "DevalueError", this.path = t5.join(""), this.value = n2, this.root = r2;
      }
    };
    __name(is_primitive, "is_primitive");
    hn = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    __name(is_plain_object, "is_plain_object");
    __name(get_type, "get_type");
    __name(get_escaped_char, "get_escaped_char");
    __name(stringify_string, "stringify_string");
    __name(enumerable_symbols, "enumerable_symbols");
    gn = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    __name(stringify_key, "stringify_key");
    __name(is_valid_array_index, "is_valid_array_index");
    __name(valid_array_indices, "valid_array_indices");
    yn = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    mn = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    vn = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
    __name(uneval, "uneval");
    __name(escape_unsafe_char, "escape_unsafe_char");
    __name(escape_unsafe_chars, "escape_unsafe_chars");
    __name(stringify_primitive$1, "stringify_primitive$1");
    __name(encode64, "encode64");
    _n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    __name(stringify, "stringify");
    __name(stringify_primitive, "stringify_primitive");
    __name(renderPayloadJsonScript, "renderPayloadJsonScript");
    __name(splitPayload, "splitPayload");
    bn = { disableDefaults: true };
    kn = {};
    wn = [];
    globalThis.__buildAssetsURL = buildAssetsURL, globalThis.__publicAssetsURL = publicAssetsURL;
    Sn = !!on.id;
    Rn = Sn ? `<div${propsToString(on)}>` : "";
    Cn = Sn ? "</div>" : "";
    xn = /^[^?]*\/_payload.json(?:\?.*)?$/;
    An = defineRenderHandler(async (e6) => {
      const t5 = useNitroApp(), n2 = e6.path.startsWith("/__nuxt_error") ? getQuery(e6) : null;
      if (n2 && !("__unenv__" in e6.node.req)) throw createError({ status: 404, statusText: "Page Not Found: /__nuxt_error", message: "Page Not Found: /__nuxt_error" });
      const a3 = (function(e7) {
        return { url: decodePath(e7.path), event: e7, runtimeConfig: useRuntimeConfig2(e7), noSSR: e7.context.nuxt?.noSSR || false, head: createHead(bn), error: false, nuxt: void 0, payload: {}, "~payloadReducers": /* @__PURE__ */ Object.create(null), modules: /* @__PURE__ */ new Set() };
      })(e6), g3 = { mode: "server" };
      if (a3.head.push(sn, g3), n2) {
        const e7 = n2.status || n2.statusCode;
        if (e7 && (n2.status = n2.statusCode = Number.parseInt(e7)), "string" == typeof n2.data) try {
          n2.data = destr(n2.data);
        } catch {
        }
        !(function(e8, t6) {
          e8.error = true, e8.payload = { error: t6 }, e8.url = t6.url;
        })(a3, n2);
      }
      const y3 = getRouteRules(e6), m3 = !a3.noSSR && (y3.isr || y3.cache), v3 = !!m3 && xn.test(a3.url);
      if (v3) {
        const t6 = a3.url.substring(0, a3.url.lastIndexOf("/")) || "/";
        a3.url = t6, e6._path = e6.node.req.url = t6;
      }
      false === y3.ssr && (a3.noSSR = true);
      const _4 = m3 ? joinURL(a3.runtimeConfig.app.cdnURL || a3.runtimeConfig.app.baseURL, a3.url.replace(/\?.*$/, ""), "_payload.json") + "?" + a3.runtimeConfig.app.buildId : void 0, b3 = await (function(e7) {
        return e7.noSSR ? pn() : un();
      })(a3);
      for (const e7 of wn) a3.modules.add(e7);
      const k3 = await b3.renderToString(a3).catch(async (e7) => {
        if ((a3["~renderResponse"] || a3._renderResponse) && "skipping render" === e7.message) return {};
        const t6 = !n2 && a3.payload?.error || e7;
        throw await a3.nuxt?.hooks.callHook("app:error", t6), t6;
      }), w3 = a3["~renderResponse"] || a3._renderResponse || v3 ? [] : await (async function(e7) {
        const t6 = await fn(), n3 = /* @__PURE__ */ new Set();
        for (const r2 of e7) if (r2 in t6 && t6[r2]) for (const e8 of await t6[r2]()) n3.add(e8);
        return Array.from(n3).map((e8) => ({ innerHTML: e8 }));
      })(a3.modules ?? []);
      if (await a3.nuxt?.hooks.callHook("app:rendered", { ssrContext: a3, renderResult: k3 }), a3["~renderResponse"] || a3._renderResponse) return a3["~renderResponse"] || a3._renderResponse;
      if (a3.payload?.error && !n2) throw a3.payload.error;
      if (v3) {
        const e7 = (function(e8) {
          return { body: stringify(splitPayload(e8).payload, e8["~payloadReducers"]), statusCode: getResponseStatus(e8.event), statusMessage: getResponseStatusText(e8.event), headers: { "content-type": "application/json;charset=utf-8", "x-powered-by": "Nuxt" } };
        })(a3);
        return e7;
      }
      const S3 = y3.noScripts, { styles: R3, scripts: C4 } = getRequestDependencies(a3, b3.rendererContext);
      m3 && !S3 && a3.head.push({ link: [{ rel: "preload", as: "fetch", crossorigin: "anonymous", href: _4 }] }, g3), a3["~preloadManifest"] && !S3 && a3.head.push({ link: [{ rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${a3.runtimeConfig.app.buildId}.json`) }] }, { ...g3, tagPriority: "low" }), w3.length && a3.head.push({ style: w3 });
      const x3 = [];
      for (const e7 of Object.values(R3)) x3.push({ rel: "stylesheet", href: b3.rendererContext.buildAssetsURL(e7.file), crossorigin: "" });
      if (x3.length && a3.head.push({ link: x3 }, g3), !S3) {
        if (a3["~lazyHydratedModules"]) for (const e7 of a3["~lazyHydratedModules"]) a3.modules?.delete(e7);
        a3.head.push({ link: getPreloadLinks(a3, b3.rendererContext) }, g3), a3.head.push({ link: getPrefetchLinks(a3, b3.rendererContext) }, g3), a3.head.push({ script: renderPayloadJsonScript(m3 ? { ssrContext: a3, data: splitPayload(a3).initial, src: _4 } : { ssrContext: a3, data: a3.payload }) }, { ...g3, tagPosition: "bodyClose", tagPriority: "high" });
      }
      if (!y3.noScripts) {
        const e7 = "head";
        a3.head.push({ script: Object.values(C4).map((t6) => ({ type: t6.module ? "module" : null, src: b3.rendererContext.buildAssetsURL(t6.file), defer: !t6.module || null, tagPosition: e7, crossorigin: "" })) }, g3);
      }
      const { headTags: A4, bodyTags: T3, bodyTagsOpen: $3, htmlAttrs: O3, bodyAttrs: P3 } = await renderSSRHead(a3.head, kn), j3 = { htmlAttrs: O3 ? [O3] : [], head: normalizeChunks([A4]), bodyAttrs: P3 ? [P3] : [], bodyPrepend: normalizeChunks([$3, a3.teleports?.body]), body: [k3.html, Rn + (Sn ? joinTags([a3.teleports?.[`#${on.id}`]]) : "") + Cn], bodyAppend: [T3] };
      return await t5.hooks.callHook("render:html", j3, { event: e6 }), { body: (H3 = j3, `<!DOCTYPE html><html${joinAttrs(H3.htmlAttrs)}><head>${joinTags(H3.head)}</head><body${joinAttrs(H3.bodyAttrs)}>${joinTags(H3.bodyPrepend)}${joinTags(H3.body)}${joinTags(H3.bodyAppend)}</body></html>`), statusCode: getResponseStatus(e6), statusMessage: getResponseStatusText(e6), headers: { "content-type": "text/html;charset=utf-8", "x-powered-by": "Nuxt" } };
      var H3;
    });
    __name(normalizeChunks, "normalizeChunks");
    __name(joinTags, "joinTags");
    __name(joinAttrs, "joinAttrs");
    Tn = Object.freeze(Object.defineProperty({ __proto__: null, default: An }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .output/server/chunks/nitro/nitro.mjs
function isEventTarget(e6) {
  return "function" == typeof e6?.addEventListener;
}
function addCatch(e6, t5, r2, s2) {
  if (e6[g2]) try {
    const a3 = t5.then;
    "function" == typeof a3 && a3.call(t5, void 0, function(t6) {
      setTimeout(emitUnhandledRejectionOrErr, 0, e6, t6, r2, s2);
    });
  } catch (t6) {
    e6.emit("error", t6);
  }
}
function emitUnhandledRejectionOrErr(e6, t5, r2, s2) {
  if ("function" == typeof e6[d2]) e6[d2](t5, r2, ...s2);
  else {
    const r3 = e6[g2];
    try {
      e6[g2] = false, e6.emit("error", t5);
    } finally {
      e6[g2] = r3;
    }
  }
}
function _getMaxListeners(e6) {
  return void 0 === e6._maxListeners ? r : e6._maxListeners;
}
function enhanceStackTrace(e6, t5) {
  let r2 = "";
  try {
    const { name: e7 } = this.constructor;
    "EventEmitter" !== e7 && (r2 = ` on ${e7} instance`);
  } catch {
  }
  const s2 = `
Emitted 'error' event${r2} at:
`, a3 = (t5.stack || "").split("\n").slice(1);
  return e6.stack + s2 + a3.join("\n");
}
function _addListener(e6, t5, r2, s2) {
  let a3, c3, u3;
  if (c3 = e6._events, void 0 === c3 ? (c3 = e6._events = { __proto__: null }, e6._eventsCount = 0) : (void 0 !== c3.newListener && (e6.emit("newListener", t5, r2.listener ?? r2), c3 = e6._events), u3 = c3[t5]), void 0 === u3) c3[t5] = r2, ++e6._eventsCount;
  else if ("function" == typeof u3 ? u3 = c3[t5] = s2 ? [r2, u3] : [u3, r2] : s2 ? u3.unshift(r2) : u3.push(r2), a3 = _getMaxListeners(e6), a3 > 0 && u3.length > a3 && !u3.warned) {
    u3.warned = true;
    const r3 = new h2(`Possible EventEmitter memory leak detected. ${u3.length} ${String(t5)} listeners added to ${inspect(e6)}. MaxListeners is ${a3}. Use emitter.setMaxListeners() to increase limit`, { name: "MaxListenersExceededWarning", emitter: e6, type: t5, count: u3.length });
    console.warn(r3);
  }
  return e6;
}
function onceWrapper() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function _onceWrap(e6, t5, r2) {
  const s2 = { fired: false, wrapFn: void 0, target: e6, type: t5, listener: r2 }, a3 = onceWrapper.bind(s2);
  return a3.listener = r2, s2.wrapFn = a3, a3;
}
function _listeners(e6, t5, r2) {
  const s2 = e6._events;
  if (void 0 === s2) return [];
  const a3 = s2[t5];
  return void 0 === a3 ? [] : "function" == typeof a3 ? r2 ? [a3.listener || a3] : [a3] : r2 ? (function(e7) {
    const t6 = arrayClone(e7);
    for (let e8 = 0; e8 < t6.length; ++e8) {
      const r3 = t6[e8].listener;
      "function" == typeof r3 && (t6[e8] = r3);
    }
    return t6;
  })(a3) : arrayClone(a3);
}
function arrayClone(e6) {
  switch (e6.length) {
    case 2:
      return [e6[0], e6[1]];
    case 3:
      return [e6[0], e6[1], e6[2]];
    case 4:
      return [e6[0], e6[1], e6[2], e6[3]];
    case 5:
      return [e6[0], e6[1], e6[2], e6[3], e6[4]];
    case 6:
      return [e6[0], e6[1], e6[2], e6[3], e6[4], e6[5]];
  }
  return Array.prototype.slice.call(e6);
}
function createIterResult(e6, t5) {
  return { value: e6, done: t5 };
}
function eventTargetAgnosticRemoveListener(e6, t5, r2, s2) {
  if ("function" == typeof e6.removeListener) e6.removeListener(t5, r2);
  else {
    if ("function" != typeof e6.removeEventListener) throw new u2("emitter", "EventEmitter", e6);
    e6.removeEventListener(t5, r2, s2);
  }
}
function eventTargetAgnosticAddListener(e6, t5, r2, s2) {
  if ("function" == typeof e6.on) s2?.once ? e6.once(t5, r2) : e6.on(t5, r2);
  else {
    if ("function" != typeof e6.addEventListener) throw new u2("emitter", "EventEmitter", e6);
    e6.addEventListener(t5, r2, s2);
  }
}
function createNotImplementedError(e6) {
  return new Error(`[unenv] ${e6} is not implemented yet!`);
}
function notImplemented(e6) {
  return Object.assign(() => {
    throw createNotImplementedError(e6);
  }, { __unenv__: true });
}
function createNextTickWithTimeout() {
  let e6, t5 = [], r2 = false, s2 = -1;
  function cleanUpNextTick() {
    r2 && e6 && (r2 = false, e6.length > 0 ? t5 = [...e6, ...t5] : s2 = -1, t5.length > 0 && drainQueue());
  }
  __name(cleanUpNextTick, "cleanUpNextTick");
  function drainQueue() {
    if (r2) return;
    const a3 = setTimeout(cleanUpNextTick);
    r2 = true;
    let c3 = t5.length;
    for (; c3; ) {
      for (e6 = t5, t5 = []; ++s2 < c3; ) e6 && e6[s2]();
      s2 = -1, c3 = t5.length;
    }
    e6 = void 0, r2 = false, clearTimeout(a3);
  }
  __name(drainQueue, "drainQueue");
  return (e7, ...s3) => {
    t5.push(e7.bind(void 0, ...s3)), 1 !== t5.length || r2 || setTimeout(drainQueue);
  };
}
function toByteArray(e6) {
  let t5;
  const r2 = (function(e7) {
    const t6 = e7.length;
    if (t6 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    let r3 = e7.indexOf("=");
    return -1 === r3 && (r3 = t6), [r3, r3 === t6 ? 0 : 4 - r3 % 4];
  })(e6), s2 = r2[0], a3 = r2[1], c3 = new qt2((function(e7, t6, r3) {
    return 3 * (t6 + r3) / 4 - r3;
  })(0, s2, a3));
  let u3 = 0;
  const f2 = a3 > 0 ? s2 - 4 : s2;
  let h3;
  for (h3 = 0; h3 < f2; h3 += 4) t5 = Wt2[e6.charCodeAt(h3)] << 18 | Wt2[e6.charCodeAt(h3 + 1)] << 12 | Wt2[e6.charCodeAt(h3 + 2)] << 6 | Wt2[e6.charCodeAt(h3 + 3)], c3[u3++] = t5 >> 16 & 255, c3[u3++] = t5 >> 8 & 255, c3[u3++] = 255 & t5;
  return 2 === a3 && (t5 = Wt2[e6.charCodeAt(h3)] << 2 | Wt2[e6.charCodeAt(h3 + 1)] >> 4, c3[u3++] = 255 & t5), 1 === a3 && (t5 = Wt2[e6.charCodeAt(h3)] << 10 | Wt2[e6.charCodeAt(h3 + 1)] << 4 | Wt2[e6.charCodeAt(h3 + 2)] >> 2, c3[u3++] = t5 >> 8 & 255, c3[u3++] = 255 & t5), c3;
}
function tripletToBase64(e6) {
  return jt2[e6 >> 18 & 63] + jt2[e6 >> 12 & 63] + jt2[e6 >> 6 & 63] + jt2[63 & e6];
}
function encodeChunk(e6, t5, r2) {
  let s2;
  const a3 = [];
  for (let c3 = t5; c3 < r2; c3 += 3) s2 = (e6[c3] << 16 & 16711680) + (e6[c3 + 1] << 8 & 65280) + (255 & e6[c3 + 2]), a3.push(tripletToBase64(s2));
  return a3.join("");
}
function fromByteArray(e6) {
  let t5;
  const r2 = e6.length, s2 = r2 % 3, a3 = [], c3 = 16383;
  for (let t6 = 0, u3 = r2 - s2; t6 < u3; t6 += c3) a3.push(encodeChunk(e6, t6, t6 + c3 > u3 ? u3 : t6 + c3));
  return 1 === s2 ? (t5 = e6[r2 - 1], a3.push(jt2[t5 >> 2] + jt2[t5 << 4 & 63] + "==")) : 2 === s2 && (t5 = (e6[r2 - 2] << 8) + e6[r2 - 1], a3.push(jt2[t5 >> 10] + jt2[t5 >> 4 & 63] + jt2[t5 << 2 & 63] + "=")), a3.join("");
}
function read(e6, t5, r2, s2, a3) {
  let c3, u3;
  const f2 = 8 * a3 - s2 - 1, h3 = (1 << f2) - 1, d3 = h3 >> 1;
  let g3 = -7, m3 = r2 ? a3 - 1 : 0;
  const _4 = r2 ? -1 : 1;
  let E3 = e6[t5 + m3];
  for (m3 += _4, c3 = E3 & (1 << -g3) - 1, E3 >>= -g3, g3 += f2; g3 > 0; ) c3 = 256 * c3 + e6[t5 + m3], m3 += _4, g3 -= 8;
  for (u3 = c3 & (1 << -g3) - 1, c3 >>= -g3, g3 += s2; g3 > 0; ) u3 = 256 * u3 + e6[t5 + m3], m3 += _4, g3 -= 8;
  if (0 === c3) c3 = 1 - d3;
  else {
    if (c3 === h3) return u3 ? Number.NaN : (E3 ? -1 : 1) * Number.POSITIVE_INFINITY;
    u3 += Math.pow(2, s2), c3 -= d3;
  }
  return (E3 ? -1 : 1) * u3 * Math.pow(2, c3 - s2);
}
function write(e6, t5, r2, s2, a3, c3) {
  let u3, f2, h3, d3 = 8 * c3 - a3 - 1;
  const g3 = (1 << d3) - 1, m3 = g3 >> 1, _4 = 23 === a3 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  let E3 = s2 ? 0 : c3 - 1;
  const R3 = s2 ? 1 : -1, B3 = t5 < 0 || 0 === t5 && 1 / t5 < 0 ? 1 : 0;
  for (t5 = Math.abs(t5), Number.isNaN(t5) || t5 === Number.POSITIVE_INFINITY ? (f2 = Number.isNaN(t5) ? 1 : 0, u3 = g3) : (u3 = Math.floor(Math.log2(t5)), t5 * (h3 = Math.pow(2, -u3)) < 1 && (u3--, h3 *= 2), (t5 += u3 + m3 >= 1 ? _4 / h3 : _4 * Math.pow(2, 1 - m3)) * h3 >= 2 && (u3++, h3 /= 2), u3 + m3 >= g3 ? (f2 = 0, u3 = g3) : u3 + m3 >= 1 ? (f2 = (t5 * h3 - 1) * Math.pow(2, a3), u3 += m3) : (f2 = t5 * Math.pow(2, m3 - 1) * Math.pow(2, a3), u3 = 0)); a3 >= 8; ) e6[r2 + E3] = 255 & f2, E3 += R3, f2 /= 256, a3 -= 8;
  for (u3 = u3 << a3 | f2, d3 += a3; d3 > 0; ) e6[r2 + E3] = 255 & u3, E3 += R3, u3 /= 256, d3 -= 8;
  e6[r2 + E3 - R3] |= 128 * B3;
}
function createBuffer2(e6) {
  if (e6 > zt2) throw new RangeError('The value "' + e6 + '" is invalid for option "size"');
  const t5 = new Uint8Array(e6);
  return Object.setPrototypeOf(t5, Buffer$1.prototype), t5;
}
function Buffer$1(e6, t5, r2) {
  if ("number" == typeof e6) {
    if ("string" == typeof t5) throw new TypeError('The "string" argument must be of type string. Received type number');
    return allocUnsafe(e6);
  }
  return from(e6, t5, r2);
}
function from(e6, t5, r2) {
  if ("string" == typeof e6) return (function(e7, t6) {
    "string" == typeof t6 && "" !== t6 || (t6 = "utf8");
    if (!Buffer$1.isEncoding(t6)) throw new TypeError("Unknown encoding: " + t6);
    const r3 = 0 | byteLength(e7, t6);
    let s3 = createBuffer2(r3);
    const a4 = s3.write(e7, t6);
    a4 !== r3 && (s3 = s3.slice(0, a4));
    return s3;
  })(e6, t5);
  if (ArrayBuffer.isView(e6)) return (function(e7) {
    if (isInstance(e7, Uint8Array)) {
      const t6 = new Uint8Array(e7);
      return fromArrayBuffer(t6.buffer, t6.byteOffset, t6.byteLength);
    }
    return fromArrayLike(e7);
  })(e6);
  if (null == e6) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e6);
  if (isInstance(e6, ArrayBuffer) || e6 && isInstance(e6.buffer, ArrayBuffer)) return fromArrayBuffer(e6, t5, r2);
  if ("undefined" != typeof SharedArrayBuffer && (isInstance(e6, SharedArrayBuffer) || e6 && isInstance(e6.buffer, SharedArrayBuffer))) return fromArrayBuffer(e6, t5, r2);
  if ("number" == typeof e6) throw new TypeError('The "value" argument must not be of type number. Received type number');
  const s2 = e6.valueOf && e6.valueOf();
  if (null != s2 && s2 !== e6) return Buffer$1.from(s2, t5, r2);
  const a3 = (function(e7) {
    if (Buffer$1.isBuffer(e7)) {
      const t6 = 0 | checked(e7.length), r3 = createBuffer2(t6);
      return 0 === r3.length || e7.copy(r3, 0, 0, t6), r3;
    }
    if (void 0 !== e7.length) return "number" != typeof e7.length || numberIsNaN(e7.length) ? createBuffer2(0) : fromArrayLike(e7);
    if ("Buffer" === e7.type && Array.isArray(e7.data)) return fromArrayLike(e7.data);
  })(e6);
  if (a3) return a3;
  if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e6[Symbol.toPrimitive]) return Buffer$1.from(e6[Symbol.toPrimitive]("string"), t5, r2);
  throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e6);
}
function assertSize(e6) {
  if ("number" != typeof e6) throw new TypeError('"size" argument must be of type number');
  if (e6 < 0) throw new RangeError('The value "' + e6 + '" is invalid for option "size"');
}
function allocUnsafe(e6) {
  return assertSize(e6), createBuffer2(e6 < 0 ? 0 : 0 | checked(e6));
}
function fromArrayLike(e6) {
  const t5 = e6.length < 0 ? 0 : 0 | checked(e6.length), r2 = createBuffer2(t5);
  for (let s2 = 0; s2 < t5; s2 += 1) r2[s2] = 255 & e6[s2];
  return r2;
}
function fromArrayBuffer(e6, t5, r2) {
  if (t5 < 0 || e6.byteLength < t5) throw new RangeError('"offset" is outside of buffer bounds');
  if (e6.byteLength < t5 + (r2 || 0)) throw new RangeError('"length" is outside of buffer bounds');
  let s2;
  return s2 = void 0 === t5 && void 0 === r2 ? new Uint8Array(e6) : void 0 === r2 ? new Uint8Array(e6, t5) : new Uint8Array(e6, t5, r2), Object.setPrototypeOf(s2, Buffer$1.prototype), s2;
}
function checked(e6) {
  if (e6 >= zt2) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + zt2.toString(16) + " bytes");
  return 0 | e6;
}
function byteLength(e6, t5) {
  if (Buffer$1.isBuffer(e6)) return e6.length;
  if (ArrayBuffer.isView(e6) || isInstance(e6, ArrayBuffer)) return e6.byteLength;
  if ("string" != typeof e6) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e6);
  const r2 = e6.length, s2 = arguments.length > 2 && true === arguments[2];
  if (!s2 && 0 === r2) return 0;
  let a3 = false;
  for (; ; ) switch (t5) {
    case "ascii":
    case "latin1":
    case "binary":
      return r2;
    case "utf8":
    case "utf-8":
      return utf8ToBytes(e6).length;
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return 2 * r2;
    case "hex":
      return r2 >>> 1;
    case "base64":
      return base64ToBytes(e6).length;
    default:
      if (a3) return s2 ? -1 : utf8ToBytes(e6).length;
      t5 = ("" + t5).toLowerCase(), a3 = true;
  }
}
function slowToString(e6, t5, r2) {
  let s2 = false;
  if ((void 0 === t5 || t5 < 0) && (t5 = 0), t5 > this.length) return "";
  if ((void 0 === r2 || r2 > this.length) && (r2 = this.length), r2 <= 0) return "";
  if ((r2 >>>= 0) <= (t5 >>>= 0)) return "";
  for (e6 || (e6 = "utf8"); ; ) switch (e6) {
    case "hex":
      return hexSlice(this, t5, r2);
    case "utf8":
    case "utf-8":
      return utf8Slice(this, t5, r2);
    case "ascii":
      return asciiSlice(this, t5, r2);
    case "latin1":
    case "binary":
      return latin1Slice(this, t5, r2);
    case "base64":
      return base64Slice(this, t5, r2);
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return utf16leSlice(this, t5, r2);
    default:
      if (s2) throw new TypeError("Unknown encoding: " + e6);
      e6 = (e6 + "").toLowerCase(), s2 = true;
  }
}
function swap(e6, t5, r2) {
  const s2 = e6[t5];
  e6[t5] = e6[r2], e6[r2] = s2;
}
function bidirectionalIndexOf(e6, t5, r2, s2, a3) {
  if (0 === e6.length) return -1;
  if ("string" == typeof r2 ? (s2 = r2, r2 = 0) : r2 > 2147483647 ? r2 = 2147483647 : r2 < -2147483648 && (r2 = -2147483648), numberIsNaN(r2 = +r2) && (r2 = a3 ? 0 : e6.length - 1), r2 < 0 && (r2 = e6.length + r2), r2 >= e6.length) {
    if (a3) return -1;
    r2 = e6.length - 1;
  } else if (r2 < 0) {
    if (!a3) return -1;
    r2 = 0;
  }
  if ("string" == typeof t5 && (t5 = Buffer$1.from(t5, s2)), Buffer$1.isBuffer(t5)) return 0 === t5.length ? -1 : arrayIndexOf(e6, t5, r2, s2, a3);
  if ("number" == typeof t5) return t5 &= 255, "function" == typeof Uint8Array.prototype.indexOf ? a3 ? Uint8Array.prototype.indexOf.call(e6, t5, r2) : Uint8Array.prototype.lastIndexOf.call(e6, t5, r2) : arrayIndexOf(e6, [t5], r2, s2, a3);
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(e6, t5, r2, s2, a3) {
  let c3, u3 = 1, f2 = e6.length, h3 = t5.length;
  if (void 0 !== s2 && ("ucs2" === (s2 = String(s2).toLowerCase()) || "ucs-2" === s2 || "utf16le" === s2 || "utf-16le" === s2)) {
    if (e6.length < 2 || t5.length < 2) return -1;
    u3 = 2, f2 /= 2, h3 /= 2, r2 /= 2;
  }
  function read2(e7, t6) {
    return 1 === u3 ? e7[t6] : e7.readUInt16BE(t6 * u3);
  }
  __name(read2, "read");
  if (a3) {
    let s3 = -1;
    for (c3 = r2; c3 < f2; c3++) if (read2(e6, c3) === read2(t5, -1 === s3 ? 0 : c3 - s3)) {
      if (-1 === s3 && (s3 = c3), c3 - s3 + 1 === h3) return s3 * u3;
    } else -1 !== s3 && (c3 -= c3 - s3), s3 = -1;
  } else for (r2 + h3 > f2 && (r2 = f2 - h3), c3 = r2; c3 >= 0; c3--) {
    let r3 = true;
    for (let s3 = 0; s3 < h3; s3++) if (read2(e6, c3 + s3) !== read2(t5, s3)) {
      r3 = false;
      break;
    }
    if (r3) return c3;
  }
  return -1;
}
function hexWrite(e6, t5, r2, s2) {
  r2 = Number(r2) || 0;
  const a3 = e6.length - r2;
  s2 ? (s2 = Number(s2)) > a3 && (s2 = a3) : s2 = a3;
  const c3 = t5.length;
  let u3;
  for (s2 > c3 / 2 && (s2 = c3 / 2), u3 = 0; u3 < s2; ++u3) {
    const s3 = Number.parseInt(t5.slice(2 * u3, 2 * u3 + 2), 16);
    if (numberIsNaN(s3)) return u3;
    e6[r2 + u3] = s3;
  }
  return u3;
}
function utf8Write(e6, t5, r2, s2) {
  return blitBuffer(utf8ToBytes(t5, e6.length - r2), e6, r2, s2);
}
function asciiWrite(e6, t5, r2, s2) {
  return blitBuffer((function(e7) {
    const t6 = [];
    for (let r3 = 0; r3 < e7.length; ++r3) t6.push(255 & e7.charCodeAt(r3));
    return t6;
  })(t5), e6, r2, s2);
}
function base64Write(e6, t5, r2, s2) {
  return blitBuffer(base64ToBytes(t5), e6, r2, s2);
}
function ucs2Write(e6, t5, r2, s2) {
  return blitBuffer((function(e7, t6) {
    let r3, s3, a3;
    const c3 = [];
    for (let u3 = 0; u3 < e7.length && !((t6 -= 2) < 0); ++u3) r3 = e7.charCodeAt(u3), s3 = r3 >> 8, a3 = r3 % 256, c3.push(a3, s3);
    return c3;
  })(t5, e6.length - r2), e6, r2, s2);
}
function base64Slice(e6, t5, r2) {
  return 0 === t5 && r2 === e6.length ? fromByteArray(e6) : fromByteArray(e6.slice(t5, r2));
}
function utf8Slice(e6, t5, r2) {
  r2 = Math.min(e6.length, r2);
  const s2 = [];
  let a3 = t5;
  for (; a3 < r2; ) {
    const t6 = e6[a3];
    let c3 = null, u3 = t6 > 239 ? 4 : t6 > 223 ? 3 : t6 > 191 ? 2 : 1;
    if (a3 + u3 <= r2) {
      let r3, s3, f2, h3;
      switch (u3) {
        case 1:
          t6 < 128 && (c3 = t6);
          break;
        case 2:
          r3 = e6[a3 + 1], 128 == (192 & r3) && (h3 = (31 & t6) << 6 | 63 & r3, h3 > 127 && (c3 = h3));
          break;
        case 3:
          r3 = e6[a3 + 1], s3 = e6[a3 + 2], 128 == (192 & r3) && 128 == (192 & s3) && (h3 = (15 & t6) << 12 | (63 & r3) << 6 | 63 & s3, h3 > 2047 && (h3 < 55296 || h3 > 57343) && (c3 = h3));
          break;
        case 4:
          r3 = e6[a3 + 1], s3 = e6[a3 + 2], f2 = e6[a3 + 3], 128 == (192 & r3) && 128 == (192 & s3) && 128 == (192 & f2) && (h3 = (15 & t6) << 18 | (63 & r3) << 12 | (63 & s3) << 6 | 63 & f2, h3 > 65535 && h3 < 1114112 && (c3 = h3));
      }
    }
    null === c3 ? (c3 = 65533, u3 = 1) : c3 > 65535 && (c3 -= 65536, s2.push(c3 >>> 10 & 1023 | 55296), c3 = 56320 | 1023 & c3), s2.push(c3), a3 += u3;
  }
  return (function(e7) {
    const t6 = e7.length;
    if (t6 <= Kt2) return String.fromCharCode.apply(String, e7);
    let r3 = "", s3 = 0;
    for (; s3 < t6; ) r3 += String.fromCharCode.apply(String, e7.slice(s3, s3 += Kt2));
    return r3;
  })(s2);
}
function asciiSlice(e6, t5, r2) {
  let s2 = "";
  r2 = Math.min(e6.length, r2);
  for (let a3 = t5; a3 < r2; ++a3) s2 += String.fromCharCode(127 & e6[a3]);
  return s2;
}
function latin1Slice(e6, t5, r2) {
  let s2 = "";
  r2 = Math.min(e6.length, r2);
  for (let a3 = t5; a3 < r2; ++a3) s2 += String.fromCharCode(e6[a3]);
  return s2;
}
function hexSlice(e6, t5, r2) {
  const s2 = e6.length;
  (!t5 || t5 < 0) && (t5 = 0), (!r2 || r2 < 0 || r2 > s2) && (r2 = s2);
  let a3 = "";
  for (let s3 = t5; s3 < r2; ++s3) a3 += Vt2[e6[s3]];
  return a3;
}
function utf16leSlice(e6, t5, r2) {
  const s2 = e6.slice(t5, r2);
  let a3 = "";
  for (let e7 = 0; e7 < s2.length - 1; e7 += 2) a3 += String.fromCharCode(s2[e7] + 256 * s2[e7 + 1]);
  return a3;
}
function checkOffset(e6, t5, r2) {
  if (e6 % 1 != 0 || e6 < 0) throw new RangeError("offset is not uint");
  if (e6 + t5 > r2) throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(e6, t5, r2, s2, a3, c3) {
  if (!Buffer$1.isBuffer(e6)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (t5 > a3 || t5 < c3) throw new RangeError('"value" argument is out of bounds');
  if (r2 + s2 > e6.length) throw new RangeError("Index out of range");
}
function wrtBigUInt64LE(e6, t5, r2, s2, a3) {
  checkIntBI(t5, s2, a3, e6, r2, 7);
  let c3 = Number(t5 & BigInt(4294967295));
  e6[r2++] = c3, c3 >>= 8, e6[r2++] = c3, c3 >>= 8, e6[r2++] = c3, c3 >>= 8, e6[r2++] = c3;
  let u3 = Number(t5 >> BigInt(32) & BigInt(4294967295));
  return e6[r2++] = u3, u3 >>= 8, e6[r2++] = u3, u3 >>= 8, e6[r2++] = u3, u3 >>= 8, e6[r2++] = u3, r2;
}
function wrtBigUInt64BE(e6, t5, r2, s2, a3) {
  checkIntBI(t5, s2, a3, e6, r2, 7);
  let c3 = Number(t5 & BigInt(4294967295));
  e6[r2 + 7] = c3, c3 >>= 8, e6[r2 + 6] = c3, c3 >>= 8, e6[r2 + 5] = c3, c3 >>= 8, e6[r2 + 4] = c3;
  let u3 = Number(t5 >> BigInt(32) & BigInt(4294967295));
  return e6[r2 + 3] = u3, u3 >>= 8, e6[r2 + 2] = u3, u3 >>= 8, e6[r2 + 1] = u3, u3 >>= 8, e6[r2] = u3, r2 + 8;
}
function checkIEEE754(e6, t5, r2, s2, a3, c3) {
  if (r2 + s2 > e6.length) throw new RangeError("Index out of range");
  if (r2 < 0) throw new RangeError("Index out of range");
}
function writeFloat(e6, t5, r2, s2, a3) {
  return t5 = +t5, r2 >>>= 0, a3 || checkIEEE754(e6, 0, r2, 4), write(e6, t5, r2, s2, 23, 4), r2 + 4;
}
function writeDouble(e6, t5, r2, s2, a3) {
  return t5 = +t5, r2 >>>= 0, a3 || checkIEEE754(e6, 0, r2, 8), write(e6, t5, r2, s2, 52, 8), r2 + 8;
}
function E$1(e6, t5, r2) {
  Qt2[e6] = class extends r2 {
    constructor() {
      super(), Object.defineProperty(this, "message", { value: Reflect.apply(t5, this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e6}]`, this.stack, delete this.name;
    }
    get code() {
      return e6;
    }
    set code(e7) {
      Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: e7, writable: true });
    }
    toString() {
      return `${this.name} [${e6}]: ${this.message}`;
    }
  };
}
function addNumericalSeparator(e6) {
  let t5 = "", r2 = e6.length;
  const s2 = "-" === e6[0] ? 1 : 0;
  for (; r2 >= s2 + 4; r2 -= 3) t5 = `_${e6.slice(r2 - 3, r2)}${t5}`;
  return `${e6.slice(0, r2)}${t5}`;
}
function checkIntBI(e6, t5, r2, s2, a3, c3) {
  if (e6 > r2 || e6 < t5) {
    const r3 = "bigint" == typeof t5 ? "n" : "";
    let s3;
    throw s3 = 0 === t5 || t5 === BigInt(0) ? `>= 0${r3} and < 2${r3} ** ${8 * (c3 + 1)}${r3}` : `>= -(2${r3} ** ${8 * (c3 + 1) - 1}${r3}) and < 2 ** ${8 * (c3 + 1) - 1}${r3}`, new Qt2.ERR_OUT_OF_RANGE("value", s3, e6);
  }
  !(function(e7, t6, r3) {
    validateNumber(t6, "offset"), void 0 !== e7[t6] && void 0 !== e7[t6 + r3] || boundsError(t6, e7.length - (r3 + 1));
  })(s2, a3, c3);
}
function validateNumber(e6, t5) {
  if ("number" != typeof e6) throw new Qt2.ERR_INVALID_ARG_TYPE(t5, "number", e6);
}
function boundsError(e6, t5, r2) {
  if (Math.floor(e6) !== e6) throw validateNumber(e6, r2), new Qt2.ERR_OUT_OF_RANGE("offset", "an integer", e6);
  if (t5 < 0) throw new Qt2.ERR_BUFFER_OUT_OF_BOUNDS();
  throw new Qt2.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${t5}`, e6);
}
function utf8ToBytes(e6, t5) {
  let r2;
  t5 = t5 || Number.POSITIVE_INFINITY;
  const s2 = e6.length;
  let a3 = null;
  const c3 = [];
  for (let u3 = 0; u3 < s2; ++u3) {
    if (r2 = e6.charCodeAt(u3), r2 > 55295 && r2 < 57344) {
      if (!a3) {
        if (r2 > 56319) {
          (t5 -= 3) > -1 && c3.push(239, 191, 189);
          continue;
        }
        if (u3 + 1 === s2) {
          (t5 -= 3) > -1 && c3.push(239, 191, 189);
          continue;
        }
        a3 = r2;
        continue;
      }
      if (r2 < 56320) {
        (t5 -= 3) > -1 && c3.push(239, 191, 189), a3 = r2;
        continue;
      }
      r2 = 65536 + (a3 - 55296 << 10 | r2 - 56320);
    } else a3 && (t5 -= 3) > -1 && c3.push(239, 191, 189);
    if (a3 = null, r2 < 128) {
      if ((t5 -= 1) < 0) break;
      c3.push(r2);
    } else if (r2 < 2048) {
      if ((t5 -= 2) < 0) break;
      c3.push(r2 >> 6 | 192, 63 & r2 | 128);
    } else if (r2 < 65536) {
      if ((t5 -= 3) < 0) break;
      c3.push(r2 >> 12 | 224, r2 >> 6 & 63 | 128, 63 & r2 | 128);
    } else {
      if (!(r2 < 1114112)) throw new Error("Invalid code point");
      if ((t5 -= 4) < 0) break;
      c3.push(r2 >> 18 | 240, r2 >> 12 & 63 | 128, r2 >> 6 & 63 | 128, 63 & r2 | 128);
    }
  }
  return c3;
}
function base64ToBytes(e6) {
  return toByteArray((function(e7) {
    if ((e7 = (e7 = e7.split("=")[0]).trim().replace(Gt2, "")).length < 2) return "";
    for (; e7.length % 4 != 0; ) e7 += "=";
    return e7;
  })(e6));
}
function blitBuffer(e6, t5, r2, s2) {
  let a3;
  for (a3 = 0; a3 < s2 && !(a3 + r2 >= t5.length || a3 >= e6.length); ++a3) t5[a3 + r2] = e6[a3];
  return a3;
}
function isInstance(e6, t5) {
  return e6 instanceof t5 || null != e6 && null != e6.constructor && null != e6.constructor.name && e6.constructor.name === t5.name;
}
function numberIsNaN(e6) {
  return e6 != e6;
}
function defineBigIntMethod(e6) {
  return "undefined" == typeof BigInt ? BufferBigIntNotDefined : e6;
}
function BufferBigIntNotDefined() {
  throw new Error("BigInt not supported");
}
function setTimeoutFallback(e6, t5, ...r2) {
  return new Timeout(e6, r2);
}
function setImmediateFallback(e6, ...t5) {
  return new Immediate(e6, t5);
}
function setIntervalFallback(e6, t5, ...r2) {
  return new Timeout(e6, r2);
}
function jsonParseTransform(e6, t5) {
  if (!("__proto__" === e6 || "constructor" === e6 && t5 && "object" == typeof t5 && "prototype" in t5)) return t5;
  !(function(e7) {
    console.warn(`[destr] Dropping "${e7}" key to prevent prototype pollution.`);
  })(e6);
}
function destr(e6, t5 = {}) {
  if ("string" != typeof e6) return e6;
  if ('"' === e6[0] && '"' === e6[e6.length - 1] && -1 === e6.indexOf("\\")) return e6.slice(1, -1);
  const r2 = e6.trim();
  if (r2.length <= 9) switch (r2.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    case "undefined":
      return;
    case "null":
      return null;
    case "nan":
      return Number.NaN;
    case "infinity":
      return Number.POSITIVE_INFINITY;
    case "-infinity":
      return Number.NEGATIVE_INFINITY;
  }
  if (!tr.test(e6)) {
    if (t5.strict) throw new SyntaxError("[destr] Invalid JSON");
    return e6;
  }
  try {
    if (Xt2.test(e6) || er.test(e6)) {
      if (t5.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e6, jsonParseTransform);
    }
    return JSON.parse(e6);
  } catch (r3) {
    if (t5.strict) throw r3;
    return e6;
  }
}
function encodeQueryValue2(e6) {
  return (t5 = "string" == typeof e6 ? e6 : JSON.stringify(e6), encodeURI("" + t5).replace(ur, "|")).replace(ir, "%2B").replace(fr, "+").replace(rr, "%23").replace(nr, "%26").replace(cr, "`").replace(ar, "^").replace(or, "%2F");
  var t5;
}
function encodeQueryKey2(e6) {
  return encodeQueryValue2(e6).replace(sr, "%3D");
}
function decode2(e6 = "") {
  try {
    return decodeURIComponent("" + e6);
  } catch {
    return "" + e6;
  }
}
function decodePath(e6) {
  return decode2(e6.replace(lr, "%252F"));
}
function decodeQueryKey(e6) {
  return decode2(e6.replace(ir, " "));
}
function decodeQueryValue(e6) {
  return decode2(e6.replace(ir, " "));
}
function parseQuery(e6 = "") {
  const t5 = /* @__PURE__ */ Object.create(null);
  "?" === e6[0] && (e6 = e6.slice(1));
  for (const r2 of e6.split("&")) {
    const e7 = r2.match(/([^=]+)=?(.*)/) || [];
    if (e7.length < 2) continue;
    const s2 = decodeQueryKey(e7[1]);
    if ("__proto__" === s2 || "constructor" === s2) continue;
    const a3 = decodeQueryValue(e7[2] || "");
    void 0 === t5[s2] ? t5[s2] = a3 : Array.isArray(t5[s2]) ? t5[s2].push(a3) : t5[s2] = [t5[s2], a3];
  }
  return t5;
}
function stringifyQuery2(e6) {
  return Object.keys(e6).filter((t5) => void 0 !== e6[t5]).map((t5) => {
    return r2 = t5, "number" != typeof (s2 = e6[t5]) && "boolean" != typeof s2 || (s2 = String(s2)), s2 ? Array.isArray(s2) ? s2.map((e7) => `${encodeQueryKey2(r2)}=${encodeQueryValue2(e7)}`).join("&") : `${encodeQueryKey2(r2)}=${encodeQueryValue2(s2)}` : encodeQueryKey2(r2);
    var r2, s2;
  }).filter(Boolean).join("&");
}
function hasProtocol(e6, t5 = {}) {
  return "boolean" == typeof t5 && (t5 = { acceptRelative: t5 }), t5.strict ? hr.test(e6) : dr.test(e6) || !!t5.acceptRelative && pr.test(e6);
}
function isScriptProtocol(e6) {
  return !!e6 && gr.test(e6);
}
function hasTrailingSlash(e6 = "", t5) {
  return t5 ? yr.test(e6) : e6.endsWith("/");
}
function withoutTrailingSlash(e6 = "", t5) {
  if (!t5) return (hasTrailingSlash(e6) ? e6.slice(0, -1) : e6) || "/";
  if (!hasTrailingSlash(e6, true)) return e6 || "/";
  let r2 = e6, s2 = "";
  const a3 = e6.indexOf("#");
  -1 !== a3 && (r2 = e6.slice(0, a3), s2 = e6.slice(a3));
  const [c3, ...u3] = r2.split("?");
  return ((c3.endsWith("/") ? c3.slice(0, -1) : c3) || "/") + (u3.length > 0 ? `?${u3.join("?")}` : "") + s2;
}
function withTrailingSlash(e6 = "", t5) {
  if (!t5) return e6.endsWith("/") ? e6 : e6 + "/";
  if (hasTrailingSlash(e6, true)) return e6 || "/";
  let r2 = e6, s2 = "";
  const a3 = e6.indexOf("#");
  if (-1 !== a3 && (r2 = e6.slice(0, a3), s2 = e6.slice(a3), !r2)) return s2;
  const [c3, ...u3] = r2.split("?");
  return c3 + "/" + (u3.length > 0 ? `?${u3.join("?")}` : "") + s2;
}
function withLeadingSlash(e6 = "") {
  return (function(e7 = "") {
    return e7.startsWith("/");
  })(e6) ? e6 : "/" + e6;
}
function withoutBase(e6, t5) {
  if (isEmptyURL(t5)) return e6;
  const r2 = withoutTrailingSlash(t5);
  if (!e6.startsWith(r2)) return e6;
  const s2 = e6[r2.length];
  if (s2 && "/" !== s2 && "?" !== s2) return e6;
  const a3 = e6.slice(r2.length);
  return "/" === a3[0] ? a3 : "/" + a3;
}
function withQuery(e6, t5) {
  const r2 = parseURL2(e6), s2 = { ...parseQuery(r2.search), ...t5 };
  return r2.search = stringifyQuery2(s2), (function(e7) {
    const t6 = e7.pathname || "", r3 = e7.search ? (e7.search.startsWith("?") ? "" : "?") + e7.search : "", s3 = e7.hash || "", a3 = e7.auth ? e7.auth + "@" : "", c3 = e7.host || "", u3 = e7.protocol || e7[wr] ? (e7.protocol || "") + "//" : "";
    return u3 + a3 + c3 + t6 + r3 + s3;
  })(r2);
}
function getQuery$1(e6) {
  return parseQuery(parseURL2(e6).search);
}
function isEmptyURL(e6) {
  return !e6 || "/" === e6;
}
function joinURL(e6, ...t5) {
  let r2 = e6 || "";
  for (const e7 of t5.filter((e8) => /* @__PURE__ */ (function(e9) {
    return e9 && "/" !== e9;
  })(e8))) if (r2) {
    const t6 = e7.replace(mr, "");
    r2 = withTrailingSlash(r2) + t6;
  } else r2 = e7;
  return r2;
}
function joinRelativeURL(...e6) {
  const t5 = /\/(?!\/)/, r2 = e6.filter(Boolean), s2 = [];
  let a3 = 0;
  for (const e7 of r2) if (e7 && "/" !== e7) {
    for (const [r3, c4] of e7.split(t5).entries()) if (c4 && "." !== c4) if (".." !== c4) 1 === r3 && s2[s2.length - 1]?.endsWith(":/") ? s2[s2.length - 1] += "/" + c4 : (s2.push(c4), a3++);
    else {
      if (1 === s2.length && hasProtocol(s2[0])) continue;
      s2.pop(), a3--;
    }
  }
  let c3 = s2.join("/");
  return a3 >= 0 ? r2[0]?.startsWith("/") && !c3.startsWith("/") ? c3 = "/" + c3 : r2[0]?.startsWith("./") && !c3.startsWith("./") && (c3 = "./" + c3) : c3 = "../".repeat(-1 * a3) + c3, r2[r2.length - 1]?.endsWith("/") && !c3.endsWith("/") && (c3 += "/"), c3;
}
function parseURL2(e6 = "", t5) {
  const r2 = e6.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (r2) {
    const [, e7, t6 = ""] = r2;
    return { protocol: e7.toLowerCase(), pathname: t6, href: e7 + t6, auth: "", host: "", search: "", hash: "" };
  }
  if (!hasProtocol(e6, { acceptRelative: true })) return parsePath(e6);
  const [, s2 = "", a3, c3 = ""] = e6.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, u3 = "", f2 = ""] = c3.match(/([^#/?]*)(.*)?/) || [];
  "file:" === s2 && (f2 = f2.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: h3, search: d3, hash: g3 } = parsePath(f2);
  return { protocol: s2.toLowerCase(), auth: a3 ? a3.slice(0, Math.max(0, a3.length - 1)) : "", host: u3, pathname: h3, search: d3, hash: g3, [wr]: !s2 };
}
function parsePath(e6 = "") {
  const [t5 = "", r2 = "", s2 = ""] = (e6.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return { pathname: t5, search: r2, hash: s2 };
}
function createRouter$1(e6 = {}) {
  const t5 = { options: e6, rootNode: createRadixNode(), staticRoutesMap: {} }, normalizeTrailingSlash = /* @__PURE__ */ __name((t6) => e6.strictTrailingSlash ? t6 : t6.replace(/\/$/, "") || "/", "normalizeTrailingSlash");
  if (e6.routes) for (const r2 in e6.routes) insert(t5, normalizeTrailingSlash(r2), e6.routes[r2]);
  return { ctx: t5, lookup: /* @__PURE__ */ __name((e7) => (function(e8, t6) {
    const r2 = e8.staticRoutesMap[t6];
    if (r2) return r2.data;
    const s2 = t6.split("/"), a3 = {};
    let c3 = false, u3 = null, f2 = e8.rootNode, h3 = null;
    for (let e9 = 0; e9 < s2.length; e9++) {
      const t7 = s2[e9];
      null !== f2.wildcardChildNode && (u3 = f2.wildcardChildNode, h3 = s2.slice(e9).join("/"));
      const r3 = f2.children.get(t7);
      if (void 0 === r3) {
        if (f2 && f2.placeholderChildren.length > 1) {
          const t8 = s2.length - e9;
          f2 = f2.placeholderChildren.find((e10) => e10.maxDepth === t8) || null;
        } else f2 = f2.placeholderChildren[0] || null;
        if (!f2) break;
        f2.paramName && (a3[f2.paramName] = t7), c3 = true;
      } else f2 = r3;
    }
    null !== f2 && null !== f2.data || null === u3 || (f2 = u3, a3[f2.paramName || "_"] = h3, c3 = true);
    if (!f2) return null;
    if (c3) return { ...f2.data, params: c3 ? a3 : void 0 };
    return f2.data;
  })(t5, normalizeTrailingSlash(e7)), "lookup"), insert: /* @__PURE__ */ __name((e7, r2) => insert(t5, normalizeTrailingSlash(e7), r2), "insert"), remove: /* @__PURE__ */ __name((e7) => (function(e8, t6) {
    let r2 = false;
    const s2 = t6.split("/");
    let a3 = e8.rootNode;
    for (const e9 of s2) if (a3 = a3.children.get(e9), !a3) return r2;
    if (a3.data) {
      const e9 = s2.at(-1) || "";
      a3.data = null, 0 === Object.keys(a3.children).length && a3.parent && (a3.parent.children.delete(e9), a3.parent.wildcardChildNode = null, a3.parent.placeholderChildren = []), r2 = true;
    }
    return r2;
  })(t5, normalizeTrailingSlash(e7)), "remove") };
}
function insert(e6, t5, r2) {
  let s2 = true;
  const a3 = t5.split("/");
  let c3 = e6.rootNode, u3 = 0;
  const f2 = [c3];
  for (const e7 of a3) {
    let t6;
    if (t6 = c3.children.get(e7)) c3 = t6;
    else {
      const r3 = getNodeType(e7);
      t6 = createRadixNode({ type: r3, parent: c3 }), c3.children.set(e7, t6), r3 === _r ? (t6.paramName = "*" === e7 ? "_" + u3++ : e7.slice(1), c3.placeholderChildren.push(t6), s2 = false) : r3 === vr && (c3.wildcardChildNode = t6, t6.paramName = e7.slice(3) || "_", s2 = false), f2.push(t6), c3 = t6;
    }
  }
  for (const [e7, t6] of f2.entries()) t6.maxDepth = Math.max(f2.length - e7, t6.maxDepth || 0);
  return c3.data = r2, true === s2 && (e6.staticRoutesMap[t5] = c3), c3;
}
function createRadixNode(e6 = {}) {
  return { type: e6.type || br, maxDepth: 0, parent: e6.parent || null, children: /* @__PURE__ */ new Map(), data: e6.data || null, paramName: e6.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function getNodeType(e6) {
  return e6.startsWith("**") ? vr : ":" === e6[0] || "*" === e6 ? _r : br;
}
function toRouteMatcher(e6) {
  return /* @__PURE__ */ (function(e7, t5) {
    return { ctx: { table: e7 }, matchAll: /* @__PURE__ */ __name((r2) => _matchRoutes(r2, e7, t5), "matchAll") };
  })(_routerNodeToTable("", e6.ctx.rootNode), e6.ctx.options.strictTrailingSlash);
}
function _matchRoutes(e6, t5, r2) {
  true !== r2 && e6.endsWith("/") && (e6 = e6.slice(0, -1) || "/");
  const s2 = [];
  for (const [r3, a4] of _sortRoutesMap(t5.wildcard)) (e6 === r3 || e6.startsWith(r3 + "/")) && s2.push(a4);
  for (const [r3, a4] of _sortRoutesMap(t5.dynamic)) if (e6.startsWith(r3 + "/")) {
    const t6 = "/" + e6.slice(r3.length).split("/").splice(2).join("/");
    s2.push(..._matchRoutes(t6, a4));
  }
  const a3 = t5.static.get(e6);
  return a3 && s2.push(a3), s2.filter(Boolean);
}
function _sortRoutesMap(e6) {
  return [...e6.entries()].sort((e7, t5) => e7[0].length - t5[0].length);
}
function _routerNodeToTable(e6, t5) {
  const r2 = { static: /* @__PURE__ */ new Map(), wildcard: /* @__PURE__ */ new Map(), dynamic: /* @__PURE__ */ new Map() };
  return (/* @__PURE__ */ __name(function _addNode(e7, t6) {
    if (e7) if (t6.type !== br || e7.includes("*") || e7.includes(":")) {
      if (t6.type === vr) r2.wildcard.set(e7.replace("/**", ""), t6.data);
      else if (t6.type === _r) {
        const s2 = _routerNodeToTable("", t6);
        return t6.data && s2.static.set("/", t6.data), void r2.dynamic.set(e7.replace(/\/\*|\/:\w+/, ""), s2);
      }
    } else t6.data && r2.static.set(e7, t6.data);
    for (const [r3, s2] of t6.children.entries()) _addNode(`${e7}/${r3}`.replace("//", "/"), s2);
  }, "_addNode"))(e6, t5), r2;
}
function isPlainObject2(e6) {
  if (null === e6 || "object" != typeof e6) return false;
  const t5 = Object.getPrototypeOf(e6);
  return (null === t5 || t5 === Object.prototype || null === Object.getPrototypeOf(t5)) && (!(Symbol.iterator in e6) && (!(Symbol.toStringTag in e6) || "[object Module]" === Object.prototype.toString.call(e6)));
}
function _defu(e6, t5, r2 = ".", s2) {
  if (!isPlainObject2(t5)) return _defu(e6, {}, r2, s2);
  const a3 = Object.assign({}, t5);
  for (const t6 in e6) {
    if ("__proto__" === t6 || "constructor" === t6) continue;
    const c3 = e6[t6];
    null != c3 && (s2 && s2(a3, t6, c3, r2) || (Array.isArray(c3) && Array.isArray(a3[t6]) ? a3[t6] = [...c3, ...a3[t6]] : isPlainObject2(c3) && isPlainObject2(a3[t6]) ? a3[t6] = _defu(c3, a3[t6], (r2 ? `${r2}.` : "") + t6.toString(), s2) : a3[t6] = c3));
  }
  return a3;
}
function createDefu(e6) {
  return (...t5) => t5.reduce((t6, r2) => _defu(t6, r2, "", e6), {});
}
function o3(e6) {
  throw new Error(`${e6} is not implemented yet!`);
}
function p(e6) {
  const t5 = {};
  for (const [r2, s2] of Object.entries(e6)) r2 && (t5[r2] = (Array.isArray(s2) ? s2 : [s2]).filter(Boolean));
  return t5;
}
function v2(e6 = {}) {
  if (e6 instanceof Headers) return e6;
  const t5 = new Headers();
  for (const [r2, s2] of Object.entries(e6)) if (void 0 !== s2) {
    if (Array.isArray(s2)) {
      for (const e7 of s2) t5.append(r2, String(e7));
      continue;
    }
    t5.set(r2, String(s2));
  }
  return t5;
}
async function b2(e6, t5) {
  const r2 = new y2(), s2 = new w2(r2);
  let a3;
  if (r2.url = t5.url?.toString() || "/", !r2.url.startsWith("/")) {
    const e7 = new URL(r2.url);
    a3 = e7.host, r2.url = e7.pathname + e7.search + e7.hash;
  }
  r2.method = t5.method || "GET", r2.headers = (function(e7 = {}) {
    const t6 = new Tr(), r3 = Array.isArray(e7) || (function(e8) {
      return "function" == typeof e8?.entries;
    })(e7) ? e7 : Object.entries(e7);
    for (const [e8, s3] of r3) if (s3) {
      if (void 0 === t6[e8]) {
        t6[e8] = s3;
        continue;
      }
      t6[e8] = [...Array.isArray(t6[e8]) ? t6[e8] : [t6[e8]], ...Array.isArray(s3) ? s3 : [s3]];
    }
    return t6;
  })(t5.headers || {}), r2.headers.host || (r2.headers.host = t5.host || a3 || "localhost"), r2.connection.encrypted = r2.connection.encrypted || "https" === t5.protocol, r2.body = t5.body || null, r2.__unenv__ = t5.context, await e6(r2, s2);
  let c3 = s2._data;
  (xr.has(s2.statusCode) || "HEAD" === r2.method.toUpperCase()) && (c3 = null, delete s2._headers["content-length"]);
  const u3 = { status: s2.statusCode, statusText: s2.statusMessage, headers: s2._headers, body: c3 };
  return r2.destroy(), s2.destroy(), u3;
}
function hasProp(e6, t5) {
  try {
    return t5 in e6;
  } catch {
    return false;
  }
}
function createError(e6) {
  if ("string" == typeof e6) return new H3Error(e6);
  if (isError(e6)) return e6;
  const t5 = new H3Error(e6.message ?? e6.statusMessage ?? "", { cause: e6.cause || e6 });
  if (hasProp(e6, "stack")) try {
    Object.defineProperty(t5, "stack", { get: /* @__PURE__ */ __name(() => e6.stack, "get") });
  } catch {
    try {
      t5.stack = e6.stack;
    } catch {
    }
  }
  if (e6.data && (t5.data = e6.data), e6.statusCode ? t5.statusCode = sanitizeStatusCode(e6.statusCode, t5.statusCode) : e6.status && (t5.statusCode = sanitizeStatusCode(e6.status, t5.statusCode)), e6.statusMessage ? t5.statusMessage = e6.statusMessage : e6.statusText && (t5.statusMessage = e6.statusText), t5.statusMessage) {
    const e7 = t5.statusMessage;
    sanitizeStatusMessage(t5.statusMessage) !== e7 && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
  }
  return void 0 !== e6.fatal && (t5.fatal = e6.fatal), void 0 !== e6.unhandled && (t5.unhandled = e6.unhandled), t5;
}
function isError(e6) {
  return true === e6?.constructor?.__h3_error__;
}
function getQuery(e6) {
  return getQuery$1(e6.path || "");
}
function getRequestHeaders(e6) {
  const t5 = {};
  for (const r2 in e6.node.req.headers) {
    const s2 = e6.node.req.headers[r2];
    t5[r2] = Array.isArray(s2) ? s2.filter(Boolean).join(", ") : s2;
  }
  return t5;
}
function readRawBody(e6, t5 = "utf8") {
  !(function(e7, t6) {
    if (!(function(e8, t7) {
      if ("string" == typeof t7) {
        if (e8.method === t7) return true;
      } else if (t7.includes(e8.method)) return true;
      return false;
    })(e7, t6)) throw createError({ statusCode: 405, statusMessage: "HTTP method is not allowed." });
  })(e6, kr);
  const r2 = e6._requestBody || e6.web?.request?.body || e6.node.req[Sr] || e6.node.req.rawBody || e6.node.req.body;
  if (r2) {
    const e7 = Promise.resolve(r2).then((e8) => Yt2.isBuffer(e8) ? e8 : "function" == typeof e8.pipeTo ? new Promise((t6, r3) => {
      const s3 = [];
      e8.pipeTo(new WritableStream({ write(e9) {
        s3.push(e9);
      }, close() {
        t6(Yt2.concat(s3));
      }, abort(e9) {
        r3(e9);
      } })).catch(r3);
    }) : "function" == typeof e8.pipe ? new Promise((t6, r3) => {
      const s3 = [];
      e8.on("data", (e9) => {
        s3.push(e9);
      }).on("end", () => {
        t6(Yt2.concat(s3));
      }).on("error", r3);
    }) : e8.constructor === Object ? Yt2.from(JSON.stringify(e8)) : e8 instanceof URLSearchParams ? Yt2.from(e8.toString()) : e8 instanceof FormData ? new Response(e8).bytes().then((e9) => Yt2.from(e9)) : Yt2.from(e8));
    return t5 ? e7.then((e8) => e8.toString(t5)) : e7;
  }
  if (!Number.parseInt(e6.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(String(e6.node.req.headers["transfer-encoding"] ?? ""))) return Promise.resolve(void 0);
  const s2 = e6.node.req[Sr] = new Promise((t6, r3) => {
    const s3 = [];
    e6.node.req.on("error", (e7) => {
      r3(e7);
    }).on("data", (e7) => {
      s3.push(e7);
    }).on("end", () => {
      t6(Yt2.concat(s3));
    });
  });
  return t5 ? s2.then((e7) => e7.toString(t5)) : s2;
}
function handleCacheHeaders(e6, t5) {
  const r2 = ["public", ...t5.cacheControls || []];
  let s2 = false;
  if (void 0 !== t5.maxAge && r2.push("max-age=" + +t5.maxAge, "s-maxage=" + +t5.maxAge), t5.modifiedTime) {
    const r3 = new Date(t5.modifiedTime), a3 = e6.node.req.headers["if-modified-since"];
    e6.node.res.setHeader("last-modified", r3.toUTCString()), a3 && new Date(a3) >= r3 && (s2 = true);
  }
  if (t5.etag) {
    e6.node.res.setHeader("etag", t5.etag);
    e6.node.req.headers["if-none-match"] === t5.etag && (s2 = true);
  }
  return e6.node.res.setHeader("cache-control", r2.join(", ")), !!s2 && (e6.node.res.statusCode = 304, e6.handled || e6.node.res.end(), true);
}
function sanitizeStatusMessage(e6 = "") {
  return e6.replace($r, "");
}
function sanitizeStatusCode(e6, t5 = 200) {
  return e6 ? ("string" == typeof e6 && (e6 = Number.parseInt(e6, 10)), e6 < 100 || e6 > 999 ? t5 : e6) : t5;
}
function splitCookiesString(e6) {
  if (Array.isArray(e6)) return e6.flatMap((e7) => splitCookiesString(e7));
  if ("string" != typeof e6) return [];
  const t5 = [];
  let r2, s2, a3, c3, u3, f2 = 0;
  const skipWhitespace = /* @__PURE__ */ __name(() => {
    for (; f2 < e6.length && /\s/.test(e6.charAt(f2)); ) f2 += 1;
    return f2 < e6.length;
  }, "skipWhitespace"), notSpecialChar = /* @__PURE__ */ __name(() => (s2 = e6.charAt(f2), "=" !== s2 && ";" !== s2 && "," !== s2), "notSpecialChar");
  for (; f2 < e6.length; ) {
    for (r2 = f2, u3 = false; skipWhitespace(); ) if (s2 = e6.charAt(f2), "," === s2) {
      for (a3 = f2, f2 += 1, skipWhitespace(), c3 = f2; f2 < e6.length && notSpecialChar(); ) f2 += 1;
      f2 < e6.length && "=" === e6.charAt(f2) ? (u3 = true, f2 = c3, t5.push(e6.slice(r2, a3)), r2 = f2) : f2 = a3 + 1;
    } else f2 += 1;
    (!u3 || f2 >= e6.length) && t5.push(e6.slice(r2));
  }
  return t5;
}
function send(e6, t5, r2) {
  return r2 && (function(e7, t6) {
    t6 && 304 !== e7.node.res.statusCode && !e7.node.res.getHeader("content-type") && e7.node.res.setHeader("content-type", t6);
  })(e6, r2), new Promise((r3) => {
    Lr(() => {
      e6.handled || e6.node.res.end(t5), r3();
    });
  });
}
function setResponseStatus(e6, t5, r2) {
  t5 && (e6.node.res.statusCode = sanitizeStatusCode(t5, e6.node.res.statusCode)), r2 && (e6.node.res.statusMessage = sanitizeStatusMessage(r2));
}
function getResponseStatus(e6) {
  return e6.node.res.statusCode;
}
function getResponseStatusText(e6) {
  return e6.node.res.statusMessage;
}
function setResponseHeaders(e6, t5) {
  for (const [r2, s2] of Object.entries(t5)) e6.node.res.setHeader(r2, s2);
}
function setResponseHeader(e6, t5, r2) {
  e6.node.res.setHeader(t5, r2);
}
function appendResponseHeader(e6, t5, r2) {
  let s2 = e6.node.res.getHeader(t5);
  s2 ? (Array.isArray(s2) || (s2 = [s2.toString()]), e6.node.res.setHeader(t5, [...s2, r2])) : e6.node.res.setHeader(t5, r2);
}
function sendStream(e6, t5) {
  if (!t5 || "object" != typeof t5) throw new Error("[h3] Invalid stream provided.");
  if (e6.node.res._data = t5, !e6.node.res.socket) return e6._handled = true, Promise.resolve();
  if (hasProp(t5, "pipeTo") && "function" == typeof t5.pipeTo) return t5.pipeTo(new WritableStream({ write(t6) {
    e6.node.res.write(t6);
  } })).then(() => {
    e6.node.res.end();
  });
  if (hasProp(t5, "pipe") && "function" == typeof t5.pipe) return new Promise((r2, s2) => {
    t5.pipe(e6.node.res), t5.on && (t5.on("end", () => {
      e6.node.res.end(), r2();
    }), t5.on("error", (e7) => {
      s2(e7);
    })), e6.node.res.on("close", () => {
      t5.abort && t5.abort();
    });
  });
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(e6, t5) {
  for (const [r2, s2] of t5.headers) "set-cookie" === r2 ? e6.node.res.appendHeader(r2, splitCookiesString(s2)) : e6.node.res.setHeader(r2, s2);
  if (t5.status && (e6.node.res.statusCode = sanitizeStatusCode(t5.status, e6.node.res.statusCode)), t5.statusText && (e6.node.res.statusMessage = sanitizeStatusMessage(t5.statusText)), t5.redirected && e6.node.res.setHeader("location", t5.url), t5.body) return sendStream(e6, t5.body);
  e6.node.res.end();
}
async function proxyRequest(e6, t5, r2 = {}) {
  let s2, a3;
  Pr.has(e6.method) && (r2.streamRequest ? (s2 = (function(e7) {
    if (!kr.includes(e7.method)) return;
    const t6 = e7.web?.request?.body || e7._requestBody;
    return t6 || (Sr in e7.node.req || "rawBody" in e7.node.req || "body" in e7.node.req || "__unenv__" in e7.node.req ? new ReadableStream({ async start(t7) {
      const r3 = await readRawBody(e7, false);
      r3 && t7.enqueue(r3), t7.close();
    } }) : new ReadableStream({ start: /* @__PURE__ */ __name((t7) => {
      e7.node.req.on("data", (e8) => {
        t7.enqueue(e8);
      }), e7.node.req.on("end", () => {
        t7.close();
      }), e7.node.req.on("error", (e8) => {
        t7.error(e8);
      });
    }, "start") }));
  })(e6), a3 = "half") : s2 = await readRawBody(e6, false).catch(() => {
  }));
  const c3 = r2.fetchOptions?.method || e6.method, u3 = (function(e7, ...t6) {
    const r3 = t6.filter(Boolean);
    if (0 === r3.length) return e7;
    const s3 = new Headers(e7);
    for (const e8 of r3) {
      const t7 = Array.isArray(e8) ? e8 : "function" == typeof e8.entries ? e8.entries() : Object.entries(e8);
      for (const [e9, r4] of t7) void 0 !== r4 && s3.set(e9, r4);
    }
    return s3;
  })(getProxyRequestHeaders(e6, { host: t5.startsWith("/") }), r2.fetchOptions?.headers, r2.headers);
  return (async function(e7, t6, r3 = {}) {
    let s3;
    try {
      s3 = await _getFetch(r3.fetch)(t6, { headers: r3.headers, ignoreResponseError: true, ...r3.fetchOptions });
    } catch (e8) {
      throw createError({ status: 502, statusMessage: "Bad Gateway", cause: e8 });
    }
    e7.node.res.statusCode = sanitizeStatusCode(s3.status, e7.node.res.statusCode), e7.node.res.statusMessage = sanitizeStatusMessage(s3.statusText);
    const a4 = [];
    for (const [t7, r4] of s3.headers.entries()) "content-encoding" !== t7 && "content-length" !== t7 && ("set-cookie" !== t7 ? e7.node.res.setHeader(t7, r4) : a4.push(...splitCookiesString(r4)));
    a4.length > 0 && e7.node.res.setHeader("set-cookie", a4.map((e8) => (r3.cookieDomainRewrite && (e8 = rewriteCookieProperty(e8, r3.cookieDomainRewrite, "domain")), r3.cookiePathRewrite && (e8 = rewriteCookieProperty(e8, r3.cookiePathRewrite, "path")), e8)));
    r3.onResponse && await r3.onResponse(e7, s3);
    if (void 0 !== s3._data) return s3._data;
    if (e7.handled) return;
    if (false === r3.sendStream) {
      const t7 = new Uint8Array(await s3.arrayBuffer());
      return e7.node.res.end(t7);
    }
    if (s3.body) for await (const t7 of s3.body) e7.node.res.write(t7);
    return e7.node.res.end();
  })(e6, t5, { ...r2, fetchOptions: { method: c3, body: s2, duplex: a3, ...r2.fetchOptions, headers: u3 } });
}
function getProxyRequestHeaders(e6, t5) {
  const r2 = /* @__PURE__ */ Object.create(null), s2 = getRequestHeaders(e6);
  for (const e7 in s2) (!Ur.has(e7) || "host" === e7 && t5?.host) && (r2[e7] = s2[e7]);
  return r2;
}
function fetchWithEvent(e6, t5, r2, s2) {
  return _getFetch(s2?.fetch)(t5, { ...r2, context: r2?.context || e6.context, headers: { ...getProxyRequestHeaders(e6, { host: "string" == typeof t5 && t5.startsWith("/") }), ...r2?.headers } });
}
function _getFetch(e6) {
  if (e6) return e6;
  if (globalThis.fetch) return globalThis.fetch;
  throw new Error("fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js.");
}
function rewriteCookieProperty(e6, t5, r2) {
  const s2 = "string" == typeof t5 ? { "*": t5 } : t5;
  return e6.replace(new RegExp(`(;\\s*${r2}=)([^;]+)`, "gi"), (e7, t6, r3) => {
    let a3;
    if (r3 in s2) a3 = s2[r3];
    else {
      if (!("*" in s2)) return e7;
      a3 = s2["*"];
    }
    return a3 ? t6 + a3 : "";
  });
}
function isEvent(e6) {
  return hasProp(e6, "__is_event__");
}
function createEvent(e6, t5) {
  return new H3Event(e6, t5);
}
function defineEventHandler(e6) {
  if ("function" == typeof e6) return e6.__is_handler__ = true, e6;
  const t5 = { onRequest: _normalizeArray(e6.onRequest), onBeforeResponse: _normalizeArray(e6.onBeforeResponse) }, _handler = /* @__PURE__ */ __name((r2) => (async function(e7, t6, r3) {
    if (r3.onRequest) {
      for (const t7 of r3.onRequest) if (await t7(e7), e7.handled) return;
    }
    const s2 = await t6(e7), a3 = { body: s2 };
    if (r3.onBeforeResponse) for (const t7 of r3.onBeforeResponse) await t7(e7, a3);
    return a3.body;
  })(r2, e6.handler, t5), "_handler");
  return _handler.__is_handler__ = true, _handler.__resolve__ = e6.handler.__resolve__, _handler.__websocket__ = e6.websocket, _handler;
}
function _normalizeArray(e6) {
  return e6 ? Array.isArray(e6) ? e6 : [e6] : void 0;
}
function isEventHandler(e6) {
  return hasProp(e6, "__is_handler__");
}
function toEventHandler(e6, t5, r2) {
  return isEventHandler(e6) || console.warn("[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.", r2 && "/" !== r2 ? `
     Route: ${r2}` : "", `
     Handler: ${e6}`), e6;
}
function createApp2(e6 = {}) {
  const t5 = [], r2 = (function(e7, t6) {
    const r3 = t6.debug ? 2 : void 0;
    return Nr(async (s3) => {
      s3.node.req.originalUrl = s3.node.req.originalUrl || s3.node.req.url || "/";
      const a4 = s3._path || s3.node.req.url || "/";
      let c4;
      t6.onRequest && await t6.onRequest(s3);
      for (const u3 of e7) {
        if (u3.route.length > 1) {
          if (!a4.startsWith(u3.route)) continue;
          c4 = a4.slice(u3.route.length) || "/";
        } else c4 = a4;
        if (u3.match && !u3.match(c4, s3)) continue;
        s3._path = c4, s3.node.req.url = c4;
        const e8 = await u3.handler(s3), f2 = void 0 === e8 ? void 0 : await e8;
        if (void 0 !== f2) {
          const e9 = { body: f2 };
          return t6.onBeforeResponse && (s3._onBeforeResponseCalled = true, await t6.onBeforeResponse(s3, e9)), await handleHandlerResponse(s3, e9.body, r3), void (t6.onAfterResponse && (s3._onAfterResponseCalled = true, await t6.onAfterResponse(s3, e9)));
        }
        if (s3.handled) return void (t6.onAfterResponse && (s3._onAfterResponseCalled = true, await t6.onAfterResponse(s3, void 0)));
      }
      if (!s3.handled) throw createError({ statusCode: 404, statusMessage: `Cannot find any path matching ${s3.path || "/"}.` });
      t6.onAfterResponse && (s3._onAfterResponseCalled = true, await t6.onAfterResponse(s3, void 0));
    });
  })(t5, e6), s2 = /* @__PURE__ */ (function(e7) {
    return async (t6) => {
      let r3;
      for (const s3 of e7) {
        if ("/" === s3.route && !s3.handler.__resolve__) continue;
        if (!t6.startsWith(s3.route)) continue;
        if (r3 = t6.slice(s3.route.length) || "/", s3.match && !s3.match(r3, void 0)) continue;
        let e8 = { route: s3.route, handler: s3.handler };
        if (e8.handler.__resolve__) {
          const t7 = await e8.handler.__resolve__(r3);
          if (!t7) continue;
          e8 = { ...e8, ...t7, route: joinURL(e8.route || "/", t7.route || "/") };
        }
        return e8;
      }
    };
  })(t5);
  r2.__resolve__ = s2;
  const a3 = /* @__PURE__ */ (function(e7) {
    let t6;
    return () => (t6 || (t6 = e7()), t6);
  })(() => {
    return t6 = s2, { ...e6.websocket, async resolve(e7) {
      const r3 = e7.request?.url || e7.url || "/", { pathname: s3 } = "string" == typeof r3 ? parseURL2(r3) : r3, a4 = await t6(s3);
      return a4?.handler?.__websocket__ || {};
    } };
    var t6;
  }), c3 = { use: /* @__PURE__ */ __name((e7, t6, r3) => use(c3, e7, t6, r3), "use"), resolve: s2, handler: r2, stack: t5, options: e6, get websocket() {
    return a3();
  } };
  return c3;
}
function use(e6, t5, r2, s2) {
  if (Array.isArray(t5)) for (const a3 of t5) use(e6, a3, r2, s2);
  else if (Array.isArray(r2)) for (const a3 of r2) use(e6, t5, a3, s2);
  else "string" == typeof t5 ? e6.stack.push(normalizeLayer({ ...s2, route: t5, handler: r2 })) : "function" == typeof t5 ? e6.stack.push(normalizeLayer({ ...r2, handler: t5 })) : e6.stack.push(normalizeLayer({ ...t5 }));
  return e6;
}
function normalizeLayer(e6) {
  let t5 = e6.handler;
  return t5.handler && (t5 = t5.handler), e6.lazy ? t5 = lazyEventHandler(t5) : isEventHandler(t5) || (t5 = toEventHandler(t5, 0, e6.route)), { route: withoutTrailingSlash(e6.route), match: e6.match, handler: t5 };
}
function handleHandlerResponse(e6, t5, r2) {
  if (null === t5) return (function(e7, t6) {
    if (e7.handled) return;
    t6 || 200 === e7.node.res.statusCode || (t6 = e7.node.res.statusCode);
    const r3 = sanitizeStatusCode(t6, 204);
    204 === r3 && e7.node.res.removeHeader("content-length"), e7.node.res.writeHead(r3), e7.node.res.end();
  })(e6);
  if (t5) {
    if (s2 = t5, "undefined" != typeof Response && s2 instanceof Response) return sendWebResponse(e6, t5);
    if ((function(e7) {
      if (!e7 || "object" != typeof e7) return false;
      if ("function" == typeof e7.pipe) {
        if ("function" == typeof e7._read) return true;
        if ("function" == typeof e7.abort) return true;
      }
      return "function" == typeof e7.pipeTo;
    })(t5)) return sendStream(e6, t5);
    if (t5.buffer) return send(e6, t5);
    if (t5.arrayBuffer && "function" == typeof t5.arrayBuffer) return t5.arrayBuffer().then((r3) => send(e6, Yt2.from(r3), t5.type));
    if (t5 instanceof Error) throw createError(t5);
    if ("function" == typeof t5.end) return true;
  }
  var s2;
  const a3 = typeof t5;
  if ("string" === a3) return send(e6, t5, Cr.html);
  if ("object" === a3 || "boolean" === a3 || "number" === a3) return send(e6, JSON.stringify(t5, void 0, r2), Cr.json);
  if ("bigint" === a3) return send(e6, t5.toString(), Cr.json);
  throw createError({ statusCode: 500, statusMessage: `[h3] Cannot send ${a3} as response.` });
}
function toNodeListener(e6) {
  return async function(t5, r2) {
    const s2 = createEvent(t5, r2);
    try {
      await e6.handler(s2);
    } catch (t6) {
      const r3 = createError(t6);
      if (isError(t6) || (r3.unhandled = true), setResponseStatus(s2, r3.statusCode, r3.statusMessage), e6.options.onError && await e6.options.onError(r3, s2), s2.handled) return;
      (r3.unhandled || r3.fatal) && console.error("[h3]", r3.fatal ? "[fatal]" : "[unhandled]", r3), e6.options.onBeforeResponse && !s2._onBeforeResponseCalled && await e6.options.onBeforeResponse(s2, { body: r3 }), await (function(e7, t7, r4) {
        if (e7.handled) return;
        const s3 = isError(t7) ? t7 : createError(t7), a3 = { statusCode: s3.statusCode, statusMessage: s3.statusMessage, stack: [], data: s3.data };
        if (r4 && (a3.stack = (s3.stack || "").split("\n").map((e8) => e8.trim())), e7.handled) return;
        setResponseStatus(e7, Number.parseInt(s3.statusCode), s3.statusMessage), e7.node.res.setHeader("content-type", Cr.json), e7.node.res.end(JSON.stringify(a3, void 0, 2));
      })(s2, r3, !!e6.options.debug), e6.options.onAfterResponse && !s2._onAfterResponseCalled && await e6.options.onAfterResponse(s2, { body: r3 });
    }
  };
}
function flatHooks2(e6, t5 = {}, r2) {
  for (const s2 in e6) {
    const a3 = e6[s2], c3 = r2 ? `${r2}:${s2}` : s2;
    "object" == typeof a3 && null !== a3 ? flatHooks2(a3, t5, c3) : "function" == typeof a3 && (t5[c3] = a3);
  }
  return t5;
}
function serialTaskCaller2(e6, t5) {
  const r2 = t5.shift(), s2 = jr(r2);
  return e6.reduce((e7, r3) => e7.then(() => s2.run(() => r3(...t5))), Promise.resolve());
}
function parallelTaskCaller2(e6, t5) {
  const r2 = t5.shift(), s2 = jr(r2);
  return Promise.all(e6.map((e7) => s2.run(() => e7(...t5))));
}
function callEachWith2(e6, t5) {
  for (const r2 of [...e6]) r2(t5);
}
function createHooks() {
  return new Hookable();
}
function isPayloadMethod(e6 = "GET") {
  return qr.has(e6.toUpperCase());
}
function resolveFetchOptions(e6, t5, r2, s2) {
  const a3 = (function(e7, t6, r3) {
    if (!t6) return new r3(e7);
    const s3 = new r3(t6);
    if (e7) for (const [t7, a4] of Symbol.iterator in e7 || Array.isArray(e7) ? e7 : new r3(e7)) s3.set(t7, a4);
    return s3;
  })(t5?.headers ?? e6?.headers, r2?.headers, s2);
  let c3;
  return (r2?.query || r2?.params || t5?.params || t5?.query) && (c3 = { ...r2?.params, ...r2?.query, ...t5?.params, ...t5?.query }), { ...r2, ...t5, query: c3, params: c3, headers: a3 };
}
async function callHooks2(e6, t5) {
  if (t5) if (Array.isArray(t5)) for (const r2 of t5) await r2(e6);
  else await t5(e6);
}
function createFetch(e6 = {}) {
  const { fetch: t5 = globalThis.fetch, Headers: r2 = globalThis.Headers, AbortController: s2 = globalThis.AbortController } = e6;
  async function onError(e7) {
    const t6 = e7.error && "AbortError" === e7.error.name && !e7.options.timeout || false;
    if (false !== e7.options.retry && !t6) {
      let t7;
      t7 = "number" == typeof e7.options.retry ? e7.options.retry : isPayloadMethod(e7.options.method) ? 0 : 1;
      const r4 = e7.response && e7.response.status || 500;
      if (t7 > 0 && (Array.isArray(e7.options.retryStatusCodes) ? e7.options.retryStatusCodes.includes(r4) : zr.has(r4))) {
        const r5 = "function" == typeof e7.options.retryDelay ? e7.options.retryDelay(e7) : e7.options.retryDelay || 0;
        return r5 > 0 && await new Promise((e8) => setTimeout(e8, r5)), $fetchRaw(e7.request, { ...e7.options, retry: t7 - 1 });
      }
    }
    const r3 = (function(e8) {
      const t7 = e8.error?.message || e8.error?.toString() || "", r4 = e8.request?.method || e8.options?.method || "GET", s3 = e8.request?.url || String(e8.request) || "/", a3 = `[${r4}] ${JSON.stringify(s3)}`, c3 = e8.response ? `${e8.response.status} ${e8.response.statusText}` : "<no response>", u3 = new FetchError(`${a3}: ${c3}${t7 ? ` ${t7}` : ""}`, e8.error ? { cause: e8.error } : void 0);
      for (const t8 of ["request", "options", "response"]) Object.defineProperty(u3, t8, { get: /* @__PURE__ */ __name(() => e8[t8], "get") });
      for (const [t8, r5] of [["data", "_data"], ["status", "status"], ["statusCode", "status"], ["statusText", "statusText"], ["statusMessage", "statusText"]]) Object.defineProperty(u3, t8, { get: /* @__PURE__ */ __name(() => e8.response && e8.response[r5], "get") });
      return u3;
    })(e7);
    throw Error.captureStackTrace && Error.captureStackTrace(r3, $fetchRaw), r3;
  }
  __name(onError, "onError");
  const $fetchRaw = /* @__PURE__ */ __name(async function(a3, c3 = {}) {
    const u3 = { request: a3, options: resolveFetchOptions(a3, c3, e6.defaults, r2), response: void 0, error: void 0 };
    if (u3.options.method && (u3.options.method = u3.options.method.toUpperCase()), u3.options.onRequest && (await callHooks2(u3, u3.options.onRequest), u3.options.headers instanceof r2 || (u3.options.headers = new r2(u3.options.headers || {}))), "string" == typeof u3.request && (u3.options.baseURL && (u3.request = (function(e7, t6) {
      if (isEmptyURL(t6) || hasProtocol(e7)) return e7;
      const r3 = withoutTrailingSlash(t6);
      if (e7.startsWith(r3)) {
        const t7 = e7[r3.length];
        if (!t7 || "/" === t7 || "?" === t7) return e7;
      }
      return joinURL(r3, e7);
    })(u3.request, u3.options.baseURL)), u3.options.query && (u3.request = withQuery(u3.request, u3.options.query), delete u3.options.query), "query" in u3.options && delete u3.options.query, "params" in u3.options && delete u3.options.params), u3.options.body && isPayloadMethod(u3.options.method)) if ((function(e7) {
      if (void 0 === e7) return false;
      const t6 = typeof e7;
      return "string" === t6 || "number" === t6 || "boolean" === t6 || null === t6 || "object" === t6 && (!!Array.isArray(e7) || !e7.buffer && !(e7 instanceof FormData || e7 instanceof URLSearchParams) && (e7.constructor && "Object" === e7.constructor.name || "function" == typeof e7.toJSON));
    })(u3.options.body)) {
      const e7 = u3.options.headers.get("content-type");
      "string" != typeof u3.options.body && (u3.options.body = "application/x-www-form-urlencoded" === e7 ? new URLSearchParams(u3.options.body).toString() : JSON.stringify(u3.options.body)), e7 || u3.options.headers.set("content-type", "application/json"), u3.options.headers.has("accept") || u3.options.headers.set("accept", "application/json");
    } else ("pipeTo" in u3.options.body && "function" == typeof u3.options.body.pipeTo || "function" == typeof u3.options.body.pipe) && ("duplex" in u3.options || (u3.options.duplex = "half"));
    let f2;
    if (!u3.options.signal && u3.options.timeout) {
      const e7 = new s2();
      f2 = setTimeout(() => {
        const t6 = new Error("[TimeoutError]: The operation was aborted due to timeout");
        t6.name = "TimeoutError", t6.code = 23, e7.abort(t6);
      }, u3.options.timeout), u3.options.signal = e7.signal;
    }
    try {
      u3.response = await t5(u3.request, u3.options);
    } catch (e7) {
      return u3.error = e7, u3.options.onRequestError && await callHooks2(u3, u3.options.onRequestError), await onError(u3);
    } finally {
      f2 && clearTimeout(f2);
    }
    if ((u3.response.body || u3.response._bodyInit) && !Kr.has(u3.response.status) && "HEAD" !== u3.options.method) {
      const e7 = (u3.options.parseResponse ? "json" : u3.options.responseType) || (function(e8 = "") {
        if (!e8) return "json";
        const t6 = e8.split(";").shift() || "";
        return Fr.test(t6) ? "json" : "text/event-stream" === t6 ? "stream" : Dr.has(t6) || t6.startsWith("text/") ? "text" : "blob";
      })(u3.response.headers.get("content-type") || "");
      switch (e7) {
        case "json": {
          const e8 = await u3.response.text(), t6 = u3.options.parseResponse || destr;
          u3.response._data = t6(e8);
          break;
        }
        case "stream":
          u3.response._data = u3.response.body || u3.response._bodyInit;
          break;
        default:
          u3.response._data = await u3.response[e7]();
      }
    }
    return u3.options.onResponse && await callHooks2(u3, u3.options.onResponse), !u3.options.ignoreResponseError && u3.response.status >= 400 && u3.response.status < 600 ? (u3.options.onResponseError && await callHooks2(u3, u3.options.onResponseError), await onError(u3)) : u3.response;
  }, "$fetchRaw"), $fetch = /* @__PURE__ */ __name(async function(e7, t6) {
    return (await $fetchRaw(e7, t6))._data;
  }, "$fetch");
  return $fetch.raw = $fetchRaw, $fetch.native = (...e7) => t5(...e7), $fetch.create = (t6 = {}, r3 = {}) => createFetch({ ...e6, ...r3, defaults: { ...e6.defaults, ...r3.defaults, ...t6 } }), $fetch;
}
function asyncCall(e6, ...t5) {
  try {
    return (r2 = e6(...t5)) && "function" == typeof r2.then ? r2 : Promise.resolve(r2);
  } catch (e7) {
    return Promise.reject(e7);
  }
  var r2;
}
function stringify2(e6) {
  if (/* @__PURE__ */ (function(e7) {
    const t5 = typeof e7;
    return null === e7 || "object" !== t5 && "function" !== t5;
  })(e6)) return String(e6);
  if ((function(e7) {
    const t5 = Object.getPrototypeOf(e7);
    return !t5 || t5.isPrototypeOf(Object);
  })(e6) || Array.isArray(e6)) return JSON.stringify(e6);
  if ("function" == typeof e6.toJSON) return stringify2(e6.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
function serializeRaw(e6) {
  return "string" == typeof e6 ? e6 : Zr + (function(e7) {
    if (globalThis.Buffer) return Yt2.from(e7).toString("base64");
    return globalThis.btoa(String.fromCodePoint(...e7));
  })(e6);
}
function deserializeRaw(e6) {
  return "string" != typeof e6 ? e6 : e6.startsWith(Zr) ? (function(e7) {
    if (globalThis.Buffer) return Yt2.from(e7, "base64");
    return Uint8Array.from(globalThis.atob(e7), (e8) => e8.codePointAt(0));
  })(e6.slice(7)) : e6;
}
function normalizeKey$1(e6) {
  return e6 && e6.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...e6) {
  return normalizeKey$1(e6.join(":"));
}
function normalizeBaseKey(e6) {
  return (e6 = normalizeKey$1(e6)) ? e6 + ":" : "";
}
function watch2(e6, t5, r2) {
  return e6.watch ? e6.watch((e7, s2) => t5(e7, r2 + s2)) : () => {
  };
}
async function dispose(e6) {
  "function" == typeof e6.dispose && await asyncCall(e6.dispose);
}
function useStorage(e6 = "") {
  return e6 ? (function(e7, t5) {
    if (!(t5 = normalizeBaseKey(t5))) return e7;
    const r2 = { ...e7 };
    for (const s2 of Xr) r2[s2] = (r3 = "", ...a3) => e7[s2](t5 + r3, ...a3);
    return r2.getKeys = (r3 = "", ...s2) => e7.getKeys(t5 + r3, ...s2).then((e8) => e8.map((e9) => e9.slice(t5.length))), r2.keys = r2.getKeys, r2.getItems = async (r3, s2) => {
      const a3 = r3.map((e8) => "string" == typeof e8 ? t5 + e8 : { ...e8, key: t5 + e8.key });
      return (await e7.getItems(a3, s2)).map((e8) => ({ key: e8.key.slice(t5.length), value: e8.value }));
    }, r2.setItems = async (r3, s2) => {
      const a3 = r3.map((e8) => ({ key: t5 + e8.key, value: e8.value, options: e8.options }));
      return e7.setItems(a3, s2);
    }, r2;
  })(rn2, e6) : rn2;
}
function hash(e6) {
  return (function(e7) {
    return new k2().finalize(e7).toBase64();
  })("string" == typeof e6 ? e6 : (function(e7) {
    const t5 = new an2();
    return t5.dispatch(e7), t5.buff;
  })(e6)).replace(/[-_]/g, "").slice(0, 10);
}
function defineCachedFunction(e6, t5 = {}) {
  t5 = { name: "_", base: "/cache", swr: true, maxAge: 1, ...t5 };
  const r2 = {}, s2 = t5.group || "nitro/functions", a3 = t5.name || e6.name || "_", c3 = t5.integrity || hash([e6, t5]), u3 = t5.validate || ((e7) => void 0 !== e7.value);
  return async (...f2) => {
    if (await t5.shouldBypassCache?.(...f2)) return e6(...f2);
    const h3 = await (t5.getKey || getKey)(...f2), d3 = await t5.shouldInvalidateCache?.(...f2), g3 = await (async function(e7, f3, h4, d4) {
      const g4 = [t5.base, s2, a3, e7 + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
      let m4 = await useStorage().getItem(g4).catch((e8) => {
        console.error("[cache] Cache read error.", e8), useNitroApp().captureError(e8, { event: d4, tags: ["cache"] });
      }) || {};
      if ("object" != typeof m4) {
        m4 = {};
        const e8 = new Error("Malformed data read from cache.");
        console.error("[cache]", e8), useNitroApp().captureError(e8, { event: d4, tags: ["cache"] });
      }
      const _4 = 1e3 * (t5.maxAge ?? 0);
      _4 && (m4.expires = Date.now() + _4);
      const E3 = h4 || m4.integrity !== c3 || _4 && Date.now() - (m4.mtime || 0) > _4 || false === u3(m4), R3 = E3 ? (async () => {
        const s3 = r2[e7];
        s3 || (void 0 !== m4.value && (t5.staleMaxAge || 0) >= 0 && false === t5.swr && (m4.value = void 0, m4.integrity = void 0, m4.mtime = void 0, m4.expires = void 0), r2[e7] = Promise.resolve(f3()));
        try {
          m4.value = await r2[e7];
        } catch (t6) {
          throw s3 || delete r2[e7], t6;
        }
        if (!s3 && (m4.mtime = Date.now(), m4.integrity = c3, delete r2[e7], false !== u3(m4))) {
          let e8;
          t5.maxAge && !t5.swr && (e8 = { ttl: t5.maxAge });
          const r3 = useStorage().setItem(g4, m4, e8).catch((e9) => {
            console.error("[cache] Cache write error.", e9), useNitroApp().captureError(e9, { event: d4, tags: ["cache"] });
          });
          d4?.waitUntil && d4.waitUntil(r3);
        }
      })() : Promise.resolve();
      return void 0 === m4.value ? await R3 : E3 && d4 && d4.waitUntil && d4.waitUntil(R3), t5.swr && false !== u3(m4) ? (R3.catch((e8) => {
        console.error("[cache] SWR handler error.", e8), useNitroApp().captureError(e8, { event: d4, tags: ["cache"] });
      }), m4) : R3.then(() => m4);
    })(h3, () => e6(...f2), d3, f2[0] && isEvent(f2[0]) ? f2[0] : void 0);
    let m3 = g3.value;
    return t5.transform && (m3 = await t5.transform(g3, ...f2) || m3), m3;
  };
}
function getKey(...e6) {
  return e6.length > 0 ? hash(e6) : "";
}
function escapeKey(e6) {
  return String(e6).replace(/\W/g, "");
}
function cloneWithProxy(e6, t5) {
  return new Proxy(e6, { get: /* @__PURE__ */ __name((e7, r2, s2) => r2 in t5 ? t5[r2] : Reflect.get(e7, r2, s2), "get"), set: /* @__PURE__ */ __name((e7, r2, s2, a3) => r2 in t5 ? (t5[r2] = s2, true) : Reflect.set(e7, r2, s2, a3), "set") });
}
function klona(e6) {
  if ("object" != typeof e6) return e6;
  var t5, r2, s2 = Object.prototype.toString.call(e6);
  if ("[object Object]" === s2) {
    if (e6.constructor !== Object && "function" == typeof e6.constructor) for (t5 in r2 = new e6.constructor(), e6) e6.hasOwnProperty(t5) && r2[t5] !== e6[t5] && (r2[t5] = klona(e6[t5]));
    else for (t5 in r2 = {}, e6) "__proto__" === t5 ? Object.defineProperty(r2, t5, { value: klona(e6[t5]), configurable: true, enumerable: true, writable: true }) : r2[t5] = klona(e6[t5]);
    return r2;
  }
  if ("[object Array]" === s2) {
    for (t5 = e6.length, r2 = Array(t5); t5--; ) r2[t5] = klona(e6[t5]);
    return r2;
  }
  return "[object Set]" === s2 ? (r2 = /* @__PURE__ */ new Set(), e6.forEach(function(e7) {
    r2.add(klona(e7));
  }), r2) : "[object Map]" === s2 ? (r2 = /* @__PURE__ */ new Map(), e6.forEach(function(e7, t6) {
    r2.set(klona(t6), klona(e7));
  }), r2) : "[object Date]" === s2 ? /* @__PURE__ */ new Date(+e6) : "[object RegExp]" === s2 ? ((r2 = new RegExp(e6.source, e6.flags)).lastIndex = e6.lastIndex, r2) : "[object DataView]" === s2 ? new e6.constructor(klona(e6.buffer)) : "[object ArrayBuffer]" === s2 ? e6.slice(0) : "Array]" === s2.slice(-6) ? new e6.constructor(e6) : e6;
}
function isUppercase(e6 = "") {
  if (!un2.test(e6)) return e6 !== e6.toLowerCase();
}
function kebabCase(e6, t5) {
  return e6 ? (Array.isArray(e6) ? e6 : (function(e7) {
    const t6 = fn2, r2 = [];
    if (!e7 || "string" != typeof e7) return r2;
    let s2, a3, c3 = "";
    for (const u3 of e7) {
      const e8 = t6.includes(u3);
      if (true === e8) {
        r2.push(c3), c3 = "", s2 = void 0;
        continue;
      }
      const f2 = isUppercase(u3);
      if (false === a3) {
        if (false === s2 && true === f2) {
          r2.push(c3), c3 = u3, s2 = f2;
          continue;
        }
        if (true === s2 && false === f2 && c3.length > 1) {
          const e9 = c3.at(-1);
          r2.push(c3.slice(0, Math.max(0, c3.length - 1))), c3 = e9 + u3, s2 = f2;
          continue;
        }
      }
      c3 += u3, s2 = f2, a3 = e8;
    }
    return r2.push(c3), r2;
  })(e6)).map((e7) => e7.toLowerCase()).join(t5) : "";
}
function getEnv(e6, t5) {
  const r2 = (s2 = e6, kebabCase(s2 || "", "_")).toUpperCase();
  var s2;
  return destr(M2.env[t5.prefix + r2] ?? M2.env[t5.altPrefix + r2]);
}
function _isObject(e6) {
  return "object" == typeof e6 && !Array.isArray(e6);
}
function applyEnv(e6, t5, r2 = "") {
  for (const s2 in e6) {
    const a3 = r2 ? `${r2}_${s2}` : s2, c3 = getEnv(a3, t5);
    _isObject(e6[s2]) ? _isObject(c3) ? (e6[s2] = { ...e6[s2], ...c3 }, applyEnv(e6[s2], t5, a3)) : void 0 === c3 ? applyEnv(e6[s2], t5, a3) : e6[s2] = c3 ?? e6[s2] : e6[s2] = c3 ?? e6[s2], t5.envExpansion && "string" == typeof e6[s2] && (e6[s2] = _expandFromEnv(e6[s2]));
  }
  return e6;
}
function _expandFromEnv(e6) {
  return e6.replace(ln2, (e7, t5) => M2.env[t5] || e7);
}
function useRuntimeConfig2(e6) {
  if (!e6) return pn2;
  if (e6.context.nitro.runtimeConfig) return e6.context.nitro.runtimeConfig;
  const t5 = klona(hn2);
  return applyEnv(t5, dn2), e6.context.nitro.runtimeConfig = t5, t5;
}
function _deepFreeze(e6) {
  const t5 = Object.getOwnPropertyNames(e6);
  for (const r2 of t5) {
    const t6 = e6[r2];
    t6 && "object" == typeof t6 && _deepFreeze(t6);
  }
  return Object.freeze(e6);
}
function executeAsync(e6) {
  const t5 = [];
  for (const e7 of bn2) {
    const r3 = e7();
    r3 && t5.push(r3);
  }
  const restore = /* @__PURE__ */ __name(() => {
    for (const e7 of t5) e7();
  }, "restore");
  let r2 = e6();
  return r2 && "object" == typeof r2 && "catch" in r2 && (r2 = r2.catch((e7) => {
    throw restore(), e7;
  })), [r2, restore];
}
function createRouteRulesHandler(e6) {
  return Nr((t5) => {
    const r2 = getRouteRules(t5);
    if (r2.headers && Or(t5, r2.headers), r2.redirect) {
      let e7 = r2.redirect.to;
      if (e7.endsWith("/**")) {
        let s2 = t5.path;
        const a3 = r2.redirect._redirectStripBase;
        a3 && (s2 = withoutBase(s2, a3)), e7 = joinURL(e7.slice(0, -3), s2);
      } else if (t5.path.includes("?")) {
        e7 = withQuery(e7, getQuery$1(t5.path));
      }
      return (function(e8, t6, r3 = 302) {
        return e8.node.res.statusCode = sanitizeStatusCode(r3, e8.node.res.statusCode), e8.node.res.setHeader("location", t6), send(e8, `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${t6.replace(/"/g, "%22")}"></head></html>`, Cr.html);
      })(t5, e7, r2.redirect.statusCode);
    }
    if (r2.proxy) {
      let s2 = r2.proxy.to;
      if (s2.endsWith("/**")) {
        let e7 = t5.path;
        const a3 = r2.proxy._proxyStripBase;
        a3 && (e7 = withoutBase(e7, a3)), s2 = joinURL(s2.slice(0, -3), e7);
      } else if (t5.path.includes("?")) {
        s2 = withQuery(s2, getQuery$1(t5.path));
      }
      return proxyRequest(t5, s2, { fetch: e6.localFetch, ...r2.proxy });
    }
  });
}
function getRouteRules(e6) {
  return e6.context._nitro = e6.context._nitro || {}, e6.context._nitro.routeRules || (e6.context._nitro.routeRules = getRouteRulesForPath(withoutBase(e6.path.split("?")[0], useRuntimeConfig2().app.baseURL))), e6.context._nitro.routeRules;
}
function getRouteRulesForPath(e6) {
  return Er({}, ...vn2.matchAll(e6).reverse());
}
function joinHeaders(e6) {
  return Array.isArray(e6) ? e6.join(", ") : String(e6);
}
function normalizeCookieHeader(e6 = "") {
  return splitCookiesString(joinHeaders(e6));
}
function normalizeCookieHeaders(e6) {
  const t5 = new Headers();
  for (const [r2, s2] of e6) if ("set-cookie" === r2) for (const e7 of normalizeCookieHeader(s2)) t5.append("set-cookie", e7);
  else t5.set(r2, joinHeaders(s2));
  return t5;
}
function hasReqHeader(e6, t5, r2) {
  const s2 = (function(e7, t6) {
    return getRequestHeaders(e7)[t6.toLowerCase()];
  })(e6, t5);
  return s2 && "string" == typeof s2 && s2.toLowerCase().includes(r2);
}
function defaultHandler(e6, t5, r2) {
  const s2 = e6.unhandled || e6.fatal, a3 = e6.statusCode || 500, c3 = e6.statusMessage || "Server Error", u3 = (function(e7, t6 = {}) {
    const r3 = (function(e8, t7 = {}) {
      if (t7.xForwardedHost) {
        const t8 = e8.node.req.headers["x-forwarded-host"], r4 = (t8 || "").split(",").shift()?.trim();
        if (r4) return r4;
      }
      return e8.node.req.headers.host || "localhost";
    })(e7, t6), s3 = (function(e8, t7 = {}) {
      return false !== t7.xForwardedProto && "https" === e8.node.req.headers["x-forwarded-proto"] || e8.node.req.connection?.encrypted ? "https" : "http";
    })(e7, t6), a4 = (e7.node.req.originalUrl || e7.path).replace(/^[/\\]+/g, "/");
    return new URL(a4, `${s3}://${r3}`);
  })(t5, { xForwardedHost: true, xForwardedProto: true });
  if (404 === a3) {
    const e7 = "/";
    if (/^\/[^/]/.test(e7) && !u3.pathname.startsWith(e7)) {
      return { status: 302, statusText: "Found", headers: { location: `${e7}${u3.pathname.slice(1)}${u3.search}` }, body: "Redirecting..." };
    }
  }
  if (s2 && !r2?.silent) {
    const r3 = [e6.unhandled && "[unhandled]", e6.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${r3} [${t5.method}] ${u3}
`, e6);
  }
  const f2 = { "content-type": "application/json", "x-content-type-options": "nosniff", "x-frame-options": "DENY", "referrer-policy": "no-referrer", "content-security-policy": "script-src 'none'; frame-ancestors 'none';" };
  setResponseStatus(t5, a3, c3), 404 !== a3 && (function(e7, t6) {
    return e7.node.res.getHeader(t6);
  })(t5, "cache-control") || (f2["cache-control"] = "no-cache");
  return { status: a3, statusText: c3, headers: f2, body: { error: true, url: u3.href, statusCode: a3, statusMessage: c3, message: s2 ? "Server Error" : e6.message, data: s2 ? void 0 : e6.data } };
}
function useNitroApp() {
  return An2;
}
function defineRenderHandler(e6) {
  const t5 = useRuntimeConfig2();
  return Nr(async (r2) => {
    const s2 = useNitroApp(), a3 = { event: r2, render: e6, response: void 0 };
    if (await s2.hooks.callHook("render:before", a3), !a3.response) {
      if (r2.path === `${t5.app.baseURL}favicon.ico`) return setResponseHeader(r2, "Content-Type", "image/x-icon"), send(r2, "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      if (a3.response = await a3.render(r2), !a3.response) {
        const e7 = getResponseStatus(r2);
        return setResponseStatus(r2, 200 === e7 ? 500 : e7), send(r2, "No response returned from render handler: " + r2.path);
      }
    }
    return await s2.hooks.callHook("render:response", a3.response, a3), a3.response.headers && setResponseHeaders(r2, a3.response.headers), (a3.response.statusCode || a3.response.statusMessage) && setResponseStatus(r2, a3.response.statusCode, a3.response.statusMessage), a3.response.body;
  });
}
var e5, t4, r, s, inspect, a2, c2, u2, f, h2, d2, g2, m2, _3, E2, R2, B2, I2, T2, x2, S2, C3, _EventEmitter, EventEmitterAsyncResource, EventEmitterReferencingAsyncResource, on$1, once$1, addAbortListener, getEventListeners, getMaxListeners$1, $2, FixedCircularBuffer, FixedQueue, ReadStream, WriteStream, L2, Process, O2, P2, _getEnv, U2, N2, H2, M2, j2, W2, q4, D2, F2, z3, K3, Q3, G2, V2, Y3, J3, Z3, X3, ee3, te3, re3, ne3, oe3, se3, ie3, ae3, ce3, ue3, fe3, le3, he3, de3, pe3, ge3, ye3, me3, we3, be3, ve3, _e3, Ee3, Re3, Be3, Ae3, Ie3, Te3, xe3, Se3, ke3, Ce3, $e3, Le3, Oe3, Pe3, Ue3, Ne3, He3, Me3, je3, We3, qe3, De3, Fe3, ze3, Ke3, Qe3, Ge3, Ve3, Ye3, Je3, Ze3, Xe3, et3, tt3, rt3, nt3, ot3, st2, it2, at2, ct2, ut2, ft2, lt2, ht2, dt2, pt2, gt2, yt2, mt2, wt2, bt2, vt2, _t2, Et2, Rt2, Bt2, At2, It2, Tt2, xt2, St2, kt2, Ct2, $t2, Lt2, Ot2, Pt2, Ut2, Nt2, Ht2, Mt2, jt2, Wt2, qt2, Dt2, Ft2, zt2, Kt2, Qt2, Gt2, Vt2, Yt2, Timeout, Immediate, Jt2, Zt2, Xt2, er, tr, rr, nr, or, sr, ir, ar, cr, ur, fr, lr, hr, dr, pr, gr, yr, mr, wr, br, vr, _r, Er, Rr, i2, Br, Ar, Ir, A3, y2, w2, Tr, xr, H3Error, Sr, kr, Cr, $r, Lr, Or, Pr, Ur, H3Event, Nr, lazyEventHandler, Hr, Mr, jr, Hookable, Wr, FetchError, qr, Dr, Fr, zr, Kr, Qr, Gr, Vr, Yr, Jr, Zr, Xr, memory, en2, normalizeKey2, tn2, rn2, nn2, on2, sn2, k2, l, an2, cachedEventHandler, cn2, un2, fn2, ln2, hn2, dn2, pn2, gn2, yn2, mn2, getContext, wn2, bn2, vn2, _n2, En, Rn2, _lazy_AT8W4n, Bn, An2, In, Tn2, xn2;
var init_nitro = __esm({
  ".output/server/chunks/nitro/nitro.mjs"() {
    init_modules_watch_stub();
    "global" in globalThis || (globalThis.global = globalThis);
    Object.assign(/* @__PURE__ */ Object.create(null), { NONE: 0, DIRHANDLE: 1, DNSCHANNEL: 2, ELDHISTOGRAM: 3, FILEHANDLE: 4, FILEHANDLECLOSEREQ: 5, BLOBREADER: 6, FSEVENTWRAP: 7, FSREQCALLBACK: 8, FSREQPROMISE: 9, GETADDRINFOREQWRAP: 10, GETNAMEINFOREQWRAP: 11, HEAPSNAPSHOT: 12, HTTP2SESSION: 13, HTTP2STREAM: 14, HTTP2PING: 15, HTTP2SETTINGS: 16, HTTPINCOMINGMESSAGE: 17, HTTPCLIENTREQUEST: 18, JSSTREAM: 19, JSUDPWRAP: 20, MESSAGEPORT: 21, PIPECONNECTWRAP: 22, PIPESERVERWRAP: 23, PIPEWRAP: 24, PROCESSWRAP: 25, PROMISE: 26, QUERYWRAP: 27, QUIC_ENDPOINT: 28, QUIC_LOGSTREAM: 29, QUIC_PACKET: 30, QUIC_SESSION: 31, QUIC_STREAM: 32, QUIC_UDP: 33, SHUTDOWNWRAP: 34, SIGNALWRAP: 35, STATWATCHER: 36, STREAMPIPE: 37, TCPCONNECTWRAP: 38, TCPSERVERWRAP: 39, TCPWRAP: 40, TTYWRAP: 41, UDPSENDWRAP: 42, UDPWRAP: 43, SIGINTWATCHDOG: 44, WORKER: 45, WORKERHEAPSNAPSHOT: 46, WRITEWRAP: 47, ZLIB: 48, CHECKPRIMEREQUEST: 49, PBKDF2REQUEST: 50, KEYPAIRGENREQUEST: 51, KEYGENREQUEST: 52, KEYEXPORTREQUEST: 53, CIPHERREQUEST: 54, DERIVEBITSREQUEST: 55, HASHREQUEST: 56, RANDOMBYTESREQUEST: 57, RANDOMPRIMEREQUEST: 58, SCRYPTREQUEST: 59, SIGNREQUEST: 60, TLSWRAP: 61, VERIFYREQUEST: 62 });
    e5 = 100;
    t4 = globalThis.AsyncResource || class {
      __unenv__ = true;
      type;
      _asyncId;
      _triggerAsyncId;
      constructor(t5, r2 = 0) {
        this.type = t5, this._asyncId = -1 * e5++, this._triggerAsyncId = "number" == typeof r2 ? r2 : r2?.triggerAsyncId;
      }
      static bind(e6, r2, s2) {
        return new t4(r2 ?? "anonymous").bind(e6);
      }
      bind(e6, t5) {
        const binded = /* @__PURE__ */ __name((...r2) => this.runInAsyncScope(e6, t5, ...r2), "binded");
        return binded.asyncResource = this, binded;
      }
      runInAsyncScope(e6, t5, ...r2) {
        return e6.apply(t5, r2);
      }
      emitDestroy() {
        return this;
      }
      asyncId() {
        return this._asyncId;
      }
      triggerAsyncId() {
        return this._triggerAsyncId;
      }
    };
    r = 10;
    s = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    inspect = /* @__PURE__ */ __name((e6, t5) => e6, "inspect");
    a2 = Error;
    c2 = Error;
    u2 = Error;
    f = Error;
    h2 = Error;
    d2 = /* @__PURE__ */ Symbol.for("nodejs.rejection");
    g2 = /* @__PURE__ */ Symbol.for("kCapture");
    m2 = /* @__PURE__ */ Symbol.for("events.errorMonitor");
    _3 = /* @__PURE__ */ Symbol.for("shapeMode");
    E2 = /* @__PURE__ */ Symbol.for("events.maxEventTargetListeners");
    R2 = /* @__PURE__ */ Symbol.for("kEnhanceStackBeforeInspector");
    B2 = /* @__PURE__ */ Symbol.for("nodejs.watermarkData");
    I2 = /* @__PURE__ */ Symbol.for("kEventEmitter");
    T2 = /* @__PURE__ */ Symbol.for("kAsyncResource");
    x2 = /* @__PURE__ */ Symbol.for("kFirstEventParam");
    S2 = /* @__PURE__ */ Symbol.for("kResistStopPropagation");
    C3 = /* @__PURE__ */ Symbol.for("events.maxEventTargetListenersWarned");
    _EventEmitter = class __EventEmitter {
      static {
        __name(this, "_EventEmitter");
      }
      _events = void 0;
      _eventsCount = 0;
      _maxListeners = r;
      [g2] = false;
      [_3] = false;
      static captureRejectionSymbol = d2;
      static errorMonitor = m2;
      static kMaxEventTargetListeners = E2;
      static kMaxEventTargetListenersWarned = C3;
      static usingDomains = false;
      static get on() {
        return on$1;
      }
      static get once() {
        return once$1;
      }
      static get getEventListeners() {
        return getEventListeners;
      }
      static get getMaxListeners() {
        return getMaxListeners$1;
      }
      static get addAbortListener() {
        return addAbortListener;
      }
      static get EventEmitterAsyncResource() {
        return EventEmitterAsyncResource;
      }
      static get EventEmitter() {
        return __EventEmitter;
      }
      static setMaxListeners(e6 = r, ...t5) {
        if (0 === t5.length) r = e6;
        else for (const r2 of t5) if (isEventTarget(r2)) r2[E2] = e6, r2[C3] = false;
        else {
          if ("function" != typeof r2.setMaxListeners) throw new u2("eventTargets", ["EventEmitter", "EventTarget"], r2);
          r2.setMaxListeners(e6);
        }
      }
      static listenerCount(e6, t5) {
        if ("function" == typeof e6.listenerCount) return e6.listenerCount(t5);
        __EventEmitter.prototype.listenerCount.call(e6, t5);
      }
      static init() {
        throw new Error("EventEmitter.init() is not implemented.");
      }
      static get captureRejections() {
        return this[g2];
      }
      static set captureRejections(e6) {
        this[g2] = e6;
      }
      static get defaultMaxListeners() {
        return r;
      }
      static set defaultMaxListeners(e6) {
        r = e6;
      }
      constructor(e6) {
        void 0 === this._events || this._events === Object.getPrototypeOf(this)._events ? (this._events = { __proto__: null }, this._eventsCount = 0, this[_3] = false) : this[_3] = true, this._maxListeners = this._maxListeners || void 0, this[g2] = e6?.captureRejections ? Boolean(e6.captureRejections) : __EventEmitter.prototype[g2];
      }
      setMaxListeners(e6) {
        return this._maxListeners = e6, this;
      }
      getMaxListeners() {
        return _getMaxListeners(this);
      }
      emit(e6, ...t5) {
        let r2 = "error" === e6;
        const s2 = this._events;
        if (void 0 !== s2) r2 && void 0 !== s2[m2] && this.emit(m2, ...t5), r2 = r2 && void 0 === s2.error;
        else if (!r2) return false;
        if (r2) {
          let e7, r3;
          if (t5.length > 0 && (e7 = t5[0]), e7 instanceof Error) {
            try {
              const t6 = {};
              Error.captureStackTrace?.(t6, __EventEmitter.prototype.emit), Object.defineProperty(e7, R2, { __proto__: null, value: Function.prototype.bind(enhanceStackTrace, this, e7, t6), configurable: true });
            } catch {
            }
            throw e7;
          }
          try {
            r3 = inspect(e7);
          } catch {
            r3 = e7;
          }
          const s3 = new c2(r3);
          throw s3.context = e7, s3;
        }
        const a3 = s2[e6];
        if (void 0 === a3) return false;
        if ("function" == typeof a3) {
          const r3 = a3.apply(this, t5);
          null != r3 && addCatch(this, r3, e6, t5);
        } else {
          const r3 = a3.length, s3 = arrayClone(a3);
          for (let a4 = 0; a4 < r3; ++a4) {
            const r4 = s3[a4].apply(this, t5);
            null != r4 && addCatch(this, r4, e6, t5);
          }
        }
        return true;
      }
      addListener(e6, t5) {
        return _addListener(this, e6, t5, false), this;
      }
      on(e6, t5) {
        return this.addListener(e6, t5);
      }
      prependListener(e6, t5) {
        return _addListener(this, e6, t5, true), this;
      }
      once(e6, t5) {
        return this.on(e6, _onceWrap(this, e6, t5)), this;
      }
      prependOnceListener(e6, t5) {
        return this.prependListener(e6, _onceWrap(this, e6, t5)), this;
      }
      removeListener(e6, t5) {
        const r2 = this._events;
        if (void 0 === r2) return this;
        const s2 = r2[e6];
        if (void 0 === s2) return this;
        if (s2 === t5 || s2.listener === t5) this._eventsCount -= 1, this[_3] ? r2[e6] = void 0 : 0 === this._eventsCount ? this._events = { __proto__: null } : (delete r2[e6], r2.removeListener && this.emit("removeListener", e6, s2.listener || t5));
        else if ("function" != typeof s2) {
          let a3 = -1;
          for (let e7 = s2.length - 1; e7 >= 0; e7--) if (s2[e7] === t5 || s2[e7].listener === t5) {
            a3 = e7;
            break;
          }
          if (a3 < 0) return this;
          0 === a3 ? s2.shift() : (function(e7, t6) {
            for (; t6 + 1 < e7.length; t6++) e7[t6] = e7[t6 + 1];
            e7.pop();
          })(s2, a3), 1 === s2.length && (r2[e6] = s2[0]), void 0 !== r2.removeListener && this.emit("removeListener", e6, t5);
        }
        return this;
      }
      off(e6, t5) {
        return this.removeListener(e6, t5);
      }
      removeAllListeners(e6) {
        const t5 = this._events;
        if (void 0 === t5) return this;
        if (void 0 === t5.removeListener) return 0 === arguments.length ? (this._events = { __proto__: null }, this._eventsCount = 0) : void 0 !== t5[e6] && (0 === --this._eventsCount ? this._events = { __proto__: null } : delete t5[e6]), this[_3] = false, this;
        if (0 === arguments.length) {
          for (const e7 of Reflect.ownKeys(t5)) "removeListener" !== e7 && this.removeAllListeners(e7);
          return this.removeAllListeners("removeListener"), this._events = { __proto__: null }, this._eventsCount = 0, this[_3] = false, this;
        }
        const r2 = t5[e6];
        if ("function" == typeof r2) this.removeListener(e6, r2);
        else if (void 0 !== r2) for (let t6 = r2.length - 1; t6 >= 0; t6--) this.removeListener(e6, r2[t6]);
        return this;
      }
      listeners(e6) {
        return _listeners(this, e6, true);
      }
      rawListeners(e6) {
        return _listeners(this, e6, false);
      }
      eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      }
      listenerCount(e6, t5) {
        const r2 = this._events;
        if (void 0 !== r2) {
          const s2 = r2[e6];
          if ("function" == typeof s2) return null != t5 ? t5 === s2 || t5 === s2.listener ? 1 : 0 : 1;
          if (void 0 !== s2) {
            if (null != t5) {
              let e7 = 0;
              for (let r3 = 0, a3 = s2.length; r3 < a3; r3++) s2[r3] !== t5 && s2[r3].listener !== t5 || e7++;
              return e7;
            }
            return s2.length;
          }
        }
        return 0;
      }
    };
    EventEmitterAsyncResource = class extends _EventEmitter {
      static {
        __name(this, "EventEmitterAsyncResource");
      }
      constructor(e6) {
        let t5;
        "string" == typeof e6 ? (t5 = e6, e6 = void 0) : t5 = e6?.name || new.target.name, super(e6), this[T2] = new EventEmitterReferencingAsyncResource(this, t5, e6);
      }
      emit(e6, ...t5) {
        if (void 0 === this[T2]) throw new a2("EventEmitterAsyncResource");
        const { asyncResource: r2 } = this;
        return Array.prototype.unshift(t5, super.emit, this, e6), Reflect.apply(r2.runInAsyncScope, r2, t5);
      }
      emitDestroy() {
        if (void 0 === this[T2]) throw new a2("EventEmitterAsyncResource");
        this.asyncResource.emitDestroy();
      }
      get asyncId() {
        if (void 0 === this[T2]) throw new a2("EventEmitterAsyncResource");
        return this.asyncResource.asyncId();
      }
      get triggerAsyncId() {
        if (void 0 === this[T2]) throw new a2("EventEmitterAsyncResource");
        return this.asyncResource.triggerAsyncId();
      }
      get asyncResource() {
        if (void 0 === this[T2]) throw new a2("EventEmitterAsyncResource");
        return this[T2];
      }
    };
    EventEmitterReferencingAsyncResource = class extends t4 {
      static {
        __name(this, "EventEmitterReferencingAsyncResource");
      }
      constructor(e6, t5, r2) {
        super(t5, r2), this[I2] = e6;
      }
      get eventEmitter() {
        if (void 0 === this[I2]) throw new a2("EventEmitterReferencingAsyncResource");
        return this[I2];
      }
    };
    on$1 = /* @__PURE__ */ __name(function(e6, t5, r2 = {}) {
      const a3 = r2.signal;
      if (a3?.aborted) throw new f(void 0, { cause: a3?.reason });
      const c3 = r2.highWaterMark ?? r2.highWatermark ?? Number.MAX_SAFE_INTEGER, h3 = r2.lowWaterMark ?? r2.lowWatermark ?? 1, d3 = new FixedQueue(), g3 = new FixedQueue();
      let m3 = false, _4 = null, E3 = false, R3 = 0;
      const I3 = Object.setPrototypeOf({ next() {
        if (R3) {
          const t6 = d3.shift();
          return R3--, m3 && R3 < h3 && (e6.resume?.(), m3 = false), Promise.resolve(createIterResult(t6, false));
        }
        if (_4) {
          const e7 = Promise.reject(_4);
          return _4 = null, e7;
        }
        return E3 ? closeHandler() : new Promise(function(e7, t6) {
          g3.push({ resolve: e7, reject: t6 });
        });
      }, return: /* @__PURE__ */ __name(() => closeHandler(), "return"), throw(e7) {
        if (!(e7 && e7 instanceof Error)) throw new u2("EventEmitter.AsyncIterator", "Error", e7);
        errorHandler(e7);
      }, [Symbol.asyncIterator]() {
        return this;
      }, [B2]: { get size() {
        return R3;
      }, get low() {
        return h3;
      }, get high() {
        return c3;
      }, get isPaused() {
        return m3;
      } } }, s), { addEventListener: T3, removeAll: S3 } = /* @__PURE__ */ (function() {
        const e7 = [];
        return { addEventListener(t6, r3, s2, a4) {
          eventTargetAgnosticAddListener(t6, r3, s2, a4), Array.prototype.push(e7, [t6, r3, s2, a4]);
        }, removeAll() {
          for (; e7.length > 0; ) Reflect.apply(eventTargetAgnosticRemoveListener, void 0, e7.pop());
        } };
      })();
      T3(e6, t5, r2[x2] ? eventHandler : function(...e7) {
        return eventHandler(e7);
      }), "error" !== t5 && "function" == typeof e6.on && T3(e6, "error", errorHandler);
      const C4 = r2?.close;
      if (C4?.length) for (const t6 of C4) T3(e6, t6, closeHandler);
      const $3 = a3 ? addAbortListener(a3, function() {
        errorHandler(new f(void 0, { cause: a3?.reason }));
      }) : null;
      return I3;
      function eventHandler(t6) {
        g3.isEmpty() ? (R3++, !m3 && R3 > c3 && (m3 = true, e6.pause?.()), d3.push(t6)) : g3.shift().resolve(createIterResult(t6, false));
      }
      __name(eventHandler, "eventHandler");
      function errorHandler(e7) {
        g3.isEmpty() ? _4 = e7 : g3.shift().reject(e7), closeHandler();
      }
      __name(errorHandler, "errorHandler");
      function closeHandler() {
        $3?.[Symbol.dispose](), S3(), E3 = true;
        const e7 = createIterResult(void 0, true);
        for (; !g3.isEmpty(); ) g3.shift().resolve(e7);
        return Promise.resolve(e7);
      }
      __name(closeHandler, "closeHandler");
    }, "on$1");
    once$1 = /* @__PURE__ */ __name(async function(e6, t5, r2 = {}) {
      const s2 = r2?.signal;
      if (s2?.aborted) throw new f(void 0, { cause: s2?.reason });
      return new Promise((r3, a3) => {
        const errorListener = /* @__PURE__ */ __name((r4) => {
          "function" == typeof e6.removeListener && e6.removeListener(t5, resolver), null != s2 && eventTargetAgnosticRemoveListener(s2, "abort", abortListener), a3(r4);
        }, "errorListener"), resolver = /* @__PURE__ */ __name((...t6) => {
          "function" == typeof e6.removeListener && e6.removeListener("error", errorListener), null != s2 && eventTargetAgnosticRemoveListener(s2, "abort", abortListener), r3(t6);
        }, "resolver");
        function abortListener() {
          eventTargetAgnosticRemoveListener(e6, t5, resolver), eventTargetAgnosticRemoveListener(e6, "error", errorListener), a3(new f(void 0, { cause: s2?.reason }));
        }
        __name(abortListener, "abortListener");
        eventTargetAgnosticAddListener(e6, t5, resolver, { __proto__: null, once: true, [S2]: true }), "error" !== t5 && "function" == typeof e6.once && e6.once("error", errorListener), null != s2 && eventTargetAgnosticAddListener(s2, "abort", abortListener, { __proto__: null, once: true, [S2]: true });
      });
    }, "once$1");
    addAbortListener = /* @__PURE__ */ __name(function(e6, t5) {
      if (void 0 === e6) throw new u2("signal", "AbortSignal", e6);
      let r2;
      return e6.aborted ? queueMicrotask(() => t5()) : (e6.addEventListener("abort", t5, { __proto__: null, once: true, [S2]: true }), r2 = /* @__PURE__ */ __name(() => {
        e6.removeEventListener("abort", t5);
      }, "r")), { __proto__: null, [Symbol.dispose]() {
        r2?.();
      } };
    }, "addAbortListener");
    getEventListeners = /* @__PURE__ */ __name(function(e6, t5) {
      if ("function" == typeof e6.listeners) return e6.listeners(t5);
      if (isEventTarget(e6)) {
        const r2 = e6[kEvents].get(t5), s2 = [];
        let a3 = r2?.next;
        for (; void 0 !== a3?.listener; ) {
          const e7 = a3.listener?.deref ? a3.listener.deref() : a3.listener;
          s2.push(e7), a3 = a3.next;
        }
        return s2;
      }
      throw new u2("emitter", ["EventEmitter", "EventTarget"], e6);
    }, "getEventListeners");
    getMaxListeners$1 = /* @__PURE__ */ __name(function(e6) {
      if ("function" == typeof e6?.getMaxListeners) return _getMaxListeners(e6);
      if (e6?.[E2]) return e6[E2];
      throw new u2("emitter", ["EventEmitter", "EventTarget"], e6);
    }, "getMaxListeners$1");
    $2 = 2047;
    FixedCircularBuffer = class {
      static {
        __name(this, "FixedCircularBuffer");
      }
      bottom;
      top;
      list;
      next;
      constructor() {
        this.bottom = 0, this.top = 0, this.list = new Array(2048), this.next = null;
      }
      isEmpty() {
        return this.top === this.bottom;
      }
      isFull() {
        return (this.top + 1 & $2) === this.bottom;
      }
      push(e6) {
        this.list[this.top] = e6, this.top = this.top + 1 & $2;
      }
      shift() {
        const e6 = this.list[this.bottom];
        return void 0 === e6 ? null : (this.list[this.bottom] = void 0, this.bottom = this.bottom + 1 & $2, e6);
      }
    };
    FixedQueue = class {
      static {
        __name(this, "FixedQueue");
      }
      head;
      tail;
      constructor() {
        this.head = this.tail = new FixedCircularBuffer();
      }
      isEmpty() {
        return this.head.isEmpty();
      }
      push(e6) {
        this.head.isFull() && (this.head = this.head.next = new FixedCircularBuffer()), this.head.push(e6);
      }
      shift() {
        const e6 = this.tail, t5 = e6.shift();
        return e6.isEmpty() && null !== e6.next && (this.tail = e6.next, e6.next = null), t5;
      }
    };
    __name(isEventTarget, "isEventTarget");
    __name(addCatch, "addCatch");
    __name(emitUnhandledRejectionOrErr, "emitUnhandledRejectionOrErr");
    __name(_getMaxListeners, "_getMaxListeners");
    __name(enhanceStackTrace, "enhanceStackTrace");
    __name(_addListener, "_addListener");
    __name(onceWrapper, "onceWrapper");
    __name(_onceWrap, "_onceWrap");
    __name(_listeners, "_listeners");
    __name(arrayClone, "arrayClone");
    __name(createIterResult, "createIterResult");
    __name(eventTargetAgnosticRemoveListener, "eventTargetAgnosticRemoveListener");
    __name(eventTargetAgnosticAddListener, "eventTargetAgnosticAddListener");
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(e6) {
        this.fd = e6;
      }
      setRawMode(e6) {
        return this.isRaw = e6, this;
      }
    };
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(e6) {
        this.fd = e6;
      }
      clearLine(e6, t5) {
        return t5 && t5(), false;
      }
      clearScreenDown(e6) {
        return e6 && e6(), false;
      }
      cursorTo(e6, t5, r2) {
        return r2 && "function" == typeof r2 && r2(), false;
      }
      moveCursor(e6, t5, r2) {
        return r2 && r2(), false;
      }
      getColorDepth(e6) {
        return 1;
      }
      hasColors(e6, t5) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(e6, t5, r2) {
        e6 instanceof Uint8Array && (e6 = new TextDecoder().decode(e6));
        try {
          console.log(e6);
        } catch {
        }
        return r2 && "function" == typeof r2 && r2(), false;
      }
    };
    L2 = "22.14.0";
    Process = class _Process extends _EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(e6) {
        super(), this.env = e6.env, this.hrtime = e6.hrtime, this.nextTick = e6.nextTick;
        for (const e7 of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(_EventEmitter.prototype)]) {
          const t5 = this[e7];
          "function" == typeof t5 && (this[e7] = t5.bind(this));
        }
      }
      emitWarning(e6, t5, r2) {
        console.warn(`${r2 ? `[${r2}] ` : ""}${t5 ? `${t5}: ` : ""}${e6}`);
      }
      emit(...e6) {
        return super.emit(...e6);
      }
      listeners(e6) {
        return super.listeners(e6);
      }
      #e;
      #t;
      #r;
      get stdin() {
        return this.#e ??= new ReadStream(0);
      }
      get stdout() {
        return this.#t ??= new WriteStream(1);
      }
      get stderr() {
        return this.#r ??= new WriteStream(2);
      }
      #n = "/";
      chdir(e6) {
        this.#n = e6;
      }
      cwd() {
        return this.#n;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${L2}`;
      }
      get versions() {
        return { node: L2 };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: notImplemented("process.permission.has") };
      report = { directory: "", filename: "", signal: "SIGUSR2", compact: false, reportOnFatalError: false, reportOnSignal: false, reportOnUncaughtException: false, getReport: notImplemented("process.report.getReport"), writeReport: notImplemented("process.report.writeReport") };
      finalization = { register: notImplemented("process.finalization.register"), unregister: notImplemented("process.finalization.unregister"), registerBeforeExit: notImplemented("process.finalization.registerBeforeExit") };
      memoryUsage = Object.assign(() => ({ arrayBuffers: 0, rss: 0, external: 0, heapTotal: 0, heapUsed: 0 }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
    O2 = /* @__PURE__ */ Object.create(null);
    P2 = globalThis.process;
    _getEnv = /* @__PURE__ */ __name((e6) => globalThis.__env__ || P2?.env || (e6 ? O2 : globalThis), "_getEnv");
    U2 = new Proxy(O2, { get: /* @__PURE__ */ __name((e6, t5) => _getEnv()[t5] ?? O2[t5], "get"), has: /* @__PURE__ */ __name((e6, t5) => t5 in _getEnv() || t5 in O2, "has"), set: /* @__PURE__ */ __name((e6, t5, r2) => (_getEnv(true)[t5] = r2, true), "set"), deleteProperty: /* @__PURE__ */ __name((e6, t5) => (delete _getEnv(true)[t5], true), "deleteProperty"), ownKeys() {
      const e6 = _getEnv();
      return Object.keys(e6);
    }, getOwnPropertyDescriptor(e6, t5) {
      const r2 = _getEnv();
      if (t5 in r2) return { value: r2[t5], writable: true, enumerable: true, configurable: true };
    } });
    N2 = Object.assign(function(e6) {
      const t5 = Date.now(), r2 = Math.trunc(t5 / 1e3), s2 = t5 % 1e3 * 1e6;
      if (e6) {
        let t6 = r2 - e6[0], a3 = s2 - e6[0];
        return a3 < 0 && (t6 -= 1, a3 = 1e9 + a3), [t6, a3];
      }
      return [r2, s2];
    }, { bigint: /* @__PURE__ */ __name(function() {
      return BigInt(1e6 * Date.now());
    }, "bigint") });
    H2 = globalThis.queueMicrotask ? (e6, ...t5) => {
      globalThis.queueMicrotask(e6.bind(void 0, ...t5));
    } : createNextTickWithTimeout();
    __name(createNextTickWithTimeout, "createNextTickWithTimeout");
    M2 = new Process({ env: U2, hrtime: N2, nextTick: H2 });
    ({ abort: j2, addListener: W2, allowedNodeEnvironmentFlags: q4, hasUncaughtExceptionCaptureCallback: D2, setUncaughtExceptionCaptureCallback: F2, loadEnvFile: z3, sourceMapsEnabled: K3, arch: Q3, argv: G2, argv0: V2, chdir: Y3, config: J3, connected: Z3, constrainedMemory: X3, availableMemory: ee3, cpuUsage: te3, cwd: re3, debugPort: ne3, dlopen: oe3, disconnect: se3, emit: ie3, emitWarning: ae3, env: ce3, eventNames: ue3, execArgv: fe3, execPath: le3, exit: he3, finalization: de3, features: pe3, getBuiltinModule: ge3, getActiveResourcesInfo: ye3, getMaxListeners: me3, hrtime: we3, kill: be3, listeners: ve3, listenerCount: _e3, memoryUsage: Ee3, nextTick: Re3, on: Be3, off: Ae3, once: Ie3, pid: Te3, platform: xe3, ppid: Se3, prependListener: ke3, prependOnceListener: Ce3, rawListeners: $e3, release: Le3, removeAllListeners: Oe3, removeListener: Pe3, report: Ue3, resourceUsage: Ne3, setMaxListeners: He3, setSourceMapsEnabled: Me3, stderr: je3, stdin: We3, stdout: qe3, title: De3, umask: Fe3, uptime: ze3, version: Ke3, versions: Qe3, domain: Ge3, initgroups: Ve3, moduleLoadList: Ye3, reallyExit: Je3, openStdin: Ze3, assert: Xe3, binding: et3, send: tt3, exitCode: rt3, channel: nt3, getegid: ot3, geteuid: st2, getgid: it2, getgroups: at2, getuid: ct2, setegid: ut2, seteuid: ft2, setgid: lt2, setgroups: ht2, setuid: dt2, permission: pt2, mainModule: gt2, ref: yt2, unref: mt2, _events: wt2, _eventsCount: bt2, _exiting: vt2, _maxListeners: _t2, _debugEnd: Et2, _debugProcess: Rt2, _fatalException: Bt2, _getActiveHandles: At2, _getActiveRequests: It2, _kill: Tt2, _preload_modules: xt2, _rawDebug: St2, _startProfilerIdleNotifier: kt2, _stopProfilerIdleNotifier: Ct2, _tickCallback: $t2, _disconnect: Lt2, _handleQueue: Ot2, _pendingMessage: Pt2, _channel: Ut2, _send: Nt2, _linkedBinding: Ht2 } = M2);
    Mt2 = globalThis.process;
    globalThis.process = Mt2 ? new Proxy(Mt2, { get: /* @__PURE__ */ __name((e6, t5, r2) => Reflect.has(e6, t5) ? Reflect.get(e6, t5, r2) : Reflect.get(M2, t5, r2), "get") }) : M2;
    jt2 = [];
    Wt2 = [];
    qt2 = "undefined" == typeof Uint8Array ? Array : Uint8Array;
    Dt2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (let e6 = 0, t5 = 64; e6 < t5; ++e6) jt2[e6] = Dt2[e6], Wt2[Dt2.charCodeAt(e6)] = e6;
    __name(toByteArray, "toByteArray");
    __name(tripletToBase64, "tripletToBase64");
    __name(encodeChunk, "encodeChunk");
    __name(fromByteArray, "fromByteArray");
    __name(read, "read");
    __name(write, "write");
    Wt2["-".charCodeAt(0)] = 62, Wt2["_".charCodeAt(0)] = 63;
    Ft2 = "function" == typeof Symbol && "function" == typeof Symbol.for ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
    zt2 = 2147483647;
    __name(createBuffer2, "createBuffer");
    __name(Buffer$1, "Buffer$1");
    __name(from, "from");
    __name(assertSize, "assertSize");
    __name(allocUnsafe, "allocUnsafe");
    __name(fromArrayLike, "fromArrayLike");
    __name(fromArrayBuffer, "fromArrayBuffer");
    __name(checked, "checked");
    __name(byteLength, "byteLength");
    __name(slowToString, "slowToString");
    __name(swap, "swap");
    __name(bidirectionalIndexOf, "bidirectionalIndexOf");
    __name(arrayIndexOf, "arrayIndexOf");
    __name(hexWrite, "hexWrite");
    __name(utf8Write, "utf8Write");
    __name(asciiWrite, "asciiWrite");
    __name(base64Write, "base64Write");
    __name(ucs2Write, "ucs2Write");
    __name(base64Slice, "base64Slice");
    __name(utf8Slice, "utf8Slice");
    Buffer$1.TYPED_ARRAY_SUPPORT = (function() {
      try {
        const e6 = new Uint8Array(1), t5 = { foo: /* @__PURE__ */ __name(function() {
          return 42;
        }, "foo") };
        return Object.setPrototypeOf(t5, Uint8Array.prototype), Object.setPrototypeOf(e6, t5), 42 === e6.foo();
      } catch {
        return false;
      }
    })(), Buffer$1.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This environment lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(Buffer$1.prototype, "parent", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      if (Buffer$1.isBuffer(this)) return this.buffer;
    }, "get") }), Object.defineProperty(Buffer$1.prototype, "offset", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      if (Buffer$1.isBuffer(this)) return this.byteOffset;
    }, "get") }), Buffer$1.poolSize = 8192, Buffer$1.from = function(e6, t5, r2) {
      return from(e6, t5, r2);
    }, Object.setPrototypeOf(Buffer$1.prototype, Uint8Array.prototype), Object.setPrototypeOf(Buffer$1, Uint8Array), Buffer$1.alloc = function(e6, t5, r2) {
      return (function(e7, t6, r3) {
        return assertSize(e7), e7 <= 0 ? createBuffer2(e7) : void 0 !== t6 ? "string" == typeof r3 ? createBuffer2(e7).fill(t6, r3) : createBuffer2(e7).fill(t6) : createBuffer2(e7);
      })(e6, t5, r2);
    }, Buffer$1.allocUnsafe = function(e6) {
      return allocUnsafe(e6);
    }, Buffer$1.allocUnsafeSlow = function(e6) {
      return allocUnsafe(e6);
    }, Buffer$1.isBuffer = function(e6) {
      return null != e6 && true === e6._isBuffer && e6 !== Buffer$1.prototype;
    }, Buffer$1.compare = function(e6, t5) {
      if (isInstance(e6, Uint8Array) && (e6 = Buffer$1.from(e6, e6.offset, e6.byteLength)), isInstance(t5, Uint8Array) && (t5 = Buffer$1.from(t5, t5.offset, t5.byteLength)), !Buffer$1.isBuffer(e6) || !Buffer$1.isBuffer(t5)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      if (e6 === t5) return 0;
      let r2 = e6.length, s2 = t5.length;
      for (let a3 = 0, c3 = Math.min(r2, s2); a3 < c3; ++a3) if (e6[a3] !== t5[a3]) {
        r2 = e6[a3], s2 = t5[a3];
        break;
      }
      return r2 < s2 ? -1 : s2 < r2 ? 1 : 0;
    }, Buffer$1.isEncoding = function(e6) {
      switch (String(e6).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, Buffer$1.concat = function(e6, t5) {
      if (!Array.isArray(e6)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e6.length) return Buffer$1.alloc(0);
      let r2;
      if (void 0 === t5) for (t5 = 0, r2 = 0; r2 < e6.length; ++r2) t5 += e6[r2].length;
      const s2 = Buffer$1.allocUnsafe(t5);
      let a3 = 0;
      for (r2 = 0; r2 < e6.length; ++r2) {
        let t6 = e6[r2];
        if (isInstance(t6, Uint8Array)) a3 + t6.length > s2.length ? (Buffer$1.isBuffer(t6) || (t6 = Buffer$1.from(t6.buffer, t6.byteOffset, t6.byteLength)), t6.copy(s2, a3)) : Uint8Array.prototype.set.call(s2, t6, a3);
        else {
          if (!Buffer$1.isBuffer(t6)) throw new TypeError('"list" argument must be an Array of Buffers');
          t6.copy(s2, a3);
        }
        a3 += t6.length;
      }
      return s2;
    }, Buffer$1.byteLength = byteLength, Buffer$1.prototype._isBuffer = true, Buffer$1.prototype.swap16 = function() {
      const e6 = this.length;
      if (e6 % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let t5 = 0; t5 < e6; t5 += 2) swap(this, t5, t5 + 1);
      return this;
    }, Buffer$1.prototype.swap32 = function() {
      const e6 = this.length;
      if (e6 % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let t5 = 0; t5 < e6; t5 += 4) swap(this, t5, t5 + 3), swap(this, t5 + 1, t5 + 2);
      return this;
    }, Buffer$1.prototype.swap64 = function() {
      const e6 = this.length;
      if (e6 % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let t5 = 0; t5 < e6; t5 += 8) swap(this, t5, t5 + 7), swap(this, t5 + 1, t5 + 6), swap(this, t5 + 2, t5 + 5), swap(this, t5 + 3, t5 + 4);
      return this;
    }, Buffer$1.prototype.toString = function() {
      const e6 = this.length;
      return 0 === e6 ? "" : 0 === arguments.length ? utf8Slice(this, 0, e6) : Reflect.apply(slowToString, this, arguments);
    }, Buffer$1.prototype.toLocaleString = Buffer$1.prototype.toString, Buffer$1.prototype.equals = function(e6) {
      if (!Buffer$1.isBuffer(e6)) throw new TypeError("Argument must be a Buffer");
      return this === e6 || 0 === Buffer$1.compare(this, e6);
    }, Buffer$1.prototype.inspect = function() {
      let e6 = "";
      return e6 = this.toString("hex", 0, 50).replace(/(.{2})/g, "$1 ").trim(), this.length > 50 && (e6 += " ... "), "<Buffer " + e6 + ">";
    }, Ft2 && (Buffer$1.prototype[Ft2] = Buffer$1.prototype.inspect), Buffer$1.prototype.compare = function(e6, t5, r2, s2, a3) {
      if (isInstance(e6, Uint8Array) && (e6 = Buffer$1.from(e6, e6.offset, e6.byteLength)), !Buffer$1.isBuffer(e6)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e6);
      if (void 0 === t5 && (t5 = 0), void 0 === r2 && (r2 = e6 ? e6.length : 0), void 0 === s2 && (s2 = 0), void 0 === a3 && (a3 = this.length), t5 < 0 || r2 > e6.length || s2 < 0 || a3 > this.length) throw new RangeError("out of range index");
      if (s2 >= a3 && t5 >= r2) return 0;
      if (s2 >= a3) return -1;
      if (t5 >= r2) return 1;
      if (this === e6) return 0;
      let c3 = (a3 >>>= 0) - (s2 >>>= 0), u3 = (r2 >>>= 0) - (t5 >>>= 0);
      const f2 = Math.min(c3, u3), h3 = this.slice(s2, a3), d3 = e6.slice(t5, r2);
      for (let e7 = 0; e7 < f2; ++e7) if (h3[e7] !== d3[e7]) {
        c3 = h3[e7], u3 = d3[e7];
        break;
      }
      return c3 < u3 ? -1 : u3 < c3 ? 1 : 0;
    }, Buffer$1.prototype.includes = function(e6, t5, r2) {
      return -1 !== this.indexOf(e6, t5, r2);
    }, Buffer$1.prototype.indexOf = function(e6, t5, r2) {
      return bidirectionalIndexOf(this, e6, t5, r2, true);
    }, Buffer$1.prototype.lastIndexOf = function(e6, t5, r2) {
      return bidirectionalIndexOf(this, e6, t5, r2, false);
    }, Buffer$1.prototype.write = function(e6, t5, r2, s2) {
      if (void 0 === t5) s2 = "utf8", r2 = this.length, t5 = 0;
      else if (void 0 === r2 && "string" == typeof t5) s2 = t5, r2 = this.length, t5 = 0;
      else {
        if (!Number.isFinite(t5)) throw new TypeError("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        t5 >>>= 0, Number.isFinite(r2) ? (r2 >>>= 0, void 0 === s2 && (s2 = "utf8")) : (s2 = r2, r2 = void 0);
      }
      const a3 = this.length - t5;
      if ((void 0 === r2 || r2 > a3) && (r2 = a3), e6.length > 0 && (r2 < 0 || t5 < 0) || t5 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      s2 || (s2 = "utf8");
      let c3 = false;
      for (; ; ) switch (s2) {
        case "hex":
          return hexWrite(this, e6, t5, r2);
        case "utf8":
        case "utf-8":
          return utf8Write(this, e6, t5, r2);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, e6, t5, r2);
        case "base64":
          return base64Write(this, e6, t5, r2);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, e6, t5, r2);
        default:
          if (c3) throw new TypeError("Unknown encoding: " + s2);
          s2 = ("" + s2).toLowerCase(), c3 = true;
      }
    }, Buffer$1.prototype.toJSON = function() {
      return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
    };
    Kt2 = 4096;
    __name(asciiSlice, "asciiSlice");
    __name(latin1Slice, "latin1Slice");
    __name(hexSlice, "hexSlice");
    __name(utf16leSlice, "utf16leSlice");
    __name(checkOffset, "checkOffset");
    __name(checkInt, "checkInt");
    __name(wrtBigUInt64LE, "wrtBigUInt64LE");
    __name(wrtBigUInt64BE, "wrtBigUInt64BE");
    __name(checkIEEE754, "checkIEEE754");
    __name(writeFloat, "writeFloat");
    __name(writeDouble, "writeDouble");
    Buffer$1.prototype.slice = function(e6, t5) {
      const r2 = this.length;
      (e6 = Math.trunc(e6)) < 0 ? (e6 += r2) < 0 && (e6 = 0) : e6 > r2 && (e6 = r2), (t5 = void 0 === t5 ? r2 : Math.trunc(t5)) < 0 ? (t5 += r2) < 0 && (t5 = 0) : t5 > r2 && (t5 = r2), t5 < e6 && (t5 = e6);
      const s2 = this.subarray(e6, t5);
      return Object.setPrototypeOf(s2, Buffer$1.prototype), s2;
    }, Buffer$1.prototype.readUintLE = Buffer$1.prototype.readUIntLE = function(e6, t5, r2) {
      e6 >>>= 0, t5 >>>= 0, r2 || checkOffset(e6, t5, this.length);
      let s2 = this[e6], a3 = 1, c3 = 0;
      for (; ++c3 < t5 && (a3 *= 256); ) s2 += this[e6 + c3] * a3;
      return s2;
    }, Buffer$1.prototype.readUintBE = Buffer$1.prototype.readUIntBE = function(e6, t5, r2) {
      e6 >>>= 0, t5 >>>= 0, r2 || checkOffset(e6, t5, this.length);
      let s2 = this[e6 + --t5], a3 = 1;
      for (; t5 > 0 && (a3 *= 256); ) s2 += this[e6 + --t5] * a3;
      return s2;
    }, Buffer$1.prototype.readUint8 = Buffer$1.prototype.readUInt8 = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 1, this.length), this[e6];
    }, Buffer$1.prototype.readUint16LE = Buffer$1.prototype.readUInt16LE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 2, this.length), this[e6] | this[e6 + 1] << 8;
    }, Buffer$1.prototype.readUint16BE = Buffer$1.prototype.readUInt16BE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 2, this.length), this[e6] << 8 | this[e6 + 1];
    }, Buffer$1.prototype.readUint32LE = Buffer$1.prototype.readUInt32LE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 4, this.length), (this[e6] | this[e6 + 1] << 8 | this[e6 + 2] << 16) + 16777216 * this[e6 + 3];
    }, Buffer$1.prototype.readUint32BE = Buffer$1.prototype.readUInt32BE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 4, this.length), 16777216 * this[e6] + (this[e6 + 1] << 16 | this[e6 + 2] << 8 | this[e6 + 3]);
    }, Buffer$1.prototype.readBigUInt64LE = defineBigIntMethod(function(e6) {
      validateNumber(e6 >>>= 0, "offset");
      const t5 = this[e6], r2 = this[e6 + 7];
      void 0 !== t5 && void 0 !== r2 || boundsError(e6, this.length - 8);
      const s2 = t5 + 256 * this[++e6] + 65536 * this[++e6] + this[++e6] * 2 ** 24, a3 = this[++e6] + 256 * this[++e6] + 65536 * this[++e6] + r2 * 2 ** 24;
      return BigInt(s2) + (BigInt(a3) << BigInt(32));
    }), Buffer$1.prototype.readBigUInt64BE = defineBigIntMethod(function(e6) {
      validateNumber(e6 >>>= 0, "offset");
      const t5 = this[e6], r2 = this[e6 + 7];
      void 0 !== t5 && void 0 !== r2 || boundsError(e6, this.length - 8);
      const s2 = t5 * 2 ** 24 + 65536 * this[++e6] + 256 * this[++e6] + this[++e6], a3 = this[++e6] * 2 ** 24 + 65536 * this[++e6] + 256 * this[++e6] + r2;
      return (BigInt(s2) << BigInt(32)) + BigInt(a3);
    }), Buffer$1.prototype.readIntLE = function(e6, t5, r2) {
      e6 >>>= 0, t5 >>>= 0, r2 || checkOffset(e6, t5, this.length);
      let s2 = this[e6], a3 = 1, c3 = 0;
      for (; ++c3 < t5 && (a3 *= 256); ) s2 += this[e6 + c3] * a3;
      return a3 *= 128, s2 >= a3 && (s2 -= Math.pow(2, 8 * t5)), s2;
    }, Buffer$1.prototype.readIntBE = function(e6, t5, r2) {
      e6 >>>= 0, t5 >>>= 0, r2 || checkOffset(e6, t5, this.length);
      let s2 = t5, a3 = 1, c3 = this[e6 + --s2];
      for (; s2 > 0 && (a3 *= 256); ) c3 += this[e6 + --s2] * a3;
      return a3 *= 128, c3 >= a3 && (c3 -= Math.pow(2, 8 * t5)), c3;
    }, Buffer$1.prototype.readInt8 = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 1, this.length), 128 & this[e6] ? -1 * (255 - this[e6] + 1) : this[e6];
    }, Buffer$1.prototype.readInt16LE = function(e6, t5) {
      e6 >>>= 0, t5 || checkOffset(e6, 2, this.length);
      const r2 = this[e6] | this[e6 + 1] << 8;
      return 32768 & r2 ? 4294901760 | r2 : r2;
    }, Buffer$1.prototype.readInt16BE = function(e6, t5) {
      e6 >>>= 0, t5 || checkOffset(e6, 2, this.length);
      const r2 = this[e6 + 1] | this[e6] << 8;
      return 32768 & r2 ? 4294901760 | r2 : r2;
    }, Buffer$1.prototype.readInt32LE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 4, this.length), this[e6] | this[e6 + 1] << 8 | this[e6 + 2] << 16 | this[e6 + 3] << 24;
    }, Buffer$1.prototype.readInt32BE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 4, this.length), this[e6] << 24 | this[e6 + 1] << 16 | this[e6 + 2] << 8 | this[e6 + 3];
    }, Buffer$1.prototype.readBigInt64LE = defineBigIntMethod(function(e6) {
      validateNumber(e6 >>>= 0, "offset");
      const t5 = this[e6], r2 = this[e6 + 7];
      void 0 !== t5 && void 0 !== r2 || boundsError(e6, this.length - 8);
      const s2 = this[e6 + 4] + 256 * this[e6 + 5] + 65536 * this[e6 + 6] + (r2 << 24);
      return (BigInt(s2) << BigInt(32)) + BigInt(t5 + 256 * this[++e6] + 65536 * this[++e6] + this[++e6] * 2 ** 24);
    }), Buffer$1.prototype.readBigInt64BE = defineBigIntMethod(function(e6) {
      validateNumber(e6 >>>= 0, "offset");
      const t5 = this[e6], r2 = this[e6 + 7];
      void 0 !== t5 && void 0 !== r2 || boundsError(e6, this.length - 8);
      const s2 = (t5 << 24) + 65536 * this[++e6] + 256 * this[++e6] + this[++e6];
      return (BigInt(s2) << BigInt(32)) + BigInt(this[++e6] * 2 ** 24 + 65536 * this[++e6] + 256 * this[++e6] + r2);
    }), Buffer$1.prototype.readFloatLE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 4, this.length), read(this, e6, true, 23, 4);
    }, Buffer$1.prototype.readFloatBE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 4, this.length), read(this, e6, false, 23, 4);
    }, Buffer$1.prototype.readDoubleLE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 8, this.length), read(this, e6, true, 52, 8);
    }, Buffer$1.prototype.readDoubleBE = function(e6, t5) {
      return e6 >>>= 0, t5 || checkOffset(e6, 8, this.length), read(this, e6, false, 52, 8);
    }, Buffer$1.prototype.writeUintLE = Buffer$1.prototype.writeUIntLE = function(e6, t5, r2, s2) {
      if (e6 = +e6, t5 >>>= 0, r2 >>>= 0, !s2) {
        checkInt(this, e6, t5, r2, Math.pow(2, 8 * r2) - 1, 0);
      }
      let a3 = 1, c3 = 0;
      for (this[t5] = 255 & e6; ++c3 < r2 && (a3 *= 256); ) this[t5 + c3] = e6 / a3 & 255;
      return t5 + r2;
    }, Buffer$1.prototype.writeUintBE = Buffer$1.prototype.writeUIntBE = function(e6, t5, r2, s2) {
      if (e6 = +e6, t5 >>>= 0, r2 >>>= 0, !s2) {
        checkInt(this, e6, t5, r2, Math.pow(2, 8 * r2) - 1, 0);
      }
      let a3 = r2 - 1, c3 = 1;
      for (this[t5 + a3] = 255 & e6; --a3 >= 0 && (c3 *= 256); ) this[t5 + a3] = e6 / c3 & 255;
      return t5 + r2;
    }, Buffer$1.prototype.writeUint8 = Buffer$1.prototype.writeUInt8 = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 1, 255, 0), this[t5] = 255 & e6, t5 + 1;
    }, Buffer$1.prototype.writeUint16LE = Buffer$1.prototype.writeUInt16LE = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 2, 65535, 0), this[t5] = 255 & e6, this[t5 + 1] = e6 >>> 8, t5 + 2;
    }, Buffer$1.prototype.writeUint16BE = Buffer$1.prototype.writeUInt16BE = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 2, 65535, 0), this[t5] = e6 >>> 8, this[t5 + 1] = 255 & e6, t5 + 2;
    }, Buffer$1.prototype.writeUint32LE = Buffer$1.prototype.writeUInt32LE = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 4, 4294967295, 0), this[t5 + 3] = e6 >>> 24, this[t5 + 2] = e6 >>> 16, this[t5 + 1] = e6 >>> 8, this[t5] = 255 & e6, t5 + 4;
    }, Buffer$1.prototype.writeUint32BE = Buffer$1.prototype.writeUInt32BE = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 4, 4294967295, 0), this[t5] = e6 >>> 24, this[t5 + 1] = e6 >>> 16, this[t5 + 2] = e6 >>> 8, this[t5 + 3] = 255 & e6, t5 + 4;
    }, Buffer$1.prototype.writeBigUInt64LE = defineBigIntMethod(function(e6, t5 = 0) {
      return wrtBigUInt64LE(this, e6, t5, BigInt(0), BigInt("0xffffffffffffffff"));
    }), Buffer$1.prototype.writeBigUInt64BE = defineBigIntMethod(function(e6, t5 = 0) {
      return wrtBigUInt64BE(this, e6, t5, BigInt(0), BigInt("0xffffffffffffffff"));
    }), Buffer$1.prototype.writeIntLE = function(e6, t5, r2, s2) {
      if (e6 = +e6, t5 >>>= 0, !s2) {
        const s3 = Math.pow(2, 8 * r2 - 1);
        checkInt(this, e6, t5, r2, s3 - 1, -s3);
      }
      let a3 = 0, c3 = 1, u3 = 0;
      for (this[t5] = 255 & e6; ++a3 < r2 && (c3 *= 256); ) e6 < 0 && 0 === u3 && 0 !== this[t5 + a3 - 1] && (u3 = 1), this[t5 + a3] = Math.trunc(e6 / c3) - u3 & 255;
      return t5 + r2;
    }, Buffer$1.prototype.writeIntBE = function(e6, t5, r2, s2) {
      if (e6 = +e6, t5 >>>= 0, !s2) {
        const s3 = Math.pow(2, 8 * r2 - 1);
        checkInt(this, e6, t5, r2, s3 - 1, -s3);
      }
      let a3 = r2 - 1, c3 = 1, u3 = 0;
      for (this[t5 + a3] = 255 & e6; --a3 >= 0 && (c3 *= 256); ) e6 < 0 && 0 === u3 && 0 !== this[t5 + a3 + 1] && (u3 = 1), this[t5 + a3] = Math.trunc(e6 / c3) - u3 & 255;
      return t5 + r2;
    }, Buffer$1.prototype.writeInt8 = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 1, 127, -128), e6 < 0 && (e6 = 255 + e6 + 1), this[t5] = 255 & e6, t5 + 1;
    }, Buffer$1.prototype.writeInt16LE = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 2, 32767, -32768), this[t5] = 255 & e6, this[t5 + 1] = e6 >>> 8, t5 + 2;
    }, Buffer$1.prototype.writeInt16BE = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 2, 32767, -32768), this[t5] = e6 >>> 8, this[t5 + 1] = 255 & e6, t5 + 2;
    }, Buffer$1.prototype.writeInt32LE = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 4, 2147483647, -2147483648), this[t5] = 255 & e6, this[t5 + 1] = e6 >>> 8, this[t5 + 2] = e6 >>> 16, this[t5 + 3] = e6 >>> 24, t5 + 4;
    }, Buffer$1.prototype.writeInt32BE = function(e6, t5, r2) {
      return e6 = +e6, t5 >>>= 0, r2 || checkInt(this, e6, t5, 4, 2147483647, -2147483648), e6 < 0 && (e6 = 4294967295 + e6 + 1), this[t5] = e6 >>> 24, this[t5 + 1] = e6 >>> 16, this[t5 + 2] = e6 >>> 8, this[t5 + 3] = 255 & e6, t5 + 4;
    }, Buffer$1.prototype.writeBigInt64LE = defineBigIntMethod(function(e6, t5 = 0) {
      return wrtBigUInt64LE(this, e6, t5, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), Buffer$1.prototype.writeBigInt64BE = defineBigIntMethod(function(e6, t5 = 0) {
      return wrtBigUInt64BE(this, e6, t5, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), Buffer$1.prototype.writeFloatLE = function(e6, t5, r2) {
      return writeFloat(this, e6, t5, true, r2);
    }, Buffer$1.prototype.writeFloatBE = function(e6, t5, r2) {
      return writeFloat(this, e6, t5, false, r2);
    }, Buffer$1.prototype.writeDoubleLE = function(e6, t5, r2) {
      return writeDouble(this, e6, t5, true, r2);
    }, Buffer$1.prototype.writeDoubleBE = function(e6, t5, r2) {
      return writeDouble(this, e6, t5, false, r2);
    }, Buffer$1.prototype.copy = function(e6, t5, r2, s2) {
      if (!Buffer$1.isBuffer(e6)) throw new TypeError("argument should be a Buffer");
      if (r2 || (r2 = 0), s2 || 0 === s2 || (s2 = this.length), t5 >= e6.length && (t5 = e6.length), t5 || (t5 = 0), s2 > 0 && s2 < r2 && (s2 = r2), s2 === r2) return 0;
      if (0 === e6.length || 0 === this.length) return 0;
      if (t5 < 0) throw new RangeError("targetStart out of bounds");
      if (r2 < 0 || r2 >= this.length) throw new RangeError("Index out of range");
      if (s2 < 0) throw new RangeError("sourceEnd out of bounds");
      s2 > this.length && (s2 = this.length), e6.length - t5 < s2 - r2 && (s2 = e6.length - t5 + r2);
      const a3 = s2 - r2;
      return this === e6 && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t5, r2, s2) : Uint8Array.prototype.set.call(e6, this.subarray(r2, s2), t5), a3;
    }, Buffer$1.prototype.fill = function(e6, t5, r2, s2) {
      if ("string" == typeof e6) {
        if ("string" == typeof t5 ? (s2 = t5, t5 = 0, r2 = this.length) : "string" == typeof r2 && (s2 = r2, r2 = this.length), void 0 !== s2 && "string" != typeof s2) throw new TypeError("encoding must be a string");
        if ("string" == typeof s2 && !Buffer$1.isEncoding(s2)) throw new TypeError("Unknown encoding: " + s2);
        if (1 === e6.length) {
          const t6 = e6.charCodeAt(0);
          ("utf8" === s2 && t6 < 128 || "latin1" === s2) && (e6 = t6);
        }
      } else "number" == typeof e6 ? e6 &= 255 : "boolean" == typeof e6 && (e6 = Number(e6));
      if (t5 < 0 || this.length < t5 || this.length < r2) throw new RangeError("Out of range index");
      if (r2 <= t5) return this;
      let a3;
      if (t5 >>>= 0, r2 = void 0 === r2 ? this.length : r2 >>> 0, e6 || (e6 = 0), "number" == typeof e6) for (a3 = t5; a3 < r2; ++a3) this[a3] = e6;
      else {
        const c3 = Buffer$1.isBuffer(e6) ? e6 : Buffer$1.from(e6, s2), u3 = c3.length;
        if (0 === u3) throw new TypeError('The value "' + e6 + '" is invalid for argument "value"');
        for (a3 = 0; a3 < r2 - t5; ++a3) this[a3 + t5] = c3[a3 % u3];
      }
      return this;
    };
    Qt2 = {};
    __name(E$1, "E$1");
    __name(addNumericalSeparator, "addNumericalSeparator");
    __name(checkIntBI, "checkIntBI");
    __name(validateNumber, "validateNumber");
    __name(boundsError, "boundsError");
    E$1("ERR_BUFFER_OUT_OF_BOUNDS", function(e6) {
      return e6 ? `${e6} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    }, RangeError), E$1("ERR_INVALID_ARG_TYPE", function(e6, t5) {
      return `The "${e6}" argument must be of type number. Received type ${typeof t5}`;
    }, TypeError), E$1("ERR_OUT_OF_RANGE", function(e6, t5, r2) {
      let s2 = `The value of "${e6}" is out of range.`, a3 = r2;
      return Number.isInteger(r2) && Math.abs(r2) > 2 ** 32 ? a3 = addNumericalSeparator(String(r2)) : "bigint" == typeof r2 && (a3 = String(r2), (r2 > BigInt(2) ** BigInt(32) || r2 < -(BigInt(2) ** BigInt(32))) && (a3 = addNumericalSeparator(a3)), a3 += "n"), s2 += ` It must be ${t5}. Received ${a3}`, s2;
    }, RangeError);
    Gt2 = /[^\w+/-]/g;
    __name(utf8ToBytes, "utf8ToBytes");
    __name(base64ToBytes, "base64ToBytes");
    __name(blitBuffer, "blitBuffer");
    __name(isInstance, "isInstance");
    __name(numberIsNaN, "numberIsNaN");
    Vt2 = (function() {
      const e6 = "0123456789abcdef", t5 = Array.from({ length: 256 });
      for (let r2 = 0; r2 < 16; ++r2) {
        const s2 = 16 * r2;
        for (let a3 = 0; a3 < 16; ++a3) t5[s2 + a3] = e6[r2] + e6[a3];
      }
      return t5;
    })();
    __name(defineBigIntMethod, "defineBigIntMethod");
    __name(BufferBigIntNotDefined, "BufferBigIntNotDefined");
    Yt2 = globalThis.Buffer || Buffer$1;
    globalThis.btoa.bind(globalThis), globalThis.atob.bind(globalThis), globalThis.Buffer || (globalThis.Buffer = Yt2);
    Object.assign(() => {
    }, { __unenv__: true });
    Timeout = class {
      static {
        __name(this, "Timeout");
      }
      constructor(e6, t5) {
        "function" == typeof e6 && e6(...t5);
      }
      close() {
        throw createNotImplementedError("node.timers.timeout.close");
      }
      _onTimeout(...e6) {
        throw createNotImplementedError("node.timers.timeout._onTimeout");
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
      hasRef() {
        return false;
      }
      refresh() {
        return this;
      }
      [Symbol.dispose]() {
      }
      [Symbol.toPrimitive]() {
        return 0;
      }
    };
    __name(setTimeoutFallback, "setTimeoutFallback");
    setTimeoutFallback.__promisify__ = function(e6, t5, r2) {
      return new Promise((e7) => {
        e7(t5);
      });
    };
    Immediate = class {
      static {
        __name(this, "Immediate");
      }
      _onImmediate;
      _timeout;
      constructor(e6, t5) {
        this._onImmediate = e6, "setTimeout" in globalThis ? this._timeout = setTimeout(e6, 0, ...t5) : e6(...t5);
      }
      ref() {
        return this._timeout?.ref(), this;
      }
      unref() {
        return this._timeout?.unref(), this;
      }
      hasRef() {
        return this._timeout?.hasRef() ?? false;
      }
      [Symbol.dispose]() {
        "clearTimeout" in globalThis && clearTimeout(this._timeout);
      }
    };
    __name(setImmediateFallback, "setImmediateFallback");
    __name(setIntervalFallback, "setIntervalFallback");
    setImmediateFallback.__promisify__ = function(e6) {
      return new Promise((t5) => {
        t5(e6);
      });
    }, setIntervalFallback.__promisify__ = async function* (e6, t5) {
      yield t5;
    };
    Jt2 = globalThis.clearImmediate?.bind(globalThis) || function(e6) {
      e6?.[Symbol.dispose]();
    };
    globalThis.clearInterval?.bind(globalThis), globalThis.clearTimeout?.bind(globalThis);
    Zt2 = globalThis.setImmediate?.bind(globalThis) || setImmediateFallback;
    globalThis.setTimeout?.bind(globalThis), globalThis.setInterval?.bind(globalThis), globalThis.setImmediate || (globalThis.setImmediate = Zt2), globalThis.clearImmediate || (globalThis.clearImmediate = Jt2);
    Xt2 = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
    er = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    tr = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
    __name(jsonParseTransform, "jsonParseTransform");
    __name(destr, "destr");
    rr = /#/g;
    nr = /&/g;
    or = /\//g;
    sr = /=/g;
    ir = /\+/g;
    ar = /%5e/gi;
    cr = /%60/gi;
    ur = /%7c/gi;
    fr = /%20/gi;
    lr = /%2f/gi;
    __name(encodeQueryValue2, "encodeQueryValue");
    __name(encodeQueryKey2, "encodeQueryKey");
    __name(decode2, "decode");
    __name(decodePath, "decodePath");
    __name(decodeQueryKey, "decodeQueryKey");
    __name(decodeQueryValue, "decodeQueryValue");
    __name(parseQuery, "parseQuery");
    __name(stringifyQuery2, "stringifyQuery");
    hr = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
    dr = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
    pr = /^([/\\]\s*){2,}[^/\\]/;
    gr = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
    yr = /\/$|\/\?|\/#/;
    mr = /^\.?\//;
    __name(hasProtocol, "hasProtocol");
    __name(isScriptProtocol, "isScriptProtocol");
    __name(hasTrailingSlash, "hasTrailingSlash");
    __name(withoutTrailingSlash, "withoutTrailingSlash");
    __name(withTrailingSlash, "withTrailingSlash");
    __name(withLeadingSlash, "withLeadingSlash");
    __name(withoutBase, "withoutBase");
    __name(withQuery, "withQuery");
    __name(getQuery$1, "getQuery$1");
    __name(isEmptyURL, "isEmptyURL");
    __name(joinURL, "joinURL");
    __name(joinRelativeURL, "joinRelativeURL");
    wr = /* @__PURE__ */ Symbol.for("ufo:protocolRelative");
    __name(parseURL2, "parseURL");
    __name(parsePath, "parsePath");
    br = 0;
    vr = 1;
    _r = 2;
    __name(createRouter$1, "createRouter$1");
    __name(insert, "insert");
    __name(createRadixNode, "createRadixNode");
    __name(getNodeType, "getNodeType");
    __name(toRouteMatcher, "toRouteMatcher");
    __name(_matchRoutes, "_matchRoutes");
    __name(_sortRoutesMap, "_sortRoutesMap");
    __name(_routerNodeToTable, "_routerNodeToTable");
    __name(isPlainObject2, "isPlainObject");
    __name(_defu, "_defu");
    __name(createDefu, "createDefu");
    Er = createDefu();
    Rr = createDefu((e6, t5, r2) => {
      if (void 0 !== e6[t5] && "function" == typeof r2) return e6[t5] = r2(e6[t5]), true;
    });
    __name(o3, "o");
    i2 = class _i extends _EventEmitter {
      static {
        __name(this, "i");
      }
      __unenv__ = {};
      readableEncoding = null;
      readableEnded = true;
      readableFlowing = false;
      readableHighWaterMark = 0;
      readableLength = 0;
      readableObjectMode = false;
      readableAborted = false;
      readableDidRead = false;
      closed = false;
      errored = null;
      readable = false;
      destroyed = false;
      static from(e6, t5) {
        return new _i(t5);
      }
      constructor(e6) {
        super();
      }
      _read(e6) {
      }
      read(e6) {
      }
      setEncoding(e6) {
        return this;
      }
      pause() {
        return this;
      }
      resume() {
        return this;
      }
      isPaused() {
        return true;
      }
      unpipe(e6) {
        return this;
      }
      unshift(e6, t5) {
      }
      wrap(e6) {
        return this;
      }
      push(e6, t5) {
        return false;
      }
      _destroy(e6, t5) {
        this.removeAllListeners();
      }
      destroy(e6) {
        return this.destroyed = true, this._destroy(e6), this;
      }
      pipe(e6, t5) {
        return {};
      }
      compose(e6, t5) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return this.destroy(), Promise.resolve();
      }
      async *[Symbol.asyncIterator]() {
        throw o3("Readable.asyncIterator");
      }
      iterator(e6) {
        throw o3("Readable.iterator");
      }
      map(e6, t5) {
        throw o3("Readable.map");
      }
      filter(e6, t5) {
        throw o3("Readable.filter");
      }
      forEach(e6, t5) {
        throw o3("Readable.forEach");
      }
      reduce(e6, t5, r2) {
        throw o3("Readable.reduce");
      }
      find(e6, t5) {
        throw o3("Readable.find");
      }
      findIndex(e6, t5) {
        throw o3("Readable.findIndex");
      }
      some(e6, t5) {
        throw o3("Readable.some");
      }
      toArray(e6) {
        throw o3("Readable.toArray");
      }
      every(e6, t5) {
        throw o3("Readable.every");
      }
      flatMap(e6, t5) {
        throw o3("Readable.flatMap");
      }
      drop(e6, t5) {
        throw o3("Readable.drop");
      }
      take(e6, t5) {
        throw o3("Readable.take");
      }
      asIndexedPairs(e6) {
        throw o3("Readable.asIndexedPairs");
      }
    };
    Br = class extends _EventEmitter {
      static {
        __name(this, "Br");
      }
      __unenv__ = {};
      writable = true;
      writableEnded = false;
      writableFinished = false;
      writableHighWaterMark = 0;
      writableLength = 0;
      writableObjectMode = false;
      writableCorked = 0;
      closed = false;
      errored = null;
      writableNeedDrain = false;
      writableAborted = false;
      destroyed = false;
      _data;
      _encoding = "utf8";
      constructor(e6) {
        super();
      }
      pipe(e6, t5) {
        return {};
      }
      _write(e6, t5, r2) {
        if (this.writableEnded) r2 && r2();
        else {
          if (void 0 === this._data) this._data = e6;
          else {
            const r3 = "string" == typeof this._data ? Yt2.from(this._data, this._encoding || t5 || "utf8") : this._data, s2 = "string" == typeof e6 ? Yt2.from(e6, t5 || this._encoding || "utf8") : e6;
            this._data = Yt2.concat([r3, s2]);
          }
          this._encoding = t5, r2 && r2();
        }
      }
      _writev(e6, t5) {
      }
      _destroy(e6, t5) {
      }
      _final(e6) {
      }
      write(e6, t5, r2) {
        const s2 = "string" == typeof t5 ? this._encoding : "utf8", a3 = "function" == typeof t5 ? t5 : "function" == typeof r2 ? r2 : void 0;
        return this._write(e6, s2, a3), true;
      }
      setDefaultEncoding(e6) {
        return this;
      }
      end(e6, t5, r2) {
        const s2 = "function" == typeof e6 ? e6 : "function" == typeof t5 ? t5 : "function" == typeof r2 ? r2 : void 0;
        if (this.writableEnded) return s2 && s2(), this;
        const a3 = e6 === s2 ? void 0 : e6;
        if (a3) {
          const e7 = t5 === s2 ? void 0 : t5;
          this.write(a3, e7, s2);
        }
        return this.writableEnded = true, this.writableFinished = true, this.emit("close"), this.emit("finish"), this;
      }
      cork() {
      }
      uncork() {
      }
      destroy(e6) {
        return this.destroyed = true, delete this._data, this.removeAllListeners(), this;
      }
      compose(e6, t5) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return Promise.resolve();
      }
    };
    Ar = class {
      static {
        __name(this, "Ar");
      }
      allowHalfOpen = true;
      _destroy;
      constructor(e6 = new i2(), t5 = new Br()) {
        Object.assign(this, e6), Object.assign(this, t5), this._destroy = /* @__PURE__ */ (function(...e7) {
          return function(...t6) {
            for (const r2 of e7) r2(...t6);
          };
        })(e6._destroy, t5._destroy);
      }
    };
    Ir = (Object.assign(Ar.prototype, i2.prototype), Object.assign(Ar.prototype, Br.prototype), Ar);
    A3 = class extends Ir {
      static {
        __name(this, "A");
      }
      __unenv__ = {};
      bufferSize = 0;
      bytesRead = 0;
      bytesWritten = 0;
      connecting = false;
      destroyed = false;
      pending = false;
      localAddress = "";
      localPort = 0;
      remoteAddress = "";
      remoteFamily = "";
      remotePort = 0;
      autoSelectFamilyAttemptedAddresses = [];
      readyState = "readOnly";
      constructor(e6) {
        super();
      }
      write(e6, t5, r2) {
        return false;
      }
      connect(e6, t5, r2) {
        return this;
      }
      end(e6, t5, r2) {
        return this;
      }
      setEncoding(e6) {
        return this;
      }
      pause() {
        return this;
      }
      resume() {
        return this;
      }
      setTimeout(e6, t5) {
        return this;
      }
      setNoDelay(e6) {
        return this;
      }
      setKeepAlive(e6, t5) {
        return this;
      }
      address() {
        return {};
      }
      unref() {
        return this;
      }
      ref() {
        return this;
      }
      destroySoon() {
        this.destroy();
      }
      resetAndDestroy() {
        const e6 = new Error("ERR_SOCKET_CLOSED");
        return e6.code = "ERR_SOCKET_CLOSED", this.destroy(e6), this;
      }
    };
    y2 = class extends i2 {
      static {
        __name(this, "y");
      }
      aborted = false;
      httpVersion = "1.1";
      httpVersionMajor = 1;
      httpVersionMinor = 1;
      complete = true;
      connection;
      socket;
      headers = {};
      trailers = {};
      method = "GET";
      url = "/";
      statusCode = 200;
      statusMessage = "";
      closed = false;
      errored = null;
      readable = false;
      constructor(e6) {
        super(), this.socket = this.connection = e6 || new A3();
      }
      get rawHeaders() {
        const e6 = this.headers, t5 = [];
        for (const r2 in e6) if (Array.isArray(e6[r2])) for (const s2 of e6[r2]) t5.push(r2, s2);
        else t5.push(r2, e6[r2]);
        return t5;
      }
      get rawTrailers() {
        return [];
      }
      setTimeout(e6, t5) {
        return this;
      }
      get headersDistinct() {
        return p(this.headers);
      }
      get trailersDistinct() {
        return p(this.trailers);
      }
    };
    __name(p, "p");
    w2 = class extends Br {
      static {
        __name(this, "w");
      }
      statusCode = 200;
      statusMessage = "";
      upgrading = false;
      chunkedEncoding = false;
      shouldKeepAlive = false;
      useChunkedEncodingByDefault = false;
      sendDate = false;
      finished = false;
      headersSent = false;
      strictContentLength = false;
      connection = null;
      socket = null;
      req;
      _headers = {};
      constructor(e6) {
        super(), this.req = e6;
      }
      assignSocket(e6) {
        e6._httpMessage = this, this.socket = e6, this.connection = e6, this.emit("socket", e6), this._flush();
      }
      _flush() {
        this.flushHeaders();
      }
      detachSocket(e6) {
      }
      writeContinue(e6) {
      }
      writeHead(e6, t5, r2) {
        e6 && (this.statusCode = e6), "string" == typeof t5 && (this.statusMessage = t5, t5 = void 0);
        const s2 = r2 || t5;
        if (s2 && !Array.isArray(s2)) for (const e7 in s2) this.setHeader(e7, s2[e7]);
        return this.headersSent = true, this;
      }
      writeProcessing() {
      }
      setTimeout(e6, t5) {
        return this;
      }
      appendHeader(e6, t5) {
        e6 = e6.toLowerCase();
        const r2 = this._headers[e6], s2 = [...Array.isArray(r2) ? r2 : [r2], ...Array.isArray(t5) ? t5 : [t5]].filter(Boolean);
        return this._headers[e6] = s2.length > 1 ? s2 : s2[0], this;
      }
      setHeader(e6, t5) {
        return this._headers[e6.toLowerCase()] = t5, this;
      }
      setHeaders(e6) {
        for (const [t5, r2] of Object.entries(e6)) this.setHeader(t5, r2);
        return this;
      }
      getHeader(e6) {
        return this._headers[e6.toLowerCase()];
      }
      getHeaders() {
        return this._headers;
      }
      getHeaderNames() {
        return Object.keys(this._headers);
      }
      hasHeader(e6) {
        return e6.toLowerCase() in this._headers;
      }
      removeHeader(e6) {
        delete this._headers[e6.toLowerCase()];
      }
      addTrailers(e6) {
      }
      flushHeaders() {
      }
      writeEarlyHints(e6, t5) {
        "function" == typeof t5 && t5();
      }
    };
    Tr = (() => {
      const n2 = /* @__PURE__ */ __name(function() {
      }, "n");
      return n2.prototype = /* @__PURE__ */ Object.create(null), n2;
    })();
    __name(v2, "v");
    xr = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(b2, "b");
    __name(hasProp, "hasProp");
    H3Error = class extends Error {
      static {
        __name(this, "H3Error");
      }
      static __h3_error__ = true;
      statusCode = 500;
      fatal = false;
      unhandled = false;
      statusMessage;
      data;
      cause;
      constructor(e6, t5 = {}) {
        super(e6, t5), t5.cause && !this.cause && (this.cause = t5.cause);
      }
      toJSON() {
        const e6 = { message: this.message, statusCode: sanitizeStatusCode(this.statusCode, 500) };
        return this.statusMessage && (e6.statusMessage = sanitizeStatusMessage(this.statusMessage)), void 0 !== this.data && (e6.data = this.data), e6;
      }
    };
    __name(createError, "createError");
    __name(isError, "isError");
    __name(getQuery, "getQuery");
    __name(getRequestHeaders, "getRequestHeaders");
    Sr = /* @__PURE__ */ Symbol.for("h3RawBody");
    kr = ["PATCH", "POST", "PUT", "DELETE"];
    __name(readRawBody, "readRawBody");
    __name(handleCacheHeaders, "handleCacheHeaders");
    Cr = { html: "text/html", json: "application/json" };
    $r = /[^\u0009\u0020-\u007E]/g;
    __name(sanitizeStatusMessage, "sanitizeStatusMessage");
    __name(sanitizeStatusCode, "sanitizeStatusCode");
    __name(splitCookiesString, "splitCookiesString");
    Lr = void 0 === Zt2 ? (e6) => e6() : Zt2;
    __name(send, "send");
    __name(setResponseStatus, "setResponseStatus");
    __name(getResponseStatus, "getResponseStatus");
    __name(getResponseStatusText, "getResponseStatusText");
    __name(setResponseHeaders, "setResponseHeaders");
    Or = setResponseHeaders;
    __name(setResponseHeader, "setResponseHeader");
    __name(appendResponseHeader, "appendResponseHeader");
    __name(sendStream, "sendStream");
    __name(sendWebResponse, "sendWebResponse");
    Pr = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
    Ur = /* @__PURE__ */ new Set(["transfer-encoding", "accept-encoding", "connection", "keep-alive", "upgrade", "expect", "host", "accept"]);
    __name(proxyRequest, "proxyRequest");
    __name(getProxyRequestHeaders, "getProxyRequestHeaders");
    __name(fetchWithEvent, "fetchWithEvent");
    __name(_getFetch, "_getFetch");
    __name(rewriteCookieProperty, "rewriteCookieProperty");
    H3Event = class {
      static {
        __name(this, "H3Event");
      }
      __is_event__ = true;
      node;
      web;
      context = {};
      _method;
      _path;
      _headers;
      _requestBody;
      _handled = false;
      _onBeforeResponseCalled;
      _onAfterResponseCalled;
      constructor(e6, t5) {
        this.node = { req: e6, res: t5 };
      }
      get method() {
        return this._method || (this._method = (this.node.req.method || "GET").toUpperCase()), this._method;
      }
      get path() {
        return this._path || this.node.req.url || "/";
      }
      get headers() {
        return this._headers || (this._headers = (function(e6) {
          const t5 = new Headers();
          for (const [r2, s2] of Object.entries(e6)) if (Array.isArray(s2)) for (const e7 of s2) t5.append(r2, e7);
          else s2 && t5.set(r2, s2);
          return t5;
        })(this.node.req.headers)), this._headers;
      }
      get handled() {
        return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
      }
      respondWith(e6) {
        return Promise.resolve(e6).then((e7) => sendWebResponse(this, e7));
      }
      toString() {
        return `[${this.method}] ${this.path}`;
      }
      toJSON() {
        return this.toString();
      }
      get req() {
        return this.node.req;
      }
      get res() {
        return this.node.res;
      }
    };
    __name(isEvent, "isEvent");
    __name(createEvent, "createEvent");
    __name(defineEventHandler, "defineEventHandler");
    __name(_normalizeArray, "_normalizeArray");
    Nr = defineEventHandler;
    __name(isEventHandler, "isEventHandler");
    __name(toEventHandler, "toEventHandler");
    lazyEventHandler = /* @__PURE__ */ __name(function(e6) {
      let t5, r2;
      const resolveHandler = /* @__PURE__ */ __name(() => r2 ? Promise.resolve(r2) : (t5 || (t5 = Promise.resolve(e6()).then((e7) => {
        const t6 = e7.default || e7;
        if ("function" != typeof t6) throw new TypeError("Invalid lazy handler result. It should be a function:", t6);
        return r2 = { handler: toEventHandler(e7.default || e7) }, r2;
      })), t5), "resolveHandler"), s2 = Nr((e7) => r2 ? r2.handler(e7) : resolveHandler().then((t6) => t6.handler(e7)));
      return s2.__resolve__ = resolveHandler, s2;
    }, "lazyEventHandler");
    __name(createApp2, "createApp");
    __name(use, "use");
    __name(normalizeLayer, "normalizeLayer");
    __name(handleHandlerResponse, "handleHandlerResponse");
    Hr = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
    __name(toNodeListener, "toNodeListener");
    __name(flatHooks2, "flatHooks");
    Mr = { run: /* @__PURE__ */ __name((e6) => e6(), "run") };
    jr = void 0 !== console.createTask ? console.createTask : () => Mr;
    __name(serialTaskCaller2, "serialTaskCaller");
    __name(parallelTaskCaller2, "parallelTaskCaller");
    __name(callEachWith2, "callEachWith");
    Hookable = class {
      static {
        __name(this, "Hookable");
      }
      constructor() {
        this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
      }
      hook(e6, t5, r2 = {}) {
        if (!e6 || "function" != typeof t5) return () => {
        };
        const s2 = e6;
        let a3;
        for (; this._deprecatedHooks[e6]; ) a3 = this._deprecatedHooks[e6], e6 = a3.to;
        if (a3 && !r2.allowDeprecated) {
          let e7 = a3.message;
          e7 || (e7 = `${s2} hook has been deprecated` + (a3.to ? `, please use ${a3.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(e7) || (console.warn(e7), this._deprecatedMessages.add(e7));
        }
        if (!t5.name) try {
          Object.defineProperty(t5, "name", { get: /* @__PURE__ */ __name(() => "_" + e6.replace(/\W+/g, "_") + "_hook_cb", "get"), configurable: true });
        } catch {
        }
        return this._hooks[e6] = this._hooks[e6] || [], this._hooks[e6].push(t5), () => {
          t5 && (this.removeHook(e6, t5), t5 = void 0);
        };
      }
      hookOnce(e6, t5) {
        let r2, _function = /* @__PURE__ */ __name((...e7) => ("function" == typeof r2 && r2(), r2 = void 0, _function = void 0, t5(...e7)), "_function");
        return r2 = this.hook(e6, _function), r2;
      }
      removeHook(e6, t5) {
        if (this._hooks[e6]) {
          const r2 = this._hooks[e6].indexOf(t5);
          -1 !== r2 && this._hooks[e6].splice(r2, 1), 0 === this._hooks[e6].length && delete this._hooks[e6];
        }
      }
      deprecateHook(e6, t5) {
        this._deprecatedHooks[e6] = "string" == typeof t5 ? { to: t5 } : t5;
        const r2 = this._hooks[e6] || [];
        delete this._hooks[e6];
        for (const t6 of r2) this.hook(e6, t6);
      }
      deprecateHooks(e6) {
        Object.assign(this._deprecatedHooks, e6);
        for (const t5 in e6) this.deprecateHook(t5, e6[t5]);
      }
      addHooks(e6) {
        const t5 = flatHooks2(e6), r2 = Object.keys(t5).map((e7) => this.hook(e7, t5[e7]));
        return () => {
          for (const e7 of r2.splice(0, r2.length)) e7();
        };
      }
      removeHooks(e6) {
        const t5 = flatHooks2(e6);
        for (const e7 in t5) this.removeHook(e7, t5[e7]);
      }
      removeAllHooks() {
        for (const e6 in this._hooks) delete this._hooks[e6];
      }
      callHook(e6, ...t5) {
        return t5.unshift(e6), this.callHookWith(serialTaskCaller2, e6, ...t5);
      }
      callHookParallel(e6, ...t5) {
        return t5.unshift(e6), this.callHookWith(parallelTaskCaller2, e6, ...t5);
      }
      callHookWith(e6, t5, ...r2) {
        const s2 = this._before || this._after ? { name: t5, args: r2, context: {} } : void 0;
        this._before && callEachWith2(this._before, s2);
        const a3 = e6(t5 in this._hooks ? [...this._hooks[t5]] : [], r2);
        return a3 instanceof Promise ? a3.finally(() => {
          this._after && s2 && callEachWith2(this._after, s2);
        }) : (this._after && s2 && callEachWith2(this._after, s2), a3);
      }
      beforeEach(e6) {
        return this._before = this._before || [], this._before.push(e6), () => {
          if (void 0 !== this._before) {
            const t5 = this._before.indexOf(e6);
            -1 !== t5 && this._before.splice(t5, 1);
          }
        };
      }
      afterEach(e6) {
        return this._after = this._after || [], this._after.push(e6), () => {
          if (void 0 !== this._after) {
            const t5 = this._after.indexOf(e6);
            -1 !== t5 && this._after.splice(t5, 1);
          }
        };
      }
    };
    __name(createHooks, "createHooks");
    Wr = globalThis;
    FetchError = class extends Error {
      static {
        __name(this, "FetchError");
      }
      constructor(e6, t5) {
        super(e6, t5), this.name = "FetchError", t5?.cause && !this.cause && (this.cause = t5.cause);
      }
    };
    qr = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
    __name(isPayloadMethod, "isPayloadMethod");
    Dr = /* @__PURE__ */ new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]);
    Fr = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
    __name(resolveFetchOptions, "resolveFetchOptions");
    __name(callHooks2, "callHooks");
    zr = /* @__PURE__ */ new Set([408, 409, 425, 429, 500, 502, 503, 504]);
    Kr = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(createFetch, "createFetch");
    Qr = (function() {
      if ("undefined" != typeof globalThis) return globalThis;
      if ("undefined" != typeof self) return self;
      if (void 0 !== Wr) return Wr;
      throw new Error("unable to locate global object");
    })();
    Gr = Qr.fetch ? (...e6) => Qr.fetch(...e6) : () => Promise.reject(new Error("[ofetch] global.fetch is not supported!"));
    Vr = Qr.Headers;
    Yr = Qr.AbortController;
    Jr = createFetch({ fetch: Gr, Headers: Vr, AbortController: Yr });
    __name(asyncCall, "asyncCall");
    __name(stringify2, "stringify");
    Zr = "base64:";
    __name(serializeRaw, "serializeRaw");
    __name(deserializeRaw, "deserializeRaw");
    Xr = ["has", "hasItem", "get", "getItem", "getItemRaw", "set", "setItem", "setItemRaw", "del", "remove", "removeItem", "getMeta", "setMeta", "removeMeta", "getKeys", "clear", "mount", "unmount"];
    __name(normalizeKey$1, "normalizeKey$1");
    __name(joinKeys, "joinKeys");
    __name(normalizeBaseKey, "normalizeBaseKey");
    memory = /* @__PURE__ */ __name(() => {
      const e6 = /* @__PURE__ */ new Map();
      return { name: "memory", getInstance: /* @__PURE__ */ __name(() => e6, "getInstance"), hasItem: /* @__PURE__ */ __name((t5) => e6.has(t5), "hasItem"), getItem: /* @__PURE__ */ __name((t5) => e6.get(t5) ?? null, "getItem"), getItemRaw: /* @__PURE__ */ __name((t5) => e6.get(t5) ?? null, "getItemRaw"), setItem(t5, r2) {
        e6.set(t5, r2);
      }, setItemRaw(t5, r2) {
        e6.set(t5, r2);
      }, removeItem(t5) {
        e6.delete(t5);
      }, getKeys: /* @__PURE__ */ __name(() => [...e6.keys()], "getKeys"), clear() {
        e6.clear();
      }, dispose() {
        e6.clear();
      } };
    }, "memory");
    __name(watch2, "watch");
    __name(dispose, "dispose");
    en2 = {};
    normalizeKey2 = /* @__PURE__ */ __name(function(e6) {
      return e6 && e6.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
    }, "normalizeKey");
    tn2 = { getKeys: /* @__PURE__ */ __name(() => Promise.resolve(Object.keys(en2)), "getKeys"), hasItem: /* @__PURE__ */ __name((e6) => (e6 = normalizeKey2(e6), Promise.resolve(e6 in en2)), "hasItem"), getItem: /* @__PURE__ */ __name((e6) => (e6 = normalizeKey2(e6), Promise.resolve(en2[e6] ? en2[e6].import() : null)), "getItem"), getMeta: /* @__PURE__ */ __name((e6) => (e6 = normalizeKey2(e6), Promise.resolve(en2[e6] ? en2[e6].meta : {})), "getMeta") };
    rn2 = (function(e6 = {}) {
      const t5 = { mounts: { "": e6.driver || memory() }, mountpoints: [""], watching: false, watchListeners: [], unwatch: {} }, getMount = /* @__PURE__ */ __name((e7) => {
        for (const r3 of t5.mountpoints) if (e7.startsWith(r3)) return { base: r3, relativeKey: e7.slice(r3.length), driver: t5.mounts[r3] };
        return { base: "", relativeKey: e7, driver: t5.mounts[""] };
      }, "getMount"), getMounts = /* @__PURE__ */ __name((e7, r3) => t5.mountpoints.filter((t6) => t6.startsWith(e7) || r3 && e7.startsWith(t6)).map((r4) => ({ relativeBase: e7.length > r4.length ? e7.slice(r4.length) : void 0, mountpoint: r4, driver: t5.mounts[r4] })), "getMounts"), onChange = /* @__PURE__ */ __name((e7, r3) => {
        if (t5.watching) {
          r3 = normalizeKey$1(r3);
          for (const s2 of t5.watchListeners) s2(e7, r3);
        }
      }, "onChange"), stopWatch = /* @__PURE__ */ __name(async () => {
        if (t5.watching) {
          for (const e7 in t5.unwatch) await t5.unwatch[e7]();
          t5.unwatch = {}, t5.watching = false;
        }
      }, "stopWatch"), runBatch = /* @__PURE__ */ __name((e7, t6, r3) => {
        const s2 = /* @__PURE__ */ new Map(), getBatch = /* @__PURE__ */ __name((e8) => {
          let t7 = s2.get(e8.base);
          return t7 || (t7 = { driver: e8.driver, base: e8.base, items: [] }, s2.set(e8.base, t7)), t7;
        }, "getBatch");
        for (const r4 of e7) {
          const e8 = "string" == typeof r4, s3 = normalizeKey$1(e8 ? r4 : r4.key), a3 = e8 ? void 0 : r4.value, c3 = e8 || !r4.options ? t6 : { ...t6, ...r4.options }, u3 = getMount(s3);
          getBatch(u3).items.push({ key: s3, value: a3, relativeKey: u3.relativeKey, options: c3 });
        }
        return Promise.all([...s2.values()].map((e8) => r3(e8))).then((e8) => e8.flat());
      }, "runBatch"), r2 = { hasItem(e7, t6 = {}) {
        e7 = normalizeKey$1(e7);
        const { relativeKey: r3, driver: s2 } = getMount(e7);
        return asyncCall(s2.hasItem, r3, t6);
      }, getItem(e7, t6 = {}) {
        e7 = normalizeKey$1(e7);
        const { relativeKey: r3, driver: s2 } = getMount(e7);
        return asyncCall(s2.getItem, r3, t6).then((e8) => destr(e8));
      }, getItems: /* @__PURE__ */ __name((e7, t6 = {}) => runBatch(e7, t6, (e8) => e8.driver.getItems ? asyncCall(e8.driver.getItems, e8.items.map((e9) => ({ key: e9.relativeKey, options: e9.options })), t6).then((t7) => t7.map((t8) => ({ key: joinKeys(e8.base, t8.key), value: destr(t8.value) }))) : Promise.all(e8.items.map((t7) => asyncCall(e8.driver.getItem, t7.relativeKey, t7.options).then((e9) => ({ key: t7.key, value: destr(e9) }))))), "getItems"), getItemRaw(e7, t6 = {}) {
        e7 = normalizeKey$1(e7);
        const { relativeKey: r3, driver: s2 } = getMount(e7);
        return s2.getItemRaw ? asyncCall(s2.getItemRaw, r3, t6) : asyncCall(s2.getItem, r3, t6).then((e8) => deserializeRaw(e8));
      }, async setItem(e7, t6, s2 = {}) {
        if (void 0 === t6) return r2.removeItem(e7);
        e7 = normalizeKey$1(e7);
        const { relativeKey: a3, driver: c3 } = getMount(e7);
        c3.setItem && (await asyncCall(c3.setItem, a3, stringify2(t6), s2), c3.watch || onChange("update", e7));
      }, async setItems(e7, t6) {
        await runBatch(e7, t6, async (e8) => {
          if (e8.driver.setItems) return asyncCall(e8.driver.setItems, e8.items.map((e9) => ({ key: e9.relativeKey, value: stringify2(e9.value), options: e9.options })), t6);
          e8.driver.setItem && await Promise.all(e8.items.map((t7) => asyncCall(e8.driver.setItem, t7.relativeKey, stringify2(t7.value), t7.options)));
        });
      }, async setItemRaw(e7, t6, s2 = {}) {
        if (void 0 === t6) return r2.removeItem(e7, s2);
        e7 = normalizeKey$1(e7);
        const { relativeKey: a3, driver: c3 } = getMount(e7);
        if (c3.setItemRaw) await asyncCall(c3.setItemRaw, a3, t6, s2);
        else {
          if (!c3.setItem) return;
          await asyncCall(c3.setItem, a3, serializeRaw(t6), s2);
        }
        c3.watch || onChange("update", e7);
      }, async removeItem(e7, t6 = {}) {
        "boolean" == typeof t6 && (t6 = { removeMeta: t6 }), e7 = normalizeKey$1(e7);
        const { relativeKey: r3, driver: s2 } = getMount(e7);
        s2.removeItem && (await asyncCall(s2.removeItem, r3, t6), (t6.removeMeta || t6.removeMata) && await asyncCall(s2.removeItem, r3 + "$", t6), s2.watch || onChange("remove", e7));
      }, async getMeta(e7, t6 = {}) {
        "boolean" == typeof t6 && (t6 = { nativeOnly: t6 }), e7 = normalizeKey$1(e7);
        const { relativeKey: r3, driver: s2 } = getMount(e7), a3 = /* @__PURE__ */ Object.create(null);
        if (s2.getMeta && Object.assign(a3, await asyncCall(s2.getMeta, r3, t6)), !t6.nativeOnly) {
          const e8 = await asyncCall(s2.getItem, r3 + "$", t6).then((e9) => destr(e9));
          e8 && "object" == typeof e8 && ("string" == typeof e8.atime && (e8.atime = new Date(e8.atime)), "string" == typeof e8.mtime && (e8.mtime = new Date(e8.mtime)), Object.assign(a3, e8));
        }
        return a3;
      }, setMeta(e7, t6, r3 = {}) {
        return this.setItem(e7 + "$", t6, r3);
      }, removeMeta(e7, t6 = {}) {
        return this.removeItem(e7 + "$", t6);
      }, async getKeys(e7, t6 = {}) {
        e7 = normalizeBaseKey(e7);
        const r3 = getMounts(e7, true);
        let s2 = [];
        const a3 = [];
        let c3 = true;
        for (const e8 of r3) {
          e8.driver.flags?.maxDepth || (c3 = false);
          const r4 = await asyncCall(e8.driver.getKeys, e8.relativeBase, t6);
          for (const t7 of r4) {
            const r5 = e8.mountpoint + normalizeKey$1(t7);
            s2.some((e9) => r5.startsWith(e9)) || a3.push(r5);
          }
          s2 = [e8.mountpoint, ...s2.filter((t7) => !t7.startsWith(e8.mountpoint))];
        }
        const u3 = void 0 !== t6.maxDepth && !c3;
        return a3.filter((r4) => (!u3 || (function(e8, t7) {
          if (void 0 === t7) return true;
          let r5 = 0, s3 = e8.indexOf(":");
          for (; s3 > -1; ) r5++, s3 = e8.indexOf(":", s3 + 1);
          return r5 <= t7;
        })(r4, t6.maxDepth)) && (function(e8, t7) {
          return t7 ? e8.startsWith(t7) && "$" !== e8[e8.length - 1] : "$" !== e8[e8.length - 1];
        })(r4, e7));
      }, async clear(e7, t6 = {}) {
        e7 = normalizeBaseKey(e7), await Promise.all(getMounts(e7, false).map(async (e8) => {
          if (e8.driver.clear) return asyncCall(e8.driver.clear, e8.relativeBase, t6);
          if (e8.driver.removeItem) {
            const r3 = await e8.driver.getKeys(e8.relativeBase || "", t6);
            return Promise.all(r3.map((r4) => e8.driver.removeItem(r4, t6)));
          }
        }));
      }, async dispose() {
        await Promise.all(Object.values(t5.mounts).map((e7) => dispose(e7)));
      }, watch: /* @__PURE__ */ __name(async (e7) => (await (async () => {
        if (!t5.watching) {
          t5.watching = true;
          for (const e8 in t5.mounts) t5.unwatch[e8] = await watch2(t5.mounts[e8], onChange, e8);
        }
      })(), t5.watchListeners.push(e7), async () => {
        t5.watchListeners = t5.watchListeners.filter((t6) => t6 !== e7), 0 === t5.watchListeners.length && await stopWatch();
      }), "watch"), async unwatch() {
        t5.watchListeners = [], await stopWatch();
      }, mount(e7, s2) {
        if ((e7 = normalizeBaseKey(e7)) && t5.mounts[e7]) throw new Error(`already mounted at ${e7}`);
        return e7 && (t5.mountpoints.push(e7), t5.mountpoints.sort((e8, t6) => t6.length - e8.length)), t5.mounts[e7] = s2, t5.watching && Promise.resolve(watch2(s2, onChange, e7)).then((r3) => {
          t5.unwatch[e7] = r3;
        }).catch(console.error), r2;
      }, async unmount(e7, r3 = true) {
        (e7 = normalizeBaseKey(e7)) && t5.mounts[e7] && (t5.watching && e7 in t5.unwatch && (t5.unwatch[e7]?.(), delete t5.unwatch[e7]), r3 && await dispose(t5.mounts[e7]), t5.mountpoints = t5.mountpoints.filter((t6) => t6 !== e7), delete t5.mounts[e7]);
      }, getMount(e7 = "") {
        e7 = normalizeKey$1(e7) + ":";
        const t6 = getMount(e7);
        return { driver: t6.driver, base: t6.base };
      }, getMounts(e7 = "", t6 = {}) {
        e7 = normalizeKey$1(e7);
        return getMounts(e7, t6.parents).map((e8) => ({ driver: e8.driver, base: e8.mountpoint }));
      }, keys: /* @__PURE__ */ __name((e7, t6 = {}) => r2.getKeys(e7, t6), "keys"), get: /* @__PURE__ */ __name((e7, t6 = {}) => r2.getItem(e7, t6), "get"), set: /* @__PURE__ */ __name((e7, t6, s2 = {}) => r2.setItem(e7, t6, s2), "set"), has: /* @__PURE__ */ __name((e7, t6 = {}) => r2.hasItem(e7, t6), "has"), del: /* @__PURE__ */ __name((e7, t6 = {}) => r2.removeItem(e7, t6), "del"), remove: /* @__PURE__ */ __name((e7, t6 = {}) => r2.removeItem(e7, t6), "remove") };
      return r2;
    })({});
    __name(useStorage, "useStorage");
    rn2.mount("/assets", tn2);
    nn2 = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
    on2 = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998];
    sn2 = [];
    k2 = class {
      static {
        __name(this, "k");
      }
      _data = new l();
      _hash = new l([...nn2]);
      _nDataBytes = 0;
      _minBufferSize = 0;
      finalize(e6) {
        e6 && this._append(e6);
        const t5 = 8 * this._nDataBytes, r2 = 8 * this._data.sigBytes;
        return this._data.words[r2 >>> 5] |= 128 << 24 - r2 % 32, this._data.words[14 + (r2 + 64 >>> 9 << 4)] = Math.floor(t5 / 4294967296), this._data.words[15 + (r2 + 64 >>> 9 << 4)] = t5, this._data.sigBytes = 4 * this._data.words.length, this._process(), this._hash;
      }
      _doProcessBlock(e6, t5) {
        const r2 = this._hash.words;
        let s2 = r2[0], a3 = r2[1], c3 = r2[2], u3 = r2[3], f2 = r2[4], h3 = r2[5], d3 = r2[6], g3 = r2[7];
        for (let r3 = 0; r3 < 64; r3++) {
          if (r3 < 16) sn2[r3] = 0 | e6[t5 + r3];
          else {
            const e7 = sn2[r3 - 15], t6 = (e7 << 25 | e7 >>> 7) ^ (e7 << 14 | e7 >>> 18) ^ e7 >>> 3, s3 = sn2[r3 - 2], a4 = (s3 << 15 | s3 >>> 17) ^ (s3 << 13 | s3 >>> 19) ^ s3 >>> 10;
            sn2[r3] = t6 + sn2[r3 - 7] + a4 + sn2[r3 - 16];
          }
          const m3 = s2 & a3 ^ s2 & c3 ^ a3 & c3, _4 = (s2 << 30 | s2 >>> 2) ^ (s2 << 19 | s2 >>> 13) ^ (s2 << 10 | s2 >>> 22), E3 = g3 + ((f2 << 26 | f2 >>> 6) ^ (f2 << 21 | f2 >>> 11) ^ (f2 << 7 | f2 >>> 25)) + (f2 & h3 ^ ~f2 & d3) + on2[r3] + sn2[r3];
          g3 = d3, d3 = h3, h3 = f2, f2 = u3 + E3 | 0, u3 = c3, c3 = a3, a3 = s2, s2 = E3 + (_4 + m3) | 0;
        }
        r2[0] = r2[0] + s2 | 0, r2[1] = r2[1] + a3 | 0, r2[2] = r2[2] + c3 | 0, r2[3] = r2[3] + u3 | 0, r2[4] = r2[4] + f2 | 0, r2[5] = r2[5] + h3 | 0, r2[6] = r2[6] + d3 | 0, r2[7] = r2[7] + g3 | 0;
      }
      _append(e6) {
        "string" == typeof e6 && (e6 = l.fromUtf8(e6)), this._data.concat(e6), this._nDataBytes += e6.sigBytes;
      }
      _process(e6) {
        let t5, r2 = this._data.sigBytes / 64;
        r2 = e6 ? Math.ceil(r2) : Math.max((0 | r2) - this._minBufferSize, 0);
        const s2 = 16 * r2, a3 = Math.min(4 * s2, this._data.sigBytes);
        if (s2) {
          for (let e7 = 0; e7 < s2; e7 += 16) this._doProcessBlock(this._data.words, e7);
          t5 = this._data.words.splice(0, s2), this._data.sigBytes -= a3;
        }
        return new l(t5, a3);
      }
    };
    l = class _l {
      static {
        __name(this, "l");
      }
      words;
      sigBytes;
      constructor(e6, t5) {
        e6 = this.words = e6 || [], this.sigBytes = void 0 === t5 ? 4 * e6.length : t5;
      }
      static fromUtf8(e6) {
        const t5 = unescape(encodeURIComponent(e6)), r2 = t5.length, s2 = [];
        for (let e7 = 0; e7 < r2; e7++) s2[e7 >>> 2] |= (255 & t5.charCodeAt(e7)) << 24 - e7 % 4 * 8;
        return new _l(s2, r2);
      }
      toBase64() {
        const e6 = [];
        for (let t5 = 0; t5 < this.sigBytes; t5 += 3) {
          const r2 = (this.words[t5 >>> 2] >>> 24 - t5 % 4 * 8 & 255) << 16 | (this.words[t5 + 1 >>> 2] >>> 24 - (t5 + 1) % 4 * 8 & 255) << 8 | this.words[t5 + 2 >>> 2] >>> 24 - (t5 + 2) % 4 * 8 & 255;
          for (let s2 = 0; s2 < 4 && 8 * t5 + 6 * s2 < 8 * this.sigBytes; s2++) e6.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(r2 >>> 6 * (3 - s2) & 63));
        }
        return e6.join("");
      }
      concat(e6) {
        if (this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8, this.words.length = Math.ceil(this.sigBytes / 4), this.sigBytes % 4) for (let t5 = 0; t5 < e6.sigBytes; t5++) {
          const r2 = e6.words[t5 >>> 2] >>> 24 - t5 % 4 * 8 & 255;
          this.words[this.sigBytes + t5 >>> 2] |= r2 << 24 - (this.sigBytes + t5) % 4 * 8;
        }
        else for (let t5 = 0; t5 < e6.sigBytes; t5 += 4) this.words[this.sigBytes + t5 >>> 2] = e6.words[t5 >>> 2];
        this.sigBytes += e6.sigBytes;
      }
    };
    an2 = (() => {
      class Hasher2 {
        static {
          __name(this, "Hasher2");
        }
        buff = "";
        #o = /* @__PURE__ */ new Map();
        write(e6) {
          this.buff += e6;
        }
        dispatch(e6) {
          return this[null === e6 ? "null" : typeof e6](e6);
        }
        object(e6) {
          if (e6 && "function" == typeof e6.toJSON) return this.object(e6.toJSON());
          const t5 = Object.prototype.toString.call(e6);
          let r2 = "";
          const s2 = t5.length;
          r2 = s2 < 10 ? "unknown:[" + t5 + "]" : t5.slice(8, s2 - 1), r2 = r2.toLowerCase();
          let a3 = null;
          if (void 0 !== (a3 = this.#o.get(e6))) return this.dispatch("[CIRCULAR:" + a3 + "]");
          if (this.#o.set(e6, this.#o.size), void 0 !== Yt2 && Yt2.isBuffer && Yt2.isBuffer(e6)) return this.write("buffer:"), this.write(e6.toString("utf8"));
          if ("object" !== r2 && "function" !== r2 && "asyncfunction" !== r2) this[r2] ? this[r2](e6) : this.unknown(e6, r2);
          else {
            const t6 = Object.keys(e6).sort(), r3 = [];
            this.write("object:" + (t6.length + r3.length) + ":");
            const dispatchForKey = /* @__PURE__ */ __name((t7) => {
              this.dispatch(t7), this.write(":"), this.dispatch(e6[t7]), this.write(",");
            }, "dispatchForKey");
            for (const e7 of t6) dispatchForKey(e7);
            for (const e7 of r3) dispatchForKey(e7);
          }
        }
        array(e6, t5) {
          if (t5 = void 0 !== t5 && t5, this.write("array:" + e6.length + ":"), !t5 || e6.length <= 1) {
            for (const t6 of e6) this.dispatch(t6);
            return;
          }
          const r2 = /* @__PURE__ */ new Map(), s2 = e6.map((e7) => {
            const t6 = new Hasher2();
            t6.dispatch(e7);
            for (const [e8, s3] of t6.#o) r2.set(e8, s3);
            return t6.toString();
          });
          return this.#o = r2, s2.sort(), this.array(s2, false);
        }
        date(e6) {
          return this.write("date:" + e6.toJSON());
        }
        symbol(e6) {
          return this.write("symbol:" + e6.toString());
        }
        unknown(e6, t5) {
          if (this.write(t5), e6) return this.write(":"), e6 && "function" == typeof e6.entries ? this.array([...e6.entries()], true) : void 0;
        }
        error(e6) {
          return this.write("error:" + e6.toString());
        }
        boolean(e6) {
          return this.write("bool:" + e6);
        }
        string(e6) {
          this.write("string:" + e6.length + ":"), this.write(e6);
        }
        function(e6) {
          this.write("fn:"), !(function(e7) {
            if ("function" != typeof e7) return false;
            return "[native code] }" === Function.prototype.toString.call(e7).slice(-15);
          })(e6) ? this.dispatch(e6.toString()) : this.dispatch("[native]");
        }
        number(e6) {
          return this.write("number:" + e6);
        }
        null() {
          return this.write("Null");
        }
        undefined() {
          return this.write("Undefined");
        }
        regexp(e6) {
          return this.write("regex:" + e6.toString());
        }
        arraybuffer(e6) {
          return this.write("arraybuffer:"), this.dispatch(new Uint8Array(e6));
        }
        url(e6) {
          return this.write("url:" + e6.toString());
        }
        map(e6) {
          this.write("map:");
          const t5 = [...e6];
          return this.array(t5, false);
        }
        set(e6) {
          this.write("set:");
          const t5 = [...e6];
          return this.array(t5, false);
        }
        bigint(e6) {
          return this.write("bigint:" + e6.toString());
        }
      }
      for (const e6 of ["uint8array", "uint8clampedarray", "unt8array", "uint16array", "unt16array", "uint32array", "unt32array", "float32array", "float64array"]) Hasher2.prototype[e6] = function(t5) {
        return this.write(e6 + ":"), this.array([...t5], false);
      };
      return Hasher2;
    })();
    __name(hash, "hash");
    __name(defineCachedFunction, "defineCachedFunction");
    __name(getKey, "getKey");
    __name(escapeKey, "escapeKey");
    __name(cloneWithProxy, "cloneWithProxy");
    cachedEventHandler = /* @__PURE__ */ __name(function(e6, t5 = { name: "_", base: "/cache", swr: true, maxAge: 1 }) {
      const r2 = (t5.varies || []).filter(Boolean).map((e7) => e7.toLowerCase()).sort(), s2 = { ...t5, getKey: /* @__PURE__ */ __name(async (e7) => {
        const s3 = await t5.getKey?.(e7);
        if (s3) return escapeKey(s3);
        const a4 = e7.node.req.originalUrl || e7.node.req.url || e7.path;
        let c3;
        try {
          c3 = escapeKey(decodeURI(parseURL2(a4).pathname)).slice(0, 16) || "index";
        } catch {
          c3 = "-";
        }
        return [`${c3}.${hash(a4)}`, ...r2.map((t6) => [t6, e7.node.req.headers[t6]]).map(([e8, t6]) => `${escapeKey(e8)}.${hash(t6)}`)].join(":");
      }, "getKey"), validate: /* @__PURE__ */ __name((e7) => !!e7.value && (!(e7.value.code >= 400) && (void 0 !== e7.value.body && ("undefined" !== e7.value.headers.etag && "undefined" !== e7.value.headers["last-modified"]))), "validate"), group: t5.group || "nitro/handlers", integrity: t5.integrity || hash([e6, t5]) }, a3 = (function(e7, t6 = {}) {
        return defineCachedFunction(e7, t6);
      })(async (a4) => {
        const c3 = {};
        for (const e7 of r2) {
          const t6 = a4.node.req.headers[e7];
          void 0 !== t6 && (c3[e7] = t6);
        }
        const u3 = cloneWithProxy(a4.node.req, { headers: c3 }), f2 = {};
        let h3;
        const d3 = createEvent(u3, cloneWithProxy(a4.node.res, { statusCode: 200, writableEnded: false, writableFinished: false, headersSent: false, closed: false, getHeader: /* @__PURE__ */ __name((e7) => f2[e7], "getHeader"), setHeader(e7, t6) {
          return f2[e7] = t6, this;
        }, getHeaderNames: /* @__PURE__ */ __name(() => Object.keys(f2), "getHeaderNames"), hasHeader: /* @__PURE__ */ __name((e7) => e7 in f2, "hasHeader"), removeHeader(e7) {
          delete f2[e7];
        }, getHeaders: /* @__PURE__ */ __name(() => f2, "getHeaders"), end(e7, t6, r3) {
          return "string" == typeof e7 && (h3 = e7), "function" == typeof t6 && t6(), "function" == typeof r3 && r3(), this;
        }, write: /* @__PURE__ */ __name((e7, t6, r3) => ("string" == typeof e7 && (h3 = e7), "function" == typeof t6 && t6(void 0), "function" == typeof r3 && r3(), true), "write"), writeHead(e7, t6) {
          if (this.statusCode = e7, t6) {
            if (Array.isArray(t6) || "string" == typeof t6) throw new TypeError("Raw headers  is not supported.");
            for (const e8 in t6) {
              const r3 = t6[e8];
              void 0 !== r3 && this.setHeader(e8, r3);
            }
          }
          return this;
        } }));
        d3.fetch = (e7, t6) => fetchWithEvent(d3, e7, t6, { fetch: useNitroApp().localFetch }), d3.$fetch = (e7, t6) => fetchWithEvent(d3, e7, t6, { fetch: globalThis.$fetch }), d3.waitUntil = a4.waitUntil, d3.context = a4.context, d3.context.cache = { options: s2 };
        const g3 = await e6(d3) || h3, m3 = d3.node.res.getHeaders();
        m3.etag = String(m3.Etag || m3.etag || `W/"${hash(g3)}"`), m3["last-modified"] = String(m3["Last-Modified"] || m3["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString());
        const _4 = [];
        t5.swr ? (t5.maxAge && _4.push(`s-maxage=${t5.maxAge}`), t5.staleMaxAge ? _4.push(`stale-while-revalidate=${t5.staleMaxAge}`) : _4.push("stale-while-revalidate")) : t5.maxAge && _4.push(`max-age=${t5.maxAge}`), _4.length > 0 && (m3["cache-control"] = _4.join(", "));
        return { code: d3.node.res.statusCode, headers: m3, body: g3 };
      }, s2);
      return defineEventHandler(async (r3) => {
        if (t5.headersOnly) {
          if (handleCacheHeaders(r3, { maxAge: t5.maxAge })) return;
          return e6(r3);
        }
        const s3 = await a3(r3);
        if (r3.node.res.headersSent || r3.node.res.writableEnded) return s3.body;
        if (!handleCacheHeaders(r3, { modifiedTime: new Date(s3.headers["last-modified"]), etag: s3.headers.etag, maxAge: t5.maxAge })) {
          r3.node.res.statusCode = s3.code;
          for (const e7 in s3.headers) {
            const t6 = s3.headers[e7];
            "set-cookie" === e7 ? r3.node.res.appendHeader(e7, splitCookiesString(t6)) : void 0 !== t6 && r3.node.res.setHeader(e7, t6);
          }
          return s3.body;
        }
      });
    }, "cachedEventHandler");
    __name(klona, "klona");
    cn2 = Rr({ nuxt: {} });
    un2 = /\d/;
    fn2 = ["-", "_", "/", "."];
    __name(isUppercase, "isUppercase");
    __name(kebabCase, "kebabCase");
    __name(getEnv, "getEnv");
    __name(_isObject, "_isObject");
    __name(applyEnv, "applyEnv");
    ln2 = /\{\{([^{}]*)\}\}/g;
    __name(_expandFromEnv, "_expandFromEnv");
    hn2 = { app: { baseURL: "/", buildId: "cfe3f171-360a-4565-bedf-91f05a97a832", buildAssetsDir: "/_nuxt/", cdnURL: "" }, nitro: { envPrefix: "NUXT_", routeRules: { "/__nuxt_error": { cache: false }, "/": { swr: true, cache: { swr: true } }, "/api/**": { isr: true }, "/_nuxt/builds/meta/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } }, "/_nuxt/builds/**": { headers: { "cache-control": "public, max-age=1, immutable" } }, "/_nuxt/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } }, "//_payload.json": { cache: { swr: true } } } }, public: {} };
    dn2 = { prefix: "NITRO_", altPrefix: hn2.nitro.envPrefix ?? M2.env.NITRO_ENV_PREFIX ?? "_", envExpansion: hn2.nitro.envExpansion ?? M2.env.NITRO_ENV_EXPANSION ?? false };
    pn2 = _deepFreeze(applyEnv(klona(hn2), dn2));
    __name(useRuntimeConfig2, "useRuntimeConfig");
    __name(_deepFreeze, "_deepFreeze");
    _deepFreeze(klona(cn2)), new Proxy(/* @__PURE__ */ Object.create(null), { get: /* @__PURE__ */ __name((e6, t5) => {
      console.warn("Please use `useRuntimeConfig()` instead of accessing config directly.");
      const r2 = useRuntimeConfig2();
      if (t5 in r2) return r2[t5];
    }, "get") });
    gn2 = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : void 0 !== Wr ? Wr : {};
    yn2 = "__unctx__";
    mn2 = gn2[yn2] || (gn2[yn2] = /* @__PURE__ */ (function(e6 = {}) {
      const t5 = {};
      return { get: /* @__PURE__ */ __name((r2, s2 = {}) => (t5[r2] || (t5[r2] = (function(e7 = {}) {
        let t6, r3 = false;
        const checkConflict = /* @__PURE__ */ __name((e8) => {
          if (t6 && t6 !== e8) throw new Error("Context conflict");
        }, "checkConflict");
        let s3;
        if (e7.asyncContext) {
          const t7 = e7.AsyncLocalStorage || globalThis.AsyncLocalStorage;
          t7 ? s3 = new t7() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
        }
        const _getCurrentInstance = /* @__PURE__ */ __name(() => {
          if (s3) {
            const e8 = s3.getStore();
            if (void 0 !== e8) return e8;
          }
          return t6;
        }, "_getCurrentInstance");
        return { use: /* @__PURE__ */ __name(() => {
          const e8 = _getCurrentInstance();
          if (void 0 === e8) throw new Error("Context is not available");
          return e8;
        }, "use"), tryUse: /* @__PURE__ */ __name(() => _getCurrentInstance(), "tryUse"), set: /* @__PURE__ */ __name((e8, s4) => {
          s4 || checkConflict(e8), t6 = e8, r3 = true;
        }, "set"), unset: /* @__PURE__ */ __name(() => {
          t6 = void 0, r3 = false;
        }, "unset"), call: /* @__PURE__ */ __name((e8, a3) => {
          checkConflict(e8), t6 = e8;
          try {
            return s3 ? s3.run(e8, a3) : a3();
          } finally {
            r3 || (t6 = void 0);
          }
        }, "call"), async callAsync(e8, a3) {
          t6 = e8;
          const onRestore = /* @__PURE__ */ __name(() => {
            t6 = e8;
          }, "onRestore"), onLeave = /* @__PURE__ */ __name(() => t6 === e8 ? onRestore : void 0, "onLeave");
          bn2.add(onLeave);
          try {
            const c3 = s3 ? s3.run(e8, a3) : a3();
            return r3 || (t6 = void 0), await c3;
          } finally {
            bn2.delete(onLeave);
          }
        } };
      })({ ...e6, ...s2 })), t5[r2]), "get") };
    })());
    getContext = /* @__PURE__ */ __name((e6, t5 = {}) => mn2.get(e6, t5), "getContext");
    wn2 = "__unctx_async_handlers__";
    bn2 = gn2[wn2] || (gn2[wn2] = /* @__PURE__ */ new Set());
    __name(executeAsync, "executeAsync");
    getContext("nitro-app", { asyncContext: false, AsyncLocalStorage: void 0 });
    vn2 = toRouteMatcher(createRouter$1({ routes: useRuntimeConfig2().nitro.routeRules }));
    __name(createRouteRulesHandler, "createRouteRulesHandler");
    __name(getRouteRules, "getRouteRules");
    __name(getRouteRulesForPath, "getRouteRulesForPath");
    _n2 = /post|put|patch/i;
    __name(joinHeaders, "joinHeaders");
    __name(normalizeCookieHeader, "normalizeCookieHeader");
    __name(normalizeCookieHeaders, "normalizeCookieHeaders");
    __name(hasReqHeader, "hasReqHeader");
    __name(defaultHandler, "defaultHandler");
    En = [async function(e6, t5, { defaultHandler: r2 }) {
      if (t5.handled || (function(e7) {
        return !hasReqHeader(e7, "accept", "text/html") && (hasReqHeader(e7, "accept", "application/json") || hasReqHeader(e7, "user-agent", "curl/") || hasReqHeader(e7, "user-agent", "httpie/") || hasReqHeader(e7, "sec-fetch-mode", "cors") || e7.path.startsWith("/api/") || e7.path.endsWith(".json"));
      })(t5)) return;
      const s2 = await r2(e6, t5, { json: true });
      if (404 === (e6.status || e6.statusCode || 500) && 302 === s2.status) return setResponseHeaders(t5, s2.headers), setResponseStatus(t5, s2.status, s2.statusText), send(t5, JSON.stringify(s2.body, null, 2));
      const a3 = s2.body, c3 = new URL(a3.url);
      a3.url = withoutBase(c3.pathname, useRuntimeConfig2(t5).app.baseURL) + c3.search + c3.hash, a3.message ||= "Server Error", a3.data ||= e6.data, a3.statusText ||= e6.statusText || e6.statusMessage, delete s2.headers["content-type"], delete s2.headers["content-security-policy"], setResponseHeaders(t5, s2.headers);
      const u3 = getRequestHeaders(t5), f2 = t5.path.startsWith("/__nuxt_error") || !!u3["x-nuxt-error"] ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig2(t5).app.baseURL, "/__nuxt_error"), a3), { headers: { ...u3, "x-nuxt-error": "true" }, redirect: "manual" }).catch(() => null);
      if (t5.handled) return;
      if (!f2) {
        const { template: e7 } = await Promise.resolve().then(() => (init_error_500(), error_500_exports));
        return setResponseHeader(t5, "Content-Type", "text/html;charset=UTF-8"), send(t5, e7(a3));
      }
      const h3 = await f2.text();
      for (const [e7, r3] of f2.headers.entries()) "set-cookie" !== e7 ? setResponseHeader(t5, e7, r3) : appendResponseHeader(t5, e7, r3);
      return setResponseStatus(t5, f2.status && 200 !== f2.status ? f2.status : s2.status, f2.statusText || s2.statusText), send(t5, h3);
    }, function(e6, t5) {
      const r2 = defaultHandler(e6, t5);
      return setResponseHeaders(t5, r2.headers), setResponseStatus(t5, r2.status, r2.statusText), send(t5, JSON.stringify(r2.body, null, 2));
    }];
    Rn2 = [];
    _lazy_AT8W4n = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_renderer(), renderer_exports)).then(function(e6) {
      return e6.Q;
    }), "_lazy_AT8W4n");
    Bn = [{ route: "/__nuxt_error", handler: _lazy_AT8W4n, lazy: true, middleware: false, method: void 0 }, { route: "/__nuxt_island/**", handler: defineEventHandler(() => {
    }), lazy: false, middleware: false, method: void 0 }, { route: "/", handler: _lazy_AT8W4n, lazy: true, middleware: false, method: void 0 }, { route: "//_payload.json", handler: _lazy_AT8W4n, lazy: true, middleware: false, method: void 0 }, { route: "/**", handler: _lazy_AT8W4n, lazy: true, middleware: false, method: void 0 }];
    An2 = (function() {
      const e6 = useRuntimeConfig2(), t5 = createHooks(), captureError = /* @__PURE__ */ __name((e7, r3 = {}) => {
        const s3 = t5.callHookParallel("error", e7, r3).catch((e8) => {
          console.error("Error while capturing another error", e8);
        });
        if (r3.event && isEvent(r3.event)) {
          const t6 = r3.event.context.nitro?.errors;
          t6 && t6.push({ error: e7, context: r3 }), r3.event.waitUntil && r3.event.waitUntil(s3);
        }
      }, "captureError"), r2 = createApp2({ debug: destr(false), onError: /* @__PURE__ */ __name((e7, t6) => (captureError(e7, { event: t6, tags: ["request"] }), (async function(e8, t7) {
        for (const r3 of En) try {
          if (await r3(e8, t7, { defaultHandler }), t7.handled) return;
        } catch (e9) {
          console.error(e9);
        }
      })(e7, t6)), "onError"), onRequest: /* @__PURE__ */ __name(async (e7) => {
        e7.context.nitro = e7.context.nitro || { errors: [] };
        const t6 = e7.node.req?.__unenv__;
        t6?._platform && (e7.context = { _platform: t6?._platform, ...t6._platform, ...e7.context }), !e7.context.waitUntil && t6?.waitUntil && (e7.context.waitUntil = t6.waitUntil), e7.fetch = (t7, r3) => fetchWithEvent(e7, t7, r3, { fetch: localFetch }), e7.$fetch = (t7, r3) => fetchWithEvent(e7, t7, r3, { fetch: c3 }), e7.waitUntil = (t7) => {
          e7.context.nitro._waitUntilPromises || (e7.context.nitro._waitUntilPromises = []), e7.context.nitro._waitUntilPromises.push(t7), e7.context.waitUntil && e7.context.waitUntil(t7);
        }, e7.captureError = (t7, r3) => {
          captureError(t7, { event: e7, ...r3 });
        }, await An2.hooks.callHook("request", e7).catch((t7) => {
          captureError(t7, { event: e7, tags: ["request"] });
        });
      }, "onRequest"), onBeforeResponse: /* @__PURE__ */ __name(async (e7, t6) => {
        await An2.hooks.callHook("beforeResponse", e7, t6).catch((t7) => {
          captureError(t7, { event: e7, tags: ["request", "response"] });
        });
      }, "onBeforeResponse"), onAfterResponse: /* @__PURE__ */ __name(async (e7, t6) => {
        await An2.hooks.callHook("afterResponse", e7, t6).catch((t7) => {
          captureError(t7, { event: e7, tags: ["request", "response"] });
        });
      }, "onAfterResponse") }), s2 = (function(e7 = {}) {
        const t6 = createRouter$1({}), r3 = {};
        let s3;
        const a4 = {}, addRoute = /* @__PURE__ */ __name((e8, s4, c5) => {
          let u3 = r3[e8];
          if (u3 || (r3[e8] = u3 = { path: e8, handlers: {} }, t6.insert(e8, u3)), Array.isArray(c5)) for (const t7 of c5) addRoute(e8, s4, t7);
          else u3.handlers[c5] = toEventHandler(s4, 0, e8);
          return a4;
        }, "addRoute");
        a4.use = a4.add = (e8, t7, r4) => addRoute(e8, t7, r4 || "all");
        for (const e8 of Hr) a4[e8] = (t7, r4) => a4.add(t7, r4, e8);
        const matchHandler = /* @__PURE__ */ __name((e8 = "/", r4 = "get") => {
          const a5 = e8.indexOf("?");
          -1 !== a5 && (e8 = e8.slice(0, Math.max(0, a5)));
          const c5 = t6.lookup(e8);
          if (!c5 || !c5.handlers) return { error: createError({ statusCode: 404, name: "Not Found", statusMessage: `Cannot find any route matching ${e8 || "/"}.` }) };
          let u3 = c5.handlers[r4] || c5.handlers.all;
          if (!u3) {
            s3 || (s3 = toRouteMatcher(t6));
            const a6 = s3.matchAll(e8).reverse();
            for (const e9 of a6) {
              if (e9.handlers[r4]) {
                u3 = e9.handlers[r4], c5.handlers[r4] = c5.handlers[r4] || u3;
                break;
              }
              if (e9.handlers.all) {
                u3 = e9.handlers.all, c5.handlers.all = c5.handlers.all || u3;
                break;
              }
            }
          }
          return u3 ? { matched: c5, handler: u3 } : { error: createError({ statusCode: 405, name: "Method Not Allowed", statusMessage: `Method ${r4} is not allowed on this route.` }) };
        }, "matchHandler"), c4 = e7.preemptive || e7.preemtive;
        return a4.handler = Nr((e8) => {
          const t7 = matchHandler(e8.path, e8.method.toLowerCase());
          if ("error" in t7) {
            if (c4) throw t7.error;
            return;
          }
          e8.context.matchedRoute = t7.matched;
          const r4 = t7.matched.params || {};
          return e8.context.params = r4, Promise.resolve(t7.handler(e8)).then((e9) => void 0 === e9 && c4 ? null : e9);
        }), a4.handler.__resolve__ = async (e8) => {
          e8 = withLeadingSlash(e8);
          const t7 = matchHandler(e8);
          if ("error" in t7) return;
          let r4 = { route: t7.matched.path, handler: t7.handler };
          if (t7.handler.__resolve__) {
            const s4 = await t7.handler.__resolve__(e8);
            if (!s4) return;
            r4 = { ...r4, ...s4 };
          }
          return r4;
        }, a4;
      })({ preemptive: true }), a3 = toNodeListener(r2), localFetch = /* @__PURE__ */ __name((e7, t6) => e7.toString().startsWith("/") ? (async function(e8, t7, r3 = {}) {
        try {
          const s3 = await b2(e8, { url: t7, ...r3 });
          return new Response(s3.body, { status: s3.status, statusText: s3.statusText, headers: v2(s3.headers) });
        } catch (e9) {
          return new Response(e9.toString(), { status: Number.parseInt(e9.statusCode || e9.code) || 500, statusText: e9.statusText });
        }
      })(a3, e7, t6).then((e8) => (function(e9) {
        return e9.headers.has("set-cookie") ? new Response(e9.body, { status: e9.status, statusText: e9.statusText, headers: normalizeCookieHeaders(e9.headers) }) : e9;
      })(e8)) : globalThis.fetch(e7, t6), "localFetch"), c3 = createFetch({ fetch: localFetch, Headers: Vr, defaults: { baseURL: e6.app.baseURL } });
      globalThis.$fetch = c3, r2.use(createRouteRulesHandler({ localFetch }));
      for (const t6 of Bn) {
        let a4 = t6.lazy ? lazyEventHandler(t6.handler) : t6.handler;
        if (t6.middleware || !t6.route) {
          const s3 = (e6.app.baseURL + (t6.route || "/")).replace(/\/+/g, "/");
          r2.use(s3, a4);
        } else {
          const e7 = getRouteRulesForPath(t6.route.replace(/:\w+|\*\*/g, "_"));
          e7.cache && (a4 = cachedEventHandler(a4, { group: "nitro/routes", ...e7.cache })), s2.use(t6.route, a4, t6.method);
        }
      }
      return r2.use(e6.app.baseURL, s2.handler), { hooks: t5, h3App: r2, router: s2, localCall: /* @__PURE__ */ __name((e7) => b2(a3, e7), "localCall"), localFetch, captureError };
    })();
    __name(useNitroApp, "useNitroApp");
    __name(defineRenderHandler, "defineRenderHandler");
    !(function(e6) {
      for (const t5 of Rn2) try {
        t5(e6);
      } catch (t6) {
        throw e6.captureError(t6, { tags: ["plugin"] }), t6;
      }
    })(An2);
    In = { "/_nuxt/BBZZVuET.js": { type: "text/javascript; charset=utf-8", etag: '"146-9BHNDsvD0mN6ErU3Yp131U2iQE8"', mtime: "2026-02-23T05:57:52.545Z", size: 326, path: "../public/_nuxt/BBZZVuET.js" }, "/_nuxt/CIJsWTnQ.js": { type: "text/javascript; charset=utf-8", etag: '"2299-XxyeK+NciLtj5pL135BqwemkYes"', mtime: "2026-02-23T05:57:52.545Z", size: 8857, path: "../public/_nuxt/CIJsWTnQ.js" }, "/_nuxt/CoNRh71c.js": { type: "text/javascript; charset=utf-8", etag: '"d96-I3X0AqnxIVlnzaWD0pGmjhsngX4"', mtime: "2026-02-23T05:57:52.545Z", size: 3478, path: "../public/_nuxt/CoNRh71c.js" }, "/_nuxt/Dt7RoMyG.js": { type: "text/javascript; charset=utf-8", etag: '"b1-AiTDU3V6Ym3hLjD6iiSpIs7Gz2s"', mtime: "2026-02-23T05:57:52.545Z", size: 177, path: "../public/_nuxt/Dt7RoMyG.js" }, "/_nuxt/BTqPzmk2.js": { type: "text/javascript; charset=utf-8", etag: '"28a2c-bMzST5X5Uqb8SoPIErSLiWe6Y4I"', mtime: "2026-02-23T05:57:52.545Z", size: 166444, path: "../public/_nuxt/BTqPzmk2.js" }, "/_nuxt/error-500.DEOd0G-X.css": { type: "text/css; charset=utf-8", etag: '"773-3HpvkV3ta9mz1diNknu+9EP5h+0"', mtime: "2026-02-23T05:57:52.545Z", size: 1907, path: "../public/_nuxt/error-500.DEOd0G-X.css" }, "/_nuxt/builds/latest.json": { type: "application/json", etag: '"47-8iXgILwU+WA0TOhcQc2ZARg+87w"', mtime: "2026-02-23T05:57:52.544Z", size: 71, path: "../public/_nuxt/builds/latest.json" }, "/_nuxt/builds/meta/cfe3f171-360a-4565-bedf-91f05a97a832.json": { type: "application/json", etag: '"58-16QZ5foh5t8cP0fCpmv28hnBmtQ"', mtime: "2026-02-23T05:57:52.542Z", size: 88, path: "../public/_nuxt/builds/meta/cfe3f171-360a-4565-bedf-91f05a97a832.json" }, "/_nuxt/error-404.Btpa_ZZN.css": { type: "text/css; charset=utf-8", etag: '"97e-KbDVu4/QDB5aMtgxriatUgSIgs0"', mtime: "2026-02-23T05:57:52.545Z", size: 2430, path: "../public/_nuxt/error-404.Btpa_ZZN.css" } };
    Tn2 = { "/_nuxt/builds/meta/": { maxAge: 31536e3 }, "/_nuxt/builds/": { maxAge: 1 }, "/_nuxt/": { maxAge: 31536e3 } };
    xn2 = (function(e6) {
      const t5 = useNitroApp();
      return { async fetch(r2, s2, a3) {
        const c3 = {}, u3 = new URL(r2.url);
        if (e6.fetch) {
          const t6 = await e6.fetch(r2, s2, a3, u3, c3);
          if (t6) return t6;
        }
        return (async function(e7, t6, r3, s3 = new URL(e7.url), a4 = useNitroApp(), c4) {
          let u4;
          (function(e8) {
            return _n2.test(e8.method);
          })(e7) && (u4 = Yt2.from(await e7.arrayBuffer()));
          return globalThis.__env__ = t6, a4.localFetch(s3.pathname + s3.search, { context: { waitUntil: /* @__PURE__ */ __name((e8) => r3.waitUntil(e8), "waitUntil"), _platform: { cf: e7.cf, cloudflare: { request: e7, env: t6, context: r3, url: s3, ...c4 } } }, host: s3.hostname, protocol: s3.protocol, method: e7.method, headers: e7.headers, body: u4 });
        })(r2, s2, a3, u3, t5, c3);
      }, scheduled(e7, r2, s2) {
        globalThis.__env__ = r2, s2.waitUntil(t5.hooks.callHook("cloudflare:scheduled", { controller: e7, env: r2, context: s2 }));
      }, email(e7, r2, s2) {
        globalThis.__env__ = r2, s2.waitUntil(t5.hooks.callHook("cloudflare:email", { message: e7, event: e7, env: r2, context: s2 }));
      }, queue(e7, r2, s2) {
        globalThis.__env__ = r2, s2.waitUntil(t5.hooks.callHook("cloudflare:queue", { batch: e7, event: e7, env: r2, context: s2 }));
      }, tail(e7, r2, s2) {
        globalThis.__env__ = r2, s2.waitUntil(t5.hooks.callHook("cloudflare:tail", { traces: e7, env: r2, context: s2 }));
      }, trace(e7, r2, s2) {
        globalThis.__env__ = r2, s2.waitUntil(t5.hooks.callHook("cloudflare:trace", { traces: e7, env: r2, context: s2 }));
      } };
    })({ fetch(e6, t5, r2, s2) {
      if (t5.ASSETS && (function(e7 = "") {
        if (In[e7]) return true;
        for (const t6 in Tn2) if (e7.startsWith(t6)) return true;
        return false;
      })(s2.pathname)) return t5.ASSETS.fetch(e6);
    } });
  }
});

// .wrangler/tmp/bundle-qawiTr/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-qawiTr/middleware-insertion-facade.js
init_modules_watch_stub();

// .output/server/index.mjs
init_modules_watch_stub();
init_nitro();
globalThis._importMeta_ = { url: "file:///_entry.js", env: {} };

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e6) {
      console.error("Failed to drain the unused request body.", e6);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e6) {
  return {
    name: e6?.name,
    message: e6?.message ?? String(e6),
    stack: e6?.stack,
    cause: e6?.cause === void 0 ? void 0 : reduceError(e6.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e6) {
    const error = reduceError(e6);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-qawiTr/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = xn2;

// ../../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-qawiTr/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
