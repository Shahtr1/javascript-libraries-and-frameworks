// no side effects
// function given the same inout gives the same output

const array = [1, 2, 3];
function mutateArray(arr) {
  arr.pop();
}

function mutateArray2(arr) {
  arr.forEach((element) => {
    arr.push(1);
  });
}

mutateArray(array);
mutateArray2(array);
console.log(arr); // [ 1 , 2, 1, 1 ]
// The above function has side effects
// very confusing, not sure whats happening here
// we are reuing the shared state

// solution

const array2 = [1, 2, 3];
function removeLastItem(arr) {
  const newArray = [].concat(arr);
  newArray.pop;
  return newArray;
}
function multiplyBy2(arr) {
  // map automatically returns us a new array
  return arr.map((item) => item * 2);
}

removeLastItem(array2);
multiplyBy2(array2);
console.log(array2);

// no side effects

// ===================================================================
// ===================================================================

// Is this a pure function?
function a() {
  console.log("hi");
}

a();

// NO
// we are using the browser to log sth, its modifying sth outside

// Will function always return the same output given the same input?
// This is called REFERENTIAL TRANSPARENCY!
// YES

// ===================================================================
// Can everything be pure?
// ===================================================================

// NO
// A program cannot exist without the side effects
