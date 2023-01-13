/*

*/

const obj = { name: "Andrei" };
function clone(obj) {
  return { ...obj }; // this is pure
}

obj.name = "Nana"; // this is mutating the state

function updateName(obj) {
  const obj2 = clone(obj);
  obj2.name = "Nana";
  return obj2;
}
