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

// How to avoid it in arrays?

var c = [1, 2, 3, 4, 5];
var d = [].concat(c);
var e = [...c];
d.push(12344);

// How to avoid it in objects?

let obj = { a: "a", b: "b", c: "c" };
let clone = Object.assign({}, obj);

obj.c = 5;

let clone2 = { ...obj };

// what if obj has another object in its key value?

let obj = { a: "a", b: "b", c: { deep: "try and copy me" } };

let clone3 = { ...obj }; // this is called shallow clone

obj.c.deep = "hahahaha"; // it gets overwritten

// how to solve it?
let superClone = JSON.parse(JSON.stringify(obj)); // it will clone deeply
