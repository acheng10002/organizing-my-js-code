/* 2 kinds of object properties:
   data properties
   accessor properties - functions that execute on getting and setting a value, but look like regular properties to an external code */

// Clock class creates a clock that displays the current time
class Clock {

    // constructor method that accepts an object with a template property that specifies the format of the clock display
    constructor({template}) {
        this.template = template;
    }

    // calculates the current time and formats it according to the template
    render() {
        // creates a new Date object to get the current date and time
        let date = new Date();

        // extracts the hours, minutes, and seconds from the date object, ensuring that single digit values are padded with a leading zero
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;
  
        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;
  
        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;
  
        // replace the placeholders 'h', 'm', and 's' in the template with the calculated hours, minutes, and seconds
        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);
  
        console.log(output);
    }
    
    // clears the interval timer (`this.timer`) that is responsible for periodically updating the clock
    // it stops the clock from updating
    stop() {
        clearInterval(this.timer);
    }

    // starts the clock
    start() {

        // initially calls the render method to display the current time
        this.render();

        // sets up an interval timer (`setInterval`) to call the render method every 1000 ms, ensuring the clock updates every second
        this.timer = setInterval(() => this.render(), 1000);
    }
}

// creates a new instance of the Clock class, passing an object with a template property
let clock = new Clock({template: 'h:m:s'});

// calls the start method on the clock instance
clock.start();

// function Clock({ template }) {
  
//     let timer;
  
//     function render() {
//         let date = new Date();
  
//         let hours = date.getHours();
//         if (hours < 10) hours = '0' + hours;
  
//         let mins = date.getMinutes();
//         if (mins < 10) mins = '0' + mins;
  
//         let secs = date.getSeconds();
//         if (secs < 10) secs = '0' + secs;
  
//         let output = template
//             .replace('h', hours)
//             .replace('m', mins)
//             .replace('s', secs);
  
//         console.log(output);
//     }
  
//     this.stop = function() {
//         clearInterval(timer);
//     };
  
//     this.start = function() {
//       render();
//       timer = setInterval(render, 1000);
//     };
  
//   }
  
//   let clock = new Clock({template: 'h:m:s'});
//   clock.start();



// GETTERS AND SETTERS
   let obj = {
    // getter, the code executed on getting obj.propName
    // getters works when obj.propName is read
    get propName() {
    },

    // setter, the code executed on setting obj.propName = value
    // setter works when on obj.propName is assigned
    set propName(value) {
    }
};


let user = {
    name: "John",
    surname: "Smith",

    // I want to add a fullName property that should be "John Smith", so implementing it as an accessor here
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

// this IS NOT calling user.fullName as a function, I read it normally; the getter runs behind the scene
alert(user.fullName);


let user1 = {
 get fullName() {
    return `...`;
 }
};

user1.fullName = "Test"; // Error - returns "Test" instead of "..."? (property has only a getter)


let user3 = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};

// set fullName is executed with the given value
// now I have a "virtual" property, fullName, and it is readable and writable
user3.fullName = "Alice Cooper";

alert(user3.name); // Alice
alert(user3.surname); // Cooper



// ACCESSOR DESCRIPTORS
/* for accessor properties, there is no value or writable, instead there's get and set functions
   an accessor descriptor may have
   get - a function without arguments, that works when a property is read
   set - a function with one argument, that is called when the property is set
   enumerable - same as for data properties
   configurable - same as for data properties */

// ex. an accessor fullName with defineProperty, and I can pass a descriptor with get and set
let user4 = {
    name: "John",
    surname: "Smith"
};

Object.defineProperty(user4, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`;
    },

    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});

alert(user.fullName); // John Smith

for (let key in user) alert(key); // name, surname

/* a property can be either an accessor (has get/set methods) or a data property (has a value), not both */

// if I try to supply both get and value in the same descriptor, there will be an error
// Error: Invalid property descriptor
// Object.defineProperty({}, 'prop', {
//     get() {
//         return 1
//     },

//     value: 2
// })



// SMARTER GETTERS/SETTERS
/* getters/setters can be used as wrappers over "real" property values to gain more control over operations with him */
// ex. if I want to forbid too short names for user5, I can have a setter name and keep the value in a separate property _the name;
let user5 = {
    get name() {
        return this._name;
    },

    // have a setter name
    set name(value) {
        if (value.length < 4) {
            alert("Name is too short, need at least 4 characters");
            return;
        }
        // keep the value in a separate property -_name
        this._name = value;
    }
}
/* _name stores the name, and access is done via getter and setter 
   external code is able to access the name by using user._name, 
   but the convention is properties starting with an "_" are internal and should not be touched from outside the project */



// USING FOR COMPATIBILITY 
/* using accessors for taking control over a data property at any moment */
function User(name, age) {
    this.name = name;
    this.age = age; 
}   

let john = new User("John", 25); 

alert(john.age); // 25


/* I may decide to store birthday instead of age, bc it's more precise and convenient,
   but I can also keep age by adding a getter for age */
function UserOne(name, birthday) {
    this.name = name;
    this.birthday = birthday;

    //
    Object.defineProperty(this, "age", {
        get() {
            let todayYear = new Date().getFullYear();
            return todayYear - this.birthday.getFullYear();
        }
    });
}

let john1 = new UserOne("John", new Date(1992, 6, 1));

alert(john1.birthday); // Wed Jul 1992 00:00:000 GMT-0400 (Eastern Daylight Time)

// now the old code works too and I have an additional property
alert(john1.age); // 31



// THE "CLASS" SYNTAX
/* class - extensible program-code template for creating objects, providing initial values for state (member variables) and 
           implementations of behavior (member functions or methods) 
   in JS, a more advanced "class" construct introduces great new features that are useful for object-oriented programming */

class MyClass {
    // class methods
    constructor() {}
    method1() {}

    // *** no commas between class methods (commas go between methods in object literals)
    method2() {}
    method3() {}
}



// WHAT IS A CLASS?
/* use new MyClass() to create a new object with all the listed methods
   the constructor() method is called automatically by new, so I can initialize the object there */

// 1. creates a function named UserTwo that becomes the result of the class declaration
class UserTwo {

    // 1. function code is taken from the constructor method
    //    constructor method is a special method of a class for creating and initializing an object instance of that class
    //    a class method called constructor cannot be a getter, setter, async, or generator
    //    a class cannot have more than one constructor method
    //    constructor enables me to provide any custom initialization that must be done before any other methods can be 
    //    called on an instantiated object
    constructor(name) {
        this.name = name;
    }
    // 2. class methods are stored in UserTwo.prototype
    sayHi() {
        alert(this.name);
    }
}

// a class is a kind of function
alert(typeof UserTwo); // function

// a new UserTwo object is created
// the constructor runs with the given argument and assigns it to this.name
let user6 = new UserTwo("John");

// this way, I can call object methods like sayHi()
// when I call sayHi(), it's taken from the user6.prototype, so the object has access to class methods
user6.sayHi();


class UserThree {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        alert(this.name);
    }
}

// class is the constructor method 
alert(UserThree === UserThree.prototype.constructor); // true

// the methods are in UserThree.prototype
alert(UserThree.prototype.sayHi); // the code of the sayHi method

// there are two methods in the prototype
alert(Object.getOwnPropertyNames(UserThree.prototype)); // constructor,sayHi



// NOT JUST A SYNTACTIC SUGAR
/* rewrite class UserFour in pure functions */
// 1. Create constructor function
function UserFour(name) {
    this.name = name;
}

// a function prototype has "constructor" property by default, so I don't need to create it

// 2. Add the method to the prototype
UserFour.prototype.sayHi = function() {
    alert(this.name);
};

let user7 = new UserFour("John");
user7.sayHi();

/* class can be considered a syntactic sugar to define a constructor together with its prototype methods
   syntactic sugar - syntax designed to make things easier to read, but doesn't introduce anything new 
   
   three differences between class vs pure functions 
   1. a function created by class is labelled by a special internal property [[IsClassConstructor]]: true 
      language checks for that property in a number of places */

class Product {
    constructor() {}
}

alert(typeof Product); // function
// Product(); // Error: Class constructor Product cannot be invoked with 'new'

/* 2. class methods are non-enumerable: class definition sets enumerable flag to false for all methods in the "prototype"
      this is good because if I for...in over an object, I usually don't want its class methods
      
   3. classes always use strict; all code inside the class construct is automatically in strict mode */



// CLASS EXPRESSION 
/* classes can be defined inside another expression, passed around, returned, assigned, etc. */
let UserFive = class {
    sayHi() {
        alert("Hello");
    }
};

// similar to named function expressions, class expressions may have a name
let UserSix = class MyClass1 {
    sayHi() {
        alert(MyClass1);
    }
};

new UserSix().sayHi(); // wroks, shows MyClass1 definition

// alert(MyClass1); // Reference error, MyClass1 name isn't visible outside of the class

// I can make classes dynamically "on-demand" like this
function makeClass(phrase) {
    // declares a class and returns it
    return class {
        sayHi() {
            alert(phrase);
        }
    };
}

/* if I don't provide my own constructor, then a default constructor will be supplied for me 
   if my class is a base class, the default constructor is empty
   if my class is a derived class, the default constructor calls the parent constructor, passing along any arguments 
   that were provided */

// the `name` property of an error object is determined by the constructor function that was used to create the error object
/* the `ValidatioError` class does not explicitly set the `name` property, so when I throw an instance of `ValidationError`,
   it inherits the `name` property from the `Error` class, whcih defaults to "Error" */ 
class ValidationError extends Error {
    printCustomerMessage() {
        return `Validation failed :-( (details: ${this.message}))`;
    }
}

try {
    throw new ValidationError("Not a valid phone number");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(error.name); // This is Error instead of ValidationError!
        console.log(error.printCustomerMessage());
    } else {
        console.log("Unknown error", error);
        throw error;
    }
}

/* if I provide my own constructor, and my class derives from some parent class, then I must explicitly call the parent
   class constructor using super() 
   here in the ValidationError constructor, the this.name property is explicitly set to ValidationError
   when I throw an instance of ValidationError, it retains the custom `name` property, so `error.name` is ValidationError */
class ValidationError1 extends Error {
    constructor(message) {

        // calls parent class constructor
        super(message);

        this.name = "ValidationError";
        this.code = "42";
    }

    printCustomerMessage() {
        return `Validation failed :-( (details: ${this.message}, code: ${this.code})`;
    }
}

try {
    throw new ValidationError1("Not a valid phone number");
} catch (error) {
    if (error instanceof ValidationError1) {
        console.log(error.name); // Now this is ValidationError!
        console.log(error.printCustomerMessage());
    } else {
        console.log("Unknown error", error);
        throw error;
    }
}

// Create a new class
let UserSeven = makeClass("Hello");

new UserSeven().sayHi(); // "Hello"



// GETTERS/SETTERS
// ex. for user.name implemented using get/set
// these class declarations work by creating getters and setters in UserEight.prototype
class UserEight {
    
    constructor(name) {
        // invokes the setter
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }
}

/* using new on a class:
   1. if it's a derived class, the constructor body before the super() call is evaluated
      super() is used inside a subclass constructor to call the constructor of the parent (or superclass)
      this part should not access this because it's not yet initialized
   2. if it's a derived class, the super() call is evaluated, which initializes through the same process
   3. the current class's fields are initialized 
   4. the constructor body after the super() call (or the entire body, if it's a base class) is evaluated 
   
   within the constructor body, I can access the object being created through this
   I can access the class that is called with new through new.target
   *methods, including getters and setters, and the prototype chain are already initialized on this before the 
    constructor is executed, so I can access the methods of the subclass from the constructor of the superclass 
    however, if those methods use this, the this will not have been fully initialized yet
    reading public fields of the derived class will result in undefined,
    reading private fields will result in a TypeError */

/* constructor method may have a return value
   the base class may return anything from its constructor
   the derived class must return an obejct or undefined, or a TypeError will be thrown */ 
class ParentClass {
    constructor() {
        return 1;
    }
}

// The return value is ignored because it's not an object
console.log(new ParentClass()); // ParentClass{}

class ChildClass extends ParentClass {
    constructor() {
        return 1;
    }
}

// console.log(new ChildClass()); // TypeError (derived constructors may only return object or undefined)

/* 1. parent class constructor returning an object
      - when the constructor of a parent class return an object (an instance of some other class), JS will use
        this returned object as the value of `this` for the derived class
        `this` context determines where class fields and properties are defined
   2. class fields on the derived class
      - class fields, including private fields, are defined on the `this` object within the context of the class constructor
      - the specific object returned by the parent class constructor, it becomes the `this` context for the derived class
      - any class fields defined within the constructor of the derived class will be attached to this returned object 
   3. "return overriding trick" 
      - this trick overrides the usual behavior of `this` being an instance of the derived class
      - it allows the derived class's fields to be defined on an unrelated object, which was returned by the parent class constructor
      
   when the parent class constructor returns an object, that object becomes the `this` context for the dervied this, and 
   any class fields defined within the constructor of the derived class will be attached to this object */


class Person {
    constructor(name = "Anonymous") {
        this.name = name;
    }

    introduce() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const person1 = new Person();
person1.introduce(); // Hello, my name is Anonymous


// constructor must be a literal name; computed properties cannot become constructors
// nor can async methods, generator methods, accessors, and class fields
// private names cannot be called #constructor
class Foo {

    // this is a computed property; it will not be picked up as a constructor 
    ["constructor"]() {
        console.log("called");
        this.a = 1;
    }
}

const foo = new Foo(); 
console.log(foo); // Foo {}
foo.constructor(); // "called"
console.log (foo); // Foo {a: 1}

class Polygon {
    constructor() {
        this.name = "Polygon";
    }
}

class Square extends Polygon {

    // constructor calls the parent class' constructor with lengths
    constructor(length) {

        // provided for the Polygon's width and height
        // in derived classes, `super()` must be called before I can use `this`; leaving it out will cause a ReferenceError
        super(length, length);
        this.name = "Square";
    }

    get area() {
        return this.height * this.width;
    }

    set area(value) {
        this.height = value ** 0.5;
        this.width = value ** 0.5;
    }
}


class Rectangle {
    constructor() {
        this.name = "Rectangle";
    }
}


class Square1 extends Polygon {
    constructor() {

        // super() calls the constructor that's the prototype of the current class, 
        // constructor() { this.name = "Rectangle";}
        super();

    }
}

// changes the prototype of the Square class to be Rectangle class instead of Polygon
// Square inherits from Rectangle instead of Polygon
Object.setPrototypeOf(Square1, Rectangle);

const newInstance = new Square1();

// newInstance is still an instance of Polygon because I didn't change the prototype of the Square.prototype, so the
// prototype chain of newInstance is still newInstance --> Square.prototype --> Polygon.prototype
console.log(newInstance instanceof Polygon); // true

console.log(newInstance instanceof Rectangle); // false

// super() calls Rectangle as constructor, so the name property of newInstance is initialized with the logic in Rectangle
console.log(newInstance.name); // Rectangle


// if I change the protoype of the current class, super() will call the constructor that's the new prototype
// if I change the prototype OF THE PROTOTYPE of the current class, the constructor super() calls won't be affected

let user8 = new UserEight("John");
alert(user8.name); // "John"

user8 = new UserEight(""); // "Name is too short.""



// COMPUTED NAMES [...]
// computed property names - allow me to create an object property whose name is not a fixed string or identifier but is determined 
// dynamically at runtime by evaluating an expression
// ex. with a computed method using brackets
class UserNine {
    ["say" + "Hi"]() {
        alert("Hello");
    }
}

const expr = "foo";

const obj5 = {
    // regular property definition
    baz: "bar",

    // computed property name [expr] evaluates to "foo"
    set [expr](v) {

        // setter method takes an argument v, and sets the value of the baz property to the value of v
        this.baz = v;
    },
};

console.log(obj.baz); // "bar"

// setter takes baz as its arguments, and sets the value of the baz property to baz
obj.foo = "baz";

console.log(obj.baz); // "baz"

new UserNine().sayHi();



// CLASS FIELDS
// class fields - syntax that allows me to add any properties
// ex. add name property to class UserTen
class UserTen {
    // just write "=" in the declaration, and that's it
    name = "John";

    sayHi() {
        alert(`Hello, ${this.name}!`);
    }
}

new UserTen().sayHi(); // Hello, John!

let user10 = new UserTen();

alert(user10.name); // John

// class fields are set on individual objects, not User.prototype
alert(UserTen.prototype.name); // undefined


// more complex expressions and function calls can be used to assign values
class UserEleven {
    name = prompt("Name, please?", "John");
}

let user11 = new UserEleven();
alert(user11.name); // John

// the name of a static field or method cannot be prototype
// the name of a class field, static or instance, cannot be constructor
const PREFIX = "prefix";


class ClassWithField {
    // each class always has a fixed set of field names

    // fields without initializers are initialized to undefined
    field;
    instanceField;
    instanceFieldWithInitializer = "instance field";

    static staticField;
    static staticFieldWithInitializer = "static field";

    // field names may be computed
    // computed field names are only evaluated once at class definition time
    [`${PREFIX}Field`] = "prefixed field";
}

// public fields are added to the instance either at construction time in the base class (before the construction body runs)
// (or just after super() returns in a subclass)
const instance1 = new ClassWithField();
console.log(Object.hasOwn(instance1, "field")); // true
console.log(instance1.field); // undefined
console.log(instance1.instanceFieldWithInitializer); // "instance field"
console.log(instance1.prefixField); // "prefixed field"

class E {
    [Math.random()] = 1;
}

console.log(new E());
console.log(new E());
// Both instances have the same field name


class Base {
    baseField = "base field";

    // this refers to the class instance under construction
    anotherBaseField = this.baseField;
    baseMethod() {
        return "base method output";
    }
}

class Derived extends Base {
    // super refers to the prototype property of the base class, 
    // which contains the base class's instance methods but not its instance fields
    subField = super.baseMethod();
}

const base = new Base();
const sub = new Derived();

console.log(base.anotherBaseField); // "base field"

// calls baseMethod() on the Base class (super.)
console.log(sub.subField); // "base method output"





class G {
    obj = {};
}

const instance4 = new G();
const instance5 = new G();

// the this value is different for each instance, so initializer expression can access instance-specific properties
console.log(instance4.obj === instance5.obj); // false

class Base1 {
    // instance fields of a class are added before the constructor runs, I can access the fields' values within the constructor
    constructor() {
        console.log("Base constructor:", this.field);
    }
}

class Derived1 extends Base1 {

    // field for the Derived1 class is initialized to 1
    field = 1;
    constructor() {

        // calls the constructor of Base1
        // this.field still refers to the field property of the Derived1 class, which is 1
        super();

        // instance fields of a derived class are defined after super() returns
        // so the base class's constructor does not have access to the derived class's fields
        console.log("Derived constructor:", this.field);

        // sets the field property of the Derived1 instance to 2
        this.field = 2;
    }
}
// field is not defined in the Base class
const instance6 = new Derived1(); // Base constructor: undefined
                                  // Derived constructor: 1

// the this.field assignment in the Derived class constructor overrides the field property inherited from the Base class, undefined
// property assignment in constructor of a derived class can override properties inhertied from a base class
console.log(instance6.field); // 2

class H {

    // fields are added one-by-one
    a = 1;

    // field initializers can refer to field values above it, but not below it 
    b = this.c;
    c = this.a + 1;
    d = this.c + 1;

    // all instance and static methods are added beforehand and can be accessed,
    // although calling them may not behave as expected if they refer to fields below the one being initialized
}

const instance7 = new H;
console.log(instance7.d); // 3
console.log(instance7.b); // undefined


/* field declarations in derived classes do not invoke setters in the base class
   this is different from using this.field = ... in the constructor */
class Base2 {
    set field(val) {
        console.log(val);
    }
}

class DerivedWithField extends Base2 {
    // DerivedWithField initializes field at the class level, so there's no need to log it during instance creation
    
    // directly initializes the field property to 1 within the DerivedWithField class
    // sets the field property at the class level
    field = 1;
}

// field property is directly initialized in the class, and there is no need for a setter to log its value
const instance8 = new DerivedWithField(); // No log

class DerivedWithConstructor extends Base2 {
    // DerivedWithConstructor sets the field property inside its constructor, which triggers the set accessor defined 
    // in the Base class, leading to the log output of 2

    constructor() {
        super();

        // property assignment in constructor of a derived class can override properties inhertied from a base class
        // field property is set to 2 in the constructor of DerivedWithConstructor class and that overrides 1 inherited from Base2
        this.field = 2;
    }
}

// set accessor of the field property in the Base class is triggered when I set the field property inside the 
// constructor of DerivedWithConstructor
// set accessor logs the value being set, which is 1
const instance9 = new DerivedWithConstructor(); // 2 

class Person2 {
    // name = nameArg; // nameArg is out of scope of the constructor

    // class fields cannot depend on arguments of the constructor, so field initializers usually evaluate to the same value for each instance
    name = "Dragomir";
    constructor(nameArg) {}
}

class Person1 {
     // declaring empty class fields is beneficial, because it indicates the existence of the field which allows type checkers
     // to statically analyze the shape of the class
     // explicit field declaration makes it clear which fields will definitely be present on the instance

     // public class fields - writable, enumerable, and configurable properties, unlike private class fields
     // they participate in prototype inheritance
     name;

     // fields without initializers are initialized to undefined
     age;

     constructor(name, age) {
        this.name = name;
        this.age = age;
     }
}

class Professor extends Person1 {
    // initializers are evaluated after the base class has executed, so I can access properties created by the base class constructor
    name = `Professor ${this.name}`;
}

console.log(new Professor("Radev", 54).name); // "Professor Radev"


// MAKING BOUND METHODS WITH CLASS FIELDS
/* functions in JS have a dynamic this; it depends on the context of the call
   if an object method is passed around and called in another context, this won't be a reference to its object any more */
class Button {
    constructor(value) {
        this.value = value;
    }

    click() {
        alert(this.value);
    }
}

let button = new Button("hello");

// this problem is called "losing this"
setTimeout(button.click, 1000); // undefined


/* two ways to fix this:
   1. pass a wrapper-function, such as setTimeout(() => button.click(), 1000)
   2. bind the method to object, e.g. in the constructor */
// 3. class fields provide another fix
// a separate function for each Button object with this inside it referencing that object
// button.click can be passed around anywhere, and the value of this will always be correct
class ButtonOne {
    constructor(value) {
        this.value = value;
    }
    // this class field is created on a per-object basis
    click = () => {
        alert(this.value);
    }
}

let button1 = new ButtonOne("hello");

setTimeout(button.click, 1000); // hello


// MyClass2 is a function (the one I provide as constructor)
class MyClass2 {
    prop = value; // property

    constructor() {} // constructor
    
    // methods, getters, and setters are written to MyClass2.prototype
    method() {} // method
    
    get something() {} // getter method
    set somethingElse(thing) {} // setter method

    [Symbol.iterator]() {} // method with computed name (symbol here)
    //
}

/* *** losing `this` problem 
   value of `this` is dynamically scoped, it depends on how a function is called rather than where it is defined 
   where I might encounter issues with `this`
   1. global context
      - when `this is used in the global scope or outside of any function, it refers to the global object 
      - can lead to unintentional modifications of global variables or global scope pollution 
   2. function context 
      - value of `this` inside a function depends on how the function is invoked 
      - in regular function calls, `this` is often set to the global object */


function myFunction() {
    console.log(this); // global object, e.g. window
}


/* 3. object methods 
      - when a function is used as an object's property, `this` refers to the object itself
      - if I extract the method and call it separately, I might lose the correct context
*/
const obj1 = {
    name: "John",
    greet: function() {
        console.log(`Hello, ${this.name}!`);
    }
};

obj1.greet(); // "Hello, John!"

const greetFunc = obj1.greet;

// "Hello, !" (loses `this` context)
greetFunc();


/* 4. event handlers 
      - value of `this` inside the handler function often refers to the DOM element that triggered the event, not the object where the function was defined

   Three Techniques for maintaining the correct value of `this`
   1. arrow functions inherit the `this` value from their surrounding context, which helps to avoid `this`
*/
const obj2 = {
    name: "John",
    greet: function() {
        setTimeout(() => {

            // `this` is obj2
            console.log(`Hello, ${this.name}!`);
        }, 1000);
    }
};

obj2.greet(); // "Hello, John!"

/*
   2. .bind() method allows me to explicitly set the value of `this` for a function and create a new function with the desired context 
*/
const obj3 = {
    name: "John",
    greet: function() {
        setTimeout(function() {

        // sets `this` as obj3 for the function and creates greet with the desired context 
            console.log(`Hello, ${this.name}!`);
        }.bind(this), 1000);
    }
};

obj3.greet(); // "Hello, John!"

/*
   3. using closures - use closures to capture the value of `this` in a different variable and use that variable inside nested functions
*/
const obj4 = {
    name: "John",
    greet: function() {
        const self = this;
        setTimeout(function() {
            console.log(`Hello, ${self.name}!`);
        }, 1000);
    }
};

obj4.greet(); // "Hello, John!"


/* classes - templates for creating objects 
   they encapsulate data with code to work on that data
   classes in JS are built on prototypes
   classes in JS have some syntac and semantics that are unique to classes */

// class declaration - one way to define a class
// class declarations have the same temporal dead zone restrictions as let or const and behave as if they are not hoisted
class Rectangle1 {

    // constructor - method for creating and initializing an object created with a class
    // constructor can use the super keyword to call the constructor of the super class
    // I can create instance properties inside the constructor
    // the values of instance properties can be defined as class fields
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

// class expression - the class is anonymous but assigned to a variable
const Rectangle3 = class {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};

/* `var` variable declarations are "hoisted" which means they are moved to the top of their containing function or block scope during the compilation phase
   - this allows me to use a variable before it's actually declared in the code 
   hoisting - behavior where variable declarations are moved to the top of their containing scope 
   class declarations have the same temporal dead zones restrictions as let or const and behave as if they are not hoisted */

console.log(x); // undefined
var x = 10;

// behaves like this:
// var x;
// console.log(x); // undefined
// x = 10;

/* let, const, and class declarations are not initialized with `undefined` during hoisting
   they are placed in a temporal dead zone (TDZ) until the actual declaration statement is reached in the code 
   during the TDZ, any attempt to access the variable results in a reference error */

// console.log(y); // ReferenceError: Cannot access `x` before initialization
let y = 10;


// class body - part that is in {}, where I define class members such as methods or constructor
// class body is executed in strict mode even without the "use strict"
class Rectangle2 {

    // a class element can be characterized by:
    // kind - getter, setter, method, or field/property
    // location - static or instance
    // visibility - public or private
    // there are 16 possible combinations

    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    // getter - public instance getter
    // get binds an object property to a function that will be called when that property is read
    // binds calcArea() property to area() function
    // getter always has zero parameters
    // getters allow access to a property that returns a dynamically computed value or
    // they reflect the status of an inernal variable 
    get area() {
        return this.calcArea();
    }

    // method definitions - public instance method
    // methods are defined on the protoype of each class instance and are shared by all instances
    // methods can be plain functions, async functions, generator functions, or async generator functions
    // it's a shorter syntax for defining a function property in an object initializer
    // method definitions are not constructable!
    calcArea() {
        return this.height * this.width;
    }

    // getSides() is a *generator method, special function that allows me to define an iterator by using `function` syntax 
    // generator methods allow me to pause and resume the execution of a function
    *getSides() {
        yield this.height;
        yield this.width;
        yield this.height;
        yield this.width;
    }
}

const square = new Rectangle2(10, 10); 

console.log(square.area); // 100
console.log([...square.getSides()]); // [10, 10, 10, 10]

// class expression - the class has its own name, different from the variable that it's assigned to
const Rectangle4 = class Rectangle4 {

    // class fields are similar to object properties, so I don't use keywords to declare them
    height = 0;

    // class fields without default values default to undefined
    width;
    constructor(height, width) {
        this.height = height;
        this.width = width; 
    }
};


/* generator methods are useful when making asynchronous API calls or handling events
   they simplify the management of async control flow by making it look more like sync code
   when an async operation is encountered, I can `yield` it and resume the generator when the operation is complete
*/
function* asyncGenerator() {
    // const result = yield fetch('https://api.example.com/data');
    // Do something with the resukt
}

const gen = asyncGenerator();
const promise = gen.next().value;


class ClassWithGetSet {
    #msg = "hello world";

    // defines public instance getter available to the ClassWithGetSet class
    // defined on the prototype property and is shared by all instances of the class
    get msg() {
        return this.#msg;
    }

    // defines public instance setter
    // defined on the prototype property and is shared by all instances of the class
    // set binds an object property to a function to be called when there is an attempt to set that property
    // setter executes a function whenever a specific property is attempted to be changed
    // setters in conjunction with getters create a type of pseudo-property
    set msg(x) {
        this.#msg = `hello ${x}`;
    }
}

const instance = new ClassWithGetSet();
console.log(instance.msg); // "hello world"

instance.msg = "cake";
console.log(instance.msg); // "hello cake"


/* extending built-in objects 
   any constructor that can be called with new and has the prototype property can be the candidate for the parent class */
class DateFormatter extends Date {
    getFormattedDate() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`;
      }
}
    
console.log(new DateFormatter('August 19, 1975 23:15:30').getFormattedDate()); // "19-Aug-1975"
  
class ParentClass1 {}

class ChildClass1 extends ParentClass1 {
    // ParentClass - an expression that evaluates to a constructor function (including a class) or null 
}


function OldStyleClass() {
    this.someProperty = 1;
}
OldStyleClass.prototype.someMethod = function() {};

class ChildClass2 extends OldStyleClass {}

class ModernClass {
    someProperty = 1;
    someMethod() {}
}

class AnotherChildClass extends ModernClass {}


// functions can be used as constructors to create objects
function ParentClass2() {}

// the prototype property should be an object used for defining properties and methods that will be inherited by instances created from ParentClass
// prototype property of the ParentClass must be an object or null, because
// a non-object prototype doesn't behave as it should
ParentClass2.prototype = 3;

class ParentClass3 {}

// extends clause expects the parent class to have a prototype that is a valid object, but it found a number instead
class ChildClass3 extends ParentClass3 {} // uncaught TypeError (class extends value does not have a valid prototype property 3)

// the prototype of an instance of ParentClass is actually an empty object with no prototype
console.log(Object.getPrototypeOf(new ParentClass3())); // [Object: null prototype] {} // not actually a number!


/* when I create a subclass using the extends keyword, both the class itself (its constructor function) and its prototype
inherit from the parent class and its prototype, respectively */
// ParentClass is the base class
class ParentClass4 {}

// ChildClass inherits properties and methods from ParentClass
class ChildClass4 extends ParentClass4 {}

// extends keyword establishes the prototype chain, so ChildClass inherits from ParentClass
// Allows inheritance of static properties
Object.getPrototypeOf(ChildClass4) === ParentClass4; // true

// the prototype of instances created from ChildClass also inherits from ParentClass.prototype
// Allows inheritance of instance properties
Object.getPrototypeOf(ChildClass4.prototype) === ParentClass4.prototype; // true

// super keyword is used to call the constructor of the parent class in the constructor of the derived class
class SomeClass extends class {

    // when an instance of the parent class is created, it will log "Base class" to the console
    constructor() {
        console.log("Base class");
    }
} {
    constructor() {

        // invokes the constructor of the parent class
        // so, when an instance SomeClass is created, it first executes the constructor of the parent class 
        // before executing its own constructor
        super();

        // constructor of SomeClass
        console.log("Derived class");
    }
}


// creates new instance of SomeClass
// it first invokes the constructor of the parent class, and then it invokes the constructor of SomeClass
new SomeClass(); // Base class
                 // Derived class


/* static - defines a static method or field for a class
   static properties are defined on the class itself instead of each instance
   static properties cannot be directly accessed on instances of the class 
   instead, they're accessed on the class itself
   
   static methods are utility methods/utility functions for an application, or to create or clone objects
   static properties are useful for caches, fixed-configuration, or any other data I don't need to be replicated across instances 
   
   cache - form of high-speed data storage used to store frequently accessed or recently used data to make subsequent
           access faster 
           it reduces latency, and can exist at various levels, including hardware and software */

/* static field initializers and static initialization blocks are evaluated one-by-one
   field initializers can refer to the field values above it, but not below it 
   all static methods are added beforehand and can be accessed */

   class Triple {
    // defines a static member (method or property) on a class
    static customName = "Tripler";
    static description = "I triple any number you provide";
    static calculate(n = 1) {
        return n * 3;
    }
}

class ParentClass5 {
    constructor() {
        return 1;
    }
}

// return value is ignored because it's not an object
// this is consistent with function constructors
console.log(new ParentClass5()); // ParentClass {}

class ChildClass5 extends ParentClass5 {
    constructor() {
        super();

        // if the derived class doesn't return an object or undefined, a TypeError will be thrown
        return 1;
    }
}

/* the base class may return anything from its constructor, the derived class must return an object or undefined
   or a TypeError will be thrown */
console.log(new ChildClass5()); // TypeError

/* if the parent class constructor returns an object, that object will be used as the this value for the derived class 
   when further initializing class fields 
   return overriding - allows a derived class's fields, including private ones, to be defined on unrelated objects */


/* extends keyword - used in class declarations or class expressions to create a class as a child of another constructor,
                     either a class or function 
   if there is a constructor present in the subclass, it needs to first call super() before using this */
// a class with a static member can be sub-classed
class SquaredTriple extends Triple {
    static longDescription;
    static description = "I square the triple of any number you provide";
    static calculate(n) {

        // super is used to call corresponding methods of super class
        return super.calculate(n) * super.calculate(n);
    }
}

console.log(Triple.description); // "I triple any number you provide"
console.log(Triple.calculate()) // 3
console.log(Triple.calculate(6)); // 18

const tp = new Triple();

console.log(SquaredTriple.calculate(3)); // 81 (not affected by parent's instantiation)
console.log(SquaredTriple.description); // "I square the triple of any number you provide"
console.log(SquaredTriple.longDescription); // undefined (bc it hasn't been assigned to anything)
console.log(SquaredTriple.customName); // "Tripler"

// console.log(tp.calculate()); // error: tp.calculate is not a function because calculate() is a static member, not an instance member
                                // how a static member cannot be called

/* make minimal changes to core methods, and I can ensure that the subclass maintains compatibility and expected
   behavior while adding or customizing specific functionality as needed 
   instance methods - methods defined within a class that can be classed on instances of that class
   delegation - an instance method in a subclass can rely on or defer to methods defined in the superclass when
                performing a task (i.e. a subclass can delegate some of its work to the superclass) 
   minimal set of primitive methods - when I override or redefine methods in a subclass, I should try to change as few
                                      methods as possible to achieve the desired behavior (i.e. only modify the most
                                      fundamental or primitibe methods that are necessary to alter the behavior

   I create a subclass of JS's built-in `Promise` class and override the `then()` method (used for handling successful
   asynchronous operators); it might automatically affect the behavior of catch() method (used for handling errors)
   because catch() often relies on the behavior defined in `then()` to handle errors

   I create a subclass of JS's built-in `Map` class and override the `set()` method (used for adding key-value pairs to
   the map; it might automatically change the behavior of the `Map()` constructor
   because when a new `Map` is created, it can use the `set()` method internally to populate its initial state)

   extending classes and ensuring expected behavior across various methods can be challenging due to how methods 
   rely on `this`, constructor functions, and maintaining compatibility with existing code 

   a better way to extend built-in classes is to use composition instead of inheritance
   - instead of directly inheriting from a built-in class and trying to modify its behavior, create a new class that 
     contains an instance of the built-in class (or other classes) as a property
   - I can customize the behavior of my new class by adding methods and properties that ineract with the contained instances
     I can then extend and modify the behavior of built-in classes without the complexities and potential issues of
     direct inheritance
*/


class StaticMethodCall {
    static staticProperty = "static property";
    static staticMethod() {

        // to call a static method or property within another static method of the same class, I can use the this keyword
        return `Static method and ${this.staticProperty} has been called`;
    }
    static anotherStaticMethod() {
        return `${this.staticMethod()} from another static method`;
    }
}
StaticMethodCall.staticMethod(); // "Static method and static property has been called"
StaticMethodCall.anotherStaticMethod(); // "Static method and static property has been called from another static method"


class StaticMethodCall1 {
    constructor() {
        
        // static methods are not accessible using the this keyword from non-static methods
        // I need to call them using the class name 
        console.log(StaticMethodCall1.staticProperty); // "static property"
        console.log(StaticMethodCall1.staticMethod()); // "static method has been called"

        // or I need to call the method as a property of the constructor 
        console.log(this.constructor.staticProperty); // "static property"
        console.log(this.constructor.staticMethod()); // "static method has been called"
    }
    static staticProperty = "static property";
    static staticMethod() {
        return "static method has been called.";
    }
}


/* extends null was designed to allow easy creation of objects that do not inherit from Object.prototype
   I need to explicitly return an instance from the constructor */
class NullClass extends null {
    constructor() {

        // using new.target allows derived classes to have the correct prototype chain
        return Object.create(new.target.prototype);
    }
}

const proto = Object.getPrototypeOf;

console.log(proto(proto(new NullClass()))); // null 


/* class fields are public by default
   private class members can be created by using a hash # prefix
   the privacy encapsulation of these class features is enforaced by JavaScript itself 
   by using private fields and not exposing them to external code, I create a separation between the public interface
   (what the external code can access) and the internal implementation (which is hidden)
    then I can make changes to the internal implementation without breaking the code that depends on the class,
    as long as the public interface remains stable */
class ClassWithPrivate {

    // all private identifiers declared within a class must be unique
    // the private identifier cannot be #constructor
    #privateField;
    #privateFieldWithInitializer = 42;

    #privateMethod() {
        // ...
    }

    static #privateStaticField;
    static #privateStaticFieldWithInitializer = 42;

    static #privateStaticMethod() {
        // ...
    }
}

/* private class features include features called private properties:
   private fields, private methods, private static fields, 
   private static methods, private getters, private setters,
   private static getters, private static setters 
   constructors cannot be private 
   
   to prevent classes from being constructed outside of the class, I have to use a private flag */


/* private fields are only accessible from inside the class declaration 
   private instance fields are only available on instances of the class */
class ClassWithPrivateField {

    // #privateField is private to ClassWithPrivateField and is not accessible from the derived subclass 
    #privateField;

    constructor() {;
        // delete this.#privateField; // syntax error, to attempt to remove declared properties with delete
        // this.#undeclaredField = 42; // syntax error, to refer to private properties that were not declared in the class body

        // private instance fields are added before the constructor runs in a base class 
        this.#privateField;
    }
    // const instance = new ClassWithPrivateField();
    // instance.#privateField = 42; // syntax error to refer to #names from outside fo the class
}

class Subclass extends ClassWithPrivateField {
    #subPrivateField;

    constructor() {

        // super() is used inside a subclass constructor to call the constructor of the parent (or superclass)
        super();

        // or private instance fields are added immediately after super() is invoked in a subclass
        this.#subPrivateField = 23;
    }
}

new Subclass(); 

const instance2 = new ClassWithPrivateField();
// instance2.#privateField; // syntax error


/* returning overriding object */

class Stamper extends class {

    // A base class whose constructor returns a different object that it's given
    // this object is used as the new this for the derived class constructor
    constructor(obj) {
        return obj;
    }
} {
    // this declaration will stamp the private field onto the object returned by the base class constructor
    #stamp = 42;
    static getStamp(obj) {
        return obj.#stamp;
    }
}

const obj7 = {};

// Stamper calls Base, which returns obj, so obj is now the this value
// Stamper then defines #stamp on obj
new Stamper(obj7);

console.log(obj7); 
console.log(Stamper.getStamp(obj7)); // 42
console.log(obj7 instanceof Stamper); // false

new Stamper(obj7); // Error: Initializing an object twice is an error with private fields
/* I should avoid returning anything from the constructor, especially something unrelated to this */


class C {
    #x;

    constructor(x) {
        this.#x = x;
    }

    // I can access private properties within static functions 
    static getX(obj) {

        // I can use the in operator to check whether an externally defined object possesses a private property
        if (#x in obj) return obj.#x;

        return "obj must be an instance of C";
    }
}

console.log(C.getX(new C())); // undefined, if the object does have the property
// console.log(C.getX({})); // TypeError, if I access a private property from an object that doesn't have the property
// I can access private properties within static functions too, and on externally defined instances of the class

// I can access private properties on externally defined instances of the class
console.log(C.getX(new C("foo"))); // "foo"
console.log(C.getX(new C(0.196))); // 0.196
console.log(C.getX(new C(new Date()))); // the current date and time
console.log(C.getX({})); // "obj must be an instance of C"

/* if I find an object possesses one private property of the current class (either from a try...catch or an in check,
   it must possess all other private properties 
   an object having the private properties of a class generally means it was constructed by that class 
   private properties aren't inherited by subclass and can only be accessed within the current class' body, so
        they're not part of the prototypical inheritance 
   Object.freeze() and Object.seal() */
function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return a / b;
    } catch (error) {
        console.error("An error occurred", error.message);
        return undefined;
    }
}

const result = divide(8, 0);
console.log("Result 2:", result); // An error occurred: Division by zero is not allowed


/* always access private static fields through the class name, not through this */
class ClassWithPrivateStaticFieldAndMethods {

    // unlike public instance fields, private instance methods are installed immediately before the instance fields are installed
    // they're only available on instances of the class, not on its .prototype property
    #privateMethod() {
        return 42;
    }
    
    publicMethod() {
        return this.#privateMethod();
    }

    // private static methods are added to the class constructor at class evaluation time, and 
    // they're only available on the class itself
    static #privateStaticMethod() {
        return 42;
    }

    // only the class which defines the private static field can access the field
    static #privateStaticField = 42;

    static publicStaticMethod() {

        // this refers to the Subclass class (not the ClassWithPrivateStaticFieldAndMethods)
        return ClassWithPrivateStaticFieldAndMethods.#privateStaticMethod(), this.#privateStaticField;
    }
}

class Subclass1 extends ClassWithPrivateStaticFieldAndMethods {
    static callSuperMethod() {
        return super.publicStaticMethod();
    }
}

// Subclass1.publicStaticMethod(); // TypeError: Cannot read private member #privateStaticField from
                                   // an object whose class did not declare it, Subclass1
                                   // ClassWithPrivateStaticFieldAndMethods declared it

// Subclass1.callSuperMethod(); // TypeError: Cannot read private member #privateStaticField from an
                                // object whose class did not declare it
                                // super methods are not called with the super class as this,
                                // this again refers to the Subclass class

const instance3 = new ClassWithPrivateStaticFieldAndPrivateMethod();
console.log(instance3.publicMethod()); // 42

console.log(ClassWithPrivateStaticFieldAndPrivateMethod.publicStaticMethod()); // 42

/* access private static fields through the class name, not through this
   private instance methods may be 
   generator- function that can be paused and resumed during its execution
              it returns a special type of iterator object called a generator, 
   async-, 
   async generator- function, 
   or private getters and setters */

/* generator functions are useful for dealing with asynchronous code, such as making async calls to a server 
   they let me write async code in a more sequential and readable manner using yield and await 
   often used to handle complex async logic or processing large datasets in a memory efficient manner */
function *simpleGenerator() {

    // yield states are points at which the generator function's execution can be paused and a value can be returned
    yield 1;

    // generator function returns an object with a value and done property
    yield 2;

    // the value is the value being yielded and done is a boolean that indicates if the generator has finished
    yield 3;
}

// simpleGenerator() returns a generator object
const generator = simpleGenerator();

// use .next() method on the generator object to execute the generator function until the next yield statement
console.log(generator.next()); // {value: 1, done: false}
console.log(generator.next()); // {value: 2, done: false} 
console.log(generator.next()); // {value: 3, done: false} 

// keep calling next() to continue the execution until there are no more yield statements, at which point done becomes true
console.log(generator.next()); // {value: undefined, done: true} 

// async keyword; async functions simplify working with promises and make asynch code look more like sync code
async function fetchData() {
    try {
        // await keyword, pauses the execution of the function until a promise is resolved
        // await pauses execution until the fetch operation completes and resolves the response promise
        // fetch - built-in JS function commonly used to make HTTP requests to retrieve data from a remote server or API
        //         it's part of the web platform API and is widely supported in modern web browsers
        const response = await fetch('https://api.example.com/data');

        // another await used to pause until the JSON data is parsed from the response
        const data = await response.json();

        // inside an async function, if I use a return statement with a value, it's automatically wrapped in a resolved promise
        // (if I use return without a value, it's equivalent to returning undefined)
        return data;

    // handles an error during the fetch or JSON parsing
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// fetch is a tool for working with remote resources in JS apps, particularly in web dev when I need to interact with 
// APIs to retrieve data
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        // Use the JSON data
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occured during the fetch
        console.error('Fetch error:', error);
    });

class ClassWithPrivateAccessor {
    #message;

    get #decoratedMessage() {
        return `🎬 ${this.#message} 🛑`;
    }
    set #decoratedMessage(msg) {
        this.#message = msg;
    }

    constructor() {
        this.#decoratedMessage = "hello world"
        console.log(this.#decoratedMessage);
    }
}

// unlike public methods, private methods are not accessible on the .prototype property of their class
class D {
    #method() {}

    static getMethod(x) {
        return x.#method;
    }
} 

console.log(C.getMethod(new D())); // [Function: #method]
console.log(C.getMethod(D.prototype)); // TypeError: Receiver must be an instance of class D

new ClassWithPrivateAccessor(); // 🎬 hello world 🛑


class PrivateConstructor {

    // this is the private static flag for marking a constructor as private
    static #isInternalConstructing = false;

    constructor() {

        // use the flag to check whether it's allowed to create a new instance
        // if the flag is not set, it can prevent instantiation 
        if (!PrivateConstructor.#isInternalConstructing) {
            throw new TypeError("PrivateConstructor is not constructable");
        }
        PrivateConstructor.#isInternalConstructing = false;
    }

    // sets the flag to allow instantiation outside of the class itself
    static create() {

        // if the flag is set, it can allow instantiation through static factory methods
        // instances are created using the create() static factory method
        // directly instantiation using new PrivateConstructor() is restricted
        PrivateConstructor.#isInternalConstructing = true;
        const instance = new PrivateConstructor();
        return instance; 
    }
}

new PrivateConstructor(); // TypeError: PrivateConstructor is not constructable
PrivateConstructor.create(); // PrivateConstructor {}


// static keyword defines a static field or method for a class or a static initialization block
// static properties cannot be directly accessed on instances of the class
// static properties are accessed on the class itself
class ClassWithStaticMethod {

    // the name of a static property, field or method, cannot be prototype
    static staticProperty = "someValue";
    static staticMethod() {
        return "static method has been called.";
    }
    
    // the name of a class field, static or instance, cannot be constructor
    
    static {
        console.log("Class static initialization block called");
    }
}

console.log(ClassWithStaticMethod.staticProperty); // someValue
console.log(ClassWithStaticMethod.staticMethod()); // static method has been called


class ClassWithStaticField {

    // public static features are added to the class constructor at the time of class evaluation
    // they are accessed again from the class constructor
    // public static fields are useful when I want a field to exist only once per class, not on every class instance I create 
    // static fields without initializers are initialized to undefined
    static staticField;
    static staticFieldWithInitializer = "static field";

    static baseStaticField = "base static field";

    // this refers to the current class, which I can access through its name
    static anotherBaseStaticField = this.baseStaticField;

    static baseStaticMethod() {
        return "base static method output";
    }
}


class SubclassWithStaticField extends ClassWithStaticField {
    static subStaticField = "subclass field";

    // super refers to the base class constructor
    static subStaticField1 = super.baseStaticMethod();

    // public static fields are not reinitialized on subclasses, but can be accessed via prototype chain
}

console.log(Object.hasOwn(ClassWithStaticField, "staticField")); // true
console.log(ClassWithStaticField.staticField); // undefined
console.log(ClassWithStaticField.staticFieldWithInitializer); // "static field"
console.log(SubclassWithStaticField.staticFieldWithInitializer); // "static field" // accessed via prototype chain
console.log(SubclassWithStaticField.subStaticField); // "subclass field"
console.log(ClassWithStaticField.anotherBaseStaticField); // "base static field"
console.log(SubclassWithStaticField.subStaticField1); // "base static method output"
/* static field names can be computed 
   the this value in the computed expression is the this surrounding the class definition */


class Rectangle5 {

    // private fields refine class field definitions
    #height = 0;
    #width;
    constructor(height, width) {
        this.#height = height;
        this.#width = width;
    }
}

/* promise - an object that represents the eventual completion or failure of an async operation and its resulting value 
             promises make it easier to handle async tasks such as fetching data from a server, reading files, or handling
             timeouts 
   promises habe three states: pending, fulfilled (resolved), or rejected 
   promises have two main methods for handling their states and values:
   - then() - used to register callbacks that will be invoked when the Promise is fullfilled or rejected
              two callback functions can be provided as arguments, one for success (fullfilled) and one for failure (rejected)
   - catch() - shorthand for handling only the rejection of a Promise */



/* two special class element syntaxes: constructor and static initialization block */
/* static initialization block - code block within a class that is executed only once when the class is loaded by the Java
                                 Virtual Machine; it is used to initialize static variables or perform one-time setup tasks for
                                 a class

   static initialization blocks also flexible initialization of static properties
   multiple static blocks can be declared, and these can be interleaved with the declaration of static fields and methods 
   all static items are evaluated in declaration order 
   
   static initialization block - contains statements to be evaluated during class initialization 
                                 they allow more flexible initialization logic, such as using try...catch or setting multiple fields from a single value
   initialization is performed in the context of the current class declaration, with access to private state, which allows
   the class to share information of its private properties with other classes or functions declared in the same scope */

class ClassWithStaticInitializationBlock {
    static staticProperty1 = "Property 1";
    static staticProperty2;
    static {
        this.staticProperty2 = "Property 2";
    }
}

console.log(ClassWithStaticInitializationBlock.staticProperty1); // Property 1
console.log(ClassWithStaticInitializationBlock.staticProperty2); // Property 2



// scope of the variables declared inside the static block to local to the block
// I cannot call super() in a class static initialization block
// I cannot use the arguments object in a class static initialization block
// I cannot use await or yield in the block
// the scope of the stic block can access private names declared within the class 
var y2 = "Outer y";
class I {
    static field = "Inner y";
    static {

        // the this refers to the constructor object of the class
        var y2 = this.field;
    }
}
console.log(y2); // "Outer y"

var y1 = "Outer y";


/* access to private properties
   access can be granted to a private instance field of a class from an outside outside the class */
let getAPrivateField;

 class A {
    #privateField;

    constructor(v) {
        this.#privateField = v;
    }

    static {
        getAPrivateField = (a) => a.#privateField;
    }

    // the class has static initialization blocks and interleaved static field initializers
    // the blocks and fields are evaluated in execution order
    // static variable
    static field1 = console.log("static field1"); // "static field1"

    // static initialization block
    static {
        console.log("static block1") // "static block1"
    }

    static field2 = console.log("static field2"); // "static field2"

    static {
        console.log("static block2") // "static block2" 
    }
    // output shows the blocks and fields are evaluated in execution order

    static field3 = "static field";

    // the this inside a static block refers to the constructor object of the class
    // how to access a public state field
    static {
        console.log(this.field3); // "static field"
    }

    static {
        // this refers to the constructor object of the class
        var y1 = this.field3;
    }
 }

// access can be granted to a private instance field of a class from an outside outside the class
console.log(getAPrivateField(new A("private"))) // "private"

class B extends A {
    static {
        // the super.property can be used inside a static block to reference static properties of a super class
        console.log(super.field3); // "static field"
    }
}

console.log(y1); // "Outer y"


class Animal {
    speak() {
        return this;
    }

    static eat() {
        return this;
    }
}

const obj6 = new Animal();
obj6.speak(); // Animal (object)
const speak = obj6.speak;

/* when a static or instance method is called without a value for this (ex. by assigning the method to a variable and then
   calling it, this value will be undefined
   code within the class body is always executed in strict mode */
speak(); // undefined

Animal.eat(); // Animal (class)
const eat = Animal.eat;
eat(); // undefined


/* extending plain objects 
   classes cannot extend regular (non-constructible) objects */
const Animal1 = {
    speak() {
        console.log(`${this.name} makes a noise.`);
    },
};

class Dog {
    constructor(name) {
        this.name = name;
    }
}
/* if I want to inherit from a regular object by making all properties of this object available on inherited instances,
   I can instead use Object.setPrototyperOf() */
Object.setPrototypeOf(Dog.prototype, Animal1); 

const d = new Dog("Mitzie");
d.speak(); // Mitzie makes a noise.

/* using extends Object might seem redundant because all objects already inherit from Object.prototype, but there are
   subtle differences related to static method inheritance
   
    all JS objects automatically inherit properties and methods from the Object.prototype object, including common
    methods like toString(), valueOf(), and others (i.e. every JavaScript object is, by nature, an extension of the
    Object type)

    static methods are methods associated with the constructor itself, not instances of the object
    objects created using extends Object, inherit static methods from the Object constructor such as Object.keys
        these static methods don't rely on the this value and don't provide much value when inherited

    special case with Object() constructor and super()
    when I use super() inside a constructor ofg a subclass:
    - it always creates a new object
    - the prototype of the new object is set to new.target.prototype where new.target represents the constructor 
      that was called 
    - any value passed to super() is ignored */


// extends the Object class which doesn't result in instance that behave like Number objects
class C1 extends Object1 {
    constructor(v) {
        super(v);
    }
}
// instanceof check returns false because C inherits from Object, not Number
console.log(new C1(1) instanceof Number); // false

// attempt to call a static method keys on the class C
// however, there is no such static method in the Object class, so this code results in a runtime error
console.log(C1.keys({a: 1, b: 2})); // ['a', 'b']


// extends a custom function MyObject and creates instances that behave as if they were instances of Number
// custom wrapper that does not special-case subclassing
function MyObject(v) {

    // the object created by MyObject is treated as if it were an instance of Number
    // because of automatic type coercion
    return new Object(v);
}
class F extends MyObject {
    constructor(v) {
        super(v);
    }
}
// new instance of D behaves as an instance of the Number class
console.log(new F(1) instanceof Number); // true


/* Species
   might want to return Array objects in my derived array class MyArray 
   species pattern lets me override default constructors 
   when using methods such as Array.prototype.map() that return the default constructor, I want these methods to 
   return a parent Array object instead of the MyArray object
   Symbol.species symbol lets me do this */
class MyArray extends Array {

    // overwrite species to the parent Array constructor
    static get [Symbol.species]() {
        return Array;
    }
}

const a = new MyArray(1, 2, 3);
const mapped = a.map((x) => x * x);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array); // true

/* mix-ins - abstract subclasses that are templates for classes 
   a class can only have a single superclass; the functionality must be provided by the superclass 
   they're reusable classes or modules that can be "mixed in" or added to other classes to enhance their
   functionality without inheritance 
   
   mixins should be -
   - reusable, designed to be used in multiple classes or objects promoting code resuse
               I can define a mixin once and then apply it various classes or objects 
   - composable, I can combine multiple mix-ins to create complex behaviors in a class
   - no inheritance, mixins do not create hierarchical relationships between classes 
   - modular, mixins can be developed and tested in isolation from the classes they are intended to augment 
   - selective application, I can choose which mixins to apply to a class, 
                            allowing me to tailor a class's behavior to specific requirements 
                            
   mixins are often used for logging, validation, or event handling to multiple classes without introducing 
   complex inheritance chains */

// defines a mixin for logging functionality
const LoggerMixin = {
    log(message) {
        console.log(`[Log]: ${message}`);
    },
};

// Create a class and apply the LoggerMixin
class User12 {
    constructor(name) {
        this.name = name;
    }
}

// Apply the LoggerMixin to the User class
// LoggerMixin is mixed into the User class, allowing instances of User to access the log method for logging methods
Object.assign(User12.prototype, LoggerMixin);

// Create a User instance with logging capability
const user12 = new User12("Alice");
user12.log("User created"); // [Log]: User created

// a function with a superclass as input
const calculatorMixin = (Base) =>

    //subclass extending the superclass as output 
    class extends Base {
        calc() {}
    };

// this can be used to implement mix-ins

const randomizerMixin = (Base) => 
    class extends Base {
        randomize() {}
    };

// how to write a class that uses mix-ins
class Foo1 {}
class Bar extends calculatorMixin(randomizerMixin(Foo1)) {}


/* avoiding inheritance
   all behaviors of the base class are inherited by the subclass by default */
// ReadOnlyMap is not constructible, because the Map() constructor calls the instance's set() method
class ReadOnlyMap extends Map {
    set() {
        throw new TypeError("A read-only map must be set at construction time.");
    }
}

const m = new ReadOnlyMap(["a", 1]); // TypeError: A read-only map must be set at construction time.

/* Liskov substitution principle - a subclass should be substitutable for its superclass 
   circle-ellipse problem - neither type perfectly entails the behavior of the other, although they are a lot of common traits 
   
   it's better to use composition
   composition - a class has a reference to an object of another class, and only uses that object as an implementation detail */

// ReadOnlyMap is not a subclass of Map
// ReadOnlyMap is not strong coupled to the Map Class, and does not easily break if the Map class is changed
// ReadOnlyMap is designed to mimic the behavior or of a standard Map while enforcing read-only access

// it's not a subclass of the built-in Map class, but it implements similar methods
class ReadOnlyMap1 {

    // defines the ReadOnlyMap class with a private instance field, #data
    #data;

    // constructor takes an iterable of values 
    constructor(values) {

        // initializes #data field as a new `Map` with the provided values
        // sets up the internal data structure
        this.#data = new Map(values);
    }

    // series of methods that delegate their functionality to the corresponding methods of the internal Map instance (#data)
    get(key) {

        // calls get method, forwarding the request for retrieving a value associated with a key
        return this.#data.get(key);
    }
    has(key) {
        return this.#data(key);
    }
    get size() {
        return this.#data.size;
    }
    *keys() {
        yield* this.#data.keys();
    }
    *values() {
        yield* this.#data.values();
    }
    *entries() {
        yield* this.#data.entries();
    }
    *[Symbol.iterator]() {
        yield* this.#data[Symbol.iterator]();
    }
}

/* the ReadOnlyMap class avoids being a subclass of Map, so changes to the Map class won't automatically affect the
   ReadOnlyMap class, reducing the risk of unexpected behavior due to changes in the Map class 
   by not inheriting directly from Map, the ReadOnlyMap class can better control its behavior
   if the Map class introduces a new method like emplace(), the ReadOnlyMap class won't be affected unless explicitly updated
   ReadONlyMap does not have a set method which accurately represents its read-only nature */


class Dog1 {

    // setup
    constructor() {

        // sound property assigned to Dog1 object
        this.sound = "woof"
    }

    // talk() method which uses sound property value
    talk() {
        console.log(this.sound)
    }
}

// instantiate a Dog1
const sniffles = new Dog1()

// call talk() on the sniffles instance
sniffles.talk() // "woof"

// if the talk() method is assigned to a click handler, things will break
// the this keyword inside the talk method will not be sniffles, instead the DOM element
$('button.myButton').click(sniffles.talk) // won't work

// bind forces the this to be sniffles
$('button.myButton').click(sniffles.talk.bind(sniffles))

// wrap the talk() function in a function
$('button.myButton').click(_ => sniffles.talk())


// Dog2 factory function
const Dog2 = () => {

    // sound variable is private to Dog2 (which it isn't in the class Dog1)
    const sound = "woof"
    return {
        // object literal with one property, a function that logs the value of sound
        // talk has access the value of sound because of closure
        talk: () => console.log(sound)
    }
}

// because there is no this, the reference to the sound variable will always be correct
$('button.myButton').click(sniffles.talk)



// the code outside the Dog2 factory function doesn't have access to the sound variable
const sniffles1 = Dog2()
sniffles1.talk() // "woof"


var me = "Bruce Wayne"
function greetMe() {
    console.log("Hello, " + me + "!")
}
/* no arguments needed when greetMe() is called
/ referring to the me that is assigned outside the function body
/ greetMe() doesn't copy, but reads the value of me from the outer scope, amd it would still read the value of me
 if it's async function being called from an AJAX callback 
 or even if it's greetMe() is called from a completely different part of the app or different module */
greetMe()

/* good use case for closures - start a task, and I want to specify something that happens when that task is done 
   and that something is specified with something available to me at the start of the task 
   closures make that easy and readable 
   
   in languages without support for closures, I would need a data object that I passed into the AJAX function, and then
   it would be passed into success */
function sendRequest() {
    var requestID = "123"

    // standard jQuery AJAX function
    $.ajax({

        // call an url
        url: "/myUrl",

        // success function is also a closure
        // it has access to requestID even tho the success callback is executed much later
        success: function(response) {
            alert("Request " + requestID + " returned")
        }
    });
} 

/* Fun Fun Function's Closures Recap
   in JS, function are not just functions; they're also closures
   function body has access to variables that are defined outside the function

   JS functions are closures, and this behavior cannot be done in languages with no support for closures
   in other words, JS functions have access to variables outside its function scope
   
   Fun Fun Function's Factory Functions Recap
   factory functions - functions that create objects and return them 
                       in most cases, factories can be used instead of classes
   if I need to create a lot of objects...maybe use classes because classes have a bit better performance when dealing with
   lots of objects, like 10,000 instances per frame

   Fun Fun Function's Composition over Inheritance
   inheritance - design my types around what they are
   composition - design my types around what they do 
   
   limitations of inheritance - solved by composition */

/* I get stuck in an inheritance hierarchy, and I cannot fit a MurderRobotDog in the hierarchy 

GameObject
    .bark()
        Robot
            .drive()
                MurderRobot
                    .kill()
                CleaningRobot
                    .clean()
                MurderRobotDog
                    X.bark()
   
        Animal
            // cannot have duplicate methods, so poop() is lifted up to an Animal parent class
            .poop()
                Dog
                    X.bark() 
                Cat
                    .meow() 
            
   project manager wants a MurderRobotDog, one that call .kill(), .drive(), .bark() but not .poop() 
   
   this is better...
    Robot
        .drive()
            MurderRobot
                .kill()
            CleaningRobot
                .clean()
            MurderRobotDog
                .bark()
   
    Animal
        .poop()
            Dog
                .bark() 
            Cat
                .meow() 
                
   but composition could far improve this
   Dog            = pooper + barker
   Cat            = pooper + meower
   CleaningRobot  = driver + cleaner
   MurderRobot    = driver + killer
   MurderRobotDog = driver + killer + barker 
   
   make this composition happen with normal factory functions and normal object literals

   // MurderRobotDog factory function
   const MurderRobotDog = (name) => {

    // state object
    let state = {

        // assigns name from the function argument
        name,
        speed: 100,
        position: 0
    }
    // Object.assign takes a new empty object, and then assigns it the properties of another object
    // merges barker, driver, and killer into a new object and return this new object
    return Object.assign(
        {},
        barker(state),
        driver(state),
        killer(state)
    )
   }
   MurderRobotDog("sniffles").bark() // "Woof, I am sniffles"


   // both barker and driver accept their state as function parameters
   const barker = (state) => ({
    bark: () => console.log("Woof, I am " + state.name)
   })
   
   const driver = (state) => ({
    drive: () => state.position = state.position + state.speed
   })
   
   barker({name: "karo"}).bark() // "Woof, I am karo" 
   
   object.assign - handy function integrated into ECMAScript 6 
   
   if some things have a is-a relationship, maybe use inheritance...
   ex. Mathias is a man, use inheritance
       A car has an engine, use composition */