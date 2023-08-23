// factory functions - set up and return new objects when I call the function
const personFactory = (name, age)  => {
    const sayHello = () => console.log("hello!");
    return {name, age, sayHello};
};

const jeff = personFactory("jeff", 27);

console.log(jeff.name)  // "jeff"

jeff.sayHello() // logs "hello!"

/* same object created using the constructor pattern
const Person = function(name, age) {
    this.sayHello = () => console.log("hello!");
    this.name = name;
    this.age = age;
}

const jeff = new Person("jeff", 27);
*/

// factory function do not use the prototype, which does come with a performance penalty
// but the penalty isn't significant unless I'm creating thousands of objects

/* Object shorthand

before the object shorthand:
return {name: name, age: age, sayHello: sayHello};

with the shorthand, when I create an object where the variable has the same name as the object property:
return {name, age, sayHello};
*/

const name = "Maynard";
const color = "red";
const number = 34;
const food = "rice"; 

//  logging all the variable might be useful
// turn them into an object with curly brackets, and the output is much easier to decipher:
console.log({name, color, number, food});

/* scope - where variables and functions can be used in my code; variable access
   context - value of this
*/

"use strict";   // prevents me from polluting the root scope; if I console.log(e) below, I would get a ReferenceError

let a = 17;    // this is window.a

const func = x => {
    let a = x;  // outer variable a is not redefined, a new a is created inside the scope of that function
                // this is called a name conflict/scope conflict
                // this is func.a
    console.log(a);
};

func(99); // "99"

console.log(a) // "17"

/* by default, I am in the root scope/base scope, which is the window object
*/

var b = 1;  // makes "window.b" which equals "1"
// parent scope here - all children can access objects in the parent scope
function foo() {
// child scope here - parents cannot access objects in the child scope
/* if I define functions and variables within a new scope, it's inaccessible outside of that current parent scope
each function defined has its own (nested) local scope
any function defined within another function has a local scope which is linked to the outer function 
*/
// c is created in the scope of this function, not in the root scope 
    var c = 2; 
}

foo();

var d = 3;

function bar() {
    d = 4;
    // var d = 4 would not reassign d
}

bar();

console.log(d);     // 4
                    // the child scope has access to the parent scope, reassigns d to 4
                
function baz() {
    e = 5; // JS will keep searching for e in parent scopes, of higher and higher order
}

baz();

console.log(e); // 5 because e is now equal to window.e which is equal to 5

// polluting the root scope/trying to keep the root scope clean means not putting "var" on a variable in the child scope
// every object in my app with have access to that variable if it isn't defined with "var"

var f = 6;

function boo() {
    var f = 7;
    console.log(f); // 7
}

function far() {
    f = 8;
    console.log(f); // 8
}

boo();
far();

console.log(f); // 8

// global scope, same as namespace
// I should create Modules/APIs that are accessible across scopes, and use global scope to my advantage
var name1 = "Todd";

// Scope A
var myFunction = function() {
    // Scope B
    var name2 = "Todd";

    
    var myOtherFunction = function() {
        // lexical scope/ static scope/ closure - the inner function has access to the scope in the outer function
        // Scope C: "name2" is accessible here
    };
};

// myOtherOtherFunction's order of call has an effect on how the scoped variables react
// here it is defined and called under another console statement
var thisFunction = function() {
    var name = "Todd";
    var thisOtherFunction = function() {
        console.log("My name is " + name)
    };
    console.log(name);  // "Todd"
    thisOtherFunction();    // "My name is Todd"
}

// lexical scope - any variables/objects/ functions defined in its parent scope are available in the scope chain
// lexical scope does not work backward
// I can always return a reference to name, but never the variable itself
// name = undefined
var scope1 = function() {
    // name = undefined
    var scope2 = function() {
        // name = undefined
        var scope3 = function() {
            var name = "Todd";  // locally scoped
        };
    };
};

/* scope chain - any function defined within another function has local scope which is linked to the outer function 
it's always the position in the code that defines the scope 
when resolving a variable, JS starts at the innermost scope and searches outwards until it finds the variable/object/function 
it was looking for */

/* closure and returning a function reference */
var sayHello = function(name) {
    var text = "Hello, " + name;
    return function() {
        console.log(text);
    }
}
/* closure -the scope inside the outer function is inaccessible to the global scope, because calling the function alone will
just return a different function */
sayHello("Todd");

// the function returns a function, so it needs assignment and then calling
var helloTodd = sayHello("Todd");   // sayHello ahs been assigned to helloTodd
helloTodd();                        // helloTodd is called/ calls the closure

sayHello("Bob")();  // calls the returned function without assignment

/* closure - returns a function or accessing variables outside of the immediate lexical scope */

/* each scope binds to a different value of this depending on how the function is invoked */
var theFunction = function() {
    console.log(this);  // this = global, [object Window]
};

var theObject = {};
theObject.theMethod = function() {
    console.log(this);  // this = Object {theObject}
};

var nav = document.querySelector(".nav");   // <nav class="nav">
var toggleNav = function() {
    console.log(this);  // this = <nav> element
};

// nav.addEventListener("click", toggleNav, false);

/* creates a new scope which is not invoked from my event handler, so it defaults to the window Object as expected */
var nav = document.querySelector(".nav");   // <nav class="nav">
var toggleNav = function() {
    console.log(this);  // <nav> element
    setTimeout(function() {
        console.log(this);  // [object Window]
    }, 1000);
};
// nav.addEventListener("click", toggleNav, false);

/* if I want to access the proper "this" value which isn't affected by the new scope, I can cache a reference to 
this value using a "that" variable and refer to the lexical binding 
lexical binding - scope of a variable is determined by its position within the code's lexical structure, rather than the order 
in which functions are called at runtime */
var nav = document.querySelector(".nav");   // <nav class="nav">
var toggleNav = function() {
    var that = this;
    console.log(that);   // <nav> element
    setTimeout(function() {
        console.log(that);   // <nav> element
    }, 1000);
};
// nav.addEventListener("click", toggleNav, false);

var links = document.querySelectorAll("nav li");
for (var i = 0; i < links.length; i++); {
    console.log(this);  // [object Window]
}                       // "this" doesn't refer to my elements; I have to change the context of how the function is called

/* .call() and .apply() - let me pass in a scope to a function, which binds the correct this value */

// make sure "this" is each element in the array
var links = document.querySelectorAll("nav li");
for (var i = 0; i < links.length; i++) {
    ( function() {
        console.log(this);  // this becomes the iterated element and use the "this" binding
    }).call(links[i]);  // pass in the current element in the Array iteration, changes the scope of the function
}

/* .call(scope, arg1, arg2, arg3) takes individual, comma-separated arguments
.apply(scope, [arg1, arg2]) takes an array of arguments 
.call() or .apply() actually invokes my function 
not doing this... 
myFunction(); */
// instead .call() handles it and chains the method
// myFunction.call(scope);     // invokes myFunction using .call()

/* .call invokes a function, but .bind does not
it binds the values before the function invoked */

// I cannot pass parameters into function references 
// nav.addEventListener("click", toggleNav(arg1, arg2), false);

// can be fixed by creating a new function inside it
// nav.addEventListener("click", function() {
//    toggleNav(arg1, arg2);
// }, false);

// .bind() lets me pass in arguments but the functions are not called
// nav.addEventListener("click", toggleNav.bind(scope, arg1, arg2), false);

/* .call(), .apply(), and .bind() are all methods used to manipulate the value of the "this" keyword within a function
and to pass arguments to the function
they have similar purposes but have slightly different ways of going about it */

// .call() - calls a function with a specified "this" value and arguments provided individually
//           "this" value is passed as the first argument followed by the individual arguments
function greet(message) {
    console.log(message + ", " + this.name);
}

const person = {name: "John"};

// person is the this value, and "Hello" is the message)
greet.call(person, "Hello");    // "Hello, John"

// .apply() - calls a function with a specified "this" value and arguments, but arguments are passed as an array
const person1 = {name: "Jen"};

greet.apply(person1, ["Hello"]);    // Hello, Jen

// .bind() - doesn't call the function immediately; instead it creates a new function with the specified "this" value and
//           arguments, which I can later call; useful when I want to create a new function with a fixed this value
const person2 = {name: "Joe"};

const greetJoe = greet.bind(person2);

greetJoe("Hello");  // Hello, Joe

/* public and private scope does not exist in JS, but can be emulated with Closures
with the JS design pattern, Module, I can create public and private scope */

// private scope - wrap my functions inside a function and keep things out of the global scope
(function() {
    var myFunction = function() {
        // do some stuff here
    };
})();
myFunction();   // Uncaught ReferenceError: myFunction is not defined

/* Module Pattern (& Revealing Module Pattern) - allows me to scope my functions correctly, using private and public
scope and an Object */

/* namespace - a container that holds a set of identifiers to prevent naming conflicts and encapsulates related functionality
under a unique name or identifier
I can simulate namespaces using objects or modules to avoid polluting the global scope with variable and function names */

// create a namespace using an object
var myApp = {};

// Adding variables and functions to the namespace
myApp.name = "My Application";

myApp.sayHello = function() {
    console.log("Hello from " + this.name);
};

myApp.calculate = function(x, y) {
    return x + y;
};

// using the namespace's functions
myApp.sayHello();   // "Hello from My Application"
console.log(myApp.calculate(5, 3)); // 8

// create a namespace using modules
// In module.js
// export const name1 = "My Application";

// export function sayHello() {
//     console.log("Hello from " + name);
// }

// export function calculate(x, y) {
//     return x + y;
// }

// // in main.js
// import * as myApp from './module';

// myApp.sayHello();   // "Hello from My Application"
// console.log(myApp.calculate(5, 3)); // 8

// Module is my global namespace and contains all my relevant code for the module
// define module
var Module = (function() {
    return {
        myMethod: function() {                          // returns my public methods which are accessible in the global scope but are namespaced
            console.log("myMethod has been called.");   // my Module takes care of my namespace and can contain as many methods as I want
        }
    };
})();

// call module + methods
Module.myMethod(); 

// I can extend the Module as I wish
var Module = (function() {
    return {
        myMethod: function() {

        },
        someOtherMethod: function() {

        }
    };
})();

// call module + methods;

/* functions that help my code work do not need to be in the global scope
only the API calls do, things that need to be accessed globally in order to work 
create private scope by NOT returning functions */
var Module = (function() {
    var privateMethod = function() {    // privateMethod cannot be called because it's privately scoped

    };
    return {
        publicMethod: function() {  // publicMethod can be called
            // has access to "privateMethod", I can call it:
            // privateMethod();
        }
    };
})();
/* privately scoped functions are things like helpers, addClass, removeClass, Ajax/XHR calls, Arrays, Objects, etc. 
Anything in the same scope has access to anything in the same scope, even after the function has been returned 
my public methods have access to my private methods, so they can still interact but are unaccessible in the global scope

I can't afford to pull all functions in the global scope as they'll be publicly available which makes them open to attacks */

// returns an Object, make use of public and private methods
var Module = (function() {
    var myModule = {};
    var _privateMethod = function() {   // underscore at the beginning of private methods, helps visually differentiate between
                                        // public and private

    };
    myModule.publicMethod = function() {

    }
    myModule.anotherPublicMethod = function () {

    };
    return myModule;    // returns the Object with public methods
})();

// useage
Module.publicMethod();

// I can use the Module to assign the function references and return an anonymous Object
var Module = (function() {
    var _privateMethod = function() {

    };
    var publicMethod = function() {

    };
    return {
        publicMethod: publicMethod,
        // anotherPublicMethod: anotherPublicMethod
    }
})();

const FactoryFunction = string => {
    const capitalizeString = () => string.toUpperCase();    // capitalizeString is a private function
    const printString = () => console.log(`---${capitalizeString()}---`);
    return {printString};   // printString is a public function
};

const taco = FactoryFunction("taco");

// printString();  // ERROR!S
// capitalizeString();  // ERROR!
// taco.capitalizeString();  // ERROR!
taco.printString();  // "---TACO---"    only way to use printString() and capitalizeString() is to return them in the object
                     //                 return {printString}
                     // I cannot access capitalizeString(), but printString() can; this is closure

/* closure - function that has access to variables from its containing function's scope, even after the containing
             function has finished executing
             it closes over the variables in its lexical scope, allowing the function to maintain access to those 
             variables even when it is executed outside its original scope
   1. (Data Encapsulation) closure allow me to create private variables; I can define variables within an outer
      function's scope and provide public functions that have access to these variables while preventing direct access
      from outside the function */
function counter() {
    let count = 0;

    return function() {
        count++;
        return count;
    };
}

const increment = counter();    // increment has access to count, but there is no direct access from outside the function
console.log(increment());   // 1
console.log(increment());   // 2

/* 2. (Module Pattern) closures enable the creation of modules
      module - self-contained units of functionality that can be easily reused and have private states 
*/
const calculator = (function() { // calculator module can be easily reused and have private states
    let result = 0; 

    return {
        add: function(x) {
            result += x;
        },
        subtract: function(x) {
            result -= x;
        },
        getResult: function(x) {
            return result;
        }
    };
})();

calculator.add(5);  // returns result = 5
calculator.subtract(2) // returns result = 3
console.log(calculator.getResult());    // 3

/* 3. (Callbacks) closures are widely used in asynchronous programming, where a function can "remember" its surrounding 
      context and variables even when it's called at a later time */
function fetchData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data));
}

// fetchData("https://api.example.com/data", function(data) {
//     console.log(data);
// })

/* closures capture entire scope, including variables, function declarations, and function arguments
they have memory implications, so they can prevent variables from being garbage collected 
closures allow functions to remember and access variables from their parent scopes, even after those scopes have exited */

const counterCreator = () => {
    let count = 0;  // initializes a local variable, count, and then returns a function 
    return () => {
        console.log(count);
        count++;
    };
};

const counter1 = counterCreator();   // to use the function, it's assigned to a variable

counter1();  // 0    every time I run the function, it logs count to the console and increments it
counter1();  // 1    counter() is calling the return value of counterCreator 
counter1();  // 2    the counter function is a closure, it has access to the variable count and can both print and increment it
counter1();  // 3    but there is no way for my program to access count

/* private variables and functions - used in the workings of my objects and not intended to be used elsewhere 
I can split my functions as much as I want and only export the functions that the rest of the program is going to use 

refactor - process of restructuring and improving existing code without changing its external behavior 
factory function - plain functions that return objects for me to use in my code */

// objects here describe my players and encapsulate the things my players can do, their functions
const Player = (name, level) => {
    let health = level * 2;
    const getLevel = () => level;
    const getName = () => name;
    const die = () => {
        // uh oh
    }
    const damage = x => {
        health -= x;
        if (health <= 0) {
            die();
        }
    };
    const attack = enemy => {
        if (level < enemy.getLevel()) {
            damage(1);
            console.log(`${enemy.getName()} has damaged ${name}`);
        }
        if (level >= enemy.getLevel()) {
            enemy.damage(1);
            console.log(`${name} has damaged ${enemy.getName()}`);
        }
    };
    return {attack, damage, getLevel, getName};
};

const jimmie = Player('jim', 10);
const badGuy = Player('jeff', 5);
jimmie.attack(badGuy);

/* things like jimmie.die() and jimmie.health -= 1000 would throw errors, because
.die() and and .heath are private in scope 
jimmie's health hides as a private variable inside of the object,
I need to export a function if I want to manipulate it 
export - make a function in one module available for use in another module; aka make it public 
module - organization of code into separate files or components
functions, variables, and other entities within a module can be made accessible to other modules 
through exporting and importing 

steps for exporting a function:
1. exporting a function - use the export keyword; do it in one of two ways:
a. named exports
// module.js
export function myFunction() {
    // function code here
}
b. default export
// module.js
export default function() {
    // function code here
}
2. importing the exported function - import the exported function into the module using the "import" keyword
a. named exports
// anotherModule.js 
import {myFunction} from './module';
    // Now I can use myFunction in this module
b. default export input 
// anotherModule.js
import myFunction from './module';
// Now I can use myFunction in this module
*/

// inheritance with factories - lets me pick and choose which functions I want to include in my new object
const Person = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
}

const Nerd = (name) => {
    // simply create a person and pull out the sayName  function
    const {sayName} = Person(name);
    const doSomethingNerdy = () => console.log("nerd stuff");
    return {sayName, doSomethingNerdy};
}

const jack = Nerd("jack");
jack.sayName();     // my name is jack
jack.doSomethingNerdy();    // nerd stuff

// I can go ahead and lump all of another object in, and I can do that with Object.assign
const Nerd1 = (name) => {
    const prototype = Person(name);
    const doSomethingNerdy = () => console.log("nerd stuf");
    return Object.assign({}, prototype, {doSomethingNerdy});
}

/* Object.assign() - static method that copies all enumerable own properties from one or more source objects to a target object; 
                     it returns the modified target object */
const target = {a: 1, b: 2};
const source = {b: 4, c: 5};

const returnedTarget = Object.assign(target, source);

console.log(target);    // {a: 1, b: 4, c: 5}
console.log(returnedTarget === target); // true 

/* properties in the target object are overwritten by properties in the source if they have the same key 
Object.assign() uses [[Get]] on the source and [[Set]] on the target, so it will invoke getters and setters 
therefore, it assigns properties vs copying or defining new properties 

Object.assign() may be unsuitable for merging new properties into a prototype if the merge sources contain getters
use Object.getOwnPropertyDescriptor() and Object.defineProperty() for copying property definitions, including their
enumerability into prototypes 

examples of Object.assign() */
// cloning an object
const obj = {a: 1};
const copy = Object.assign({}, obj);
console.log(copy);  // {a: 1};

// warning for deep clone - use structuredClone() for deep cloning
// Object.assign() copies property values; if the source value is a reference to an object, it only copies the reference value
const obj1 = {a: 0, b: {c: 0}};
const obj2 = Object.assign({}, obj1);
console.log(obj2);  // {a: 0, b: {c: 0}};

obj1.a = 1;
console.log(obj1);  // {a: 1, b: {c: 0}};
console.log(obj2);  // {a: 0, b: {c: 0}}; 

obj2.a = 2;
console.log(obj1);  // {a: 1, b: {c: 0}};
console.log(obj2);  // {a: 2, b: {c: 0}}; 

obj2.b.c = 3;
console.log(obj1);  // {a: 1, b: {c: 3}};
console.log(obj2);  // {a: 2, b: {c: 3}};

// deep clone
const obj3 = {a: 0, b: {c: 0}};
const obj4 = structuredClone(obj3);
obj3.a = 4;
obj3.b.c = 4;
console.log(obj4);  // {a: 0, b: {c: 0}};

// merge objects
const o1 = {a: 1};
const o2 = {b: 2};
const o3 = {c: 3};

const obj5 = Object.assign(o1, o2, o3);
console.log(obj5);   // {a: 1, b: 2, c: 3}
console.log(o1);   // {a: 1, b: 2, c: 3}, target object itself is changed

// merge objects with same properties
const o4 = {a: 1, b: 1, c: 1};
const o5 = {b: 2, c: 2};
const o6 = {c: 3};

// properties are overwritten by other objects that have the same properties later in the parameters order
const obj6 = Object.assign({}, o1, o2, o3);
console.log(obj5);   // {a: 1, b: 2, c: 3}

// copying symbol-typed properties
const o7 = {a: 1};
const o8 = {[Symbol("foo")]: 2};

const obj7 = Object.assign({}, o7, o8);
console.log(obj7);  // {a: 1, [Symbol("foo"): 2}
Object.getOwnPropertySymbols(obj7); // [Symbol(foo)]

// properties on the prototype chain and non-enumerable properties cannot be copied
const obj8 = Object.create(
    // foo is on obj's prototype chain
    {foo: 1},
    {
        bar: {
            value: 2,   // bar is a non-enumerable property
        },
        baz: {
            value: 3,
            enumerable: true,   // baz is an enumerable property
        },
    },
);

const copy1 = Object.assign({}, obj8);
console.log(copy1);  // {baz: 3} 

// primitives will be wrapped to objects
const v1= "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo");

const obj9 = Object.assign({}, v1, null, v2, undefined, v3, v4);
//
// primitives will be wrapped, null and undefined with be ignored
// only string wrappers can have their own enumerable properties
console.log(obj9);  // {"0", "a", "1", "b", "2", "c"}

// exceptions will interrupt the ongoing copying task
const target1 = Object.defineProperty({}, "foo", {
    value: 1,
    writable: false,
}); // target.foo is a read-only property

// Object.assign(target1, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
// TypeError: "foo" is read-only
// the exception is thrown when assigning target.foo
console.log(target1.bar);   // 2, first source was copied successfully
console.log(target1.foo2);  // 3, first property of second source was copied successfully
console.log(target1.foo);   // 1, exception is thrown here
console.log(target1.foo3);  // undefined, assign method has finished, foo3 will not be copied
console.log(target1.baz);   // undefined, the third source will not be copied either

/* getters and setters allow me to control the access and modification of an object's properties;
they encapsulate and protect the internal state of an object while still allowing controlled external access 

getter - method that allows me to retrieve the value of a private property of an object;
         used to compute and return a derived value or to provide controlled access to private properties */

const person3 = {
    firstName: "John",
    lastName: "Doe",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;    // fullName() getter calculates and returns the full name by combining
                                                        // `firstName` and `lastName`
    }
};
console.log(person3.fullName);  // "John Doe"

/* setter - method that allows me to set the value of a private property of an object; 
            used to enforce constraints or perform actions when a property is being modified
 */
const temperature = {
    _celsius: 0,
    // celsius setter ensures the temp is not set below an absolute minimum value
    set celsius(value) {
        if (value < -273.15) {
            console.log("Temperature is too low.");
        } else {
            this._celsius = value;
        }
    },
    get celsius() {
        return this._celsius;
    },
    // fahrenheit getter converts the stored Celsius temp to Fahrenheit
    get fahrenheit() {
        return this._celsius * 9/5 + 32;
    }
};

temperature.celsius = -300; // "Temperature is too low."
temperature.celsius = 25;
console.log(temperature.celsius);   // 25
console.log(temperature.fahrenheit);    // 77

// copying accessors
const obj10 = {
    foo: 1,
    get bar() {
        return 2;
    },
};

let copy2 = Object.assign({}, obj10);   // Object.assign({}, obj10) creates a shallow copy of the obj10 object
console.log(copy2); // {foo: 1, bar: 2}
// value of copy2.bar is obj10.bar's getter's return value

// this is an assign function that copies full descriptors
function completeAssign(target, ...sources) {

    // interates through each source object in the sources array
    sources.forEach((source) => {

        // Object.keys(myObject) method extracts all the keys from an object and return them as an array
        // array.reduce(callback, initialValue) reduces an array to a single value through an iterative process;
        // it applies a provided function to each element of the array (from left to right) and accumulates the result in 
        // a single value

        // initializes an empty object, descriptors, to store property descriptors
        const descriptors = Object.keys(source).reduce((descriptors, key) =>
{ 
            // inside the reduce callback
            // for each key in the source object, get the property descriptor and assign it to the corresponding key in descriptors
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
            return descriptors;
        }, {});

        // By default, Object.assign copies enumerable Symbols, too
        // iterate through each enumerable property in the source object
        Object.getOwnPropertySymbols(source).forEach((sym) => {
            
            // get the property descriptor for the current symbol
            const descriptor = Object.getOwnPropertyDescriptor(source, sym);

            // if the descriptor is enumerable
            if (descriptor.enumerable) {
                
                //add it to the descriptors  object using the symbol as the key
                descriptors[sym] = descriptor;
            }
        });
        // after collecting descriptors from the sources, defines all the properties on the "target" object using the collected descriptors
        Object.defineProperties(target, descriptors);
    });
    // returns the modified target object with properties from all sources
    return target;
}

// completeAssign function copies properties from obj to an empty object and assigned to copy2
// completeAssign preserves the object's getter methods 
copy2 = completeAssign({}, obj10);
console.log(copy2); // {foo: 1, get bar() {return 2}}

// completeAssign has made a deep copy of obj including its getter method 

const Nerd2 = (name) => {
    const prototype = Person(name);
    const doSomethingNerdy = () => console.log("nerd stuff");
    return Object.assign({}, prototype, {doSomethingNerdy});
} 

/* one of JS' best features is the ability to create and inherit from objects without classes and class inheritance 
three kinds of prototypes in JS:
1. delegate  prototypes
2. runtime object extension
3. closures

1. delegation/differential inheritance
delegate prototype - object that serves as a base for another object 
when I inherit from a delegate prototype, the new object gets a reference to that prototype */

// method delegation preserves memory because I only need one copy of each method to be shared by all instances
// factory function - Object.create() to create new objects
const proto = {
    hello() {
        return `Hello, my name is ${this.name}`;
    }
};

const greeter = (name) => Object.assign(Object.create(proto), {name});

const george = greeter("george");

const msg = george.hello();

console.log(msg);   // Hello, my name is george

/* avoid property delegation by setting the protype to null using "Object.create(null)" 
delegation is not very good for storing state
if I try to store state as objects or arrays, mutating any member will mutate the member for every instance that shares
the prototype 
to preserve instance safety, I need to make a copy of the state for each object 

2. concatenative inheritance (using JS's object extension feature) / cloninng / mixins 
concatenative inheritance - process of copying the properties fro one object to another, without retaining a reference between
the two objects
cloning - stores default states for objects 
Use Object.assign() */
const proto1 = {
    hello: function() {
        return `Hello, my name is ${this.name}`;
    }
};

const george1 = Object.assign({}, proto1, {name: "George"});

const msg1 = george1.hello();

console.log(msg1)   // Hello, my name is George;

// common to see the style used for mixins - I can turn any object into an event emitter by mixing in an `EventEmitter3` prototype
/* mixin - one object's methods and properties are combined with another object, allowing the combined object to inherit 
and utilize the behavior of both
when I create new objects by combining properties and methods from mutliple source objects; this is useful when I want to 
reuse functionality across multiple objects without creating deep inheritance chains */

// defines a mixin object
const myMixin = {
    sharedMethod() {
        console.log("This method shared via mixin.");
    }
};

// creates a new object that incorporates the mixin
const myObject2 = Object.assign({}, myMixin);

// Now myObject2 has access to the sharedMethod
myObject2.sharedMethod();   // This method is shared via mixin

/* // imports the Events class from the eventemitter3 library' the library allows objects to emit events register listeners for those events
import Events from "eventemitter3";

const object1 = {};

// method copies all properties and methods from Events.prototype object into the object1, 
// adding the event emitter functionality to object1
Object.assign(object1, Events.prototype);

// registers an event listener on the object1, using the on() method inherited from Events.prototype to listen doe the event
// and log the provided payload
object1.on("event", payload => console.log(payload));

// emits an event using the emit() method inherited from Events.prototype; passing the string "some data" as the payload for the event
object1.emit("event", "some data");     // "some data" */

/* use it to create a Backbone style event emitting model
import Events from "eventemitter3";

// creates a modelMixin object, merges an object containing attrs, set, and get properties with the properties
// and methods from the Events.prototype
const modelMixin = Object.assign({
    attrs: {},
    set (name, value) {
        this.attrs[name] = value;

        this.emit("change", {
            prop: name,
            value: value
        });
    },

    get (name) {
        return this.attrs[name];
    }
}, Events.prototype);
})

// creates an object name george with an initial property and value
const george = {name: "george"};

// merges properties from the george object with the properties from the modelMixin
const model = Object.assign(george, modelMixin);

// registers an event listener on the model object
// uses the on() method inherited from the Events.prototype to listen for the change event and log the provided data to the console
model.on("change", data => console.log(data));

// set() method is defined in the modelMixin 
model.set("name", "Sam");   // {prop: "name", value: "Sam"}

concatenative inheritance combined with closures is very powerful 

3. functional inheritance - uses a factory function and then tacks on new properties using concatenative inheritance 
functional mixins - functions created for the purpose of extending existing objects; the function closure lets me
                    encapsulate private data; I enforce private state

I would want to hide the attributes in a private closure */

/* import Events from "eventemitter3";

const rawMixin = function() {
    
    // attrs is now not a public property, it's a private identifier accessible only within this function's scope
    // because it's declared inside the function
    // attrs is a private variable within the scope of the rawMixin function
    const attrs = {};

    // rawMixin returns an object containing a set method, a get method, and event emitter functionality
    // returns an object that combines the properties of the this object ( the one rawMixin is called on), 
    // properties defined within the object literal (containing set and get methods) and properties and methods from
    // Events.prototype
    return Object.assign(this, {
        set (name, value) {
            attrs[name] = value;

            this.emit("change", {
                prop: name,
                value: value
            });
        },

        get (name) {
            return attrs[name];
        }
    }, Events.prototype);
}; */

// mixinModel function takes a single parameter, target, calls the rawMixin function using the .call method and the target object
// this allows the event emitter functionality, set, and get methods to be mixed into the target object
// mixinModel() wrapper around the actual functional mixin, rawMixin() because I need to set the value of "this" inside the
// function
/* const mixinModel = (target) => rawMixin.call(target);

const george2 = {name: "george"};

// combines the properties of george2 with the event emitter functionality, set, and get methods from the rawMixin
const model = mixinModel(george2);

// registers an event listener on the model object; listens for the change event and logs the provided data to the console
model.on("change", data => console.log(data));

// set method sets the name property of the attrs object, emits a change event with the updated property and its new value,
// and triggers the event listener
// event listener responds by logging the data to the console
model.set("name", "Sam");   // {prop: "name", value: "Sam"} */

/* rawMixin function encapsulates functionality within a private scope and mixes it into another object to provide 
encapsulated methods and event emitter capabilities 

the only way to use attrs object is via privileged methods 
privileged methods - any methods defined within the closure's function scope, which gives them access to the private data 

favor object composition over class inheritance
object composition is simpler, more expressive, more flexible */

/* module - similar to factory functions, except a module pattern wraps the factory in a IIFE (Immediately Invoked 
            Function Expression)
    factory function - sets up and returns a new object when called; can be used over and over again to create multiple objects
*/

const calculator1 = (() => // simple factory function
// assign object to calculator1 because only one calculator is needed 
{
    // I can have as many private functions and variables as I want, and they all stay neatly organized inside my module
    // only exposing the functions I actually want to use in my program
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
        add,
        sub,
        mul,
        div
    };
})();

calculator1.add(3, 5);   // 8
calculator1.sub(3, 5);   // -2
calculator1.mul(3, 5);   // 15

/* IIFE - write a function, wrap it in parentheses, and then immediately call the function by adding () to the end of it 
modules are commonly used as singleton style objects where only one instance exists 
the module pattern is great for services and testing/TDD */
// IIFE
(function() {
    // logic here
})();

// named function declaration
function myFunction() {/* logic here */}

// function expression, its assignment to a variable
var myFunction = function() {/* logic here */};

// function expression, its assignment to a property
var myObj= {
    myFunction: function() {/* logic here */}
};

/* a function created in the context of an expression is also a function expression */
// anything within the () is part of an expression
(function() {/* logic here */});

//anything after the ! operator is part of an expression
!function() {/* logic here */};

/* JS expressions return values
return value of the expressions above is the function, so I can add () to invoke the function expression right away 
IIFE gets me data privacy
var scopes variables to their containing function, so any variables declared within the IIFE cannot be accessed
by the outside world */
(function() {
    var foo = "bar";

    console.log(foo);
})();
// ReferenceError: foo is not defined
console.log(foo);

// arguments can be passed into the IIFE
var foo = "foo";

(function(innerFoo) {
    console.log(innerFoo);  // "foo"
})(foo);

/* Creating a module
anonymous closures - anonymous functions that wrap my code and create an enclosed scope around it;
closures keep any state or privacy within that function */
// IIFE - function is evalulated and then immediately invoked 
(function() {
    "use strict";
    // my code here
    // all functions and variables are scoped to this function
})();

/* Exporting my module
assigns the module to a variable that I can use to call my module's methods */
var myModule = (function() {
    "use strict";
})();

// creates a public method for my module to call
// to expose the method to code outside the module, I return an object with the methods defined
var myModule = (function() {
    "use strict";

    return {
        publicMethod: function() {
            console.log("Hello World!");
        }
    };
})();

myModule.publicMethod(); // "Hello World!"

/* Private methods and properties
I can use closures to create private methods and private state */
var myModule = (function() {
    "use strict";

    var _privateProperty = "Hello World";

    function _privateMethod() {
        console.log(_privateProperty);
    }

    return {
        publicMethod: function() {
            _privateMethod();
        }
    };
})();

// only my public method gives me access to my private methods
myModule.publicMethod();    // "Hello World"
console.log(myModule._privateProperty); // undefined (protected by the module closure)
// myModule._privateMethod();  // TypeError (protected by the module closure)
// remember, it is common to prefix private properties with an underscore

/* Revealing Module Pattern
use the return statement to return an object literal that "reveals" only the methods or properties I want to be publicly available */
var myModule = (function() {
    "use strict";

    var _privateProperty = "Hello World";
    var publicProperty = "I am a public property";

    function _privateMethod() {
        console.log(_privateProperty);
    }

    function publicMethod()  {
        _privateMethod();
    }

    // returns an object literal that reveals only the methods/properties I want public
    // I can look at the return statement at the bottom of the module and quickly see what is publicly available for use
    return {
        publicMethod: publicMethod,
        publicProperty: publicProperty
    };
})();

myModule.publicMethod();    // "Hello World"
console.log(myModule.publicProperty);   // "I am a public property"
console.log(myModule._privateProperty); // undefined (protected by the module closure)
// myModule._privateMethod();  // TypeError (protected by the module closure)

/* Module pattern
module has only one instance, exposes its members, and doesn't have any kind of internal state 

Defining a module
IIFE with a function inside 
everything within the function body is bound to the module and can be seen by each other 
modules emulate public and private methods by creating scope and exposing only those things that are declared */
const SomeModule = (function() {})();

// module with a private function inside
const Formatter = (function() {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
})();

// Formatter.log("Hello");  Uncaught TypeError, because my module doesn't return anything, so it is undefined
// even though the code inside will execute

const Formatter1 = (function() {
    console.log("Start");   // "Start"
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
})();

// accessing a module is accessing whatever it returns; return an object with the function
const Formatter2 = (function() {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

    // returns a object with the function
    const makeUppercase = (text) => {
        log("Making uppercase");
        return text.toUpperCase();
    };

    return {
        makeUppercase,
    }
})();

console.log(Formatter2.makeUppercase("Kai"));   // [1692729275750] Logger: Making uppercase
                                                // KAI

// modules can house arrays, objects, and primitives too
const Formatter3 = (function() {
    let timesRun = 0;

    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

    const setTimesRun = () => {
        log("Setting times run");
        ++timesRun;
    }

    // returns a object with the function
    const makeUppercase = (text) => {
        log("Making uppercase");
        setTimesRun();
        return text.toUpperCase();
    };

    return {
        makeUppercase,
        timesRun,
    }
})();

console.log(Formatter3.makeUppercase("Kai"));   // [1692729275751] Logger: Making uppercase
                                                // [1692729275751] Logger: Setting times run
                                                // "KAI"
console.log(Formatter3.timesRun);   // 0

// overwrites timesRun = 0 from outside
Formatter3.timesRun = 10;

// everything publicly exposed can be changed from outside/ this is a module pattern drawback
console.log(Formatter3.timesRun);    // 10

// reference types can be defined and populated as I go
const Formatter4 = (function() {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
    const timesRun = [];

    const makeUppercase = (text) => {
        log("Making uppercase");
        timesRun.push(null);
        return text.toUpperCase();
    };

    return {
        makeUppercase,
        timesRun,
    }
})();

console.log(Formatter4.makeUppercase("Kai"));   // [1692729882511] Logger: Making uppercase
                                                // KAI
console.log(Formatter4.makeUppercase("Kai"));   // [1692729882511] Logger: Making uppercase
                                                // KAI
console.log(Formatter4.makeUppercase("Kai"));   // [1692729882511] Logger: Making uppercase
                                                // KAI
console.log(Formatter4.timesRun.length);    // 3

// modules may have dependencies; write a function that will write a message to my requested HTML element
/*
const Formatter5 = (function() {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

    const makeUppercase = (text) => {
        log("Making uppercase");
        timesRun.push(null);
        return text.toUpperCase();
    };

    const writeToDOM = (selector, message) => {
        // document is available only when the DOM is accessible
        // running the code on a server would produce an error
        document.querySelector(selector).innerHTML = message;
    }

    return {
        makeUppercase,
        writeToDOM,
    }
})(); 
Formatter5.writeToDOM("#target", "Hi there"); 
*/

// doc is the argument to my function
const Formatter6 = (function(doc) {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

    const makeUppercase = (text) => {
        log("Making uppercase");
        return text.toUpperCase();
    };
    //  doc is is used in this method
    const writeToDOM = (selector, message) => {
        if (!!doc && "querySelector" in doc) {
            doc.querySelector(selector).innerHTML = message;
        }
    }

    return {
        makeUppercase,
        writeToDOM,
    }
// document is the argument my module will be invoked with
})(document);

// I can insert a mock
const documentMock = (() => ({
    querySelector: (selector) => ({
        innerHTML: null,
    }),
}))();

const Formatter7 = (function(doc) {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

    const makeUppercase = (text) => {
        log("Making uppercase");
        return text.toUpperCase();
    };

    const writeToDOM = (selector, message) => {
        doc.querySelector(selector).innerHTML = message;
    }

    return {
        makeUppercase,
        writeToDOM,
    }
})(document || documentMock);

/* namespacing - technique that is used to avoid naming collusions in my programs; useful side-effect of encapsulation into objects 
ex. what if I had a conventional function use of the + operator, a function that added things to my HTML display, and a function
that added numbers and operators to my stack as the users input them: all of them could be encapsulated inside of an object:
calculator.add(), displayController.add(), operatorStack.add() */

/* closure - function with preserved data
             gives me access to an outer function's scope, from an inner function
benefit 1. state of variables in outer scope is saved
benefit 2. variables in outer scope are considered "private"
*/

let score = function(){ // from this curly bracket to the end curly bracket, it's the lexical scope of the closure
    let points = 0; // make variable's state private

    return function(){
        points += 1;
        return points;
    }
}();

console.log(score());
console.log(score());
console.log(score());


const personFactory1 = (name, age)  => {
    const sayHello = () => console.log("hello!");
    return {name, age, sayHello};   // ES6 shorthand: if the variable has the same name as the object property, condense
};

const jeff1 = personFactory1("jeff", 27);   // set up and make a new object by calling the factory function

console.log(jeff1.name)  // "jeff"

jeff1.sayHello() // logs "hello!"

const name2 = "Maynard";
const color2 = "red";
const number2 = 34;
const food2 = "rice"; 

console.log({name2, color2, number2, food2});   // outputs key-value pairs within {}

const func1 = x => {
    let a1 = 17;
    a1 = x;
    return x;
}

console.log(func1(99));

const FactoryFunction1 = string => {
    const capitalizeString = () => string.toUpperCase();    // capitalizeString is a private function
    const printString = () => console.log(`---${capitalizeString()}---`);
    return {printString};   // printString is a public function
};

const taco1 = FactoryFunction("taco");  // create object taco1 and passing in the string taco

// printString();  // ERROR! because it's a private method
// capitalizeString();  // ERROR! because it's a private method
// taco.capitalizeString();  // ERROR! because it's a private method
taco1.printString(); // "----TACO----" because the factory function returns this method

// closure - functions retain their scope, even if they passed around and called outside that scope, so
// here, printString() has access to everything inside the factory function even if it's called outside of the factory function

const counterCreator1 = () => {
    let count = 0;  // initializes a local variable, count, and then returns a function 
    return () => {
        console.log(count);
        count++;
    };
};

const counter2 = counterCreator1();   // to use the function, it's assigned to a variable

counter2();  // 0    every time I run the function, it logs count to the console and increments it
counter2();  // 1    counter() is calling the return value of counterCreator 
counter2();  // 2    the counter function is a closure, it has access to the variable count and can both print and increment it
counter2();  // 3    otherwise, my program has no access to the variable count

// closures allow me to create private variables and functions, allows me to separate my concerns, and makes my code cleaner
// I only need to export the functions the rest of the program will use

/* making helper functions inaccessible makes the code easier to refactor, test, and understand how to use objects
using closures with my objects means I've encapsulated it, and I can only access private variables and functions by
exporting a function */

const Person1 = (name) => {
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};
}

const Nerd3 = (name) => {   // Nerd3 object is built on the Person1 prototype
    // simply create a person and pull out the sayName  function
    const {sayName} = Person1(name);
    const doSomethingNerdy = () => console.log("nerd stuff");
    return {sayName, doSomethingNerdy};
}

const jack1 = Nerd3("jack");    // create my function by calling Nerd3, I can access the methods defined in the factory function

jack1.sayName();     // my name is jack
jack1.doSomethingNerdy();    // nerd stuff

// I can go ahead and lump all of another object in, and I can do that with Object.assign
const Nerd4 = (name) => {
    const prototype = Person1(name);
    const doSomethingNerdy = () => console.log("nerd stuf");
    return Object.assign({}, prototype, {doSomethingNerdy});    // Object.assign{} will copy all the properties from one or more source objects
                                                                // to a target object and return the modified target object
}

const calculator2 = (() => // simple factory function
// assign object to calculator2 because only one calculator is needed 
{
    // I can have as many private functions and variables as I want, and they all stay neatly organized inside my module
    // only exposing the functions I actually want to use in my program
    // encapsulates the inner workings of my program
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
        add,
        sub,
        mul,
        div
    };
})();   // () at the end means it is immediately called

/* module pattern - wraps the factory function in a IIFE */
// namespacing 
calculator2.add(3, 5);   // 8   if I have encapsulated everything, I can chain the same method to different objects
calculator2.sub(3, 5);   // -2
calculator2.mul(3, 5); 