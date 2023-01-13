// on top of this in execution context we have variable environment

function two() {
  var isValid; // 5. undefined
}

function one() {
  var isValid = true; // 3.   local environment in new exec context
  two(); // 4. new Execution context is created
}

var isValid = false; // 1.  undefined is changed to false
one(); // 2.    we invoke the func, and a new exec context is created in top of stack

/*
    Stack
    -----

    two()   // isValid is undefined
    one()   // is going to have a variable that has value true
    global()    // this will have false as its variable
*/

// and when step 5 is done

// then we start popping off and memory space is gone too
