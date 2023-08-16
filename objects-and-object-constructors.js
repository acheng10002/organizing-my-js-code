// object literal syntax to define an object
const myObject = {
    property: 'Value',
    otherProperty: 77,
    "obnoxious property": function() {
        // do stuff!
    }
}

// 2 ways to get info out of an object

// dot notation
myObject.property // 'Value'

// dot notation cannot be used with properties with names that are strings that have spaces
// variables also cannot be used in dot notation 

// bracket notation
myObject["obnoxious property"] // [Function]

const variable = "property";

myObject.variable  // undefined because it's looking for a property named "variable" in my object
myObject[variable] // equivalent to myObject["property"] and returns "Value!"

// Objects As A Design Pattern 
// start to group things into objects

// example 1
const playerOneName = "tim"
const playerTwoName = "jenn"
const playerOneMarker = "X"
const playerTwoMarker = "O"

// example 2 - write code using objects!
const playerOne = {
    name: "tim",
    marker: "X"
}

const playerTwo = {
    name: "jenn",
    marker: "O"
}

// to print with example 1, I'd have to remember the variable name and manually console.log it
function printName(player) {
    console.log(player.name)
}

function gameOver(winningPlayer) {
    console.log("Congratulations!")
    console.log(winningPlayer.name + " is the winner!")
}

/*
another ex. using objects to keep track of an item's name, price, and description, is the way to go...
would also need a cleaner way to create my objects

Object constructors
object constructor - function used to create duplicate objects
*/

function Player(name, marker) {
    this.name = name
    this.marker = marker
}

// I can call the above function with the new keyword
const player = new Player("steve", "X")
console.log(player.name) // "steve"

// like objects created with the Object Literal method, I can add functions to the object
function Player(name, marker) {
    this.name = name
    this.marker = marker
    this.sayName = function() {
        console.log(name)
    }
}

const player1 = new Player("steve", "X")
const player2 = new Player("also steve", "O")
player1.sayName()  // logs "steve"
player2.sayName() // logs "also steve"

// ex. object constructor for making "Book" objects, with following properties: title, author, pages, and read status

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status

    // function in the constructor, returns a string
    this.info = function() {
        return (title + " by " + author + ", " + pages + " pages, " + status)
    }
}

/* 
or 
function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.info = function() {
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`)
    }
} 
*/

const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", "295", "not read yet")

// log the string after the info() function has been called
console.log(theHobbit.info());

/* all JS objects have a prototype 
prototype - another object that the original object inherits from...meaning the original object has access to all of its prototype's methods and properties 
1. All JS objects have a prototype 
2. The prototype is another object 
3. The prototype is another object that the original object inherits from and has access to 
   ex. original object is player1
       if its prototype has a .sayHello() function, player1 can access that function, just as if it was its own function
       as can player2, since it's defined on the prototype */

// accessing an object prototype

// I can check the object's prototype by using Object.getPrototypeOf() function on the obejct
Object.getPrototypeOf(player1) === Player.prototype // true
Object.getPrototypeOf(player2) === Player.prototype // true

// the return value refers to the .prototype property of the obejct constructor (i.e. Player(name, marker))
// Object.getPrototypeOf(player1) === Player.prototype

/* the VALUE of the object constructor's .prototype property contains the prototype object
 the REFERENCE to this value of Player.prototype is stored in every Player object, every time a Player object is created
 hence, I get a true value returnd when I check the Objects prototype 
 every Player object has a value which refers to Player.prototype */ 
 Object.getPrototypeOf(player1) ===  Object.getPrototypeOf(player2) // true

 // any properties or methods defined on Player.prototype will be available to the created Player objects!
 Player.prototype.sayHello = function() {
    console.log("Hello, I'm a player!");
 }


 player1.sayHello()
 player2.sayHello()

 // I can attach other properties or functions I want to use on all Player objects by defining them on the obejcts' prototype
// Use Object.getPrototypeOf(); both .__proto__ and [[Prototype]] are deprecated

/* Prototypal inheritance
1. Define properties and functions common among all objects on the prototype to save memory
2. player1 and player2 objects inherit from the Player.prototype object, which allows them to access functions like sayHello
*/

// Player.prototype.__proto__
Object.getPrototypeOf(Player.prototype) === Object.prototype // true

// output may slightly differ based on the browser
player1.valueOf() // Output: Object {name: "steve", marker: "X", sayName: sayName()}

/* .valueOf comes as a result of Object.getPrototypeOf(Player.prototype) having the value of Object.prototype
...Player.prototype is inheriting from Object.prototype 
.valueOf is defined on Object.prototype just like .sayHello is defined on Player.prototype */

player1.hasOwnProperty("valueOf"); // false
Object.prototype.hasOwnProperty("valueOf"); // true

// use Object.getPrototypeOf() to get or view the prototype of an object
// use Object.setPrototypeOf() to set or mutate the prototype

// Add a Person Object Constructor to the Player example and make Player inherit from Person

// Person Object Constructor
function Person(name) {
    this.name = name
}

// sayName() function defined on the Person object's prototype
Person.prototype.sayName = function() {
    console.log(`Hello, I'm ${this.name}!`)
}

// Player Object Constructor
function Player(name, marker) {
    this.name = name
    this.marker = marker
}

// getMarker() function defined in the Player object's prototype
Player.prototype.getMarker = function() {
    console.log(`My marker is '${this.marker}'`)
}

Object.getPrototypeOf(Player.prototype) // returns Object.prototype

// Make `Player` object inherit from `Person`
Object.setPrototypeOf(Player.prototype, Person.prototype)
Object.getPrototypeOf(Player.prototype) // returns Person.prototype

const player3 = new Player("steve", "X")
const player4 = new Player("also steve", "0")

player3.sayName() // Hello, I'm steve!
player4.sayName() // Hello, I'm also steve!
 
player3.getMarker() // My marker is "X"
player4.getMarker() // My marker is "O"

/*
defined a Person object from whom a Player object inherits properties and functions 
created PLayer objects are able to access both the .sayName and the .getMarker functions, 
in spite of them being defined on two separate prototype objects!
that's enabled by the Object.setPrototypeOf() function, specifically Object.setPrototypeOf(Player.prototype, Person.prototype)
Object.setPrototypeOf() takes two arguments:
first is the object which inherits
second is the object I want the first to inherit from 
created Player objects are then able to access the .sayName and .getMarker functions through their prototype chain

The prototype chain has to be set up using the function, Object.setPrototypeOf() BEFORE creating any objects
using setPrototype() after objects have already been created can result in performance issues

Player.prototype = Person.prototype WON'T WORK!
that would set Player.prototype to directly refer to Person.prototype (i.e. not a copy)
*/

/*
prototype-based language - In JS, object properties and methods can be shared through generalized objects that have the ability to be cloned and extended
unlike PHP, Python, and Java, which are class-based languages; classes are blueprints for objects
*/

/* How prototypes can be used to extend objects
every object in JS has an internal property caled [[Property]], that is internal and cannot be accessed directly in code */
let x = {}; // same as let x = new Object()

Object.getPrototypeOf(x);

/* Output
{constructor: f, ___defineGetter___: f, ___defineSetter___: f, ___hasOwnProperty___:f, ___lookupGetter___: f, ...} 

every object having a [[Prototype]], creates a way for any two or more objects to be linked
A reference can be made this the [[Prototype]] internal property from one object to another via the prototype property 

1. I try to access a property or method of an object, JS first searches on the object itself. 
2. If it is not found, it will search the object's [[Prototype]]
3. If after consulting both the object and its [[Prototype]] still no match is found, JS will check the prototype of the linked object
4. It will continue searching until the end of the prototype chain is reached 

at the end of the prototype chain is Object.prototype
any attempt to search beyond the end of the chain results in null */

// x can use any property or method that Object has
x.toString(); // [object Object]

/* makes a prototype chain that is one link long: 
// x -> Object


Arrays in JS have many built-in methods, such as pop() and push()
I can access these methods when I create a new array because any array I create has access to the properties and methods on the Array.prototype 
*/

let y = []; // or let y = new Array();

Object.getPrototypeOf(y); 

// [[Prototype]] of the y array has more properties and methods than the x object 
/* it has a constructor property 
constructor property returns the constructor function of na object, a mechanism used to construct objects from functions
I can chain two prototypes together now, since my prototype chain is longer in this case
y -> Array -> Object

I can test the internal [[Prototype]] against the prototype property of the constructor function to see if they are referring to the same thing
*/

Array.prototype.isPrototypeOf((y)); // true
Object.prototype.isPrototypeOf(Array); // true

/* I can use the instanceof operator to test whether the prototype property of a constructor appears anywhere within a 
object's prototype chain */ 
y instanceof Array; // true

/* there are built-in JS constructors, like new Array() and new Date(),
and I can create my own custom templates from which to build new objects
constructor - function that is called on by an instance with the new keyword; capitalize the first letter of a constructor function  
*/

// Initialize a constructor function for a new Hero
function Hero(name, level) {
    this.name = name;
    this.level = level
}

/* this keyword - refers to the new instance that is created
this.name = name ensures that the new object will have a name property set */

let hero1 = new Hero("Bjorn", 1);
console.log(hero1);

// if I get the [[Prototype]] of hero1, I will see the constructor as Hero()
Object.getPrototypeOf(hero1);

/* ***It is common practice in JS to define methods on the prototype for icnreased efficiency and code readability */

// Add greet method to the Hero prototype
Hero.prototype.greet = function() {
    return `${this.name} says hello.`;
}
// greet() is in the prototype of Hero, and hero1 is an instance of Hero, the method is available to hero1
hero1.greet();

/* I can use the call() method to copy over properties from one constructor into another constructor */
// Initialize Warrior constructor
function Warrior(name, level, weapon) {
    // Chain constructor with call
    Hero.call(this, name, level);

    // Add a new property
    this.weapon = weapon;
}

// Initialize Healer constructor
function Healer(name, level, spell) {
    Hero.call(this, name, level);

    this.spell = spell;
}
// both new constructors now have the properties of Hero and a few unique ones

// add attack() method to Warrior and heal() method to Healer
Warrior.prototype.attack = function() {
    return `${this.name} attacks with the ${this.weapon}.`;
}

Healer.prototype.heal = function() {
    return `${this.name} casts ${this.spell}.`;
}
 
// create my characters with the two new character classes available
hero1 = new Warrior("Bjorn", 1, "axe");
const hero2 = new Healer("Kanin", 1, "cure");

// use the new methods set on the Warrior prototype
hero1.attack();

/* *** Prototype properties and methods are not automatically linked when I use call() to chain cosntructors
I need to use Object.setPropertyOf() to link properties in the Hero constructor to the Warrior and Healer constructors, 
making sure to put it before any additional methods */
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

/* 
// Initialize constructor functions 
function Hero(name, level) {
    this.name = name;
    this.level = level
} 

function Warrior(name, level, weapon) {
    Hero.call(this, name, level);

    this.weapon = weapon;
}

function Healer(name, level, spell) {
    Hero.call(this, name, level);

    this.spell = spell;
}

// Link prototypes and add prototype methods
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

Hero.prototype.greet = function() {
    return `${this.name} says hello.`;
}

Warrior.prototype.attack = function() {
    return `${this.name} attacks with the ${this.weapon}.`;
}

Healer.prototype.heal = function() {
    return `${this.name} casts ${this.spell}.`;
}

// Initialize individual character instances
hero1 = new Warrior("Bjorn", 1, "axe");
const hero2 = new Healer("Kanin", 1, "cure");
*/

/* I created a Hero constructor will base properties
created two character constructors called Warrior and Healer from the original constructor
added methods to the prototypes and created individual character instances

how to link object properties and methods via the hidden [[Prototype]] property that all objects share 
how to create custom constructor functions
how prototype inheritance works to pass down property and method values
*/

let animal = {
    eats: true
};
let rabbit = {
    jumps: true
};

// sets rabbit's prototype object to be animal
Object.setPrototypeOf(rabbit, animal);

// I can find both properties in rabbit now
// alert tries to read property rabbit.eats, it's not in rabbit, so JS follows the [[Prototype]] reference and finds it in animal
alert(rabbit.eats); // true
alert(rabbit.jumps); // true

animal = {
    eats: true,

    // the method is in animal
    walk() {
        alert("Animal walk");
    }
};

rabbit = {
    jumps: true,
};

Object.setPrototypeOf(rabbit, animal);

// walk is taken from rabbit's prototype, animal
rabbit.walk(); // Animal walk

/* The prototype chain can be longer...
animal = {
    eats: true,

    // the method is in animal
    walk() {
        alert("Animal walk");
    }
};

rabbit = {
    jumps: true,
};
*/

let longEar = {
    earLength: 10
};

Object.setPrototypeOf(longEar, rabbit);

// walk is taken from the prototype chain
longEar.walk();  // Animal walk (from animal)
alert(longEar.jumps); // true (from rabbit)

// *** An object can have only one [[Prototype]], it cannot inherit from two prototypes

/* Writing doesn't use prototype
Prototype is only used for reading properties
write/delete operations work directly with the object
*/
Object.setPrototypeOf(rabbit, animal);

rabbit.walk = function() {
    alert("Rabbit! Hop-hop!");
};

rabbit.walk(); // Rabbit! Hop-hop!
// in above, rabbit.walk() call finds the method immediately in the object and executes it, without using the prototype

/* accessor properties - type of property that provides getter and setter methods to control the access and modification of 
a value associated with an object; allows me to define custom behavior when reading or writing a property's value
writing them is handled by a setter function, so it's the same as calling a function
*/
let user = {
    name: "John",
    surname: "Smith", 


    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

let admin = {
    isAdmin: true 
};

Object.setPrototypeOf(admin, user);

alert(admin.fullName); // John Smith  property admin.fullName has a getter in the prototype user, so it is called

// setter triggers!
admin.fullName = "Alice Cooper"; // property admin.fullName has a setter in the prototype, so it is called

alert(admin.fullName); // Alice Cooper, state of admin is modified
alert(user.fullName); // John Smith, state of user protected

/*
"this" is not affected by prototypes at all
in a method call, "this" is always the object before the dot

I may have a big object with many methods, and have objects inherit from it
when the inheriting objects run the inherited methods, they will modify only their own states, not the state of the big object
*/
// animal represents a method storage, and rabbit makes use of it
animal = {
    walk() {
        if (!this.Sleeping) {
            alert(`I walk`);
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};

rabbit = {
    name: "White Rabbit",
};

Object.setPrototypeOf(rabbit, animal);

// sets this.isSleeping on the rabbit object
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the animal prototype)

// methods are shared, but obejct state is not

/* for..in loop, iterates over inherited properties too */
animal = {
    eats: true
};

rabbit = {
    jumps: true
};

Object.setPrototypeOf(rabbit, animal);

// Object.keys only returns own keys 
alert(Object.keys(rabbit)); // jumps

// for...in loops over both own and inherited keys
for (let prop in rabbit) alert(prop); // jumps, then eats

/* if I want to excluse inherited properties, use built-in method obj.hasOwnProperty(key): it returns true if obh has its own
not inherited property named key
*/

// filters out inherited properties
for (let prop in rabbit) {
    let isOwn = rabbit.hasOwnProperty(prop);

    if (isOwn) {
        alert(`Our: ${prop}`); // Our: jumps
    } else {
        alert(`Inherited: ${prop}`); // Inherited: eats
    }
}

/* all properties of Object.prototype are not enumerable; they have the enumerable:false flag,
and for...in only lists enumerable properties 

*** almost all other key/value-getting methods ignore inherited properties
Object.keys, Object.values, etc. ignore inherited properties; they only operate on the object itself

1. all objects have a hidden [[Prototype]] property that's either another object or null
2. if I want to read property of obj or call a method, and it doesn't exist, then JS tries to find it in the prototype
3. Write/delete operations act directly on the object, they don't use the prototype (assuming it's a data property, not a setter)
4. if I call obj.method(), and the method is taken from the prototype, this still references obj.
   methods always work in the current object, even if they are inherited
5. the for...in loop iterates over both its own and its inherited properties; all other key/value getting methods only operate
   on the object itself
*/

/* Tasks 
A. 1. true; 2. null; 3. undefined

B. 1.
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};


let pockets = {
  money: 2000
};

Object.setPrototypeOf(table, head);
Object.setPrototypeOf(bed, table);
Object.setPrototypeOf(pockets, bed);

2. 
no difference; modern engines remember where the property was found and reuse it in the next request
modern engines are also smart enough to update internal caches if something changes, so the optimization is safe

C. "this" is an object before the dot, so rabbit.eat() modifies rabbit
property lookup and execution are two different things: rabbit.eat is first found in the prototype, then executed with this.rabbit

D. JS calls push on stomach, and adds the food into the stomach of the prototype

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
  stomach: []
};

let lazy = {
  __proto__: hamster,
  stomach: []
};

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>

OR

let hamster = {
  stomach: [],

  eat(food) {
    // assign to this.stomach instead of this.stomach.push
    this.stomach = [food];
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
*/

/*
"this" is the context of a function call; there are 4 types of function calls in JS:
1. function call: ex. alert("Hello World!")
2. method call: ex. console.log("Hello World!")
3. constructor call: new RegExp("\\d")
4. indirect call: alert.call(undefined, "Hello World!")

invocation - calling the function ex. parseInt("15")
context - value of "this" within the function body
scope - set of variables and functions accessible within a function body
*/

/*
1.1 this in a function invocation
expression that evaluates to a function object is followed by an open parenthesis, a comma separated list of argument expressions, 
and a close parenthesis
*/
function hello(name) {
    return "Hello " + name + "!";
}

// function invocation; hello expression evaluates to a function object, followed by () with the "World" argument
const message = hello("World");

/* function invocation cannot be a property accessor obj.myFunc() - that is a method invocation
another ex. [1, 5].join(",") is not a function invocation, but a method call */

// IIFE - first () is an expression that evalulates to a function object, followed by another () with the argument
// IIFE - immediately-invoked function expression
const message1 = (function(name) {
    return "Hello " + name + "!";
})("World");

/* this - the global object, determined by the execution environment
in a browser, the global object is the window object
*/


function sum(a, b) {
    console.log(this === window);   // true

    // add "myNumber" property to global object
    this.myNumber = 20; 

    return a + b;
}
// sum is invoked as a function
// this in sum() is a global object (window)
sum(15, 16);    // 31; this or window is automatically set as the global object
window.myNumber;    // 20

// this also equals the global object when it is used outside of any function scope
console.log(this === window);   // true

this.myString = "Hello World!";
console.log(window.myString);   // "Hello World!"

/*
1.2 this in a function invocation, strict mode
this is undefined in a function invocation in strict mode
to enable strict mode, place "use strict" at the top of a function body, and the execution context is not the global object
anymore
*/
function multiply(a, b) {
    "use strict";   // enable the strict mode
    console.log(this === undefined);    // true
    return a * b; 
}

// multiply() function invocation with strict mode enabled
// this in multiply() is undefined
multiply(2, 5);     // 10

// strict mode will also be active in the inner scopes (for all functions declared inside)
function execute() {
    "use strict";

    function concat(str1, str2) {
        // strict mode is enabled too
        console.log(this === undefined);    // true
        return str1 + str2;
    }

    return concat("Hello ", "World!");  // "Hello World!"
}

console.log(execute());

// a single JS file may contain both strict and non-strict modes
function nonStrictSum(a, b) {
    console.log(this === window);   // true
    return a + b;
}

function strictSum(a, b) {
    "use strict";
    console.log(this === undefined);    // true
    return a + b;
}

// nonStrictSum() is invoked as a function in non-strict mode, and this is the window object
console.log(nonStrictSum(5, 6));

// strictSum() is invoked as a function in strict mode, and this is undefined
console.log(strictSum(8, 12));

/*
1.3 pitfall: this in an inner function
- "this" is not always the same in an inner function as in the outer function
- context of the inner function (except arrow function) depends only on its own invocation type, but not on the outer function's context
*/
// to make this have a desired value, modify the inner function's context with indirect invocation, using .call() or .apply() 
// or create a bound function
const numbers = {
    numberA: 5,
    numberB: 10,

    sum: function() {
        console.log(this === numbers);  // true

        function calculate() {
            // this is window or undefined in strict mode
            // calculate() is not invoked correctly
            console.log(this === numbers);  // false 

            return this.numberA + this.numberB;
        }

        return calculate(); // NaN or throws TypeError in strict mode
    }
};

numbers.sum(); 

// calculate() must execute with the same context as numbers.sum() to access this.numberA and this.numberB
// manually change the context of calculate() to the desired one by calling calculate.call(this)
const numbers1 = {
    numberA: 5,
    numberB: 10,
    sum: function() {
        console.log(this === numbers1); // true

        function calculate() {
            console.log(this === numbers1); // true
            return this.numberA + this.numberB;
        }

        // use .call() method to modify the context to value specified as the first parameter
        // this.numberA + this.numerB is the same as numbers1.numberA + numbers1.numbersB
        return calculate.call(this);
    } 
};

numbers1.sum(); // 15

// slightly better solution using an arrow function
const numbers2 = {
    numberA: 5,
    numberB: 10,
    sum: function() {
        console.log(this === numbers2); // true

        // arrow function resolves "this" lexically, using "this" value of numbers.sum() method
        const calculate = () => {
            console.log(this === numbers2); // true
            return this.numberA + this.numberB;
        }

        return calculate();
    }
};

numbers2.sum(); // 15

// method - function stored in a property of an object
const myObject1 = {
    // helloMethod is a method of myObject
    helloMethod: function() {
        return "Hello World!";
    }
};

// myObject.helloMethod is a property accessor; it's a method invocation of helloMethod on the object myObject
const message2 = myObject1.helloMethod();

/* more examples of method calls:
[1, 2].join(",") 
/\s/.test("beautiful world") 
method invocation requires a property accessor to call the function, obj.myFunc()
while function invocation does not myFunc() */

/* 2.1 this in a method invocation 
"this" is the object that owns the method */
const calc = {
    num: 0,
    increment() {
        console.log(this === calc);     // true

        // increment the number property
        this.num += 1;
        return this.num;
    }
} 
//  context of increment function is calc object
calc.increment();   // 1
calc.increment();   // 2

/* JS object inherits a method from its prototype
when the inherited method is invoked on the object, the context of the invocation is still the object itself */

// Object.create() creates a new obejct myDog and sets its prototype from the first argument
// myDog object inherits sayName method
const myDog = Object.create({
    sayName() {
        console.log(this === myDog);    // true
        return this.name;
    }
});

myDog.name = "Milo";

// method invocation; this, the context of invocation, is myDog
myDog.sayName();

// ECMAScript2015 class syntax
class Planet {
    constructor(name) {
        this.name = name;
    }

    getName() {
        console.log(this === earth);    // true
        return this.name;
    }
}

const earth = new Planet('Earth');

// method invocation. the context is earth
earth.getName();    // "Earth"

/* 2.2 pitfall: separating method from its object 
a method can be extracted from an object into a separated variable
const alone = myObj.myMethod
when the method is called alone, alone(), detached from the original object, a function invocation happens, 
and this is the global object, window or undefined in strict mode 

A bound function
const alone = myObj.myMethod.bind(myObj)    using .bind() fixes the context by binding this the object that owns the method
*/

// defines Pet constructor and makes an instance of it: myCat
// setTimeout() after 1 second, logs myCat object information
function Pet(type, legs) {
    this.type = type;
    this.legs = legs;

    this.logInfo = function() {
        console.log(this === myCat);    // false 
        console.log(`The ${this.type} has ${this.legs} legs`);
    }
}

const myCat = new Pet("Cat", 4);

// logs "The undefined has undefined legs or throws a TypeError in strict mode"
setTimeout(myCat.logInfo, 1000);    // the method is separated from its object when passed as a parameter setTimeout(myCat.logInfo)

/* setTimeOut(myCat.logInfo)
is equivalent to:

const extractedLogInfo = myCat.logInfo;
setTimeout(extractedLogInfo); 

a function bounds with an object using .bind() method: the separate method is bound with myCat object, the context problem is solved
*/

function Pet1(type, legs) {
    this.type = type;
    this.legs = legs;

    this.logInfo = function() {
        console.log(this === myCat);    // true
        console.log(`The ${this.type} has ${this.legs} legs`);
    };
}

const myCat1 = new Pet1("Cat", 4);

// Create a bound function
const boundLogInfo = myCat1.logInfo.bind(myCat);

setTimeout(boundLogInfo, 1000); // logs "The Cat has 4 legs"
// myCat.logIno.bind(myCat) returns a new function that executes exactly like logInfo, but has this as myCat, even in a function invocation

// could also define logInfo() method as an arrow function, which binds this lexically 
function Pet2(type, legs) {
    this.type = type;
    this.legs = legs;

    this.logInfo = () => {
        console.log( this === myCat);   // true
        console.log(`The ${this.type} has ${this.legs} legs`);
    };
}

const myCat2 = new Pet2("Cat", 4);

// logs "The Cat has 4 legs"
setTimeout(myCat2.logInfo, 1000);  

// could also use classes and bind this to the class instance in my method, use the arrow function as a class property
class Pet3 {
    constructor(type, legs) {
        this.type = type;
        this.legs = legs;
    }

    logInfo = () => {
        console.log( this === myCat);   // true
        console.log(`The ${this.type} has ${this.legs} legs`);
    }
}

const myCat3 = new Pet3("Cat", 4);

// logs "The Cat has 4 legs"
setTimeout(myCat3.logInfo, 1000);  

/* constructor invocation
3.1 this in a constructor inovocation 

declares a function Country() and then invokes it as a constructor */
function Country(name, traveled) {
    this.name = name ? name : "United Kingdom";
    this.traveled = Boolean(traveled);  // transform to a boolean
}

Country.prototype.travel = function() {
    this.traveled = true;
};

// constructor invocation of Country function; creates a new object which name property is "France"
const france = new Country("France", false);

// constructor invocation 
const unitedKingdom = new Country;

france.travel;    

// ECMAScript 2015, JS allows the defining of constructors using class syntax
class City {
    // handles object's initialization; this is the newly created object
    constructor(name, traveled) {
        this.name = name; 
        this.traveled = false;
    }

    travel() {
        this.traveled = true;
    }
}

// constructor invocation 
const paris = new City("Paris", false);

paris.travel;  

/*  the constructor function initializes the instance
a constructor call creates a new empty object, which inherits properties from the constructor's prototype
with the property accessor, new myObject.myFunction, JS performs a constructor invocation, not a method invocation

new myObject.myFunction() - function is first extracted using the property accessor extractedFunction = myObject.myFunction,
then invoked as a constructor to create a new object: new extractedFunction(). 
*/

function Foo() {
    // this is fooInstance
    // the object is initialized, this.property is assigned 
    this.property = "Default Value";
}

// constructor invocation where the context is fooInstance
const fooInstance = new Foo();
fooInstance.property;   // "Default Value"

// using class syntax available in ES2015, only the initialization happens in the constructor method
class Bar {
    constructor() {
        // this is barInstance
        this.property = "Default Value";
    }
}
// Constructor invocation- JS creates an empty object and makes it the context of the constructor()
// then I can add properties to the object using this keyword
const barInstance = new Bar();
barInstance.property;

/* 3.2 pitfall: forgetting about new 
Some JS functions create instances when invoked as functions ex. RegExp */
const reg1 = new RegExp("\\w+");
const reg2 = RegExp("\\w+");

reg1 instanceof RegExp; // true
reg2 instanceof RegExp;  // true

// JS creates equivalent regular expression objects
reg1.source === reg2.source;    // true

/* using a function invocation to create objects is a potential problem because some constructors may omit the logic to 
initialize the object when new keyword is missing */

// Vehicle function sets type and wheelsCount properties on the context object
function Vehicle(type, wheelsCount) {
    this.type = type;   
    this.wheelsCount = wheelsCount; 
    return this;    
}

// an object car is return which has the correct properties
const car = Vehicle("Car", 4);
car.type;   // "Car"
car.wheelsCount;    // 4

// this is window object, so a new object is not created
car === window; // true

function Vehicle(type, wheelsCount) {
    this.type = type;   
    this.wheelsCount = wheelsCount; 
    return this;    
}

// a new object is created and initialized
const car1 = new Vehicle("Car", 4);
car1.type;   // "Car"
car1.wheelsCount;    // 4

// makes sure the execution context is a correct object type
car1 instanceof Vehicle;    // true

// function invocation instead of a constructor invocation, an error is thrown
const brokenCar = Vehicle("Broken Car", 3);

/* indirect invocation - performed when a function is called using myFun.call() or myFun.apply() methods
functions in JS are first-class objects; the type of function object is Function
a function object has a list fo methods, including .call() and .apply()
.call() and .apply() are used to invoke the function with a configurable context

myFunction.call(thisArg, arg1, arg2, ...) accepts the first argument thisArg as the context of the invocation 
and a list of arguments arg1, arg2, ... that are passed as arguments to the called function

myFunction.apply(thisArg, [arg1, arg2, ...]) accepts the first argument thisArg as the context of the invocation 
and an array og arguments [arg1, arg2, ...] that are passed as arguments to the called function
4.1 this in an indirection invocation */

function sum(number1, number2) {
    return number1 + number2;
}

sum.call(undefined, 10, 2);     // 12
sum.apply(undefined, [10, 2]);      // 12

/* this is the value passed as first argument to .call() or .apply() in indirect invocation */

// indirect invocation is useful when a function should be executed within a specific context
// used to simulate a method call on an object
const rabbit1 = {name: "White Rabbit"};

function concatName(string) {
    console.log(this === rabbit1);  // true
    return string + this.name;
}

concatName.call(rabbit1, "Hello "); // "Hello White Rabbit"
concatName.apply(rabbit1, ["Bye "]);    // Bye White Rabbit"

// create hierarchies of classes in ES5 to call the parent constructor
function Runner(name) {
    console.log(this instanceof Rabbit);    // true
    this.name = name;
}

function Rabbit(name, countLegs) {
    console.log(this instanceof Rabbit);    // true
    
    // Indirect invocation. Call parent constructor.
    // makes an indirect call of the parent function to initialize the object
    Runner.call(this, name);
    this.countLegs = countLegs;
}

const myRabbit = new Rabbit("White Rabbit", 4);
myRabbit;   // {name: "White Rabbit", countLegs: 4}

/* bound function - function whose context and/or arguments are bound to specific values
create a bound function using .bind() method
.bind() creates a new function, whose invocation will have the context as the first argument passed to .bind()
the original and bound functions share the same code and scope, but different contexts and arguments on execution
myFunc.bind(thisArg[, arg1, arg2, ...) accepts the first argument thisArg as the context and an optional list of arguments
arg1, arg2, ... to bound to
.bind() returns a new function whose context is bound to thisArg and arguments to arg1, arg2, ... */

/* 5.1 this inside a bound function */

function multiply(number) {
    "use strict";
    return this * number;
}

// create a bound function with context; returns a new function object double, which is bound to number 2
// multiply and double have the same code and scope
const double = multiply.bind(2);

// invoke the bound function 
double(3);
double(10);

/* unlike .apply() and .call() methods, which invoke the function right away, the .bind() method only returns a new function
supposed to be invoked later with a pre-defined this value */

const numbers3 = {
    array: [3, 5, 10],

    getNumbers() {
        return this.array;
    }
};

// Create a bound function
// the context  of boundGetNumbers is bound to numbers3
const boundGetNumbers = numbers3.getNumbers.bind(numbers3);

// boundGetNumbers() is invoked with this as numbers3 and returns the correct array object
boundGetNumbers();  // [3, 5, 10]

const simpleGetNumbers = numbers3.getNumbers;
// this is window or undefined in strict mode, so the correct array is not returned 
simpleGetNumbers(); // undefined

/* .bind() makes a permanent context link and will always keep it
only the constructor invocation of a bound function can change an already bound context, but this is not normally done
5.2 tight context binding */

function getThis() {
    "use strict";
    return this;
}

const one = getThis.bind(1);

one();  // 1
one.call(2);  // 1
one.apply(2);  // 1
one.bind(2)();  // 1

new one();  // getThis{} object


/* lexical scope/static scope - based on where variables and blcoks of code are defined in the source code during the 
compilation phase rather than where the code is executed during runtime
arrow function - designed to declare the function in a shorter form and lexically bind the context */

const hello1 = (name) => {
    return "Hello " + name;
};

hello1("World");    // "Hello World"

[1, 2, 5, 6].filter(item => item % 2 === 0);   // [2, 6] 

/* arrow functions don't have the function keyword
when the arrow function has only 1 statement, I can even omit the return keyword 
an arrow function is anonymous, but its name can be inferred
an arrow function doesn't provide the arguments object, and the missing arguments is fixed using ES2015 rest parameters */

const sumArguments = (...args) => {
    console.log(typeof arguments);  // undefined
    return args.reduce((result, item) => result + item);
};

sumArguments.name;  // " "
sumArguments(5, 5, 6);  // 16

/* 6.1 this in arrow function 
arrow function takes this from the outer function where it is defined, aka resolves this lexically 

context transparency property */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    log() {
        console.log(this === myPoint);  // true

        // setTimeout() calls the arrow function with the same context (myPoint object) as the log() method
        // the arrow function inherits the context from the function where it is defined
        setTimeout(() => {
            console.log(this === myPoint);  // true
            console.log(this.x + ":" + this.y);     // "95:165"
        }, 1000);
    }
}
const myPoint = new Point(95, 165);
myPoint.log();

// if the arrow function is defined in the topmost scope (outside any function), the context is always the global object (window)
const getContext = () => {
    console.log(this === window);   // true
    return this;
};

console.log(getContext() === window);   // true 

// an arrow function is bound with the lexical this once and forever; this cannot be modified even when using the 
// context modification methods
const numbers4 = [1, 2];

(function() {
    const get = () => {
        console.log(this === numbers4); // true
        return this;
    };

    console.log(this === numbers4); // true
    get(); // [1, 2]

    get.call([0]); // [1, 2]
    get.apply([0]); // [1, 2]

    get.bind([0])(); // [1, 2]
}).call(numbers4);

/* pitfall: DO NOT define method with an arrow function */
function Period(hours, minutes) {
    this.hours = hours;
    this.minutes = minutes;
}

// defines a method format() on a class Period using an arrow function
// format() is defined in the global context/topmost scope, so this is the window object
Period.prototype.format = () => {
    console.log(this === window);   // true
    return this.hours + " hours and " + this.minutes + " minutes";
};

const walkPeriod = new Period(2, 30);

// window is kept as the context of invocation because the arrow function has a static context 
walkPeriod.format();    // "undefined hours and undefined minutes"

// function expression solves the problem because a regular function does change its context depending on invocation
function Period(hours, minutes) {
    this.hours = hours;
    this.minutes = minutes;
}

Period.prototype.format = function() {
    console.log(this === walkPeriod1);   // true
    return this.hours + " hours and " + this.minutes + " minutes";
};

const walkPeriod1 = new Period(2, 30);

// method invocation on an object with the context walkPeriod object
walkPeriod1.format();   // "2 hours and 30 minutes"  

