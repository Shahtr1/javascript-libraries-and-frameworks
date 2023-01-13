// each execution context has a link to outside world or a link to its parent,
// it depends where the function sits lexically(is written)

/*
    with eval() and with, we can change how scope works internally in js
    it messes it up and it might have to de-optimize some of our code
*/

// Lexical environment === [[scope]]

function weird() {
  height = 50; // where is this height variable located?
  return height;
}

console.log(weird());

// Is the height being created in the variable env on weird?
// No!

// this is actually called leakage if global variable
// it dont find the variable in functione xec context
// then it goes up and cant find it in global env
// then global env create it for you

// now we have 'use strict'

// it was introduced to avoid doing this wierd stuff

// now the result is
// ReferenceError: height is not defined

// ========================================================
// ========================================================

var heyhey = function doodle() {
  // do something
  return "heyhey";
};

console.log(heyhey());
console.log(doodle()); // gets a reference error

/*

    This is because doddle function is actually enclosed in its own scope, it is actually added to its own exec context
    we can only access it inside doodle function

    var heyhey = function doodle() {
        doodle();
        return "heyhey";
    };
*/
