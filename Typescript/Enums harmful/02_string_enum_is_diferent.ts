enum LogLevel {
  DEBUG = "DEBUG",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

// actually transpiles to
/*

"use strict";
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (LogLevel = {}));

*/

// but it defeats the whole purpose of using as its not automatically assigning it, its not native

export {};
