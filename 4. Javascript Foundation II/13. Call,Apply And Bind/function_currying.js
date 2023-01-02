// function currying
function multiply(a, b) {
  return a * b;
}

// currying refers to only partially giving function a parameter

// we can have new variable like this

let multiplyByTwo = multiply.bind(this, 2);

console.log(multiplyByTwo); // returns a Function
console.log(multiplyByTwo(4)); // returns 8
