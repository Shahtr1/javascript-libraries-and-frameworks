/*
In TypeScript, the indexed access type is denoted by using square brackets [].
 It is a way to access the type of a property in an object type based on its key (property name).

 The syntax for the indexed access type is as follows:
 
 T[K]

 Here, T is the object type, and K is the type of the property key you want to access.

 When K is a union of keys (as obtained from keyof T), 
 using T[K] results in a union of all the types of the properties in T corresponding to the keys in K.

 */

type ExampleObject = {
  name: string;
  age: number;
  isActive: boolean;
};

type Result = ExampleObject[keyof ExampleObject];
