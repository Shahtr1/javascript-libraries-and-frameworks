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

/*
    when js engine sees these brackets sayMyName(),
    its going to say, i am going to run teh function and create an execution context sayMyName()
    and add this context in the stack
    then creates a new execution context findName()
    and then another context printName()
*/

/*
    Base execution context that runs, is called global execution context, global()
    we dont see this, its underneath the hood

    so it gets added to call stack first
    when final code is run, this gets popped off
    
*/

/*
    anytime we run code, its inside execution context
*/

/*
    first that js engine does is create this global execution context, and it give you two things
    1.  Global Object
    2.  this

    at first,
    this===window

    in node.js
    this===global

    it has creation phase and execution phase
*/
