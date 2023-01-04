// Functions are first class citizens in JS

// WHAT DOES THAT MEAN?

/*

    1.  functions can be assigned to variables and even object property
    2.  we can also pass functions as arguments in function

        a(function(){console.log('hi there)})

    3.  we can return functions as values from other functions

    so FUNCTIONS ARE DATA

*/

/* 

be careful of initializing functions inside loop

*/

for (leti = 0; i < 5; i++) {
  function a() {} // instead of doing this we instead should be moving this up top
  a();
}

// ==========================

function a() {}
for (leti = 0; i < 5; i++) {
  a();
}

// ==========================
