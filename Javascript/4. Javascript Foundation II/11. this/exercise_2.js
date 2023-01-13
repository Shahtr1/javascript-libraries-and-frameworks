const character = {
  name: "Simon",
  getCharacter() {
    return this.name;
  },
};
const giveMeTheCharacterNOW = character.getCharacter.bind;

//How Would you fix this?
console.log("?", giveMeTheCharacterNOW()); //this should return 'Simon' but doesn't

// ========================SOLUTION===========================

// const giveMeTheCharacterNOW = character.getCharacter.bind(character);
