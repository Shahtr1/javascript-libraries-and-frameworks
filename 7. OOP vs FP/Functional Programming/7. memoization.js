/*
    Memoization is caching(kinda)
    a way to speed our programs
*/

function addTo80(n) {
  return n + 80;
}

// addTo80(5);
// addTo80(5);
// addTo80(5);

function memoizeAddTo80(n) {
  let cache = {}; //use closures now
  return function (n) {
    if (n in cache) {
      return cache[n];
    } else {
      cache[n] = n + 80;
      return cache[n];
    }
  };
}

const memoized = memoizeAddTo80();

memoized(5);
