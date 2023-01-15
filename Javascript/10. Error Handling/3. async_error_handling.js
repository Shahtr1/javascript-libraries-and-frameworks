/*
    using catch method    
*/

Promise.resolve("asyncfail")
  .then((resp) => {
    throw new Error("#1 fail"); // this is called silent fail, that why we need catch block
    return response;
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    return err;
  })
  .then((response) => {
    console.log(response.stack);
  })
  .catch((err) => {
    console.log("final error");
  });

/*
  RESULT
  ======
  Error: #1 fail
    at <anonymous>:7:11

*/

// =====================================================================
// Examnple 2, promise inside a promise
// =====================================================================

Promise.resolve("asyncfail")
  .then((resp) => {
    Promise.resolve().then(() => {
      throw new Error("#3 fail");
    });
    return 5;
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    throw new Error("#2 fail");
  })
  .then((response) => {
    console.log(response.stack);
  })
  .catch((err) => {
    console.log("final error");
  });

/*
  RESULT
  ======
  5
  final error

  // a very surprising behaviour
  // we are not handling Promise properly, we need to catch it specifically like below
*/

Promise.resolve("asyncfail")
  .then((resp) => {
    Promise.resolve()
      .then(() => {
        throw new Error("#3 fail");
      })
      .catch(console.log);
    return 5;
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    throw new Error("#2 fail");
  })
  .then((response) => {
    console.log(response.stack);
  })
  .catch((err) => {
    console.log("final error");
  });

/*
  RESULT
  ======
    5
    Error: #3 fail
        at <anonymous>:5:15
    final error

    why do we still have 5?
    because its returned from catch call

    // console.log(response.stack);
    we are not receiving any response here so remove it

*/

Promise.resolve("asyncfail")
  .then((resp) => {
    Promise.resolve()
      .then(() => {
        throw new Error("#3 fail");
      })
      .catch(console.log);
    return 5;
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    throw new Error("#2 fail");
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log("final error");
  });

/*
  RESULT
  ======
    5
    Error: #3 fail
        at <anonymous>:5:15
    undefined


*/

// ==============================================================================
// using async await, we can handle it better
// we can actually use try catch blocks
// ==============================================================================

(async function () {
  try {
    await Promise.reject("oopsie");
  } catch (err) {
    console.log(err);
  }
  console.log("is this still good?");
})();

/*
    RESULT
    ======
    oopsie
    is this still good?

*/
