1 == "1"; // true

// WTF

// What is type coercion?
// when the operands are different types, one of them will be converted into an equivalent value by the js engine

// Do all languages have type coercion?
// Yes

// js has a very heavy type coercion to it
// it happens when we use ==

// if we do === then we get false
// it says dont coerce the values

// == is not predictable code

if (1) {
  return console.log(5);
}

// 5 will be logged, because js coerces 1 as true
// likewise 0 as false

// ===============================================================
// ===============================================================

/*
  In js there is a concept of -0 and +0
*/

-0 === +0; // we get true, but they are technically different in js
Object.is(-0, +0); // we get false
// why?

NaN === NaN; // false
// why?
Object.is(NaN, NaN); // true

// You should alwasy use ===, as type coercion is always tricky
