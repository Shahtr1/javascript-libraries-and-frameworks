// Static vs Dynamic arrays

/*
    Static
    ======

    lookup      O(1)
    push        O(1)
    insert      O(n)
    pop         O(n)

    static says ahead of time how much memory it wants


    Dynamic
    =======
    lookup      O(1)
    append      O(1) can be O(n)
    insert      O(n)
    delete      O(n)

    dynamic arrays lets us copy the array in new location with new memory
    JS has dynamic arrays
*/

// How to build an array
class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    return this.data[index];
  }

  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  delete(index) {
    const item = this.data[index];
    this.shiftItems(index);
  }

  shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }
}

const newArray = new MyArray();
newArray.push("hi");
newArray.push("you");
newArray.push("!");
newArray.delete(0);
newArray.push("are");
newArray.push("nice");
console.log(newArray);
