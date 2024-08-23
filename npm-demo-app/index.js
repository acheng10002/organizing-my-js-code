// const moment = require("moment");
// babel will enable the following
import moment from "moment";

console.log("Hello from JavaScript!");

/* entire moment.min.js file is loaded in the HTML< and it defines global variable moment, 
and moment is available to any file loaded after moment.min.js script link 

CommonJS - 1. specified an ecosystem for JS outside the browser
           2. specfication for modules, which allowed JS to import and export code across
              files like most programming languages without resorting to global variables 
Node.js is the most well-known implementation of CommonJS */
console.log(moment().startOf("day").fromNow());

/* what this would look like using node.js modules 
var moment = require('moment');

console.log("Hello from JavaScript!");  
console.log(moment().startOf('day').fromNow());

node.js is a server side language with access to local storage
node.js knows the location of each npm module path
but, the browser doesn't have access to local storage
a JS module bundler gets around this problem with a build step
    that has access to local storage and creates a final output
    that is browser compatible and doesn't need access to local storage

the module bundler finds all require statements, and relaces them with
    the actual contents of each required file
    the final result is a single bundled JS file with no require statements
*/

/* with webpack,
no longer loading external scripts via global variables
any new JS libraries will be added using requirem statements */

/* browsers are slow to add new features
new languages were created with experimental features that transpile to browser 
compatible languages 

for CSS, transpilers include Sass, Less, and Stylus
for JS, transpilers include babel and TypeScript
babel transpiles next-gen JS with features not yet available to all browsers
    to older more compatible JS
TypeScript is essentially identical to next-gen JS, but adds optional static typing 
    static typing - type of variable is known at compile time 
babel is closest to vanilla JS 
transpilers let me test tomorrow's features today

for performance, the bundle file should be minify
remove the need to re-run webpack command each time I change the JS 
*/

/* task runner/ npm script
tasks include minifying code, optimizing images, running tests, etc. 
most popular choice of task runner is using scripts in npm package manager, 
and npm works with other command line tools directly */

const name = "Bob",
  time = "today";
console.log(`Hello ${name}, how are you ${time}?`);
