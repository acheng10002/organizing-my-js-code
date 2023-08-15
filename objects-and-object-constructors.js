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
A regerence can be made this the [[Prototype]] internal property from one object to another via the prototype property 

1. I try to access a property or method of an object, JS first searches on the object iself. 
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



