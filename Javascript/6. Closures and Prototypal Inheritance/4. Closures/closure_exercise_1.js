function callMeMaybe() {
  const callme = "Hi! I am now here!";
  setTimeout(function () {
    console.log(callme); // closure
  }, 4000);
}

callMeMaybe();
