// Awaited take ssomething you pass it, and it call await on it
// ReturnType does the same thing but for functions , gets us the return type
// ReturnType only allows us to pass certain types, we can only pass functions
// see the ReturnType documentation we see

// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
// so to remove error we will extend our type with
//  (...args: any) => any

type Result1 = Awaited<Promise<string>>; // sets type to string

type Result2 = ReturnType<() => string>; // sets type to string

type GetPromiseReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;

// result is typed as { firstName: string; lastName: string }
// MAGIC!
type Result = GetPromiseReturnType<
  () => Promise<{ firstName: string; lastName: string }>
>;

// we cannot pass string
type ErrorLine = GetPromiseReturnType<string>;
