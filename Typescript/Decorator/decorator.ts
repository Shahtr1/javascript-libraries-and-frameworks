// function MenuItem(value) {
//   return class extends value {
//     id = "abc";
//   };
// }

// @MenuItem
// class Pizza {
//   id: string;
// }

// ----------------------------------------------

function MenuItem(itemId: string) {
  // outer function for accepting values
  // inner function for interacting with the target
  return function (value) {
    return class extends value {
      // closure here
      id = itemId;
    };
  };
}

@MenuItem("abc")
class Pizza {
  id: string;
}

@MenuItem("xyz")
class Hamburger {
  id: string;
}

console.log(new Pizza().id);
console.log(new Hamburger().id);

//  so decorators allow us to extend a class with properties and methods
