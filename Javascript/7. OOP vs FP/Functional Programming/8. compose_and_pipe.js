/*
    Compose is that any kinda of data transformation we do should be obvious
    like a conveyor belt in factory
*/

const compose = (f, g) => (data) => f(g(data));
const multiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);

const multiplyBy3AndAbsolute = compose(multiplyBy3, makePositive);

multiplyBy3AndAbsolute(-50); // 150

// =========================================================================
// Pipe
// =========================================================================

// Instead of going from right to screenLeft, it goes left to right
const pipe = (f, g) => (data) => g(f(data));
const absoluteAndMultiplyBy3 = compose(multiplyBy3, makePositive);

absoluteAndMultiplyBy3(-50); // 150
