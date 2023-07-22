type Obj = {
  id: string;
  name: string;
  age: number;
};

// Object.values on the type level
type ValuesOf<T> = T[keyof T];

type ExtractStringKeys<TObj> = ExtractKeysWhereValuesAreOfType<TObj, String>;

type ExtractKeysWhereValuesAreOfType<TObj, TCondition> = ValuesOf<{
  // map type
  [K in keyof TObj]: TObj[K] extends TCondition ? K : never;
}>;

const id: ExtractStringKeys<Obj> = "id";

// Immediate indexed mapped type

export {};
