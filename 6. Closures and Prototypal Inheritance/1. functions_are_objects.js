/*

Functions in js are also objects
when we invoke a function we get two parameters automatically

1.  this
2.  arguments

*/

function one() {
  return 1;
}

one(); // invoking a function

// =======================================
// =======================================

const obj = {
  two() {
    return 2;
  },
};

obj.two(); // this keywprd would be updated as obj

// =======================================
// =======================================

function three() {
  return 3;
}

three.call();

// =======================================
// ONE MORE WAY to invoke function
// =======================================

const four = new Function("return 4");
// a Function constructor
// first parameter is whatever we want function task to me
// we can also give params
const four2 = new Function("num", "return num");

four(); // 4
four2(4); // 4

// =======================================
// =======================================

function woohoo() {
  console.log("woohoo");
}

woohoo.yell = "ahhhhhh";

/*
    underneath the hood, what js does, it creates a special type of object called a callable object

    not exactly just example
    const specialObj = {
        yell: 'ahhhhhh',
        name: 'woohoo,
        (): console.log("woohoo");
    }
*/

/*
    It looks sth like this
    if a function is called as someFunc()
    there will be obj with some special properties
    1. code()
    2. Name(optional)
    3. properties like call, apply, bind, arguments, name, length and others
    it would have piece of code like code(), which gets invoked
    it can have Name but its optional, if it is anonymous

    if i create an object would i have those properties on them?

    NO!

    So functions are special type of object, callable objects

    WHY DO WE CARE?
    It means we can pass them around like objects, like things that contains data
*/
