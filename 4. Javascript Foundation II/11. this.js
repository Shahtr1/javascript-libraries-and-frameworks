// What is 'this'?

// this is the object that the function is a property of

function a() {
  console.log(this); // will refer to window object
}

// but we dont want that

// so we use 'use strict'

function b() {
  "use strict";
  console.log(this); // will be undefined
}

// Es6 Modules have 'use strict' by default

// when we have new function context we also have 'this' with arguments and variable environment

const obj = {
  name: "Billy",
  sing() {
    return "lalala " + this.name;
  },
  singAgain() {
    return this.sing() + "!";
  },
};

console.log(obj.singAgain());

/*
    1.  gives methods access to their object
    2.  execute same code for multiple objects
*/

// execute same code for multiple objects EXAMPLE

function importantPerson() {
  console.log(this.name + "!");
}

const name = "Sunny";
const obj1 = {
  name: "Cassy",
  importantPerson: importantPerson,
};

const obj2 = {
  name: "Jacob",
  importantPerson: importantPerson,
};

importantPerson(); // we get Sunny!
obj1.importantPerson(); // we get Cassy!
obj2.importantPerson(); // we get Jacob!
