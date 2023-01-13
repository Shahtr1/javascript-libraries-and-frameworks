// using closure restrict this function to be run only once

let view;
function initialize() {
  let called = 0;
  return function () {
    if (called > 0) {
      return;
    } else {
      view = "*";
      console.log("view has been set");
    }
  };
}

const startOnce = initialize();
startOnce();
startOnce();

/*
    Result
    ======
    view has been set
*/
