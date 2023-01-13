const array = [1, 2, 3];

function getMaxNumber(arr) {
  return Math.max.apply(null, arr);
}

getMaxNumber(array); // should return 3

/*

Math.max( ) takes nums as args and returns back the max number.
we use apply() to borrow this method from Math, which is a built-in object in JS.
we didn't give this borrowed method to any other objs, instead, we just want the result from this method. 
that's why the first arg is null, since apply() takes arr of args as the second arg, we just pass the arr in.

so the button line is that this is just another way to use Math.max() when you don't want use spreator.

Math.max( ...arr ) is same as Math.max.apply(null, arr)

*/
