// All settled
const promiseOne = new Promise((resolve, reject) => {
  setTimeout(resolve, 6000);
});

const promiseTwo = new Promise((resolve, reject) => {
  setTimeout(reject, 3000);
});

// Promise.all([promiseOne, promiseTwo]).then((data) => console.log(data));

// Seems like Promise.all only resolves if both promises resolve here
// returns Uncaught (in promise) undefined
// inorder for us to make it work we have to add catch statement
// lets add catch

// Promise.all([promiseOne, promiseTwo])
//   .then((data) => console.log(data))
//   .catch((e) => {
//     console.log("something failed");
//   });

// returns something failed

Promise.allSettled([promiseOne, promiseTwo])
  .then((data) => console.log(data))
  .catch((e) => {
    console.log("something failed");
  });

// allSettled runs regardless if they are rejected or not

// =====================================================================
// any()
// =====================================================================
// Promise.any();
// resolves if any of the supplied promises is resolved. Below we have 3 promises, which resolves at random times.

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("A"), Math.floor(Math.random() * 1000));
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("B"), Math.floor(Math.random() * 1000));
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("C"), Math.floor(Math.random() * 1000));
});

(async function () {
  const result = await Promise.any([p1, p2, p3]);
  console.log(result); // Prints "A", "B" or "C"
})();

// What if none of the promises resolve? In that case Promise.any() throws an error!
