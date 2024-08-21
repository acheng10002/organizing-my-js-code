export const greeting = "Hello, Odinite!";
export const farewell = "Bye bye, Odinite!";

/* or
const greeting = "Hello, Odinite!";
const farewell = "Bye bye, Odinite!";
export { greeting, farewell };
*/
/* with an IIFE, any variables inside are scoped to the function 
and not globally

(() => {
    // if I want some things exposed, I can return those things 
    // from my IIFE into global scope and keep other things private
    const greeting = (() => {
        const greetingString = "Hello, Odinite!";
        const farewellString = "Bye bye, Odinite!";
        return greetingString;
})(); 

IIFEs follow the module pattern 

with ES6, each module has its own private scope, where I use import/export
to communicate between files 
    a top-level variable in a module will not be accessible in the global scope */

/* default exports do not have a named attached to them
when I import them somewhere, then I can decide what name to give it 

export default "Hello, Odinite!" 
or 
const greeting = "Hello, Odinite!"
export default greeting 

and then
// since I'm importing something that was default exported, I can name 
// it whatever I want
import helloOdinite from "./one.js" 

a file can have multiple named exports but only one default export 
export default "Hello, Odinite!";
export const farewell = "Bye bye, Odinite!";

and then
import greeting, { farewell } from "./one.js" 

console.log(greeting); // "Hello, Odinite!"
console.log(farewell); // "Bye bye, Odinite!" 

when a module updates the value of a binding that it exports,
the update will be visible in its imported value */

// Exporting declarations
/*
// Exporting declarations
export let name1, name2; // also var
export const name1 = 1, name2 = 2; // also var, let
export function functionName() { }
export class ClassName { }
export function* generatorFunctionName() { }
export const { name1, name2: bar } = o;
export const [ name1, name2 ] = array;

// Export list
export { name1, nameN };
export { variable1 as name1, variable2 as name2, nameN };
export { variable1 as "string name" };
export { name1 as default };

// Default exports
export default expression;
export default function functionName() { }
export default class ClassName { }
export default function* generatorFunctionName() { }
export default function () { }
export default class { }
export default function* () { }

// Aggregating modules
export * from "module-name";
export * as name1 from "module-name";
export { name1, nameN } from "module-name";
export { import1 as name1, import2 as name2, nameN } from "module-name";
export { default, } from "module-name";
export { default as name1 } from "module-name";

export declarations are not subject to temporal dead zone rules, 
I can declare that the module exports x before the name x itself is declared 
*/

// module "one.js"
function cube(x) {
  return x * x * x;
}

const foo = Math.PI + Math.SQRT2;

const graph = {
  options: {
    color: "white",
    thickness: "2px",
  },
  draw() {
    console.log("From graph draw function");
  },
};

export { cube, foo, graph };

/* or

export default function cube(x) {
  return x * x * x;
}
*/
