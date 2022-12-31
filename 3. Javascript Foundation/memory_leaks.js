let array = [];
for (let i = 5; i > 1; i++) {
  array.push(i - 1);
  // will run an infinite loop and WILL CRASH THE BROWSER!
}

/**
    
    Memory leaks are peices of memory that the application has used in the past but is not needed any longer but has not yet been returned back to us.

    There are three common memory leaks
    1.  Global variables
    > var a = 1;
    > var b = 1;
    > var c = 1;

    2.  Event listeners
    var element = document.getElementById('button');
    element.addEventlistener('click', onClick)

    // we keep adding listeners but we never remove them, and memory leak is created

    3.  setInterval
    setInterval(()=>{
        // referencing objects..
        // these objects will never be collected by GC as it will keep running and running and running...
    })

 */
