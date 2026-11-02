// Freezes "now" at REPRO_NOW so the build runs as if it were just after local midnight.
const RealDate = Date;
const now = new RealDate(process.env.REPRO_NOW).getTime();
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : [now]));
  }
  static now() {
    return now;
  }
};
