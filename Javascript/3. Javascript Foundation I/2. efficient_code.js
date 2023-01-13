// In order to help js engine we need to be cautious while using these functions

/**

    1.  eval()


    2.  arguments


    3.  for in


    4.  with


    5.  delete


    6.  hidden classes


    7.  inline caching



 */

// Inline Caching
function findUser(user) {
  return `found ${user.firstName} ${user.lastname}`;
}

const userData = {
  firstName: "Johnson",
  lastname: "Junior",
};

findUser(userData);
// if we call it over and over we will replace it with 'found Johnson Junior'
// as compiler will compile it and optimize it

// =======================================================================
// =======================================================================

// Hidden classes
function Animal(x, y) {
  this.x = x;
  this.y = y;
}

const obj1 = new Animal(1, 2);
const obj2 = new Animal(3, 4);

obj1.a = 30;
obj1.b = 100;

//  if i assign 'b' property first then 'a' property that code will slow down the compiler
obj2.b = 30;
obj2.a = 100;

// so better is to use constructor

/**

    It’s rather hard to optimize a dynamically typed, prototype-based language, such as JavaScript. 
    Objects can change their type during runtime and it happens implicitly. 
    To track types of JavaScript object and variables, V8 introduced the concept of hidden classes. 
    During runtime V8 creates hidden classes that get attached to each and every object to track its shape/layout. 
    That allows to optimize the property access time.

 */

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

var ironMan = new Person("Tony", "Stark");
var captainAmerica = new Person("Steve", "Rogers");
captainAmerica.age = 87;

/** 

    When Person function gets invoked to initialize ironMan object, a hidden class (let's call it C0) gets created along with invocation. 
    C0 is an empty class because Person doesn't have any properties yet. 
    Next, this.firstName gets assigned and hidden class C1 gets created. 
    C1 is based on C0 with firstName property. Next, this.lastName gets assigned and guess what? Hidden class C2 gets created. 
    C2 based on C1 with lastName property.

    When Person gets invoked to initialize captainAmerica, 
    the hidden class chain (C0 -> C1 -> C2) is going to reused and captainAmerica and ironMan are going to have the same hidden class. 
    But as soon as the shape(layout) of the object changes, it gets a new hidden class. 
    By assigning 87 to the age property, we created a new hidden class C2 that is going to be based on C2 with age property on it. 
    It's very important to maintain the shape of your objects so V8 can optimize the code more efficiently.

*/

// =======================================================================
// =======================================================================

// delete

delete obj1.x; // also changes the hidden classes

// =======================================================================
// =======================================================================

/**
 *                                                          ALWAYS WRITE PREDICTABLE CODE
 */
