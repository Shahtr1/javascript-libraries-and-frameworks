setTimeout(() => {
  console.log("1", "is the loneliest number");
}, 0);

setTimeout(() => {
  console.log("2", "can be bad as one");
}, 0);

Promise.resolve("hi").then((data) => console.log("2", data));

console.log("3", "is a crowd");

/*

    Result:
    =======
    3 is a crowd
    2 hi
    1 is the loneliest number
    2 can be bad as one

    But why Promise before setTimeout?

    Promises are new to JS, added recently

    to accomodate new addition, we had to change Event loop
    Event loop had callback queue, also called as task queue

    with Promises, we had native way to handle async code using promises, so not part of Web api, but of JS
    so ES said we need another queue for Promises, called Job Queue or Microtask Queue (also implemented by the browser)
    it is a bit smaller than Task queue, but has higher priority
    Event loop looks at Job queue first before it starts looking in callback/task queue
*/
