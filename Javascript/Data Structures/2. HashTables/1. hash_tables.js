/*
    hash tables use hash functions to find stuff
*/

/*
    A hash function is a function that generates a value of fixed length for each input
    like md5, SHA-1, SHA-256 etc

    Its one-way
    we get really fast data access

    hash function will take our key gets some gibberish, and then convert it into index space
    we need hash function to be very fast

    SHA-256 takes a very long time
*/

/*
    insert          O(1)
    lookup          O(1)
    delete          O(1)
    search          O(1)
*/

let user = {
  age: 54,
  name: "Kylie",
  magic: true,
  scream: function () {
    console.log("ahhhhh!");
  },
};

user.age; // O(1)
user.spell = "abra kadabra"; // O(1)
user.scream(); // O(1)

/*
    CONS
    ====
    if space is less, collisions can happen, it can generate same location twice, called hash collisions, which slows down reading and writing
    we can solve it by linked lists
*/
