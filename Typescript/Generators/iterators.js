/**
 *
 * In JavaScript, a collection refers to any object or data structure that contains multiple elements or values.
 * It could be an array, a string, a Set, a Map, or any other data structure that holds multiple items.
 *
 * An iterable, on the other hand, is a specific type of collection that follows the iterable protocol.
 * An iterable is an object that defines an iterator,
 * which is responsible for producing a sequence of values when iterated.
 * An iterable is an object that can be iterated over, meaning you can loop over its elements or access them one by one.
 * To make an object iterable, it needs to implement the [Symbol.iterator] method.
 *
 * When an object has a [Symbol.iterator] method,
 * it means that the object can be iterated over using the for...of loop
 * or by explicitly invoking the iterator protocol methods like next().
 *
 *
 *
 */

/**
 * Here's an example of implementing the [Symbol.iterator] method for a custom iterable object:
 *
 */

const iterableObject = {
  data: ["A", "B", "C"],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;

    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

// Iterating over the iterable object using for...of loop
for (const element of iterableObject) {
  console.log(element);
}

/**
 * The for...of loop automatically uses the [Symbol.iterator] method to retrieve the iterator object and iterate over the values.
 * During each iteration, the iterator's next() method is called,
 * and the loop continues until the iterator's done property becomes true.
 *
 */

/**
 * Some more examples of [Symbol.iterator]
 *
 */

class FilteredValues {
  constructor(values) {
    this.values = values;
  }

  *[Symbol.iterator]() {
    for (const value of this.values) {
      if (value % 2 === 0) {
        yield value;
      }
    }
  }
}

const filteredValues = new FilteredValues([1, 2, 3, 4, 5]);

for (const value of filteredValues) {
  console.log(value);
}

/**
 * ITERATOR RESULT
 *
 * In JavaScript,
 * the IteratorResult is an object that represents the result of iterating over an iterable object using an iterator.
 *
 * The IteratorResult object has two properties:
 * value and done
 *
 *
 *
 */

const iterable = [1, 2, 3];

const iterator = iterable[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

/**
 * Arrays in JS are built-in iterables, so they must have an iterator:
 */

const a = [1, 2, 3, 4];
const it: Iterator<number> = a[Symbol.iterator]();
while (true) {
  let next = it.next();
  if (!next.done) {
    console.log(next.value);
  } else {
    break;
  }
}
