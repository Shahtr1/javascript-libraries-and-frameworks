// #1
// Date object => to have new method .lastYear() which shows you laste year 'YYYY' format.
new Date("1990-10-10").lastYear();
// '1899'

// #Bonus
// Modify .map() tp print '*' at the end of each ite
console.log([1, 2, 3].map());
// 1*, 2*, 3*

// ==================================================
// Solution 1
// ==================================================

Date.prototype.lastYear = function () {
  return this.getFullYear() - 1;
};

new Date("1990-10-10").lastYear(); // '1899'

Date.prototype.lastYear = () => {
  // this will get error with arrow function
  // 'this' will refer to the function
  console.log(this);
  return this.getFullYear() - 1;
};

// ==================================================
// Solution Bonus
// ==================================================

Array.prototype.map = function () {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(this[i] + "*");
  }

  return arr;
};

console.log([1, 2, 3].map());
// 1*, 2*, 3*

// But its dangerous, what is someone needs old functionality
// WE SHOULD NEVER MODIFY THE EXISTING METHODS
