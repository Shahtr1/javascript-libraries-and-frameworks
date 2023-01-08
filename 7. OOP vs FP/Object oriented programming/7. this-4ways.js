// ======================================================
// 'new' binding
// ======================================================
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person("Xavier", 55); // this is person1 here

// ======================================================
// Implicit binding
// ======================================================

const person = {
  name: "Karen",
  age: 40,
  hi() {
    console.log("hi", name);
  },
};

// ======================================================
// Explicit binding
// ======================================================
const person2 = {
  name: "Karen",
  age: 40,
  hi: function () {
    console.log("hi", this.setTimeout);
  }.bind(window),
};

// ======================================================
// arrow functions, we can do lexical scoping
// ======================================================

const person3 = {
  name: "Karen",
  age: 40,
  hi: function () {
    var inner = () => {
      console.log("hi", this.name);
    };
    return inner();
  },
};

// if we didnt use arrow function, then 'this' would be window object
