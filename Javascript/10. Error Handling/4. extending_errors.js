class authenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "authenticationError";
  }
}

throw new authenticationError("oopsie");

/*
    RESULT
    ======
    Uncaught authenticationError: oopsie
    at <anonymous>:8:7

*/
