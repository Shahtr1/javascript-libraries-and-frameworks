/*
    Infer lets you find something about the thing you are investigating.
    Instantiate that variable and then reuse that variable however you want to.

    We can only use it with conditional type
*/

export {};

type Result = true extends boolean ? 1 : 0;

const func = (check: boolean) => {
  return "a valid string";
};

type FuncResult = ReturnType<typeof func>;

type Result2 = typeof func extends (...args: any) => infer R ? R : never;

/*
    extends (...args: any) => infer R
    is like a pattern match
    and then we are extracting the return type and setting it to R
    just like in the below example
*/

const str = `hello_world-friend`.replace(/(_|-)/g, (item) => {
  return `${item}${item}${item}`;
});

/*
    `never` is an important type in typescript which tell you that it shouldnt be possible.
    it just vanishes from the type
*/

const whatever = {};

type Result3 = typeof whatever extends (...args: any) => infer R ? R : never;

type something = "12343434" | Result3 | 1234 | (Result2 & {});

// create a dynamic type now

type FakeReturnType<T> = T extends (...args: any) => infer R
  ? R extends string
    ? `${R}_return_type`
    : never
  : never;

type Result4 = FakeReturnType<typeof func>;

//   or we can write above code as, to make it clean

type FakeReturnType2<T> = T extends ((...args: any) => infer R extends string)
  ? `${R}_return_type`
  : never;

type Result5 = FakeReturnType<typeof func>;

type GetFromDeepObject<T> = T extends
  | { a: { b: { c: infer C } } }
  | { c: infer C }
  | { a: { c: infer C } }
  ? C
  : never;

type C = GetFromDeepObject<{ a: { b: { c: number } } }>;

type C2 = GetFromDeepObject<{ a: { c: boolean } }>;
