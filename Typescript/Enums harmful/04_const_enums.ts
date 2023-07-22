const enum LogLevel {
  DEBUG = "DEBUG",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

function log(message: string, level: LogLevel) {}

log("Hey", LogLevel.DEBUG);

export {};

// The above code traspiles to

log("Hey", "DEBUG" /* LogLevel.DEBUG */);

// we can see that enum itself disappears at runtime
// its added inline wherever you use it
