// Constructor functions
function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

// every function gets a prototype property
// we can add stuff to it

Elf.prototype.attack = function () {
  return "attack with " + this.weapon;
};

const peter = new Elf("Peter", "stones");
console.log(peter.attack());
const sam = new Elf("Sam", "fire");
console.log(sam.attack());

// we can also use constructor of Function
const elf1 = new Function(
  "name",
  "weapon",
  `
    this.name = name;
    this.weapon = weapon;
  `
);

const sarah = new elf1("Sarah", "fireworks"); // this will point to new object i.e., sarah, 'new' keyword assigns it for us

/*
    when peter.attack() gets called,
    peter dont have attack property, so it goes uo the prototype chain, remember .__proto__ will point up the prototype, 
    prototype is going to have the method attack

    now attack() will have the same memory space

*/

// What if we change this to arrow function

Elf.prototype.attack = () => {
  return "attack with " + this.weapon;
};

// undefined
// Why?
// because arrow functions are lexically scoped
// what is 'this' here?
// 'this' is global object
// no object surrounding it

// but regular function is dynamically scoped
// so this will change according to whos calling the method
