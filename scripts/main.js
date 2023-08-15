// // feature 1: querySelector() function grabs a reference to my heading and then stores it in a variable called myHeading
// const myHeading = document.querySelector("h1");

// // feature 2: set the value of the variable's textContent proeprty to Hello world!
// myHeading.textContent = "Hello world!";

// features 1 & 2 are parts of the browser's DOM API

/*
VARIABLES 
declare a variable with let keyword:
let myVariable;

semicolon indicates where a statement ends
JS is case-sensitive

After declaring a variable, I can give it a value:
myVariable = "Bob";

I can do both operations on the same line:
let myVariable = "Bob";

I can retrieve the value by calling the variable name:
myVariable;

I can change the value to a variable later in the code:
myVariable = "Steve";

DATA TYPES
5 data types for JS variables
string - sequence of text known as a string, enclosed in single or double quote marks
number - number, no quotes around them
boolean - true/false value, no quotes around them
array - structure that lets me store multiple values in a single reference ex. 
    let myVariable = [1, "Bob", "Steve", 10]
object - everything in JS is an object and can be stored in a variable
    let myVariable = document.querySelector("h1");

OPERATORS
addition + - add 2 numbers or concatenate strings 
    "Hello" + "world!";
subtraction, multiplication, and division - * /
assignment =
strict equality === - test to see if two values are equal and of the same data type 
not, does-not-equal !, !== - returns the logically opposite value of what precedes it or tests whether two values are not equal 

CONDITIONALS
conditionals - use to test if an expression if an expression returns true or not 
    if...else statement
*/ 

// let iceCream = "chocolate";
// if (iceCream === "chocolate") {
//     alert("Yay, I love chocolate ice cream!");
// } else {
//     alert("Awww, buy chocolate is my favorite...");
// }

/*
FUNCTIONS
function - way to package functionality I want to reuse; define a body of code as a funciton that executes when I call the function name
    let myVariable = document.querySelector("h1");
    alert("hello!");

    document.querySelector and alert are functions built into the browser
arguments - bits of data that functions need to do their job
*/

// function multiply(num1, num2) {
//     let result = num1 * num2;
//     return result; 
// }

/*
variables defined inside functions are only available inside those functions

EVENTS
event handlers - code structures that listen for activity in the browser and run code in response
*/

// // document.querySelector("html").addEventListener("click", function () {
// //     alert("Ouch! Stop poking me!");
// });

/*
anonymous function - function with no name
arrow function - () => instead of function ()
*/

/* use JS and DOM API features to alternate the display of one of two images */

// store a reference to my <img> element in myImage 
const myImage = document.querySelector("img");

// make its onclick event handler property equal to a function with no name 
myImage.onclick = () => {

    // code retrieves the value of the image's src attribute
    const mySrc = myImage.getAttribute("src");

    // conditional checks if the src value is equal to the path of the original image
    // if it is, code changes the src value to the path of the second image
    if (mySrc === "images/firefox-icon.png") {
        myImage.setAttribute("src", "images/firefox2.png");

    // if it isn't, src value swaps back to the original image path
    } else {
        myImage.setAttribute("src", "images/firefox-icon.png");
    }
};

/* use JS and Web Storage API to save a welcome message that will persist should the user return, with an option to change the user and welcome message */

// takes references to the new button and heading, storing each inside variables
let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {

    // prompt() displays a dialog box similar to alert() and stores the user data in a variable after the user clicks OK
    const myName = prompt("Please enter your name.");

    // checks if user entered a value
    if (!myName) {

        // run function again from teh start
        setUserName();
        
    } else {
        // call on an API localStorage which allows me to store data in the browser and retrieve it later
        // use localStorage's setItem() function to create a store a data item called 'name'
        localStorage.setItem("name", myName);

        // set the textContent of the heading to a string, plus the user's newly stored name
        myHeading.textContent = `Mozilla is cool, ${myName}`;
    }
}

// this is initialization code, it structures the app when it first loads
//checks whether name data exists, if not, run setUserName to create it
if (!localStorage.getItem("name")) {
    setUserName();

// if name exists, retrieve the stored name using localStorage's getItem() function 
} else {
    const storedName = localStorage.getItem("name");

    // set the textContent property to a string, plus the user's name
    myHeading.textContent = `Mozilla is cool, ${storedName}`;
}

// puts an onclick event handler on the button
myButton.onclick = () => {

    // runs setUserName() when button is clicked and allows user to enter a different name
    setUserName();
}

/* 
when I cancel the prompt, the myName value is set as null
null - value that refers to the absence of a value
*/
