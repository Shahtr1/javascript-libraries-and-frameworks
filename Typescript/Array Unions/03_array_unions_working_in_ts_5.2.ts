// using ts 5.2
interface Fizz {
  id: string;
  fizz: number;
}

interface Buzz {
  id: string;
  buzz: number;
}

const func = (arr: Array<Fizz> | Array<Buzz>) => {
  // this gives error below 5.2 tsc
  arr.filter((member) => {});
};

const func2 = (arr: Array<Fizz | Buzz>) => {
  arr.filter((member) => {});
};
