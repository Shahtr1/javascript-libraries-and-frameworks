/*
    Error is a construtor function
    with three properties
    message, stack and name
    
*/

function a() {
  throw new Error("damm");
}
a();

/*

    RESULT
    ======

    Uncaught Error: damm
        at a (<anonymous>:2:9)      // function a context
        at <anonymous>:4:1          // global execution context

*/

// throw is used to deifne our errors, execution if current context will stop and control will go to the next context in stack

// js has many built-in functions foro errors

// new SyntaxError
// new ReferenceError
// throw is automatically added on above two

// if noone catches it
// It goes to onerror() function that is in browser, it gives us that read text
// in nodejs we have process.on('uncaughtException')
