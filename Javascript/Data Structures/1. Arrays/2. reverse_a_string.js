function reverse(string) {
  const array = string.split("");
  const resArray = [];
  for (let i = array.length - 1; i >= 0; i--) {
    resArray.push(array[i]);
  }
  return resArray.join("");
}

console.log(reverse("Shahrukh Tramboo"));
