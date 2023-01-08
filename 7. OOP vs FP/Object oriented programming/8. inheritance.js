class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  attack() {
    return "attack with " + this.weapon;
  }
}

const fiona = new Elf("Fiona", "ninja stars");

const ogre = { ...fiona };

ogre.__proto__; // {}
fiona.__proto__; // Elf{}

// ogre dont have Elf as base class

fiona !== ogre; // they are not referencing the same thing anymore
// we cant do
ogre.attack(); // undefined

// =====================================================
// Solution
// =====================================================

class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  attack() {
    return "attack with " + this.weapon;
  }
}

class Elf extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }
}

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }

  makeFort() {
    return "strongest fort";
  }
}

const dolby = new Elf("Dolby", "cloth", "house");
dolby.attack();
const shrek = new Ogre("Shrek", "club", "green");
shrek.makeFort();

// lets test
console.log(Ogre.isPrototypeOf(shrek)); // false, because Ogre is a constructor function, we have to add prototype
console.log(Ogre.prototype.isPrototypeOf(shrek)); // true
console.log(Character.prototype.isPrototypeOf(Ogre)); // false
console.log(Character.prototype.isPrototypeOf(Ogre.prototype)); // true

// better way
console.log(dolby instanceof Elf); // true
console.log(dolby instanceof Character); // true
