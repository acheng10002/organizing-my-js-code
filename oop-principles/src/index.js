// SINGLE RESPONSIBILITY PRINCIPLE
import { logMessage } from './logger.js';
// function that should check if a game over condition has been meet

// the function and module it's in, should not directly be the one to manipulate the DOM
/* like this...
function isGameOver() {
    game over logic goes here!

    if (gameOver) {
        DOMStuff.gameOver(this.winner);
    }
}
*/

/* isGameOver function should only be responsible for checking if the gameOver condition is met
based on isGameOver return value, the function that handles the game loop should be responsible 
for deciding whether to call DOMStuff.gameOver(this.winner) or not
*/
// function isGameOver() {
//     if (gameOver) {
//         const gameOverDiv = document.createElement('div');
//         gameOverDiv.classList.add('game-over');
//         gameOverDiv.textContent = `${this.winner} wont he game!`;
//         document.body.appendChild(gameOverDiv);
//     }
// }

class CalorieTracker {

    // input daily maxCalories 
    constructor(maxCalories) {
        this.maxCalories = maxCalories
        this.currentCalories = 0
    }

// responsibility 1: tracking how calories are counted
    // track calories by adding on calories passed to it, to currentCalories
    trackCalories(calorieCount) {
        this.currentCalories += calorieCount

        // if currentCalories exceeds the max, logs message
        if (this.currentCalories > this.maxCalories) {
            logMessage('Max calories exceeded test test test test test')
        }
    }

// responsibility 2: logging calories/notifying user of max being surpassed
    // logCalorieSurplus() {
    //     console.log('Max calories exceeded')
    // }
}

const calorieTracker = new CalorieTracker(2000)
calorieTracker.trackCalories(500)
calorieTracker.trackCalories(1000)
calorieTracker.trackCalories(700)


// OPEN/CLOSED PRINCIPLE
// takes an array of questions 
function printQuiz(questions) {
    
    // loops through the questions
    questions.forEach(question => {
        
        // prints out each of the questions' descriptions
        console.log(question.description)

        // checks the question type, and depending on what type it is, it prints out different options 
        /* SWITCH STATEMENTS AND GIANT IF STATEMENTS ARE OFTEN 
        A VIOLATION OF THE OPEN/CLOSED PRINCIPLE */
        switch (question.type) {
            case 'boolean':
                console.log('1. True')
                console.log('2. False')
                break
            case 'multipleChoice':
                question.options.forEach((option, index) => {
                    console.log(`${index + 1}. ${option}`)
                })
                break
            case 'text':
                console.log('Answer: ________________________')
                break

            /* closed - if I am changing the code outside, like adding data, I should not need to change
            the application logic inside
            the printQuiz function should work with a new type, without me having to go in and change the logic 
            open - I do have the ability to create new types of things, to add a range type question without needing to make changes to the function */
            case 'range':
                console.log('Minimum: ________________________')
                console.log('Maximum: ________________________')
                break
        }
        console.log('')
    })
}

const questions = [
    {
        type: 'boolean',
        description: 'This video is useful.'
    },
    {
        type: 'multipleChoice',
        description: 'What is your favorite language?',
        options: ['CSS', 'HTML', 'JS', 'Python']
    },
    {
        type: 'text',
        description: 'Describe your favorite JS feature.'
    },
    {
        type: 'range',
        description: 'What is the speed limit in your city?'
    }
]

/* instead, break up the code into individual classes: boolean, multipleChoice, text, and range,
and the classes with handle the printing inside of them 

printQuiz function will just call the print function inside the classes 
for a new type, make a new class, and make that type know how to print itself */

printQuiz(questions)


/* each class knows what to do with their type */
class BooleanQuestion {
    constructor(description) {
        this.description = description
    }

    printQuestionChoices() {
        console.log('1. True')
        console.log('2. False')
    }
}

class MultipleChoiceQuestion {
    constructor(description, options) {
        this.description = description
        this.options = options
    }

    printQuestionChoices() {
        this.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`)
        })
    }
}

class TextQuestion {
    constructor(description) {
        this.description = description
    }

    printQuestionChoices() {
        console.log('Answer: _____________________')
    }
}

class RangeQuestion {
    constructor(description) {
        this.description = description
    }

    printQuestionChoices() {
        console.log('Minimum: _____________________')
        console.log('Maximum: _____________________')
    }
}

/* pritnQuiz2 stays closed when I add a new question and class for that question type 
printQuiz2 abilities get extended but not modified */
function printQuiz2(questions) {
    questions.forEach(question => {
        console.log(question.description)

        // print out my question choice, which is a function each of my classes has 
        // this one function call does it!
        question.printQuestionChoices()
        console.log('')
    })
}

// questions array now consists of instances of the classes
const questions2 = [
    new BooleanQuestion('This video is useful.'),
    new MultipleChoiceQuestion(
        'What is your favorite language?',
        ['CSS', 'HTML', 'JS', 'Python']
    ),
    new TextQuestion('Describe your favorite JS feature.'),
    new RangeQuestion('What is the speed limit in your city?'),
]

printQuiz2(questions2)
/* instead of changing code, I want to create new code, and the new code will work with my old code
to extend the old code's functionality */


// LISKOV SUBSTITUION PRINCIPLE
// create this object, that the rest of my objects can inherit from
class Shape {
    area() {
        // 
    }
}

// class Rectangle extends Shape
class Rectangle {
    constructor(width, height) {
        this.width = width
        this.height = height
    }
    setWidth(width) {
        this.width = width
    }
    setHeight(height) {
        this.height = height
    }
    area() {
        return this.width * this.height
    }
}

// class Square extends Shape
class Square extends Rectangle {

    // here, the width and height will always be the same for instances of Square
    setWidth(width) {
        this.width = width
        this.height = width
    }

    setHeight(height) {
        this.height = height
        this.width = height
    }
}

/* this function breaks the Liskov substitution principle:
my subclass of square is not actually compatible with every function that I'm using
why? when I set width for square, I am also setting height which may alter the return value of area() 
easiest way to fix the problem is to change what I inherited from */
function increaseRectangleWidth(rectangle) {
    rectangle.setWidth(rectangle.width + 1)
}

// create new instances of Rectangle
const rectangle1 = new Rectangle(10, 2)
const square = new Square(5, 5)

// increase width of the Rectangle instances
increaseRectangleWidth(rectangle1)
increaseRectangleWidth(square)

// print out the new areas of the Rectangle instances
console.log(rectangle1.area())
console.log(square.area())

// base class
class FlyingBird {
    fly() {
        console.log('I can fly')
    }
}

class SwimmingBird {
    swim() {
        console.log('I can swim')
    }
}

class Duck extends FlyingBird {
    quack() {
        console.log('I can quack')
    }
    // so add swimming and flying functionalities to my duck class instead of having it extend any base class
}

/* 
***problem: a duck can swim, but a subclass can't inherit from two parent classes
why composition is better: add functionality instead of inheriting it
*/
class Penguin extends SwimmingBird {
}

function makeFlyingBirdFly(bird) {
    bird.fly()
}

function makeSwimmingBirdSwim(bird) {
    bird.swim()
}
const duck = new Duck()
const penguin = new Penguin()

/* According Liskov principle, every subclass of a class must be able to make the function work
properly
Duck class passes the Liskov substitution principle, but Penguin class doesn't  

with the FlyingBird class and SwimmingBird class,
every subclass of FlyingBird can properly call the fly() function and
every subclass of SwimmingBird can call the swim() function 

everything is working as if it were the parent class,
the code  

If I have a function that accepts a class, every subclass of that class must be able to enter
that function and work properly */

makeFlyingBirdFly(duck)
makeSwimmingBirdSwim(penguin)


// INTERFACE SEGREGATION PRINCIPLE
/* when I have a large interface like this, it does lots of different things

whenver I have an interface, I need everything that implements that interface to use every single
part of the interface
*/
// interface Entity {
       // properties of the interface
//     attackDamage
//     health
//     name

       // methods of the interface
//     move()
//     attack()
//     takeDamage(amount)
// }

// every class that implements that interface needs to define all the methods in that interface
// class Character implements Entity {
//     move() {
//         // do something
//     }

//     attack() {
//         // do something
//     }

//     takeDamage(amount) {
//         // do something
//     }
// }

// class Turret implements Entity {
//     move() {
//         // ERROR: Cannot move
//     }
// }

/* in JS, using classes and inheritance, instead of interfaces, is similar 

now I have a class instead of an interface */
class Entity {
    constructor(name, attackDamage, health) {
        this.name = name
        this.attackDamage = attackDamage
        this.health = health
    }

    move() {
        console.log(`${this.name} moved`)
    }

    attack(targetEntity) {
        console.log(`${this.name} attacked ${targetEntity.name} for 
        ${this.attackDamage} damage`)
        targetEntity.takeDamage(this.attackDamage)
    }

    takeDamage(amount) {
        this.health -= amount
        console.log(`${this.name} has ${this.health} health remaining`)
    }
}

class Character extends Entity {

}

// a wall cannot move or attack, so it has 0 for attackDamage
class Wall extends Entity {
    constructor(name, health) {

        /* super() calls the constructor of the parent class
        done inside the constructor of the derived class to initialize the base class parts of the object */
        super(name, 0, health)
    }

    move() {
        return null
    }

    attack() {
        return null
    }
}

class Turret extends Entity {
    constructor(name, attackDamage) {
        super(name, attackDamage, -1)
    }

    move() {
        return null
    }

    takeDamage() {
        return null
    }
}

const turret = new Turret('Turret', 5)
const character = new Character('Character', 3, 100)
const wall = new Wall('Wall', 200)

turret.attack(character)
character.move()
character.attack(wall)
// below won't throw an error
turret.move()

class Entity1 {
    constructor(name) {
        this.name = name;
    }
}

// smaller components, smaller interfaces/classes
const mover = {
    move() {
        console.log(`${this.name} moved`)
    }
}

const attacker = {
    attack(targetEntity) {
        console.log(`${this.name} attacked ${targetEntity.name} for 
        ${this.attackDamage} damage`)
        targetEntity.takeDamage(this.attackDamage)
    }
}

const hasHealth = {
    takeDamage(amount) {
        this.health -= amount
        console.log(`${this.name} has ${this.health} health remaining`)
    }
}

class Character1 extends Entity1 {
    constructor(name, attackDamange, health) {
        super(name)
        this.attackDamage = this.attackDamage
        this.health = health
    }
}

// taking the protoype, which is basically the definition of my class, and adding in different functionalities
Object.assign(Character1.prototype, mover)
Object.assign(Character1.prototype, attacker)
Object.assign(Character1.prototype, hasHealth)

class Wall1 extends Entity1 {
    constructor(name, health) {
        super(name)
        this.health = health
    }
}

Object.assign(Wall1.prototype, hasHealth)

class Turret1 extends Entity1 {
    constructor(name, attackDamage) {
        super(name)
        this.attackDamage = attackDamage
    }
}

Object.assign(Turret1.prototype, attacker)

const turret1 = new Turret1('Turret', 5)
const character1 = new Character1('Character', 3, 100)
const wall1 = new Wall1('Wall', 200)

turret1.attack(character1)
character1.move()
character1.attack(wall1)

// below will throw TypeErrors because the objects/classes don't implement the methods it cannot use
// turret1.move()
// wall1.move()

/* THIS REVIEW */

/* Global Context - this refers to the global object whether in strict mode or not */
console.log(this === window); // true

/* Inside a Function - in non-strict mode, this defaults to the global object; it strict-mode, this will be undefined */
function regularFunction() {
    console.log(this);
}

regularFunction(); // 'window' in non-strict mode, 'undefined' in strict mode

/* Inside a Method - this refers to the object that the method belongs to */
const obj = {
    method: function() {
        console.log(this); 
    }
};

obj.method(); // 'obj'

/* Event Handlers - this will be set to the DOM element that is handling the event 
button.addEventListener('click', function() {
    console.log(this); // 'button'
}); */

/* Constructor Functions - this refers to the newly created object */
// constructor function constructs Person object
function Person(name) {
    this.name = name;
}

// alice stores new instance of Person object, whose name property is "Alice"
const alice = new Person("Alice");
console.log(alice.name); // "Alice"

/* Arrow Functions - don't have their own this value; they're lexically scoped, inheriting 
                     this from the enclosing scope at the time of creation */
const obj1 = {
    value: 42,
    arrowFunction: () => {
        console.log(this); // refers to the outer scope's 'this'
    }
};

obj1.arrowFunction(); // 'window' in non-strict mode, 'undefined' in strict mode

/* Explicit Setting - 'this; can be explicitly set with methods like call, apply, and bind */
function logThis() {
    console.log(this);
}

const obj2 = { value: 42 };

logThis.call(obj); // sets 'this' to 'obj' within the function

/* Classes - in ES6 classes, 'this' inside methods is automatically set to point to the object
             instance of the class */
class MyClass {
    constructor(value) {
        this.value = value;
    }

    logValue() {
        console.log(this.value);
    }
}

const instance = new MyClass(42);
instance.logValue(); // ('this' is) 42


// DEPENDENCY INVERSION PRINCIPLE 
class Store {
    constructor(user) {
        // Stripe does take in the user object to to create a new Stripe object
        // this.stripe = new Stripe(user)
        // Paypal doesn't take the user object
        this.paypal = new Paypal()

        // I need to create a user variable since Paypal doesn't take a user 
        this.user = user
        // create a new Stripe object that allows me to access the Stripe class directly
        // this.stripe = new Stripe(user)
    }

    purchaseBike(quantity) {
        this.paypal.makePayment(this.user, 200 * quantity)
        // call the Stripe object/API to make a payment
        // Stripe wants the amount in pennies
        // this.stripe.makePayment(200 * quantity * 100)
    }

    purchaseHelmet(quantity) {
        this.paypal.makePayment(this.user, 15 * quantity)
        // this.stripe.makePayment(15 * quantity * 100)
    }
}

// this is the Stripe API
class Stripe {
    // Stripe API/class takes in the user; I'm going to makePayments on the user
    constructor(user) {
        this.user = user
    }

    makePayment(amountInCents) {
        console.log(`${this.user} made payment of $${amountInCents / 100} with Stripe`)
    }
}

// unlike Stripe, Paypal doesn't take in user in the constructor (instea it takes it in the makePayment method)
class Paypal {
    makePayment(user, amountInDollars) {
        console.log(`${user} made payment of $${amountInDollars} with PayPal`)
    }
}

// implementation details calling Store
const store = new Store('John')
store.purchaseBike(2)
store.purchaseHelmet(2)

/* make an intermediate API, that has the same functions, same methods, same interface 
as the Stripe and the Paypal APIs */
class Store1 {
    // new class of paymentProcessor
    constructor(paymentProcessor) {
        // paymentProcessor will always take in the user in the constructor
        this.paymentProcessor = paymentProcessor
    }

    purchaseBike(quantity) {
        // pay function takes in the amount in dollars (pay is a method of the paymentProcessor class)
        this.paymentProcessor.pay(200 * quantity)
    }

    purchaseHelmet(quantity) {
        this.paymentProcessor.pay(15 * quantity)
    }
}

// this is the intermediate API that wraps the Stripe dependency
// Stripe1 is being passed into the StripePaymentProcessor, and the StripePaymentProcessor is being passed into Store1
class StripePaymentProcessor {
    // this constructor needs to match the class created in Store1
    constructor(user) {

    // this StripePaymentProcessor is passing off all of my function calls to the Stripe1 API
        this.stripe = new Stripe1(user)
    }

    pay(amountInDollars) {

        // because Stripe needs the amountInCents
        this.stripe.makePayment(amountInDollars * 100)
    }
}

/* this is the Stripe1 API, the actual implementation
my store will call methods on the payment processor, 
but the payment processor methods will actually call the Stripe1 API */
class Stripe1 {
    // I'm going to makePayments on the user
    constructor(user) {
        this.user = user
    }

    makePayment(amountInCents) {
        console.log(`${this.user} made payment of $${amountInCents / 100} with Stripe`)
    }
}

// this is the intermediate API that wraps the Paypal dependency 
class PaypalPaymentProcessor {
    constructor(user) {
        this.user = user
        this.paypal = new Paypal()
    }

    pay(amountInDollars) {
        this.paypal.makePayment(this.user, amountInDollars)
    }
}

// this is the Paypal API, the actual implementation
class Paypal1 {
    makePayment(user, amountInDollars) {
        console.log(`${user} made payment of $${amountInDollars} with PayPal`)
    }
}

// implementation details calling Store1
const store1 = new Store1(new PaypalPaymentProcessor('John'))
store1.purchaseBike(2)
store1.purchaseHelmet(2)

/* the payment processor classes are wrappers around the external dependencies, and my
code ends up depending on the wrappers not the implementation of the external dependencies */

// FACTORY FUNCTIONS AND CONSTRUCTOR/CLASSES - both used to create objects 

/* Factory Function
- don't rely on `this`; `this` within methods refers to the object that the methos is called on, if invoked as methods
- not built for inheritance, although possible with some manual linking 
- objects won't be an instance of a factory
- no easy way to check the "type" of object, unless manually added
- easier to create truly private variables
- simpler and more straightforward object creation for simple cases 
*/
function createPerson1(name, age) {
    return {
        name,
        age,
        sayHello: function() {
            console.log(`Hello, my name is ${this.name}`);
        }
    };
}

const person1 = createPerson1('Alice', 30);

/* Constructor Function
Constructors/Classes 
- `this` is automatically set to the new object being created when using the new keyword 
- in ES6 classes, methods are added to the class's prototype, 
   and `this` within methods refers refers to the instance when invoked as methods 
- designed with inheritance in mind, using the `prototype` for shared behaviors and `extends` in classes 
- objects are instances of the constructor/class
- can use `instanceof` to check the type
- require workarounds to create private variables, but ES^ classes are getting private class fields 
- provide better structure and organization for larger projects, especially when using `extends` for inheritance */
function Person2(name, age) {
    this.name = name;
    this.age = age;
    this.sayHello = function() {
        console.log(`Hello, my name is ${this.name}`);
    };
}

const person2 = new Person2('Alice', 30);

// Class (Constructor under the hood)
class Person3 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const person3 = new Person3('Alice', 30);

// SINGLE RESPONSIBILITY PRINCIPLE
/* a class or module should only have a single purpose */
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    // depending on some logic, the car may or may not start when start() is called
    start() {
        if (Car) { // logic to determine whether or not the car should start
            this.errorLog(`The car ${this.make} ${this.model} started.`);
            return true;
        }
        this.errorLog(`The car ${this.make} ${this.model} failed to start.`);
        return false;
    }

    // depending on the outcome, the class will then log some info
    errorLog(message) {
        console.log(message);
    }
}

/* logic for logging info should not be a responsibility of the Car class
my logger method logs to a file, but suddenly an update occurs on the underlying system that the 
car class is running on... I need to change the way I write to files
I now need to update every file writing instance of every class I've ever implemented a logger of


so instead, here the logger is stored in a separate class, meaning its functionality is separate from
the Car1 class */
class ErrorLog1 {
    static log(message) {
        console.log(message);
    }
}

// this Car1 class can be changed, moved around, or even deleted without affecting the logger class  
class Car1 {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    start() {
        if (Car1) { // logic to determine whether or not the car should start
            ErrorLog1.log(`The car ${this.make} ${this.model} started.`);
            return true;
        }
        ErrorLog1.log(`The car ${this.make} ${this.model} failed to start.`);
        return false;
    }
}

// HIGHLY SCALABLE AND MAINTAINABLE JS: COUPLING 
// Ex: Create Order
// order module definition
// ordering module has functions to create, read, update, and delete orders (i.e. CRUD)
var orderModule = (function() {
    var module = {},
        deliveries = myApp.deliveryModule;
    // user places an order and app creates the order
    module.createOrder = function(orderData) {
        var orderResult;

        orderResult = // code to actually create the order
        // send a confirmation to the user that includes the estimated time of delivery
        orderResult.estimatedDeliveryTime = deliveries.getDeliveryTime(orderData);

        return orderResult;
    };

    return module;
})();

// user can check the status or cancel the order at any time? 

/* deliveries module has functions to estimate delivery time, begin delivery, complete delivery, etc.

order and delivery modules are tightly coupled - for the order module to get the estimated delivery time, 
it has to "know" about the delivery module, and call the appropriate module's API

- I want to be able to easily swap out any module for a different module
- I want to be able to test modules independently
- I want to maximize code reuse
- there should not be a single point of failure anywhere in the app 
   something goes wrong in my call to get the estimated delivery time, I do not want to break the
   successful completion of the ordering process or the entire app
   I want the order to still be placed, even if I temporarily cannot provide a delivery time estimate

Patterns to Reduce Coupling
- often variations of the observer pattern
ex. Publish/Subscribe pattern
many versions of the Pub/Suc pattern involve a mediator object, which helps to minimize coupling between modules
the mediator object isolates the publisher from the subscriber

topic-based JS Pub/Sub library - there are topics that a module can subscribe to, publish to, or both, and a module
                                 is also able to unsubscribe from a topic if needed
*/

// Ex: Estimated delivery time using Pub/Sub pattern
document.addEventListener("DOMContentLoaded", function(event) {
    var orderModule = (function() {
        var orders = {},
            // define a topic with the constant
            // any module can publish and/or subscribe to this topic without knowing of each other's existence 
            EST_DELIVERY = 'current estimated delivery time',
            // call the getEstimatedDeliveryTime method of the delivery module
            estimatedDeliveryTime;

            // order module subscribes to the topic and will always have the most up-to-date estimated delivery wait time
            PubSub.subscribe(EST_DELIVERY, function(msg, data) {
                console.log(msg);
                estimatedDeliveryTime = data;

            // I can implement a mechanism that regularly updates and publishes the estimated delivery wait time to this topic
            });

            return orders;
    })();

    var deliveryModule = (function() {
        var deliveries = {},
            EST_DELIVERY = 'current estimated delivery time';

        deliveries.getEstimatedDeliveryTime = function() {
            var estimatedDeliveryTime = 1; // hard-coded to 1 hour, but likely an API call

            PubSub.publish(EST_DELIVERY, estimatedDeliveryTime);
        };

        return deliveries;
    })();

    deliveryModule.getEstimatedDeliveryTime();
});

/* Pub/Sub pattern - messaging pattern that enables decoupling between publishers and subscribers;
                     it manages event handling and messaging among loosely-coupled components
   publishers - components that emit events
   subscribers - components that consume those events */
// object or service that keeps track of subscriptions and events and takes care of forwarding a
// published event to all its subscribers
const eventChannel = {
    events: {},

    subscribe: function(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    },

    publish: function(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => listener(data));
        }
    }
};

// Subscriber
eventChannel.subscribe('event1', (data) => {
    console.log(`Event1 received with data: ${data}`);
});

// Publisher
eventChannel.publish('event1', 'some data'); // "Event1 received with data: some data"