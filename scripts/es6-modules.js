/* modules allow me to import and export different sections of code from different files into other files
   this allows me to break apart my code into more smaller grained files which makes my code easier to understand and reason through later */

// I want to export info about the user, so that I can use instead of my main.js function
// I'm going to export this class of user as the export default
// I can only use export default on one thing, so usually it's going to be the class I am defining
// export default class User {
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }
// }

// export function printName(user) {
//     console.log(`User's name is ${user.name}`)
// }

// export function printAge(user) {
//     console.log(`User is ${user.age} years old`)
// }

/* one way to export-
   define it at the end of my file 
   this will export the User object as my default export from my es6-modules.js file */
// export default User
// export {printName, printAge}

// now this file exports the User class and the two functions

/* article on the history of JS 

   Using JS the "old-school" way

   Using a JS package manager (npm)
   Node.js - open-source, server-side runtime environments that allows devs to build and run JS applciations outside of a web browser;
             has a rich ecosystem that can used to build a range of apps, including web servers, APIs, real-time apps, microservices, and more; 
             node.js can be installed on various OS;
             it can handle a large number of concurrent connections, making it suitable for building real-time apps, chat apps, and online games
             WebSockets - real-time, bidirectional communication channels between clients and servers
   JS package - collection of code, assets, and resources that are organized and distributed together for use in web dev or Node.js projects;
                they provide libraries, frameworks, tools, or even complete applications;
                packages can be scoped to organizations or users
                frontend biuld tools can perform tree-shaking, which eliminates unused code from packages during the build process 
   npm - command-line tool for managing JS packages for Node.js; 
         one of the largest software registries in the world, allowing devs to find, install, and manage third-party libraries and modules;  
         has a central repository where devs can publish their packages, discover and download packages, install and manage them;
         npm and other package managers alert me to known vulnerabilities in my dependencies
         npm can install packages globally or locally
   when I start a new JS project, I create a package.json using npm init
   package.json - JS Object Notation file that resides the root of my Node.js project that keeps track of my object's dependencies and scripts;
                  it's a manifest for the project:
                  dependencies section lists the packages and their versions
                  and scripts section defines custom scripts or commands;
                  someone wanting to work on my project can clone my code repository and run npm install command;
                  the command reads the dependencies section of package.json and installs all the required packages listed there into their local node_modules directory;
                  the custom scripts in the scripts section of package.json, can be defined to run specific tasks, build processes, or tests
   if I have node.js installed, I already have npm installed, navigate my command line to the folder with my index4.html and enter:
   npm init

   I will get prompted with several questions and generate a new file named package.json, a configuration file that npm uses to save all metadata/project info
   {
    "name": "your-project-name",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" & exit 1"
    },
    "author": "",
    "license": "ISC"
   }
   to add a dependency to my project
   to install the moment.js JS package, follow the npm instructions from their home page by entering the command:
   npm install package-name (moment) -- save (downloads all the code from the moment.js package and its dependencies from the npm registry 
                                              adds an entry to the dependencies section of my package.json file
                                              store the downloaded packages into a folder called node_modules)
                                              any package I install using npm install will be downloaded and placed in node_modules by default
   node_modules - folder/directory where packages are stored;
                  where all the project's dependencies (packages/modules requried for my project to run) are stored
                  I can use packages in module_modules by importing or requirement then into my JS code;
                  some packages are modules that encapsulate reusable code, and can be imported and used within Node.js apps using the require() function;
                  Node.js and web dev tools, like bundlers and transpilers, know to to find and use packages from node_modules
       {
    "name": "modern-javascript-example",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" & exit 1"
    },
    "author": "",
    "license": "ISC"
    "dependencies": {
        "moment": "2.22.2"
    }
   }

   project dependency - external libraries, modules, or packages that my project relies on to function correctly;
                        dependencies provide functionality, improve code maintainability, and reduce dev time;
                        I might reply on them for tasks like handling HTTP reuqest, user authentication, or UI components;
                        they encapsulate resuable data and encourage a modular approach;
                        popular dependencies are likely to receive regular updates, bug fixes, and security patches;
                        their versions are specified in package.json
                        npm adds, updates, and manages dependencies;
                        dependency tree - direct dependencies (explicitly listed in my project) and indirect dependencies (that the direct dependencies rely on);
                        there are dev dependencies versus production dependencies
                        dependency management files - list all dependencies and their versions
                        package lock/manifest files record the exact versions of dependencies
    
   development versus production
   both in the software dev lifecycle
   development - where I write, test, and debug my code; 
                 focused on making it easy for devs to build and troubleshoot software
   production - where my app runs when it's live and serving real users; 
                focused on performance, security, and stability

   instead of sharing the nodes_modules folder, I only need to share the package.json file and other devs can install the required packages automatically with the command npm install
   I no longer have to manually download a dependency from the website, I can automatically download and update it using npm

   the moment.min.js file will me in the node_modules/moment/min directory, so I can link to the npm downloaded version in the index.html
   <script src="node_modules/moment/min/moment.min.js"></script>

   I can use npm to download and update my packages through the command line
   **bade thing is I'm digging through the nodes_modules fodler to find the location of each package and manually including it in my HTML...

   Using a JS module bundler (webpack)
   instead of loading all of moment.min.js with an HTML script tag, I can load it directly in the JS file
   
   var moment = require('moment');

   console.log("Hello from JavaScript!");
   console.log(moment().startOf('day').fromNow());

   node.js is server side with access to the computer's file system 
   node.js also know the location of each npm module path, so I can simply write 
   require('moment')

   However, running that code in the browser gets me an error saying require is not defined
   the browser doesn't have access to the file system, whcih makes loading modules tricky
   loading files has to done dynamically, either synchronous (which slows down execution) or asynchronously (which can have timing issues)

   module bundler/webpack - tool that has a build step (which has access to the file system) to create a final output that is browser compatible (which doesn't need access to the file system)
                            here, I need a module bundler to find all require statements (which is invalid browser JS syntax) and replace them with the actual contents of each required file
                            final result is a single bundles JS file with no require statements
    In 2011, Browserify was released and pioneered the usage of node.js require statements on the front-end (which is what enabled npm to become the front-end package manager of choice)
    In 2015, webpack became the more popular module bundler, fueled by the popularity of the React front-end framework, which took advantage of webpack's features

    how to use webpack to get the require('moment') example working in the browser
    webpack is an npm package, so I can install it into the project from the command line

    npm install webpack webpack-cli --save-dev
    I'm installing two packages above, webpack and webpack-cli
    webpack-cli enables me to use webpack from the command line
    --save-dev saves it as a dev dependency, which means it's a package I need in my development environment but not on my production server
    
    this will be reflected in the package.json file which was automatically updated:
    "name": "modern-javascript-example",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" & exit 1"
    },
    "author": "",
    "license": "ISC"
    "dependencies": {
        "moment": "^2.19.1"
    },
    "devDependencies": {
        "webpack": "^4.17.1",
        "webpack-cli": "^3.1.0"
    }
   }

   webpack and webpack-cli are installed as packages in the node_modules folder, and I can use webpacl-cli from the command line
   ./node_modules/.bin/webpack index.js --mode=development

   this command will run the webpack tool, start with index.js, find any requirement statements, and replace them with appropriate code to create a single output file 
   (the single output file is **dist/main.js**)
   --mode=development keeps the JS readable for developers, as opposed to a minified output with --mode=production

   now I'm going to use webpack's **dist/main.js** output instead of index.js as it has invalid require statements
   <script src="dist/main.js"></script>

    webpack command needs to be run each change I change index.js
    webpack can read options from a config file in the root directory of the project named webpack.config.js
    // webpack.config.js
    module.exports = {
        mode: 'devlopment',
        entry: './index.js',
        output: {
            filename: 'main.js',
            publicPath: 'dist'
        }
    };
    so, each time I change index.js, I can run webpack with the command:
    ./node_modules/.bin/webpack

    I don't need to specify index.js and --mode=development option anymore 

    advantages to this workflow:
    - I am no longer loading external scripts via global variables
    - any new JS libraries will be added using require statements in the JS, as opposed to adding new <script> tags in the HTML

   Transpiling code for new language features (babel)
   how to use babel with my existing webpack build set
   first install babel (which is an npm package) into the project from the command line
   npm install @babel/core @babel/preset-env babel-loader --save-dev

   installing 3 packages as dev dependencies
   @babel/core - main part of babel
   @babel/preset-env - preset defining which new JS features to transpile
   babel-loader - package to enable babel to work with webpack

   editing the webpack.config.js file, configures webpack to use babel-loader:
   // webpack.config.js
    module.exports = {
    mode: 'devlopment',
    entry: './index.js',
    output: {
        filename: 'main.js',
        publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
    };
   here I'm telling webpack to look for any .js files (excluding ones in the node_modules folder) 
   and apply babel transpilation using babel-loader with the @babel/preset-env preset
   and now that everything's set up, I can start writing ES2015 features in my JS

   example of a ES2015 template string in the index.js file
   // index.js
   car moment = require('moment');

   console.log("Hello from JavaScript!");
   console.log(moment().startOf('day').fromNow());

   var name = "Bob", time = "today";
   console.log(`Hello ${name}, how are you ${time}?`);

   I can also use the ES2015 import statement instead of require for loading modules

   //index.js
   import moment from 'moment'; // import has extra flexibility for more advanced cases

   console.log("Hello from JavaScript!");
   console.log(moment().startOf('day').fromNow());

   var name = "Bob", time = "today";
   console.log(`Hello ${name}, how are you ${time}?`);

   since I index.js, I need to run webpack again in the command line
   ./node_modules/.bin/webpack

   refresh index.html in the browser
   I can test it in an older browser like IE9, or I can search in **main.js** to find the line of transpiled code
   // main.js
   console.log('Hello ' + name + ', how are you ' + time '?');

   here I can see babel transpiled the ES2015 template string into regular JS string concatenation to maintain browser compatibility


   Using a task runner (npm scripts)
   npm scripts to make using webpack easier
   {  
        "name": "modern-javascript-example",  
        "version": "1.0.0",  
        "description": "",  
        "main": "index.js",  
        "scripts": {  
            "test": "echo \"Error: no test specified\" && exit 1",  
            "build": "webpack --progress --mode=production",  // ***
            "watch": "webpack --progress --watch"             // ***
        },  
        "author": "",  
        "license": "ISC",  
        "dependencies": {  
        "moment": "^2.22.2"  
        },  
        "devDependencies": {  
            "@babel/core": "^7.0.0",  
            "@babel/preset-env": "^7.0.0",  
            "babel-loader": "^8.0.2",  
            "webpack": "^4.17.1",  
            "webpack-cli": "^3.1.0"  
        }  
    }
    added two new scripts, build and watch

    to run the build script, enter 
    npm run build

    runs webpack (using configuration from the webpack.config.js made earlier) with the progress option to show the percent progress 
    and the --mode=production option to minimize the code for production

    to run the watch script, enter
    npm run watch

    this uses the --watch option instead to automatically re-run webpack each time any JS file changes, which is great for devlopment

    the scripts in package.json can run webpack without having to specify the full path, since node.js knows the location of each npm module path
    I can install webpack-dev-server, w separate tool which provides a simple web server with live reloading
    to install webpack-dev-server as a development depending, enter
    npm install webpack-dev-server --save-dev

    then add an npm script to package.json
    {  
        "name": "modern-javascript-example",  
        "version": "1.0.0",  
        "description": "",  
        "main": "index.js",  
        "scripts": {  
            "test": "echo \"Error: no test specified\" && exit 1",  
            "build": "webpack --progress --mode=production",  
            "watch": "webpack --progress --watch"             
            "serve": "webpack-dev-server --open" // ***
        },  
        "author": "",  
        "license": "ISC",  
        "dependencies": {  
        "moment": "^2.22.2"  
        },  
        "devDependencies": {  
            "@babel/core": "^7.0.0",  
            "@babel/preset-env": "^7.0.0",  
            "babel-loader": "^8.0.2",  
            "webpack": "^4.17.1",  
            "webpack-cli": "^3.1.0"  
        }  
    }
    start my dev server by running
    npm run serve

    this will automatically open the index.html website in my browser with an address of localhost:8080 (by default)
    any time I change my JS in index.js, webpack-dev-server will rebuild its own bundled JS and refresh the browser automatically

    there are more options with both webpack and webpack-dev-server

    I can make npm scripts for running other tasks:
    converting Sass to CSS
    compressing images
    running tests
    anything that has a command line tool is fair game

    also some great advanced options and tricks with npm scripts themselves

   Conclusion
*/

/* npm tutorial on how to install packages with npm 

   install a package locally if I want to depend on the package from my own module, using something like Node.js require
   
   Installing an unscoped package
   unscoped packages are always public
   run:
   npm install <package_name>

   creates node_modules and will download the package to that directory
   
   Installing a scoped public package
   scoped public packages can be downloaded and installed by anyone, as long as the scope name is referenced:
   npm install @scope/package-name
   
   Installing a private package
   private packages - can only be downloaded and installed by those who have been granted read access to the package 
   the scope name must be referenced during installation:
   npm install @scope/private-package-name

   Testing a package installation
   confirm that npm install worked correctly in my module directory:
   check that node_modules exist and that it contains a directory for the packages I installed
   ls nodule_modules
   
   Installed package version
   if there is a package.json file in the directory in which npm install is run,
   npm installs the latest version of the package that satisfies the semantic versioning rule declared in package.json
   semantic versioning rule - versioning scheme for software, aims to convey meaning about the underlying changes in each version of a software package
                              it defines a structured version number with three parts: `MAJOR.MINOR.PATCH`
                              MAJOR - incremented when there are incompatible changes that require the user to make signification modifications 
                                      in their code to accomodate the new version
                              MINOR - incremented when new features or functionality are added in a backward-compatible way
                              PATCH - incremented when backward-compatible bug fixes are introduced; these fixes should not introduce new features or break existing functionality
   if there is no package.json - the latest version of the package is installed

   Installing a package with dist-tags
   npm publish and npm install <package_name> will use the latest tag by default
   to override the behavior:
   npm install <package_name>@<tag>

   to install the example-package at the version tagged with beta:
   npm install example-package@beta
   */

/* package.json file for managing my project's dependencies
   Creating a default package.json file
   1. navigate to the root directory of my package

   2. to create a default package.json using information extracted from the current directory, use
      npm init --yes
      or
      npm init -y

   Example
   npm init --yes
   Wrote to /home/monatheoctocat/my_package/package.json:
   {
        "name": "my_package",   // required name field - must be lowercase and one word, may contain hyphens and underscores
        "description": "",      
        "version": "1.0.0",     // required version field - must be in the form x.x.x and follow semantic versioning guidelines
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "repository": {
            "type": "git",
            "url": "https://github.com/monatheoctocat/my_package.git"
        },
        "keywords": [],
        "author": "",           // format: My Name <email@example.com> (http://example.com)
        "license": "ISC",
        "bugs": {
            "url": "https://github.com/monatheoctocat/my_package/issues"
        },
        "homepage": "https://github.com/monatheoctocat/my_package"
}
   Default values extracted from the current directory
   name: the current directory name
   version: always 1.0.0
   description: info from the README, or an empty string ""
   scripts: by default creeates an empty test script
   keywords: empty
   author: empty
   license: ISC
   bugs: information from the current directory, if preset
   homepage: information from the current directory, if preset
    
   Setting confirg options for the init command
   I can set default config options for the init command
   ex. to set the default author email, author name, and license, on the command line:
   npm set init-author-email "example-user@example.com"
   npm set init-author-name "example_user"
   npm set init-license "MIT"
*/
/* Entry
   Webpack figures out which other modules and libaries the entry point depends on (directly or indirectly)
   by default, the value of the entry point is ./src/index.js, but I can specify a different (or multiple) entry points
   by setting an entry property in the webpack configuration
   webpack.config.js

   module.exports = {
    entry: './path/to/my/entry/file.js';
   };

   Output 
   by default, it's ./dist/main.js for the main output file and to the ./dist folder for any other generated file
   specify an output field in my configuration:
   webpack.config.js

   const path = require('path');  // core Node.js module that gets used to manipulate file paths

   module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
        path: path.resolve(__dirname, 'dist'),  // output.filename property tells webpack the name of my bundle
        filename: 'my-first-webpack.bundle.js', // output.path property tells webpack where I want it to be emitted to
    },
   };

   Loaders
   loaders have two properties in my webpack configuration:
   1. the test property identifies which file or files should be transformed
   2. the use property indicates which loader should be used to do the transforming
   webpack.config.js
   
   const path = require('path');
   
   module.exports = {
    output: {
        filename: 'my-first-webpack.bundle.js',
    },
    module: {
        rules: [{test: /|.txt$/, use: 'raw-loader'}],   // defined a rules property, under module.rules, for a single module with two required properties: test and use
        // it tells the webpack's compiler
        // Hey webpack compiler, when you come across a path that resolves to .'txt' file inside of a require()/import statement, 
        // use the raw-loader to transform it before you add it to the bundle
        // **when using regex to match files, I may not quote it 
   };

   Plugins 
   in order to use a plugin, I ened to require() it and add it to the plugins array
   most plugins are customizable through options
   I can use a plugin multiple times in a configuration for different purposes, so I need to create an instance of it by calling it with the new operator
   webpack.config.js

   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const webpack = require('webpack'); // to access built-in plugins
   module.exports = {
        module: {
            rules: [{test: /|.txt$/, use: 'raw-loader'}], 
        {,
        plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
   };
   html-webpack-plugin generates an HTML file for my application and automatically inhects all my generated bundles into this file

   Mode
   by setting the mode parameter to either development, production, or none, I can enable webpack's built-in optimization that correspond to each environment
   the default value is production

   module.exports = {
        mode: 'production',
   };

   Browser Compatibility
   Webpack supports all browsers that are ES5-compliant (IE8 and below are not supported)
   Webpack needs Promise for import() and require.ensure()
   to support older browsers, I need to load a polyfill before using these expressions

   Environment
   Webpack 5 runs on Node.js version 10.13.0+
*/
/* webpack setup
   once installed, I can interact wiht webpack either from its CLI or API

   Basic Setup
   Creating a Bundle
   Modules
   Using a Configuration
   NPM Scripts 
   Conclusion
*/

/* ES6 modules
   module syntax
   there are 2 components to it, import and export

   // a file called functionOne.js
   const functionOne = () => console.log('FUNCTION ONE!');

   // another JS file
   import {functionOne} from './functionOne';

   functionOne(); // this should work as expected!

   best reason for writing my code in modules: code reuse
    ex. if I have written some functions that manipulate the DOM in a specific way, putting all of those functions 
        into their own file as a 'module' means that I can copy that file and re-use it
    it's the same benefit as when I use factory functions or the module pattern

    both the module pattern and ES6 modules are approaches to organizing and encapsulating code in JS

    module pattern - encapsulates code within a function closure, meaning that the variables and functions declared inside a
                     module are not accessible from outside unless explicitly exported;
                     modules are loaded synchronously meaning one module must complete loading before another starts
                     modules are loaded with the 'require' function
                     the module pattern requires a module loader library or bundler to work in the brwoser
                     they're loaded dynamically and cannot be conditionally imported (imported based on runtime conditions)
     
    ES6 modules - each ES6 module has its own scope,
                  variables declared within a module are local to that module by default,
                  making it less prone to global variable conflicts
                  they're natively supported in modern JS environments, both in browsers and in Node.js
                  they're statically analyzable, so tools like bundlers can optimize the code during build time
                  they can be loaded asynchronously using import() which allows for dynamic imports based on runtime conditions
                  ES6 modules use the import and export keywords for importing and exporting functionality
                  Webpack can perform tree shaking with ES6 Modules, eliminating unused code during the build process
                  ES6 modules integrate well with modern JS dev tools, making them a preserred choice 

    with ES6 modules, only what is exported can be accessed in other modules by importing
    any declarations made in a module are not automatically added to the global scope
    different parts of my code can be kept cleanly separated
    I can definitely export constructors, classes, and factory functions from my modules

    Export
    two different ways to use exports in my code: named exports and default exports

    export - used to export values from a JS module
             exported values can then be imported into other programs with the import declaration or dynamic import
             when a module updates the value of a binding that it exports, the update will be visible in its imported value

    in order to use the export declaration in a source file, the file must be interpreted by the runtime as a module
    do this by adding type="module" to the <script> tag

    // exporting declarations
    export let name1, name2; // also var
    export const name1 = 1, name2 = 2; // also var, let
    export function functionName() {}
    export class ClassName {}
    export function* generatorFunctionName() {}
    export const {name1, name2: bar} = o;
    export const [name1, name2] = array;

    // export list
    export {name1, /*...,* nameN};
    export {variable1 as name1, variable2 as name2, /*...,* nameN};
    export {variable1 as "string name"};
    export {name1 as default /*...,*};

    // default exports
    export default expression;
    export default function functionName() {}
    export default class ClassName {}
    export default function* generatorFunctionName() {}
    export default function () {}
    export default class {}
    export default function* () {}

    // aggregating modules
    export * from "module-name";
    export * as name1 from "module-name";
    export {name1, /* ...,* nameN} from "module-name";
    export {import1 as name1, import2 as name2, /*...,* nameN} from "module-name";
    export {default, /* ...,*} from "module-name";
    export {default as name1} from "module-name";

    nameN - identifier to be exported (so that it can be imported via import in another script)
    if I use an alias with as, the actual exported name can be specified as a string literal

    I can have mutiple named exports per module but only one default export
    
    named exports:

    // export features declared elsewhere
    export {myFunction2, myVariable2};

    // export individual features (can export var, let, const, function, class)
    export let myVariable = Math.sqrt(2);
    export function myFunction() {}

    export {} does not export an empty obkect; it exports nothing (an empty name list)

    I can declare that a module exports X before the name X itself is declared
    export {x};
    const x = 1;
    // this works, because export is only a declaration, but doesn't utilize the value of x

    default exports

    // export feature declared elsewhere as default
    export {myFunction as default;
    
    // above is equivalent to:
    // export default myFunction;

    // export individual features as default
    export default function() {}
    export default class {}

    names for export declarations must be distinct from each other

    export default syntax allows for any expression
    export default 1 + 1;

    functions and classes are exported as declarations, not expressions, and these declarations can be anonymous
    functions will be hoisted

    // foo is a function declaration
    foo();

    export default function foo() {
        console.log("Hi");
    }

    // it's still technically a declaration, but it can be anonymous
    export default function() {
        console.log("Hi");
    }

    name exports are useful when I need to export several values
    when importing this module, named exports must be referred to by the exact same name (optionally renaming it with as)
    default export can be imported with any name

    // file test.js
    const k = 12;
    export default k;

    // some other file
    import m from "./test"; // I have the freedom to use import m instead of import k because k was default export
    console.log(m) // 12

    I can rename named exports to avoid naming conflicts
    export {myFunction as function1, myVariable as variable};

    I can rename a name to something that's not a valid identifier by using a string literal
    export {myFunction as "my-function"};

    Re-exporting/Aggregating
    a module can "relay" values exported from other modules, without the hassle of writing two separate import/export statements
    barrel module - a single module concentrating various exports from various modules
    
    // achieved with "export from" syntax
    export {default as function1, function2} from "bar.js";

    // above is comparable to a combo of import and export, except function1 and function2 do not become available inside the current module
    import {default as function1, function2} from "bar.js"
    export {function1, function2};

    most "import from" syntaxes have "export from" counterparts
    export {x} from "mod";
    export {x as v} from "mod";
    export * as ns from "mod";

    export * from "mod" // there's no import * from "mod"
    this re-exports all named exports from mod as the named exports of the current module.
    but the default export of mod is not re-exported

    if there are two wildcard exports statements that implicitly re-export the same name, neither one is re-exported
    // mod1.js
    export const a = 1;

    // mod2.js
    export const a = 3;

    // barrel.js
    export * from "./mod1.js";
    export * from "./mod2.js";

    // main.js
    import * as ns from "./barrel.js"
    console.log(ns.a) // undefined

    import {a} from "./barrel.js"; // SyntaxError: The requested module './barrel.js' contains conflicting star exports for name 'a'
    
    export {default as DefaultExport} from "bar.js";

    // export from syntax allows as token to be omitted
    export (default, function2)from "bar.js";
*/

/* Import
    import - used to import read-only live bindings which are exported by another module
             live bindings - imported bindings that are updated by the module that exported the binding and cannot be re-assigned by the importing module

    in order to use the i port declaration in a source file, the file must be interpreted by the runtime as a module
    do this by adding type="module" to the <script> tag

    there is also a function-like dynamic import() which does not require scripts of type="module"

    import defaultExport from "module-name";
    export * as name from "module-name";
    import {export1} from "module-name";
    import {export1 as alias1} from "module-name";
    import {default as alias} from "module-name";
    import {export1, export2 as alias2, , /* ...,*} from "module-name";
    import {"string name" as alias} from "module-name";
    import defaultExport, {export1, /*...,*} from "module-name";
    import defaultExport, * as name from "module-name";
    import "module-name";

    defaultExport - name that will refer to the default export from the module (must be a valid JS identifier)

    module-name - module to import from
                  evaluation of the specifier is host-specified
                  this is often a relative or absolute URL to the .js file containing the module
                  in Node.js, extension-less imports often refer to packages in node_modules
                  certain bundlers may permit importing files without extensions

    name - name of the module object that will be used as a kind of namespace when referring to the imports
           must be a valid JS identifier

    exportN - name of the exports to be imported
              name can be either an identifier or a string literal, depending on what module-name declares to export
              if it is a string literal, it must be aliased to a valid identifier

    aliasN - names that will refer to the named imports;
             must be a valid JS identifier

    import declarations can only be present in modules
    and only at the top-level
    if an import declaration is encountered in non-module contexts (ex. <script> tags without type="module", eval, new Function,
    which all have "script" or "function body" as parsing goals), a SyntaxError is thrown
    to load modules in non-module contexts, use dynamic import syntax instead

    all imported bindings cannot be in the same scope as any other declaration, including let, const, class, function, var and import

    import declarations are designed to be syntactically rigid:
    - only string literal specifiers
    - only permitted at the top-level
    - all bindings must be identifiers
    this allows modules to be statically analyzed and linked before getting evaluated/ even before the code in executed, JS runtime can analyze 
    and link together the various modules that a program depends on  (this saves debugging time)

    npm install - for installing project dependencies listed in package.json
                  enxures I have all the necessary dependencies
                  looks for dependencies and devDependencies sections in package.json and installs the specified packages
                  used when setting up a project or when I want to install new dependencies

    npx webpack - for running the Webpack bundler to build my project according to my Webpack configuration
                  bundles my code using Webpack
                  executes the Webpack build process as configured by my project
                  reading a webpack.config.js to determine how to bundle and transform my project's source code and assets
                  used when I want to build my project using Webpack, often as part of the development or build process

    forms of import declarations

    named import
    import {export1, export2} from "module-name";

    default import
    import defaultExport from "module-name";

    namespace import
    import * as name from "module-name";
    namespace - contianer that holds a set of unique identifiers (such as functions, classes, or variables) 
                and provides a way to uniquely identify and access them

    side effect import
    import from "module-name";
    
    named import

    // give a value named myExport
    //      exported from the module my-module either implicitly as export * from "another.js"
    //      or explicitly using the export statement, 
    // this inserts myExport into the current scope  
    import {myExport} from "/modules/my-module.js";

    // I can import multiple names from the same module
    import {foo, bar} from "/modules/my-module.js";

    // I can rename an export when importing it
    // inserts shortName into the current scope
    import {reallyReallyLongModuleExportName as shortName} from "/modules/my-module.js";

    // a module may export a member as a string literal, which is not a valid identifier, in which case, I must alias it in order to use in the current module
    const a = 1;
    export {a as "a-b"};
    
    import {"a-b" as a} from "/modules/my-module.js";

    default import
    import defaultExport from "module-name";

    // I can give the identifier any name I like
    // it is also possible to specific a default import with namespace imports or named imports
    // then, the default import has to be declared first
    import myDefault, * as myModule from "/modules/my-module.js"; // myModule.default and myDefault point to the same binding, or
    import {default as myDefault} from "/modules/my-module.js";

    namespace import
    // inserts myModule into the current scope, containing all the exports from the module located at /modules/my-module.js
    import * as myModule from "/modules/my-module.js";

    // myModule - represents a namespace object which contains all exports as properties
    // if the module imported above includes an export doAllTheAmazingThings()
    myModule.doAllTheAmazingThings();

    myModule is a sealed object with null prototype

    side effect import
    // import a module for its sides only, without importing anaything
    // this runs the module's global code, but doesn't actually import any values
    import "/modules/my-module.js"

    this is often used for polyfills which mutate the global variables

    Hoisting
    import declarations are hoisted
    the identifiers the imports introduce are available in the entire module scope, and their side effects are produced before the rest of the module's code runs
    hoisting - when variable and function declarations are moved to the top of the their containing scope during the compilation phase before the code is executed

    myModule.doAllTheAmazingThings(); // myModule.doAllTheAmazingThings is imported by the next line
    import * as myModule from "/modules/my-module.js";
*/

/* ES6 Modules 
    Explain what ES6 modules are and how to import and export from them
        ES6 modules - actual modules
    Describe the difference between default and named exports
        named exports - stick the export keyword in front of its declaration or add export { }
                        somewhere in the file
        default exports -a file can only default export a single thing 
    Explain the main differences between CommonJS modules and ES6 modules 
    
    Before ES6 Modules, how would I privatize a variable from being accessible in other files?
        use IIFEs to scope the variable to the function
    Before ES6 Modules, how would I expose variables to be accessible in later files?
        return the variable I want to expose from my IIFE
    What are some benefits of writing code in modules? 
        module pattern - design pattern that encapsulates code in modules
                         lets us group related code together,
                         manage dependencies
                         avoids polluting the global namespace
        more control, I can choose what to export and what to import
    What is an entry point?
        single file link to add all necessary JS dependencies to my HTML
    How do I link a module script in HTML? 
        <script src="two.js" type="module"></script>
    
    with module pattern, I can create a private scope within my module, variables and functions
    defined inside a module aren't accessible from outside unless explicitly exposed 
        I can selectively expose private functions and variables via a return object 
    module pattern relies on IIFE to create a private scope 
        IIFE - function that is defined and immediately executed, helps to create an isolated
               scope for the module */

// basic module pattern
const MyModule = (function () {
  const privateVariable = "I am private";

  function privateFunction() {
    console.log(privateVariable);
  }

  // Public API (exposing certain variables and functions)
  return {
    publicMethod: function () {
      privateFunction();
    },
    publicVariable: "I am public",
  };
})();

MyModule.publicMethod(); // outputs "I am private"
console.log(MyModule.publicVariable); // outputs "I am public"
console.log(MyModule.privateVariable); // Undefined (private)

// ES6 Module
// MyModule.js
export const publicVariable2 = "I am public";
export function publicMethod2() {
  console.log("Hello from public method 2");
}

// main.js
import { publicMethod2, publicVariable2 } from "./myModule.js";

publicMethod2(); // outputs "Hello from public method 2"
console.log(publicVariable2); // outputs "I am public"
