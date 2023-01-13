// Javascript Engine
// It allows us to get js file to make computer understand our file
// There are tons of engines called ECMAScript engines
// V8 was released by Google in 2008, before than most browsers used basic engines and was slow.
// V8 is used in Google Chrome, Node.js and V8.NET.
// V8 is written in C++
// So This reads our code and runs it.

// Who created very first engine?
// Brendan Eich (Spidermonkey used by firefox still these days

// So what does engine do?
// we give it the js file, first it does is the lexical analysis.
// which breaks the code in sth called token, and these tokens are formed into AST(Abstract Syntax tree) and after it gets to interpreter

// ==============================================================
// ==============================================================

// Interpreters and Compilers
// Interprests can be up and running very fast
// Compilers can take time to get up but they do optimizations like

for (let i = 0; i < 10000; i++) {
  getValueof9(); // returns the value of 9
}

// interpreter in the above example will take time to run all fuhctions
// compiler will optimize it like this

for (let i = 0; i < 10000; i++) {
  9; // compiler is smart
}

// But can we combine the best of both worlds?

// So there was JIT compiler
// Just in Time compiler

// V8 uses this under the hood

// so after code gets send to Interpreter called ignition and it takes that AST and chanes it it bytecode(its not that much low level)

// goes to Profiler (for optimizations) if same code runs at multiple times we pass that code to compiler or JIT compiler, and the compiler compiles it and try to optimize it and gives optimized machine code and the compiler is called Turbofan.
