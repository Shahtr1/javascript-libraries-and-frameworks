// primitive values are immutable

// variables are pass-by-values

// objects are pass-by-reference

var a = 5;
var b = 10; // copy the value and put it into new memory space
// a has now the address of where the primitive value 5 is in memory

b++;
console.log(a); // 5
console.log(b); // 6

// =================================================
// Objects
// =================================================

let obj1 = { name: "Yao", password: "123" };
let obj2 = obj1;

obj2.password = "easypeasy";

console.log(obj1); // { name: "Yao", password: "easypeasy" }
console.log(obj2); // { name: "Yao", password: "easypeasy" }
