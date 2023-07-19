// Why is this allowed?
const emptyObj: {} = 123;

const emptyObj2: {} = null;
const emptyObj3: {} = undefined;

// any falsy or truthy
const emptyObj4: {} = false;

const emptyOb5: {} = {
  foo: "asd",
};

// How would we make this error correctly?
// const receivesEmpty = (empty: {}) => {};
const receivesEmpty = (empty: Record<PropertyKey, never>) => {};

// Should error:
receivesEmpty("str");
receivesEmpty({ foo: true });
receivesEmpty({});
