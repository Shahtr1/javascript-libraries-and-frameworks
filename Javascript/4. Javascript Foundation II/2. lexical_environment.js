// where we write stuff
// as a little universes

function printName() {
  return "Heisenberg";
}

function findName() {
  return printName();
}

function sayMyName() {
  return findName();
}

sayMyName();

// sayMyName, findName, printName were written in global context
// can be accesed with window.<func>

// these functions are lexically inside gobal environment

/*
    In js, our lexical scope (available data + variables where the function was defined) determines our available variables.
    Not where the function is called (dynamic scope)
*/
