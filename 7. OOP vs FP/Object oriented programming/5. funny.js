var a = new Number(5);
typeof a; // object
var b = 5;
typeof b; // number
a === b; // false
a == b; // true

// how does it work when we do toString?
b.toString();
// even though typeof b is number, internally when we assign a number, to assignes a Number object,
// so it assumes we meant object rather than primitive

// Technically everything is an object other than null or undefined
