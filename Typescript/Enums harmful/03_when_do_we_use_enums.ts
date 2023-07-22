enum LogLevel {
  DEBUG = "DEBUG",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

enum LogLevel2 {
  DEBUG = "DEBUG",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

function log(message: string, level: LogLevel) {}

// Why doesnt this work?
// as we know that ts is like a structural type system, which only cares about runtime values not the names,
// so surely it shouldnt care, whether we should pass "DEBUG" or LogLevel.DEBUG
log("Hey", "DEBUG");

// Well, enums break that rule in ts, it here cares about the names of things,
// for enums ts becomes a nominal type system, it here cares about if value if of LogLevel1 or LogLevel2

// so just pass
log("Hey", LogLevel.DEBUG);

export {};
