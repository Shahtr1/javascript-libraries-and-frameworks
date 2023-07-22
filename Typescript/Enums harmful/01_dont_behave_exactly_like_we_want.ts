// enums are weird in typescript
enum LogLevel {
  DEBUG,
  WARNING,
  ERROR,
}

// actually transpiles to
/*

"use strict";
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["WARNING"] = 1] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
})(LogLevel || (LogLevel = {}));

*/

// and we get this object
/*
const Log_LEVEL = {
    DEBUG: 0,
    0: 'DEBUG',
    WARNING: 1,
    1: 'WARNING',
    ERROR: 2,
    2: 'ERROR'
};
*/

// Test:

console.log(Object.values(LogLevel));

export {};
