// function scope
// vs
// block scope

if (5 > 4) {
  var secret = "12345";
}

// because js uses function scope we can access password like this
secret;

//////////////////////////////////////////////

// In other programming languages they use block scope

// they create new world

// with es6 they introduced "let" and "const" keywords

if (5 > 4) {
  let secret = "12345";
  const secret2 = "12345";
}

// we cant access them now
secret;
secret2;

// ==============================================================
// Example 1 (using var)
// ==============================================================

function loop() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log("final", i);
}

loop();

/*

    Result
    ======
    0
    1
    2
    3
    4
    5
    final 5

*/

// ==============================================================
// Example 2 (using let)
// ==============================================================

function loop() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log("final", i);
}

loop();

/*

Reference error: "i" is not defined

we are trying to use "i" outside its environment
let is block scoped

*/
