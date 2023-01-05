/*
    CLosures will maake you Super Man!

    memory efficient
    allows us to do encapsulation
*/

// Memory Efficient

function heavyDuty(index) {
  const bigArray = new Array(7000).fill("-");
  console.log("created!");
  return bigArray[index];
}

heavyDuty(688);
heavyDuty(688);
heavyDuty(688);
heavyDuty(688);

// solve it with closures and make it fast

const getHeavyDuty = heavyDuty();
getHeavyDuty(688);
getHeavyDuty(700);
getHeavyDuty(800);

function heavyDuty2() {
  const bigArray = new Array(7000).fill("-"); // we have a reference to big array now! as closure
  console.log("created Again!");
  return function (index) {
    return bigArray[index];
  };
}

/*
    Result
    ======

    created!
    created!
    created!
    created Again WTF!

    big array is only created once, and closure scope is maintained
    How cool is that!

*/
