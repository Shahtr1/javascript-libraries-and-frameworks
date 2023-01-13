/**

    The memory heap is where the mempry allocation happens
    The call stack is where the engine keeps track of where the code is in its execution

 */

const number = 610; // allocate memory for number variable
const string = "some text"; // allocate memory for a string
const human = {
  // allocate memory for an object... and its values
  first: "Andrei",
  last: "Neagoie",
};

// Memory is just a large region in memory that js engine provides for us, which can be used to store in any order

function subtractTwo(num) {
  return num - 2;
}

function calculate() {
  // this function is going to be allocated in memory
  const sumTotal = 4 + 5;
  return subtractTwo(sumTotal);
}

calculate(); // will look in memory and run it

// everytime we run this code we use Call Stack
// So we can say Call stack is a region in memory which operates in last in first out mode

// calculate() will be added on top of stack and when it finished calling, it will get removed
