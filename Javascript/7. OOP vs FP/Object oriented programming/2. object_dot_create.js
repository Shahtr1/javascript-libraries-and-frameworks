// we can solve it to prototypal inheritance
// to solve same functionality of different functions
const elfFunctions = {
  attack() {
    return "attack with " + this.weapon;
  },
};

function createElf(name, weapon) {
  let newElf = Object.create(elfFunctions);
  newElf.name = name;
  newElf.weapon = weapon;
  return newElf;
}

const peter = createElf("Peter", "stones");
console.log(peter.attack());
const sam = createElf("Sam", "fire");
console.log(sam.attack());

// but its still lot of work
// with Object.create we can clean it up a bit
// Object.creates create a link between elfFunctions and newElf

// What we are doing is true prototypal inheritance
// You wont see this out in world
// What did we had before Object.create?????????????
// See next video
