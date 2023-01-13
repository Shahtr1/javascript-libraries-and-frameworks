// Indempotence
function notGood(num) {
  return Math.random(num);
}

notGood(5);

/*
    Indempotence means,
    given the same input in a function we get the same result and that function always does what we expect it to do
    even though we are talking to outside world

    or calling yourself over and over and getting the same result
*/

Math.abs(Math.abs(-50)); // always return the same thing
