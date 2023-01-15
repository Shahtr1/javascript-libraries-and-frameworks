/*
    Can we design a way to improve module pattern?
    YES!
*/

/*
    CommonJS and Asynchronous module definition(AMD) solved the problem
    we wont have the interference of polluting global namespace
*/

var module1 = require("module1"); //.fight
var module2 = require("module2"); //.importantFunc2

function fight() {}

module1.exports = { fight: fight };

// NO IIFE's

// with common js modules are meant to be loaded synchronously

// dangerous
// thats why it was only used in servers

// so how can we use modules in browsers

// There was two solutions
// 1.   Browserify // module bundler
// > browserify script.js > bundle.js

// 2.   AMD
define(["module1", "module2"], function () {
  var module1 = module1; //.fight
  var module2 = module2; //.importantFunc2

  function fight() {}

  module1.exports = { fight: fight };
});
// designed for browers, it loads them synchronously

// RequireJS is a library that helped us use AMD in browsers

// ==============================================================
// UMD(Universal Module defintion)
// ==============================================================
// it was just a simpel if else statement, not that great
// we need a native support
