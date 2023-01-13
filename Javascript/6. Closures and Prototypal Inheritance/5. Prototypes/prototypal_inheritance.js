/*

    Arrays and functions are just object in js.

    JS uses sth like prototypal inheritance

    Inheritance is object getting access of proprties and methods of another object



*/

const array = [];
array.__proto__;

// array was created with Array[], what we call a constructor
// __proto__ to go up the prototype chain, we got Array

array.__proto__.__proto__; // weget object

// same goes for functions

// This is prototypal inheritance, java and others have classical inheritance

// ==========================================================================
// Demonstration 1
// ==========================================================================

let dragon = {
  name: "Tanya",
  fire: true,
  fight() {
    return 5;
  },
  sing() {
    if (this.fire) return `I am ${this.name}`;
  },
};

let lizard = {
  name: "Kiki",
  fight() {
    return 1; // not so strong
  },
};

// const singLizard = dragon.sing.bind(lizard); // lizard dont have fire, so result would be error
// console.log(singLizard());

// So what do we do?
// This is where prototypal inheritance comes in

lizard.__proto__ = dragon;
lizard.sing(); // I am Kiki
lizard.fire; // true
lizard.fight(); // 1

dragon.isPrototypeOf(lizard); // true

lizard.__proto__ = dragon;

for (let prop in lizard) {
  console.log(prop);
}

// Result
/*
    name
    fight
    fire
    sing
*/

for (let prop in lizard) {
  if (lizard.hasOwnProperty(prop)) console.log(prop);
}

// Result
/*
    name
    fight
*/

// Why dont we see __proto__ in the code nowadays?
// WE SHOULD NOT!
// It will mess up our compiler pretty bad
// WHY is this useful?
// It means that objects can point out to same place in memory, will get awesome

lizard.ahaha; // undefined
// when js engine dont find anything we get undefined, what happens when we get to the base object finding it?

// What will happen if we do
const obj1 = {};
obj1.__proto__.__proto__; // null

// ==========================================================================
// Demonstration 2
// ==========================================================================

const obj = { name: "Sally" };

obj.hasOwnProperty("name"); // true
obj.hasOwnProperty("hasOwnProperty"); // false, because it has this property up the prototype chain

function a() {}

a.hasOwnProperty("call"); // false
a.hasOwnProperty("apply"); // false
a.hasOwnProperty("bind"); // false

a.hasOwnProperty("name"); // true

// WHY call and apply and bind not the property?

// Theses properties not exactly there, its up the prototype chain

function multiplyBy5(num) {
  return num * 5;
}

multiplyBy5.__proto__; // here is the apply, bind and call

// __proto__ links to prototype property in parent object

// __proto__ actually lives inside prototype object, the yellow line in the png

// ==========================================================================
// Demonstration 3
// Create our own prototypes
// ==========================================================================

let human = { mortal: true };

let socrates = Object.create(human); // one way to inherit from human
socrates.age = 45;
console.log(socrates); // undefined
console.log(mortal); // true
console.log(human.isPrototypeOf(socrates)); // true

// ==========================================================================
// Demonstration 4
// ==========================================================================

// Only functions have the prototype property
// Only time we use prototype is using constructor functions
// Constructor functions have the blueprint that we use

// multiplyBy5.__proto__ and Function.prototype are same

// multiplyBy5.__proto__.__proto__ and Object.prototype are same too

// WTF

// You just said that only fuunctions have prototype property, how come Object has it?

// It is the base object

// here typeof Object is function
typeof Object; // "function"

// What?
// because it has prototype property

/*
    When we do 
    const ob = {}

    js has to create that object
    It needs to create it from Object constructor

    > typeof {}
    "object"

    Object is a function and Object.prototype is what we call a base 'object'

    > typeof Object.prototype
    "object"

*/
