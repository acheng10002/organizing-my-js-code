/* fix: 
   index.js explicitly requires lodash to be present and binds it as _ (no global scope pollution) 
   by stating what dependencies a module needs, webpack can use this info to build a dependency graph 
   webpack then uses the graph to generate an optimized bundle where scripts will be executed in the correct order 
   
   run:
   npx webpack  // npx command ships with Node 8.2/npm 5.2.0 or higher, runs the webpack binary (./node_modules/.bin/webpack) of the webpack package I installed in the beginning
   
   takes my script at src/index.js as the entry point and will generate dist/main.js as the output */
import _ from "lodash";
import "./style.css";
import Icon from "./icon.png";
// I can import any one of those 4 types of data (JSON, CSV, TSV, XML)
//and the Data variable I import will contain parsed JSON for consumption
import Data from "./data.xml";
import Notes from "./data.csv";

import toml from "./data.toml";
import yaml from "./data.yaml";
import json from "./data.json5";

// only the default export of JSON modules can be used without warning
// No warning
// import data from './data.json';
import myName from "./myName";
// this pattern gives me the freedom to only import the functions I need in the various files of my program
import { cube, foo, graph } from "./myModule.js";
import cube1 from "./myModule.js";
/* consuming the exports of parentModule.js 
   "collected"/"bundled" them in a single source */
import { myFunction, myVariable, MyClass } from "./parentModule.js";
import { getPrimes } from "./myModule.js";
import { myValue } from "./myModule.js";
import * as myModule from "./myModule.js";

console.log(toml.title); // TOML Example
console.log(toml.owner.name); // Tom Preston-Werner

console.log(yaml.title); // YAML Example
console.log(yaml.owner.name); // Tom Preston-Werner

console.log(json.title); // JSON5 Example
console.log(json.owner.name); // Tom Preston-Werner

/* problem: lodash isn't explicitly declared 
            - problems with managing JS projects this way
              1. it's not immediately apprent that the script depends on an external library 
              2. if a dependency is missing, or included in the wrong order, the app will not function 
              3. if a dependency is included but not used, the browser will be forced to download unnecessary code 
    webpack can manage these scripts instead */
function component() {
  const element = document.createElement("div");

  // Lodash, previously included via a script, is required for this line to work
  // Lodash, now imported by this script
  // lodash - utility library that provides lots of herlper functions for common programming tasks,
  // such as array manipulation, object manipulation, and more
  // _ is a global variable
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  // Add the image to my existing div
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  console.log(Data);
  console.log(Notes);

  return element;
}

document.body.appendChild(component());

/* Creating a Bundle
   first, tweak my directory structure slightly: separate the "source" code (./src) from my "distribution" code (./dist
   source code - code that I'll write and edit
   distribution code -the minimized and optimized output of my biild process that will eventually be loaded in the browser) 
   
   later on, I will learn to generate index.html rather than edit it manuallt
   once this is done, it should be sage to empty the dist directory and to regenerate all the files within it 
   
   to bundle the lodash dependency with index.js, install the library locally 
   
   packpages that will be bundled into my production bundle:
   npm install --save

   packages that are for development purposes:
   npm install --save-dev*/

function component1() {
  const element = document.createElement("div");

  // use my function!
  element.textContent = myName("Cody");
  return element;
}

document.body.appendChild(component1());

graph.options = {
  color: "blue",
  thickness: "3px",
};

graph.draw();
console.log(cube(3)); // 27
console.log(foo); // 4.555806215962888

console.log(cube1(3)); // 27)

console.log(myFunction());

console.log(getPrimes(10)); // [2, 3, 5, 7]

console.log(myValue); // 1
console.log(myModule.myValue); // 1
setTimeout(() => {
  console.log(myValue); // 2; my-module has updated its value
  console.log(myModule.myValue); // 2
  myValue = 3; // TypeError: Assignment to constant variable
  // The importing module can only read the value but can;t re-assign it
}, 1000);

/* Revisiting Webpack
How to write and run npm scripts
    Where do npm scripts live?
        webpack.config.js
    How do I define and run npm scripts?
        "test": "echo \"Error: no test specified\" && exit 1",
        // npm run build (has the tool's command for building/bundling/compiling) is the same as npx webpack
        "build": "webpack",
        // npm run dev (starts a dev server) is the same as npx webpack serve
        "dev": "webpack serve",
        // npm run deploy
        "deploy": "git subtree push --prefix dist origin gh-pages",
        /* To switch modes, I can have 2 different config files and then have my build and dev npm scripts specify which config file to use:
        "build": 'webpack --config webpack.prod.js',
        "dev": 'webpack serve --config webpack.dev.js' 
        when I run a script:
        1. npm checks the package.json file to see if I have defined a value for that script
        2. if a matching value is found, npm checks for a pre and post version of the script
            if pre or/and post scripts are found, npm runs them 
            ex. command for deleting test logs before running the tests, and running a linter afterward
        life cycle scripts - scripts that happen only in certain situations
                             they work in addition to the pre<event>, post<event>, and <event>scripts
            ex. life cycle hooks - prepare, prepublish, prepublishOnly, prepack, and postpack 
        how to run multiple scripts in parallel
        1. use process.argv: access command-line arguments withint scripts using process.argy
        2. run with arguments: npm run <script> arg1 arg2
        3. utilize npm-run-all
           install the npm-run-all package, npm install npm-run-all --save-dev
        4. defined a combined script
           "parallel-tasks": "npm-run-all --parallel task1 task2"
What Webpack nodes are and how to automate switching between modes as required
    What are the two Webpack modes
        development and production
        development - I want strong source mapping; ability to trace and map code from its minified or compiled form back to its original source code
            a localhost server with live reloading or
            hot module replacement - allows modules (JS, CSS, or other assets) to be updated in a running app without requiring a full page reload
        production -
What tool allows me to split my Webpack configuration file with minimal duplication
    webpack-merge can make multiple Webpack configuration files easier to deal with 
        
How to create and use template repositories 
    What is a template respository, and how would I create one? 
        any existing repository can be converted to a template in its settings 
            under "rename repository", there's a checkbox for whether the repository is a template or not
            to create a new repository, the repository template dropdown will list any templates for me to select

package.lock.json - locks the dependency with the version installed, installs the latest version of that package
                    in my application and saves it in package.json
    */
