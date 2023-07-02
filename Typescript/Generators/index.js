function normalFunction() {
  console.log("This is a normal function");
}

function* generatorFunction() {
  console.log("This is a normal function");
}

normalFunction();
const a = generatorFunction();
a.next();

/**
 * a is of Generator type
 * The generator interface extends Iterator, which allows us to call next.
 *
 */

function* iterator() {
  yield 1;
  yield 2;
  yield 3;
}

for (let x of iterator()) {
  console.log(x);
}

/**
 * yield allows us to return multiple times from the function.
 * In addition, an array will never be created in memory,
 * allowing us to create infinite sequences in a very memory efficient manner.
 *
 * The following example will generate infinite even numbers:
 *
 */

function* evenNumbers(start) {
  let n = start;
  while (true) {
    if (start === 0) {
      yield (n += 2);
    } else {
      yield n;
      n += 2;
    }
  }
}
const gen = evenNumbers(6);
console.log(gen.next().value); //6
console.log(gen.next().value); //8
console.log(gen.next().value); //10
console.log(gen.next().value); //12
console.log(gen.next().value); //14

/**
 * Use cases for TypeScript generators
 *
 * Calculate values on demand
 *
 * You can implement generators to calculate and yield values on-demand,
 * caching intermediate results to improve performance.
 */

function* calculateFibonacci(): Generator<number> {
  let prev = 0;
  let curr = 1;

  yield prev;
  yield curr;

  while (true) {
    const next = prev + curr;
    yield next;
    prev = curr;
    curr = next;
  }
}

// Using the generator to calculate Fibonacci numbers lazily
const fibonacciGenerator = calculateFibonacci();

// Calculate the first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacciGenerator.next().value);
  // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
}

/**
 * Iterate over large data sets
 * Generators allow you to iterate over large data sets without loading all the data into memory at once.
 *
 */

function* iterateLargeData(): Generator<number> {
  const data = Array.from({ length: 1000000 }, (_, index) => index + 1);

  for (const item of data) {
    yield item;
  }
}

// Using the generator to iterate over the large data set
const dataGenerator = iterateLargeData();

for (const item of dataGenerator) {
  console.log(item);
  // Perform operations on each item without loading all data into memory
}

/**
 * Using generators recursively
 *
 * Since yield is an expression, yield* can be used to delegate to another iterable object
 *
 */

function* readFilesRecursive(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readFilesRecursive(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

for (const file of readFilesRecursive("/path/to/directory")) {
  console.log(file);
}

// We can also use yield to pass a value to the generator.
// const input = yield value;
