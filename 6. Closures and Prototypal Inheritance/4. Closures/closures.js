// closures allow a function to access variable outside its scope

function a() {
  let grandpa = "grandpa";
  return function b() {
    let father = "father";
    return function c() {
      let son = "son";
      return `${grandpa} > ${father} > ${son}`;
    };
  };
}

// son has access to 'grandpa' and 'father', even after we call the b function

/*
    When we run a function it gets added to stack in its context would be variables too, with grandpa
    when we call function a, we have a chain which gives us a link to global variable
    but when stack is removed, it vanishes and grandpa goes to closure box, when GC comes it sees that there is sth thats referencing grandpa inside it,
    so it dont remove it

    same way b is called, father is added in closure box

    when c is called it cant find grandpa and father variable and global, it dont find it, then it sees closure box and finds it
*/

/*

    Closure is a feature of js
    It sees that 'c' is using it so it keeps it, and dont garbage collect it

    Closures are also called lexical scoping (It sees during the first phase which code is written where)

*/

// ============================================================
// Example
// ============================================================

const boo = (string) => (name) => (name2) =>
  console.log(`${string} ${name} ${name2}`);

//  we can have some hidden powers now

const booString = boo("hi");
// wait 5 years, it will still hold onto information
const booStringName = booString();
