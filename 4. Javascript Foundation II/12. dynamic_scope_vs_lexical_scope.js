const a = function () {
  console.log("inside a ==========>", this);
  const b = function () {
    console.log("inside b ==========>", this);
    const c = {
      hi: function () {
        console.log("inside c ==========>", this);
      },
    };
    c.hi();
  };
  b();
};

a();

/*
// RESULT 

inside a ==========> window
inside b ==========> window
inside c ==========> { hi: [Function: hi] }

*/

/*
    it almost looks like lexical scope doesnt work with this, it deosnt really matter where we write it
    all it matters is how the function is called
*/

const obj = {
  name: "Billy",
  sing() {
    console.log("a", this);
    var anotherFunc = function () {
      console.log("b", this);
    };
    anotherFunc();
  },
};

/*
    // RESULT

    a {name: 'Billy', sing: f}
    b Window


    > How is b showing Window object? 
    this keyword is not lexically scoped
    obj.sing() ran, and inside this another func ran
    obj didnt really call another func, sing function did

    Everything in js is lexically scoped except this, which is dynamically scoped(how the function is called)
    How do we fix it?
    we can solve it by arrow functions
    arrow functions are lexically bound
*/

const objWithArrowFunction = {
  name: "Billy",
  sing() {
    console.log("a", this);
    var anotherFunc = () => {
      console.log("b", this);
    };
    anotherFunc();
  },
};

/*
    // RESULT

    a {name: 'Billy', sing: f}
    b {name: 'Billy', sing: f}
*/

// But what did we do before we had arrow functions?

const objBeforeArrowFunction = {
  name: "Billy",
  sing() {
    console.log("a", this);
    var anotherFunc = function () {
      console.log("b", this);
    };
    return anotherFunc.bind(this);
  },
};

obj.sing()();

/*
    // RESULT

    a {name: 'Billy', sing: f}
    b {name: 'Billy', sing: f}
*/

// ===================================================
// ONE MORE WAY!

const objBeforeArrowFunctionOneMoreWay = {
  name: "Billy",
  sing() {
    console.log("a", this);
    var self = this;
    var anotherFunc = function () {
      console.log(self);
    };
    return anotherFunc.bind(this);
  },
};

obj.sing()();
