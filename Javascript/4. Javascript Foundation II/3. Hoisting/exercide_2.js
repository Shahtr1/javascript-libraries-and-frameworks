function bigBrother() {
  function littleBrother() {
    return console.log("it is me!");
  }
  return littleBrother();
  function littleBrother() {
    return console.log("no me!");
  }
}

bigBrother();

// no me!
