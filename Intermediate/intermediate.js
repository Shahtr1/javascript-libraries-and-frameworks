// Scope
// By default in javascript we are in root scope which is the Window object

// ECMAScript === Javascript
// ECMAScript is the standard

// Babel takes care of everything and will convert our code into js understood by all the browsers

const a = (x, z) => x + z;

// will get converted into =>

("use strict");

var a = function a(x, z) {
  return x + z;
};

// ---------------------------------------------

// ES5 & ES6
// ---------
// let + const

const player = "bobby";
let experience = 100;
let wizardLevel = false;

if (experience > 90) {
  let wizardLevel = true;
  console.log("inside", wizardLevel);
}

console.log("outside", wizardLevel);

// will return
// inside true
// outside false

const player1 = "bobby";
let experience1 = 100;
var wizardLevel1 = false;

if (experience1 > 90) {
  var wizardLevel1 = true;
  console.log("inside", wizardLevel1);
}

console.log("outside", wizardLevel1);

// will return
// inside true
// outside true

// Destructuring
const obj = { name: "Shahrukh" };
const { name } = obj;

// Dynamic property values
const myName = "john snow";

const myObj = {
  [myName]: "hello",
  [1 + 2]: "hihi",
};

// Default arguments
function greet(name = "", age = 30, pet = "cat") {
  return `Hello ${name} you seem to be ${
    age - 10
  }. WHat a lovely ${pet} you have.`;
}

// Symbol
let sym1 = Symbol();
let sym2 = Symbol("foo");
let sym3 = Symbol("foo");

// Symbols create completely unique values

// =========================================================

// CLOSURES - a function ran. the function executed,its never going to execute again, but its going to remmber that there are references to those variables so the child scope always has access to parent's scope

const first = () => {
  const greet = "Hi";
  const second = () => {
    alert(greet);
  };
  return second;
};

const newFunc = first();
newFunc();
// second needs to remember what greet is
// child scope always has access to parent's scope
// so it will remember greet function

// ===================================================================

// CURRYING
const multiply = (a, b) => a * b;
const curriedMultiply = (a) => (b) => a * b;
// Why is it needed?
// we can do like this
const multiplyBy5 = curriedMultiply(5);

multiplyBy5(5);
// will give 25

// =================================================================

// COMPOSE
// Putting two functions in a way that output of one function is input of other

const compose = (f, g) => (a) => f(g(a));

const sum = (num) => num + 1;

compose(sum, sum)(5);

// returns 7

// ================================================================

// Avoid side effects, functional purity

var dontDoThis = 1;
function b() {
  dontDoThis = 2;
  // dont change outside world
}

// Always return which creates deterministic

// =================================================================

// CONTEXT
// tells us where we are within the object
// `this`

function a() {
  console.log(this);
}

a();
// will give Window object
// imagine it as window.a(), the one on the left side is window, so this refers to window object

const object4 = {
  a: function () {
    console.log(this);
    // this is object4 here
  },
};

object4.a();
// will give object4

// =================================================================
// INSTANTIATION

class Player {
  constructor(name, type) {
    console.log("player", this);
    this.name = name;
    this.type = type;
  }

  introduce() {
    console.log(`Hi I am ${this.name}, I'm a ${this.type}`);
  }
}

class Wizard extends Player {
  constructor(name, type) {
    super(name, type);
    console.log("wizard", this);
  }

  play() {
    console.log(`WEEEEE I'm a ${this.type}`);
  }
}

const wizard1 = new Wizard("Shelly", "Healer");
const wizard2 = new Wizard("Shawn", "Dark Magic");

// It will log
// player Wizard {}
// wizard Wizard {name: "Shelly", type: "Healer"}

// Classical Inheritance
var Player2 = function (name, type) {
  this.name = name;
  this.type = type;
};

Player2.prototype.introduce = function () {
  console.log(`Hi I am ${this.name}, I'm a ${this.type}`);
};

var wizard3 = new Player2("Shelly", "healer");
var wizard4 = new Player2("Shawn", "Dark Magic");

wizard3.play = function () {
  console.log(`WEEEEE I'm a ${this.type}`);
};

wizard4.play = function () {
  console.log(`WEEEEE I'm a ${this.type}`);
};

// ==================================================

// ES7

// includes and raised-to-power

// .includes() and **

/**
 
  > 'Helooo'.includes('o');
  true

  > const pets = ['cat','dog'];
  > pets.includes('dog')
  true
  
  > const square = (x) => x**2;
 */

// ==================================================

// ES8

// String padding

// Trailing commas and functions and paremeter list and calls

// Object.values and Object.entries, before these we only had Object.keys

/**
  
  > 'Turtle'.padStart(10);
  "          Turtle"

  > 'Turtle'.padEnd(10);
  "Turtle          "
  
  > const fun = (a,b,c,d,) =>{
      console.log(a)
    }

  > fun(1,2,3,4,);
  // this above is still valid js
  // reason is sometimes people forget when there are tons of parameters


 */

// ==================================================

// ES9 Async Await will be introduced later

// ==================================================
