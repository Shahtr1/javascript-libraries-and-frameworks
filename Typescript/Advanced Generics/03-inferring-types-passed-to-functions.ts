// You dont always have to pass the types to a generic function!

const addIdToObject = <TObj>(obj: TObj): TObj & { id: string } => {
  return { ...obj, id: "123" };
};

// we can do this, or let our compiler do this for us
// const result = addIdToObject<{ firstName: string; lastName: string }>({
//   firstName: "Shahrukh",
//   lastName: "Tramboo",
// });

// removing whole type annotation infers the type argument from its runtime arguments
const result = addIdToObject({
  firstName: "Shahrukh",
  lastName: "Tramboo",
});

console.log(result);
