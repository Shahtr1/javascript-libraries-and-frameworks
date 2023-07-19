// Sometimes, you'll need to override the types inside the generic function with an assertion. Thats OK!

const typedObjectKeys = <TObj extends {}>(obj: TObj) => {
  return Object.keys(obj) as Array<keyof TObj>;
};

const result = typedObjectKeys({ name: "John", age: 30 });

export {};
