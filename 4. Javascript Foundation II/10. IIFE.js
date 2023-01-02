// global variables are bad with a lot of issues

// Immediately invoked function expression

// the idea was to avoid collisions by providing all variables in local scope

// the js engine wont see function as the first item it will see brackets so its not a declaration but an expression

(function () {
  var a = 1;
})();

a; // a is not defined

// function(){}(); // you cant call the function declaartion immediately

/*

    STACK
    =====

    anonymous() => variable environment (which allows us to attach the private data that can be accessed by global execution context)
    Global execution context

*/

/*
(function () {
  var a = 1;
}());

*/

// nothing happens, we are still following js rules

// ===============================================

// what if we have two files

/*
<html>
  <body>
    <script>
    */
function a() {
  return "5";
}
/*
    </script>
    <script>
    */
function a() {
  return "hahahahah";
}
/*
    </script>
  </body>
</html>

calling a() in console goves "hahahahah"

*/

// this above will pollute global namespace

// so how to solve it?

// back in the days we used expressions like below

/*
<html>
  <body>
    <script>
    */
var scritpt1 = (function () {
  function a() {
    return "5";
  }

  return {
    a: a,
  };
})();
/*
    </script>
    <script>
    */
function a() {
  return "hahahahah";
}
/*
    </script>
  </body>
</html>

now within script1.a()
we have the value as 5

we still have global variable as script1, 
but we only have one variable, so it can have many properties, that pollutes global namespace once

jquery used to do this a lot

$('hi').click(function(){
    $('h1').hide();
})

jquery added $ to its window object

we can do

> window.jQuery
> window.$

if we do sth like this

*/
var scritpt1 = (function (OMG) {
  OMG("hi").click(function () {
    OMG("h1").hide();
  });
})(jquery);
/*

  The above should still work right?
  YES!
  we have added jQuery from global namespace as an argument
  The interesting thing that we have a bit of performance improvement
  when we used $, we would go up the scope chain to find $ sign and what it means,
  but this time as we have added variable as a parameter, so we get a speed boost

*/
