/*
    Before promises (there were callbacks)
*/

el.addEventListener("click", submitForm);

// callback pyramid of doom
movePlayer(100, "Left", function () {
  movePlayer(400, "Left", function () {
    movePlayer(10, "Right", function () {
      movePlayer(330, "Left", function () {});
    });
  });
});

// Twitter app
grabTweets("twitter/clay404", (error, clayTweets) => {
  if (error) {
    throw Error;
  }
  displayTweets(clayTweets);
  grabTweets("twitter/elonmusk", (error, elonTweets) => {
    if (error) {
      throw Error;
    }
    displayTweets(elonTweets);
    grabTweets("twitter/modi", (error, modiTweets) => {
      if (error) {
        throw Error;
      }
      displayTweets(modiTweets);
    });
  });
});

// ==================================================================
// Promises
// ==================================================================

/*

    ES6

    A promise is an object that may produce a single value sometime in the future
    Either a resolved value, or a reason that it's not resolved (rejected)

    A Promise maybe in one of 3 possible states
    1.  Fullfilled
    2.  Rejected
    3.  Pending
*/

const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("Stuff Worked");
  } else {
    reject("Error, it broke");
  }
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "HII");
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "POOKIE");
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000, "Is it me you are looking for?");
});

Promise.all([promise, promise2, promise3, promise4]).then((values) => {
  console.log(values);
});

promise
  .then((result) => result + "!")
  .then((result2) => {
    // throw Error;
    console.log(result2);
  })
  .catch(console.log);
// Stuff Worked

// ==================================================================
// Example 2
// ==================================================================

movePlayer(100, "Left")
  .then(() => movePlayer(400, "Left"))
  .then(() => movePlayer(10, "Right"))
  .then(() => movePlayer(330, "Left"));

// ==================================================================
// Example 3
// ==================================================================

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

Promise.all(
  urls.map((url) => {
    return fetch(url).then((resp) => resp.json());
  })
)
  .then((results) => {
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  })
  .catch(() => console.log);
