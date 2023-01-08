// factory functions
function createElf(name, weapon) {
  return {
    name,
    weapon,
    attack() {
      return "attack with " + elf.weapon;
    },
  };
}

const peter = createElf("Peter", "stones");
const sam = createElf("Sam", "fire");

// factory functions are great, but what if we have 1000 elfs
// 100 elfs require memory to store data
// methods that are generic, are going to be copied at different location
// so 1000 methods
