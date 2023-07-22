const LOG_LEVEL = {
  DEBUG: "DEBUG",
  WARNING: "WARNING",
  ERROR: "ERROR",
} as const;

// ( as const ) means this object cant be changed

type ObjectValues<T> = T[keyof T];

type LogLevel = ObjectValues<typeof LOG_LEVEL>;

function log(message: string, level: LogLevel) {}

log("Hey", LOG_LEVEL.DEBUG);
log("Hey", "DEBUG");

export {};

/*

T is a generic type parameter, which means it can be any object type.

keyof T is used to get the union of keys of the type T.

T[keyof T] is a lookup type in TypeScript. 
It uses the keys obtained from keyof T to access the corresponding value types in the type T. 
This results in a new type that represents the union of all the value types from the properties in T.

*/
