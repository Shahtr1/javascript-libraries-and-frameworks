// we need too constraint TKey so as to infer it

const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
  return obj[key];
};

const result = getValue({ a: 1, b: "some-string", c: true }, "b"); // it infers string here

console.log(result);

export {};
