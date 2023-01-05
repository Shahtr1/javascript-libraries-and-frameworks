// function that takes an returns function
// const multiplyBy = function (num1) {
//   return function (num2) {
//     return num1 * num2;
//   };
// };

const multiplyBy = (num1) => (num2) => num1 * num2;

// multiplyBy is a higher order function here

const multiplyByTwo = multiplyBy(2);
const multiplyByFive = multiplyBy(5);

multiplyByTwo(4);
multiplyByTwo(10);
multiplyByFive(10);
