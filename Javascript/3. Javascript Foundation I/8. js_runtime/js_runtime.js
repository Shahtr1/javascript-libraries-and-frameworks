/**

    as js is single threaded, so one stack and one heap.
    but its slow, so this is where runtime comes in.
    the web browser is working in the background while the sync js is running.
    Its using the Web API to communicate and let the js engine know the data

    Web API comes with browser, all of them have their js engine implementation and all of them have a js runtime that provide a web api.
    These web api can do variety of things like
    1.  send https requests
    2.  listen to dom events
    3.  click on events
    4.  delay execution
    5.  caching and database storage

    type window in console you will get the web api that is provided by the browser

    These web api's are asynchronous

 */

/**

    we have items on call stack, and as soon as some part of web api comes up, 
    it tells web api to take care of it, and web api is working on it in the background

    and when its done it says here's the data and here is the callback
    and event loop is going to say as soon as the call stack is free, it says i have something for you, would you like to add it onto the stack
    and its going to push callback onto the stack

 */
