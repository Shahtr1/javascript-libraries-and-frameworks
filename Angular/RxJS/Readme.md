- What are observables?
  Observables are wrappers around a data source, data can come from any asynchronous operations.
  We can observe a data emitted from a source
  We can observe Observable with objects, we call them Observers
  Observers are responsible for receiving the data after observable has emitted the data.
  An Observer establises a connection with he Observable which is called Subscription

- Two types of Operators:

1.  Creation Operators
    Create new observables
    it will act as wrapper around producer of data, such as fromEvent, timer, interval, of, from

2.  Pipeable Operators
    Takes an observable as an input and outputs a new observable
