type Obj = {
  id: string;
  name: string;
  age: number;
};

type StringKeys = {
  [K in keyof Obj]: Obj[K] extends string ? K : never;
}[keyof Obj];

const id: StringKeys = "id";

export {};
