/*

*/

function fail() {
  try {
    console.log("this works");
    throw new Error("oopsie!");
  } catch (error) {
    console.log("Nope it didnt", error);
  } finally {
    console.log("runs, no matter what happens!");
  }

  console.log("will never run, if error is thrown or even catched");
}

fail();

/* 
    RESULT 
    ======

    this works
    Nope it didnt Error: oopsie!
    at fail (<anonymous>:4:11)
    at <anonymous>:12:1
    runs, no matter what happens!
*/

try {
  try {
    something();
  } catch (e) {
    throw new Error(e);
  }
} catch (err) {
  console.log("got it", err);
}

/*
    RESULT
    ======

    got it Error: ReferenceError: something is not defined
    at <anonymous>:5:11
*/

// these type of try catch is used to handle any synchronous errors
