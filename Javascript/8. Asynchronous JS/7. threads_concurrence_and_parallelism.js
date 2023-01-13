/*
    Where does the WebApi have this compute power to run these things?
    These are still executed in threads outside of js

    browser runs one thread per tab, and as tab closed that thread dies

    Browser has 'Web Workers' that work in background for us
    In Node its called 'Worker threads'

    How can we create sth like that?
*/

var worker = new Worker("worker.js"); // it can read worker file
worker.postMessage("hello"); // to post message to a different thread

// in a differen tthread we can say, listen to a message
addEventListener("message");

// web wroker is a program running on a different thread

// In node, in background, node reads for us from the database
