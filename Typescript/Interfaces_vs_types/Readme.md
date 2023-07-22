Interfaces are faster than types
(speed in terms of type checkup)

Interfaces can only be used for some things, objects, function
Types can be used for everything

Interfaces have some properties.

One interface can inherit from another interface, types can do that too

```js
interface Animal {
  name: string;
}

interface Cat extends Animal {
  meow(): void;
}

type Animal = {
  name: string,
};

type Cat = Animal & {
  meow(): void,
};
```

So are they same?
No.

Interfaces have many features like this:

1. Declaration merging:
   two interfaces defined in same file with same name, will be merged

   Critical feature of ts, if it wants to append different things to window object like this

```js
declare global{
    interface Window{
        myGlobal:string
    }
}
```

types cant be appended to like interfaces

Use types unless you need a specific reason for interfaces
If you need a type that extends another type then use interfaces

types are predictable
