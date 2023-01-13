// ES6 Class
class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return "attack with " + this.weapon;
  }
}

const peter = new Elf("Peter", "stones");
console.log(peter instanceof Elf); // true
console.log(Elf instanceof peter); // false
console.log(peter.attack());
const sam = new Elf("Sam", "fire");
console.log(sam.attack());

// underneath the hood we are still using prototypal inheritance
// some people call it pseudo classical inheritance

// Why dont we just add attack to the constructor?
// Attack is shared here, and not created with each object
