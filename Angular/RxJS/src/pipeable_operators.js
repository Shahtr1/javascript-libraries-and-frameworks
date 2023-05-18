const {
  Observable,
  from,
  of,
  fromEvent,
  pluck,
  filter,
  interval,
} = require("rxjs");
import {
  map,
  reduce,
  take,
  scan,
  tap,
  mergeMap,
  switchMap,
  concatMap,
  exhaustMap,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// const observable = of(1, 2, 3, 4, 5);

// const numberWithSymbol = observable.pipe(map((value) => `$${value}`));

// const observable = fromEvent(document, "keydown").pipe(
//   // map((event) => event.code)
//   // or
//   pluck("code")
// );

// const observable = fromEvent(document, "keydown").pipe(
//   pluck("code"),
//   filter((code) => code === "Space")
// );

// its downside to use one operator to do multiple tasks
// But why?
// the operators arent swappable

// const observable = fromEvent(document, "keydown").pipe(
//   map((event) => {
//     event.code === "Space" ? event.code : null;
//   })
// );

// const observable = of(1, 2, 3, 4, 5).pipe(reduce((acc, val) => acc + val, 0));
// reduce works after observable has been completed

// The take operator passes on a value and completes the subscription if the limit has been surpassed
// const observable = interval(500).pipe(
//   take(5),
//   reduce((acc, val) => acc + val, 0)
// );

// scan performs the exact same operation as the reduce, it just dont wait for the observale to be completed
// const observable = interval(500).pipe(
//   take(5),
//   scan((acc, val) => acc + val, 0)
// );

// tap purely for debugging, if we change the value the changes are ignored
// const observable = interval(500).pipe(
//   take(5),
//   tap({
//     next(val) {
//       console.log("tap", val);
//     },
//   }),
//   reduce((acc, val) => acc + val, 0)
// );

const button = document.querySelector("#btn");
// we need to call ajax operator within a pipeable operator
// now here we will subscribe to two observables

// const observable = fromEvent(button, "click").pipe(
//   map(() => {
//     return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
//   })
// );

// const subscription = observable.subscribe({
//   next(value) {
//     value.subscribe(console.log);
//   },
//   complete() {
//     console.log("complete");
//   },
// });

// The above code is a problem
// RxJS comes with number of flattening operators
// 1.  MergeMap
// 2.  SwitchMap
// 3.  ConcatMap
// 4.  ExhaustMap

// Merge map will subscribe to the observable returned by the function
// const observable = fromEvent(button, "click").pipe(
//   mergeMap(() => {
//     return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
//   })
// );

// Potential issue in mergeMap
// when using interval, the emitter will run infinity,s o we use take
// const observable = fromEvent(button, "click").pipe(
//   mergeMap(() => {
//     return interval(1000).pipe(tap(console.log), take(5));
//   })
// );

// SwitchMap performs a similar task like mergeMap, mergeMap dont limit the active inner observables
// SwitchMap limit the active inner observables to 1
// if there is a new observable, previous one is completed
// It is considered one of the safest flattening operators

// const observable = fromEvent(button, "click").pipe(
//   // to check, click the button twice
//   switchMap(() => {
//     return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
//       take(5),
//       tap({
//         complete() {
//           console.log("inner observer completed completed");
//         },
//       })
//     );
//   })
// );

// ConcatMap (for queuing observables) performs a similar task like mergeMap,
// will limit the number of active observables to 1
// Instead of cancelling the previous observable this will place observables in a queue
// const observable = fromEvent(button, "click").pipe(
//   concatMap(() => {
//     return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
//       take(5),
//       tap({
//         complete() {
//           console.log("inner observer completed completed");
//         },
//       })
//     );
//   })
// );

// ExhaustMap performs a similar task like mergeMap, it will ignore incoming observables if an observable is active
// const observable = fromEvent(button, "click").pipe(
//   exhaustMap(() => {
//     return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
//       take(5),
//       tap({
//         complete() {
//           console.log("inner observer completed completed");
//         },
//       })
//     );
//   })
// );

const subscription = observable.subscribe({
  next(value) {
    console.log(value);
  },
  complete() {
    console.log("complete");
  },
});
