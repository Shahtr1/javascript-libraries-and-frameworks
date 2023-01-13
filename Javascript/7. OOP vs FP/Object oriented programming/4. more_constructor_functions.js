// More Constructor functions
function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
  // var a = 5; // its not going to add 'a' here, only way is through this keyword
}

Elf.prototype.attack = function () {
  return "attack with " + this.weapon;
};

Elf.prototype.build = function () {
  function building() {
    return this.name + " builds a house";
  }
  return building();
};

const peter = new Elf("Peter", "stones");
console.log(peter.__proto__); // Elf function, points to Elf.prototype, which contains attck method
// Every function that we create has prototype property, but only constructor function have use of this prototype object

console.log(peter.prototype); // undefined
// because peter is not a function, it is an object

console.log(peter.build()); // undefined
// WHY?
// functions inside a method is a function inside a function is a function, so this is assigned to window object

// we can fix it by
Elf.prototype.build = function () {
  function building() {
    return this.name + " builds a house";
  }
  building.bind(this);
};

// or even easier
Elf.prototype.build = function () {
  const self = this;
  function building() {
    return self.name + " builds a house";
  }
  return building();
};

// ======================================================================================================================
// ======================================================================================================================
/*
  prototype is kinda weird, and it gets confusing
  to avoid this headache, Object.create was created

  but if we wanted to get closer to OOP, Object.create is not the closer way but this is as we are using 'new' here
*/
