# HOW TO GUIDE FOR LODASH

```js
const _ = require('lodash');
```

**_<ins>Some useful functions:</ins>_**

## Manipulating Strings

### 1. Deburr
```js
	> _.deburr("déjà vu");
	'deja vu'
```
* It strips the symbols that are not in normal latin set

### 2. Escape
```js
	> _.escape("this & string");
	'this &amp; string'
```
* It converts the charaters into their html equivalent.

### 3. Unescape
```js
	> _.unescape('&lt;h1&gt;tag&lt;/h1&gt;')
	'<h1>tag</h1>'
```
* It reverses the escape process.

## Manipulating Arrays

### 1. Intersection
```js
	> _.intersection([1,2,3,4,5],[3,4,5])
	[3,4,5]
```
* It gives the array of values that occur in all the given arrays

### 2. IntersectionBy
```js
	> _.intersectionBy([2,4,5,6],[4,8,10], i=>i/2)
	[4]
```
* It takes an additional parameter where we can supply a function which determines how elements are compared

### 3. IntersectionWith
```js
	> var obj1 = [{a:1,b:2},{a:2,b:3}]
	> var obj2 = [{a:1,b:1},{a:1,b:2}]
	> _.intersectionWith(obj1, obj2, _.isEqual)
	[{a:1,b:2}]
```
* It can compare objects inside array

### 4. Union
```js
	> _.union([1,2,2,3],[2,2,3,4])
	[1,2,3,4]
```
* It gives us union of unique elements

##### Same is for _<ins>UnionWith</ins>_ and _<ins>UnionBy</ins>_ as for _<ins>IntersectionWith</ins>_

### 5. Zip
```js
	> _.zip([1,2,3,4], [10,20,30,40,50], [2,4,6,8])
	[[1,10,2], [2,20,4], [3,30,6], [4,40,8], [undefined,50,undefined]]
```
* flips rows and columns

##### _<ins>Unzip</ins>_ does the opposite

### 6. Chunk
```js
	> _.chunk(['a','b','c','d'], 2)
	[['a','b'], ['c','d']]
```
* Splits array as defined

### 7. Compact
```js
	> _.compact([undefined,null,0,1,2,3])
	[1,2,3]
```
* Removes falsy values from array like 0, false, '', null, undefined, NaN

### 8. Uniq
```js
	> _.uniq([1,2,3,4,5,5])
	[1,2,3,4,5]
```
* It gives a unique value only from the first array, so it differs from _union_ there

##### Same is for _<ins>UniqWith</ins>_ and _<ins>UniqBy</ins>_ as for _<ins>IntersectionWith</ins>_
##### We also have _<ins>SortedUniq</ins>_ and _<ins>SortedUniqBy</ins>_ which only work on Sorted arrays, to make it fast 

### 9. Xor
```js
	> _.xor([1,2], [3,4])
	[1,3]
```
* It gives a different values from arrays

##### Same is for _<ins>XorWith</ins>_ and _<ins>XorBy</ins>_ as for _<ins>IntersectionWith</ins>_

### 10. Difference
```js
	> _.difference([1,2,3,4,5], [3,4,5])
	[1,2]
```
* It gives the difference between the first and second array, elements of first array which do not appear on the second

##### Same is for _<ins>DifferenceWith</ins>_ and _<ins>DifferenceBy</ins>_ as for _<ins>IntersectionWith</ins>_

### 11. Flatten
```js
	> _.flatten([1,[2,[3,4]],5])
	[1,2,[3,4],5]
```
* It flattens an array by one level

### 12. FlattenDeep
```js
	> _.flattenDeep([1,[2,[3,[4]]],5])
	[1,2,3,4,5]
```
* It flattens an array by all levels

##### For _<ins>FlattenDepth</ins>_ we can give number for levels as second argument

### 13. ZipObject
```js
	> _.zipObject(['a','b','c'], [1,2,3])
	{a:1,b:2,c:3}
```
* It zips keys and values together as an object

### 14. ZipObjectDeep
```js
	> _.zipObjectDeep(['a.b'], [1])
	{a:{b:1}}
```
* It supports property paths too


## Manipulating Collections

### 1. FlatMap
```js
	> _.flatMap([1,2,3,4], i=>[i,i])
	[
		1,1,2,2,
		3,3,4,4
	]
```
We can also pass index along with value
```js
	> _.flatMap([1,2,3,4], (v,i)=>`${i}:${v}`)
	[ '0:1', '1:2', '2:3', '3:4' ]
	
```
* It returns an array which has been flattenend by running all the elements through the iteratee function and then flattening the results

### 2. FlatMapDeep
```js
	> _.flatMapDeep([1,[[2],[22]],[3],4], i=>[[[i,i]]])
	[
		1,1,2,22,2,
		22,3,3,4,4
	]
```
* It recursively flattens the result that has been mapped

##### For _<ins>FlatMapDepth</ins>_ we can give number for levels as second argument

## Language Functions

### 1. Eq and isEqual
```js
	> _.eq("a","a")
	true
	> _.eq({a:1},{a:1})
	false
	> _.isEqual({a:1},{a:1})
	true
```

### 2. Clone
```js
	> _.clone({a:1,b:2})
	{a:1,b:2}
```
* It makes a shallow copy of a given object

##### For _<ins>CloneDeep</ins>_ it does a deep clone rather than a shallow clone

## Util & Date Functions

### 1. Constant
```js
	> var f = _.constant(2)
	> f()
	2
```
* It creates a function that returns a constant value

### 2. Stub Functions (StubArray, StubFalse, StubTrue, StubObject, StubString)
```js
	> _.stubString()
	''
	> _.stubFalse()
	false
	> _.stubTrue()
	true
	> _.stubObject()
	{}
	> _.stubArray()
	[]
```
* It creates a function that returns a constant value

### 3. Times
```js
	> var i = 10
	> _.times(5, j=>j+=i)
	[10,11,12,13,14]
```
* It will call a given function a specific no. of times

### 4. Cond
```js
	> var f = _.cond([
			[_.matches({a:1}), _.constant('a')],
			[_.matches({b:2}), _.constant('b')],
			[_.stubTrue, _.constant('nomatch')]
		]);
	> f({a:1})
	'a'
	> f({b:2})
	'b'
	> f({a:2})
	'nomatch'
```
* It works like if else statements

### 5. Flow
```js
	> const sq = (n) => n*n;
	> const div = (n) => n/2;
	> var func = _.flow([sq, div])
	> func(10, 20)
	50
```
* It calls functions sequentially

##### For _<ins>FlowRight</ins>_ it calls the functions from right side

### 6. Mixin
```js
	> var isEven = (number) => number%2 === 0
	> isEven(4)
	true 
	> _.mixin({isEven: isEven})
	> _.isEven(6)
	true
```
* Create a custom function and have it available to be used in lodash

### 7. BindAll
```js
	> var Sheep = function(name){
			this.name = name;
			this.giveWool = function(){console.log(this.name + ' gives wool')}
		}
	> Sheep.prototype.baa = function(){console.log(this.name + ' says baa!')}
	> var sheep1 = new sheep('simon')
	> var sheep2 = new Sheep('sally')
	> sheep1.baa()
	simon says baa!
	> sheep2.giveWool()
	sally gives wool
	> var func = sheep1.baa
	> var func2 = sheep1.giveWool
	> func()
	undefined says baa!
	> func2()
	undefined gives wool
	> _.bindAll(sheep1, 'baa')
	> _.bindAll(sheep1, 'giveWool')
	> var func = sheep1.baa
	> var func2 = sheep1.giveWool
	> func()
	simon says baa!
	> func2()
	simon gives wool
	> sheep1 = undefined
	> func()
	simon says baa!
	> func2()
	simon gives wool
	> var func3 _.bind(sheep2.baa, sheep2)
	> func3()
	sally says baa!
	// not much difference between bind and bindAll
	> sheep2 = undefined
	> func3()
	sally says baa!
```
* This function makes it possible to replace a function on an object with an another function which shares the same name and implementation but it is also bound to that object

## Manipulating Objects

### 1. Create
```js
	> function Vehicle(){
			this.Wheels = 4;
			this.Speed = 0;
		}
	> function Car(){
			Vehicle.call(this);
		}
	> var a = new Car
	> a instanceof Car
	true 
	> a instanceof Vehicle
	false 
	> a
	Car {Wheels: 4, Speed: 0}
	> Car.prototype = _.create(Vehicle.prototype, {'constructor': Vehicle})
	> var a = new Car
	> b instanceof Vehicle
	true 
	> b
	Vehicle {Wheels: 4, Speed: 0}
```
* Create same prorotypes bia inheritance

## Manipulating Functions

### 1. Before
```js
	> var f1 = _.before(5, ()=>_.random(20))
	> f1()
	11
	> f1()
	20
	> f1()
	18
	> f1()
	19
	> f1()
	19
	> f1()
	19
	> f1()
	19
	> f1()
	19
	> f1()
	19
	
```
* Invoke a function upto but not including the specified no. of times, after that it will just repeat the value of that specified function

### 2. After
```js
	> var f1 = _.after(5, ()=>_.random(20))
	> f1()
	undefined
	> f1()
	undefined
	> f1()
	undefined
	> f1()
	undefined
	> f1()
	undefined
	> f1()
	11
	> f1()
	19
	> f1()
	18
	> f1()
	20
	> f1()
	18
	
```
* it waits a specified no. of times before executing the given function.

### 3. Defer
```js
	> _.defer(()=>{})
```
* Wait for the javascript core stack to be clear before the function is invoked

### 4. Memoize
```js
	> var object = {a:10,b:20}
	> _.values(object)
	[10,20]
	> var mem = _.memoize(_.values)
	> mem(object)
	[10,20]
	> object.a = 15
	> _.values(object)
	[15,20]
	> mem(object)
	[10,20]
```
* It creates a cached version of function, it keeps returning the same result of function

### 5. Throttle
```js
	> var action = () => console.log('my action');
	> var f = _throttle(action, 10000);
	> setTimeout(f, 1000)
	'my action'
	// if you try again instantly, it wont output anything, it will only output after 10 seconds
```
* It invokes a function atmost once every miliseconds.

### 6. Debounce
```js
	// same as throttle
```
* It invokes a function atmost once every miliseconds so similar to throttle, it differs in if a function is invoked again while waiting period, the waiting period will be resetted

### 7. Unary
```js
	> var f = function(a,b){
			console.log(a,b);
			if(a && b){
				return a + b;
			}
			else return a;
		}
	> f(10, 20)
	10 20
	30
	> var f2 = _.unary(f)
	> f2(10, 20)
	10
	10
```
* Takes only one prameter ignores the rest

##### For _<ins>ary</ins>_ you can supply an additinal argument to control inclusion

### 8. Curry
```js
	> var character = (name, type, stamina, attack) => console.log(name, type, stamina, attack)
	> character('darnak', 'wizard', 6, 8)
	darnak wizard 6 8
	> var charactercurry = name=>type=>stamina=>attack=>console.log(name, type, stamina, attack)
	> charactercurry('darnak')
	[Function]
	> var f1=charactercurry('darnak')
	> var f2 = f1('wizard')
	> var f3 = f2(6)
	> var f4 = f3(8)
	darnak wizard 6 8
	// as the syntax is complicated we can use curry function
	> var curried = _.curry(character)
	> curried('darnak')('wizard')(6) (8)
	darnak wizard 6 8
	> curried(('darnak')('wizard')6 8 )
	darnak wizard 6 8
	> curried('darnak', 'wizard', 6, 8)
	darnak wizard 6 8
```
* It will create a new function that will accept arguments of the given function. And then it will either execute that function and return the result, or it returns another function and accepts more arguments. And this will keep repeating till there are no more arguments.

##### For _<ins>curryRight</ins>_ arguments are applied from right side

## Sequencing and Chaining

### 1. `_(Value)` Wrapped
```js
	> var array = [1,2,3]
	> _.join(array, ':')
	'1:2:3'
	// or we can do is reverse
	> _(array).join(':')
	'1:2:3'
```
* It is a new way

### 2. Unwrapping values
```js
	> _([1,2,3]).concat([4,5,6])
	LodashWrapper {
	  __wrapped__: [ 1, 2, 3 ],
	  __actions__: [ { func: [Function: concat], args: [Object], thisArg: [Function] } ],
	  __chain__: false,
	  __index__: 0,
	  __values__: undefined
	}
	// wrapper

	> _([1,2,3]).join(':')
	'1:2:3'
	// no wrapper

	> _([1,2,3]).concat([4,5,6]).value()
	[1,2,3,4,5,6]
	> _([1,2,3]).concat([4,5,6]).valueOf()
	[1,2,3,4,5,6]
	> _([1,2,3]).concat([4,5,6]).toJSON()
	[1,2,3,4,5,6]
```
* Sometimes we get wrapper things as an output rather than result, to get the value use value of, due to wrapper we can chain functions
* Methods that return a single value or may return a primitive value will automatically end the chain sequence and return the unwrapped value

### 3. Chaining
```js
	> _([1,2,3,4,5]).reverse().first()
	5
	> _([1,2,3,4,5]).tap(function(array){array.pop()}).reverse().first()
	4
```
* It intercepts whats coming


# _<ins>THANK YOU!</ins>_




















