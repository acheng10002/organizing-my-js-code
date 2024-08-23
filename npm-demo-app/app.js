// using an npm package installed locally
var lodash = require("lodash");

var output = lodash.without([1, 2, 3], 1);
console.log(output); // on cl, node app.js // [2, 3]

/* Understand what npm is
    npm - package manager that helps me find and manage third-party packages
          which can range from helper functions to entire frameworks;
          repositoru of plugins, libraries, other tools/packages
          it provides me with a command-line tool I can use to install these tools
          I will then have my installed packages' code locally, which I can import
          into my own files, and I could public my own code to npm
 npm - node pm, pm is a bash utility
 bash utility - command-line program that can be used within the Bash shell, Bash shell
                being a command interpreter in Unix-like operating systems 
Understand the purpose of the package.json file 

 bundlers - tools that let me write multiple files that are better for me to work with,
            then bundle them together into fewer smaller which will ultimately be sent
            to the browser instead */

/* Node.js - runtime environment that lets me execute JS code on the server side, outside
             of a web browser 
             
I can installl a package locally, if I want to depend on the package from my own module, using
Node.js require, this is npm install's default behavior 

tesing package installing
to confirm that npm install worked correctly
check that a node_modules directory exists, and that it contains a directory for the package I 
installed - ls node_modules 

babel - JS compiler that allows dev to use JS's latest features while ensuring compatibility 
        with older browsers and environments that do not natively support the features
linter - tool that analyzes my source code to identify and report on patterns that are likely
         to be errors or suboptimal practices */
