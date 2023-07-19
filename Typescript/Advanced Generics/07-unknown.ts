// Anything is assignable to unknown, but unknown isn't assignable to anything but itself

// unknown is the parent type of all other types. it's a regular type in the type system.

// any means "disable the type check". It's a compiler directive.

/** Example 1 */
/********************* */

let vAny: any = 10; // We can assign anything to any
let vUnknown: unknown = 10; // We can assign anything to unknown just like any

let s1: string = vAny; // Any is assignable to anything
let s2: string = vUnknown; // Invalid; we can't assign vUnknown to any other type (without an explicit assertion)

vAny.method(); // Ok; anything goes with any
vUnknown.method(); // Not ok; we don't know anything about this variable

// Every type is assignable to type unknown.
// Therefore the type unknown is another universal supertype of the type system (alongside any).
// However, the TS compiler won't allow any operation on values typed unknown.
// Furthermore, the unknown type is only assignable to the type any

/** Example 2 */
/********************* */

let myVar: unknown;

let myVar1: unknown = myVar; // No error
let myVar2: any = myVar; // No error
let myVar3: boolean = myVar; // Type 'unknown' is not assignable to type 'boolean'

// The following operations on myVar all give the error:
// Object is of type 'unknown'
myVar[0];
myVar();
myVar.length;
new myVar();

/** Example 3 */
/********************* */

const canBeAnything: any = 100;
const canNotBeAnything: unknown = 100;

// If we try to use a .startsWith() method
canBeAnything.startsWith("10"); // no error
canNotBeAnything.startsWith("10"); // Property 'startsWith' does not exist on type 'unknown'

(canNotBeAnything as string).startsWith("10"); // Chill down TS compiler, I know what I am doing.

export {};
