// looks like an array but not an array
// it makes js engine less optimize your code

// with the new js they gave new tools, so we avoid arguments

function marry(person1, person2) {
  console.log(Array.from(arguments));
  return `${person1} is now married to ${person2}`;
}

console.log(marry("Tim", "Tina"));

// another way is to use default parameters

function marry2(...args) {
  console.log("arguments", args);
  return `${args[0]} is now married to ${args[1]}`;
}

console.log(marry2("Tim", "Tina"));
