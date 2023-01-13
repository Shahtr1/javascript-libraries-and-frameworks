const number = 100;
const string = "Jay";
let obj1 = {
  value: "a",
};
let obj2 = {
  value: "b",
};
let obj3 = obj2;

function change(number, string, obj1, obj2) {
  number.value = number * 10;
  string.value = "Pete";
  obj1 = obj2;
  obj2.value = "c";
}

change(number, string, obj1, obj2);

//Guess the outputs here before you run the code:
console.log(number); //100
console.log(string); //Jay
console.log(obj1.value); //a

/*
at function change, obj1 param initially receives the reference of the obj1 outside, 
but afterwards that reference is discarded and this local variable obj1 receives the same ref as obj2 has. 
it is not the global variable that receives a new ref, it is the local variable. the global obj1 remains intact.

in that way, when you pass obj1 as param to the function, it's pointless since inside the function you dont use it. 
the only really manipulation happens at obj2.value because the local obj2 uses its ref.
*/
