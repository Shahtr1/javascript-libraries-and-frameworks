const { Observable, interval, timer, fromEvent, of, from } = require("rxjs");

// const observable = interval(1000);

// timer operator provides more flexibility than interval operator
// const observable = timer(5000, 1000);
// start after 5 seconds, and after every second

// const observable = fromEvent(document, "click");

// const subscription = observable.subscribe(console.log);

// const observable = of(1, 2, 3, 4, 5);
// the of operator calls the complete on our behalf
// what if we pass an Array, of operator wont loop through it

// from can loop through an array
// it work with complex objects, promises, string

// const observable = from([1, 2, [3, 4], 5]);
const observable = from(fetch("https://jsonplaceholder.typicode.com/todos/1"));
// from operator waited till the problem is resolved

const subscription = observable.subscribe({
  next: (value) => {
    console.log(value);
  },
  complete: () => {
    console.log("completed");
  },
});

console.log("hello");
