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

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn3 = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn3, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e4) => e4.name !== markName) : this._entries.filter((e4) => e4.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e4) => e4.name !== measureName) : this._entries.filter((e4) => e4.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e4) => e4.entryType !== "resource" || e4.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e4) => e4.name === name && (!type || e4.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e4) => e4.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn3) {
        return fn3;
      }
      runInAsyncScope(fn3, thisArg, ...args) {
        return fn3.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// node_modules/.pnpm/@cloudflare+unenv-preset@2.7.13_unenv@2.0.0-rc.24_workerd@1.20251210.0/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "node_modules/.pnpm/@cloudflare+unenv-preset@2.7.13_unenv@2.0.0-rc.24_workerd@1.20251210.0/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// node_modules/.pnpm/@cloudflare+unenv-preset@2.7.13_unenv@2.0.0-rc.24_workerd@1.20251210.0/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "node_modules/.pnpm/@cloudflare+unenv-preset@2.7.13_unenv@2.0.0-rc.24_workerd@1.20251210.0/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// node_modules/.pnpm/wrangler@4.54.0_@cloudflare+workers-types@4.20251213.0/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "node_modules/.pnpm/wrangler@4.54.0_@cloudflare+workers-types@4.20251213.0/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x4, y4, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION;
var init_node_version = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION = "22.14.0";
  }
});

// node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
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
        return `v${NODE_VERSION}`;
      }
      get versions() {
        return { node: NODE_VERSION };
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
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
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
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
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
      // internals
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
  }
});

// node_modules/.pnpm/@cloudflare+unenv-preset@2.7.13_unenv@2.0.0-rc.24_workerd@1.20251210.0/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, workerdProcess, isWorkerdProcessV2, unenvProcess, exit, features, platform, env, hrtime3, nextTick, _channel, _disconnect, _events, _eventsCount, _handleQueue, _maxListeners, _pendingMessage, _send, assert2, disconnect, mainModule, _debugEnd, _debugProcess, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _kill, _linkedBinding, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, dlopen, domain, emit, emitWarning, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, initgroups, kill, listenerCount, listeners, loadEnvFile, memoryUsage, moduleLoadList, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions, _process, process_default;
var init_process2 = __esm({
  "node_modules/.pnpm/@cloudflare+unenv-preset@2.7.13_unenv@2.0.0-rc.24_workerd@1.20251210.0/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule("node:process");
    isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
    unenvProcess = new Process({
      env: globalProcess.env,
      // `hrtime` is only available from workerd process v2
      hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess.nextTick
    });
    ({ exit, features, platform } = workerdProcess);
    ({
      env: (
        // Always implemented by workerd
        env
      ),
      hrtime: (
        // Only implemented in workerd v2
        hrtime3
      ),
      nextTick: (
        // Always implemented by workerd
        nextTick
      )
    } = unenvProcess);
    ({
      _channel,
      _disconnect,
      _events,
      _eventsCount,
      _handleQueue,
      _maxListeners,
      _pendingMessage,
      _send,
      assert: assert2,
      disconnect,
      mainModule
    } = unenvProcess);
    ({
      _debugEnd: (
        // @ts-expect-error `_debugEnd` is missing typings
        _debugEnd
      ),
      _debugProcess: (
        // @ts-expect-error `_debugProcess` is missing typings
        _debugProcess
      ),
      _exiting: (
        // @ts-expect-error `_exiting` is missing typings
        _exiting
      ),
      _fatalException: (
        // @ts-expect-error `_fatalException` is missing typings
        _fatalException
      ),
      _getActiveHandles: (
        // @ts-expect-error `_getActiveHandles` is missing typings
        _getActiveHandles
      ),
      _getActiveRequests: (
        // @ts-expect-error `_getActiveRequests` is missing typings
        _getActiveRequests
      ),
      _kill: (
        // @ts-expect-error `_kill` is missing typings
        _kill
      ),
      _linkedBinding: (
        // @ts-expect-error `_linkedBinding` is missing typings
        _linkedBinding
      ),
      _preload_modules: (
        // @ts-expect-error `_preload_modules` is missing typings
        _preload_modules
      ),
      _rawDebug: (
        // @ts-expect-error `_rawDebug` is missing typings
        _rawDebug
      ),
      _startProfilerIdleNotifier: (
        // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
        _startProfilerIdleNotifier
      ),
      _stopProfilerIdleNotifier: (
        // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
        _stopProfilerIdleNotifier
      ),
      _tickCallback: (
        // @ts-expect-error `_tickCallback` is missing typings
        _tickCallback
      ),
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      availableMemory,
      binding: (
        // @ts-expect-error `binding` is missing typings
        binding
      ),
      channel,
      chdir,
      config,
      connected,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      domain: (
        // @ts-expect-error `domain` is missing typings
        domain
      ),
      emit,
      emitWarning,
      eventNames,
      execArgv,
      execPath,
      exitCode,
      finalization,
      getActiveResourcesInfo,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getMaxListeners,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      initgroups: (
        // @ts-expect-error `initgroups` is missing typings
        initgroups
      ),
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      memoryUsage,
      moduleLoadList: (
        // @ts-expect-error `moduleLoadList` is missing typings
        moduleLoadList
      ),
      off,
      on,
      once,
      openStdin: (
        // @ts-expect-error `openStdin` is missing typings
        openStdin
      ),
      permission,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit: (
        // @ts-expect-error `reallyExit` is missing typings
        reallyExit
      ),
      ref,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      send,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setMaxListeners,
      setSourceMapsEnabled,
      setuid,
      setUncaughtExceptionCaptureCallback,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      throwDeprecation,
      title,
      traceDeprecation,
      umask,
      unref,
      uptime,
      version,
      versions
    } = isWorkerdProcessV2 ? workerdProcess : unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// node_modules/.pnpm/wrangler@4.54.0_@cloudflare+workers-types@4.20251213.0/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "node_modules/.pnpm/wrangler@4.54.0_@cloudflare+workers-types@4.20251213.0/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// node_modules/.pnpm/wrangler@4.54.0_@cloudflare+workers-types@4.20251213.0/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/.pnpm/wrangler@4.54.0_@cloudflare+workers-types@4.20251213.0/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// .output/server/chunks/_/shared.esm-bundler.mjs
function makeMap(e4) {
  const t5 = /* @__PURE__ */ Object.create(null);
  for (const a6 of e4.split(",")) t5[a6] = 1;
  return (e5) => e5 in t5;
}
function generateCodeFrame(e4, t5 = 0, a6 = e4.length) {
  if ((t5 = Math.max(0, Math.min(t5, e4.length))) > (a6 = Math.max(0, Math.min(a6, e4.length)))) return "";
  let n2 = e4.split(/(\r?\n)/);
  const r4 = n2.filter((e5, t6) => t6 % 2 == 1);
  n2 = n2.filter((e5, t6) => t6 % 2 == 0);
  let i4 = 0;
  const o5 = [];
  for (let e5 = 0; e5 < n2.length; e5++) if (i4 += n2[e5].length + (r4[e5] && r4[e5].length || 0), i4 >= t5) {
    for (let s4 = e5 - 2; s4 <= e5 + 2 || a6 > i4; s4++) {
      if (s4 < 0 || s4 >= n2.length) continue;
      const l3 = s4 + 1;
      o5.push(`${l3}${" ".repeat(Math.max(3 - String(l3).length, 0))}|  ${n2[s4]}`);
      const c4 = n2[s4].length, p3 = r4[s4] && r4[s4].length || 0;
      if (s4 === e5) {
        const e6 = t5 - (i4 - (c4 + p3)), n3 = Math.max(1, a6 > i4 ? c4 - e6 : a6 - t5);
        o5.push("   |  " + " ".repeat(e6) + "^".repeat(n3));
      } else if (s4 > e5) {
        if (a6 > i4) {
          const e6 = Math.max(Math.min(a6 - i4, c4), 1);
          o5.push("   |  " + "^".repeat(e6));
        }
        i4 += c4 + p3;
      }
    }
    break;
  }
  return o5.join("\n");
}
function normalizeStyle(e4) {
  if (i(e4)) {
    const t5 = {};
    for (let a6 = 0; a6 < e4.length; a6++) {
      const n2 = e4[a6], r4 = isString(n2) ? parseStringStyle(n2) : normalizeStyle(n2);
      if (r4) for (const e5 in r4) t5[e5] = r4[e5];
    }
    return t5;
  }
  if (isString(e4) || isObject(e4)) return e4;
}
function parseStringStyle(e4) {
  const t5 = {};
  return e4.replace(N, "").split(A).forEach((e5) => {
    if (e5) {
      const a6 = e5.split(T);
      a6.length > 1 && (t5[a6[0].trim()] = a6[1].trim());
    }
  }), t5;
}
function stringifyStyle(e4) {
  if (!e4) return "";
  if (isString(e4)) return e4;
  let t5 = "";
  for (const a6 in e4) {
    const n2 = e4[a6];
    if (isString(n2) || "number" == typeof n2) {
      t5 += `${a6.startsWith("--") ? a6 : d(a6)}:${n2};`;
    }
  }
  return t5;
}
function normalizeClass(e4) {
  let t5 = "";
  if (isString(e4)) t5 = e4;
  else if (i(e4)) for (let a6 = 0; a6 < e4.length; a6++) {
    const n2 = normalizeClass(e4[a6]);
    n2 && (t5 += n2 + " ");
  }
  else if (isObject(e4)) for (const a6 in e4) e4[a6] && (t5 += a6 + " ");
  return t5.trim();
}
function normalizeProps(e4) {
  if (!e4) return null;
  let { class: t5, style: a6 } = e4;
  return t5 && !isString(t5) && (e4.class = normalizeClass(t5)), a6 && (e4.style = normalizeStyle(a6)), e4;
}
function includeBooleanAttr(e4) {
  return !!e4 || "" === e4;
}
function isSSRSafeAttrName(e4) {
  if (L.hasOwnProperty(e4)) return L[e4];
  const t5 = _.test(e4);
  return t5 && console.error(`unsafe attribute name: ${e4}`), L[e4] = !t5;
}
function isRenderableAttrValue(e4) {
  if (null == e4) return false;
  const t5 = typeof e4;
  return "string" === t5 || "number" === t5 || "boolean" === t5;
}
function escapeHtml(e4) {
  const t5 = "" + e4, a6 = z.exec(t5);
  if (!a6) return t5;
  let n2, r4, i4 = "", o5 = 0;
  for (r4 = a6.index; r4 < t5.length; r4++) {
    switch (t5.charCodeAt(r4)) {
      case 34:
        n2 = "&quot;";
        break;
      case 38:
        n2 = "&amp;";
        break;
      case 39:
        n2 = "&#39;";
        break;
      case 60:
        n2 = "&lt;";
        break;
      case 62:
        n2 = "&gt;";
        break;
      default:
        continue;
    }
    o5 !== r4 && (i4 += t5.slice(o5, r4)), o5 = r4 + 1, i4 += n2;
  }
  return o5 !== r4 ? i4 + t5.slice(o5, r4) : i4;
}
function escapeHtmlComment(e4) {
  return e4.replace(I, "");
}
function looseEqual(e4, t5) {
  if (e4 === t5) return true;
  let a6 = isDate(e4), n2 = isDate(t5);
  if (a6 || n2) return !(!a6 || !n2) && e4.getTime() === t5.getTime();
  if (a6 = isSymbol(e4), n2 = isSymbol(t5), a6 || n2) return e4 === t5;
  if (a6 = i(e4), n2 = i(t5), a6 || n2) return !(!a6 || !n2) && (function(e5, t6) {
    if (e5.length !== t6.length) return false;
    let a7 = true;
    for (let n3 = 0; a7 && n3 < e5.length; n3++) a7 = looseEqual(e5[n3], t6[n3]);
    return a7;
  })(e4, t5);
  if (a6 = isObject(e4), n2 = isObject(t5), a6 || n2) {
    if (!a6 || !n2) return false;
    if (Object.keys(e4).length !== Object.keys(t5).length) return false;
    for (const a7 in e4) {
      const n3 = e4.hasOwnProperty(a7), r4 = t5.hasOwnProperty(a7);
      if (n3 && !r4 || !n3 && r4 || !looseEqual(e4[a7], t5[a7])) return false;
    }
  }
  return String(e4) === String(t5);
}
function looseIndexOf(e4, t5) {
  return e4.findIndex((e5) => looseEqual(e5, t5));
}
function normalizeCssVarValue(e4) {
  return null == e4 ? "initial" : "string" == typeof e4 ? "" === e4 ? " " : e4 : String(e4);
}
var t, a, NOOP, NO, isOn, isModelListener, n, remove, r, hasOwn, i, isMap, isSet, isDate, isRegExp, isFunction, isString, isSymbol, isObject, isPromise, o, toTypeString, toRawType, isPlainObject, isIntegerKey, s, l, cacheStringFunction, c, p, m, d, f, u, hasChanged, invokeArrayFns, def, looseToNumber, toNumber, g, getGlobalThis, h, y, b, E, S, A, T, N, k, O, M, C, x, v, R, _, L, P, w, D, F, z, I, U, isRef, toDisplayString, replacer, stringifySymbol, j;
var init_shared_esm_bundler = __esm({
  ".output/server/chunks/_/shared.esm-bundler.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_nitro();
    __name(makeMap, "makeMap");
    t = {};
    a = [];
    NOOP = /* @__PURE__ */ __name(() => {
    }, "NOOP");
    NO = /* @__PURE__ */ __name(() => false, "NO");
    isOn = /* @__PURE__ */ __name((e4) => 111 === e4.charCodeAt(0) && 110 === e4.charCodeAt(1) && (e4.charCodeAt(2) > 122 || e4.charCodeAt(2) < 97), "isOn");
    isModelListener = /* @__PURE__ */ __name((e4) => e4.startsWith("onUpdate:"), "isModelListener");
    n = Object.assign;
    remove = /* @__PURE__ */ __name((e4, t5) => {
      const a6 = e4.indexOf(t5);
      a6 > -1 && e4.splice(a6, 1);
    }, "remove");
    r = Object.prototype.hasOwnProperty;
    hasOwn = /* @__PURE__ */ __name((e4, t5) => r.call(e4, t5), "hasOwn");
    i = Array.isArray;
    isMap = /* @__PURE__ */ __name((e4) => "[object Map]" === toTypeString(e4), "isMap");
    isSet = /* @__PURE__ */ __name((e4) => "[object Set]" === toTypeString(e4), "isSet");
    isDate = /* @__PURE__ */ __name((e4) => "[object Date]" === toTypeString(e4), "isDate");
    isRegExp = /* @__PURE__ */ __name((e4) => "[object RegExp]" === toTypeString(e4), "isRegExp");
    isFunction = /* @__PURE__ */ __name((e4) => "function" == typeof e4, "isFunction");
    isString = /* @__PURE__ */ __name((e4) => "string" == typeof e4, "isString");
    isSymbol = /* @__PURE__ */ __name((e4) => "symbol" == typeof e4, "isSymbol");
    isObject = /* @__PURE__ */ __name((e4) => null !== e4 && "object" == typeof e4, "isObject");
    isPromise = /* @__PURE__ */ __name((e4) => (isObject(e4) || isFunction(e4)) && isFunction(e4.then) && isFunction(e4.catch), "isPromise");
    o = Object.prototype.toString;
    toTypeString = /* @__PURE__ */ __name((e4) => o.call(e4), "toTypeString");
    toRawType = /* @__PURE__ */ __name((e4) => toTypeString(e4).slice(8, -1), "toRawType");
    isPlainObject = /* @__PURE__ */ __name((e4) => "[object Object]" === toTypeString(e4), "isPlainObject");
    isIntegerKey = /* @__PURE__ */ __name((e4) => isString(e4) && "NaN" !== e4 && "-" !== e4[0] && "" + parseInt(e4, 10) === e4, "isIntegerKey");
    s = makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
    l = makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
    cacheStringFunction = /* @__PURE__ */ __name((e4) => {
      const t5 = /* @__PURE__ */ Object.create(null);
      return (a6) => t5[a6] || (t5[a6] = e4(a6));
    }, "cacheStringFunction");
    c = /-\w/g;
    p = cacheStringFunction((e4) => e4.replace(c, (e5) => e5.slice(1).toUpperCase()));
    m = /\B([A-Z])/g;
    d = cacheStringFunction((e4) => e4.replace(m, "-$1").toLowerCase());
    f = cacheStringFunction((e4) => e4.charAt(0).toUpperCase() + e4.slice(1));
    u = cacheStringFunction((e4) => e4 ? `on${f(e4)}` : "");
    hasChanged = /* @__PURE__ */ __name((e4, t5) => !Object.is(e4, t5), "hasChanged");
    invokeArrayFns = /* @__PURE__ */ __name((e4, ...t5) => {
      for (let a6 = 0; a6 < e4.length; a6++) e4[a6](...t5);
    }, "invokeArrayFns");
    def = /* @__PURE__ */ __name((e4, t5, a6, n2 = false) => {
      Object.defineProperty(e4, t5, { configurable: true, enumerable: false, writable: n2, value: a6 });
    }, "def");
    looseToNumber = /* @__PURE__ */ __name((e4) => {
      const t5 = parseFloat(e4);
      return isNaN(t5) ? e4 : t5;
    }, "looseToNumber");
    toNumber = /* @__PURE__ */ __name((e4) => {
      const t5 = isString(e4) ? Number(e4) : NaN;
      return isNaN(t5) ? e4 : t5;
    }, "toNumber");
    getGlobalThis = /* @__PURE__ */ __name(() => g || (g = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : void 0 !== qr ? qr : {}), "getGlobalThis");
    h = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
    y = { 1: "TEXT", 2: "CLASS", 4: "STYLE", 8: "PROPS", 16: "FULL_PROPS", 32: "NEED_HYDRATION", 64: "STABLE_FRAGMENT", 128: "KEYED_FRAGMENT", 256: "UNKEYED_FRAGMENT", 512: "NEED_PATCH", 1024: "DYNAMIC_SLOTS", 2048: "DEV_ROOT_FRAGMENT", [-1]: "CACHED", [-2]: "BAIL" };
    b = { 1: "STABLE", 2: "DYNAMIC", 3: "FORWARDED" };
    E = makeMap("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
    S = E;
    __name(generateCodeFrame, "generateCodeFrame");
    __name(normalizeStyle, "normalizeStyle");
    A = /;(?![^(]*\))/g;
    T = /:([^]+)/;
    N = /\/\*[^]*?\*\//g;
    __name(parseStringStyle, "parseStringStyle");
    __name(stringifyStyle, "stringifyStyle");
    __name(normalizeClass, "normalizeClass");
    __name(normalizeProps, "normalizeProps");
    k = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot");
    O = makeMap("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view");
    M = makeMap("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics");
    C = makeMap("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr");
    x = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
    v = makeMap(x);
    R = makeMap(x + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
    __name(includeBooleanAttr, "includeBooleanAttr");
    _ = /[>/="'\u0009\u000a\u000c\u0020]/;
    L = {};
    __name(isSSRSafeAttrName, "isSSRSafeAttrName");
    P = { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" };
    w = makeMap("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap");
    D = makeMap("xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan");
    F = makeMap("accent,accentunder,actiontype,align,alignmentscope,altimg,altimg-height,altimg-valign,altimg-width,alttext,bevelled,close,columnsalign,columnlines,columnspan,denomalign,depth,dir,display,displaystyle,encoding,equalcolumns,equalrows,fence,fontstyle,fontweight,form,frame,framespacing,groupalign,height,href,id,indentalign,indentalignfirst,indentalignlast,indentshift,indentshiftfirst,indentshiftlast,indextype,justify,largetop,largeop,lquote,lspace,mathbackground,mathcolor,mathsize,mathvariant,maxsize,minlabelspacing,mode,other,overflow,position,rowalign,rowlines,rowspan,rquote,rspace,scriptlevel,scriptminsize,scriptsizemultiplier,selection,separator,separators,shift,side,src,stackalign,stretchy,subscriptshift,superscriptshift,symmetric,voffset,width,widths,xlink:href,xlink:show,xlink:type,xmlns");
    __name(isRenderableAttrValue, "isRenderableAttrValue");
    z = /["'&<>]/;
    __name(escapeHtml, "escapeHtml");
    I = /^-?>|<!--|-->|--!>|<!-$/g;
    __name(escapeHtmlComment, "escapeHtmlComment");
    U = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
    __name(looseEqual, "looseEqual");
    __name(looseIndexOf, "looseIndexOf");
    isRef = /* @__PURE__ */ __name((e4) => !(!e4 || true !== e4.__v_isRef), "isRef");
    toDisplayString = /* @__PURE__ */ __name((e4) => isString(e4) ? e4 : null == e4 ? "" : i(e4) || isObject(e4) && (e4.toString === o || !isFunction(e4.toString)) ? isRef(e4) ? toDisplayString(e4.value) : JSON.stringify(e4, replacer, 2) : String(e4), "toDisplayString");
    replacer = /* @__PURE__ */ __name((e4, t5) => isRef(t5) ? replacer(e4, t5.value) : isMap(t5) ? { [`Map(${t5.size})`]: [...t5.entries()].reduce((e5, [t6, a6], n2) => (e5[stringifySymbol(t6, n2) + " =>"] = a6, e5), {}) } : isSet(t5) ? { [`Set(${t5.size})`]: [...t5.values()].map((e5) => stringifySymbol(e5)) } : isSymbol(t5) ? stringifySymbol(t5) : !isObject(t5) || i(t5) || isPlainObject(t5) ? t5 : String(t5), "replacer");
    stringifySymbol = /* @__PURE__ */ __name((e4, t5 = "") => {
      var a6;
      return isSymbol(e4) ? `Symbol(${null != (a6 = e4.description) ? a6 : t5})` : e4;
    }, "stringifySymbol");
    __name(normalizeCssVarValue, "normalizeCssVarValue");
    j = Object.freeze(Object.defineProperty({ __proto__: null, EMPTY_ARR: a, EMPTY_OBJ: t, NO, NOOP, PatchFlagNames: y, PatchFlags: { TEXT: 1, 1: "TEXT", CLASS: 2, 2: "CLASS", STYLE: 4, 4: "STYLE", PROPS: 8, 8: "PROPS", FULL_PROPS: 16, 16: "FULL_PROPS", NEED_HYDRATION: 32, 32: "NEED_HYDRATION", STABLE_FRAGMENT: 64, 64: "STABLE_FRAGMENT", KEYED_FRAGMENT: 128, 128: "KEYED_FRAGMENT", UNKEYED_FRAGMENT: 256, 256: "UNKEYED_FRAGMENT", NEED_PATCH: 512, 512: "NEED_PATCH", DYNAMIC_SLOTS: 1024, 1024: "DYNAMIC_SLOTS", DEV_ROOT_FRAGMENT: 2048, 2048: "DEV_ROOT_FRAGMENT", CACHED: -1, "-1": "CACHED", BAIL: -2, "-2": "BAIL" }, ShapeFlags: { ELEMENT: 1, 1: "ELEMENT", FUNCTIONAL_COMPONENT: 2, 2: "FUNCTIONAL_COMPONENT", STATEFUL_COMPONENT: 4, 4: "STATEFUL_COMPONENT", TEXT_CHILDREN: 8, 8: "TEXT_CHILDREN", ARRAY_CHILDREN: 16, 16: "ARRAY_CHILDREN", SLOTS_CHILDREN: 32, 32: "SLOTS_CHILDREN", TELEPORT: 64, 64: "TELEPORT", SUSPENSE: 128, 128: "SUSPENSE", COMPONENT_SHOULD_KEEP_ALIVE: 256, 256: "COMPONENT_SHOULD_KEEP_ALIVE", COMPONENT_KEPT_ALIVE: 512, 512: "COMPONENT_KEPT_ALIVE", COMPONENT: 6, 6: "COMPONENT" }, SlotFlags: { STABLE: 1, 1: "STABLE", DYNAMIC: 2, 2: "DYNAMIC", FORWARDED: 3, 3: "FORWARDED" }, camelize: p, capitalize: f, cssVarNameEscapeSymbolsRE: U, def, escapeHtml, escapeHtmlComment, extend: n, genCacheKey: /* @__PURE__ */ __name(function(e4, t5) {
      return e4 + JSON.stringify(t5, (e5, t6) => "function" == typeof t6 ? t6.toString() : t6);
    }, "genCacheKey"), genPropsAccessExp: /* @__PURE__ */ __name(function(e4) {
      return h.test(e4) ? `__props.${e4}` : `__props[${JSON.stringify(e4)}]`;
    }, "genPropsAccessExp"), generateCodeFrame, getEscapedCssVarName: /* @__PURE__ */ __name(function(e4, t5) {
      return e4.replace(U, (e5) => t5 ? '"' === e5 ? '\\\\\\"' : `\\\\${e5}` : `\\${e5}`);
    }, "getEscapedCssVarName"), getGlobalThis, hasChanged, hasOwn, hyphenate: d, includeBooleanAttr, invokeArrayFns, isArray: i, isBooleanAttr: R, isBuiltInDirective: l, isDate, isFunction, isGloballyAllowed: E, isGloballyWhitelisted: S, isHTMLTag: k, isIntegerKey, isKnownHtmlAttr: w, isKnownMathMLAttr: F, isKnownSvgAttr: D, isMap, isMathMLTag: M, isModelListener, isObject, isOn, isPlainObject, isPromise, isRegExp, isRenderableAttrValue, isReservedProp: s, isSSRSafeAttrName, isSVGTag: O, isSet, isSpecialBooleanAttr: v, isString, isSymbol, isVoidTag: C, looseEqual, looseIndexOf, looseToNumber, makeMap, normalizeClass, normalizeCssVarValue, normalizeProps, normalizeStyle, objectToString: o, parseStringStyle, propsToAttrMap: P, remove, slotFlagsText: b, stringifyStyle, toDisplayString, toHandlerKey: u, toNumber, toRawType, toTypeString }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .output/server/chunks/_/error-500.mjs
var error_500_exports = {};
__export(error_500_exports, {
  template: () => template
});
import "cloudflare:workers";
var t2, template;
var init_error_500 = __esm({
  ".output/server/chunks/_/error-500.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_shared_esm_bundler();
    init_nitro();
    t2 = { appName: "Nuxt", statusCode: 500, statusMessage: "Internal server error", description: "This page is temporarily unavailable.", refresh: "Refresh this page" };
    template = /* @__PURE__ */ __name((r4) => (r4 = { ...t2, ...r4 }, '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(r4.statusCode) + " - " + escapeHtml(r4.statusMessage) + " | " + escapeHtml(r4.appName) + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide"><div class="max-w-520px text-center"><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]">` + escapeHtml(r4.statusCode) + '</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl">' + escapeHtml(r4.statusMessage) + '</h2><p class="mb-4 px-2 text-[#64748B] text-md">' + escapeHtml(r4.description) + "</p></div></body></html>"), "template");
  }
});

// .output/server/chunks/build/client.precomputed.mjs
var client_precomputed_exports = {};
__export(client_precomputed_exports, {
  default: () => e
});
var e, c2, r2;
var init_client_precomputed = __esm({
  ".output/server/chunks/build/client.precomputed.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    e = { dependencies: { "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js": { scripts: { "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js": c2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "B3KK4pm7.js", name: "entry", src: "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js", isEntry: true, dynamicImports: ["node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue", "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue"] } }, styles: {}, preload: { "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js": c2 }, prefetch: {} }, "_BuaNhO9U.js": { scripts: {}, styles: {}, preload: { "_BuaNhO9U.js": r2 = { resourceType: "script", module: true, prefetch: true, preload: true, file: "BuaNhO9U.js", name: "_plugin-vue_export-helper", imports: ["node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js"] }, "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js": c2 }, prefetch: {} }, "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue": { scripts: {}, styles: {}, preload: { "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "w2q2rZmz.js", name: "error-404", src: "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue", isDynamicEntry: true, imports: ["node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js", "_BuaNhO9U.js"], css: [] }, "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js": c2, "_BuaNhO9U.js": r2 }, prefetch: {} }, "error-404.CKc8ARh6.css": { scripts: {}, styles: {}, preload: { "error-404.CKc8ARh6.css": { file: "error-404.CKc8ARh6.css", resourceType: "style", prefetch: true, preload: true } }, prefetch: {} }, "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue": { scripts: {}, styles: {}, preload: { "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue": { resourceType: "script", module: true, prefetch: true, preload: true, file: "dNVVQoDL.js", name: "error-500", src: "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue", isDynamicEntry: true, imports: ["_BuaNhO9U.js", "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js"], css: [] }, "_BuaNhO9U.js": r2, "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js": c2 }, prefetch: {} }, "error-500.Dlj1-80_.css": { scripts: {}, styles: {}, preload: { "error-500.Dlj1-80_.css": { file: "error-500.Dlj1-80_.css", resourceType: "style", prefetch: true, preload: true } }, prefetch: {} } }, entrypoints: ["node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js"], modules: { "_BuaNhO9U.js": { file: "BuaNhO9U.js", resourceType: "script", mimeType: void 0, module: true }, "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue": { file: "w2q2rZmz.js", resourceType: "script", mimeType: void 0, module: true }, "error-404.CKc8ARh6.css": { file: "error-404.CKc8ARh6.css", resourceType: "style", mimeType: void 0, module: void 0 }, "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue": { file: "dNVVQoDL.js", resourceType: "script", mimeType: void 0, module: true }, "error-500.Dlj1-80_.css": { file: "error-500.Dlj1-80_.css", resourceType: "style", mimeType: void 0, module: void 0 }, "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/entry.js": { file: "B3KK4pm7.js", resourceType: "script", mimeType: void 0, module: true } } };
  }
});

// .output/server/chunks/build/_plugin-vue_export-helper-CREzXVPK.mjs
function useHead2(s4, o5 = {}) {
  const a6 = o5.head || (function(e4) {
    const s5 = e4 || useNuxtApp();
    return s5.ssrContext?.head || s5.runWithContext(() => {
      if (Gt.hasInjectionContext()) {
        const n2 = Gt.inject(gr);
        if (!n2) throw new Error("[nuxt] [unhead] Missing Unhead instance.");
        return n2;
      }
    });
  })(o5.nuxt);
  return useHead(s4, { head: a6, ...o5 });
}
var _export_sfc;
var init_plugin_vue_export_helper_CREzXVPK = __esm({
  ".output/server/chunks/build/_plugin-vue_export-helper-CREzXVPK.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_server();
    init_renderer();
    __name(useHead2, "useHead");
    _export_sfc = /* @__PURE__ */ __name((n2, t5) => {
      const e4 = n2.__vccOpts || n2;
      for (const [n3, r4] of t5) e4[n3] = r4;
      return e4;
    }, "_export_sfc");
  }
});

// .output/server/chunks/build/error-404-W597av7l.mjs
var error_404_W597av7l_exports = {};
__export(error_404_W597av7l_exports, {
  default: () => x2
});
import "cloudflare:workers";
function defineNuxtLink(a6) {
  const n2 = a6.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(e4) {
    return "string" == typeof e4 && e4.startsWith("#");
  }
  __name(isHashLinkWithoutHashMode, "isHashLinkWithoutHashMode");
  function useNuxtLink(e4) {
    const n3 = useRouter(), s4 = useRuntimeConfig(), c4 = Gt.computed(() => !!e4.target && "_self" !== e4.target), p3 = Gt.computed(() => {
      const r4 = e4.to || e4.href || "";
      return "string" == typeof r4 && hasProtocol(r4, { acceptRelative: true });
    }), f3 = Gt.resolveComponent("RouterLink"), h4 = f3 && "string" != typeof f3 ? f3.useLink : void 0, v3 = Gt.computed(() => {
      if (e4.external) return true;
      const t5 = e4.to || e4.href || "";
      return "object" != typeof t5 && ("" === t5 || p3.value);
    }), m3 = Gt.computed(() => {
      const t5 = e4.to || e4.href || "";
      return v3.value ? t5 : (function(e5, t6, r4) {
        const n4 = r4 ?? a6.trailingSlash;
        if (!e5 || "append" !== n4 && "remove" !== n4) return e5;
        if ("string" == typeof e5) return applyTrailingSlashBehavior(e5, n4);
        const o5 = "path" in e5 && void 0 !== e5.path ? e5.path : t6(e5).path;
        return { ...e5, name: void 0, path: applyTrailingSlashBehavior(o5, n4) };
      })(t5, n3.resolve, e4.trailingSlash);
    }), g4 = v3.value ? void 0 : h4?.({ ...e4, to: m3 }), y4 = Gt.computed(() => {
      const t5 = e4.trailingSlash ?? a6.trailingSlash;
      if (!m3.value || p3.value || isHashLinkWithoutHashMode(m3.value)) return m3.value;
      if (v3.value) {
        const e5 = "object" == typeof m3.value && "path" in m3.value ? resolveRouteObject(m3.value) : m3.value;
        return applyTrailingSlashBehavior("object" == typeof e5 ? n3.resolve(e5).href : e5, t5);
      }
      return "object" == typeof m3.value ? n3.resolve(m3.value)?.href ?? null : applyTrailingSlashBehavior(joinURL(s4.app.baseURL, m3.value), t5);
    });
    return { to: m3, hasTarget: c4, isAbsoluteUrl: p3, isExternal: v3, href: y4, isActive: g4?.isActive ?? Gt.computed(() => m3.value === n3.currentRoute.value.path), isExactActive: g4?.isExactActive ?? Gt.computed(() => m3.value === n3.currentRoute.value.path), route: g4?.route ?? Gt.computed(() => n3.resolve(m3.value)), async navigate(t5) {
      await navigateTo(y4.value, { replace: e4.replace, external: v3.value || c4.value });
    } };
  }
  __name(useNuxtLink, "useNuxtLink");
  return Gt.defineComponent({ name: n2, props: { to: { type: [String, Object], default: void 0, required: false }, href: { type: [String, Object], default: void 0, required: false }, target: { type: String, default: void 0, required: false }, rel: { type: String, default: void 0, required: false }, noRel: { type: Boolean, default: void 0, required: false }, prefetch: { type: Boolean, default: void 0, required: false }, prefetchOn: { type: [String, Object], default: void 0, required: false }, noPrefetch: { type: Boolean, default: void 0, required: false }, activeClass: { type: String, default: void 0, required: false }, exactActiveClass: { type: String, default: void 0, required: false }, prefetchedClass: { type: String, default: void 0, required: false }, replace: { type: Boolean, default: void 0, required: false }, ariaCurrentValue: { type: String, default: void 0, required: false }, external: { type: Boolean, default: void 0, required: false }, custom: { type: Boolean, default: void 0, required: false }, trailingSlash: { type: String, default: void 0, required: false } }, useLink: useNuxtLink, setup(t5, { slots: r4 }) {
    const n3 = useRouter(), { to: u3, href: l3, navigate: d3, isExternal: c4, hasTarget: p3, isAbsoluteUrl: f3 } = useNuxtLink(t5);
    Gt.shallowRef(false);
    async function prefetch(e4 = useNuxtApp()) {
    }
    __name(prefetch, "prefetch");
    return () => {
      if (!c4.value && !p3.value && !isHashLinkWithoutHashMode(u3.value)) {
        const e4 = { ref: void 0, to: u3.value, activeClass: t5.activeClass || a6.activeClass, exactActiveClass: t5.exactActiveClass || a6.exactActiveClass, replace: t5.replace, ariaCurrentValue: t5.ariaCurrentValue, custom: t5.custom };
        return t5.custom || (e4.rel = t5.rel || void 0), Gt.h(Gt.resolveComponent("RouterLink"), e4, r4.default);
      }
      const i4 = t5.target || null, s4 = ((...e4) => e4.find((e5) => void 0 !== e5))(t5.noRel ? "" : t5.rel, a6.externalRelAttribute, f3.value || p3.value ? "noopener noreferrer" : "") || null;
      return t5.custom ? r4.default ? r4.default({ href: l3.value, navigate: d3, prefetch, get route() {
        if (!l3.value) return;
        const t6 = new URL(l3.value, "http://localhost");
        return { path: t6.pathname, fullPath: t6.pathname, get query() {
          return parseQuery(t6.search);
        }, hash: t6.hash, params: {}, name: void 0, matched: [], redirectedFrom: void 0, meta: {}, href: l3.value };
      }, rel: s4, target: i4, isExternal: c4.value || p3.value, isActive: false, isExactActive: false }) : null : Gt.h("a", { ref: void 0, href: l3.value || null, rel: s4, target: i4, onClick: /* @__PURE__ */ __name((e4) => {
        if (!c4.value && !p3.value) return e4.preventDefault(), t5.replace ? n3.replace(l3.value) : n3.push(l3.value);
      }, "onClick") }, r4.default?.());
    };
  } });
}
function applyTrailingSlashBehavior(e4, r4) {
  const o5 = "append" === r4 ? withTrailingSlash : withoutTrailingSlash;
  return hasProtocol(e4) && !e4.startsWith("http") ? e4 : o5(e4, true);
}
var g2, y2, b2, x2;
var init_error_404_W597av7l = __esm({
  ".output/server/chunks/build/error-404-W597av7l.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_nitro();
    init_server();
    init_plugin_vue_export_helper_CREzXVPK();
    init_renderer();
    init_shared_esm_bundler();
    __name(defineNuxtLink, "defineNuxtLink");
    g2 = defineNuxtLink(xn);
    __name(applyTrailingSlashBehavior, "applyTrailingSlashBehavior");
    y2 = { __name: "error-404", __ssrInlineRender: true, props: { appName: { type: String, default: "Nuxt" }, statusCode: { type: Number, default: 404 }, statusMessage: { type: String, default: "Page not found" }, description: { type: String, default: "Sorry, the page you are looking for could not be found." }, backHome: { type: String, default: "Go back home" } }, setup(e4) {
      const t5 = e4;
      return useHead2({ title: `${t5.statusCode} - ${t5.statusMessage} | ${t5.appName}`, script: [{ innerHTML: `!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();` }], style: [{ innerHTML: '*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }' }] }), (t6, r4, a6, n2) => {
        const i4 = g2;
        r4(`<div${ssrRenderAttrs(Gt.mergeProps({ class: "antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide" }, n2))} data-v-69929ac6><div class="max-w-520px text-center" data-v-69929ac6><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]" data-v-69929ac6>${ssrInterpolate(e4.statusCode)}</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl" data-v-69929ac6>${ssrInterpolate(e4.statusMessage)}</h2><p class="mb-4 px-2 text-[#64748B] text-md" data-v-69929ac6>${ssrInterpolate(e4.description)}</p><div class="flex items-center justify-center w-full" data-v-69929ac6>`), r4(ssrRenderComponent(i4, { to: "/", class: "font-medium hover:text-[#00DC82] text-sm underline underline-offset-3" }, { default: Gt.withCtx((t7, r5, a7, n3) => {
          if (!r5) return [Gt.createTextVNode(Gt.toDisplayString(e4.backHome), 1)];
          r5(`${ssrInterpolate(e4.backHome)}`);
        }), _: 1 }, a6)), r4("</div></div></div>");
      };
    } };
    b2 = y2.setup;
    y2.setup = (e4, t5) => {
      const r4 = Gt.useSSRContext();
      return (r4.modules || (r4.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue"), b2 ? b2(e4, t5) : void 0;
    };
    x2 = _export_sfc(y2, [["__scopeId", "data-v-69929ac6"]]);
  }
});

// .output/server/chunks/build/error-500-Clap-Dgb.mjs
var error_500_Clap_Dgb_exports = {};
__export(error_500_Clap_Dgb_exports, {
  default: () => i2
});
import "cloudflare:workers";
var o2, a2, i2;
var init_error_500_Clap_Dgb = __esm({
  ".output/server/chunks/build/error-500-Clap-Dgb.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_plugin_vue_export_helper_CREzXVPK();
    init_server();
    init_renderer();
    init_nitro();
    init_shared_esm_bundler();
    o2 = { __name: "error-500", __ssrInlineRender: true, props: { appName: { type: String, default: "Nuxt" }, statusCode: { type: Number, default: 500 }, statusMessage: { type: String, default: "Internal server error" }, description: { type: String, default: "This page is temporarily unavailable." }, refresh: { type: String, default: "Refresh this page" } }, setup(e4) {
      const o5 = e4;
      return useHead2({ title: `${o5.statusCode} - ${o5.statusMessage} | ${o5.appName}`, script: [{ innerHTML: `!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();` }], style: [{ innerHTML: '*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }' }] }), (r4, o6, a6, i4) => {
        o6(`<div${ssrRenderAttrs(Gt.mergeProps({ class: "antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide" }, i4))} data-v-5a7877e7><div class="max-w-520px text-center" data-v-5a7877e7><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]" data-v-5a7877e7>${ssrInterpolate(e4.statusCode)}</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl" data-v-5a7877e7>${ssrInterpolate(e4.statusMessage)}</h2><p class="mb-4 px-2 text-[#64748B] text-md" data-v-5a7877e7>${ssrInterpolate(e4.description)}</p></div></div>`);
      };
    } };
    a2 = o2.setup;
    o2.setup = (e4, r4) => {
      const n2 = Gt.useSSRContext();
      return (n2.modules || (n2.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue"), a2 ? a2(e4, r4) : void 0;
    };
    i2 = _export_sfc(o2, [["__scopeId", "data-v-5a7877e7"]]);
  }
});

// .output/server/chunks/build/server.mjs
var server_exports = {};
__export(server_exports, {
  a: () => useNuxtApp,
  b: () => useRuntimeConfig,
  c: () => xn,
  n: () => navigateTo,
  r: () => resolveRouteObject,
  s: () => Bn,
  u: () => useRouter,
  v: () => Gt
});
function registerRuntimeHelpers(e4) {
  Object.getOwnPropertySymbols(e4).forEach((t5) => {
    we[t5] = e4[t5];
  });
}
function createRoot(e4, t5 = "") {
  return { type: 0, source: t5, children: e4, helpers: /* @__PURE__ */ new Set(), components: [], directives: [], hoists: [], imports: [], cached: [], temps: 0, codegenNode: void 0, loc: ke };
}
function createVNodeCall(e4, t5, n2, r4, o5, s4, i4, a6 = false, c4 = false, l3 = false, p3 = ke) {
  return e4 && (a6 ? (e4.helper(te), e4.helper(getVNodeBlockHelper(e4.inSSR, l3))) : e4.helper(getVNodeHelper(e4.inSSR, l3)), i4 && e4.helper(he)), { type: 13, tag: t5, props: n2, children: r4, patchFlag: o5, dynamicProps: s4, directives: i4, isBlock: a6, disableTracking: c4, isComponent: l3, loc: p3 };
}
function createArrayExpression(e4, t5 = ke) {
  return { type: 17, loc: t5, elements: e4 };
}
function createObjectExpression(e4, t5 = ke) {
  return { type: 15, loc: t5, properties: e4 };
}
function createObjectProperty(e4, t5) {
  return { type: 16, loc: ke, key: isString(e4) ? createSimpleExpression(e4, true) : e4, value: t5 };
}
function createSimpleExpression(e4, t5 = false, n2 = ke, r4 = 0) {
  return { type: 4, loc: n2, content: e4, isStatic: t5, constType: t5 ? 3 : r4 };
}
function createCompoundExpression(e4, t5 = ke) {
  return { type: 8, loc: t5, children: e4 };
}
function createCallExpression(e4, t5 = [], n2 = ke) {
  return { type: 14, loc: n2, callee: e4, arguments: t5 };
}
function createFunctionExpression(e4, t5 = void 0, n2 = false, r4 = false, o5 = ke) {
  return { type: 18, params: e4, returns: t5, newline: n2, isSlot: r4, loc: o5 };
}
function createConditionalExpression(e4, t5, n2, r4 = true) {
  return { type: 19, test: e4, consequent: t5, alternate: n2, newline: r4, loc: ke };
}
function createCacheExpression(e4, t5, n2 = false, r4 = false) {
  return { type: 20, index: e4, value: t5, needPauseTracking: n2, inVOnce: r4, needArraySpread: false, loc: ke };
}
function createBlockStatement(e4) {
  return { type: 21, body: e4, loc: ke };
}
function getVNodeHelper(e4, t5) {
  return e4 || t5 ? oe : se;
}
function getVNodeBlockHelper(e4, t5) {
  return e4 || t5 ? ne : re;
}
function convertToBlock(e4, { helper: t5, removeHelper: n2, inSSR: r4 }) {
  e4.isBlock || (e4.isBlock = true, n2(getVNodeHelper(r4, e4.isComponent)), t5(te), t5(getVNodeBlockHelper(r4, e4.isComponent)));
}
function isTagStartChar(e4) {
  return e4 >= 97 && e4 <= 122 || e4 >= 65 && e4 <= 90;
}
function isWhitespace(e4) {
  return 32 === e4 || 10 === e4 || 9 === e4 || 12 === e4 || 13 === e4;
}
function isEndOfTagSection(e4) {
  return 47 === e4 || 62 === e4 || isWhitespace(e4);
}
function toCharCodes(e4) {
  const t5 = new Uint8Array(e4.length);
  for (let n2 = 0; n2 < e4.length; n2++) t5[n2] = e4.charCodeAt(n2);
  return t5;
}
function getCompatValue(e4, { compatConfig: t5 }) {
  const n2 = t5 && t5[e4];
  return "MODE" === e4 ? n2 || 3 : n2;
}
function isCompatEnabled(e4, t5) {
  const n2 = getCompatValue("MODE", t5), r4 = getCompatValue(e4, t5);
  return 3 === n2 ? true === r4 : false !== r4;
}
function checkCompatEnabled(e4, t5, n2, ...r4) {
  return isCompatEnabled(e4, t5);
}
function defaultOnError(e4) {
  throw e4;
}
function defaultOnWarn(e4) {
}
function createCompilerError(e4, t5, n2, r4) {
  const o5 = new SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e4}`));
  return o5.code = e4, o5.loc = t5, o5;
}
function walkBlockDeclarations(e4, t5) {
  const n2 = "SwitchCase" === e4.type ? e4.consequent : e4.body;
  for (const e5 of n2) if ("VariableDeclaration" === e5.type) {
    if (e5.declare) continue;
    for (const n3 of e5.declarations) for (const e6 of extractIdentifiers(n3.id)) t5(e6);
  } else if ("FunctionDeclaration" === e5.type || "ClassDeclaration" === e5.type) {
    if (e5.declare || !e5.id) continue;
    t5(e5.id);
  } else isForStatement(e5) ? walkForStatement(e5, true, t5) : "SwitchStatement" === e5.type && walkSwitchStatement(e5, true, t5);
}
function isForStatement(e4) {
  return "ForOfStatement" === e4.type || "ForInStatement" === e4.type || "ForStatement" === e4.type;
}
function walkForStatement(e4, t5, n2) {
  const r4 = "ForStatement" === e4.type ? e4.init : e4.left;
  if (r4 && "VariableDeclaration" === r4.type && ("var" === r4.kind ? t5 : !t5)) for (const e5 of r4.declarations) for (const t6 of extractIdentifiers(e5.id)) n2(t6);
}
function walkSwitchStatement(e4, t5, n2) {
  for (const r4 of e4.cases) {
    for (const e5 of r4.consequent) if ("VariableDeclaration" === e5.type && ("var" === e5.kind ? t5 : !t5)) for (const t6 of e5.declarations) for (const e6 of extractIdentifiers(t6.id)) n2(e6);
    walkBlockDeclarations(r4, n2);
  }
}
function extractIdentifiers(e4, t5 = []) {
  switch (e4.type) {
    case "Identifier":
      t5.push(e4);
      break;
    case "MemberExpression":
      let n2 = e4;
      for (; "MemberExpression" === n2.type; ) n2 = n2.object;
      t5.push(n2);
      break;
    case "ObjectPattern":
      for (const n3 of e4.properties) "RestElement" === n3.type ? extractIdentifiers(n3.argument, t5) : extractIdentifiers(n3.value, t5);
      break;
    case "ArrayPattern":
      e4.elements.forEach((e5) => {
        e5 && extractIdentifiers(e5, t5);
      });
      break;
    case "RestElement":
      extractIdentifiers(e4.argument, t5);
      break;
    case "AssignmentPattern":
      extractIdentifiers(e4.left, t5);
  }
  return t5;
}
function isCoreComponent(e4) {
  switch (e4) {
    case "Teleport":
    case "teleport":
      return Q;
    case "Suspense":
    case "suspense":
      return z2;
    case "KeepAlive":
    case "keep-alive":
      return Z;
    case "BaseTransition":
    case "base-transition":
      return ee;
  }
}
function advancePositionWithMutation(e4, t5, n2 = t5.length) {
  let r4 = 0, o5 = -1;
  for (let e5 = 0; e5 < n2; e5++) 10 === t5.charCodeAt(e5) && (r4++, o5 = e5);
  return e4.offset += n2, e4.line += r4, e4.column = -1 === o5 ? e4.column + n2 : n2 - o5, e4;
}
function findDir(e4, t5, n2 = false) {
  for (let r4 = 0; r4 < e4.props.length; r4++) {
    const o5 = e4.props[r4];
    if (7 === o5.type && (n2 || o5.exp) && (isString(t5) ? o5.name === t5 : t5.test(o5.name))) return o5;
  }
}
function findProp(e4, t5, n2 = false, r4 = false) {
  for (let o5 = 0; o5 < e4.props.length; o5++) {
    const s4 = e4.props[o5];
    if (6 === s4.type) {
      if (n2) continue;
      if (s4.name === t5 && (s4.value || r4)) return s4;
    } else if ("bind" === s4.name && (s4.exp || r4) && isStaticArgOf(s4.arg, t5)) return s4;
  }
}
function isStaticArgOf(e4, t5) {
  return !(!e4 || !isStaticExp(e4) || e4.content !== t5);
}
function hasDynamicKeyVBind(e4) {
  return e4.props.some((e5) => !(7 !== e5.type || "bind" !== e5.name || e5.arg && 4 === e5.arg.type && e5.arg.isStatic));
}
function isText$1(e4) {
  return 5 === e4.type || 2 === e4.type;
}
function isVPre(e4) {
  return 7 === e4.type && "pre" === e4.name;
}
function isVSlot(e4) {
  return 7 === e4.type && "slot" === e4.name;
}
function isTemplateNode(e4) {
  return 1 === e4.type && 3 === e4.tagType;
}
function isSlotOutlet(e4) {
  return 1 === e4.type && 2 === e4.tagType;
}
function getUnnormalizedProps(e4, t5 = []) {
  if (e4 && !isString(e4) && 14 === e4.type) {
    const n2 = e4.callee;
    if (!isString(n2) && ze.has(n2)) return getUnnormalizedProps(e4.arguments[0], t5.concat(e4));
  }
  return [e4, t5];
}
function injectProp(e4, t5, n2) {
  let r4, o5, s4 = 13 === e4.type ? e4.props : e4.arguments[2], i4 = [];
  if (s4 && !isString(s4) && 14 === s4.type) {
    const e5 = getUnnormalizedProps(s4);
    s4 = e5[0], i4 = e5[1], o5 = i4[i4.length - 1];
  }
  if (null == s4 || isString(s4)) r4 = createObjectExpression([t5]);
  else if (14 === s4.type) {
    const e5 = s4.arguments[0];
    isString(e5) || 15 !== e5.type ? s4.callee === Ce ? r4 = createCallExpression(n2.helper(_e), [createObjectExpression([t5]), s4]) : s4.arguments.unshift(createObjectExpression([t5])) : hasProp(t5, e5) || e5.properties.unshift(t5), !r4 && (r4 = s4);
  } else 15 === s4.type ? (hasProp(t5, s4) || s4.properties.unshift(t5), r4 = s4) : (r4 = createCallExpression(n2.helper(_e), [createObjectExpression([t5]), s4]), o5 && o5.callee === Ne && (o5 = i4[i4.length - 2]));
  13 === e4.type ? o5 ? o5.arguments[0] = r4 : e4.props = r4 : o5 ? o5.arguments[0] = r4 : e4.arguments[2] = r4;
}
function hasProp(e4, t5) {
  let n2 = false;
  if (4 === e4.key.type) {
    const r4 = e4.key.content;
    n2 = t5.properties.some((e5) => 4 === e5.key.type && e5.key.content === r4);
  }
  return n2;
}
function toValidAssetId(e4, t5) {
  return `_${t5}_${e4.replace(/[^\w]/g, (t6, n2) => "-" === t6 ? "_" : e4.charCodeAt(n2).toString())}`;
}
function getMemoedVNodeCall(e4) {
  return 14 === e4.type && e4.callee === Me ? e4.arguments[1].returns : e4;
}
function isAllWhitespace(e4) {
  for (let t5 = 0; t5 < e4.length; t5++) if (!isWhitespace(e4.charCodeAt(t5))) return false;
  return true;
}
function isWhitespaceText(e4) {
  return 2 === e4.type && isAllWhitespace(e4.content) || 12 === e4.type && isWhitespaceText(e4.content);
}
function isCommentOrWhitespace(e4) {
  return 3 === e4.type || isWhitespaceText(e4);
}
function getSlice(e4, t5) {
  return rt.slice(e4, t5);
}
function endOpenTag(e4) {
  ht.inSFCRoot && (ot.innerLoc = getLoc(e4 + 1, e4 + 1)), addNode(ot);
  const { tag: t5, ns: n2 } = ot;
  0 === n2 && tt.isPreTag(t5) && lt++, tt.isVoidTag(t5) ? onCloseTag(ot, e4) : (ut.unshift(ot), 1 !== n2 && 2 !== n2 || (ht.inXML = true)), ot = null;
}
function onText(e4, t5, n2) {
  {
    const t6 = ut[0] && ut[0].tag;
    "script" !== t6 && "style" !== t6 && e4.includes("&") && (e4 = tt.decodeEntities(e4, false));
  }
  const r4 = ut[0] || nt, o5 = r4.children[r4.children.length - 1];
  o5 && 2 === o5.type ? (o5.content += e4, setLocEnd(o5.loc, n2)) : r4.children.push({ type: 2, content: e4, loc: getLoc(t5, n2) });
}
function onCloseTag(e4, t5, n2 = false) {
  setLocEnd(e4.loc, n2 ? backTrack(t5, 60) : (function(e5, t6) {
    let n3 = e5;
    for (; rt.charCodeAt(n3) !== t6 && n3 < rt.length - 1; ) n3++;
    return n3;
  })(t5, 62) + 1), ht.inSFCRoot && (e4.children.length ? e4.innerLoc.end = n({}, e4.children[e4.children.length - 1].loc.end) : e4.innerLoc.end = n({}, e4.innerLoc.start), e4.innerLoc.source = getSlice(e4.innerLoc.start.offset, e4.innerLoc.end.offset));
  const { tag: r4, ns: o5, children: s4 } = e4;
  if (pt || ("slot" === r4 ? e4.tagType = 2 : isFragmentTemplate(e4) ? e4.tagType = 3 : (function({ tag: e5, props: t6 }) {
    if (tt.isCustomElement(e5)) return false;
    if ("component" === e5 || (n3 = e5.charCodeAt(0), n3 > 64 && n3 < 91) || isCoreComponent(e5) || tt.isBuiltInComponent && tt.isBuiltInComponent(e5) || tt.isNativeTag && !tt.isNativeTag(e5)) return true;
    var n3;
    for (let e6 = 0; e6 < t6.length; e6++) {
      const n4 = t6[e6];
      if (6 === n4.type) {
        if ("is" === n4.name && n4.value) {
          if (n4.value.content.startsWith("vue:")) return true;
          if (checkCompatEnabled("COMPILER_IS_ON_ELEMENT", tt, n4.loc)) return true;
        }
      } else if ("bind" === n4.name && isStaticArgOf(n4.arg, "is") && checkCompatEnabled("COMPILER_IS_ON_ELEMENT", tt, n4.loc)) return true;
    }
    return false;
  })(e4) && (e4.tagType = 1)), ht.inRCDATA || (e4.children = condenseWhitespace(s4)), 0 === o5 && tt.isIgnoreNewlineTag(r4)) {
    const e5 = s4[0];
    e5 && 2 === e5.type && (e5.content = e5.content.replace(/^\r?\n/, ""));
  }
  0 === o5 && tt.isPreTag(r4) && lt--, dt === e4 && (pt = ht.inVPre = false, dt = null), ht.inXML && 0 === (ut[0] ? ut[0].ns : tt.ns) && (ht.inXML = false);
  {
    const t6 = e4.props;
    if (!ht.inSFCRoot && isCompatEnabled("COMPILER_NATIVE_TEMPLATE", tt) && "template" === e4.tag && !isFragmentTemplate(e4)) {
      const t7 = ut[0] || nt, n4 = t7.children.indexOf(e4);
      t7.children.splice(n4, 1, ...e4.children);
    }
    const n3 = t6.find((e5) => 6 === e5.type && "inline-template" === e5.name);
    n3 && checkCompatEnabled("COMPILER_INLINE_TEMPLATE", tt, n3.loc) && e4.children.length && (n3.value = { type: 2, content: getSlice(e4.children[0].loc.start.offset, e4.children[e4.children.length - 1].loc.end.offset), loc: n3.loc });
  }
}
function backTrack(e4, t5) {
  let n2 = e4;
  for (; rt.charCodeAt(n2) !== t5 && n2 >= 0; ) n2--;
  return n2;
}
function isFragmentTemplate({ tag: e4, props: t5 }) {
  if ("template" === e4) {
    for (let e5 = 0; e5 < t5.length; e5++) if (7 === t5[e5].type && Et.has(t5[e5].name)) return true;
  }
  return false;
}
function condenseWhitespace(e4) {
  const t5 = "preserve" !== tt.whitespace;
  let n2 = false;
  for (let r4 = 0; r4 < e4.length; r4++) {
    const o5 = e4[r4];
    if (2 === o5.type) if (lt) o5.content = o5.content.replace(gt, "\n");
    else if (isAllWhitespace(o5.content)) {
      const s4 = e4[r4 - 1] && e4[r4 - 1].type, i4 = e4[r4 + 1] && e4[r4 + 1].type;
      !s4 || !i4 || t5 && (3 === s4 && (3 === i4 || 1 === i4) || 1 === s4 && (3 === i4 || 1 === i4 && hasNewlineChar(o5.content))) ? (n2 = true, e4[r4] = null) : o5.content = " ";
    } else t5 && (o5.content = condense(o5.content));
  }
  return n2 ? e4.filter(Boolean) : e4;
}
function hasNewlineChar(e4) {
  for (let t5 = 0; t5 < e4.length; t5++) {
    const n2 = e4.charCodeAt(t5);
    if (10 === n2 || 13 === n2) return true;
  }
  return false;
}
function condense(e4) {
  let t5 = "", n2 = false;
  for (let r4 = 0; r4 < e4.length; r4++) isWhitespace(e4.charCodeAt(r4)) ? n2 || (t5 += " ", n2 = true) : (t5 += e4[r4], n2 = false);
  return t5;
}
function addNode(e4) {
  (ut[0] || nt).children.push(e4);
}
function getLoc(e4, t5) {
  return { start: ht.getPos(e4), end: null == t5 ? t5 : ht.getPos(t5), source: null == t5 ? t5 : getSlice(e4, t5) };
}
function setLocEnd(e4, t5) {
  e4.end = ht.getPos(t5), e4.source = getSlice(e4.start.offset, t5);
}
function dirToAttr(e4) {
  const t5 = { type: 6, name: e4.rawName, nameLoc: getLoc(e4.loc.start.offset, e4.loc.start.offset + e4.rawName.length), value: void 0, loc: e4.loc };
  if (e4.exp) {
    const n2 = e4.exp.loc;
    n2.end.offset < e4.loc.end.offset && (n2.start.offset--, n2.start.column--, n2.end.offset++, n2.end.column++), t5.value = { type: 2, content: e4.exp.content, loc: n2 };
  }
  return t5;
}
function createExp(e4, t5 = false, n2, r4 = 0, o5 = 0) {
  return createSimpleExpression(e4, t5, n2, r4);
}
function emitError(e4, t5, n2) {
  tt.onError(createCompilerError(e4, getLoc(t5, t5)));
}
function baseParse(e4, t5) {
  if (ht.reset(), ot = null, st = null, it = "", at = -1, ct = -1, ut.length = 0, rt = e4, tt = n({}, et), t5) {
    let e5;
    for (e5 in t5) null != t5[e5] && (tt[e5] = t5[e5]);
  }
  ht.mode = "html" === tt.parseMode ? 1 : "sfc" === tt.parseMode ? 2 : 0, ht.inXML = 1 === tt.ns || 2 === tt.ns;
  const n2 = t5 && t5.delimiters;
  n2 && (ht.delimiterOpen = toCharCodes(n2[0]), ht.delimiterClose = toCharCodes(n2[1]));
  const r4 = nt = createRoot([], e4);
  return ht.parse(rt), r4.loc = getLoc(0, e4.length), r4.children = condenseWhitespace(r4.children), nt = null, r4;
}
function cacheStatic(e4, t5) {
  walk(e4, void 0, t5, !!getSingleElementRoot(e4));
}
function getSingleElementRoot(e4) {
  const t5 = e4.children.filter((e5) => 3 !== e5.type);
  return 1 !== t5.length || 1 !== t5[0].type || isSlotOutlet(t5[0]) ? null : t5[0];
}
function walk(e4, t5, n2, r4 = false, o5 = false) {
  const { children: s4 } = e4, i4 = [];
  for (let t6 = 0; t6 < s4.length; t6++) {
    const a7 = s4[t6];
    if (1 === a7.type && 0 === a7.tagType) {
      const e5 = r4 ? 0 : getConstantType(a7, n2);
      if (e5 > 0) {
        if (e5 >= 2) {
          a7.codegenNode.patchFlag = -1, i4.push(a7);
          continue;
        }
      } else {
        const e6 = a7.codegenNode;
        if (13 === e6.type) {
          const t7 = e6.patchFlag;
          if ((void 0 === t7 || 512 === t7 || 1 === t7) && getGeneratedPropsConstantType(a7, n2) >= 2) {
            const t8 = getNodeProps(a7);
            t8 && (e6.props = n2.hoist(t8));
          }
          e6.dynamicProps && (e6.dynamicProps = n2.hoist(e6.dynamicProps));
        }
      }
    } else if (12 === a7.type) {
      if ((r4 ? 0 : getConstantType(a7, n2)) >= 2) {
        14 === a7.codegenNode.type && a7.codegenNode.arguments.length > 0 && a7.codegenNode.arguments.push("-1"), i4.push(a7);
        continue;
      }
    }
    if (1 === a7.type) {
      const t7 = 1 === a7.tagType;
      t7 && n2.scopes.vSlot++, walk(a7, e4, n2, false, o5), t7 && n2.scopes.vSlot--;
    } else if (11 === a7.type) walk(a7, e4, n2, 1 === a7.children.length, true);
    else if (9 === a7.type) for (let t7 = 0; t7 < a7.branches.length; t7++) walk(a7.branches[t7], e4, n2, 1 === a7.branches[t7].children.length, o5);
  }
  let a6 = false;
  if (i4.length === s4.length && 1 === e4.type) {
    if (0 === e4.tagType && e4.codegenNode && 13 === e4.codegenNode.type && i(e4.codegenNode.children)) e4.codegenNode.children = getCacheExpression(createArrayExpression(e4.codegenNode.children)), a6 = true;
    else if (1 === e4.tagType && e4.codegenNode && 13 === e4.codegenNode.type && e4.codegenNode.children && !i(e4.codegenNode.children) && 15 === e4.codegenNode.children.type) {
      const t6 = getSlotNode(e4.codegenNode, "default");
      t6 && (t6.returns = getCacheExpression(createArrayExpression(t6.returns)), a6 = true);
    } else if (3 === e4.tagType && t5 && 1 === t5.type && 1 === t5.tagType && t5.codegenNode && 13 === t5.codegenNode.type && t5.codegenNode.children && !i(t5.codegenNode.children) && 15 === t5.codegenNode.children.type) {
      const n3 = findDir(e4, "slot", true), r5 = n3 && n3.arg && getSlotNode(t5.codegenNode, n3.arg);
      r5 && (r5.returns = getCacheExpression(createArrayExpression(r5.returns)), a6 = true);
    }
  }
  if (!a6) for (const e5 of i4) e5.codegenNode = n2.cache(e5.codegenNode);
  function getCacheExpression(e5) {
    const t6 = n2.cache(e5);
    return t6.needArraySpread = true, t6;
  }
  __name(getCacheExpression, "getCacheExpression");
  function getSlotNode(e5, t6) {
    if (e5.children && !i(e5.children) && 15 === e5.children.type) {
      const n3 = e5.children.properties.find((e6) => e6.key === t6 || e6.key.content === t6);
      return n3 && n3.value;
    }
  }
  __name(getSlotNode, "getSlotNode");
  i4.length && n2.transformHoist && n2.transformHoist(s4, n2, e4);
}
function getConstantType(e4, t5) {
  const { constantCache: n2 } = t5;
  switch (e4.type) {
    case 1:
      if (0 !== e4.tagType) return 0;
      const r4 = n2.get(e4);
      if (void 0 !== r4) return r4;
      const o5 = e4.codegenNode;
      if (13 !== o5.type) return 0;
      if (o5.isBlock && "svg" !== e4.tag && "foreignObject" !== e4.tag && "math" !== e4.tag) return 0;
      if (void 0 === o5.patchFlag) {
        let r5 = 3;
        const s5 = getGeneratedPropsConstantType(e4, t5);
        if (0 === s5) return n2.set(e4, 0), 0;
        s5 < r5 && (r5 = s5);
        for (let o6 = 0; o6 < e4.children.length; o6++) {
          const s6 = getConstantType(e4.children[o6], t5);
          if (0 === s6) return n2.set(e4, 0), 0;
          s6 < r5 && (r5 = s6);
        }
        if (r5 > 1) for (let o6 = 0; o6 < e4.props.length; o6++) {
          const s6 = e4.props[o6];
          if (7 === s6.type && "bind" === s6.name && s6.exp) {
            const o7 = getConstantType(s6.exp, t5);
            if (0 === o7) return n2.set(e4, 0), 0;
            o7 < r5 && (r5 = o7);
          }
        }
        if (o5.isBlock) {
          for (let t6 = 0; t6 < e4.props.length; t6++) {
            if (7 === e4.props[t6].type) return n2.set(e4, 0), 0;
          }
          t5.removeHelper(te), t5.removeHelper(getVNodeBlockHelper(t5.inSSR, o5.isComponent)), o5.isBlock = false, t5.helper(getVNodeHelper(t5.inSSR, o5.isComponent));
        }
        return n2.set(e4, r5), r5;
      }
      return n2.set(e4, 0), 0;
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
    default:
      return 0;
    case 5:
    case 12:
      return getConstantType(e4.content, t5);
    case 4:
      return e4.constType;
    case 8:
      let s4 = 3;
      for (let n3 = 0; n3 < e4.children.length; n3++) {
        const r5 = e4.children[n3];
        if (isString(r5) || isSymbol(r5)) continue;
        const o6 = getConstantType(r5, t5);
        if (0 === o6) return 0;
        o6 < s4 && (s4 = o6);
      }
      return s4;
    case 20:
      return 2;
  }
}
function getConstantTypeOfHelperCall(e4, t5) {
  if (14 === e4.type && !isString(e4.callee) && _t.has(e4.callee)) {
    const n2 = e4.arguments[0];
    if (4 === n2.type) return getConstantType(n2, t5);
    if (14 === n2.type) return getConstantTypeOfHelperCall(n2, t5);
  }
  return 0;
}
function getGeneratedPropsConstantType(e4, t5) {
  let n2 = 3;
  const r4 = getNodeProps(e4);
  if (r4 && 15 === r4.type) {
    const { properties: e5 } = r4;
    for (let r5 = 0; r5 < e5.length; r5++) {
      const { key: o5, value: s4 } = e5[r5], i4 = getConstantType(o5, t5);
      if (0 === i4) return i4;
      let a6;
      if (i4 < n2 && (n2 = i4), a6 = 4 === s4.type ? getConstantType(s4, t5) : 14 === s4.type ? getConstantTypeOfHelperCall(s4, t5) : 0, 0 === a6) return a6;
      a6 < n2 && (n2 = a6);
    }
  }
  return n2;
}
function getNodeProps(e4) {
  const t5 = e4.codegenNode;
  if (13 === t5.type) return t5.props;
}
function createTransformContext(e4, { filename: t5 = "", prefixIdentifiers: n2 = false, hoistStatic: r4 = false, hmr: o5 = false, cacheHandlers: s4 = false, nodeTransforms: i4 = [], directiveTransforms: a6 = {}, transformHoist: c4 = null, isBuiltInComponent: l3 = NOOP, isCustomElement: p3 = NOOP, expressionPlugins: d3 = [], scopeId: u3 = null, slotted: h4 = true, ssr: f3 = false, inSSR: m3 = false, ssrCssVars: E3 = "", bindingMetadata: g4 = t, inline: _3 = false, isTS: S3 = false, onError: T3 = defaultOnError, onWarn: y4 = defaultOnWarn, compatConfig: N3 }) {
  const C3 = t5.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), x4 = { filename: t5, selfName: C3 && f(p(C3[1])), prefixIdentifiers: n2, hoistStatic: r4, hmr: o5, cacheHandlers: s4, nodeTransforms: i4, directiveTransforms: a6, transformHoist: c4, isBuiltInComponent: l3, isCustomElement: p3, expressionPlugins: d3, scopeId: u3, slotted: h4, ssr: f3, inSSR: m3, ssrCssVars: E3, bindingMetadata: g4, inline: _3, isTS: S3, onError: T3, onWarn: y4, compatConfig: N3, root: e4, helpers: /* @__PURE__ */ new Map(), components: /* @__PURE__ */ new Set(), directives: /* @__PURE__ */ new Set(), hoists: [], imports: [], cached: [], constantCache: /* @__PURE__ */ new WeakMap(), temps: 0, identifiers: /* @__PURE__ */ Object.create(null), scopes: { vFor: 0, vSlot: 0, vPre: 0, vOnce: 0 }, parent: null, grandParent: null, currentNode: e4, childIndex: 0, inVOnce: false, helper(e5) {
    const t6 = x4.helpers.get(e5) || 0;
    return x4.helpers.set(e5, t6 + 1), e5;
  }, removeHelper(e5) {
    const t6 = x4.helpers.get(e5);
    if (t6) {
      const n3 = t6 - 1;
      n3 ? x4.helpers.set(e5, n3) : x4.helpers.delete(e5);
    }
  }, helperString: /* @__PURE__ */ __name((e5) => `_${we[x4.helper(e5)]}`, "helperString"), replaceNode(e5) {
    x4.parent.children[x4.childIndex] = x4.currentNode = e5;
  }, removeNode(e5) {
    const t6 = x4.parent.children, n3 = e5 ? t6.indexOf(e5) : x4.currentNode ? x4.childIndex : -1;
    e5 && e5 !== x4.currentNode ? x4.childIndex > n3 && (x4.childIndex--, x4.onNodeRemoved()) : (x4.currentNode = null, x4.onNodeRemoved()), x4.parent.children.splice(n3, 1);
  }, onNodeRemoved: NOOP, addIdentifiers(e5) {
  }, removeIdentifiers(e5) {
  }, hoist(e5) {
    isString(e5) && (e5 = createSimpleExpression(e5)), x4.hoists.push(e5);
    const t6 = createSimpleExpression(`_hoisted_${x4.hoists.length}`, false, e5.loc, 2);
    return t6.hoisted = e5, t6;
  }, cache(e5, t6 = false, n3 = false) {
    const r5 = createCacheExpression(x4.cached.length, e5, t6, n3);
    return x4.cached.push(r5), r5;
  } };
  return x4.filters = /* @__PURE__ */ new Set(), x4;
}
function transform(e4, t5) {
  const n2 = createTransformContext(e4, t5);
  traverseNode(e4, n2), t5.hoistStatic && cacheStatic(e4, n2), t5.ssr || (function(e5, t6) {
    const { helper: n3 } = t6, { children: r4 } = e5;
    if (1 === r4.length) {
      const n4 = getSingleElementRoot(e5);
      if (n4 && n4.codegenNode) {
        const r5 = n4.codegenNode;
        13 === r5.type && convertToBlock(r5, t6), e5.codegenNode = r5;
      } else e5.codegenNode = r4[0];
    } else if (r4.length > 1) {
      let r5 = 64;
      e5.codegenNode = createVNodeCall(t6, n3(Y), void 0, e5.children, r5, void 0, void 0, true, void 0, false);
    }
  })(e4, n2), e4.helpers = /* @__PURE__ */ new Set([...n2.helpers.keys()]), e4.components = [...n2.components], e4.directives = [...n2.directives], e4.imports = n2.imports, e4.hoists = n2.hoists, e4.temps = n2.temps, e4.cached = n2.cached, e4.transformed = true, e4.filters = [...n2.filters];
}
function traverseNode(e4, t5) {
  t5.currentNode = e4;
  const { nodeTransforms: n2 } = t5, r4 = [];
  for (let o6 = 0; o6 < n2.length; o6++) {
    const s4 = n2[o6](e4, t5);
    if (s4 && (i(s4) ? r4.push(...s4) : r4.push(s4)), !t5.currentNode) return;
    e4 = t5.currentNode;
  }
  switch (e4.type) {
    case 3:
      t5.ssr || t5.helper(ie);
      break;
    case 5:
      t5.ssr || t5.helper(ge);
      break;
    case 9:
      for (let n3 = 0; n3 < e4.branches.length; n3++) traverseNode(e4.branches[n3], t5);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      !(function(e5, t6) {
        let n3 = 0;
        const nodeRemoved = /* @__PURE__ */ __name(() => {
          n3--;
        }, "nodeRemoved");
        for (; n3 < e5.children.length; n3++) {
          const r5 = e5.children[n3];
          isString(r5) || (t6.grandParent = t6.parent, t6.parent = e5, t6.childIndex = n3, t6.onNodeRemoved = nodeRemoved, traverseNode(r5, t6));
        }
      })(e4, t5);
  }
  t5.currentNode = e4;
  let o5 = r4.length;
  for (; o5--; ) r4[o5]();
}
function createStructuralDirectiveTransform(e4, t5) {
  const n2 = isString(e4) ? (t6) => t6 === e4 : (t6) => e4.test(t6);
  return (e5, r4) => {
    if (1 === e5.type) {
      const { props: o5 } = e5;
      if (3 === e5.tagType && o5.some(isVSlot)) return;
      const s4 = [];
      for (let i4 = 0; i4 < o5.length; i4++) {
        const a6 = o5[i4];
        if (7 === a6.type && n2(a6.name)) {
          o5.splice(i4, 1), i4--;
          const n3 = t5(e5, a6, r4);
          n3 && s4.push(n3);
        }
      }
      return s4;
    }
  };
}
function generate(e4, t5 = {}) {
  const n2 = (function(e5, { mode: t6 = "function", prefixIdentifiers: n3 = "module" === t6, sourceMap: r5 = false, filename: o6 = "template.vue.html", scopeId: s5 = null, optimizeImports: i5 = false, runtimeGlobalName: a7 = "Vue", runtimeModuleName: c5 = "vue", ssrRuntimeModuleName: l4 = "vue/server-renderer", ssr: p4 = false, isTS: d4 = false, inSSR: u4 = false }) {
    const h5 = { mode: t6, prefixIdentifiers: n3, sourceMap: r5, filename: o6, scopeId: s5, optimizeImports: i5, runtimeGlobalName: a7, runtimeModuleName: c5, ssrRuntimeModuleName: l4, ssr: p4, isTS: d4, inSSR: u4, source: e5.source, code: "", column: 1, line: 1, offset: 0, indentLevel: 0, pure: false, map: void 0, helper: /* @__PURE__ */ __name((e6) => `_${we[e6]}`, "helper"), push(e6, t7 = -2, n4) {
      h5.code += e6;
    }, indent() {
      newline(++h5.indentLevel);
    }, deindent(e6 = false) {
      e6 ? --h5.indentLevel : newline(--h5.indentLevel);
    }, newline() {
      newline(h5.indentLevel);
    } };
    function newline(e6) {
      h5.push("\n" + "  ".repeat(e6), 0);
    }
    __name(newline, "newline");
    return h5;
  })(e4, t5);
  t5.onContextCreated && t5.onContextCreated(n2);
  const { mode: r4, push: o5, prefixIdentifiers: s4, indent: i4, deindent: a6, newline: c4, scopeId: l3, ssr: p3 } = n2, d3 = Array.from(e4.helpers), u3 = d3.length > 0, h4 = !s4 && "module" !== r4;
  !(function(e5, t6) {
    const { ssr: n3, prefixIdentifiers: r5, push: o6, newline: s5, runtimeModuleName: i5, runtimeGlobalName: a7, ssrRuntimeModuleName: c5 } = t6, l4 = a7, p4 = Array.from(e5.helpers);
    if (p4.length > 0 && (o6(`const _Vue = ${l4}
`, -1), e5.hoists.length)) {
      o6(`const { ${[oe, se, ie, ae, ce].filter((e6) => p4.includes(e6)).map(aliasHelper).join(", ")} } = _Vue
`, -1);
    }
    (function(e6, t7) {
      if (!e6.length) return;
      t7.pure = true;
      const { push: n4, newline: r6 } = t7;
      r6();
      for (let o7 = 0; o7 < e6.length; o7++) {
        const s6 = e6[o7];
        s6 && (n4(`const _hoisted_${o7 + 1} = `), genNode(s6, t7), r6());
      }
      t7.pure = false;
    })(e5.hoists, t6), s5(), o6("return ");
  })(e4, n2);
  if (o5(`function ${p3 ? "ssrRender" : "render"}(${(p3 ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ")}) {`), i4(), h4 && (o5("with (_ctx) {"), i4(), u3 && (o5(`const { ${d3.map(aliasHelper).join(", ")} } = _Vue
`, -1), c4())), e4.components.length && (genAssets(e4.components, "component", n2), (e4.directives.length || e4.temps > 0) && c4()), e4.directives.length && (genAssets(e4.directives, "directive", n2), e4.temps > 0 && c4()), e4.filters && e4.filters.length && (c4(), genAssets(e4.filters, "filter", n2), c4()), e4.temps > 0) {
    o5("let ");
    for (let t6 = 0; t6 < e4.temps; t6++) o5(`${t6 > 0 ? ", " : ""}_temp${t6}`);
  }
  return (e4.components.length || e4.directives.length || e4.temps) && (o5("\n", 0), c4()), p3 || o5("return "), e4.codegenNode ? genNode(e4.codegenNode, n2) : o5("null"), h4 && (a6(), o5("}")), a6(), o5("}"), { ast: e4, code: n2.code, preamble: "", map: n2.map ? n2.map.toJSON() : void 0 };
}
function genAssets(e4, t5, { helper: n2, push: r4, newline: o5, isTS: s4 }) {
  const i4 = n2("filter" === t5 ? ue : "component" === t5 ? le : de);
  for (let n3 = 0; n3 < e4.length; n3++) {
    let a6 = e4[n3];
    const c4 = a6.endsWith("__self");
    c4 && (a6 = a6.slice(0, -6)), r4(`const ${toValidAssetId(a6, t5)} = ${i4}(${JSON.stringify(a6)}${c4 ? ", true" : ""})${s4 ? "!" : ""}`), n3 < e4.length - 1 && o5();
  }
}
function genNodeListAsArray(e4, t5) {
  const n2 = e4.length > 3 || false;
  t5.push("["), n2 && t5.indent(), genNodeList(e4, t5, n2), n2 && t5.deindent(), t5.push("]");
}
function genNodeList(e4, t5, n2 = false, r4 = true) {
  const { push: o5, newline: s4 } = t5;
  for (let i4 = 0; i4 < e4.length; i4++) {
    const a6 = e4[i4];
    isString(a6) ? o5(a6, -3) : i(a6) ? genNodeListAsArray(a6, t5) : genNode(a6, t5), i4 < e4.length - 1 && (n2 ? (r4 && o5(","), s4()) : r4 && o5(", "));
  }
}
function genNode(e4, t5) {
  if (isString(e4)) t5.push(e4, -3);
  else if (isSymbol(e4)) t5.push(t5.helper(e4));
  else switch (e4.type) {
    case 1:
    case 9:
    case 11:
    case 12:
      genNode(e4.codegenNode, t5);
      break;
    case 2:
      !(function(e5, t6) {
        t6.push(JSON.stringify(e5.content), -3, e5);
      })(e4, t5);
      break;
    case 4:
      genExpression(e4, t5);
      break;
    case 5:
      !(function(e5, t6) {
        const { push: n2, helper: r4, pure: o5 } = t6;
        o5 && n2(St);
        n2(`${r4(ge)}(`), genNode(e5.content, t6), n2(")");
      })(e4, t5);
      break;
    case 8:
      genCompoundExpression(e4, t5);
      break;
    case 3:
      !(function(e5, t6) {
        const { push: n2, helper: r4, pure: o5 } = t6;
        o5 && n2(St);
        n2(`${r4(ie)}(${JSON.stringify(e5.content)})`, -3, e5);
      })(e4, t5);
      break;
    case 13:
      !(function(e5, t6) {
        const { push: n2, helper: r4, pure: o5 } = t6, { tag: s4, props: i4, children: a6, patchFlag: c4, dynamicProps: l3, directives: p3, isBlock: d3, disableTracking: u3, isComponent: h4 } = e5;
        let f3;
        c4 && (f3 = String(c4));
        p3 && n2(r4(he) + "(");
        d3 && n2(`(${r4(te)}(${u3 ? "true" : ""}), `);
        o5 && n2(St);
        const m3 = d3 ? getVNodeBlockHelper(t6.inSSR, h4) : getVNodeHelper(t6.inSSR, h4);
        n2(r4(m3) + "(", -2, e5), genNodeList((function(e6) {
          let t7 = e6.length;
          for (; t7-- && null == e6[t7]; ) ;
          return e6.slice(0, t7 + 1).map((e7) => e7 || "null");
        })([s4, i4, a6, f3, l3]), t6), n2(")"), d3 && n2(")");
        p3 && (n2(", "), genNode(p3, t6), n2(")"));
      })(e4, t5);
      break;
    case 14:
      !(function(e5, t6) {
        const { push: n2, helper: r4, pure: o5 } = t6, s4 = isString(e5.callee) ? e5.callee : r4(e5.callee);
        o5 && n2(St);
        n2(s4 + "(", -2, e5), genNodeList(e5.arguments, t6), n2(")");
      })(e4, t5);
      break;
    case 15:
      !(function(e5, t6) {
        const { push: n2, indent: r4, deindent: o5, newline: s4 } = t6, { properties: i4 } = e5;
        if (!i4.length) return void n2("{}", -2, e5);
        const a6 = i4.length > 1 || false;
        n2(a6 ? "{" : "{ "), a6 && r4();
        for (let e6 = 0; e6 < i4.length; e6++) {
          const { key: r5, value: o6 } = i4[e6];
          genExpressionAsPropertyKey(r5, t6), n2(": "), genNode(o6, t6), e6 < i4.length - 1 && (n2(","), s4());
        }
        a6 && o5(), n2(a6 ? "}" : " }");
      })(e4, t5);
      break;
    case 17:
      !(function(e5, t6) {
        genNodeListAsArray(e5.elements, t6);
      })(e4, t5);
      break;
    case 18:
      !(function(e5, t6) {
        const { push: n2, indent: r4, deindent: o5 } = t6, { params: s4, returns: i4, body: a6, newline: c4, isSlot: l3 } = e5;
        l3 && n2(`_${we[Re]}(`);
        n2("(", -2, e5), i(s4) ? genNodeList(s4, t6) : s4 && genNode(s4, t6);
        n2(") => "), (c4 || a6) && (n2("{"), r4());
        i4 ? (c4 && n2("return "), i(i4) ? genNodeListAsArray(i4, t6) : genNode(i4, t6)) : a6 && genNode(a6, t6);
        (c4 || a6) && (o5(), n2("}"));
        l3 && (e5.isNonScopedSlot && n2(", undefined, true"), n2(")"));
      })(e4, t5);
      break;
    case 19:
      !(function(e5, t6) {
        const { test: n2, consequent: r4, alternate: o5, newline: s4 } = e5, { push: i4, indent: a6, deindent: c4, newline: l3 } = t6;
        if (4 === n2.type) {
          const e6 = !isSimpleIdentifier(n2.content);
          e6 && i4("("), genExpression(n2, t6), e6 && i4(")");
        } else i4("("), genNode(n2, t6), i4(")");
        s4 && a6(), t6.indentLevel++, s4 || i4(" "), i4("? "), genNode(r4, t6), t6.indentLevel--, s4 && l3(), s4 || i4(" "), i4(": ");
        const p3 = 19 === o5.type;
        p3 || t6.indentLevel++;
        genNode(o5, t6), p3 || t6.indentLevel--;
        s4 && c4(true);
      })(e4, t5);
      break;
    case 20:
      !(function(e5, t6) {
        const { push: n2, helper: r4, indent: o5, deindent: s4, newline: i4 } = t6, { needPauseTracking: a6, needArraySpread: c4 } = e5;
        c4 && n2("[...(");
        n2(`_cache[${e5.index}] || (`), a6 && (o5(), n2(`${r4(be)}(-1`), e5.inVOnce && n2(", true"), n2("),"), i4(), n2("("));
        n2(`_cache[${e5.index}] = `), genNode(e5.value, t6), a6 && (n2(`).cacheIndex = ${e5.index},`), i4(), n2(`${r4(be)}(1),`), i4(), n2(`_cache[${e5.index}]`), s4());
        n2(")"), c4 && n2(")]");
      })(e4, t5);
      break;
    case 21:
      genNodeList(e4.body, t5, true, false);
  }
}
function genExpression(e4, t5) {
  const { content: n2, isStatic: r4 } = e4;
  t5.push(r4 ? JSON.stringify(n2) : n2, -3, e4);
}
function genCompoundExpression(e4, t5) {
  for (let n2 = 0; n2 < e4.children.length; n2++) {
    const r4 = e4.children[n2];
    isString(r4) ? t5.push(r4, -3) : genNode(r4, t5);
  }
}
function genExpressionAsPropertyKey(e4, t5) {
  const { push: n2 } = t5;
  if (8 === e4.type) n2("["), genCompoundExpression(e4, t5), n2("]");
  else if (e4.isStatic) {
    n2(isSimpleIdentifier(e4.content) ? e4.content : JSON.stringify(e4.content), -2, e4);
  } else n2(`[${e4.content}]`, -3, e4);
}
function processExpression(e4, t5, n2 = false, r4 = false, o5 = Object.create(t5.identifiers)) {
  return e4;
}
function processIf(e4, t5, n2, r4) {
  if (!("else" === t5.name || t5.exp && t5.exp.content.trim())) {
    const r5 = t5.exp ? t5.exp.loc : e4.loc;
    n2.onError(createCompilerError(28, t5.loc)), t5.exp = createSimpleExpression("true", false, r5);
  }
  if ("if" === t5.name) {
    const s4 = createIfBranch(e4, t5), i4 = { type: 9, loc: (o5 = e4.loc, getLoc(o5.start.offset, o5.end.offset)), branches: [s4] };
    if (n2.replaceNode(i4), r4) return r4(i4, s4, true);
  } else {
    const o6 = n2.parent.children;
    let s4 = o6.indexOf(e4);
    for (; s4-- >= -1; ) {
      const i4 = o6[s4];
      if (!i4 || !isCommentOrWhitespace(i4)) {
        if (i4 && 9 === i4.type) {
          "else-if" !== t5.name && "else" !== t5.name || void 0 !== i4.branches[i4.branches.length - 1].condition || n2.onError(createCompilerError(30, e4.loc)), n2.removeNode();
          const o7 = createIfBranch(e4, t5);
          i4.branches.push(o7);
          const s5 = r4 && r4(i4, o7, false);
          traverseNode(o7, n2), s5 && s5(), n2.currentNode = null;
        } else n2.onError(createCompilerError(30, e4.loc));
        break;
      }
      n2.removeNode(i4);
    }
  }
  var o5;
}
function createIfBranch(e4, t5) {
  const n2 = 3 === e4.tagType;
  return { type: 10, loc: e4.loc, condition: "else" === t5.name ? void 0 : t5.exp, children: n2 && !findDir(e4, "for") ? e4.children : [e4], userKey: findProp(e4, "key"), isTemplateIf: n2 };
}
function createCodegenNodeForBranch(e4, t5, n2) {
  return e4.condition ? createConditionalExpression(e4.condition, createChildrenCodegenNode(e4, t5, n2), createCallExpression(n2.helper(ie), ['""', "true"])) : createChildrenCodegenNode(e4, t5, n2);
}
function createChildrenCodegenNode(e4, t5, n2) {
  const { helper: r4 } = n2, o5 = createObjectProperty("key", createSimpleExpression(`${t5}`, false, ke, 2)), { children: s4 } = e4, i4 = s4[0];
  if (1 !== s4.length || 1 !== i4.type) {
    if (1 === s4.length && 11 === i4.type) {
      const e5 = i4.codegenNode;
      return injectProp(e5, o5, n2), e5;
    }
    {
      let t6 = 64;
      return createVNodeCall(n2, r4(Y), createObjectExpression([o5]), s4, t6, void 0, void 0, true, false, false, e4.loc);
    }
  }
  {
    const e5 = i4.codegenNode, t6 = getMemoedVNodeCall(e5);
    return 13 === t6.type && convertToBlock(t6, n2), injectProp(t6, o5, n2), e5;
  }
}
function processFor(e4, t5, n2, r4) {
  if (!t5.exp) return void n2.onError(createCompilerError(31, t5.loc));
  const o5 = t5.forParseResult;
  if (!o5) return void n2.onError(createCompilerError(32, t5.loc));
  finalizeForParseResult(o5);
  const { addIdentifiers: s4, removeIdentifiers: i4, scopes: a6 } = n2, { source: c4, value: l3, key: p3, index: d3 } = o5, u3 = { type: 11, loc: t5.loc, source: c4, valueAlias: l3, keyAlias: p3, objectIndexAlias: d3, parseResult: o5, children: isTemplateNode(e4) ? e4.children : [e4] };
  n2.replaceNode(u3), a6.vFor++;
  const h4 = r4 && r4(u3);
  return () => {
    a6.vFor--, h4 && h4();
  };
}
function finalizeForParseResult(e4, t5) {
  e4.finalized || (e4.finalized = true);
}
function createForLoopParams({ value: e4, key: t5, index: n2 }, r4 = []) {
  return (function(e5) {
    let t6 = e5.length;
    for (; t6-- && !e5[t6]; ) ;
    return e5.slice(0, t6 + 1).map((e6, t7) => e6 || createSimpleExpression("_".repeat(t7 + 1), false));
  })([e4, t5, n2, ...r4]);
}
function buildSlots(e4, t5, n2 = buildClientSlotFn) {
  t5.helper(Re);
  const { children: r4, loc: o5 } = e4, s4 = [], i4 = [];
  let a6 = t5.scopes.vSlot > 0 || t5.scopes.vFor > 0;
  const c4 = findDir(e4, "slot", true);
  if (c4) {
    const { arg: e5, exp: t6 } = c4;
    e5 && !isStaticExp(e5) && (a6 = true), s4.push(createObjectProperty(e5 || createSimpleExpression("default", true), n2(t6, void 0, r4, o5)));
  }
  let l3 = false, p3 = false;
  const d3 = [], u3 = /* @__PURE__ */ new Set();
  let h4 = 0;
  for (let e5 = 0; e5 < r4.length; e5++) {
    const o6 = r4[e5];
    let f4;
    if (!isTemplateNode(o6) || !(f4 = findDir(o6, "slot", true))) {
      3 !== o6.type && d3.push(o6);
      continue;
    }
    if (c4) {
      t5.onError(createCompilerError(37, f4.loc));
      break;
    }
    l3 = true;
    const { children: m4, loc: E3 } = o6, { arg: g4 = createSimpleExpression("default", true), exp: _3, loc: S3 } = f4;
    let T3;
    isStaticExp(g4) ? T3 = g4 ? g4.content : "default" : a6 = true;
    const y4 = findDir(o6, "for"), N3 = n2(_3, y4, m4, E3);
    let C3, x4;
    if (C3 = findDir(o6, "if")) a6 = true, i4.push(createConditionalExpression(C3.exp, buildDynamicSlot(g4, N3, h4++), Nt));
    else if (x4 = findDir(o6, /^else(?:-if)?$/, true)) {
      let n3, o7 = e5;
      for (; o7-- && (n3 = r4[o7], isCommentOrWhitespace(n3)); ) ;
      if (n3 && isTemplateNode(n3) && findDir(n3, /^(?:else-)?if$/)) {
        let e6 = i4[i4.length - 1];
        for (; 19 === e6.alternate.type; ) e6 = e6.alternate;
        e6.alternate = x4.exp ? createConditionalExpression(x4.exp, buildDynamicSlot(g4, N3, h4++), Nt) : buildDynamicSlot(g4, N3, h4++);
      } else t5.onError(createCompilerError(30, x4.loc));
    } else if (y4) {
      a6 = true;
      const e6 = y4.forParseResult;
      e6 ? (finalizeForParseResult(e6), i4.push(createCallExpression(t5.helper(fe), [e6.source, createFunctionExpression(createForLoopParams(e6), buildDynamicSlot(g4, N3), true)]))) : t5.onError(createCompilerError(32, y4.loc));
    } else {
      if (T3) {
        if (u3.has(T3)) {
          t5.onError(createCompilerError(38, S3));
          continue;
        }
        u3.add(T3), "default" === T3 && (p3 = true);
      }
      s4.push(createObjectProperty(g4, N3));
    }
  }
  if (!c4) {
    const buildDefaultSlotProperty = /* @__PURE__ */ __name((e5, r5) => {
      const s5 = n2(e5, void 0, r5, o5);
      return t5.compatConfig && (s5.isNonScopedSlot = true), createObjectProperty("default", s5);
    }, "buildDefaultSlotProperty");
    l3 ? d3.length && !d3.every(isWhitespaceText) && (p3 ? t5.onError(createCompilerError(39, d3[0].loc)) : s4.push(buildDefaultSlotProperty(void 0, d3))) : s4.push(buildDefaultSlotProperty(void 0, r4));
  }
  const f3 = a6 ? 2 : hasForwardedSlots(e4.children) ? 3 : 1;
  let m3 = createObjectExpression(s4.concat(createObjectProperty("_", createSimpleExpression(f3 + "", false))), o5);
  return i4.length && (m3 = createCallExpression(t5.helper(Ee), [m3, createArrayExpression(i4)])), { slots: m3, hasDynamicSlots: a6 };
}
function buildDynamicSlot(e4, t5, n2) {
  const r4 = [createObjectProperty("name", e4), createObjectProperty("fn", t5)];
  return null != n2 && r4.push(createObjectProperty("key", createSimpleExpression(String(n2), true))), createObjectExpression(r4);
}
function hasForwardedSlots(e4) {
  for (let t5 = 0; t5 < e4.length; t5++) {
    const n2 = e4[t5];
    switch (n2.type) {
      case 1:
        if (2 === n2.tagType || hasForwardedSlots(n2.children)) return true;
        break;
      case 9:
        if (hasForwardedSlots(n2.branches)) return true;
        break;
      case 10:
      case 11:
        if (hasForwardedSlots(n2.children)) return true;
    }
  }
  return false;
}
function resolveComponentType(e4, t5, n2 = false) {
  let { tag: r4 } = e4;
  const o5 = isComponentTag(r4), s4 = findProp(e4, "is", false, true);
  if (s4) if (o5 || isCompatEnabled("COMPILER_IS_ON_ELEMENT", t5)) {
    let e5;
    if (6 === s4.type ? e5 = s4.value && createSimpleExpression(s4.value.content, true) : (e5 = s4.exp, e5 || (e5 = createSimpleExpression("is", false, s4.arg.loc))), e5) return createCallExpression(t5.helper(pe), [e5]);
  } else 6 === s4.type && s4.value.content.startsWith("vue:") && (r4 = s4.value.content.slice(4));
  const i4 = isCoreComponent(r4) || t5.isBuiltInComponent(r4);
  return i4 ? (n2 || t5.helper(i4), i4) : (t5.helper(le), t5.components.add(r4), toValidAssetId(r4, "component"));
}
function buildProps(e4, t5, n2 = e4.props, r4, o5, s4 = false) {
  const { tag: i4, loc: a6, children: c4 } = e4;
  let l3 = [];
  const p3 = [], d3 = [], u3 = c4.length > 0;
  let h4 = false, f3 = 0, m3 = false, E3 = false, g4 = false, _3 = false, S3 = false, T3 = false;
  const y4 = [], pushMergeArg = /* @__PURE__ */ __name((e5) => {
    l3.length && (p3.push(createObjectExpression(dedupeProperties(l3), a6)), l3 = []), e5 && p3.push(e5);
  }, "pushMergeArg"), pushRefVForMarker = /* @__PURE__ */ __name(() => {
    t5.scopes.vFor > 0 && l3.push(createObjectProperty(createSimpleExpression("ref_for", true), createSimpleExpression("true")));
  }, "pushRefVForMarker"), analyzePatchFlag = /* @__PURE__ */ __name(({ key: e5, value: n3 }) => {
    if (isStaticExp(e5)) {
      const s5 = e5.content, i5 = isOn(s5);
      if (!i5 || r4 && !o5 || "onclick" === s5.toLowerCase() || "onUpdate:modelValue" === s5 || s(s5) || (_3 = true), i5 && s(s5) && (T3 = true), i5 && 14 === n3.type && (n3 = n3.arguments[0]), 20 === n3.type || (4 === n3.type || 8 === n3.type) && getConstantType(n3, t5) > 0) return;
      "ref" === s5 ? m3 = true : "class" === s5 ? E3 = true : "style" === s5 ? g4 = true : "key" === s5 || y4.includes(s5) || y4.push(s5), !r4 || "class" !== s5 && "style" !== s5 || y4.includes(s5) || y4.push(s5);
    } else S3 = true;
  }, "analyzePatchFlag");
  for (let o6 = 0; o6 < n2.length; o6++) {
    const c5 = n2[o6];
    if (6 === c5.type) {
      const { loc: e5, name: n3, nameLoc: r5, value: o7 } = c5;
      let s5 = true;
      if ("ref" === n3 && (m3 = true, pushRefVForMarker()), "is" === n3 && (isComponentTag(i4) || o7 && o7.content.startsWith("vue:") || isCompatEnabled("COMPILER_IS_ON_ELEMENT", t5))) continue;
      l3.push(createObjectProperty(createSimpleExpression(n3, true, r5), createSimpleExpression(o7 ? o7.content : "", s5, o7 ? o7.loc : e5)));
    } else {
      const { name: n3, arg: o7, exp: m4, loc: E4, modifiers: g5 } = c5, _4 = "bind" === n3, T4 = "on" === n3;
      if ("slot" === n3) {
        r4 || t5.onError(createCompilerError(40, E4));
        continue;
      }
      if ("once" === n3 || "memo" === n3) continue;
      if ("is" === n3 || _4 && isStaticArgOf(o7, "is") && (isComponentTag(i4) || isCompatEnabled("COMPILER_IS_ON_ELEMENT", t5))) continue;
      if (T4 && s4) continue;
      if ((_4 && isStaticArgOf(o7, "key") || T4 && u3 && isStaticArgOf(o7, "vue:before-update")) && (h4 = true), _4 && isStaticArgOf(o7, "ref") && pushRefVForMarker(), !o7 && (_4 || T4)) {
        if (S3 = true, m4) if (_4) {
          if (pushMergeArg(), isCompatEnabled("COMPILER_V_BIND_OBJECT_ORDER", t5)) {
            p3.unshift(m4);
            continue;
          }
          pushRefVForMarker(), pushMergeArg(), p3.push(m4);
        } else pushMergeArg({ type: 14, loc: E4, callee: t5.helper(Ce), arguments: r4 ? [m4] : [m4, "true"] });
        else t5.onError(createCompilerError(_4 ? 34 : 35, E4));
        continue;
      }
      _4 && g5.some((e5) => "prop" === e5.content) && (f3 |= 32);
      const y5 = t5.directiveTransforms[n3];
      if (y5) {
        const { props: n4, needRuntime: r5 } = y5(c5, e4, t5);
        !s4 && n4.forEach(analyzePatchFlag), T4 && o7 && !isStaticExp(o7) ? pushMergeArg(createObjectExpression(n4, a6)) : l3.push(...n4), r5 && (d3.push(c5), isSymbol(r5) && Ct.set(c5, r5));
      } else l(n3) || (d3.push(c5), u3 && (h4 = true));
    }
  }
  let N3;
  if (p3.length ? (pushMergeArg(), N3 = p3.length > 1 ? createCallExpression(t5.helper(_e), p3, a6) : p3[0]) : l3.length && (N3 = createObjectExpression(dedupeProperties(l3), a6)), S3 ? f3 |= 16 : (E3 && !r4 && (f3 |= 2), g4 && !r4 && (f3 |= 4), y4.length && (f3 |= 8), _3 && (f3 |= 32)), h4 || 0 !== f3 && 32 !== f3 || !(m3 || T3 || d3.length > 0) || (f3 |= 512), !t5.inSSR && N3) switch (N3.type) {
    case 15:
      let e5 = -1, n3 = -1, r5 = false;
      for (let t6 = 0; t6 < N3.properties.length; t6++) {
        const o7 = N3.properties[t6].key;
        isStaticExp(o7) ? "class" === o7.content ? e5 = t6 : "style" === o7.content && (n3 = t6) : o7.isHandlerKey || (r5 = true);
      }
      const o6 = N3.properties[e5], s5 = N3.properties[n3];
      r5 ? N3 = createCallExpression(t5.helper(ye), [N3]) : (o6 && !isStaticExp(o6.value) && (o6.value = createCallExpression(t5.helper(Se), [o6.value])), s5 && (g4 || 4 === s5.value.type && "[" === s5.value.content.trim()[0] || 17 === s5.value.type) && (s5.value = createCallExpression(t5.helper(Te), [s5.value])));
      break;
    case 14:
      break;
    default:
      N3 = createCallExpression(t5.helper(ye), [createCallExpression(t5.helper(Ne), [N3])]);
  }
  return { props: N3, directives: d3, patchFlag: f3, dynamicPropNames: y4, shouldUseBlock: h4 };
}
function dedupeProperties(e4) {
  const t5 = /* @__PURE__ */ new Map(), n2 = [];
  for (let r4 = 0; r4 < e4.length; r4++) {
    const o5 = e4[r4];
    if (8 === o5.key.type || !o5.key.isStatic) {
      n2.push(o5);
      continue;
    }
    const s4 = o5.key.content, i4 = t5.get(s4);
    i4 ? ("style" === s4 || "class" === s4 || isOn(s4)) && mergeAsArray(i4, o5) : (t5.set(s4, o5), n2.push(o5));
  }
  return n2;
}
function mergeAsArray(e4, t5) {
  17 === e4.value.type ? e4.value.elements.push(t5.value) : e4.value = createArrayExpression([e4.value, t5.value], e4.loc);
}
function buildDirectiveArgs(e4, t5) {
  const n2 = [], r4 = Ct.get(e4);
  r4 ? n2.push(t5.helperString(r4)) : (t5.helper(de), t5.directives.add(e4.name), n2.push(toValidAssetId(e4.name, "directive")));
  const { loc: o5 } = e4;
  if (e4.exp && n2.push(e4.exp), e4.arg && (e4.exp || n2.push("void 0"), n2.push(e4.arg)), Object.keys(e4.modifiers).length) {
    e4.arg || (e4.exp || n2.push("void 0"), n2.push("void 0"));
    const t6 = createSimpleExpression("true", false, o5);
    n2.push(createObjectExpression(e4.modifiers.map((e5) => createObjectProperty(e5, t6)), o5));
  }
  return createArrayExpression(n2, e4.loc);
}
function isComponentTag(e4) {
  return "component" === e4 || "Component" === e4;
}
function processSlotOutlet(e4, t5) {
  let n2, r4 = '"default"';
  const o5 = [];
  for (let t6 = 0; t6 < e4.props.length; t6++) {
    const n3 = e4.props[t6];
    if (6 === n3.type) n3.value && ("name" === n3.name ? r4 = JSON.stringify(n3.value.content) : (n3.name = p(n3.name), o5.push(n3)));
    else if ("bind" === n3.name && isStaticArgOf(n3.arg, "name")) {
      if (n3.exp) r4 = n3.exp;
      else if (n3.arg && 4 === n3.arg.type) {
        const e5 = p(n3.arg.content);
        r4 = n3.exp = createSimpleExpression(e5, false, n3.arg.loc);
      }
    } else "bind" === n3.name && n3.arg && isStaticExp(n3.arg) && (n3.arg.content = p(n3.arg.content)), o5.push(n3);
  }
  if (o5.length > 0) {
    const { props: r5, directives: s4 } = buildProps(e4, t5, o5, false, false);
    n2 = r5, s4.length && t5.onError(createCompilerError(36, s4[0].loc));
  }
  return { slotName: r4, slotProps: n2 };
}
function createTransformProps(e4 = []) {
  return { props: e4 };
}
function rewriteFilter(e4, t5) {
  if (4 === e4.type) parseFilter(e4, t5);
  else for (let n2 = 0; n2 < e4.children.length; n2++) {
    const r4 = e4.children[n2];
    "object" == typeof r4 && (4 === r4.type ? parseFilter(r4, t5) : 8 === r4.type ? rewriteFilter(e4, t5) : 5 === r4.type && rewriteFilter(r4.content, t5));
  }
}
function parseFilter(e4, t5) {
  const n2 = e4.content;
  let r4, o5, s4, i4, a6 = false, c4 = false, l3 = false, p3 = false, d3 = 0, u3 = 0, h4 = 0, f3 = 0, m3 = [];
  for (s4 = 0; s4 < n2.length; s4++) if (o5 = r4, r4 = n2.charCodeAt(s4), a6) 39 === r4 && 92 !== o5 && (a6 = false);
  else if (c4) 34 === r4 && 92 !== o5 && (c4 = false);
  else if (l3) 96 === r4 && 92 !== o5 && (l3 = false);
  else if (p3) 47 === r4 && 92 !== o5 && (p3 = false);
  else if (124 !== r4 || 124 === n2.charCodeAt(s4 + 1) || 124 === n2.charCodeAt(s4 - 1) || d3 || u3 || h4) {
    switch (r4) {
      case 34:
        c4 = true;
        break;
      case 39:
        a6 = true;
        break;
      case 96:
        l3 = true;
        break;
      case 40:
        h4++;
        break;
      case 41:
        h4--;
        break;
      case 91:
        u3++;
        break;
      case 93:
        u3--;
        break;
      case 123:
        d3++;
        break;
      case 125:
        d3--;
    }
    if (47 === r4) {
      let e5, t6 = s4 - 1;
      for (; t6 >= 0 && (e5 = n2.charAt(t6), " " === e5); t6--) ;
      e5 && It.test(e5) || (p3 = true);
    }
  } else void 0 === i4 ? (f3 = s4 + 1, i4 = n2.slice(0, s4).trim()) : pushFilter();
  function pushFilter() {
    m3.push(n2.slice(f3, s4).trim()), f3 = s4 + 1;
  }
  __name(pushFilter, "pushFilter");
  if (void 0 === i4 ? i4 = n2.slice(0, s4).trim() : 0 !== f3 && pushFilter(), m3.length) {
    for (s4 = 0; s4 < m3.length; s4++) i4 = wrapFilter(i4, m3[s4], t5);
    e4.content = i4, e4.ast = void 0;
  }
}
function wrapFilter(e4, t5, n2) {
  n2.helper(ue);
  const r4 = t5.indexOf("(");
  if (r4 < 0) return n2.filters.add(t5), `${toValidAssetId(t5, "filter")}(${e4})`;
  {
    const o5 = t5.slice(0, r4), s4 = t5.slice(r4 + 1);
    return n2.filters.add(o5), `${toValidAssetId(o5, "filter")}(${e4}${")" !== s4 ? "," + s4 : s4}`;
  }
}
function getBaseTransformPreset(e4) {
  return [[transformVBindShorthand, transformOnce, Tt, transformMemo, yt, transformFilter, transformSlotOutlet, transformElement, trackSlotScopes, transformText], { on: transformOn$1, bind: transformBind, model: transformModel$1 }];
}
function baseCompile(e4, t5 = {}) {
  const n2 = t5.onError || defaultOnError, r4 = "module" === t5.mode;
  true === t5.prefixIdentifiers ? n2(createCompilerError(47)) : r4 && n2(createCompilerError(48));
  t5.cacheHandlers && n2(createCompilerError(49)), t5.scopeId && !r4 && n2(createCompilerError(50));
  const o5 = n({}, t5, { prefixIdentifiers: false }), s4 = isString(e4) ? baseParse(e4, o5) : e4, [i4, a6] = getBaseTransformPreset();
  return transform(s4, n({}, o5, { nodeTransforms: [...i4, ...t5.nodeTransforms || []], directiveTransforms: n({}, a6, t5.directiveTransforms || {}) })), generate(s4, o5);
}
function createDOMCompilerError(e4, t5) {
  return createCompilerError(e4, t5);
}
function jsonParseTransform(e4, t5) {
  if (!("__proto__" === e4 || "constructor" === e4 && t5 && "object" == typeof t5 && "prototype" in t5)) return t5;
  !(function(e5) {
    console.warn(`[destr] Dropping "${e5}" key to prevent prototype pollution.`);
  })(e4);
}
function destr(e4, t5 = {}) {
  if ("string" != typeof e4) return e4;
  if ('"' === e4[0] && '"' === e4[e4.length - 1] && -1 === e4.indexOf("\\")) return e4.slice(1, -1);
  const n2 = e4.trim();
  if (n2.length <= 9) switch (n2.toLowerCase()) {
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
  if (!en.test(e4)) {
    if (t5.strict) throw new SyntaxError("[destr] Invalid JSON");
    return e4;
  }
  try {
    if (zt.test(e4) || Zt.test(e4)) {
      if (t5.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e4, jsonParseTransform);
    }
    return JSON.parse(e4);
  } catch (n3) {
    if (t5.strict) throw n3;
    return e4;
  }
}
function encodeQueryValue(e4) {
  return (t5 = "string" == typeof e4 ? e4 : JSON.stringify(e4), encodeURI("" + t5).replace(ln, "|")).replace(sn, "%2B").replace(pn, "+").replace(tn, "%23").replace(nn, "%26").replace(cn, "`").replace(an, "^").replace(rn, "%2F");
  var t5;
}
function encodeQueryKey(e4) {
  return encodeQueryValue(e4).replace(on2, "%3D");
}
function decode(e4 = "") {
  try {
    return decodeURIComponent("" + e4);
  } catch {
    return "" + e4;
  }
}
function decodeQueryKey(e4) {
  return decode(e4.replace(sn, " "));
}
function decodeQueryValue(e4) {
  return decode(e4.replace(sn, " "));
}
function parseQuery2(e4 = "") {
  const t5 = /* @__PURE__ */ Object.create(null);
  "?" === e4[0] && (e4 = e4.slice(1));
  for (const n2 of e4.split("&")) {
    const e5 = n2.match(/([^=]+)=?(.*)/) || [];
    if (e5.length < 2) continue;
    const r4 = decodeQueryKey(e5[1]);
    if ("__proto__" === r4 || "constructor" === r4) continue;
    const o5 = decodeQueryValue(e5[2] || "");
    void 0 === t5[r4] ? t5[r4] = o5 : Array.isArray(t5[r4]) ? t5[r4].push(o5) : t5[r4] = [t5[r4], o5];
  }
  return t5;
}
function stringifyQuery2(e4) {
  return Object.keys(e4).filter((t5) => void 0 !== e4[t5]).map((t5) => {
    return n2 = t5, "number" != typeof (r4 = e4[t5]) && "boolean" != typeof r4 || (r4 = String(r4)), r4 ? Array.isArray(r4) ? r4.map((e5) => `${encodeQueryKey(n2)}=${encodeQueryValue(e5)}`).join("&") : `${encodeQueryKey(n2)}=${encodeQueryValue(r4)}` : encodeQueryKey(n2);
    var n2, r4;
  }).filter(Boolean).join("&");
}
function hasProtocol2(e4, t5 = {}) {
  return "boolean" == typeof t5 && (t5 = { acceptRelative: t5 }), t5.strict ? dn.test(e4) : un.test(e4) || !!t5.acceptRelative && hn.test(e4);
}
function withTrailingSlash2(e4 = "", t5) {
  return e4.endsWith("/") ? e4 : e4 + "/";
}
function withBase(e4, t5) {
  if (!(n2 = t5) || "/" === n2 || hasProtocol2(e4)) return e4;
  var n2;
  const r4 = (function(e5 = "") {
    return ((function(e6 = "") {
      return e6.endsWith("/");
    })(e5) ? e5.slice(0, -1) : e5) || "/";
  })(t5);
  return e4.startsWith(r4) ? e4 : (function(e5, ...t6) {
    let n3 = e5 || "";
    for (const e6 of t6.filter((e7) => /* @__PURE__ */ (function(e8) {
      return e8 && "/" !== e8;
    })(e7))) if (n3) {
      const t7 = e6.replace(mn, "");
      n3 = withTrailingSlash2(n3) + t7;
    } else n3 = e6;
    return n3;
  })(r4, e4);
}
function withQuery2(e4, t5) {
  const n2 = (function(e5 = "") {
    const t6 = e5.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
    if (t6) {
      const [, e6, n4 = ""] = t6;
      return { protocol: e6.toLowerCase(), pathname: n4, href: e6 + n4, auth: "", host: "", search: "", hash: "" };
    }
    if (!hasProtocol2(e5, { acceptRelative: true })) return parsePath(e5);
    const [, n3 = "", r5, o5 = ""] = e5.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
    let [, s4 = "", i4 = ""] = o5.match(/([^#/?]*)(.*)?/) || [];
    "file:" === n3 && (i4 = i4.replace(/\/(?=[A-Za-z]:)/, ""));
    const { pathname: a6, search: c4, hash: l3 } = parsePath(i4);
    return { protocol: n3.toLowerCase(), auth: r5 ? r5.slice(0, Math.max(0, r5.length - 1)) : "", host: s4, pathname: a6, search: c4, hash: l3, [En]: !n3 };
  })(e4), r4 = { ...parseQuery2(n2.search), ...t5 };
  return n2.search = stringifyQuery2(r4), (function(e5) {
    const t6 = e5.pathname || "", n3 = e5.search ? (e5.search.startsWith("?") ? "" : "?") + e5.search : "", r5 = e5.hash || "", o5 = e5.auth ? e5.auth + "@" : "", s4 = e5.host || "", i4 = e5.protocol || e5[En] ? (e5.protocol || "") + "//" : "";
    return i4 + o5 + s4 + t6 + n3 + r5;
  })(n2);
}
function parsePath(e4 = "") {
  const [t5 = "", n2 = "", r4 = ""] = (e4.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return { pathname: t5, search: n2, hash: r4 };
}
function isPayloadMethod(e4 = "GET") {
  return gn.has(e4.toUpperCase());
}
function resolveFetchOptions(e4, t5, n2, r4) {
  const o5 = (function(e5, t6, n3) {
    if (!t6) return new n3(e5);
    const r5 = new n3(t6);
    if (e5) for (const [t7, o6] of Symbol.iterator in e5 || Array.isArray(e5) ? e5 : new n3(e5)) r5.set(t7, o6);
    return r5;
  })(t5?.headers ?? e4?.headers, n2?.headers, r4);
  let s4;
  return (n2?.query || n2?.params || t5?.params || t5?.query) && (s4 = { ...n2?.params, ...n2?.query, ...t5?.params, ...t5?.query }), { ...n2, ...t5, query: s4, params: s4, headers: o5 };
}
async function callHooks(e4, t5) {
  if (t5) if (Array.isArray(t5)) for (const n2 of t5) await n2(e4);
  else await t5(e4);
}
function getNuxtAppCtx(e4 = In) {
  return getContext(e4, { asyncContext: false });
}
function registerPluginHooks(e4, t5) {
  t5.hooks && e4.hooks.addHooks(t5.hooks);
}
function defineNuxtPlugin(e4) {
  if ("function" == typeof e4) return e4;
  const t5 = e4._name || e4.name;
  return delete e4.name, Object.assign(e4.setup || (() => {
  }), e4, { [On]: true, _name: t5 });
}
function callWithNuxt(e4, t5, n2) {
  const fn3 = /* @__PURE__ */ __name(() => t5(), "fn"), r4 = getNuxtAppCtx(e4._id);
  return e4.vueApp.runWithContext(() => r4.callAsync(e4, fn3));
}
function useNuxtApp(e4) {
  const t5 = (function(e5) {
    let t6;
    return Gt.hasInjectionContext() && (t6 = Gt.getCurrentInstance()?.appContext.app.$nuxt), t6 ||= getNuxtAppCtx(e5).tryUse(), t6 || null;
  })(e4);
  if (!t5) throw new Error("[nuxt] instance unavailable");
  return t5;
}
function useRuntimeConfig(e4) {
  return useNuxtApp().$config;
}
function defineGetter(e4, t5, n2) {
  Object.defineProperty(e4, t5, { get: /* @__PURE__ */ __name(() => n2, "get") });
}
function defineNuxtRouteMiddleware(e4) {
  return e4;
}
function resolveRouteObject(e4) {
  return withQuery(e4.path || "", e4.query || {}) + (e4.hash || "");
}
function getRouteFromPath(e4) {
  const t5 = e4 && "object" == typeof e4 ? e4 : {};
  "object" == typeof e4 && (e4 = stringifyParsedURL({ pathname: e4.path || "", search: stringifyQuery(e4.query || {}), hash: e4.hash || "" }));
  const n2 = new URL(e4.toString(), "http://localhost");
  return { path: n2.pathname, fullPath: e4, query: parseQuery(n2.search), hash: n2.hash, params: t5.params || {}, name: void 0, matched: t5.matched || [], redirectedFrom: void 0, meta: t5.meta || {}, href: e4 };
}
function definePayloadReducer(e4, t5) {
  useNuxtApp().ssrContext._payloadReducers[e4] = t5;
}
var J, K, Y, Q, z2, Z, ee, te, ne, re, oe, se, ie, ae, ce, le, pe, de, ue, he, fe, me, Ee, ge, _e, Se, Te, ye, Ne, Ce, xe, Ie, Oe, be, ve, Ae, Re, Pe, Le, Me, De, we, ke, Ve, Fe, Xe, Ue, Be, isStaticProperty, He, isStaticExp, je, isSimpleIdentifier, $e, We, qe, getExpSource, isMemberExpressionBrowser, Ge, Je, Ke, isFnExpressionBrowser, Ye, Qe, ze, Ze, et, tt, nt, rt, ot, st, it, at, ct, lt, pt, dt, ut, ht, ft, mt, Et, gt, _t, St, aliasHelper, Tt, yt, Nt, trackSlotScopes, buildClientSlotFn, Ct, transformElement, transformSlotOutlet, transformOn$1, transformBind, injectPrefix, transformText, xt, transformOnce, transformModel$1, It, transformFilter, Ot, transformMemo, transformVBindShorthand, noopDirectiveTransform, bt, vt, At, Rt, Pt, Lt, Mt, Dt, wt, kt, Vt, Ft, transformStyle, parseInlineCSS, Xt, Ut, Bt, Ht, jt, transformClick, ignoreSideEffectTags, $t, Wt, qt, Gt, Jt, Kt, Yt, Qt, zt, Zt, en, tn, nn, rn, on2, sn, an, cn, ln, pn, dn, un, hn, mn, En, FetchError, gn, _n, Sn, Tn, yn, Nn, Cn2, xn, In, On, bn, useRouter, vn, navigateTo, An, useError, showError, createError2, Rn, Pn, Ln, Mn, Dn, wn, kn, Vn, Fn, Xn, Un, Bn;
var init_server = __esm({
  ".output/server/chunks/build/server.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_nitro();
    init_renderer();
    init_shared_esm_bundler();
    globalThis._importMeta_ = globalThis._importMeta_ || { url: "file:///_entry.js", env: {} };
    J = { exports: {} };
    K = {};
    Y = Symbol("");
    Q = Symbol("");
    z2 = Symbol("");
    Z = Symbol("");
    ee = Symbol("");
    te = Symbol("");
    ne = Symbol("");
    re = Symbol("");
    oe = Symbol("");
    se = Symbol("");
    ie = Symbol("");
    ae = Symbol("");
    ce = Symbol("");
    le = Symbol("");
    pe = Symbol("");
    de = Symbol("");
    ue = Symbol("");
    he = Symbol("");
    fe = Symbol("");
    me = Symbol("");
    Ee = Symbol("");
    ge = Symbol("");
    _e = Symbol("");
    Se = Symbol("");
    Te = Symbol("");
    ye = Symbol("");
    Ne = Symbol("");
    Ce = Symbol("");
    xe = Symbol("");
    Ie = Symbol("");
    Oe = Symbol("");
    be = Symbol("");
    ve = Symbol("");
    Ae = Symbol("");
    Re = Symbol("");
    Pe = Symbol("");
    Le = Symbol("");
    Me = Symbol("");
    De = Symbol("");
    we = { [Y]: "Fragment", [Q]: "Teleport", [z2]: "Suspense", [Z]: "KeepAlive", [ee]: "BaseTransition", [te]: "openBlock", [ne]: "createBlock", [re]: "createElementBlock", [oe]: "createVNode", [se]: "createElementVNode", [ie]: "createCommentVNode", [ae]: "createTextVNode", [ce]: "createStaticVNode", [le]: "resolveComponent", [pe]: "resolveDynamicComponent", [de]: "resolveDirective", [ue]: "resolveFilter", [he]: "withDirectives", [fe]: "renderList", [me]: "renderSlot", [Ee]: "createSlots", [ge]: "toDisplayString", [_e]: "mergeProps", [Se]: "normalizeClass", [Te]: "normalizeStyle", [ye]: "normalizeProps", [Ne]: "guardReactiveProps", [Ce]: "toHandlers", [xe]: "camelize", [Ie]: "capitalize", [Oe]: "toHandlerKey", [be]: "setBlockTracking", [ve]: "pushScopeId", [Ae]: "popScopeId", [Re]: "withCtx", [Pe]: "unref", [Le]: "isRef", [Me]: "withMemo", [De]: "isMemoSame" };
    __name(registerRuntimeHelpers, "registerRuntimeHelpers");
    ke = { start: { line: 1, column: 1, offset: 0 }, end: { line: 1, column: 1, offset: 0 }, source: "" };
    __name(createRoot, "createRoot");
    __name(createVNodeCall, "createVNodeCall");
    __name(createArrayExpression, "createArrayExpression");
    __name(createObjectExpression, "createObjectExpression");
    __name(createObjectProperty, "createObjectProperty");
    __name(createSimpleExpression, "createSimpleExpression");
    __name(createCompoundExpression, "createCompoundExpression");
    __name(createCallExpression, "createCallExpression");
    __name(createFunctionExpression, "createFunctionExpression");
    __name(createConditionalExpression, "createConditionalExpression");
    __name(createCacheExpression, "createCacheExpression");
    __name(createBlockStatement, "createBlockStatement");
    __name(getVNodeHelper, "getVNodeHelper");
    __name(getVNodeBlockHelper, "getVNodeBlockHelper");
    __name(convertToBlock, "convertToBlock");
    Ve = new Uint8Array([123, 123]);
    Fe = new Uint8Array([125, 125]);
    __name(isTagStartChar, "isTagStartChar");
    __name(isWhitespace, "isWhitespace");
    __name(isEndOfTagSection, "isEndOfTagSection");
    __name(toCharCodes, "toCharCodes");
    Xe = { Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]), CdataEnd: new Uint8Array([93, 93, 62]), CommentEnd: new Uint8Array([45, 45, 62]), ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]), StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]), TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]), TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]) };
    Ue = { COMPILER_IS_ON_ELEMENT: { message: 'Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".', link: "https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html" }, COMPILER_V_BIND_SYNC: { message: /* @__PURE__ */ __name((e4) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${e4}.sync\` should be changed to \`v-model:${e4}\`.`, "message"), link: "https://v3-migration.vuejs.org/breaking-changes/v-model.html" }, COMPILER_V_BIND_OBJECT_ORDER: { message: 'v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.', link: "https://v3-migration.vuejs.org/breaking-changes/v-bind.html" }, COMPILER_V_ON_NATIVE: { message: ".native modifier for v-on has been removed as is no longer necessary.", link: "https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html" }, COMPILER_V_IF_V_FOR_PRECEDENCE: { message: "v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.", link: "https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html" }, COMPILER_NATIVE_TEMPLATE: { message: "<template> with no special directives will render as a native template element instead of its inner content in Vue 3." }, COMPILER_INLINE_TEMPLATE: { message: '"inline-template" has been removed in Vue 3.', link: "https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html" }, COMPILER_FILTERS: { message: 'filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.', link: "https://v3-migration.vuejs.org/breaking-changes/filters.html" } };
    __name(getCompatValue, "getCompatValue");
    __name(isCompatEnabled, "isCompatEnabled");
    __name(checkCompatEnabled, "checkCompatEnabled");
    __name(defaultOnError, "defaultOnError");
    __name(defaultOnWarn, "defaultOnWarn");
    __name(createCompilerError, "createCompilerError");
    Be = { 0: "Illegal comment.", 1: "CDATA section is allowed only in XML context.", 2: "Duplicate attribute.", 3: "End tag cannot have attributes.", 4: "Illegal '/' in tags.", 5: "Unexpected EOF in tag.", 6: "Unexpected EOF in CDATA section.", 7: "Unexpected EOF in comment.", 8: "Unexpected EOF in script.", 9: "Unexpected EOF in tag.", 10: "Incorrectly closed comment.", 11: "Incorrectly opened comment.", 12: "Illegal tag name. Use '&lt;' to print '<'.", 13: "Attribute value was expected.", 14: "End tag name was expected.", 15: "Whitespace was expected.", 16: "Unexpected '<!--' in comment.", 17: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`, 18: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).", 19: "Attribute name cannot start with '='.", 21: "'<?' is allowed only in XML context.", 20: "Unexpected null character.", 22: "Illegal '/' in tags.", 23: "Invalid end tag.", 24: "Element is missing end tag.", 25: "Interpolation end sign was not found.", 27: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.", 26: "Legal directive name was expected.", 28: "v-if/v-else-if is missing expression.", 29: "v-if/else branches must use unique keys.", 30: "v-else/v-else-if has no adjacent v-if or v-else-if.", 31: "v-for is missing expression.", 32: "v-for has invalid expression.", 33: "<template v-for> key should be placed on the <template> tag.", 34: "v-bind is missing expression.", 52: "v-bind with same-name shorthand only allows static argument.", 35: "v-on is missing expression.", 36: "Unexpected custom directive on <slot> outlet.", 37: "Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.", 38: "Duplicate slot names found. ", 39: "Extraneous children found when component already has explicitly named default slot. These children will be ignored.", 40: "v-slot can only be used on components or <template> tags.", 41: "v-model is missing expression.", 42: "v-model value must be a valid JavaScript member expression.", 43: "v-model cannot be used on v-for or v-slot scope variables because they are not writable.", 44: "v-model cannot be used on a prop, because local prop bindings are not writable.\nUse a v-bind binding combined with a v-on listener that emits update:x event instead.", 45: "Error parsing JavaScript expression: ", 46: "<KeepAlive> expects exactly one child component.", 51: "@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.", 47: '"prefixIdentifiers" option is not supported in this build of compiler.', 48: "ES module mode is not supported in this build of compiler.", 49: '"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.', 50: '"scopeId" option is only supported in module mode.', 53: "" };
    __name(walkBlockDeclarations, "walkBlockDeclarations");
    __name(isForStatement, "isForStatement");
    __name(walkForStatement, "walkForStatement");
    __name(walkSwitchStatement, "walkSwitchStatement");
    __name(extractIdentifiers, "extractIdentifiers");
    isStaticProperty = /* @__PURE__ */ __name((e4) => e4 && ("ObjectProperty" === e4.type || "ObjectMethod" === e4.type) && !e4.computed, "isStaticProperty");
    He = ["TSAsExpression", "TSTypeAssertion", "TSNonNullExpression", "TSInstantiationExpression", "TSSatisfiesExpression"];
    isStaticExp = /* @__PURE__ */ __name((e4) => 4 === e4.type && e4.isStatic, "isStaticExp");
    __name(isCoreComponent, "isCoreComponent");
    je = /^$|^\d|[^\$\w\xA0-\uFFFF]/;
    isSimpleIdentifier = /* @__PURE__ */ __name((e4) => !je.test(e4), "isSimpleIdentifier");
    $e = /[A-Za-z_$\xA0-\uFFFF]/;
    We = /[\.\?\w$\xA0-\uFFFF]/;
    qe = /\s+[.[]\s*|\s*[.[]\s+/g;
    getExpSource = /* @__PURE__ */ __name((e4) => 4 === e4.type ? e4.content : e4.loc.source, "getExpSource");
    isMemberExpressionBrowser = /* @__PURE__ */ __name((e4) => {
      const t5 = getExpSource(e4).trim().replace(qe, (e5) => e5.trim());
      let n2 = 0, r4 = [], o5 = 0, s4 = 0, i4 = null;
      for (let e5 = 0; e5 < t5.length; e5++) {
        const a6 = t5.charAt(e5);
        switch (n2) {
          case 0:
            if ("[" === a6) r4.push(n2), n2 = 1, o5++;
            else if ("(" === a6) r4.push(n2), n2 = 2, s4++;
            else if (!(0 === e5 ? $e : We).test(a6)) return false;
            break;
          case 1:
            "'" === a6 || '"' === a6 || "`" === a6 ? (r4.push(n2), n2 = 3, i4 = a6) : "[" === a6 ? o5++ : "]" === a6 && (--o5 || (n2 = r4.pop()));
            break;
          case 2:
            if ("'" === a6 || '"' === a6 || "`" === a6) r4.push(n2), n2 = 3, i4 = a6;
            else if ("(" === a6) s4++;
            else if (")" === a6) {
              if (e5 === t5.length - 1) return false;
              --s4 || (n2 = r4.pop());
            }
            break;
          case 3:
            a6 === i4 && (n2 = r4.pop(), i4 = null);
        }
      }
      return !o5 && !s4;
    }, "isMemberExpressionBrowser");
    Ge = NOOP;
    Je = isMemberExpressionBrowser;
    Ke = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/;
    isFnExpressionBrowser = /* @__PURE__ */ __name((e4) => Ke.test(getExpSource(e4)), "isFnExpressionBrowser");
    Ye = NOOP;
    Qe = isFnExpressionBrowser;
    __name(advancePositionWithMutation, "advancePositionWithMutation");
    __name(findDir, "findDir");
    __name(findProp, "findProp");
    __name(isStaticArgOf, "isStaticArgOf");
    __name(hasDynamicKeyVBind, "hasDynamicKeyVBind");
    __name(isText$1, "isText$1");
    __name(isVPre, "isVPre");
    __name(isVSlot, "isVSlot");
    __name(isTemplateNode, "isTemplateNode");
    __name(isSlotOutlet, "isSlotOutlet");
    ze = /* @__PURE__ */ new Set([ye, Ne]);
    __name(getUnnormalizedProps, "getUnnormalizedProps");
    __name(injectProp, "injectProp");
    __name(hasProp, "hasProp");
    __name(toValidAssetId, "toValidAssetId");
    __name(getMemoedVNodeCall, "getMemoedVNodeCall");
    Ze = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
    __name(isAllWhitespace, "isAllWhitespace");
    __name(isWhitespaceText, "isWhitespaceText");
    __name(isCommentOrWhitespace, "isCommentOrWhitespace");
    et = { parseMode: "base", ns: 0, delimiters: ["{{", "}}"], getNamespace: /* @__PURE__ */ __name(() => 0, "getNamespace"), isVoidTag: NO, isPreTag: NO, isIgnoreNewlineTag: NO, isCustomElement: NO, onError: defaultOnError, onWarn: defaultOnWarn, comments: false, prefixIdentifiers: false };
    tt = et;
    nt = null;
    rt = "";
    ot = null;
    st = null;
    it = "";
    at = -1;
    ct = -1;
    lt = 0;
    pt = false;
    dt = null;
    ut = [];
    ht = new class {
      constructor(e4, t5) {
        this.stack = e4, this.cbs = t5, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = false, this.inXML = false, this.inVPre = false, this.newlines = [], this.mode = 0, this.delimiterOpen = Ve, this.delimiterClose = Fe, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
      }
      get inSFCRoot() {
        return 2 === this.mode && 0 === this.stack.length;
      }
      reset() {
        this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = false, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = Ve, this.delimiterClose = Fe;
      }
      getPos(e4) {
        let t5 = 1, n2 = e4 + 1;
        for (let r4 = this.newlines.length - 1; r4 >= 0; r4--) {
          const o5 = this.newlines[r4];
          if (e4 > o5) {
            t5 = r4 + 2, n2 = e4 - o5;
            break;
          }
        }
        return { column: n2, line: t5, offset: e4 };
      }
      peek() {
        return this.buffer.charCodeAt(this.index + 1);
      }
      stateText(e4) {
        60 === e4 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : this.inVPre || e4 !== this.delimiterOpen[0] || (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(e4));
      }
      stateInterpolationOpen(e4) {
        if (e4 === this.delimiterOpen[this.delimiterIndex]) if (this.delimiterIndex === this.delimiterOpen.length - 1) {
          const e5 = this.index + 1 - this.delimiterOpen.length;
          e5 > this.sectionStart && this.cbs.ontext(this.sectionStart, e5), this.state = 3, this.sectionStart = e5;
        } else this.delimiterIndex++;
        else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(e4)) : (this.state = 1, this.stateText(e4));
      }
      stateInterpolation(e4) {
        e4 === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(e4));
      }
      stateInterpolationClose(e4) {
        e4 === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(e4));
      }
      stateSpecialStartSequence(e4) {
        const t5 = this.sequenceIndex === this.currentSequence.length;
        if (t5 ? isEndOfTagSection(e4) : (32 | e4) === this.currentSequence[this.sequenceIndex]) {
          if (!t5) return void this.sequenceIndex++;
        } else this.inRCDATA = false;
        this.sequenceIndex = 0, this.state = 6, this.stateInTagName(e4);
      }
      stateInRCDATA(e4) {
        if (this.sequenceIndex === this.currentSequence.length) {
          if (62 === e4 || isWhitespace(e4)) {
            const t5 = this.index - this.currentSequence.length;
            if (this.sectionStart < t5) {
              const e5 = this.index;
              this.index = t5, this.cbs.ontext(this.sectionStart, t5), this.index = e5;
            }
            return this.sectionStart = t5 + 2, this.stateInClosingTagName(e4), void (this.inRCDATA = false);
          }
          this.sequenceIndex = 0;
        }
        (32 | e4) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : 0 === this.sequenceIndex ? this.currentSequence === Xe.TitleEnd || this.currentSequence === Xe.TextareaEnd && !this.inSFCRoot ? this.inVPre || e4 !== this.delimiterOpen[0] || (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(e4)) : this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.sequenceIndex = Number(60 === e4);
      }
      stateCDATASequence(e4) {
        e4 === Xe.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === Xe.Cdata.length && (this.state = 28, this.currentSequence = Xe.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(e4));
      }
      fastForwardTo(e4) {
        for (; ++this.index < this.buffer.length; ) {
          const t5 = this.buffer.charCodeAt(this.index);
          if (10 === t5 && this.newlines.push(this.index), t5 === e4) return true;
        }
        return this.index = this.buffer.length - 1, false;
      }
      stateInCommentLike(e4) {
        e4 === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === Xe.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : 0 === this.sequenceIndex ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : e4 !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
      }
      startSpecial(e4, t5) {
        this.enterRCDATA(e4, t5), this.state = 31;
      }
      enterRCDATA(e4, t5) {
        this.inRCDATA = true, this.currentSequence = e4, this.sequenceIndex = t5;
      }
      stateBeforeTagName(e4) {
        33 === e4 ? (this.state = 22, this.sectionStart = this.index + 1) : 63 === e4 ? (this.state = 24, this.sectionStart = this.index + 1) : isTagStartChar(e4) ? (this.sectionStart = this.index, 0 === this.mode ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : this.state = 116 === e4 ? 30 : 115 === e4 ? 29 : 6) : 47 === e4 ? this.state = 8 : (this.state = 1, this.stateText(e4));
      }
      stateInTagName(e4) {
        isEndOfTagSection(e4) && this.handleTagName(e4);
      }
      stateInSFCRootTagName(e4) {
        if (isEndOfTagSection(e4)) {
          const t5 = this.buffer.slice(this.sectionStart, this.index);
          "template" !== t5 && this.enterRCDATA(toCharCodes("</" + t5), 0), this.handleTagName(e4);
        }
      }
      handleTagName(e4) {
        this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(e4);
      }
      stateBeforeClosingTagName(e4) {
        isWhitespace(e4) || (62 === e4 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = isTagStartChar(e4) ? 9 : 27, this.sectionStart = this.index));
      }
      stateInClosingTagName(e4) {
        (62 === e4 || isWhitespace(e4)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(e4));
      }
      stateAfterClosingTagName(e4) {
        62 === e4 && (this.state = 1, this.sectionStart = this.index + 1);
      }
      stateBeforeAttrName(e4) {
        62 === e4 ? (this.cbs.onopentagend(this.index), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : 47 === e4 ? this.state = 7 : 60 === e4 && 47 === this.peek() ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : isWhitespace(e4) || this.handleAttrStart(e4);
      }
      handleAttrStart(e4) {
        118 === e4 && 45 === this.peek() ? (this.state = 13, this.sectionStart = this.index) : 46 === e4 || 58 === e4 || 64 === e4 || 35 === e4 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
      }
      stateInSelfClosingTag(e4) {
        62 === e4 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = false) : isWhitespace(e4) || (this.state = 11, this.stateBeforeAttrName(e4));
      }
      stateInAttrName(e4) {
        (61 === e4 || isEndOfTagSection(e4)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(e4));
      }
      stateInDirName(e4) {
        61 === e4 || isEndOfTagSection(e4) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(e4)) : 58 === e4 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : 46 === e4 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
      }
      stateInDirArg(e4) {
        61 === e4 || isEndOfTagSection(e4) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(e4)) : 91 === e4 ? this.state = 15 : 46 === e4 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
      }
      stateInDynamicDirArg(e4) {
        93 === e4 ? this.state = 14 : (61 === e4 || isEndOfTagSection(e4)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(e4));
      }
      stateInDirModifier(e4) {
        61 === e4 || isEndOfTagSection(e4) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(e4)) : 46 === e4 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
      }
      handleAttrNameEnd(e4) {
        this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(e4);
      }
      stateAfterAttrName(e4) {
        61 === e4 ? this.state = 18 : 47 === e4 || 62 === e4 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(e4)) : isWhitespace(e4) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(e4));
      }
      stateBeforeAttrValue(e4) {
        34 === e4 ? (this.state = 19, this.sectionStart = this.index + 1) : 39 === e4 ? (this.state = 20, this.sectionStart = this.index + 1) : isWhitespace(e4) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(e4));
      }
      handleInAttrValue(e4, t5) {
        (e4 === t5 || this.fastForwardTo(t5)) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(34 === t5 ? 3 : 2, this.index + 1), this.state = 11);
      }
      stateInAttrValueDoubleQuotes(e4) {
        this.handleInAttrValue(e4, 34);
      }
      stateInAttrValueSingleQuotes(e4) {
        this.handleInAttrValue(e4, 39);
      }
      stateInAttrValueNoQuotes(e4) {
        isWhitespace(e4) || 62 === e4 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(e4)) : 39 !== e4 && 60 !== e4 && 61 !== e4 && 96 !== e4 || this.cbs.onerr(18, this.index);
      }
      stateBeforeDeclaration(e4) {
        91 === e4 ? (this.state = 26, this.sequenceIndex = 0) : this.state = 45 === e4 ? 25 : 23;
      }
      stateInDeclaration(e4) {
        (62 === e4 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
      }
      stateInProcessingInstruction(e4) {
        (62 === e4 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
      }
      stateBeforeComment(e4) {
        45 === e4 ? (this.state = 28, this.currentSequence = Xe.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
      }
      stateInSpecialComment(e4) {
        (62 === e4 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
      }
      stateBeforeSpecialS(e4) {
        e4 === Xe.ScriptEnd[3] ? this.startSpecial(Xe.ScriptEnd, 4) : e4 === Xe.StyleEnd[3] ? this.startSpecial(Xe.StyleEnd, 4) : (this.state = 6, this.stateInTagName(e4));
      }
      stateBeforeSpecialT(e4) {
        e4 === Xe.TitleEnd[3] ? this.startSpecial(Xe.TitleEnd, 4) : e4 === Xe.TextareaEnd[3] ? this.startSpecial(Xe.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(e4));
      }
      startEntity() {
      }
      stateInEntity() {
      }
      parse(e4) {
        for (this.buffer = e4; this.index < this.buffer.length; ) {
          const e5 = this.buffer.charCodeAt(this.index);
          switch (10 === e5 && 33 !== this.state && this.newlines.push(this.index), this.state) {
            case 1:
              this.stateText(e5);
              break;
            case 2:
              this.stateInterpolationOpen(e5);
              break;
            case 3:
              this.stateInterpolation(e5);
              break;
            case 4:
              this.stateInterpolationClose(e5);
              break;
            case 31:
              this.stateSpecialStartSequence(e5);
              break;
            case 32:
              this.stateInRCDATA(e5);
              break;
            case 26:
              this.stateCDATASequence(e5);
              break;
            case 19:
              this.stateInAttrValueDoubleQuotes(e5);
              break;
            case 12:
              this.stateInAttrName(e5);
              break;
            case 13:
              this.stateInDirName(e5);
              break;
            case 14:
              this.stateInDirArg(e5);
              break;
            case 15:
              this.stateInDynamicDirArg(e5);
              break;
            case 16:
              this.stateInDirModifier(e5);
              break;
            case 28:
              this.stateInCommentLike(e5);
              break;
            case 27:
              this.stateInSpecialComment(e5);
              break;
            case 11:
              this.stateBeforeAttrName(e5);
              break;
            case 6:
              this.stateInTagName(e5);
              break;
            case 34:
              this.stateInSFCRootTagName(e5);
              break;
            case 9:
              this.stateInClosingTagName(e5);
              break;
            case 5:
              this.stateBeforeTagName(e5);
              break;
            case 17:
              this.stateAfterAttrName(e5);
              break;
            case 20:
              this.stateInAttrValueSingleQuotes(e5);
              break;
            case 18:
              this.stateBeforeAttrValue(e5);
              break;
            case 8:
              this.stateBeforeClosingTagName(e5);
              break;
            case 10:
              this.stateAfterClosingTagName(e5);
              break;
            case 29:
              this.stateBeforeSpecialS(e5);
              break;
            case 30:
              this.stateBeforeSpecialT(e5);
              break;
            case 21:
              this.stateInAttrValueNoQuotes(e5);
              break;
            case 7:
              this.stateInSelfClosingTag(e5);
              break;
            case 23:
              this.stateInDeclaration(e5);
              break;
            case 22:
              this.stateBeforeDeclaration(e5);
              break;
            case 25:
              this.stateBeforeComment(e5);
              break;
            case 24:
              this.stateInProcessingInstruction(e5);
              break;
            case 33:
              this.stateInEntity();
          }
          this.index++;
        }
        this.cleanup(), this.finish();
      }
      cleanup() {
        this.sectionStart !== this.index && (1 === this.state || 32 === this.state && 0 === this.sequenceIndex ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : 19 !== this.state && 20 !== this.state && 21 !== this.state || (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
      }
      finish() {
        this.handleTrailingData(), this.cbs.onend();
      }
      handleTrailingData() {
        const e4 = this.buffer.length;
        this.sectionStart >= e4 || (28 === this.state ? this.currentSequence === Xe.CdataEnd ? this.cbs.oncdata(this.sectionStart, e4) : this.cbs.oncomment(this.sectionStart, e4) : 6 === this.state || 11 === this.state || 18 === this.state || 17 === this.state || 12 === this.state || 13 === this.state || 14 === this.state || 15 === this.state || 16 === this.state || 20 === this.state || 19 === this.state || 21 === this.state || 9 === this.state || this.cbs.ontext(this.sectionStart, e4));
      }
      emitCodePoint(e4, t5) {
      }
    }(ut, { onerr: emitError, ontext(e4, t5) {
      onText(getSlice(e4, t5), e4, t5);
    }, ontextentity(e4, t5, n2) {
      onText(e4, t5, n2);
    }, oninterpolation(e4, t5) {
      if (pt) return onText(getSlice(e4, t5), e4, t5);
      let n2 = e4 + ht.delimiterOpen.length, r4 = t5 - ht.delimiterClose.length;
      for (; isWhitespace(rt.charCodeAt(n2)); ) n2++;
      for (; isWhitespace(rt.charCodeAt(r4 - 1)); ) r4--;
      let o5 = getSlice(n2, r4);
      o5.includes("&") && (o5 = tt.decodeEntities(o5, false)), addNode({ type: 5, content: createExp(o5, false, getLoc(n2, r4)), loc: getLoc(e4, t5) });
    }, onopentagname(e4, t5) {
      const n2 = getSlice(e4, t5);
      ot = { type: 1, tag: n2, ns: tt.getNamespace(n2, ut[0], tt.ns), tagType: 0, props: [], children: [], loc: getLoc(e4 - 1, t5), codegenNode: void 0 };
    }, onopentagend(e4) {
      endOpenTag(e4);
    }, onclosetag(e4, t5) {
      const n2 = getSlice(e4, t5);
      if (!tt.isVoidTag(n2)) {
        let r4 = false;
        for (let e5 = 0; e5 < ut.length; e5++) {
          if (ut[e5].tag.toLowerCase() === n2.toLowerCase()) {
            r4 = true, e5 > 0 && emitError(24, ut[0].loc.start.offset);
            for (let n3 = 0; n3 <= e5; n3++) {
              onCloseTag(ut.shift(), t5, n3 < e5);
            }
            break;
          }
        }
        r4 || emitError(23, backTrack(e4, 60));
      }
    }, onselfclosingtag(e4) {
      const t5 = ot.tag;
      ot.isSelfClosing = true, endOpenTag(e4), ut[0] && ut[0].tag === t5 && onCloseTag(ut.shift(), e4);
    }, onattribname(e4, t5) {
      st = { type: 6, name: getSlice(e4, t5), nameLoc: getLoc(e4, t5), value: void 0, loc: getLoc(e4) };
    }, ondirname(e4, t5) {
      const n2 = getSlice(e4, t5), r4 = "." === n2 || ":" === n2 ? "bind" : "@" === n2 ? "on" : "#" === n2 ? "slot" : n2.slice(2);
      if (pt || "" !== r4 || emitError(26, e4), pt || "" === r4) st = { type: 6, name: n2, nameLoc: getLoc(e4, t5), value: void 0, loc: getLoc(e4) };
      else if (st = { type: 7, name: r4, rawName: n2, exp: void 0, arg: void 0, modifiers: "." === n2 ? [createSimpleExpression("prop")] : [], loc: getLoc(e4) }, "pre" === r4) {
        pt = ht.inVPre = true, dt = ot;
        const e5 = ot.props;
        for (let t6 = 0; t6 < e5.length; t6++) 7 === e5[t6].type && (e5[t6] = dirToAttr(e5[t6]));
      }
    }, ondirarg(e4, t5) {
      if (e4 === t5) return;
      const n2 = getSlice(e4, t5);
      if (pt && !isVPre(st)) st.name += n2, setLocEnd(st.nameLoc, t5);
      else {
        const r4 = "[" !== n2[0];
        st.arg = createExp(r4 ? n2 : n2.slice(1, -1), r4, getLoc(e4, t5), r4 ? 3 : 0);
      }
    }, ondirmodifier(e4, t5) {
      const n2 = getSlice(e4, t5);
      if (pt && !isVPre(st)) st.name += "." + n2, setLocEnd(st.nameLoc, t5);
      else if ("slot" === st.name) {
        const e5 = st.arg;
        e5 && (e5.content += "." + n2, setLocEnd(e5.loc, t5));
      } else {
        const r4 = createSimpleExpression(n2, true, getLoc(e4, t5));
        st.modifiers.push(r4);
      }
    }, onattribdata(e4, t5) {
      it += getSlice(e4, t5), at < 0 && (at = e4), ct = t5;
    }, onattribentity(e4, t5, n2) {
      it += e4, at < 0 && (at = t5), ct = n2;
    }, onattribnameend(e4) {
      const t5 = st.loc.start.offset, n2 = getSlice(t5, e4);
      7 === st.type && (st.rawName = n2), ot.props.some((e5) => (7 === e5.type ? e5.rawName : e5.name) === n2) && emitError(2, t5);
    }, onattribend(e4, t5) {
      if (ot && st) {
        if (setLocEnd(st.loc, t5), 0 !== e4) if (it.includes("&") && (it = tt.decodeEntities(it, true)), 6 === st.type) "class" === st.name && (it = condense(it).trim()), 1 !== e4 || it || emitError(13, t5), st.value = { type: 2, content: it, loc: 1 === e4 ? getLoc(at, ct) : getLoc(at - 1, ct + 1) }, ht.inSFCRoot && "template" === ot.tag && "lang" === st.name && it && "html" !== it && ht.enterRCDATA(toCharCodes("</template"), 0);
        else {
          let e5 = 0;
          st.exp = createExp(it, false, getLoc(at, ct), 0, e5), "for" === st.name && (st.forParseResult = (function(e6) {
            const t7 = e6.loc, n2 = e6.content, r4 = n2.match(Ze);
            if (!r4) return;
            const [, o5, s4] = r4, createAliasExpression = /* @__PURE__ */ __name((e7, n3, r5 = false) => {
              const o6 = t7.start.offset + n3;
              return createExp(e7, false, getLoc(o6, o6 + e7.length), 0, r5 ? 1 : 0);
            }, "createAliasExpression"), i4 = { source: createAliasExpression(s4.trim(), n2.indexOf(s4, o5.length)), value: void 0, key: void 0, index: void 0, finalized: false };
            let a6 = o5.trim().replace(mt, "").trim();
            const c4 = o5.indexOf(a6), l3 = a6.match(ft);
            if (l3) {
              a6 = a6.replace(ft, "").trim();
              const e7 = l3[1].trim();
              let t8;
              if (e7 && (t8 = n2.indexOf(e7, c4 + a6.length), i4.key = createAliasExpression(e7, t8, true)), l3[2]) {
                const r5 = l3[2].trim();
                r5 && (i4.index = createAliasExpression(r5, n2.indexOf(r5, i4.key ? t8 + e7.length : c4 + a6.length), true));
              }
            }
            a6 && (i4.value = createAliasExpression(a6, c4, true));
            return i4;
          })(st.exp));
          let t6 = -1;
          "bind" === st.name && (t6 = st.modifiers.findIndex((e6) => "sync" === e6.content)) > -1 && checkCompatEnabled("COMPILER_V_BIND_SYNC", tt, st.loc, st.arg.loc.source) && (st.name = "model", st.modifiers.splice(t6, 1));
        }
        7 === st.type && "pre" === st.name || ot.props.push(st);
      }
      it = "", at = ct = -1;
    }, oncomment(e4, t5) {
      tt.comments && addNode({ type: 3, content: getSlice(e4, t5), loc: getLoc(e4 - 4, t5 + 3) });
    }, onend() {
      const e4 = rt.length;
      for (let t5 = 0; t5 < ut.length; t5++) onCloseTag(ut[t5], e4 - 1), emitError(24, ut[t5].loc.start.offset);
    }, oncdata(e4, t5) {
      0 !== ut[0].ns ? onText(getSlice(e4, t5), e4, t5) : emitError(1, e4 - 9);
    }, onprocessinginstruction(e4) {
      0 === (ut[0] ? ut[0].ns : tt.ns) && emitError(21, e4 - 1);
    } });
    ft = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    mt = /^\(|\)$/g;
    __name(getSlice, "getSlice");
    __name(endOpenTag, "endOpenTag");
    __name(onText, "onText");
    __name(onCloseTag, "onCloseTag");
    __name(backTrack, "backTrack");
    Et = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
    __name(isFragmentTemplate, "isFragmentTemplate");
    gt = /\r\n/g;
    __name(condenseWhitespace, "condenseWhitespace");
    __name(hasNewlineChar, "hasNewlineChar");
    __name(condense, "condense");
    __name(addNode, "addNode");
    __name(getLoc, "getLoc");
    __name(setLocEnd, "setLocEnd");
    __name(dirToAttr, "dirToAttr");
    __name(createExp, "createExp");
    __name(emitError, "emitError");
    __name(baseParse, "baseParse");
    __name(cacheStatic, "cacheStatic");
    __name(getSingleElementRoot, "getSingleElementRoot");
    __name(walk, "walk");
    __name(getConstantType, "getConstantType");
    _t = /* @__PURE__ */ new Set([Se, Te, ye, Ne]);
    __name(getConstantTypeOfHelperCall, "getConstantTypeOfHelperCall");
    __name(getGeneratedPropsConstantType, "getGeneratedPropsConstantType");
    __name(getNodeProps, "getNodeProps");
    __name(createTransformContext, "createTransformContext");
    __name(transform, "transform");
    __name(traverseNode, "traverseNode");
    __name(createStructuralDirectiveTransform, "createStructuralDirectiveTransform");
    St = "/*@__PURE__*/";
    aliasHelper = /* @__PURE__ */ __name((e4) => `${we[e4]}: _${we[e4]}`, "aliasHelper");
    __name(generate, "generate");
    __name(genAssets, "genAssets");
    __name(genNodeListAsArray, "genNodeListAsArray");
    __name(genNodeList, "genNodeList");
    __name(genNode, "genNode");
    __name(genExpression, "genExpression");
    __name(genCompoundExpression, "genCompoundExpression");
    __name(genExpressionAsPropertyKey, "genExpressionAsPropertyKey");
    new RegExp("\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b");
    __name(processExpression, "processExpression");
    Tt = createStructuralDirectiveTransform(/^(?:if|else|else-if)$/, (e4, t5, n2) => processIf(e4, t5, n2, (e5, t6, r4) => {
      const o5 = n2.parent.children;
      let s4 = o5.indexOf(e5), i4 = 0;
      for (; s4-- >= 0; ) {
        const e6 = o5[s4];
        e6 && 9 === e6.type && (i4 += e6.branches.length);
      }
      return () => {
        if (r4) e5.codegenNode = createCodegenNodeForBranch(t6, i4, n2);
        else {
          const r5 = (function(e6) {
            for (; ; ) if (19 === e6.type) {
              if (19 !== e6.alternate.type) return e6;
              e6 = e6.alternate;
            } else 20 === e6.type && (e6 = e6.value);
          })(e5.codegenNode);
          r5.alternate = createCodegenNodeForBranch(t6, i4 + e5.branches.length - 1, n2);
        }
      };
    }));
    __name(processIf, "processIf");
    __name(createIfBranch, "createIfBranch");
    __name(createCodegenNodeForBranch, "createCodegenNodeForBranch");
    __name(createChildrenCodegenNode, "createChildrenCodegenNode");
    yt = createStructuralDirectiveTransform("for", (e4, t5, n2) => {
      const { helper: r4, removeHelper: o5 } = n2;
      return processFor(e4, t5, n2, (t6) => {
        const s4 = createCallExpression(r4(fe), [t6.source]), i4 = isTemplateNode(e4), a6 = findDir(e4, "memo"), c4 = findProp(e4, "key", false, true);
        c4 && c4.type;
        let l3 = c4 && (6 === c4.type ? c4.value ? createSimpleExpression(c4.value.content, true) : void 0 : c4.exp);
        const p3 = c4 && l3 ? createObjectProperty("key", l3) : null, d3 = 4 === t6.source.type && t6.source.constType > 0, u3 = d3 ? 64 : c4 ? 128 : 256;
        return t6.codegenNode = createVNodeCall(n2, r4(Y), void 0, s4, u3, void 0, void 0, true, !d3, false, e4.loc), () => {
          let c5;
          const { children: u4 } = t6, h4 = 1 !== u4.length || 1 !== u4[0].type, f3 = isSlotOutlet(e4) ? e4 : i4 && 1 === e4.children.length && isSlotOutlet(e4.children[0]) ? e4.children[0] : null;
          if (f3 ? (c5 = f3.codegenNode, i4 && p3 && injectProp(c5, p3, n2)) : h4 ? c5 = createVNodeCall(n2, r4(Y), p3 ? createObjectExpression([p3]) : void 0, e4.children, 64, void 0, void 0, true, void 0, false) : (c5 = u4[0].codegenNode, i4 && p3 && injectProp(c5, p3, n2), c5.isBlock !== !d3 && (c5.isBlock ? (o5(te), o5(getVNodeBlockHelper(n2.inSSR, c5.isComponent))) : o5(getVNodeHelper(n2.inSSR, c5.isComponent))), c5.isBlock = !d3, c5.isBlock ? (r4(te), r4(getVNodeBlockHelper(n2.inSSR, c5.isComponent))) : r4(getVNodeHelper(n2.inSSR, c5.isComponent))), a6) {
            const e5 = createFunctionExpression(createForLoopParams(t6.parseResult, [createSimpleExpression("_cached")]));
            e5.body = createBlockStatement([createCompoundExpression(["const _memo = (", a6.exp, ")"]), createCompoundExpression(["if (_cached", ...l3 ? [" && _cached.key === ", l3] : [], ` && ${n2.helperString(De)}(_cached, _memo)) return _cached`]), createCompoundExpression(["const _item = ", c5]), createSimpleExpression("_item.memo = _memo"), createSimpleExpression("return _item")]), s4.arguments.push(e5, createSimpleExpression("_cache"), createSimpleExpression(String(n2.cached.length))), n2.cached.push(null);
          } else s4.arguments.push(createFunctionExpression(createForLoopParams(t6.parseResult), c5, true));
        };
      });
    });
    __name(processFor, "processFor");
    __name(finalizeForParseResult, "finalizeForParseResult");
    __name(createForLoopParams, "createForLoopParams");
    Nt = createSimpleExpression("undefined", false);
    trackSlotScopes = /* @__PURE__ */ __name((e4, t5) => {
      if (1 === e4.type && (1 === e4.tagType || 3 === e4.tagType)) {
        const n2 = findDir(e4, "slot");
        if (n2) return n2.exp, t5.scopes.vSlot++, () => {
          t5.scopes.vSlot--;
        };
      }
    }, "trackSlotScopes");
    buildClientSlotFn = /* @__PURE__ */ __name((e4, t5, n2, r4) => createFunctionExpression(e4, n2, false, true, n2.length ? n2[0].loc : r4), "buildClientSlotFn");
    __name(buildSlots, "buildSlots");
    __name(buildDynamicSlot, "buildDynamicSlot");
    __name(hasForwardedSlots, "hasForwardedSlots");
    Ct = /* @__PURE__ */ new WeakMap();
    transformElement = /* @__PURE__ */ __name((e4, t5) => function() {
      if (1 !== (e4 = t5.currentNode).type || 0 !== e4.tagType && 1 !== e4.tagType) return;
      const { tag: n2, props: r4 } = e4, o5 = 1 === e4.tagType;
      let s4 = o5 ? resolveComponentType(e4, t5) : `"${n2}"`;
      const i4 = isObject(s4) && s4.callee === pe;
      let a6, c4, l3, p3, d3, u3 = 0, h4 = i4 || s4 === Q || s4 === z2 || !o5 && ("svg" === n2 || "foreignObject" === n2 || "math" === n2);
      if (r4.length > 0) {
        const n3 = buildProps(e4, t5, void 0, o5, i4);
        a6 = n3.props, u3 = n3.patchFlag, p3 = n3.dynamicPropNames;
        const r5 = n3.directives;
        d3 = r5 && r5.length ? createArrayExpression(r5.map((e5) => buildDirectiveArgs(e5, t5))) : void 0, n3.shouldUseBlock && (h4 = true);
      }
      if (e4.children.length > 0) {
        s4 === Z && (h4 = true, u3 |= 1024);
        if (o5 && s4 !== Q && s4 !== Z) {
          const { slots: n3, hasDynamicSlots: r5 } = buildSlots(e4, t5);
          c4 = n3, r5 && (u3 |= 1024);
        } else if (1 === e4.children.length && s4 !== Q) {
          const n3 = e4.children[0], r5 = n3.type, o6 = 5 === r5 || 8 === r5;
          o6 && 0 === getConstantType(n3, t5) && (u3 |= 1), c4 = o6 || 2 === r5 ? n3 : e4.children;
        } else c4 = e4.children;
      }
      p3 && p3.length && (l3 = (function(e5) {
        let t6 = "[";
        for (let n3 = 0, r5 = e5.length; n3 < r5; n3++) t6 += JSON.stringify(e5[n3]), n3 < r5 - 1 && (t6 += ", ");
        return t6 + "]";
      })(p3)), e4.codegenNode = createVNodeCall(t5, s4, a6, c4, 0 === u3 ? void 0 : u3, l3, d3, !!h4, false, o5, e4.loc);
    }, "transformElement");
    __name(resolveComponentType, "resolveComponentType");
    __name(buildProps, "buildProps");
    __name(dedupeProperties, "dedupeProperties");
    __name(mergeAsArray, "mergeAsArray");
    __name(buildDirectiveArgs, "buildDirectiveArgs");
    __name(isComponentTag, "isComponentTag");
    transformSlotOutlet = /* @__PURE__ */ __name((e4, t5) => {
      if (isSlotOutlet(e4)) {
        const { children: n2, loc: r4 } = e4, { slotName: o5, slotProps: s4 } = processSlotOutlet(e4, t5), i4 = [t5.prefixIdentifiers ? "_ctx.$slots" : "$slots", o5, "{}", "undefined", "true"];
        let a6 = 2;
        s4 && (i4[2] = s4, a6 = 3), n2.length && (i4[3] = createFunctionExpression([], n2, false, false, r4), a6 = 4), t5.scopeId && !t5.slotted && (a6 = 5), i4.splice(a6), e4.codegenNode = createCallExpression(t5.helper(me), i4, r4);
      }
    }, "transformSlotOutlet");
    __name(processSlotOutlet, "processSlotOutlet");
    transformOn$1 = /* @__PURE__ */ __name((e4, t5, n2, r4) => {
      const { loc: o5, modifiers: s4, arg: i4 } = e4;
      let a6;
      if (e4.exp || s4.length || n2.onError(createCompilerError(35, o5)), 4 === i4.type) if (i4.isStatic) {
        let e5 = i4.content;
        e5.startsWith("vue:") && (e5 = `vnode-${e5.slice(4)}`);
        a6 = createSimpleExpression(0 !== t5.tagType || e5.startsWith("vnode") || !/[A-Z]/.test(e5) ? u(p(e5)) : `on:${e5}`, true, i4.loc);
      } else a6 = createCompoundExpression([`${n2.helperString(Oe)}(`, i4, ")"]);
      else a6 = i4, a6.children.unshift(`${n2.helperString(Oe)}(`), a6.children.push(")");
      let c4 = e4.exp;
      c4 && !c4.content.trim() && (c4 = void 0);
      let l3 = n2.cacheHandlers && !c4 && !n2.inVOnce;
      if (c4) {
        const e5 = Je(c4), t6 = !(e5 || Qe(c4)), n3 = c4.content.includes(";");
        (t6 || l3 && e5) && (c4 = createCompoundExpression([`${t6 ? "$event" : "(...args)"} => ${n3 ? "{" : "("}`, c4, n3 ? "}" : ")"]));
      }
      let p3 = { props: [createObjectProperty(a6, c4 || createSimpleExpression("() => {}", false, o5))] };
      return r4 && (p3 = r4(p3)), l3 && (p3.props[0].value = n2.cache(p3.props[0].value)), p3.props.forEach((e5) => e5.key.isHandlerKey = true), p3;
    }, "transformOn$1");
    transformBind = /* @__PURE__ */ __name((e4, t5, n2) => {
      const { modifiers: r4, loc: o5 } = e4, s4 = e4.arg;
      let { exp: i4 } = e4;
      return i4 && 4 === i4.type && !i4.content.trim() && (i4 = void 0), 4 !== s4.type ? (s4.children.unshift("("), s4.children.push(') || ""')) : s4.isStatic || (s4.content = s4.content ? `${s4.content} || ""` : '""'), r4.some((e5) => "camel" === e5.content) && (4 === s4.type ? s4.isStatic ? s4.content = p(s4.content) : s4.content = `${n2.helperString(xe)}(${s4.content})` : (s4.children.unshift(`${n2.helperString(xe)}(`), s4.children.push(")"))), n2.inSSR || (r4.some((e5) => "prop" === e5.content) && injectPrefix(s4, "."), r4.some((e5) => "attr" === e5.content) && injectPrefix(s4, "^")), { props: [createObjectProperty(s4, i4)] };
    }, "transformBind");
    injectPrefix = /* @__PURE__ */ __name((e4, t5) => {
      4 === e4.type ? e4.isStatic ? e4.content = t5 + e4.content : e4.content = `\`${t5}\${${e4.content}}\`` : (e4.children.unshift(`'${t5}' + (`), e4.children.push(")"));
    }, "injectPrefix");
    transformText = /* @__PURE__ */ __name((e4, t5) => {
      if (0 === e4.type || 1 === e4.type || 11 === e4.type || 10 === e4.type) return () => {
        const n2 = e4.children;
        let r4, o5 = false;
        for (let e5 = 0; e5 < n2.length; e5++) {
          const t6 = n2[e5];
          if (isText$1(t6)) {
            o5 = true;
            for (let o6 = e5 + 1; o6 < n2.length; o6++) {
              const s4 = n2[o6];
              if (!isText$1(s4)) {
                r4 = void 0;
                break;
              }
              r4 || (r4 = n2[e5] = createCompoundExpression([t6], t6.loc)), r4.children.push(" + ", s4), n2.splice(o6, 1), o6--;
            }
          }
        }
        if (o5 && (1 !== n2.length || 0 !== e4.type && (1 !== e4.type || 0 !== e4.tagType || e4.props.find((e5) => 7 === e5.type && !t5.directiveTransforms[e5.name]) || "template" === e4.tag))) for (let e5 = 0; e5 < n2.length; e5++) {
          const r5 = n2[e5];
          if (isText$1(r5) || 8 === r5.type) {
            const o6 = [];
            2 === r5.type && " " === r5.content || o6.push(r5), t5.ssr || 0 !== getConstantType(r5, t5) || o6.push("1"), n2[e5] = { type: 12, content: r5, loc: r5.loc, codegenNode: createCallExpression(t5.helper(ae), o6) };
          }
        }
      };
    }, "transformText");
    xt = /* @__PURE__ */ new WeakSet();
    transformOnce = /* @__PURE__ */ __name((e4, t5) => {
      if (1 === e4.type && findDir(e4, "once", true)) {
        if (xt.has(e4) || t5.inVOnce || t5.inSSR) return;
        return xt.add(e4), t5.inVOnce = true, t5.helper(be), () => {
          t5.inVOnce = false;
          const e5 = t5.currentNode;
          e5.codegenNode && (e5.codegenNode = t5.cache(e5.codegenNode, true, true));
        };
      }
    }, "transformOnce");
    transformModel$1 = /* @__PURE__ */ __name((e4, t5, n2) => {
      const { exp: r4, arg: o5 } = e4;
      if (!r4) return n2.onError(createCompilerError(41, e4.loc)), createTransformProps();
      const s4 = r4.loc.source.trim(), i4 = 4 === r4.type ? r4.content : s4, a6 = n2.bindingMetadata[s4];
      if ("props" === a6 || "props-aliased" === a6) return n2.onError(createCompilerError(44, r4.loc)), createTransformProps();
      if (!i4.trim() || !Je(r4)) return n2.onError(createCompilerError(42, r4.loc)), createTransformProps();
      const c4 = o5 || createSimpleExpression("modelValue", true), l3 = o5 ? isStaticExp(o5) ? `onUpdate:${p(o5.content)}` : createCompoundExpression(['"onUpdate:" + ', o5]) : "onUpdate:modelValue";
      let p3;
      p3 = createCompoundExpression([`${n2.isTS ? "($event: any)" : "$event"} => ((`, r4, ") = $event)"]);
      const d3 = [createObjectProperty(c4, e4.exp), createObjectProperty(l3, p3)];
      if (e4.modifiers.length && 1 === t5.tagType) {
        const t6 = e4.modifiers.map((e5) => e5.content).map((e5) => (isSimpleIdentifier(e5) ? e5 : JSON.stringify(e5)) + ": true").join(", "), n3 = o5 ? isStaticExp(o5) ? `${o5.content}Modifiers` : createCompoundExpression([o5, ' + "Modifiers"']) : "modelModifiers";
        d3.push(createObjectProperty(n3, createSimpleExpression(`{ ${t6} }`, false, e4.loc, 2)));
      }
      return createTransformProps(d3);
    }, "transformModel$1");
    __name(createTransformProps, "createTransformProps");
    It = /[\w).+\-_$\]]/;
    transformFilter = /* @__PURE__ */ __name((e4, t5) => {
      isCompatEnabled("COMPILER_FILTERS", t5) && (5 === e4.type ? rewriteFilter(e4.content, t5) : 1 === e4.type && e4.props.forEach((e5) => {
        7 === e5.type && "for" !== e5.name && e5.exp && rewriteFilter(e5.exp, t5);
      }));
    }, "transformFilter");
    __name(rewriteFilter, "rewriteFilter");
    __name(parseFilter, "parseFilter");
    __name(wrapFilter, "wrapFilter");
    Ot = /* @__PURE__ */ new WeakSet();
    transformMemo = /* @__PURE__ */ __name((e4, t5) => {
      if (1 === e4.type) {
        const n2 = findDir(e4, "memo");
        if (!n2 || Ot.has(e4) || t5.inSSR) return;
        return Ot.add(e4), () => {
          const r4 = e4.codegenNode || t5.currentNode.codegenNode;
          r4 && 13 === r4.type && (1 !== e4.tagType && convertToBlock(r4, t5), e4.codegenNode = createCallExpression(t5.helper(Me), [n2.exp, createFunctionExpression(void 0, r4), "_cache", String(t5.cached.length)]), t5.cached.push(null));
        };
      }
    }, "transformMemo");
    transformVBindShorthand = /* @__PURE__ */ __name((e4, t5) => {
      if (1 === e4.type) {
        for (const n2 of e4.props) if (7 === n2.type && "bind" === n2.name && (!n2.exp || 4 === n2.exp.type && !n2.exp.content.trim()) && n2.arg) {
          const e5 = n2.arg;
          if (4 === e5.type && e5.isStatic) {
            const t6 = p(e5.content);
            ($e.test(t6[0]) || "-" === t6[0]) && (n2.exp = createSimpleExpression(t6, false, e5.loc));
          } else t5.onError(createCompilerError(52, e5.loc)), n2.exp = createSimpleExpression("", true, e5.loc);
        }
      }
    }, "transformVBindShorthand");
    __name(getBaseTransformPreset, "getBaseTransformPreset");
    __name(baseCompile, "baseCompile");
    noopDirectiveTransform = /* @__PURE__ */ __name(() => ({ props: [] }), "noopDirectiveTransform");
    bt = Symbol("");
    vt = Symbol("");
    At = Symbol("");
    Rt = Symbol("");
    Pt = Symbol("");
    Lt = Symbol("");
    Mt = Symbol("");
    Dt = Symbol("");
    wt = Symbol("");
    kt = Symbol("");
    registerRuntimeHelpers({ [bt]: "vModelRadio", [vt]: "vModelCheckbox", [At]: "vModelText", [Rt]: "vModelSelect", [Pt]: "vModelDynamic", [Lt]: "withModifiers", [Mt]: "withKeys", [Dt]: "vShow", [wt]: "Transition", [kt]: "TransitionGroup" });
    Ft = { parseMode: "html", isVoidTag: C, isNativeTag: /* @__PURE__ */ __name((e4) => k(e4) || O(e4) || M(e4), "isNativeTag"), isPreTag: /* @__PURE__ */ __name((e4) => "pre" === e4, "isPreTag"), isIgnoreNewlineTag: /* @__PURE__ */ __name((e4) => "pre" === e4 || "textarea" === e4, "isIgnoreNewlineTag"), decodeEntities: /* @__PURE__ */ __name(function(e4, t5 = false) {
      return Vt || (Vt = document.createElement("div")), t5 ? (Vt.innerHTML = `<div foo="${e4.replace(/"/g, "&quot;")}">`, Vt.children[0].getAttribute("foo")) : (Vt.innerHTML = e4, Vt.textContent);
    }, "decodeEntities"), isBuiltInComponent: /* @__PURE__ */ __name((e4) => "Transition" === e4 || "transition" === e4 ? wt : "TransitionGroup" === e4 || "transition-group" === e4 ? kt : void 0, "isBuiltInComponent"), getNamespace(e4, t5, n2) {
      let r4 = t5 ? t5.ns : n2;
      if (t5 && 2 === r4) if ("annotation-xml" === t5.tag) {
        if ("svg" === e4) return 1;
        t5.props.some((e5) => 6 === e5.type && "encoding" === e5.name && null != e5.value && ("text/html" === e5.value.content || "application/xhtml+xml" === e5.value.content)) && (r4 = 0);
      } else /^m(?:[ions]|text)$/.test(t5.tag) && "mglyph" !== e4 && "malignmark" !== e4 && (r4 = 0);
      else t5 && 1 === r4 && ("foreignObject" !== t5.tag && "desc" !== t5.tag && "title" !== t5.tag || (r4 = 0));
      if (0 === r4) {
        if ("svg" === e4) return 1;
        if ("math" === e4) return 2;
      }
      return r4;
    } };
    transformStyle = /* @__PURE__ */ __name((e4) => {
      1 === e4.type && e4.props.forEach((t5, n2) => {
        6 === t5.type && "style" === t5.name && t5.value && (e4.props[n2] = { type: 7, name: "bind", arg: createSimpleExpression("style", true, t5.loc), exp: parseInlineCSS(t5.value.content, t5.loc), modifiers: [], loc: t5.loc });
      });
    }, "transformStyle");
    parseInlineCSS = /* @__PURE__ */ __name((e4, t5) => {
      const n2 = parseStringStyle(e4);
      return createSimpleExpression(JSON.stringify(n2), false, t5, 3);
    }, "parseInlineCSS");
    __name(createDOMCompilerError, "createDOMCompilerError");
    Xt = { 53: "v-html is missing expression.", 54: "v-html will override element children.", 55: "v-text is missing expression.", 56: "v-text will override element children.", 57: "v-model can only be used on <input>, <textarea> and <select> elements.", 58: "v-model argument is not supported on plain elements.", 59: "v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.", 60: "Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.", 61: "v-show is missing expression.", 62: "<Transition> expects exactly one child element or component.", 63: "Tags with side effect (<script> and <style>) are ignored in client component templates." };
    Ut = makeMap("passive,once,capture");
    Bt = makeMap("stop,prevent,self,ctrl,shift,alt,meta,exact,middle");
    Ht = makeMap("left,right");
    jt = makeMap("onkeyup,onkeydown,onkeypress");
    transformClick = /* @__PURE__ */ __name((e4, t5) => isStaticExp(e4) && "onclick" === e4.content.toLowerCase() ? createSimpleExpression(t5, true) : 4 !== e4.type ? createCompoundExpression(["(", e4, `) === "onClick" ? "${t5}" : (`, e4, ")"]) : e4, "transformClick");
    ignoreSideEffectTags = /* @__PURE__ */ __name((e4, t5) => {
      1 !== e4.type || 0 !== e4.tagType || "script" !== e4.tag && "style" !== e4.tag || t5.removeNode();
    }, "ignoreSideEffectTags");
    $t = [transformStyle];
    Wt = { cloak: noopDirectiveTransform, html: /* @__PURE__ */ __name((e4, t5, n2) => {
      const { exp: r4, loc: o5 } = e4;
      return r4 || n2.onError(createDOMCompilerError(53, o5)), t5.children.length && (n2.onError(createDOMCompilerError(54, o5)), t5.children.length = 0), { props: [createObjectProperty(createSimpleExpression("innerHTML", true, o5), r4 || createSimpleExpression("", true))] };
    }, "html"), text: /* @__PURE__ */ __name((e4, t5, n2) => {
      const { exp: r4, loc: o5 } = e4;
      return r4 || n2.onError(createDOMCompilerError(55, o5)), t5.children.length && (n2.onError(createDOMCompilerError(56, o5)), t5.children.length = 0), { props: [createObjectProperty(createSimpleExpression("textContent", true), r4 ? getConstantType(r4, n2) > 0 ? r4 : createCallExpression(n2.helperString(ge), [r4], o5) : createSimpleExpression("", true))] };
    }, "text"), model: /* @__PURE__ */ __name((e4, t5, n2) => {
      const r4 = transformModel$1(e4, t5, n2);
      if (!r4.props.length || 1 === t5.tagType) return r4;
      e4.arg && n2.onError(createDOMCompilerError(58, e4.arg.loc));
      const { tag: o5 } = t5, s4 = n2.isCustomElement(o5);
      if ("input" === o5 || "textarea" === o5 || "select" === o5 || s4) {
        let i4 = At, a6 = false;
        if ("input" === o5 || s4) {
          const r5 = findProp(t5, "type");
          if (r5) {
            if (7 === r5.type) i4 = Pt;
            else if (r5.value) switch (r5.value.content) {
              case "radio":
                i4 = bt;
                break;
              case "checkbox":
                i4 = vt;
                break;
              case "file":
                a6 = true, n2.onError(createDOMCompilerError(59, e4.loc));
            }
          } else hasDynamicKeyVBind(t5) && (i4 = Pt);
        } else "select" === o5 && (i4 = Rt);
        a6 || (r4.needRuntime = n2.helper(i4));
      } else n2.onError(createDOMCompilerError(57, e4.loc));
      return r4.props = r4.props.filter((e5) => !(4 === e5.key.type && "modelValue" === e5.key.content)), r4;
    }, "model"), on: /* @__PURE__ */ __name((e4, t5, n2) => transformOn$1(e4, t5, n2, (t6) => {
      const { modifiers: r4 } = e4;
      if (!r4.length) return t6;
      let { key: o5, value: s4 } = t6.props[0];
      const { keyModifiers: i4, nonKeyModifiers: a6, eventOptionModifiers: c4 } = ((e5, t7, n3) => {
        const r5 = [], o6 = [], s5 = [];
        for (let i5 = 0; i5 < t7.length; i5++) {
          const a7 = t7[i5].content;
          "native" === a7 && checkCompatEnabled("COMPILER_V_ON_NATIVE", n3) || Ut(a7) ? s5.push(a7) : Ht(a7) ? isStaticExp(e5) ? jt(e5.content.toLowerCase()) ? r5.push(a7) : o6.push(a7) : (r5.push(a7), o6.push(a7)) : Bt(a7) ? o6.push(a7) : r5.push(a7);
        }
        return { keyModifiers: r5, nonKeyModifiers: o6, eventOptionModifiers: s5 };
      })(o5, r4, n2, e4.loc);
      if (a6.includes("right") && (o5 = transformClick(o5, "onContextmenu")), a6.includes("middle") && (o5 = transformClick(o5, "onMouseup")), a6.length && (s4 = createCallExpression(n2.helper(Lt), [s4, JSON.stringify(a6)])), !i4.length || isStaticExp(o5) && !jt(o5.content.toLowerCase()) || (s4 = createCallExpression(n2.helper(Mt), [s4, JSON.stringify(i4)])), c4.length) {
        const e5 = c4.map(f).join("");
        o5 = isStaticExp(o5) ? createSimpleExpression(`${o5.content}${e5}`, true) : createCompoundExpression(["(", o5, `) + "${e5}"`]);
      }
      return { props: [createObjectProperty(o5, s4)] };
    }), "on"), show: /* @__PURE__ */ __name((e4, t5, n2) => {
      const { exp: r4, loc: o5 } = e4;
      return r4 || n2.onError(createDOMCompilerError(61, o5)), { props: [], needRuntime: n2.helper(Dt) };
    }, "show") };
    qt = Object.freeze(Object.defineProperty({ __proto__: null, BASE_TRANSITION: ee, BindingTypes: { DATA: "data", PROPS: "props", PROPS_ALIASED: "props-aliased", SETUP_LET: "setup-let", SETUP_CONST: "setup-const", SETUP_REACTIVE_CONST: "setup-reactive-const", SETUP_MAYBE_REF: "setup-maybe-ref", SETUP_REF: "setup-ref", OPTIONS: "options", LITERAL_CONST: "literal-const" }, CAMELIZE: xe, CAPITALIZE: Ie, CREATE_BLOCK: ne, CREATE_COMMENT: ie, CREATE_ELEMENT_BLOCK: re, CREATE_ELEMENT_VNODE: se, CREATE_SLOTS: Ee, CREATE_STATIC: ce, CREATE_TEXT: ae, CREATE_VNODE: oe, CompilerDeprecationTypes: { COMPILER_IS_ON_ELEMENT: "COMPILER_IS_ON_ELEMENT", COMPILER_V_BIND_SYNC: "COMPILER_V_BIND_SYNC", COMPILER_V_BIND_OBJECT_ORDER: "COMPILER_V_BIND_OBJECT_ORDER", COMPILER_V_ON_NATIVE: "COMPILER_V_ON_NATIVE", COMPILER_V_IF_V_FOR_PRECEDENCE: "COMPILER_V_IF_V_FOR_PRECEDENCE", COMPILER_NATIVE_TEMPLATE: "COMPILER_NATIVE_TEMPLATE", COMPILER_INLINE_TEMPLATE: "COMPILER_INLINE_TEMPLATE", COMPILER_FILTERS: "COMPILER_FILTERS" }, ConstantTypes: { NOT_CONSTANT: 0, 0: "NOT_CONSTANT", CAN_SKIP_PATCH: 1, 1: "CAN_SKIP_PATCH", CAN_CACHE: 2, 2: "CAN_CACHE", CAN_STRINGIFY: 3, 3: "CAN_STRINGIFY" }, DOMDirectiveTransforms: Wt, DOMErrorCodes: { X_V_HTML_NO_EXPRESSION: 53, 53: "X_V_HTML_NO_EXPRESSION", X_V_HTML_WITH_CHILDREN: 54, 54: "X_V_HTML_WITH_CHILDREN", X_V_TEXT_NO_EXPRESSION: 55, 55: "X_V_TEXT_NO_EXPRESSION", X_V_TEXT_WITH_CHILDREN: 56, 56: "X_V_TEXT_WITH_CHILDREN", X_V_MODEL_ON_INVALID_ELEMENT: 57, 57: "X_V_MODEL_ON_INVALID_ELEMENT", X_V_MODEL_ARG_ON_ELEMENT: 58, 58: "X_V_MODEL_ARG_ON_ELEMENT", X_V_MODEL_ON_FILE_INPUT_ELEMENT: 59, 59: "X_V_MODEL_ON_FILE_INPUT_ELEMENT", X_V_MODEL_UNNECESSARY_VALUE: 60, 60: "X_V_MODEL_UNNECESSARY_VALUE", X_V_SHOW_NO_EXPRESSION: 61, 61: "X_V_SHOW_NO_EXPRESSION", X_TRANSITION_INVALID_CHILDREN: 62, 62: "X_TRANSITION_INVALID_CHILDREN", X_IGNORED_SIDE_EFFECT_TAG: 63, 63: "X_IGNORED_SIDE_EFFECT_TAG", __EXTEND_POINT__: 64, 64: "__EXTEND_POINT__" }, DOMErrorMessages: Xt, DOMNodeTransforms: $t, ElementTypes: { ELEMENT: 0, 0: "ELEMENT", COMPONENT: 1, 1: "COMPONENT", SLOT: 2, 2: "SLOT", TEMPLATE: 3, 3: "TEMPLATE" }, ErrorCodes: { ABRUPT_CLOSING_OF_EMPTY_COMMENT: 0, 0: "ABRUPT_CLOSING_OF_EMPTY_COMMENT", CDATA_IN_HTML_CONTENT: 1, 1: "CDATA_IN_HTML_CONTENT", DUPLICATE_ATTRIBUTE: 2, 2: "DUPLICATE_ATTRIBUTE", END_TAG_WITH_ATTRIBUTES: 3, 3: "END_TAG_WITH_ATTRIBUTES", END_TAG_WITH_TRAILING_SOLIDUS: 4, 4: "END_TAG_WITH_TRAILING_SOLIDUS", EOF_BEFORE_TAG_NAME: 5, 5: "EOF_BEFORE_TAG_NAME", EOF_IN_CDATA: 6, 6: "EOF_IN_CDATA", EOF_IN_COMMENT: 7, 7: "EOF_IN_COMMENT", EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT: 8, 8: "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT", EOF_IN_TAG: 9, 9: "EOF_IN_TAG", INCORRECTLY_CLOSED_COMMENT: 10, 10: "INCORRECTLY_CLOSED_COMMENT", INCORRECTLY_OPENED_COMMENT: 11, 11: "INCORRECTLY_OPENED_COMMENT", INVALID_FIRST_CHARACTER_OF_TAG_NAME: 12, 12: "INVALID_FIRST_CHARACTER_OF_TAG_NAME", MISSING_ATTRIBUTE_VALUE: 13, 13: "MISSING_ATTRIBUTE_VALUE", MISSING_END_TAG_NAME: 14, 14: "MISSING_END_TAG_NAME", MISSING_WHITESPACE_BETWEEN_ATTRIBUTES: 15, 15: "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES", NESTED_COMMENT: 16, 16: "NESTED_COMMENT", UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME: 17, 17: "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME", UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE: 18, 18: "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE", UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME: 19, 19: "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME", UNEXPECTED_NULL_CHARACTER: 20, 20: "UNEXPECTED_NULL_CHARACTER", UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME: 21, 21: "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME", UNEXPECTED_SOLIDUS_IN_TAG: 22, 22: "UNEXPECTED_SOLIDUS_IN_TAG", X_INVALID_END_TAG: 23, 23: "X_INVALID_END_TAG", X_MISSING_END_TAG: 24, 24: "X_MISSING_END_TAG", X_MISSING_INTERPOLATION_END: 25, 25: "X_MISSING_INTERPOLATION_END", X_MISSING_DIRECTIVE_NAME: 26, 26: "X_MISSING_DIRECTIVE_NAME", X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END: 27, 27: "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END", X_V_IF_NO_EXPRESSION: 28, 28: "X_V_IF_NO_EXPRESSION", X_V_IF_SAME_KEY: 29, 29: "X_V_IF_SAME_KEY", X_V_ELSE_NO_ADJACENT_IF: 30, 30: "X_V_ELSE_NO_ADJACENT_IF", X_V_FOR_NO_EXPRESSION: 31, 31: "X_V_FOR_NO_EXPRESSION", X_V_FOR_MALFORMED_EXPRESSION: 32, 32: "X_V_FOR_MALFORMED_EXPRESSION", X_V_FOR_TEMPLATE_KEY_PLACEMENT: 33, 33: "X_V_FOR_TEMPLATE_KEY_PLACEMENT", X_V_BIND_NO_EXPRESSION: 34, 34: "X_V_BIND_NO_EXPRESSION", X_V_ON_NO_EXPRESSION: 35, 35: "X_V_ON_NO_EXPRESSION", X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET: 36, 36: "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET", X_V_SLOT_MIXED_SLOT_USAGE: 37, 37: "X_V_SLOT_MIXED_SLOT_USAGE", X_V_SLOT_DUPLICATE_SLOT_NAMES: 38, 38: "X_V_SLOT_DUPLICATE_SLOT_NAMES", X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN: 39, 39: "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN", X_V_SLOT_MISPLACED: 40, 40: "X_V_SLOT_MISPLACED", X_V_MODEL_NO_EXPRESSION: 41, 41: "X_V_MODEL_NO_EXPRESSION", X_V_MODEL_MALFORMED_EXPRESSION: 42, 42: "X_V_MODEL_MALFORMED_EXPRESSION", X_V_MODEL_ON_SCOPE_VARIABLE: 43, 43: "X_V_MODEL_ON_SCOPE_VARIABLE", X_V_MODEL_ON_PROPS: 44, 44: "X_V_MODEL_ON_PROPS", X_INVALID_EXPRESSION: 45, 45: "X_INVALID_EXPRESSION", X_KEEP_ALIVE_INVALID_CHILDREN: 46, 46: "X_KEEP_ALIVE_INVALID_CHILDREN", X_PREFIX_ID_NOT_SUPPORTED: 47, 47: "X_PREFIX_ID_NOT_SUPPORTED", X_MODULE_MODE_NOT_SUPPORTED: 48, 48: "X_MODULE_MODE_NOT_SUPPORTED", X_CACHE_HANDLER_NOT_SUPPORTED: 49, 49: "X_CACHE_HANDLER_NOT_SUPPORTED", X_SCOPE_ID_NOT_SUPPORTED: 50, 50: "X_SCOPE_ID_NOT_SUPPORTED", X_VNODE_HOOKS: 51, 51: "X_VNODE_HOOKS", X_V_BIND_INVALID_SAME_NAME_ARGUMENT: 52, 52: "X_V_BIND_INVALID_SAME_NAME_ARGUMENT", __EXTEND_POINT__: 53, 53: "__EXTEND_POINT__" }, FRAGMENT: Y, GUARD_REACTIVE_PROPS: Ne, IS_MEMO_SAME: De, IS_REF: Le, KEEP_ALIVE: Z, MERGE_PROPS: _e, NORMALIZE_CLASS: Se, NORMALIZE_PROPS: ye, NORMALIZE_STYLE: Te, Namespaces: { HTML: 0, 0: "HTML", SVG: 1, 1: "SVG", MATH_ML: 2, 2: "MATH_ML" }, NodeTypes: { ROOT: 0, 0: "ROOT", ELEMENT: 1, 1: "ELEMENT", TEXT: 2, 2: "TEXT", COMMENT: 3, 3: "COMMENT", SIMPLE_EXPRESSION: 4, 4: "SIMPLE_EXPRESSION", INTERPOLATION: 5, 5: "INTERPOLATION", ATTRIBUTE: 6, 6: "ATTRIBUTE", DIRECTIVE: 7, 7: "DIRECTIVE", COMPOUND_EXPRESSION: 8, 8: "COMPOUND_EXPRESSION", IF: 9, 9: "IF", IF_BRANCH: 10, 10: "IF_BRANCH", FOR: 11, 11: "FOR", TEXT_CALL: 12, 12: "TEXT_CALL", VNODE_CALL: 13, 13: "VNODE_CALL", JS_CALL_EXPRESSION: 14, 14: "JS_CALL_EXPRESSION", JS_OBJECT_EXPRESSION: 15, 15: "JS_OBJECT_EXPRESSION", JS_PROPERTY: 16, 16: "JS_PROPERTY", JS_ARRAY_EXPRESSION: 17, 17: "JS_ARRAY_EXPRESSION", JS_FUNCTION_EXPRESSION: 18, 18: "JS_FUNCTION_EXPRESSION", JS_CONDITIONAL_EXPRESSION: 19, 19: "JS_CONDITIONAL_EXPRESSION", JS_CACHE_EXPRESSION: 20, 20: "JS_CACHE_EXPRESSION", JS_BLOCK_STATEMENT: 21, 21: "JS_BLOCK_STATEMENT", JS_TEMPLATE_LITERAL: 22, 22: "JS_TEMPLATE_LITERAL", JS_IF_STATEMENT: 23, 23: "JS_IF_STATEMENT", JS_ASSIGNMENT_EXPRESSION: 24, 24: "JS_ASSIGNMENT_EXPRESSION", JS_SEQUENCE_EXPRESSION: 25, 25: "JS_SEQUENCE_EXPRESSION", JS_RETURN_STATEMENT: 26, 26: "JS_RETURN_STATEMENT" }, OPEN_BLOCK: te, POP_SCOPE_ID: Ae, PUSH_SCOPE_ID: ve, RENDER_LIST: fe, RENDER_SLOT: me, RESOLVE_COMPONENT: le, RESOLVE_DIRECTIVE: de, RESOLVE_DYNAMIC_COMPONENT: pe, RESOLVE_FILTER: ue, SET_BLOCK_TRACKING: be, SUSPENSE: z2, TELEPORT: Q, TO_DISPLAY_STRING: ge, TO_HANDLERS: Ce, TO_HANDLER_KEY: Oe, TRANSITION: wt, TRANSITION_GROUP: kt, TS_NODE_TYPES: He, UNREF: Pe, V_MODEL_CHECKBOX: vt, V_MODEL_DYNAMIC: Pt, V_MODEL_RADIO: bt, V_MODEL_SELECT: Rt, V_MODEL_TEXT: At, V_ON_WITH_KEYS: Mt, V_ON_WITH_MODIFIERS: Lt, V_SHOW: Dt, WITH_CTX: Re, WITH_DIRECTIVES: he, WITH_MEMO: Me, advancePositionWithClone: /* @__PURE__ */ __name(function(e4, t5, n2 = t5.length) {
      return advancePositionWithMutation({ offset: e4.offset, line: e4.line, column: e4.column }, t5, n2);
    }, "advancePositionWithClone"), advancePositionWithMutation, assert: /* @__PURE__ */ __name(function(e4, t5) {
      if (!e4) throw new Error(t5 || "unexpected compiler condition");
    }, "assert"), baseCompile, baseParse, buildDirectiveArgs, buildProps, buildSlots, checkCompatEnabled, compile: /* @__PURE__ */ __name(function(e4, t5 = {}) {
      return baseCompile(e4, n({}, Ft, t5, { nodeTransforms: [ignoreSideEffectTags, ...$t, ...t5.nodeTransforms || []], directiveTransforms: n({}, Wt, t5.directiveTransforms || {}), transformHoist: null }));
    }, "compile"), convertToBlock, createArrayExpression, createAssignmentExpression: /* @__PURE__ */ __name(function(e4, t5) {
      return { type: 24, left: e4, right: t5, loc: ke };
    }, "createAssignmentExpression"), createBlockStatement, createCacheExpression, createCallExpression, createCompilerError, createCompoundExpression, createConditionalExpression, createDOMCompilerError, createForLoopParams, createFunctionExpression, createIfStatement: /* @__PURE__ */ __name(function(e4, t5, n2) {
      return { type: 23, test: e4, consequent: t5, alternate: n2, loc: ke };
    }, "createIfStatement"), createInterpolation: /* @__PURE__ */ __name(function(e4, t5) {
      return { type: 5, loc: t5, content: isString(e4) ? createSimpleExpression(e4, false, t5) : e4 };
    }, "createInterpolation"), createObjectExpression, createObjectProperty, createReturnStatement: /* @__PURE__ */ __name(function(e4) {
      return { type: 26, returns: e4, loc: ke };
    }, "createReturnStatement"), createRoot, createSequenceExpression: /* @__PURE__ */ __name(function(e4) {
      return { type: 25, expressions: e4, loc: ke };
    }, "createSequenceExpression"), createSimpleExpression, createStructuralDirectiveTransform, createTemplateLiteral: /* @__PURE__ */ __name(function(e4) {
      return { type: 22, elements: e4, loc: ke };
    }, "createTemplateLiteral"), createTransformContext, createVNodeCall, errorMessages: Be, extractIdentifiers, findDir, findProp, forAliasRE: Ze, generate, generateCodeFrame, getBaseTransformPreset, getConstantType, getMemoedVNodeCall, getVNodeBlockHelper, getVNodeHelper, hasDynamicKeyVBind, hasScopeRef: /* @__PURE__ */ __name(function hasScopeRef(e4, t5) {
      if (!e4 || 0 === Object.keys(t5).length) return false;
      switch (e4.type) {
        case 1:
          for (let n2 = 0; n2 < e4.props.length; n2++) {
            const r4 = e4.props[n2];
            if (7 === r4.type && (hasScopeRef(r4.arg, t5) || hasScopeRef(r4.exp, t5))) return true;
          }
          return e4.children.some((e5) => hasScopeRef(e5, t5));
        case 11:
          return !!hasScopeRef(e4.source, t5) || e4.children.some((e5) => hasScopeRef(e5, t5));
        case 9:
          return e4.branches.some((e5) => hasScopeRef(e5, t5));
        case 10:
          return !!hasScopeRef(e4.condition, t5) || e4.children.some((e5) => hasScopeRef(e5, t5));
        case 4:
          return !e4.isStatic && isSimpleIdentifier(e4.content) && !!t5[e4.content];
        case 8:
          return e4.children.some((e5) => isObject(e5) && hasScopeRef(e5, t5));
        case 5:
        case 12:
          return hasScopeRef(e4.content, t5);
        default:
          return false;
      }
    }, "hasScopeRef"), helperNameMap: we, injectProp, isAllWhitespace, isCommentOrWhitespace, isCoreComponent, isFnExpression: Qe, isFnExpressionBrowser, isFnExpressionNode: Ye, isFunctionType: /* @__PURE__ */ __name((e4) => /Function(?:Expression|Declaration)$|Method$/.test(e4.type), "isFunctionType"), isInDestructureAssignment: /* @__PURE__ */ __name(function(e4, t5) {
      if (e4 && ("ObjectProperty" === e4.type || "ArrayPattern" === e4.type)) {
        let e5 = t5.length;
        for (; e5--; ) {
          const n2 = t5[e5];
          if ("AssignmentExpression" === n2.type) return true;
          if ("ObjectProperty" !== n2.type && !n2.type.endsWith("Pattern")) break;
        }
      }
      return false;
    }, "isInDestructureAssignment"), isInNewExpression: /* @__PURE__ */ __name(function(e4) {
      let t5 = e4.length;
      for (; t5--; ) {
        const n2 = e4[t5];
        if ("NewExpression" === n2.type) return true;
        if ("MemberExpression" !== n2.type) break;
      }
      return false;
    }, "isInNewExpression"), isMemberExpression: Je, isMemberExpressionBrowser, isMemberExpressionNode: Ge, isReferencedIdentifier: /* @__PURE__ */ __name(function(e4, t5, n2) {
      return false;
    }, "isReferencedIdentifier"), isSimpleIdentifier, isSlotOutlet, isStaticArgOf, isStaticExp, isStaticProperty, isStaticPropertyKey: /* @__PURE__ */ __name((e4, t5) => isStaticProperty(t5) && t5.key === e4, "isStaticPropertyKey"), isTemplateNode, isText: isText$1, isVPre, isVSlot, isWhitespaceText, locStub: ke, noopDirectiveTransform, parse: /* @__PURE__ */ __name(function(e4, t5 = {}) {
      return baseParse(e4, n({}, Ft, t5));
    }, "parse"), parserOptions: Ft, processExpression, processFor, processIf, processSlotOutlet, registerRuntimeHelpers, resolveComponentType, stringifyExpression: /* @__PURE__ */ __name(function stringifyExpression(e4) {
      return isString(e4) ? e4 : 4 === e4.type ? e4.content : e4.children.map(stringifyExpression).join("");
    }, "stringifyExpression"), toValidAssetId, trackSlotScopes, trackVForSlotScopes: /* @__PURE__ */ __name((e4, t5) => {
      let n2;
      if (isTemplateNode(e4) && e4.props.some(isVSlot) && (n2 = findDir(e4, "for"))) {
        const e5 = n2.forParseResult;
        if (e5) {
          finalizeForParseResult(e5);
          const { value: n3, key: r4, index: o5 } = e5, { addIdentifiers: s4, removeIdentifiers: i4 } = t5;
          return n3 && s4(n3), r4 && s4(r4), o5 && s4(o5), () => {
            n3 && i4(n3), r4 && i4(r4), o5 && i4(o5);
          };
        }
      }
    }, "trackVForSlotScopes"), transform, transformBind, transformElement, transformExpression: /* @__PURE__ */ __name((e4, t5) => {
      if (5 === e4.type) e4.content = processExpression(e4.content, t5);
      else if (1 === e4.type) {
        const n2 = findDir(e4, "memo");
        for (let r4 = 0; r4 < e4.props.length; r4++) {
          const o5 = e4.props[r4];
          if (7 === o5.type && "for" !== o5.name) {
            const e5 = o5.exp, r5 = o5.arg;
            !e5 || 4 !== e5.type || "on" === o5.name && r5 || n2 && r5 && 4 === r5.type && "key" === r5.content || (o5.exp = processExpression(e5, t5, "slot" === o5.name)), r5 && 4 === r5.type && !r5.isStatic && (o5.arg = processExpression(r5, t5));
          }
        }
      }
    }, "transformExpression"), transformModel: transformModel$1, transformOn: transformOn$1, transformStyle, transformVBindShorthand, traverseNode, unwrapTSNode: /* @__PURE__ */ __name(function unwrapTSNode(e4) {
      return He.includes(e4.type) ? unwrapTSNode(e4.expression) : e4;
    }, "unwrapTSNode"), validFirstIdentCharRE: $e, walkBlockDeclarations, walkFunctionParams: /* @__PURE__ */ __name(function(e4, t5) {
      for (const n2 of e4.params) for (const e5 of extractIdentifiers(n2)) t5(e5);
    }, "walkFunctionParams"), walkIdentifiers: /* @__PURE__ */ __name(function(e4, t5, n2 = false, r4 = [], o5 = /* @__PURE__ */ Object.create(null)) {
    }, "walkIdentifiers"), warnDeprecation: /* @__PURE__ */ __name(function(e4, t5, n2, ...r4) {
      if ("suppress-warning" === getCompatValue(e4, t5)) return;
      const { message: o5, link: s4 } = Ue[e4], i4 = `(deprecation ${e4}) ${"function" == typeof o5 ? o5(...r4) : o5}${s4 ? `
  Details: ${s4}` : ""}`, a6 = new SyntaxError(i4);
      a6.code = e4, n2 && (a6.loc = n2), t5.onWarn(a6);
    }, "warnDeprecation") }, Symbol.toStringTag, { value: "Module" }));
    !(function(e4) {
      Object.defineProperty(e4, "__esModule", { value: true });
      var t5 = qt, n2 = hr, r4 = j;
      function _interopNamespaceDefault(e5) {
        var t6 = /* @__PURE__ */ Object.create(null);
        if (e5) for (var n3 in e5) t6[n3] = e5[n3];
        return t6.default = e5, Object.freeze(t6);
      }
      __name(_interopNamespaceDefault, "_interopNamespaceDefault");
      var o5 = _interopNamespaceDefault(n2);
      const s4 = /* @__PURE__ */ Object.create(null);
      function compileToFunction(e5, n3) {
        if (!r4.isString(e5)) {
          if (!e5.nodeType) return r4.NOOP;
          e5 = e5.innerHTML;
        }
        const i4 = r4.genCacheKey(e5, n3), a6 = s4[i4];
        if (a6) return a6;
        if ("#" === e5[0]) {
          const t6 = document.querySelector(e5);
          e5 = t6 ? t6.innerHTML : "";
        }
        const c4 = r4.extend({ hoistStatic: true, onError: void 0, onWarn: r4.NOOP }, n3);
        c4.isCustomElement || "undefined" == typeof customElements || (c4.isCustomElement = (e6) => !!customElements.get(e6));
        const { code: l3 } = t5.compile(e5, c4), p3 = new Function("Vue", l3)(o5);
        return p3._rc = true, s4[i4] = p3;
      }
      __name(compileToFunction, "compileToFunction");
      n2.registerRuntimeCompiler(compileToFunction), e4.compile = compileToFunction, Object.keys(n2).forEach(function(t6) {
        "default" === t6 || Object.prototype.hasOwnProperty.call(e4, t6) || (e4[t6] = n2[t6]);
      });
    })(K), J.exports = K;
    Gt = J.exports;
    Jt = { Agent };
    Kt = globalThis.Headers;
    Yt = globalThis.AbortController;
    Qt = globalThis.fetch || (() => {
      throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!");
    });
    zt = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
    Zt = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    en = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
    __name(jsonParseTransform, "jsonParseTransform");
    __name(destr, "destr");
    tn = /#/g;
    nn = /&/g;
    rn = /\//g;
    on2 = /=/g;
    sn = /\+/g;
    an = /%5e/gi;
    cn = /%60/gi;
    ln = /%7c/gi;
    pn = /%20/gi;
    __name(encodeQueryValue, "encodeQueryValue");
    __name(encodeQueryKey, "encodeQueryKey");
    __name(decode, "decode");
    __name(decodeQueryKey, "decodeQueryKey");
    __name(decodeQueryValue, "decodeQueryValue");
    __name(parseQuery2, "parseQuery");
    __name(stringifyQuery2, "stringifyQuery");
    dn = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
    un = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
    hn = /^([/\\]\s*){2,}[^/\\]/;
    mn = /^\.?\//;
    __name(hasProtocol2, "hasProtocol");
    __name(withTrailingSlash2, "withTrailingSlash");
    __name(withBase, "withBase");
    __name(withQuery2, "withQuery");
    En = Symbol.for("ufo:protocolRelative");
    __name(parsePath, "parsePath");
    FetchError = class extends Error {
      static {
        __name(this, "FetchError");
      }
      constructor(e4, t5) {
        super(e4, t5), this.name = "FetchError", t5?.cause && !this.cause && (this.cause = t5.cause);
      }
    };
    gn = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
    __name(isPayloadMethod, "isPayloadMethod");
    _n = /* @__PURE__ */ new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]);
    Sn = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
    __name(resolveFetchOptions, "resolveFetchOptions");
    __name(callHooks, "callHooks");
    Tn = /* @__PURE__ */ new Set([408, 409, 425, 429, 500, 502, 503, 504]);
    yn = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    Nn = (/* @__PURE__ */ __name(function createFetch(e4 = {}) {
      const { fetch: t5 = globalThis.fetch, Headers: n2 = globalThis.Headers, AbortController: r4 = globalThis.AbortController } = e4;
      async function onError(e5) {
        const t6 = e5.error && "AbortError" === e5.error.name && !e5.options.timeout || false;
        if (false !== e5.options.retry && !t6) {
          let t7;
          t7 = "number" == typeof e5.options.retry ? e5.options.retry : isPayloadMethod(e5.options.method) ? 0 : 1;
          const n4 = e5.response && e5.response.status || 500;
          if (t7 > 0 && (Array.isArray(e5.options.retryStatusCodes) ? e5.options.retryStatusCodes.includes(n4) : Tn.has(n4))) {
            const n5 = "function" == typeof e5.options.retryDelay ? e5.options.retryDelay(e5) : e5.options.retryDelay || 0;
            return n5 > 0 && await new Promise((e6) => setTimeout(e6, n5)), $fetchRaw(e5.request, { ...e5.options, retry: t7 - 1 });
          }
        }
        const n3 = (function(e6) {
          const t7 = e6.error?.message || e6.error?.toString() || "", n4 = e6.request?.method || e6.options?.method || "GET", r5 = e6.request?.url || String(e6.request) || "/", o5 = `[${n4}] ${JSON.stringify(r5)}`, s4 = e6.response ? `${e6.response.status} ${e6.response.statusText}` : "<no response>", i4 = new FetchError(`${o5}: ${s4}${t7 ? ` ${t7}` : ""}`, e6.error ? { cause: e6.error } : void 0);
          for (const t8 of ["request", "options", "response"]) Object.defineProperty(i4, t8, { get: /* @__PURE__ */ __name(() => e6[t8], "get") });
          for (const [t8, n5] of [["data", "_data"], ["status", "status"], ["statusCode", "status"], ["statusText", "statusText"], ["statusMessage", "statusText"]]) Object.defineProperty(i4, t8, { get: /* @__PURE__ */ __name(() => e6.response && e6.response[n5], "get") });
          return i4;
        })(e5);
        throw Error.captureStackTrace && Error.captureStackTrace(n3, $fetchRaw), n3;
      }
      __name(onError, "onError");
      const $fetchRaw = /* @__PURE__ */ __name(async function(o5, s4 = {}) {
        const i4 = { request: o5, options: resolveFetchOptions(o5, s4, e4.defaults, n2), response: void 0, error: void 0 };
        let a6;
        if (i4.options.method && (i4.options.method = i4.options.method.toUpperCase()), i4.options.onRequest && await callHooks(i4, i4.options.onRequest), "string" == typeof i4.request && (i4.options.baseURL && (i4.request = withBase(i4.request, i4.options.baseURL)), i4.options.query && (i4.request = withQuery2(i4.request, i4.options.query), delete i4.options.query), "query" in i4.options && delete i4.options.query, "params" in i4.options && delete i4.options.params), i4.options.body && isPayloadMethod(i4.options.method) && (!(function(e5) {
          if (void 0 === e5) return false;
          const t6 = typeof e5;
          return "string" === t6 || "number" === t6 || "boolean" === t6 || null === t6 || "object" === t6 && (!!Array.isArray(e5) || !e5.buffer && (e5.constructor && "Object" === e5.constructor.name || "function" == typeof e5.toJSON));
        })(i4.options.body) ? ("pipeTo" in i4.options.body && "function" == typeof i4.options.body.pipeTo || "function" == typeof i4.options.body.pipe) && ("duplex" in i4.options || (i4.options.duplex = "half")) : (i4.options.body = "string" == typeof i4.options.body ? i4.options.body : JSON.stringify(i4.options.body), i4.options.headers = new n2(i4.options.headers || {}), i4.options.headers.has("content-type") || i4.options.headers.set("content-type", "application/json"), i4.options.headers.has("accept") || i4.options.headers.set("accept", "application/json"))), !i4.options.signal && i4.options.timeout) {
          const e5 = new r4();
          a6 = setTimeout(() => {
            const t6 = new Error("[TimeoutError]: The operation was aborted due to timeout");
            t6.name = "TimeoutError", t6.code = 23, e5.abort(t6);
          }, i4.options.timeout), i4.options.signal = e5.signal;
        }
        try {
          i4.response = await t5(i4.request, i4.options);
        } catch (e5) {
          return i4.error = e5, i4.options.onRequestError && await callHooks(i4, i4.options.onRequestError), await onError(i4);
        } finally {
          a6 && clearTimeout(a6);
        }
        if ((i4.response.body || i4.response._bodyInit) && !yn.has(i4.response.status) && "HEAD" !== i4.options.method) {
          const e5 = (i4.options.parseResponse ? "json" : i4.options.responseType) || (function(e6 = "") {
            if (!e6) return "json";
            const t6 = e6.split(";").shift() || "";
            return Sn.test(t6) ? "json" : _n.has(t6) || t6.startsWith("text/") ? "text" : "blob";
          })(i4.response.headers.get("content-type") || "");
          switch (e5) {
            case "json": {
              const e6 = await i4.response.text(), t6 = i4.options.parseResponse || destr;
              i4.response._data = t6(e6);
              break;
            }
            case "stream":
              i4.response._data = i4.response.body || i4.response._bodyInit;
              break;
            default:
              i4.response._data = await i4.response[e5]();
          }
        }
        return i4.options.onResponse && await callHooks(i4, i4.options.onResponse), !i4.options.ignoreResponseError && i4.response.status >= 400 && i4.response.status < 600 ? (i4.options.onResponseError && await callHooks(i4, i4.options.onResponseError), await onError(i4)) : i4.response;
      }, "$fetchRaw"), $fetch = /* @__PURE__ */ __name(async function(e5, t6) {
        return (await $fetchRaw(e5, t6))._data;
      }, "$fetch");
      return $fetch.raw = $fetchRaw, $fetch.native = (...e5) => t5(...e5), $fetch.create = (t6 = {}, n3 = {}) => createFetch({ ...e4, ...n3, defaults: { ...e4.defaults, ...n3.defaults, ...t6 } }), $fetch;
    }, "createFetch"))({ fetch: globalThis.fetch ? (...e4) => globalThis.fetch(...e4) : (function() {
      if (!JSON.parse(D2.env.FETCH_KEEP_ALIVE || "false")) return Qt;
      const e4 = { keepAlive: true }, r4 = new Cn.Agent(e4), o5 = new Jt.Agent(e4), s4 = { agent: /* @__PURE__ */ __name((e5) => "http:" === e5.protocol ? r4 : o5, "agent") };
      return function(e5, t5) {
        return Qt(e5, { ...s4, ...t5 });
      };
    })(), Headers: globalThis.Headers || Kt, AbortController: globalThis.AbortController || Yt });
    Cn2 = Nn;
    globalThis.$fetch || (globalThis.$fetch = Cn2.create({ baseURL: baseURL() })), "global" in globalThis || (globalThis.global = globalThis);
    xn = { componentName: "NuxtLink" };
    In = "nuxt-app";
    __name(getNuxtAppCtx, "getNuxtAppCtx");
    On = "__nuxt_plugin";
    __name(registerPluginHooks, "registerPluginHooks");
    __name(defineNuxtPlugin, "defineNuxtPlugin");
    __name(callWithNuxt, "callWithNuxt");
    __name(useNuxtApp, "useNuxtApp");
    __name(useRuntimeConfig, "useRuntimeConfig");
    __name(defineGetter, "defineGetter");
    bn = Symbol("route");
    globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
    useRouter = /* @__PURE__ */ __name(() => useNuxtApp()?.$router, "useRouter");
    __name(defineNuxtRouteMiddleware, "defineNuxtRouteMiddleware");
    vn = /"/g;
    navigateTo = /* @__PURE__ */ __name((e4, t5) => {
      e4 ||= "/";
      const n2 = "string" == typeof e4 ? e4 : "path" in e4 ? resolveRouteObject(e4) : useRouter().resolve(e4).href, i4 = hasProtocol(n2, { acceptRelative: true }), c4 = t5?.external || i4;
      if (c4) {
        if (!t5?.external) throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
        const { protocol: e5 } = new URL(n2, "http://localhost");
        if (e5 && isScriptProtocol(e5)) throw new Error(`Cannot navigate to a URL with '${e5}' protocol.`);
      }
      const l3 = (() => {
        try {
          if (useNuxtApp()._processingMiddleware) return true;
        } catch {
          return false;
        }
        return false;
      })(), p3 = useRouter(), d3 = useNuxtApp();
      if (d3.ssrContext) {
        const r4 = "string" == typeof e4 || c4 ? n2 : p3.resolve(e4).fullPath || "/", o5 = c4 ? n2 : joinURL(useRuntimeConfig().app.baseURL, r4), redirect = /* @__PURE__ */ __name(async function(e5) {
          await d3.callHook("app:redirected");
          const n3 = o5.replace(vn, "%22"), r5 = (function(e6, t6 = false) {
            const n4 = new URL(e6, "http://localhost");
            if (!t6) return n4.pathname + n4.search + n4.hash;
            if (e6.startsWith("//")) return n4.toString().replace(n4.protocol, "");
            return n4.toString();
          })(o5, i4);
          return d3.ssrContext._renderResponse = { statusCode: sanitizeStatusCode(t5?.redirectCode || 302, 302), body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${n3}"></head></html>`, headers: { location: r5 } }, e5;
        }, "redirect");
        return !c4 && l3 ? (p3.afterEach((e5) => e5.fullPath === r4 ? redirect(false) : void 0), e4) : redirect(!l3 && void 0);
      }
      return c4 ? (d3._scope.stop(), t5?.replace ? (void 0).replace(n2) : (void 0).href = n2, l3 ? !!d3.isHydrating && new Promise(() => {
      }) : Promise.resolve()) : t5?.replace ? p3.replace(e4) : p3.push(e4);
    }, "navigateTo");
    __name(resolveRouteObject, "resolveRouteObject");
    An = "__nuxt_error";
    useError = /* @__PURE__ */ __name(() => Gt.toRef(useNuxtApp().payload, "error"), "useError");
    showError = /* @__PURE__ */ __name((e4) => {
      const t5 = createError2(e4);
      try {
        const e5 = useError();
        0, e5.value ||= t5;
      } catch {
        throw t5;
      }
      return t5;
    }, "showError");
    createError2 = /* @__PURE__ */ __name((e4) => {
      const t5 = createError(e4);
      return Object.defineProperty(t5, An, { value: true, configurable: false, writable: false }), t5;
    }, "createError");
    Rn = defineNuxtPlugin({ name: "nuxt:head", enforce: "pre", setup(e4) {
      const t5 = e4.ssrContext.head;
      e4.vueApp.use(t5);
    } });
    Pn = [defineNuxtRouteMiddleware(async (e4) => {
    })];
    __name(getRouteFromPath, "getRouteFromPath");
    __name(definePayloadReducer, "definePayloadReducer");
    Ln = [["NuxtError", (e4) => {
      return !!(t5 = e4) && "object" == typeof t5 && An in t5 && e4.toJSON();
      var t5;
    }], ["EmptyShallowRef", (e4) => Gt.isRef(e4) && Gt.isShallow(e4) && !e4.value && ("bigint" == typeof e4.value ? "0n" : JSON.stringify(e4.value) || "_")], ["EmptyRef", (e4) => Gt.isRef(e4) && !e4.value && ("bigint" == typeof e4.value ? "0n" : JSON.stringify(e4.value) || "_")], ["ShallowRef", (e4) => Gt.isRef(e4) && Gt.isShallow(e4) && e4.value], ["ShallowReactive", (e4) => Gt.isReactive(e4) && Gt.isShallow(e4) && Gt.toRaw(e4)], ["Ref", (e4) => Gt.isRef(e4) && e4.value], ["Reactive", (e4) => Gt.isReactive(e4) && Gt.toRaw(e4)]];
    Mn = [Rn, defineNuxtPlugin({ name: "nuxt:router", enforce: "pre", setup(e4) {
      const t5 = e4.ssrContext.url, n2 = [], r4 = { "navigate:before": [], "resolve:before": [], "navigate:after": [], error: [] }, registerHook = /* @__PURE__ */ __name((e5, t6) => (r4[e5].push(t6), () => r4[e5].splice(r4[e5].indexOf(t6), 1)), "registerHook");
      useRuntimeConfig().app.baseURL;
      const o5 = Gt.reactive(getRouteFromPath(t5));
      async function handleNavigation(e5, t6) {
        try {
          const t7 = getRouteFromPath(e5);
          for (const e6 of r4["navigate:before"]) {
            const n3 = await e6(t7, o5);
            if (false === n3 || n3 instanceof Error) return;
            if ("string" == typeof n3 && n3.length) return handleNavigation(n3, true);
          }
          for (const e6 of r4["resolve:before"]) await e6(t7, o5);
          Object.assign(o5, t7);
          for (const e6 of r4["navigate:after"]) await e6(t7, o5);
        } catch (e6) {
          for (const t7 of r4.error) await t7(e6);
        }
      }
      __name(handleNavigation, "handleNavigation");
      const s4 = { currentRoute: Gt.computed(() => o5), isReady: /* @__PURE__ */ __name(() => Promise.resolve(), "isReady"), options: {}, install: /* @__PURE__ */ __name(() => Promise.resolve(), "install"), push: /* @__PURE__ */ __name((e5) => handleNavigation(e5), "push"), replace: /* @__PURE__ */ __name((e5) => handleNavigation(e5), "replace"), back: /* @__PURE__ */ __name(() => (void 0).history.go(-1), "back"), go: /* @__PURE__ */ __name((e5) => (void 0).history.go(e5), "go"), forward: /* @__PURE__ */ __name(() => (void 0).history.go(1), "forward"), beforeResolve: /* @__PURE__ */ __name((e5) => registerHook("resolve:before", e5), "beforeResolve"), beforeEach: /* @__PURE__ */ __name((e5) => registerHook("navigate:before", e5), "beforeEach"), afterEach: /* @__PURE__ */ __name((e5) => registerHook("navigate:after", e5), "afterEach"), onError: /* @__PURE__ */ __name((e5) => registerHook("error", e5), "onError"), resolve: getRouteFromPath, addRoute: /* @__PURE__ */ __name((e5, t6) => {
        n2.push(t6);
      }, "addRoute"), getRoutes: /* @__PURE__ */ __name(() => n2, "getRoutes"), hasRoute: /* @__PURE__ */ __name((e5) => n2.some((t6) => t6.name === e5), "hasRoute"), removeRoute: /* @__PURE__ */ __name((e5) => {
        const t6 = n2.findIndex((t7) => t7.name === e5);
        -1 !== t6 && n2.splice(t6, 1);
      }, "removeRoute") };
      e4.vueApp.component("RouterLink", Gt.defineComponent({ functional: true, props: { to: { type: String, required: true }, custom: Boolean, replace: Boolean, activeClass: String, exactActiveClass: String, ariaCurrentValue: String }, setup: /* @__PURE__ */ __name((e5, { slots: t6 }) => {
        const navigate = /* @__PURE__ */ __name(() => handleNavigation(e5.to, e5.replace), "navigate");
        return () => {
          const n3 = s4.resolve(e5.to);
          return e5.custom ? t6.default?.({ href: e5.to, navigate, route: n3 }) : Gt.h("a", { href: e5.to, onClick: /* @__PURE__ */ __name((e6) => (e6.preventDefault(), navigate()), "onClick") }, t6);
        };
      }, "setup") })), e4._route = o5, e4._middleware ||= { global: [], named: {} };
      const i4 = e4.payload.state._layout;
      return e4.hooks.hookOnce("app:created", async () => {
        s4.beforeEach(async (n3, r5) => {
          if (n3.meta = Gt.reactive(n3.meta || {}), e4.isHydrating && i4 && !Gt.isReadonly(n3.meta.layout) && (n3.meta.layout = i4), e4._processingMiddleware = true, !e4.ssrContext?.islandContext) {
            const o6 = /* @__PURE__ */ new Set([...Pn, ...e4._middleware.global]);
            {
              const t6 = await e4.runWithContext(() => (async function(e5) {
                const t7 = "string" == typeof e5 ? e5 : e5.path;
                {
                  useNuxtApp().ssrContext._preloadManifest = true;
                  const e6 = toRouteMatcher(createRouter$1({ routes: useRuntimeConfig().nitro.routeRules }));
                  return defu({}, ...e6.matchAll(t7).reverse());
                }
              })({ path: n3.path }));
              if (t6.appMiddleware) for (const n4 in t6.appMiddleware) {
                const r6 = e4._middleware.named[n4];
                if (!r6) return;
                t6.appMiddleware[n4] ? o6.add(r6) : o6.delete(r6);
              }
            }
            for (const s5 of o6) {
              const o7 = await e4.runWithContext(() => s5(n3, r5));
              if (false === o7 || o7 instanceof Error) {
                const n4 = o7 || createError({ statusCode: 404, statusMessage: `Page Not Found: ${t5}`, data: { path: t5 } });
                return delete e4._processingMiddleware, e4.runWithContext(() => showError(n4));
              }
              if (true !== o7 && (o7 || false === o7)) return o7;
            }
          }
        }), s4.afterEach(() => {
          delete e4._processingMiddleware;
        }), await s4.replace(t5), isEqual(o5.fullPath, t5) || await e4.runWithContext(() => navigateTo(o5.fullPath));
      }), { provide: { route: o5, router: s4 } };
    } }), defineNuxtPlugin({ name: "nuxt:revive-payload:server", setup() {
      for (const [e4, t5] of Ln) definePayloadReducer(e4, t5);
    } }), defineNuxtPlugin({ name: "nuxt:global-components" })];
    Dn = Gt.defineComponent({ __name: "app", __ssrInlineRender: true, setup(e4) {
      const t5 = Gt.ref(0);
      return (e5, n2, r4, o5) => {
        n2(`<div${ssrRenderAttrs(Gt.mergeProps({ style: { "font-family": "sans-serif", padding: "2rem", "text-align": "center" } }, o5))}><h1>NuxtHub Realtime Issue #722</h1><p style="${ssrRenderStyle({ "font-size": "3rem" })}">${ssrInterpolate(Gt.unref(t5))} visitor(s) online</p><p>Open multiple tabs to test</p></div>`);
      };
    } });
    wn = Dn.setup;
    Dn.setup = (e4, t5) => {
      const n2 = Gt.useSSRContext();
      return (n2.modules || (n2.modules = /* @__PURE__ */ new Set())).add("app.vue"), wn ? wn(e4, t5) : void 0;
    };
    kn = { __name: "nuxt-error-page", __ssrInlineRender: true, props: { error: Object }, setup(e4) {
      const t5 = e4.error, n2 = Number(t5.statusCode || 500), r4 = 404 === n2, o5 = t5.statusMessage ?? (r4 ? "Page Not Found" : "Internal Server Error"), s4 = t5.message || t5.toString(), i4 = Gt.defineAsyncComponent(() => Promise.resolve().then(() => (init_error_404_W597av7l(), error_404_W597av7l_exports))), a6 = Gt.defineAsyncComponent(() => Promise.resolve().then(() => (init_error_500_Clap_Dgb(), error_500_Clap_Dgb_exports))), c4 = r4 ? i4 : a6;
      return (e5, t6, r5, i5) => {
        t6(ssrRenderComponent(Gt.unref(c4), Gt.mergeProps({ statusCode: Gt.unref(n2), statusMessage: Gt.unref(o5), description: Gt.unref(s4), stack: Gt.unref(void 0) }, i5), null, r5));
      };
    } };
    Vn = kn.setup;
    kn.setup = (e4, t5) => {
      const n2 = Gt.useSSRContext();
      return (n2.modules || (n2.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/nuxt-error-page.vue"), Vn ? Vn(e4, t5) : void 0;
    };
    Fn = { __name: "nuxt-root", __ssrInlineRender: true, setup(e4) {
      const IslandRenderer = /* @__PURE__ */ __name(() => null, "IslandRenderer"), t5 = useNuxtApp();
      t5.deferHydration(), t5.ssrContext.url;
      const n2 = false;
      Gt.provide(bn, Gt.hasInjectionContext() ? Gt.inject(bn, useNuxtApp()._route) : useNuxtApp()._route), t5.hooks.callHookWith((e5) => e5.map((e6) => e6()), "vue:setup");
      const r4 = useError(), o5 = r4.value && !t5.ssrContext.error;
      Gt.onErrorCaptured((e5, n3, r5) => {
        t5.hooks.callHook("vue:error", e5, n3, r5).catch((e6) => console.error("[nuxt] Error in `vue:error` hook", e6));
        {
          const n4 = t5.runWithContext(() => showError(e5));
          return Gt.onServerPrefetch(() => n4), false;
        }
      });
      const s4 = t5.ssrContext.islandContext;
      return (e5, t6, i4, a6) => {
        ssrRenderSuspense(t6, { default: /* @__PURE__ */ __name(() => {
          Gt.unref(o5) ? t6("<div></div>") : Gt.unref(r4) ? t6(ssrRenderComponent(Gt.unref(kn), { error: Gt.unref(r4) }, null, i4)) : Gt.unref(s4) ? t6(ssrRenderComponent(Gt.unref(IslandRenderer), { context: Gt.unref(s4) }, null, i4)) : Gt.unref(n2) ? renderVNode(t6, Gt.createVNode(Gt.resolveDynamicComponent(Gt.unref(n2)), null, null), i4) : t6(ssrRenderComponent(Gt.unref(Dn), null, null, i4));
        }, "default") });
      };
    } };
    Xn = Fn.setup;
    Fn.setup = (e4, t5) => {
      const n2 = Gt.useSSRContext();
      return (n2.modules || (n2.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/nuxt-root.vue"), Xn ? Xn(e4, t5) : void 0;
    }, Un = /* @__PURE__ */ __name(async function(e4) {
      const t5 = Gt.createApp(Fn), n2 = (function(e5) {
        let t6 = 0;
        const n3 = { _id: e5.id || In || "nuxt-app", _scope: Gt.effectScope(), provide: void 0, versions: { get nuxt() {
          return "4.2.2";
        }, get vue() {
          return n3.vueApp.version;
        } }, payload: Gt.shallowReactive({ ...e5.ssrContext?.payload || {}, data: Gt.shallowReactive({}), state: Gt.reactive({}), once: /* @__PURE__ */ new Set(), _errors: Gt.shallowReactive({}) }), static: { data: {} }, runWithContext: /* @__PURE__ */ __name((e6) => n3._scope.active && !Gt.getCurrentScope() ? n3._scope.run(() => callWithNuxt(n3, e6)) : callWithNuxt(n3, e6), "runWithContext"), isHydrating: false, deferHydration() {
          if (!n3.isHydrating) return () => {
          };
          t6++;
          let e6 = false;
          return () => {
            if (!e6) return e6 = true, t6--, 0 === t6 ? (n3.isHydrating = false, n3.callHook("app:suspense:resolve")) : void 0;
          };
        }, _asyncDataPromises: {}, _asyncData: Gt.shallowReactive({}), _payloadRevivers: {}, ...e5 };
        n3.payload.serverRendered = true, n3.ssrContext && (n3.payload.path = n3.ssrContext.url, n3.ssrContext.nuxt = n3, n3.ssrContext.payload = n3.payload, n3.ssrContext.config = { public: n3.ssrContext.runtimeConfig.public, app: n3.ssrContext.runtimeConfig.app }), n3.hooks = createHooks(), n3.hook = n3.hooks.hook;
        {
          const contextCaller = /* @__PURE__ */ __name(async function(e6, t7) {
            for (const r5 of e6) await n3.runWithContext(() => r5(...t7));
          }, "contextCaller");
          n3.hooks.callHook = (e6, ...t7) => n3.hooks.callHookWith(contextCaller, e6, ...t7);
        }
        n3.callHook = n3.hooks.callHook, n3.provide = (e6, t7) => {
          const r5 = "$" + e6;
          defineGetter(n3, r5, t7), defineGetter(n3.vueApp.config.globalProperties, r5, t7);
        }, defineGetter(n3.vueApp, "$nuxt", n3), defineGetter(n3.vueApp.config.globalProperties, "$nuxt", n3);
        const r4 = e5.ssrContext.runtimeConfig;
        return n3.provide("config", r4), n3;
      })({ vueApp: t5, ssrContext: e4 });
      try {
        await (async function(e5, t6) {
          const n3 = /* @__PURE__ */ new Set(), r4 = [], o5 = [];
          let s4, i4 = 0;
          async function executePlugin(a6) {
            const c4 = a6.dependsOn?.filter((e6) => t6.some((t7) => t7._name === e6) && !n3.has(e6)) ?? [];
            if (c4.length > 0) r4.push([new Set(c4), a6]);
            else {
              const t7 = (async function(e6, t8) {
                if ("function" == typeof t8) {
                  const { provide: n4 } = await e6.runWithContext(() => t8(e6)) || {};
                  if (n4 && "object" == typeof n4) for (const t9 in n4) e6.provide(t9, n4[t9]);
                }
              })(e5, a6).then(async () => {
                a6._name && (n3.add(a6._name), await Promise.all(r4.map(async ([e6, t8]) => {
                  e6.has(a6._name) && (e6.delete(a6._name), 0 === e6.size && (i4++, await executePlugin(t8)));
                })));
              }).catch((t8) => {
                if (!a6.parallel && !e5.payload.error) throw t8;
                s4 ||= t8;
              });
              a6.parallel ? o5.push(t7) : await t7;
            }
          }
          __name(executePlugin, "executePlugin");
          for (const n4 of t6) e5.ssrContext?.islandContext && false === n4.env?.islands || registerPluginHooks(e5, n4);
          for (const n4 of t6) e5.ssrContext?.islandContext && false === n4.env?.islands || await executePlugin(n4);
          if (await Promise.all(o5), i4) for (let e6 = 0; e6 < i4; e6++) await Promise.all(o5);
          if (s4) throw e5.payload.error || s4;
        })(n2, Mn), await n2.hooks.callHook("app:created", t5);
      } catch (e5) {
        await n2.hooks.callHook("app:error", e5), n2.payload.error ||= createError2(e5);
      }
      if (e4?._renderResponse) throw new Error("skipping render");
      return t5;
    }, "Un");
    Bn = Object.freeze(Object.defineProperty({ __proto__: null, a: useNuxtApp, b: useRuntimeConfig, c: xn, default: /* @__PURE__ */ __name((e4) => Un(e4), "default"), n: navigateTo, r: resolveRouteObject, u: useRouter }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .output/server/chunks/virtual/_virtual_spa-template.mjs
var virtual_spa_template_exports = {};
__export(virtual_spa_template_exports, {
  template: () => o3
});
var o3;
var init_virtual_spa_template = __esm({
  ".output/server/chunks/virtual/_virtual_spa-template.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    o3 = "";
  }
});

// .output/server/chunks/build/error-500-styles.DFgWFBqi.mjs
var error_500_styles_DFgWFBqi_exports = {};
__export(error_500_styles_DFgWFBqi_exports, {
  default: () => a3
});
var a3;
var init_error_500_styles_DFgWFBqi = __esm({
  ".output/server/chunks/build/error-500-styles.DFgWFBqi.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    a3 = [".grid[data-v-5a7877e7]{display:grid}.mb-2[data-v-5a7877e7]{margin-bottom:.5rem}.mb-4[data-v-5a7877e7]{margin-bottom:1rem}.max-w-520px[data-v-5a7877e7]{max-width:520px}.min-h-screen[data-v-5a7877e7]{min-height:100vh}.place-content-center[data-v-5a7877e7]{place-content:center}.overflow-hidden[data-v-5a7877e7]{overflow:hidden}.bg-white[data-v-5a7877e7]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2[data-v-5a7877e7]{padding-left:.5rem;padding-right:.5rem}.text-center[data-v-5a7877e7]{text-align:center}.text-\\[80px\\][data-v-5a7877e7]{font-size:80px}.text-2xl[data-v-5a7877e7]{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\][data-v-5a7877e7]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\][data-v-5a7877e7]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold[data-v-5a7877e7]{font-weight:600}.leading-none[data-v-5a7877e7]{line-height:1}.tracking-wide[data-v-5a7877e7]{letter-spacing:.025em}.font-sans[data-v-5a7877e7]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums[data-v-5a7877e7]{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased[data-v-5a7877e7]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\][data-v-5a7877e7]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white[data-v-5a7877e7]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\][data-v-5a7877e7]{font-size:110px}.sm\\:text-3xl[data-v-5a7877e7]{font-size:1.875rem;line-height:2.25rem}}"];
  }
});

// .output/server/chunks/build/error-404-styles.CBdZWZAA.mjs
var error_404_styles_CBdZWZAA_exports = {};
__export(error_404_styles_CBdZWZAA_exports, {
  default: () => a4
});
var a4;
var init_error_404_styles_CBdZWZAA = __esm({
  ".output/server/chunks/build/error-404-styles.CBdZWZAA.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    a4 = [".grid[data-v-69929ac6]{display:grid}.mb-2[data-v-69929ac6]{margin-bottom:.5rem}.mb-4[data-v-69929ac6]{margin-bottom:1rem}.max-w-520px[data-v-69929ac6]{max-width:520px}.min-h-screen[data-v-69929ac6]{min-height:100vh}.w-full[data-v-69929ac6]{width:100%}.flex[data-v-69929ac6]{display:flex}.place-content-center[data-v-69929ac6]{place-content:center}.items-center[data-v-69929ac6]{align-items:center}.justify-center[data-v-69929ac6]{justify-content:center}.overflow-hidden[data-v-69929ac6]{overflow:hidden}.bg-white[data-v-69929ac6]{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2[data-v-69929ac6]{padding-left:.5rem;padding-right:.5rem}.text-center[data-v-69929ac6]{text-align:center}.text-\\[80px\\][data-v-69929ac6]{font-size:80px}.text-2xl[data-v-69929ac6]{font-size:1.5rem;line-height:2rem}.text-sm[data-v-69929ac6]{font-size:.875rem;line-height:1.25rem}.text-\\[\\#020420\\][data-v-69929ac6]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\][data-v-69929ac6]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.hover\\:text-\\[\\#00DC82\\][data-v-69929ac6]:hover{--un-text-opacity:1;color:rgb(0 220 130/var(--un-text-opacity))}.font-medium[data-v-69929ac6]{font-weight:500}.font-semibold[data-v-69929ac6]{font-weight:600}.leading-none[data-v-69929ac6]{line-height:1}.tracking-wide[data-v-69929ac6]{letter-spacing:.025em}.font-sans[data-v-69929ac6]{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums[data-v-69929ac6]{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.underline[data-v-69929ac6]{text-decoration-line:underline}.underline-offset-3[data-v-69929ac6]{text-underline-offset:3px}.antialiased[data-v-69929ac6]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\][data-v-69929ac6]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white[data-v-69929ac6]{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\][data-v-69929ac6]{font-size:110px}.sm\\:text-3xl[data-v-69929ac6]{font-size:1.875rem;line-height:2.25rem}}"];
  }
});

// .output/server/chunks/build/styles.mjs
var styles_exports = {};
__export(styles_exports, {
  default: () => e2
});
var interopDefault, e2;
var init_styles = __esm({
  ".output/server/chunks/build/styles.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    interopDefault = /* @__PURE__ */ __name((e4) => e4.default || e4 || [], "interopDefault");
    e2 = { "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_500_styles_DFgWFBqi(), error_500_styles_DFgWFBqi_exports)).then(interopDefault), "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue"), "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_404_styles_CBdZWZAA(), error_404_styles_CBdZWZAA_exports)).then(interopDefault), "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue"), "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue?vue&type=style&index=0&scoped=5a7877e7&lang.css": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_500_styles_DFgWFBqi(), error_500_styles_DFgWFBqi_exports)).then(interopDefault), "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-500.vue?vue&type=style&index=0&scoped=5a7877e7&lang.css"), "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue?vue&type=style&index=0&scoped=69929ac6&lang.css": /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_error_404_styles_CBdZWZAA(), error_404_styles_CBdZWZAA_exports)).then(interopDefault), "node_modules/.pnpm/nuxt@4.2.2_@parcel+watcher@2.5.1_@vue+compiler-sfc@3.5.25_cac@6.7.14_db0@0.3.4_ioredis@_af521326d24ae12647f2c170502c45db/node_modules/nuxt/dist/app/components/error-404.vue?vue&type=style&index=0&scoped=69929ac6&lang.css") };
  }
});

// .output/server/chunks/routes/renderer.mjs
var renderer_exports = {};
__export(renderer_exports, {
  a: () => ssrRenderStyle,
  b: () => baseURL,
  c: () => ssrInterpolate,
  d: () => ssrRenderSuspense,
  e: () => ssrRenderComponent,
  f: () => renderVNode,
  g: () => Zr,
  h: () => gr,
  r: () => hr,
  s: () => ssrRenderAttrs,
  u: () => useHead
});
function getModuleDependencies(e4, t5) {
  if (t5._dependencies[e4]) return t5._dependencies[e4];
  const n2 = t5._dependencies[e4] = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
  if (!t5.manifest) return n2;
  const r4 = t5.manifest[e4];
  if (!r4) return n2;
  r4.file && (n2.preload[e4] = r4, (r4.isEntry || r4.sideEffects) && (n2.scripts[e4] = r4));
  for (const e5 of r4.css || []) n2.styles[e5] = n2.preload[e5] = n2.prefetch[e5] = t5.manifest[e5];
  for (const e5 of r4.assets || []) n2.preload[e5] = n2.prefetch[e5] = t5.manifest[e5];
  for (const e5 of r4.imports || []) {
    const r5 = getModuleDependencies(e5, t5);
    for (const e6 in r5.styles) n2.styles[e6] = r5.styles[e6];
    for (const e6 in r5.preload) n2.preload[e6] = r5.preload[e6];
    for (const e6 in r5.prefetch) n2.prefetch[e6] = r5.prefetch[e6];
  }
  const o5 = {};
  for (const e5 in n2.preload) {
    const t6 = n2.preload[e5];
    t6.preload && (o5[e5] = t6);
  }
  return n2.preload = o5, n2;
}
function getRequestDependencies(e4, t5) {
  if (e4._requestDependencies) return e4._requestDependencies;
  const n2 = (function(e5, t6) {
    let n3 = "";
    const r4 = [...e5].sort();
    for (let e6 = 0; e6 < r4.length; e6++) e6 > 0 && (n3 += ","), n3 += r4[e6];
    if (t6._dependencySets[n3]) return t6._dependencySets[n3];
    const o5 = { scripts: {}, styles: {}, preload: {}, prefetch: {} };
    for (const n4 of e5) {
      const e6 = getModuleDependencies(n4, t6);
      for (const t7 in e6.scripts) o5.scripts[t7] = e6.scripts[t7];
      for (const t7 in e6.styles) o5.styles[t7] = e6.styles[t7];
      for (const t7 in e6.preload) o5.preload[t7] = e6.preload[t7];
      for (const t7 in e6.prefetch) o5.prefetch[t7] = e6.prefetch[t7];
      for (const e7 of t6.manifest?.[n4]?.dynamicImports || []) {
        const n5 = getModuleDependencies(e7, t6);
        for (const e8 in n5.scripts) o5.prefetch[e8] = n5.scripts[e8];
        for (const e8 in n5.styles) o5.prefetch[e8] = n5.styles[e8];
        for (const e8 in n5.preload) o5.prefetch[e8] = n5.preload[e8];
      }
    }
    const s4 = {};
    for (const e6 in o5.prefetch) {
      const t7 = o5.prefetch[e6];
      t7.prefetch && (s4[e6] = t7);
    }
    o5.prefetch = s4;
    for (const e6 in o5.preload) delete o5.prefetch[e6];
    for (const e6 in o5.styles) delete o5.preload[e6], delete o5.prefetch[e6];
    return t6._dependencySets[n3] = o5, o5;
  })(new Set(Array.from([...t5._entrypoints, ...e4.modules || e4._registeredComponents || []])), t5);
  return e4._requestDependencies = n2, n2;
}
function renderStyles(e4, t5) {
  const { styles: n2 } = getRequestDependencies(e4, t5);
  let r4 = "";
  for (const e5 in n2) {
    const o5 = n2[e5];
    r4 += `<link rel="stylesheet" href="${t5.buildAssetsURL(o5.file)}" crossorigin>`;
  }
  return r4;
}
function renderResourceHints(e4, t5) {
  const { preload: n2, prefetch: r4 } = getRequestDependencies(e4, t5);
  let o5 = "";
  for (const e5 in n2) {
    const r5 = n2[e5], s4 = t5.buildAssetsURL(r5.file), i4 = r5.module ? "modulepreload" : "preload", a6 = "style" === r5.resourceType || "font" === r5.resourceType || "script" === r5.resourceType || r5.module ? " crossorigin" : "";
    r5.resourceType && r5.mimeType ? o5 += `<link rel="${i4}" as="${r5.resourceType}" type="${r5.mimeType}"${a6} href="${s4}">` : r5.resourceType ? o5 += `<link rel="${i4}" as="${r5.resourceType}"${a6} href="${s4}">` : o5 += `<link rel="${i4}"${a6} href="${s4}">`;
  }
  for (const e5 in r4) {
    const n3 = r4[e5], s4 = t5.buildAssetsURL(n3.file), i4 = "style" === n3.resourceType || "font" === n3.resourceType || "script" === n3.resourceType || n3.module ? " crossorigin" : "";
    n3.resourceType && n3.mimeType ? o5 += `<link rel="prefetch" as="${n3.resourceType}" type="${n3.mimeType}"${i4} href="${s4}">` : n3.resourceType ? o5 += `<link rel="prefetch" as="${n3.resourceType}"${i4} href="${s4}">` : o5 += `<link rel="prefetch"${i4} href="${s4}">`;
  }
  return o5;
}
function renderResourceHeaders(e4, t5) {
  const { preload: n2, prefetch: r4 } = getRequestDependencies(e4, t5), o5 = [];
  for (const e5 in n2) {
    const r5 = n2[e5];
    let s4 = `<${t5.buildAssetsURL(r5.file)}>; rel="${r5.module ? "modulepreload" : "preload"}"`;
    r5.resourceType && (s4 += `; as="${r5.resourceType}"`), r5.mimeType && (s4 += `; type="${r5.mimeType}"`), ("style" === r5.resourceType || "font" === r5.resourceType || "script" === r5.resourceType || r5.module) && (s4 += "; crossorigin"), o5.push(s4);
  }
  for (const e5 in r4) {
    const n3 = r4[e5];
    let s4 = `<${t5.buildAssetsURL(n3.file)}>; rel="prefetch"`;
    n3.resourceType && (s4 += `; as="${n3.resourceType}"`), n3.mimeType && (s4 += `; type="${n3.mimeType}"`), ("style" === n3.resourceType || "font" === n3.resourceType || "script" === n3.resourceType || n3.module) && (s4 += "; crossorigin"), o5.push(s4);
  }
  return { link: o5.join(", ") };
}
function getPreloadLinks(e4, t5) {
  const { preload: n2 } = getRequestDependencies(e4, t5), r4 = [];
  for (const e5 in n2) {
    const o5 = n2[e5];
    r4.push({ rel: o5.module ? "modulepreload" : "preload", as: o5.resourceType, type: o5.mimeType ?? null, crossorigin: "style" === o5.resourceType || "font" === o5.resourceType || "script" === o5.resourceType || o5.module ? "" : null, href: t5.buildAssetsURL(o5.file) });
  }
  return r4;
}
function getPrefetchLinks(e4, t5) {
  const { prefetch: n2 } = getRequestDependencies(e4, t5), r4 = [];
  for (const e5 in n2) {
    const o5 = n2[e5];
    r4.push({ rel: "prefetch", as: o5.resourceType, type: o5.mimeType ?? null, crossorigin: "style" === o5.resourceType || "font" === o5.resourceType || "script" === o5.resourceType || o5.module ? "" : null, href: t5.buildAssetsURL(o5.file) });
  }
  return r4;
}
function renderScripts(e4, t5) {
  const { scripts: n2 } = getRequestDependencies(e4, t5);
  let r4 = "";
  for (const e5 in n2) {
    const o5 = n2[e5];
    o5.module ? r4 += `<script type="module" src="${t5.buildAssetsURL(o5.file)}" crossorigin><\/script>` : r4 += `<script src="${t5.buildAssetsURL(o5.file)}" defer crossorigin><\/script>`;
  }
  return r4;
}
function createRenderer$1(t5, n2) {
  const r4 = (function({ manifest: t6, precomputed: n3, buildAssetsURL: r5 }) {
    if (!t6 && !n3) throw new Error("Either manifest or precomputed data must be provided");
    const o5 = { buildAssetsURL: r5 || withLeadingSlash, manifest: t6, precomputed: n3, updateManifest, _dependencies: {}, _dependencySets: {}, _entrypoints: [] };
    function updateManifest(e4) {
      const t7 = Object.entries(e4);
      o5.manifest = e4, o5._dependencies = {}, o5._dependencySets = {}, o5._entrypoints = t7.filter((e5) => e5[1].isEntry).map(([e5]) => e5);
    }
    __name(updateManifest, "updateManifest");
    return n3 ? (o5._dependencies = n3.dependencies, o5._entrypoints = n3.entrypoints) : t6 && updateManifest(t6), o5;
  })(n2);
  return { rendererContext: r4, async renderToString(e4) {
    e4._registeredComponents = e4._registeredComponents || /* @__PURE__ */ new Set();
    const o5 = await Promise.resolve(t5).then((e5) => "default" in e5 ? e5.default : e5), s4 = await o5(e4), wrap = /* @__PURE__ */ __name((t6) => () => t6(e4, r4), "wrap");
    return { html: await n2.renderToString(s4, e4), renderResourceHeaders: wrap(renderResourceHeaders), renderResourceHints: wrap(renderResourceHints), renderStyles: wrap(renderStyles), renderScripts: wrap(renderScripts) };
  } };
}
function dedupeKey(e4) {
  const { props: t5, tag: n2 } = e4;
  if (ge2.has(n2)) return n2;
  if ("link" === n2 && "canonical" === t5.rel) return "canonical";
  if (t5.charset) return "charset";
  if ("meta" === e4.tag) {
    for (const r4 of _e2) if (void 0 !== t5[r4]) {
      const o5 = t5[r4], s4 = o5.includes(":"), i4 = be2.has(o5);
      return `${n2}:${o5}${!(s4 || i4) && e4.key ? `:key:${e4.key}` : ""}`;
    }
  }
  if (e4.key) return `${n2}:key:${e4.key}`;
  if (t5.id) return `${n2}:id:${t5.id}`;
  if (fe2.has(n2)) {
    const t6 = e4.textContent || e4.innerHTML;
    if (t6) return `${n2}:content:${t6}`;
  }
}
function walkResolver(e4, t5, n2) {
  let r4;
  if ("function" === typeof e4 && (n2 && ("titleTemplate" === n2 || "o" === n2[0] && "n" === n2[1]) || (e4 = e4())), t5 && (r4 = t5(n2, e4)), Array.isArray(r4)) return r4.map((e5) => walkResolver(e5, t5));
  if (r4?.constructor === Object) {
    const e5 = {};
    for (const n3 of Object.keys(r4)) e5[n3] = walkResolver(r4[n3], t5, n3);
    return e5;
  }
  return r4;
}
function normalizeProps2(e4, t5) {
  return e4.props = e4.props || {}, t5 ? "templateParams" === e4.tag ? (e4.props = t5, e4) : (Object.entries(t5).forEach(([n2, r4]) => {
    if (null === r4) return void (e4.props[n2] = null);
    if ("class" === n2 || "style" === n2) return void (e4.props[n2] = (function(e5, t6) {
      const n3 = "style" === e5 ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set();
      function processValue(t7) {
        const r5 = t7.trim();
        if (r5) if ("style" === e5) {
          const [e6, ...t8] = r5.split(":").map((e7) => e7.trim());
          e6 && t8.length && n3.set(e6, t8.join(":"));
        } else r5.split(" ").filter(Boolean).forEach((e6) => n3.add(e6));
      }
      __name(processValue, "processValue");
      return "string" == typeof t6 ? "style" === e5 ? t6.split(";").forEach(processValue) : processValue(t6) : Array.isArray(t6) ? t6.forEach((e6) => processValue(e6)) : t6 && "object" == typeof t6 && Object.entries(t6).forEach(([t7, r5]) => {
        r5 && "false" !== r5 && ("style" === e5 ? n3.set(t7.trim(), r5) : processValue(t7));
      }), n3;
    })(n2, r4));
    if (me2.has(n2)) {
      if (["textContent", "innerHTML"].includes(n2) && "object" == typeof r4) {
        let o6 = t5.type;
        if (t5.type || (o6 = "application/json"), !o6?.endsWith("json") && "speculationrules" !== o6) return;
        t5.type = o6, e4.props.type = o6, e4[n2] = JSON.stringify(r4);
      } else e4[n2] = r4;
      return;
    }
    const o5 = String(r4), s4 = n2.startsWith("data-");
    "true" === o5 || "" === o5 ? e4.props[n2] = !s4 || o5 : !r4 && s4 && "false" === o5 ? e4.props[n2] = "false" : void 0 !== r4 && (e4.props[n2] = r4);
  }), e4) : e4;
}
function normalizeTag(e4, t5) {
  const n2 = normalizeProps2({ tag: e4, props: {} }, "object" == typeof t5 && "function" != typeof t5 ? t5 : { ["script" === e4 || "noscript" === e4 || "style" === e4 ? "innerHTML" : "textContent"]: t5 });
  return n2.key && de2.has(n2.tag) && (n2.props["data-hid"] = n2._h = n2.key), "script" === n2.tag && "object" == typeof n2.innerHTML && (n2.innerHTML = JSON.stringify(n2.innerHTML), n2.props.type = n2.props.type || "application/json"), Array.isArray(n2.props.content) ? n2.props.content.map((e5) => ({ ...n2, props: { ...n2.props, content: e5 } })) : n2;
}
function normalizeEntryToTags(e4, t5) {
  if (!e4) return [];
  "function" == typeof e4 && (e4 = e4());
  const resolvers = /* @__PURE__ */ __name((e5, n3) => {
    for (let r4 = 0; r4 < t5.length; r4++) n3 = t5[r4](e5, n3);
    return n3;
  }, "resolvers");
  e4 = resolvers(void 0, e4);
  const n2 = [];
  return e4 = walkResolver(e4, resolvers), Object.entries(e4 || {}).forEach(([e5, t6]) => {
    if (void 0 !== t6) for (const r4 of Array.isArray(t6) ? t6 : [t6]) n2.push(normalizeTag(e5, r4));
  }), n2.flat();
}
function tagWeight(e4, t5) {
  if ("number" == typeof t5.tagPriority) return t5.tagPriority;
  let n2 = 100;
  const r4 = ke2[t5.tagPriority] || 0, o5 = e4.resolvedOptions.disableCapoSorting ? { link: {}, script: {}, style: {} } : Se2;
  if (t5.tag in Ce2) n2 = Ce2[t5.tag];
  else if ("meta" === t5.tag) {
    const e5 = "content-security-policy" === t5.props["http-equiv"] ? "content-security-policy" : t5.props.charset ? "charset" : "viewport" === t5.props.name ? "viewport" : null;
    e5 && (n2 = Se2.meta[e5]);
  } else "link" === t5.tag && t5.props.rel ? n2 = o5.link[t5.props.rel] : "script" === t5.tag ? isTruthy(t5.props.async) ? n2 = o5.script.async : !t5.props.src || isTruthy(t5.props.defer) || isTruthy(t5.props.async) || "module" === t5.props.type || t5.props.type?.endsWith("json") ? isTruthy(t5.props.defer) && t5.props.src && !isTruthy(t5.props.async) && (n2 = o5.script.defer) : n2 = o5.script.sync : "style" === t5.tag && (n2 = t5.innerHTML && Te2.test(t5.innerHTML) ? o5.style.imported : o5.style.sync);
  return (n2 || 100) + r4;
}
function registerPlugin(e4, t5) {
  const n2 = "function" == typeof t5 ? t5(e4) : t5, r4 = n2.key || String(e4.plugins.size + 1);
  e4.plugins.get(r4) || (e4.plugins.set(r4, n2), e4.hooks.addHooks(n2.hooks || {}));
}
function createUnhead(e4 = {}) {
  const n2 = createHooks();
  n2.addHooks(e4.hooks || {});
  const r4 = !e4.document, o5 = /* @__PURE__ */ new Map(), s4 = /* @__PURE__ */ new Map(), i4 = /* @__PURE__ */ new Set(), a6 = { _entryCount: 1, plugins: s4, dirty: false, resolvedOptions: e4, hooks: n2, ssr: r4, entries: o5, headEntries: /* @__PURE__ */ __name(() => [...o5.values()], "headEntries"), use: /* @__PURE__ */ __name((e5) => registerPlugin(a6, e5), "use"), push(e5, t5) {
    const s5 = { ...t5 || {} };
    delete s5.head;
    const l3 = s5._index ?? a6._entryCount++, c4 = { _i: l3, input: e5, options: s5 }, u3 = { _poll(e6 = false) {
      a6.dirty = true, !e6 && i4.add(l3), n2.callHook("entries:updated", a6);
    }, dispose() {
      o5.delete(l3) && a6.invalidate();
    }, patch(e6) {
      (!s5.mode || "server" === s5.mode && r4 || "client" === s5.mode && !r4) && (c4.input = e6, o5.set(l3, c4), u3._poll());
    } };
    return u3.patch(e5), u3;
  }, async resolveTags() {
    const t5 = { tagMap: /* @__PURE__ */ new Map(), tags: [], entries: [...a6.entries.values()] };
    for (await n2.callHook("entries:resolve", t5); i4.size; ) {
      const t6 = i4.values().next().value;
      i4.delete(t6);
      const r6 = o5.get(t6);
      if (r6) {
        const t7 = { tags: normalizeEntryToTags(r6.input, e4.propResolvers || []).map((e5) => Object.assign(e5, r6.options)), entry: r6 };
        await n2.callHook("entries:normalize", t7), r6._tags = t7.tags.map((e5, t8) => (e5._w = tagWeight(a6, e5), e5._p = (r6._i << 10) + t8, e5._d = dedupeKey(e5), e5));
      }
    }
    let r5 = false;
    t5.entries.flatMap((e5) => (e5._tags || []).map((e6) => ({ ...e6, props: { ...e6.props } }))).sort(sortTags).reduce((e5, t6) => {
      const n3 = String(t6._d || t6._p);
      if (!e5.has(n3)) return e5.set(n3, t6);
      const o6 = e5.get(n3);
      if ("merge" === (t6?.tagDuplicateStrategy || (ye2.has(t6.tag) ? "merge" : null) || (t6.key && t6.key === o6.key ? "merge" : null))) {
        const r6 = { ...o6.props };
        Object.entries(t6.props).forEach(([e6, t7]) => r6[e6] = "style" === e6 ? new Map([...o6.props.style || /* @__PURE__ */ new Map(), ...t7]) : "class" === e6 ? /* @__PURE__ */ new Set([...o6.props.class || /* @__PURE__ */ new Set(), ...t7]) : t7), e5.set(n3, { ...t6, props: r6 });
      } else t6._p >> 10 == o6._p >> 10 && "meta" === t6.tag && (function(e6) {
        const t7 = e6.split(":");
        return !!t7.length && ve2.has(t7[1]);
      })(n3) ? (e5.set(n3, Object.assign([...Array.isArray(o6) ? o6 : [o6], t6], t6)), r5 = true) : (t6._w === o6._w ? t6._p > o6._p : t6?._w < o6?._w) && e5.set(n3, t6);
      return e5;
    }, t5.tagMap);
    const s5 = t5.tagMap.get("title"), l3 = t5.tagMap.get("titleTemplate");
    if (a6._title = s5?.textContent, l3) {
      const e5 = l3?.textContent;
      if (a6._titleTemplate = e5, e5) {
        let n3 = "function" == typeof e5 ? e5(s5?.textContent) : e5;
        "string" != typeof n3 || a6.plugins.has("template-params") || (n3 = n3.replace("%s", s5?.textContent || "")), s5 ? null === n3 ? t5.tagMap.delete("title") : t5.tagMap.set("title", { ...s5, textContent: n3 }) : (l3.tag = "title", l3.textContent = n3);
      }
    }
    t5.tags = Array.from(t5.tagMap.values()), r5 && (t5.tags = t5.tags.flat().sort(sortTags)), await n2.callHook("tags:beforeResolve", t5), await n2.callHook("tags:resolve", t5), await n2.callHook("tags:afterResolve", t5);
    const c4 = [];
    for (const e5 of t5.tags) {
      const { innerHTML: t6, tag: n3, props: r6 } = e5;
      if (he2.has(n3) && ((0 !== Object.keys(r6).length || e5.innerHTML || e5.textContent) && ("meta" !== n3 || r6.content || r6["http-equiv"] || r6.charset))) {
        if ("script" === n3 && t6) {
          if (r6.type?.endsWith("json")) {
            const n4 = "string" == typeof t6 ? t6 : JSON.stringify(t6);
            e5.innerHTML = n4.replace(/</g, "\\u003C");
          } else "string" == typeof t6 && (e5.innerHTML = t6.replace(new RegExp(`</${n3}`, "g"), `<\\/${n3}`));
          e5._d = dedupeKey(e5);
        }
        c4.push(e5);
      }
    }
    return c4;
  }, invalidate() {
    for (const e5 of o5.values()) i4.add(e5._i);
    a6.dirty = true, n2.callHook("entries:updated", a6);
  } };
  return (e4?.plugins || []).forEach((e5) => registerPlugin(a6, e5)), a6.hooks.callHook("init", a6), e4.init?.forEach((e5) => e5 && a6.push(e5)), a6;
}
function encodeAttribute(e4) {
  return String(e4).replace(/"/g, "&quot;");
}
function propsToString(e4) {
  let t5 = "";
  for (const n2 in e4) {
    if (!Object.hasOwn(e4, n2)) continue;
    let r4 = e4[n2];
    "class" !== n2 && "style" !== n2 || "string" == typeof r4 || (r4 = "class" === n2 ? Array.from(r4).join(" ") : Array.from(r4).map(([e5, t6]) => `${e5}:${t6}`).join(";")), false !== r4 && null !== r4 && (t5 += true === r4 ? ` ${n2}` : ` ${n2}="${encodeAttribute(r4)}"`);
  }
  return t5;
}
function tagToString(e4) {
  const t5 = propsToString(e4.props), n2 = `<${e4.tag}${t5}>`;
  if (!fe2.has(e4.tag)) return pe2.has(e4.tag) ? n2 : `${n2}</${e4.tag}>`;
  let r4 = String(e4.textContent || e4.innerHTML || "");
  return r4 = "title" === e4.tag ? r4.replace(/[&<>"'/]/g, (e5) => {
    switch (e5) {
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
        return e5;
    }
  }) : r4.replace(new RegExp(`</${e4.tag}`, "gi"), `<\\/${e4.tag}`), pe2.has(e4.tag) ? n2 : `${n2}${r4}</${e4.tag}>`;
}
async function renderSSRHead(e4, t5) {
  const n2 = { shouldRender: true };
  if (await e4.hooks.callHook("ssr:beforeRender", n2), !n2.shouldRender) return { headTags: "", bodyTags: "", bodyTagsOpen: "", htmlAttrs: "", bodyAttrs: "" };
  const r4 = { tags: t5?.resolvedTags || await e4.resolveTags() };
  await e4.hooks.callHook("ssr:render", r4);
  const o5 = (function(e5) {
    const t6 = { htmlAttrs: {}, bodyAttrs: {}, tags: { head: "", bodyClose: "", bodyOpen: "" } };
    for (const n3 of e5) {
      if ("htmlAttrs" === n3.tag || "bodyAttrs" === n3.tag) {
        Object.assign(t6[n3.tag], n3.props);
        continue;
      }
      const e6 = tagToString(n3), r5 = n3.tagPosition || "head";
      t6.tags[r5] += t6.tags[r5] ? `${e6}` : e6;
    }
    return { headTags: t6.tags.head, bodyTags: t6.tags.bodyClose, bodyTagsOpen: t6.tags.bodyOpen, htmlAttrs: propsToString(t6.htmlAttrs), bodyAttrs: propsToString(t6.bodyAttrs) };
  })(r4.tags), s4 = { tags: r4.tags, html: o5 };
  return await e4.hooks.callHook("ssr:rendered", s4), s4.html;
}
function getCurrentScope() {
  return we2;
}
function batch(e4, t5 = false) {
  if (e4.flags |= 8, t5) return e4.next = Ee2, void (Ee2 = e4);
  e4.next = xe2, xe2 = e4;
}
function startBatch() {
  Pe2++;
}
function endBatch() {
  if (--Pe2 > 0) return;
  if (Ee2) {
    let e5 = Ee2;
    for (Ee2 = void 0; e5; ) {
      const t5 = e5.next;
      e5.next = void 0, e5.flags &= -9, e5 = t5;
    }
  }
  let e4;
  for (; xe2; ) {
    let t5 = xe2;
    for (xe2 = void 0; t5; ) {
      const n2 = t5.next;
      if (t5.next = void 0, t5.flags &= -9, 1 & t5.flags) try {
        t5.trigger();
      } catch (t6) {
        e4 || (e4 = t6);
      }
      t5 = n2;
    }
  }
  if (e4) throw e4;
}
function prepareDeps(e4) {
  for (let t5 = e4.deps; t5; t5 = t5.nextDep) t5.version = -1, t5.prevActiveLink = t5.dep.activeLink, t5.dep.activeLink = t5;
}
function cleanupDeps(e4) {
  let t5, n2 = e4.depsTail, r4 = n2;
  for (; r4; ) {
    const e5 = r4.prevDep;
    -1 === r4.version ? (r4 === n2 && (n2 = e5), removeSub(r4), removeDep(r4)) : t5 = r4, r4.dep.activeLink = r4.prevActiveLink, r4.prevActiveLink = void 0, r4 = e5;
  }
  e4.deps = t5, e4.depsTail = n2;
}
function isDirty(e4) {
  for (let t5 = e4.deps; t5; t5 = t5.nextDep) if (t5.dep.version !== t5.version || t5.dep.computed && (refreshComputed(t5.dep.computed) || t5.dep.version !== t5.version)) return true;
  return !!e4._dirty;
}
function refreshComputed(e4) {
  if (4 & e4.flags && !(16 & e4.flags)) return;
  if (e4.flags &= -17, e4.globalVersion === Oe2) return;
  if (e4.globalVersion = Oe2, !e4.isSSR && 128 & e4.flags && (!e4.deps && !e4._dirty || !isDirty(e4))) return;
  e4.flags |= 2;
  const t5 = e4.dep, n2 = Re2, r4 = $e2;
  Re2 = e4, $e2 = true;
  try {
    prepareDeps(e4);
    const n3 = e4.fn(e4._value);
    (0 === t5.version || hasChanged(n3, e4._value)) && (e4.flags |= 128, e4._value = n3, t5.version++);
  } catch (e5) {
    throw t5.version++, e5;
  } finally {
    Re2 = n2, $e2 = r4, cleanupDeps(e4), e4.flags &= -3;
  }
}
function removeSub(e4, t5 = false) {
  const { dep: n2, prevSub: r4, nextSub: o5 } = e4;
  if (r4 && (r4.nextSub = o5, e4.prevSub = void 0), o5 && (o5.prevSub = r4, e4.nextSub = void 0), n2.subs === e4 && (n2.subs = r4, !r4 && n2.computed)) {
    n2.computed.flags &= -5;
    for (let e5 = n2.computed.deps; e5; e5 = e5.nextDep) removeSub(e5, true);
  }
  t5 || --n2.sc || !n2.map || n2.map.delete(n2.key);
}
function removeDep(e4) {
  const { prevDep: t5, nextDep: n2 } = e4;
  t5 && (t5.nextDep = n2, e4.prevDep = void 0), n2 && (n2.prevDep = t5, e4.nextDep = void 0);
}
function pauseTracking() {
  Ne2.push($e2), $e2 = false;
}
function resetTracking() {
  const e4 = Ne2.pop();
  $e2 = void 0 === e4 || e4;
}
function cleanupEffect(e4) {
  const { cleanup: t5 } = e4;
  if (e4.cleanup = void 0, t5) {
    const e5 = Re2;
    Re2 = void 0;
    try {
      t5();
    } finally {
      Re2 = e5;
    }
  }
}
function addSub(e4) {
  if (e4.dep.sc++, 4 & e4.sub.flags) {
    const t5 = e4.dep.computed;
    if (t5 && !e4.dep.subs) {
      t5.flags |= 20;
      for (let e5 = t5.deps; e5; e5 = e5.nextDep) addSub(e5);
    }
    const n2 = e4.dep.subs;
    n2 !== e4 && (e4.prevSub = n2, n2 && (n2.nextSub = e4)), e4.dep.subs = e4;
  }
}
function track(e4, t5, n2) {
  if ($e2 && Re2) {
    let t6 = Ve2.get(e4);
    t6 || Ve2.set(e4, t6 = /* @__PURE__ */ new Map());
    let r4 = t6.get(n2);
    r4 || (t6.set(n2, r4 = new Dep()), r4.map = t6, r4.key = n2), r4.track();
  }
}
function trigger(e4, t5, n2, r4, o5, s4) {
  const i4 = Ve2.get(e4);
  if (!i4) return void Oe2++;
  const run = /* @__PURE__ */ __name((e5) => {
    e5 && e5.trigger();
  }, "run");
  if (startBatch(), "clear" === t5) i4.forEach(run);
  else {
    const o6 = i(e4), s5 = o6 && isIntegerKey(n2);
    if (o6 && "length" === n2) {
      const e5 = Number(r4);
      i4.forEach((t6, n3) => {
        ("length" === n3 || n3 === Le2 || !isSymbol(n3) && n3 >= e5) && run(t6);
      });
    } else switch ((void 0 !== n2 || i4.has(void 0)) && run(i4.get(n2)), s5 && run(i4.get(Le2)), t5) {
      case "add":
        o6 ? s5 && run(i4.get("length")) : (run(i4.get(He2)), isMap(e4) && run(i4.get(Me2)));
        break;
      case "delete":
        o6 || (run(i4.get(He2)), isMap(e4) && run(i4.get(Me2)));
        break;
      case "set":
        isMap(e4) && run(i4.get(He2));
    }
  }
  endBatch();
}
function reactiveReadArray(e4) {
  const t5 = toRaw(e4);
  return t5 === e4 ? t5 : (track(t5, 0, Le2), isShallow(e4) ? t5 : t5.map(toReactive));
}
function shallowReadArray(e4) {
  return track(e4 = toRaw(e4), 0, Le2), e4;
}
function toWrapped(e4, t5) {
  return isReadonly(e4) ? isReactive(e4) ? toReadonly(toReactive(t5)) : toReadonly(t5) : toReactive(t5);
}
function iterator(e4, t5, n2) {
  const r4 = shallowReadArray(e4), o5 = r4[t5]();
  return r4 === e4 || isShallow(e4) || (o5._next = o5.next, o5.next = () => {
    const e5 = o5._next();
    return e5.done || (e5.value = n2(e5.value)), e5;
  }), o5;
}
function apply(e4, t5, n2, r4, o5, s4) {
  const i4 = shallowReadArray(e4), a6 = i4 !== e4 && !isShallow(e4), l3 = i4[t5];
  if (l3 !== De2[t5]) {
    const t6 = l3.apply(e4, s4);
    return a6 ? toReactive(t6) : t6;
  }
  let c4 = n2;
  i4 !== e4 && (a6 ? c4 = /* @__PURE__ */ __name(function(t6, r5) {
    return n2.call(this, toWrapped(e4, t6), r5, e4);
  }, "c") : n2.length > 2 && (c4 = /* @__PURE__ */ __name(function(t6, r5) {
    return n2.call(this, t6, r5, e4);
  }, "c")));
  const u3 = l3.call(i4, c4, r4);
  return a6 && o5 ? o5(u3) : u3;
}
function reduce(e4, t5, n2, r4) {
  const o5 = shallowReadArray(e4);
  let s4 = n2;
  return o5 !== e4 && (isShallow(e4) ? n2.length > 3 && (s4 = /* @__PURE__ */ __name(function(t6, r5, o6) {
    return n2.call(this, t6, r5, o6, e4);
  }, "s")) : s4 = /* @__PURE__ */ __name(function(t6, r5, o6) {
    return n2.call(this, t6, toWrapped(e4, r5), o6, e4);
  }, "s")), o5[t5](s4, ...r4);
}
function searchProxy(e4, t5, n2) {
  const r4 = toRaw(e4);
  track(r4, 0, Le2);
  const o5 = r4[t5](...n2);
  return -1 !== o5 && false !== o5 || !isProxy(n2[0]) ? o5 : (n2[0] = toRaw(n2[0]), r4[t5](...n2));
}
function noTracking(e4, t5, n2 = []) {
  pauseTracking(), startBatch();
  const r4 = toRaw(e4)[t5].apply(e4, n2);
  return endBatch(), resetTracking(), r4;
}
function hasOwnProperty(e4) {
  isSymbol(e4) || (e4 = String(e4));
  const t5 = toRaw(this);
  return track(t5, 0, e4), t5.hasOwnProperty(e4);
}
function createReadonlyMethod(e4) {
  return function(...t5) {
    return "delete" !== e4 && ("clear" === e4 ? void 0 : this);
  };
}
function createInstrumentations(e4, t5) {
  const n2 = { get(n3) {
    const r4 = this.__v_raw, o5 = toRaw(r4), s4 = toRaw(n3);
    e4 || (hasChanged(n3, s4) && track(o5, 0, n3), track(o5, 0, s4));
    const { has: i4 } = getProto(o5), a6 = t5 ? toShallow : e4 ? toReadonly : toReactive;
    return i4.call(o5, n3) ? a6(r4.get(n3)) : i4.call(o5, s4) ? a6(r4.get(s4)) : void (r4 !== o5 && r4.get(n3));
  }, get size() {
    const t6 = this.__v_raw;
    return !e4 && track(toRaw(t6), 0, He2), t6.size;
  }, has(t6) {
    const n3 = this.__v_raw, r4 = toRaw(n3), o5 = toRaw(t6);
    return e4 || (hasChanged(t6, o5) && track(r4, 0, t6), track(r4, 0, o5)), t6 === o5 ? n3.has(t6) : n3.has(t6) || n3.has(o5);
  }, forEach(n3, r4) {
    const o5 = this, s4 = o5.__v_raw, i4 = toRaw(s4), a6 = t5 ? toShallow : e4 ? toReadonly : toReactive;
    return !e4 && track(i4, 0, He2), s4.forEach((e5, t6) => n3.call(r4, a6(e5), a6(t6), o5));
  } };
  n(n2, e4 ? { add: createReadonlyMethod("add"), set: createReadonlyMethod("set"), delete: createReadonlyMethod("delete"), clear: createReadonlyMethod("clear") } : { add(e5) {
    t5 || isShallow(e5) || isReadonly(e5) || (e5 = toRaw(e5));
    const n3 = toRaw(this);
    return getProto(n3).has.call(n3, e5) || (n3.add(e5), trigger(n3, "add", e5, e5)), this;
  }, set(e5, n3) {
    t5 || isShallow(n3) || isReadonly(n3) || (n3 = toRaw(n3));
    const r4 = toRaw(this), { has: o5, get: s4 } = getProto(r4);
    let i4 = o5.call(r4, e5);
    i4 || (e5 = toRaw(e5), i4 = o5.call(r4, e5));
    const a6 = s4.call(r4, e5);
    return r4.set(e5, n3), i4 ? hasChanged(n3, a6) && trigger(r4, "set", e5, n3) : trigger(r4, "add", e5, n3), this;
  }, delete(e5) {
    const t6 = toRaw(this), { has: n3, get: r4 } = getProto(t6);
    let o5 = n3.call(t6, e5);
    o5 || (e5 = toRaw(e5), o5 = n3.call(t6, e5)), r4 && r4.call(t6, e5);
    const s4 = t6.delete(e5);
    return o5 && trigger(t6, "delete", e5, void 0), s4;
  }, clear() {
    const e5 = toRaw(this), t6 = 0 !== e5.size, n3 = e5.clear();
    return t6 && trigger(e5, "clear", void 0, void 0), n3;
  } });
  return ["keys", "values", "entries", Symbol.iterator].forEach((r4) => {
    n2[r4] = /* @__PURE__ */ (function(e5, t6, n3) {
      return function(...r5) {
        const o5 = this.__v_raw, s4 = toRaw(o5), i4 = isMap(s4), a6 = "entries" === e5 || e5 === Symbol.iterator && i4, l3 = "keys" === e5 && i4, c4 = o5[e5](...r5), u3 = n3 ? toShallow : t6 ? toReadonly : toReactive;
        return !t6 && track(s4, 0, l3 ? Me2 : He2), { next() {
          const { value: e6, done: t7 } = c4.next();
          return t7 ? { value: e6, done: t7 } : { value: a6 ? [u3(e6[0]), u3(e6[1])] : u3(e6), done: t7 };
        }, [Symbol.iterator]() {
          return this;
        } };
      };
    })(r4, e4, t5);
  }), n2;
}
function createInstrumentationGetter(e4, t5) {
  const n2 = createInstrumentations(e4, t5);
  return (t6, r4, o5) => "__v_isReactive" === r4 ? !e4 : "__v_isReadonly" === r4 ? e4 : "__v_raw" === r4 ? t6 : Reflect.get(hasOwn(n2, r4) && r4 in t6 ? n2 : t6, r4, o5);
}
function reactive(e4) {
  return isReadonly(e4) ? e4 : createReactiveObject(e4, false, Be2, qe2, Ze2);
}
function shallowReactive(e4) {
  return createReactiveObject(e4, false, We2, Ke2, Xe2);
}
function readonly(e4) {
  return createReactiveObject(e4, true, Ue2, Je2, Ye2);
}
function shallowReadonly(e4) {
  return createReactiveObject(e4, true, ze2, Ge2, Qe2);
}
function createReactiveObject(e4, t5, n2, r4, o5) {
  if (!isObject(e4)) return e4;
  if (e4.__v_raw && (!t5 || !e4.__v_isReactive)) return e4;
  const s4 = (i4 = e4).__v_skip || !Object.isExtensible(i4) ? 0 : (function(e5) {
    switch (e5) {
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
  })(toRawType(i4));
  var i4;
  if (0 === s4) return e4;
  const a6 = o5.get(e4);
  if (a6) return a6;
  const l3 = new Proxy(e4, 2 === s4 ? r4 : n2);
  return o5.set(e4, l3), l3;
}
function isReactive(e4) {
  return isReadonly(e4) ? isReactive(e4.__v_raw) : !(!e4 || !e4.__v_isReactive);
}
function isReadonly(e4) {
  return !(!e4 || !e4.__v_isReadonly);
}
function isShallow(e4) {
  return !(!e4 || !e4.__v_isShallow);
}
function isProxy(e4) {
  return !!e4 && !!e4.__v_raw;
}
function toRaw(e4) {
  const t5 = e4 && e4.__v_raw;
  return t5 ? toRaw(t5) : e4;
}
function markRaw(e4) {
  return !hasOwn(e4, "__v_skip") && Object.isExtensible(e4) && def(e4, "__v_skip", true), e4;
}
function isRef2(e4) {
  return !!e4 && true === e4.__v_isRef;
}
function ref2(e4) {
  return createRef(e4, false);
}
function shallowRef(e4) {
  return createRef(e4, true);
}
function createRef(e4, t5) {
  return isRef2(e4) ? e4 : new RefImpl(e4, t5);
}
function unref2(e4) {
  return isRef2(e4) ? e4.value : e4;
}
function toValue(e4) {
  return isFunction(e4) ? e4() : unref2(e4);
}
function proxyRefs(e4) {
  return isReactive(e4) ? e4 : new Proxy(e4, et2);
}
function customRef(e4) {
  return new CustomRefImpl(e4);
}
function propertyToRef(e4, t5, n2) {
  return new ObjectRefImpl(e4, t5, n2);
}
function onWatcherCleanup(e4, t5 = false, n2 = rt2) {
  if (n2) {
    let t6 = nt2.get(n2);
    t6 || nt2.set(n2, t6 = []), t6.push(e4);
  }
}
function traverse(e4, t5 = 1 / 0, n2) {
  if (t5 <= 0 || !isObject(e4) || e4.__v_skip) return e4;
  if (((n2 = n2 || /* @__PURE__ */ new Map()).get(e4) || 0) >= t5) return e4;
  if (n2.set(e4, t5), t5--, isRef2(e4)) traverse(e4.value, t5, n2);
  else if (i(e4)) for (let r4 = 0; r4 < e4.length; r4++) traverse(e4[r4], t5, n2);
  else if (isSet(e4) || isMap(e4)) e4.forEach((e5) => {
    traverse(e5, t5, n2);
  });
  else if (isPlainObject(e4)) {
    for (const r4 in e4) traverse(e4[r4], t5, n2);
    for (const r4 of Object.getOwnPropertySymbols(e4)) Object.prototype.propertyIsEnumerable.call(e4, r4) && traverse(e4[r4], t5, n2);
  }
  return e4;
}
function callWithErrorHandling(e4, t5, n2, r4) {
  try {
    return r4 ? e4(...r4) : e4();
  } catch (e5) {
    handleError(e5, t5, n2);
  }
}
function callWithAsyncErrorHandling(e4, t5, n2, r4) {
  if (isFunction(e4)) {
    const o5 = callWithErrorHandling(e4, t5, n2, r4);
    return o5 && isPromise(o5) && o5.catch((e5) => {
      handleError(e5, t5, n2);
    }), o5;
  }
  if (i(e4)) {
    const o5 = [];
    for (let s4 = 0; s4 < e4.length; s4++) o5.push(callWithAsyncErrorHandling(e4[s4], t5, n2, r4));
    return o5;
  }
}
function handleError(e4, t5, n2, r4 = true) {
  t5 && t5.vnode;
  const { errorHandler: o5, throwUnhandledErrorInProduction: s4 } = t5 && t5.appContext.config || t;
  if (t5) {
    let r5 = t5.parent;
    const s5 = t5.proxy, i4 = `https://vuejs.org/error-reference/#runtime-${n2}`;
    for (; r5; ) {
      const t6 = r5.ec;
      if (t6) {
        for (let n3 = 0; n3 < t6.length; n3++) if (false === t6[n3](e4, s5, i4)) return;
      }
      r5 = r5.parent;
    }
    if (o5) return pauseTracking(), callWithErrorHandling(o5, null, 10, [e4, s5, i4]), void resetTracking();
  }
  !(function(e5, t6, n3, r5 = true, o6 = false) {
    if (o6) throw e5;
    console.error(e5);
  })(e4, 0, 0, r4, s4);
}
function nextTick2(e4) {
  const t5 = dt2 || pt2;
  return e4 ? t5.then(this ? e4.bind(this) : e4) : t5;
}
function queueJob(e4) {
  if (!(1 & e4.flags)) {
    const t5 = getId(e4), n2 = it2[it2.length - 1];
    !n2 || !(2 & e4.flags) && t5 >= getId(n2) ? it2.push(e4) : it2.splice((function(e5) {
      let t6 = at2 + 1, n3 = it2.length;
      for (; t6 < n3; ) {
        const r4 = t6 + n3 >>> 1, o5 = it2[r4], s4 = getId(o5);
        s4 < e5 || s4 === e5 && 2 & o5.flags ? t6 = r4 + 1 : n3 = r4;
      }
      return t6;
    })(t5), 0, e4), e4.flags |= 1, queueFlush();
  }
}
function queueFlush() {
  dt2 || (dt2 = pt2.then(flushJobs));
}
function queuePostFlushCb(e4) {
  i(e4) ? lt2.push(...e4) : ct2 && -1 === e4.id ? ct2.splice(ut2 + 1, 0, e4) : 1 & e4.flags || (lt2.push(e4), e4.flags |= 1), queueFlush();
}
function flushPreFlushCbs(e4, t5, n2 = at2 + 1) {
  for (; n2 < it2.length; n2++) {
    const t6 = it2[n2];
    if (t6 && 2 & t6.flags) {
      if (e4 && t6.id !== e4.uid) continue;
      it2.splice(n2, 1), n2--, 4 & t6.flags && (t6.flags &= -2), t6(), 4 & t6.flags || (t6.flags &= -2);
    }
  }
}
function flushPostFlushCbs(e4) {
  if (lt2.length) {
    const e5 = [...new Set(lt2)].sort((e6, t5) => getId(e6) - getId(t5));
    if (lt2.length = 0, ct2) return void ct2.push(...e5);
    for (ct2 = e5, ut2 = 0; ut2 < ct2.length; ut2++) {
      const e6 = ct2[ut2];
      4 & e6.flags && (e6.flags &= -2), 8 & e6.flags || e6(), e6.flags &= -2;
    }
    ct2 = null, ut2 = 0;
  }
}
function flushJobs(e4) {
  try {
    for (at2 = 0; at2 < it2.length; at2++) {
      const e5 = it2[at2];
      !e5 || 8 & e5.flags || (4 & e5.flags && (e5.flags &= -2), callWithErrorHandling(e5, e5.i, e5.i ? 15 : 14), 4 & e5.flags || (e5.flags &= -2));
    }
  } finally {
    for (; at2 < it2.length; at2++) {
      const e5 = it2[at2];
      e5 && (e5.flags &= -2);
    }
    at2 = -1, it2.length = 0, flushPostFlushCbs(), dt2 = null, (it2.length || lt2.length) && flushJobs();
  }
}
function setCurrentRenderingInstance$1(e4) {
  const t5 = gt2;
  return gt2 = e4, mt2 = e4 && e4.type.__scopeId || null, t5;
}
function withCtx(e4, t5 = gt2, n2) {
  if (!t5) return e4;
  if (e4._n) return e4;
  const renderFnWithContext = /* @__PURE__ */ __name((...n3) => {
    renderFnWithContext._d && setBlockTracking(-1);
    const r4 = setCurrentRenderingInstance$1(t5);
    let o5;
    try {
      o5 = e4(...n3);
    } finally {
      setCurrentRenderingInstance$1(r4), renderFnWithContext._d && setBlockTracking(1);
    }
    return o5;
  }, "renderFnWithContext");
  return renderFnWithContext._n = true, renderFnWithContext._c = true, renderFnWithContext._d = true, renderFnWithContext;
}
function invokeDirectiveHook(e4, t5, n2, r4) {
  const o5 = e4.dirs, s4 = t5 && t5.dirs;
  for (let i4 = 0; i4 < o5.length; i4++) {
    const a6 = o5[i4];
    s4 && (a6.oldValue = s4[i4].value);
    let l3 = a6.dir[r4];
    l3 && (pauseTracking(), callWithAsyncErrorHandling(l3, n2, 8, [e4.el, a6, e4, t5]), resetTracking());
  }
}
function moveTeleport(e4, t5, n2, { o: { insert: r4 }, m: o5 }, s4 = 2) {
  0 === s4 && r4(e4.targetAnchor, t5, n2);
  const { el: i4, anchor: a6, shapeFlag: l3, children: c4, props: u3 } = e4, p3 = 2 === s4;
  if (p3 && r4(i4, t5, n2), (!p3 || isTeleportDisabled(u3)) && 16 & l3) for (let e5 = 0; e5 < c4.length; e5++) o5(c4[e5], t5, n2, 2);
  p3 && r4(a6, t5, n2);
}
function updateCssVars(e4, t5) {
  const n2 = e4.ctx;
  if (n2 && n2.ut) {
    let r4, o5;
    for (t5 ? (r4 = e4.el, o5 = e4.anchor) : (r4 = e4.targetStart, o5 = e4.targetAnchor); r4 && r4 !== o5; ) 1 === r4.nodeType && r4.setAttribute("data-v-owner", n2.uid), r4 = r4.nextSibling;
    n2.ut();
  }
}
function prepareAnchor(e4, t5, n2, r4) {
  const o5 = t5.targetStart = n2(""), s4 = t5.targetAnchor = n2("");
  return o5[yt2] = s4, e4 && (r4(o5, e4), r4(s4, e4)), s4;
}
function useTransitionState() {
  const e4 = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
  return Ot2(() => {
    e4.isMounted = true;
  }), Mt2(() => {
    e4.isUnmounting = true;
  }), e4;
}
function findNonCommentChild(e4) {
  let t5 = e4[0];
  if (e4.length > 1) {
    for (const n2 of e4) if (n2.type !== sn2) {
      t5 = n2;
      break;
    }
  }
  return t5;
}
function getLeavingNodesForType(e4, t5) {
  const { leavingVNodes: n2 } = e4;
  let r4 = n2.get(t5.type);
  return r4 || (r4 = /* @__PURE__ */ Object.create(null), n2.set(t5.type, r4)), r4;
}
function resolveTransitionHooks(e4, t5, n2, r4, o5) {
  const { appear: s4, mode: i4, persisted: a6 = false, onBeforeEnter: l3, onEnter: c4, onAfterEnter: u3, onEnterCancelled: p3, onBeforeLeave: d3, onLeave: f3, onAfterLeave: g4, onLeaveCancelled: m3, onBeforeAppear: y4, onAppear: v3, onAfterAppear: b4, onAppearCancelled: C3 } = t5, k3 = String(e4.key), S3 = getLeavingNodesForType(n2, e4), callHook2 = /* @__PURE__ */ __name((e5, t6) => {
    e5 && callWithAsyncErrorHandling(e5, r4, 9, t6);
  }, "callHook"), callAsyncHook = /* @__PURE__ */ __name((e5, t6) => {
    const n3 = t6[1];
    callHook2(e5, t6), i(e5) ? e5.every((e6) => e6.length <= 1) && n3() : e5.length <= 1 && n3();
  }, "callAsyncHook"), T3 = { mode: i4, persisted: a6, beforeEnter(t6) {
    let r5 = l3;
    if (!n2.isMounted) {
      if (!s4) return;
      r5 = y4 || l3;
    }
    t6[bt2] && t6[bt2](true);
    const o6 = S3[k3];
    o6 && isSameVNodeType(e4, o6) && o6.el[bt2] && o6.el[bt2](), callHook2(r5, [t6]);
  }, enter(e5) {
    let t6 = c4, r5 = u3, o6 = p3;
    if (!n2.isMounted) {
      if (!s4) return;
      t6 = v3 || c4, r5 = b4 || u3, o6 = C3 || p3;
    }
    let i5 = false;
    const a7 = e5[Ct2] = (t7) => {
      i5 || (i5 = true, callHook2(t7 ? o6 : r5, [e5]), T3.delayedLeave && T3.delayedLeave(), e5[Ct2] = void 0);
    };
    t6 ? callAsyncHook(t6, [e5, a7]) : a7();
  }, leave(t6, r5) {
    const o6 = String(e4.key);
    if (t6[Ct2] && t6[Ct2](true), n2.isUnmounting) return r5();
    callHook2(d3, [t6]);
    let s5 = false;
    const i5 = t6[bt2] = (n3) => {
      s5 || (s5 = true, r5(), callHook2(n3 ? m3 : g4, [t6]), t6[bt2] = void 0, S3[o6] === e4 && delete S3[o6]);
    };
    S3[o6] = e4, f3 ? callAsyncHook(f3, [t6, i5]) : i5();
  }, clone(e5) {
    const s5 = resolveTransitionHooks(e5, t5, n2, r4, o5);
    return o5 && o5(s5), s5;
  } };
  return T3;
}
function emptyPlaceholder(e4) {
  if (isKeepAlive(e4)) return (e4 = cloneVNode(e4)).children = null, e4;
}
function getInnerChild$1(e4) {
  if (!isKeepAlive(e4)) return isTeleport(e4.type) && e4.children ? findNonCommentChild(e4.children) : e4;
  if (e4.component) return e4.component.subTree;
  const { shapeFlag: t5, children: n2 } = e4;
  if (n2) {
    if (16 & t5) return n2[0];
    if (32 & t5 && isFunction(n2.default)) return n2.default();
  }
}
function setTransitionHooks(e4, t5) {
  6 & e4.shapeFlag && e4.component ? (e4.transition = t5, setTransitionHooks(e4.component.subTree, t5)) : 128 & e4.shapeFlag ? (e4.ssContent.transition = t5.clone(e4.ssContent), e4.ssFallback.transition = t5.clone(e4.ssFallback)) : e4.transition = t5;
}
function getTransitionRawChildren(e4, t5 = false, n2) {
  let r4 = [], o5 = 0;
  for (let s4 = 0; s4 < e4.length; s4++) {
    let i4 = e4[s4];
    const a6 = null == n2 ? i4.key : String(n2) + String(null != i4.key ? i4.key : s4);
    i4.type === rn2 ? (128 & i4.patchFlag && o5++, r4 = r4.concat(getTransitionRawChildren(i4.children, t5, a6))) : (t5 || i4.type !== sn2) && r4.push(null != a6 ? cloneVNode(i4, { key: a6 }) : i4);
  }
  if (o5 > 1) for (let e5 = 0; e5 < r4.length; e5++) r4[e5].patchFlag = -2;
  return r4;
}
function defineComponent(e4, t5) {
  return isFunction(e4) ? (() => n({ name: e4.name }, t5, { setup: e4 }))() : e4;
}
function markAsyncBoundary(e4) {
  e4.ids = [e4.ids[0] + e4.ids[2]++ + "-", 0, 0];
}
function setRef(e4, t5, n2, r4, o5 = false) {
  if (i(e4)) return void e4.forEach((e5, s5) => setRef(e5, t5 && (i(t5) ? t5[s5] : t5), n2, r4, o5));
  if (isAsyncWrapper(r4) && !o5) return void (512 & r4.shapeFlag && r4.type.__asyncResolved && r4.component.subTree.component && setRef(e4, t5, n2, r4.component.subTree));
  const s4 = 4 & r4.shapeFlag ? getComponentPublicInstance(r4.component) : r4.el, i4 = o5 ? null : s4, { i: a6, r: l3 } = e4, c4 = t5 && t5.r, u3 = a6.refs === t ? a6.refs = {} : a6.refs, p3 = a6.setupState, f3 = toRaw(p3), g4 = p3 === t ? NO : (e5) => hasOwn(f3, e5);
  if (null != c4 && c4 !== l3) {
    if (invalidatePendingSetRef(t5), isString(c4)) u3[c4] = null, g4(c4) && (p3[c4] = null);
    else if (isRef2(c4)) {
      c4.value = null;
      const e5 = t5;
      e5.k && (u3[e5.k] = null);
    }
  }
  if (isFunction(l3)) callWithErrorHandling(l3, a6, 12, [i4, u3]);
  else {
    const t6 = isString(l3), r5 = isRef2(l3);
    if (t6 || r5) {
      const doSet = /* @__PURE__ */ __name(() => {
        if (e4.f) {
          const n3 = t6 ? g4(l3) ? p3[l3] : u3[l3] : l3.value;
          if (o5) i(n3) && remove(n3, s4);
          else if (i(n3)) n3.includes(s4) || n3.push(s4);
          else if (t6) u3[l3] = [s4], g4(l3) && (p3[l3] = u3[l3]);
          else {
            const t7 = [s4];
            l3.value = t7, e4.k && (u3[e4.k] = t7);
          }
        } else t6 ? (u3[l3] = i4, g4(l3) && (p3[l3] = i4)) : r5 && (l3.value = i4, e4.k && (u3[e4.k] = i4));
      }, "doSet");
      if (i4) {
        const job = /* @__PURE__ */ __name(() => {
          doSet(), wt2.delete(e4);
        }, "job");
        job.id = -1, wt2.set(e4, job), en2(job, n2);
      } else invalidatePendingSetRef(e4), doSet();
    }
  }
}
function invalidatePendingSetRef(e4) {
  const t5 = wt2.get(e4);
  t5 && (t5.flags |= 8, wt2.delete(e4));
}
function createHydrationFunctions(e4) {
  const { mt: t5, p: n2, o: { patchProp: r4, createText: o5, nextSibling: s4, parentNode: i4, remove: a6, insert: l3, createComment: c4 } } = e4, hydrateNode = /* @__PURE__ */ __name((n3, r5, a7, c5, u3, p3 = false) => {
    p3 = p3 || !!r5.dynamicChildren;
    const d3 = isComment(n3) && "[" === n3.data, onMismatch = /* @__PURE__ */ __name(() => handleMismatch(n3, r5, a7, c5, u3, d3), "onMismatch"), { type: f3, ref: g4, shapeFlag: m3, patchFlag: y4 } = r5;
    let v3 = n3.nodeType;
    r5.el = n3, -2 === y4 && (p3 = false, r5.dynamicChildren = null);
    let _3 = null;
    switch (f3) {
      case on3:
        3 !== v3 ? "" === r5.children ? (l3(r5.el = o5(""), i4(n3), n3), _3 = n3) : _3 = onMismatch() : (n3.data !== r5.children && (logMismatchError(), n3.data = r5.children), _3 = s4(n3));
        break;
      case sn2:
        isTemplateNode2(n3) ? (_3 = s4(n3), replaceNode(r5.el = n3.content.firstChild, n3, a7)) : _3 = 8 !== v3 || d3 ? onMismatch() : s4(n3);
        break;
      case an2:
        if (d3 && (v3 = (n3 = s4(n3)).nodeType), 1 === v3 || 3 === v3) {
          _3 = n3;
          const e5 = !r5.children.length;
          for (let t6 = 0; t6 < r5.staticCount; t6++) e5 && (r5.children += 1 === _3.nodeType ? _3.outerHTML : _3.data), t6 === r5.staticCount - 1 && (r5.anchor = _3), _3 = s4(_3);
          return d3 ? s4(_3) : _3;
        }
        onMismatch();
        break;
      case rn2:
        _3 = d3 ? hydrateFragment(n3, r5, a7, c5, u3, p3) : onMismatch();
        break;
      default:
        if (1 & m3) _3 = 1 === v3 && r5.type.toLowerCase() === n3.tagName.toLowerCase() || isTemplateNode2(n3) ? hydrateElement(n3, r5, a7, c5, u3, p3) : onMismatch();
        else if (6 & m3) {
          r5.slotScopeIds = u3;
          const e5 = i4(n3);
          if (_3 = d3 ? locateClosingAnchor(n3) : isComment(n3) && "teleport start" === n3.data ? locateClosingAnchor(n3, n3.data, "teleport end") : s4(n3), t5(r5, e5, null, a7, c5, getContainerType(e5), p3), isAsyncWrapper(r5) && !r5.type.__asyncResolved) {
            let t6;
            d3 ? (t6 = createVNode(rn2), t6.anchor = _3 ? _3.previousSibling : e5.lastChild) : t6 = 3 === n3.nodeType ? createTextVNode("") : createVNode("div"), t6.el = n3, r5.component.subTree = t6;
          }
        } else 64 & m3 ? _3 = 8 !== v3 ? onMismatch() : r5.type.hydrate(n3, r5, a7, c5, u3, p3, e4, hydrateChildren) : 128 & m3 && (_3 = r5.type.hydrate(n3, r5, a7, c5, getContainerType(i4(n3)), u3, p3, e4, hydrateNode));
    }
    return null != g4 && setRef(g4, null, c5, r5), _3;
  }, "hydrateNode"), hydrateElement = /* @__PURE__ */ __name((e5, t6, n3, o6, s5, i5) => {
    i5 = i5 || !!t6.dynamicChildren;
    const { type: l4, props: c5, patchFlag: u3, shapeFlag: p3, dirs: d3, transition: f3 } = t6, g4 = "input" === l4 || "option" === l4;
    if (g4 || -1 !== u3) {
      d3 && invokeDirectiveHook(t6, null, n3, "created");
      let l5, m3 = false;
      if (isTemplateNode2(e5)) {
        m3 = needTransition(null, f3) && n3 && n3.vnode.props && n3.vnode.props.appear;
        const r5 = e5.content.firstChild;
        if (m3) {
          const e6 = r5.getAttribute("class");
          e6 && (r5.$cls = e6), f3.beforeEnter(r5);
        }
        replaceNode(r5, e5, n3), t6.el = e5 = r5;
      }
      if (16 & p3 && (!c5 || !c5.innerHTML && !c5.textContent)) {
        let r5 = hydrateChildren(e5.firstChild, t6, e5, n3, o6, s5, i5);
        for (; r5; ) {
          isMismatchAllowed(e5, 1) || logMismatchError();
          const t7 = r5;
          r5 = r5.nextSibling, a6(t7);
        }
      } else if (8 & p3) {
        let n4 = t6.children;
        "\n" !== n4[0] || "PRE" !== e5.tagName && "TEXTAREA" !== e5.tagName || (n4 = n4.slice(1));
        const { textContent: r5 } = e5;
        r5 !== n4 && r5 !== n4.replace(/\r\n|\r/g, "\n") && (isMismatchAllowed(e5, 0) || logMismatchError(), e5.textContent = t6.children);
      }
      if (c5) {
        if (g4 || !i5 || 48 & u3) {
          const t7 = e5.tagName.includes("-");
          for (const o7 in c5) (g4 && (o7.endsWith("value") || "indeterminate" === o7) || isOn(o7) && !s(o7) || "." === o7[0] || t7) && r4(e5, o7, null, c5[o7], void 0, n3);
        } else if (c5.onClick) r4(e5, "onClick", null, c5.onClick, void 0, n3);
        else if (4 & u3 && isReactive(c5.style)) for (const e6 in c5.style) c5.style[e6];
      }
      (l5 = c5 && c5.onVnodeBeforeMount) && invokeVNodeHook(l5, n3, t6), d3 && invokeDirectiveHook(t6, null, n3, "beforeMount"), ((l5 = c5 && c5.onVnodeMounted) || d3 || m3) && queueEffectWithSuspense(() => {
        l5 && invokeVNodeHook(l5, n3, t6), m3 && f3.enter(e5), d3 && invokeDirectiveHook(t6, null, n3, "mounted");
      }, o6);
    }
    return e5.nextSibling;
  }, "hydrateElement"), hydrateChildren = /* @__PURE__ */ __name((e5, t6, r5, i5, a7, c5, u3) => {
    u3 = u3 || !!t6.dynamicChildren;
    const p3 = t6.children, d3 = p3.length;
    for (let t7 = 0; t7 < d3; t7++) {
      const f3 = u3 ? p3[t7] : p3[t7] = normalizeVNode$1(p3[t7]), g4 = f3.type === on3;
      e5 ? (g4 && !u3 && t7 + 1 < d3 && normalizeVNode$1(p3[t7 + 1]).type === on3 && (l3(o5(e5.data.slice(f3.children.length)), r5, s4(e5)), e5.data = f3.children), e5 = hydrateNode(e5, f3, i5, a7, c5, u3)) : g4 && !f3.children ? l3(f3.el = o5(""), r5) : (isMismatchAllowed(r5, 1) || logMismatchError(), n2(null, f3, r5, null, i5, a7, getContainerType(r5), c5));
    }
    return e5;
  }, "hydrateChildren"), hydrateFragment = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, a7) => {
    const { slotScopeIds: u3 } = t6;
    u3 && (o6 = o6 ? o6.concat(u3) : u3);
    const p3 = i4(e5), d3 = hydrateChildren(s4(e5), t6, p3, n3, r5, o6, a7);
    return d3 && isComment(d3) && "]" === d3.data ? s4(t6.anchor = d3) : (logMismatchError(), l3(t6.anchor = c4("]"), p3, d3), d3);
  }, "hydrateFragment"), handleMismatch = /* @__PURE__ */ __name((e5, t6, r5, o6, l4, c5) => {
    if (isMismatchAllowed(e5.parentElement, 1) || logMismatchError(), t6.el = null, c5) {
      const t7 = locateClosingAnchor(e5);
      for (; ; ) {
        const n3 = s4(e5);
        if (!n3 || n3 === t7) break;
        a6(n3);
      }
    }
    const u3 = s4(e5), p3 = i4(e5);
    return a6(e5), n2(null, t6, p3, u3, r5, o6, getContainerType(p3), l4), r5 && (r5.vnode.el = t6.el, updateHOCHostEl(r5, t6.el)), u3;
  }, "handleMismatch"), locateClosingAnchor = /* @__PURE__ */ __name((e5, t6 = "[", n3 = "]") => {
    let r5 = 0;
    for (; e5; ) if ((e5 = s4(e5)) && isComment(e5) && (e5.data === t6 && r5++, e5.data === n3)) {
      if (0 === r5) return s4(e5);
      r5--;
    }
    return e5;
  }, "locateClosingAnchor"), replaceNode = /* @__PURE__ */ __name((e5, t6, n3) => {
    const r5 = t6.parentNode;
    r5 && r5.replaceChild(e5, t6);
    let o6 = n3;
    for (; o6; ) o6.vnode.el === t6 && (o6.vnode.el = o6.subTree.el = e5), o6 = o6.parent;
  }, "replaceNode"), isTemplateNode2 = /* @__PURE__ */ __name((e5) => 1 === e5.nodeType && "TEMPLATE" === e5.tagName, "isTemplateNode");
  return [(e5, t6) => {
    if (!t6.hasChildNodes()) return n2(null, e5, t6), flushPostFlushCbs(), void (t6._vnode = e5);
    hydrateNode(t6.firstChild, e5, null, null, null), flushPostFlushCbs(), t6._vnode = e5;
  }, hydrateNode];
}
function isMismatchAllowed(e4, t5) {
  if (0 === t5 || 1 === t5) for (; e4 && !e4.hasAttribute(At2); ) e4 = e4.parentElement;
  const n2 = e4 && e4.getAttribute(At2);
  if (null == n2) return false;
  if ("" === n2) return true;
  {
    const e5 = n2.split(",");
    return !(0 !== t5 || !e5.includes("children")) || e5.includes(xt2[t5]);
  }
}
function createInnerComp(e4, t5) {
  const { ref: n2, props: r4, children: o5, ce: s4 } = t5.vnode, i4 = createVNode(e4, r4, o5);
  return i4.ref = n2, i4.ce = s4, delete t5.vnode.ce, i4;
}
function matches(e4, t5) {
  return i(e4) ? e4.some((e5) => matches(e5, t5)) : isString(e4) ? e4.split(",").includes(t5) : !!isRegExp(e4) && (e4.lastIndex = 0, e4.test(t5));
}
function onActivated(e4, t5) {
  registerKeepAliveHook(e4, "a", t5);
}
function onDeactivated(e4, t5) {
  registerKeepAliveHook(e4, "da", t5);
}
function registerKeepAliveHook(e4, t5, n2 = fn) {
  const r4 = e4.__wdc || (e4.__wdc = () => {
    let t6 = n2;
    for (; t6; ) {
      if (t6.isDeactivated) return;
      t6 = t6.parent;
    }
    return e4();
  });
  if (injectHook(t5, r4, n2), n2) {
    let e5 = n2.parent;
    for (; e5 && e5.parent; ) isKeepAlive(e5.parent.vnode) && injectToKeepAliveRoot(r4, t5, n2, e5), e5 = e5.parent;
  }
}
function injectToKeepAliveRoot(e4, t5, n2, r4) {
  const o5 = injectHook(t5, e4, r4, true);
  Lt2(() => {
    remove(r4[t5], o5);
  }, n2);
}
function resetShapeFlag(e4) {
  e4.shapeFlag &= -257, e4.shapeFlag &= -513;
}
function getInnerChild(e4) {
  return 128 & e4.shapeFlag ? e4.ssContent : e4;
}
function injectHook(e4, t5, n2 = fn, r4 = false) {
  if (n2) {
    const o5 = n2[e4] || (n2[e4] = []), s4 = t5.__weh || (t5.__weh = (...r5) => {
      pauseTracking();
      const o6 = setCurrentInstance(n2), s5 = callWithAsyncErrorHandling(t5, n2, e4, r5);
      return o6(), resetTracking(), s5;
    });
    return r4 ? o5.unshift(s4) : o5.push(s4), s4;
  }
}
function onErrorCaptured(e4, t5 = fn) {
  injectHook("ec", e4, t5);
}
function resolveAsset(e4, t5, n2 = true, r4 = false) {
  const o5 = gt2 || fn;
  if (o5) {
    const n3 = o5.type;
    if (e4 === Ft2) {
      const e5 = getComponentName(n3, false);
      if (e5 && (e5 === t5 || e5 === p(t5) || e5 === f(p(t5)))) return n3;
    }
    const s4 = resolve(o5[e4] || n3[e4], t5) || resolve(o5.appContext[e4], t5);
    return !s4 && r4 ? n3 : s4;
  }
}
function resolve(e4, t5) {
  return e4 && (e4[t5] || e4[p(t5)] || e4[f(p(t5))]);
}
function ensureValidVNode$1(e4) {
  return e4.some((e5) => !isVNode$2(e5) || e5.type !== sn2 && !(e5.type === rn2 && !ensureValidVNode$1(e5.children))) ? e4 : null;
}
function getContext2(e4) {
  const t5 = getCurrentInstance();
  return t5.setupContext || (t5.setupContext = createSetupContext(t5));
}
function normalizePropsOrEmits(e4) {
  return i(e4) ? e4.reduce((e5, t5) => (e5[t5] = null, e5), {}) : e4;
}
function applyOptions(e4) {
  const t5 = resolveMergedOptions(e4), n2 = e4.proxy, r4 = e4.ctx;
  qt2 = false, t5.beforeCreate && callHook$1(t5.beforeCreate, e4, "bc");
  const { data: o5, computed: s4, methods: i4, watch: a6, provide: l3, inject: c4, created: u3, beforeMount: p3, mounted: g4, beforeUpdate: m3, updated: y4, activated: v3, deactivated: b4, beforeDestroy: C3, beforeUnmount: k3, destroyed: S3, unmounted: T3, render: w3, renderTracked: R3, renderTriggered: x4, errorCaptured: E3, serverPrefetch: P3, expose: $2, inheritAttrs: N3, components: O3, directives: V2, filters: H2 } = t5;
  if (c4 && (function(e5, t6) {
    i(e5) && (e5 = normalizeInject(e5));
    for (const n3 in e5) {
      const r5 = e5[n3];
      let o6;
      o6 = isObject(r5) ? "default" in r5 ? inject(r5.from || n3, r5.default, true) : inject(r5.from || n3) : inject(r5), isRef2(o6) ? Object.defineProperty(t6, n3, { enumerable: true, configurable: true, get: /* @__PURE__ */ __name(() => o6.value, "get"), set: /* @__PURE__ */ __name((e6) => o6.value = e6, "set") }) : t6[n3] = o6;
    }
  })(c4, r4, null), i4) for (const e5 in i4) {
    const t6 = i4[e5];
    isFunction(t6) && (r4[e5] = t6.bind(n2));
  }
  if (o5) {
    const t6 = o5.call(n2, n2);
    isObject(t6) && (e4.data = reactive(t6));
  }
  if (qt2 = true, s4) for (const e5 in s4) {
    const t6 = s4[e5], o6 = isFunction(t6) ? t6.bind(n2, n2) : isFunction(t6.get) ? t6.get.bind(n2, n2) : NOOP, i5 = !isFunction(t6) && isFunction(t6.set) ? t6.set.bind(n2) : NOOP, a7 = computed({ get: o6, set: i5 });
    Object.defineProperty(r4, e5, { enumerable: true, configurable: true, get: /* @__PURE__ */ __name(() => a7.value, "get"), set: /* @__PURE__ */ __name((e6) => a7.value = e6, "set") });
  }
  if (a6) for (const e5 in a6) createWatcher(a6[e5], r4, n2, e5);
  if (l3) {
    const e5 = isFunction(l3) ? l3.call(n2) : l3;
    Reflect.ownKeys(e5).forEach((t6) => {
      provide(t6, e5[t6]);
    });
  }
  function registerLifecycleHook(e5, t6) {
    i(t6) ? t6.forEach((t7) => e5(t7.bind(n2))) : t6 && e5(t6.bind(n2));
  }
  __name(registerLifecycleHook, "registerLifecycleHook");
  if (u3 && callHook$1(u3, e4, "c"), registerLifecycleHook(Nt2, p3), registerLifecycleHook(Ot2, g4), registerLifecycleHook(Vt2, m3), registerLifecycleHook(Ht2, y4), registerLifecycleHook(onActivated, v3), registerLifecycleHook(onDeactivated, b4), registerLifecycleHook(onErrorCaptured, E3), registerLifecycleHook(jt2, R3), registerLifecycleHook(Dt2, x4), registerLifecycleHook(Mt2, k3), registerLifecycleHook(Lt2, T3), registerLifecycleHook(It2, P3), i($2)) if ($2.length) {
    const t6 = e4.exposed || (e4.exposed = {});
    $2.forEach((e5) => {
      Object.defineProperty(t6, e5, { get: /* @__PURE__ */ __name(() => n2[e5], "get"), set: /* @__PURE__ */ __name((t7) => n2[e5] = t7, "set"), enumerable: true });
    });
  } else e4.exposed || (e4.exposed = {});
  w3 && e4.render === NOOP && (e4.render = w3), null != N3 && (e4.inheritAttrs = N3), O3 && (e4.components = O3), V2 && (e4.directives = V2), P3 && markAsyncBoundary(e4);
}
function callHook$1(e4, t5, n2) {
  callWithAsyncErrorHandling(i(e4) ? e4.map((e5) => e5.bind(t5.proxy)) : e4.bind(t5.proxy), t5, n2);
}
function createWatcher(e4, t5, n2, r4) {
  let o5 = r4.includes(".") ? createPathGetter(n2, r4) : () => n2[r4];
  if (isString(e4)) {
    const n3 = t5[e4];
    isFunction(n3) && watch(o5, n3);
  } else if (isFunction(e4)) watch(o5, e4.bind(n2));
  else if (isObject(e4)) if (i(e4)) e4.forEach((e5) => createWatcher(e5, t5, n2, r4));
  else {
    const r5 = isFunction(e4.handler) ? e4.handler.bind(n2) : t5[e4.handler];
    isFunction(r5) && watch(o5, r5, e4);
  }
}
function resolveMergedOptions(e4) {
  const t5 = e4.type, { mixins: n2, extends: r4 } = t5, { mixins: o5, optionsCache: s4, config: { optionMergeStrategies: i4 } } = e4.appContext, a6 = s4.get(t5);
  let l3;
  return a6 ? l3 = a6 : o5.length || n2 || r4 ? (l3 = {}, o5.length && o5.forEach((e5) => mergeOptions(l3, e5, i4, true)), mergeOptions(l3, t5, i4)) : l3 = t5, isObject(t5) && s4.set(t5, l3), l3;
}
function mergeOptions(e4, t5, n2, r4 = false) {
  const { mixins: o5, extends: s4 } = t5;
  s4 && mergeOptions(e4, s4, n2, true), o5 && o5.forEach((t6) => mergeOptions(e4, t6, n2, true));
  for (const o6 in t5) if (r4 && "expose" === o6) ;
  else {
    const r5 = Kt2[o6] || n2 && n2[o6];
    e4[o6] = r5 ? r5(e4[o6], t5[o6]) : t5[o6];
  }
  return e4;
}
function mergeDataFn(e4, t5) {
  return t5 ? e4 ? function() {
    return n(isFunction(e4) ? e4.call(this, this) : e4, isFunction(t5) ? t5.call(this, this) : t5);
  } : t5 : e4;
}
function normalizeInject(e4) {
  if (i(e4)) {
    const t5 = {};
    for (let n2 = 0; n2 < e4.length; n2++) t5[e4[n2]] = e4[n2];
    return t5;
  }
  return e4;
}
function mergeAsArray2(e4, t5) {
  return e4 ? [...new Set([].concat(e4, t5))] : t5;
}
function mergeObjectOptions(e4, t5) {
  return e4 ? n(/* @__PURE__ */ Object.create(null), e4, t5) : t5;
}
function mergeEmitsOrPropsOptions(e4, t5) {
  return e4 ? i(e4) && i(t5) ? [.../* @__PURE__ */ new Set([...e4, ...t5])] : n(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(e4), normalizePropsOrEmits(null != t5 ? t5 : {})) : t5;
}
function createAppContext() {
  return { app: null, config: { isNativeTag: NO, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
function createAppAPI(e4, t5) {
  return function(n2, r4 = null) {
    isFunction(n2) || (n2 = n({}, n2)), null == r4 || isObject(r4) || (r4 = null);
    const o5 = createAppContext(), s4 = /* @__PURE__ */ new WeakSet(), i4 = [];
    let a6 = false;
    const l3 = o5.app = { _uid: Jt2++, _component: n2, _props: r4, _container: null, _context: o5, _instance: null, version: bn2, get config() {
      return o5.config;
    }, set config(e5) {
    }, use: /* @__PURE__ */ __name((e5, ...t6) => (s4.has(e5) || (e5 && isFunction(e5.install) ? (s4.add(e5), e5.install(l3, ...t6)) : isFunction(e5) && (s4.add(e5), e5(l3, ...t6))), l3), "use"), mixin: /* @__PURE__ */ __name((e5) => (o5.mixins.includes(e5) || o5.mixins.push(e5), l3), "mixin"), component: /* @__PURE__ */ __name((e5, t6) => t6 ? (o5.components[e5] = t6, l3) : o5.components[e5], "component"), directive: /* @__PURE__ */ __name((e5, t6) => t6 ? (o5.directives[e5] = t6, l3) : o5.directives[e5], "directive"), mount(s5, i5, c4) {
      if (!a6) {
        const u3 = l3._ceVNode || createVNode(n2, r4);
        return u3.appContext = o5, true === c4 ? c4 = "svg" : false === c4 && (c4 = void 0), i5 && t5 ? t5(u3, s5) : e4(u3, s5, c4), a6 = true, l3._container = s5, s5.__vue_app__ = l3, getComponentPublicInstance(u3.component);
      }
    }, onUnmount(e5) {
      i4.push(e5);
    }, unmount() {
      a6 && (callWithAsyncErrorHandling(i4, l3._instance, 16), e4(null, l3._container), delete l3._container.__vue_app__);
    }, provide: /* @__PURE__ */ __name((e5, t6) => (o5.provides[e5] = t6, l3), "provide"), runWithContext(e5) {
      const t6 = Gt2;
      Gt2 = l3;
      try {
        return e5();
      } finally {
        Gt2 = t6;
      }
    } };
    return l3;
  };
}
function provide(e4, t5) {
  if (fn) {
    let n2 = fn.provides;
    const r4 = fn.parent && fn.parent.provides;
    r4 === n2 && (n2 = fn.provides = Object.create(r4)), n2[e4] = t5;
  }
}
function inject(e4, t5, n2 = false) {
  const r4 = getCurrentInstance();
  if (r4 || Gt2) {
    let o5 = Gt2 ? Gt2._context.provides : r4 ? null == r4.parent || r4.ce ? r4.vnode.appContext && r4.vnode.appContext.provides : r4.parent.provides : void 0;
    if (o5 && e4 in o5) return o5[e4];
    if (arguments.length > 1) return n2 && isFunction(t5) ? t5.call(r4 && r4.proxy) : t5;
  }
}
function hasInjectionContext() {
  return !(!getCurrentInstance() && !Gt2);
}
function watchEffect(e4, t5) {
  return doWatch(e4, null, t5);
}
function watchSyncEffect(e4, t5) {
  return doWatch(e4, null, { flush: "sync" });
}
function watch(e4, t5, n2) {
  return doWatch(e4, t5, n2);
}
function doWatch(e4, t5, n2 = t) {
  const { immediate: r4, deep: o5, flush: s4, once: i4 } = n2, a6 = n({}, n2), l3 = t5 && r4 || !t5 && "post" !== s4;
  let c4;
  if (vn2) {
    if ("sync" === s4) {
      const e5 = useSSRContext();
      c4 = e5.__watcherHandles || (e5.__watcherHandles = []);
    } else if (!l3) {
      const watchStopHandle = /* @__PURE__ */ __name(() => {
      }, "watchStopHandle");
      return watchStopHandle.stop = NOOP, watchStopHandle.resume = NOOP, watchStopHandle.pause = NOOP, watchStopHandle;
    }
  }
  const u3 = fn;
  a6.call = (e5, t6, n3) => callWithAsyncErrorHandling(e5, u3, t6, n3);
  let p3 = false;
  "post" === s4 ? a6.scheduler = (e5) => {
    en2(e5, u3 && u3.suspense);
  } : "sync" !== s4 && (p3 = true, a6.scheduler = (e5, t6) => {
    t6 ? e5() : queueJob(e5);
  }), a6.augmentJob = (e5) => {
    t5 && (e5.flags |= 4), p3 && (e5.flags |= 2, u3 && (e5.id = u3.uid, e5.i = u3));
  };
  const f3 = (function(e5, t6, n3 = t) {
    const { immediate: r5, deep: o6, once: s5, scheduler: i5, augmentJob: a7, call: l4 } = n3, reactiveGetter = /* @__PURE__ */ __name((e6) => o6 ? e6 : isShallow(e6) || false === o6 || 0 === o6 ? traverse(e6, 1) : traverse(e6), "reactiveGetter");
    let c5, u4, p4, f4, g4 = false, m3 = false;
    if (isRef2(e5) ? (u4 = /* @__PURE__ */ __name(() => e5.value, "u"), g4 = isShallow(e5)) : isReactive(e5) ? (u4 = /* @__PURE__ */ __name(() => reactiveGetter(e5), "u"), g4 = true) : i(e5) ? (m3 = true, g4 = e5.some((e6) => isReactive(e6) || isShallow(e6)), u4 = /* @__PURE__ */ __name(() => e5.map((e6) => isRef2(e6) ? e6.value : isReactive(e6) ? reactiveGetter(e6) : isFunction(e6) ? l4 ? l4(e6, 2) : e6() : void 0), "u")) : u4 = isFunction(e5) ? t6 ? l4 ? () => l4(e5, 2) : e5 : () => {
      if (p4) {
        pauseTracking();
        try {
          p4();
        } finally {
          resetTracking();
        }
      }
      const t7 = rt2;
      rt2 = c5;
      try {
        return l4 ? l4(e5, 3, [f4]) : e5(f4);
      } finally {
        rt2 = t7;
      }
    } : NOOP, t6 && o6) {
      const e6 = u4, t7 = true === o6 ? 1 / 0 : o6;
      u4 = /* @__PURE__ */ __name(() => traverse(e6(), t7), "u");
    }
    const y4 = getCurrentScope(), watchHandle = /* @__PURE__ */ __name(() => {
      c5.stop(), y4 && y4.active && remove(y4.effects, c5);
    }, "watchHandle");
    if (s5 && t6) {
      const e6 = t6;
      t6 = /* @__PURE__ */ __name((...t7) => {
        e6(...t7), watchHandle();
      }, "t");
    }
    let b4 = m3 ? new Array(e5.length).fill(tt2) : tt2;
    const job = /* @__PURE__ */ __name((e6) => {
      if (1 & c5.flags && (c5.dirty || e6)) if (t6) {
        const e7 = c5.run();
        if (o6 || g4 || (m3 ? e7.some((e8, t7) => hasChanged(e8, b4[t7])) : hasChanged(e7, b4))) {
          p4 && p4();
          const n4 = rt2;
          rt2 = c5;
          try {
            const n5 = [e7, b4 === tt2 ? void 0 : m3 && b4[0] === tt2 ? [] : b4, f4];
            b4 = e7, l4 ? l4(t6, 3, n5) : t6(...n5);
          } finally {
            rt2 = n4;
          }
        }
      } else c5.run();
    }, "job");
    return a7 && a7(job), c5 = new ReactiveEffect(u4), c5.scheduler = i5 ? () => i5(job, false) : job, f4 = /* @__PURE__ */ __name((e6) => onWatcherCleanup(e6, false, c5), "f"), p4 = c5.onStop = () => {
      const e6 = nt2.get(c5);
      if (e6) {
        if (l4) l4(e6, 4);
        else for (const t7 of e6) t7();
        nt2.delete(c5);
      }
    }, t6 ? r5 ? job(true) : b4 = c5.run() : i5 ? i5(job.bind(null, true), true) : c5.run(), watchHandle.pause = c5.pause.bind(c5), watchHandle.resume = c5.resume.bind(c5), watchHandle.stop = watchHandle, watchHandle;
  })(e4, t5, a6);
  return vn2 && (c4 ? c4.push(f3) : l3 && f3()), f3;
}
function instanceWatch(e4, t5, n2) {
  const r4 = this.proxy, o5 = isString(e4) ? e4.includes(".") ? createPathGetter(r4, e4) : () => r4[e4] : e4.bind(r4, r4);
  let s4;
  isFunction(t5) ? s4 = t5 : (s4 = t5.handler, n2 = t5);
  const i4 = setCurrentInstance(this), a6 = doWatch(o5, s4.bind(r4), n2);
  return i4(), a6;
}
function createPathGetter(e4, t5) {
  const n2 = t5.split(".");
  return () => {
    let t6 = e4;
    for (let e5 = 0; e5 < n2.length && t6; e5++) t6 = t6[n2[e5]];
    return t6;
  };
}
function emit2(e4, t5, ...n2) {
  if (e4.isUnmounted) return;
  const r4 = e4.vnode.props || t;
  let o5 = n2;
  const s4 = t5.startsWith("update:"), i4 = s4 && getModelModifiers(r4, t5.slice(7));
  let a6;
  i4 && (i4.trim && (o5 = n2.map((e5) => isString(e5) ? e5.trim() : e5)), i4.number && (o5 = n2.map(looseToNumber)));
  let l3 = r4[a6 = u(t5)] || r4[a6 = u(p(t5))];
  !l3 && s4 && (l3 = r4[a6 = u(d(t5))]), l3 && callWithAsyncErrorHandling(l3, e4, 6, o5);
  const c4 = r4[a6 + "Once"];
  if (c4) {
    if (e4.emitted) {
      if (e4.emitted[a6]) return;
    } else e4.emitted = {};
    e4.emitted[a6] = true, callWithAsyncErrorHandling(c4, e4, 6, o5);
  }
}
function normalizeEmitsOptions(e4, t5, n2 = false) {
  const r4 = n2 ? Xt2 : t5.emitsCache, o5 = r4.get(e4);
  if (void 0 !== o5) return o5;
  const s4 = e4.emits;
  let i4 = {}, a6 = false;
  if (!isFunction(e4)) {
    const extendEmits = /* @__PURE__ */ __name((e5) => {
      const n3 = normalizeEmitsOptions(e5, t5, true);
      n3 && (a6 = true, n(i4, n3));
    }, "extendEmits");
    !n2 && t5.mixins.length && t5.mixins.forEach(extendEmits), e4.extends && extendEmits(e4.extends), e4.mixins && e4.mixins.forEach(extendEmits);
  }
  return s4 || a6 ? (i(s4) ? s4.forEach((e5) => i4[e5] = null) : n(i4, s4), isObject(e4) && r4.set(e4, i4), i4) : (isObject(e4) && r4.set(e4, null), null);
}
function isEmitListener(e4, t5) {
  return !(!e4 || !isOn(t5)) && (t5 = t5.slice(2).replace(/Once$/, ""), hasOwn(e4, t5[0].toLowerCase() + t5.slice(1)) || hasOwn(e4, d(t5)) || hasOwn(e4, t5));
}
function renderComponentRoot$1(e4) {
  const { type: t5, vnode: n2, proxy: r4, withProxy: o5, propsOptions: [s4], slots: i4, attrs: a6, emit: l3, render: c4, renderCache: u3, props: p3, data: d3, setupState: f3, ctx: g4, inheritAttrs: m3 } = e4, y4 = setCurrentRenderingInstance$1(e4);
  let v3, _3;
  try {
    if (4 & n2.shapeFlag) {
      const e5 = o5 || r4, t6 = e5;
      v3 = normalizeVNode$1(c4.call(t6, e5, u3, p3, f3, d3, g4)), _3 = a6;
    } else {
      const e5 = t5;
      0, v3 = normalizeVNode$1(e5.length > 1 ? e5(p3, { attrs: a6, slots: i4, emit: l3 }) : e5(p3, null)), _3 = t5.props ? a6 : getFunctionalFallthrough(a6);
    }
  } catch (t6) {
    ln2.length = 0, handleError(t6, e4, 1), v3 = createVNode(sn2);
  }
  let b4 = v3;
  if (_3 && false !== m3) {
    const e5 = Object.keys(_3), { shapeFlag: t6 } = b4;
    e5.length && 7 & t6 && (s4 && e5.some(isModelListener) && (_3 = filterModelListeners(_3, s4)), b4 = cloneVNode(b4, _3, false, true));
  }
  return n2.dirs && (b4 = cloneVNode(b4, null, false, true), b4.dirs = b4.dirs ? b4.dirs.concat(n2.dirs) : n2.dirs), n2.transition && setTransitionHooks(b4, n2.transition), v3 = b4, setCurrentRenderingInstance$1(y4), v3;
}
function hasPropsChanged(e4, t5, n2) {
  const r4 = Object.keys(t5);
  if (r4.length !== Object.keys(e4).length) return true;
  for (let o5 = 0; o5 < r4.length; o5++) {
    const s4 = r4[o5];
    if (t5[s4] !== e4[s4] && !isEmitListener(n2, s4)) return true;
  }
  return false;
}
function updateHOCHostEl({ vnode: e4, parent: t5 }, n2) {
  for (; t5; ) {
    const r4 = t5.subTree;
    if (r4.suspense && r4.suspense.activeBranch === e4 && (r4.el = e4.el), r4 !== e4) break;
    (e4 = t5.vnode).el = n2, t5 = t5.parent;
  }
}
function setFullProps(e4, t5, n2, r4) {
  const [o5, s4] = e4.propsOptions;
  let i4, a6 = false;
  if (t5) for (let l3 in t5) {
    if (s(l3)) continue;
    const c4 = t5[l3];
    let u3;
    o5 && hasOwn(o5, u3 = p(l3)) ? s4 && s4.includes(u3) ? (i4 || (i4 = {}))[u3] = c4 : n2[u3] = c4 : isEmitListener(e4.emitsOptions, l3) || l3 in r4 && c4 === r4[l3] || (r4[l3] = c4, a6 = true);
  }
  if (s4) {
    const t6 = toRaw(n2), r5 = i4 || t;
    for (let i5 = 0; i5 < s4.length; i5++) {
      const a7 = s4[i5];
      n2[a7] = resolvePropValue(o5, t6, a7, r5[a7], e4, !hasOwn(r5, a7));
    }
  }
  return a6;
}
function resolvePropValue(e4, t5, n2, r4, o5, s4) {
  const i4 = e4[n2];
  if (null != i4) {
    const e5 = hasOwn(i4, "default");
    if (e5 && void 0 === r4) {
      const e6 = i4.default;
      if (i4.type !== Function && !i4.skipFactory && isFunction(e6)) {
        const { propsDefaults: s5 } = o5;
        if (n2 in s5) r4 = s5[n2];
        else {
          const i5 = setCurrentInstance(o5);
          r4 = s5[n2] = e6.call(null, t5), i5();
        }
      } else r4 = e6;
      o5.ce && o5.ce._setProp(n2, r4);
    }
    i4[0] && (s4 && !e5 ? r4 = false : !i4[1] || "" !== r4 && r4 !== d(n2) || (r4 = true));
  }
  return r4;
}
function normalizePropsOptions(e4, t5, n2 = false) {
  const r4 = n2 ? Qt2 : t5.propsCache, o5 = r4.get(e4);
  if (o5) return o5;
  const s4 = e4.props, i4 = {}, a6 = [];
  let l3 = false;
  if (!isFunction(e4)) {
    const extendProps = /* @__PURE__ */ __name((e5) => {
      l3 = true;
      const [n3, r5] = normalizePropsOptions(e5, t5, true);
      n(i4, n3), r5 && a6.push(...r5);
    }, "extendProps");
    !n2 && t5.mixins.length && t5.mixins.forEach(extendProps), e4.extends && extendProps(e4.extends), e4.mixins && e4.mixins.forEach(extendProps);
  }
  if (!s4 && !l3) return isObject(e4) && r4.set(e4, a), a;
  if (i(s4)) for (let e5 = 0; e5 < s4.length; e5++) {
    const t6 = p(s4[e5]);
    validatePropName(t6) && (i4[t6] = t);
  }
  else if (s4) for (const e5 in s4) {
    const t6 = p(e5);
    if (validatePropName(t6)) {
      const n3 = s4[e5], r5 = i4[t6] = i(n3) || isFunction(n3) ? { type: n3 } : n({}, n3), o6 = r5.type;
      let l4 = false, c5 = true;
      if (i(o6)) for (let e6 = 0; e6 < o6.length; ++e6) {
        const t7 = o6[e6], n4 = isFunction(t7) && t7.name;
        if ("Boolean" === n4) {
          l4 = true;
          break;
        }
        "String" === n4 && (c5 = false);
      }
      else l4 = isFunction(o6) && "Boolean" === o6.name;
      r5[0] = l4, r5[1] = c5, (l4 || hasOwn(r5, "default")) && a6.push(t6);
    }
  }
  const c4 = [i4, a6];
  return isObject(e4) && r4.set(e4, c4), c4;
}
function validatePropName(e4) {
  return "$" !== e4[0] && !s(e4);
}
function createRenderer(e4) {
  return baseCreateRenderer(e4);
}
function createHydrationRenderer(e4) {
  return baseCreateRenderer(e4, createHydrationFunctions);
}
function baseCreateRenderer(e4, t5) {
  getGlobalThis().__VUE__ = true;
  const { insert: n2, remove: r4, patchProp: o5, createElement: s4, createText: i4, createComment: a6, setText: l3, setElementText: c4, parentNode: u3, nextSibling: p3, setScopeId: d3 = NOOP, insertStaticContent: f3 } = e4, patch = /* @__PURE__ */ __name((e5, t6, n3, r5 = null, o6 = null, s5 = null, i5 = void 0, a7 = null, l4 = !!t6.dynamicChildren) => {
    if (e5 === t6) return;
    e5 && !isSameVNodeType(e5, t6) && (r5 = getNextHostNode(e5), unmount(e5, o6, s5, true), e5 = null), -2 === t6.patchFlag && (l4 = false, t6.dynamicChildren = null);
    const { type: c5, ref: u4, shapeFlag: p4 } = t6;
    switch (c5) {
      case on3:
        processText(e5, t6, n3, r5);
        break;
      case sn2:
        processCommentNode(e5, t6, n3, r5);
        break;
      case an2:
        null == e5 && mountStaticNode(t6, n3, r5, i5);
        break;
      case rn2:
        processFragment(e5, t6, n3, r5, o6, s5, i5, a7, l4);
        break;
      default:
        1 & p4 ? processElement(e5, t6, n3, r5, o6, s5, i5, a7, l4) : 6 & p4 ? processComponent(e5, t6, n3, r5, o6, s5, i5, a7, l4) : (64 & p4 || 128 & p4) && c5.process(e5, t6, n3, r5, o6, s5, i5, a7, l4, y4);
    }
    null != u4 && o6 ? setRef(u4, e5 && e5.ref, s5, t6 || e5, !t6) : null == u4 && e5 && null != e5.ref && setRef(e5.ref, null, s5, e5, true);
  }, "patch"), processText = /* @__PURE__ */ __name((e5, t6, r5, o6) => {
    if (null == e5) n2(t6.el = i4(t6.children), r5, o6);
    else {
      const n3 = t6.el = e5.el;
      t6.children !== e5.children && l3(n3, t6.children);
    }
  }, "processText"), processCommentNode = /* @__PURE__ */ __name((e5, t6, r5, o6) => {
    null == e5 ? n2(t6.el = a6(t6.children || ""), r5, o6) : t6.el = e5.el;
  }, "processCommentNode"), mountStaticNode = /* @__PURE__ */ __name((e5, t6, n3, r5) => {
    [e5.el, e5.anchor] = f3(e5.children, t6, n3, r5, e5.el, e5.anchor);
  }, "mountStaticNode"), processElement = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, s5, i5, a7, l4) => {
    if ("svg" === t6.type ? i5 = "svg" : "math" === t6.type && (i5 = "mathml"), null == e5) mountElement(t6, n3, r5, o6, s5, i5, a7, l4);
    else {
      const n4 = e5.el && e5.el._isVueCE ? e5.el : null;
      try {
        n4 && n4._beginPatch(), patchElement(e5, t6, o6, s5, i5, a7, l4);
      } finally {
        n4 && n4._endPatch();
      }
    }
  }, "processElement"), mountElement = /* @__PURE__ */ __name((e5, t6, r5, i5, a7, l4, u4, p4) => {
    let d4, f4;
    const { props: g5, shapeFlag: m3, transition: y5, dirs: v3 } = e5;
    if (d4 = e5.el = s4(e5.type, l4, g5 && g5.is, g5), 8 & m3 ? c4(d4, e5.children) : 16 & m3 && mountChildren(e5.children, d4, null, i5, a7, resolveChildrenNamespace(e5, l4), u4, p4), v3 && invokeDirectiveHook(e5, null, i5, "created"), setScopeId(d4, e5, e5.scopeId, u4, i5), g5) {
      for (const e6 in g5) "value" === e6 || s(e6) || o5(d4, e6, null, g5[e6], l4, i5);
      "value" in g5 && o5(d4, "value", null, g5.value, l4), (f4 = g5.onVnodeBeforeMount) && invokeVNodeHook(f4, i5, e5);
    }
    v3 && invokeDirectiveHook(e5, null, i5, "beforeMount");
    const _4 = needTransition(a7, y5);
    _4 && y5.beforeEnter(d4), n2(d4, t6, r5), ((f4 = g5 && g5.onVnodeMounted) || _4 || v3) && en2(() => {
      f4 && invokeVNodeHook(f4, i5, e5), _4 && y5.enter(d4), v3 && invokeDirectiveHook(e5, null, i5, "mounted");
    }, a7);
  }, "mountElement"), setScopeId = /* @__PURE__ */ __name((e5, t6, n3, r5, o6) => {
    if (n3 && d3(e5, n3), r5) for (let t7 = 0; t7 < r5.length; t7++) d3(e5, r5[t7]);
    if (o6) {
      let n4 = o6.subTree;
      if (t6 === n4 || isSuspense(n4.type) && (n4.ssContent === t6 || n4.ssFallback === t6)) {
        const t7 = o6.vnode;
        setScopeId(e5, t7, t7.scopeId, t7.slotScopeIds, o6.parent);
      }
    }
  }, "setScopeId"), mountChildren = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, s5, i5, a7, l4 = 0) => {
    for (let c5 = l4; c5 < e5.length; c5++) {
      const l5 = e5[c5] = a7 ? cloneIfMounted(e5[c5]) : normalizeVNode$1(e5[c5]);
      patch(null, l5, t6, n3, r5, o6, s5, i5, a7);
    }
  }, "mountChildren"), patchElement = /* @__PURE__ */ __name((e5, t6, n3, r5, s5, i5, a7) => {
    const l4 = t6.el = e5.el;
    let { patchFlag: u4, dynamicChildren: p4, dirs: d4 } = t6;
    u4 |= 16 & e5.patchFlag;
    const f4 = e5.props || t, g5 = t6.props || t;
    let m3;
    if (n3 && toggleRecurse(n3, false), (m3 = g5.onVnodeBeforeUpdate) && invokeVNodeHook(m3, n3, t6, e5), d4 && invokeDirectiveHook(t6, e5, n3, "beforeUpdate"), n3 && toggleRecurse(n3, true), (f4.innerHTML && null == g5.innerHTML || f4.textContent && null == g5.textContent) && c4(l4, ""), p4 ? patchBlockChildren(e5.dynamicChildren, p4, l4, n3, r5, resolveChildrenNamespace(t6, s5), i5) : a7 || patchChildren(e5, t6, l4, null, n3, r5, resolveChildrenNamespace(t6, s5), i5, false), u4 > 0) {
      if (16 & u4) patchProps(l4, f4, g5, n3, s5);
      else if (2 & u4 && f4.class !== g5.class && o5(l4, "class", null, g5.class, s5), 4 & u4 && o5(l4, "style", f4.style, g5.style, s5), 8 & u4) {
        const e6 = t6.dynamicProps;
        for (let t7 = 0; t7 < e6.length; t7++) {
          const r6 = e6[t7], i6 = f4[r6], a8 = g5[r6];
          a8 === i6 && "value" !== r6 || o5(l4, r6, i6, a8, s5, n3);
        }
      }
      1 & u4 && e5.children !== t6.children && c4(l4, t6.children);
    } else a7 || null != p4 || patchProps(l4, f4, g5, n3, s5);
    ((m3 = g5.onVnodeUpdated) || d4) && en2(() => {
      m3 && invokeVNodeHook(m3, n3, t6, e5), d4 && invokeDirectiveHook(t6, e5, n3, "updated");
    }, r5);
  }, "patchElement"), patchBlockChildren = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, s5, i5) => {
    for (let a7 = 0; a7 < t6.length; a7++) {
      const l4 = e5[a7], c5 = t6[a7], p4 = l4.el && (l4.type === rn2 || !isSameVNodeType(l4, c5) || 198 & l4.shapeFlag) ? u3(l4.el) : n3;
      patch(l4, c5, p4, null, r5, o6, s5, i5, true);
    }
  }, "patchBlockChildren"), patchProps = /* @__PURE__ */ __name((e5, t6, n3, r5, s5) => {
    if (t6 !== n3) {
      if (t6 !== t) for (const i5 in t6) s(i5) || i5 in n3 || o5(e5, i5, t6[i5], null, s5, r5);
      for (const i5 in n3) {
        if (s(i5)) continue;
        const a7 = n3[i5], l4 = t6[i5];
        a7 !== l4 && "value" !== i5 && o5(e5, i5, l4, a7, s5, r5);
      }
      "value" in n3 && o5(e5, "value", t6.value, n3.value, s5);
    }
  }, "patchProps"), processFragment = /* @__PURE__ */ __name((e5, t6, r5, o6, s5, a7, l4, c5, u4) => {
    const p4 = t6.el = e5 ? e5.el : i4(""), d4 = t6.anchor = e5 ? e5.anchor : i4("");
    let { patchFlag: f4, dynamicChildren: g5, slotScopeIds: m3 } = t6;
    m3 && (c5 = c5 ? c5.concat(m3) : m3), null == e5 ? (n2(p4, r5, o6), n2(d4, r5, o6), mountChildren(t6.children || [], r5, d4, s5, a7, l4, c5, u4)) : f4 > 0 && 64 & f4 && g5 && e5.dynamicChildren ? (patchBlockChildren(e5.dynamicChildren, g5, r5, s5, a7, l4, c5), (null != t6.key || s5 && t6 === s5.subTree) && traverseStaticChildren(e5, t6, true)) : patchChildren(e5, t6, r5, d4, s5, a7, l4, c5, u4);
  }, "processFragment"), processComponent = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, s5, i5, a7, l4) => {
    t6.slotScopeIds = a7, null == e5 ? 512 & t6.shapeFlag ? o6.ctx.activate(t6, n3, r5, i5, l4) : mountComponent(t6, n3, r5, o6, s5, i5, l4) : updateComponent(e5, t6, l4);
  }, "processComponent"), mountComponent = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, s5, i5) => {
    const a7 = e5.component = createComponentInstance$1(e5, r5, o6);
    if (isKeepAlive(e5) && (a7.ctx.renderer = y4), setupComponent$1(a7, false, i5), a7.asyncDep) {
      if (o6 && o6.registerDep(a7, setupRenderEffect, i5), !e5.el) {
        const r6 = a7.subTree = createVNode(sn2);
        processCommentNode(null, r6, t6, n3), e5.placeholder = r6.el;
      }
    } else setupRenderEffect(a7, e5, t6, n3, o6, s5, i5);
  }, "mountComponent"), updateComponent = /* @__PURE__ */ __name((e5, t6, n3) => {
    const r5 = t6.component = e5.component;
    if ((function(e6, t7, n4) {
      const { props: r6, children: o6, component: s5 } = e6, { props: i5, children: a7, patchFlag: l4 } = t7, c5 = s5.emitsOptions;
      if (t7.dirs || t7.transition) return true;
      if (!(n4 && l4 >= 0)) return !(!o6 && !a7 || a7 && a7.$stable) || r6 !== i5 && (r6 ? !i5 || hasPropsChanged(r6, i5, c5) : !!i5);
      if (1024 & l4) return true;
      if (16 & l4) return r6 ? hasPropsChanged(r6, i5, c5) : !!i5;
      if (8 & l4) {
        const e7 = t7.dynamicProps;
        for (let t8 = 0; t8 < e7.length; t8++) {
          const n5 = e7[t8];
          if (i5[n5] !== r6[n5] && !isEmitListener(c5, n5)) return true;
        }
      }
      return false;
    })(e5, t6, n3)) {
      if (r5.asyncDep && !r5.asyncResolved) return void updateComponentPreRender(r5, t6, n3);
      r5.next = t6, r5.update();
    } else t6.el = e5.el, r5.vnode = t6;
  }, "updateComponent"), setupRenderEffect = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, s5, i5) => {
    const componentUpdateFn = /* @__PURE__ */ __name(() => {
      if (e5.isMounted) {
        let { next: t7, bu: n4, u: r6, parent: a8, vnode: l5 } = e5;
        {
          const n5 = locateNonHydratedAsyncRoot(e5);
          if (n5) return t7 && (t7.el = l5.el, updateComponentPreRender(e5, t7, i5)), void n5.asyncDep.then(() => {
            e5.isUnmounted || componentUpdateFn();
          });
        }
        let c6, p4 = t7;
        toggleRecurse(e5, false), t7 ? (t7.el = l5.el, updateComponentPreRender(e5, t7, i5)) : t7 = l5, n4 && invokeArrayFns(n4), (c6 = t7.props && t7.props.onVnodeBeforeUpdate) && invokeVNodeHook(c6, a8, t7, l5), toggleRecurse(e5, true);
        const d4 = renderComponentRoot$1(e5), f4 = e5.subTree;
        e5.subTree = d4, patch(f4, d4, u3(f4.el), getNextHostNode(f4), e5, o6, s5), t7.el = d4.el, null === p4 && updateHOCHostEl(e5, d4.el), r6 && en2(r6, o6), (c6 = t7.props && t7.props.onVnodeUpdated) && en2(() => invokeVNodeHook(c6, a8, t7, l5), o6);
      } else {
        let i6;
        const { el: a8, props: l5 } = t6, { bm: c6, m: u4, parent: p4, root: d4, type: f4 } = e5, g5 = isAsyncWrapper(t6);
        if (toggleRecurse(e5, false), c6 && invokeArrayFns(c6), !g5 && (i6 = l5 && l5.onVnodeBeforeMount) && invokeVNodeHook(i6, p4, t6), toggleRecurse(e5, true), a8 && b4) {
          const hydrateSubTree = /* @__PURE__ */ __name(() => {
            e5.subTree = renderComponentRoot$1(e5), b4(a8, e5.subTree, e5, o6, null);
          }, "hydrateSubTree");
          g5 && f4.__asyncHydrate ? f4.__asyncHydrate(a8, e5, hydrateSubTree) : hydrateSubTree();
        } else {
          d4.ce && false !== d4.ce._def.shadowRoot && d4.ce._injectChildStyle(f4);
          const i7 = e5.subTree = renderComponentRoot$1(e5);
          patch(null, i7, n3, r5, e5, o6, s5), t6.el = i7.el;
        }
        if (u4 && en2(u4, o6), !g5 && (i6 = l5 && l5.onVnodeMounted)) {
          const e6 = t6;
          en2(() => invokeVNodeHook(i6, p4, e6), o6);
        }
        (256 & t6.shapeFlag || p4 && isAsyncWrapper(p4.vnode) && 256 & p4.vnode.shapeFlag) && e5.a && en2(e5.a, o6), e5.isMounted = true, t6 = n3 = r5 = null;
      }
    }, "componentUpdateFn");
    e5.scope.on();
    const a7 = e5.effect = new ReactiveEffect(componentUpdateFn);
    e5.scope.off();
    const l4 = e5.update = a7.run.bind(a7), c5 = e5.job = a7.runIfDirty.bind(a7);
    c5.i = e5, c5.id = e5.uid, a7.scheduler = () => queueJob(c5), toggleRecurse(e5, true), l4();
  }, "setupRenderEffect"), updateComponentPreRender = /* @__PURE__ */ __name((e5, t6, n3) => {
    t6.component = e5;
    const r5 = e5.vnode.props;
    e5.vnode = t6, e5.next = null, (function(e6, t7, n4, r6) {
      const { props: o6, attrs: s5, vnode: { patchFlag: i5 } } = e6, a7 = toRaw(o6), [l4] = e6.propsOptions;
      let c5 = false;
      if (!(r6 || i5 > 0) || 16 & i5) {
        let r7;
        setFullProps(e6, t7, o6, s5) && (c5 = true);
        for (const s6 in a7) t7 && (hasOwn(t7, s6) || (r7 = d(s6)) !== s6 && hasOwn(t7, r7)) || (l4 ? !n4 || void 0 === n4[s6] && void 0 === n4[r7] || (o6[s6] = resolvePropValue(l4, a7, s6, void 0, e6, true)) : delete o6[s6]);
        if (s5 !== a7) for (const e7 in s5) t7 && hasOwn(t7, e7) || (delete s5[e7], c5 = true);
      } else if (8 & i5) {
        const n5 = e6.vnode.dynamicProps;
        for (let r7 = 0; r7 < n5.length; r7++) {
          let i6 = n5[r7];
          if (isEmitListener(e6.emitsOptions, i6)) continue;
          const u4 = t7[i6];
          if (l4) if (hasOwn(s5, i6)) u4 !== s5[i6] && (s5[i6] = u4, c5 = true);
          else {
            const t8 = p(i6);
            o6[t8] = resolvePropValue(l4, a7, t8, u4, e6, false);
          }
          else u4 !== s5[i6] && (s5[i6] = u4, c5 = true);
        }
      }
      c5 && trigger(e6.attrs, "set", "");
    })(e5, t6.props, r5, n3), ((e6, t7, n4) => {
      const { vnode: r6, slots: o6 } = e6;
      let s5 = true, i5 = t;
      if (32 & r6.shapeFlag) {
        const e7 = t7._;
        e7 ? n4 && 1 === e7 ? s5 = false : assignSlots(o6, t7, n4) : (s5 = !t7.$stable, normalizeObjectSlots(t7, o6)), i5 = t7;
      } else t7 && (normalizeVNodeSlots(e6, t7), i5 = { default: 1 });
      if (s5) for (const e7 in o6) isInternalKey(e7) || null != i5[e7] || delete o6[e7];
    })(e5, t6.children, n3), pauseTracking(), flushPreFlushCbs(e5), resetTracking();
  }, "updateComponentPreRender"), patchChildren = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, s5, i5, a7, l4 = false) => {
    const u4 = e5 && e5.children, p4 = e5 ? e5.shapeFlag : 0, d4 = t6.children, { patchFlag: f4, shapeFlag: g5 } = t6;
    if (f4 > 0) {
      if (128 & f4) return void patchKeyedChildren(u4, d4, n3, r5, o6, s5, i5, a7, l4);
      if (256 & f4) return void patchUnkeyedChildren(u4, d4, n3, r5, o6, s5, i5, a7, l4);
    }
    8 & g5 ? (16 & p4 && unmountChildren(u4, o6, s5), d4 !== u4 && c4(n3, d4)) : 16 & p4 ? 16 & g5 ? patchKeyedChildren(u4, d4, n3, r5, o6, s5, i5, a7, l4) : unmountChildren(u4, o6, s5, true) : (8 & p4 && c4(n3, ""), 16 & g5 && mountChildren(d4, n3, r5, o6, s5, i5, a7, l4));
  }, "patchChildren"), patchUnkeyedChildren = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, s5, i5, a7, l4) => {
    t6 = t6 || a;
    const c5 = (e5 = e5 || a).length, u4 = t6.length, p4 = Math.min(c5, u4);
    let d4;
    for (d4 = 0; d4 < p4; d4++) {
      const r6 = t6[d4] = l4 ? cloneIfMounted(t6[d4]) : normalizeVNode$1(t6[d4]);
      patch(e5[d4], r6, n3, null, o6, s5, i5, a7, l4);
    }
    c5 > u4 ? unmountChildren(e5, o6, s5, true, false, p4) : mountChildren(t6, n3, r5, o6, s5, i5, a7, l4, p4);
  }, "patchUnkeyedChildren"), patchKeyedChildren = /* @__PURE__ */ __name((e5, t6, n3, r5, o6, s5, i5, a7, l4) => {
    let c5 = 0;
    const u4 = t6.length;
    let p4 = e5.length - 1, d4 = u4 - 1;
    for (; c5 <= p4 && c5 <= d4; ) {
      const r6 = e5[c5], u5 = t6[c5] = l4 ? cloneIfMounted(t6[c5]) : normalizeVNode$1(t6[c5]);
      if (!isSameVNodeType(r6, u5)) break;
      patch(r6, u5, n3, null, o6, s5, i5, a7, l4), c5++;
    }
    for (; c5 <= p4 && c5 <= d4; ) {
      const r6 = e5[p4], c6 = t6[d4] = l4 ? cloneIfMounted(t6[d4]) : normalizeVNode$1(t6[d4]);
      if (!isSameVNodeType(r6, c6)) break;
      patch(r6, c6, n3, null, o6, s5, i5, a7, l4), p4--, d4--;
    }
    if (c5 > p4) {
      if (c5 <= d4) {
        const e6 = d4 + 1, p5 = e6 < u4 ? t6[e6].el : r5;
        for (; c5 <= d4; ) patch(null, t6[c5] = l4 ? cloneIfMounted(t6[c5]) : normalizeVNode$1(t6[c5]), n3, p5, o6, s5, i5, a7, l4), c5++;
      }
    } else if (c5 > d4) for (; c5 <= p4; ) unmount(e5[c5], o6, s5, true), c5++;
    else {
      const f4 = c5, g5 = c5, m3 = /* @__PURE__ */ new Map();
      for (c5 = g5; c5 <= d4; c5++) {
        const e6 = t6[c5] = l4 ? cloneIfMounted(t6[c5]) : normalizeVNode$1(t6[c5]);
        null != e6.key && m3.set(e6.key, c5);
      }
      let y5, v3 = 0;
      const _4 = d4 - g5 + 1;
      let b5 = false, C3 = 0;
      const k3 = new Array(_4);
      for (c5 = 0; c5 < _4; c5++) k3[c5] = 0;
      for (c5 = f4; c5 <= p4; c5++) {
        const r6 = e5[c5];
        if (v3 >= _4) {
          unmount(r6, o6, s5, true);
          continue;
        }
        let u5;
        if (null != r6.key) u5 = m3.get(r6.key);
        else for (y5 = g5; y5 <= d4; y5++) if (0 === k3[y5 - g5] && isSameVNodeType(r6, t6[y5])) {
          u5 = y5;
          break;
        }
        void 0 === u5 ? unmount(r6, o6, s5, true) : (k3[u5 - g5] = c5 + 1, u5 >= C3 ? C3 = u5 : b5 = true, patch(r6, t6[u5], n3, null, o6, s5, i5, a7, l4), v3++);
      }
      const S3 = b5 ? (function(e6) {
        const t7 = e6.slice(), n4 = [0];
        let r6, o7, s6, i6, a8;
        const l5 = e6.length;
        for (r6 = 0; r6 < l5; r6++) {
          const l6 = e6[r6];
          if (0 !== l6) {
            if (o7 = n4[n4.length - 1], e6[o7] < l6) {
              t7[r6] = o7, n4.push(r6);
              continue;
            }
            for (s6 = 0, i6 = n4.length - 1; s6 < i6; ) a8 = s6 + i6 >> 1, e6[n4[a8]] < l6 ? s6 = a8 + 1 : i6 = a8;
            l6 < e6[n4[s6]] && (s6 > 0 && (t7[r6] = n4[s6 - 1]), n4[s6] = r6);
          }
        }
        s6 = n4.length, i6 = n4[s6 - 1];
        for (; s6-- > 0; ) n4[s6] = i6, i6 = t7[i6];
        return n4;
      })(k3) : a;
      for (y5 = S3.length - 1, c5 = _4 - 1; c5 >= 0; c5--) {
        const e6 = g5 + c5, p5 = t6[e6], d5 = t6[e6 + 1], f5 = e6 + 1 < u4 ? d5.el || d5.placeholder : r5;
        0 === k3[c5] ? patch(null, p5, n3, f5, o6, s5, i5, a7, l4) : b5 && (y5 < 0 || c5 !== S3[y5] ? move(p5, n3, f5, 2) : y5--);
      }
    }
  }, "patchKeyedChildren"), move = /* @__PURE__ */ __name((e5, t6, o6, s5, i5 = null) => {
    const { el: a7, type: l4, transition: c5, children: u4, shapeFlag: d4 } = e5;
    if (6 & d4) return void move(e5.component.subTree, t6, o6, s5);
    if (128 & d4) return void e5.suspense.move(t6, o6, s5);
    if (64 & d4) return void l4.move(e5, t6, o6, y4);
    if (l4 === rn2) {
      n2(a7, t6, o6);
      for (let e6 = 0; e6 < u4.length; e6++) move(u4[e6], t6, o6, s5);
      return void n2(e5.anchor, t6, o6);
    }
    if (l4 === an2) return void (({ el: e6, anchor: t7 }, r5, o7) => {
      let s6;
      for (; e6 && e6 !== t7; ) s6 = p3(e6), n2(e6, r5, o7), e6 = s6;
      n2(t7, r5, o7);
    })(e5, t6, o6);
    if (2 !== s5 && 1 & d4 && c5) if (0 === s5) c5.beforeEnter(a7), n2(a7, t6, o6), en2(() => c5.enter(a7), i5);
    else {
      const { leave: s6, delayLeave: i6, afterLeave: l5 } = c5, remove22 = /* @__PURE__ */ __name(() => {
        e5.ctx.isUnmounted ? r4(a7) : n2(a7, t6, o6);
      }, "remove2"), performLeave = /* @__PURE__ */ __name(() => {
        a7._isLeaving && a7[bt2](true), s6(a7, () => {
          remove22(), l5 && l5();
        });
      }, "performLeave");
      i6 ? i6(a7, remove22, performLeave) : performLeave();
    }
    else n2(a7, t6, o6);
  }, "move"), unmount = /* @__PURE__ */ __name((e5, t6, n3, r5 = false, o6 = false) => {
    const { type: s5, props: i5, ref: a7, children: l4, dynamicChildren: c5, shapeFlag: u4, patchFlag: p4, dirs: d4, cacheIndex: f4 } = e5;
    if (-2 === p4 && (o6 = false), null != a7 && (pauseTracking(), setRef(a7, null, n3, e5, true), resetTracking()), null != f4 && (t6.renderCache[f4] = void 0), 256 & u4) return void t6.ctx.deactivate(e5);
    const g5 = 1 & u4 && d4, m3 = !isAsyncWrapper(e5);
    let v3;
    if (m3 && (v3 = i5 && i5.onVnodeBeforeUnmount) && invokeVNodeHook(v3, t6, e5), 6 & u4) unmountComponent(e5.component, n3, r5);
    else {
      if (128 & u4) return void e5.suspense.unmount(n3, r5);
      g5 && invokeDirectiveHook(e5, null, t6, "beforeUnmount"), 64 & u4 ? e5.type.remove(e5, t6, n3, y4, r5) : c5 && !c5.hasOnce && (s5 !== rn2 || p4 > 0 && 64 & p4) ? unmountChildren(c5, t6, n3, false, true) : (s5 === rn2 && 384 & p4 || !o6 && 16 & u4) && unmountChildren(l4, t6, n3), r5 && remove2(e5);
    }
    (m3 && (v3 = i5 && i5.onVnodeUnmounted) || g5) && en2(() => {
      v3 && invokeVNodeHook(v3, t6, e5), g5 && invokeDirectiveHook(e5, null, t6, "unmounted");
    }, n3);
  }, "unmount"), remove2 = /* @__PURE__ */ __name((e5) => {
    const { type: t6, el: n3, anchor: o6, transition: s5 } = e5;
    if (t6 === rn2) return void removeFragment(n3, o6);
    if (t6 === an2) return void (({ el: e6, anchor: t7 }) => {
      let n4;
      for (; e6 && e6 !== t7; ) n4 = p3(e6), r4(e6), e6 = n4;
      r4(t7);
    })(e5);
    const performRemove = /* @__PURE__ */ __name(() => {
      r4(n3), s5 && !s5.persisted && s5.afterLeave && s5.afterLeave();
    }, "performRemove");
    if (1 & e5.shapeFlag && s5 && !s5.persisted) {
      const { leave: t7, delayLeave: r5 } = s5, performLeave = /* @__PURE__ */ __name(() => t7(n3, performRemove), "performLeave");
      r5 ? r5(e5.el, performRemove, performLeave) : performLeave();
    } else performRemove();
  }, "remove"), removeFragment = /* @__PURE__ */ __name((e5, t6) => {
    let n3;
    for (; e5 !== t6; ) n3 = p3(e5), r4(e5), e5 = n3;
    r4(t6);
  }, "removeFragment"), unmountComponent = /* @__PURE__ */ __name((e5, t6, n3) => {
    const { bum: r5, scope: o6, job: s5, subTree: i5, um: a7, m: l4, a: c5 } = e5;
    invalidateMount(l4), invalidateMount(c5), r5 && invokeArrayFns(r5), o6.stop(), s5 && (s5.flags |= 8, unmount(i5, e5, t6, n3)), a7 && en2(a7, t6), en2(() => {
      e5.isUnmounted = true;
    }, t6);
  }, "unmountComponent"), unmountChildren = /* @__PURE__ */ __name((e5, t6, n3, r5 = false, o6 = false, s5 = 0) => {
    for (let i5 = s5; i5 < e5.length; i5++) unmount(e5[i5], t6, n3, r5, o6);
  }, "unmountChildren"), getNextHostNode = /* @__PURE__ */ __name((e5) => {
    if (6 & e5.shapeFlag) return getNextHostNode(e5.component.subTree);
    if (128 & e5.shapeFlag) return e5.suspense.next();
    const t6 = p3(e5.anchor || e5.el), n3 = t6 && t6[yt2];
    return n3 ? p3(n3) : t6;
  }, "getNextHostNode");
  let g4 = false;
  const render2 = /* @__PURE__ */ __name((e5, t6, n3) => {
    null == e5 ? t6._vnode && unmount(t6._vnode, null, null, true) : patch(t6._vnode || null, e5, t6, null, null, null, n3), t6._vnode = e5, g4 || (g4 = true, flushPreFlushCbs(), flushPostFlushCbs(), g4 = false);
  }, "render"), y4 = { p: patch, um: unmount, m: move, r: remove2, mt: mountComponent, mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, n: getNextHostNode, o: e4 };
  let _3, b4;
  return t5 && ([_3, b4] = t5(y4)), { render: render2, hydrate: _3, createApp: createAppAPI(render2, _3) };
}
function resolveChildrenNamespace({ type: e4, props: t5 }, n2) {
  return "svg" === n2 && "foreignObject" === e4 || "mathml" === n2 && "annotation-xml" === e4 && t5 && t5.encoding && t5.encoding.includes("html") ? void 0 : n2;
}
function toggleRecurse({ effect: e4, job: t5 }, n2) {
  n2 ? (e4.flags |= 32, t5.flags |= 4) : (e4.flags &= -33, t5.flags &= -5);
}
function needTransition(e4, t5) {
  return (!e4 || e4 && !e4.pendingBranch) && t5 && !t5.persisted;
}
function traverseStaticChildren(e4, t5, n2 = false) {
  const r4 = e4.children, o5 = t5.children;
  if (i(r4) && i(o5)) for (let e5 = 0; e5 < r4.length; e5++) {
    const t6 = r4[e5];
    let s4 = o5[e5];
    1 & s4.shapeFlag && !s4.dynamicChildren && ((s4.patchFlag <= 0 || 32 === s4.patchFlag) && (s4 = o5[e5] = cloneIfMounted(o5[e5]), s4.el = t6.el), n2 || -2 === s4.patchFlag || traverseStaticChildren(t6, s4)), s4.type === on3 && -1 !== s4.patchFlag && (s4.el = t6.el), s4.type !== sn2 || s4.el || (s4.el = t6.el);
  }
}
function locateNonHydratedAsyncRoot(e4) {
  const t5 = e4.subTree.component;
  if (t5) return t5.asyncDep && !t5.asyncResolved ? t5 : locateNonHydratedAsyncRoot(t5);
}
function invalidateMount(e4) {
  if (e4) for (let t5 = 0; t5 < e4.length; t5++) e4[t5].flags |= 8;
}
function triggerEvent(e4, t5) {
  const n2 = e4.props && e4.props[t5];
  isFunction(n2) && n2();
}
function createSuspenseBoundary(e4, t5, n2, r4, o5, s4, i4, a6, l3, c4, u3 = false) {
  const { p: p3, m: d3, um: f3, n: g4, o: { parentNode: m3, remove: y4 } } = c4;
  let v3;
  const _3 = (function(e5) {
    const t6 = e5.props && e5.props.suspensible;
    return null != t6 && false !== t6;
  })(e4);
  _3 && t5 && t5.pendingBranch && (v3 = t5.pendingId, t5.deps++);
  const b4 = e4.props ? toNumber(e4.props.timeout) : void 0, C3 = s4, k3 = { vnode: e4, parent: t5, parentComponent: n2, namespace: i4, container: r4, hiddenContainer: o5, deps: 0, pendingId: tn2++, timeout: "number" == typeof b4 ? b4 : -1, activeBranch: null, pendingBranch: null, isInFallback: !u3, isHydrating: u3, isUnmounted: false, effects: [], resolve(e5 = false, n3 = false) {
    const { vnode: r5, activeBranch: o6, pendingBranch: i5, pendingId: a7, effects: l4, parentComponent: c5, container: u4, isInFallback: p4 } = k3;
    let y5 = false;
    k3.isHydrating ? k3.isHydrating = false : e5 || (y5 = o6 && i5.transition && "out-in" === i5.transition.mode, y5 && (o6.transition.afterLeave = () => {
      a7 === k3.pendingId && (d3(i5, u4, s4 === C3 ? g4(o6) : s4, 0), queuePostFlushCb(l4), p4 && r5.ssFallback && (r5.ssFallback.el = null));
    }), o6 && (m3(o6.el) === u4 && (s4 = g4(o6)), f3(o6, c5, k3, true), !y5 && p4 && r5.ssFallback && en2(() => r5.ssFallback.el = null, k3)), y5 || d3(i5, u4, s4, 0)), setActiveBranch(k3, i5), k3.pendingBranch = null, k3.isInFallback = false;
    let b5 = k3.parent, S3 = false;
    for (; b5; ) {
      if (b5.pendingBranch) {
        b5.effects.push(...l4), S3 = true;
        break;
      }
      b5 = b5.parent;
    }
    S3 || y5 || queuePostFlushCb(l4), k3.effects = [], _3 && t5 && t5.pendingBranch && v3 === t5.pendingId && (t5.deps--, 0 !== t5.deps || n3 || t5.resolve()), triggerEvent(r5, "onResolve");
  }, fallback(e5) {
    if (!k3.pendingBranch) return;
    const { vnode: t6, activeBranch: n3, parentComponent: r5, container: o6, namespace: s5 } = k3;
    triggerEvent(t6, "onFallback");
    const i5 = g4(n3), mountFallback = /* @__PURE__ */ __name(() => {
      k3.isInFallback && (p3(null, e5, o6, i5, r5, null, s5, a6, l3), setActiveBranch(k3, e5));
    }, "mountFallback"), c5 = e5.transition && "out-in" === e5.transition.mode;
    c5 && (n3.transition.afterLeave = mountFallback), k3.isInFallback = true, f3(n3, r5, null, true), c5 || mountFallback();
  }, move(e5, t6, n3) {
    k3.activeBranch && d3(k3.activeBranch, e5, t6, n3), k3.container = e5;
  }, next: /* @__PURE__ */ __name(() => k3.activeBranch && g4(k3.activeBranch), "next"), registerDep(e5, t6, n3) {
    const r5 = !!k3.pendingBranch;
    r5 && k3.deps++;
    const o6 = e5.vnode.el;
    e5.asyncDep.catch((t7) => {
      handleError(t7, e5, 0);
    }).then((s5) => {
      if (e5.isUnmounted || k3.isUnmounted || k3.pendingId !== e5.suspenseId) return;
      e5.asyncResolved = true;
      const { vnode: a7 } = e5;
      handleSetupResult(e5, s5, false), o6 && (a7.el = o6);
      const l4 = !o6 && e5.subTree.el;
      t6(e5, a7, m3(o6 || e5.subTree.el), o6 ? null : g4(e5.subTree), k3, i4, n3), l4 && (a7.placeholder = null, y4(l4)), updateHOCHostEl(e5, a7.el), r5 && 0 === --k3.deps && k3.resolve();
    });
  }, unmount(e5, t6) {
    k3.isUnmounted = true, k3.activeBranch && f3(k3.activeBranch, n2, e5, t6), k3.pendingBranch && f3(k3.pendingBranch, n2, e5, t6);
  } };
  return k3;
}
function normalizeSuspenseSlot(e4) {
  let t5;
  if (isFunction(e4)) {
    const n2 = un2 && e4._c;
    n2 && (e4._d = false, openBlock()), e4 = e4(), n2 && (e4._d = true, t5 = cn2, closeBlock());
  }
  if (i(e4)) {
    const t6 = (function(e5) {
      let t7;
      for (let n2 = 0; n2 < e5.length; n2++) {
        const r4 = e5[n2];
        if (!isVNode$2(r4)) return;
        if (r4.type !== sn2 || "v-if" === r4.children) {
          if (t7) return;
          t7 = r4;
        }
      }
      return t7;
    })(e4);
    e4 = t6;
  }
  return e4 = normalizeVNode$1(e4), t5 && !e4.dynamicChildren && (e4.dynamicChildren = t5.filter((t6) => t6 !== e4)), e4;
}
function queueEffectWithSuspense(e4, t5) {
  t5 && t5.pendingBranch ? i(e4) ? t5.effects.push(...e4) : t5.effects.push(e4) : queuePostFlushCb(e4);
}
function setActiveBranch(e4, t5) {
  e4.activeBranch = t5;
  const { vnode: n2, parentComponent: r4 } = e4;
  let o5 = t5.el;
  for (; !o5 && t5.component; ) o5 = (t5 = t5.component.subTree).el;
  n2.el = o5, r4 && r4.subTree === n2 && (r4.vnode.el = o5, updateHOCHostEl(r4, o5));
}
function openBlock(e4 = false) {
  ln2.push(cn2 = e4 ? null : []);
}
function closeBlock() {
  ln2.pop(), cn2 = ln2[ln2.length - 1] || null;
}
function setBlockTracking(e4, t5 = false) {
  un2 += e4, e4 < 0 && cn2 && t5 && (cn2.hasOnce = true);
}
function setupBlock(e4) {
  return e4.dynamicChildren = un2 > 0 ? cn2 || a : null, closeBlock(), un2 > 0 && cn2 && cn2.push(e4), e4;
}
function createBlock(e4, t5, n2, r4, o5) {
  return setupBlock(createVNode(e4, t5, n2, r4, o5, true));
}
function isVNode$2(e4) {
  return !!e4 && true === e4.__v_isVNode;
}
function isSameVNodeType(e4, t5) {
  return e4.type === t5.type && e4.key === t5.key;
}
function createBaseVNode(e4, t5 = null, n2 = null, r4 = 0, o5 = null, s4 = e4 === rn2 ? 0 : 1, i4 = false, a6 = false) {
  const l3 = { __v_isVNode: true, __v_skip: true, type: e4, props: t5, key: t5 && normalizeKey(t5), ref: t5 && normalizeRef(t5), scopeId: mt2, slotScopeIds: null, children: n2, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: s4, patchFlag: r4, dynamicProps: o5, dynamicChildren: null, appContext: null, ctx: gt2 };
  return a6 ? (normalizeChildren(l3, n2), 128 & s4 && e4.normalize(l3)) : n2 && (l3.shapeFlag |= isString(n2) ? 8 : 16), un2 > 0 && !i4 && cn2 && (l3.patchFlag > 0 || 6 & s4) && 32 !== l3.patchFlag && cn2.push(l3), l3;
}
function guardReactiveProps(e4) {
  return e4 ? isProxy(e4) || isInternalObject(e4) ? n({}, e4) : e4 : null;
}
function cloneVNode(e4, t5, n2 = false, r4 = false) {
  const { props: o5, ref: s4, patchFlag: i4, children: a6, transition: l3 } = e4, c4 = t5 ? mergeProps(o5 || {}, t5) : o5, u3 = { __v_isVNode: true, __v_skip: true, type: e4.type, props: c4, key: c4 && normalizeKey(c4), ref: t5 && t5.ref ? n2 && s4 ? i(s4) ? s4.concat(normalizeRef(t5)) : [s4, normalizeRef(t5)] : normalizeRef(t5) : s4, scopeId: e4.scopeId, slotScopeIds: e4.slotScopeIds, children: a6, target: e4.target, targetStart: e4.targetStart, targetAnchor: e4.targetAnchor, staticCount: e4.staticCount, shapeFlag: e4.shapeFlag, patchFlag: t5 && e4.type !== rn2 ? -1 === i4 ? 16 : 16 | i4 : i4, dynamicProps: e4.dynamicProps, dynamicChildren: e4.dynamicChildren, appContext: e4.appContext, dirs: e4.dirs, transition: l3, component: e4.component, suspense: e4.suspense, ssContent: e4.ssContent && cloneVNode(e4.ssContent), ssFallback: e4.ssFallback && cloneVNode(e4.ssFallback), placeholder: e4.placeholder, el: e4.el, anchor: e4.anchor, ctx: e4.ctx, ce: e4.ce };
  return l3 && r4 && setTransitionHooks(u3, l3.clone(u3)), u3;
}
function createTextVNode(e4 = " ", t5 = 0) {
  return createVNode(on3, null, e4, t5);
}
function normalizeVNode$1(e4) {
  return null == e4 || "boolean" == typeof e4 ? createVNode(sn2) : i(e4) ? createVNode(rn2, null, e4.slice()) : isVNode$2(e4) ? cloneIfMounted(e4) : createVNode(on3, null, String(e4));
}
function cloneIfMounted(e4) {
  return null === e4.el && -1 !== e4.patchFlag || e4.memo ? e4 : cloneVNode(e4);
}
function normalizeChildren(e4, t5) {
  let n2 = 0;
  const { shapeFlag: r4 } = e4;
  if (null == t5) t5 = null;
  else if (i(t5)) n2 = 16;
  else if ("object" == typeof t5) {
    if (65 & r4) {
      const n3 = t5.default;
      return void (n3 && (n3._c && (n3._d = false), normalizeChildren(e4, n3()), n3._c && (n3._d = true)));
    }
    {
      n2 = 32;
      const r5 = t5._;
      r5 || isInternalObject(t5) ? 3 === r5 && gt2 && (1 === gt2.slots._ ? t5._ = 1 : (t5._ = 2, e4.patchFlag |= 1024)) : t5._ctx = gt2;
    }
  } else isFunction(t5) ? (t5 = { default: t5, _ctx: gt2 }, n2 = 32) : (t5 = String(t5), 64 & r4 ? (n2 = 16, t5 = [createTextVNode(t5)]) : n2 = 8);
  e4.children = t5, e4.shapeFlag |= n2;
}
function mergeProps(...e4) {
  const t5 = {};
  for (let n2 = 0; n2 < e4.length; n2++) {
    const r4 = e4[n2];
    for (const e5 in r4) if ("class" === e5) t5.class !== r4.class && (t5.class = normalizeClass([t5.class, r4.class]));
    else if ("style" === e5) t5.style = normalizeStyle([t5.style, r4.style]);
    else if (isOn(e5)) {
      const n3 = t5[e5], o5 = r4[e5];
      !o5 || n3 === o5 || i(n3) && n3.includes(o5) || (t5[e5] = n3 ? [].concat(n3, o5) : o5);
    } else "" !== e5 && (t5[e5] = r4[e5]);
  }
  return t5;
}
function invokeVNodeHook(e4, t5, n2, r4 = null) {
  callWithAsyncErrorHandling(e4, t5, 7, [n2, r4]);
}
function createComponentInstance$1(e4, t5, n2) {
  const r4 = e4.type, o5 = (t5 ? t5.appContext : e4.appContext) || pn2, s4 = { uid: dn2++, vnode: e4, type: r4, parent: t5, appContext: o5, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new EffectScope(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t5 ? t5.provides : Object.create(o5.provides), ids: t5 ? t5.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: normalizePropsOptions(r4, o5), emitsOptions: normalizeEmitsOptions(r4, o5), emit: null, emitted: null, propsDefaults: t, inheritAttrs: r4.inheritAttrs, ctx: t, data: t, props: t, attrs: t, slots: t, refs: t, setupState: t, setupContext: null, suspense: n2, suspenseId: n2 ? n2.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return s4.ctx = { _: s4 }, s4.root = t5 ? t5.root : s4, s4.emit = emit2.bind(null, s4), e4.ce && e4.ce(s4), s4;
}
function isStatefulComponent(e4) {
  return 4 & e4.vnode.shapeFlag;
}
function setupComponent$1(e4, t5 = false, n2 = false) {
  t5 && gn2(t5);
  const { props: r4, children: o5 } = e4.vnode, s4 = isStatefulComponent(e4);
  !(function(e5, t6, n3, r5 = false) {
    const o6 = {}, s5 = createInternalObject();
    e5.propsDefaults = /* @__PURE__ */ Object.create(null), setFullProps(e5, t6, o6, s5);
    for (const t7 in e5.propsOptions[0]) t7 in o6 || (o6[t7] = void 0);
    n3 ? e5.props = r5 ? o6 : shallowReactive(o6) : e5.type.props ? e5.props = o6 : e5.props = s5, e5.attrs = s5;
  })(e4, r4, s4, t5), ((e5, t6, n3) => {
    const r5 = e5.slots = createInternalObject();
    if (32 & e5.vnode.shapeFlag) {
      const e6 = t6._;
      e6 ? (assignSlots(r5, t6, n3), n3 && def(r5, "_", e6, true)) : normalizeObjectSlots(t6, r5);
    } else t6 && normalizeVNodeSlots(e5, t6);
  })(e4, o5, n2 || t5);
  const i4 = s4 ? (function(e5, t6) {
    const n3 = e5.type;
    e5.accessCache = /* @__PURE__ */ Object.create(null), e5.proxy = new Proxy(e5.ctx, Wt2);
    const { setup: r5 } = n3;
    if (r5) {
      pauseTracking();
      const n4 = e5.setupContext = r5.length > 1 ? createSetupContext(e5) : null, o6 = setCurrentInstance(e5), s5 = callWithErrorHandling(r5, e5, 0, [e5.props, n4]), i5 = isPromise(s5);
      if (resetTracking(), o6(), !i5 && !e5.sp || isAsyncWrapper(e5) || markAsyncBoundary(e5), i5) {
        if (s5.then(unsetCurrentInstance, unsetCurrentInstance), t6) return s5.then((n5) => {
          handleSetupResult(e5, n5, t6);
        }).catch((t7) => {
          handleError(t7, e5, 0);
        });
        e5.asyncDep = s5;
      } else handleSetupResult(e5, s5, t6);
    } else finishComponentSetup(e5, t6);
  })(e4, t5) : void 0;
  return t5 && gn2(false), i4;
}
function handleSetupResult(e4, t5, n2) {
  isFunction(t5) ? e4.type.__ssrInlineRender ? e4.ssrRender = t5 : e4.render = t5 : isObject(t5) && (e4.setupState = proxyRefs(t5)), finishComponentSetup(e4, n2);
}
function finishComponentSetup(e4, t5, n2) {
  const r4 = e4.type;
  if (!e4.render) {
    if (!t5 && mn2 && !r4.render) {
      const t6 = r4.template || resolveMergedOptions(e4).template;
      if (t6) {
        const { isCustomElement: n3, compilerOptions: o5 } = e4.appContext.config, { delimiters: s4, compilerOptions: i4 } = r4, a6 = n(n({ isCustomElement: n3, delimiters: s4 }, o5), i4);
        r4.render = mn2(t6, a6);
      }
    }
    e4.render = r4.render || NOOP, yn2 && yn2(e4);
  }
  {
    const t6 = setCurrentInstance(e4);
    pauseTracking();
    try {
      applyOptions(e4);
    } finally {
      resetTracking(), t6();
    }
  }
}
function createSetupContext(e4) {
  const expose = /* @__PURE__ */ __name((t5) => {
    e4.exposed = t5 || {};
  }, "expose");
  return { attrs: new Proxy(e4.attrs, _n2), slots: e4.slots, emit: e4.emit, expose };
}
function getComponentPublicInstance(e4) {
  return e4.exposed ? e4.exposeProxy || (e4.exposeProxy = new Proxy(proxyRefs(markRaw(e4.exposed)), { get: /* @__PURE__ */ __name((t5, n2) => n2 in t5 ? t5[n2] : n2 in Ut2 ? Ut2[n2](e4) : void 0, "get"), has: /* @__PURE__ */ __name((e5, t5) => t5 in e5 || t5 in Ut2, "has") })) : e4.proxy;
}
function getComponentName(e4, t5 = true) {
  return isFunction(e4) ? e4.displayName || e4.name : e4.name || t5 && e4.__name;
}
function h2(e4, t5, n2) {
  try {
    setBlockTracking(-1);
    const r4 = arguments.length;
    return 2 === r4 ? isObject(t5) && !i(t5) ? isVNode$2(t5) ? createVNode(e4, null, [t5]) : createVNode(e4, t5) : createVNode(e4, null, t5) : (r4 > 3 ? n2 = Array.prototype.slice.call(arguments, 2) : 3 === r4 && isVNode$2(n2) && (n2 = [n2]), createVNode(e4, t5, n2));
  } finally {
    setBlockTracking(1);
  }
}
function isMemoSame(e4, t5) {
  const n2 = e4.memo;
  if (n2.length != t5.length) return false;
  for (let e5 = 0; e5 < n2.length; e5++) if (hasChanged(n2[e5], t5[e5])) return false;
  return un2 > 0 && cn2 && cn2.push(e4), true;
}
function resolveTransitionProps(e4) {
  const t5 = {};
  for (const n3 in e4) n3 in $n || (t5[n3] = e4[n3]);
  if (false === e4.css) return t5;
  const { name: n2 = "v", type: r4, duration: o5, enterFromClass: s4 = `${n2}-enter-from`, enterActiveClass: i4 = `${n2}-enter-active`, enterToClass: a6 = `${n2}-enter-to`, appearFromClass: l3 = s4, appearActiveClass: c4 = i4, appearToClass: u3 = a6, leaveFromClass: p3 = `${n2}-leave-from`, leaveActiveClass: d3 = `${n2}-leave-active`, leaveToClass: g4 = `${n2}-leave-to` } = e4, m3 = (function(e5) {
    if (null == e5) return null;
    if (isObject(e5)) return [NumberOf(e5.enter), NumberOf(e5.leave)];
    {
      const t6 = NumberOf(e5);
      return [t6, t6];
    }
  })(o5), y4 = m3 && m3[0], v3 = m3 && m3[1], { onBeforeEnter: _3, onEnter: b4, onEnterCancelled: C3, onLeave: k3, onLeaveCancelled: T3, onBeforeAppear: w3 = _3, onAppear: R3 = b4, onAppearCancelled: A3 = C3 } = t5, finishEnter = /* @__PURE__ */ __name((e5, t6, n3, r5) => {
    e5._enterCancelled = r5, removeTransitionClass(e5, t6 ? u3 : a6), removeTransitionClass(e5, t6 ? c4 : i4), n3 && n3();
  }, "finishEnter"), finishLeave = /* @__PURE__ */ __name((e5, t6) => {
    e5._isLeaving = false, removeTransitionClass(e5, p3), removeTransitionClass(e5, g4), removeTransitionClass(e5, d3), t6 && t6();
  }, "finishLeave"), makeEnterHook = /* @__PURE__ */ __name((e5) => (t6, n3) => {
    const o6 = e5 ? R3 : b4, resolve2 = /* @__PURE__ */ __name(() => finishEnter(t6, e5, n3), "resolve");
    callHook(o6, [t6, resolve2]), nextFrame(() => {
      removeTransitionClass(t6, e5 ? l3 : s4), addTransitionClass(t6, e5 ? u3 : a6), hasExplicitCallback(o6) || whenTransitionEnds(t6, r4, y4, resolve2);
    });
  }, "makeEnterHook");
  return n(t5, { onBeforeEnter(e5) {
    callHook(_3, [e5]), addTransitionClass(e5, s4), addTransitionClass(e5, i4);
  }, onBeforeAppear(e5) {
    callHook(w3, [e5]), addTransitionClass(e5, l3), addTransitionClass(e5, c4);
  }, onEnter: makeEnterHook(false), onAppear: makeEnterHook(true), onLeave(e5, t6) {
    e5._isLeaving = true;
    const resolve2 = /* @__PURE__ */ __name(() => finishLeave(e5, t6), "resolve");
    addTransitionClass(e5, p3), e5._enterCancelled ? (addTransitionClass(e5, d3), forceReflow(e5)) : (forceReflow(e5), addTransitionClass(e5, d3)), nextFrame(() => {
      e5._isLeaving && (removeTransitionClass(e5, p3), addTransitionClass(e5, g4), hasExplicitCallback(k3) || whenTransitionEnds(e5, r4, v3, resolve2));
    }), callHook(k3, [e5, resolve2]);
  }, onEnterCancelled(e5) {
    finishEnter(e5, false, void 0, true), callHook(C3, [e5]);
  }, onAppearCancelled(e5) {
    finishEnter(e5, true, void 0, true), callHook(A3, [e5]);
  }, onLeaveCancelled(e5) {
    finishLeave(e5), callHook(T3, [e5]);
  } });
}
function NumberOf(e4) {
  return toNumber(e4);
}
function addTransitionClass(e4, t5) {
  t5.split(/\s+/).forEach((t6) => t6 && e4.classList.add(t6)), (e4[Pn2] || (e4[Pn2] = /* @__PURE__ */ new Set())).add(t5);
}
function removeTransitionClass(e4, t5) {
  t5.split(/\s+/).forEach((t6) => t6 && e4.classList.remove(t6));
  const n2 = e4[Pn2];
  n2 && (n2.delete(t5), n2.size || (e4[Pn2] = void 0));
}
function nextFrame(e4) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e4);
  });
}
function whenTransitionEnds(e4, t5, n2, r4) {
  const o5 = e4._endId = ++Vn2, resolveIfNotStale = /* @__PURE__ */ __name(() => {
    o5 === e4._endId && r4();
  }, "resolveIfNotStale");
  if (null != n2) return setTimeout(resolveIfNotStale, n2);
  const { type: s4, timeout: i4, propCount: a6 } = getTransitionInfo(e4, t5);
  if (!s4) return r4();
  const l3 = s4 + "end";
  let c4 = 0;
  const end = /* @__PURE__ */ __name(() => {
    e4.removeEventListener(l3, onEnd), resolveIfNotStale();
  }, "end"), onEnd = /* @__PURE__ */ __name((t6) => {
    t6.target === e4 && ++c4 >= a6 && end();
  }, "onEnd");
  setTimeout(() => {
    c4 < a6 && end();
  }, i4 + 1), e4.addEventListener(l3, onEnd);
}
function getTransitionInfo(e4, t5) {
  const n2 = window.getComputedStyle(e4), getStyleProperties = /* @__PURE__ */ __name((e5) => (n2[e5] || "").split(", "), "getStyleProperties"), r4 = getStyleProperties(`${xn2}Delay`), o5 = getStyleProperties(`${xn2}Duration`), s4 = getTimeout(r4, o5), i4 = getStyleProperties(`${En2}Delay`), a6 = getStyleProperties(`${En2}Duration`), l3 = getTimeout(i4, a6);
  let c4 = null, u3 = 0, p3 = 0;
  t5 === xn2 ? s4 > 0 && (c4 = xn2, u3 = s4, p3 = o5.length) : t5 === En2 ? l3 > 0 && (c4 = En2, u3 = l3, p3 = a6.length) : (u3 = Math.max(s4, l3), c4 = u3 > 0 ? s4 > l3 ? xn2 : En2 : null, p3 = c4 ? c4 === xn2 ? o5.length : a6.length : 0);
  return { type: c4, timeout: u3, propCount: p3, hasTransform: c4 === xn2 && /\b(?:transform|all)(?:,|$)/.test(getStyleProperties(`${xn2}Property`).toString()) };
}
function getTimeout(e4, t5) {
  for (; e4.length < t5.length; ) e4 = e4.concat(e4);
  return Math.max(...t5.map((t6, n2) => toMs(t6) + toMs(e4[n2])));
}
function toMs(e4) {
  return "auto" === e4 ? 0 : 1e3 * Number(e4.slice(0, -1).replace(",", "."));
}
function forceReflow(e4) {
  return (e4 ? e4.ownerDocument : document).body.offsetHeight;
}
function setDisplay(e4, t5) {
  e4.style.display = t5 ? e4[Hn] : "none", e4[Mn2] = !t5;
}
function setVarsOnVNode(e4, t5) {
  if (128 & e4.shapeFlag) {
    const n2 = e4.suspense;
    e4 = n2.activeBranch, n2.pendingBranch && !n2.isHydrating && n2.effects.push(() => {
      setVarsOnVNode(n2.activeBranch, t5);
    });
  }
  for (; e4.component; ) e4 = e4.component.subTree;
  if (1 & e4.shapeFlag && e4.el) setVarsOnNode(e4.el, t5);
  else if (e4.type === rn2) e4.children.forEach((e5) => setVarsOnVNode(e5, t5));
  else if (e4.type === an2) {
    let { el: n2, anchor: r4 } = e4;
    for (; n2 && (setVarsOnNode(n2, t5), n2 !== r4); ) n2 = n2.nextSibling;
  }
}
function setVarsOnNode(e4, t5) {
  if (1 === e4.nodeType) {
    const n2 = e4.style;
    let r4 = "";
    for (const e5 in t5) {
      const o5 = normalizeCssVarValue(t5[e5]);
      n2.setProperty(`--${e5}`, o5), r4 += `--${e5}: ${o5};`;
    }
    n2[In2] = r4;
  }
}
function setStyle(e4, t5, n2) {
  if (i(n2)) n2.forEach((n3) => setStyle(e4, t5, n3));
  else if (null == n2 && (n2 = ""), t5.startsWith("--")) e4.setProperty(t5, n2);
  else {
    const r4 = (function(e5, t6) {
      const n3 = Bn2[t6];
      if (n3) return n3;
      let r5 = p(t6);
      if ("filter" !== r5 && r5 in e5) return Bn2[t6] = r5;
      r5 = f(r5);
      for (let n4 = 0; n4 < Fn2.length; n4++) {
        const o5 = Fn2[n4] + r5;
        if (o5 in e5) return Bn2[t6] = o5;
      }
      return t6;
    })(e4, t5);
    jn.test(n2) ? e4.setProperty(d(r4), n2.replace(jn, ""), "important") : e4[r4] = n2;
  }
}
function patchAttr(e4, t5, n2, r4, o5, s4 = v(t5)) {
  r4 && t5.startsWith("xlink:") ? null == n2 ? e4.removeAttributeNS(Un2, t5.slice(6, t5.length)) : e4.setAttributeNS(Un2, t5, n2) : null == n2 || s4 && !includeBooleanAttr(n2) ? e4.removeAttribute(t5) : e4.setAttribute(t5, s4 ? "" : isSymbol(n2) ? String(n2) : n2);
}
function patchDOMProp(e4, t5, n2, r4, o5) {
  if ("innerHTML" === t5 || "textContent" === t5) return void (null != n2 && (e4[t5] = n2));
  const s4 = e4.tagName;
  if ("value" === t5 && "PROGRESS" !== s4 && !s4.includes("-")) {
    const r5 = "OPTION" === s4 ? e4.getAttribute("value") || "" : e4.value, o6 = null == n2 ? "checkbox" === e4.type ? "on" : "" : String(n2);
    return r5 === o6 && "_value" in e4 || (e4.value = o6), null == n2 && e4.removeAttribute(t5), void (e4._value = n2);
  }
  let i4 = false;
  if ("" === n2 || null == n2) {
    const r5 = typeof e4[t5];
    "boolean" === r5 ? n2 = includeBooleanAttr(n2) : null == n2 && "string" === r5 ? (n2 = "", i4 = true) : "number" === r5 && (n2 = 0, i4 = true);
  }
  try {
    e4[t5] = n2;
  } catch (e5) {
  }
  i4 && e4.removeAttribute(o5 || t5);
}
function addEventListener(e4, t5, n2, r4) {
  e4.addEventListener(t5, n2, r4);
}
function patchEvent(e4, t5, n2, r4, o5 = null) {
  const s4 = e4[Wn] || (e4[Wn] = {}), i4 = s4[t5];
  if (r4 && i4) i4.value = r4;
  else {
    const [n3, a6] = (function(e5) {
      let t6;
      if (zn.test(e5)) {
        let n5;
        for (t6 = {}; n5 = e5.match(zn); ) e5 = e5.slice(0, e5.length - n5[0].length), t6[n5[0].toLowerCase()] = true;
      }
      const n4 = ":" === e5[2] ? e5.slice(3) : d(e5.slice(2));
      return [n4, t6];
    })(t5);
    if (r4) {
      const i5 = s4[t5] = (function(e5, t6) {
        const invoker = /* @__PURE__ */ __name((e6) => {
          if (e6._vts) {
            if (e6._vts <= invoker.attached) return;
          } else e6._vts = Date.now();
          callWithAsyncErrorHandling((function(e7, t7) {
            if (i(t7)) {
              const n4 = e7.stopImmediatePropagation;
              return e7.stopImmediatePropagation = () => {
                n4.call(e7), e7._stopped = true;
              }, t7.map((e8) => (t8) => !t8._stopped && e8 && e8(t8));
            }
            return t7;
          })(e6, invoker.value), t6, 5, [e6]);
        }, "invoker");
        return invoker.value = e5, invoker.attached = getNow(), invoker;
      })(r4, o5);
      addEventListener(e4, n3, i5, a6);
    } else i4 && (!(function(e5, t6, n4, r5) {
      e5.removeEventListener(t6, n4, r5);
    })(e4, n3, i4, a6), s4[t5] = void 0);
  }
}
function defineCustomElement(e4, t5, n2) {
  let r4 = defineComponent(e4, t5);
  isPlainObject(r4) && (r4 = n({}, r4, t5));
  class VueCustomElement extends VueElement {
    static {
      __name(this, "VueCustomElement");
    }
    constructor(e5) {
      super(r4, e5, n2);
    }
  }
  return VueCustomElement.def = r4, VueCustomElement;
}
function useHost(e4) {
  const t5 = getCurrentInstance(), n2 = t5 && t5.ce;
  return n2 || null;
}
function callPendingCbs(e4) {
  const t5 = e4.el;
  t5[Yn] && t5[Yn](), t5[Qn] && t5[Qn]();
}
function recordPosition(e4) {
  Xn2.set(e4, { left: e4.el.offsetLeft, top: e4.el.offsetTop });
}
function applyTranslation(e4) {
  const t5 = Zn.get(e4), n2 = Xn2.get(e4), r4 = t5.left - n2.left, o5 = t5.top - n2.top;
  if (r4 || o5) {
    const t6 = e4.el.style;
    return t6.transform = t6.webkitTransform = `translate(${r4}px,${o5}px)`, t6.transitionDuration = "0s", e4;
  }
}
function onCompositionStart(e4) {
  e4.target.composing = true;
}
function onCompositionEnd(e4) {
  const t5 = e4.target;
  t5.composing && (t5.composing = false, t5.dispatchEvent(new Event("input")));
}
function castValue(e4, t5, n2) {
  return t5 && (e4 = e4.trim()), n2 && (e4 = looseToNumber(e4)), e4;
}
function setChecked(e4, { value: t5, oldValue: n2 }, r4) {
  let o5;
  if (e4._modelValue = t5, i(t5)) o5 = looseIndexOf(t5, r4.props.value) > -1;
  else if (isSet(t5)) o5 = t5.has(r4.props.value);
  else {
    if (t5 === n2) return;
    o5 = looseEqual(t5, getCheckboxValue(e4, true));
  }
  e4.checked !== o5 && (e4.checked = o5);
}
function setSelected(e4, t5) {
  const n2 = e4.multiple, r4 = i(t5);
  if (!n2 || r4 || isSet(t5)) {
    for (let o5 = 0, s4 = e4.options.length; o5 < s4; o5++) {
      const s5 = e4.options[o5], i4 = getValue(s5);
      if (n2) if (r4) {
        const e5 = typeof i4;
        s5.selected = "string" === e5 || "number" === e5 ? t5.some((e6) => String(e6) === String(i4)) : looseIndexOf(t5, i4) > -1;
      } else s5.selected = t5.has(i4);
      else if (looseEqual(getValue(s5), t5)) return void (e4.selectedIndex !== o5 && (e4.selectedIndex = o5));
    }
    n2 || -1 === e4.selectedIndex || (e4.selectedIndex = -1);
  }
}
function getValue(e4) {
  return "_value" in e4 ? e4._value : e4.value;
}
function getCheckboxValue(e4, t5) {
  const n2 = t5 ? "_trueValue" : "_falseValue";
  return n2 in e4 ? e4[n2] : t5;
}
function resolveDynamicModel(e4, t5) {
  switch (e4) {
    case "SELECT":
      return sr;
    case "TEXTAREA":
      return nr;
    default:
      switch (t5) {
        case "checkbox":
          return rr;
        case "radio":
          return or;
        default:
          return nr;
      }
  }
}
function callModelHook(e4, t5, n2, r4, o5) {
  const s4 = resolveDynamicModel(e4.tagName, n2.props && n2.props.type)[o5];
  s4 && s4(e4, t5, n2, r4);
}
function ensureRenderer() {
  return pr || (pr = createRenderer(ur));
}
function ensureHydrationRenderer() {
  return pr = dr ? pr : createHydrationRenderer(ur), dr = true, pr;
}
function resolveRootNamespace(e4) {
  return e4 instanceof SVGElement ? "svg" : "function" == typeof MathMLElement && e4 instanceof MathMLElement ? "mathml" : void 0;
}
function normalizeContainer(e4) {
  if (isString(e4)) {
    return document.querySelector(e4);
  }
  return e4;
}
function injectHead() {
  if (hasInjectionContext()) {
    const e4 = inject(gr);
    if (!e4) throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
    return e4;
  }
  throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
function useHead(e4, t5 = {}) {
  const n2 = t5.head || injectHead();
  return n2.ssr ? n2.push(e4 || {}, t5) : (function(e5, t6, n3 = {}) {
    const r4 = ref2(false);
    let o5;
    watchEffect(() => {
      const s4 = r4.value ? {} : walkResolver(t6, VueResolver);
      o5 ? o5.patch(s4) : o5 = e5.push(s4, n3);
    });
    getCurrentInstance() && (Mt2(() => {
      o5.dispose();
    }), onDeactivated(() => {
      r4.value = true;
    }), onActivated(() => {
      r4.value = false;
    }));
    return o5;
  })(n2, e4, t5);
}
function createHead(e4 = {}) {
  const t5 = (function(e5 = {}) {
    const t6 = createUnhead({ ...e5, document: false, propResolvers: [...e5.propResolvers || [], (e6, t7) => e6 && e6.startsWith("on") && "function" == typeof t7 ? `this.dataset.${e6}fired = true` : t7], init: [e5.disableDefaults ? void 0 : { htmlAttrs: { lang: "en" }, meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }] }, ...e5.init || []] });
    return t6._ssrPayload = {}, t6.use({ key: "server", hooks: { "tags:resolve": /* @__PURE__ */ __name(function(e6) {
      const n2 = e6.tagMap.get("title"), r4 = e6.tagMap.get("titleTemplate");
      let o5 = { title: "server" === n2?.mode ? t6._title : void 0, titleTemplate: "server" === r4?.mode ? t6._titleTemplate : void 0 };
      Object.keys(t6._ssrPayload || {}).length > 0 && (o5 = { ...t6._ssrPayload, ...o5 }), Object.values(o5).some(Boolean) && e6.tags.push({ tag: "script", innerHTML: JSON.stringify(o5), props: { id: "unhead:payload", type: "application/json" } });
    }, "tags:resolve") } }), t6;
  })({ ...e4, propResolvers: [VueResolver] });
  return t5.install = (function(e5) {
    return { install(t6) {
      t6.config.globalProperties.$unhead = e5, t6.config.globalProperties.$head = e5, t6.provide(gr, e5);
    } }.install;
  })(t5), t5;
}
function ssrRenderAttrs(e4, t5) {
  let n2 = "";
  for (const r4 in e4) {
    if (mr(r4) || isOn(r4) || "textarea" === t5 && "value" === r4) continue;
    const o5 = e4[r4];
    n2 += "class" === r4 ? ` class="${ssrRenderClass(o5)}"` : "style" === r4 ? ` style="${ssrRenderStyle(o5)}"` : "className" === r4 ? ` class="${String(o5)}"` : ssrRenderDynamicAttr(r4, o5, t5);
  }
  return n2;
}
function ssrRenderDynamicAttr(e4, t5, n2) {
  if (!isRenderableAttrValue(t5)) return "";
  const r4 = n2 && (n2.indexOf("-") > 0 || O(n2)) ? e4 : P[e4] || e4.toLowerCase();
  return R(r4) ? includeBooleanAttr(t5) ? ` ${r4}` : "" : isSSRSafeAttrName(r4) ? "" === t5 ? ` ${r4}` : ` ${r4}="${escapeHtml(t5)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${r4}`), "");
}
function ssrRenderClass(e4) {
  return escapeHtml(normalizeClass(e4));
}
function ssrRenderStyle(e4) {
  if (!e4) return "";
  if (isString(e4)) return escapeHtml(e4);
  const t5 = normalizeStyle((function(e5) {
    if (!i(e5) && isObject(e5)) {
      const t6 = {};
      for (const n2 in e5) n2.startsWith(":--") ? t6[n2.slice(1)] = normalizeCssVarValue(e5[n2]) : t6[n2] = e5[n2];
      return t6;
    }
    return e5;
  })(e4));
  return escapeHtml(stringifyStyle(t5));
}
function ssrRenderComponent(e4, t5 = null, n2 = null, r4 = null, o5) {
  return renderComponentVNode(createVNode(e4, t5, n2), r4, o5);
}
function ssrInterpolate(e4) {
  return escapeHtml(toDisplayString(e4));
}
async function ssrRenderSuspense(e4, { default: t5 }) {
  t5 ? t5() : e4("<!---->");
}
function createBuffer() {
  let e4 = false;
  const t5 = [];
  return { getBuffer: /* @__PURE__ */ __name(() => t5, "getBuffer"), push(n2) {
    const r4 = isString(n2);
    e4 && r4 ? t5[t5.length - 1] += n2 : (t5.push(n2), e4 = r4, (isPromise(n2) || i(n2) && n2.hasAsync) && (t5.hasAsync = true));
  } };
}
function renderComponentVNode(e4, t5 = null, n2) {
  const r4 = e4.component = vr(e4, t5, null), o5 = br(r4, true), s4 = isPromise(o5);
  let i4 = r4.sp;
  if (s4 || i4) {
    return Promise.resolve(o5).then(() => {
      if (s4 && (i4 = r4.sp), i4) return Promise.all(i4.map((e5) => e5.call(r4.proxy)));
    }).catch(NOOP).then(() => renderComponentSubTree(r4, n2));
  }
  return renderComponentSubTree(r4, n2);
}
function renderComponentSubTree(e4, t5) {
  const n2 = e4.type, { getBuffer: r4, push: o5 } = createBuffer();
  if (isFunction(n2)) {
    let r5 = Cr(e4);
    if (!n2.props) for (const t6 in e4.attrs) t6.startsWith("data-v-") && ((r5.props || (r5.props = {}))[t6] = "");
    renderVNode(o5, e4.subTree = r5, e4, t5);
  } else {
    e4.render && e4.render !== NOOP || e4.ssrRender || n2.ssrRender || !isString(n2.template) || (n2.ssrRender = (function() {
      throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
    })(n2.template));
    const r5 = e4.ssrRender || n2.ssrRender;
    if (r5) {
      let n3 = false !== e4.inheritAttrs ? e4.attrs : void 0, s4 = false, i4 = e4;
      for (; ; ) {
        const e5 = i4.vnode.scopeId;
        e5 && (s4 || (n3 = { ...n3 }, s4 = true), n3[e5] = "");
        const t6 = i4.parent;
        if (!t6 || !t6.subTree || t6.subTree !== i4.vnode) break;
        i4 = t6;
      }
      if (t5) {
        s4 || (n3 = { ...n3 });
        const e5 = t5.trim().split(" ");
        for (let t6 = 0; t6 < e5.length; t6++) n3[e5[t6]] = "";
      }
      const a6 = _r(e4);
      try {
        r5(e4.proxy, o5, e4, n3, e4.props, e4.setupState, e4.data, e4.ctx);
      } finally {
        _r(a6);
      }
    } else e4.render && e4.render !== NOOP ? renderVNode(o5, e4.subTree = Cr(e4), e4, t5) : (n2.name || n2.__file, o5("<!---->"));
  }
  return r4();
}
function renderVNode(e4, t5, n2, r4) {
  const { type: o5, shapeFlag: s4, children: i4, dirs: a6, props: l3 } = t5;
  switch (a6 && (t5.props = (function(e5, t6, n3) {
    const r5 = [];
    for (let t7 = 0; t7 < n3.length; t7++) {
      const o6 = n3[t7], { dir: { getSSRProps: s5 } } = o6;
      if (s5) {
        const t8 = s5(o6, e5);
        t8 && r5.push(t8);
      }
    }
    return mergeProps(t6 || {}, ...r5);
  })(t5, l3, a6)), o5) {
    case on3:
      e4(escapeHtml(i4));
      break;
    case sn2:
      e4(i4 ? `<!--${escapeHtmlComment(i4)}-->` : "<!---->");
      break;
    case an2:
      e4(i4);
      break;
    case rn2:
      t5.slotScopeIds && (r4 = (r4 ? r4 + " " : "") + t5.slotScopeIds.join(" ")), e4("<!--[-->"), renderVNodeChildren(e4, i4, n2, r4), e4("<!--]-->");
      break;
    default:
      1 & s4 ? (function(e5, t6, n3, r5) {
        const o6 = t6.type;
        let { props: s5, children: i5, shapeFlag: a7, scopeId: l4 } = t6, c4 = `<${o6}`;
        s5 && (c4 += ssrRenderAttrs(s5, o6));
        l4 && (c4 += ` ${l4}`);
        let u3 = n3, p3 = t6;
        for (; u3 && p3 === u3.subTree; ) p3 = u3.vnode, p3.scopeId && (c4 += ` ${p3.scopeId}`), u3 = u3.parent;
        r5 && (c4 += ` ${r5}`);
        if (e5(c4 + ">"), !C(o6)) {
          let t7 = false;
          s5 && (s5.innerHTML ? (t7 = true, e5(s5.innerHTML)) : s5.textContent ? (t7 = true, e5(escapeHtml(s5.textContent))) : "textarea" === o6 && s5.value && (t7 = true, e5(escapeHtml(s5.value)))), t7 || (8 & a7 ? e5(escapeHtml(i5)) : 16 & a7 && renderVNodeChildren(e5, i5, n3, r5)), e5(`</${o6}>`);
        }
      })(e4, t5, n2, r4) : 6 & s4 ? e4(renderComponentVNode(t5, n2, r4)) : 64 & s4 ? (function(e5, t6, n3, r5) {
        const o6 = t6.props && t6.props.to, s5 = t6.props && t6.props.disabled;
        if (!o6) return [];
        if (!isString(o6)) return [];
        !(function(e6, t7, n4, r6, o7) {
          e6("<!--teleport start-->");
          const s6 = o7.appContext.provides[Zt2], i5 = s6.__teleportBuffers || (s6.__teleportBuffers = {}), a7 = i5[n4] || (i5[n4] = []), l4 = a7.length;
          let c4;
          if (r6) t7(e6), c4 = "<!--teleport start anchor--><!--teleport anchor-->";
          else {
            const { getBuffer: e7, push: n5 } = createBuffer();
            n5("<!--teleport start anchor-->"), t7(n5), n5("<!--teleport anchor-->"), c4 = e7();
          }
          a7.splice(l4, 0, c4), e6("<!--teleport end-->");
        })(e5, (e6) => {
          renderVNodeChildren(e6, t6.children, n3, r5);
        }, o6, s5 || "" === s5, n3);
      })(e4, t5, n2, r4) : 128 & s4 && renderVNode(e4, t5.ssContent, n2, r4);
  }
}
function renderVNodeChildren(e4, t5, n2, r4) {
  for (let o5 = 0; o5 < t5.length; o5++) renderVNode(e4, kr(t5[o5]), n2, r4);
}
function nestedUnrollBuffer(e4, t5, n2) {
  if (!e4.hasAsync) return t5 + unrollBufferSync$1(e4);
  let r4 = t5;
  for (let t6 = n2; t6 < e4.length; t6 += 1) {
    const n3 = e4[t6];
    if (isString(n3)) {
      r4 += n3;
      continue;
    }
    if (isPromise(n3)) return n3.then((n4) => (e4[t6] = n4, nestedUnrollBuffer(e4, r4, t6)));
    const o5 = nestedUnrollBuffer(n3, r4, 0);
    if (isPromise(o5)) return o5.then((n4) => (e4[t6] = n4, nestedUnrollBuffer(e4, "", t6)));
    r4 = o5;
  }
  return r4;
}
function unrollBuffer$1(e4) {
  return nestedUnrollBuffer(e4, "", 0);
}
function unrollBufferSync$1(e4) {
  let t5 = "";
  for (let n2 = 0; n2 < e4.length; n2++) {
    let r4 = e4[n2];
    isString(r4) ? t5 += r4 : t5 += unrollBufferSync$1(r4);
  }
  return t5;
}
async function renderToString(e4, t5 = {}) {
  if (wr(e4)) return renderToString(createApp({ render: /* @__PURE__ */ __name(() => e4, "render") }), t5);
  const n2 = createVNode(e4._component, e4._props);
  n2.appContext = e4._context, e4.provide(Zt2, t5);
  const r4 = await renderComponentVNode(n2), o5 = await unrollBuffer$1(r4);
  if (await (async function(e5) {
    if (e5.__teleportBuffers) {
      e5.teleports = e5.teleports || {};
      for (const t6 in e5.__teleportBuffers) e5.teleports[t6] = await unrollBuffer$1(await Promise.all([e5.__teleportBuffers[t6]]));
    }
  })(t5), t5.__watcherHandles) for (const e5 of t5.__watcherHandles) e5();
  return o5;
}
function baseURL() {
  return useRuntimeConfig2().app.baseURL;
}
function buildAssetsURL(...e4) {
  return joinRelativeURL(publicAssetsURL(), useRuntimeConfig2().app.buildAssetsDir, ...e4);
}
function publicAssetsURL(...e4) {
  const t5 = useRuntimeConfig2().app, o5 = t5.cdnURL || t5.baseURL;
  return e4.length ? joinRelativeURL(o5, ...e4) : o5;
}
function lazyCachedFunction(e4) {
  let t5 = null;
  return () => (null === t5 && (t5 = e4().catch((e5) => {
    throw t5 = null, e5;
  })), t5);
}
function is_primitive(e4) {
  return Object(e4) !== e4;
}
function is_plain_object(e4) {
  const t5 = Object.getPrototypeOf(e4);
  return t5 === Object.prototype || null === t5 || null === Object.getPrototypeOf(t5) || Object.getOwnPropertyNames(t5).sort().join("\0") === Mr;
}
function get_type(e4) {
  return Object.prototype.toString.call(e4).slice(8, -1);
}
function get_escaped_char(e4) {
  switch (e4) {
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
      return e4 < " " ? `\\u${e4.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(e4) {
  let t5 = "", n2 = 0;
  const r4 = e4.length;
  for (let o5 = 0; o5 < r4; o5 += 1) {
    const r5 = get_escaped_char(e4[o5]);
    r5 && (t5 += e4.slice(n2, o5) + r5, n2 = o5 + 1);
  }
  return `"${0 === n2 ? e4 : t5 + e4.slice(n2)}"`;
}
function enumerable_symbols(e4) {
  return Object.getOwnPropertySymbols(e4).filter((t5) => Object.getOwnPropertyDescriptor(e4, t5).enumerable);
}
function stringify_key(e4) {
  return Lr.test(e4) ? "." + e4 : "[" + JSON.stringify(e4) + "]";
}
function uneval(e4, t5) {
  const n2 = /* @__PURE__ */ new Map(), r4 = [], o5 = /* @__PURE__ */ new Map();
  !(/* @__PURE__ */ __name(function walk2(t6) {
    if (!is_primitive(t6)) {
      if (n2.has(t6)) return void n2.set(t6, n2.get(t6) + 1);
      if (n2.set(t6, 1), "function" == typeof t6) throw new DevalueError("Cannot stringify a function", r4, t6, e4);
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
          t6.forEach((e5, t7) => {
            r4.push(`[${t7}]`), walk2(e5), r4.pop();
          });
          break;
        case "Set":
          Array.from(t6).forEach(walk2);
          break;
        case "Map":
          for (const [e5, n3] of t6) r4.push(`.get(${is_primitive(e5) ? stringify_primitive$1(e5) : "..."})`), walk2(n3), r4.pop();
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
          return void walk2(t6.buffer);
        default:
          if (!is_plain_object(t6)) throw new DevalueError("Cannot stringify arbitrary non-POJOs", r4, t6, e4);
          if (enumerable_symbols(t6).length > 0) throw new DevalueError("Cannot stringify POJOs with symbolic keys", r4, t6, e4);
          for (const e5 in t6) r4.push(stringify_key(e5)), walk2(t6[e5]), r4.pop();
      }
    }
  }, "walk"))(e4);
  const s4 = /* @__PURE__ */ new Map();
  function stringify3(e5) {
    if (s4.has(e5)) return s4.get(e5);
    if (is_primitive(e5)) return stringify_primitive$1(e5);
    if (o5.has(e5)) return o5.get(e5);
    const t6 = get_type(e5);
    switch (t6) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify3(e5.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(e5.source)}, "${e5.flags}")`;
      case "Date":
        return `new Date(${e5.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(e5.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(e5.toString())})`;
      case "Array":
        const r5 = e5.map((t7, n3) => n3 in e5 ? stringify3(t7) : ""), o6 = 0 === e5.length || e5.length - 1 in e5 ? "" : ",";
        return `[${r5.join(",")}${o6}]`;
      case "Set":
      case "Map":
        return `new ${t6}([${Array.from(e5).map(stringify3).join(",")}])`;
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
        let r6 = `new ${t6}`;
        if (1 === n2.get(e5.buffer)) {
          r6 += `([${new e5.constructor(e5.buffer)}])`;
        } else r6 += `([${stringify3(e5.buffer)}])`;
        const o7 = e5.byteOffset, s6 = o7 + e5.byteLength;
        if (o7 > 0 || s6 !== e5.buffer.byteLength) {
          const e6 = +/(\d+)/.exec(t6)[1] / 8;
          r6 += `.subarray(${o7 / e6},${s6 / e6})`;
        }
        return r6;
      }
      case "ArrayBuffer":
        return `new Uint8Array([${new Uint8Array(e5).toString()}]).buffer`;
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${t6}.from(${stringify_string(e5.toString())})`;
      default:
        const s5 = Object.keys(e5), i5 = s5.map((t7) => `${(function(e6) {
          return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e6) ? e6 : escape_unsafe_chars(JSON.stringify(e6));
        })(t7)}:${stringify3(e5[t7])}`).join(",");
        return null === Object.getPrototypeOf(e5) ? s5.length > 0 ? `{${i5},__proto__:null}` : "{__proto__:null}" : `{${i5}}`;
    }
  }
  __name(stringify3, "stringify");
  Array.from(n2).filter((e5) => e5[1] > 1).sort((e5, t6) => t6[1] - e5[1]).forEach((e5, t6) => {
    s4.set(e5[0], (function(e6) {
      let t7 = "";
      do {
        t7 = Ir[e6 % 54] + t7, e6 = ~~(e6 / 54) - 1;
      } while (e6 >= 0);
      return jr.test(t7) ? `${t7}0` : t7;
    })(t6));
  });
  const i4 = stringify3(e4);
  if (s4.size) {
    const e5 = [], t6 = [], n3 = [];
    return s4.forEach((r5, s5) => {
      if (e5.push(r5), o5.has(s5)) return void n3.push(o5.get(s5));
      if (is_primitive(s5)) return void n3.push(stringify_primitive$1(s5));
      switch (get_type(s5)) {
        case "Number":
        case "String":
        case "Boolean":
          n3.push(`Object(${stringify3(s5.valueOf())})`);
          break;
        case "RegExp":
          n3.push(s5.toString());
          break;
        case "Date":
          n3.push(`new Date(${s5.getTime()})`);
          break;
        case "Array":
          n3.push(`Array(${s5.length})`), s5.forEach((e6, n4) => {
            t6.push(`${r5}[${n4}]=${stringify3(e6)}`);
          });
          break;
        case "Set":
          n3.push("new Set"), t6.push(`${r5}.${Array.from(s5).map((e6) => `add(${stringify3(e6)})`).join(".")}`);
          break;
        case "Map":
          n3.push("new Map"), t6.push(`${r5}.${Array.from(s5).map(([e6, t7]) => `set(${stringify3(e6)}, ${stringify3(t7)})`).join(".")}`);
          break;
        case "ArrayBuffer":
          n3.push(`new Uint8Array([${new Uint8Array(s5).join(",")}]).buffer`);
          break;
        default:
          n3.push(null === Object.getPrototypeOf(s5) ? "Object.create(null)" : "{}"), Object.keys(s5).forEach((e6) => {
            t6.push(`${r5}${(function(e7) {
              return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(e7) ? `.${e7}` : `[${escape_unsafe_chars(JSON.stringify(e7))}]`;
            })(e6)}=${stringify3(s5[e6])}`);
          });
      }
    }), t6.push(`return ${i4}`), `(function(${e5.join(",")}){${t6.join(";")}}(${n3.join(",")}))`;
  }
  return i4;
}
function escape_unsafe_char(e4) {
  return Hr[e4] || e4;
}
function escape_unsafe_chars(e4) {
  return e4.replace(Dr, escape_unsafe_char);
}
function stringify_primitive$1(e4) {
  if ("string" == typeof e4) return stringify_string(e4);
  if (void 0 === e4) return "void 0";
  if (0 === e4 && 1 / e4 < 0) return "-0";
  const t5 = String(e4);
  return "number" == typeof e4 ? t5.replace(/^(-)?0\./, "$1.") : "bigint" == typeof e4 ? e4 + "n" : t5;
}
function encode64(e4) {
  const t5 = new DataView(e4);
  let n2 = "";
  for (let r4 = 0; r4 < e4.byteLength; r4++) n2 += String.fromCharCode(t5.getUint8(r4));
  return (function(e5) {
    let t6 = "";
    for (let n3 = 0; n3 < e5.length; n3 += 3) {
      const r4 = [void 0, void 0, void 0, void 0];
      r4[0] = e5.charCodeAt(n3) >> 2, r4[1] = (3 & e5.charCodeAt(n3)) << 4, e5.length > n3 + 1 && (r4[1] |= e5.charCodeAt(n3 + 1) >> 4, r4[2] = (15 & e5.charCodeAt(n3 + 1)) << 2), e5.length > n3 + 2 && (r4[2] |= e5.charCodeAt(n3 + 2) >> 6, r4[3] = 63 & e5.charCodeAt(n3 + 2));
      for (let e6 = 0; e6 < r4.length; e6++) void 0 === r4[e6] ? t6 += "=" : t6 += Fr[r4[e6]];
    }
    return t6;
  })(n2);
}
function stringify(e4, t5) {
  const n2 = [], r4 = /* @__PURE__ */ new Map(), o5 = [];
  if (t5) for (const e5 of Object.getOwnPropertyNames(t5)) o5.push({ key: e5, fn: t5[e5] });
  const s4 = [];
  let i4 = 0;
  const a6 = (/* @__PURE__ */ __name(function flatten(t6) {
    if (void 0 === t6) return -1;
    if (Number.isNaN(t6)) return -3;
    if (t6 === 1 / 0) return -4;
    if (t6 === -1 / 0) return -5;
    if (0 === t6 && 1 / t6 < 0) return -6;
    if (r4.has(t6)) return r4.get(t6);
    const a7 = i4++;
    r4.set(t6, a7);
    for (const { key: e5, fn: r5 } of o5) {
      const o6 = r5(t6);
      if (o6) return n2[a7] = `["${e5}",${flatten(o6)}]`, a7;
    }
    if ("function" == typeof t6) throw new DevalueError("Cannot stringify a function", s4, t6, e4);
    let l3 = "";
    if (is_primitive(t6)) l3 = stringify_primitive(t6);
    else {
      const n3 = get_type(t6);
      switch (n3) {
        case "Number":
        case "String":
        case "Boolean":
          l3 = `["Object",${stringify_primitive(t6)}]`;
          break;
        case "BigInt":
          l3 = `["BigInt",${t6}]`;
          break;
        case "Date":
          l3 = `["Date","${!isNaN(t6.getDate()) ? t6.toISOString() : ""}"]`;
          break;
        case "URL":
          l3 = `["URL",${stringify_string(t6.toString())}]`;
          break;
        case "URLSearchParams":
          l3 = `["URLSearchParams",${stringify_string(t6.toString())}]`;
          break;
        case "RegExp":
          const { source: r5, flags: o6 } = t6;
          l3 = o6 ? `["RegExp",${stringify_string(r5)},"${o6}"]` : `["RegExp",${stringify_string(r5)}]`;
          break;
        case "Array":
          l3 = "[";
          for (let e5 = 0; e5 < t6.length; e5 += 1) e5 > 0 && (l3 += ","), e5 in t6 ? (s4.push(`[${e5}]`), l3 += flatten(t6[e5]), s4.pop()) : l3 += -2;
          l3 += "]";
          break;
        case "Set":
          l3 = '["Set"';
          for (const e5 of t6) l3 += `,${flatten(e5)}`;
          l3 += "]";
          break;
        case "Map":
          l3 = '["Map"';
          for (const [e5, n4] of t6) s4.push(`.get(${is_primitive(e5) ? stringify_primitive(e5) : "..."})`), l3 += `,${flatten(e5)},${flatten(n4)}`, s4.pop();
          l3 += "]";
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
          const e5 = t6;
          l3 = '["' + n3 + '",' + flatten(e5.buffer);
          const r6 = t6.byteOffset, o7 = r6 + t6.byteLength;
          if (r6 > 0 || o7 !== e5.buffer.byteLength) {
            const e6 = +/(\d+)/.exec(n3)[1] / 8;
            l3 += `,${r6 / e6},${o7 / e6}`;
          }
          l3 += "]";
          break;
        }
        case "ArrayBuffer":
          l3 = `["ArrayBuffer","${encode64(t6)}"]`;
          break;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          l3 = `["${n3}",${stringify_string(t6.toString())}]`;
          break;
        default:
          if (!is_plain_object(t6)) throw new DevalueError("Cannot stringify arbitrary non-POJOs", s4, t6, e4);
          if (enumerable_symbols(t6).length > 0) throw new DevalueError("Cannot stringify POJOs with symbolic keys", s4, t6, e4);
          if (null === Object.getPrototypeOf(t6)) {
            l3 = '["null"';
            for (const e5 in t6) s4.push(stringify_key(e5)), l3 += `,${stringify_string(e5)},${flatten(t6[e5])}`, s4.pop();
            l3 += "]";
          } else {
            l3 = "{";
            let e5 = false;
            for (const n4 in t6) e5 && (l3 += ","), e5 = true, s4.push(stringify_key(n4)), l3 += `${stringify_string(n4)}:${flatten(t6[n4])}`, s4.pop();
            l3 += "}";
          }
      }
    }
    return n2[a7] = l3, a7;
  }, "flatten"))(e4);
  return a6 < 0 ? `${a6}` : `[${n2.join(",")}]`;
}
function stringify_primitive(e4) {
  const t5 = typeof e4;
  return "string" === t5 ? stringify_string(e4) : e4 instanceof String ? stringify_string(e4.toString()) : void 0 === e4 ? (-1).toString() : 0 === e4 && 1 / e4 < 0 ? (-6).toString() : "bigint" === t5 ? `["BigInt","${e4}"]` : String(e4);
}
function renderPayloadJsonScript(e4) {
  const t5 = { type: "application/json", innerHTML: e4.data ? stringify(e4.data, e4.ssrContext._payloadReducers) : "", "data-nuxt-data": "nuxt-app", "data-ssr": !e4.ssrContext.noSSR, id: "__NUXT_DATA__" };
  e4.src && (t5["data-src"] = e4.src);
  return [t5, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${uneval(e4.ssrContext.config)}` }];
}
function splitPayload(e4) {
  const { data: t5, prerenderedAt: n2, ...r4 } = e4.payload;
  return { initial: { ...r4, prerenderedAt: n2 }, payload: { data: t5, prerenderedAt: n2 } };
}
function normalizeChunks(e4) {
  const t5 = [];
  for (const n2 of e4) {
    const e5 = n2?.trim();
    e5 && t5.push(e5);
  }
  return t5;
}
function joinTags(e4) {
  return e4.join("");
}
function joinAttrs(e4) {
  return 0 === e4.length ? "" : " " + e4.join(" ");
}
var pe2, de2, fe2, he2, ge2, me2, ye2, ve2, _e2, be2, sortTags, Ce2, ke2, Se2, Te2, isTruthy, we2, Re2, EffectScope, Ae2, ReactiveEffect, xe2, Ee2, Pe2, $e2, Ne2, Oe2, Link, Dep, Ve2, He2, Me2, Le2, Ie2, De2, je2, Fe2, BaseReactiveHandler, MutableReactiveHandler, ReadonlyReactiveHandler, Be2, Ue2, We2, ze2, toShallow, getProto, qe2, Ke2, Je2, Ge2, Ze2, Xe2, Ye2, Qe2, toReactive, toReadonly, RefImpl, et2, CustomRefImpl, ObjectRefImpl, GetterRefImpl, ComputedRefImpl, tt2, nt2, rt2, ot2, st2, it2, at2, lt2, ct2, ut2, pt2, dt2, getId, ft2, ht2, gt2, mt2, yt2, isTeleport, isTeleportDisabled, isTeleportDeferred, isTargetSVG, isTargetMathML, resolveTarget, vt2, _t2, bt2, Ct2, kt2, St2, recursiveGetSubtree, Tt2, wt2, Rt2, logMismatchError, getContainerType, isComment, At2, xt2, Et2, Pt2, isAsyncWrapper, isKeepAlive, $t2, createHook, Nt2, Ot2, Vt2, Ht2, Mt2, Lt2, It2, Dt2, jt2, Ft2, Bt2, getPublicInstance, Ut2, hasSetupBinding, Wt2, zt2, qt2, Kt2, Jt2, Gt2, Zt2, useSSRContext, getModelModifiers, Xt2, getFunctionalFallthrough, filterModelListeners, Yt2, createInternalObject, isInternalObject, Qt2, isInternalKey, normalizeSlotValue, normalizeSlot, normalizeObjectSlots, normalizeVNodeSlots, assignSlots, en2, isSuspense, tn2, nn2, rn2, on3, sn2, an2, ln2, cn2, un2, normalizeKey, normalizeRef, createVNode, pn2, dn2, fn, getCurrentInstance, hn2, gn2, setCurrentInstance, unsetCurrentInstance, mn2, yn2, vn2, _n2, computed, bn2, Cn3, kn2, Sn2, setDevtoolsHook, Tn2, wn2, Rn2, An2, xn2, En2, Pn2, $n, Nn2, On2, callHook, hasExplicitCallback, Vn2, Hn, Mn2, Ln2, In2, Dn2, jn, Fn2, Bn2, Un2, Wn, zn, qn, Kn, getNow, isNativeOn, patchProp, Jn, Gn, VueElement, Zn, Xn2, Yn, Qn, er, getModelAssigner, tr, nr, rr, or, sr, ir, ar, lr, cr, ur, pr, dr, render, createApp, createSSRApp, fr, initDirectivesForSSR, hr, VueResolver, gr, mr, yr, vr, _r, br, Cr, kr, Sr, Tr, wr, Rr, Ar, xr, Er, Pr, $r, getPrecomputedDependencies, Nr, Or, Vr, Hr, DevalueError, Mr, Lr, Ir, Dr, jr, Fr, Br, Ur, Wr, zr, qr2, Kr, Jr, Gr, Zr;
var init_renderer = __esm({
  ".output/server/chunks/routes/renderer.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_nitro();
    init_shared_esm_bundler();
    __name(getModuleDependencies, "getModuleDependencies");
    __name(getRequestDependencies, "getRequestDependencies");
    __name(renderStyles, "renderStyles");
    __name(renderResourceHints, "renderResourceHints");
    __name(renderResourceHeaders, "renderResourceHeaders");
    __name(getPreloadLinks, "getPreloadLinks");
    __name(getPrefetchLinks, "getPrefetchLinks");
    __name(renderScripts, "renderScripts");
    __name(createRenderer$1, "createRenderer$1");
    pe2 = /* @__PURE__ */ new Set(["meta", "link", "base"]);
    de2 = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
    fe2 = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
    he2 = /* @__PURE__ */ new Set(["title", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"]);
    ge2 = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
    me2 = /* @__PURE__ */ new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]);
    ye2 = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
    ve2 = /* @__PURE__ */ new Set(["theme-color", "google-site-verification", "og", "article", "book", "profile", "twitter", "author"]);
    _e2 = ["name", "property", "http-equiv"];
    be2 = /* @__PURE__ */ new Set(["viewport", "description", "keywords", "robots"]);
    __name(dedupeKey, "dedupeKey");
    __name(walkResolver, "walkResolver");
    __name(normalizeProps2, "normalizeProps");
    __name(normalizeTag, "normalizeTag");
    __name(normalizeEntryToTags, "normalizeEntryToTags");
    sortTags = /* @__PURE__ */ __name((e4, t5) => e4._w === t5._w ? e4._p - t5._p : e4._w - t5._w, "sortTags");
    Ce2 = { base: -10, title: 10 };
    ke2 = { critical: -8, high: -1, low: 2 };
    Se2 = { meta: { "content-security-policy": -30, charset: -20, viewport: -15 }, link: { preconnect: 20, stylesheet: 60, preload: 70, modulepreload: 70, prefetch: 90, "dns-prefetch": 90, prerender: 90 }, script: { async: 30, defer: 80, sync: 50 }, style: { imported: 40, sync: 60 } };
    Te2 = /@import/;
    isTruthy = /* @__PURE__ */ __name((e4) => "" === e4 || true === e4, "isTruthy");
    __name(tagWeight, "tagWeight");
    __name(registerPlugin, "registerPlugin");
    __name(createUnhead, "createUnhead");
    __name(encodeAttribute, "encodeAttribute");
    __name(propsToString, "propsToString");
    __name(tagToString, "tagToString");
    __name(renderSSRHead, "renderSSRHead");
    EffectScope = class {
      static {
        __name(this, "EffectScope");
      }
      constructor(e4 = false) {
        this.detached = e4, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = we2, !e4 && we2 && (this.index = (we2.scopes || (we2.scopes = [])).push(this) - 1);
      }
      get active() {
        return this._active;
      }
      pause() {
        if (this._active) {
          let e4, t5;
          if (this._isPaused = true, this.scopes) for (e4 = 0, t5 = this.scopes.length; e4 < t5; e4++) this.scopes[e4].pause();
          for (e4 = 0, t5 = this.effects.length; e4 < t5; e4++) this.effects[e4].pause();
        }
      }
      resume() {
        if (this._active && this._isPaused) {
          let e4, t5;
          if (this._isPaused = false, this.scopes) for (e4 = 0, t5 = this.scopes.length; e4 < t5; e4++) this.scopes[e4].resume();
          for (e4 = 0, t5 = this.effects.length; e4 < t5; e4++) this.effects[e4].resume();
        }
      }
      run(e4) {
        if (this._active) {
          const t5 = we2;
          try {
            return we2 = this, e4();
          } finally {
            we2 = t5;
          }
        }
      }
      on() {
        1 === ++this._on && (this.prevScope = we2, we2 = this);
      }
      off() {
        this._on > 0 && 0 === --this._on && (we2 = this.prevScope, this.prevScope = void 0);
      }
      stop(e4) {
        if (this._active) {
          let t5, n2;
          for (this._active = false, t5 = 0, n2 = this.effects.length; t5 < n2; t5++) this.effects[t5].stop();
          for (this.effects.length = 0, t5 = 0, n2 = this.cleanups.length; t5 < n2; t5++) this.cleanups[t5]();
          if (this.cleanups.length = 0, this.scopes) {
            for (t5 = 0, n2 = this.scopes.length; t5 < n2; t5++) this.scopes[t5].stop(true);
            this.scopes.length = 0;
          }
          if (!this.detached && this.parent && !e4) {
            const e5 = this.parent.scopes.pop();
            e5 && e5 !== this && (this.parent.scopes[this.index] = e5, e5.index = this.index);
          }
          this.parent = void 0;
        }
      }
    };
    __name(getCurrentScope, "getCurrentScope");
    Ae2 = /* @__PURE__ */ new WeakSet();
    ReactiveEffect = class {
      static {
        __name(this, "ReactiveEffect");
      }
      constructor(e4) {
        this.fn = e4, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, we2 && we2.active && we2.effects.push(this);
      }
      pause() {
        this.flags |= 64;
      }
      resume() {
        64 & this.flags && (this.flags &= -65, Ae2.has(this) && (Ae2.delete(this), this.trigger()));
      }
      notify() {
        2 & this.flags && !(32 & this.flags) || 8 & this.flags || batch(this);
      }
      run() {
        if (!(1 & this.flags)) return this.fn();
        this.flags |= 2, cleanupEffect(this), prepareDeps(this);
        const e4 = Re2, t5 = $e2;
        Re2 = this, $e2 = true;
        try {
          return this.fn();
        } finally {
          cleanupDeps(this), Re2 = e4, $e2 = t5, this.flags &= -3;
        }
      }
      stop() {
        if (1 & this.flags) {
          for (let e4 = this.deps; e4; e4 = e4.nextDep) removeSub(e4);
          this.deps = this.depsTail = void 0, cleanupEffect(this), this.onStop && this.onStop(), this.flags &= -2;
        }
      }
      trigger() {
        64 & this.flags ? Ae2.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
      }
      runIfDirty() {
        isDirty(this) && this.run();
      }
      get dirty() {
        return isDirty(this);
      }
    };
    Pe2 = 0;
    __name(batch, "batch");
    __name(startBatch, "startBatch");
    __name(endBatch, "endBatch");
    __name(prepareDeps, "prepareDeps");
    __name(cleanupDeps, "cleanupDeps");
    __name(isDirty, "isDirty");
    __name(refreshComputed, "refreshComputed");
    __name(removeSub, "removeSub");
    __name(removeDep, "removeDep");
    $e2 = true;
    Ne2 = [];
    __name(pauseTracking, "pauseTracking");
    __name(resetTracking, "resetTracking");
    __name(cleanupEffect, "cleanupEffect");
    Oe2 = 0;
    Link = class {
      static {
        __name(this, "Link");
      }
      constructor(e4, t5) {
        this.sub = e4, this.dep = t5, this.version = t5.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
      }
    };
    Dep = class {
      static {
        __name(this, "Dep");
      }
      constructor(e4) {
        this.computed = e4, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
      }
      track(e4) {
        if (!Re2 || !$e2 || Re2 === this.computed) return;
        let t5 = this.activeLink;
        if (void 0 === t5 || t5.sub !== Re2) t5 = this.activeLink = new Link(Re2, this), Re2.deps ? (t5.prevDep = Re2.depsTail, Re2.depsTail.nextDep = t5, Re2.depsTail = t5) : Re2.deps = Re2.depsTail = t5, addSub(t5);
        else if (-1 === t5.version && (t5.version = this.version, t5.nextDep)) {
          const e5 = t5.nextDep;
          e5.prevDep = t5.prevDep, t5.prevDep && (t5.prevDep.nextDep = e5), t5.prevDep = Re2.depsTail, t5.nextDep = void 0, Re2.depsTail.nextDep = t5, Re2.depsTail = t5, Re2.deps === t5 && (Re2.deps = e5);
        }
        return t5;
      }
      trigger(e4) {
        this.version++, Oe2++, this.notify(e4);
      }
      notify(e4) {
        startBatch();
        try {
          0;
          for (let e5 = this.subs; e5; e5 = e5.prevSub) e5.sub.notify() && e5.sub.dep.notify();
        } finally {
          endBatch();
        }
      }
    };
    __name(addSub, "addSub");
    Ve2 = /* @__PURE__ */ new WeakMap();
    He2 = Symbol("");
    Me2 = Symbol("");
    Le2 = Symbol("");
    __name(track, "track");
    __name(trigger, "trigger");
    __name(reactiveReadArray, "reactiveReadArray");
    __name(shallowReadArray, "shallowReadArray");
    __name(toWrapped, "toWrapped");
    Ie2 = { __proto__: null, [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, (e4) => toWrapped(this, e4));
    }, concat(...e4) {
      return reactiveReadArray(this).concat(...e4.map((e5) => i(e5) ? reactiveReadArray(e5) : e5));
    }, entries() {
      return iterator(this, "entries", (e4) => (e4[1] = toWrapped(this, e4[1]), e4));
    }, every(e4, t5) {
      return apply(this, "every", e4, t5, void 0, arguments);
    }, filter(e4, t5) {
      return apply(this, "filter", e4, t5, (e5) => e5.map((e6) => toWrapped(this, e6)), arguments);
    }, find(e4, t5) {
      return apply(this, "find", e4, t5, (e5) => toWrapped(this, e5), arguments);
    }, findIndex(e4, t5) {
      return apply(this, "findIndex", e4, t5, void 0, arguments);
    }, findLast(e4, t5) {
      return apply(this, "findLast", e4, t5, (e5) => toWrapped(this, e5), arguments);
    }, findLastIndex(e4, t5) {
      return apply(this, "findLastIndex", e4, t5, void 0, arguments);
    }, forEach(e4, t5) {
      return apply(this, "forEach", e4, t5, void 0, arguments);
    }, includes(...e4) {
      return searchProxy(this, "includes", e4);
    }, indexOf(...e4) {
      return searchProxy(this, "indexOf", e4);
    }, join(e4) {
      return reactiveReadArray(this).join(e4);
    }, lastIndexOf(...e4) {
      return searchProxy(this, "lastIndexOf", e4);
    }, map(e4, t5) {
      return apply(this, "map", e4, t5, void 0, arguments);
    }, pop() {
      return noTracking(this, "pop");
    }, push(...e4) {
      return noTracking(this, "push", e4);
    }, reduce(e4, ...t5) {
      return reduce(this, "reduce", e4, t5);
    }, reduceRight(e4, ...t5) {
      return reduce(this, "reduceRight", e4, t5);
    }, shift() {
      return noTracking(this, "shift");
    }, some(e4, t5) {
      return apply(this, "some", e4, t5, void 0, arguments);
    }, splice(...e4) {
      return noTracking(this, "splice", e4);
    }, toReversed() {
      return reactiveReadArray(this).toReversed();
    }, toSorted(e4) {
      return reactiveReadArray(this).toSorted(e4);
    }, toSpliced(...e4) {
      return reactiveReadArray(this).toSpliced(...e4);
    }, unshift(...e4) {
      return noTracking(this, "unshift", e4);
    }, values() {
      return iterator(this, "values", (e4) => toWrapped(this, e4));
    } };
    __name(iterator, "iterator");
    De2 = Array.prototype;
    __name(apply, "apply");
    __name(reduce, "reduce");
    __name(searchProxy, "searchProxy");
    __name(noTracking, "noTracking");
    je2 = makeMap("__proto__,__v_isRef,__isVue");
    Fe2 = new Set(Object.getOwnPropertyNames(Symbol).filter((e4) => "arguments" !== e4 && "caller" !== e4).map((e4) => Symbol[e4]).filter(isSymbol));
    __name(hasOwnProperty, "hasOwnProperty");
    BaseReactiveHandler = class {
      static {
        __name(this, "BaseReactiveHandler");
      }
      constructor(e4 = false, t5 = false) {
        this._isReadonly = e4, this._isShallow = t5;
      }
      get(e4, t5, n2) {
        if ("__v_skip" === t5) return e4.__v_skip;
        const r4 = this._isReadonly, o5 = this._isShallow;
        if ("__v_isReactive" === t5) return !r4;
        if ("__v_isReadonly" === t5) return r4;
        if ("__v_isShallow" === t5) return o5;
        if ("__v_raw" === t5) return n2 === (r4 ? o5 ? Qe2 : Ye2 : o5 ? Xe2 : Ze2).get(e4) || Object.getPrototypeOf(e4) === Object.getPrototypeOf(n2) ? e4 : void 0;
        const s4 = i(e4);
        if (!r4) {
          let e5;
          if (s4 && (e5 = Ie2[t5])) return e5;
          if ("hasOwnProperty" === t5) return hasOwnProperty;
        }
        const i4 = Reflect.get(e4, t5, isRef2(e4) ? e4 : n2);
        if (isSymbol(t5) ? Fe2.has(t5) : je2(t5)) return i4;
        if (r4 || track(e4, 0, t5), o5) return i4;
        if (isRef2(i4)) {
          const e5 = s4 && isIntegerKey(t5) ? i4 : i4.value;
          return r4 && isObject(e5) ? readonly(e5) : e5;
        }
        return isObject(i4) ? r4 ? readonly(i4) : reactive(i4) : i4;
      }
    };
    MutableReactiveHandler = class extends BaseReactiveHandler {
      static {
        __name(this, "MutableReactiveHandler");
      }
      constructor(e4 = false) {
        super(false, e4);
      }
      set(e4, t5, n2, r4) {
        let o5 = e4[t5];
        const s4 = i(e4) && isIntegerKey(t5);
        if (!this._isShallow) {
          const e5 = isReadonly(o5);
          if (isShallow(n2) || isReadonly(n2) || (o5 = toRaw(o5), n2 = toRaw(n2)), !s4 && isRef2(o5) && !isRef2(n2)) return e5 || (o5.value = n2), true;
        }
        const i4 = s4 ? Number(t5) < e4.length : hasOwn(e4, t5), a6 = Reflect.set(e4, t5, n2, isRef2(e4) ? e4 : r4);
        return e4 === toRaw(r4) && (i4 ? hasChanged(n2, o5) && trigger(e4, "set", t5, n2) : trigger(e4, "add", t5, n2)), a6;
      }
      deleteProperty(e4, t5) {
        const n2 = hasOwn(e4, t5);
        e4[t5];
        const r4 = Reflect.deleteProperty(e4, t5);
        return r4 && n2 && trigger(e4, "delete", t5, void 0), r4;
      }
      has(e4, t5) {
        const n2 = Reflect.has(e4, t5);
        return isSymbol(t5) && Fe2.has(t5) || track(e4, 0, t5), n2;
      }
      ownKeys(e4) {
        return track(e4, 0, i(e4) ? "length" : He2), Reflect.ownKeys(e4);
      }
    };
    ReadonlyReactiveHandler = class extends BaseReactiveHandler {
      static {
        __name(this, "ReadonlyReactiveHandler");
      }
      constructor(e4 = false) {
        super(true, e4);
      }
      set(e4, t5) {
        return true;
      }
      deleteProperty(e4, t5) {
        return true;
      }
    };
    Be2 = new MutableReactiveHandler();
    Ue2 = new ReadonlyReactiveHandler();
    We2 = new MutableReactiveHandler(true);
    ze2 = new ReadonlyReactiveHandler(true);
    toShallow = /* @__PURE__ */ __name((e4) => e4, "toShallow");
    getProto = /* @__PURE__ */ __name((e4) => Reflect.getPrototypeOf(e4), "getProto");
    __name(createReadonlyMethod, "createReadonlyMethod");
    __name(createInstrumentations, "createInstrumentations");
    __name(createInstrumentationGetter, "createInstrumentationGetter");
    qe2 = { get: createInstrumentationGetter(false, false) };
    Ke2 = { get: createInstrumentationGetter(false, true) };
    Je2 = { get: createInstrumentationGetter(true, false) };
    Ge2 = { get: createInstrumentationGetter(true, true) };
    Ze2 = /* @__PURE__ */ new WeakMap();
    Xe2 = /* @__PURE__ */ new WeakMap();
    Ye2 = /* @__PURE__ */ new WeakMap();
    Qe2 = /* @__PURE__ */ new WeakMap();
    __name(reactive, "reactive");
    __name(shallowReactive, "shallowReactive");
    __name(readonly, "readonly");
    __name(shallowReadonly, "shallowReadonly");
    __name(createReactiveObject, "createReactiveObject");
    __name(isReactive, "isReactive");
    __name(isReadonly, "isReadonly");
    __name(isShallow, "isShallow");
    __name(isProxy, "isProxy");
    __name(toRaw, "toRaw");
    __name(markRaw, "markRaw");
    toReactive = /* @__PURE__ */ __name((e4) => isObject(e4) ? reactive(e4) : e4, "toReactive");
    toReadonly = /* @__PURE__ */ __name((e4) => isObject(e4) ? readonly(e4) : e4, "toReadonly");
    __name(isRef2, "isRef");
    __name(ref2, "ref");
    __name(shallowRef, "shallowRef");
    __name(createRef, "createRef");
    RefImpl = class {
      static {
        __name(this, "RefImpl");
      }
      constructor(e4, t5) {
        this.dep = new Dep(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = t5 ? e4 : toRaw(e4), this._value = t5 ? e4 : toReactive(e4), this.__v_isShallow = t5;
      }
      get value() {
        return this.dep.track(), this._value;
      }
      set value(e4) {
        const t5 = this._rawValue, n2 = this.__v_isShallow || isShallow(e4) || isReadonly(e4);
        e4 = n2 ? e4 : toRaw(e4), hasChanged(e4, t5) && (this._rawValue = e4, this._value = n2 ? e4 : toReactive(e4), this.dep.trigger());
      }
    };
    __name(unref2, "unref");
    __name(toValue, "toValue");
    et2 = { get: /* @__PURE__ */ __name((e4, t5, n2) => "__v_raw" === t5 ? e4 : unref2(Reflect.get(e4, t5, n2)), "get"), set: /* @__PURE__ */ __name((e4, t5, n2, r4) => {
      const o5 = e4[t5];
      return isRef2(o5) && !isRef2(n2) ? (o5.value = n2, true) : Reflect.set(e4, t5, n2, r4);
    }, "set") };
    __name(proxyRefs, "proxyRefs");
    CustomRefImpl = class {
      static {
        __name(this, "CustomRefImpl");
      }
      constructor(e4) {
        this.__v_isRef = true, this._value = void 0;
        const t5 = this.dep = new Dep(), { get: n2, set: r4 } = e4(t5.track.bind(t5), t5.trigger.bind(t5));
        this._get = n2, this._set = r4;
      }
      get value() {
        return this._value = this._get();
      }
      set value(e4) {
        this._set(e4);
      }
    };
    __name(customRef, "customRef");
    ObjectRefImpl = class {
      static {
        __name(this, "ObjectRefImpl");
      }
      constructor(e4, t5, n2) {
        this._object = e4, this._key = t5, this._defaultValue = n2, this.__v_isRef = true, this._value = void 0, this._raw = toRaw(e4);
        let r4 = true, o5 = e4;
        if (!i(e4) || !isIntegerKey(String(t5))) do {
          r4 = !isProxy(o5) || isShallow(o5);
        } while (r4 && (o5 = o5.__v_raw));
        this._shallow = r4;
      }
      get value() {
        let e4 = this._object[this._key];
        return this._shallow && (e4 = unref2(e4)), this._value = void 0 === e4 ? this._defaultValue : e4;
      }
      set value(e4) {
        if (this._shallow && isRef2(this._raw[this._key])) {
          const t5 = this._object[this._key];
          if (isRef2(t5)) return void (t5.value = e4);
        }
        this._object[this._key] = e4;
      }
      get dep() {
        return (function(e4, t5) {
          const n2 = Ve2.get(e4);
          return n2 && n2.get(t5);
        })(this._raw, this._key);
      }
    };
    GetterRefImpl = class {
      static {
        __name(this, "GetterRefImpl");
      }
      constructor(e4) {
        this._getter = e4, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
      }
      get value() {
        return this._value = this._getter();
      }
    };
    __name(propertyToRef, "propertyToRef");
    ComputedRefImpl = class {
      static {
        __name(this, "ComputedRefImpl");
      }
      constructor(e4, t5, n2) {
        this.fn = e4, this.setter = t5, this._value = void 0, this.dep = new Dep(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Oe2 - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t5, this.isSSR = n2;
      }
      notify() {
        if (this.flags |= 16, !(8 & this.flags) && Re2 !== this) return batch(this, true), true;
      }
      get value() {
        const e4 = this.dep.track();
        return refreshComputed(this), e4 && (e4.version = this.dep.version), this._value;
      }
      set value(e4) {
        this.setter && this.setter(e4);
      }
    };
    tt2 = {};
    nt2 = /* @__PURE__ */ new WeakMap();
    __name(onWatcherCleanup, "onWatcherCleanup");
    __name(traverse, "traverse");
    ot2 = [];
    st2 = { sp: "serverPrefetch hook", bc: "beforeCreate hook", c: "created hook", bm: "beforeMount hook", m: "mounted hook", bu: "beforeUpdate hook", u: "updated", bum: "beforeUnmount hook", um: "unmounted hook", a: "activated hook", da: "deactivated hook", ec: "errorCaptured hook", rtc: "renderTracked hook", rtg: "renderTriggered hook", 0: "setup function", 1: "render function", 2: "watcher getter", 3: "watcher callback", 4: "watcher cleanup function", 5: "native event handler", 6: "component event handler", 7: "vnode hook", 8: "directive hook", 9: "transition hook", 10: "app errorHandler", 11: "app warnHandler", 12: "ref function", 13: "async component loader", 14: "scheduler flush", 15: "component update", 16: "app unmount cleanup function" };
    __name(callWithErrorHandling, "callWithErrorHandling");
    __name(callWithAsyncErrorHandling, "callWithAsyncErrorHandling");
    __name(handleError, "handleError");
    it2 = [];
    at2 = -1;
    lt2 = [];
    ct2 = null;
    ut2 = 0;
    pt2 = Promise.resolve();
    dt2 = null;
    __name(nextTick2, "nextTick");
    __name(queueJob, "queueJob");
    __name(queueFlush, "queueFlush");
    __name(queuePostFlushCb, "queuePostFlushCb");
    __name(flushPreFlushCbs, "flushPreFlushCbs");
    __name(flushPostFlushCbs, "flushPostFlushCbs");
    getId = /* @__PURE__ */ __name((e4) => null == e4.id ? 2 & e4.flags ? -1 : 1 / 0 : e4.id, "getId");
    __name(flushJobs, "flushJobs");
    ht2 = [];
    gt2 = null;
    mt2 = null;
    __name(setCurrentRenderingInstance$1, "setCurrentRenderingInstance$1");
    __name(withCtx, "withCtx");
    __name(invokeDirectiveHook, "invokeDirectiveHook");
    yt2 = Symbol("_vte");
    isTeleport = /* @__PURE__ */ __name((e4) => e4.__isTeleport, "isTeleport");
    isTeleportDisabled = /* @__PURE__ */ __name((e4) => e4 && (e4.disabled || "" === e4.disabled), "isTeleportDisabled");
    isTeleportDeferred = /* @__PURE__ */ __name((e4) => e4 && (e4.defer || "" === e4.defer), "isTeleportDeferred");
    isTargetSVG = /* @__PURE__ */ __name((e4) => "undefined" != typeof SVGElement && e4 instanceof SVGElement, "isTargetSVG");
    isTargetMathML = /* @__PURE__ */ __name((e4) => "function" == typeof MathMLElement && e4 instanceof MathMLElement, "isTargetMathML");
    resolveTarget = /* @__PURE__ */ __name((e4, t5) => {
      const n2 = e4 && e4.to;
      if (isString(n2)) {
        if (t5) {
          return t5(n2);
        }
        return null;
      }
      return n2;
    }, "resolveTarget");
    vt2 = { name: "Teleport", __isTeleport: true, process(e4, t5, n2, r4, o5, s4, i4, a6, l3, c4) {
      const { mc: u3, pc: p3, pbc: d3, o: { insert: f3, querySelector: g4, createText: m3, createComment: y4 } } = c4, v3 = isTeleportDisabled(t5.props);
      let { shapeFlag: _3, children: b4, dynamicChildren: C3 } = t5;
      if (null == e4) {
        const e5 = t5.el = m3(""), c5 = t5.anchor = m3("");
        f3(e5, n2, r4), f3(c5, n2, r4);
        const mount = /* @__PURE__ */ __name((e6, t6) => {
          16 & _3 && u3(b4, e6, t6, o5, s4, i4, a6, l3);
        }, "mount"), mountToTarget = /* @__PURE__ */ __name(() => {
          const e6 = t5.target = resolveTarget(t5.props, g4), n3 = prepareAnchor(e6, t5, m3, f3);
          e6 && ("svg" !== i4 && isTargetSVG(e6) ? i4 = "svg" : "mathml" !== i4 && isTargetMathML(e6) && (i4 = "mathml"), o5 && o5.isCE && (o5.ce._teleportTargets || (o5.ce._teleportTargets = /* @__PURE__ */ new Set())).add(e6), v3 || (mount(e6, n3), updateCssVars(t5, false)));
        }, "mountToTarget");
        v3 && (mount(n2, c5), updateCssVars(t5, true)), isTeleportDeferred(t5.props) ? (t5.el.__isMounted = false, en2(() => {
          mountToTarget(), delete t5.el.__isMounted;
        }, s4)) : mountToTarget();
      } else {
        if (isTeleportDeferred(t5.props) && false === e4.el.__isMounted) return void en2(() => {
          vt2.process(e4, t5, n2, r4, o5, s4, i4, a6, l3, c4);
        }, s4);
        t5.el = e4.el, t5.targetStart = e4.targetStart;
        const u4 = t5.anchor = e4.anchor, f4 = t5.target = e4.target, m4 = t5.targetAnchor = e4.targetAnchor, y5 = isTeleportDisabled(e4.props), _4 = y5 ? n2 : f4, b5 = y5 ? u4 : m4;
        if ("svg" === i4 || isTargetSVG(f4) ? i4 = "svg" : ("mathml" === i4 || isTargetMathML(f4)) && (i4 = "mathml"), C3 ? (d3(e4.dynamicChildren, C3, _4, o5, s4, i4, a6), traverseStaticChildren(e4, t5, true)) : l3 || p3(e4, t5, _4, b5, o5, s4, i4, a6, false), v3) y5 ? t5.props && e4.props && t5.props.to !== e4.props.to && (t5.props.to = e4.props.to) : moveTeleport(t5, n2, u4, c4, 1);
        else if ((t5.props && t5.props.to) !== (e4.props && e4.props.to)) {
          const e5 = t5.target = resolveTarget(t5.props, g4);
          e5 && moveTeleport(t5, e5, null, c4, 0);
        } else y5 && moveTeleport(t5, f4, m4, c4, 1);
        updateCssVars(t5, v3);
      }
    }, remove(e4, t5, n2, { um: r4, o: { remove: o5 } }, s4) {
      const { shapeFlag: i4, children: a6, anchor: l3, targetStart: c4, targetAnchor: u3, target: p3, props: d3 } = e4;
      if (p3 && (o5(c4), o5(u3)), s4 && o5(l3), 16 & i4) {
        const e5 = s4 || !isTeleportDisabled(d3);
        for (let o6 = 0; o6 < a6.length; o6++) {
          const s5 = a6[o6];
          r4(s5, t5, n2, e5, !!s5.dynamicChildren);
        }
      }
    }, move: moveTeleport, hydrate: /* @__PURE__ */ __name(function(e4, t5, n2, r4, o5, s4, { o: { nextSibling: i4, parentNode: a6, querySelector: l3, insert: c4, createText: u3 } }, p3) {
      function hydrateDisabledTeleport(e5, t6, l4, c5) {
        t6.anchor = p3(i4(e5), t6, a6(e5), n2, r4, o5, s4), t6.targetStart = l4, t6.targetAnchor = c5;
      }
      __name(hydrateDisabledTeleport, "hydrateDisabledTeleport");
      const d3 = t5.target = resolveTarget(t5.props, l3), f3 = isTeleportDisabled(t5.props);
      if (d3) {
        const a7 = d3._lpa || d3.firstChild;
        if (16 & t5.shapeFlag) if (f3) hydrateDisabledTeleport(e4, t5, a7, a7 && i4(a7));
        else {
          t5.anchor = i4(e4);
          let l4 = a7;
          for (; l4; ) {
            if (l4 && 8 === l4.nodeType) {
              if ("teleport start anchor" === l4.data) t5.targetStart = l4;
              else if ("teleport anchor" === l4.data) {
                t5.targetAnchor = l4, d3._lpa = t5.targetAnchor && i4(t5.targetAnchor);
                break;
              }
            }
            l4 = i4(l4);
          }
          t5.targetAnchor || prepareAnchor(d3, t5, u3, c4), p3(a7 && i4(a7), t5, d3, n2, r4, o5, s4);
        }
        updateCssVars(t5, f3);
      } else f3 && 16 & t5.shapeFlag && hydrateDisabledTeleport(e4, t5, e4, i4(e4));
      return t5.anchor && i4(t5.anchor);
    }, "hydrate") };
    __name(moveTeleport, "moveTeleport");
    _t2 = vt2;
    __name(updateCssVars, "updateCssVars");
    __name(prepareAnchor, "prepareAnchor");
    bt2 = Symbol("_leaveCb");
    Ct2 = Symbol("_enterCb");
    __name(useTransitionState, "useTransitionState");
    kt2 = [Function, Array];
    St2 = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: kt2, onEnter: kt2, onAfterEnter: kt2, onEnterCancelled: kt2, onBeforeLeave: kt2, onLeave: kt2, onAfterLeave: kt2, onLeaveCancelled: kt2, onBeforeAppear: kt2, onAppear: kt2, onAfterAppear: kt2, onAppearCancelled: kt2 };
    recursiveGetSubtree = /* @__PURE__ */ __name((e4) => {
      const t5 = e4.subTree;
      return t5.component ? recursiveGetSubtree(t5.component) : t5;
    }, "recursiveGetSubtree");
    __name(findNonCommentChild, "findNonCommentChild");
    Tt2 = { name: "BaseTransition", props: St2, setup(e4, { slots: t5 }) {
      const n2 = getCurrentInstance(), r4 = useTransitionState();
      return () => {
        const o5 = t5.default && getTransitionRawChildren(t5.default(), true);
        if (!o5 || !o5.length) return;
        const s4 = findNonCommentChild(o5), i4 = toRaw(e4), { mode: a6 } = i4;
        if (r4.isLeaving) return emptyPlaceholder(s4);
        const l3 = getInnerChild$1(s4);
        if (!l3) return emptyPlaceholder(s4);
        let c4 = resolveTransitionHooks(l3, i4, r4, n2, (e5) => c4 = e5);
        l3.type !== sn2 && setTransitionHooks(l3, c4);
        let u3 = n2.subTree && getInnerChild$1(n2.subTree);
        if (u3 && u3.type !== sn2 && !isSameVNodeType(u3, l3) && recursiveGetSubtree(n2).type !== sn2) {
          let e5 = resolveTransitionHooks(u3, i4, r4, n2);
          if (setTransitionHooks(u3, e5), "out-in" === a6 && l3.type !== sn2) return r4.isLeaving = true, e5.afterLeave = () => {
            r4.isLeaving = false, 8 & n2.job.flags || n2.update(), delete e5.afterLeave, u3 = void 0;
          }, emptyPlaceholder(s4);
          "in-out" === a6 && l3.type !== sn2 ? e5.delayLeave = (e6, t6, n3) => {
            getLeavingNodesForType(r4, u3)[String(u3.key)] = u3, e6[bt2] = () => {
              t6(), e6[bt2] = void 0, delete c4.delayedLeave, u3 = void 0;
            }, c4.delayedLeave = () => {
              n3(), delete c4.delayedLeave, u3 = void 0;
            };
          } : u3 = void 0;
        } else u3 && (u3 = void 0);
        return s4;
      };
    } };
    __name(getLeavingNodesForType, "getLeavingNodesForType");
    __name(resolveTransitionHooks, "resolveTransitionHooks");
    __name(emptyPlaceholder, "emptyPlaceholder");
    __name(getInnerChild$1, "getInnerChild$1");
    __name(setTransitionHooks, "setTransitionHooks");
    __name(getTransitionRawChildren, "getTransitionRawChildren");
    __name(defineComponent, "defineComponent");
    __name(markAsyncBoundary, "markAsyncBoundary");
    wt2 = /* @__PURE__ */ new WeakMap();
    __name(setRef, "setRef");
    __name(invalidatePendingSetRef, "invalidatePendingSetRef");
    Rt2 = false;
    logMismatchError = /* @__PURE__ */ __name(() => {
      Rt2 || (console.error("Hydration completed but contains mismatches."), Rt2 = true);
    }, "logMismatchError");
    getContainerType = /* @__PURE__ */ __name((e4) => {
      if (1 === e4.nodeType) return ((e5) => e5.namespaceURI.includes("svg") && "foreignObject" !== e5.tagName)(e4) ? "svg" : ((e5) => e5.namespaceURI.includes("MathML"))(e4) ? "mathml" : void 0;
    }, "getContainerType");
    isComment = /* @__PURE__ */ __name((e4) => 8 === e4.nodeType, "isComment");
    __name(createHydrationFunctions, "createHydrationFunctions");
    At2 = "data-allow-mismatch";
    xt2 = { 0: "text", 1: "children", 2: "class", 3: "style", 4: "attribute" };
    __name(isMismatchAllowed, "isMismatchAllowed");
    Et2 = getGlobalThis().requestIdleCallback || ((e4) => setTimeout(e4, 1));
    Pt2 = getGlobalThis().cancelIdleCallback || ((e4) => clearTimeout(e4));
    isAsyncWrapper = /* @__PURE__ */ __name((e4) => !!e4.type.__asyncLoader, "isAsyncWrapper");
    __name(createInnerComp, "createInnerComp");
    isKeepAlive = /* @__PURE__ */ __name((e4) => e4.type.__isKeepAlive, "isKeepAlive");
    $t2 = { name: "KeepAlive", __isKeepAlive: true, props: { include: [String, RegExp, Array], exclude: [String, RegExp, Array], max: [String, Number] }, setup(e4, { slots: t5 }) {
      const n2 = getCurrentInstance(), r4 = n2.ctx;
      if (!r4.renderer) return () => {
        const e5 = t5.default && t5.default();
        return e5 && 1 === e5.length ? e5[0] : e5;
      };
      const o5 = /* @__PURE__ */ new Map(), s4 = /* @__PURE__ */ new Set();
      let i4 = null;
      const a6 = n2.suspense, { renderer: { p: l3, m: c4, um: u3, o: { createElement: p3 } } } = r4, d3 = p3("div");
      function unmount(e5) {
        resetShapeFlag(e5), u3(e5, n2, a6, true);
      }
      __name(unmount, "unmount");
      function pruneCache(e5) {
        o5.forEach((t6, n3) => {
          const r5 = getComponentName(t6.type);
          r5 && !e5(r5) && pruneCacheEntry(n3);
        });
      }
      __name(pruneCache, "pruneCache");
      function pruneCacheEntry(e5) {
        const t6 = o5.get(e5);
        !t6 || i4 && isSameVNodeType(t6, i4) ? i4 && resetShapeFlag(i4) : unmount(t6), o5.delete(e5), s4.delete(e5);
      }
      __name(pruneCacheEntry, "pruneCacheEntry");
      r4.activate = (e5, t6, n3, r5, o6) => {
        const s5 = e5.component;
        c4(e5, t6, n3, 0, a6), l3(s5.vnode, e5, t6, n3, s5, a6, r5, e5.slotScopeIds, o6), en2(() => {
          s5.isDeactivated = false, s5.a && invokeArrayFns(s5.a);
          const t7 = e5.props && e5.props.onVnodeMounted;
          t7 && invokeVNodeHook(t7, s5.parent, e5);
        }, a6);
      }, r4.deactivate = (e5) => {
        const t6 = e5.component;
        invalidateMount(t6.m), invalidateMount(t6.a), c4(e5, d3, null, 1, a6), en2(() => {
          t6.da && invokeArrayFns(t6.da);
          const n3 = e5.props && e5.props.onVnodeUnmounted;
          n3 && invokeVNodeHook(n3, t6.parent, e5), t6.isDeactivated = true;
        }, a6);
      }, watch(() => [e4.include, e4.exclude], ([e5, t6]) => {
        e5 && pruneCache((t7) => matches(e5, t7)), t6 && pruneCache((e6) => !matches(t6, e6));
      }, { flush: "post", deep: true });
      let f3 = null;
      const cacheSubtree = /* @__PURE__ */ __name(() => {
        null != f3 && (isSuspense(n2.subTree.type) ? en2(() => {
          o5.set(f3, getInnerChild(n2.subTree));
        }, n2.subTree.suspense) : o5.set(f3, getInnerChild(n2.subTree)));
      }, "cacheSubtree");
      return Ot2(cacheSubtree), Ht2(cacheSubtree), Mt2(() => {
        o5.forEach((e5) => {
          const { subTree: t6, suspense: r5 } = n2, o6 = getInnerChild(t6);
          if (e5.type === o6.type && e5.key === o6.key) {
            resetShapeFlag(o6);
            const e6 = o6.component.da;
            return void (e6 && en2(e6, r5));
          }
          unmount(e5);
        });
      }), () => {
        if (f3 = null, !t5.default) return i4 = null;
        const n3 = t5.default(), r5 = n3[0];
        if (n3.length > 1) return i4 = null, n3;
        if (!(isVNode$2(r5) && (4 & r5.shapeFlag || 128 & r5.shapeFlag))) return i4 = null, r5;
        let a7 = getInnerChild(r5);
        if (a7.type === sn2) return i4 = null, a7;
        const l4 = a7.type, c5 = getComponentName(isAsyncWrapper(a7) ? a7.type.__asyncResolved || {} : l4), { include: u4, exclude: p4, max: d4 } = e4;
        if (u4 && (!c5 || !matches(u4, c5)) || p4 && c5 && matches(p4, c5)) return a7.shapeFlag &= -257, i4 = a7, r5;
        const g4 = null == a7.key ? l4 : a7.key, m3 = o5.get(g4);
        return a7.el && (a7 = cloneVNode(a7), 128 & r5.shapeFlag && (r5.ssContent = a7)), f3 = g4, m3 ? (a7.el = m3.el, a7.component = m3.component, a7.transition && setTransitionHooks(a7, a7.transition), a7.shapeFlag |= 512, s4.delete(g4), s4.add(g4)) : (s4.add(g4), d4 && s4.size > parseInt(d4, 10) && pruneCacheEntry(s4.values().next().value)), a7.shapeFlag |= 256, i4 = a7, isSuspense(r5.type) ? r5 : a7;
      };
    } };
    __name(matches, "matches");
    __name(onActivated, "onActivated");
    __name(onDeactivated, "onDeactivated");
    __name(registerKeepAliveHook, "registerKeepAliveHook");
    __name(injectToKeepAliveRoot, "injectToKeepAliveRoot");
    __name(resetShapeFlag, "resetShapeFlag");
    __name(getInnerChild, "getInnerChild");
    __name(injectHook, "injectHook");
    createHook = /* @__PURE__ */ __name((e4) => (t5, n2 = fn) => {
      vn2 && "sp" !== e4 || injectHook(e4, (...e5) => t5(...e5), n2);
    }, "createHook");
    Nt2 = createHook("bm");
    Ot2 = createHook("m");
    Vt2 = createHook("bu");
    Ht2 = createHook("u");
    Mt2 = createHook("bum");
    Lt2 = createHook("um");
    It2 = createHook("sp");
    Dt2 = createHook("rtg");
    jt2 = createHook("rtc");
    __name(onErrorCaptured, "onErrorCaptured");
    Ft2 = "components";
    Bt2 = Symbol.for("v-ndc");
    __name(resolveAsset, "resolveAsset");
    __name(resolve, "resolve");
    __name(ensureValidVNode$1, "ensureValidVNode$1");
    getPublicInstance = /* @__PURE__ */ __name((e4) => e4 ? isStatefulComponent(e4) ? getComponentPublicInstance(e4) : getPublicInstance(e4.parent) : null, "getPublicInstance");
    Ut2 = n(/* @__PURE__ */ Object.create(null), { $: /* @__PURE__ */ __name((e4) => e4, "$"), $el: /* @__PURE__ */ __name((e4) => e4.vnode.el, "$el"), $data: /* @__PURE__ */ __name((e4) => e4.data, "$data"), $props: /* @__PURE__ */ __name((e4) => e4.props, "$props"), $attrs: /* @__PURE__ */ __name((e4) => e4.attrs, "$attrs"), $slots: /* @__PURE__ */ __name((e4) => e4.slots, "$slots"), $refs: /* @__PURE__ */ __name((e4) => e4.refs, "$refs"), $parent: /* @__PURE__ */ __name((e4) => getPublicInstance(e4.parent), "$parent"), $root: /* @__PURE__ */ __name((e4) => getPublicInstance(e4.root), "$root"), $host: /* @__PURE__ */ __name((e4) => e4.ce, "$host"), $emit: /* @__PURE__ */ __name((e4) => e4.emit, "$emit"), $options: /* @__PURE__ */ __name((e4) => resolveMergedOptions(e4), "$options"), $forceUpdate: /* @__PURE__ */ __name((e4) => e4.f || (e4.f = () => {
      queueJob(e4.update);
    }), "$forceUpdate"), $nextTick: /* @__PURE__ */ __name((e4) => e4.n || (e4.n = nextTick2.bind(e4.proxy)), "$nextTick"), $watch: /* @__PURE__ */ __name((e4) => instanceWatch.bind(e4), "$watch") });
    hasSetupBinding = /* @__PURE__ */ __name((e4, t5) => e4 !== t && !e4.__isScriptSetup && hasOwn(e4, t5), "hasSetupBinding");
    Wt2 = { get({ _: e4 }, t5) {
      if ("__v_skip" === t5) return true;
      const { ctx: n2, setupState: r4, data: o5, props: s4, accessCache: i4, type: a6, appContext: l3 } = e4;
      if ("$" !== t5[0]) {
        const e5 = i4[t5];
        if (void 0 !== e5) switch (e5) {
          case 1:
            return r4[t5];
          case 2:
            return o5[t5];
          case 4:
            return n2[t5];
          case 3:
            return s4[t5];
        }
        else {
          if (hasSetupBinding(r4, t5)) return i4[t5] = 1, r4[t5];
          if (o5 !== t && hasOwn(o5, t5)) return i4[t5] = 2, o5[t5];
          if (hasOwn(s4, t5)) return i4[t5] = 3, s4[t5];
          if (n2 !== t && hasOwn(n2, t5)) return i4[t5] = 4, n2[t5];
          qt2 && (i4[t5] = 0);
        }
      }
      const c4 = Ut2[t5];
      let u3, p3;
      return c4 ? ("$attrs" === t5 && track(e4.attrs, 0, ""), c4(e4)) : (u3 = a6.__cssModules) && (u3 = u3[t5]) ? u3 : n2 !== t && hasOwn(n2, t5) ? (i4[t5] = 4, n2[t5]) : (p3 = l3.config.globalProperties, hasOwn(p3, t5) ? p3[t5] : void 0);
    }, set({ _: e4 }, t5, n2) {
      const { data: r4, setupState: o5, ctx: s4 } = e4;
      return hasSetupBinding(o5, t5) ? (o5[t5] = n2, true) : r4 !== t && hasOwn(r4, t5) ? (r4[t5] = n2, true) : !hasOwn(e4.props, t5) && (("$" !== t5[0] || !(t5.slice(1) in e4)) && (s4[t5] = n2, true));
    }, has({ _: { data: e4, setupState: t5, accessCache: n2, ctx: r4, appContext: o5, props: s4, type: i4 } }, a6) {
      let l3;
      return !!(n2[a6] || e4 !== t && "$" !== a6[0] && hasOwn(e4, a6) || hasSetupBinding(t5, a6) || hasOwn(s4, a6) || hasOwn(r4, a6) || hasOwn(Ut2, a6) || hasOwn(o5.config.globalProperties, a6) || (l3 = i4.__cssModules) && l3[a6]);
    }, defineProperty(e4, t5, n2) {
      return null != n2.get ? e4._.accessCache[t5] = 0 : hasOwn(n2, "value") && this.set(e4, t5, n2.value, null), Reflect.defineProperty(e4, t5, n2);
    } };
    zt2 = n({}, Wt2, { get(e4, t5) {
      if (t5 !== Symbol.unscopables) return Wt2.get(e4, t5, e4);
    }, has: /* @__PURE__ */ __name((e4, t5) => "_" !== t5[0] && !E(t5), "has") });
    __name(getContext2, "getContext");
    __name(normalizePropsOrEmits, "normalizePropsOrEmits");
    qt2 = true;
    __name(applyOptions, "applyOptions");
    __name(callHook$1, "callHook$1");
    __name(createWatcher, "createWatcher");
    __name(resolveMergedOptions, "resolveMergedOptions");
    __name(mergeOptions, "mergeOptions");
    Kt2 = { data: mergeDataFn, props: mergeEmitsOrPropsOptions, emits: mergeEmitsOrPropsOptions, methods: mergeObjectOptions, computed: mergeObjectOptions, beforeCreate: mergeAsArray2, created: mergeAsArray2, beforeMount: mergeAsArray2, mounted: mergeAsArray2, beforeUpdate: mergeAsArray2, updated: mergeAsArray2, beforeDestroy: mergeAsArray2, beforeUnmount: mergeAsArray2, destroyed: mergeAsArray2, unmounted: mergeAsArray2, activated: mergeAsArray2, deactivated: mergeAsArray2, errorCaptured: mergeAsArray2, serverPrefetch: mergeAsArray2, components: mergeObjectOptions, directives: mergeObjectOptions, watch: /* @__PURE__ */ __name(function(e4, t5) {
      if (!e4) return t5;
      if (!t5) return e4;
      const n2 = n(/* @__PURE__ */ Object.create(null), e4);
      for (const r4 in t5) n2[r4] = mergeAsArray2(e4[r4], t5[r4]);
      return n2;
    }, "watch"), provide: mergeDataFn, inject: /* @__PURE__ */ __name(function(e4, t5) {
      return mergeObjectOptions(normalizeInject(e4), normalizeInject(t5));
    }, "inject") };
    __name(mergeDataFn, "mergeDataFn");
    __name(normalizeInject, "normalizeInject");
    __name(mergeAsArray2, "mergeAsArray");
    __name(mergeObjectOptions, "mergeObjectOptions");
    __name(mergeEmitsOrPropsOptions, "mergeEmitsOrPropsOptions");
    __name(createAppContext, "createAppContext");
    Jt2 = 0;
    __name(createAppAPI, "createAppAPI");
    Gt2 = null;
    __name(provide, "provide");
    __name(inject, "inject");
    __name(hasInjectionContext, "hasInjectionContext");
    Zt2 = Symbol.for("v-scx");
    useSSRContext = /* @__PURE__ */ __name(() => inject(Zt2), "useSSRContext");
    __name(watchEffect, "watchEffect");
    __name(watchSyncEffect, "watchSyncEffect");
    __name(watch, "watch");
    __name(doWatch, "doWatch");
    __name(instanceWatch, "instanceWatch");
    __name(createPathGetter, "createPathGetter");
    getModelModifiers = /* @__PURE__ */ __name((e4, t5) => "modelValue" === t5 || "model-value" === t5 ? e4.modelModifiers : e4[`${t5}Modifiers`] || e4[`${p(t5)}Modifiers`] || e4[`${d(t5)}Modifiers`], "getModelModifiers");
    __name(emit2, "emit");
    Xt2 = /* @__PURE__ */ new WeakMap();
    __name(normalizeEmitsOptions, "normalizeEmitsOptions");
    __name(isEmitListener, "isEmitListener");
    __name(renderComponentRoot$1, "renderComponentRoot$1");
    getFunctionalFallthrough = /* @__PURE__ */ __name((e4) => {
      let t5;
      for (const n2 in e4) ("class" === n2 || "style" === n2 || isOn(n2)) && ((t5 || (t5 = {}))[n2] = e4[n2]);
      return t5;
    }, "getFunctionalFallthrough");
    filterModelListeners = /* @__PURE__ */ __name((e4, t5) => {
      const n2 = {};
      for (const r4 in e4) isModelListener(r4) && r4.slice(9) in t5 || (n2[r4] = e4[r4]);
      return n2;
    }, "filterModelListeners");
    __name(hasPropsChanged, "hasPropsChanged");
    __name(updateHOCHostEl, "updateHOCHostEl");
    Yt2 = {};
    createInternalObject = /* @__PURE__ */ __name(() => Object.create(Yt2), "createInternalObject");
    isInternalObject = /* @__PURE__ */ __name((e4) => Object.getPrototypeOf(e4) === Yt2, "isInternalObject");
    __name(setFullProps, "setFullProps");
    __name(resolvePropValue, "resolvePropValue");
    Qt2 = /* @__PURE__ */ new WeakMap();
    __name(normalizePropsOptions, "normalizePropsOptions");
    __name(validatePropName, "validatePropName");
    isInternalKey = /* @__PURE__ */ __name((e4) => "_" === e4 || "_ctx" === e4 || "$stable" === e4, "isInternalKey");
    normalizeSlotValue = /* @__PURE__ */ __name((e4) => i(e4) ? e4.map(normalizeVNode$1) : [normalizeVNode$1(e4)], "normalizeSlotValue");
    normalizeSlot = /* @__PURE__ */ __name((e4, t5, n2) => {
      if (t5._n) return t5;
      const r4 = withCtx((...e5) => normalizeSlotValue(t5(...e5)), n2);
      return r4._c = false, r4;
    }, "normalizeSlot");
    normalizeObjectSlots = /* @__PURE__ */ __name((e4, t5, n2) => {
      const r4 = e4._ctx;
      for (const n3 in e4) {
        if (isInternalKey(n3)) continue;
        const o5 = e4[n3];
        if (isFunction(o5)) t5[n3] = normalizeSlot(0, o5, r4);
        else if (null != o5) {
          const e5 = normalizeSlotValue(o5);
          t5[n3] = () => e5;
        }
      }
    }, "normalizeObjectSlots");
    normalizeVNodeSlots = /* @__PURE__ */ __name((e4, t5) => {
      const n2 = normalizeSlotValue(t5);
      e4.slots.default = () => n2;
    }, "normalizeVNodeSlots");
    assignSlots = /* @__PURE__ */ __name((e4, t5, n2) => {
      for (const r4 in t5) !n2 && isInternalKey(r4) || (e4[r4] = t5[r4]);
    }, "assignSlots");
    en2 = queueEffectWithSuspense;
    __name(createRenderer, "createRenderer");
    __name(createHydrationRenderer, "createHydrationRenderer");
    __name(baseCreateRenderer, "baseCreateRenderer");
    __name(resolveChildrenNamespace, "resolveChildrenNamespace");
    __name(toggleRecurse, "toggleRecurse");
    __name(needTransition, "needTransition");
    __name(traverseStaticChildren, "traverseStaticChildren");
    __name(locateNonHydratedAsyncRoot, "locateNonHydratedAsyncRoot");
    __name(invalidateMount, "invalidateMount");
    isSuspense = /* @__PURE__ */ __name((e4) => e4.__isSuspense, "isSuspense");
    tn2 = 0;
    nn2 = { name: "Suspense", __isSuspense: true, process(e4, t5, n2, r4, o5, s4, i4, a6, l3, c4) {
      if (null == e4) !(function(e5, t6, n3, r5, o6, s5, i5, a7, l4) {
        const { p: c5, o: { createElement: u3 } } = l4, p3 = u3("div"), d3 = e5.suspense = createSuspenseBoundary(e5, o6, r5, t6, p3, n3, s5, i5, a7, l4);
        c5(null, d3.pendingBranch = e5.ssContent, p3, null, r5, d3, s5, i5), d3.deps > 0 ? (triggerEvent(e5, "onPending"), triggerEvent(e5, "onFallback"), c5(null, e5.ssFallback, t6, n3, r5, null, s5, i5), setActiveBranch(d3, e5.ssFallback)) : d3.resolve(false, true);
      })(t5, n2, r4, o5, s4, i4, a6, l3, c4);
      else {
        if (s4 && s4.deps > 0 && !e4.suspense.isInFallback) return t5.suspense = e4.suspense, t5.suspense.vnode = t5, void (t5.el = e4.el);
        !(function(e5, t6, n3, r5, o6, s5, i5, a7, { p: l4, um: c5, o: { createElement: u3 } }) {
          const p3 = t6.suspense = e5.suspense;
          p3.vnode = t6, t6.el = e5.el;
          const d3 = t6.ssContent, f3 = t6.ssFallback, { activeBranch: g4, pendingBranch: m3, isInFallback: y4, isHydrating: v3 } = p3;
          if (m3) p3.pendingBranch = d3, isSameVNodeType(m3, d3) ? (l4(m3, d3, p3.hiddenContainer, null, o6, p3, s5, i5, a7), p3.deps <= 0 ? p3.resolve() : y4 && (v3 || (l4(g4, f3, n3, r5, o6, null, s5, i5, a7), setActiveBranch(p3, f3)))) : (p3.pendingId = tn2++, v3 ? (p3.isHydrating = false, p3.activeBranch = m3) : c5(m3, o6, p3), p3.deps = 0, p3.effects.length = 0, p3.hiddenContainer = u3("div"), y4 ? (l4(null, d3, p3.hiddenContainer, null, o6, p3, s5, i5, a7), p3.deps <= 0 ? p3.resolve() : (l4(g4, f3, n3, r5, o6, null, s5, i5, a7), setActiveBranch(p3, f3))) : g4 && isSameVNodeType(g4, d3) ? (l4(g4, d3, n3, r5, o6, p3, s5, i5, a7), p3.resolve(true)) : (l4(null, d3, p3.hiddenContainer, null, o6, p3, s5, i5, a7), p3.deps <= 0 && p3.resolve()));
          else if (g4 && isSameVNodeType(g4, d3)) l4(g4, d3, n3, r5, o6, p3, s5, i5, a7), setActiveBranch(p3, d3);
          else if (triggerEvent(t6, "onPending"), p3.pendingBranch = d3, 512 & d3.shapeFlag ? p3.pendingId = d3.component.suspenseId : p3.pendingId = tn2++, l4(null, d3, p3.hiddenContainer, null, o6, p3, s5, i5, a7), p3.deps <= 0) p3.resolve();
          else {
            const { timeout: e6, pendingId: t7 } = p3;
            e6 > 0 ? setTimeout(() => {
              p3.pendingId === t7 && p3.fallback(f3);
            }, e6) : 0 === e6 && p3.fallback(f3);
          }
        })(e4, t5, n2, r4, o5, i4, a6, l3, c4);
      }
    }, hydrate: /* @__PURE__ */ __name(function(e4, t5, n2, r4, o5, s4, i4, a6, l3) {
      const c4 = t5.suspense = createSuspenseBoundary(t5, r4, n2, e4.parentNode, document.createElement("div"), null, o5, s4, i4, a6, true), u3 = l3(e4, c4.pendingBranch = t5.ssContent, n2, c4, s4, i4);
      0 === c4.deps && c4.resolve(false, true);
      return u3;
    }, "hydrate"), normalize: /* @__PURE__ */ __name(function(e4) {
      const { shapeFlag: t5, children: n2 } = e4, r4 = 32 & t5;
      e4.ssContent = normalizeSuspenseSlot(r4 ? n2.default : n2), e4.ssFallback = r4 ? normalizeSuspenseSlot(n2.fallback) : createVNode(sn2);
    }, "normalize") };
    __name(triggerEvent, "triggerEvent");
    __name(createSuspenseBoundary, "createSuspenseBoundary");
    __name(normalizeSuspenseSlot, "normalizeSuspenseSlot");
    __name(queueEffectWithSuspense, "queueEffectWithSuspense");
    __name(setActiveBranch, "setActiveBranch");
    rn2 = Symbol.for("v-fgt");
    on3 = Symbol.for("v-txt");
    sn2 = Symbol.for("v-cmt");
    an2 = Symbol.for("v-stc");
    ln2 = [];
    cn2 = null;
    __name(openBlock, "openBlock");
    __name(closeBlock, "closeBlock");
    un2 = 1;
    __name(setBlockTracking, "setBlockTracking");
    __name(setupBlock, "setupBlock");
    __name(createBlock, "createBlock");
    __name(isVNode$2, "isVNode$2");
    __name(isSameVNodeType, "isSameVNodeType");
    normalizeKey = /* @__PURE__ */ __name(({ key: e4 }) => null != e4 ? e4 : null, "normalizeKey");
    normalizeRef = /* @__PURE__ */ __name(({ ref: e4, ref_key: t5, ref_for: n2 }) => ("number" == typeof e4 && (e4 = "" + e4), null != e4 ? isString(e4) || isRef2(e4) || isFunction(e4) ? { i: gt2, r: e4, k: t5, f: !!n2 } : e4 : null), "normalizeRef");
    __name(createBaseVNode, "createBaseVNode");
    createVNode = /* @__PURE__ */ __name(function(e4, t5 = null, n2 = null, r4 = 0, o5 = null, s4 = false) {
      e4 && e4 !== Bt2 || (e4 = sn2);
      if (isVNode$2(e4)) {
        const r5 = cloneVNode(e4, t5, true);
        return n2 && normalizeChildren(r5, n2), un2 > 0 && !s4 && cn2 && (6 & r5.shapeFlag ? cn2[cn2.indexOf(e4)] = r5 : cn2.push(r5)), r5.patchFlag = -2, r5;
      }
      i4 = e4, isFunction(i4) && "__vccOpts" in i4 && (e4 = e4.__vccOpts);
      var i4;
      if (t5) {
        t5 = guardReactiveProps(t5);
        let { class: e5, style: n3 } = t5;
        e5 && !isString(e5) && (t5.class = normalizeClass(e5)), isObject(n3) && (isProxy(n3) && !i(n3) && (n3 = n({}, n3)), t5.style = normalizeStyle(n3));
      }
      const a6 = isString(e4) ? 1 : isSuspense(e4) ? 128 : isTeleport(e4) ? 64 : isObject(e4) ? 4 : isFunction(e4) ? 2 : 0;
      return createBaseVNode(e4, t5, n2, r4, o5, a6, s4, true);
    }, "createVNode");
    __name(guardReactiveProps, "guardReactiveProps");
    __name(cloneVNode, "cloneVNode");
    __name(createTextVNode, "createTextVNode");
    __name(normalizeVNode$1, "normalizeVNode$1");
    __name(cloneIfMounted, "cloneIfMounted");
    __name(normalizeChildren, "normalizeChildren");
    __name(mergeProps, "mergeProps");
    __name(invokeVNodeHook, "invokeVNodeHook");
    pn2 = createAppContext();
    dn2 = 0;
    __name(createComponentInstance$1, "createComponentInstance$1");
    fn = null;
    getCurrentInstance = /* @__PURE__ */ __name(() => fn || gt2, "getCurrentInstance");
    {
      const e4 = getGlobalThis(), registerGlobalSetter = /* @__PURE__ */ __name((t5, n2) => {
        let r4;
        return (r4 = e4[t5]) || (r4 = e4[t5] = []), r4.push(n2), (e5) => {
          r4.length > 1 ? r4.forEach((t6) => t6(e5)) : r4[0](e5);
        };
      }, "registerGlobalSetter");
      hn2 = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (e5) => fn = e5), gn2 = registerGlobalSetter("__VUE_SSR_SETTERS__", (e5) => vn2 = e5);
    }
    setCurrentInstance = /* @__PURE__ */ __name((e4) => {
      const t5 = fn;
      return hn2(e4), e4.scope.on(), () => {
        e4.scope.off(), hn2(t5);
      };
    }, "setCurrentInstance");
    unsetCurrentInstance = /* @__PURE__ */ __name(() => {
      fn && fn.scope.off(), hn2(null);
    }, "unsetCurrentInstance");
    __name(isStatefulComponent, "isStatefulComponent");
    vn2 = false;
    __name(setupComponent$1, "setupComponent$1");
    __name(handleSetupResult, "handleSetupResult");
    __name(finishComponentSetup, "finishComponentSetup");
    _n2 = { get: /* @__PURE__ */ __name((e4, t5) => (track(e4, 0, ""), e4[t5]), "get") };
    __name(createSetupContext, "createSetupContext");
    __name(getComponentPublicInstance, "getComponentPublicInstance");
    __name(getComponentName, "getComponentName");
    computed = /* @__PURE__ */ __name((e4, t5) => {
      const n2 = (function(e5, t6, n3 = false) {
        let r4, o5;
        return isFunction(e5) ? r4 = e5 : (r4 = e5.get, o5 = e5.set), new ComputedRefImpl(r4, o5, n3);
      })(e4, 0, vn2);
      return n2;
    }, "computed");
    __name(h2, "h");
    __name(isMemoSame, "isMemoSame");
    bn2 = "3.5.25";
    Cn3 = NOOP;
    kn2 = st2;
    Sn2 = ft2;
    setDevtoolsHook = /* @__PURE__ */ __name(function(e4, t5) {
      ft2 = e4, ft2 ? (ft2.enabled = true, ht2.forEach(({ event: e5, args: t6 }) => ft2.emit(e5, ...t6)), ht2 = []) : ht2 = [];
    }, "setDevtoolsHook");
    Tn2 = { createComponentInstance: createComponentInstance$1, setupComponent: setupComponent$1, renderComponentRoot: renderComponentRoot$1, setCurrentRenderingInstance: setCurrentRenderingInstance$1, isVNode: isVNode$2, normalizeVNode: normalizeVNode$1, getComponentPublicInstance, ensureValidVNode: ensureValidVNode$1, pushWarningContext: /* @__PURE__ */ __name(function(e4) {
      ot2.push(e4);
    }, "pushWarningContext"), popWarningContext: /* @__PURE__ */ __name(function() {
      ot2.pop();
    }, "popWarningContext") };
    wn2 = "undefined" != typeof document ? document : null;
    Rn2 = wn2 && wn2.createElement("template");
    An2 = { insert: /* @__PURE__ */ __name((e4, t5, n2) => {
      t5.insertBefore(e4, n2 || null);
    }, "insert"), remove: /* @__PURE__ */ __name((e4) => {
      const t5 = e4.parentNode;
      t5 && t5.removeChild(e4);
    }, "remove"), createElement: /* @__PURE__ */ __name((e4, t5, n2, r4) => {
      const o5 = "svg" === t5 ? wn2.createElementNS("http://www.w3.org/2000/svg", e4) : "mathml" === t5 ? wn2.createElementNS("http://www.w3.org/1998/Math/MathML", e4) : n2 ? wn2.createElement(e4, { is: n2 }) : wn2.createElement(e4);
      return "select" === e4 && r4 && null != r4.multiple && o5.setAttribute("multiple", r4.multiple), o5;
    }, "createElement"), createText: /* @__PURE__ */ __name((e4) => wn2.createTextNode(e4), "createText"), createComment: /* @__PURE__ */ __name((e4) => wn2.createComment(e4), "createComment"), setText: /* @__PURE__ */ __name((e4, t5) => {
      e4.nodeValue = t5;
    }, "setText"), setElementText: /* @__PURE__ */ __name((e4, t5) => {
      e4.textContent = t5;
    }, "setElementText"), parentNode: /* @__PURE__ */ __name((e4) => e4.parentNode, "parentNode"), nextSibling: /* @__PURE__ */ __name((e4) => e4.nextSibling, "nextSibling"), querySelector: /* @__PURE__ */ __name((e4) => wn2.querySelector(e4), "querySelector"), setScopeId(e4, t5) {
      e4.setAttribute(t5, "");
    }, insertStaticContent(e4, t5, n2, r4, o5, s4) {
      const i4 = n2 ? n2.previousSibling : t5.lastChild;
      if (o5 && (o5 === s4 || o5.nextSibling)) for (; t5.insertBefore(o5.cloneNode(true), n2), o5 !== s4 && (o5 = o5.nextSibling); ) ;
      else {
        Rn2.innerHTML = "svg" === r4 ? `<svg>${e4}</svg>` : "mathml" === r4 ? `<math>${e4}</math>` : e4;
        const o6 = Rn2.content;
        if ("svg" === r4 || "mathml" === r4) {
          const e5 = o6.firstChild;
          for (; e5.firstChild; ) o6.appendChild(e5.firstChild);
          o6.removeChild(e5);
        }
        t5.insertBefore(o6, n2);
      }
      return [i4 ? i4.nextSibling : t5.firstChild, n2 ? n2.previousSibling : t5.lastChild];
    } };
    xn2 = "transition";
    En2 = "animation";
    Pn2 = Symbol("_vtc");
    $n = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String };
    Nn2 = n({}, St2, $n);
    On2 = ((e4) => (e4.displayName = "Transition", e4.props = Nn2, e4))((e4, { slots: t5 }) => h2(Tt2, resolveTransitionProps(e4), t5));
    callHook = /* @__PURE__ */ __name((e4, t5 = []) => {
      i(e4) ? e4.forEach((e5) => e5(...t5)) : e4 && e4(...t5);
    }, "callHook");
    hasExplicitCallback = /* @__PURE__ */ __name((e4) => !!e4 && (i(e4) ? e4.some((e5) => e5.length > 1) : e4.length > 1), "hasExplicitCallback");
    __name(resolveTransitionProps, "resolveTransitionProps");
    __name(NumberOf, "NumberOf");
    __name(addTransitionClass, "addTransitionClass");
    __name(removeTransitionClass, "removeTransitionClass");
    __name(nextFrame, "nextFrame");
    Vn2 = 0;
    __name(whenTransitionEnds, "whenTransitionEnds");
    __name(getTransitionInfo, "getTransitionInfo");
    __name(getTimeout, "getTimeout");
    __name(toMs, "toMs");
    __name(forceReflow, "forceReflow");
    Hn = Symbol("_vod");
    Mn2 = Symbol("_vsh");
    Ln2 = { name: "show", beforeMount(e4, { value: t5 }, { transition: n2 }) {
      e4[Hn] = "none" === e4.style.display ? "" : e4.style.display, n2 && t5 ? n2.beforeEnter(e4) : setDisplay(e4, t5);
    }, mounted(e4, { value: t5 }, { transition: n2 }) {
      n2 && t5 && n2.enter(e4);
    }, updated(e4, { value: t5, oldValue: n2 }, { transition: r4 }) {
      !t5 != !n2 && (r4 ? t5 ? (r4.beforeEnter(e4), setDisplay(e4, true), r4.enter(e4)) : r4.leave(e4, () => {
        setDisplay(e4, false);
      }) : setDisplay(e4, t5));
    }, beforeUnmount(e4, { value: t5 }) {
      setDisplay(e4, t5);
    } };
    __name(setDisplay, "setDisplay");
    In2 = Symbol("");
    __name(setVarsOnVNode, "setVarsOnVNode");
    __name(setVarsOnNode, "setVarsOnNode");
    Dn2 = /(?:^|;)\s*display\s*:/;
    jn = /\s*!important$/;
    __name(setStyle, "setStyle");
    Fn2 = ["Webkit", "Moz", "ms"];
    Bn2 = {};
    Un2 = "http://www.w3.org/1999/xlink";
    __name(patchAttr, "patchAttr");
    __name(patchDOMProp, "patchDOMProp");
    __name(addEventListener, "addEventListener");
    Wn = Symbol("_vei");
    __name(patchEvent, "patchEvent");
    zn = /(?:Once|Passive|Capture)$/;
    qn = 0;
    Kn = Promise.resolve();
    getNow = /* @__PURE__ */ __name(() => qn || (Kn.then(() => qn = 0), qn = Date.now()), "getNow");
    isNativeOn = /* @__PURE__ */ __name((e4) => 111 === e4.charCodeAt(0) && 110 === e4.charCodeAt(1) && e4.charCodeAt(2) > 96 && e4.charCodeAt(2) < 123, "isNativeOn");
    patchProp = /* @__PURE__ */ __name((e4, t5, n2, r4, o5, s4) => {
      const i4 = "svg" === o5;
      "class" === t5 ? (function(e5, t6, n3) {
        const r5 = e5[Pn2];
        r5 && (t6 = (t6 ? [t6, ...r5] : [...r5]).join(" ")), null == t6 ? e5.removeAttribute("class") : n3 ? e5.setAttribute("class", t6) : e5.className = t6;
      })(e4, r4, i4) : "style" === t5 ? (function(e5, t6, n3) {
        const r5 = e5.style, o6 = isString(n3);
        let s5 = false;
        if (n3 && !o6) {
          if (t6) if (isString(t6)) for (const e6 of t6.split(";")) {
            const t7 = e6.slice(0, e6.indexOf(":")).trim();
            null == n3[t7] && setStyle(r5, t7, "");
          }
          else for (const e6 in t6) null == n3[e6] && setStyle(r5, e6, "");
          for (const e6 in n3) "display" === e6 && (s5 = true), setStyle(r5, e6, n3[e6]);
        } else if (o6) {
          if (t6 !== n3) {
            const e6 = r5[In2];
            e6 && (n3 += ";" + e6), r5.cssText = n3, s5 = Dn2.test(n3);
          }
        } else t6 && e5.removeAttribute("style");
        Hn in e5 && (e5[Hn] = s5 ? r5.display : "", e5[Mn2] && (r5.display = "none"));
      })(e4, n2, r4) : isOn(t5) ? isModelListener(t5) || patchEvent(e4, t5, 0, r4, s4) : ("." === t5[0] ? (t5 = t5.slice(1), 1) : "^" === t5[0] ? (t5 = t5.slice(1), 0) : (function(e5, t6, n3, r5) {
        if (r5) return "innerHTML" === t6 || "textContent" === t6 || !!(t6 in e5 && isNativeOn(t6) && isFunction(n3));
        if ("spellcheck" === t6 || "draggable" === t6 || "translate" === t6 || "autocorrect" === t6) return false;
        if ("sandbox" === t6 && "IFRAME" === e5.tagName) return false;
        if ("form" === t6) return false;
        if ("list" === t6 && "INPUT" === e5.tagName) return false;
        if ("type" === t6 && "TEXTAREA" === e5.tagName) return false;
        if ("width" === t6 || "height" === t6) {
          const t7 = e5.tagName;
          if ("IMG" === t7 || "VIDEO" === t7 || "CANVAS" === t7 || "SOURCE" === t7) return false;
        }
        if (isNativeOn(t6) && isString(n3)) return false;
        return t6 in e5;
      })(e4, t5, r4, i4)) ? (patchDOMProp(e4, t5, r4), e4.tagName.includes("-") || "value" !== t5 && "checked" !== t5 && "selected" !== t5 || patchAttr(e4, t5, r4, i4, 0, "value" !== t5)) : !e4._isVueCE || !/[A-Z]/.test(t5) && isString(r4) ? ("true-value" === t5 ? e4._trueValue = r4 : "false-value" === t5 && (e4._falseValue = r4), patchAttr(e4, t5, r4, i4)) : patchDOMProp(e4, p(t5), r4, 0, t5);
    }, "patchProp");
    Jn = {};
    __name(defineCustomElement, "defineCustomElement");
    Gn = "undefined" != typeof HTMLElement ? HTMLElement : class {
    };
    VueElement = class _VueElement extends Gn {
      static {
        __name(this, "VueElement");
      }
      constructor(e4, t5 = {}, n2 = createApp) {
        super(), this._def = e4, this._props = t5, this._createApp = n2, this._isVueCE = true, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = false, this._resolved = false, this._patching = false, this._dirty = false, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n2 !== createApp ? this._root = this.shadowRoot : false !== e4.shadowRoot ? (this.attachShadow(n({}, e4.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot) : this._root = this;
      }
      connectedCallback() {
        if (!this.isConnected) return;
        this.shadowRoot || this._resolved || this._parseSlots(), this._connected = true;
        let e4 = this;
        for (; e4 = e4 && (e4.parentNode || e4.host); ) if (e4 instanceof _VueElement) {
          this._parent = e4;
          break;
        }
        this._instance || (this._resolved ? this._mount(this._def) : e4 && e4._pendingResolve ? this._pendingResolve = e4._pendingResolve.then(() => {
          this._pendingResolve = void 0, this._resolveDef();
        }) : this._resolveDef());
      }
      _setParent(e4 = this._parent) {
        e4 && (this._instance.parent = e4._instance, this._inheritParentContext(e4));
      }
      _inheritParentContext(e4 = this._parent) {
        e4 && this._app && Object.setPrototypeOf(this._app._context.provides, e4._instance.provides);
      }
      disconnectedCallback() {
        this._connected = false, nextTick2(() => {
          this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
        });
      }
      _processMutations(e4) {
        for (const t5 of e4) this._setAttr(t5.attributeName);
      }
      _resolveDef() {
        if (this._pendingResolve) return;
        for (let e5 = 0; e5 < this.attributes.length; e5++) this._setAttr(this.attributes[e5].name);
        this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: true });
        const resolve2 = /* @__PURE__ */ __name((e5, t5 = false) => {
          this._resolved = true, this._pendingResolve = void 0;
          const { props: n2, styles: r4 } = e5;
          let o5;
          if (n2 && !i(n2)) for (const e6 in n2) {
            const t6 = n2[e6];
            (t6 === Number || t6 && t6.type === Number) && (e6 in this._props && (this._props[e6] = toNumber(this._props[e6])), (o5 || (o5 = /* @__PURE__ */ Object.create(null)))[p(e6)] = true);
          }
          this._numberProps = o5, this._resolveProps(e5), this.shadowRoot && this._applyStyles(r4), this._mount(e5);
        }, "resolve"), e4 = this._def.__asyncLoader;
        e4 ? this._pendingResolve = e4().then((e5) => {
          e5.configureApp = this._def.configureApp, resolve2(this._def = e5, true);
        }) : resolve2(this._def);
      }
      _mount(e4) {
        this._app = this._createApp(e4), this._inheritParentContext(), e4.configureApp && e4.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
        const t5 = this._instance && this._instance.exposed;
        if (t5) for (const e5 in t5) hasOwn(this, e5) || Object.defineProperty(this, e5, { get: /* @__PURE__ */ __name(() => unref2(t5[e5]), "get") });
      }
      _resolveProps(e4) {
        const { props: t5 } = e4, n2 = i(t5) ? t5 : Object.keys(t5 || {});
        for (const e5 of Object.keys(this)) "_" !== e5[0] && n2.includes(e5) && this._setProp(e5, this[e5]);
        for (const e5 of n2.map(p)) Object.defineProperty(this, e5, { get() {
          return this._getProp(e5);
        }, set(t6) {
          this._setProp(e5, t6, true, !this._patching);
        } });
      }
      _setAttr(e4) {
        if (e4.startsWith("data-v-")) return;
        const t5 = this.hasAttribute(e4);
        let n2 = t5 ? this.getAttribute(e4) : Jn;
        const r4 = p(e4);
        t5 && this._numberProps && this._numberProps[r4] && (n2 = toNumber(n2)), this._setProp(r4, n2, false, true);
      }
      _getProp(e4) {
        return this._props[e4];
      }
      _setProp(e4, t5, n2 = true, r4 = false) {
        if (t5 !== this._props[e4] && (this._dirty = true, t5 === Jn ? delete this._props[e4] : (this._props[e4] = t5, "key" === e4 && this._app && (this._app._ceVNode.key = t5)), r4 && this._instance && this._update(), n2)) {
          const n3 = this._ob;
          n3 && (this._processMutations(n3.takeRecords()), n3.disconnect()), true === t5 ? this.setAttribute(d(e4), "") : "string" == typeof t5 || "number" == typeof t5 ? this.setAttribute(d(e4), t5 + "") : t5 || this.removeAttribute(d(e4)), n3 && n3.observe(this, { attributes: true });
        }
      }
      _update() {
        const e4 = this._createVNode();
        this._app && (e4.appContext = this._app._context), render(e4, this._root);
      }
      _createVNode() {
        const e4 = {};
        this.shadowRoot || (e4.onVnodeMounted = e4.onVnodeUpdated = this._renderSlots.bind(this));
        const t5 = createVNode(this._def, n(e4, this._props));
        return this._instance || (t5.ce = (e5) => {
          this._instance = e5, e5.ce = this, e5.isCE = true;
          const dispatch = /* @__PURE__ */ __name((e6, t6) => {
            this.dispatchEvent(new CustomEvent(e6, isPlainObject(t6[0]) ? n({ detail: t6 }, t6[0]) : { detail: t6 }));
          }, "dispatch");
          e5.emit = (e6, ...t6) => {
            dispatch(e6, t6), d(e6) !== e6 && dispatch(d(e6), t6);
          }, this._setParent();
        }), t5;
      }
      _applyStyles(e4, t5) {
        if (!e4) return;
        if (t5) {
          if (t5 === this._def || this._styleChildren.has(t5)) return;
          this._styleChildren.add(t5);
        }
        const n2 = this._nonce;
        for (let t6 = e4.length - 1; t6 >= 0; t6--) {
          const r4 = document.createElement("style");
          n2 && r4.setAttribute("nonce", n2), r4.textContent = e4[t6], this.shadowRoot.prepend(r4);
        }
      }
      _parseSlots() {
        const e4 = this._slots = {};
        let t5;
        for (; t5 = this.firstChild; ) {
          const n2 = 1 === t5.nodeType && t5.getAttribute("slot") || "default";
          (e4[n2] || (e4[n2] = [])).push(t5), this.removeChild(t5);
        }
      }
      _renderSlots() {
        const e4 = this._getSlots(), t5 = this._instance.type.__scopeId;
        for (let n2 = 0; n2 < e4.length; n2++) {
          const r4 = e4[n2], o5 = r4.getAttribute("name") || "default", s4 = this._slots[o5], i4 = r4.parentNode;
          if (s4) for (const e5 of s4) {
            if (t5 && 1 === e5.nodeType) {
              const n3 = t5 + "-s", r5 = document.createTreeWalker(e5, 1);
              let o6;
              for (e5.setAttribute(n3, ""); o6 = r5.nextNode(); ) o6.setAttribute(n3, "");
            }
            i4.insertBefore(e5, r4);
          }
          else for (; r4.firstChild; ) i4.insertBefore(r4.firstChild, r4);
          i4.removeChild(r4);
        }
      }
      _getSlots() {
        const e4 = [this];
        this._teleportTargets && e4.push(...this._teleportTargets);
        const t5 = /* @__PURE__ */ new Set();
        for (const n2 of e4) {
          const e5 = n2.querySelectorAll("slot");
          for (let n3 = 0; n3 < e5.length; n3++) t5.add(e5[n3]);
        }
        return Array.from(t5);
      }
      _injectChildStyle(e4) {
        this._applyStyles(e4.styles, e4);
      }
      _beginPatch() {
        this._patching = true, this._dirty = false;
      }
      _endPatch() {
        this._patching = false, this._dirty && this._instance && this._update();
      }
      _removeChildStyle(e4) {
      }
    };
    __name(useHost, "useHost");
    Zn = /* @__PURE__ */ new WeakMap();
    Xn2 = /* @__PURE__ */ new WeakMap();
    Yn = Symbol("_moveCb");
    Qn = Symbol("_enterCb");
    er = ((e4) => (delete e4.props.mode, e4))({ name: "TransitionGroup", props: n({}, Nn2, { tag: String, moveClass: String }), setup(e4, { slots: t5 }) {
      const n2 = getCurrentInstance(), r4 = useTransitionState();
      let o5, s4;
      return Ht2(() => {
        if (!o5.length) return;
        const t6 = e4.moveClass || `${e4.name || "v"}-move`;
        if (!(function(e5, t7, n3) {
          const r6 = e5.cloneNode(), o6 = e5[Pn2];
          o6 && o6.forEach((e6) => {
            e6.split(/\s+/).forEach((e7) => e7 && r6.classList.remove(e7));
          });
          n3.split(/\s+/).forEach((e6) => e6 && r6.classList.add(e6)), r6.style.display = "none";
          const s5 = 1 === t7.nodeType ? t7 : t7.parentNode;
          s5.appendChild(r6);
          const { hasTransform: i4 } = getTransitionInfo(r6);
          return s5.removeChild(r6), i4;
        })(o5[0].el, n2.vnode.el, t6)) return void (o5 = []);
        o5.forEach(callPendingCbs), o5.forEach(recordPosition);
        const r5 = o5.filter(applyTranslation);
        forceReflow(n2.vnode.el), r5.forEach((e5) => {
          const n3 = e5.el, r6 = n3.style;
          addTransitionClass(n3, t6), r6.transform = r6.webkitTransform = r6.transitionDuration = "";
          const o6 = n3[Yn] = (e6) => {
            e6 && e6.target !== n3 || e6 && !e6.propertyName.endsWith("transform") || (n3.removeEventListener("transitionend", o6), n3[Yn] = null, removeTransitionClass(n3, t6));
          };
          n3.addEventListener("transitionend", o6);
        }), o5 = [];
      }), () => {
        const i4 = toRaw(e4), a6 = resolveTransitionProps(i4);
        let l3 = i4.tag || rn2;
        if (o5 = [], s4) for (let e5 = 0; e5 < s4.length; e5++) {
          const t6 = s4[e5];
          t6.el && t6.el instanceof Element && (o5.push(t6), setTransitionHooks(t6, resolveTransitionHooks(t6, a6, r4, n2)), Zn.set(t6, { left: t6.el.offsetLeft, top: t6.el.offsetTop }));
        }
        s4 = t5.default ? getTransitionRawChildren(t5.default()) : [];
        for (let e5 = 0; e5 < s4.length; e5++) {
          const t6 = s4[e5];
          null != t6.key && setTransitionHooks(t6, resolveTransitionHooks(t6, a6, r4, n2));
        }
        return createVNode(l3, null, s4);
      };
    } });
    __name(callPendingCbs, "callPendingCbs");
    __name(recordPosition, "recordPosition");
    __name(applyTranslation, "applyTranslation");
    getModelAssigner = /* @__PURE__ */ __name((e4) => {
      const t5 = e4.props["onUpdate:modelValue"] || false;
      return i(t5) ? (e5) => invokeArrayFns(t5, e5) : t5;
    }, "getModelAssigner");
    __name(onCompositionStart, "onCompositionStart");
    __name(onCompositionEnd, "onCompositionEnd");
    tr = Symbol("_assign");
    __name(castValue, "castValue");
    nr = { created(e4, { modifiers: { lazy: t5, trim: n2, number: r4 } }, o5) {
      e4[tr] = getModelAssigner(o5);
      const s4 = r4 || o5.props && "number" === o5.props.type;
      addEventListener(e4, t5 ? "change" : "input", (t6) => {
        t6.target.composing || e4[tr](castValue(e4.value, n2, s4));
      }), (n2 || s4) && addEventListener(e4, "change", () => {
        e4.value = castValue(e4.value, n2, s4);
      }), t5 || (addEventListener(e4, "compositionstart", onCompositionStart), addEventListener(e4, "compositionend", onCompositionEnd), addEventListener(e4, "change", onCompositionEnd));
    }, mounted(e4, { value: t5 }) {
      e4.value = null == t5 ? "" : t5;
    }, beforeUpdate(e4, { value: t5, oldValue: n2, modifiers: { lazy: r4, trim: o5, number: s4 } }, i4) {
      if (e4[tr] = getModelAssigner(i4), e4.composing) return;
      const a6 = null == t5 ? "" : t5;
      if ((!s4 && "number" !== e4.type || /^0\d/.test(e4.value) ? e4.value : looseToNumber(e4.value)) !== a6) {
        if (document.activeElement === e4 && "range" !== e4.type) {
          if (r4 && t5 === n2) return;
          if (o5 && e4.value.trim() === a6) return;
        }
        e4.value = a6;
      }
    } };
    rr = { deep: true, created(e4, t5, n2) {
      e4[tr] = getModelAssigner(n2), addEventListener(e4, "change", () => {
        const t6 = e4._modelValue, n3 = getValue(e4), r4 = e4.checked, o5 = e4[tr];
        if (i(t6)) {
          const e5 = looseIndexOf(t6, n3), s4 = -1 !== e5;
          if (r4 && !s4) o5(t6.concat(n3));
          else if (!r4 && s4) {
            const n4 = [...t6];
            n4.splice(e5, 1), o5(n4);
          }
        } else if (isSet(t6)) {
          const e5 = new Set(t6);
          r4 ? e5.add(n3) : e5.delete(n3), o5(e5);
        } else o5(getCheckboxValue(e4, r4));
      });
    }, mounted: setChecked, beforeUpdate(e4, t5, n2) {
      e4[tr] = getModelAssigner(n2), setChecked(e4, t5, n2);
    } };
    __name(setChecked, "setChecked");
    or = { created(e4, { value: t5 }, n2) {
      e4.checked = looseEqual(t5, n2.props.value), e4[tr] = getModelAssigner(n2), addEventListener(e4, "change", () => {
        e4[tr](getValue(e4));
      });
    }, beforeUpdate(e4, { value: t5, oldValue: n2 }, r4) {
      e4[tr] = getModelAssigner(r4), t5 !== n2 && (e4.checked = looseEqual(t5, r4.props.value));
    } };
    sr = { deep: true, created(e4, { value: t5, modifiers: { number: n2 } }, r4) {
      const o5 = isSet(t5);
      addEventListener(e4, "change", () => {
        const t6 = Array.prototype.filter.call(e4.options, (e5) => e5.selected).map((e5) => n2 ? looseToNumber(getValue(e5)) : getValue(e5));
        e4[tr](e4.multiple ? o5 ? new Set(t6) : t6 : t6[0]), e4._assigning = true, nextTick2(() => {
          e4._assigning = false;
        });
      }), e4[tr] = getModelAssigner(r4);
    }, mounted(e4, { value: t5 }) {
      setSelected(e4, t5);
    }, beforeUpdate(e4, t5, n2) {
      e4[tr] = getModelAssigner(n2);
    }, updated(e4, { value: t5 }) {
      e4._assigning || setSelected(e4, t5);
    } };
    __name(setSelected, "setSelected");
    __name(getValue, "getValue");
    __name(getCheckboxValue, "getCheckboxValue");
    ir = { created(e4, t5, n2) {
      callModelHook(e4, t5, n2, null, "created");
    }, mounted(e4, t5, n2) {
      callModelHook(e4, t5, n2, null, "mounted");
    }, beforeUpdate(e4, t5, n2, r4) {
      callModelHook(e4, t5, n2, r4, "beforeUpdate");
    }, updated(e4, t5, n2, r4) {
      callModelHook(e4, t5, n2, r4, "updated");
    } };
    __name(resolveDynamicModel, "resolveDynamicModel");
    __name(callModelHook, "callModelHook");
    ar = ["ctrl", "shift", "alt", "meta"];
    lr = { stop: /* @__PURE__ */ __name((e4) => e4.stopPropagation(), "stop"), prevent: /* @__PURE__ */ __name((e4) => e4.preventDefault(), "prevent"), self: /* @__PURE__ */ __name((e4) => e4.target !== e4.currentTarget, "self"), ctrl: /* @__PURE__ */ __name((e4) => !e4.ctrlKey, "ctrl"), shift: /* @__PURE__ */ __name((e4) => !e4.shiftKey, "shift"), alt: /* @__PURE__ */ __name((e4) => !e4.altKey, "alt"), meta: /* @__PURE__ */ __name((e4) => !e4.metaKey, "meta"), left: /* @__PURE__ */ __name((e4) => "button" in e4 && 0 !== e4.button, "left"), middle: /* @__PURE__ */ __name((e4) => "button" in e4 && 1 !== e4.button, "middle"), right: /* @__PURE__ */ __name((e4) => "button" in e4 && 2 !== e4.button, "right"), exact: /* @__PURE__ */ __name((e4, t5) => ar.some((n2) => e4[`${n2}Key`] && !t5.includes(n2)), "exact") };
    cr = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" };
    ur = n({ patchProp }, An2);
    dr = false;
    __name(ensureRenderer, "ensureRenderer");
    __name(ensureHydrationRenderer, "ensureHydrationRenderer");
    render = /* @__PURE__ */ __name((...e4) => {
      ensureRenderer().render(...e4);
    }, "render");
    createApp = /* @__PURE__ */ __name((...e4) => {
      const t5 = ensureRenderer().createApp(...e4), { mount: n2 } = t5;
      return t5.mount = (e5) => {
        const r4 = normalizeContainer(e5);
        if (!r4) return;
        const o5 = t5._component;
        isFunction(o5) || o5.render || o5.template || (o5.template = r4.innerHTML), 1 === r4.nodeType && (r4.textContent = "");
        const s4 = n2(r4, false, resolveRootNamespace(r4));
        return r4 instanceof Element && (r4.removeAttribute("v-cloak"), r4.setAttribute("data-v-app", "")), s4;
      }, t5;
    }, "createApp");
    createSSRApp = /* @__PURE__ */ __name((...e4) => {
      const t5 = ensureHydrationRenderer().createApp(...e4), { mount: n2 } = t5;
      return t5.mount = (e5) => {
        const t6 = normalizeContainer(e5);
        if (t6) return n2(t6, true, resolveRootNamespace(t6));
      }, t5;
    }, "createSSRApp");
    __name(resolveRootNamespace, "resolveRootNamespace");
    __name(normalizeContainer, "normalizeContainer");
    fr = false;
    initDirectivesForSSR = /* @__PURE__ */ __name(() => {
      fr || (fr = true, nr.getSSRProps = ({ value: e4 }) => ({ value: e4 }), or.getSSRProps = ({ value: e4 }, t5) => {
        if (t5.props && looseEqual(t5.props.value, e4)) return { checked: true };
      }, rr.getSSRProps = ({ value: e4 }, t5) => {
        if (i(e4)) {
          if (t5.props && looseIndexOf(e4, t5.props.value) > -1) return { checked: true };
        } else if (isSet(e4)) {
          if (t5.props && e4.has(t5.props.value)) return { checked: true };
        } else if (e4) return { checked: true };
      }, ir.getSSRProps = (e4, t5) => {
        if ("string" != typeof t5.type) return;
        const n2 = resolveDynamicModel(t5.type.toUpperCase(), t5.props && t5.props.type);
        return n2.getSSRProps ? n2.getSSRProps(e4, t5) : void 0;
      }, Ln2.getSSRProps = ({ value: e4 }) => {
        if (!e4) return { style: { display: "none" } };
      });
    }, "initDirectivesForSSR");
    hr = Object.freeze(Object.defineProperty({ __proto__: null, BaseTransition: Tt2, BaseTransitionPropsValidators: St2, Comment: sn2, DeprecationTypes: null, EffectScope, ErrorCodes: { SETUP_FUNCTION: 0, 0: "SETUP_FUNCTION", RENDER_FUNCTION: 1, 1: "RENDER_FUNCTION", NATIVE_EVENT_HANDLER: 5, 5: "NATIVE_EVENT_HANDLER", COMPONENT_EVENT_HANDLER: 6, 6: "COMPONENT_EVENT_HANDLER", VNODE_HOOK: 7, 7: "VNODE_HOOK", DIRECTIVE_HOOK: 8, 8: "DIRECTIVE_HOOK", TRANSITION_HOOK: 9, 9: "TRANSITION_HOOK", APP_ERROR_HANDLER: 10, 10: "APP_ERROR_HANDLER", APP_WARN_HANDLER: 11, 11: "APP_WARN_HANDLER", FUNCTION_REF: 12, 12: "FUNCTION_REF", ASYNC_COMPONENT_LOADER: 13, 13: "ASYNC_COMPONENT_LOADER", SCHEDULER: 14, 14: "SCHEDULER", COMPONENT_UPDATE: 15, 15: "COMPONENT_UPDATE", APP_UNMOUNT_CLEANUP: 16, 16: "APP_UNMOUNT_CLEANUP" }, ErrorTypeStrings: kn2, Fragment: rn2, KeepAlive: $t2, ReactiveEffect, Static: an2, Suspense: nn2, Teleport: _t2, Text: on3, TrackOpTypes: { GET: "get", HAS: "has", ITERATE: "iterate" }, Transition: On2, TransitionGroup: er, TriggerOpTypes: { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" }, VueElement, assertNumber: /* @__PURE__ */ __name(function(e4, t5) {
    }, "assertNumber"), callWithAsyncErrorHandling, callWithErrorHandling, camelize: p, capitalize: f, cloneVNode, compatUtils: null, computed, createApp, createBlock, createCommentVNode: /* @__PURE__ */ __name(function(e4 = "", t5 = false) {
      return t5 ? (openBlock(), createBlock(sn2, null, e4)) : createVNode(sn2, null, e4);
    }, "createCommentVNode"), createElementBlock: /* @__PURE__ */ __name(function(e4, t5, n2, r4, o5, s4) {
      return setupBlock(createBaseVNode(e4, t5, n2, r4, o5, s4, true));
    }, "createElementBlock"), createElementVNode: createBaseVNode, createHydrationRenderer, createPropsRestProxy: /* @__PURE__ */ __name(function(e4, t5) {
      const n2 = {};
      for (const r4 in e4) t5.includes(r4) || Object.defineProperty(n2, r4, { enumerable: true, get: /* @__PURE__ */ __name(() => e4[r4], "get") });
      return n2;
    }, "createPropsRestProxy"), createRenderer, createSSRApp, createSlots: /* @__PURE__ */ __name(function(e4, t5) {
      for (let n2 = 0; n2 < t5.length; n2++) {
        const r4 = t5[n2];
        if (i(r4)) for (let t6 = 0; t6 < r4.length; t6++) e4[r4[t6].name] = r4[t6].fn;
        else r4 && (e4[r4.name] = r4.key ? (...e5) => {
          const t6 = r4.fn(...e5);
          return t6 && (t6.key = r4.key), t6;
        } : r4.fn);
      }
      return e4;
    }, "createSlots"), createStaticVNode: /* @__PURE__ */ __name(function(e4, t5) {
      const n2 = createVNode(an2, null, e4);
      return n2.staticCount = t5, n2;
    }, "createStaticVNode"), createTextVNode, createVNode, customRef, defineAsyncComponent: /* @__PURE__ */ __name(function(e4) {
      isFunction(e4) && (e4 = { loader: e4 });
      const { loader: t5, loadingComponent: n2, errorComponent: r4, delay: o5 = 200, hydrate: s4, timeout: i4, suspensible: a6 = true, onError: l3 } = e4;
      let c4, u3 = null, p3 = 0;
      const load = /* @__PURE__ */ __name(() => {
        let e5;
        return u3 || (e5 = u3 = t5().catch((e6) => {
          if (e6 = e6 instanceof Error ? e6 : new Error(String(e6)), l3) return new Promise((t6, n3) => {
            l3(e6, () => t6((p3++, u3 = null, load())), () => n3(e6), p3 + 1);
          });
          throw e6;
        }).then((t6) => e5 !== u3 && u3 ? u3 : (t6 && (t6.__esModule || "Module" === t6[Symbol.toStringTag]) && (t6 = t6.default), c4 = t6, t6)));
      }, "load");
      return defineComponent({ name: "AsyncComponentWrapper", __asyncLoader: load, __asyncHydrate(e5, t6, n3) {
        let r5 = false;
        (t6.bu || (t6.bu = [])).push(() => r5 = true);
        const performHydrate = /* @__PURE__ */ __name(() => {
          r5 || n3();
        }, "performHydrate"), o6 = s4 ? () => {
          const n4 = s4(performHydrate, (t7) => (function(e6, t8) {
            if (isComment(e6) && "[" === e6.data) {
              let n5 = 1, r6 = e6.nextSibling;
              for (; r6; ) {
                if (1 === r6.nodeType) {
                  if (false === t8(r6)) break;
                } else if (isComment(r6)) if ("]" === r6.data) {
                  if (0 === --n5) break;
                } else "[" === r6.data && n5++;
                r6 = r6.nextSibling;
              }
            } else t8(e6);
          })(e5, t7));
          n4 && (t6.bum || (t6.bum = [])).push(n4);
        } : performHydrate;
        c4 ? o6() : load().then(() => !t6.isUnmounted && o6());
      }, get __asyncResolved() {
        return c4;
      }, setup() {
        const e5 = fn;
        if (markAsyncBoundary(e5), c4) return () => createInnerComp(c4, e5);
        const onError = /* @__PURE__ */ __name((t7) => {
          u3 = null, handleError(t7, e5, 13, !r4);
        }, "onError");
        if (a6 && e5.suspense || vn2) return load().then((t7) => () => createInnerComp(t7, e5)).catch((e6) => (onError(e6), () => r4 ? createVNode(r4, { error: e6 }) : null));
        const t6 = ref2(false), s5 = ref2(), l4 = ref2(!!o5);
        return o5 && setTimeout(() => {
          l4.value = false;
        }, o5), null != i4 && setTimeout(() => {
          if (!t6.value && !s5.value) {
            const e6 = new Error(`Async component timed out after ${i4}ms.`);
            onError(e6), s5.value = e6;
          }
        }, i4), load().then(() => {
          t6.value = true, e5.parent && isKeepAlive(e5.parent.vnode) && e5.parent.update();
        }).catch((e6) => {
          onError(e6), s5.value = e6;
        }), () => t6.value && c4 ? createInnerComp(c4, e5) : s5.value && r4 ? createVNode(r4, { error: s5.value }) : n2 && !l4.value ? createInnerComp(n2, e5) : void 0;
      } });
    }, "defineAsyncComponent"), defineComponent, defineCustomElement, defineEmits: /* @__PURE__ */ __name(function() {
      return null;
    }, "defineEmits"), defineExpose: /* @__PURE__ */ __name(function(e4) {
    }, "defineExpose"), defineModel: /* @__PURE__ */ __name(function() {
    }, "defineModel"), defineOptions: /* @__PURE__ */ __name(function(e4) {
    }, "defineOptions"), defineProps: /* @__PURE__ */ __name(function() {
      return null;
    }, "defineProps"), defineSSRCustomElement: /* @__PURE__ */ __name((e4, t5) => defineCustomElement(e4, t5, createSSRApp), "defineSSRCustomElement"), defineSlots: /* @__PURE__ */ __name(function() {
      return null;
    }, "defineSlots"), devtools: Sn2, effect: /* @__PURE__ */ __name(function(e4, t5) {
      e4.effect instanceof ReactiveEffect && (e4 = e4.effect.fn);
      const n2 = new ReactiveEffect(e4);
      t5 && n(n2, t5);
      try {
        n2.run();
      } catch (e5) {
        throw n2.stop(), e5;
      }
      const r4 = n2.run.bind(n2);
      return r4.effect = n2, r4;
    }, "effect"), effectScope: /* @__PURE__ */ __name(function(e4) {
      return new EffectScope(e4);
    }, "effectScope"), getCurrentInstance, getCurrentScope, getCurrentWatcher: /* @__PURE__ */ __name(function() {
      return rt2;
    }, "getCurrentWatcher"), getTransitionRawChildren, guardReactiveProps, h: h2, handleError, hasInjectionContext, hydrate: /* @__PURE__ */ __name((...e4) => {
      ensureHydrationRenderer().hydrate(...e4);
    }, "hydrate"), hydrateOnIdle: /* @__PURE__ */ __name((e4 = 1e4) => (t5) => {
      const n2 = Et2(t5, { timeout: e4 });
      return () => Pt2(n2);
    }, "hydrateOnIdle"), hydrateOnInteraction: /* @__PURE__ */ __name((e4 = []) => (t5, n2) => {
      isString(e4) && (e4 = [e4]);
      let r4 = false;
      const doHydrate = /* @__PURE__ */ __name((e5) => {
        r4 || (r4 = true, teardown(), t5(), e5.target.dispatchEvent(new e5.constructor(e5.type, e5)));
      }, "doHydrate"), teardown = /* @__PURE__ */ __name(() => {
        n2((t6) => {
          for (const n3 of e4) t6.removeEventListener(n3, doHydrate);
        });
      }, "teardown");
      return n2((t6) => {
        for (const n3 of e4) t6.addEventListener(n3, doHydrate, { once: true });
      }), teardown;
    }, "hydrateOnInteraction"), hydrateOnMediaQuery: /* @__PURE__ */ __name((e4) => (t5) => {
      if (e4) {
        const n2 = matchMedia(e4);
        if (!n2.matches) return n2.addEventListener("change", t5, { once: true }), () => n2.removeEventListener("change", t5);
        t5();
      }
    }, "hydrateOnMediaQuery"), hydrateOnVisible: /* @__PURE__ */ __name((e4) => (t5, n2) => {
      const r4 = new IntersectionObserver((e5) => {
        for (const n3 of e5) if (n3.isIntersecting) {
          r4.disconnect(), t5();
          break;
        }
      }, e4);
      return n2((e5) => {
        if (e5 instanceof Element) return (function(e6) {
          const { top: t6, left: n3, bottom: r5, right: o5 } = e6.getBoundingClientRect(), { innerHeight: s4, innerWidth: i4 } = window;
          return (t6 > 0 && t6 < s4 || r5 > 0 && r5 < s4) && (n3 > 0 && n3 < i4 || o5 > 0 && o5 < i4);
        })(e5) ? (t5(), r4.disconnect(), false) : void r4.observe(e5);
      }), () => r4.disconnect();
    }, "hydrateOnVisible"), initCustomFormatter: /* @__PURE__ */ __name(function() {
    }, "initCustomFormatter"), initDirectivesForSSR, inject, isMemoSame, isProxy, isReactive, isReadonly, isRef: isRef2, isRuntimeOnly: /* @__PURE__ */ __name(() => !mn2, "isRuntimeOnly"), isShallow, isVNode: isVNode$2, markRaw, mergeDefaults: /* @__PURE__ */ __name(function(e4, t5) {
      const n2 = normalizePropsOrEmits(e4);
      for (const e5 in t5) {
        if (e5.startsWith("__skip")) continue;
        let r4 = n2[e5];
        r4 ? i(r4) || isFunction(r4) ? r4 = n2[e5] = { type: r4, default: t5[e5] } : r4.default = t5[e5] : null === r4 && (r4 = n2[e5] = { default: t5[e5] }), r4 && t5[`__skip_${e5}`] && (r4.skipFactory = true);
      }
      return n2;
    }, "mergeDefaults"), mergeModels: /* @__PURE__ */ __name(function(e4, t5) {
      return e4 && t5 ? i(e4) && i(t5) ? e4.concat(t5) : n({}, normalizePropsOrEmits(e4), normalizePropsOrEmits(t5)) : e4 || t5;
    }, "mergeModels"), mergeProps, nextTick: nextTick2, nodeOps: An2, normalizeClass, normalizeProps, normalizeStyle, onActivated, onBeforeMount: Nt2, onBeforeUnmount: Mt2, onBeforeUpdate: Vt2, onDeactivated, onErrorCaptured, onMounted: Ot2, onRenderTracked: jt2, onRenderTriggered: Dt2, onScopeDispose: /* @__PURE__ */ __name(function(e4, t5 = false) {
      we2 && we2.cleanups.push(e4);
    }, "onScopeDispose"), onServerPrefetch: It2, onUnmounted: Lt2, onUpdated: Ht2, onWatcherCleanup, openBlock, patchProp, popScopeId: /* @__PURE__ */ __name(function() {
      mt2 = null;
    }, "popScopeId"), provide, proxyRefs, pushScopeId: /* @__PURE__ */ __name(function(e4) {
      mt2 = e4;
    }, "pushScopeId"), queuePostFlushCb, reactive, readonly, ref: ref2, registerRuntimeCompiler: /* @__PURE__ */ __name(function(e4) {
      mn2 = e4, yn2 = /* @__PURE__ */ __name((e5) => {
        e5.render._rc && (e5.withProxy = new Proxy(e5.ctx, zt2));
      }, "yn");
    }, "registerRuntimeCompiler"), render, renderList: /* @__PURE__ */ __name(function(e4, t5, n2, r4) {
      let o5;
      const s4 = n2 && n2[r4], i4 = i(e4);
      if (i4 || isString(e4)) {
        let n3 = false, r5 = false;
        i4 && isReactive(e4) && (n3 = !isShallow(e4), r5 = isReadonly(e4), e4 = shallowReadArray(e4)), o5 = new Array(e4.length);
        for (let i5 = 0, a6 = e4.length; i5 < a6; i5++) o5[i5] = t5(n3 ? r5 ? toReadonly(toReactive(e4[i5])) : toReactive(e4[i5]) : e4[i5], i5, void 0, s4 && s4[i5]);
      } else if ("number" == typeof e4) {
        o5 = new Array(e4);
        for (let n3 = 0; n3 < e4; n3++) o5[n3] = t5(n3 + 1, n3, void 0, s4 && s4[n3]);
      } else if (isObject(e4)) if (e4[Symbol.iterator]) o5 = Array.from(e4, (e5, n3) => t5(e5, n3, void 0, s4 && s4[n3]));
      else {
        const n3 = Object.keys(e4);
        o5 = new Array(n3.length);
        for (let r5 = 0, i5 = n3.length; r5 < i5; r5++) {
          const i6 = n3[r5];
          o5[r5] = t5(e4[i6], i6, r5, s4 && s4[r5]);
        }
      }
      else o5 = [];
      return n2 && (n2[r4] = o5), o5;
    }, "renderList"), renderSlot: /* @__PURE__ */ __name(function(e4, t5, n2 = {}, r4, o5) {
      if (gt2.ce || gt2.parent && isAsyncWrapper(gt2.parent) && gt2.parent.ce) {
        const e5 = Object.keys(n2).length > 0;
        return "default" !== t5 && (n2.name = t5), openBlock(), createBlock(rn2, null, [createVNode("slot", n2, r4 && r4())], e5 ? -2 : 64);
      }
      let s4 = e4[t5];
      s4 && s4._c && (s4._d = false), openBlock();
      const i4 = s4 && ensureValidVNode$1(s4(n2)), a6 = n2.key || i4 && i4.key, l3 = createBlock(rn2, { key: (a6 && !isSymbol(a6) ? a6 : `_${t5}`) + (!i4 && r4 ? "_fb" : "") }, i4 || (r4 ? r4() : []), i4 && 1 === e4._ ? 64 : -2);
      return !o5 && l3.scopeId && (l3.slotScopeIds = [l3.scopeId + "-s"]), s4 && s4._c && (s4._d = true), l3;
    }, "renderSlot"), resolveComponent: /* @__PURE__ */ __name(function(e4, t5) {
      return resolveAsset(Ft2, e4, true, t5) || e4;
    }, "resolveComponent"), resolveDirective: /* @__PURE__ */ __name(function(e4) {
      return resolveAsset("directives", e4);
    }, "resolveDirective"), resolveDynamicComponent: /* @__PURE__ */ __name(function(e4) {
      return isString(e4) ? resolveAsset(Ft2, e4, false) || e4 : e4 || Bt2;
    }, "resolveDynamicComponent"), resolveFilter: null, resolveTransitionHooks, setBlockTracking, setDevtoolsHook, setTransitionHooks, shallowReactive, shallowReadonly, shallowRef, ssrContextKey: Zt2, ssrUtils: Tn2, stop: /* @__PURE__ */ __name(function(e4) {
      e4.effect.stop();
    }, "stop"), toDisplayString, toHandlerKey: u, toHandlers: /* @__PURE__ */ __name(function(e4, t5) {
      const n2 = {};
      for (const r4 in e4) n2[t5 && /[A-Z]/.test(r4) ? `on:${r4}` : u(r4)] = e4[r4];
      return n2;
    }, "toHandlers"), toRaw, toRef: /* @__PURE__ */ __name(function(e4, t5, n2) {
      return isRef2(e4) ? e4 : isFunction(e4) ? new GetterRefImpl(e4) : isObject(e4) && arguments.length > 1 ? propertyToRef(e4, t5, n2) : ref2(e4);
    }, "toRef"), toRefs: /* @__PURE__ */ __name(function(e4) {
      const t5 = i(e4) ? new Array(e4.length) : {};
      for (const n2 in e4) t5[n2] = propertyToRef(e4, n2);
      return t5;
    }, "toRefs"), toValue, transformVNodeArgs: /* @__PURE__ */ __name(function(e4) {
    }, "transformVNodeArgs"), triggerRef: /* @__PURE__ */ __name(function(e4) {
      e4.dep && e4.dep.trigger();
    }, "triggerRef"), unref: unref2, useAttrs: /* @__PURE__ */ __name(function() {
      return getContext2().attrs;
    }, "useAttrs"), useCssModule: /* @__PURE__ */ __name(function(e4 = "$style") {
      {
        const t5 = getCurrentInstance();
        if (!t5) return t;
        const n2 = t5.type.__cssModules;
        if (!n2) return t;
        const r4 = n2[e4];
        return r4 || t;
      }
    }, "useCssModule"), useCssVars: /* @__PURE__ */ __name(function(e4) {
      const t5 = getCurrentInstance();
      if (!t5) return;
      const n2 = t5.ut = (n3 = e4(t5.proxy)) => {
        Array.from(document.querySelectorAll(`[data-v-owner="${t5.uid}"]`)).forEach((e5) => setVarsOnNode(e5, n3));
      }, setVars = /* @__PURE__ */ __name(() => {
        const r4 = e4(t5.proxy);
        t5.ce ? setVarsOnNode(t5.ce, r4) : setVarsOnVNode(t5.subTree, r4), n2(r4);
      }, "setVars");
      Vt2(() => {
        queuePostFlushCb(setVars);
      }), Ot2(() => {
        watch(setVars, NOOP, { flush: "post" });
        const e5 = new MutationObserver(setVars);
        e5.observe(t5.subTree.el.parentNode, { childList: true }), Lt2(() => e5.disconnect());
      });
    }, "useCssVars"), useHost, useId: /* @__PURE__ */ __name(function() {
      const e4 = getCurrentInstance();
      return e4 ? (e4.appContext.config.idPrefix || "v") + "-" + e4.ids[0] + e4.ids[1]++ : "";
    }, "useId"), useModel: /* @__PURE__ */ __name(function(e4, t5, n2 = t) {
      const r4 = getCurrentInstance(), o5 = p(t5), s4 = d(t5), i4 = getModelModifiers(e4, o5), a6 = customRef((i5, a7) => {
        let l3, c4, u3 = t;
        return watchSyncEffect(() => {
          const t6 = e4[o5];
          hasChanged(l3, t6) && (l3 = t6, a7());
        }), { get: /* @__PURE__ */ __name(() => (i5(), n2.get ? n2.get(l3) : l3), "get"), set(e5) {
          const i6 = n2.set ? n2.set(e5) : e5;
          if (!(hasChanged(i6, l3) || u3 !== t && hasChanged(e5, u3))) return;
          const p3 = r4.vnode.props;
          p3 && (t5 in p3 || o5 in p3 || s4 in p3) && (`onUpdate:${t5}` in p3 || `onUpdate:${o5}` in p3 || `onUpdate:${s4}` in p3) || (l3 = e5, a7()), r4.emit(`update:${t5}`, i6), hasChanged(e5, i6) && hasChanged(e5, u3) && !hasChanged(i6, c4) && a7(), u3 = e5, c4 = i6;
        } };
      });
      return a6[Symbol.iterator] = () => {
        let e5 = 0;
        return { next: /* @__PURE__ */ __name(() => e5 < 2 ? { value: e5++ ? i4 || t : a6, done: false } : { done: true }, "next") };
      }, a6;
    }, "useModel"), useSSRContext, useShadowRoot: /* @__PURE__ */ __name(function() {
      const e4 = useHost();
      return e4 && e4.shadowRoot;
    }, "useShadowRoot"), useSlots: /* @__PURE__ */ __name(function() {
      return getContext2().slots;
    }, "useSlots"), useTemplateRef: /* @__PURE__ */ __name(function(e4) {
      const t5 = getCurrentInstance(), n2 = shallowRef(null);
      if (t5) {
        const r4 = t5.refs === t ? t5.refs = {} : t5.refs;
        Object.defineProperty(r4, e4, { enumerable: true, get: /* @__PURE__ */ __name(() => n2.value, "get"), set: /* @__PURE__ */ __name((e5) => n2.value = e5, "set") });
      }
      return n2;
    }, "useTemplateRef"), useTransitionState, vModelCheckbox: rr, vModelDynamic: ir, vModelRadio: or, vModelSelect: sr, vModelText: nr, vShow: Ln2, version: bn2, warn: Cn3, watch, watchEffect, watchPostEffect: /* @__PURE__ */ __name(function(e4, t5) {
      return doWatch(e4, null, { flush: "post" });
    }, "watchPostEffect"), watchSyncEffect, withAsyncContext: /* @__PURE__ */ __name(function(e4) {
      const t5 = getCurrentInstance();
      let n2 = e4();
      return unsetCurrentInstance(), isPromise(n2) && (n2 = n2.catch((e5) => {
        throw setCurrentInstance(t5), e5;
      })), [n2, () => setCurrentInstance(t5)];
    }, "withAsyncContext"), withCtx, withDefaults: /* @__PURE__ */ __name(function(e4, t5) {
      return null;
    }, "withDefaults"), withDirectives: /* @__PURE__ */ __name(function(e4, t5) {
      if (null === gt2) return e4;
      const n2 = getComponentPublicInstance(gt2), r4 = e4.dirs || (e4.dirs = []);
      for (let e5 = 0; e5 < t5.length; e5++) {
        let [o5, s4, i4, a6 = t] = t5[e5];
        o5 && (isFunction(o5) && (o5 = { mounted: o5, updated: o5 }), o5.deep && traverse(s4), r4.push({ dir: o5, instance: n2, value: s4, oldValue: void 0, arg: i4, modifiers: a6 }));
      }
      return e4;
    }, "withDirectives"), withKeys: /* @__PURE__ */ __name((e4, t5) => {
      const n2 = e4._withKeys || (e4._withKeys = {}), r4 = t5.join(".");
      return n2[r4] || (n2[r4] = (n3) => {
        if (!("key" in n3)) return;
        const r5 = d(n3.key);
        return t5.some((e5) => e5 === r5 || cr[e5] === r5) ? e4(n3) : void 0;
      });
    }, "withKeys"), withMemo: /* @__PURE__ */ __name(function(e4, t5, n2, r4) {
      const o5 = n2[r4];
      if (o5 && isMemoSame(o5, e4)) return o5;
      const s4 = t5();
      return s4.memo = e4.slice(), s4.cacheIndex = r4, n2[r4] = s4;
    }, "withMemo"), withModifiers: /* @__PURE__ */ __name((e4, t5) => {
      const n2 = e4._withMods || (e4._withMods = {}), r4 = t5.join(".");
      return n2[r4] || (n2[r4] = (n3, ...r5) => {
        for (let e5 = 0; e5 < t5.length; e5++) {
          const r6 = lr[t5[e5]];
          if (r6 && r6(n3, t5)) return;
        }
        return e4(n3, ...r5);
      });
    }, "withModifiers"), withScopeId: /* @__PURE__ */ __name((e4) => withCtx, "withScopeId") }, Symbol.toStringTag, { value: "Module" }));
    VueResolver = /* @__PURE__ */ __name((e4, t5) => isRef2(t5) ? toValue(t5) : t5, "VueResolver");
    gr = "usehead";
    __name(injectHead, "injectHead");
    __name(useHead, "useHead");
    __name(createHead, "createHead");
    mr = makeMap(",key,ref,innerHTML,textContent,ref_key,ref_for");
    __name(ssrRenderAttrs, "ssrRenderAttrs");
    __name(ssrRenderDynamicAttr, "ssrRenderDynamicAttr");
    __name(ssrRenderClass, "ssrRenderClass");
    __name(ssrRenderStyle, "ssrRenderStyle");
    __name(ssrRenderComponent, "ssrRenderComponent");
    ({ ensureValidVNode: yr } = Tn2);
    __name(ssrInterpolate, "ssrInterpolate");
    {
      const e4 = getGlobalThis(), registerGlobalSetter = /* @__PURE__ */ __name((t5, n2) => {
        let r4;
        return (r4 = e4[t5]) || (r4 = e4[t5] = []), r4.push(n2), (e5) => {
          r4.length > 1 ? r4.forEach((t6) => t6(e5)) : r4[0](e5);
        };
      }, "registerGlobalSetter");
      registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (e5) => e5), registerGlobalSetter("__VUE_SSR_SETTERS__", (e5) => e5);
    }
    __name(ssrRenderSuspense, "ssrRenderSuspense");
    ({ createComponentInstance: vr, setCurrentRenderingInstance: _r, setupComponent: br, renderComponentRoot: Cr, normalizeVNode: kr, pushWarningContext: Sr, popWarningContext: Tr } = Tn2);
    __name(createBuffer, "createBuffer");
    __name(renderComponentVNode, "renderComponentVNode");
    __name(renderComponentSubTree, "renderComponentSubTree");
    __name(renderVNode, "renderVNode");
    __name(renderVNodeChildren, "renderVNodeChildren");
    ({ isVNode: wr } = Tn2);
    __name(nestedUnrollBuffer, "nestedUnrollBuffer");
    __name(unrollBuffer$1, "unrollBuffer$1");
    __name(unrollBufferSync$1, "unrollBufferSync$1");
    __name(renderToString, "renderToString");
    ({ isVNode: Rr } = Tn2);
    initDirectivesForSSR();
    Ar = { meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }, { charset: "utf-8" }], link: [], style: [], script: [], noscript: [] };
    xr = { id: "teleports" };
    Er = { id: "__nuxt-loader" };
    __name(baseURL, "baseURL");
    __name(buildAssetsURL, "buildAssetsURL");
    __name(publicAssetsURL, "publicAssetsURL");
    Pr = `<div${propsToString({ id: "__nuxt" })}>`;
    $r = "</div>";
    getPrecomputedDependencies = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_client_precomputed(), client_precomputed_exports)).then((e4) => e4.default || e4).then((e4) => "function" == typeof e4 ? e4() : e4), "getPrecomputedDependencies");
    Nr = lazyCachedFunction(async () => {
      const e4 = await Promise.resolve().then(() => (init_server(), server_exports)).then(function(e5) {
        return e5.s;
      }).then((e5) => e5.default || e5);
      if (!e4) throw new Error("Server bundle is not available");
      return createRenderer$1(e4, { precomputed: await getPrecomputedDependencies(), manifest: void 0, renderToString: /* @__PURE__ */ __name(async function(e5, t5) {
        const n2 = await renderToString(e5, t5);
        return Pr + n2 + $r;
      }, "renderToString"), buildAssetsURL });
    });
    Or = lazyCachedFunction(async () => {
      const e4 = await getPrecomputedDependencies(), t5 = await Promise.resolve().then(() => (init_virtual_spa_template(), virtual_spa_template_exports)).then((e5) => e5.template).catch(() => "").then((e5) => {
        {
          const t6 = `<div${propsToString(Er)}>`;
          return Pr + $r + (e5 ? t6 + e5 + "</div>" : "");
        }
      }), n2 = createRenderer$1(() => () => {
      }, { precomputed: e4, manifest: void 0, renderToString: /* @__PURE__ */ __name(() => t5, "renderToString"), buildAssetsURL }), o5 = await n2.renderToString({});
      return { rendererContext: n2.rendererContext, renderToString: /* @__PURE__ */ __name((e5) => {
        const t6 = useRuntimeConfig2(e5.event);
        return e5.modules ||= /* @__PURE__ */ new Set(), e5.payload.serverRendered = false, e5.config = { public: t6.public, app: t6.app }, Promise.resolve(o5);
      }, "renderToString") };
    });
    __name(lazyCachedFunction, "lazyCachedFunction");
    Vr = lazyCachedFunction(() => Promise.resolve().then(() => (init_styles(), styles_exports)).then((e4) => e4.default || e4));
    Hr = { "<": "\\u003C", "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t", "\u2028": "\\u2028", "\u2029": "\\u2029" };
    DevalueError = class extends Error {
      static {
        __name(this, "DevalueError");
      }
      constructor(e4, t5, n2, r4) {
        super(e4), this.name = "DevalueError", this.path = t5.join(""), this.value = n2, this.root = r4;
      }
    };
    __name(is_primitive, "is_primitive");
    Mr = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    __name(is_plain_object, "is_plain_object");
    __name(get_type, "get_type");
    __name(get_escaped_char, "get_escaped_char");
    __name(stringify_string, "stringify_string");
    __name(enumerable_symbols, "enumerable_symbols");
    Lr = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    __name(stringify_key, "stringify_key");
    Ir = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    Dr = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    jr = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
    __name(uneval, "uneval");
    __name(escape_unsafe_char, "escape_unsafe_char");
    __name(escape_unsafe_chars, "escape_unsafe_chars");
    __name(stringify_primitive$1, "stringify_primitive$1");
    __name(encode64, "encode64");
    Fr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    __name(stringify, "stringify");
    __name(stringify_primitive, "stringify_primitive");
    __name(renderPayloadJsonScript, "renderPayloadJsonScript");
    __name(splitPayload, "splitPayload");
    Br = { disableDefaults: true };
    Ur = {};
    Wr = [];
    globalThis.__buildAssetsURL = buildAssetsURL, globalThis.__publicAssetsURL = publicAssetsURL;
    zr = !!xr.id;
    qr2 = zr ? `<div${propsToString(xr)}>` : "";
    Kr = zr ? "</div>" : "";
    Jr = /^[^?]*\/_payload.json(?:\?.*)?$/;
    Gr = defineRenderHandler(async (e4) => {
      const t5 = useNitroApp(), n2 = e4.path.startsWith("/__nuxt_error") ? getQuery(e4) : null;
      if (n2 && !("__unenv__" in e4.node.req)) throw createError({ statusCode: 404, statusMessage: "Page Not Found: /__nuxt_error" });
      const i4 = (function(e5) {
        return { url: e5.path, event: e5, runtimeConfig: useRuntimeConfig2(e5), noSSR: e5.context.nuxt?.noSSR || false, head: createHead(Br), error: false, nuxt: void 0, payload: {}, _payloadReducers: /* @__PURE__ */ Object.create(null), modules: /* @__PURE__ */ new Set() };
      })(e4), d3 = { mode: "server" };
      if (i4.head.push(Ar, d3), n2) {
        if (n2.statusCode &&= Number.parseInt(n2.statusCode), "string" == typeof n2.data) try {
          n2.data = destr2(n2.data);
        } catch {
        }
        !(function(e5, t6) {
          e5.error = true, e5.payload = { error: t6 }, e5.url = t6.url;
        })(i4, n2);
      }
      const f3 = Jr.test(i4.url);
      if (f3) {
        const t6 = i4.url.substring(0, i4.url.lastIndexOf("/")) || "/";
        i4.url = t6, e4._path = e4.node.req.url = t6;
      }
      const g4 = getRouteRules(e4);
      false === g4.ssr && (i4.noSSR = true);
      const m3 = await (function(e5) {
        return e5.noSSR ? Or() : Nr();
      })(i4);
      for (const e5 of Wr) i4.modules.add(e5);
      const y4 = await m3.renderToString(i4).catch(async (e5) => {
        if (i4._renderResponse && "skipping render" === e5.message) return {};
        const t6 = !n2 && i4.payload?.error || e5;
        throw await i4.nuxt?.hooks.callHook("app:error", t6), t6;
      }), v3 = i4._renderResponse || f3 ? [] : await (async function(e5) {
        const t6 = await Vr(), n3 = /* @__PURE__ */ new Set();
        for (const r4 of e5) if (r4 in t6 && t6[r4]) for (const e6 of await t6[r4]()) n3.add(e6);
        return Array.from(n3).map((e6) => ({ innerHTML: e6 }));
      })(i4.modules ?? []);
      if (await i4.nuxt?.hooks.callHook("app:rendered", { ssrContext: i4, renderResult: y4 }), i4._renderResponse) return i4._renderResponse;
      if (i4.payload?.error && !n2) throw i4.payload.error;
      if (f3) {
        const e5 = (function(e6) {
          return { body: stringify(splitPayload(e6).payload, e6._payloadReducers), statusCode: getResponseStatus(e6.event), statusMessage: getResponseStatusText(e6.event), headers: { "content-type": "application/json;charset=utf-8", "x-powered-by": "Nuxt" } };
        })(i4);
        return e5;
      }
      const _3 = g4.noScripts, { styles: b4, scripts: C3 } = getRequestDependencies(i4, m3.rendererContext);
      i4._preloadManifest && !_3 && i4.head.push({ link: [{ rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${i4.runtimeConfig.app.buildId}.json`) }] }, { ...d3, tagPriority: "low" }), v3.length && i4.head.push({ style: v3 });
      const k3 = [];
      for (const e5 of Object.values(b4)) k3.push({ rel: "stylesheet", href: m3.rendererContext.buildAssetsURL(e5.file), crossorigin: "" });
      if (k3.length && i4.head.push({ link: k3 }, d3), _3 || (i4.head.push({ link: getPreloadLinks(i4, m3.rendererContext) }, d3), i4.head.push({ link: getPrefetchLinks(i4, m3.rendererContext) }, d3), i4.head.push({ script: renderPayloadJsonScript({ ssrContext: i4, data: i4.payload }) }, { ...d3, tagPosition: "bodyClose", tagPriority: "high" })), !g4.noScripts) {
        const e5 = "head";
        i4.head.push({ script: Object.values(C3).map((t6) => ({ type: t6.module ? "module" : null, src: m3.rendererContext.buildAssetsURL(t6.file), defer: !t6.module || null, tagPosition: e5, crossorigin: "" })) }, d3);
      }
      const { headTags: S3, bodyTags: T3, bodyTagsOpen: w3, htmlAttrs: R3, bodyAttrs: A3 } = await renderSSRHead(i4.head, Ur), x4 = { htmlAttrs: R3 ? [R3] : [], head: normalizeChunks([S3]), bodyAttrs: A3 ? [A3] : [], bodyPrepend: normalizeChunks([w3, i4.teleports?.body]), body: [y4.html, qr2 + (zr ? joinTags([i4.teleports?.[`#${xr.id}`]]) : "") + Kr], bodyAppend: [T3] };
      return await t5.hooks.callHook("render:html", x4, { event: e4 }), { body: (E3 = x4, `<!DOCTYPE html><html${joinAttrs(E3.htmlAttrs)}><head>${joinTags(E3.head)}</head><body${joinAttrs(E3.bodyAttrs)}>${joinTags(E3.bodyPrepend)}${joinTags(E3.body)}${joinTags(E3.bodyAppend)}</body></html>`), statusCode: getResponseStatus(e4), statusMessage: getResponseStatusText(e4), headers: { "content-type": "text/html;charset=utf-8", "x-powered-by": "Nuxt" } };
      var E3;
    });
    __name(normalizeChunks, "normalizeChunks");
    __name(joinTags, "joinTags");
    __name(joinAttrs, "joinAttrs");
    Zr = Object.freeze(Object.defineProperty({ __proto__: null, default: Gr }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .output/server/chunks/routes/ws/visitors.mjs
var visitors_exports = {};
__export(visitors_exports, {
  default: () => s2
});
import "cloudflare:workers";
function broadcast() {
  const o5 = JSON.stringify({ type: "visitors", count: t3.size });
  for (const s4 of t3) s4.send(o5);
}
var t3, s2;
var init_visitors = __esm({
  ".output/server/chunks/routes/ws/visitors.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_nitro();
    t3 = /* @__PURE__ */ new Set();
    __name(broadcast, "broadcast");
    s2 = defineWebSocketHandler({ open(o5) {
      t3.add(o5), broadcast();
    }, close(o5) {
      t3.delete(o5), broadcast();
    } });
  }
});

// .output/server/chunks/nitro/nitro.mjs
import { DurableObject as e3 } from "cloudflare:workers";
function isEventTarget(e4) {
  return "function" == typeof e4?.addEventListener;
}
function addCatch(e4, t5, r4, s4) {
  if (e4[_2]) try {
    const a6 = t5.then;
    "function" == typeof a6 && a6.call(t5, void 0, function(t6) {
      setTimeout(emitUnhandledRejectionOrErr, 0, e4, t6, r4, s4);
    });
  } catch (t6) {
    e4.emit("error", t6);
  }
}
function emitUnhandledRejectionOrErr(e4, t5, r4, s4) {
  if ("function" == typeof e4[m2]) e4[m2](t5, r4, ...s4);
  else {
    const r5 = e4[_2];
    try {
      e4[_2] = false, e4.emit("error", t5);
    } finally {
      e4[_2] = r5;
    }
  }
}
function _getMaxListeners(e4) {
  return void 0 === e4._maxListeners ? a5 : e4._maxListeners;
}
function enhanceStackTrace(e4, t5) {
  let r4 = "";
  try {
    const { name: e5 } = this.constructor;
    "EventEmitter" !== e5 && (r4 = ` on ${e5} instance`);
  } catch {
  }
  const s4 = `
Emitted 'error' event${r4} at:
`, a6 = (t5.stack || "").split("\n").slice(1);
  return e4.stack + s4 + a6.join("\n");
}
function _addListener(e4, t5, r4, s4) {
  let a6, c4, u3;
  if (c4 = e4._events, void 0 === c4 ? (c4 = e4._events = { __proto__: null }, e4._eventsCount = 0) : (void 0 !== c4.newListener && (e4.emit("newListener", t5, r4.listener ?? r4), c4 = e4._events), u3 = c4[t5]), void 0 === u3) c4[t5] = r4, ++e4._eventsCount;
  else if ("function" == typeof u3 ? u3 = c4[t5] = s4 ? [r4, u3] : [u3, r4] : s4 ? u3.unshift(r4) : u3.push(r4), a6 = _getMaxListeners(e4), a6 > 0 && u3.length > a6 && !u3.warned) {
    u3.warned = true;
    const r5 = new g3(`Possible EventEmitter memory leak detected. ${u3.length} ${String(t5)} listeners added to ${inspect(e4)}. MaxListeners is ${a6}. Use emitter.setMaxListeners() to increase limit`, { name: "MaxListenersExceededWarning", emitter: e4, type: t5, count: u3.length });
    console.warn(r5);
  }
  return e4;
}
function onceWrapper() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function _onceWrap(e4, t5, r4) {
  const s4 = { fired: false, wrapFn: void 0, target: e4, type: t5, listener: r4 }, a6 = onceWrapper.bind(s4);
  return a6.listener = r4, s4.wrapFn = a6, a6;
}
function _listeners(e4, t5, r4) {
  const s4 = e4._events;
  if (void 0 === s4) return [];
  const a6 = s4[t5];
  return void 0 === a6 ? [] : "function" == typeof a6 ? r4 ? [a6.listener || a6] : [a6] : r4 ? (function(e5) {
    const t6 = arrayClone(e5);
    for (let e6 = 0; e6 < t6.length; ++e6) {
      const r5 = t6[e6].listener;
      "function" == typeof r5 && (t6[e6] = r5);
    }
    return t6;
  })(a6) : arrayClone(a6);
}
function arrayClone(e4) {
  switch (e4.length) {
    case 2:
      return [e4[0], e4[1]];
    case 3:
      return [e4[0], e4[1], e4[2]];
    case 4:
      return [e4[0], e4[1], e4[2], e4[3]];
    case 5:
      return [e4[0], e4[1], e4[2], e4[3], e4[4]];
    case 6:
      return [e4[0], e4[1], e4[2], e4[3], e4[4], e4[5]];
  }
  return Array.prototype.slice.call(e4);
}
function createIterResult(e4, t5) {
  return { value: e4, done: t5 };
}
function eventTargetAgnosticRemoveListener(e4, t5, r4, s4) {
  if ("function" == typeof e4.removeListener) e4.removeListener(t5, r4);
  else {
    if ("function" != typeof e4.removeEventListener) throw new h3("emitter", "EventEmitter", e4);
    e4.removeEventListener(t5, r4, s4);
  }
}
function eventTargetAgnosticAddListener(e4, t5, r4, s4) {
  if ("function" == typeof e4.on) s4?.once ? e4.once(t5, r4) : e4.on(t5, r4);
  else {
    if ("function" != typeof e4.addEventListener) throw new h3("emitter", "EventEmitter", e4);
    e4.addEventListener(t5, r4, s4);
  }
}
function createNotImplementedError2(e4) {
  return new Error(`[unenv] ${e4} is not implemented yet!`);
}
function notImplemented2(e4) {
  return Object.assign(() => {
    throw createNotImplementedError2(e4);
  }, { __unenv__: true });
}
function createNextTickWithTimeout() {
  let e4, t5 = [], r4 = false, s4 = -1;
  function cleanUpNextTick() {
    r4 && e4 && (r4 = false, e4.length > 0 ? t5 = [...e4, ...t5] : s4 = -1, t5.length > 0 && drainQueue());
  }
  __name(cleanUpNextTick, "cleanUpNextTick");
  function drainQueue() {
    if (r4) return;
    const a6 = setTimeout(cleanUpNextTick);
    r4 = true;
    let c4 = t5.length;
    for (; c4; ) {
      for (e4 = t5, t5 = []; ++s4 < c4; ) e4 && e4[s4]();
      s4 = -1, c4 = t5.length;
    }
    e4 = void 0, r4 = false, clearTimeout(a6);
  }
  __name(drainQueue, "drainQueue");
  return (e5, ...s5) => {
    t5.push(e5.bind(void 0, ...s5)), 1 !== t5.length || r4 || setTimeout(drainQueue);
  };
}
function toByteArray(e4) {
  let t5;
  const r4 = (function(e5) {
    const t6 = e5.length;
    if (t6 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    let r5 = e5.indexOf("=");
    return -1 === r5 && (r5 = t6), [r5, r5 === t6 ? 0 : 4 - r5 % 4];
  })(e4), s4 = r4[0], a6 = r4[1], c4 = new Ft3((function(e5, t6, r5) {
    return 3 * (t6 + r5) / 4 - r5;
  })(0, s4, a6));
  let u3 = 0;
  const f3 = a6 > 0 ? s4 - 4 : s4;
  let h4;
  for (h4 = 0; h4 < f3; h4 += 4) t5 = qt3[e4.charCodeAt(h4)] << 18 | qt3[e4.charCodeAt(h4 + 1)] << 12 | qt3[e4.charCodeAt(h4 + 2)] << 6 | qt3[e4.charCodeAt(h4 + 3)], c4[u3++] = t5 >> 16 & 255, c4[u3++] = t5 >> 8 & 255, c4[u3++] = 255 & t5;
  return 2 === a6 && (t5 = qt3[e4.charCodeAt(h4)] << 2 | qt3[e4.charCodeAt(h4 + 1)] >> 4, c4[u3++] = 255 & t5), 1 === a6 && (t5 = qt3[e4.charCodeAt(h4)] << 10 | qt3[e4.charCodeAt(h4 + 1)] << 4 | qt3[e4.charCodeAt(h4 + 2)] >> 2, c4[u3++] = t5 >> 8 & 255, c4[u3++] = 255 & t5), c4;
}
function tripletToBase64(e4) {
  return Wt3[e4 >> 18 & 63] + Wt3[e4 >> 12 & 63] + Wt3[e4 >> 6 & 63] + Wt3[63 & e4];
}
function encodeChunk(e4, t5, r4) {
  let s4;
  const a6 = [];
  for (let c4 = t5; c4 < r4; c4 += 3) s4 = (e4[c4] << 16 & 16711680) + (e4[c4 + 1] << 8 & 65280) + (255 & e4[c4 + 2]), a6.push(tripletToBase64(s4));
  return a6.join("");
}
function fromByteArray(e4) {
  let t5;
  const r4 = e4.length, s4 = r4 % 3, a6 = [], c4 = 16383;
  for (let t6 = 0, u3 = r4 - s4; t6 < u3; t6 += c4) a6.push(encodeChunk(e4, t6, t6 + c4 > u3 ? u3 : t6 + c4));
  return 1 === s4 ? (t5 = e4[r4 - 1], a6.push(Wt3[t5 >> 2] + Wt3[t5 << 4 & 63] + "==")) : 2 === s4 && (t5 = (e4[r4 - 2] << 8) + e4[r4 - 1], a6.push(Wt3[t5 >> 10] + Wt3[t5 >> 4 & 63] + Wt3[t5 << 2 & 63] + "=")), a6.join("");
}
function read(e4, t5, r4, s4, a6) {
  let c4, u3;
  const f3 = 8 * a6 - s4 - 1, h4 = (1 << f3) - 1, d3 = h4 >> 1;
  let g4 = -7, m3 = r4 ? a6 - 1 : 0;
  const _3 = r4 ? -1 : 1;
  let E3 = e4[t5 + m3];
  for (m3 += _3, c4 = E3 & (1 << -g4) - 1, E3 >>= -g4, g4 += f3; g4 > 0; ) c4 = 256 * c4 + e4[t5 + m3], m3 += _3, g4 -= 8;
  for (u3 = c4 & (1 << -g4) - 1, c4 >>= -g4, g4 += s4; g4 > 0; ) u3 = 256 * u3 + e4[t5 + m3], m3 += _3, g4 -= 8;
  if (0 === c4) c4 = 1 - d3;
  else {
    if (c4 === h4) return u3 ? Number.NaN : (E3 ? -1 : 1) * Number.POSITIVE_INFINITY;
    u3 += Math.pow(2, s4), c4 -= d3;
  }
  return (E3 ? -1 : 1) * u3 * Math.pow(2, c4 - s4);
}
function write(e4, t5, r4, s4, a6, c4) {
  let u3, f3, h4, d3 = 8 * c4 - a6 - 1;
  const g4 = (1 << d3) - 1, m3 = g4 >> 1, _3 = 23 === a6 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  let E3 = s4 ? 0 : c4 - 1;
  const R3 = s4 ? 1 : -1, B2 = t5 < 0 || 0 === t5 && 1 / t5 < 0 ? 1 : 0;
  for (t5 = Math.abs(t5), Number.isNaN(t5) || t5 === Number.POSITIVE_INFINITY ? (f3 = Number.isNaN(t5) ? 1 : 0, u3 = g4) : (u3 = Math.floor(Math.log2(t5)), t5 * (h4 = Math.pow(2, -u3)) < 1 && (u3--, h4 *= 2), (t5 += u3 + m3 >= 1 ? _3 / h4 : _3 * Math.pow(2, 1 - m3)) * h4 >= 2 && (u3++, h4 /= 2), u3 + m3 >= g4 ? (f3 = 0, u3 = g4) : u3 + m3 >= 1 ? (f3 = (t5 * h4 - 1) * Math.pow(2, a6), u3 += m3) : (f3 = t5 * Math.pow(2, m3 - 1) * Math.pow(2, a6), u3 = 0)); a6 >= 8; ) e4[r4 + E3] = 255 & f3, E3 += R3, f3 /= 256, a6 -= 8;
  for (u3 = u3 << a6 | f3, d3 += a6; d3 > 0; ) e4[r4 + E3] = 255 & u3, E3 += R3, u3 /= 256, d3 -= 8;
  e4[r4 + E3 - R3] |= 128 * B2;
}
function createBuffer2(e4) {
  if (e4 > Qt3) throw new RangeError('The value "' + e4 + '" is invalid for option "size"');
  const t5 = new Uint8Array(e4);
  return Object.setPrototypeOf(t5, Buffer$1.prototype), t5;
}
function Buffer$1(e4, t5, r4) {
  if ("number" == typeof e4) {
    if ("string" == typeof t5) throw new TypeError('The "string" argument must be of type string. Received type number');
    return allocUnsafe(e4);
  }
  return from(e4, t5, r4);
}
function from(e4, t5, r4) {
  if ("string" == typeof e4) return (function(e5, t6) {
    "string" == typeof t6 && "" !== t6 || (t6 = "utf8");
    if (!Buffer$1.isEncoding(t6)) throw new TypeError("Unknown encoding: " + t6);
    const r5 = 0 | byteLength(e5, t6);
    let s5 = createBuffer2(r5);
    const a7 = s5.write(e5, t6);
    a7 !== r5 && (s5 = s5.slice(0, a7));
    return s5;
  })(e4, t5);
  if (ArrayBuffer.isView(e4)) return (function(e5) {
    if (isInstance(e5, Uint8Array)) {
      const t6 = new Uint8Array(e5);
      return fromArrayBuffer(t6.buffer, t6.byteOffset, t6.byteLength);
    }
    return fromArrayLike(e5);
  })(e4);
  if (null == e4) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e4);
  if (isInstance(e4, ArrayBuffer) || e4 && isInstance(e4.buffer, ArrayBuffer)) return fromArrayBuffer(e4, t5, r4);
  if ("undefined" != typeof SharedArrayBuffer && (isInstance(e4, SharedArrayBuffer) || e4 && isInstance(e4.buffer, SharedArrayBuffer))) return fromArrayBuffer(e4, t5, r4);
  if ("number" == typeof e4) throw new TypeError('The "value" argument must not be of type number. Received type number');
  const s4 = e4.valueOf && e4.valueOf();
  if (null != s4 && s4 !== e4) return Buffer$1.from(s4, t5, r4);
  const a6 = (function(e5) {
    if (Buffer$1.isBuffer(e5)) {
      const t6 = 0 | checked(e5.length), r5 = createBuffer2(t6);
      return 0 === r5.length || e5.copy(r5, 0, 0, t6), r5;
    }
    if (void 0 !== e5.length) return "number" != typeof e5.length || numberIsNaN(e5.length) ? createBuffer2(0) : fromArrayLike(e5);
    if ("Buffer" === e5.type && Array.isArray(e5.data)) return fromArrayLike(e5.data);
  })(e4);
  if (a6) return a6;
  if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e4[Symbol.toPrimitive]) return Buffer$1.from(e4[Symbol.toPrimitive]("string"), t5, r4);
  throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e4);
}
function assertSize(e4) {
  if ("number" != typeof e4) throw new TypeError('"size" argument must be of type number');
  if (e4 < 0) throw new RangeError('The value "' + e4 + '" is invalid for option "size"');
}
function allocUnsafe(e4) {
  return assertSize(e4), createBuffer2(e4 < 0 ? 0 : 0 | checked(e4));
}
function fromArrayLike(e4) {
  const t5 = e4.length < 0 ? 0 : 0 | checked(e4.length), r4 = createBuffer2(t5);
  for (let s4 = 0; s4 < t5; s4 += 1) r4[s4] = 255 & e4[s4];
  return r4;
}
function fromArrayBuffer(e4, t5, r4) {
  if (t5 < 0 || e4.byteLength < t5) throw new RangeError('"offset" is outside of buffer bounds');
  if (e4.byteLength < t5 + (r4 || 0)) throw new RangeError('"length" is outside of buffer bounds');
  let s4;
  return s4 = void 0 === t5 && void 0 === r4 ? new Uint8Array(e4) : void 0 === r4 ? new Uint8Array(e4, t5) : new Uint8Array(e4, t5, r4), Object.setPrototypeOf(s4, Buffer$1.prototype), s4;
}
function checked(e4) {
  if (e4 >= Qt3) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Qt3.toString(16) + " bytes");
  return 0 | e4;
}
function byteLength(e4, t5) {
  if (Buffer$1.isBuffer(e4)) return e4.length;
  if (ArrayBuffer.isView(e4) || isInstance(e4, ArrayBuffer)) return e4.byteLength;
  if ("string" != typeof e4) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e4);
  const r4 = e4.length, s4 = arguments.length > 2 && true === arguments[2];
  if (!s4 && 0 === r4) return 0;
  let a6 = false;
  for (; ; ) switch (t5) {
    case "ascii":
    case "latin1":
    case "binary":
      return r4;
    case "utf8":
    case "utf-8":
      return utf8ToBytes(e4).length;
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return 2 * r4;
    case "hex":
      return r4 >>> 1;
    case "base64":
      return base64ToBytes(e4).length;
    default:
      if (a6) return s4 ? -1 : utf8ToBytes(e4).length;
      t5 = ("" + t5).toLowerCase(), a6 = true;
  }
}
function slowToString(e4, t5, r4) {
  let s4 = false;
  if ((void 0 === t5 || t5 < 0) && (t5 = 0), t5 > this.length) return "";
  if ((void 0 === r4 || r4 > this.length) && (r4 = this.length), r4 <= 0) return "";
  if ((r4 >>>= 0) <= (t5 >>>= 0)) return "";
  for (e4 || (e4 = "utf8"); ; ) switch (e4) {
    case "hex":
      return hexSlice(this, t5, r4);
    case "utf8":
    case "utf-8":
      return utf8Slice(this, t5, r4);
    case "ascii":
      return asciiSlice(this, t5, r4);
    case "latin1":
    case "binary":
      return latin1Slice(this, t5, r4);
    case "base64":
      return base64Slice(this, t5, r4);
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return utf16leSlice(this, t5, r4);
    default:
      if (s4) throw new TypeError("Unknown encoding: " + e4);
      e4 = (e4 + "").toLowerCase(), s4 = true;
  }
}
function swap(e4, t5, r4) {
  const s4 = e4[t5];
  e4[t5] = e4[r4], e4[r4] = s4;
}
function bidirectionalIndexOf(e4, t5, r4, s4, a6) {
  if (0 === e4.length) return -1;
  if ("string" == typeof r4 ? (s4 = r4, r4 = 0) : r4 > 2147483647 ? r4 = 2147483647 : r4 < -2147483648 && (r4 = -2147483648), numberIsNaN(r4 = +r4) && (r4 = a6 ? 0 : e4.length - 1), r4 < 0 && (r4 = e4.length + r4), r4 >= e4.length) {
    if (a6) return -1;
    r4 = e4.length - 1;
  } else if (r4 < 0) {
    if (!a6) return -1;
    r4 = 0;
  }
  if ("string" == typeof t5 && (t5 = Buffer$1.from(t5, s4)), Buffer$1.isBuffer(t5)) return 0 === t5.length ? -1 : arrayIndexOf(e4, t5, r4, s4, a6);
  if ("number" == typeof t5) return t5 &= 255, "function" == typeof Uint8Array.prototype.indexOf ? a6 ? Uint8Array.prototype.indexOf.call(e4, t5, r4) : Uint8Array.prototype.lastIndexOf.call(e4, t5, r4) : arrayIndexOf(e4, [t5], r4, s4, a6);
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(e4, t5, r4, s4, a6) {
  let c4, u3 = 1, f3 = e4.length, h4 = t5.length;
  if (void 0 !== s4 && ("ucs2" === (s4 = String(s4).toLowerCase()) || "ucs-2" === s4 || "utf16le" === s4 || "utf-16le" === s4)) {
    if (e4.length < 2 || t5.length < 2) return -1;
    u3 = 2, f3 /= 2, h4 /= 2, r4 /= 2;
  }
  function read2(e5, t6) {
    return 1 === u3 ? e5[t6] : e5.readUInt16BE(t6 * u3);
  }
  __name(read2, "read");
  if (a6) {
    let s5 = -1;
    for (c4 = r4; c4 < f3; c4++) if (read2(e4, c4) === read2(t5, -1 === s5 ? 0 : c4 - s5)) {
      if (-1 === s5 && (s5 = c4), c4 - s5 + 1 === h4) return s5 * u3;
    } else -1 !== s5 && (c4 -= c4 - s5), s5 = -1;
  } else for (r4 + h4 > f3 && (r4 = f3 - h4), c4 = r4; c4 >= 0; c4--) {
    let r5 = true;
    for (let s5 = 0; s5 < h4; s5++) if (read2(e4, c4 + s5) !== read2(t5, s5)) {
      r5 = false;
      break;
    }
    if (r5) return c4;
  }
  return -1;
}
function hexWrite(e4, t5, r4, s4) {
  r4 = Number(r4) || 0;
  const a6 = e4.length - r4;
  s4 ? (s4 = Number(s4)) > a6 && (s4 = a6) : s4 = a6;
  const c4 = t5.length;
  let u3;
  for (s4 > c4 / 2 && (s4 = c4 / 2), u3 = 0; u3 < s4; ++u3) {
    const s5 = Number.parseInt(t5.slice(2 * u3, 2 * u3 + 2), 16);
    if (numberIsNaN(s5)) return u3;
    e4[r4 + u3] = s5;
  }
  return u3;
}
function utf8Write(e4, t5, r4, s4) {
  return blitBuffer(utf8ToBytes(t5, e4.length - r4), e4, r4, s4);
}
function asciiWrite(e4, t5, r4, s4) {
  return blitBuffer((function(e5) {
    const t6 = [];
    for (let r5 = 0; r5 < e5.length; ++r5) t6.push(255 & e5.charCodeAt(r5));
    return t6;
  })(t5), e4, r4, s4);
}
function base64Write(e4, t5, r4, s4) {
  return blitBuffer(base64ToBytes(t5), e4, r4, s4);
}
function ucs2Write(e4, t5, r4, s4) {
  return blitBuffer((function(e5, t6) {
    let r5, s5, a6;
    const c4 = [];
    for (let u3 = 0; u3 < e5.length && !((t6 -= 2) < 0); ++u3) r5 = e5.charCodeAt(u3), s5 = r5 >> 8, a6 = r5 % 256, c4.push(a6, s5);
    return c4;
  })(t5, e4.length - r4), e4, r4, s4);
}
function base64Slice(e4, t5, r4) {
  return 0 === t5 && r4 === e4.length ? fromByteArray(e4) : fromByteArray(e4.slice(t5, r4));
}
function utf8Slice(e4, t5, r4) {
  r4 = Math.min(e4.length, r4);
  const s4 = [];
  let a6 = t5;
  for (; a6 < r4; ) {
    const t6 = e4[a6];
    let c4 = null, u3 = t6 > 239 ? 4 : t6 > 223 ? 3 : t6 > 191 ? 2 : 1;
    if (a6 + u3 <= r4) {
      let r5, s5, f3, h4;
      switch (u3) {
        case 1:
          t6 < 128 && (c4 = t6);
          break;
        case 2:
          r5 = e4[a6 + 1], 128 == (192 & r5) && (h4 = (31 & t6) << 6 | 63 & r5, h4 > 127 && (c4 = h4));
          break;
        case 3:
          r5 = e4[a6 + 1], s5 = e4[a6 + 2], 128 == (192 & r5) && 128 == (192 & s5) && (h4 = (15 & t6) << 12 | (63 & r5) << 6 | 63 & s5, h4 > 2047 && (h4 < 55296 || h4 > 57343) && (c4 = h4));
          break;
        case 4:
          r5 = e4[a6 + 1], s5 = e4[a6 + 2], f3 = e4[a6 + 3], 128 == (192 & r5) && 128 == (192 & s5) && 128 == (192 & f3) && (h4 = (15 & t6) << 18 | (63 & r5) << 12 | (63 & s5) << 6 | 63 & f3, h4 > 65535 && h4 < 1114112 && (c4 = h4));
      }
    }
    null === c4 ? (c4 = 65533, u3 = 1) : c4 > 65535 && (c4 -= 65536, s4.push(c4 >>> 10 & 1023 | 55296), c4 = 56320 | 1023 & c4), s4.push(c4), a6 += u3;
  }
  return (function(e5) {
    const t6 = e5.length;
    if (t6 <= Vt3) return String.fromCharCode.apply(String, e5);
    let r5 = "", s5 = 0;
    for (; s5 < t6; ) r5 += String.fromCharCode.apply(String, e5.slice(s5, s5 += Vt3));
    return r5;
  })(s4);
}
function asciiSlice(e4, t5, r4) {
  let s4 = "";
  r4 = Math.min(e4.length, r4);
  for (let a6 = t5; a6 < r4; ++a6) s4 += String.fromCharCode(127 & e4[a6]);
  return s4;
}
function latin1Slice(e4, t5, r4) {
  let s4 = "";
  r4 = Math.min(e4.length, r4);
  for (let a6 = t5; a6 < r4; ++a6) s4 += String.fromCharCode(e4[a6]);
  return s4;
}
function hexSlice(e4, t5, r4) {
  const s4 = e4.length;
  (!t5 || t5 < 0) && (t5 = 0), (!r4 || r4 < 0 || r4 > s4) && (r4 = s4);
  let a6 = "";
  for (let s5 = t5; s5 < r4; ++s5) a6 += Jt3[e4[s5]];
  return a6;
}
function utf16leSlice(e4, t5, r4) {
  const s4 = e4.slice(t5, r4);
  let a6 = "";
  for (let e5 = 0; e5 < s4.length - 1; e5 += 2) a6 += String.fromCharCode(s4[e5] + 256 * s4[e5 + 1]);
  return a6;
}
function checkOffset(e4, t5, r4) {
  if (e4 % 1 != 0 || e4 < 0) throw new RangeError("offset is not uint");
  if (e4 + t5 > r4) throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(e4, t5, r4, s4, a6, c4) {
  if (!Buffer$1.isBuffer(e4)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (t5 > a6 || t5 < c4) throw new RangeError('"value" argument is out of bounds');
  if (r4 + s4 > e4.length) throw new RangeError("Index out of range");
}
function wrtBigUInt64LE(e4, t5, r4, s4, a6) {
  checkIntBI(t5, s4, a6, e4, r4, 7);
  let c4 = Number(t5 & BigInt(4294967295));
  e4[r4++] = c4, c4 >>= 8, e4[r4++] = c4, c4 >>= 8, e4[r4++] = c4, c4 >>= 8, e4[r4++] = c4;
  let u3 = Number(t5 >> BigInt(32) & BigInt(4294967295));
  return e4[r4++] = u3, u3 >>= 8, e4[r4++] = u3, u3 >>= 8, e4[r4++] = u3, u3 >>= 8, e4[r4++] = u3, r4;
}
function wrtBigUInt64BE(e4, t5, r4, s4, a6) {
  checkIntBI(t5, s4, a6, e4, r4, 7);
  let c4 = Number(t5 & BigInt(4294967295));
  e4[r4 + 7] = c4, c4 >>= 8, e4[r4 + 6] = c4, c4 >>= 8, e4[r4 + 5] = c4, c4 >>= 8, e4[r4 + 4] = c4;
  let u3 = Number(t5 >> BigInt(32) & BigInt(4294967295));
  return e4[r4 + 3] = u3, u3 >>= 8, e4[r4 + 2] = u3, u3 >>= 8, e4[r4 + 1] = u3, u3 >>= 8, e4[r4] = u3, r4 + 8;
}
function checkIEEE754(e4, t5, r4, s4, a6, c4) {
  if (r4 + s4 > e4.length) throw new RangeError("Index out of range");
  if (r4 < 0) throw new RangeError("Index out of range");
}
function writeFloat(e4, t5, r4, s4, a6) {
  return t5 = +t5, r4 >>>= 0, a6 || checkIEEE754(e4, 0, r4, 4), write(e4, t5, r4, s4, 23, 4), r4 + 4;
}
function writeDouble(e4, t5, r4, s4, a6) {
  return t5 = +t5, r4 >>>= 0, a6 || checkIEEE754(e4, 0, r4, 8), write(e4, t5, r4, s4, 52, 8), r4 + 8;
}
function E$1(e4, t5, r4) {
  Gt3[e4] = class extends r4 {
    constructor() {
      super(), Object.defineProperty(this, "message", { value: Reflect.apply(t5, this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e4}]`, this.stack, delete this.name;
    }
    get code() {
      return e4;
    }
    set code(e5) {
      Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: e5, writable: true });
    }
    toString() {
      return `${this.name} [${e4}]: ${this.message}`;
    }
  };
}
function addNumericalSeparator(e4) {
  let t5 = "", r4 = e4.length;
  const s4 = "-" === e4[0] ? 1 : 0;
  for (; r4 >= s4 + 4; r4 -= 3) t5 = `_${e4.slice(r4 - 3, r4)}${t5}`;
  return `${e4.slice(0, r4)}${t5}`;
}
function checkIntBI(e4, t5, r4, s4, a6, c4) {
  if (e4 > r4 || e4 < t5) {
    const r5 = "bigint" == typeof t5 ? "n" : "";
    let s5;
    throw s5 = 0 === t5 || t5 === BigInt(0) ? `>= 0${r5} and < 2${r5} ** ${8 * (c4 + 1)}${r5}` : `>= -(2${r5} ** ${8 * (c4 + 1) - 1}${r5}) and < 2 ** ${8 * (c4 + 1) - 1}${r5}`, new Gt3.ERR_OUT_OF_RANGE("value", s5, e4);
  }
  !(function(e5, t6, r5) {
    validateNumber(t6, "offset"), void 0 !== e5[t6] && void 0 !== e5[t6 + r5] || boundsError(t6, e5.length - (r5 + 1));
  })(s4, a6, c4);
}
function validateNumber(e4, t5) {
  if ("number" != typeof e4) throw new Gt3.ERR_INVALID_ARG_TYPE(t5, "number", e4);
}
function boundsError(e4, t5, r4) {
  if (Math.floor(e4) !== e4) throw validateNumber(e4, r4), new Gt3.ERR_OUT_OF_RANGE("offset", "an integer", e4);
  if (t5 < 0) throw new Gt3.ERR_BUFFER_OUT_OF_BOUNDS();
  throw new Gt3.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${t5}`, e4);
}
function utf8ToBytes(e4, t5) {
  let r4;
  t5 = t5 || Number.POSITIVE_INFINITY;
  const s4 = e4.length;
  let a6 = null;
  const c4 = [];
  for (let u3 = 0; u3 < s4; ++u3) {
    if (r4 = e4.charCodeAt(u3), r4 > 55295 && r4 < 57344) {
      if (!a6) {
        if (r4 > 56319) {
          (t5 -= 3) > -1 && c4.push(239, 191, 189);
          continue;
        }
        if (u3 + 1 === s4) {
          (t5 -= 3) > -1 && c4.push(239, 191, 189);
          continue;
        }
        a6 = r4;
        continue;
      }
      if (r4 < 56320) {
        (t5 -= 3) > -1 && c4.push(239, 191, 189), a6 = r4;
        continue;
      }
      r4 = 65536 + (a6 - 55296 << 10 | r4 - 56320);
    } else a6 && (t5 -= 3) > -1 && c4.push(239, 191, 189);
    if (a6 = null, r4 < 128) {
      if ((t5 -= 1) < 0) break;
      c4.push(r4);
    } else if (r4 < 2048) {
      if ((t5 -= 2) < 0) break;
      c4.push(r4 >> 6 | 192, 63 & r4 | 128);
    } else if (r4 < 65536) {
      if ((t5 -= 3) < 0) break;
      c4.push(r4 >> 12 | 224, r4 >> 6 & 63 | 128, 63 & r4 | 128);
    } else {
      if (!(r4 < 1114112)) throw new Error("Invalid code point");
      if ((t5 -= 4) < 0) break;
      c4.push(r4 >> 18 | 240, r4 >> 12 & 63 | 128, r4 >> 6 & 63 | 128, 63 & r4 | 128);
    }
  }
  return c4;
}
function base64ToBytes(e4) {
  return toByteArray((function(e5) {
    if ((e5 = (e5 = e5.split("=")[0]).trim().replace(Yt3, "")).length < 2) return "";
    for (; e5.length % 4 != 0; ) e5 += "=";
    return e5;
  })(e4));
}
function blitBuffer(e4, t5, r4, s4) {
  let a6;
  for (a6 = 0; a6 < s4 && !(a6 + r4 >= t5.length || a6 >= e4.length); ++a6) t5[a6 + r4] = e4[a6];
  return a6;
}
function isInstance(e4, t5) {
  return e4 instanceof t5 || null != e4 && null != e4.constructor && null != e4.constructor.name && e4.constructor.name === t5.name;
}
function numberIsNaN(e4) {
  return e4 != e4;
}
function defineBigIntMethod(e4) {
  return "undefined" == typeof BigInt ? BufferBigIntNotDefined : e4;
}
function BufferBigIntNotDefined() {
  throw new Error("BigInt not supported");
}
function setTimeoutFallback(e4, t5, ...r4) {
  return new Timeout(e4, r4);
}
function setImmediateFallback(e4, ...t5) {
  return new Immediate(e4, t5);
}
function setIntervalFallback(e4, t5, ...r4) {
  return new Timeout(e4, r4);
}
function toBufferLike(e4) {
  if (null == e4) return "";
  const t5 = typeof e4;
  return "string" === t5 ? e4 : "number" === t5 || "boolean" === t5 || "bigint" === t5 ? e4.toString() : "function" === t5 || "symbol" === t5 ? "{}" : e4 instanceof Uint8Array || e4 instanceof ArrayBuffer ? e4 : (function(e5) {
    if (null === e5 || "object" != typeof e5) return false;
    const t6 = Object.getPrototypeOf(e5);
    if (null !== t6 && t6 !== Object.prototype && null !== Object.getPrototypeOf(t6)) return false;
    if (Symbol.iterator in e5) return false;
    if (Symbol.toStringTag in e5) return "[object Module]" === Object.prototype.toString.call(e5);
    return true;
  })(e4) ? JSON.stringify(e4) : e4;
}
function adapterUtils(e4) {
  return { peers: e4, publish(t5, r4, s4) {
    let a6;
    for (const r5 of e4) if (r5.topics.has(t5)) {
      a6 = r5;
      break;
    }
    a6 && (a6.send(r4, s4), a6.publish(t5, r4, s4));
  } };
}
function getAttachedState(e4) {
  let t5 = e4._crosswsState;
  return t5 || (t5 = e4.deserializeAttachment() || {}, e4._crosswsState = t5, t5);
}
function setAttachedState(e4, t5) {
  e4._crosswsState = t5, e4.serializeAttachment(t5);
}
function jsonParseTransform2(e4, t5) {
  if (!("__proto__" === e4 || "constructor" === e4 && t5 && "object" == typeof t5 && "prototype" in t5)) return t5;
  !(function(e5) {
    console.warn(`[destr] Dropping "${e5}" key to prevent prototype pollution.`);
  })(e4);
}
function destr2(e4, t5 = {}) {
  if ("string" != typeof e4) return e4;
  if ('"' === e4[0] && '"' === e4[e4.length - 1] && -1 === e4.indexOf("\\")) return e4.slice(1, -1);
  const r4 = e4.trim();
  if (r4.length <= 9) switch (r4.toLowerCase()) {
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
  if (!sr2.test(e4)) {
    if (t5.strict) throw new SyntaxError("[destr] Invalid JSON");
    return e4;
  }
  try {
    if (nr2.test(e4) || or2.test(e4)) {
      if (t5.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e4, jsonParseTransform2);
    }
    return JSON.parse(e4);
  } catch (r5) {
    if (t5.strict) throw r5;
    return e4;
  }
}
function encodeQueryValue2(e4) {
  return (t5 = "string" == typeof e4 ? e4 : JSON.stringify(e4), encodeURI("" + t5).replace(dr2, "|")).replace(lr2, "%2B").replace(pr2, "+").replace(ir2, "%23").replace(ar2, "%26").replace(hr2, "`").replace(fr2, "^").replace(cr2, "%2F");
  var t5;
}
function encodeQueryKey2(e4) {
  return encodeQueryValue2(e4).replace(ur2, "%3D");
}
function decode2(e4 = "") {
  try {
    return decodeURIComponent("" + e4);
  } catch {
    return "" + e4;
  }
}
function decodeQueryKey2(e4) {
  return decode2(e4.replace(lr2, " "));
}
function decodeQueryValue2(e4) {
  return decode2(e4.replace(lr2, " "));
}
function parseQuery(e4 = "") {
  const t5 = /* @__PURE__ */ Object.create(null);
  "?" === e4[0] && (e4 = e4.slice(1));
  for (const r4 of e4.split("&")) {
    const e5 = r4.match(/([^=]+)=?(.*)/) || [];
    if (e5.length < 2) continue;
    const s4 = decodeQueryKey2(e5[1]);
    if ("__proto__" === s4 || "constructor" === s4) continue;
    const a6 = decodeQueryValue2(e5[2] || "");
    void 0 === t5[s4] ? t5[s4] = a6 : Array.isArray(t5[s4]) ? t5[s4].push(a6) : t5[s4] = [t5[s4], a6];
  }
  return t5;
}
function stringifyQuery(e4) {
  return Object.keys(e4).filter((t5) => void 0 !== e4[t5]).map((t5) => {
    return r4 = t5, "number" != typeof (s4 = e4[t5]) && "boolean" != typeof s4 || (s4 = String(s4)), s4 ? Array.isArray(s4) ? s4.map((e5) => `${encodeQueryKey2(r4)}=${encodeQueryValue2(e5)}`).join("&") : `${encodeQueryKey2(r4)}=${encodeQueryValue2(s4)}` : encodeQueryKey2(r4);
    var r4, s4;
  }).filter(Boolean).join("&");
}
function hasProtocol(e4, t5 = {}) {
  return "boolean" == typeof t5 && (t5 = { acceptRelative: t5 }), t5.strict ? gr2.test(e4) : yr2.test(e4) || !!t5.acceptRelative && mr2.test(e4);
}
function isScriptProtocol(e4) {
  return !!e4 && wr2.test(e4);
}
function hasTrailingSlash(e4 = "", t5) {
  return t5 ? br2.test(e4) : e4.endsWith("/");
}
function withoutTrailingSlash(e4 = "", t5) {
  if (!t5) return (hasTrailingSlash(e4) ? e4.slice(0, -1) : e4) || "/";
  if (!hasTrailingSlash(e4, true)) return e4 || "/";
  let r4 = e4, s4 = "";
  const a6 = e4.indexOf("#");
  -1 !== a6 && (r4 = e4.slice(0, a6), s4 = e4.slice(a6));
  const [c4, ...u3] = r4.split("?");
  return ((c4.endsWith("/") ? c4.slice(0, -1) : c4) || "/") + (u3.length > 0 ? `?${u3.join("?")}` : "") + s4;
}
function withTrailingSlash(e4 = "", t5) {
  if (!t5) return e4.endsWith("/") ? e4 : e4 + "/";
  if (hasTrailingSlash(e4, true)) return e4 || "/";
  let r4 = e4, s4 = "";
  const a6 = e4.indexOf("#");
  if (-1 !== a6 && (r4 = e4.slice(0, a6), s4 = e4.slice(a6), !r4)) return s4;
  const [c4, ...u3] = r4.split("?");
  return c4 + "/" + (u3.length > 0 ? `?${u3.join("?")}` : "") + s4;
}
function withLeadingSlash(e4 = "") {
  return (function(e5 = "") {
    return e5.startsWith("/");
  })(e4) ? e4 : "/" + e4;
}
function withoutBase(e4, t5) {
  if (isEmptyURL(t5)) return e4;
  const r4 = withoutTrailingSlash(t5);
  if (!e4.startsWith(r4)) return e4;
  const s4 = e4.slice(r4.length);
  return "/" === s4[0] ? s4 : "/" + s4;
}
function withQuery(e4, t5) {
  const r4 = parseURL(e4), s4 = { ...parseQuery(r4.search), ...t5 };
  return r4.search = stringifyQuery(s4), stringifyParsedURL(r4);
}
function getQuery$1(e4) {
  return parseQuery(parseURL(e4).search);
}
function isEmptyURL(e4) {
  return !e4 || "/" === e4;
}
function joinURL(e4, ...t5) {
  let r4 = e4 || "";
  for (const e5 of t5.filter((e6) => /* @__PURE__ */ (function(e7) {
    return e7 && "/" !== e7;
  })(e6))) if (r4) {
    const t6 = e5.replace(vr2, "");
    r4 = withTrailingSlash(r4) + t6;
  } else r4 = e5;
  return r4;
}
function joinRelativeURL(...e4) {
  const t5 = /\/(?!\/)/, r4 = e4.filter(Boolean), s4 = [];
  let a6 = 0;
  for (const e5 of r4) if (e5 && "/" !== e5) {
    for (const [r5, c5] of e5.split(t5).entries()) if (c5 && "." !== c5) if (".." !== c5) 1 === r5 && s4[s4.length - 1]?.endsWith(":/") ? s4[s4.length - 1] += "/" + c5 : (s4.push(c5), a6++);
    else {
      if (1 === s4.length && hasProtocol(s4[0])) continue;
      s4.pop(), a6--;
    }
  }
  let c4 = s4.join("/");
  return a6 >= 0 ? r4[0]?.startsWith("/") && !c4.startsWith("/") ? c4 = "/" + c4 : r4[0]?.startsWith("./") && !c4.startsWith("./") && (c4 = "./" + c4) : c4 = "../".repeat(-1 * a6) + c4, r4[r4.length - 1]?.endsWith("/") && !c4.endsWith("/") && (c4 += "/"), c4;
}
function isEqual(e4, t5, r4 = {}) {
  return r4.trailingSlash || (e4 = withTrailingSlash(e4), t5 = withTrailingSlash(t5)), r4.leadingSlash || (e4 = withLeadingSlash(e4), t5 = withLeadingSlash(t5)), r4.encoding || (e4 = decode2(e4), t5 = decode2(t5)), e4 === t5;
}
function parseURL(e4 = "", t5) {
  const r4 = e4.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (r4) {
    const [, e5, t6 = ""] = r4;
    return { protocol: e5.toLowerCase(), pathname: t6, href: e5 + t6, auth: "", host: "", search: "", hash: "" };
  }
  if (!hasProtocol(e4, { acceptRelative: true })) return parsePath2(e4);
  const [, s4 = "", a6, c4 = ""] = e4.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, u3 = "", f3 = ""] = c4.match(/([^#/?]*)(.*)?/) || [];
  "file:" === s4 && (f3 = f3.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: h4, search: d3, hash: g4 } = parsePath2(f3);
  return { protocol: s4.toLowerCase(), auth: a6 ? a6.slice(0, Math.max(0, a6.length - 1)) : "", host: u3, pathname: h4, search: d3, hash: g4, [_r2]: !s4 };
}
function parsePath2(e4 = "") {
  const [t5 = "", r4 = "", s4 = ""] = (e4.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return { pathname: t5, search: r4, hash: s4 };
}
function stringifyParsedURL(e4) {
  const t5 = e4.pathname || "", r4 = e4.search ? (e4.search.startsWith("?") ? "" : "?") + e4.search : "", s4 = e4.hash || "", a6 = e4.auth ? e4.auth + "@" : "", c4 = e4.host || "";
  return (e4.protocol || e4[_r2] ? (e4.protocol || "") + "//" : "") + a6 + c4 + t5 + r4 + s4;
}
function createRouter$1(e4 = {}) {
  const t5 = { options: e4, rootNode: createRadixNode(), staticRoutesMap: {} }, normalizeTrailingSlash = /* @__PURE__ */ __name((t6) => e4.strictTrailingSlash ? t6 : t6.replace(/\/$/, "") || "/", "normalizeTrailingSlash");
  if (e4.routes) for (const r4 in e4.routes) insert(t5, normalizeTrailingSlash(r4), e4.routes[r4]);
  return { ctx: t5, lookup: /* @__PURE__ */ __name((e5) => (function(e6, t6) {
    const r4 = e6.staticRoutesMap[t6];
    if (r4) return r4.data;
    const s4 = t6.split("/"), a6 = {};
    let c4 = false, u3 = null, f3 = e6.rootNode, h4 = null;
    for (let e7 = 0; e7 < s4.length; e7++) {
      const t7 = s4[e7];
      null !== f3.wildcardChildNode && (u3 = f3.wildcardChildNode, h4 = s4.slice(e7).join("/"));
      const r5 = f3.children.get(t7);
      if (void 0 === r5) {
        if (f3 && f3.placeholderChildren.length > 1) {
          const t8 = s4.length - e7;
          f3 = f3.placeholderChildren.find((e8) => e8.maxDepth === t8) || null;
        } else f3 = f3.placeholderChildren[0] || null;
        if (!f3) break;
        f3.paramName && (a6[f3.paramName] = t7), c4 = true;
      } else f3 = r5;
    }
    null !== f3 && null !== f3.data || null === u3 || (f3 = u3, a6[f3.paramName || "_"] = h4, c4 = true);
    if (!f3) return null;
    if (c4) return { ...f3.data, params: c4 ? a6 : void 0 };
    return f3.data;
  })(t5, normalizeTrailingSlash(e5)), "lookup"), insert: /* @__PURE__ */ __name((e5, r4) => insert(t5, normalizeTrailingSlash(e5), r4), "insert"), remove: /* @__PURE__ */ __name((e5) => (function(e6, t6) {
    let r4 = false;
    const s4 = t6.split("/");
    let a6 = e6.rootNode;
    for (const e7 of s4) if (a6 = a6.children.get(e7), !a6) return r4;
    if (a6.data) {
      const e7 = s4.at(-1) || "";
      a6.data = null, 0 === Object.keys(a6.children).length && a6.parent && (a6.parent.children.delete(e7), a6.parent.wildcardChildNode = null, a6.parent.placeholderChildren = []), r4 = true;
    }
    return r4;
  })(t5, normalizeTrailingSlash(e5)), "remove") };
}
function insert(e4, t5, r4) {
  let s4 = true;
  const a6 = t5.split("/");
  let c4 = e4.rootNode, u3 = 0;
  const f3 = [c4];
  for (const e5 of a6) {
    let t6;
    if (t6 = c4.children.get(e5)) c4 = t6;
    else {
      const r5 = getNodeType(e5);
      t6 = createRadixNode({ type: r5, parent: c4 }), c4.children.set(e5, t6), r5 === Ar2 ? (t6.paramName = "*" === e5 ? "_" + u3++ : e5.slice(1), c4.placeholderChildren.push(t6), s4 = false) : r5 === Rr2 && (c4.wildcardChildNode = t6, t6.paramName = e5.slice(3) || "_", s4 = false), f3.push(t6), c4 = t6;
    }
  }
  for (const [e5, t6] of f3.entries()) t6.maxDepth = Math.max(f3.length - e5, t6.maxDepth || 0);
  return c4.data = r4, true === s4 && (e4.staticRoutesMap[t5] = c4), c4;
}
function createRadixNode(e4 = {}) {
  return { type: e4.type || Er2, maxDepth: 0, parent: e4.parent || null, children: /* @__PURE__ */ new Map(), data: e4.data || null, paramName: e4.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function getNodeType(e4) {
  return e4.startsWith("**") ? Rr2 : ":" === e4[0] || "*" === e4 ? Ar2 : Er2;
}
function toRouteMatcher(e4) {
  return /* @__PURE__ */ (function(e5, t5) {
    return { ctx: { table: e5 }, matchAll: /* @__PURE__ */ __name((r4) => _matchRoutes(r4, e5, t5), "matchAll") };
  })(_routerNodeToTable("", e4.ctx.rootNode), e4.ctx.options.strictTrailingSlash);
}
function _matchRoutes(e4, t5, r4) {
  true !== r4 && e4.endsWith("/") && (e4 = e4.slice(0, -1) || "/");
  const s4 = [];
  for (const [r5, a7] of _sortRoutesMap(t5.wildcard)) (e4 === r5 || e4.startsWith(r5 + "/")) && s4.push(a7);
  for (const [r5, a7] of _sortRoutesMap(t5.dynamic)) if (e4.startsWith(r5 + "/")) {
    const t6 = "/" + e4.slice(r5.length).split("/").splice(2).join("/");
    s4.push(..._matchRoutes(t6, a7));
  }
  const a6 = t5.static.get(e4);
  return a6 && s4.push(a6), s4.filter(Boolean);
}
function _sortRoutesMap(e4) {
  return [...e4.entries()].sort((e5, t5) => e5[0].length - t5[0].length);
}
function _routerNodeToTable(e4, t5) {
  const r4 = { static: /* @__PURE__ */ new Map(), wildcard: /* @__PURE__ */ new Map(), dynamic: /* @__PURE__ */ new Map() };
  return (/* @__PURE__ */ __name(function _addNode(e5, t6) {
    if (e5) if (t6.type !== Er2 || e5.includes("*") || e5.includes(":")) {
      if (t6.type === Rr2) r4.wildcard.set(e5.replace("/**", ""), t6.data);
      else if (t6.type === Ar2) {
        const s4 = _routerNodeToTable("", t6);
        return t6.data && s4.static.set("/", t6.data), void r4.dynamic.set(e5.replace(/\/\*|\/:\w+/, ""), s4);
      }
    } else t6.data && r4.static.set(e5, t6.data);
    for (const [r5, s4] of t6.children.entries()) _addNode(`${e5}/${r5}`.replace("//", "/"), s4);
  }, "_addNode"))(e4, t5), r4;
}
function isPlainObject$1(e4) {
  if (null === e4 || "object" != typeof e4) return false;
  const t5 = Object.getPrototypeOf(e4);
  return (null === t5 || t5 === Object.prototype || null === Object.getPrototypeOf(t5)) && (!(Symbol.iterator in e4) && (!(Symbol.toStringTag in e4) || "[object Module]" === Object.prototype.toString.call(e4)));
}
function _defu$1(e4, t5, r4 = ".", s4) {
  if (!isPlainObject$1(t5)) return _defu$1(e4, {}, r4, s4);
  const a6 = Object.assign({}, t5);
  for (const t6 in e4) {
    if ("__proto__" === t6 || "constructor" === t6) continue;
    const c4 = e4[t6];
    null != c4 && (s4 && s4(a6, t6, c4, r4) || (Array.isArray(c4) && Array.isArray(a6[t6]) ? a6[t6] = [...c4, ...a6[t6]] : isPlainObject$1(c4) && isPlainObject$1(a6[t6]) ? a6[t6] = _defu$1(c4, a6[t6], (r4 ? `${r4}.` : "") + t6.toString(), s4) : a6[t6] = c4));
  }
  return a6;
}
function o4(e4) {
  throw new Error(`${e4} is not implemented yet!`);
}
function p2(e4) {
  const t5 = {};
  for (const [r4, s4] of Object.entries(e4)) r4 && (t5[r4] = (Array.isArray(s4) ? s4 : [s4]).filter(Boolean));
  return t5;
}
function v2(e4 = {}) {
  if (e4 instanceof Headers) return e4;
  const t5 = new Headers();
  for (const [r4, s4] of Object.entries(e4)) if (void 0 !== s4) {
    if (Array.isArray(s4)) {
      for (const e5 of s4) t5.append(r4, String(e5));
      continue;
    }
    t5.set(r4, String(s4));
  }
  return t5;
}
async function b3(e4, t5) {
  const r4 = new y3(), s4 = new w2(r4);
  let a6;
  if (r4.url = t5.url?.toString() || "/", !r4.url.startsWith("/")) {
    const e5 = new URL(r4.url);
    a6 = e5.host, r4.url = e5.pathname + e5.search + e5.hash;
  }
  r4.method = t5.method || "GET", r4.headers = (function(e5 = {}) {
    const t6 = new Tr2(), r5 = Array.isArray(e5) || (function(e6) {
      return "function" == typeof e6?.entries;
    })(e5) ? e5 : Object.entries(e5);
    for (const [e6, s5] of r5) if (s5) {
      if (void 0 === t6[e6]) {
        t6[e6] = s5;
        continue;
      }
      t6[e6] = [...Array.isArray(t6[e6]) ? t6[e6] : [t6[e6]], ...Array.isArray(s5) ? s5 : [s5]];
    }
    return t6;
  })(t5.headers || {}), r4.headers.host || (r4.headers.host = t5.host || a6 || "localhost"), r4.connection.encrypted = r4.connection.encrypted || "https" === t5.protocol, r4.body = t5.body || null, r4.__unenv__ = t5.context, await e4(r4, s4);
  let c4 = s4._data;
  (kr2.has(s4.statusCode) || "HEAD" === r4.method.toUpperCase()) && (c4 = null, delete s4._headers["content-length"]);
  const u3 = { status: s4.statusCode, statusText: s4.statusMessage, headers: s4._headers, body: c4 };
  return r4.destroy(), s4.destroy(), u3;
}
function hasProp2(e4, t5) {
  try {
    return t5 in e4;
  } catch {
    return false;
  }
}
function createError(e4) {
  if ("string" == typeof e4) return new H3Error(e4);
  if (isError(e4)) return e4;
  const t5 = new H3Error(e4.message ?? e4.statusMessage ?? "", { cause: e4.cause || e4 });
  if (hasProp2(e4, "stack")) try {
    Object.defineProperty(t5, "stack", { get: /* @__PURE__ */ __name(() => e4.stack, "get") });
  } catch {
    try {
      t5.stack = e4.stack;
    } catch {
    }
  }
  if (e4.data && (t5.data = e4.data), e4.statusCode ? t5.statusCode = sanitizeStatusCode(e4.statusCode, t5.statusCode) : e4.status && (t5.statusCode = sanitizeStatusCode(e4.status, t5.statusCode)), e4.statusMessage ? t5.statusMessage = e4.statusMessage : e4.statusText && (t5.statusMessage = e4.statusText), t5.statusMessage) {
    const e5 = t5.statusMessage;
    sanitizeStatusMessage(t5.statusMessage) !== e5 && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
  }
  return void 0 !== e4.fatal && (t5.fatal = e4.fatal), void 0 !== e4.unhandled && (t5.unhandled = e4.unhandled), t5;
}
function isError(e4) {
  return true === e4?.constructor?.__h3_error__;
}
function getQuery(e4) {
  return getQuery$1(e4.path || "");
}
function getRequestHeaders(e4) {
  const t5 = {};
  for (const r4 in e4.node.req.headers) {
    const s4 = e4.node.req.headers[r4];
    t5[r4] = Array.isArray(s4) ? s4.filter(Boolean).join(", ") : s4;
  }
  return t5;
}
function readRawBody(e4, t5 = "utf8") {
  !(function(e5, t6) {
    if (!(function(e6, t7) {
      if ("string" == typeof t7) {
        if (e6.method === t7) return true;
      } else if (t7.includes(e6.method)) return true;
      return false;
    })(e5, t6)) throw createError({ statusCode: 405, statusMessage: "HTTP method is not allowed." });
  })(e4, Or2);
  const r4 = e4._requestBody || e4.web?.request?.body || e4.node.req[Cr2] || e4.node.req.rawBody || e4.node.req.body;
  if (r4) {
    const e5 = Promise.resolve(r4).then((e6) => Zt3.isBuffer(e6) ? e6 : "function" == typeof e6.pipeTo ? new Promise((t6, r5) => {
      const s5 = [];
      e6.pipeTo(new WritableStream({ write(e7) {
        s5.push(e7);
      }, close() {
        t6(Zt3.concat(s5));
      }, abort(e7) {
        r5(e7);
      } })).catch(r5);
    }) : "function" == typeof e6.pipe ? new Promise((t6, r5) => {
      const s5 = [];
      e6.on("data", (e7) => {
        s5.push(e7);
      }).on("end", () => {
        t6(Zt3.concat(s5));
      }).on("error", r5);
    }) : e6.constructor === Object ? Zt3.from(JSON.stringify(e6)) : e6 instanceof URLSearchParams ? Zt3.from(e6.toString()) : e6 instanceof FormData ? new Response(e6).bytes().then((e7) => Zt3.from(e7)) : Zt3.from(e6));
    return t5 ? e5.then((e6) => e6.toString(t5)) : e5;
  }
  if (!Number.parseInt(e4.node.req.headers["content-length"] || "") && !String(e4.node.req.headers["transfer-encoding"] ?? "").split(",").map((e5) => e5.trim()).filter(Boolean).includes("chunked")) return Promise.resolve(void 0);
  const s4 = e4.node.req[Cr2] = new Promise((t6, r5) => {
    const s5 = [];
    e4.node.req.on("error", (e5) => {
      r5(e5);
    }).on("data", (e5) => {
      s5.push(e5);
    }).on("end", () => {
      t6(Zt3.concat(s5));
    });
  });
  return t5 ? s4.then((e5) => e5.toString(t5)) : s4;
}
function handleCacheHeaders(e4, t5) {
  const r4 = ["public", ...t5.cacheControls || []];
  let s4 = false;
  if (void 0 !== t5.maxAge && r4.push("max-age=" + +t5.maxAge, "s-maxage=" + +t5.maxAge), t5.modifiedTime) {
    const r5 = new Date(t5.modifiedTime), a6 = e4.node.req.headers["if-modified-since"];
    e4.node.res.setHeader("last-modified", r5.toUTCString()), a6 && new Date(a6) >= r5 && (s4 = true);
  }
  if (t5.etag) {
    e4.node.res.setHeader("etag", t5.etag);
    e4.node.req.headers["if-none-match"] === t5.etag && (s4 = true);
  }
  return e4.node.res.setHeader("cache-control", r4.join(", ")), !!s4 && (e4.node.res.statusCode = 304, e4.handled || e4.node.res.end(), true);
}
function sanitizeStatusMessage(e4 = "") {
  return e4.replace($r2, "");
}
function sanitizeStatusCode(e4, t5 = 200) {
  return e4 ? ("string" == typeof e4 && (e4 = Number.parseInt(e4, 10)), e4 < 100 || e4 > 999 ? t5 : e4) : t5;
}
function splitCookiesString(e4) {
  if (Array.isArray(e4)) return e4.flatMap((e5) => splitCookiesString(e5));
  if ("string" != typeof e4) return [];
  const t5 = [];
  let r4, s4, a6, c4, u3, f3 = 0;
  const skipWhitespace = /* @__PURE__ */ __name(() => {
    for (; f3 < e4.length && /\s/.test(e4.charAt(f3)); ) f3 += 1;
    return f3 < e4.length;
  }, "skipWhitespace"), notSpecialChar = /* @__PURE__ */ __name(() => (s4 = e4.charAt(f3), "=" !== s4 && ";" !== s4 && "," !== s4), "notSpecialChar");
  for (; f3 < e4.length; ) {
    for (r4 = f3, u3 = false; skipWhitespace(); ) if (s4 = e4.charAt(f3), "," === s4) {
      for (a6 = f3, f3 += 1, skipWhitespace(), c4 = f3; f3 < e4.length && notSpecialChar(); ) f3 += 1;
      f3 < e4.length && "=" === e4.charAt(f3) ? (u3 = true, f3 = c4, t5.push(e4.slice(r4, a6)), r4 = f3) : f3 = a6 + 1;
    } else f3 += 1;
    (!u3 || f3 >= e4.length) && t5.push(e4.slice(r4));
  }
  return t5;
}
function send2(e4, t5, r4) {
  return r4 && (function(e5, t6) {
    t6 && 304 !== e5.node.res.statusCode && !e5.node.res.getHeader("content-type") && e5.node.res.setHeader("content-type", t6);
  })(e4, r4), new Promise((r5) => {
    Lr2(() => {
      e4.handled || e4.node.res.end(t5), r5();
    });
  });
}
function setResponseStatus(e4, t5, r4) {
  t5 && (e4.node.res.statusCode = sanitizeStatusCode(t5, e4.node.res.statusCode)), r4 && (e4.node.res.statusMessage = sanitizeStatusMessage(r4));
}
function getResponseStatus(e4) {
  return e4.node.res.statusCode;
}
function getResponseStatusText(e4) {
  return e4.node.res.statusMessage;
}
function setResponseHeaders(e4, t5) {
  for (const [r4, s4] of Object.entries(t5)) e4.node.res.setHeader(r4, s4);
}
function setResponseHeader(e4, t5, r4) {
  e4.node.res.setHeader(t5, r4);
}
function appendResponseHeader(e4, t5, r4) {
  let s4 = e4.node.res.getHeader(t5);
  s4 ? (Array.isArray(s4) || (s4 = [s4.toString()]), e4.node.res.setHeader(t5, [...s4, r4])) : e4.node.res.setHeader(t5, r4);
}
function sendStream(e4, t5) {
  if (!t5 || "object" != typeof t5) throw new Error("[h3] Invalid stream provided.");
  if (e4.node.res._data = t5, !e4.node.res.socket) return e4._handled = true, Promise.resolve();
  if (hasProp2(t5, "pipeTo") && "function" == typeof t5.pipeTo) return t5.pipeTo(new WritableStream({ write(t6) {
    e4.node.res.write(t6);
  } })).then(() => {
    e4.node.res.end();
  });
  if (hasProp2(t5, "pipe") && "function" == typeof t5.pipe) return new Promise((r4, s4) => {
    t5.pipe(e4.node.res), t5.on && (t5.on("end", () => {
      e4.node.res.end(), r4();
    }), t5.on("error", (e5) => {
      s4(e5);
    })), e4.node.res.on("close", () => {
      t5.abort && t5.abort();
    });
  });
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(e4, t5) {
  for (const [r4, s4] of t5.headers) "set-cookie" === r4 ? e4.node.res.appendHeader(r4, splitCookiesString(s4)) : e4.node.res.setHeader(r4, s4);
  if (t5.status && (e4.node.res.statusCode = sanitizeStatusCode(t5.status, e4.node.res.statusCode)), t5.statusText && (e4.node.res.statusMessage = sanitizeStatusMessage(t5.statusText)), t5.redirected && e4.node.res.setHeader("location", t5.url), t5.body) return sendStream(e4, t5.body);
  e4.node.res.end();
}
async function proxyRequest(e4, t5, r4 = {}) {
  let s4, a6;
  jr2.has(e4.method) && (r4.streamRequest ? (s4 = (function(e5) {
    if (!Or2.includes(e5.method)) return;
    const t6 = e5.web?.request?.body || e5._requestBody;
    return t6 || (Cr2 in e5.node.req || "rawBody" in e5.node.req || "body" in e5.node.req || "__unenv__" in e5.node.req ? new ReadableStream({ async start(t7) {
      const r5 = await readRawBody(e5, false);
      r5 && t7.enqueue(r5), t7.close();
    } }) : new ReadableStream({ start: /* @__PURE__ */ __name((t7) => {
      e5.node.req.on("data", (e6) => {
        t7.enqueue(e6);
      }), e5.node.req.on("end", () => {
        t7.close();
      }), e5.node.req.on("error", (e6) => {
        t7.error(e6);
      });
    }, "start") }));
  })(e4), a6 = "half") : s4 = await readRawBody(e4, false).catch(() => {
  }));
  const c4 = r4.fetchOptions?.method || e4.method, u3 = (function(e5, ...t6) {
    const r5 = t6.filter(Boolean);
    if (0 === r5.length) return e5;
    const s5 = new Headers(e5);
    for (const e6 of r5) {
      const t7 = Array.isArray(e6) ? e6 : "function" == typeof e6.entries ? e6.entries() : Object.entries(e6);
      for (const [e7, r6] of t7) void 0 !== r6 && s5.set(e7, r6);
    }
    return s5;
  })(getProxyRequestHeaders(e4, { host: t5.startsWith("/") }), r4.fetchOptions?.headers, r4.headers);
  return (async function(e5, t6, r5 = {}) {
    let s5;
    try {
      s5 = await _getFetch(r5.fetch)(t6, { headers: r5.headers, ignoreResponseError: true, ...r5.fetchOptions });
    } catch (e6) {
      throw createError({ status: 502, statusMessage: "Bad Gateway", cause: e6 });
    }
    e5.node.res.statusCode = sanitizeStatusCode(s5.status, e5.node.res.statusCode), e5.node.res.statusMessage = sanitizeStatusMessage(s5.statusText);
    const a7 = [];
    for (const [t7, r6] of s5.headers.entries()) "content-encoding" !== t7 && "content-length" !== t7 && ("set-cookie" !== t7 ? e5.node.res.setHeader(t7, r6) : a7.push(...splitCookiesString(r6)));
    a7.length > 0 && e5.node.res.setHeader("set-cookie", a7.map((e6) => (r5.cookieDomainRewrite && (e6 = rewriteCookieProperty(e6, r5.cookieDomainRewrite, "domain")), r5.cookiePathRewrite && (e6 = rewriteCookieProperty(e6, r5.cookiePathRewrite, "path")), e6)));
    r5.onResponse && await r5.onResponse(e5, s5);
    if (void 0 !== s5._data) return s5._data;
    if (e5.handled) return;
    if (false === r5.sendStream) {
      const t7 = new Uint8Array(await s5.arrayBuffer());
      return e5.node.res.end(t7);
    }
    if (s5.body) for await (const t7 of s5.body) e5.node.res.write(t7);
    return e5.node.res.end();
  })(e4, t5, { ...r4, fetchOptions: { method: c4, body: s4, duplex: a6, ...r4.fetchOptions, headers: u3 } });
}
function getProxyRequestHeaders(e4, t5) {
  const r4 = /* @__PURE__ */ Object.create(null), s4 = getRequestHeaders(e4);
  for (const e5 in s4) (!Hr2.has(e5) || "host" === e5 && t5?.host) && (r4[e5] = s4[e5]);
  return r4;
}
function fetchWithEvent(e4, t5, r4, s4) {
  return _getFetch(s4?.fetch)(t5, { ...r4, context: r4?.context || e4.context, headers: { ...getProxyRequestHeaders(e4, { host: "string" == typeof t5 && t5.startsWith("/") }), ...r4?.headers } });
}
function _getFetch(e4) {
  if (e4) return e4;
  if (globalThis.fetch) return globalThis.fetch;
  throw new Error("fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js.");
}
function rewriteCookieProperty(e4, t5, r4) {
  const s4 = "string" == typeof t5 ? { "*": t5 } : t5;
  return e4.replace(new RegExp(`(;\\s*${r4}=)([^;]+)`, "gi"), (e5, t6, r5) => {
    let a6;
    if (r5 in s4) a6 = s4[r5];
    else {
      if (!("*" in s4)) return e5;
      a6 = s4["*"];
    }
    return a6 ? t6 + a6 : "";
  });
}
function defineWebSocketHandler(e4) {
  return defineEventHandler({ handler() {
    throw createError({ statusCode: 426, statusMessage: "Upgrade Required" });
  }, websocket: e4 });
}
function isEvent(e4) {
  return hasProp2(e4, "__is_event__");
}
function createEvent(e4, t5) {
  return new H3Event(e4, t5);
}
function defineEventHandler(e4) {
  if ("function" == typeof e4) return e4.__is_handler__ = true, e4;
  const t5 = { onRequest: _normalizeArray(e4.onRequest), onBeforeResponse: _normalizeArray(e4.onBeforeResponse) }, _handler = /* @__PURE__ */ __name((r4) => (async function(e5, t6, r5) {
    if (r5.onRequest) {
      for (const t7 of r5.onRequest) if (await t7(e5), e5.handled) return;
    }
    const s4 = await t6(e5), a6 = { body: s4 };
    if (r5.onBeforeResponse) for (const t7 of r5.onBeforeResponse) await t7(e5, a6);
    return a6.body;
  })(r4, e4.handler, t5), "_handler");
  return _handler.__is_handler__ = true, _handler.__resolve__ = e4.handler.__resolve__, _handler.__websocket__ = e4.websocket, _handler;
}
function _normalizeArray(e4) {
  return e4 ? Array.isArray(e4) ? e4 : [e4] : void 0;
}
function isEventHandler(e4) {
  return hasProp2(e4, "__is_handler__");
}
function toEventHandler(e4, t5, r4) {
  return isEventHandler(e4) || console.warn("[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.", r4 && "/" !== r4 ? `
     Route: ${r4}` : "", `
     Handler: ${e4}`), e4;
}
function createApp2(e4 = {}) {
  const t5 = [], r4 = (function(e5, t6) {
    const r5 = t6.debug ? 2 : void 0;
    return Nr2(async (s5) => {
      s5.node.req.originalUrl = s5.node.req.originalUrl || s5.node.req.url || "/";
      const a7 = s5._path || s5.node.req.url || "/";
      let c5;
      t6.onRequest && await t6.onRequest(s5);
      for (const u3 of e5) {
        if (u3.route.length > 1) {
          if (!a7.startsWith(u3.route)) continue;
          c5 = a7.slice(u3.route.length) || "/";
        } else c5 = a7;
        if (u3.match && !u3.match(c5, s5)) continue;
        s5._path = c5, s5.node.req.url = c5;
        const e6 = await u3.handler(s5), f3 = void 0 === e6 ? void 0 : await e6;
        if (void 0 !== f3) {
          const e7 = { body: f3 };
          return t6.onBeforeResponse && (s5._onBeforeResponseCalled = true, await t6.onBeforeResponse(s5, e7)), await handleHandlerResponse(s5, e7.body, r5), void (t6.onAfterResponse && (s5._onAfterResponseCalled = true, await t6.onAfterResponse(s5, e7)));
        }
        if (s5.handled) return void (t6.onAfterResponse && (s5._onAfterResponseCalled = true, await t6.onAfterResponse(s5, void 0)));
      }
      if (!s5.handled) throw createError({ statusCode: 404, statusMessage: `Cannot find any path matching ${s5.path || "/"}.` });
      t6.onAfterResponse && (s5._onAfterResponseCalled = true, await t6.onAfterResponse(s5, void 0));
    });
  })(t5, e4), s4 = /* @__PURE__ */ (function(e5) {
    return async (t6) => {
      let r5;
      for (const s5 of e5) {
        if ("/" === s5.route && !s5.handler.__resolve__) continue;
        if (!t6.startsWith(s5.route)) continue;
        if (r5 = t6.slice(s5.route.length) || "/", s5.match && !s5.match(r5, void 0)) continue;
        let e6 = { route: s5.route, handler: s5.handler };
        if (e6.handler.__resolve__) {
          const t7 = await e6.handler.__resolve__(r5);
          if (!t7) continue;
          e6 = { ...e6, ...t7, route: joinURL(e6.route || "/", t7.route || "/") };
        }
        return e6;
      }
    };
  })(t5);
  r4.__resolve__ = s4;
  const a6 = /* @__PURE__ */ (function(e5) {
    let t6;
    return () => (t6 || (t6 = e5()), t6);
  })(() => {
    return t6 = s4, { ...e4.websocket, async resolve(e5) {
      const r5 = e5.request?.url || e5.url || "/", { pathname: s5 } = "string" == typeof r5 ? parseURL(r5) : r5, a7 = await t6(s5);
      return a7?.handler?.__websocket__ || {};
    } };
    var t6;
  }), c4 = { use: /* @__PURE__ */ __name((e5, t6, r5) => use(c4, e5, t6, r5), "use"), resolve: s4, handler: r4, stack: t5, options: e4, get websocket() {
    return a6();
  } };
  return c4;
}
function use(e4, t5, r4, s4) {
  if (Array.isArray(t5)) for (const a6 of t5) use(e4, a6, r4, s4);
  else if (Array.isArray(r4)) for (const a6 of r4) use(e4, t5, a6, s4);
  else "string" == typeof t5 ? e4.stack.push(normalizeLayer({ ...s4, route: t5, handler: r4 })) : "function" == typeof t5 ? e4.stack.push(normalizeLayer({ ...r4, handler: t5 })) : e4.stack.push(normalizeLayer({ ...t5 }));
  return e4;
}
function normalizeLayer(e4) {
  let t5 = e4.handler;
  return t5.handler && (t5 = t5.handler), e4.lazy ? t5 = lazyEventHandler(t5) : isEventHandler(t5) || (t5 = toEventHandler(t5, 0, e4.route)), { route: withoutTrailingSlash(e4.route), match: e4.match, handler: t5 };
}
function handleHandlerResponse(e4, t5, r4) {
  if (null === t5) return (function(e5, t6) {
    if (e5.handled) return;
    t6 || 200 === e5.node.res.statusCode || (t6 = e5.node.res.statusCode);
    const r5 = sanitizeStatusCode(t6, 204);
    204 === r5 && e5.node.res.removeHeader("content-length"), e5.node.res.writeHead(r5), e5.node.res.end();
  })(e4);
  if (t5) {
    if (s4 = t5, "undefined" != typeof Response && s4 instanceof Response) return sendWebResponse(e4, t5);
    if ((function(e5) {
      if (!e5 || "object" != typeof e5) return false;
      if ("function" == typeof e5.pipe) {
        if ("function" == typeof e5._read) return true;
        if ("function" == typeof e5.abort) return true;
      }
      return "function" == typeof e5.pipeTo;
    })(t5)) return sendStream(e4, t5);
    if (t5.buffer) return send2(e4, t5);
    if (t5.arrayBuffer && "function" == typeof t5.arrayBuffer) return t5.arrayBuffer().then((r5) => send2(e4, Zt3.from(r5), t5.type));
    if (t5 instanceof Error) throw createError(t5);
    if ("function" == typeof t5.end) return true;
  }
  var s4;
  const a6 = typeof t5;
  if ("string" === a6) return send2(e4, t5, Pr2.html);
  if ("object" === a6 || "boolean" === a6 || "number" === a6) return send2(e4, JSON.stringify(t5, void 0, r4), Pr2.json);
  if ("bigint" === a6) return send2(e4, t5.toString(), Pr2.json);
  throw createError({ statusCode: 500, statusMessage: `[h3] Cannot send ${a6} as response.` });
}
function toNodeListener(e4) {
  return async function(t5, r4) {
    const s4 = createEvent(t5, r4);
    try {
      await e4.handler(s4);
    } catch (t6) {
      const r5 = createError(t6);
      if (isError(t6) || (r5.unhandled = true), setResponseStatus(s4, r5.statusCode, r5.statusMessage), e4.options.onError && await e4.options.onError(r5, s4), s4.handled) return;
      (r5.unhandled || r5.fatal) && console.error("[h3]", r5.fatal ? "[fatal]" : "[unhandled]", r5), e4.options.onBeforeResponse && !s4._onBeforeResponseCalled && await e4.options.onBeforeResponse(s4, { body: r5 }), await (function(e5, t7, r6) {
        if (e5.handled) return;
        const s5 = isError(t7) ? t7 : createError(t7), a6 = { statusCode: s5.statusCode, statusMessage: s5.statusMessage, stack: [], data: s5.data };
        if (r6 && (a6.stack = (s5.stack || "").split("\n").map((e6) => e6.trim())), e5.handled) return;
        setResponseStatus(e5, Number.parseInt(s5.statusCode), s5.statusMessage), e5.node.res.setHeader("content-type", Pr2.json), e5.node.res.end(JSON.stringify(a6, void 0, 2));
      })(s4, r5, !!e4.options.debug), e4.options.onAfterResponse && !s4._onAfterResponseCalled && await e4.options.onAfterResponse(s4, { body: r5 });
    }
  };
}
function flatHooks(e4, t5 = {}, r4) {
  for (const s4 in e4) {
    const a6 = e4[s4], c4 = r4 ? `${r4}:${s4}` : s4;
    "object" == typeof a6 && null !== a6 ? flatHooks(a6, t5, c4) : "function" == typeof a6 && (t5[c4] = a6);
  }
  return t5;
}
function serialTaskCaller(e4, t5) {
  const r4 = t5.shift(), s4 = Wr2(r4);
  return e4.reduce((e5, r5) => e5.then(() => s4.run(() => r5(...t5))), Promise.resolve());
}
function parallelTaskCaller(e4, t5) {
  const r4 = t5.shift(), s4 = Wr2(r4);
  return Promise.all(e4.map((e5) => s4.run(() => e5(...t5))));
}
function callEachWith(e4, t5) {
  for (const r4 of [...e4]) r4(t5);
}
function createHooks() {
  return new Hookable();
}
function isPayloadMethod2(e4 = "GET") {
  return Fr2.has(e4.toUpperCase());
}
function resolveFetchOptions2(e4, t5, r4, s4) {
  const a6 = (function(e5, t6, r5) {
    if (!t6) return new r5(e5);
    const s5 = new r5(t6);
    if (e5) for (const [t7, a7] of Symbol.iterator in e5 || Array.isArray(e5) ? e5 : new r5(e5)) s5.set(t7, a7);
    return s5;
  })(t5?.headers ?? e4?.headers, r4?.headers, s4);
  let c4;
  return (r4?.query || r4?.params || t5?.params || t5?.query) && (c4 = { ...r4?.params, ...r4?.query, ...t5?.params, ...t5?.query }), { ...r4, ...t5, query: c4, params: c4, headers: a6 };
}
async function callHooks2(e4, t5) {
  if (t5) if (Array.isArray(t5)) for (const r4 of t5) await r4(e4);
  else await t5(e4);
}
function createFetch2(e4 = {}) {
  const { fetch: t5 = globalThis.fetch, Headers: r4 = globalThis.Headers, AbortController: s4 = globalThis.AbortController } = e4;
  async function onError(e5) {
    const t6 = e5.error && "AbortError" === e5.error.name && !e5.options.timeout || false;
    if (false !== e5.options.retry && !t6) {
      let t7;
      t7 = "number" == typeof e5.options.retry ? e5.options.retry : isPayloadMethod2(e5.options.method) ? 0 : 1;
      const r6 = e5.response && e5.response.status || 500;
      if (t7 > 0 && (Array.isArray(e5.options.retryStatusCodes) ? e5.options.retryStatusCodes.includes(r6) : Qr.has(r6))) {
        const r7 = "function" == typeof e5.options.retryDelay ? e5.options.retryDelay(e5) : e5.options.retryDelay || 0;
        return r7 > 0 && await new Promise((e6) => setTimeout(e6, r7)), $fetchRaw(e5.request, { ...e5.options, retry: t7 - 1 });
      }
    }
    const r5 = (function(e6) {
      const t7 = e6.error?.message || e6.error?.toString() || "", r6 = e6.request?.method || e6.options?.method || "GET", s5 = e6.request?.url || String(e6.request) || "/", a6 = `[${r6}] ${JSON.stringify(s5)}`, c4 = e6.response ? `${e6.response.status} ${e6.response.statusText}` : "<no response>", u3 = new FetchError2(`${a6}: ${c4}${t7 ? ` ${t7}` : ""}`, e6.error ? { cause: e6.error } : void 0);
      for (const t8 of ["request", "options", "response"]) Object.defineProperty(u3, t8, { get: /* @__PURE__ */ __name(() => e6[t8], "get") });
      for (const [t8, r7] of [["data", "_data"], ["status", "status"], ["statusCode", "status"], ["statusText", "statusText"], ["statusMessage", "statusText"]]) Object.defineProperty(u3, t8, { get: /* @__PURE__ */ __name(() => e6.response && e6.response[r7], "get") });
      return u3;
    })(e5);
    throw Error.captureStackTrace && Error.captureStackTrace(r5, $fetchRaw), r5;
  }
  __name(onError, "onError");
  const $fetchRaw = /* @__PURE__ */ __name(async function(a6, c4 = {}) {
    const u3 = { request: a6, options: resolveFetchOptions2(a6, c4, e4.defaults, r4), response: void 0, error: void 0 };
    if (u3.options.method && (u3.options.method = u3.options.method.toUpperCase()), u3.options.onRequest && (await callHooks2(u3, u3.options.onRequest), u3.options.headers instanceof r4 || (u3.options.headers = new r4(u3.options.headers || {}))), "string" == typeof u3.request && (u3.options.baseURL && (u3.request = (function(e5, t6) {
      if (isEmptyURL(t6) || hasProtocol(e5)) return e5;
      const r5 = withoutTrailingSlash(t6);
      return e5.startsWith(r5) ? e5 : joinURL(r5, e5);
    })(u3.request, u3.options.baseURL)), u3.options.query && (u3.request = withQuery(u3.request, u3.options.query), delete u3.options.query), "query" in u3.options && delete u3.options.query, "params" in u3.options && delete u3.options.params), u3.options.body && isPayloadMethod2(u3.options.method)) if ((function(e5) {
      if (void 0 === e5) return false;
      const t6 = typeof e5;
      return "string" === t6 || "number" === t6 || "boolean" === t6 || null === t6 || "object" === t6 && (!!Array.isArray(e5) || !e5.buffer && !(e5 instanceof FormData || e5 instanceof URLSearchParams) && (e5.constructor && "Object" === e5.constructor.name || "function" == typeof e5.toJSON));
    })(u3.options.body)) {
      const e5 = u3.options.headers.get("content-type");
      "string" != typeof u3.options.body && (u3.options.body = "application/x-www-form-urlencoded" === e5 ? new URLSearchParams(u3.options.body).toString() : JSON.stringify(u3.options.body)), e5 || u3.options.headers.set("content-type", "application/json"), u3.options.headers.has("accept") || u3.options.headers.set("accept", "application/json");
    } else ("pipeTo" in u3.options.body && "function" == typeof u3.options.body.pipeTo || "function" == typeof u3.options.body.pipe) && ("duplex" in u3.options || (u3.options.duplex = "half"));
    let f3;
    if (!u3.options.signal && u3.options.timeout) {
      const e5 = new s4();
      f3 = setTimeout(() => {
        const t6 = new Error("[TimeoutError]: The operation was aborted due to timeout");
        t6.name = "TimeoutError", t6.code = 23, e5.abort(t6);
      }, u3.options.timeout), u3.options.signal = e5.signal;
    }
    try {
      u3.response = await t5(u3.request, u3.options);
    } catch (e5) {
      return u3.error = e5, u3.options.onRequestError && await callHooks2(u3, u3.options.onRequestError), await onError(u3);
    } finally {
      f3 && clearTimeout(f3);
    }
    if ((u3.response.body || u3.response._bodyInit) && !Vr2.has(u3.response.status) && "HEAD" !== u3.options.method) {
      const e5 = (u3.options.parseResponse ? "json" : u3.options.responseType) || (function(e6 = "") {
        if (!e6) return "json";
        const t6 = e6.split(";").shift() || "";
        return Kr2.test(t6) ? "json" : "text/event-stream" === t6 ? "stream" : zr2.has(t6) || t6.startsWith("text/") ? "text" : "blob";
      })(u3.response.headers.get("content-type") || "");
      switch (e5) {
        case "json": {
          const e6 = await u3.response.text(), t6 = u3.options.parseResponse || destr2;
          u3.response._data = t6(e6);
          break;
        }
        case "stream":
          u3.response._data = u3.response.body || u3.response._bodyInit;
          break;
        default:
          u3.response._data = await u3.response[e5]();
      }
    }
    return u3.options.onResponse && await callHooks2(u3, u3.options.onResponse), !u3.options.ignoreResponseError && u3.response.status >= 400 && u3.response.status < 600 ? (u3.options.onResponseError && await callHooks2(u3, u3.options.onResponseError), await onError(u3)) : u3.response;
  }, "$fetchRaw"), $fetch = /* @__PURE__ */ __name(async function(e5, t6) {
    return (await $fetchRaw(e5, t6))._data;
  }, "$fetch");
  return $fetch.raw = $fetchRaw, $fetch.native = (...e5) => t5(...e5), $fetch.create = (t6 = {}, r5 = {}) => createFetch2({ ...e4, ...r5, defaults: { ...e4.defaults, ...r5.defaults, ...t6 } }), $fetch;
}
function asyncCall(e4, ...t5) {
  try {
    return (r4 = e4(...t5)) && "function" == typeof r4.then ? r4 : Promise.resolve(r4);
  } catch (e5) {
    return Promise.reject(e5);
  }
  var r4;
}
function stringify2(e4) {
  if (/* @__PURE__ */ (function(e5) {
    const t5 = typeof e5;
    return null === e5 || "object" !== t5 && "function" !== t5;
  })(e4)) return String(e4);
  if ((function(e5) {
    const t5 = Object.getPrototypeOf(e5);
    return !t5 || t5.isPrototypeOf(Object);
  })(e4) || Array.isArray(e4)) return JSON.stringify(e4);
  if ("function" == typeof e4.toJSON) return stringify2(e4.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
function serializeRaw(e4) {
  return "string" == typeof e4 ? e4 : Xr + (function(e5) {
    if (globalThis.Buffer) return Zt3.from(e5).toString("base64");
    return globalThis.btoa(String.fromCodePoint(...e5));
  })(e4);
}
function deserializeRaw(e4) {
  return "string" != typeof e4 ? e4 : e4.startsWith(Xr) ? (function(e5) {
    if (globalThis.Buffer) return Zt3.from(e5, "base64");
    return Uint8Array.from(globalThis.atob(e5), (e6) => e6.codePointAt(0));
  })(e4.slice(7)) : e4;
}
function normalizeKey$1(e4) {
  return e4 && e4.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...e4) {
  return normalizeKey$1(e4.join(":"));
}
function normalizeBaseKey(e4) {
  return (e4 = normalizeKey$1(e4)) ? e4 + ":" : "";
}
function watch2(e4, t5, r4) {
  return e4.watch ? e4.watch((e5, s4) => t5(e5, r4 + s4)) : () => {
  };
}
async function dispose(e4) {
  "function" == typeof e4.dispose && await asyncCall(e4.dispose);
}
function useStorage(e4 = "") {
  return e4 ? (function(e5, t5) {
    if (!(t5 = normalizeBaseKey(t5))) return e5;
    const r4 = { ...e5 };
    for (const s4 of en3) r4[s4] = (r5 = "", ...a6) => e5[s4](t5 + r5, ...a6);
    return r4.getKeys = (r5 = "", ...s4) => e5.getKeys(t5 + r5, ...s4).then((e6) => e6.map((e7) => e7.slice(t5.length))), r4.keys = r4.getKeys, r4.getItems = async (r5, s4) => {
      const a6 = r5.map((e6) => "string" == typeof e6 ? t5 + e6 : { ...e6, key: t5 + e6.key });
      return (await e5.getItems(a6, s4)).map((e6) => ({ key: e6.key.slice(t5.length), value: e6.value }));
    }, r4.setItems = async (r5, s4) => {
      const a6 = r5.map((e6) => ({ key: t5 + e6.key, value: e6.value, options: e6.options }));
      return e5.setItems(a6, s4);
    }, r4;
  })(nn3, e4) : nn3;
}
function hash(e4) {
  return (function(e5) {
    return new k2().finalize(e5).toBase64();
  })("string" == typeof e4 ? e4 : (function(e5) {
    const t5 = new cn3();
    return t5.dispatch(e5), t5.buff;
  })(e4)).replace(/[-_]/g, "").slice(0, 10);
}
function defineCachedFunction(e4, t5 = {}) {
  t5 = { name: "_", base: "/cache", swr: true, maxAge: 1, ...t5 };
  const r4 = {}, s4 = t5.group || "nitro/functions", a6 = t5.name || e4.name || "_", c4 = t5.integrity || hash([e4, t5]), u3 = t5.validate || ((e5) => void 0 !== e5.value);
  return async (...f3) => {
    if (await t5.shouldBypassCache?.(...f3)) return e4(...f3);
    const h4 = await (t5.getKey || getKey)(...f3), d3 = await t5.shouldInvalidateCache?.(...f3), g4 = await (async function(e5, f4, h5, d4) {
      const g5 = [t5.base, s4, a6, e5 + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
      let m4 = await useStorage().getItem(g5).catch((e6) => {
        console.error("[cache] Cache read error.", e6), useNitroApp().captureError(e6, { event: d4, tags: ["cache"] });
      }) || {};
      if ("object" != typeof m4) {
        m4 = {};
        const e6 = new Error("Malformed data read from cache.");
        console.error("[cache]", e6), useNitroApp().captureError(e6, { event: d4, tags: ["cache"] });
      }
      const _3 = 1e3 * (t5.maxAge ?? 0);
      _3 && (m4.expires = Date.now() + _3);
      const E3 = h5 || m4.integrity !== c4 || _3 && Date.now() - (m4.mtime || 0) > _3 || false === u3(m4), R3 = E3 ? (async () => {
        const s5 = r4[e5];
        s5 || (void 0 !== m4.value && (t5.staleMaxAge || 0) >= 0 && false === t5.swr && (m4.value = void 0, m4.integrity = void 0, m4.mtime = void 0, m4.expires = void 0), r4[e5] = Promise.resolve(f4()));
        try {
          m4.value = await r4[e5];
        } catch (t6) {
          throw s5 || delete r4[e5], t6;
        }
        if (!s5 && (m4.mtime = Date.now(), m4.integrity = c4, delete r4[e5], false !== u3(m4))) {
          let e6;
          t5.maxAge && !t5.swr && (e6 = { ttl: t5.maxAge });
          const r5 = useStorage().setItem(g5, m4, e6).catch((e7) => {
            console.error("[cache] Cache write error.", e7), useNitroApp().captureError(e7, { event: d4, tags: ["cache"] });
          });
          d4?.waitUntil && d4.waitUntil(r5);
        }
      })() : Promise.resolve();
      return void 0 === m4.value ? await R3 : E3 && d4 && d4.waitUntil && d4.waitUntil(R3), t5.swr && false !== u3(m4) ? (R3.catch((e6) => {
        console.error("[cache] SWR handler error.", e6), useNitroApp().captureError(e6, { event: d4, tags: ["cache"] });
      }), m4) : R3.then(() => m4);
    })(h4, () => e4(...f3), d3, f3[0] && isEvent(f3[0]) ? f3[0] : void 0);
    let m3 = g4.value;
    return t5.transform && (m3 = await t5.transform(g4, ...f3) || m3), m3;
  };
}
function getKey(...e4) {
  return e4.length > 0 ? hash(e4) : "";
}
function escapeKey(e4) {
  return String(e4).replace(/\W/g, "");
}
function cloneWithProxy(e4, t5) {
  return new Proxy(e4, { get: /* @__PURE__ */ __name((e5, r4, s4) => r4 in t5 ? t5[r4] : Reflect.get(e5, r4, s4), "get"), set: /* @__PURE__ */ __name((e5, r4, s4, a6) => r4 in t5 ? (t5[r4] = s4, true) : Reflect.set(e5, r4, s4, a6), "set") });
}
function klona(e4) {
  if ("object" != typeof e4) return e4;
  var t5, r4, s4 = Object.prototype.toString.call(e4);
  if ("[object Object]" === s4) {
    if (e4.constructor !== Object && "function" == typeof e4.constructor) for (t5 in r4 = new e4.constructor(), e4) e4.hasOwnProperty(t5) && r4[t5] !== e4[t5] && (r4[t5] = klona(e4[t5]));
    else for (t5 in r4 = {}, e4) "__proto__" === t5 ? Object.defineProperty(r4, t5, { value: klona(e4[t5]), configurable: true, enumerable: true, writable: true }) : r4[t5] = klona(e4[t5]);
    return r4;
  }
  if ("[object Array]" === s4) {
    for (t5 = e4.length, r4 = Array(t5); t5--; ) r4[t5] = klona(e4[t5]);
    return r4;
  }
  return "[object Set]" === s4 ? (r4 = /* @__PURE__ */ new Set(), e4.forEach(function(e5) {
    r4.add(klona(e5));
  }), r4) : "[object Map]" === s4 ? (r4 = /* @__PURE__ */ new Map(), e4.forEach(function(e5, t6) {
    r4.set(klona(t6), klona(e5));
  }), r4) : "[object Date]" === s4 ? /* @__PURE__ */ new Date(+e4) : "[object RegExp]" === s4 ? ((r4 = new RegExp(e4.source, e4.flags)).lastIndex = e4.lastIndex, r4) : "[object DataView]" === s4 ? new e4.constructor(klona(e4.buffer)) : "[object ArrayBuffer]" === s4 ? e4.slice(0) : "Array]" === s4.slice(-6) ? new e4.constructor(e4) : e4;
}
function isPlainObject2(e4) {
  if (null === e4 || "object" != typeof e4) return false;
  const t5 = Object.getPrototypeOf(e4);
  return (null === t5 || t5 === Object.prototype || null === Object.getPrototypeOf(t5)) && (!(Symbol.iterator in e4) && (!(Symbol.toStringTag in e4) || "[object Module]" === Object.prototype.toString.call(e4)));
}
function _defu(e4, t5, r4 = ".", s4) {
  if (!isPlainObject2(t5)) return _defu(e4, {}, r4, s4);
  const a6 = Object.assign({}, t5);
  for (const t6 in e4) {
    if ("__proto__" === t6 || "constructor" === t6) continue;
    const c4 = e4[t6];
    null != c4 && (s4 && s4(a6, t6, c4, r4) || (Array.isArray(c4) && Array.isArray(a6[t6]) ? a6[t6] = [...c4, ...a6[t6]] : isPlainObject2(c4) && isPlainObject2(a6[t6]) ? a6[t6] = _defu(c4, a6[t6], (r4 ? `${r4}.` : "") + t6.toString(), s4) : a6[t6] = c4));
  }
  return a6;
}
function isUppercase(e4 = "") {
  if (!fn2.test(e4)) return e4 !== e4.toLowerCase();
}
function kebabCase(e4, t5) {
  return e4 ? (Array.isArray(e4) ? e4 : (function(e5) {
    const t6 = hn3, r4 = [];
    if (!e5 || "string" != typeof e5) return r4;
    let s4, a6, c4 = "";
    for (const u3 of e5) {
      const e6 = t6.includes(u3);
      if (true === e6) {
        r4.push(c4), c4 = "", s4 = void 0;
        continue;
      }
      const f3 = isUppercase(u3);
      if (false === a6) {
        if (false === s4 && true === f3) {
          r4.push(c4), c4 = u3, s4 = f3;
          continue;
        }
        if (true === s4 && false === f3 && c4.length > 1) {
          const e7 = c4.at(-1);
          r4.push(c4.slice(0, Math.max(0, c4.length - 1))), c4 = e7 + u3, s4 = f3;
          continue;
        }
      }
      c4 += u3, s4 = f3, a6 = e6;
    }
    return r4.push(c4), r4;
  })(e4)).map((e5) => e5.toLowerCase()).join(t5) : "";
}
function getEnv(e4, t5) {
  const r4 = (s4 = e4, kebabCase(s4 || "", "_")).toUpperCase();
  var s4;
  return destr2(D2.env[t5.prefix + r4] ?? D2.env[t5.altPrefix + r4]);
}
function _isObject(e4) {
  return "object" == typeof e4 && !Array.isArray(e4);
}
function applyEnv(e4, t5, r4 = "") {
  for (const s4 in e4) {
    const a6 = r4 ? `${r4}_${s4}` : s4, c4 = getEnv(a6, t5);
    _isObject(e4[s4]) ? _isObject(c4) ? (e4[s4] = { ...e4[s4], ...c4 }, applyEnv(e4[s4], t5, a6)) : void 0 === c4 ? applyEnv(e4[s4], t5, a6) : e4[s4] = c4 ?? e4[s4] : e4[s4] = c4 ?? e4[s4], t5.envExpansion && "string" == typeof e4[s4] && (e4[s4] = _expandFromEnv(e4[s4]));
  }
  return e4;
}
function _expandFromEnv(e4) {
  return e4.replace(dn3, (e5, t5) => D2.env[t5] || e5);
}
function useRuntimeConfig2(e4) {
  if (!e4) return yn3;
  if (e4.context.nitro.runtimeConfig) return e4.context.nitro.runtimeConfig;
  const t5 = klona(pn3);
  return applyEnv(t5, gn3), e4.context.nitro.runtimeConfig = t5, t5;
}
function _deepFreeze(e4) {
  const t5 = Object.getOwnPropertyNames(e4);
  for (const r4 of t5) {
    const t6 = e4[r4];
    t6 && "object" == typeof t6 && _deepFreeze(t6);
  }
  return Object.freeze(e4);
}
function createRouteRulesHandler(e4) {
  return Nr2((t5) => {
    const r4 = getRouteRules(t5);
    if (r4.headers && Ur2(t5, r4.headers), r4.redirect) {
      let e5 = r4.redirect.to;
      if (e5.endsWith("/**")) {
        let s4 = t5.path;
        const a6 = r4.redirect._redirectStripBase;
        a6 && (s4 = withoutBase(s4, a6)), e5 = joinURL(e5.slice(0, -3), s4);
      } else if (t5.path.includes("?")) {
        e5 = withQuery(e5, getQuery$1(t5.path));
      }
      return (function(e6, t6, r5 = 302) {
        return e6.node.res.statusCode = sanitizeStatusCode(r5, e6.node.res.statusCode), e6.node.res.setHeader("location", t6), send2(e6, `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${t6.replace(/"/g, "%22")}"></head></html>`, Pr2.html);
      })(t5, e5, r4.redirect.statusCode);
    }
    if (r4.proxy) {
      let s4 = r4.proxy.to;
      if (s4.endsWith("/**")) {
        let e5 = t5.path;
        const a6 = r4.proxy._proxyStripBase;
        a6 && (e5 = withoutBase(e5, a6)), s4 = joinURL(s4.slice(0, -3), e5);
      } else if (t5.path.includes("?")) {
        s4 = withQuery(s4, getQuery$1(t5.path));
      }
      return proxyRequest(t5, s4, { fetch: e4.localFetch, ...r4.proxy });
    }
  });
}
function getRouteRules(e4) {
  return e4.context._nitro = e4.context._nitro || {}, e4.context._nitro.routeRules || (e4.context._nitro.routeRules = getRouteRulesForPath(withoutBase(e4.path.split("?")[0], useRuntimeConfig2().app.baseURL))), e4.context._nitro.routeRules;
}
function getRouteRulesForPath(e4) {
  return defu({}, ...Rn3.matchAll(e4).reverse());
}
function joinHeaders(e4) {
  return Array.isArray(e4) ? e4.join(", ") : String(e4);
}
function normalizeCookieHeader(e4 = "") {
  return splitCookiesString(joinHeaders(e4));
}
function normalizeCookieHeaders(e4) {
  const t5 = new Headers();
  for (const [r4, s4] of e4) if ("set-cookie" === r4) for (const e5 of normalizeCookieHeader(s4)) t5.append("set-cookie", e5);
  else t5.set(r4, joinHeaders(s4));
  return t5;
}
function hasReqHeader(e4, t5, r4) {
  const s4 = (function(e5, t6) {
    return getRequestHeaders(e5)[t6.toLowerCase()];
  })(e4, t5);
  return s4 && "string" == typeof s4 && s4.toLowerCase().includes(r4);
}
function defaultHandler(e4, t5, r4) {
  const s4 = e4.unhandled || e4.fatal, a6 = e4.statusCode || 500, c4 = e4.statusMessage || "Server Error", u3 = (function(e5, t6 = {}) {
    const r5 = (function(e6, t7 = {}) {
      if (t7.xForwardedHost) {
        const t8 = e6.node.req.headers["x-forwarded-host"], r6 = (t8 || "").split(",").shift()?.trim();
        if (r6) return r6;
      }
      return e6.node.req.headers.host || "localhost";
    })(e5, t6), s5 = (function(e6, t7 = {}) {
      return false !== t7.xForwardedProto && "https" === e6.node.req.headers["x-forwarded-proto"] || e6.node.req.connection?.encrypted ? "https" : "http";
    })(e5, t6), a7 = (e5.node.req.originalUrl || e5.path).replace(/^[/\\]+/g, "/");
    return new URL(a7, `${s5}://${r5}`);
  })(t5, { xForwardedHost: true, xForwardedProto: true });
  if (404 === a6) {
    const e5 = "/";
    if (/^\/[^/]/.test(e5) && !u3.pathname.startsWith(e5)) {
      return { status: 302, statusText: "Found", headers: { location: `${e5}${u3.pathname.slice(1)}${u3.search}` }, body: "Redirecting..." };
    }
  }
  if (s4 && !r4?.silent) {
    const r5 = [e4.unhandled && "[unhandled]", e4.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${r5} [${t5.method}] ${u3}
`, e4);
  }
  const f3 = { "content-type": "application/json", "x-content-type-options": "nosniff", "x-frame-options": "DENY", "referrer-policy": "no-referrer", "content-security-policy": "script-src 'none'; frame-ancestors 'none';" };
  setResponseStatus(t5, a6, c4), 404 !== a6 && (function(e5, t6) {
    return e5.node.res.getHeader(t6);
  })(t5, "cache-control") || (f3["cache-control"] = "no-cache");
  return { status: a6, statusText: c4, headers: f3, body: { error: true, url: u3.href, statusCode: a6, statusMessage: c4, message: s4 ? "Server Error" : e4.message, data: s4 ? void 0 : e4.data } };
}
function useNitroApp() {
  return In3;
}
function defineRenderHandler(e4) {
  const t5 = useRuntimeConfig2();
  return Nr2(async (r4) => {
    const s4 = useNitroApp(), a6 = { event: r4, render: e4, response: void 0 };
    if (await s4.hooks.callHook("render:before", a6), !a6.response) {
      if (r4.path === `${t5.app.baseURL}favicon.ico`) return setResponseHeader(r4, "Content-Type", "image/x-icon"), send2(r4, "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      if (a6.response = await a6.render(r4), !a6.response) {
        const e5 = getResponseStatus(r4);
        return setResponseStatus(r4, 200 === e5 ? 500 : e5), send2(r4, "No response returned from render handler: " + r4.path);
      }
    }
    return await s4.hooks.callHook("render:response", a6.response, a6), a6.response.headers && setResponseHeaders(r4, a6.response.headers), (a6.response.statusCode || a6.response.statusMessage) && setResponseStatus(r4, a6.response.statusCode, a6.response.statusMessage), a6.response.body;
  });
}
async function fetchHandler(e4, t5, r4, s4 = new URL(e4.url), a6 = useNitroApp(), c4) {
  let u3;
  return (function(e5) {
    return An3.test(e5.method);
  })(e4) && (u3 = Zt3.from(await e4.arrayBuffer())), globalThis.__env__ = t5, a6.localFetch(s4.pathname + s4.search, { context: { waitUntil: /* @__PURE__ */ __name((e5) => r4.waitUntil(e5), "waitUntil"), _platform: { cf: e4.cf, cloudflare: { request: e4, env: t5, context: r4, url: s4, ...c4 } } }, host: s4.hostname, protocol: s4.protocol, method: e4.method, headers: e4.headers, body: u3 });
}
var t4, r3, s3, a5, c3, inspect, u2, f2, h3, d2, g3, m2, _2, E2, R2, B, S2, x3, I2, T2, C2, O2, P2, _EventEmitter, EventEmitterAsyncResource, EventEmitterReferencingAsyncResource, on$1, once$1, addAbortListener, getEventListeners, getMaxListeners$1, $, FixedCircularBuffer, FixedQueue, ReadStream2, WriteStream2, L2, Process2, U2, j2, _getEnv, H, N2, M2, D2, W, q, F2, z3, K2, Q2, V, G, Y2, J2, Z2, X, ee2, te2, re2, ne2, oe2, se2, ie2, ae2, ce2, ue2, le2, fe3, he3, de3, pe3, ge3, ye3, me3, we3, be3, ve3, _e3, Ee3, Re3, Ae3, Be3, Se3, xe3, Ie3, Te3, ke3, Ce3, Oe3, Pe3, $e3, Le3, Ue3, je3, He3, Ne3, Me3, De3, We3, qe3, Fe3, ze3, Ke3, Qe3, Ve3, Ge3, Ye3, Je3, Ze3, Xe3, et3, tt3, rt3, nt3, ot3, st3, it3, at3, ct3, ut3, lt3, ft3, ht3, dt3, pt3, gt3, yt3, mt3, wt3, bt3, vt3, _t3, Et3, Rt3, At3, Bt3, St3, xt3, It3, Tt3, kt3, Ct3, Ot3, Pt3, $t3, Lt3, Ut3, jt3, Ht3, Nt3, Mt3, Dt3, Wt3, qt3, Ft3, zt3, Kt3, Qt3, Vt3, Gt3, Yt3, Jt3, Zt3, Timeout, Immediate, Xt3, er2, tr2, randomUUID, rr2, Message, Peer, AdapterHookable, CloudflareDurablePeer, nr2, or2, sr2, ir2, ar2, cr2, ur2, lr2, fr2, hr2, dr2, pr2, gr2, yr2, mr2, wr2, br2, vr2, _r2, Er2, Rr2, Ar2, defu, Br2, i3, Sr2, xr2, Ir2, A2, y3, w2, Tr2, kr2, H3Error, Cr2, Or2, Pr2, $r2, Lr2, Ur2, jr2, Hr2, H3Event, Nr2, lazyEventHandler, Mr2, Dr2, Wr2, Hookable, qr, FetchError2, Fr2, zr2, Kr2, Qr, Vr2, Gr2, Yr, Jr2, Zr2, Xr, en3, memory, tn3, normalizeKey2, rn3, nn3, on4, sn3, an3, k2, l2, cn3, cachedEventHandler, un3, ln3, fn2, hn3, dn3, pn3, gn3, yn3, mn3, wn3, bn3, getContext, vn3, _n3, En3, Rn3, An3, Bn3, Sn3, _lazy_hLvLT1, xn3, In3, Tn3, kn3, Agent, Cn, On3, Pn3, $n2, Ln3, Un3, $DurableObject;
var init_nitro = __esm({
  ".output/server/chunks/nitro/nitro.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    "global" in globalThis || (globalThis.global = globalThis);
    t4 = globalThis.AsyncLocalStorage || class {
      __unenv__ = true;
      _currentStore;
      _enterStore;
      _enabled = true;
      getStore() {
        return this._currentStore ?? this._enterStore;
      }
      disable() {
        this._enabled = false;
      }
      enable() {
        this._enabled = true;
      }
      enterWith(e4) {
        this._enterStore = e4;
      }
      run(e4, t5, ...r4) {
        this._currentStore = e4;
        const s4 = t5(...r4);
        return this._currentStore = void 0, s4;
      }
      exit(e4, ...t5) {
        const r4 = this._currentStore;
        this._currentStore = void 0;
        const s4 = e4(...t5);
        return this._currentStore = r4, s4;
      }
      static snapshot() {
        throw new Error("[unenv] `AsyncLocalStorage.snapshot` is not implemented!");
      }
    };
    Object.assign(/* @__PURE__ */ Object.create(null), { NONE: 0, DIRHANDLE: 1, DNSCHANNEL: 2, ELDHISTOGRAM: 3, FILEHANDLE: 4, FILEHANDLECLOSEREQ: 5, BLOBREADER: 6, FSEVENTWRAP: 7, FSREQCALLBACK: 8, FSREQPROMISE: 9, GETADDRINFOREQWRAP: 10, GETNAMEINFOREQWRAP: 11, HEAPSNAPSHOT: 12, HTTP2SESSION: 13, HTTP2STREAM: 14, HTTP2PING: 15, HTTP2SETTINGS: 16, HTTPINCOMINGMESSAGE: 17, HTTPCLIENTREQUEST: 18, JSSTREAM: 19, JSUDPWRAP: 20, MESSAGEPORT: 21, PIPECONNECTWRAP: 22, PIPESERVERWRAP: 23, PIPEWRAP: 24, PROCESSWRAP: 25, PROMISE: 26, QUERYWRAP: 27, QUIC_ENDPOINT: 28, QUIC_LOGSTREAM: 29, QUIC_PACKET: 30, QUIC_SESSION: 31, QUIC_STREAM: 32, QUIC_UDP: 33, SHUTDOWNWRAP: 34, SIGNALWRAP: 35, STATWATCHER: 36, STREAMPIPE: 37, TCPCONNECTWRAP: 38, TCPSERVERWRAP: 39, TCPWRAP: 40, TTYWRAP: 41, UDPSENDWRAP: 42, UDPWRAP: 43, SIGINTWATCHDOG: 44, WORKER: 45, WORKERHEAPSNAPSHOT: 46, WRITEWRAP: 47, ZLIB: 48, CHECKPRIMEREQUEST: 49, PBKDF2REQUEST: 50, KEYPAIRGENREQUEST: 51, KEYGENREQUEST: 52, KEYEXPORTREQUEST: 53, CIPHERREQUEST: 54, DERIVEBITSREQUEST: 55, HASHREQUEST: 56, RANDOMBYTESREQUEST: 57, RANDOMPRIMEREQUEST: 58, SCRYPTREQUEST: 59, SIGNREQUEST: 60, TLSWRAP: 61, VERIFYREQUEST: 62 });
    r3 = 100;
    s3 = globalThis.AsyncResource || class {
      __unenv__ = true;
      type;
      _asyncId;
      _triggerAsyncId;
      constructor(e4, t5 = 0) {
        this.type = e4, this._asyncId = -1 * r3++, this._triggerAsyncId = "number" == typeof t5 ? t5 : t5?.triggerAsyncId;
      }
      static bind(e4, t5, r4) {
        return new s3(t5 ?? "anonymous").bind(e4);
      }
      bind(e4, t5) {
        const binded = /* @__PURE__ */ __name((...r4) => this.runInAsyncScope(e4, t5, ...r4), "binded");
        return binded.asyncResource = this, binded;
      }
      runInAsyncScope(e4, t5, ...r4) {
        return e4.apply(t5, r4);
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
    a5 = 10;
    c3 = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    inspect = /* @__PURE__ */ __name((e4, t5) => e4, "inspect");
    u2 = Error;
    f2 = Error;
    h3 = Error;
    d2 = Error;
    g3 = Error;
    m2 = Symbol.for("nodejs.rejection");
    _2 = Symbol.for("kCapture");
    E2 = Symbol.for("events.errorMonitor");
    R2 = Symbol.for("shapeMode");
    B = Symbol.for("events.maxEventTargetListeners");
    S2 = Symbol.for("kEnhanceStackBeforeInspector");
    x3 = Symbol.for("nodejs.watermarkData");
    I2 = Symbol.for("kEventEmitter");
    T2 = Symbol.for("kAsyncResource");
    C2 = Symbol.for("kFirstEventParam");
    O2 = Symbol.for("kResistStopPropagation");
    P2 = Symbol.for("events.maxEventTargetListenersWarned");
    _EventEmitter = class __EventEmitter {
      static {
        __name(this, "_EventEmitter");
      }
      _events = void 0;
      _eventsCount = 0;
      _maxListeners = a5;
      [_2] = false;
      [R2] = false;
      static captureRejectionSymbol = m2;
      static errorMonitor = E2;
      static kMaxEventTargetListeners = B;
      static kMaxEventTargetListenersWarned = P2;
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
      static setMaxListeners(e4 = a5, ...t5) {
        if (0 === t5.length) a5 = e4;
        else for (const r4 of t5) if (isEventTarget(r4)) r4[B] = e4, r4[P2] = false;
        else {
          if ("function" != typeof r4.setMaxListeners) throw new h3("eventTargets", ["EventEmitter", "EventTarget"], r4);
          r4.setMaxListeners(e4);
        }
      }
      static listenerCount(e4, t5) {
        if ("function" == typeof e4.listenerCount) return e4.listenerCount(t5);
        __EventEmitter.prototype.listenerCount.call(e4, t5);
      }
      static init() {
        throw new Error("EventEmitter.init() is not implemented.");
      }
      static get captureRejections() {
        return this[_2];
      }
      static set captureRejections(e4) {
        this[_2] = e4;
      }
      static get defaultMaxListeners() {
        return a5;
      }
      static set defaultMaxListeners(e4) {
        a5 = e4;
      }
      constructor(e4) {
        void 0 === this._events || this._events === Object.getPrototypeOf(this)._events ? (this._events = { __proto__: null }, this._eventsCount = 0, this[R2] = false) : this[R2] = true, this._maxListeners = this._maxListeners || void 0, this[_2] = e4?.captureRejections ? Boolean(e4.captureRejections) : __EventEmitter.prototype[_2];
      }
      setMaxListeners(e4) {
        return this._maxListeners = e4, this;
      }
      getMaxListeners() {
        return _getMaxListeners(this);
      }
      emit(e4, ...t5) {
        let r4 = "error" === e4;
        const s4 = this._events;
        if (void 0 !== s4) r4 && void 0 !== s4[E2] && this.emit(E2, ...t5), r4 = r4 && void 0 === s4.error;
        else if (!r4) return false;
        if (r4) {
          let e5, r5;
          if (t5.length > 0 && (e5 = t5[0]), e5 instanceof Error) {
            try {
              const t6 = {};
              Error.captureStackTrace?.(t6, __EventEmitter.prototype.emit), Object.defineProperty(e5, S2, { __proto__: null, value: Function.prototype.bind(enhanceStackTrace, this, e5, t6), configurable: true });
            } catch {
            }
            throw e5;
          }
          try {
            r5 = inspect(e5);
          } catch {
            r5 = e5;
          }
          const s5 = new f2(r5);
          throw s5.context = e5, s5;
        }
        const a6 = s4[e4];
        if (void 0 === a6) return false;
        if ("function" == typeof a6) {
          const r5 = a6.apply(this, t5);
          null != r5 && addCatch(this, r5, e4, t5);
        } else {
          const r5 = a6.length, s5 = arrayClone(a6);
          for (let a7 = 0; a7 < r5; ++a7) {
            const r6 = s5[a7].apply(this, t5);
            null != r6 && addCatch(this, r6, e4, t5);
          }
        }
        return true;
      }
      addListener(e4, t5) {
        return _addListener(this, e4, t5, false), this;
      }
      on(e4, t5) {
        return this.addListener(e4, t5);
      }
      prependListener(e4, t5) {
        return _addListener(this, e4, t5, true), this;
      }
      once(e4, t5) {
        return this.on(e4, _onceWrap(this, e4, t5)), this;
      }
      prependOnceListener(e4, t5) {
        return this.prependListener(e4, _onceWrap(this, e4, t5)), this;
      }
      removeListener(e4, t5) {
        const r4 = this._events;
        if (void 0 === r4) return this;
        const s4 = r4[e4];
        if (void 0 === s4) return this;
        if (s4 === t5 || s4.listener === t5) this._eventsCount -= 1, this[R2] ? r4[e4] = void 0 : 0 === this._eventsCount ? this._events = { __proto__: null } : (delete r4[e4], r4.removeListener && this.emit("removeListener", e4, s4.listener || t5));
        else if ("function" != typeof s4) {
          let a6 = -1;
          for (let e5 = s4.length - 1; e5 >= 0; e5--) if (s4[e5] === t5 || s4[e5].listener === t5) {
            a6 = e5;
            break;
          }
          if (a6 < 0) return this;
          0 === a6 ? s4.shift() : (function(e5, t6) {
            for (; t6 + 1 < e5.length; t6++) e5[t6] = e5[t6 + 1];
            e5.pop();
          })(s4, a6), 1 === s4.length && (r4[e4] = s4[0]), void 0 !== r4.removeListener && this.emit("removeListener", e4, t5);
        }
        return this;
      }
      off(e4, t5) {
        return this.removeListener(e4, t5);
      }
      removeAllListeners(e4) {
        const t5 = this._events;
        if (void 0 === t5) return this;
        if (void 0 === t5.removeListener) return 0 === arguments.length ? (this._events = { __proto__: null }, this._eventsCount = 0) : void 0 !== t5[e4] && (0 === --this._eventsCount ? this._events = { __proto__: null } : delete t5[e4]), this[R2] = false, this;
        if (0 === arguments.length) {
          for (const e5 of Reflect.ownKeys(t5)) "removeListener" !== e5 && this.removeAllListeners(e5);
          return this.removeAllListeners("removeListener"), this._events = { __proto__: null }, this._eventsCount = 0, this[R2] = false, this;
        }
        const r4 = t5[e4];
        if ("function" == typeof r4) this.removeListener(e4, r4);
        else if (void 0 !== r4) for (let t6 = r4.length - 1; t6 >= 0; t6--) this.removeListener(e4, r4[t6]);
        return this;
      }
      listeners(e4) {
        return _listeners(this, e4, true);
      }
      rawListeners(e4) {
        return _listeners(this, e4, false);
      }
      eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      }
      listenerCount(e4, t5) {
        const r4 = this._events;
        if (void 0 !== r4) {
          const s4 = r4[e4];
          if ("function" == typeof s4) return null != t5 ? t5 === s4 || t5 === s4.listener ? 1 : 0 : 1;
          if (void 0 !== s4) {
            if (null != t5) {
              let e5 = 0;
              for (let r5 = 0, a6 = s4.length; r5 < a6; r5++) s4[r5] !== t5 && s4[r5].listener !== t5 || e5++;
              return e5;
            }
            return s4.length;
          }
        }
        return 0;
      }
    };
    EventEmitterAsyncResource = class extends _EventEmitter {
      static {
        __name(this, "EventEmitterAsyncResource");
      }
      constructor(e4) {
        let t5;
        "string" == typeof e4 ? (t5 = e4, e4 = void 0) : t5 = e4?.name || new.target.name, super(e4), this[T2] = new EventEmitterReferencingAsyncResource(this, t5, e4);
      }
      emit(e4, ...t5) {
        if (void 0 === this[T2]) throw new u2("EventEmitterAsyncResource");
        const { asyncResource: r4 } = this;
        return Array.prototype.unshift(t5, super.emit, this, e4), Reflect.apply(r4.runInAsyncScope, r4, t5);
      }
      emitDestroy() {
        if (void 0 === this[T2]) throw new u2("EventEmitterAsyncResource");
        this.asyncResource.emitDestroy();
      }
      get asyncId() {
        if (void 0 === this[T2]) throw new u2("EventEmitterAsyncResource");
        return this.asyncResource.asyncId();
      }
      get triggerAsyncId() {
        if (void 0 === this[T2]) throw new u2("EventEmitterAsyncResource");
        return this.asyncResource.triggerAsyncId();
      }
      get asyncResource() {
        if (void 0 === this[T2]) throw new u2("EventEmitterAsyncResource");
        return this[T2];
      }
    };
    EventEmitterReferencingAsyncResource = class extends s3 {
      static {
        __name(this, "EventEmitterReferencingAsyncResource");
      }
      constructor(e4, t5, r4) {
        super(t5, r4), this[I2] = e4;
      }
      get eventEmitter() {
        if (void 0 === this[I2]) throw new u2("EventEmitterReferencingAsyncResource");
        return this[I2];
      }
    };
    on$1 = /* @__PURE__ */ __name(function(e4, t5, r4 = {}) {
      const s4 = r4.signal;
      if (s4?.aborted) throw new d2(void 0, { cause: s4?.reason });
      const a6 = r4.highWaterMark ?? r4.highWatermark ?? Number.MAX_SAFE_INTEGER, u3 = r4.lowWaterMark ?? r4.lowWatermark ?? 1, f3 = new FixedQueue(), g4 = new FixedQueue();
      let m3 = false, _3 = null, E3 = false, R3 = 0;
      const B2 = Object.setPrototypeOf({ next() {
        if (R3) {
          const t6 = f3.shift();
          return R3--, m3 && R3 < u3 && (e4.resume?.(), m3 = false), Promise.resolve(createIterResult(t6, false));
        }
        if (_3) {
          const e5 = Promise.reject(_3);
          return _3 = null, e5;
        }
        return E3 ? closeHandler() : new Promise(function(e5, t6) {
          g4.push({ resolve: e5, reject: t6 });
        });
      }, return: /* @__PURE__ */ __name(() => closeHandler(), "return"), throw(e5) {
        if (!(e5 && e5 instanceof Error)) throw new h3("EventEmitter.AsyncIterator", "Error", e5);
        errorHandler(e5);
      }, [Symbol.asyncIterator]() {
        return this;
      }, [x3]: { get size() {
        return R3;
      }, get low() {
        return u3;
      }, get high() {
        return a6;
      }, get isPaused() {
        return m3;
      } } }, c3), { addEventListener: S3, removeAll: I3 } = /* @__PURE__ */ (function() {
        const e5 = [];
        return { addEventListener(t6, r5, s5, a7) {
          eventTargetAgnosticAddListener(t6, r5, s5, a7), Array.prototype.push(e5, [t6, r5, s5, a7]);
        }, removeAll() {
          for (; e5.length > 0; ) Reflect.apply(eventTargetAgnosticRemoveListener, void 0, e5.pop());
        } };
      })();
      S3(e4, t5, r4[C2] ? eventHandler : function(...e5) {
        return eventHandler(e5);
      }), "error" !== t5 && "function" == typeof e4.on && S3(e4, "error", errorHandler);
      const T3 = r4?.close;
      if (T3?.length) for (const t6 of T3) S3(e4, t6, closeHandler);
      const O3 = s4 ? addAbortListener(s4, function() {
        errorHandler(new d2(void 0, { cause: s4?.reason }));
      }) : null;
      return B2;
      function eventHandler(t6) {
        g4.isEmpty() ? (R3++, !m3 && R3 > a6 && (m3 = true, e4.pause?.()), f3.push(t6)) : g4.shift().resolve(createIterResult(t6, false));
      }
      __name(eventHandler, "eventHandler");
      function errorHandler(e5) {
        g4.isEmpty() ? _3 = e5 : g4.shift().reject(e5), closeHandler();
      }
      __name(errorHandler, "errorHandler");
      function closeHandler() {
        O3?.[Symbol.dispose](), I3(), E3 = true;
        const e5 = createIterResult(void 0, true);
        for (; !g4.isEmpty(); ) g4.shift().resolve(e5);
        return Promise.resolve(e5);
      }
      __name(closeHandler, "closeHandler");
    }, "on$1");
    once$1 = /* @__PURE__ */ __name(async function(e4, t5, r4 = {}) {
      const s4 = r4?.signal;
      if (s4?.aborted) throw new d2(void 0, { cause: s4?.reason });
      return new Promise((r5, a6) => {
        const errorListener = /* @__PURE__ */ __name((r6) => {
          "function" == typeof e4.removeListener && e4.removeListener(t5, resolver), null != s4 && eventTargetAgnosticRemoveListener(s4, "abort", abortListener), a6(r6);
        }, "errorListener"), resolver = /* @__PURE__ */ __name((...t6) => {
          "function" == typeof e4.removeListener && e4.removeListener("error", errorListener), null != s4 && eventTargetAgnosticRemoveListener(s4, "abort", abortListener), r5(t6);
        }, "resolver");
        function abortListener() {
          eventTargetAgnosticRemoveListener(e4, t5, resolver), eventTargetAgnosticRemoveListener(e4, "error", errorListener), a6(new d2(void 0, { cause: s4?.reason }));
        }
        __name(abortListener, "abortListener");
        eventTargetAgnosticAddListener(e4, t5, resolver, { __proto__: null, once: true, [O2]: true }), "error" !== t5 && "function" == typeof e4.once && e4.once("error", errorListener), null != s4 && eventTargetAgnosticAddListener(s4, "abort", abortListener, { __proto__: null, once: true, [O2]: true });
      });
    }, "once$1");
    addAbortListener = /* @__PURE__ */ __name(function(e4, t5) {
      if (void 0 === e4) throw new h3("signal", "AbortSignal", e4);
      let r4;
      return e4.aborted ? queueMicrotask(() => t5()) : (e4.addEventListener("abort", t5, { __proto__: null, once: true, [O2]: true }), r4 = /* @__PURE__ */ __name(() => {
        e4.removeEventListener("abort", t5);
      }, "r")), { __proto__: null, [Symbol.dispose]() {
        r4?.();
      } };
    }, "addAbortListener");
    getEventListeners = /* @__PURE__ */ __name(function(e4, t5) {
      if ("function" == typeof e4.listeners) return e4.listeners(t5);
      if (isEventTarget(e4)) {
        const r4 = e4[kEvents].get(t5), s4 = [];
        let a6 = r4?.next;
        for (; void 0 !== a6?.listener; ) {
          const e5 = a6.listener?.deref ? a6.listener.deref() : a6.listener;
          s4.push(e5), a6 = a6.next;
        }
        return s4;
      }
      throw new h3("emitter", ["EventEmitter", "EventTarget"], e4);
    }, "getEventListeners");
    getMaxListeners$1 = /* @__PURE__ */ __name(function(e4) {
      if ("function" == typeof e4?.getMaxListeners) return _getMaxListeners(e4);
      if (e4?.[B]) return e4[B];
      throw new h3("emitter", ["EventEmitter", "EventTarget"], e4);
    }, "getMaxListeners$1");
    $ = 2047;
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
        return (this.top + 1 & $) === this.bottom;
      }
      push(e4) {
        this.list[this.top] = e4, this.top = this.top + 1 & $;
      }
      shift() {
        const e4 = this.list[this.bottom];
        return void 0 === e4 ? null : (this.list[this.bottom] = void 0, this.bottom = this.bottom + 1 & $, e4);
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
      push(e4) {
        this.head.isFull() && (this.head = this.head.next = new FixedCircularBuffer()), this.head.push(e4);
      }
      shift() {
        const e4 = this.tail, t5 = e4.shift();
        return e4.isEmpty() && null !== e4.next && (this.tail = e4.next, e4.next = null), t5;
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
    __name(createNotImplementedError2, "createNotImplementedError");
    __name(notImplemented2, "notImplemented");
    ReadStream2 = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(e4) {
        this.fd = e4;
      }
      setRawMode(e4) {
        return this.isRaw = e4, this;
      }
    };
    WriteStream2 = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(e4) {
        this.fd = e4;
      }
      clearLine(e4, t5) {
        return t5 && t5(), false;
      }
      clearScreenDown(e4) {
        return e4 && e4(), false;
      }
      cursorTo(e4, t5, r4) {
        return r4 && "function" == typeof r4 && r4(), false;
      }
      moveCursor(e4, t5, r4) {
        return r4 && r4(), false;
      }
      getColorDepth(e4) {
        return 1;
      }
      hasColors(e4, t5) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(e4, t5, r4) {
        e4 instanceof Uint8Array && (e4 = new TextDecoder().decode(e4));
        try {
          console.log(e4);
        } catch {
        }
        return r4 && "function" == typeof r4 && r4(), false;
      }
    };
    L2 = "22.14.0";
    Process2 = class _Process extends _EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(e4) {
        super(), this.env = e4.env, this.hrtime = e4.hrtime, this.nextTick = e4.nextTick;
        for (const e5 of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(_EventEmitter.prototype)]) {
          const t5 = this[e5];
          "function" == typeof t5 && (this[e5] = t5.bind(this));
        }
      }
      emitWarning(e4, t5, r4) {
        console.warn(`${r4 ? `[${r4}] ` : ""}${t5 ? `${t5}: ` : ""}${e4}`);
      }
      emit(...e4) {
        return super.emit(...e4);
      }
      listeners(e4) {
        return super.listeners(e4);
      }
      #e;
      #t;
      #r;
      get stdin() {
        return this.#e ??= new ReadStream2(0);
      }
      get stdout() {
        return this.#t ??= new WriteStream2(1);
      }
      get stderr() {
        return this.#r ??= new WriteStream2(2);
      }
      #n = "/";
      chdir(e4) {
        this.#n = e4;
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
        throw createNotImplementedError2("process.umask");
      }
      getBuiltinModule() {
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError2("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError2("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError2("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError2("process.kill");
      }
      abort() {
        throw createNotImplementedError2("process.abort");
      }
      dlopen() {
        throw createNotImplementedError2("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError2("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError2("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError2("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError2("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError2("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError2("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError2("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError2("process.openStdin");
      }
      assert() {
        throw createNotImplementedError2("process.assert");
      }
      binding() {
        throw createNotImplementedError2("process.binding");
      }
      permission = { has: notImplemented2("process.permission.has") };
      report = { directory: "", filename: "", signal: "SIGUSR2", compact: false, reportOnFatalError: false, reportOnSignal: false, reportOnUncaughtException: false, getReport: notImplemented2("process.report.getReport"), writeReport: notImplemented2("process.report.writeReport") };
      finalization = { register: notImplemented2("process.finalization.register"), unregister: notImplemented2("process.finalization.unregister"), registerBeforeExit: notImplemented2("process.finalization.registerBeforeExit") };
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
    U2 = /* @__PURE__ */ Object.create(null);
    j2 = globalThis.process;
    _getEnv = /* @__PURE__ */ __name((e4) => globalThis.__env__ || j2?.env || (e4 ? U2 : globalThis), "_getEnv");
    H = new Proxy(U2, { get: /* @__PURE__ */ __name((e4, t5) => _getEnv()[t5] ?? U2[t5], "get"), has: /* @__PURE__ */ __name((e4, t5) => t5 in _getEnv() || t5 in U2, "has"), set: /* @__PURE__ */ __name((e4, t5, r4) => (_getEnv(true)[t5] = r4, true), "set"), deleteProperty: /* @__PURE__ */ __name((e4, t5) => (delete _getEnv(true)[t5], true), "deleteProperty"), ownKeys() {
      const e4 = _getEnv();
      return Object.keys(e4);
    }, getOwnPropertyDescriptor(e4, t5) {
      const r4 = _getEnv();
      if (t5 in r4) return { value: r4[t5], writable: true, enumerable: true, configurable: true };
    } });
    N2 = Object.assign(function(e4) {
      const t5 = Date.now(), r4 = Math.trunc(t5 / 1e3), s4 = t5 % 1e3 * 1e6;
      if (e4) {
        let t6 = r4 - e4[0], a6 = s4 - e4[0];
        return a6 < 0 && (t6 -= 1, a6 = 1e9 + a6), [t6, a6];
      }
      return [r4, s4];
    }, { bigint: /* @__PURE__ */ __name(function() {
      return BigInt(1e6 * Date.now());
    }, "bigint") });
    M2 = globalThis.queueMicrotask ? (e4, ...t5) => {
      globalThis.queueMicrotask(e4.bind(void 0, ...t5));
    } : createNextTickWithTimeout();
    __name(createNextTickWithTimeout, "createNextTickWithTimeout");
    D2 = new Process2({ env: H, hrtime: N2, nextTick: M2 });
    ({ abort: W, addListener: q, allowedNodeEnvironmentFlags: F2, hasUncaughtExceptionCaptureCallback: z3, setUncaughtExceptionCaptureCallback: K2, loadEnvFile: Q2, sourceMapsEnabled: V, arch: G, argv: Y2, argv0: J2, chdir: Z2, config: X, connected: ee2, constrainedMemory: te2, availableMemory: re2, cpuUsage: ne2, cwd: oe2, debugPort: se2, dlopen: ie2, disconnect: ae2, emit: ce2, emitWarning: ue2, env: le2, eventNames: fe3, execArgv: he3, execPath: de3, exit: pe3, finalization: ge3, features: ye3, getBuiltinModule: me3, getActiveResourcesInfo: we3, getMaxListeners: be3, hrtime: ve3, kill: _e3, listeners: Ee3, listenerCount: Re3, memoryUsage: Ae3, nextTick: Be3, on: Se3, off: xe3, once: Ie3, pid: Te3, platform: ke3, ppid: Ce3, prependListener: Oe3, prependOnceListener: Pe3, rawListeners: $e3, release: Le3, removeAllListeners: Ue3, removeListener: je3, report: He3, resourceUsage: Ne3, setMaxListeners: Me3, setSourceMapsEnabled: De3, stderr: We3, stdin: qe3, stdout: Fe3, title: ze3, umask: Ke3, uptime: Qe3, version: Ve3, versions: Ge3, domain: Ye3, initgroups: Je3, moduleLoadList: Ze3, reallyExit: Xe3, openStdin: et3, assert: tt3, binding: rt3, send: nt3, exitCode: ot3, channel: st3, getegid: it3, geteuid: at3, getgid: ct3, getgroups: ut3, getuid: lt3, setegid: ft3, seteuid: ht3, setgid: dt3, setgroups: pt3, setuid: gt3, permission: yt3, mainModule: mt3, ref: wt3, unref: bt3, _events: vt3, _eventsCount: _t3, _exiting: Et3, _maxListeners: Rt3, _debugEnd: At3, _debugProcess: Bt3, _fatalException: St3, _getActiveHandles: xt3, _getActiveRequests: It3, _kill: Tt3, _preload_modules: kt3, _rawDebug: Ct3, _startProfilerIdleNotifier: Ot3, _stopProfilerIdleNotifier: Pt3, _tickCallback: $t3, _disconnect: Lt3, _handleQueue: Ut3, _pendingMessage: jt3, _channel: Ht3, _send: Nt3, _linkedBinding: Mt3 } = D2);
    Dt3 = globalThis.process;
    globalThis.process = Dt3 ? new Proxy(Dt3, { get: /* @__PURE__ */ __name((e4, t5, r4) => Reflect.has(e4, t5) ? Reflect.get(e4, t5, r4) : Reflect.get(D2, t5, r4), "get") }) : D2;
    Wt3 = [];
    qt3 = [];
    Ft3 = "undefined" == typeof Uint8Array ? Array : Uint8Array;
    zt3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (let e4 = 0, t5 = 64; e4 < t5; ++e4) Wt3[e4] = zt3[e4], qt3[zt3.charCodeAt(e4)] = e4;
    __name(toByteArray, "toByteArray");
    __name(tripletToBase64, "tripletToBase64");
    __name(encodeChunk, "encodeChunk");
    __name(fromByteArray, "fromByteArray");
    __name(read, "read");
    __name(write, "write");
    qt3["-".charCodeAt(0)] = 62, qt3["_".charCodeAt(0)] = 63;
    Kt3 = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
    Qt3 = 2147483647;
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
        const e4 = new Uint8Array(1), t5 = { foo: /* @__PURE__ */ __name(function() {
          return 42;
        }, "foo") };
        return Object.setPrototypeOf(t5, Uint8Array.prototype), Object.setPrototypeOf(e4, t5), 42 === e4.foo();
      } catch {
        return false;
      }
    })(), Buffer$1.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This environment lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(Buffer$1.prototype, "parent", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      if (Buffer$1.isBuffer(this)) return this.buffer;
    }, "get") }), Object.defineProperty(Buffer$1.prototype, "offset", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      if (Buffer$1.isBuffer(this)) return this.byteOffset;
    }, "get") }), Buffer$1.poolSize = 8192, Buffer$1.from = function(e4, t5, r4) {
      return from(e4, t5, r4);
    }, Object.setPrototypeOf(Buffer$1.prototype, Uint8Array.prototype), Object.setPrototypeOf(Buffer$1, Uint8Array), Buffer$1.alloc = function(e4, t5, r4) {
      return (function(e5, t6, r5) {
        return assertSize(e5), e5 <= 0 ? createBuffer2(e5) : void 0 !== t6 ? "string" == typeof r5 ? createBuffer2(e5).fill(t6, r5) : createBuffer2(e5).fill(t6) : createBuffer2(e5);
      })(e4, t5, r4);
    }, Buffer$1.allocUnsafe = function(e4) {
      return allocUnsafe(e4);
    }, Buffer$1.allocUnsafeSlow = function(e4) {
      return allocUnsafe(e4);
    }, Buffer$1.isBuffer = function(e4) {
      return null != e4 && true === e4._isBuffer && e4 !== Buffer$1.prototype;
    }, Buffer$1.compare = function(e4, t5) {
      if (isInstance(e4, Uint8Array) && (e4 = Buffer$1.from(e4, e4.offset, e4.byteLength)), isInstance(t5, Uint8Array) && (t5 = Buffer$1.from(t5, t5.offset, t5.byteLength)), !Buffer$1.isBuffer(e4) || !Buffer$1.isBuffer(t5)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      if (e4 === t5) return 0;
      let r4 = e4.length, s4 = t5.length;
      for (let a6 = 0, c4 = Math.min(r4, s4); a6 < c4; ++a6) if (e4[a6] !== t5[a6]) {
        r4 = e4[a6], s4 = t5[a6];
        break;
      }
      return r4 < s4 ? -1 : s4 < r4 ? 1 : 0;
    }, Buffer$1.isEncoding = function(e4) {
      switch (String(e4).toLowerCase()) {
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
    }, Buffer$1.concat = function(e4, t5) {
      if (!Array.isArray(e4)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e4.length) return Buffer$1.alloc(0);
      let r4;
      if (void 0 === t5) for (t5 = 0, r4 = 0; r4 < e4.length; ++r4) t5 += e4[r4].length;
      const s4 = Buffer$1.allocUnsafe(t5);
      let a6 = 0;
      for (r4 = 0; r4 < e4.length; ++r4) {
        let t6 = e4[r4];
        if (isInstance(t6, Uint8Array)) a6 + t6.length > s4.length ? (Buffer$1.isBuffer(t6) || (t6 = Buffer$1.from(t6.buffer, t6.byteOffset, t6.byteLength)), t6.copy(s4, a6)) : Uint8Array.prototype.set.call(s4, t6, a6);
        else {
          if (!Buffer$1.isBuffer(t6)) throw new TypeError('"list" argument must be an Array of Buffers');
          t6.copy(s4, a6);
        }
        a6 += t6.length;
      }
      return s4;
    }, Buffer$1.byteLength = byteLength, Buffer$1.prototype._isBuffer = true, Buffer$1.prototype.swap16 = function() {
      const e4 = this.length;
      if (e4 % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let t5 = 0; t5 < e4; t5 += 2) swap(this, t5, t5 + 1);
      return this;
    }, Buffer$1.prototype.swap32 = function() {
      const e4 = this.length;
      if (e4 % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let t5 = 0; t5 < e4; t5 += 4) swap(this, t5, t5 + 3), swap(this, t5 + 1, t5 + 2);
      return this;
    }, Buffer$1.prototype.swap64 = function() {
      const e4 = this.length;
      if (e4 % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let t5 = 0; t5 < e4; t5 += 8) swap(this, t5, t5 + 7), swap(this, t5 + 1, t5 + 6), swap(this, t5 + 2, t5 + 5), swap(this, t5 + 3, t5 + 4);
      return this;
    }, Buffer$1.prototype.toString = function() {
      const e4 = this.length;
      return 0 === e4 ? "" : 0 === arguments.length ? utf8Slice(this, 0, e4) : Reflect.apply(slowToString, this, arguments);
    }, Buffer$1.prototype.toLocaleString = Buffer$1.prototype.toString, Buffer$1.prototype.equals = function(e4) {
      if (!Buffer$1.isBuffer(e4)) throw new TypeError("Argument must be a Buffer");
      return this === e4 || 0 === Buffer$1.compare(this, e4);
    }, Buffer$1.prototype.inspect = function() {
      let e4 = "";
      return e4 = this.toString("hex", 0, 50).replace(/(.{2})/g, "$1 ").trim(), this.length > 50 && (e4 += " ... "), "<Buffer " + e4 + ">";
    }, Kt3 && (Buffer$1.prototype[Kt3] = Buffer$1.prototype.inspect), Buffer$1.prototype.compare = function(e4, t5, r4, s4, a6) {
      if (isInstance(e4, Uint8Array) && (e4 = Buffer$1.from(e4, e4.offset, e4.byteLength)), !Buffer$1.isBuffer(e4)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e4);
      if (void 0 === t5 && (t5 = 0), void 0 === r4 && (r4 = e4 ? e4.length : 0), void 0 === s4 && (s4 = 0), void 0 === a6 && (a6 = this.length), t5 < 0 || r4 > e4.length || s4 < 0 || a6 > this.length) throw new RangeError("out of range index");
      if (s4 >= a6 && t5 >= r4) return 0;
      if (s4 >= a6) return -1;
      if (t5 >= r4) return 1;
      if (this === e4) return 0;
      let c4 = (a6 >>>= 0) - (s4 >>>= 0), u3 = (r4 >>>= 0) - (t5 >>>= 0);
      const f3 = Math.min(c4, u3), h4 = this.slice(s4, a6), d3 = e4.slice(t5, r4);
      for (let e5 = 0; e5 < f3; ++e5) if (h4[e5] !== d3[e5]) {
        c4 = h4[e5], u3 = d3[e5];
        break;
      }
      return c4 < u3 ? -1 : u3 < c4 ? 1 : 0;
    }, Buffer$1.prototype.includes = function(e4, t5, r4) {
      return -1 !== this.indexOf(e4, t5, r4);
    }, Buffer$1.prototype.indexOf = function(e4, t5, r4) {
      return bidirectionalIndexOf(this, e4, t5, r4, true);
    }, Buffer$1.prototype.lastIndexOf = function(e4, t5, r4) {
      return bidirectionalIndexOf(this, e4, t5, r4, false);
    }, Buffer$1.prototype.write = function(e4, t5, r4, s4) {
      if (void 0 === t5) s4 = "utf8", r4 = this.length, t5 = 0;
      else if (void 0 === r4 && "string" == typeof t5) s4 = t5, r4 = this.length, t5 = 0;
      else {
        if (!Number.isFinite(t5)) throw new TypeError("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        t5 >>>= 0, Number.isFinite(r4) ? (r4 >>>= 0, void 0 === s4 && (s4 = "utf8")) : (s4 = r4, r4 = void 0);
      }
      const a6 = this.length - t5;
      if ((void 0 === r4 || r4 > a6) && (r4 = a6), e4.length > 0 && (r4 < 0 || t5 < 0) || t5 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      s4 || (s4 = "utf8");
      let c4 = false;
      for (; ; ) switch (s4) {
        case "hex":
          return hexWrite(this, e4, t5, r4);
        case "utf8":
        case "utf-8":
          return utf8Write(this, e4, t5, r4);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, e4, t5, r4);
        case "base64":
          return base64Write(this, e4, t5, r4);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, e4, t5, r4);
        default:
          if (c4) throw new TypeError("Unknown encoding: " + s4);
          s4 = ("" + s4).toLowerCase(), c4 = true;
      }
    }, Buffer$1.prototype.toJSON = function() {
      return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
    };
    Vt3 = 4096;
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
    Buffer$1.prototype.slice = function(e4, t5) {
      const r4 = this.length;
      (e4 = Math.trunc(e4)) < 0 ? (e4 += r4) < 0 && (e4 = 0) : e4 > r4 && (e4 = r4), (t5 = void 0 === t5 ? r4 : Math.trunc(t5)) < 0 ? (t5 += r4) < 0 && (t5 = 0) : t5 > r4 && (t5 = r4), t5 < e4 && (t5 = e4);
      const s4 = this.subarray(e4, t5);
      return Object.setPrototypeOf(s4, Buffer$1.prototype), s4;
    }, Buffer$1.prototype.readUintLE = Buffer$1.prototype.readUIntLE = function(e4, t5, r4) {
      e4 >>>= 0, t5 >>>= 0, r4 || checkOffset(e4, t5, this.length);
      let s4 = this[e4], a6 = 1, c4 = 0;
      for (; ++c4 < t5 && (a6 *= 256); ) s4 += this[e4 + c4] * a6;
      return s4;
    }, Buffer$1.prototype.readUintBE = Buffer$1.prototype.readUIntBE = function(e4, t5, r4) {
      e4 >>>= 0, t5 >>>= 0, r4 || checkOffset(e4, t5, this.length);
      let s4 = this[e4 + --t5], a6 = 1;
      for (; t5 > 0 && (a6 *= 256); ) s4 += this[e4 + --t5] * a6;
      return s4;
    }, Buffer$1.prototype.readUint8 = Buffer$1.prototype.readUInt8 = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 1, this.length), this[e4];
    }, Buffer$1.prototype.readUint16LE = Buffer$1.prototype.readUInt16LE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 2, this.length), this[e4] | this[e4 + 1] << 8;
    }, Buffer$1.prototype.readUint16BE = Buffer$1.prototype.readUInt16BE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 2, this.length), this[e4] << 8 | this[e4 + 1];
    }, Buffer$1.prototype.readUint32LE = Buffer$1.prototype.readUInt32LE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 4, this.length), (this[e4] | this[e4 + 1] << 8 | this[e4 + 2] << 16) + 16777216 * this[e4 + 3];
    }, Buffer$1.prototype.readUint32BE = Buffer$1.prototype.readUInt32BE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 4, this.length), 16777216 * this[e4] + (this[e4 + 1] << 16 | this[e4 + 2] << 8 | this[e4 + 3]);
    }, Buffer$1.prototype.readBigUInt64LE = defineBigIntMethod(function(e4) {
      validateNumber(e4 >>>= 0, "offset");
      const t5 = this[e4], r4 = this[e4 + 7];
      void 0 !== t5 && void 0 !== r4 || boundsError(e4, this.length - 8);
      const s4 = t5 + 256 * this[++e4] + 65536 * this[++e4] + this[++e4] * 2 ** 24, a6 = this[++e4] + 256 * this[++e4] + 65536 * this[++e4] + r4 * 2 ** 24;
      return BigInt(s4) + (BigInt(a6) << BigInt(32));
    }), Buffer$1.prototype.readBigUInt64BE = defineBigIntMethod(function(e4) {
      validateNumber(e4 >>>= 0, "offset");
      const t5 = this[e4], r4 = this[e4 + 7];
      void 0 !== t5 && void 0 !== r4 || boundsError(e4, this.length - 8);
      const s4 = t5 * 2 ** 24 + 65536 * this[++e4] + 256 * this[++e4] + this[++e4], a6 = this[++e4] * 2 ** 24 + 65536 * this[++e4] + 256 * this[++e4] + r4;
      return (BigInt(s4) << BigInt(32)) + BigInt(a6);
    }), Buffer$1.prototype.readIntLE = function(e4, t5, r4) {
      e4 >>>= 0, t5 >>>= 0, r4 || checkOffset(e4, t5, this.length);
      let s4 = this[e4], a6 = 1, c4 = 0;
      for (; ++c4 < t5 && (a6 *= 256); ) s4 += this[e4 + c4] * a6;
      return a6 *= 128, s4 >= a6 && (s4 -= Math.pow(2, 8 * t5)), s4;
    }, Buffer$1.prototype.readIntBE = function(e4, t5, r4) {
      e4 >>>= 0, t5 >>>= 0, r4 || checkOffset(e4, t5, this.length);
      let s4 = t5, a6 = 1, c4 = this[e4 + --s4];
      for (; s4 > 0 && (a6 *= 256); ) c4 += this[e4 + --s4] * a6;
      return a6 *= 128, c4 >= a6 && (c4 -= Math.pow(2, 8 * t5)), c4;
    }, Buffer$1.prototype.readInt8 = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 1, this.length), 128 & this[e4] ? -1 * (255 - this[e4] + 1) : this[e4];
    }, Buffer$1.prototype.readInt16LE = function(e4, t5) {
      e4 >>>= 0, t5 || checkOffset(e4, 2, this.length);
      const r4 = this[e4] | this[e4 + 1] << 8;
      return 32768 & r4 ? 4294901760 | r4 : r4;
    }, Buffer$1.prototype.readInt16BE = function(e4, t5) {
      e4 >>>= 0, t5 || checkOffset(e4, 2, this.length);
      const r4 = this[e4 + 1] | this[e4] << 8;
      return 32768 & r4 ? 4294901760 | r4 : r4;
    }, Buffer$1.prototype.readInt32LE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 4, this.length), this[e4] | this[e4 + 1] << 8 | this[e4 + 2] << 16 | this[e4 + 3] << 24;
    }, Buffer$1.prototype.readInt32BE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 4, this.length), this[e4] << 24 | this[e4 + 1] << 16 | this[e4 + 2] << 8 | this[e4 + 3];
    }, Buffer$1.prototype.readBigInt64LE = defineBigIntMethod(function(e4) {
      validateNumber(e4 >>>= 0, "offset");
      const t5 = this[e4], r4 = this[e4 + 7];
      void 0 !== t5 && void 0 !== r4 || boundsError(e4, this.length - 8);
      const s4 = this[e4 + 4] + 256 * this[e4 + 5] + 65536 * this[e4 + 6] + (r4 << 24);
      return (BigInt(s4) << BigInt(32)) + BigInt(t5 + 256 * this[++e4] + 65536 * this[++e4] + this[++e4] * 2 ** 24);
    }), Buffer$1.prototype.readBigInt64BE = defineBigIntMethod(function(e4) {
      validateNumber(e4 >>>= 0, "offset");
      const t5 = this[e4], r4 = this[e4 + 7];
      void 0 !== t5 && void 0 !== r4 || boundsError(e4, this.length - 8);
      const s4 = (t5 << 24) + 65536 * this[++e4] + 256 * this[++e4] + this[++e4];
      return (BigInt(s4) << BigInt(32)) + BigInt(this[++e4] * 2 ** 24 + 65536 * this[++e4] + 256 * this[++e4] + r4);
    }), Buffer$1.prototype.readFloatLE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 4, this.length), read(this, e4, true, 23, 4);
    }, Buffer$1.prototype.readFloatBE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 4, this.length), read(this, e4, false, 23, 4);
    }, Buffer$1.prototype.readDoubleLE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 8, this.length), read(this, e4, true, 52, 8);
    }, Buffer$1.prototype.readDoubleBE = function(e4, t5) {
      return e4 >>>= 0, t5 || checkOffset(e4, 8, this.length), read(this, e4, false, 52, 8);
    }, Buffer$1.prototype.writeUintLE = Buffer$1.prototype.writeUIntLE = function(e4, t5, r4, s4) {
      if (e4 = +e4, t5 >>>= 0, r4 >>>= 0, !s4) {
        checkInt(this, e4, t5, r4, Math.pow(2, 8 * r4) - 1, 0);
      }
      let a6 = 1, c4 = 0;
      for (this[t5] = 255 & e4; ++c4 < r4 && (a6 *= 256); ) this[t5 + c4] = e4 / a6 & 255;
      return t5 + r4;
    }, Buffer$1.prototype.writeUintBE = Buffer$1.prototype.writeUIntBE = function(e4, t5, r4, s4) {
      if (e4 = +e4, t5 >>>= 0, r4 >>>= 0, !s4) {
        checkInt(this, e4, t5, r4, Math.pow(2, 8 * r4) - 1, 0);
      }
      let a6 = r4 - 1, c4 = 1;
      for (this[t5 + a6] = 255 & e4; --a6 >= 0 && (c4 *= 256); ) this[t5 + a6] = e4 / c4 & 255;
      return t5 + r4;
    }, Buffer$1.prototype.writeUint8 = Buffer$1.prototype.writeUInt8 = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 1, 255, 0), this[t5] = 255 & e4, t5 + 1;
    }, Buffer$1.prototype.writeUint16LE = Buffer$1.prototype.writeUInt16LE = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 2, 65535, 0), this[t5] = 255 & e4, this[t5 + 1] = e4 >>> 8, t5 + 2;
    }, Buffer$1.prototype.writeUint16BE = Buffer$1.prototype.writeUInt16BE = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 2, 65535, 0), this[t5] = e4 >>> 8, this[t5 + 1] = 255 & e4, t5 + 2;
    }, Buffer$1.prototype.writeUint32LE = Buffer$1.prototype.writeUInt32LE = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 4, 4294967295, 0), this[t5 + 3] = e4 >>> 24, this[t5 + 2] = e4 >>> 16, this[t5 + 1] = e4 >>> 8, this[t5] = 255 & e4, t5 + 4;
    }, Buffer$1.prototype.writeUint32BE = Buffer$1.prototype.writeUInt32BE = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 4, 4294967295, 0), this[t5] = e4 >>> 24, this[t5 + 1] = e4 >>> 16, this[t5 + 2] = e4 >>> 8, this[t5 + 3] = 255 & e4, t5 + 4;
    }, Buffer$1.prototype.writeBigUInt64LE = defineBigIntMethod(function(e4, t5 = 0) {
      return wrtBigUInt64LE(this, e4, t5, BigInt(0), BigInt("0xffffffffffffffff"));
    }), Buffer$1.prototype.writeBigUInt64BE = defineBigIntMethod(function(e4, t5 = 0) {
      return wrtBigUInt64BE(this, e4, t5, BigInt(0), BigInt("0xffffffffffffffff"));
    }), Buffer$1.prototype.writeIntLE = function(e4, t5, r4, s4) {
      if (e4 = +e4, t5 >>>= 0, !s4) {
        const s5 = Math.pow(2, 8 * r4 - 1);
        checkInt(this, e4, t5, r4, s5 - 1, -s5);
      }
      let a6 = 0, c4 = 1, u3 = 0;
      for (this[t5] = 255 & e4; ++a6 < r4 && (c4 *= 256); ) e4 < 0 && 0 === u3 && 0 !== this[t5 + a6 - 1] && (u3 = 1), this[t5 + a6] = Math.trunc(e4 / c4) - u3 & 255;
      return t5 + r4;
    }, Buffer$1.prototype.writeIntBE = function(e4, t5, r4, s4) {
      if (e4 = +e4, t5 >>>= 0, !s4) {
        const s5 = Math.pow(2, 8 * r4 - 1);
        checkInt(this, e4, t5, r4, s5 - 1, -s5);
      }
      let a6 = r4 - 1, c4 = 1, u3 = 0;
      for (this[t5 + a6] = 255 & e4; --a6 >= 0 && (c4 *= 256); ) e4 < 0 && 0 === u3 && 0 !== this[t5 + a6 + 1] && (u3 = 1), this[t5 + a6] = Math.trunc(e4 / c4) - u3 & 255;
      return t5 + r4;
    }, Buffer$1.prototype.writeInt8 = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 1, 127, -128), e4 < 0 && (e4 = 255 + e4 + 1), this[t5] = 255 & e4, t5 + 1;
    }, Buffer$1.prototype.writeInt16LE = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 2, 32767, -32768), this[t5] = 255 & e4, this[t5 + 1] = e4 >>> 8, t5 + 2;
    }, Buffer$1.prototype.writeInt16BE = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 2, 32767, -32768), this[t5] = e4 >>> 8, this[t5 + 1] = 255 & e4, t5 + 2;
    }, Buffer$1.prototype.writeInt32LE = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 4, 2147483647, -2147483648), this[t5] = 255 & e4, this[t5 + 1] = e4 >>> 8, this[t5 + 2] = e4 >>> 16, this[t5 + 3] = e4 >>> 24, t5 + 4;
    }, Buffer$1.prototype.writeInt32BE = function(e4, t5, r4) {
      return e4 = +e4, t5 >>>= 0, r4 || checkInt(this, e4, t5, 4, 2147483647, -2147483648), e4 < 0 && (e4 = 4294967295 + e4 + 1), this[t5] = e4 >>> 24, this[t5 + 1] = e4 >>> 16, this[t5 + 2] = e4 >>> 8, this[t5 + 3] = 255 & e4, t5 + 4;
    }, Buffer$1.prototype.writeBigInt64LE = defineBigIntMethod(function(e4, t5 = 0) {
      return wrtBigUInt64LE(this, e4, t5, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), Buffer$1.prototype.writeBigInt64BE = defineBigIntMethod(function(e4, t5 = 0) {
      return wrtBigUInt64BE(this, e4, t5, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), Buffer$1.prototype.writeFloatLE = function(e4, t5, r4) {
      return writeFloat(this, e4, t5, true, r4);
    }, Buffer$1.prototype.writeFloatBE = function(e4, t5, r4) {
      return writeFloat(this, e4, t5, false, r4);
    }, Buffer$1.prototype.writeDoubleLE = function(e4, t5, r4) {
      return writeDouble(this, e4, t5, true, r4);
    }, Buffer$1.prototype.writeDoubleBE = function(e4, t5, r4) {
      return writeDouble(this, e4, t5, false, r4);
    }, Buffer$1.prototype.copy = function(e4, t5, r4, s4) {
      if (!Buffer$1.isBuffer(e4)) throw new TypeError("argument should be a Buffer");
      if (r4 || (r4 = 0), s4 || 0 === s4 || (s4 = this.length), t5 >= e4.length && (t5 = e4.length), t5 || (t5 = 0), s4 > 0 && s4 < r4 && (s4 = r4), s4 === r4) return 0;
      if (0 === e4.length || 0 === this.length) return 0;
      if (t5 < 0) throw new RangeError("targetStart out of bounds");
      if (r4 < 0 || r4 >= this.length) throw new RangeError("Index out of range");
      if (s4 < 0) throw new RangeError("sourceEnd out of bounds");
      s4 > this.length && (s4 = this.length), e4.length - t5 < s4 - r4 && (s4 = e4.length - t5 + r4);
      const a6 = s4 - r4;
      return this === e4 && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t5, r4, s4) : Uint8Array.prototype.set.call(e4, this.subarray(r4, s4), t5), a6;
    }, Buffer$1.prototype.fill = function(e4, t5, r4, s4) {
      if ("string" == typeof e4) {
        if ("string" == typeof t5 ? (s4 = t5, t5 = 0, r4 = this.length) : "string" == typeof r4 && (s4 = r4, r4 = this.length), void 0 !== s4 && "string" != typeof s4) throw new TypeError("encoding must be a string");
        if ("string" == typeof s4 && !Buffer$1.isEncoding(s4)) throw new TypeError("Unknown encoding: " + s4);
        if (1 === e4.length) {
          const t6 = e4.charCodeAt(0);
          ("utf8" === s4 && t6 < 128 || "latin1" === s4) && (e4 = t6);
        }
      } else "number" == typeof e4 ? e4 &= 255 : "boolean" == typeof e4 && (e4 = Number(e4));
      if (t5 < 0 || this.length < t5 || this.length < r4) throw new RangeError("Out of range index");
      if (r4 <= t5) return this;
      let a6;
      if (t5 >>>= 0, r4 = void 0 === r4 ? this.length : r4 >>> 0, e4 || (e4 = 0), "number" == typeof e4) for (a6 = t5; a6 < r4; ++a6) this[a6] = e4;
      else {
        const c4 = Buffer$1.isBuffer(e4) ? e4 : Buffer$1.from(e4, s4), u3 = c4.length;
        if (0 === u3) throw new TypeError('The value "' + e4 + '" is invalid for argument "value"');
        for (a6 = 0; a6 < r4 - t5; ++a6) this[a6 + t5] = c4[a6 % u3];
      }
      return this;
    };
    Gt3 = {};
    __name(E$1, "E$1");
    __name(addNumericalSeparator, "addNumericalSeparator");
    __name(checkIntBI, "checkIntBI");
    __name(validateNumber, "validateNumber");
    __name(boundsError, "boundsError");
    E$1("ERR_BUFFER_OUT_OF_BOUNDS", function(e4) {
      return e4 ? `${e4} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    }, RangeError), E$1("ERR_INVALID_ARG_TYPE", function(e4, t5) {
      return `The "${e4}" argument must be of type number. Received type ${typeof t5}`;
    }, TypeError), E$1("ERR_OUT_OF_RANGE", function(e4, t5, r4) {
      let s4 = `The value of "${e4}" is out of range.`, a6 = r4;
      return Number.isInteger(r4) && Math.abs(r4) > 2 ** 32 ? a6 = addNumericalSeparator(String(r4)) : "bigint" == typeof r4 && (a6 = String(r4), (r4 > BigInt(2) ** BigInt(32) || r4 < -(BigInt(2) ** BigInt(32))) && (a6 = addNumericalSeparator(a6)), a6 += "n"), s4 += ` It must be ${t5}. Received ${a6}`, s4;
    }, RangeError);
    Yt3 = /[^\w+/-]/g;
    __name(utf8ToBytes, "utf8ToBytes");
    __name(base64ToBytes, "base64ToBytes");
    __name(blitBuffer, "blitBuffer");
    __name(isInstance, "isInstance");
    __name(numberIsNaN, "numberIsNaN");
    Jt3 = (function() {
      const e4 = "0123456789abcdef", t5 = Array.from({ length: 256 });
      for (let r4 = 0; r4 < 16; ++r4) {
        const s4 = 16 * r4;
        for (let a6 = 0; a6 < 16; ++a6) t5[s4 + a6] = e4[r4] + e4[a6];
      }
      return t5;
    })();
    __name(defineBigIntMethod, "defineBigIntMethod");
    __name(BufferBigIntNotDefined, "BufferBigIntNotDefined");
    Zt3 = globalThis.Buffer || Buffer$1;
    globalThis.btoa.bind(globalThis), globalThis.atob.bind(globalThis), globalThis.Buffer || (globalThis.Buffer = Zt3);
    Object.assign(() => {
    }, { __unenv__: true });
    Timeout = class {
      static {
        __name(this, "Timeout");
      }
      constructor(e4, t5) {
        "function" == typeof e4 && e4(...t5);
      }
      close() {
        throw createNotImplementedError2("node.timers.timeout.close");
      }
      _onTimeout(...e4) {
        throw createNotImplementedError2("node.timers.timeout._onTimeout");
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
    setTimeoutFallback.__promisify__ = function(e4, t5, r4) {
      return new Promise((e5) => {
        e5(t5);
      });
    };
    Immediate = class {
      static {
        __name(this, "Immediate");
      }
      _onImmediate;
      _timeout;
      constructor(e4, t5) {
        this._onImmediate = e4, "setTimeout" in globalThis ? this._timeout = setTimeout(e4, 0, ...t5) : e4(...t5);
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
    setImmediateFallback.__promisify__ = function(e4) {
      return new Promise((t5) => {
        t5(e4);
      });
    }, setIntervalFallback.__promisify__ = async function* (e4, t5) {
      yield t5;
    };
    Xt3 = globalThis.clearImmediate?.bind(globalThis) || function(e4) {
      e4?.[Symbol.dispose]();
    };
    globalThis.clearInterval?.bind(globalThis), globalThis.clearTimeout?.bind(globalThis);
    er2 = globalThis.setImmediate?.bind(globalThis) || setImmediateFallback;
    globalThis.setTimeout?.bind(globalThis), globalThis.setInterval?.bind(globalThis), globalThis.setImmediate || (globalThis.setImmediate = er2), globalThis.clearImmediate || (globalThis.clearImmediate = Xt3);
    tr2 = globalThis.crypto;
    randomUUID = /* @__PURE__ */ __name(() => tr2.randomUUID(), "randomUUID");
    rr2 = Symbol.for("nodejs.util.inspect.custom");
    __name(toBufferLike, "toBufferLike");
    Message = class {
      static {
        __name(this, "Message");
      }
      event;
      peer;
      rawData;
      #o;
      #s;
      #i;
      #a;
      #c;
      #u;
      constructor(e4, t5, r4) {
        this.rawData = e4 || "", this.peer = t5, this.event = r4;
      }
      get id() {
        return this.#o || (this.#o = randomUUID()), this.#o;
      }
      uint8Array() {
        const e4 = this.#s;
        if (e4) return e4;
        const t5 = this.rawData;
        if (t5 instanceof Uint8Array) return this.#s = t5;
        if (t5 instanceof ArrayBuffer || t5 instanceof SharedArrayBuffer) return this.#i = t5, this.#s = new Uint8Array(t5);
        if ("string" == typeof t5) return this.#c = t5, this.#s = new TextEncoder().encode(this.#c);
        if (Symbol.iterator in t5) return this.#s = new Uint8Array(t5);
        if ("number" == typeof t5?.length) return this.#s = new Uint8Array(t5);
        if (t5 instanceof DataView) return this.#s = new Uint8Array(t5.buffer, t5.byteOffset, t5.byteLength);
        throw new TypeError(`Unsupported message type: ${Object.prototype.toString.call(t5)}`);
      }
      arrayBuffer() {
        const e4 = this.#i;
        if (e4) return e4;
        const t5 = this.rawData;
        return t5 instanceof ArrayBuffer || t5 instanceof SharedArrayBuffer ? this.#i = t5 : this.#i = this.uint8Array().buffer;
      }
      blob() {
        const e4 = this.#a;
        if (e4) return e4;
        const t5 = this.rawData;
        return t5 instanceof Blob ? this.#a = t5 : this.#a = new Blob([this.uint8Array()]);
      }
      text() {
        const e4 = this.#c;
        if (e4) return e4;
        const t5 = this.rawData;
        return this.#c = "string" == typeof t5 ? t5 : new TextDecoder().decode(this.uint8Array());
      }
      json() {
        const e4 = this.#u;
        return e4 || (this.#u = JSON.parse(this.text()));
      }
      get data() {
        switch (this.peer?.websocket?.binaryType) {
          case "arraybuffer":
            return this.arrayBuffer();
          case "blob":
            return this.blob();
          case "nodebuffer":
            return globalThis.Buffer ? Zt3.from(this.uint8Array()) : this.uint8Array();
          case "uint8array":
            return this.uint8Array();
          case "text":
            return this.text();
          default:
            return this.rawData;
        }
      }
      toString() {
        return this.text();
      }
      [Symbol.toPrimitive]() {
        return this.text();
      }
      [rr2]() {
        return { data: this.rawData };
      }
    };
    Peer = class {
      static {
        __name(this, "Peer");
      }
      _internal;
      _topics;
      _id;
      #l;
      constructor(e4) {
        this._topics = /* @__PURE__ */ new Set(), this._internal = e4;
      }
      get context() {
        return this._internal.context ??= {};
      }
      get id() {
        return this._id || (this._id = randomUUID()), this._id;
      }
      get remoteAddress() {
      }
      get request() {
        return this._internal.request;
      }
      get websocket() {
        if (!this.#l) {
          const e4 = this._internal.ws, t5 = this._internal.request;
          this.#l = t5 ? (function(e5, t6) {
            return new Proxy(e5, { get: /* @__PURE__ */ __name((e6, r4) => {
              const s4 = Reflect.get(e6, r4);
              if (!s4) switch (r4) {
                case "protocol":
                  return t6?.headers?.get("sec-websocket-protocol") || "";
                case "extensions":
                  return t6?.headers?.get("sec-websocket-extensions") || "";
                case "url":
                  return t6?.url?.replace(/^http/, "ws") || void 0;
              }
              return s4;
            }, "get") });
          })(e4, t5) : e4;
        }
        return this.#l;
      }
      get peers() {
        return this._internal.peers || /* @__PURE__ */ new Set();
      }
      get topics() {
        return this._topics;
      }
      terminate() {
        this.close();
      }
      subscribe(e4) {
        this._topics.add(e4);
      }
      unsubscribe(e4) {
        this._topics.delete(e4);
      }
      toString() {
        return this.id;
      }
      [Symbol.toPrimitive]() {
        return this.id;
      }
      [Symbol.toStringTag]() {
        return "WebSocket";
      }
      [rr2]() {
        return Object.fromEntries([["id", this.id], ["remoteAddress", this.remoteAddress], ["peers", this.peers], ["webSocket", this.websocket]].filter((e4) => e4[1]));
      }
    };
    AdapterHookable = class {
      static {
        __name(this, "AdapterHookable");
      }
      options;
      constructor(e4) {
        this.options = e4 || {};
      }
      callHook(e4, t5, r4) {
        const s4 = this.options.hooks?.[e4], a6 = s4?.(t5, r4), c4 = this.options.resolve?.(t5);
        if (!c4) return a6;
        const u3 = c4 instanceof Promise ? c4.then((t6) => t6?.[e4]) : c4?.[e4];
        return Promise.all([a6, u3]).then(([e5, s5]) => {
          const a7 = s5?.(t5, r4);
          return a7 instanceof Promise ? a7.then((t6) => t6 || e5) : a7 || e5;
        });
      }
      async upgrade(e4) {
        let t5 = e4.context;
        t5 || (t5 = {}, Object.defineProperty(e4, "context", { enumerable: true, value: t5 }));
        try {
          const r4 = await this.callHook("upgrade", e4);
          if (!r4) return { context: t5 };
          if (false === r4.ok) return { context: t5, endResponse: r4 };
          if (r4.headers) return { context: t5, upgradeHeaders: r4.headers };
        } catch (e5) {
          const r4 = e5.response || e5;
          if (r4 instanceof Response) return { context: t5, endResponse: r4 };
          throw e5;
        }
        return { context: t5 };
      }
    };
    __name(adapterUtils, "adapterUtils");
    CloudflareDurablePeer = class _CloudflareDurablePeer extends Peer {
      static {
        __name(this, "CloudflareDurablePeer");
      }
      get peers() {
        return new Set(this.#f().map((e4) => _CloudflareDurablePeer._restore(this._internal.durable, e4)));
      }
      #f() {
        return this._internal.durable.ctx.getWebSockets();
      }
      send(e4) {
        return this._internal.ws.send(toBufferLike(e4));
      }
      subscribe(e4) {
        super.subscribe(e4);
        const t5 = getAttachedState(this._internal.ws);
        t5.t || (t5.t = /* @__PURE__ */ new Set()), t5.t.add(e4), setAttachedState(this._internal.ws, t5);
      }
      publish(e4, t5) {
        const r4 = this.#f();
        if (r4.length < 2) return;
        const s4 = toBufferLike(t5);
        for (const t6 of r4) {
          if (t6 === this._internal.ws) continue;
          const r5 = getAttachedState(t6);
          r5.t?.has(e4) && t6.send(s4);
        }
      }
      close(e4, t5) {
        this._internal.ws.close(e4, t5);
      }
      static _restore(e4, t5, r4) {
        let s4 = t5._crosswsPeer;
        if (s4) return s4;
        const a6 = t5.deserializeAttachment() || {};
        return s4 = t5._crosswsPeer = new _CloudflareDurablePeer({ ws: t5, request: r4 || { url: a6.u }, durable: e4 }), a6.i && (s4._id = a6.i), r4?.url && (a6.u = r4.url), a6.i = s4.id, setAttachedState(t5, a6), s4;
      }
    };
    __name(getAttachedState, "getAttachedState");
    __name(setAttachedState, "setAttachedState");
    nr2 = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
    or2 = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    sr2 = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
    __name(jsonParseTransform2, "jsonParseTransform");
    __name(destr2, "destr");
    ir2 = /#/g;
    ar2 = /&/g;
    cr2 = /\//g;
    ur2 = /=/g;
    lr2 = /\+/g;
    fr2 = /%5e/gi;
    hr2 = /%60/gi;
    dr2 = /%7c/gi;
    pr2 = /%20/gi;
    __name(encodeQueryValue2, "encodeQueryValue");
    __name(encodeQueryKey2, "encodeQueryKey");
    __name(decode2, "decode");
    __name(decodeQueryKey2, "decodeQueryKey");
    __name(decodeQueryValue2, "decodeQueryValue");
    __name(parseQuery, "parseQuery");
    __name(stringifyQuery, "stringifyQuery");
    gr2 = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
    yr2 = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
    mr2 = /^([/\\]\s*){2,}[^/\\]/;
    wr2 = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
    br2 = /\/$|\/\?|\/#/;
    vr2 = /^\.?\//;
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
    __name(isEqual, "isEqual");
    _r2 = Symbol.for("ufo:protocolRelative");
    __name(parseURL, "parseURL");
    __name(parsePath2, "parsePath");
    __name(stringifyParsedURL, "stringifyParsedURL");
    Er2 = 0;
    Rr2 = 1;
    Ar2 = 2;
    __name(createRouter$1, "createRouter$1");
    __name(insert, "insert");
    __name(createRadixNode, "createRadixNode");
    __name(getNodeType, "getNodeType");
    __name(toRouteMatcher, "toRouteMatcher");
    __name(_matchRoutes, "_matchRoutes");
    __name(_sortRoutesMap, "_sortRoutesMap");
    __name(_routerNodeToTable, "_routerNodeToTable");
    __name(isPlainObject$1, "isPlainObject$1");
    __name(_defu$1, "_defu$1");
    defu = /* @__PURE__ */ __name((...e4) => e4.reduce((e5, t5) => _defu$1(e5, t5, "", Br2), {}), "defu");
    __name(o4, "o");
    i3 = class _i extends _EventEmitter {
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
      static from(e4, t5) {
        return new _i(t5);
      }
      constructor(e4) {
        super();
      }
      _read(e4) {
      }
      read(e4) {
      }
      setEncoding(e4) {
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
      unpipe(e4) {
        return this;
      }
      unshift(e4, t5) {
      }
      wrap(e4) {
        return this;
      }
      push(e4, t5) {
        return false;
      }
      _destroy(e4, t5) {
        this.removeAllListeners();
      }
      destroy(e4) {
        return this.destroyed = true, this._destroy(e4), this;
      }
      pipe(e4, t5) {
        return {};
      }
      compose(e4, t5) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return this.destroy(), Promise.resolve();
      }
      async *[Symbol.asyncIterator]() {
        throw o4("Readable.asyncIterator");
      }
      iterator(e4) {
        throw o4("Readable.iterator");
      }
      map(e4, t5) {
        throw o4("Readable.map");
      }
      filter(e4, t5) {
        throw o4("Readable.filter");
      }
      forEach(e4, t5) {
        throw o4("Readable.forEach");
      }
      reduce(e4, t5, r4) {
        throw o4("Readable.reduce");
      }
      find(e4, t5) {
        throw o4("Readable.find");
      }
      findIndex(e4, t5) {
        throw o4("Readable.findIndex");
      }
      some(e4, t5) {
        throw o4("Readable.some");
      }
      toArray(e4) {
        throw o4("Readable.toArray");
      }
      every(e4, t5) {
        throw o4("Readable.every");
      }
      flatMap(e4, t5) {
        throw o4("Readable.flatMap");
      }
      drop(e4, t5) {
        throw o4("Readable.drop");
      }
      take(e4, t5) {
        throw o4("Readable.take");
      }
      asIndexedPairs(e4) {
        throw o4("Readable.asIndexedPairs");
      }
    };
    Sr2 = class extends _EventEmitter {
      static {
        __name(this, "Sr");
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
      constructor(e4) {
        super();
      }
      pipe(e4, t5) {
        return {};
      }
      _write(e4, t5, r4) {
        if (this.writableEnded) r4 && r4();
        else {
          if (void 0 === this._data) this._data = e4;
          else {
            const r5 = "string" == typeof this._data ? Zt3.from(this._data, this._encoding || t5 || "utf8") : this._data, s4 = "string" == typeof e4 ? Zt3.from(e4, t5 || this._encoding || "utf8") : e4;
            this._data = Zt3.concat([r5, s4]);
          }
          this._encoding = t5, r4 && r4();
        }
      }
      _writev(e4, t5) {
      }
      _destroy(e4, t5) {
      }
      _final(e4) {
      }
      write(e4, t5, r4) {
        const s4 = "string" == typeof t5 ? this._encoding : "utf8", a6 = "function" == typeof t5 ? t5 : "function" == typeof r4 ? r4 : void 0;
        return this._write(e4, s4, a6), true;
      }
      setDefaultEncoding(e4) {
        return this;
      }
      end(e4, t5, r4) {
        const s4 = "function" == typeof e4 ? e4 : "function" == typeof t5 ? t5 : "function" == typeof r4 ? r4 : void 0;
        if (this.writableEnded) return s4 && s4(), this;
        const a6 = e4 === s4 ? void 0 : e4;
        if (a6) {
          const e5 = t5 === s4 ? void 0 : t5;
          this.write(a6, e5, s4);
        }
        return this.writableEnded = true, this.writableFinished = true, this.emit("close"), this.emit("finish"), this;
      }
      cork() {
      }
      uncork() {
      }
      destroy(e4) {
        return this.destroyed = true, delete this._data, this.removeAllListeners(), this;
      }
      compose(e4, t5) {
        throw new Error("Method not implemented.");
      }
      [Symbol.asyncDispose]() {
        return Promise.resolve();
      }
    };
    xr2 = class {
      static {
        __name(this, "xr");
      }
      allowHalfOpen = true;
      _destroy;
      constructor(e4 = new i3(), t5 = new Sr2()) {
        Object.assign(this, e4), Object.assign(this, t5), this._destroy = /* @__PURE__ */ (function(...e5) {
          return function(...t6) {
            for (const r4 of e5) r4(...t6);
          };
        })(e4._destroy, t5._destroy);
      }
    };
    Ir2 = (Object.assign(xr2.prototype, i3.prototype), Object.assign(xr2.prototype, Sr2.prototype), xr2);
    A2 = class extends Ir2 {
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
      constructor(e4) {
        super();
      }
      write(e4, t5, r4) {
        return false;
      }
      connect(e4, t5, r4) {
        return this;
      }
      end(e4, t5, r4) {
        return this;
      }
      setEncoding(e4) {
        return this;
      }
      pause() {
        return this;
      }
      resume() {
        return this;
      }
      setTimeout(e4, t5) {
        return this;
      }
      setNoDelay(e4) {
        return this;
      }
      setKeepAlive(e4, t5) {
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
        const e4 = new Error("ERR_SOCKET_CLOSED");
        return e4.code = "ERR_SOCKET_CLOSED", this.destroy(e4), this;
      }
    };
    y3 = class extends i3 {
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
      constructor(e4) {
        super(), this.socket = this.connection = e4 || new A2();
      }
      get rawHeaders() {
        const e4 = this.headers, t5 = [];
        for (const r4 in e4) if (Array.isArray(e4[r4])) for (const s4 of e4[r4]) t5.push(r4, s4);
        else t5.push(r4, e4[r4]);
        return t5;
      }
      get rawTrailers() {
        return [];
      }
      setTimeout(e4, t5) {
        return this;
      }
      get headersDistinct() {
        return p2(this.headers);
      }
      get trailersDistinct() {
        return p2(this.trailers);
      }
    };
    __name(p2, "p");
    w2 = class extends Sr2 {
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
      constructor(e4) {
        super(), this.req = e4;
      }
      assignSocket(e4) {
        e4._httpMessage = this, this.socket = e4, this.connection = e4, this.emit("socket", e4), this._flush();
      }
      _flush() {
        this.flushHeaders();
      }
      detachSocket(e4) {
      }
      writeContinue(e4) {
      }
      writeHead(e4, t5, r4) {
        e4 && (this.statusCode = e4), "string" == typeof t5 && (this.statusMessage = t5, t5 = void 0);
        const s4 = r4 || t5;
        if (s4 && !Array.isArray(s4)) for (const e5 in s4) this.setHeader(e5, s4[e5]);
        return this.headersSent = true, this;
      }
      writeProcessing() {
      }
      setTimeout(e4, t5) {
        return this;
      }
      appendHeader(e4, t5) {
        e4 = e4.toLowerCase();
        const r4 = this._headers[e4], s4 = [...Array.isArray(r4) ? r4 : [r4], ...Array.isArray(t5) ? t5 : [t5]].filter(Boolean);
        return this._headers[e4] = s4.length > 1 ? s4 : s4[0], this;
      }
      setHeader(e4, t5) {
        return this._headers[e4.toLowerCase()] = t5, this;
      }
      setHeaders(e4) {
        for (const [t5, r4] of Object.entries(e4)) this.setHeader(t5, r4);
        return this;
      }
      getHeader(e4) {
        return this._headers[e4.toLowerCase()];
      }
      getHeaders() {
        return this._headers;
      }
      getHeaderNames() {
        return Object.keys(this._headers);
      }
      hasHeader(e4) {
        return e4.toLowerCase() in this._headers;
      }
      removeHeader(e4) {
        delete this._headers[e4.toLowerCase()];
      }
      addTrailers(e4) {
      }
      flushHeaders() {
      }
      writeEarlyHints(e4, t5) {
        "function" == typeof t5 && t5();
      }
    };
    Tr2 = (() => {
      const n2 = /* @__PURE__ */ __name(function() {
      }, "n");
      return n2.prototype = /* @__PURE__ */ Object.create(null), n2;
    })();
    __name(v2, "v");
    kr2 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(b3, "b");
    __name(hasProp2, "hasProp");
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
      constructor(e4, t5 = {}) {
        super(e4, t5), t5.cause && !this.cause && (this.cause = t5.cause);
      }
      toJSON() {
        const e4 = { message: this.message, statusCode: sanitizeStatusCode(this.statusCode, 500) };
        return this.statusMessage && (e4.statusMessage = sanitizeStatusMessage(this.statusMessage)), void 0 !== this.data && (e4.data = this.data), e4;
      }
    };
    __name(createError, "createError");
    __name(isError, "isError");
    __name(getQuery, "getQuery");
    __name(getRequestHeaders, "getRequestHeaders");
    Cr2 = Symbol.for("h3RawBody");
    Or2 = ["PATCH", "POST", "PUT", "DELETE"];
    __name(readRawBody, "readRawBody");
    __name(handleCacheHeaders, "handleCacheHeaders");
    Pr2 = { html: "text/html", json: "application/json" };
    $r2 = /[^\u0009\u0020-\u007E]/g;
    __name(sanitizeStatusMessage, "sanitizeStatusMessage");
    __name(sanitizeStatusCode, "sanitizeStatusCode");
    __name(splitCookiesString, "splitCookiesString");
    Lr2 = void 0 === er2 ? (e4) => e4() : er2;
    __name(send2, "send");
    __name(setResponseStatus, "setResponseStatus");
    __name(getResponseStatus, "getResponseStatus");
    __name(getResponseStatusText, "getResponseStatusText");
    __name(setResponseHeaders, "setResponseHeaders");
    Ur2 = setResponseHeaders;
    __name(setResponseHeader, "setResponseHeader");
    __name(appendResponseHeader, "appendResponseHeader");
    __name(sendStream, "sendStream");
    __name(sendWebResponse, "sendWebResponse");
    jr2 = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
    Hr2 = /* @__PURE__ */ new Set(["transfer-encoding", "accept-encoding", "connection", "keep-alive", "upgrade", "expect", "host", "accept"]);
    __name(proxyRequest, "proxyRequest");
    __name(getProxyRequestHeaders, "getProxyRequestHeaders");
    __name(fetchWithEvent, "fetchWithEvent");
    __name(_getFetch, "_getFetch");
    __name(rewriteCookieProperty, "rewriteCookieProperty");
    __name(defineWebSocketHandler, "defineWebSocketHandler");
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
      constructor(e4, t5) {
        this.node = { req: e4, res: t5 };
      }
      get method() {
        return this._method || (this._method = (this.node.req.method || "GET").toUpperCase()), this._method;
      }
      get path() {
        return this._path || this.node.req.url || "/";
      }
      get headers() {
        return this._headers || (this._headers = (function(e4) {
          const t5 = new Headers();
          for (const [r4, s4] of Object.entries(e4)) if (Array.isArray(s4)) for (const e5 of s4) t5.append(r4, e5);
          else s4 && t5.set(r4, s4);
          return t5;
        })(this.node.req.headers)), this._headers;
      }
      get handled() {
        return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
      }
      respondWith(e4) {
        return Promise.resolve(e4).then((e5) => sendWebResponse(this, e5));
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
    Nr2 = defineEventHandler;
    __name(isEventHandler, "isEventHandler");
    __name(toEventHandler, "toEventHandler");
    lazyEventHandler = /* @__PURE__ */ __name(function(e4) {
      let t5, r4;
      const resolveHandler = /* @__PURE__ */ __name(() => r4 ? Promise.resolve(r4) : (t5 || (t5 = Promise.resolve(e4()).then((e5) => {
        const t6 = e5.default || e5;
        if ("function" != typeof t6) throw new TypeError("Invalid lazy handler result. It should be a function:", t6);
        return r4 = { handler: toEventHandler(e5.default || e5) }, r4;
      })), t5), "resolveHandler"), s4 = Nr2((e5) => r4 ? r4.handler(e5) : resolveHandler().then((t6) => t6.handler(e5)));
      return s4.__resolve__ = resolveHandler, s4;
    }, "lazyEventHandler");
    __name(createApp2, "createApp");
    __name(use, "use");
    __name(normalizeLayer, "normalizeLayer");
    __name(handleHandlerResponse, "handleHandlerResponse");
    Mr2 = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
    __name(toNodeListener, "toNodeListener");
    __name(flatHooks, "flatHooks");
    Dr2 = { run: /* @__PURE__ */ __name((e4) => e4(), "run") };
    Wr2 = void 0 !== console.createTask ? console.createTask : () => Dr2;
    __name(serialTaskCaller, "serialTaskCaller");
    __name(parallelTaskCaller, "parallelTaskCaller");
    __name(callEachWith, "callEachWith");
    Hookable = class {
      static {
        __name(this, "Hookable");
      }
      constructor() {
        this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
      }
      hook(e4, t5, r4 = {}) {
        if (!e4 || "function" != typeof t5) return () => {
        };
        const s4 = e4;
        let a6;
        for (; this._deprecatedHooks[e4]; ) a6 = this._deprecatedHooks[e4], e4 = a6.to;
        if (a6 && !r4.allowDeprecated) {
          let e5 = a6.message;
          e5 || (e5 = `${s4} hook has been deprecated` + (a6.to ? `, please use ${a6.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(e5) || (console.warn(e5), this._deprecatedMessages.add(e5));
        }
        if (!t5.name) try {
          Object.defineProperty(t5, "name", { get: /* @__PURE__ */ __name(() => "_" + e4.replace(/\W+/g, "_") + "_hook_cb", "get"), configurable: true });
        } catch {
        }
        return this._hooks[e4] = this._hooks[e4] || [], this._hooks[e4].push(t5), () => {
          t5 && (this.removeHook(e4, t5), t5 = void 0);
        };
      }
      hookOnce(e4, t5) {
        let r4, _function = /* @__PURE__ */ __name((...e5) => ("function" == typeof r4 && r4(), r4 = void 0, _function = void 0, t5(...e5)), "_function");
        return r4 = this.hook(e4, _function), r4;
      }
      removeHook(e4, t5) {
        if (this._hooks[e4]) {
          const r4 = this._hooks[e4].indexOf(t5);
          -1 !== r4 && this._hooks[e4].splice(r4, 1), 0 === this._hooks[e4].length && delete this._hooks[e4];
        }
      }
      deprecateHook(e4, t5) {
        this._deprecatedHooks[e4] = "string" == typeof t5 ? { to: t5 } : t5;
        const r4 = this._hooks[e4] || [];
        delete this._hooks[e4];
        for (const t6 of r4) this.hook(e4, t6);
      }
      deprecateHooks(e4) {
        Object.assign(this._deprecatedHooks, e4);
        for (const t5 in e4) this.deprecateHook(t5, e4[t5]);
      }
      addHooks(e4) {
        const t5 = flatHooks(e4), r4 = Object.keys(t5).map((e5) => this.hook(e5, t5[e5]));
        return () => {
          for (const e5 of r4.splice(0, r4.length)) e5();
        };
      }
      removeHooks(e4) {
        const t5 = flatHooks(e4);
        for (const e5 in t5) this.removeHook(e5, t5[e5]);
      }
      removeAllHooks() {
        for (const e4 in this._hooks) delete this._hooks[e4];
      }
      callHook(e4, ...t5) {
        return t5.unshift(e4), this.callHookWith(serialTaskCaller, e4, ...t5);
      }
      callHookParallel(e4, ...t5) {
        return t5.unshift(e4), this.callHookWith(parallelTaskCaller, e4, ...t5);
      }
      callHookWith(e4, t5, ...r4) {
        const s4 = this._before || this._after ? { name: t5, args: r4, context: {} } : void 0;
        this._before && callEachWith(this._before, s4);
        const a6 = e4(t5 in this._hooks ? [...this._hooks[t5]] : [], r4);
        return a6 instanceof Promise ? a6.finally(() => {
          this._after && s4 && callEachWith(this._after, s4);
        }) : (this._after && s4 && callEachWith(this._after, s4), a6);
      }
      beforeEach(e4) {
        return this._before = this._before || [], this._before.push(e4), () => {
          if (void 0 !== this._before) {
            const t5 = this._before.indexOf(e4);
            -1 !== t5 && this._before.splice(t5, 1);
          }
        };
      }
      afterEach(e4) {
        return this._after = this._after || [], this._after.push(e4), () => {
          if (void 0 !== this._after) {
            const t5 = this._after.indexOf(e4);
            -1 !== t5 && this._after.splice(t5, 1);
          }
        };
      }
    };
    __name(createHooks, "createHooks");
    qr = globalThis;
    FetchError2 = class extends Error {
      static {
        __name(this, "FetchError");
      }
      constructor(e4, t5) {
        super(e4, t5), this.name = "FetchError", t5?.cause && !this.cause && (this.cause = t5.cause);
      }
    };
    Fr2 = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
    __name(isPayloadMethod2, "isPayloadMethod");
    zr2 = /* @__PURE__ */ new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]);
    Kr2 = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
    __name(resolveFetchOptions2, "resolveFetchOptions");
    __name(callHooks2, "callHooks");
    Qr = /* @__PURE__ */ new Set([408, 409, 425, 429, 500, 502, 503, 504]);
    Vr2 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    __name(createFetch2, "createFetch");
    Gr2 = (function() {
      if ("undefined" != typeof globalThis) return globalThis;
      if ("undefined" != typeof self) return self;
      if (void 0 !== qr) return qr;
      throw new Error("unable to locate global object");
    })();
    Yr = Gr2.fetch ? (...e4) => Gr2.fetch(...e4) : () => Promise.reject(new Error("[ofetch] global.fetch is not supported!"));
    Jr2 = Gr2.Headers;
    Zr2 = Gr2.AbortController;
    __name(asyncCall, "asyncCall");
    __name(stringify2, "stringify");
    createFetch2({ fetch: Yr, Headers: Jr2, AbortController: Zr2 });
    Xr = "base64:";
    __name(serializeRaw, "serializeRaw");
    __name(deserializeRaw, "deserializeRaw");
    en3 = ["has", "hasItem", "get", "getItem", "getItemRaw", "set", "setItem", "setItemRaw", "del", "remove", "removeItem", "getMeta", "setMeta", "removeMeta", "getKeys", "clear", "mount", "unmount"];
    __name(normalizeKey$1, "normalizeKey$1");
    __name(joinKeys, "joinKeys");
    __name(normalizeBaseKey, "normalizeBaseKey");
    memory = /* @__PURE__ */ __name(() => {
      const e4 = /* @__PURE__ */ new Map();
      return { name: "memory", getInstance: /* @__PURE__ */ __name(() => e4, "getInstance"), hasItem: /* @__PURE__ */ __name((t5) => e4.has(t5), "hasItem"), getItem: /* @__PURE__ */ __name((t5) => e4.get(t5) ?? null, "getItem"), getItemRaw: /* @__PURE__ */ __name((t5) => e4.get(t5) ?? null, "getItemRaw"), setItem(t5, r4) {
        e4.set(t5, r4);
      }, setItemRaw(t5, r4) {
        e4.set(t5, r4);
      }, removeItem(t5) {
        e4.delete(t5);
      }, getKeys: /* @__PURE__ */ __name(() => [...e4.keys()], "getKeys"), clear() {
        e4.clear();
      }, dispose() {
        e4.clear();
      } };
    }, "memory");
    __name(watch2, "watch");
    __name(dispose, "dispose");
    tn3 = {};
    normalizeKey2 = /* @__PURE__ */ __name(function(e4) {
      return e4 && e4.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
    }, "normalizeKey");
    rn3 = { getKeys: /* @__PURE__ */ __name(() => Promise.resolve(Object.keys(tn3)), "getKeys"), hasItem: /* @__PURE__ */ __name((e4) => (e4 = normalizeKey2(e4), Promise.resolve(e4 in tn3)), "hasItem"), getItem: /* @__PURE__ */ __name((e4) => (e4 = normalizeKey2(e4), Promise.resolve(tn3[e4] ? tn3[e4].import() : null)), "getItem"), getMeta: /* @__PURE__ */ __name((e4) => (e4 = normalizeKey2(e4), Promise.resolve(tn3[e4] ? tn3[e4].meta : {})), "getMeta") };
    nn3 = (function(e4 = {}) {
      const t5 = { mounts: { "": e4.driver || memory() }, mountpoints: [""], watching: false, watchListeners: [], unwatch: {} }, getMount = /* @__PURE__ */ __name((e5) => {
        for (const r5 of t5.mountpoints) if (e5.startsWith(r5)) return { base: r5, relativeKey: e5.slice(r5.length), driver: t5.mounts[r5] };
        return { base: "", relativeKey: e5, driver: t5.mounts[""] };
      }, "getMount"), getMounts = /* @__PURE__ */ __name((e5, r5) => t5.mountpoints.filter((t6) => t6.startsWith(e5) || r5 && e5.startsWith(t6)).map((r6) => ({ relativeBase: e5.length > r6.length ? e5.slice(r6.length) : void 0, mountpoint: r6, driver: t5.mounts[r6] })), "getMounts"), onChange = /* @__PURE__ */ __name((e5, r5) => {
        if (t5.watching) {
          r5 = normalizeKey$1(r5);
          for (const s4 of t5.watchListeners) s4(e5, r5);
        }
      }, "onChange"), stopWatch = /* @__PURE__ */ __name(async () => {
        if (t5.watching) {
          for (const e5 in t5.unwatch) await t5.unwatch[e5]();
          t5.unwatch = {}, t5.watching = false;
        }
      }, "stopWatch"), runBatch = /* @__PURE__ */ __name((e5, t6, r5) => {
        const s4 = /* @__PURE__ */ new Map(), getBatch = /* @__PURE__ */ __name((e6) => {
          let t7 = s4.get(e6.base);
          return t7 || (t7 = { driver: e6.driver, base: e6.base, items: [] }, s4.set(e6.base, t7)), t7;
        }, "getBatch");
        for (const r6 of e5) {
          const e6 = "string" == typeof r6, s5 = normalizeKey$1(e6 ? r6 : r6.key), a6 = e6 ? void 0 : r6.value, c4 = e6 || !r6.options ? t6 : { ...t6, ...r6.options }, u3 = getMount(s5);
          getBatch(u3).items.push({ key: s5, value: a6, relativeKey: u3.relativeKey, options: c4 });
        }
        return Promise.all([...s4.values()].map((e6) => r5(e6))).then((e6) => e6.flat());
      }, "runBatch"), r4 = { hasItem(e5, t6 = {}) {
        e5 = normalizeKey$1(e5);
        const { relativeKey: r5, driver: s4 } = getMount(e5);
        return asyncCall(s4.hasItem, r5, t6);
      }, getItem(e5, t6 = {}) {
        e5 = normalizeKey$1(e5);
        const { relativeKey: r5, driver: s4 } = getMount(e5);
        return asyncCall(s4.getItem, r5, t6).then((e6) => destr2(e6));
      }, getItems: /* @__PURE__ */ __name((e5, t6 = {}) => runBatch(e5, t6, (e6) => e6.driver.getItems ? asyncCall(e6.driver.getItems, e6.items.map((e7) => ({ key: e7.relativeKey, options: e7.options })), t6).then((t7) => t7.map((t8) => ({ key: joinKeys(e6.base, t8.key), value: destr2(t8.value) }))) : Promise.all(e6.items.map((t7) => asyncCall(e6.driver.getItem, t7.relativeKey, t7.options).then((e7) => ({ key: t7.key, value: destr2(e7) }))))), "getItems"), getItemRaw(e5, t6 = {}) {
        e5 = normalizeKey$1(e5);
        const { relativeKey: r5, driver: s4 } = getMount(e5);
        return s4.getItemRaw ? asyncCall(s4.getItemRaw, r5, t6) : asyncCall(s4.getItem, r5, t6).then((e6) => deserializeRaw(e6));
      }, async setItem(e5, t6, s4 = {}) {
        if (void 0 === t6) return r4.removeItem(e5);
        e5 = normalizeKey$1(e5);
        const { relativeKey: a6, driver: c4 } = getMount(e5);
        c4.setItem && (await asyncCall(c4.setItem, a6, stringify2(t6), s4), c4.watch || onChange("update", e5));
      }, async setItems(e5, t6) {
        await runBatch(e5, t6, async (e6) => {
          if (e6.driver.setItems) return asyncCall(e6.driver.setItems, e6.items.map((e7) => ({ key: e7.relativeKey, value: stringify2(e7.value), options: e7.options })), t6);
          e6.driver.setItem && await Promise.all(e6.items.map((t7) => asyncCall(e6.driver.setItem, t7.relativeKey, stringify2(t7.value), t7.options)));
        });
      }, async setItemRaw(e5, t6, s4 = {}) {
        if (void 0 === t6) return r4.removeItem(e5, s4);
        e5 = normalizeKey$1(e5);
        const { relativeKey: a6, driver: c4 } = getMount(e5);
        if (c4.setItemRaw) await asyncCall(c4.setItemRaw, a6, t6, s4);
        else {
          if (!c4.setItem) return;
          await asyncCall(c4.setItem, a6, serializeRaw(t6), s4);
        }
        c4.watch || onChange("update", e5);
      }, async removeItem(e5, t6 = {}) {
        "boolean" == typeof t6 && (t6 = { removeMeta: t6 }), e5 = normalizeKey$1(e5);
        const { relativeKey: r5, driver: s4 } = getMount(e5);
        s4.removeItem && (await asyncCall(s4.removeItem, r5, t6), (t6.removeMeta || t6.removeMata) && await asyncCall(s4.removeItem, r5 + "$", t6), s4.watch || onChange("remove", e5));
      }, async getMeta(e5, t6 = {}) {
        "boolean" == typeof t6 && (t6 = { nativeOnly: t6 }), e5 = normalizeKey$1(e5);
        const { relativeKey: r5, driver: s4 } = getMount(e5), a6 = /* @__PURE__ */ Object.create(null);
        if (s4.getMeta && Object.assign(a6, await asyncCall(s4.getMeta, r5, t6)), !t6.nativeOnly) {
          const e6 = await asyncCall(s4.getItem, r5 + "$", t6).then((e7) => destr2(e7));
          e6 && "object" == typeof e6 && ("string" == typeof e6.atime && (e6.atime = new Date(e6.atime)), "string" == typeof e6.mtime && (e6.mtime = new Date(e6.mtime)), Object.assign(a6, e6));
        }
        return a6;
      }, setMeta(e5, t6, r5 = {}) {
        return this.setItem(e5 + "$", t6, r5);
      }, removeMeta(e5, t6 = {}) {
        return this.removeItem(e5 + "$", t6);
      }, async getKeys(e5, t6 = {}) {
        e5 = normalizeBaseKey(e5);
        const r5 = getMounts(e5, true);
        let s4 = [];
        const a6 = [];
        let c4 = true;
        for (const e6 of r5) {
          e6.driver.flags?.maxDepth || (c4 = false);
          const r6 = await asyncCall(e6.driver.getKeys, e6.relativeBase, t6);
          for (const t7 of r6) {
            const r7 = e6.mountpoint + normalizeKey$1(t7);
            s4.some((e7) => r7.startsWith(e7)) || a6.push(r7);
          }
          s4 = [e6.mountpoint, ...s4.filter((t7) => !t7.startsWith(e6.mountpoint))];
        }
        const u3 = void 0 !== t6.maxDepth && !c4;
        return a6.filter((r6) => (!u3 || (function(e6, t7) {
          if (void 0 === t7) return true;
          let r7 = 0, s5 = e6.indexOf(":");
          for (; s5 > -1; ) r7++, s5 = e6.indexOf(":", s5 + 1);
          return r7 <= t7;
        })(r6, t6.maxDepth)) && (function(e6, t7) {
          return t7 ? e6.startsWith(t7) && "$" !== e6[e6.length - 1] : "$" !== e6[e6.length - 1];
        })(r6, e5));
      }, async clear(e5, t6 = {}) {
        e5 = normalizeBaseKey(e5), await Promise.all(getMounts(e5, false).map(async (e6) => {
          if (e6.driver.clear) return asyncCall(e6.driver.clear, e6.relativeBase, t6);
          if (e6.driver.removeItem) {
            const r5 = await e6.driver.getKeys(e6.relativeBase || "", t6);
            return Promise.all(r5.map((r6) => e6.driver.removeItem(r6, t6)));
          }
        }));
      }, async dispose() {
        await Promise.all(Object.values(t5.mounts).map((e5) => dispose(e5)));
      }, watch: /* @__PURE__ */ __name(async (e5) => (await (async () => {
        if (!t5.watching) {
          t5.watching = true;
          for (const e6 in t5.mounts) t5.unwatch[e6] = await watch2(t5.mounts[e6], onChange, e6);
        }
      })(), t5.watchListeners.push(e5), async () => {
        t5.watchListeners = t5.watchListeners.filter((t6) => t6 !== e5), 0 === t5.watchListeners.length && await stopWatch();
      }), "watch"), async unwatch() {
        t5.watchListeners = [], await stopWatch();
      }, mount(e5, s4) {
        if ((e5 = normalizeBaseKey(e5)) && t5.mounts[e5]) throw new Error(`already mounted at ${e5}`);
        return e5 && (t5.mountpoints.push(e5), t5.mountpoints.sort((e6, t6) => t6.length - e6.length)), t5.mounts[e5] = s4, t5.watching && Promise.resolve(watch2(s4, onChange, e5)).then((r5) => {
          t5.unwatch[e5] = r5;
        }).catch(console.error), r4;
      }, async unmount(e5, r5 = true) {
        (e5 = normalizeBaseKey(e5)) && t5.mounts[e5] && (t5.watching && e5 in t5.unwatch && (t5.unwatch[e5]?.(), delete t5.unwatch[e5]), r5 && await dispose(t5.mounts[e5]), t5.mountpoints = t5.mountpoints.filter((t6) => t6 !== e5), delete t5.mounts[e5]);
      }, getMount(e5 = "") {
        e5 = normalizeKey$1(e5) + ":";
        const t6 = getMount(e5);
        return { driver: t6.driver, base: t6.base };
      }, getMounts(e5 = "", t6 = {}) {
        e5 = normalizeKey$1(e5);
        return getMounts(e5, t6.parents).map((e6) => ({ driver: e6.driver, base: e6.mountpoint }));
      }, keys: /* @__PURE__ */ __name((e5, t6 = {}) => r4.getKeys(e5, t6), "keys"), get: /* @__PURE__ */ __name((e5, t6 = {}) => r4.getItem(e5, t6), "get"), set: /* @__PURE__ */ __name((e5, t6, s4 = {}) => r4.setItem(e5, t6, s4), "set"), has: /* @__PURE__ */ __name((e5, t6 = {}) => r4.hasItem(e5, t6), "has"), del: /* @__PURE__ */ __name((e5, t6 = {}) => r4.removeItem(e5, t6), "del"), remove: /* @__PURE__ */ __name((e5, t6 = {}) => r4.removeItem(e5, t6), "remove") };
      return r4;
    })({});
    __name(useStorage, "useStorage");
    nn3.mount("/assets", rn3);
    on4 = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
    sn3 = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998];
    an3 = [];
    k2 = class {
      static {
        __name(this, "k");
      }
      _data = new l2();
      _hash = new l2([...on4]);
      _nDataBytes = 0;
      _minBufferSize = 0;
      finalize(e4) {
        e4 && this._append(e4);
        const t5 = 8 * this._nDataBytes, r4 = 8 * this._data.sigBytes;
        return this._data.words[r4 >>> 5] |= 128 << 24 - r4 % 32, this._data.words[14 + (r4 + 64 >>> 9 << 4)] = Math.floor(t5 / 4294967296), this._data.words[15 + (r4 + 64 >>> 9 << 4)] = t5, this._data.sigBytes = 4 * this._data.words.length, this._process(), this._hash;
      }
      _doProcessBlock(e4, t5) {
        const r4 = this._hash.words;
        let s4 = r4[0], a6 = r4[1], c4 = r4[2], u3 = r4[3], f3 = r4[4], h4 = r4[5], d3 = r4[6], g4 = r4[7];
        for (let r5 = 0; r5 < 64; r5++) {
          if (r5 < 16) an3[r5] = 0 | e4[t5 + r5];
          else {
            const e5 = an3[r5 - 15], t6 = (e5 << 25 | e5 >>> 7) ^ (e5 << 14 | e5 >>> 18) ^ e5 >>> 3, s5 = an3[r5 - 2], a7 = (s5 << 15 | s5 >>> 17) ^ (s5 << 13 | s5 >>> 19) ^ s5 >>> 10;
            an3[r5] = t6 + an3[r5 - 7] + a7 + an3[r5 - 16];
          }
          const m3 = s4 & a6 ^ s4 & c4 ^ a6 & c4, _3 = (s4 << 30 | s4 >>> 2) ^ (s4 << 19 | s4 >>> 13) ^ (s4 << 10 | s4 >>> 22), E3 = g4 + ((f3 << 26 | f3 >>> 6) ^ (f3 << 21 | f3 >>> 11) ^ (f3 << 7 | f3 >>> 25)) + (f3 & h4 ^ ~f3 & d3) + sn3[r5] + an3[r5];
          g4 = d3, d3 = h4, h4 = f3, f3 = u3 + E3 | 0, u3 = c4, c4 = a6, a6 = s4, s4 = E3 + (_3 + m3) | 0;
        }
        r4[0] = r4[0] + s4 | 0, r4[1] = r4[1] + a6 | 0, r4[2] = r4[2] + c4 | 0, r4[3] = r4[3] + u3 | 0, r4[4] = r4[4] + f3 | 0, r4[5] = r4[5] + h4 | 0, r4[6] = r4[6] + d3 | 0, r4[7] = r4[7] + g4 | 0;
      }
      _append(e4) {
        "string" == typeof e4 && (e4 = l2.fromUtf8(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }
      _process(e4) {
        let t5, r4 = this._data.sigBytes / 64;
        r4 = e4 ? Math.ceil(r4) : Math.max((0 | r4) - this._minBufferSize, 0);
        const s4 = 16 * r4, a6 = Math.min(4 * s4, this._data.sigBytes);
        if (s4) {
          for (let e5 = 0; e5 < s4; e5 += 16) this._doProcessBlock(this._data.words, e5);
          t5 = this._data.words.splice(0, s4), this._data.sigBytes -= a6;
        }
        return new l2(t5, a6);
      }
    };
    l2 = class _l {
      static {
        __name(this, "l");
      }
      words;
      sigBytes;
      constructor(e4, t5) {
        e4 = this.words = e4 || [], this.sigBytes = void 0 === t5 ? 4 * e4.length : t5;
      }
      static fromUtf8(e4) {
        const t5 = unescape(encodeURIComponent(e4)), r4 = t5.length, s4 = [];
        for (let e5 = 0; e5 < r4; e5++) s4[e5 >>> 2] |= (255 & t5.charCodeAt(e5)) << 24 - e5 % 4 * 8;
        return new _l(s4, r4);
      }
      toBase64() {
        const e4 = [];
        for (let t5 = 0; t5 < this.sigBytes; t5 += 3) {
          const r4 = (this.words[t5 >>> 2] >>> 24 - t5 % 4 * 8 & 255) << 16 | (this.words[t5 + 1 >>> 2] >>> 24 - (t5 + 1) % 4 * 8 & 255) << 8 | this.words[t5 + 2 >>> 2] >>> 24 - (t5 + 2) % 4 * 8 & 255;
          for (let s4 = 0; s4 < 4 && 8 * t5 + 6 * s4 < 8 * this.sigBytes; s4++) e4.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(r4 >>> 6 * (3 - s4) & 63));
        }
        return e4.join("");
      }
      concat(e4) {
        if (this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8, this.words.length = Math.ceil(this.sigBytes / 4), this.sigBytes % 4) for (let t5 = 0; t5 < e4.sigBytes; t5++) {
          const r4 = e4.words[t5 >>> 2] >>> 24 - t5 % 4 * 8 & 255;
          this.words[this.sigBytes + t5 >>> 2] |= r4 << 24 - (this.sigBytes + t5) % 4 * 8;
        }
        else for (let t5 = 0; t5 < e4.sigBytes; t5 += 4) this.words[this.sigBytes + t5 >>> 2] = e4.words[t5 >>> 2];
        this.sigBytes += e4.sigBytes;
      }
    };
    cn3 = (() => {
      class Hasher2 {
        static {
          __name(this, "Hasher2");
        }
        buff = "";
        #h = /* @__PURE__ */ new Map();
        write(e4) {
          this.buff += e4;
        }
        dispatch(e4) {
          return this[null === e4 ? "null" : typeof e4](e4);
        }
        object(e4) {
          if (e4 && "function" == typeof e4.toJSON) return this.object(e4.toJSON());
          const t5 = Object.prototype.toString.call(e4);
          let r4 = "";
          const s4 = t5.length;
          r4 = s4 < 10 ? "unknown:[" + t5 + "]" : t5.slice(8, s4 - 1), r4 = r4.toLowerCase();
          let a6 = null;
          if (void 0 !== (a6 = this.#h.get(e4))) return this.dispatch("[CIRCULAR:" + a6 + "]");
          if (this.#h.set(e4, this.#h.size), void 0 !== Zt3 && Zt3.isBuffer && Zt3.isBuffer(e4)) return this.write("buffer:"), this.write(e4.toString("utf8"));
          if ("object" !== r4 && "function" !== r4 && "asyncfunction" !== r4) this[r4] ? this[r4](e4) : this.unknown(e4, r4);
          else {
            const t6 = Object.keys(e4).sort(), r5 = [];
            this.write("object:" + (t6.length + r5.length) + ":");
            const dispatchForKey = /* @__PURE__ */ __name((t7) => {
              this.dispatch(t7), this.write(":"), this.dispatch(e4[t7]), this.write(",");
            }, "dispatchForKey");
            for (const e5 of t6) dispatchForKey(e5);
            for (const e5 of r5) dispatchForKey(e5);
          }
        }
        array(e4, t5) {
          if (t5 = void 0 !== t5 && t5, this.write("array:" + e4.length + ":"), !t5 || e4.length <= 1) {
            for (const t6 of e4) this.dispatch(t6);
            return;
          }
          const r4 = /* @__PURE__ */ new Map(), s4 = e4.map((e5) => {
            const t6 = new Hasher2();
            t6.dispatch(e5);
            for (const [e6, s5] of t6.#h) r4.set(e6, s5);
            return t6.toString();
          });
          return this.#h = r4, s4.sort(), this.array(s4, false);
        }
        date(e4) {
          return this.write("date:" + e4.toJSON());
        }
        symbol(e4) {
          return this.write("symbol:" + e4.toString());
        }
        unknown(e4, t5) {
          if (this.write(t5), e4) return this.write(":"), e4 && "function" == typeof e4.entries ? this.array([...e4.entries()], true) : void 0;
        }
        error(e4) {
          return this.write("error:" + e4.toString());
        }
        boolean(e4) {
          return this.write("bool:" + e4);
        }
        string(e4) {
          this.write("string:" + e4.length + ":"), this.write(e4);
        }
        function(e4) {
          this.write("fn:"), !(function(e5) {
            if ("function" != typeof e5) return false;
            return "[native code] }" === Function.prototype.toString.call(e5).slice(-15);
          })(e4) ? this.dispatch(e4.toString()) : this.dispatch("[native]");
        }
        number(e4) {
          return this.write("number:" + e4);
        }
        null() {
          return this.write("Null");
        }
        undefined() {
          return this.write("Undefined");
        }
        regexp(e4) {
          return this.write("regex:" + e4.toString());
        }
        arraybuffer(e4) {
          return this.write("arraybuffer:"), this.dispatch(new Uint8Array(e4));
        }
        url(e4) {
          return this.write("url:" + e4.toString());
        }
        map(e4) {
          this.write("map:");
          const t5 = [...e4];
          return this.array(t5, false);
        }
        set(e4) {
          this.write("set:");
          const t5 = [...e4];
          return this.array(t5, false);
        }
        bigint(e4) {
          return this.write("bigint:" + e4.toString());
        }
      }
      for (const e4 of ["uint8array", "uint8clampedarray", "unt8array", "uint16array", "unt16array", "uint32array", "unt32array", "float32array", "float64array"]) Hasher2.prototype[e4] = function(t5) {
        return this.write(e4 + ":"), this.array([...t5], false);
      };
      return Hasher2;
    })();
    __name(hash, "hash");
    __name(defineCachedFunction, "defineCachedFunction");
    __name(getKey, "getKey");
    __name(escapeKey, "escapeKey");
    __name(cloneWithProxy, "cloneWithProxy");
    cachedEventHandler = /* @__PURE__ */ __name(function(e4, t5 = { name: "_", base: "/cache", swr: true, maxAge: 1 }) {
      const r4 = (t5.varies || []).filter(Boolean).map((e5) => e5.toLowerCase()).sort(), s4 = { ...t5, getKey: /* @__PURE__ */ __name(async (e5) => {
        const s5 = await t5.getKey?.(e5);
        if (s5) return escapeKey(s5);
        const a7 = e5.node.req.originalUrl || e5.node.req.url || e5.path;
        let c4;
        try {
          c4 = escapeKey(decodeURI(parseURL(a7).pathname)).slice(0, 16) || "index";
        } catch {
          c4 = "-";
        }
        return [`${c4}.${hash(a7)}`, ...r4.map((t6) => [t6, e5.node.req.headers[t6]]).map(([e6, t6]) => `${escapeKey(e6)}.${hash(t6)}`)].join(":");
      }, "getKey"), validate: /* @__PURE__ */ __name((e5) => !!e5.value && (!(e5.value.code >= 400) && (void 0 !== e5.value.body && ("undefined" !== e5.value.headers.etag && "undefined" !== e5.value.headers["last-modified"]))), "validate"), group: t5.group || "nitro/handlers", integrity: t5.integrity || hash([e4, t5]) }, a6 = (function(e5, t6 = {}) {
        return defineCachedFunction(e5, t6);
      })(async (a7) => {
        const c4 = {};
        for (const e5 of r4) {
          const t6 = a7.node.req.headers[e5];
          void 0 !== t6 && (c4[e5] = t6);
        }
        const u3 = cloneWithProxy(a7.node.req, { headers: c4 }), f3 = {};
        let h4;
        const d3 = createEvent(u3, cloneWithProxy(a7.node.res, { statusCode: 200, writableEnded: false, writableFinished: false, headersSent: false, closed: false, getHeader: /* @__PURE__ */ __name((e5) => f3[e5], "getHeader"), setHeader(e5, t6) {
          return f3[e5] = t6, this;
        }, getHeaderNames: /* @__PURE__ */ __name(() => Object.keys(f3), "getHeaderNames"), hasHeader: /* @__PURE__ */ __name((e5) => e5 in f3, "hasHeader"), removeHeader(e5) {
          delete f3[e5];
        }, getHeaders: /* @__PURE__ */ __name(() => f3, "getHeaders"), end(e5, t6, r5) {
          return "string" == typeof e5 && (h4 = e5), "function" == typeof t6 && t6(), "function" == typeof r5 && r5(), this;
        }, write: /* @__PURE__ */ __name((e5, t6, r5) => ("string" == typeof e5 && (h4 = e5), "function" == typeof t6 && t6(void 0), "function" == typeof r5 && r5(), true), "write"), writeHead(e5, t6) {
          if (this.statusCode = e5, t6) {
            if (Array.isArray(t6) || "string" == typeof t6) throw new TypeError("Raw headers  is not supported.");
            for (const e6 in t6) {
              const r5 = t6[e6];
              void 0 !== r5 && this.setHeader(e6, r5);
            }
          }
          return this;
        } }));
        d3.fetch = (e5, t6) => fetchWithEvent(d3, e5, t6, { fetch: useNitroApp().localFetch }), d3.$fetch = (e5, t6) => fetchWithEvent(d3, e5, t6, { fetch: globalThis.$fetch }), d3.waitUntil = a7.waitUntil, d3.context = a7.context, d3.context.cache = { options: s4 };
        const g4 = await e4(d3) || h4, m3 = d3.node.res.getHeaders();
        m3.etag = String(m3.Etag || m3.etag || `W/"${hash(g4)}"`), m3["last-modified"] = String(m3["Last-Modified"] || m3["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString());
        const _3 = [];
        t5.swr ? (t5.maxAge && _3.push(`s-maxage=${t5.maxAge}`), t5.staleMaxAge ? _3.push(`stale-while-revalidate=${t5.staleMaxAge}`) : _3.push("stale-while-revalidate")) : t5.maxAge && _3.push(`max-age=${t5.maxAge}`), _3.length > 0 && (m3["cache-control"] = _3.join(", "));
        return { code: d3.node.res.statusCode, headers: m3, body: g4 };
      }, s4);
      return defineEventHandler(async (r5) => {
        if (t5.headersOnly) {
          if (handleCacheHeaders(r5, { maxAge: t5.maxAge })) return;
          return e4(r5);
        }
        const s5 = await a6(r5);
        if (r5.node.res.headersSent || r5.node.res.writableEnded) return s5.body;
        if (!handleCacheHeaders(r5, { modifiedTime: new Date(s5.headers["last-modified"]), etag: s5.headers.etag, maxAge: t5.maxAge })) {
          r5.node.res.statusCode = s5.code;
          for (const e5 in s5.headers) {
            const t6 = s5.headers[e5];
            "set-cookie" === e5 ? r5.node.res.appendHeader(e5, splitCookiesString(t6)) : void 0 !== t6 && r5.node.res.setHeader(e5, t6);
          }
          return s5.body;
        }
      });
    }, "cachedEventHandler");
    __name(klona, "klona");
    __name(isPlainObject2, "isPlainObject");
    __name(_defu, "_defu");
    un3 = /* @__PURE__ */ (function(e4) {
      return (...t5) => t5.reduce((t6, r4) => _defu(t6, r4, "", e4), {});
    })((e4, t5, r4) => {
      if (void 0 !== e4[t5] && "function" == typeof r4) return e4[t5] = r4(e4[t5]), true;
    });
    ln3 = un3({ nuxt: {} });
    fn2 = /\d/;
    hn3 = ["-", "_", "/", "."];
    __name(isUppercase, "isUppercase");
    __name(kebabCase, "kebabCase");
    __name(getEnv, "getEnv");
    __name(_isObject, "_isObject");
    __name(applyEnv, "applyEnv");
    dn3 = /\{\{([^{}]*)\}\}/g;
    __name(_expandFromEnv, "_expandFromEnv");
    pn3 = { app: { baseURL: "/", buildId: "b764832c-f628-4285-a92a-0b74cf3e416d", buildAssetsDir: "/_nuxt/", cdnURL: "" }, nitro: { envPrefix: "NUXT_", routeRules: { "/__nuxt_error": { cache: false }, "/_nuxt/builds/meta/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } }, "/_nuxt/builds/**": { headers: { "cache-control": "public, max-age=1, immutable" } }, "/_nuxt/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } } } }, public: { hub: {} }, hub: { dir: "/home/maxi/repros/nuxthub-realtime-722/.data", hosting: "cloudflare_durable", blob: false, cache: false, db: false, kv: false, userToken: "user_dSqH3yb9MAszgTjRo2mgWSqSbxZEeu" } };
    gn3 = { prefix: "NITRO_", altPrefix: pn3.nitro.envPrefix ?? D2.env.NITRO_ENV_PREFIX ?? "_", envExpansion: pn3.nitro.envExpansion ?? D2.env.NITRO_ENV_EXPANSION ?? false };
    yn3 = _deepFreeze(applyEnv(klona(pn3), gn3));
    __name(useRuntimeConfig2, "useRuntimeConfig");
    __name(_deepFreeze, "_deepFreeze");
    _deepFreeze(klona(ln3)), new Proxy(/* @__PURE__ */ Object.create(null), { get: /* @__PURE__ */ __name((e4, t5) => {
      console.warn("Please use `useRuntimeConfig()` instead of accessing config directly.");
      const r4 = useRuntimeConfig2();
      if (t5 in r4) return r4[t5];
    }, "get") });
    mn3 = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : void 0 !== qr ? qr : {};
    wn3 = "__unctx__";
    bn3 = mn3[wn3] || (mn3[wn3] = /* @__PURE__ */ (function(e4 = {}) {
      const t5 = {};
      return { get: /* @__PURE__ */ __name((r4, s4 = {}) => (t5[r4] || (t5[r4] = (function(e5 = {}) {
        let t6, r5 = false;
        const checkConflict = /* @__PURE__ */ __name((e6) => {
          if (t6 && t6 !== e6) throw new Error("Context conflict");
        }, "checkConflict");
        let s5;
        if (e5.asyncContext) {
          const t7 = e5.AsyncLocalStorage || globalThis.AsyncLocalStorage;
          t7 ? s5 = new t7() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
        }
        const _getCurrentInstance = /* @__PURE__ */ __name(() => {
          if (s5) {
            const e6 = s5.getStore();
            if (void 0 !== e6) return e6;
          }
          return t6;
        }, "_getCurrentInstance");
        return { use: /* @__PURE__ */ __name(() => {
          const e6 = _getCurrentInstance();
          if (void 0 === e6) throw new Error("Context is not available");
          return e6;
        }, "use"), tryUse: /* @__PURE__ */ __name(() => _getCurrentInstance(), "tryUse"), set: /* @__PURE__ */ __name((e6, s6) => {
          s6 || checkConflict(e6), t6 = e6, r5 = true;
        }, "set"), unset: /* @__PURE__ */ __name(() => {
          t6 = void 0, r5 = false;
        }, "unset"), call: /* @__PURE__ */ __name((e6, a6) => {
          checkConflict(e6), t6 = e6;
          try {
            return s5 ? s5.run(e6, a6) : a6();
          } finally {
            r5 || (t6 = void 0);
          }
        }, "call"), async callAsync(e6, a6) {
          t6 = e6;
          const onRestore = /* @__PURE__ */ __name(() => {
            t6 = e6;
          }, "onRestore"), onLeave = /* @__PURE__ */ __name(() => t6 === e6 ? onRestore : void 0, "onLeave");
          _n3.add(onLeave);
          try {
            const c4 = s5 ? s5.run(e6, a6) : a6();
            return r5 || (t6 = void 0), await c4;
          } finally {
            _n3.delete(onLeave);
          }
        } };
      })({ ...e4, ...s4 })), t5[r4]), "get") };
    })());
    getContext = /* @__PURE__ */ __name((e4, t5 = {}) => bn3.get(e4, t5), "getContext");
    vn3 = "__unctx_async_handlers__";
    _n3 = mn3[vn3] || (mn3[vn3] = /* @__PURE__ */ new Set());
    En3 = getContext("nitro-app", { asyncContext: true, AsyncLocalStorage: t4 });
    Rn3 = toRouteMatcher(createRouter$1({ routes: useRuntimeConfig2().nitro.routeRules }));
    __name(createRouteRulesHandler, "createRouteRulesHandler");
    __name(getRouteRules, "getRouteRules");
    __name(getRouteRulesForPath, "getRouteRulesForPath");
    An3 = /post|put|patch/i;
    __name(joinHeaders, "joinHeaders");
    __name(normalizeCookieHeader, "normalizeCookieHeader");
    __name(normalizeCookieHeaders, "normalizeCookieHeaders");
    __name(hasReqHeader, "hasReqHeader");
    __name(defaultHandler, "defaultHandler");
    Bn3 = [async function(e4, t5, { defaultHandler: r4 }) {
      if (t5.handled || (function(e5) {
        return !hasReqHeader(e5, "accept", "text/html") && (hasReqHeader(e5, "accept", "application/json") || hasReqHeader(e5, "user-agent", "curl/") || hasReqHeader(e5, "user-agent", "httpie/") || hasReqHeader(e5, "sec-fetch-mode", "cors") || e5.path.startsWith("/api/") || e5.path.endsWith(".json"));
      })(t5)) return;
      const s4 = await r4(e4, t5, { json: true });
      if (404 === (e4.statusCode || 500) && 302 === s4.status) return setResponseHeaders(t5, s4.headers), setResponseStatus(t5, s4.status, s4.statusText), send2(t5, JSON.stringify(s4.body, null, 2));
      const a6 = s4.body, c4 = new URL(a6.url);
      a6.url = withoutBase(c4.pathname, useRuntimeConfig2(t5).app.baseURL) + c4.search + c4.hash, a6.message ||= "Server Error", a6.data ||= e4.data, a6.statusMessage ||= e4.statusMessage, delete s4.headers["content-type"], delete s4.headers["content-security-policy"], setResponseHeaders(t5, s4.headers);
      const u3 = getRequestHeaders(t5), f3 = t5.path.startsWith("/__nuxt_error") || !!u3["x-nuxt-error"] ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig2(t5).app.baseURL, "/__nuxt_error"), a6), { headers: { ...u3, "x-nuxt-error": "true" }, redirect: "manual" }).catch(() => null);
      if (t5.handled) return;
      if (!f3) {
        const { template: e5 } = await Promise.resolve().then(() => (init_error_500(), error_500_exports));
        return setResponseHeader(t5, "Content-Type", "text/html;charset=UTF-8"), send2(t5, e5(a6));
      }
      const h4 = await f3.text();
      for (const [e5, r5] of f3.headers.entries()) "set-cookie" !== e5 ? setResponseHeader(t5, e5, r5) : appendResponseHeader(t5, e5, r5);
      return setResponseStatus(t5, f3.status && 200 !== f3.status ? f3.status : s4.status, f3.statusText || s4.statusText), send2(t5, h4);
    }, function(e4, t5) {
      const r4 = defaultHandler(e4, t5);
      return setResponseHeaders(t5, r4.headers), setResponseStatus(t5, r4.status, r4.statusText), send2(t5, JSON.stringify(r4.body, null, 2));
    }];
    Sn3 = [];
    _lazy_hLvLT1 = /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_renderer(), renderer_exports)).then(function(e4) {
      return e4.g;
    }), "_lazy_hLvLT1");
    xn3 = [{ route: "/ws/visitors", handler: /* @__PURE__ */ __name(() => Promise.resolve().then(() => (init_visitors(), visitors_exports)), "handler"), lazy: true, middleware: false, method: void 0 }, { route: "/__nuxt_error", handler: _lazy_hLvLT1, lazy: true, middleware: false, method: void 0 }, { route: "/__nuxt_island/**", handler: defineEventHandler(() => {
    }), lazy: false, middleware: false, method: void 0 }, { route: "/**", handler: _lazy_hLvLT1, lazy: true, middleware: false, method: void 0 }];
    In3 = (function() {
      const e4 = useRuntimeConfig2(), t5 = createHooks(), captureError = /* @__PURE__ */ __name((e5, r5 = {}) => {
        const s5 = t5.callHookParallel("error", e5, r5).catch((e6) => {
          console.error("Error while capturing another error", e6);
        });
        if (r5.event && isEvent(r5.event)) {
          const t6 = r5.event.context.nitro?.errors;
          t6 && t6.push({ error: e5, context: r5 }), r5.event.waitUntil && r5.event.waitUntil(s5);
        }
      }, "captureError"), r4 = createApp2({ debug: destr2(false), onError: /* @__PURE__ */ __name((e5, t6) => (captureError(e5, { event: t6, tags: ["request"] }), (async function(e6, t7) {
        for (const r5 of Bn3) try {
          if (await r5(e6, t7, { defaultHandler }), t7.handled) return;
        } catch (e7) {
          console.error(e7);
        }
      })(e5, t6)), "onError"), onRequest: /* @__PURE__ */ __name(async (e5) => {
        e5.context.nitro = e5.context.nitro || { errors: [] };
        const t6 = e5.node.req?.__unenv__;
        t6?._platform && (e5.context = { _platform: t6?._platform, ...t6._platform, ...e5.context }), !e5.context.waitUntil && t6?.waitUntil && (e5.context.waitUntil = t6.waitUntil), e5.fetch = (t7, r5) => fetchWithEvent(e5, t7, r5, { fetch: localFetch }), e5.$fetch = (t7, r5) => fetchWithEvent(e5, t7, r5, { fetch: c4 }), e5.waitUntil = (t7) => {
          e5.context.nitro._waitUntilPromises || (e5.context.nitro._waitUntilPromises = []), e5.context.nitro._waitUntilPromises.push(t7), e5.context.waitUntil && e5.context.waitUntil(t7);
        }, e5.captureError = (t7, r5) => {
          captureError(t7, { event: e5, ...r5 });
        }, await In3.hooks.callHook("request", e5).catch((t7) => {
          captureError(t7, { event: e5, tags: ["request"] });
        });
      }, "onRequest"), onBeforeResponse: /* @__PURE__ */ __name(async (e5, t6) => {
        await In3.hooks.callHook("beforeResponse", e5, t6).catch((t7) => {
          captureError(t7, { event: e5, tags: ["request", "response"] });
        });
      }, "onBeforeResponse"), onAfterResponse: /* @__PURE__ */ __name(async (e5, t6) => {
        await In3.hooks.callHook("afterResponse", e5, t6).catch((t7) => {
          captureError(t7, { event: e5, tags: ["request", "response"] });
        });
      }, "onAfterResponse") }), s4 = (function(e5 = {}) {
        const t6 = createRouter$1({}), r5 = {};
        let s5;
        const a7 = {}, addRoute = /* @__PURE__ */ __name((e6, s6, c6) => {
          let u3 = r5[e6];
          if (u3 || (r5[e6] = u3 = { path: e6, handlers: {} }, t6.insert(e6, u3)), Array.isArray(c6)) for (const t7 of c6) addRoute(e6, s6, t7);
          else u3.handlers[c6] = toEventHandler(s6, 0, e6);
          return a7;
        }, "addRoute");
        a7.use = a7.add = (e6, t7, r6) => addRoute(e6, t7, r6 || "all");
        for (const e6 of Mr2) a7[e6] = (t7, r6) => a7.add(t7, r6, e6);
        const matchHandler = /* @__PURE__ */ __name((e6 = "/", r6 = "get") => {
          const a8 = e6.indexOf("?");
          -1 !== a8 && (e6 = e6.slice(0, Math.max(0, a8)));
          const c6 = t6.lookup(e6);
          if (!c6 || !c6.handlers) return { error: createError({ statusCode: 404, name: "Not Found", statusMessage: `Cannot find any route matching ${e6 || "/"}.` }) };
          let u3 = c6.handlers[r6] || c6.handlers.all;
          if (!u3) {
            s5 || (s5 = toRouteMatcher(t6));
            const a9 = s5.matchAll(e6).reverse();
            for (const e7 of a9) {
              if (e7.handlers[r6]) {
                u3 = e7.handlers[r6], c6.handlers[r6] = c6.handlers[r6] || u3;
                break;
              }
              if (e7.handlers.all) {
                u3 = e7.handlers.all, c6.handlers.all = c6.handlers.all || u3;
                break;
              }
            }
          }
          return u3 ? { matched: c6, handler: u3 } : { error: createError({ statusCode: 405, name: "Method Not Allowed", statusMessage: `Method ${r6} is not allowed on this route.` }) };
        }, "matchHandler"), c5 = e5.preemptive || e5.preemtive;
        return a7.handler = Nr2((e6) => {
          const t7 = matchHandler(e6.path, e6.method.toLowerCase());
          if ("error" in t7) {
            if (c5) throw t7.error;
            return;
          }
          e6.context.matchedRoute = t7.matched;
          const r6 = t7.matched.params || {};
          return e6.context.params = r6, Promise.resolve(t7.handler(e6)).then((e7) => void 0 === e7 && c5 ? null : e7);
        }), a7.handler.__resolve__ = async (e6) => {
          e6 = withLeadingSlash(e6);
          const t7 = matchHandler(e6);
          if ("error" in t7) return;
          let r6 = { route: t7.matched.path, handler: t7.handler };
          if (t7.handler.__resolve__) {
            const s6 = await t7.handler.__resolve__(e6);
            if (!s6) return;
            r6 = { ...r6, ...s6 };
          }
          return r6;
        }, a7;
      })({ preemptive: true }), a6 = toNodeListener(r4), localFetch = /* @__PURE__ */ __name((e5, t6) => e5.toString().startsWith("/") ? (async function(e6, t7, r5 = {}) {
        try {
          const s5 = await b3(e6, { url: t7, ...r5 });
          return new Response(s5.body, { status: s5.status, statusText: s5.statusText, headers: v2(s5.headers) });
        } catch (e7) {
          return new Response(e7.toString(), { status: Number.parseInt(e7.statusCode || e7.code) || 500, statusText: e7.statusText });
        }
      })(a6, e5, t6).then((e6) => (function(e7) {
        return e7.headers.has("set-cookie") ? new Response(e7.body, { status: e7.status, statusText: e7.statusText, headers: normalizeCookieHeaders(e7.headers) }) : e7;
      })(e6)) : globalThis.fetch(e5, t6), "localFetch"), c4 = createFetch2({ fetch: localFetch, Headers: Jr2, defaults: { baseURL: e4.app.baseURL } });
      globalThis.$fetch = c4, r4.use(createRouteRulesHandler({ localFetch }));
      for (const t6 of xn3) {
        let a7 = t6.lazy ? lazyEventHandler(t6.handler) : t6.handler;
        if (t6.middleware || !t6.route) {
          const s5 = (e4.app.baseURL + (t6.route || "/")).replace(/\/+/g, "/");
          r4.use(s5, a7);
        } else {
          const e5 = getRouteRulesForPath(t6.route.replace(/:\w+|\*\*/g, "_"));
          e5.cache && (a7 = cachedEventHandler(a7, { group: "nitro/routes", ...e5.cache })), s4.use(t6.route, a7, t6.method);
        }
      }
      r4.use(e4.app.baseURL, s4.handler);
      {
        const e5 = r4.handler;
        r4.handler = (t6) => {
          const r5 = { event: t6 };
          return En3.callAsync(r5, () => e5(t6));
        };
      }
      return { hooks: t5, h3App: r4, router: s4, localCall: /* @__PURE__ */ __name((e5) => b3(a6, e5), "localCall"), localFetch, captureError };
    })();
    __name(useNitroApp, "useNitroApp");
    __name(defineRenderHandler, "defineRenderHandler");
    !(function(e4) {
      for (const t5 of Sn3) try {
        t5(e4);
      } catch (t6) {
        throw e4.captureError(t6, { tags: ["plugin"] }), t6;
      }
    })(In3);
    Tn3 = { "/_nuxt/B3KK4pm7.js": { type: "text/javascript; charset=utf-8", etag: '"1ee09-tVcjb1qHyhILu+0aEvjQeDXkwPM"', mtime: "2025-12-15T17:53:49.650Z", size: 126473, path: "../public/_nuxt/B3KK4pm7.js" }, "/_nuxt/BuaNhO9U.js": { type: "text/javascript; charset=utf-8", etag: '"198-mX3xgFSuJxKNYZEaEe5j3Fi+jAU"', mtime: "2025-12-15T17:53:49.650Z", size: 408, path: "../public/_nuxt/BuaNhO9U.js" }, "/_nuxt/dNVVQoDL.js": { type: "text/javascript; charset=utf-8", etag: '"dab-qCKZduS28LMtv0ci8ERCKi0J/vA"', mtime: "2025-12-15T17:53:49.650Z", size: 3499, path: "../public/_nuxt/dNVVQoDL.js" }, "/_nuxt/error-404.CKc8ARh6.css": { type: "text/css; charset=utf-8", etag: '"97e-inhwt7imdpowMmsLTcRKCP1WqIY"', mtime: "2025-12-15T17:53:49.650Z", size: 2430, path: "../public/_nuxt/error-404.CKc8ARh6.css" }, "/_nuxt/error-500.Dlj1-80_.css": { type: "text/css; charset=utf-8", etag: '"773-3jQvLjEZ0F847WuuhslYrbf5UYI"', mtime: "2025-12-15T17:53:49.650Z", size: 1907, path: "../public/_nuxt/error-500.Dlj1-80_.css" }, "/_nuxt/w2q2rZmz.js": { type: "text/javascript; charset=utf-8", etag: '"245f-EEa59RNSkQ0My/wEVY7b/Mklxm4"', mtime: "2025-12-15T17:53:49.650Z", size: 9311, path: "../public/_nuxt/w2q2rZmz.js" }, "/_nuxt/builds/latest.json": { type: "application/json", etag: '"47-xa1jxIXQxVYohjTc28oz1fD16Pg"', mtime: "2025-12-15T17:53:49.634Z", size: 71, path: "../public/_nuxt/builds/latest.json" }, "/_nuxt/builds/meta/b764832c-f628-4285-a92a-0b74cf3e416d.json": { type: "application/json", etag: '"8b-ubHlUceoWsFQI1fDjt8PgZDBKCE"', mtime: "2025-12-15T17:53:49.626Z", size: 139, path: "../public/_nuxt/builds/meta/b764832c-f628-4285-a92a-0b74cf3e416d.json" } };
    kn3 = { "/_nuxt/builds/meta/": { maxAge: 31536e3 }, "/_nuxt/builds/": { maxAge: 1 }, "/_nuxt/": { maxAge: 31536e3 } };
    Agent = class extends _EventEmitter {
      static {
        __name(this, "Agent");
      }
      __unenv__ = {};
      maxFreeSockets = 256;
      maxSockets = 1 / 0;
      maxTotalSockets = 1 / 0;
      freeSockets = {};
      sockets = {};
      requests = {};
      options;
      constructor(e4 = {}) {
        super(), this.options = e4;
      }
      destroy() {
      }
    };
    new Agent();
    Cn = { Agent };
    __name(fetchHandler, "fetchHandler");
    On3 = "$DurableObject";
    Pn3 = "server";
    $n2 = useNitroApp();
    Ln3 = ((e4 = {}) => {
      const t5 = new AdapterHookable(e4), r4 = /* @__PURE__ */ new Set(), s4 = e4.resolveDurableStub || ((t6, r5, s5) => {
        const a6 = e4.bindingName || "$DurableObject", c4 = r5[a6];
        if (!c4) throw new Error(`Durable Object binding "${a6}" not available`);
        const u3 = c4.idFromName(e4.instanceName || "crossws");
        return c4.get(u3);
      });
      return { ...adapterUtils(r4), handleUpgrade: /* @__PURE__ */ __name(async (e5, t6, r5) => (await s4(e5, t6, r5)).fetch(e5), "handleUpgrade"), handleDurableInit: /* @__PURE__ */ __name(async (e5, t6, r5) => {
      }, "handleDurableInit"), handleDurableUpgrade: /* @__PURE__ */ __name(async (e5, s5) => {
        const { upgradeHeaders: a6, endResponse: c4 } = await t5.upgrade(s5);
        if (c4) return c4;
        const u3 = new WebSocketPair(), f3 = u3[0], h4 = u3[1], d3 = CloudflareDurablePeer._restore(e5, h4, s5);
        return r4.add(d3), e5.ctx.acceptWebSocket(h4), await t5.callHook("open", d3), new Response(null, { status: 101, webSocket: f3, headers: a6 });
      }, "handleDurableUpgrade"), handleDurableMessage: /* @__PURE__ */ __name(async (e5, r5, s5) => {
        const a6 = CloudflareDurablePeer._restore(e5, r5);
        await t5.callHook("message", a6, new Message(s5, a6));
      }, "handleDurableMessage"), handleDurableClose: /* @__PURE__ */ __name(async (e5, s5, a6, c4, u3) => {
        const f3 = CloudflareDurablePeer._restore(e5, s5);
        r4.delete(f3);
        const h4 = { code: a6, reason: c4, wasClean: u3 };
        await t5.callHook("close", f3, h4);
      }, "handleDurableClose") };
    })({ ...$n2.h3App.websocket, instanceName: Pn3, bindingName: On3 });
    Un3 = (function(e4) {
      const t5 = useNitroApp();
      return { async fetch(r4, s4, a6) {
        const c4 = {}, u3 = new URL(r4.url);
        if (e4.fetch) {
          const t6 = await e4.fetch(r4, s4, a6, u3, c4);
          if (t6) return t6;
        }
        return fetchHandler(r4, s4, a6, u3, t5, c4);
      }, scheduled(e5, r4, s4) {
        globalThis.__env__ = r4, s4.waitUntil(t5.hooks.callHook("cloudflare:scheduled", { controller: e5, env: r4, context: s4 }));
      }, email(e5, r4, s4) {
        globalThis.__env__ = r4, s4.waitUntil(t5.hooks.callHook("cloudflare:email", { message: e5, event: e5, env: r4, context: s4 }));
      }, queue(e5, r4, s4) {
        globalThis.__env__ = r4, s4.waitUntil(t5.hooks.callHook("cloudflare:queue", { batch: e5, event: e5, env: r4, context: s4 }));
      }, tail(e5, r4, s4) {
        globalThis.__env__ = r4, s4.waitUntil(t5.hooks.callHook("cloudflare:tail", { traces: e5, env: r4, context: s4 }));
      }, trace(e5, r4, s4) {
        globalThis.__env__ = r4, s4.waitUntil(t5.hooks.callHook("cloudflare:trace", { traces: e5, env: r4, context: s4 }));
      } };
    })({ fetch: /* @__PURE__ */ __name((e4, t5, r4, s4, a6) => t5.ASSETS && (function(e5 = "") {
      if (Tn3[e5]) return true;
      for (const t6 in kn3) if (e5.startsWith(t6)) return true;
      return false;
    })(s4.pathname) ? t5.ASSETS.fetch(e4) : (a6.durableFetch = (r5 = e4) => ((e5) => {
      const t6 = e5[On3];
      if (!t6) throw new Error(`Durable Object binding "${On3}" not available.`);
      const r6 = t6.idFromName(Pn3);
      return t6.get(r6);
    })(t5).fetch(r5), "websocket" === e4.headers.get("upgrade") ? Ln3.handleUpgrade(e4, t5, r4) : void 0), "fetch") });
    $DurableObject = class extends e3 {
      static {
        __name(this, "$DurableObject");
      }
      constructor(e4, t5) {
        super(e4, t5), e4.waitUntil($n2.hooks.callHook("cloudflare:durable:init", this, { state: e4, env: t5 })), Ln3.handleDurableInit(this, e4, t5);
      }
      fetch(e4) {
        if ("websocket" === e4.headers.get("upgrade")) return Ln3.handleDurableUpgrade(this, e4);
        const t5 = new URL(e4.url);
        return fetchHandler(e4, this.env, this.ctx, t5, $n2, { durable: this });
      }
      publish(e4, t5, r4) {
        if (!Ln3) throw new Error("WebSocket not available");
        return Ln3.publish(e4, t5, r4);
      }
      alarm() {
        this.ctx.waitUntil($n2.hooks.callHook("cloudflare:durable:alarm", this));
      }
      async webSocketMessage(e4, t5) {
        return Ln3.handleDurableMessage(this, e4, t5);
      }
      async webSocketClose(e4, t5, r4, s4) {
        return Ln3.handleDurableClose(this, e4, t5, r4, s4);
      }
    };
  }
});

// .wrangler/tmp/bundle-RwbWzo/middleware-loader.entry.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// .wrangler/tmp/bundle-RwbWzo/middleware-insertion-facade.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// .output/server/index.mjs
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_nitro();
import "cloudflare:workers";
globalThis._importMeta_ = { url: "file:///_entry.js", env: {} };

// node_modules/.pnpm/wrangler@4.54.0_@cloudflare+workers-types@4.20251213.0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e4) {
      console.error("Failed to drain the unused request body.", e4);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/.pnpm/wrangler@4.54.0_@cloudflare+workers-types@4.20251213.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function reduceError(e4) {
  return {
    name: e4?.name,
    message: e4?.message ?? String(e4),
    stack: e4?.stack,
    cause: e4?.cause === void 0 ? void 0 : reduceError(e4.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e4) {
    const error3 = reduceError(e4);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-RwbWzo/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = Un3;

// node_modules/.pnpm/wrangler@4.54.0_@cloudflare+workers-types@4.20251213.0/node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-RwbWzo/middleware-loader.entry.ts
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
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
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
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
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
  $DurableObject,
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
