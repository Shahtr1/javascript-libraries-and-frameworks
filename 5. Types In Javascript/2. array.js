var array = [1, 2, 3];

/*
    In js its same as
*/

var array = { 0: "1", 1: "2", 2: "3" };

// thats why
// typeof array = object

// How can we figure of that a thing is array

// for that we have Array.isArray()

Array.isArray([1, 2, 3]); // returns true
Array.isArray({ 0: "1", 1: "2", 2: "3" }); // returns false
