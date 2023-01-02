// There are only seven types
/*
    number
    boolean
    string
    undefined
    null    => typeof null gives object => which is wrong and should be null
    symbol
    object
*/

/*
    undefined is used as default value when js creates them, function returns undefined when it dont have return
    undefined is the absence of definition
*/

/*
    null is the absence of value
*/

typeof function () {}; // is function, so what is this new type?

// underneath the hood, the function is just object

function a() {
  return 5;
}

// can i add property to it, like functions?

a.hi = "hihihihihiih";

console.log(a.hi); // its working

// we have primitive and non-primitive types
// all types other than object are primitives
// primitive is the data that only holds single value, no ambiguity about it

// non-primitive type dont hold value exactly
// it has a reference to somehwere in memory where its held

// ==========================================================
// JS Built-In objects
// ==========================================================

/*
    how is true.toString() working, when it is a primitive?
    It silently wraps it in boolean wrapper

    Boolean(true).toString();
*/
