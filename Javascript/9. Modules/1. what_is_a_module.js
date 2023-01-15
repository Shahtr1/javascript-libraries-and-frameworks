// ==========================================================
// Tight coupling example
// ==========================================================

var user = {};

function signIn(user) {
  var textField = "heheh";
}

function isHuman(user) {
  // ...
}

// hard to debug code
// polluting the global namespace here too

// ============================================================
// Solution
// ============================================================

/*
    We can create different script files, but it will also be one file, so NOT A SOLUTION.

    // ============================================================
    // Module Pattern
    // ============================================================

    The very first way: Module pattern

    //Global Scope
        // Module Scope
            // Function Scope
                // Block Scope

*/

// IIFE
// Module Pattern
var fightModule = (function () {
  return { fight: "start" };
})();

// we can can call in global module like this
// we are only exporting fight object here
fightModule.fight;

// jquery had that pattern

{
  /* 
    <script>
        jquery cdn
    </script>
    <script>
        var globalSecret = '1234
        var fight = 'hahaj'
    </script>
    <script>
        var script2 = (function($, globalSecret){
            globalSecret = '0'
            $ = undefined; // we cant modify the global $ here
        })(jquery, globalSecret)
    </script>

    The above code wont change global globalSecret, because it has a variable inside its scope as parameter

*/
}

// =============================================================================
// Pros
// =============================================================================

/*
    A module is self contained now,
    we can modify global variables inside a function, but that wont effect other parts of code
    updating a single module is easier, when its decoupled
*/

// =============================================================================
// Cons
// =============================================================================

/*
    We are still polluting the namespace 
    we can override fightModule
    we dont know all the dependencies, order is very important
*/
