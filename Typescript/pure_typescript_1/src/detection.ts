function printAll(strs: string | string[] | null) {
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}

// in operator

interface User {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  email: string;
  isAdmin: boolean;
}

function isAdminAccount(account: User | Admin) {
  if ("isAdmin" in account) {
    return account.isAdmin;
  }
}

function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

// using type predicates

// The purpose of using the isFish type guard is to enable the TypeScript compiler
// to infer the correct type within the if and else branches of the getFood function.
// By checking if pet is a fish, TypeScript can narrow down the type within the if block,
// allowing you to access the swim method without any compilation errors.
// Similarly, within the else block, the type is narrowed down to Bird,
// allowing you to access the fly method if needed.

// The getFood function also takes a parameter pet of type Fish | Bird.
// It uses the isFish type guard to determine the type of pet. If isFish(pet) returns true,
//  it means pet is a fish, so the function returns the string "fish food".
// Otherwise, it returns the string "bird food".

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Cat = { meow: () => void };

function isFish(pet: Fish | Bird | Cat): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function isBird(pet: Fish | Bird | Cat): pet is Bird {
  return (pet as Bird).fly !== undefined;
}

function getFood(pet: Fish | Bird | Cat) {
  if (isFish(pet)) {
    pet.swim;
    return "fish food";
  } else if (isBird(pet)) {
    pet.fly;
    return "bird Food";
  } else {
    pet.meow;
    return "cat Food";
  }
}

// discriminated unions

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

interface Rectangle {
  kind: "rectangle";
  length: number;
  width: number;
}

type Shape = Circle | Square | Rectangle;

function getTrueShape(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
  //return shape.side * shape.side
}

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;

    case "square":
      return shape.side * shape.side;
    case "rectangle":
      return shape.length * shape.width;

    //   Exhaustiveness checking, if you remove case rectangle, it will throw error

    default: // this code should never run
      const _defaultforshape: never = shape;
      return _defaultforshape;
  }
}
