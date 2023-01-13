const array = [1, 2, 3, 4];
for (var i = 0; i < array.length; i++) {
  // i is a part of global scope
  setTimeout(function () {
    console.log("I am at index" + i);
  }, 3000);
}

/*

    RESULT
    ======
    I am at index 4
    I am at index 4
    I am at index 4
    I am at index 4

    NOW SOLVE THIS

*/

for (let i = 0; i < array.length; i++) {
  // let allows us to use block scoping, so i is scoped within here
  setTimeout(function () {
    console.log("I am at index" + temp);
  }, 3000);
}

// or

for (var i = 0; i < array.length; i++) {
  const temp = i; // use closure
  setTimeout(function () {
    console.log("I am at index" + temp);
  }, 3000);
}

// or

for (var i = 0; i < array.length; i++) {
  (function (closureI) {
    // it will keep the index of i
    setTimeout(function () {
      console.log("I am at index" + array[closureI]);
    }, 3000);
  })(i);
}
