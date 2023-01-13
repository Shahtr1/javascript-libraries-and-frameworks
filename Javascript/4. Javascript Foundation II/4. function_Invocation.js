// function expression
var canada = function () {
  console.log("cold");
};

// function declaration
function india() {
  console.log("warm");
}

// Function Invocation/Call/Execution
canada();
india();

// canada function is defined at runtime
// india function is defined at parse time when compiler starts parsing the code

// when function is invoked we create an execution context on top of our global execution context
// we have global object that equals to "this" from global execution context
// Instead with function execution context we get "arguments"

// "arguments" keyword

function marry(person1, person2) {
  console.log(arguments);
  return `${person1} is now married to ${person2}`;
}

marry("Tim", "Tina");
