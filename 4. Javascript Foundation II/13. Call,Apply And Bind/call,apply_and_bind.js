// in order to manipulate 'this' keyword, there are 3 methods
// call()       apply()         bind()
// underneath the hood all functions call call()

function a() {
  console.log("hi");
}

a.call();
a(); // all functions have this property called call which allows us to call it

// call and apply do the same thing

// ===========================================================
// EXAMPLE
// ===========================================================

const wizard = {
  name: "Merlin",
  health: 100,
  heal() {
    return (this.health = 100);
  },
  healWithArgs(num1, num2) {
    return (this.health += num1 + num2);
  },
};

const archer = {
  name: "Robin Hood",
  health: 30,
};

// can we borrow the function from wizard? to heal archer
// we can use call and apply to borrow methods

// we will do

console.log("1", archer);
wizard.heal.call(archer);
console.log("2", archer);

/*
    RESULT
    ======
    1 { name: "Robin Hood", health: 30 };
    2 { name: "Robin Hood", health: 100 };
    
*/

// we can also give parameters to call method

console.log("3", archer);
wizard.healWithArgs.call(archer, 50, 30);
console.log("4", archer);

/*
    RESULT
    ======
    3 { name: "Robin Hood", health: 100 };
    4 { name: "Robin Hood", health: 180 };
    
*/

// the onnly difference between call and apply is apply takes an array of parameters

// ================================================================================
// BIND
// ================================================================================

/*
    Bind returns a new function with a certain context and parameters 

*/

console.log("5", archer);
const healArcher = wizard.healWithArgs.bind(archer, 50, 30); // it doesnt run the function, it returns the function
console.log("6", archer);

healArcher();
// we are able to store the value of 'this' with bind
