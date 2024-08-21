// name of the desired imports inside {} and the path to the file() I'm importing
// I cannot use template strings for the filepath
import { greeting, farewell } from "./one.js";

/* also, named imports/exports aren't the same as object literals 
above, and
export { greeting, farewell } 
are not exports of an object containing greeting and farewell,
nor am I destructuring an object with those keys when imported
I am using named import/export syntax */

console.log(greeting); // "Hello, Odinite!"
console.log(farewell); // "Bye bye, Odinite!"

/* dependency graph
importer depends on exporter

two.js <----------- one.js 
            |______ three.js 

if three.js exported something and two.js imported from it 
two.js is still the entry point, depending on one.js and three.js

or two.js <----------- one.js <----------- three.js

one.js imports from three.js 
two.js is still the entry point, depending on three.js indirectly 
through one.js 

browser handles additional file dependencies 
I do not need to add the defer attribute, type="module" automatically
defers script execution 

CommonJS is a module system, still used quite a lot in Node.js, but
it is not something that browsers will be able to understand */

/* functions and classes are exported as declarations, not expressions
these declarations can be anonymous
functions will be hoisted */
// foo() is a function declaration not a function expression
foo();

export function foo() {
  console.log("Hi");
}

/* foo() is still a declaration, but it's allowed to be anonymous 
export function () {
    console.log("Hi");
}
*/

/* 
// file test.js
const k = 12;
export default k;

// some other file
import m from "./test"; // note that we have the freedom to use import m 
instead of import k, because k was default export
console.log(m); // 12

// while importing modules, if they're named exports, they must be referred 
to by the exact same name or they can be renamed
export { myFunction as function1, myVariable as variable };

// named export can be renamed to non-valid identifier, a string literal
export { myFunction as "my-function" };

// a module can relay values exported from other modules
export { default as function1, function2 } from "bar.js";

// here, function1 and function2 do not become available inside the 
// current module
import { default as function1, function2 } from "bar.js";
export { function1, function2 };

// most "import from" syntaxes have "export from" counterparts
export { x } from "mod";
export { x as v } from "mod";
export * as ns from "mod";

// there is, export * from "mod" but no, import * from "mod"
// -- mod1.js --
export const a = 1;

// -- mod2.js --
export const a = 3;

// -- barrel.js --
// re-exports all named exports from mod as named exports of the
// current module, but the default export is not re-exported

// if there are two wildcard exports statements that implicitly
// re-export the same name, in this case, a, neither one is re-exported
export * from "./mod1.js";
export * from "./mod2.js";

// -- main.js --
import * as ns from "./barrel.js";
console.log(ns.a); // undefined

// importing a duplicate name directly throws an error
import { a } from "./barrel.js";
// SyntaxError: The requested module './barrel.js' contains conflicting star exports for name 'a'

export { default as DefaultExport } from "bar.js";
export { default, function2 } from "bar.js";

// export from, supports all features that import supports
export { default } from "./data.json" with { type: "json" };
*/

import { cube, foo, graph } from "./one.js";

graph.options = {
  color: "blue",
  thickness: "3px",
};

graph.draw(); // Logs "From graph draw function"
console.log(cube(3)); // 27
console.log(foo); // 4.555806215962888

/* or 
import cube from "./my-module.js";
console.log(cube(3)); // 27
*/

/* imported bindings are live bindings
live bindings - are updated by the module that exported the binding, but cannot be 
                re-assigned by the importing module 

there is a function-like dynamic, import(), which does not require scripts of 
type="module"
*/

/* namespace import 
// imports that inserts a module into the current scope, containing alll exports 
// from that module 
import * as myModule from "/modules/my-module.js";

// myModule is a namespace object that contains all exports as properties 
myModule.doAllTheAmazingThings();

// side effects import
// run's the module's global code but doesn't actually import any values
import "/modules/my-module.js";

// hoisting
// import declarations are hoisted
myModule.doAllTheAmazingThings(); // myModule.doAllTheAmazingThings is imported by the next line

import * as myModule from "/modules/my-module.js";

// my-module.js
// imported values can only be modified by the exporter
export let myValue = 1;
setTimeout(() => {
  myValue = 2;
}, 500);

// main.js
import { myValue } from "/modules/my-module.js";
import * as myModule from "/modules/my-module.js";

console.log(myValue); // 1
console.log(myModule.myValue); // 1
setTimeout(() => {
  console.log(myValue); // 2; my-module has updated its value
  console.log(myModule.myValue); // 2
  myValue = 3; // TypeError: Assignment to constant variable.
  // The importing module can only read the value but can't re-assign it.
}, 1000);

*/
