// =====================================================================================
// CURRYING
// =====================================================================================
// take a function that takes multiple parameters then convert it into a function that takes one at a time
const multiply = (a, b) => a * b;
const curriedMultiply = (a) => (b) => a * b;
const curriedMultiplyBy5 = curriedMultiply(5);

curriedMultiplyBy5(3);

// =====================================================================================
// PARTIAL APPLICATION
// =====================================================================================
// taking a function, applying some of the arguments in the function, so it remembers those parameters,
// then it uses closures to lay down the call for the rest of paramaters

const multiplyP = (a, b, c) => a * b * c;
const partialMultiplyBy5 = multiply.bind(null, 5); // set a as 5, on second call take all

partialMultiplyBy5(4, 10);
