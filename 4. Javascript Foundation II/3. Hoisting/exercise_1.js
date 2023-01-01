var favouriteFood = "grapes";

var foodThoughts = function () {
  console.log("Original favourite food", favouriteFood);

  var favouriteFood = "sushi";

  console.log("New favourite food: " + favouriteFood);
};

foodThoughts();

// Result
/*

Original favourite food undefined
New favourite food: sushi

*/

/*

    Hoisiting happens in every execution context
    everytime we run an execution context, hoisting happens again

    var favouriteFood = undefined;
    var foodThoughts = undefined;
    favouriteFood = "grapes";

    foodThoughts = function () {
        console.log("Original favourite food", favouriteFood);

        var favouriteFood = "sushi";

        console.log("New favourite food: " + favouriteFood);
    };

    foodThoughts();
    creation is done and execution happens, and
    as soon as we run the foodThoughts() function a new execution context takes place


    foodThoughts = function () {
        var favouriteFood = undefined;

        console.log("Original favourite food", favouriteFood);

        favouriteFood = "sushi";

        console.log("New favourite food: " + favouriteFood);
    };
*/

// ISNT IT CONFUSING?

// WHAT HAPPENED TO PREDICTABLE CODE??????????????????????????????????????????

/*
    we can avoid use "var" keyword and simple use "const" and "let"
*/

const favouriteFood = "grapes";

const foodThoughts = function () {
  console.log("Original favourite food", favouriteFood); // Reference error: favouriteFood is not defined

  const favouriteFood = "sushi";

  console.log("New favourite food: " + favouriteFood);
};

foodThoughts();
