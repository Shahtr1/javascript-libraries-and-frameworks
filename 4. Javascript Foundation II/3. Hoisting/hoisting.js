/*
    It is the behaviour of moving variable and  functions declarations to the top of their respective environments.
    Variables are partially hoisted
    and functions declarations are hoisted
*/

console.log("1-----");
console.log(teddy); // this will be undefined
console.log(sing()); // it will be "ohhh la la la"

/*
    This is due to hoisting
    Its the js engine alocating memory to variables anfd functions that its sees during the creation phase
    as soon as js engine looks "var" and "function" keyword
    it allocates memory, and goes like this
    var teddy = undefined; // it will assign undefined for now
    it will add function to memory
    it already knew teddy was gonna be variable it dont know the values so keeps it undefined

    functions are fully hoisted

    What if i add bracket to a function??
    js engine no longer sees function as the first word

    (function sing() {
        console.log("ohhh la la la");
    })

    what will happen here?

    we get a reference error, as it doesnt hoist it for sing()
    sing is not defined

    if we change teddy to const or let, it dont get hoisted
    it gives error and dont set it to undefined

    it gives reference error, as teddy is not defined

    ===============================================

    we can have function expressions
    
    var sing2 = function(){
        console.log("uhhh la la la");
    }

    sing2 is going to be assigned undefined

*/

var teddy = "bear";
function sing() {
  console.log("ohhh la la la");
}
